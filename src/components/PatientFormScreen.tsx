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
  const [formData, setFormData] = useState<PatientData>({ name: '', age: '', sex: '', medication: '', history: '' });

  const isFormValid = formData.name.trim().length > 0 && formData.age.trim().length > 0 && selectedRole !== null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-20 border-b border-slate-100 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            {/* LOGO CABECERA CENTRADO */}
            <div className="relative w-10 h-10 flex items-center justify-center animate-heartbeat-slow">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-red-600"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute w-full h-full text-blue-600 scale-105"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              <span className="absolute text-white text-lg font-bold pb-0.5 select-none">S</span>
              <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 flex items-center justify-center opacity-80 pointer-events-none overflow-hidden rounded-full pt-1.5">
                <svg className="w-full h-4 scale-125" viewBox="0 0 500 100" preserveAspectRatio="none">
                   <path d="M0 50 L40 50 L50 20 L60 80 L70 50 L100 50 L110 50 L120 20 L130 80 L140 50 L180 50 L190 20 L200 80 L210 50 L250 50 L260 20 L270 80 L280 50 L320 50 L330 20 L340 80 L350 50 L500 50" fill="none" stroke="#22c55e" strokeWidth="20" className="animate-ecg-flow" style={{ strokeDasharray: '500', strokeDashoffset: '500' }} />
                </svg>
              </div>
            </div>
            <span className="font-extrabold text-lg text-slate-800">SUMA</span>
        </div>
        <div className="flex gap-2">
            <button onClick={onOpenHistory} className="flex gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase shadow-sm hover:bg-blue-700 transition-colors"><FileText className="w-4"/> VER HISTORIAL</button>
            {isAdmin && <button onClick={onOpenAdmin} className="flex gap-1 bg-black text-red-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase shadow-md justify-center hover:bg-gray-900 transition-colors"><Shield className="w-4"/> ADMON</button>}
            <button onClick={onLogout} className="flex gap-1 text-slate-600 font-bold text-xs items-center uppercase hover:text-red-600 transition-colors"><LogOut className="w-4"/> SALIR</button>
        </div>
      </header>
      <div className="bg-slate-200 py-1 text-center"><span className="text-red-600 font-black text-xs uppercase tracking-[0.2em]">NUEVO CASO</span></div>
      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-6 space-y-8">
        
        {/* SECCIÓN ROLES */}
        <section className="space-y-2">
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider border-l-4 border-red-600 pl-2">Mi Rol</h3>
            <div className="grid grid-cols-2 gap-3">
                {(['MEDICO', 'ENFERMERO', 'PARAMEDICO', 'PRIMER_RESPONDIENTE'] as RoleType[]).map((role) => (
                  <button key={role} onClick={() => setSelectedRole(role)} className={`p-4 rounded-xl font-bold text-sm uppercase border-2 transition-all ${selectedRole === role ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-[1.02]' : 'bg-white text-slate-700 border-transparent hover:bg-slate-50'}`}>{role.replace('_', ' ')}</button>
                ))}
            </div>
        </section>

        {/* SECCIÓN DATOS */}
        <section className="space-y-3">
            <h3 className="text-slate-500 font-bold text-sm uppercase tracking-wider border-l-4 border-blue-600 pl-2">Datos del Paciente/Víctima</h3>
            <div className="bg-white p-5 rounded-xl space-y-4 shadow-sm border border-slate-100">
                <input name="name" placeholder="NOMBRE COMPLETO *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                
                <input name="age" type="number" placeholder="EDAD *" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                
                {/* SELECT SEXO: Placeholder GRIS, Opción NEGRA */}
                <div className="relative">
                    <select name="sex" value={formData.sex} onChange={e => setFormData({...formData, sex: e.target.value})} 
                        className={`w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none ${formData.sex ? 'text-black' : 'text-slate-400'}`}>
                        <option value="" disabled className="text-slate-300">SEXO</option>
                        <option value="M" className="text-black">MASCULINO</option>
                        <option value="F" className="text-black">FEMENINO</option>
                    </select>
                </div>

                <input name="medication" placeholder="MEDICACIÓN" value={formData.medication} onChange={e => setFormData({...formData, medication: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                
                <textarea name="history" placeholder="ANTECEDENTES" value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase text-black placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
            </div>
        </section>

        <button disabled={!isFormValid} onClick={() => selectedRole && onStartAssistance(formData, selectedRole)} className="w-full py-4 bg-red-600 text-white rounded-xl font-black uppercase disabled:bg-slate-300 shadow-lg hover:bg-red-700 transition-all active:scale-[0.98]">INICIAR ASISTENCIA</button>
        
        {/* BOTÓN SOPORTE AZUL */}
        <button onClick={onOpenSupport} className="w-full py-4 bg-blue-600 text-white font-bold uppercase flex justify-center items-center gap-2 rounded-xl hover:bg-blue-700 transition-colors shadow-md active:scale-[0.98]">
            <HelpCircle className="w-6 h-6"/> Soporte Técnico
        </button>
      </main>
    </div>
  );
};
