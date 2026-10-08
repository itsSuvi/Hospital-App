import { Hospital, PatientRecord, HealthRecordItem, EmergencyAlert, DrugItem, TraditionalMapping } from '../types';

export const initialHospitals: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'City Hospital (Civil Lines)',
    distance: '2.3 km',
    rating: 4.8,
    isOpen: true,
    address: 'Mall Road, Civil Lines, Kanpur, UP 208001',
    phone: '+91 512 230 4500',
    lat: 26.4715,
    lng: 80.3478,
    beds: {
      icu: 12,
      icuTotal: 30,
      general: 45,
      generalTotal: 120,
      emergency: 8,
      emergencyTotal: 20,
    },
    specialties: ['Cardiology', 'Neurology', 'General Medicine', 'Ayush Integrative Care'],
    features: ['24/7 Trauma Unit', 'AI-Triage System', 'Helipad', 'Oxygen Plant'],
    status: 'available',
    lastUpdated: '10 mins ago',
  },
  {
    id: 'hosp-2',
    name: 'Apollo Healthcare (Kakadeo)',
    distance: '4.1 km',
    rating: 4.7,
    isOpen: true,
    address: 'Geeta Nagar Crossing, Kakadeo, Kanpur, UP 208025',
    phone: '+91 512 258 9100',
    lat: 26.4852,
    lng: 80.3012,
    beds: {
      icu: 5,
      icuTotal: 25,
      general: 22,
      generalTotal: 80,
      emergency: 5,
      emergencyTotal: 15,
    },
    specialties: ['Orthopaedics', 'Pulmonology', 'Pediatrics', 'Oncology'],
    features: ['Robotic Surgery', 'Dialysis Centre', 'Blood Bank'],
    status: 'limited',
    lastUpdated: '5 mins ago',
  },
  {
    id: 'hosp-3',
    name: 'Max Super Speciality (Swaroop Nagar)',
    distance: '5.8 km',
    rating: 4.9,
    isOpen: true,
    address: 'Near Motijheel, Swaroop Nagar, Kanpur, UP 208002',
    phone: '+91 512 245 8899',
    lat: 26.4789,
    lng: 80.3204,
    beds: {
      icu: 2,
      icuTotal: 28,
      general: 4,
      generalTotal: 110,
      emergency: 2,
      emergencyTotal: 18,
    },
    specialties: ['Neurosurgery', 'Cardiac Sciences', 'Critical Care', 'Endocrinology'],
    features: ['Level-1 Trauma', 'ECMO Support', 'Advanced Cath Lab'],
    status: 'critical',
    lastUpdated: '2 mins ago',
  },
  {
    id: 'hosp-4',
    name: 'Kanpur Medical Centre (KMC)',
    distance: '3.6 km',
    rating: 4.6,
    isOpen: true,
    address: 'GT Road, Rawatpur, Kanpur, UP 208019',
    phone: '+91 512 221 3400',
    lat: 26.4910,
    lng: 80.2920,
    beds: {
      icu: 8,
      icuTotal: 20,
      general: 35,
      generalTotal: 75,
      emergency: 6,
      emergencyTotal: 12,
    },
    specialties: ['Gastroenterology', 'General Surgery', 'Dermatology'],
    features: ['Digital X-Ray', '24h Pharmacy', 'Ambulance GPS'],
    status: 'available',
    lastUpdated: '15 mins ago',
  },
  {
    id: 'hosp-5',
    name: 'AIIMS Satellite Centre / GSVM Medical',
    distance: '6.4 km',
    rating: 4.9,
    isOpen: true,
    address: 'Medical College Campus, Swaroop Nagar, Kanpur, UP 208002',
    phone: '+91 512 253 5483',
    lat: 26.4820,
    lng: 80.3150,
    beds: {
      icu: 15,
      icuTotal: 40,
      general: 60,
      generalTotal: 200,
      emergency: 10,
      emergencyTotal: 25,
    },
    specialties: ['Infectious Diseases', 'Multi-organ Transplant', 'Rheumatology', 'Vedic Integrative Medicine'],
    features: ['State Research Lab', 'Telemedicine Hub', 'Government Ayushman Desk'],
    status: 'available',
    lastUpdated: '1 min ago',
  }
];

