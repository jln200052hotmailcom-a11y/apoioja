
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { startChat, streamChat } from '../services/geminiService';
import { BotIcon, SendIcon, UserIcon } from './icons';
import { Chat } from '@google/genai';

const ChatbotPage: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        // Initialize chat on component mount
        const initialHistory: ChatMessage[] = [];
        const newChat = startChat(initialHistory);
        setChat(newChat);
        setMessages([
            { role: 'model', parts: [{ text: 'Olá! Sou o assistente virtual do ApoioJá. Estou aqui para te ouvir e oferecer um espaço seguro para conversar. Como você está se sentindo hoje?' }] }
        ]);
    }, []);

    const handleSendMessage = useCallback(async () => {
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: ChatMessage = {
            role: 'user',
            parts: [{ text: input }],
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await streamChat(chat, input);
            let modelResponse = '';
            
            // Add a placeholder for the model's response
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                // Update the last message (the model's response) in the array
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: modelResponse }] };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [
                ...prev,
                { role: 'model', parts: [{ text: 'Desculpe, ocorreu um erro. Por favor, tente novamente.' }] },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, chat]);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] max-w-4xl mx-auto bg-white shadow-2xl rounded-t-lg border border-gray-200">
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                            {msg.role === 'model' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"><BotIcon /></div>}
                            <div className={`max-w-md md:max-w-lg p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-100 rounded-br-none' : 'bg-gray-100 rounded-bl-none'}`}>
                                <p className="text-gray-800 whitespace-pre-wrap">{msg.parts[0].text}</p>
                            </div>
                            {msg.role === 'user' && <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><UserIcon/></div>}
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex items-start gap-4">
                             <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"><BotIcon /></div>
                            <div className="max-w-md p-4 rounded-2xl bg-gray-100 rounded-bl-none">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all transform hover:scale-110"
                    >
                        <SendIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage;
