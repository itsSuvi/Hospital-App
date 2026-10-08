import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import { MetricCard } from '../../components/common/MetricCard';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import {
  Users,
  BedDouble,
  Activity,
  AlertTriangle,
  BarChart3,
  Pill,
  Binary,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

const bedOccupancyData = [
  { time: '06:00', icu: 14, general: 70, emergency: 12 },
  { time: '09:00', icu: 18, general: 95, emergency: 15 },
  { time: '12:00', icu: 22, general: 108, emergency: 18 },
  { time: '15:00', icu: 24, general: 102, emergency: 16 },
  { time: '18:00', icu: 21, general: 88, emergency: 14 },
  { time: '21:00', icu: 19, general: 75, emergency: 12 },
];

export const StaffDashboard: React.FC = () => {
  const { patients, alerts, staffBeds, inventory } = useHospital();
  const navigate = useNavigate();

  const totalStaffAvailableBeds = staffBeds.icu + staffBeds.general + staffBeds.emergency;

  const quickAccessModules = [
    {
      title: 'Patient Records',
      desc: 'Dual taxonomy AYUSH-ICD clinical histories',
      icon: Users,
      path: '/staff/patients',
      color: 'cyan',
    },
    {
      title: 'Bed Management',
      desc: 'Live capacity adjustment & 24h counters',
      icon: BedDouble,
      path: '/staff/beds',
      color: 'teal',
    },
    {
      title: 'Disease Analytics',
      desc: 'Outbreak density heatmap & trajectories',
      icon: BarChart3,
      path: '/staff/analytics',
      color: 'purple',
    },
    {
      title: 'Drug Inventory',
      desc: 'Allopathic & Ayurvedic stock tracking',
      icon: Pill,
      path: '/staff/inventory',
      color: 'emerald',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Hero Banner */}
      <GlassCard className="p-6 border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 via-navy-900/60 to-purple-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                City Hospital Operations Hub
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono font-bold">
                CIVIL LINES DESK
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl font-sans">
              Real-time synchronization active with Kanpur Metro Central Health Grid. Live patient queues, bed allocation, and epidemiological alerts are up to date.
            </p>
          </div>

          <button
            onClick={() => navigate('/staff/medicinal-code')}
            className="self-start md:self-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-300 text-navy-950 font-heading font-bold text-xs flex items-center space-x-2 shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition-all shrink-0"
          >
            <Binary className="w-4 h-4" />
            <span>Open Medicinal Code Engine</span>
          </button>
        </div>
      </GlassCard>

      {/* 4 Glowing Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          icon={Users}
          value="127"
          label="Patients Today"
          trend="+18% vs Yesterday"
          trendType="positive"
          colorTheme="cyan"
          onClick={() => navigate('/staff/patients')}
        />
        <MetricCard
          icon={BedDouble}
          value={totalStaffAvailableBeds}
          label="Available Beds"
          trend="Live Synced"
          trendType="live"
          colorTheme="emerald"
          onClick={() => navigate('/staff/beds')}
        />
        <MetricCard
          icon={Activity}
          value="62%"
          label="Emergency Capacity"
          trend="Guarded Load"
          trendType="neutral"
          colorTheme="teal"
          onClick={() => navigate('/staff/beds')}
        />
        <MetricCard
          icon={AlertTriangle}
          value={alerts.length}
          label="Disease Alerts"
          trend="Dengue Spiking"
          trendType="warning"
          colorTheme="purple"
          onClick={() => navigate('/staff/analytics')}
        />
      </div>

      {/* Quick Access 4 Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold font-heading text-white">
            Hospital Admin Core Modules
          </h3>
          <span className="text-xs text-slate-400">Enterprise Triage Suite</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickAccessModules.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={item.title}
                hoverEffect
                onClick={() => navigate(item.path)}
                className="p-5 flex flex-col justify-between space-y-3 border-white/[0.08] hover:border-cyan-500/40 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-cyan-500/20 text-cyan-300 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 text-[11px] text-cyan-400 font-medium">
                  Enter Module →
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Lower Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bed Occupancy Today Recharts Area Chart */}
        <div className="lg:col-span-7">
          <GlassCard className="p-5 space-y-4 border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-heading font-bold text-white text-base flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span>Bed Occupancy Today</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Hourly admissions breakdown across ICU, General & Emergency
                </p>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                24H TELEMETRY
              </span>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bedOccupancyData}>
                  <defs>
                    <linearGradient id="gradGen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradIcu" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#25C5E9" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#25C5E9" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradEmerg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#081C2F',
                      borderColor: 'rgba(37, 197, 233, 0.3)',
                      borderRadius: '0.75rem',
                      color: '#F8FBFF',
                      fontSize: '12px',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', color: '#94A3B8' }} />
                  <Area
                    type="monotone"
                    dataKey="general"
                    name="General Ward"
                    stroke="#22C55E"
                    fill="url(#gradGen)"
                  />
                  <Area
                    type="monotone"
                    dataKey="icu"
                    name="ICU"
                    stroke="#25C5E9"
                    fill="url(#gradIcu)"
                  />
                  <Area
                    type="monotone"
                    dataKey="emergency"
                    name="Emergency"
                    stroke="#8B5CF6"
                    fill="url(#gradEmerg)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Right: Active Alerts List */}
        <div className="lg:col-span-5">
          <GlassCard className="p-5 space-y-4 border-white/[0.08]">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-white text-base flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Active Hospital Alerts</span>
              </h4>
              <button
                onClick={() => navigate('/staff/analytics')}
                className="text-xs text-cyan-400 hover:underline"
              >
                View Analytics →
              </button>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => navigate('/staff/analytics')}
                  className="p-3.5 rounded-xl bg-navy-950/70 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-white">
                      {alert.title}
                    </span>
                    <Badge
                      variant={
                        alert.severity === 'HIGH'
                          ? 'danger'
                          : alert.severity === 'MEDIUM'
                          ? 'warning'
                          : 'cyan'
                      }
                      size="sm"
                    >
                      {alert.severity}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {alert.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                    <span>{alert.affectedArea}</span>
                    <span>{alert.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
