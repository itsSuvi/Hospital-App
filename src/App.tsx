import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HospitalProvider } from './context/HospitalContext';
import { ToastContainer } from './components/common/ToastContainer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CitizenLayout } from './layouts/CitizenLayout';
import { StaffLayout } from './layouts/StaffLayout';

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { FindHospitals } from './pages/citizen/FindHospitals';
import { AiAssistant } from './pages/citizen/AiAssistant';
import { MyRecords } from './pages/citizen/MyRecords';
import { BedAvailability } from './pages/citizen/BedAvailability';
import { EmergencyAlerts } from './pages/citizen/EmergencyAlerts';
import { HealthEducation } from './pages/citizen/HealthEducation';

// Staff Pages
import { StaffDashboard } from './pages/staff/StaffDashboard';
import { PatientRecords } from './pages/staff/PatientRecords';
import { BedManagement } from './pages/staff/BedManagement';
import { DiseaseAnalytics } from './pages/staff/DiseaseAnalytics';
import { DrugInventory } from './pages/staff/DrugInventory';
import { MedicinalCodeEngine } from './pages/staff/MedicinalCodeEngine';

export const App: React.FC = () => {
  return (
    <HospitalProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Citizen Portal Routes */}
          <Route path="/citizen" element={<CitizenLayout />}>
            <Route index element={<Navigate to="/citizen/dashboard" replace />} />
            <Route path="dashboard" element={<CitizenDashboard />} />
            <Route path="hospitals" element={<FindHospitals />} />
            <Route path="assistant" element={<AiAssistant />} />
            <Route path="records" element={<MyRecords />} />
            <Route path="beds" element={<BedAvailability />} />
            <Route path="alerts" element={<EmergencyAlerts />} />
            <Route path="education" element={<HealthEducation />} />
          </Route>

          {/* Hospital Staff Portal Routes */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route index element={<Navigate to="/staff/dashboard" replace />} />
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="patients" element={<PatientRecords />} />
            <Route path="beds" element={<BedManagement />} />
            <Route path="analytics" element={<DiseaseAnalytics />} />
            <Route path="inventory" element={<DrugInventory />} />
            <Route path="medicinal-code" element={<MedicinalCodeEngine />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Floating Toast Notifications */}
        <ToastContainer />
      </Router>
    </HospitalProvider>
  );
};

export default App;