export const initialPatients: PatientRecord[] = [
  {
    id: 'rec-1',
    patientId: 'P001',
    name: 'Rahul Sharma',
    age: 34,
    gender: 'Male',
    bloodGroup: 'B+',
    doctor: 'Dr. Mehta (Infectious Diseases)',
    traditionalDiagnosis: 'Vishama Jwara',
    modernDiagnosis: 'Malaria (Plasmodium vivax)',
    icdCode: '1F40.0',
    treatment: 'Paracetamol 500mg TDS + Chloroquine protocol + Supportive rehydration',
    date: '12 Sep 2026',
    status: 'Follow-up',
    vitals: {
      bp: '120/80 mmHg',
      pulse: '78 bpm',
      temp: '98.6 °F (post-treatment)',
      spO2: '99%'
    },
    notes: 'Patient responded well to standard antimalarial therapy. Platelet counts stabilized at 195,000/µL. Traditional Guduchi extract recommended adjunctively for convalescence.',
    prescriptions: ['Paracetamol 500mg (SOS)', 'Artesunate-based combo (Completed)', 'Electrolyte hydration sachets']
  },
  {
    id: 'rec-2',
    patientId: 'P002',
    name: 'Anita Gupta',
    age: 52,
    gender: 'Female',
    bloodGroup: 'O+',
    doctor: 'Dr. Sharma (Orthopaedics & Ayush)',
    traditionalDiagnosis: 'Sandhivata',
    modernDiagnosis: 'Osteoarthritis of Knee (Bilateral)',
    icdCode: 'FA00.0',
    treatment: 'NSAIDs (short course) + Yogaraj Guggulu + Physiotherapy quadriceps strengthening',
    date: '10 Sep 2026',
    status: 'Outpatient',
    vitals: {
      bp: '134/84 mmHg',
      pulse: '72 bpm',
      temp: '98.4 °F',
      spO2: '98%'
    },
    notes: 'Grade 2 joint space narrowing on bilateral knee X-Ray. Reported 40% reduction in morning stiffness with integrative Guggulu and localized Janu Basti therapy.',
    prescriptions: ['Yogaraj Guggulu 500mg BD', 'Glucosamine Sulfate 1500mg OD', 'Shallaki gel local application']
  },
  {
    id: 'rec-3',
    patientId: 'P003',
    name: 'Vikramaditya Verma',
    age: 46,
    gender: 'Male',
    bloodGroup: 'A+',
    doctor: 'Dr. S. K. Awasthi (Gastroenterology)',
    traditionalDiagnosis: 'Amlapitta',
    modernDiagnosis: 'Gastro-Oesophageal Reflux Disease (GERD Grade A)',
    icdCode: 'DA22',
    treatment: 'Proton Pump Inhibitors (Pantoprazole 40mg) + Avipattikar Churna + Dietary Modification',
    date: '08 Sep 2026',
    status: 'Outpatient',
    vitals: {
      bp: '128/82 mmHg',
      pulse: '76 bpm',
      temp: '98.2 °F',
      spO2: '99%'
    },
    notes: 'Endoscopy shows mild reflux esophagitis. Advised avoidance of late dinners and spicy foods.',
    prescriptions: ['Pantoprazole 40mg (OD before breakfast)', 'Avipattikar Churna 3g HS', 'Sucralfate syrup']
  },
  {
    id: 'rec-4',
    patientId: 'P004',
    name: 'Sunita Mishra',
    age: 61,
    gender: 'Female',
    bloodGroup: 'AB+',
    doctor: 'Dr. Priya Singhania (Endocrinology)',
    traditionalDiagnosis: 'Prameha (Madhumeha)',
    modernDiagnosis: 'Type 2 Diabetes Mellitus with Metabolic Syndrome',
    icdCode: '5A11',
    treatment: 'Metformin 1000mg ER + Vijaysar bark decoction + Low GI dietary plan',
    date: '04 Sep 2026',
    status: 'Follow-up',
    vitals: {
      bp: '136/88 mmHg',
      pulse: '74 bpm',
      temp: '98.6 °F',
      spO2: '97%'
    },
    notes: 'HbA1c reduced from 8.2% to 6.9% over 3 months. Renal function parameters normal (eGFR > 85).',
    prescriptions: ['Metformin 1000mg ER OD', 'Empagliflozin 10mg OD', 'Jambu seed powder']
  },
  {
    id: 'rec-5',
    patientId: 'P005',
    name: 'Aarav Dixit',
    age: 28,
    gender: 'Male',
    bloodGroup: 'B-',
    doctor: 'Dr. R. K. Saxena (Pulmonology)',
    traditionalDiagnosis: 'Tamaka Shwasa',
    modernDiagnosis: 'Bronchial Asthma (Moderate Persistent)',
    icdCode: 'CA23.0',
    treatment: 'Budesonide/Formoterol DPI inhaler + Sitopaladi Churna + Steam inhalation',
    date: '02 Sep 2026',
    status: 'Outpatient',
    vitals: {
      bp: '118/76 mmHg',
      pulse: '82 bpm',
      temp: '98.4 °F',
      spO2: '96%'
    },
    notes: 'Peak expiratory flow rate improved from 320 L/min to 460 L/min. Patient educated on inhaler technique.',
    prescriptions: ['Budecort/Formoterol 200/6 Rotacaps BD', 'Levocetirizine 5mg HS', 'Sitopaladi with Honey']
  }
];

