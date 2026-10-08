import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Hospital,
  PatientRecord,
  HealthRecordItem,
  EmergencyAlert,
  DrugItem,
  TraditionalMapping,
  ChatMessage
} from '../types';
import {
  initialHospitals,
  initialPatients,
  initialHealthRecords,
  initialAlerts,
  initialInventory,
  traditionalMappings
} from '../data/mockData';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  duration?: number;
}

interface HospitalContextType {
  hospitals: Hospital[];
  patients: PatientRecord[];
  healthRecords: HealthRecordItem[];
  alerts: EmergencyAlert[];
  inventory: DrugItem[];
  mappings: TraditionalMapping[];
  chatMessages: ChatMessage[];
  isAiTyping: boolean;
  toasts: Toast[];
  
  // Bed counters for City Hospital Admin
  staffBeds: {
    icu: number;
    general: number;
    emergency: number;
  };
  
  // Actions
  updateBedCount: (category: 'icu' | 'general' | 'emergency', delta: number) => void;
  saveBedChanges: () => void;
  sendAiMessage: (text: string) => Promise<void>;
  addHealthRecord: (record: Omit<HealthRecordItem, 'id'>) => void;
  restockDrug: (id: string, amount: number) => void;
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  searchMapping: (query: string) => Promise<TraditionalMapping | null>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);
  const [healthRecords, setHealthRecords] = useState<HealthRecordItem[]>(initialHealthRecords);
  const [alerts, setAlerts] = useState<EmergencyAlert[]>(initialAlerts);
  const [inventory, setInventory] = useState<DrugItem[]>(initialInventory);
  const [mappings] = useState<TraditionalMapping[]>(traditionalMappings);
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const [staffBeds, setStaffBeds] = useState({
    icu: 12,
    general: 45,
    emergency: 8,
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm your Kanpur Metro AI Health Assistant. How can I help you today? You can ask me about symptoms, bed availability, medicine dosages, or traditional diagnosis interpretations.",
      timestamp: 'Just now',
      suggestedActions: [
        'I have fever and headache',
        'Explain Vishama Jwara',
        'What hospitals near me have beds?',
        'What are the symptoms of dengue?'
      ]
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  const showToast = (message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateBedCount = (category: 'icu' | 'general' | 'emergency', delta: number) => {
    setStaffBeds((prev) => {
      const nextVal = Math.max(0, prev[category] + delta);
      return { ...prev, [category]: nextVal };
    });
  };

  const saveBedChanges = () => {
    // Sync with City Hospital in hospitals list
    setHospitals((prev) =>
      prev.map((h) => {
        if (h.id === 'hosp-1') {
          return {
            ...h,
            beds: {
              ...h.beds,
              icu: staffBeds.icu,
              general: staffBeds.general,
              emergency: staffBeds.emergency,
            },
            lastUpdated: 'Just now',
          };
        }
        return h;
      })
    );
    showToast('Hospital bed capacity synced successfully to live network!', 'success');
  };

  const addHealthRecord = (recordData: Omit<HealthRecordItem, 'id'>) => {
    const newRecord: HealthRecordItem = {
      ...recordData,
      id: `hr-${Date.now()}`
    };
    setHealthRecords((prev) => [newRecord, ...prev]);
    showToast('Health record uploaded and securely encrypted on Kanpur Metro Grid!', 'success');
  };

  const restockDrug = (id: string, amount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newStock = item.stock + amount;
          const status = newStock > item.minThreshold ? 'Adequate' : newStock > 30 ? 'Low' : 'Critical';
          return { ...item, stock: newStock, status };
        }
        return item;
      })
    );
    showToast(`Restocked inventory item successfully (+${amount} units)`, 'success');
  };

  const searchMapping = async (query: string): Promise<TraditionalMapping | null> => {
    const cleanQuery = query.toLowerCase().trim();
    const found = mappings.find(
      (m) =>
        m.traditionalTerm.toLowerCase().includes(cleanQuery) ||
        m.modernClinicalTerm.toLowerCase().includes(cleanQuery) ||
        m.category.toLowerCase().includes(cleanQuery)
    );
    return found || null;
  };

  const sendAiMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiTyping(true);

    // Simulate AI response synthesis
    setTimeout(() => {
      let reply = '';
      let citation = '';
      let suggestedActions: string[] | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('fever') || lower.includes('headache')) {
        reply = `Based on your symptoms (fever and headache), this could indicate a seasonal viral infection, dengue, or malaria given the active urban alerts in Kanpur.
        
**Recommended Immediate Actions:**
1. Hydrate with plenty of oral fluids and electrolytes.
2. Monitor your temperature every 4 hours. You may take Paracetamol 500mg if required (avoid NSAIDs like Aspirin/Ibuprofen until dengue is ruled out).
3. If fever persists over 48 hours or is accompanied by severe eye pain, rash, or chills, visit City Hospital or AIIMS Centre for a Complete Blood Count (CBC) and NS1 antigen test.`;
        citation = 'ICMR Clinical Management Protocol for Acute Febrile Illness 2026';
        suggestedActions = ['What hospitals near me have beds?', 'Explain Vishama Jwara', 'Explain my lab report'];
      } else if (lower.includes('vishama') || lower.includes('jwara')) {
        reply = `**Vishama Jwara (विषम ज्वर)** is the classical Ayurvedic classification for intermittent and irregular febrile illnesses, which directly maps to **Malaria / Intermittent Plasmodium Infections** (ICD-11: 1F40.0).

**Key Clinical Insights:**
- Characterized by periodic spike patterns (Santata, Tritiyaka, Chaturthaka).
- In modern clinical practice, diagnosis is confirmed via Peripheral Blood Smear or Rapid Diagnostic Test (RDT).
- Traditional supportive herbs like **Guduchi (Giloy)** are recognized for immunomodulatory support alongside standard antimalarial ACT protocols.`;
        citation = 'Medicinal Code Engine — AYUSH-ICD11 Dual Ontology Bridge';
        suggestedActions = ['View Medicinal Code Engine', 'Find Hospitals with ICU'];
      } else if (lower.includes('bed') || lower.includes('hospital')) {
        reply = `Here is the current live bed availability summary across Kanpur Metro network:
- **City Hospital (Civil Lines)**: 12 ICU, 45 General, 8 Emergency Beds (**Available**)
- **Apollo Healthcare (Kakadeo)**: 5 ICU, 22 General, 5 Emergency Beds (**Limited**)
- **GSVM / AIIMS Satellite**: 15 ICU, 60 General, 10 Emergency Beds (**Available**)
- **Max Super Speciality**: High occupancy (ICU near critical).

Would you like me to reserve an emergency triage ticket or navigate to the interactive map?`;
        citation = 'Kanpur Metro Integrated Bed Registry (Live Sync)';
        suggestedActions = ['Open Hospital Map', 'Emergency Alerts'];
      } else if (lower.includes('dengue')) {
        reply = `**Dengue Fever Clinical Overview:**
- **Key Symptoms**: Sudden high grade fever (104°F), retro-orbital eye pain, severe joint/muscle ache ("break-bone fever"), petechial rash.
- **Critical Warning Signs**: Persistent abdominal pain, recurrent vomiting, mucosal bleeding, sudden drop in platelet count below 50,000/µL.
- **Precaution**: Rest, adequate oral rehydration, and vector avoidance in Kalyanpur & Kakadeo sectors where alert level is HIGH.`;
        citation = 'National Center for Vector Borne Diseases Control (NCVBDC)';
        suggestedActions = ['View Emergency Alerts', 'I have fever and headache'];
      } else if (lower.includes('lab') || lower.includes('report')) {
        reply = `Looking at your latest Complete Blood Count (CBC) record from Kanpur Medical Diagnostic Lab (08 Sep 2026):
- **Hemoglobin**: 14.2 g/dL (Normal Range: 13.5 - 17.5 g/dL) ✅
- **Total WBC**: 7,200 /µL (Normal Range: 4,000 - 11,000 /µL) ✅
- **Platelets**: 240,000 /µL (Healthy baseline; recovered from recent infection) ✅

Your hematological profile indicates healthy marrow production and resolved inflammation.`;
        citation = 'Kanpur Metro Electronic Health Record P001 Sync';
        suggestedActions = ['Upload New Lab Report', 'My Health Records'];
      } else {
        reply = `I have analyzed your query through the Kanpur Metro Medical Knowledge Base and RAG pipeline. 

For tailored clinical guidance, please specify your symptoms, search a diagnostic term like "Amlapitta" or "Sandhivata", or ask for live bed counts and nearby emergency facilities.

*Disclaimer: Kanpur Metro AI is designed for informational and triage guidance only. In severe emergencies, immediately dial 108 or visit your nearest emergency room.*`;
        citation = 'Kanpur Metro Clinical Intelligence AI v2.4';
        suggestedActions = ['I have fever and headache', 'Explain Vishama Jwara', 'What hospitals near me have beds?'];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clinicalCitation: citation,
        suggestedActions
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 900);
  };

  return (
    <HospitalContext.Provider
      value={{
        hospitals,
        patients,
        healthRecords,
        alerts,
        inventory,
        mappings,
        chatMessages,
        isAiTyping,
        toasts,
        staffBeds,
        updateBedCount,
        saveBedChanges,
        sendAiMessage,
        addHealthRecord,
        restockDrug,
        showToast,
        removeToast,
        searchMapping,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
