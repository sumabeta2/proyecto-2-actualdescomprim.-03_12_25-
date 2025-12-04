export interface FileMetadata {
  name: string;
  status: 'pending' | 'ready' | 'error';
  lastModified: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  RECOVERY_MODE = 'RECOVERY_MODE',
  ACTIVE = 'ACTIVE'
}

export type RoleType = 'MEDICO' | 'ENFERMERO' | 'PARAMEDICO' | 'PRIMER_RESPONDIENTE';

export interface PatientData {
  name: string;
  age: string;
  sex: string;
  medication: string;
  history: string;
}

export interface ClinicalCase {
  id: string;
  patientName: string;
  date: string;
  diagnosis_summary: string;
  isProtected: boolean;
  data: PatientData;
  roleUsed: RoleType;
}

export interface AccessCode {
  code: string;
  type: '24H' | 'MONTHLY';
  // Updated status types for v2.3 logic
  status: 'ACTIVE' | 'BLOCKED' | 'EXPIRED' | 'AVAILABLE' | 'USED';
  createdAt: string;
  expiresAt: string;
  // New fields for v2.3 binding logic
  assignedTo?: string; // Name
  phoneNumber?: string;
  deviceId?: string; // IMEI simulation
  activatedAt?: string;
}
