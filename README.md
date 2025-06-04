# 🤖 KMIT College ChatBot (Gemini + Flask + Supabase + RAG)

A smart AI chatbot for the [Keshav Memorial Institute of Technology (KMIT)](https://kmit.in), built to help students, faculty, and visitors instantly access important information, events, and resources via a floating assistant on the website.

---

## ✨ Features

- 💬 **Conversational AI** powered by **Gemini LLM (Google Generative AI)**
- 📚 **RAG (Retrieval-Augmented Generation)** using FAISS + Sentence Transformers
- 🗃️ **College Info + Event Data** loaded via JSON and Supabase
- 🔗 **Quick Redirects** – Like Attendance Portal, Exam Info, Syllabus, etc.
- 🧑‍🎓 **Smart Responses** to FAQs, context-based queries, and navigation needs
- 🖼️ **Floating Chatbot UI** integrated into the college website (Vite + TypeScript)
- 🔐 CORS enabled Flask backend to serve AI and database responses

---

## ⚙️ Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| 🧠 AI Model   | Gemini API (Google Generative AI)  |
| 🔍 Embeddings | Sentence-Transformers (MiniLM-L6-v2) |
| 📥 Vector DB  | FAISS (Facebook AI Similarity Search) |
| 🌐 Backend    | Flask + Flask-CORS + Supabase SDK |
| 📊 Data       | JSON file + Supabase DB            |
| 🧪 Scraping   | Selenium (ChromeDriver)            |
| 🖥️ Frontend   | Vite + TypeScript                  |

---
## 🖼️ Chatbot Preview

Here’s how the chatbot looks when embedded on the KMIT website:


![Screenshot 2025-06-04 190815](https://github.com/user-attachments/assets/58e650f2-15b7-463a-83bc-4d5b167298a7)

![Screenshot 2025-06-04 190823](https://github.com/user-attachments/assets/8c2d7e99-e4e6-4916-bb78-f02681c40e78)

---
## 🧠 How It Works
1. User submits a question through the floating chatbot.
2. Query is normalized and embedded via Sentence Transformers.
3. FAISS finds the most relevant context from JSON data.
4. Context + query are sent to Gemini API for final response generation.
5. Supabase is queried for dynamic content like event updates.
6. Response is shown in the chatbot UI.

---



