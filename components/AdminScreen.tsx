import React, { useState } from 'react';
import { ArrowLeft, Search, Trash2, Power, Shield, Clock, Calendar } from 'lucide-react';
import { AccessCode } from '../types';

interface AdminScreenProps {
  onBack: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'24H' | 'MONTHLY'>('24H');
  const [searchTerm, setSearchTerm] = useState('');
  const [codes, setCodes] = useState<AccessCode[]>([
    { code: '012345', type: '24H', status: 'ACTIVE', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86400000).toISOString() },
    { code: '123456', type: 'MONTHLY', status: 'ACTIVE', createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86400000 * 31).toISOString() }
  ]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
      <header className="bg-slate-950 shadow-md sticky top-0 z-20 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft className="w-6 h-6" /></button>
          <div className="flex-1"><h1 className="font-black text-lg text-white uppercase tracking-wide flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500" /> ADMINISTRACIÓN</h1></div>
        </div>
      </header>
      <div className="bg-slate-950 px-4 py-4 sticky top-[60px] z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex gap-4">
          <button onClick={() => setActiveTab('24H')} className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all border-2 flex items-center justify-center gap-2 ${activeTab === '24H' ? 'bg-red-600 border-red-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}><Clock className="w-4 h-4" /> 24 HORAS (0...)</button>
          <button onClick={() => setActiveTab('MONTHLY')} className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all border-2 flex items-center justify-center gap-2 ${activeTab === 'MONTHLY' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}><Calendar className="w-4 h-4" /> MENSUAL</button>
        </div>
        <div className="max-w-3xl mx-auto mt-4 relative">
          <input type="text" placeholder="BUSCAR CÓDIGO..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold tracking-widest" />
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
        </div>
      </div>
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-4 space-y-3">
        {codes.filter(c => c.type === activeTab).map((item) => (
          <div key={item.code} className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between">
            <div><h3 className="font-black text-2xl text-white tracking-widest font-mono">{item.code}</h3><span className="text-[10px] text-slate-500 font-medium">Expira: {new Date(item.expiresAt).toLocaleDateString()}</span></div>
            <div className="flex items-center gap-2"><button className="p-3 bg-slate-900 text-red-500 rounded-lg hover:bg-red-900/20 transition-colors border border-slate-700"><Trash2 className="w-5 h-5" /></button></div>
          </div>
        ))}
      </main>
    </div>
  );
};