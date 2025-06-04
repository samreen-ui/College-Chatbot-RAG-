// src/components/ChatWindow.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Send, X, Mic, MicOff, ChevronDown, Loader, Maximize, Minimize } from 'lucide-react';
import EventsDropdown from './EventsDropdown';
import ClubsDropdown from './ClubsDropdown';
import FunctionBoxes from './FunctionBoxes';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    buttons?: { label: string; onClick: () => void }[];
}

interface ChatWindowProps {
    messages: Message[];
    onClose: () => void;
    onSendMessage: (query: string, response?: string, requiresBackend?: boolean) => void;
    isTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onClose, onSendMessage, isTyping }) => {
    const [input, setInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const [isClubsOpen, setIsClubsOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            } else if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            }
        }, 100);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            recognitionRef.current = new webkitSpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsRecording(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsRecording(false);
                onSendMessage('Sorry, I couldn’t understand your speech. Please try typing instead.');
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [onSendMessage]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
                scrollToBottom();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isFullscreen]);

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
            scrollToBottom();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.trim()) {
            handleSend();
        }
    };

    const toggleRecording = () => {
        if (!('webkitSpeechRecognition' in window)) {
            onSendMessage('Speech recognition is not supported in this browser. Please try typing instead.');
            return;
        }

        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            setIsRecording(true);
            recognitionRef.current?.start();
        }
    };

    const toggleFullscreen = () => {
        setIsFullscreen((prev) => !prev);
        scrollToBottom();
    };

    const formatTimestamp = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-2xl flex flex-col fixed bottom-16 right-4 z-50 transition-all duration-300 ${isFullscreen ? 'w-screen h-screen bottom-0 right-0 rounded-none' : 'w-96 h-[32rem]'
                }`}
        >
            {/* Header (Fixed) */}
            <div className="bg-kmit-teal text-white p-4 rounded-t-lg flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold">Vidya - KMIT Assistant</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleFullscreen}
                        className="text-white hover:text-gray-200 p-2 rounded-full bg-kmit-teal/80 hover:bg-kmit-teal"
                        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                        title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                    >
                        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                    </button>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 p-2 rounded-full bg-kmit-teal/80 hover:bg-kmit-teal"
                        aria-label="Close chat"
                        title="Close Chat"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Scrollable Content Area */}
            <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto custom-scrollbar"
                style={{ minHeight: '0' }}
            >
                {/* Dropdowns Section */}
                {/* Dropdowns Section */}
                <div className="border-b">
                    <div className="flex items-center p-3 gap-4">
                        {/* Upcoming Events Dropdown */}
                        <button
                            onClick={() => setIsEventsOpen((prev) => !prev)}
                            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                            aria-label="Upcoming Events"
                        >
                            <ChevronDown size={20} className={`${isEventsOpen ? 'rotate-180' : ''}`} />
                            <span className="text-sm font-medium">Upcoming Events</span>
                        </button>

                        {/* Clubs Dropdown */}
                        <button
                            onClick={() => setIsClubsOpen((prev) => !prev)}
                            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 p-2 rounded-full"
                            aria-label="Clubs at KMIT"
                        >
                            <ChevronDown size={20} className={`${isClubsOpen ? 'rotate-180' : ''}`} />
                            <span className="text-sm font-medium">Clubs</span>
                        </button>
                    </div>

                    {isEventsOpen && <EventsDropdown onSelect={onSendMessage} />}
                    {isClubsOpen && <ClubsDropdown onSelect={onSendMessage} />}

                </div>


                {/* Function Boxes */}
                <FunctionBoxes onSelect={onSendMessage} />

                {/* Conversation Area */}
                <div className="p-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-kmit-teal/80 text-white' : 'bg-gray-100 text-gray-800'
                                    }`}
                            >
                                <p>{message.text}</p>
                                <span className="text-xs text-gray-400 mt-1 block">
                                    {formatTimestamp(message.timestamp)}
                                </span>
                                {message.buttons && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {message.buttons.map((button, idx) => (
                                            <button
                                                key={idx}
                                                onClick={button.onClick}
                                                className="bg-kmit-teal/90 hover:bg-kmit-teal text-white px-3 py-1 rounded-full text-sm"
                                            >
                                                {button.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start mb-4">
                            <div className="bg-gray-100 p-3 rounded-lg flex items-center">
                                <Loader className="animate-spin text-kmit-teal" size={20} />
                                <span className="ml-2 text-gray-600">Typing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area (Fixed) */}
            <div className="p-3 border-t flex items-center gap-2 sticky bottom-0 bg-white z-10">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:border-kmit-teal"
                />
                <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-full ${isRecording ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'
                        } hover:opacity-90`}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                >
                    {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <button
                    onClick={handleSend}
                    className="bg-kmit-teal hover:bg-kmit-teal/90 text-white p-2 rounded-full"
                    aria-label="Send message"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;