export const initialHealthRecords: HealthRecordItem[] = [
  {
    id: 'hr-1',
    category: 'Diagnosis',
    title: 'Annual Health Checkup & Vitals Assessment',
    description: 'Comprehensive baseline evaluation conducted at Kanpur Metro Hospital Civil Lines branch. All major organ systems within physiological norms.',
    date: '12 Sep 2026',
    doctor: 'Dr. Mehta',
    hospital: 'City Hospital (Civil Lines)',
    metrics: [
      { label: 'Blood Pressure', value: '120/80 mmHg', status: 'normal' },
      { label: 'Heart Rate', value: '72 bpm', status: 'normal' },
      { label: 'BMI', value: '23.4 kg/m²', status: 'normal' }
    ]
  },
  {
    id: 'hr-2',
    category: 'Prescription',
    title: 'Acute Fever Treatment Protocol',
    description: 'Targeted antipyretic and antimicrobial therapy prescribed during symptomatic spike. Responsive course completed without adverse reactions.',
    date: '10 Sep 2026',
    doctor: 'Dr. Mehta',
    hospital: 'City Hospital (Civil Lines)',
    metrics: [
      { label: 'Medication', value: 'Paracetamol 500mg TDS', status: 'normal' },
      { label: 'Duration', value: '5 Days', status: 'normal' }
    ]
  },
  {
    id: 'hr-3',
    category: 'Lab Report',
    title: 'Complete Blood Count (CBC) & Metabolic Panel',
    description: 'Automated 5-part differential hematology analysis. Normal leukocyte counts and excellent platelet recovery post-fever episode.',
    date: '08 Sep 2026',
    doctor: 'Dr. Anurag Tandon (Pathology)',
    hospital: 'Kanpur Medical Diagnostic Central Lab',
    metrics: [
      { label: 'Hemoglobin', value: '14.2 g/dL', status: 'normal' },
      { label: 'WBC (Total)', value: '7,200 /µL', status: 'normal' },
      { label: 'Platelets', value: '240,000 /µL', status: 'normal' },
      { label: 'ESR (1st hr)', value: '12 mm', status: 'normal' }
    ]
  },
  {
    id: 'hr-4',
    category: 'Vaccination',
    title: 'Quadrivalent Influenza Vaccine (2026-27 Strain)',
    description: 'Single-dose intramuscular administration of seasonal quadrivalent inactivated influenza prophylaxis for urban respiratory protection.',
    date: '15 Aug 2026',
    doctor: 'Dr. Neha Chawla',
    hospital: 'Apollo Healthcare (Kakadeo)',
    metrics: [
      { label: 'Batch No.', value: 'INF-2026-X9', status: 'normal' },
      { label: 'Next Due', value: 'August 2027', status: 'normal' }
    ]
  }
];

