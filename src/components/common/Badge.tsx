import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'success' | 'warning' | 'danger' | 'neutral' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'purple':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'success':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'warning':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'danger':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'outline':
        return 'bg-transparent text-slate-300 border-slate-700';
      case 'neutral':
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
      case 'cyan':
      default:
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    }
  };

  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-medium rounded-md border backdrop-blur-sm ${getVariantStyles()} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
};
