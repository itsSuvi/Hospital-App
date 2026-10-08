import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  purpleGlow?: boolean;
  onClick?: () => void;
  id?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hoverEffect = false,
  purpleGlow = false,
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 md:p-6 shadow-xl relative overflow-hidden transition-all duration-300
        ${hoverEffect ? (purpleGlow ? 'glass-panel-purple-hover cursor-pointer' : 'glass-panel-hover cursor-pointer') : ''}
        ${className}
      `}
    >
      {/* Subtle corner light highlight */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
      {children}
    </div>
  );
};
