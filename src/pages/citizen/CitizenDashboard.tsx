import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHospital } from '../../context/HospitalContext';
import { MetricCard } from '../../components/common/MetricCard';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import {
  Building2,
  BedDouble,
  AlertTriangle,
  Bot,
  MapPin,
  FileText,
  AlertOctagon,
  GraduationCap,
  ArrowRight,
  Star,
  Activity,
  Calendar,
  Sparkles
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { hospitals, alerts } = useHospital();
  const navigate = useNavigate();

  // Calculate total beds
  const totalAvailableBeds = hospitals.reduce(
    (acc, h) => acc + h.beds.icu + h.beds.general + h.beds.emergency,
    0
  );

  const quickAccessItems = [
    {
      title: 'Find Hospitals',
      desc: 'Locate hospitals and check real-time availability.',
      icon: MapPin,
      path: '/citizen/hospitals',
      color: 'cyan',
    },
    {
      title: 'AI Health Assistant',
      desc: 'Get AI-powered health guidance and symptom triage.',
      icon: Bot,
      path: '/citizen/assistant',
      color: 'purple',
    },
    {
      title: 'My Health Records',
      desc: 'Access your portable medical history and lab reports.',
      icon: FileText,
      path: '/citizen/records',
      color: 'teal',
    },
    {
      title: 'Bed Availability',
      desc: 'Check hospital capacity and ICU readiness.',
      icon: BedDouble,
      path: '/citizen/beds',
      color: 'emerald',
    },
    {
      title: 'Emergency Alerts',
      desc: 'View important regional health warnings and advisories.',
      icon: AlertOctagon,
      path: '/citizen/alerts',
      color: 'rose',
    },
    {
      title: 'Health Education',
      desc: 'Learn about diseases, nutrition and Ayurvedic wellness.',
      icon: GraduationCap,
      path: '/citizen/education',
      color: 'purple',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 4 Glowing Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          icon={Building2}
          value={hospitals.length}
          label="Nearby Hospitals"
          trend="Kanpur Network"
          trendType="neutral"
          colorTheme="cyan"
          onClick={() => navigate('/citizen/hospitals')}
        />
        <MetricCard
          icon={BedDouble}
          value={totalAvailableBeds}
          label="Available Beds"
          trend="Live Synced"
          trendType="live"
          colorTheme="emerald"
          onClick={() => navigate('/citizen/beds')}
        />
        <MetricCard
          icon={AlertTriangle}
          value={alerts.length}
          label="Active Alerts"
          trend="2 High Risk"
          trendType="warning"
          colorTheme="purple"
          onClick={() => navigate('/citizen/alerts')}
        />
        <MetricCard
          icon={Bot}
          value="Online"
          label="AI Assistant"
          trend="Ready 24/7"
          trendType="positive"
          colorTheme="teal"
          onClick={() => navigate('/citizen/assistant')}
        />
      </div>

      {/* Quick Access 2x3 Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
            <span>Quick Access Modules</span>
          </h2>
          <span className="text-xs text-slate-400">Click any card to launch module</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard
                key={item.title}
                hoverEffect
                purpleGlow={item.color === 'purple'}
                onClick={() => navigate(item.path)}
                className="group p-6 flex flex-col justify-between border-white/[0.08] hover:border-cyan-500/40"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all text-cyan-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                  <span>Launch Feature</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Two-Column Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Nearby Hospitals */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-white flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-cyan-400" />
              <span>Nearby Hospitals</span>
            </h3>
            <Link
              to="/citizen/hospitals"
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
            >
              <span>View all hospitals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {hospitals.slice(0, 3).map((hosp) => {
              const totalBeds = hosp.beds.icu + hosp.beds.general + hosp.beds.emergency;
              return (
                <GlassCard
                  key={hosp.id}
                  hoverEffect
                  onClick={() => navigate('/citizen/hospitals')}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-white/[0.06] hover:border-cyan-500/30"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-heading font-bold text-white text-base">
                        {hosp.name}
                      </span>
                      <span className="flex items-center text-xs text-amber-400 font-semibold bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        {hosp.rating}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{hosp.distance}</span>
                      </span>
                      <span>•</span>
                      <span>{hosp.address.split(',')[1] || 'Kanpur'}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-sm font-bold text-white font-mono">
                        {totalBeds} beds
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ICU: {hosp.beds.icu} | Gen: {hosp.beds.general}
                      </div>
                    </div>

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
                        ? 'Available'
                        : hosp.status === 'limited'
                        ? 'Limited'
                        : 'Critical'}
                    </Badge>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Right Column: Latest Alerts */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              <span>Latest Health Alerts</span>
            </h3>
            <Link
              to="/citizen/alerts"
              className="text-xs font-semibold text-purple-300 hover:text-purple-200 flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <GlassCard
                key={alert.id}
                hoverEffect
                purpleGlow={alert.severity === 'HIGH'}
                onClick={() => navigate('/citizen/alerts')}
                className="p-4 space-y-2 border-white/[0.06] hover:border-purple-500/40"
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

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {alert.description}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5 font-mono">
                  <span>{alert.affectedArea}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
