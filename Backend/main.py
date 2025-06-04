import os
import json
import faiss
import time
import re
import numpy as np
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from difflib import get_close_matches
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
from supabase import create_client, Client
from datetime import datetime

# Set your Gemini API key
GOOGLE_API_KEY = "AIzaSyBREwLriT1bsEYB0Ansnf-j83xqGZjrybY"
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Supabase client
SUPABASE_URL = "https://siayecqdxwvgagmpkcmq.supabase.co"  # Replace with your Supabase URL
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpYXllY3FkeHd2Z2FnbXBrY21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODU4ODk2NCwiZXhwIjoyMDY0MTY0OTY0fQ.ZoL7-hrj25xtdtIBXy75T4zYdPq0OnhmiPY2lySkw04"  # Replace with your Supabase Key
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load JSON Data
json_path = os.path.join("json", "sam.json")
with open(json_path, "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Loaded {len(data)} entries from JSON.")

# Prepare text chunks and compute embeddings
titles = [entry["title"] for entry in data]
text_chunks = [entry["text"] for entry in data]
combined_inputs = [f"{titles[i]}: {text_chunks[i]}" for i in range(len(data))]

embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = embedding_model.encode(combined_inputs, convert_to_numpy=True).astype("float32")

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)
print("✅ FAISS index created and embeddings added.")

# Normalize query
def normalize_query(query):
    return query.lower().strip().replace("?", "")

# Predefined answer store
predefined_answers = {
    "what is Kmit full form":"Keshav memorial institute of technology",
    "what is kmit":"# Keshav Memorial Institute of Technology (KMIT) Established: 2007, Affiliation: Jawaharlal Nehru Technological University Hyderabad (JNTUH),  Approval:All India Council for Technical Education (AICTE), New Delhi,   Location: Narayanguda, Hyderabad - 500029,  Connectivity: Close to metro station and bus stop for easy access across Hyderabad",  
    "hi": "Hello! How can I assist you today?",
    "what is the cutoff for kmit": "The cutoff ranks for KMIT vary each year based on the entrance exams.",
    "what is the eapcet cutoff": "The EAPCET cutoff ranks for KMIT are updated annually.",
    "what is the ecet cutoff": "The ECET cutoff ranks for KMIT are updated annually.",
    "tell me about placements at kmit": "KMIT has a strong placement record with many top companies visiting for recruitment.",
    "what are the placement details": "KMIT offers excellent placement opportunities with a high placement rate.",
    "hello": "Hi there! What can I help you with?",
    "who is the principal of kmit": "The principal of KMIT is Dr. B L Malleswari.",
    "what is the minimum attendance": "The minimum attendance required at KMIT is 75%.",
    "where is kmit located": "KMIT is located in Narayanguda, Hyderabad.",
    "What are the academic regulations for 2024?": "The academic regulations for KR23 include maintaining a minimum of 75% attendance, passing all subjects with a minimum of 40% marks, and completing all assignments on time.",
    "who is the director of kmit": "The Director of KMIT is Mr. Neil Gogte.",
    "who is the founder of kmit": "The Founder of KMIT is also Mr. Neil Gogte.",
    "what are the college timings": "College timings are generally from 9:00 AM to 4:30 PM.",
    "what is the attendance percentage required": "You must maintain at least 75% attendance to be eligible for exams.",
    "what are the departments in kmit": "KMIT has H&S department, AI&ML department, CSE department, CSD department, and IT department."
}

# Embed predefined questions
def embed_predefined_questions():
    questions = list(predefined_answers.keys())
    embeddings = embedding_model.encode(questions, convert_to_numpy=True).astype("float32")
    return questions, embeddings

predefined_questions, predefined_embeddings = embed_predefined_questions()

# Smart match from predefined answers
def get_predefined_answer_semantic(query):
    query_embedding = embedding_model.encode([query], convert_to_numpy=True)
    sims = cosine_similarity(query_embedding, predefined_embeddings)[0]
    best_idx = np.argmax(sims)
    if sims[best_idx] > 0.80:
        return predefined_answers[predefined_questions[best_idx]]
    return None

# Fuzzy fallback
def get_predefined_answer_fuzzy(query):
    matches = get_close_matches(query, predefined_answers.keys(), n=1, cutoff=0.8)
    if matches:
        return predefined_answers[matches[0]]
    return None

