import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { GlassCard } from '../../components/common/GlassCard';
import {
  BedDouble,
  Plus,
  Minus,
  Save,
  Activity,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const occupancyTrendData = [
  { time: '6 AM', icu: 14, general: 65, emergency: 10 },
  { time: '9 AM', icu: 18, general: 90, emergency: 14 },
  { time: '12 PM', icu: 22, general: 110, emergency: 17 },
  { time: '3 PM', icu: 25, general: 104, emergency: 15 },
  { time: '6 PM', icu: 20, general: 88, emergency: 13 },
  { time: '9 PM', icu: 16, general: 76, emergency: 11 },
];

export const BedManagement: React.FC = () => {
  const { staffBeds, updateBedCount, saveBedChanges } = useHospital();

  const totalBeds = staffBeds.icu + staffBeds.general + staffBeds.emergency;

  return (
    <div className="space-y-8">
      {/* Top Banner with Save Action */}
      <GlassCard className="p-6 border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-navy-900/60 to-teal-950/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <BedDouble className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Live Bed Capacity Control Panel
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Adjust available beds in real-time. Changes are instantly published across the citizen portal and emergency dispatch ambulance network.
            </p>
          </div>

          <button
            onClick={saveBedChanges}
            className="self-start sm:self-center px-6 py-3 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 text-navy-950 font-heading font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/30 flex items-center space-x-2 hover:scale-[1.02] transition-all shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>Save & Broadcast to Grid</span>
          </button>
        </div>
      </GlassCard>

      {/* 3 Interactive Counter Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-heading text-white">
            Departmental Bed Allocation Counters
          </h3>
          <span className="text-xs font-mono text-cyan-400">
            Total Available: {totalBeds} Beds
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ICU Counter */}
          <GlassCard className="p-6 flex flex-col justify-between space-y-4 border-cyan-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ICU Ward
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                CRITICAL CARE
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <button
                onClick={() => updateBedCount('icu', -1)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 flex items-center justify-center transition-all active:scale-95 shadow-md"
                title="Decrease ICU Bed"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="text-5xl font-black font-heading text-cyan-300">
                  {staffBeds.icu}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Available Beds</div>
              </div>

              <button
                onClick={() => updateBedCount('icu', 1)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 flex items-center justify-center transition-all active:scale-95 shadow-md"
                title="Increase ICU Bed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-400 text-center pt-2 border-t border-white/5 font-mono">
              Max Capacity: 30 Beds
            </div>
          </GlassCard>

          {/* General Ward Counter */}
          <GlassCard className="p-6 flex flex-col justify-between space-y-4 border-emerald-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                General Ward
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                INPATIENT CARE
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <button
                onClick={() => updateBedCount('general', -1)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 flex items-center justify-center transition-all active:scale-95 shadow-md"
                title="Decrease General Ward Bed"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="text-5xl font-black font-heading text-emerald-300">
                  {staffBeds.general}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Available Beds</div>
              </div>

              <button
                onClick={() => updateBedCount('general', 1)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 flex items-center justify-center transition-all active:scale-95 shadow-md"
                title="Increase General Ward Bed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-400 text-center pt-2 border-t border-white/5 font-mono">
              Max Capacity: 120 Beds
            </div>
          </GlassCard>

          {/* Emergency Counter */}
          <GlassCard className="p-6 flex flex-col justify-between space-y-4 border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Emergency & Trauma
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                24/7 TRIAGE
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <button
                onClick={() => updateBedCount('emergency', -1)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/40 flex items-center justify-center transition-all active:scale-95 shadow-md"
                title="Decrease Emergency Bed"
              >
                <Minus className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="text-5xl font-black font-heading text-purple-300">
                  {staffBeds.emergency}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">Available Beds</div>
              </div>

              <button
                onClick={() => updateBedCount('emergency', 1)}
                className="w-12 h-12 rounded-2xl bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-300 border border-white/10 hover:border-purple-500/40 flex items-center justify-center transition-all active:scale-95 shadow-md"
                title="Increase Emergency Bed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-400 text-center pt-2 border-t border-white/5 font-mono">
              Max Capacity: 20 Beds
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Bed Occupancy Trend using Recharts LineChart */}
      <GlassCard className="p-6 space-y-4 border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-white text-lg flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Bed Occupancy Trend (24h Trajectory)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Hourly admissions tracking across ICU, General and Emergency wards.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Peak Occupancy: 12 PM - 3 PM</span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={occupancyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#081C2F',
                  borderColor: 'rgba(37, 197, 233, 0.3)',
                  borderRadius: '0.75rem',
                  color: '#F8FBFF',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#94A3B8' }} />
              <Line
                type="monotone"
                dataKey="general"
                name="General Ward"
                stroke="#22C55E"
                strokeWidth={3}
                dot={{ r: 4, fill: '#22C55E' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="icu"
                name="ICU"
                stroke="#25C5E9"
                strokeWidth={3}
                dot={{ r: 4, fill: '#25C5E9' }}
                activeDot={{ r: 7 }}
              />
              <Line
                type="monotone"
                dataKey="emergency"
                name="Emergency"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#8B5CF6' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
