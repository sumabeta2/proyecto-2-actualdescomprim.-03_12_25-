import React from 'react';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';
import { PatientData, RoleType } from '../types';

export const HistoryScreen: React.FC<{ onBack: () => void, onSelectCase: (d: PatientData, r: RoleType, date: string) => void }> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white p-4 shadow-sm flex gap-3 items-center"><button onClick={onBack}><ArrowLeft/></button><h1 className="font-black">HISTORIAL</h1></header>
      <div className="p-4"><div className="bg-yellow-50 p-3 rounded-lg flex gap-2"><AlertTriangle className="text-yellow-600"/><p className="text-xs text-yellow-800">Casos se borran en 30 días.</p></div></div>
      <div className="p-4 text-center text-slate-400 mt-10"><FileText className="w-12 h-12 mx-auto mb-2"/>Sin casos recientes</div>
    </div>
  );
};