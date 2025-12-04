import React, { useState } from 'react';
import { ArrowLeft, Search, Trash2, Shield, Clock, Calendar, X, User, Smartphone, Monitor } from 'lucide-react';
import { AccessCode } from '../types';

interface AdminScreenProps {
  onBack: () => void;
}

export const AdminScreen: React.FC<AdminScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'24H' | 'MONTHLY'>('24H');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCode, setSelectedCode] = useState<AccessCode | null>(null);
  
  // Simulated Data with v2.3 Requirements
  const [codes, setCodes] = useState<AccessCode[]>([
    { 
      code: '012345', 
      type: '24H', 
      status: 'AVAILABLE' as any, // 24H starts available
      createdAt: new Date().toISOString(), 
      expiresAt: new Date(Date.now() + 86400000).toISOString() 
    },
    { 
      code: '098765', 
      type: '24H', 
      status: 'USED' as any, 
      createdAt: new Date().toISOString(), 
      expiresAt: new Date(Date.now() + 86400000).toISOString(),
      assignedTo: 'Carlos Ruiz',
      phoneNumber: '+58 412 123 4567',
      deviceId: 'IMEI-X92-3321',
      activatedAt: new Date().toISOString()
    },
    { 
      code: '123456', 
      type: 'MONTHLY', 
      status: 'ACTIVE', 
      createdAt: new Date().toISOString(), 
      expiresAt: new Date(Date.now() + 86400000 * 31).toISOString(),
      assignedTo: 'Dra. Ana Lopez',
      phoneNumber: '+58 414 987 6543',
      deviceId: 'IMEI-A11-9988',
      activatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]);

  const handleDelete = (code: string) => {
    setCodes(codes.filter(c => c.code !== code));
  };

  const toggleStatus = (code: string) => {
    setCodes(codes.map(c => {
        if (c.code === code) {
            return { ...c, status: c.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' };
        }
        return c;
    }));
  };

  const filteredCodes = codes.filter(c => {
      // 24H logic: Starts with 0
      if (activeTab === '24H') return c.type === '24H' && c.code.startsWith('0');
      // Monthly logic: NOT starts with 0
      if (activeTab === 'MONTHLY') return c.type === 'MONTHLY' && !c.code.startsWith('0');
      return false;
  }).filter(c => c.code.includes(searchTerm) || c.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans text-slate-200">
      <header className="bg-slate-950 shadow-md sticky top-0 z-20 border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors"><ArrowLeft className="w-6 h-6" /></button>
          <div className="flex-1"><h1 className="font-black text-lg text-white uppercase tracking-wide flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500" /> ADMINISTRACIÓN</h1></div>
        </div>
      </header>

      {/* TABS v2.3: Mint (24H) & Gray (Monthly) */}
      <div className="bg-slate-950 px-4 py-4 sticky top-[60px] z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex gap-4">
          <button onClick={() => setActiveTab('24H')} className={`flex-1 py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-lg ${activeTab === '24H' ? 'bg-emerald-400 text-white ring-2 ring-emerald-400/50' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}>
             24 HORAS
          </button>
          <button onClick={() => setActiveTab('MONTHLY')} className={`flex-1 py-4 rounded-xl font-black text-sm uppercase tracking-wide transition-all shadow-lg ${activeTab === 'MONTHLY' ? 'bg-gray-500 text-white ring-2 ring-gray-500/50' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}>
             MENSUAL
          </button>
        </div>
        <div className="max-w-3xl mx-auto mt-4 relative">
          <input type="text" placeholder="BUSCAR CÓDIGO..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold tracking-widest" />
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />
        </div>
      </div>

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-4 space-y-3">
        {filteredCodes.map((item) => (
          <div key={item.code} onClick={() => setSelectedCode(item)} className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center justify-between cursor-pointer hover:bg-slate-750 transition-colors group">
            <div>
                <h3 className="font-black text-2xl text-white tracking-widest font-mono group-hover:text-blue-400 transition-colors">{item.code}</h3>
                <div className="flex items-center gap-2 mt-1">
                    {activeTab === '24H' ? (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'AVAILABLE' || item.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                            {item.status === 'AVAILABLE' || item.status === 'ACTIVE' ? 'DISPONIBLE' : 'USADO'}
                        </span>
                    ) : (
                         <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'ACTIVE' ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            {item.status === 'ACTIVE' ? 'ACTIVO' : 'INACTIVO'}
                        </span>
                    )}
                </div>
            </div>
            
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {activeTab === '24H' && (
                     <button onClick={() => handleDelete(item.code)} className="p-3 bg-slate-900 text-red-500 rounded-lg hover:bg-red-900/20 transition-colors border border-slate-700"><Trash2 className="w-5 h-5" /></button>
                )}
                {activeTab === 'MONTHLY' && (
                     <button onClick={() => toggleStatus(item.code)} className={`px-4 py-2 rounded-lg font-bold text-xs ${item.status === 'ACTIVE' ? 'bg-red-900/30 text-red-400 border border-red-900' : 'bg-emerald-900/30 text-emerald-400 border border-emerald-900'}`}>
                        {item.status === 'ACTIVE' ? 'DESACTIVAR' : 'ACTIVAR'}
                     </button>
                )}
            </div>
          </div>
        ))}
        {filteredCodes.length === 0 && <div className="text-center py-10 text-slate-600 font-bold">NO HAY CÓDIGOS</div>}
      </main>

      {/* MODAL DETALLES v2.3 */}
      {selectedCode && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 w-full max-w-lg rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
                <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
                    <h2 className="font-black text-xl text-white flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500"/> DETALLES DE ACCESO</h2>
                    <button onClick={() => setSelectedCode(null)}><X className="w-6 h-6 text-slate-400 hover:text-white"/></button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <div className="text-4xl font-mono font-black text-white tracking-[0.2em] mb-2">{selectedCode.code}</div>
                        <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-bold text-slate-400 border border-slate-700">
                             {selectedCode.type === '24H' ? 'ACCESO TEMPORAL (24H)' : 'ACCESO MENSUAL (31 DÍAS)'}
                        </div>
                    </div>
                    
                    {/* 3 COLUMNS INFO */}
                    <div className="grid grid-cols-1 gap-4 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-start gap-3">
                            <Calendar className="w-5 h-5 text-emerald-400 mt-1"/>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase">FECHA Y HORA</p>
                                <p className="text-sm font-semibold text-white">{selectedCode.activatedAt ? new Date(selectedCode.activatedAt).toLocaleString() : 'Pendiente'}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <User className="w-5 h-5 text-blue-400 mt-1"/>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase">USUARIO</p>
                                <p className="text-sm font-semibold text-white">{selectedCode.assignedTo || 'Sin asignar'}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Smartphone className="w-5 h-5 text-purple-400 mt-1"/>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase">TELÉFONO</p>
                                <p className="text-sm font-semibold text-white">{selectedCode.phoneNumber || '---'}</p>
                            </div>
                        </div>
                    </div>

                    {/* DEVICE BINDING SIMULATION */}
                    <div className="bg-black/30 p-4 rounded-xl border border-slate-800">
                         <div className="flex items-center gap-2 mb-2">
                            <Monitor className="w-4 h-4 text-red-500"/>
                            <p className="text-xs font-black text-red-500 uppercase">DISPOSITIVO VINCULADO (IMEI)</p>
                         </div>
                         <p className="font-mono text-xs text-slate-300 break-all">{selectedCode.deviceId || 'No vinculado aún'}</p>
                         <p className="text-[10px] text-slate-500 mt-2 leading-tight">Este código está atado a este dispositivo. No funcionará en otro equipo.</p>
                    </div>
                </div>
                <div className="p-4 bg-slate-950 border-t border-slate-800">
                    <button onClick={() => setSelectedCode(null)} className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors">CERRAR</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