# Combine both methods
def get_predefined_answer(query):
    normalized = normalize_query(query)
    return get_predefined_answer_semantic(normalized) or get_predefined_answer_fuzzy(normalized)

# Retrieve documents from JSON using hybrid search
def retrieve_relevant_docs(query, top_k=10):
    query = normalize_query(query)
    query_embedding = embedding_model.encode([query], convert_to_numpy=True).astype("float32")
    distances, indices = index.search(query_embedding, top_k)

    semantic_results = [f"{titles[i]}: {text_chunks[i]}" for i in indices[0] if i < len(text_chunks)]

    query_words = set(query.split())
    keyword_matches = []
    for i in range(len(data)):
        full_text = f"{titles[i]} {text_chunks[i]}".lower()
        if any(word in full_text for word in query_words):
            keyword_matches.append(f"{titles[i]}: {text_chunks[i]}")

    combined_results = list(dict.fromkeys(semantic_results + keyword_matches))

    context = ""
    for chunk in combined_results:
        if len(context) + len(chunk) > 4000:
            break
        context += "\n\n" + chunk

    return context.strip() if context else "No relevant documents found."

# Generate answer with Gemini
def generate_response(query):
    answer = get_predefined_answer(query)
    if answer:
        return answer

    context = retrieve_relevant_docs(query)

    prompt = (
        "You are a helpful assistant. Use the context to answer the question below. "
        f"Context:\n{context}\n\n"
        f"Question: {query}\nAnswer:"
    )

    model = genai.GenerativeModel("gemini-1.5-flash")
    config = genai.types.GenerationConfig(
        temperature=0.9,
        top_p=0.9,
        top_k=40,
        max_output_tokens=512
    )

    try:
        response = model.generate_content(prompt, generation_config=config)
        return response.text.strip()
    except Exception as e:
        return f"❌ Error generating response: {str(e)}"

# Admin mode for editing/adding predefined answers
def enter_admin_mode():
    admin_password = "admin123"
    while True:
        print("\nEntered Admin Mode.")
        print("Type '/exitadmin' to leave Admin Mode.")
        password = input("Enter admin password to modify answers: ")
        if password != admin_password:
            print("❌ Incorrect password.")
            continue

        while True:
            print("\nType '/exitadmin' to exit admin mode.")
            query = input("Enter the question you want to modify answer for: ").lower().strip()
            if query == "/exitadmin":
                print("Exiting admin mode...")
                return

            if query not in predefined_answers:
                print(f"⚠️ No predefined answer for '{query}'. A new entry will be created.")
            else:
                print(f"✏️ Editing existing answer for '{query}'")

            new_answer = input(f"Enter the new answer for '{query}': ").strip()
            predefined_answers[query] = new_answer

            # Refresh predefined embeddings
            global predefined_questions, predefined_embeddings
            predefined_questions, predefined_embeddings = embed_predefined_questions()

            print(f"✅ Answer for '{query}' updated and saved.")

