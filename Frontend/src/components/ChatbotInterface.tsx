// src/components/ChatbotInterface.tsx
import React, { useState, useCallback } from 'react';
import ChatWindow from './ChatWindow';
import ChatbotButton from './ChatbotButton';
import { searchQuery } from '../services/api';

interface Message {
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    buttons?: { label: string; onClick: () => void }[];
}

const ChatbotInterface: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            text: 'Hello! I am Vidya, your KMIT assistant. How can I help you today?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = useCallback(async (query: string, response?: string, requiresBackend: boolean = false) => {
        // Add the user query as a user message (unless it's a backend response for "Check Attendance")
        if (!(requiresBackend && response === 'checkAttendance')) {
            const newUserMessage: Message = {
                text: query,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        }
        

        setIsTyping(true);

        try {
            // Normalize query for keyword detection
            const lowerQuery = query.toLowerCase();

            // Handle attendance queries
            if (requiresBackend && response === 'checkAttendance') {
                const botMessage: Message = {
                    text: 'Check your attendance here on the Spectra website:',
                    sender: 'bot',
                    timestamp: new Date(),
                    buttons: [
                        {
                            label: 'Check Attendance',
                            onClick: () => window.open('https://spectra-beta.vercel.app/search', '_blank'),
                        },
                    ],
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            } else if (lowerQuery.includes('attendance')) {
                const botMessage: Message = {
                    text: 'Check your attendance here on the Spectra website:',
                    sender: 'bot',
                    timestamp: new Date(),
                    buttons: [
                        {
                            label: 'Check Attendance',
                            onClick: () => window.open('https://spectra-beta.vercel.app/search', '_blank'),
                        },
                    ],
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
            // Handle cutoff queries
            else if (lowerQuery.includes('cutoff') || lowerQuery.includes('cut-off') || lowerQuery.includes('rank') || lowerQuery.includes('last rank')) {
                const botMessage: Message = {
                    text: 'You can check the latest cutoff ranks for KMIT admissions here:',
                    sender: 'bot',
                    timestamp: new Date(),
                    buttons: [
                        {
                            label: 'EAPCET Cutoff',
                            onClick: () => window.open('https://kmit.in/admissions/eapcet-lastrank.php', '_blank'),
                        },
                        {
                            label: 'ECET Cutoff',
                            onClick: () => window.open('https://kmit.in/admissions/ecet-lastrank.php', '_blank'),
                        },
                    ],
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
            // Handle placement queries
            else if (lowerQuery.includes('placement') || lowerQuery.includes('job') || lowerQuery.includes('recruitment') || lowerQuery.includes('hiring')) {
                const botMessage: Message = {
                    text: `Success Stories
            KMIT continues to maintain the streak of record placements for the 2023-2024 batch. So far, 103 companies have visited the campus, and 662 offers have been rolled out. Out of 557 registered students, 511* got placed with an average salary of ₹9.69 LPA.
            
            Highlights:
            1. 10 students received job offers with salaries of more than ₹40 LPA.
            2. 6 students received job offers with salaries between ₹20 and ₹40 LPA.
            3. 61 students received job offers with salaries between ₹15 and ₹20 LPA.
            4. 149 students received job offers with salaries between ₹10 and ₹15 LPA.
            5. 71 students received job offers with salaries between ₹8 and ₹10 LPA.
            6. 174 students received job offers with salaries between ₹6 and ₹8 LPA.
            7. 63 students received job offers with salaries between ₹5 and ₹6 LPA.
            
            You can check the latest placement details for KMIT here:`,
                    sender: 'bot',
                    timestamp: new Date(),
                    buttons: [
                        {
                            label: 'Placement Details',
                            onClick: () => window.open('https://kmit.in/placements/placement.php', '_blank'),
                        },
                    ],
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
            // Handle FunctionBoxes responses
            else if (response && !requiresBackend) {
                const botMessage: Message = {
                    text: response,
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
            // General query to backend
            else {
                const { summary } = await searchQuery(query);
                const botMessage: Message = {
                    text: summary,
                    sender: 'bot',
                    timestamp: new Date(),
                };
                setMessages((prevMessages) => [...prevMessages, botMessage]);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            const botMessage: Message = {
                text: 'Sorry, I encountered an error. Please try again.',
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } finally {
            setIsTyping(false);
        }
    }, []);

    return (
        <>
            <ChatbotButton onClick={() => setIsOpen(true)} />
            {isOpen && (
                <ChatWindow
                    messages={messages}
                    onClose={() => setIsOpen(false)}
                    onSendMessage={handleSendMessage}
                    isTyping={isTyping}
                />
            )}
        </>
    );
};

export default ChatbotInterface;