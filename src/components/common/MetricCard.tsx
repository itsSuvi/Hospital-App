import React from 'react';
import { GlassCard } from './GlassCard';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: string;
  trendType?: 'positive' | 'warning' | 'neutral' | 'live';
  colorTheme?: 'cyan' | 'purple' | 'teal' | 'emerald';
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  value,
  label,
  trend,
  trendType = 'neutral',
  colorTheme = 'cyan',
  onClick,
}) => {
  const getThemeStyles = () => {
    switch (colorTheme) {
      case 'purple':
        return {
          iconBg: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
          glow: 'from-purple-500/10 to-transparent',
          valueColor: 'text-white'
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
          glow: 'from-emerald-500/10 to-transparent',
          valueColor: 'text-white'
        };
      case 'teal':
        return {
          iconBg: 'bg-teal-500/10 text-teal-300 border border-teal-500/20',
          glow: 'from-teal-500/10 to-transparent',
          valueColor: 'text-white'
        };
      case 'cyan':
      default:
        return {
          iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
          glow: 'from-cyan-500/10 to-transparent',
          valueColor: 'text-white'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <GlassCard
      hoverEffect={!!onClick}
      purpleGlow={colorTheme === 'purple'}
      onClick={onClick}
      className="flex flex-col justify-between group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
          {label}
        </span>
        <div className={`p-2.5 rounded-xl ${theme.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="text-3xl font-extrabold tracking-tight font-heading text-white">
          {value}
        </div>
        {trend && (
          <div
            className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center space-x-1 ${
              trendType === 'positive'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                : trendType === 'warning'
                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20'
                : trendType === 'live'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                : 'bg-slate-500/15 text-slate-300 border border-slate-500/20'
            }`}
          >
            {trendType === 'live' && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping mr-1" />
            )}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
