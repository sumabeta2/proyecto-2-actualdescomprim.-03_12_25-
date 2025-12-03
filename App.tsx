import React, { useState } from 'react';
// IMPORTACIONES CORREGIDAS PARA TU CARPETA REAL
import { ActivationScreen } from './componentes/ActivationScreen';
import { PatientFormScreen } from './componentes/PatientFormScreen';
import { AssistanceScreen } from './componentes/AssistanceScreen';
import { SupportScreen } from './componentes/SupportScreen';
import { HistoryScreen } from './componentes/HistoryScreen';
import { AdminScreen } from './componentes/AdminScreen';
import { PatientData, RoleType } from './types';

const ADMIN_CODE = '561393';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'ACTIVATION' | 'PATIENT_FORM' | 'ASSISTANCE' | 'SUPPORT' | 'HISTORY' | 'ADMIN'>('ACTIVATION');
  const [isAdmin, setIsAdmin] = useState(false);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [userRole, setUserRole] = useState<RoleType>('PRIMER_RESPONDIENTE');

  const handleActivation = (code: string) => {
    if (code === ADMIN_CODE) setIsAdmin(true); else setIsAdmin(false);
    setCurrentScreen('PATIENT_FORM');
  };

  const handleStartAssistance = (data: PatientData, role: RoleType) => {
    setPatientData(data); setUserRole(role);
    setCurrentScreen('ASSISTANCE');
  };

  const handleLogout = () => {
    setPatientData(null); setIsAdmin(false);
    setCurrentScreen('ACTIVATION');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      {currentScreen === 'ACTIVATION' && <ActivationScreen onActivate={handleActivation} />}
      {currentScreen === 'PATIENT_FORM' && <PatientFormScreen isAdmin={isAdmin} onStartAssistance={handleStartAssistance} onLogout={handleLogout} onOpenSupport={() => setCurrentScreen('SUPPORT')} onOpenHistory={() => setCurrentScreen('HISTORY')} onOpenAdmin={() => setCurrentScreen('ADMIN')} />}
      {currentScreen === 'ASSISTANCE' && patientData && <AssistanceScreen patientData={patientData} userRole={userRole} onEndSession={() => setCurrentScreen('PATIENT_FORM')} />}
      {currentScreen === 'SUPPORT' && <SupportScreen onBack={() => setCurrentScreen('PATIENT_FORM')} />}
      {currentScreen === 'HISTORY' && <HistoryScreen onBack={() => setCurrentScreen('PATIENT_FORM')} onSelectCase={(data, role) => handleStartAssistance(data, role)} />}
      {currentScreen === 'ADMIN' && <AdminScreen onBack={() => setCurrentScreen('PATIENT_FORM')} />}
    </div>
  );
};

export default App;
