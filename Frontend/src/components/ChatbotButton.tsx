// src/components/ChatbotButton.tsx
import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatbotButtonProps {
    onClick: () => void;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-5 right-5 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            aria-label="Open chat"
        >
            <div className="relative">
                <MessageCircle size={28} />
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
            </div>
            <span className="ml-2 font-medium">Ask Vidya</span>
        </button>
    );
};

export default ChatbotButton;
