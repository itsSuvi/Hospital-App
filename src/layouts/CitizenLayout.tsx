import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';

export const CitizenLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/citizen/dashboard':
        return { title: 'Welcome back, Citizen', subtitle: "Here's your healthcare overview for today." };
      case '/citizen/hospitals':
        return { title: 'Find Hospitals', subtitle: 'Discover nearby healthcare facilities and real-time bed availability.' };
      case '/citizen/assistant':
        return { title: 'AI Health Assistant', subtitle: 'AI-assisted symptom analysis and clinical triage.' };
      case '/citizen/records':
        return { title: 'My Health Records', subtitle: 'Your encrypted lifetime electronic health history.' };
      case '/citizen/beds':
        return { title: 'Real-Time Bed Availability', subtitle: 'Live capacity tracking across all Kanpur Metro partner facilities.' };
      case '/citizen/alerts':
        return { title: 'Emergency & Health Alerts', subtitle: 'Active epidemiological surveillance notifications.' };
      case '/citizen/education':
        return { title: 'Health Education', subtitle: 'Integrative medical guides, wellness, and traditional knowledge.' };
      default:
        return { title: 'Citizen Portal', subtitle: 'Kanpur Metro Connected Health Grid' };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex min-h-screen bg-[#061426]">
      {/* Sidebar */}
      <Sidebar
        type="citizen"
        isOpenMobile={mobileMenuOpen}
        setIsOpenMobile={setMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header
          title={pageInfo.title}
          subtitle={pageInfo.subtitle}
          type="citizen"
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
