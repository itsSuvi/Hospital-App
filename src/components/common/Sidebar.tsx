import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Bot,
  FileText,
  BedDouble,
  AlertOctagon,
  GraduationCap,
  Users,
  Activity,
  BarChart3,
  Pill,
  Binary,
  LifeBuoy,
  Settings,
  LogOut,
  X,
  Shield,
  Layers
} from 'lucide-react';

interface SidebarProps {
  type: 'citizen' | 'staff';
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: string;
  badgeType?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  type,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const citizenNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/citizen/dashboard', icon: LayoutDashboard },
    { label: 'Find Hospitals', path: '/citizen/hospitals', icon: MapPin },
    { label: 'AI Health Assistant', path: '/citizen/assistant', icon: Bot, badge: 'AI' },
    { label: 'My Health Records', path: '/citizen/records', icon: FileText },
    { label: 'Bed Availability', path: '/citizen/beds', icon: BedDouble },
    { label: 'Emergency Alerts', path: '/citizen/alerts', icon: AlertOctagon, badge: '4 New', badgeType: 'alert' },
    { label: 'Health Education', path: '/citizen/education', icon: GraduationCap },
  ];

  const staffNavItems: NavItem[] = [
    { label: 'Dashboard', path: '/staff/dashboard', icon: LayoutDashboard },
    { label: 'Patient Records', path: '/staff/patients', icon: Users },
    { label: 'Bed Management', path: '/staff/beds', icon: BedDouble },
    { label: 'Disease Analytics', path: '/staff/analytics', icon: BarChart3 },
    { label: 'Drug Inventory', path: '/staff/inventory', icon: Pill },
    { label: 'Medicinal Code Engine', path: '/staff/medicinal-code', icon: Binary, badge: 'Star' },
  ];

  const navItems = type === 'citizen' ? citizenNavItems : staffNavItems;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-navy-950/80 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-900/95 border-r border-white/10 backdrop-blur-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Top Header */}
        <div>
          <div className="h-20 px-6 border-b border-white/10 flex items-center justify-between">
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className={`w-9 h-9 rounded-xl p-0.5 shadow-md flex items-center justify-center ${
                type === 'citizen'
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600'
                  : 'bg-gradient-to-br from-cyan-400 to-teal-500'
              }`}>
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Activity className={`w-5 h-5 ${type === 'citizen' ? 'text-purple-400' : 'text-cyan-400'}`} />
                </div>
              </div>
              <div>
                <span className="font-heading font-bold text-sm tracking-wide text-white block">
                  KANPUR METRO
                </span>
                <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                  type === 'citizen' ? 'text-purple-300' : 'text-cyan-300'
                }`}>
                  {type === 'citizen' ? 'Citizen Portal' : 'Hospital Admin'}
                </span>
              </div>
            </NavLink>

            {/* Close button for mobile */}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cross-Portal Quick Switcher */}
          <div className="px-4 py-3 border-b border-white/[0.06]">
            <div className="bg-navy-950/70 border border-white/10 rounded-xl p-1.5 flex items-center justify-between text-xs">
              <NavLink
                to="/citizen/dashboard"
                className={`flex-1 py-1.5 text-center font-medium rounded-lg transition-all ${
                  type === 'citizen'
                    ? 'bg-purple-600/30 text-purple-200 border border-purple-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Citizen
              </NavLink>
              <NavLink
                to="/staff/dashboard"
                className={`flex-1 py-1.5 text-center font-medium rounded-lg transition-all ${
                  type === 'staff'
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Staff Admin
              </NavLink>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpenMobile(false)}
                  className={`
                    flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group
                    ${
                      isActive
                        ? type === 'citizen'
                          ? 'bg-purple-600/25 text-purple-200 border border-purple-500/40 shadow-lg shadow-purple-900/20 font-semibold'
                          : 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-lg shadow-cyan-950/30 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive
                          ? type === 'citizen'
                            ? 'text-purple-300'
                            : 'text-cyan-300'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        item.badgeType === 'alert'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                          : type === 'citizen'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Utility & Session Footer */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between px-2 py-1 text-xs text-slate-400">
            <span className="flex items-center space-x-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Grid Status</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-mono font-medium">99.98% Synced</span>
          </div>

          <div className="flex items-center space-x-1 pt-1">
            <button
              onClick={() => navigate(type === 'citizen' ? '/citizen/assistant' : '/staff/medicinal-code')}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-cyan-400" />
              <span>Help & Support</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors border border-white/5"
              title="Logout / Exit to Home"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
