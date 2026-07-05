"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello! 👋 I'm FurniBot, your AI Assistant. How can I help you find furniture today?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");

        const newMessages = [...messages, { sender: "user", text: userMessage }];

        // Add user message to UI immediately
        setMessages(newMessages);
        setIsLoading(true);

        try {
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/chat`,
                { messages: newMessages }
            );

            // Add bot reply to UI
            setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Sorry, I'm having trouble connecting right now. Please try again in a moment." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            {/* Chat Bubble Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#B88E2F] hover:bg-[#9c7827] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group cursor-pointer"
                    aria-label="Open AI Assistant"
                >
                    <MessageSquare size={24} className="sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 bg-red-500 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse" />
                </button>
            )}

            {/* Chatbot Window */}
            {isOpen && (
                <div className="bg-white w-[calc(100vw-2rem)] sm:w-[380px] h-[75vh] max-h-[520px] rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
                    
                    {/* Header */}
                    <div className="bg-[#B88E2F] text-white px-5 py-4 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <Bot size={22} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base leading-tight">FurniBot AI</h3>
                                <p className="text-xs text-white/80 font-medium flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Online Assistant
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex items-start gap-2.5 ${
                                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                                        msg.sender === "user"
                                            ? "bg-[#B88E2F] text-white"
                                            : "bg-gray-200 text-gray-700"
                                    }`}
                                >
                                    {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                                </div>

                                <div
                                    className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                        msg.sender === "user"
                                            ? "bg-[#B88E2F] text-white rounded-tr-none shadow-sm"
                                            : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-start gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs shrink-0">
                                    <Bot size={14} />
                                </div>
                                <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none text-sm shadow-sm flex items-center gap-2 text-gray-500">
                                    <Loader2 size={16} className="animate-spin text-[#B88E2F]" />
                                    <span>FurniBot is thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Footer */}
                    <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask FurniBot anything..."
                            className="flex-1 bg-gray-100 text-gray-800 text-sm px-4 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-[#B88E2F]/30 focus:bg-white transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="bg-[#B88E2F] hover:bg-[#9c7827] text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer shrink-0"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