export const initialAlerts: EmergencyAlert[] = [
  {
    id: 'alert-1',
    title: 'Dengue Outbreak Alert',
    severity: 'HIGH',
    category: 'Outbreak',
    description: 'Dengue cases have increased by 23% across monitored urban sectors (Kalyanpur, Kakadeo, and Barra). Intensive vector control protocols active.',
    affectedArea: 'Kalyanpur, Kakadeo, Barra Sectors',
    timestamp: '14 Mins ago',
    activeCases: 45,
    advisorySteps: [
      'Eliminate stagnant water in coolers and planters',
      'Use DEET/Picaridin mosquito repellents',
      'Seek prompt platelet testing upon high fever onset'
    ]
  },
  {
    id: 'alert-2',
    title: 'Malaria Cases Rising',
    severity: 'HIGH',
    category: 'Outbreak',
    description: 'Elevated Plasmodium vivax transmission detected in low-lying riparian areas near Ganga Barrage zone.',
    affectedArea: 'Ganga Barrage & Nawabganj belt',
    timestamp: '1 Hour ago',
    activeCases: 42,
    advisorySteps: [
      'Sleep under medicated bed nets',
      'Report cyclic chills and fever to primary care centre',
      'Free RDT diagnostic kits available at Civil Lines hospital'
    ]
  },
  {
    id: 'alert-3',
    title: 'Hospital Capacity Warning',
    severity: 'MEDIUM',
    category: 'Capacity',
    description: 'Max Super Speciality ICU currently operating near 92% capacity. Non-critical emergency triage rerouted to City Hospital.',
    affectedArea: 'Swaroop Nagar / Motijheel Corridor',
    timestamp: '2 Hours ago',
    advisorySteps: [
      'Direct urgent trauma to City Hospital Civil Lines',
      'Real-time bed tracker is synced every 60 seconds'
    ]
  },
  {
    id: 'alert-4',
    title: 'Seasonal Flu Advisory',
    severity: 'LOW',
    category: 'Advisory',
    description: 'Seasonal influenza activity is currently moderate across Kanpur Nagar with transition into autumn weather patterns.',
    affectedArea: 'Kanpur Metropolitan Region',
    timestamp: '5 Hours ago',
    activeCases: 38,
    advisorySteps: [
      'Hydrate with warm fluids and herbal decoctions',
      'Maintain basic respiratory etiquette',
      'Annual vaccination available at citizen clinics'
    ]
  }
];

