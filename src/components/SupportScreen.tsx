import React, { useState, useRef, useEffect } from 'react';
import { Send, XCircle, Bot, User, LifeBuoy, Mail } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface SupportScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hola, soy el Soporte Técnico de SUMA. ¿En qué puedo ayudarte sobre el uso de la aplicación?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `
          Eres el Agente de Soporte Técnico de la aplicación "SUMA".
          TU OBJETIVO: Ayudar al usuario EXCLUSIVAMENTE con dudas sobre cómo usar la app.
          FUNCIONES DE LA APP QUE PUEDES EXPLICAR: Activación, Formulario, Roles, Asistencia IA.
          REGLAS: NO des consejos médicos. Sé amable, breve y técnico.
        `;
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: { systemInstruction, temperature: 0.3 },
        });
        chatSessionRef.current = chat;
      } catch (error) {
        console.error("Error iniciando Gemini Support:", error);
      }
    };
    initChat();
  }, []);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return;
    const newUserMessage: Message = { id: Date.now(), text: inputMessage, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);
    try {
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessage({ message: newUserMessage.text });
        setMessages(prev => [...prev, { id: Date.now() + 1, text: result.text || "No se recibió respuesta.", sender: 'bot', timestamp: new Date() }]);
      } else {
         setMessages(prev => [...prev, { id: Date.now() + 1, text: "Error de conexión con el soporte.", sender: 'bot', timestamp: new Date() }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Error de conexión.", sender: 'bot', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  // v2.3 Suggestions Button Logic
  const handleSuggestion = () => {
      const subject = encodeURIComponent("Sugerencia para App SUMA");
      const body = encodeURIComponent(`Hola Ramón,\n\nTengo la siguiente sugerencia para la App:\n\n\nDatos técnicos:\nCódigo Usuario: [Auto-Generado]\nVersión: v2.3`);
      window.open(`mailto:contacto@ramondelgado.online?subject=${subject}&body=${body}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col font-sans">
      <header className="bg-blue-900 text-white shadow-md sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2"><LifeBuoy className="w-6 h-6 text-blue-300" /><span className="font-bold text-lg tracking-wide">SOPORTE TÉCNICO</span></div>
          <button onClick={onBack} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-800 hover:bg-blue-700 text-sm font-medium transition-colors border border-blue-700"><XCircle className="w-4 h-4" /><span>Cerrar</span></button>
        </div>
      </header>
      <main className="flex-grow w-full max-w-3xl mx-auto p-4 flex flex-col space-y-4 overflow-y-auto pb-40">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm mt-1 ${msg.sender === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-blue-600 text-white'}`}>
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-blue-800 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-blue-100 rounded-tl-none'}`}>{msg.text}</div>
            </div>
          </div>
        ))}
      </main>
      
      {/* FOOTER AREA v2.3 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 z-30 flex flex-col">
         {/* Suggestion Button - Light Blue */}
         <div className="w-full bg-sky-50 px-4 py-2 flex justify-center border-b border-blue-100">
             <button onClick={handleSuggestion} className="flex items-center gap-2 bg-sky-200 text-sky-900 px-6 py-2 rounded-lg font-bold text-xs uppercase hover:bg-sky-300 transition-colors shadow-sm">
                 <Mail className="w-4 h-4" /> SUGERENCIAS
             </button>
         </div>

         {/* Chat Input */}
         <div className="p-4 max-w-3xl mx-auto w-full flex gap-2">
            <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="Escribe tu duda..." className="flex-grow px-4 py-3 bg-slate-100 border-0 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-slate-400 font-medium" />
            <button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-md"><Send className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );
};
