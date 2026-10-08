import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HelpCircle, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

export const LandingNavbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-navy-950/75 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-3.5 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
              <Activity className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-white">
                KANPUR METRO
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                HEALTH
              </span>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400 inline mr-0.5" />
              <span>Secure digital health ecosystem</span>
            </p>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/citizen/assistant"
            className="hidden md:flex items-center space-x-1.5 text-xs text-slate-300 hover:text-cyan-300 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>Need help?</span>
          </Link>

          <Link
            to="/citizen/dashboard"
            className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-white bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded-xl transition-all shadow-lg shadow-purple-600/20 hover:scale-[1.02]"
          >
            <UserCheck className="w-4 h-4 text-purple-300" />
            <span>Citizen Portal</span>
          </Link>

          <Link
            to="/staff/dashboard"
            className="flex items-center space-x-2 px-4 py-2 text-xs font-semibold text-navy-950 bg-gradient-to-r from-cyan-400 to-teal-300 hover:from-cyan-300 hover:to-teal-200 rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:scale-[1.02]"
          >
            <Stethoscope className="w-4 h-4 text-navy-900" />
            <span className="hidden sm:inline">Staff Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
};
