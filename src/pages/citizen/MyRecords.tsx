import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { HealthRecordItem } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  FileText,
  Upload,
  User,
  Calendar,
  Stethoscope,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Plus,
  Eye,
  FileCheck,
  FileSpreadsheet
} from 'lucide-react';

export const MyRecords: React.FC = () => {
  const { healthRecords, addHealthRecord } = useHospital();
  const [selectedRecord, setSelectedRecord] = useState<HealthRecordItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Upload Form State
  const [uploadCategory, setUploadCategory] = useState<HealthRecordItem['category']>('Lab Report');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDoctor, setUploadDoctor] = useState('');
  const [uploadHospital, setUploadHospital] = useState('City Hospital (Civil Lines)');
  const [uploadDescription, setUploadDescription] = useState('');
  const [metricLabel, setMetricLabel] = useState('Diagnostic Marker');
  const [metricValue, setMetricValue] = useState('Within normal limits');

  const handleOpenDetail = (record: HealthRecordItem) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    addHealthRecord({
      category: uploadCategory,
      title: uploadTitle,
      description: uploadDescription || 'Encrypted clinical document uploaded via Citizen Portal.',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      doctor: uploadDoctor || 'Dr. Mehta',
      hospital: uploadHospital,
      metrics: [
        { label: metricLabel, value: metricValue, status: 'normal' }
      ]
    });

    setIsUploadModalOpen(false);
    setUploadTitle('');
    setUploadDescription('');
    setMetricValue('');
  };

  const getCategoryBadgeVariant = (category: HealthRecordItem['category']) => {
    switch (category) {
      case 'Diagnosis':
        return 'purple';
      case 'Prescription':
        return 'cyan';
      case 'Lab Report':
        return 'warning';
      case 'Vaccination':
        return 'success';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Patient Profile Card */}
      <GlassCard className="p-6 sm:p-7 border-purple-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* User Meta */}
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-xl shadow-purple-900/30">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center font-heading font-extrabold text-2xl text-white">
                RS
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold font-heading text-white">
                  Rahul Sharma
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-mono font-bold">
                  ID: P001
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <span>Age: <strong className="text-white">34 Yrs</strong></span>
                <span>•</span>
                <span>Gender: <strong className="text-white">Male</strong></span>
                <span>•</span>
                <span>Blood Group: <strong className="text-emerald-400 font-bold">B+ (Positive)</strong></span>
                <span>•</span>
                <span className="text-purple-300 font-mono">ABDM Health ID: 91-4500-1129-8802</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start md:self-center px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-heading font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-purple-900/30 flex items-center space-x-2"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Medical Record</span>
          </button>
        </div>
      </GlassCard>

      {/* Chronological Medical Timeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-heading text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>Chronological Medical History</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified clinical timeline synchronized with Kanpur Metro Partner Facilities
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            {healthRecords.length} Verified Entries
          </span>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent">
          {healthRecords.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full bg-navy-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:border-purple-400 group-hover:shadow-[0_0_10px_#25C5E9] transition-all" />

              {/* Record Card */}
              <GlassCard
                hoverEffect
                onClick={() => handleOpenDetail(item)}
                className="p-5 space-y-4 border-white/[0.07] hover:border-cyan-500/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-3">
                      <Badge variant={getCategoryBadgeVariant(item.category)}>
                        {item.category}
                      </Badge>
                      <span className="text-xs font-mono text-slate-400 flex items-center space-x-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{item.date}</span>
                      </span>
                    </div>

                    <h4 className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetail(item);
                    }}
                    className="self-start sm:self-center px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-200 border border-white/10 hover:border-cyan-500/30 text-xs font-semibold flex items-center space-x-1.5 transition-colors shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Record</span>
                  </button>
                </div>

                {/* Key Metrics row */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-white/5 bg-navy-950/60 p-3 rounded-xl">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="text-xs">
                        <div className="text-slate-400 text-[11px]">{m.label}</div>
                        <div className="font-mono font-bold text-cyan-300 mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Doctor and Hospital Meta */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/5">
                  <div className="flex items-center space-x-2">
                    <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
                    <span>Prescribed by: <strong className="text-slate-200">{item.doctor}</strong></span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>{item.hospital}</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedRecord.title}
          subtitle={`Category: ${selectedRecord.category} • Recorded: ${selectedRecord.date}`}
          maxWidth="xl"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-navy-950/80 border border-white/10 space-y-2">
              <div className="text-xs text-slate-400">Clinical Narrative</div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedRecord.description}
              </p>
            </div>

            {selectedRecord.metrics && (
              <div>
                <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Recorded Clinical Parameters
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRecord.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="text-xs text-slate-400">{m.label}</div>
                      <div className="text-base font-bold font-mono text-cyan-300 mt-1">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Status: Verified Normal</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-xs bg-navy-950/70 p-3 rounded-xl border border-white/5">
              <div>
                <span className="text-slate-400">Attending Clinician:</span>
                <div className="font-semibold text-white mt-0.5">{selectedRecord.doctor}</div>
              </div>
              <div>
                <span className="text-slate-400">Facility Location:</span>
                <div className="font-semibold text-white mt-0.5">{selectedRecord.hospital}</div>
              </div>
            </div>

            <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl flex items-center space-x-2 text-xs text-cyan-200">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Cryptographically signed with Kanpur Health Grid SHA-256 token.</span>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Record Demo Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Medical Record"
        subtitle="Add a new diagnosis, lab test, prescription or vaccination to your timeline"
        maxWidth="lg"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Record Category
            </label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value as any)}
              className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="Lab Report">Lab Report</option>
              <option value="Diagnosis">Diagnosis</option>
              <option value="Prescription">Prescription</option>
              <option value="Vaccination">Vaccination</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Record Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Lipid Profile & Liver Function Test"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Consulting Doctor
              </label>
              <input
                type="text"
                placeholder="Dr. S. K. Awasthi"
                value={uploadDoctor}
                onChange={(e) => setUploadDoctor(e.target.value)}
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Hospital / Lab
              </label>
              <input
                type="text"
                placeholder="City Hospital (Civil Lines)"
                value={uploadHospital}
                onChange={(e) => setUploadHospital(e.target.value)}
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Key Marker Label
              </label>
              <input
                type="text"
                placeholder="e.g. Serum Cholesterol"
                value={metricLabel}
                onChange={(e) => setMetricLabel(e.target.value)}
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Measured Value
              </label>
              <input
                type="text"
                placeholder="e.g. 175 mg/dL"
                value={metricValue}
                onChange={(e) => setMetricValue(e.target.value)}
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Clinical Notes / Summary
            </label>
            <textarea
              rows={3}
              placeholder="Enter clinical observations, diagnostic findings or dosage instructions..."
              value={uploadDescription}
              onChange={(e) => setUploadDescription(e.target.value)}
              className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Drag and Drop Simulation Box */}
          <div className="p-4 border-2 border-dashed border-purple-500/30 rounded-xl text-center bg-purple-950/10">
            <FileSpreadsheet className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <span className="text-xs text-purple-200 block font-medium">
              Drag & Drop PDF Lab Report or DICOM Image
            </span>
            <span className="text-[10px] text-slate-400">Supported formats: PDF, PNG, JPG, DICOM (Max 25MB)</span>
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-heading font-semibold text-xs rounded-xl shadow-lg shadow-purple-900/30"
            >
              Confirm Upload
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