export const initialInventory: DrugItem[] = [
  {
    id: 'med-1',
    medicine: 'Paracetamol 500mg',
    genericName: 'Acetaminophen BP',
    category: 'Allopathy',
    stock: 320,
    unit: 'Tablets',
    status: 'Adequate',
    minThreshold: 100,
    supplier: 'Cipla Healthcare Ltd.',
    batchNumber: 'PCM-26-890',
    expiryDate: '11/2028'
  },
  {
    id: 'med-2',
    medicine: 'Amoxicillin 250mg',
    genericName: 'Amoxicillin Trihydrate',
    category: 'Allopathy',
    stock: 80,
    unit: 'Capsules',
    status: 'Low',
    minThreshold: 120,
    supplier: 'Sun Pharma Ltd.',
    batchNumber: 'AMX-26-112',
    expiryDate: '04/2027'
  },
  {
    id: 'med-3',
    medicine: 'Guduchi Extract (Tinospora cordifolia)',
    genericName: 'Standardized Giloy Bio-extract',
    category: 'Ayurvedic',
    stock: 25,
    unit: 'Capsules',
    status: 'Critical',
    minThreshold: 80,
    supplier: 'Dabur Ayur-Intelligence',
    batchNumber: 'GUD-26-004',
    expiryDate: '08/2027'
  },
  {
    id: 'med-4',
    medicine: 'Arjuna Bark Powder (Terminalia arjuna)',
    genericName: 'Herbal Cardio-supportive Churna',
    category: 'Ayurvedic',
    stock: 60,
    unit: 'Packets (100g)',
    status: 'Adequate',
    minThreshold: 40,
    supplier: 'Patanjali Research Foundation',
    batchNumber: 'ARJ-26-781',
    expiryDate: '01/2028'
  },
  {
    id: 'med-5',
    medicine: 'Artesunate 60mg Injection',
    genericName: 'Sodium Artesunate for Severe Malaria',
    category: 'Emergency',
    stock: 42,
    unit: 'Vials',
    status: 'Adequate',
    minThreshold: 30,
    supplier: 'Ipca Laboratories',
    batchNumber: 'ART-26-904',
    expiryDate: '09/2027'
  },
  {
    id: 'med-6',
    medicine: 'Yogaraj Guggulu Tablets',
    genericName: 'Commiphora mukul Polyherbal',
    category: 'Ayurvedic',
    stock: 18,
    unit: 'Bottles (60 tab)',
    status: 'Critical',
    minThreshold: 50,
    supplier: 'Baidyanath Pharmaceuticals',
    batchNumber: 'YGG-26-339',
    expiryDate: '06/2028'
  },
  {
    id: 'med-7',
    medicine: 'Ceftriaxone 1g IV',
    genericName: 'Ceftriaxone Sodium Sterile',
    category: 'Allopathy',
    stock: 140,
    unit: 'Vials',
    status: 'Adequate',
    minThreshold: 60,
    supplier: 'Alkem Labs',
    batchNumber: 'CFT-26-441',
    expiryDate: '12/2027'
  },
  {
    id: 'med-8',
    medicine: 'Sitopaladi Churna',
    genericName: 'Traditional Respiratory Demulcent',
    category: 'Ayurvedic',
    stock: 75,
    unit: 'Bottles (120g)',
    status: 'Adequate',
    minThreshold: 50,
    supplier: 'Kottakkal Arya Vaidya Sala',
    batchNumber: 'STP-26-102',
    expiryDate: '03/2028'
  }
];

