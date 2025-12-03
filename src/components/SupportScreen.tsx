import React, { useState } from 'react';
import { Send, XCircle, Bot, User, LifeBuoy } from 'lucide-react';

export const SupportScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState([{ id: 1, text: "Hola, soy Soporte Técnico. ¿En qué te ayudo?", sender: 'bot' }]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    setTimeout(() => setMessages(prev => [...prev, { id: Date.now()+1, text: "Gracias por tu mensaje. Un técnico te responderá pronto.", sender: 'bot' }]), 1000);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2"><LifeBuoy/><span className="font-bold">SOPORTE</span></div>
        <button onClick={onBack} className="flex gap-1 items-center bg-blue-800 px-3 py-1 rounded"><XCircle className="w-4"/> Cerrar</button>
      </header>
      <main className="flex-grow p-4 space-y-4 overflow-y-auto pb-20">
        {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[80%] text-sm ${m.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-800'}`}>{m.text}</div>
            </div>
        ))}
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-grow bg-slate-100 p-3 rounded-xl" placeholder="Escribe..." />
        <button onClick={send} className="p-3 bg-blue-600 text-white rounded-xl"><Send className="w-5"/></button>
      </div>
    </div>
  );
};