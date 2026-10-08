import React from 'react';
import { Menu, Bell, Shield, HeartPulse, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  type: 'citizen' | 'staff';
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  type,
  onOpenMobileMenu,
}) => {
  return (
    <header className="sticky top-0 z-30 h-20 bg-navy-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
      {/* Left side title and hamburger */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 lg:hidden border border-white/10"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg sm:text-2xl font-bold font-heading text-white tracking-tight flex items-center space-x-2">
            <span>{title}</span>
            {type === 'staff' && (
              <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                ADMIN ACCESS
              </span>
            )}
          </h1>
          {subtitle && (
            <p className="text-xs text-slate-400 font-sans hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right side user info & alerts */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Quick Alert Bell */}
        <NavLink
          to={type === 'citizen' ? '/citizen/alerts' : '/staff/analytics'}
          className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-all group"
        >
          <Bell className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </NavLink>

        {/* User Card */}
        {type === 'citizen' ? (
          <div className="flex items-center space-x-3 bg-white/5 border border-purple-500/20 rounded-xl px-3 py-1.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-semibold text-xs shadow-md">
              RS
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">
                Rahul Sharma
              </div>
              <div className="text-[10px] text-purple-300 font-mono">
                citizen@test.com
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 bg-white/5 border border-cyan-500/20 rounded-xl px-3 py-1.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-navy-950 font-bold text-xs shadow-md">
              DR
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-white leading-tight">
                Dr. R. Mehta (Admin)
              </div>
              <div className="text-[10px] text-cyan-300 font-mono">
                City Hospital Desk
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