export const traditionalMappings: TraditionalMapping[] = [
  {
    id: 'map-1',
    traditionalTerm: 'Vishama Jwara',
    traditionalOrigin: 'Ayurveda',
    modernClinicalTerm: 'Malaria / Intermittent Febrile Illness',
    icd11Code: '1F40.0 (Plasmodium vivax malaria)',
    snomedCode: '61462000 (Malaria)',
    category: 'Infectious & Febrile Disorders',
    confidence: 94,
    doshaInvolvement: 'Tridoshaja with dominant Pitta & Vata vitiation localized in Rasa & Rakta Dhatu',
    clinicalContext: 'Characterized by irregular periodicity of fever spikes (Santata, Satata, Anyedyushka, Tritiyaka, Chaturthaka), chills, rigors, and post-febrile sweating, aligning precisely with cyclical erythrocytic schizogony.',
    modernDiagnosticMarkers: ['Peripheral blood smear ring forms', 'Rapid Antigen Test (Pf/Pv)', 'Platelet count monitoring'],
    firstLineManagement: 'Standard WHO ACT / Chloroquine protocol + supportive Guduchi (Giloy) decoction',
    contraindications: 'Avoid excessive warming therapeutics during acute hyperpyrexia phase'
  },
  {
    id: 'map-2',
    traditionalTerm: 'Amlapitta',
    traditionalOrigin: 'Ayurveda',
    modernClinicalTerm: 'Gastro-Oesophageal Reflux Disease (GERD) & Hyperacidity',
    icd11Code: 'DA22 (Gastro-oesophageal reflux disease)',
    snomedCode: '235595009 (Gastroesophageal reflux)',
    category: 'Gastroenterology & Digestive Health',
    confidence: 96,
    doshaInvolvement: 'Pitta Dosha vitiation with Vidagdha (fermented/hyperacidic) Pachaka Pitta in Annavaha Srotas',
    clinicalContext: 'Manifests as retrosternal burning (Hrit-Daha), sour eructations (Amla Udgara), nausea, and epigastric discomfort triggered by irregular dietary habits (Viruddha Ahara).',
    modernDiagnosticMarkers: ['Upper GI Endoscopy (Los Angeles Classification)', '24h Esophageal pH Impedance', 'H. pylori serology'],
    firstLineManagement: 'Proton Pump Inhibitors (PPIs) + Avipattikar Churna / Shatavari Ghrita',
    contraindications: 'Avoid late nocturnal meals, spicy/pungent food substances (Katu-Amla Rasas)'
  },
  {
    id: 'map-3',
    traditionalTerm: 'Prameha (Madhumeha)',
    traditionalOrigin: 'Ayurveda',
    modernClinicalTerm: 'Type 2 Diabetes Mellitus & Metabolic Syndrome',
    icd11Code: '5A11 (Type 2 diabetes mellitus)',
    snomedCode: '44054006 (Diabetes mellitus type 2)',
    category: 'Endocrine & Metabolic Disorders',
    confidence: 98,
    doshaInvolvement: 'Kapha & Medo Dhatu vitiation with secondary Vata progression in Mutravaha Srotas',
    clinicalContext: 'Features polyuria (Prabhuta Mutrata), turbid urine (Avil Mutrata), polydipsia, lethargy, and progressive microvascular involvement.',
    modernDiagnosticMarkers: ['Fasting Blood Glucose ≥ 126 mg/dL', 'HbA1c ≥ 6.5%', 'Lipid Profile & eGFR'],
    firstLineManagement: 'Metformin ER / SGLT2i + Vijaysar (Pterocarpus marsupium) & Karela-Jamun standardized extracts',
    contraindications: 'High glycaemic index carbohydrates, sedentary inactivity (Diwaswapna)'
  },
  {
    id: 'map-4',
    traditionalTerm: 'Sandhivata',
    traditionalOrigin: 'Ayurveda',
    modernClinicalTerm: 'Osteoarthritis of Joints (Degenerative Arthropathy)',
    icd11Code: 'FA00 (Osteoarthritis of hip or knee)',
    snomedCode: '396275006 (Osteoarthritis)',
    category: 'Musculoskeletal & Rheumatology',
    confidence: 93,
    doshaInvolvement: 'Vata Dosha localized in Asthi (bone) & Sandhi (articular capsules) with Shleshaka Kapha depletion',
    clinicalContext: 'Characterized by joint pain on movement (Vata Purna Driti Sparsha), crepitus on flexion, joint stiffness, and progressive cartilage loss without systemic inflammation.',
    modernDiagnosticMarkers: ['Weight-bearing X-Ray (Kellgren-Lawrence grading)', 'Joint space narrowing', 'Normal ESR/CRP'],
    firstLineManagement: 'Acetaminophen / Topical NSAIDs + Yogaraj Guggulu + Quadriceps rehabilitation',
    contraindications: 'Avoid cold exposure, prolonged weight-bearing squatting during acute flare-ups'
  },
  {
    id: 'map-5',
    traditionalTerm: 'Pandu Roga',
    traditionalOrigin: 'Ayurveda',
    modernClinicalTerm: 'Iron Deficiency Anaemia & Nutritional Anaemia',
    icd11Code: '3A00 (Iron deficiency anaemia)',
    snomedCode: '87522002 (Iron deficiency anaemia)',
    category: 'Hematology & Nutritional Health',
    confidence: 95,
    doshaInvolvement: 'Pitta Pradhana Tridoshaja affecting Rasa & Rakta Dhatu nourishment',
    clinicalContext: 'Clinical picture of pallor (Panduta), fatigue (Dourbalya), exertional palpitations (Hrid-Spandana), and glossitis corresponding to microcytic hypochromic indices.',
    modernDiagnosticMarkers: ['Serum Ferritin < 30 ng/mL', 'Microcytic hypochromic RBC on peripheral smear', 'Transferrin saturation < 20%'],
    firstLineManagement: 'Oral Ferrous Ascorbate + Punarnava Mandur / Dhatri Lauha formulations',
    contraindications: 'Co-ingestion of calcium supplements or tannin-rich tea with iron compounds'
  },
  {
    id: 'map-6',
    traditionalTerm: 'Tamaka Shwasa',
    traditionalOrigin: 'Ayurveda',
    modernClinicalTerm: 'Bronchial Asthma & Hyperactive Airway Disease',
    icd11Code: 'CA23.0 (Allergic asthma)',
    snomedCode: '195967001 (Asthma)',
    category: 'Pulmonology & Respiratory Medicine',
    confidence: 92,
    doshaInvolvement: 'Prana Vata obstructed by vitiated Kapha in the Pranavaha Srotas (Bronchial tree)',
    clinicalContext: 'Episodic paroxysmal dyspnoea, wheezing (Ghurghuruka), nocturnal worsening, relieved in sitting upright posture (Asino Labhate Saukhyam).',
    modernDiagnosticMarkers: ['Spirometry with bronchodilator reversibility (FEV1 > 12%)', 'Peak Expiratory Flow (PEF) variability'],
    firstLineManagement: 'Inhaled Corticosteroids + LABA + Sitopaladi Churna & Vasa (Adhatoda vasica) extract',
    contraindications: 'Exposure to sudden cold winds, unpasteurized cold dairy, dust allergens'
  }
];

