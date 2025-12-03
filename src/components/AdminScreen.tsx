import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';

export const AdminScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col font-sans">
      <header className="bg-slate-950 p-4 shadow-sm flex gap-3 items-center"><button onClick={onBack}><ArrowLeft/></button><h1 className="font-black">ADMINISTRACIÓN</h1></header>
      <div className="p-4 text-center text-slate-500 mt-10"><Shield className="w-12 h-12 mx-auto mb-2"/>Panel de control</div>
    </div>
  );
};