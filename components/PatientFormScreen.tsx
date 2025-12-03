import React, { useState } from 'react';
import { User, LogOut, HelpCircle, FileText, Shield } from 'lucide-react';
import { RoleType, PatientData } from '../types';

interface PatientFormScreenProps {
  isAdmin: boolean;
  onStartAssistance: (data: PatientData, role: RoleType) => void;
  onLogout: () => void;
  onOpenSupport: () => void;
  onOpenHistory: () => void;
  onOpenAdmin: () => void;
}

export const PatientFormScreen: React.FC<PatientFormScreenProps> = ({ isAdmin, onStartAssistance, onLogout, onOpenSupport, onOpenHistory, onOpenAdmin }) => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: '',
    sex: '',
    medication: '',
    history: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name.trim().length > 0 && formData.age.trim().length > 0 && selectedRole !== null;

  const handleSubmit = () => {
    if (isFormValid && selectedRole) {
      onStartAssistance(formData, selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10 flex items-center justify-center animate-heartbeat-slow">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-red-600 drop-shadow-sm"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute w-full h-full text-blue-600 pointer-events-none scale-105"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              <span className="absolute text-white text-lg font-bold font-sans pb-0.5 shadow-sm">S</span>
              <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none overflow-hidden rounded-full w-8 h-8 mx-auto mt-1"><svg className="w-full h-4" viewBox="0 0 500 100" preserveAspectRatio="none"><path d="M0 50 L40 50 L50 20 L60 80 L70 50 L100 50 L110 50 L120 20 L130 80 L140 50 L180 50 L190 20 L200 80 L210 50 L250 50 L260 20 L270 80 L280 50 L320 50 L330 20 L340 80 L350 50 L500 50" fill="none" stroke="#22c55e" strokeWidth="15" className="animate-ecg-flow" style={{ strokeDasharray: '500', strokeDashoffset: '500' }} /></svg></div>
            </div>
            <span className="font-extrabold text-lg text-slate-800 tracking-wider">SUMA</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onOpenHistory} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm font-medium transition-colors shadow-sm"><FileText className="w-4 h-4" /><span className="font-bold uppercase">VER HISTORIAL</span></button>
            {isAdmin && <button onClick={onOpenAdmin} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black border border-black text-red-500 hover:bg-gray-900 text-xs sm:text-sm font-medium shadow-md transition-colors"><Shield className="w-4 h-4" /><span className="font-bold uppercase">ADMON</span></button>}
            <button onClick={onLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold transition-colors uppercase ml-1"><LogOut className="w-4 h-4" /><span className="sr-only sm:not-sr-only">SALIR</span></button>
          </div>
        </div>
      </header>
      <div className="bg-slate-200 py-1 text-center border-b border-slate-300"><span className="text-red-600 font-black text-xs uppercase tracking-[0.2em]">NUEVO CASO</span></div>
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-6 space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-slate-800 border-b-2 border-slate-100 pb-2"><User className="w-5 h-5 text-red-600" /><h2 className="text-xl font-black tracking-wide uppercase">MI ROL ES: <span className="text-red-500">*</span></h2></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {(['MEDICO', 'ENFERMERO', 'PARAMEDICO', 'PRIMER_RESPONDIENTE'] as RoleType[]).map((role) => (
              <button key={role} onClick={() => setSelectedRole(role)} className={`p-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all duration-200 shadow-sm border-2 uppercase ${selectedRole === role ? 'bg-red-600 text-white border-red-600 shadow-red-200 scale-[1.02]' : 'bg-white text-slate-700 border-transparent hover:border-red-100 hover:bg-slate-50'}`}>
                {role === 'MEDICO' && 'MÉDICO'}{role === 'ENFERMERO' && 'ENFERMERO'}{role === 'PARAMEDICO' && 'PARAMÉDICO'}{role === 'PRIMER_RESPONDIENTE' && '1er RESPONDIENTE'}
              </button>
            ))}
          </div>
          {!selectedRole && <p className="text-xs text-red-500 font-bold text-center uppercase animate-pulse">* Debes seleccionar un rol para continuar</p>}
        </section>
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-black text-slate-800 border-b border-slate-100 pb-3 uppercase">DATOS DEL PACIENTE / VÍCTIMA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-600 uppercase tracking-wide">NOMBRE COMPLETO <span className="text-red-500">*</span></label><input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold uppercase" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase tracking-wide">EDAD <span className="text-red-500">*</span></label><input type="number" name="age" value={formData.age} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold" /></div>
            <div className="space-y-1.5"><label className="text-xs font-bold text-slate-600 uppercase tracking-wide">SEXO</label><select name="sex" value={formData.sex} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold uppercase appearance-none"><option value="">SELECCIONAR...</option><option value="M">MASCULINO</option><option value="F">FEMENINO</option><option value="O">OTRO</option></select></div>
            <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-600 uppercase tracking-wide">MEDICACIÓN ACTUAL</label><input type="text" name="medication" value={formData.medication} onChange={handleInputChange} placeholder="EJ: INSULINA, HIPERTENSIVOS..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold uppercase" /></div>
            <div className="space-y-1.5 md:col-span-2"><label className="text-xs font-bold text-slate-600 uppercase tracking-wide">ANTECEDENTES DE SALUD</label><textarea name="history" value={formData.history} onChange={handleInputChange} rows={2} placeholder="EJ: DIABETES, CIRUGÍAS PREVIAS..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all font-bold uppercase resize-none" /></div>
          </div>
        </section>
      </main>
      <footer className="p-4 bg-white border-t border-slate-200 sticky bottom-0 z-20 space-y-3">
        <div className="max-w-3xl mx-auto space-y-3">
          <button disabled={!isFormValid} onClick={handleSubmit} className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-widest shadow-lg transition-all duration-200 ${isFormValid ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-red-500/40 active:scale-[0.98]' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}>INICIAR ASISTENCIA</button>
          <button onClick={onOpenSupport} className="w-full py-2.5 rounded-lg border border-blue-600 bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center justify-center gap-2"><HelpCircle className="w-4 h-4" /> Soporte Técnico</button>
        </div>
      </footer>
    </div>
  );
};