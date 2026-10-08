export interface Hospital {
  id: string;
  name: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  beds: {
    icu: number;
    icuTotal: number;
    general: number;
    generalTotal: number;
    emergency: number;
    emergencyTotal: number;
  };
  specialties: string[];
  features: string[];
  status: 'available' | 'limited' | 'critical';
  lastUpdated: string;
}

export interface PatientRecord {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  doctor: string;
  traditionalDiagnosis?: string;
  modernDiagnosis: string;
  icdCode?: string;
  treatment: string;
  date: string;
  status: 'Admitted' | 'Discharged' | 'Follow-up' | 'Outpatient';
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    spO2: string;
  };
  notes: string;
  prescriptions: string[];
}

export interface HealthRecordItem {
  id: string;
  category: 'Diagnosis' | 'Prescription' | 'Lab Report' | 'Vaccination';
  title: string;
  description: string;
  date: string;
  doctor: string;
  hospital: string;
  metrics?: { label: string; value: string; status?: 'normal' | 'attention' }[];
  fileUrl?: string;
}

export interface EmergencyAlert {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'Outbreak' | 'Capacity' | 'Advisory' | 'Emergency';
  description: string;
  affectedArea: string;
  timestamp: string;
  advisorySteps: string[];
  activeCases?: number;
}

export interface DrugItem {
  id: string;
  medicine: string;
  genericName: string;
  category: 'Allopathy' | 'Ayurvedic' | 'Emergency' | 'Surgical';
  stock: number;
  unit: string;
  status: 'Adequate' | 'Low' | 'Critical';
  minThreshold: number;
  supplier: string;
  batchNumber: string;
  expiryDate: string;
}

export interface TraditionalMapping {
  id: string;
  traditionalTerm: string;
  traditionalOrigin: 'Ayurveda' | 'Siddha' | 'Unani';
  modernClinicalTerm: string;
  icd11Code: string;
  snomedCode: string;
  category: string;
  confidence: number;
  doshaInvolvement: string;
  clinicalContext: string;
  modernDiagnosticMarkers: string[];
  firstLineManagement: string;
  contraindications: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  relatedTopic?: string;
  clinicalCitation?: string;
  suggestedActions?: string[];
}
