import React from 'react';
import { MetricCard } from '../../components/common/MetricCard';
import { GlassCard } from '../../components/common/GlassCard';
import { DiseaseDensityMap } from '../../components/maps/DiseaseDensityMap';
import {
  Activity,
  Flame,
  TrendingUp,
  AlertTriangle,
  Bug,
  Thermometer,
  ShieldCheck,
  Calendar
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

const multiMonthTrendData = [
  { month: 'April', Malaria: 18, Dengue: 12, Influenza: 65 },
  { month: 'May', Malaria: 24, Dengue: 15, Influenza: 52 },
  { month: 'June', Malaria: 29, Dengue: 22, Influenza: 45 },
  { month: 'July', Malaria: 35, Dengue: 31, Influenza: 40 },
  { month: 'August', Malaria: 38, Dengue: 39, Influenza: 34 },
  { month: 'September', Malaria: 42, Dengue: 45, Influenza: 38 },
];

export const DiseaseAnalytics: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* 3 Disease Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          icon={Flame}
          value="45"
          label="Dengue Cases (Active)"
          trend="+23% (High Surge)"
          trendType="warning"
          colorTheme="purple"
        />
        <MetricCard
          icon={Bug}
          value="42"
          label="Malaria (P. vivax / Pf)"
          trend="+14% (Riparian Zone)"
          trendType="warning"
          colorTheme="teal"
        />
        <MetricCard
          icon={Thermometer}
          value="38"
          label="Seasonal Influenza"
          trend="-17% (Declining)"
          trendType="positive"
          colorTheme="cyan"
        />
      </div>

      {/* Six-Month Trend Area Chart */}
      <GlassCard className="p-6 space-y-4 border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="font-heading font-bold text-white text-lg flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Six-Month Outbreak Trajectory (April — September 2026)</span>
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Comparative longitudinal incidence metrics across Kanpur urban wards.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>IDSP Surveillance Integration</span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={multiMonthTrendData}>
              <defs>
                <linearGradient id="gradDengue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradMalaria" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradFlu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#25C5E9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#25C5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} />
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
              <Area
                type="monotone"
                dataKey="Dengue"
                stroke="#EF4444"
                strokeWidth={2.5}
                fill="url(#gradDengue)"
              />
              <Area
                type="monotone"
                dataKey="Malaria"
                stroke="#F59E0B"
                strokeWidth={2.5}
                fill="url(#gradMalaria)"
              />
              <Area
                type="monotone"
                dataKey="Influenza"
                stroke="#25C5E9"
                strokeWidth={2.5}
                fill="url(#gradFlu)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Geographic Disease Density Heatmap */}
      <GlassCard className="p-6 border-white/[0.08]">
        <DiseaseDensityMap />
      </GlassCard>
    </div>
  );
};
