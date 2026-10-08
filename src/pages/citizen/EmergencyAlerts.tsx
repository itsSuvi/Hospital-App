import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { EmergencyAlert } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  AlertTriangle,
  Flame,
  ShieldAlert,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Info,
  Radio,
  Share2
} from 'lucide-react';

export const EmergencyAlerts: React.FC = () => {
  const { alerts, showToast } = useHospital();
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAlert = (alert: EmergencyAlert) => {
    setSelectedAlert(alert);
    setIsModalOpen(true);
  };

  const handleShare = (alert: EmergencyAlert) => {
    showToast(`Health Alert advisory link copied to clipboard for: ${alert.title}`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Live Broadcast Header */}
      <GlassCard className="p-5 border-rose-500/30 bg-rose-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 animate-pulse">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold font-heading text-white">
                  Kanpur Public Health Surveillance Grid
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  LIVE BROADCAST
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Real-time epidemiological advisories issued in cooperation with UP Health Mission & Kanpur CMO Office.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Large Severity Cards Grid */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const isHigh = alert.severity === 'HIGH';
          const isMedium = alert.severity === 'MEDIUM';

          return (
            <GlassCard
              key={alert.id}
              hoverEffect
              purpleGlow={!isHigh}
              onClick={() => handleOpenAlert(alert)}
              className={`p-6 space-y-4 border-l-4 ${
                isHigh
                  ? 'border-l-rose-500 border-white/[0.08] hover:border-rose-500/50'
                  : isMedium
                  ? 'border-l-amber-500 border-white/[0.08] hover:border-amber-500/50'
                  : 'border-l-cyan-500 border-white/[0.08] hover:border-cyan-500/50'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <Badge
                    variant={isHigh ? 'danger' : isMedium ? 'warning' : 'cyan'}
                    size="md"
                  >
                    {alert.severity} SEVERITY
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">
                    Category: {alert.category}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{alert.timestamp}</span>
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {alert.title}
                </h4>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed font-sans">
                  {alert.description}
                </p>
              </div>

              {/* Affected Area & Key Steps */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/5">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Affected Sectors: <strong className="text-white">{alert.affectedArea}</strong></span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(alert);
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Share Advisory"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenAlert(alert);
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-cyan-200 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center space-x-1 transition-colors"
                  >
                    <span>View Prevention Protocol</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Alert Details Modal */}
      {selectedAlert && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedAlert.title}
          subtitle={`Severity: ${selectedAlert.severity} • Issued: ${selectedAlert.timestamp}`}
          maxWidth="xl"
        >
          <div className="space-y-5">
            <div className="p-4 bg-navy-950/80 rounded-xl border border-white/10 space-y-2">
              <div className="text-xs text-slate-400">Epidemiological Summary</div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedAlert.description}
              </p>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center space-x-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Monitored Focus Area: <strong>{selectedAlert.affectedArea}</strong></span>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Mandatory Citizen Advisory Steps
              </h5>
              <div className="space-y-2">
                {selectedAlert.advisorySteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-lg bg-navy-950/60 border border-white/5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
              <span>Kanpur Medical Officer Hotline: 108</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 rounded-xl font-semibold"
              >
                Acknowledge Advisory
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
