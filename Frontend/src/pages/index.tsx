// src/pages/index.tsx
import ChatbotInterface from '../components/ChatbotInterface';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">KMIT College Website</h1>
                <p className="text-gray-600 mb-4">
                    Welcome to Keshava Memorial Institute of Technology. This is a demo page showing our interactive chatbot assistant.
                </p>
                <p className="text-gray-600 mb-4">
                    Click the chat button in the bottom right corner to interact with Vidya, our college assistant.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-gray-700">
                        <strong>Note:</strong> This is a demonstration of the chatbot feature. The full college website would include additional sections like about us, academics, admissions, etc.
                    </p>
                </div>
            </div>
            <ChatbotInterface />
        </div>
    );
}