export const healthEducationTopics = [
  {
    id: 'edu-1',
    title: 'Cardiology & Preventive Heart Health',
    subtitle: 'Understand cardiac metrics, arterial health, warning signs and early clinical interventions.',
    icon: 'HeartPulse',
    readTime: '6 min read',
    tags: ['Cardiology', 'Prevention', 'Hypertension'],
    highlights: [
      'Normal arterial blood pressure: 120/80 mmHg baseline threshold',
      'Recognizing early angina vs musculoskeletal chest pain signals',
      'Arjuna bark extract (Terminalia arjuna) co-benefits in endothelial lipid support',
      'Aerobic cardiac conditioning guidelines for urban working adults'
    ]
  },
  {
    id: 'edu-2',
    title: 'Integrative Nutrition & Metabolic Wellness',
    subtitle: 'Harmonizing Ayurvedic chronobiology (Dinacharya) with modern macronutrient science.',
    icon: 'Apple',
    readTime: '8 min read',
    tags: ['Nutrition', 'Ayurveda', 'Metabolism'],
    highlights: [
      'Circadian eating rhythms and digestive fire (Agni) optimization',
      'Low Glycaemic Index alternatives for North Indian staples',
      'Anti-inflammatory spice bioactives: Curcumin, Piperine, Gingerols',
      'Hydration formulas tailored for seasonal monsoon/summer shifts'
    ]
  },
  {
    id: 'edu-3',
    title: 'Mental Health & Sleep Neuroscience',
    subtitle: 'Evidence-based stress mitigation, circadian sleep hygiene, and emotional resilience.',
    icon: 'Brain',
    readTime: '5 min read',
    tags: ['Mental Health', 'Sleep', 'Neurology'],
    highlights: [
      'Cortisol curve regulation through blue-light reduction protocols',
      'Ashwagandha (Withania somnifera) role in GABAergic calm modulation',
      '4-7-8 diaphragmatic breathing for parasympathetic activation',
      'When to consult clinical psychologists vs general counselors'
    ]
  },
  {
    id: 'edu-4',
    title: 'Traditional Medicine & Modern Interoperability',
    subtitle: 'Explore traditional AYUSH diagnostic taxonomy and how digital health bridges it with ICD-11.',
    icon: 'BookOpen',
    readTime: '10 min read',
    tags: ['Interoperability', 'ICD-11', 'Medical Informatics'],
    highlights: [
      'How AI transforms classical Sanskrit pulse/symptom terms into FHIR standards',
      'Ensuring drug-herb interaction safety in dual-system prescriptions',
      'Why standardized medicinal coding unlocks global clinical research',
      'The National Digital Health Mission (ABDM) bridge blueprint'
    ]
  }
];
