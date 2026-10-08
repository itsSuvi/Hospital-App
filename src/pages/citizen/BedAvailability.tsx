import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import {
  BedDouble,
  Clock,
  RefreshCw,
  Search,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const BedAvailability: React.FC = () => {
  const { hospitals, showToast } = useHospital();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'available' | 'limited' | 'critical'>('All');

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.address.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'All' || h.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    showToast('Polling live bed telemetry from Kanpur Metro Hospital Server...', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Refresh Bar */}
      <GlassCard className="p-4 sm:p-5 border-emerald-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search facility name or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-navy-950/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Statuses</option>
              <option value="available">Available (Green)</option>
              <option value="limited">Limited (Orange)</option>
              <option value="critical">Critical (Red)</option>
            </select>

            <button
              onClick={handleRefresh}
              className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs text-cyan-300 flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Grid</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Hospital Rows */}
      <div className="space-y-5">
        {filteredHospitals.map((hosp) => {
          const icuOccupiedPct = Math.round(
            ((hosp.beds.icuTotal - hosp.beds.icu) / hosp.beds.icuTotal) * 100
          );
          const generalOccupiedPct = Math.round(
            ((hosp.beds.generalTotal - hosp.beds.general) / hosp.beds.generalTotal) * 100
          );
          const emergencyOccupiedPct = Math.round(
            ((hosp.beds.emergencyTotal - hosp.beds.emergency) / hosp.beds.emergencyTotal) * 100
          );

          return (
            <GlassCard
              key={hosp.id}
              className="p-5 sm:p-6 space-y-5 border-white/[0.08] hover:border-emerald-500/30 transition-all"
            >
              {/* Facility Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-heading font-bold text-lg text-white">
                      {hosp.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300">
                    {hosp.address} • <span className="text-cyan-300 font-mono font-semibold">{hosp.distance}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge
                    variant={
                      hosp.status === 'available'
                        ? 'success'
                        : hosp.status === 'limited'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {hosp.status === 'available'
                      ? 'GREEN • AVAILABLE'
                      : hosp.status === 'limited'
                      ? 'ORANGE • LIMITED'
                      : 'RED • CRITICAL'}
                  </Badge>
                  <div className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{hosp.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* 3 Horizontal Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* ICU Bar */}
                <div className="bg-navy-950/70 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">ICU Capacity</span>
                    <span className="font-mono text-cyan-300 font-bold">
                      {hosp.beds.icu} Free ({icuOccupiedPct}% Occupied)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-navy-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        icuOccupiedPct > 85
                          ? 'bg-rose-500 shadow-[0_0_8px_#EF4444]'
                          : icuOccupiedPct > 60
                          ? 'bg-amber-400'
                          : 'bg-cyan-400'
                      }`}
                      style={{ width: `${icuOccupiedPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Available: {hosp.beds.icu}</span>
                    <span>Total: {hosp.beds.icuTotal}</span>
                  </div>
                </div>

                {/* General Ward Bar */}
                <div className="bg-navy-950/70 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">General Ward</span>
                    <span className="font-mono text-emerald-300 font-bold">
                      {hosp.beds.general} Free ({generalOccupiedPct}% Occupied)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-navy-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        generalOccupiedPct > 85
                          ? 'bg-rose-500 shadow-[0_0_8px_#EF4444]'
                          : generalOccupiedPct > 60
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${generalOccupiedPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Available: {hosp.beds.general}</span>
                    <span>Total: {hosp.beds.generalTotal}</span>
                  </div>
                </div>

                {/* Emergency Bar */}
                <div className="bg-navy-950/70 p-4 rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">Emergency & Trauma</span>
                    <span className="font-mono text-purple-300 font-bold">
                      {hosp.beds.emergency} Free ({emergencyOccupiedPct}% Occupied)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-navy-900 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        emergencyOccupiedPct > 85
                          ? 'bg-rose-500 shadow-[0_0_8px_#EF4444]'
                          : emergencyOccupiedPct > 60
                          ? 'bg-amber-400'
                          : 'bg-purple-400'
                      }`}
                      style={{ width: `${emergencyOccupiedPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Available: {hosp.beds.emergency}</span>
                    <span>Total: {hosp.beds.emergencyTotal}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
