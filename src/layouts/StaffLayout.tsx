import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';

export const StaffLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/staff/dashboard':
        return { title: 'City Hospital Admin', subtitle: 'Hospital operations, bed analytics & disease surveillance' };
      case '/staff/patients':
        return { title: 'Patient Records', subtitle: 'Cross-system clinical records with traditional-modern terminology mappings' };
      case '/staff/beds':
        return { title: 'Bed Management', subtitle: 'Interactive live capacity adjustment & 24h occupancy trends' };
      case '/staff/analytics':
        return { title: 'Disease Outbreak Analytics', subtitle: 'Vector-borne disease density heatmap and multi-month case trajectories' };
      case '/staff/inventory':
        return { title: 'Drug Inventory', subtitle: 'Allopathic, Ayurvedic & Emergency pharmaceutical stocks' };
      case '/staff/medicinal-code':
        return { title: 'Medicinal Code Conversion Engine', subtitle: 'AI-assisted bridge between traditional medical terminology and modern clinical terminology' };
      default:
        return { title: 'Hospital Admin Portal', subtitle: 'Kanpur Metro Clinical Operations' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex min-h-screen bg-[#061426]">
      {/* Sidebar */}
      <Sidebar
        type="staff"
        isOpenMobile={mobileMenuOpen}
        setIsOpenMobile={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          type="staff"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