# Flask API
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/search', methods=['POST'])
def search():
    try:
        data = request.get_json()
        query = data.get('query', '').strip()
        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Save the query to Supabase
        try:
            supabase.table("user_queries").insert({
                "query": query,
                "created_at": datetime.utcnow().isoformat()
            }).execute()
        except Exception as e:
            logging.error(f"Error saving query to Supabase: {str(e)}")
            return jsonify({"error": f"Failed to save query: {str(e)}"}), 500

        # Check if the query is '/admin' to enter admin mode
        if query == "/admin":
            enter_admin_mode()
            return jsonify({"message": "Entered Admin Mode. Check the console for further actions."}), 200

        response = generate_response(query)
        return jsonify({"generated_response": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500    

@app.route('/get-attendance', methods=['POST'])
def get_attendance():
    try:
        data = request.get_json()
        roll_number = data.get('rollNumber', '').strip()
        if not roll_number:
            return jsonify({"error": "Roll number is required"}), 400

        # Instead of using Selenium, return a direct link to the attendance search page
        attendance_url = f"https://spectra-beta.vercel.app/search?rollNumber={roll_number}"
        return jsonify({
            "message": f"Please check your attendance for roll number {roll_number} here:",
            "url": attendance_url
        }), 200

    except Exception as e:
        logging.error(f"Error in get_attendance: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


















# import os
# import json
# import faiss
# import time
# import re
# import numpy as np
# import google.generativeai as genai
# from sentence_transformers import SentenceTransformer
# from difflib import get_close_matches
# from sklearn.metrics.pairwise import cosine_similarity
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import logging

# # Set your Gemini API key
# GOOGLE_API_KEY = "AIzaSyBREwLriT1bsEYB0Ansnf-j83xqGZjrybY"
# genai.configure(api_key=GOOGLE_API_KEY)

# # Load JSON Data
# json_path = os.path.join("json", "sam.json")
# with open(json_path, "r", encoding="utf-8") as f:
#     data = json.load(f)

# print(f"Loaded {len(data)} entries from JSON.")

# # Prepare text chunks and compute embeddings
# titles = [entry["title"] for entry in data]
# text_chunks = [entry["text"] for entry in data]
# combined_inputs = [f"{titles[i]}: {text_chunks[i]}" for i in range(len(data))]

# embedding_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
# embeddings = embedding_model.encode(combined_inputs, convert_to_numpy=True).astype("float32")

# index = faiss.IndexFlatL2(embeddings.shape[1])
# index.add(embeddings)
# print("✅ FAISS index created and embeddings added.")

# # Normalize query
# def normalize_query(query):
#     return query.lower().strip().replace("?", "")

# # Predefined answer store
# predefined_answers = {
#     "hi": "Hello! How can I assist you today?",
#     "what is the cutoff for kmit": "The cutoff ranks for KMIT vary each year based on the entrance exams.",
#     "what is the eapcet cutoff": "The EAPCET cutoff ranks for KMIT are updated annually.",
#     "what is the ecet cutoff": "The ECET cutoff ranks for KMIT are updated annually.",
#     "tell me about placements at kmit": "KMIT has a strong placement record with many top companies visiting for recruitment.",
#     "what are the placement details": "KMIT offers excellent placement opportunities with a high placement rate.",
#     "hello": "Hi there! What can I help you with?",
#     "who is the principal of kmit": "The principal of KMIT is Dr. B L Malleswari.",
#     "what is the minimum attendance": "The minimum attendance required at KMIT is 75%.",
#     "where is kmit located": "KMIT is located in Narayanguda, Hyderabad.",
#     "What are the academic regulations for 2024?": "The academic regulations for KR23 include maintaining a minimum of 75% attendance, passing all subjects with a minimum of 40% marks, and completing all assignments on time.",
#     "who is the director of kmit": "The Director of KMIT is Mr. Neil Gogte.",
#     "who is the founder of kmit": "The Founder of KMIT is also Mr. Neil Gogte.",
#     "what are the college timings": "College timings are generally from 9:00 AM to 4:30 PM.",
#     "what is the attendance percentage required": "You must maintain at least 75% attendance to be eligible for exams.",
#     "what are the departments in kmit": "KMIT has H&S department, AI&ML department, CSE department, CSD department, and IT department."
# }

# # Embed predefined questions
# def embed_predefined_questions():
#     questions = list(predefined_answers.keys())
#     embeddings = embedding_model.encode(questions, convert_to_numpy=True).astype("float32")
#     return questions, embeddings

# predefined_questions, predefined_embeddings = embed_predefined_questions()

# # Smart match from predefined answers
# def get_predefined_answer_semantic(query):
#     query_embedding = embedding_model.encode([query], convert_to_numpy=True)
#     sims = cosine_similarity(query_embedding, predefined_embeddings)[0]
#     best_idx = np.argmax(sims)
#     if sims[best_idx] > 0.80:
#         return predefined_answers[predefined_questions[best_idx]]
#     return None

# # Fuzzy fallback
# def get_predefined_answer_fuzzy(query):
#     matches = get_close_matches(query, predefined_answers.keys(), n=1, cutoff=0.8)
#     if matches:
#         return predefined_answers[matches[0]]
#     return None

# # Combine both methods
# def get_predefined_answer(query):
#     normalized = normalize_query(query)
#     return get_predefined_answer_semantic(normalized) or get_predefined_answer_fuzzy(normalized)

# # Retrieve documents from JSON using hybrid search
# def retrieve_relevant_docs(query, top_k=10):
#     query = normalize_query(query)
#     query_embedding = embedding_model.encode([query], convert_to_numpy=True).astype("float32")
#     distances, indices = index.search(query_embedding, top_k)

#     semantic_results = [f"{titles[i]}: {text_chunks[i]}" for i in indices[0] if i < len(text_chunks)]

#     query_words = set(query.split())
#     keyword_matches = []
#     for i in range(len(data)):
#         full_text = f"{titles[i]} {text_chunks[i]}".lower()
#         if any(word in full_text for word in query_words):
#             keyword_matches.append(f"{titles[i]}: {text_chunks[i]}")

#     combined_results = list(dict.fromkeys(semantic_results + keyword_matches))

#     context = ""
#     for chunk in combined_results:
#         if len(context) + len(chunk) > 4000:
#             break
#         context += "\n\n" + chunk

#     return context.strip() if context else "No relevant documents found."

# # Generate answer with Gemini
# def generate_response(query):
#     answer = get_predefined_answer(query)
#     if answer:
#         return answer

#     context = retrieve_relevant_docs(query)

#     prompt = (
#         "You are a helpful assistant. Use the context to answer the question below. "
#         f"Context:\n{context}\n\n"
#         f"Question: {query}\nAnswer:"
#     )

#     model = genai.GenerativeModel("gemini-1.5-flash")
#     config = genai.types.GenerationConfig(
#         temperature=0.9,
#         top_p=0.9,
#         top_k=40,
#         max_output_tokens=512
#     )

#     try:
#         response = model.generate_content(prompt, generation_config=config)
#         return response.text.strip()
#     except Exception as e:
#         return f"❌ Error generating response: {str(e)}"

# # Admin mode for editing/adding predefined answers
# def enter_admin_mode():
#     admin_password = "admin123"
#     while True:
#         print("\nEntered Admin Mode.")
#         print("Type '/exitadmin' to leave Admin Mode.")
#         password = input("Enter admin password to modify answers: ")
#         if password != admin_password:
#             print("❌ Incorrect password.")
#             continue

#         while True:
#             print("\nType '/exitadmin' to exit admin mode.")
#             query = input("Enter the question you want to modify answer for: ").lower().strip()
#             if query == "/exitadmin":
#                 print("Exiting admin mode...")
#                 return

#             if query not in predefined_answers:
#                 print(f"⚠️ No predefined answer for '{query}'. A new entry will be created.")
#             else:
#                 print(f"✏️ Editing existing answer for '{query}'")

#             new_answer = input(f"Enter the new answer for '{query}': ").strip()
#             predefined_answers[query] = new_answer

#             # Refresh predefined embeddings
#             global predefined_questions, predefined_embeddings
#             predefined_questions, predefined_embeddings = embed_predefined_questions()

#             print(f"✅ Answer for '{query}' updated and saved.")

# # Flask API
# app = Flask(__name__)
# CORS(app)  # Enable CORS for cross-origin requests

# #@app.route('/search', methods=['POST'])
# #def search():
#  #   try:
#   #      data = request.get_json()
#     #    query = data.get('query', '').strip()
#    #     if not query:
#      #       return jsonify({"error": "Query is required"}), 400

#        # response = generate_response(query)
#       #  return jsonify({"generated_response": response}), 200
#    # except Exception as e:
#     #    return jsonify({"error": str(e)}), 500

# @app.route('/search', methods=['POST'])
# def search():
#     try:
#         data = request.get_json()
#         query = data.get('query', '').strip()
#         if not query:
#             return jsonify({"error": "Query is required"}), 400

#         # Check if the query is '/admin' to enter admin mode
#         if query == "/admin":
#             enter_admin_mode()
#             return jsonify({"message": "Entered Admin Mode. Check the console for further actions."}), 200

#         response = generate_response(query)
#         return jsonify({"generated_response": response}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500    

# # ... (Previous imports and code remain the same until the /get-attendance endpoint)

# @app.route('/get-attendance', methods=['POST'])
# def get_attendance():
#     try:
#         data = request.get_json()
#         roll_number = data.get('rollNumber', '').strip()
#         if not roll_number:
#             return jsonify({"error": "Roll number is required"}), 400

#         # Instead of using Selenium, return a direct link to the attendance search page
#         attendance_url = f"https://spectra-beta.vercel.app/search?rollNumber={roll_number}"
#         return jsonify({
#             "message": f"Please check your attendance for roll number {roll_number} here:",
#             "url": attendance_url
#         }), 200

#     except Exception as e:
#         logging.error(f"Error in get_attendance: {str(e)}")
#         return jsonify({"error": f"Server error: {str(e)}"}), 500

# # ... (Rest of the code remains the same)

# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 5000))
#     app.run(host="0.0.0.0", port=port)