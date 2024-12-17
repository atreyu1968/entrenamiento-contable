import React, { useState } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: '¡Bienvenido al Sistema de Entrenamiento Contable! Soy tu profesor virtual. ¿En qué puedo ayudarte?', 
      isUser: false 
    }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInput('');
    
    // Placeholder for OpenAI integration
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: 'Esta es una respuesta de ejemplo. La integración con OpenAI se implementará en una fase posterior.',
        isUser: false
      }]);
    }, 1000);
  };

  return (
    <>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="text-sm font-medium">Profesor Virtual</span>
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          <div className="p-4 bg-orange-500 text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              <h3 className="font-semibold">Profesor Virtual</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-orange-600 p-1 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
      
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.isUser
                    ? 'ml-auto bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
      
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Escribe tu pregunta..."
                className="flex-1 p-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
              />
              <button
                onClick={() => sendMessage(input)}
                className="p-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}