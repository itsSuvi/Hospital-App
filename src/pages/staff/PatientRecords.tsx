import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { PatientRecord } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Filter,
  Eye,
  Stethoscope,
  Calendar,
  Activity,
  Heart,
  Thermometer,
  Wind,
  Pill,
  FileSpreadsheet,
  Download,
  Plus
} from 'lucide-react';

export const PatientRecords: React.FC = () => {
  const { patients, showToast } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract unique doctors
  const doctors = Array.from(new Set(patients.map((p) => p.doctor)));

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.modernDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.traditionalDiagnosis && p.traditionalDiagnosis.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDoctor = selectedDoctor === 'All' || p.doctor === selectedDoctor;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

    return matchesSearch && matchesDoctor && matchesStatus;
  });

  const handleOpenPatient = (patient: PatientRecord) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleExportCSV = () => {
    showToast('Exporting HIPAA-compliant encrypted patient registry to CSV...', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <GlassCard className="p-4 sm:p-5 border-cyan-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by patient name, ID (P001), or traditional / modern diagnosis..."
              className="w-full pl-10 pr-4 py-2.5 bg-navy-950/70 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Clinicians</option>
              {doctors.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Statuses</option>
              <option value="Admitted">Admitted</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Outpatient">Outpatient</option>
              <option value="Discharged">Discharged</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
              title="Export Encrypted CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Patients Data Table */}
      <GlassCard className="p-0 border-white/[0.08] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-navy-950/80">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-white text-base">
              Active Clinical Registry ({filteredPatients.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Dual Taxonomy Interoperability Active
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Patient ID</th>
                <th className="py-3.5 px-4 font-semibold">Name & Age</th>
                <th className="py-3.5 px-4 font-semibold">Attending Doctor</th>
                <th className="py-3.5 px-4 font-semibold">Diagnosis (Dual Terminology)</th>
                <th className="py-3.5 px-4 font-semibold">Treatment Protocol</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => handleOpenPatient(patient)}
                  className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                    {patient.patientId}
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                      {patient.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {patient.age} Yrs • {patient.gender} • <span className="text-emerald-400 font-mono">{patient.bloodGroup}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <div className="flex items-center space-x-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{patient.doctor}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    {patient.traditionalDiagnosis ? (
                      <div className="space-y-0.5">
                        <div className="font-semibold text-purple-300 flex items-center space-x-1">
                          <span>{patient.traditionalDiagnosis}</span>
                          <span className="text-slate-500 font-normal">→</span>
                        </div>
                        <div className="text-slate-200 text-[11px] font-medium">
                          {patient.modernDiagnosis}
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-200 font-medium">{patient.modernDiagnosis}</div>
                    )}
                    {patient.icdCode && (
                      <span className="inline-block text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1.5 py-0.2 rounded border border-cyan-500/20 mt-1">
                        ICD: {patient.icdCode}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-xs">
                    <p className="line-clamp-2 text-[11px] leading-relaxed">
                      {patient.treatment}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {patient.date}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPatient(patient);
                      }}
                      className="px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 font-semibold transition-colors flex items-center space-x-1 ml-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Record</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Patient Detailed Clinical Modal */}
      {selectedPatient && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Clinical Record: ${selectedPatient.name} (${selectedPatient.patientId})`}
          subtitle={`Age: ${selectedPatient.age} • Blood Group: ${selectedPatient.bloodGroup} • Status: ${selectedPatient.status}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Vitals Summary Strip */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Recorded Bedside Vitals
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-navy-950/80 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Blood Pressure</div>
                    <div className="font-mono font-bold text-white text-xs">{selectedPatient.vitals.bp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Heart Rate</div>
                    <div className="font-mono font-bold text-white text-xs">{selectedPatient.vitals.pulse}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Body Temp</div>
                    <div className="font-mono font-bold text-white text-xs">{selectedPatient.vitals.temp}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-400">Oxygen (SpO2)</div>
                    <div className="font-mono font-bold text-white text-xs">{selectedPatient.vitals.spO2}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Diagnostic Ontology Bridge */}
            <div className="p-4 bg-purple-950/30 rounded-xl border border-purple-500/30 space-y-2">
              <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                Integrative Diagnostic Taxonomy Mapping
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 bg-navy-950/70 rounded-lg border border-white/5">
                  <span className="text-slate-400">Traditional Terminology (AYUSH):</span>
                  <div className="font-heading font-bold text-purple-300 text-sm mt-0.5">
                    {selectedPatient.traditionalDiagnosis || 'Direct Modern Assessment'}
                  </div>
                </div>
                <div className="p-3 bg-navy-950/70 rounded-lg border border-white/5">
                  <span className="text-slate-400">Modern Clinical Term & ICD-11:</span>
                  <div className="font-heading font-bold text-cyan-300 text-sm mt-0.5">
                    {selectedPatient.modernDiagnosis}
                  </div>
                  {selectedPatient.icdCode && (
                    <span className="text-[10px] font-mono text-cyan-400">Code: {selectedPatient.icdCode}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Doctor's Clinical Notes */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Physician's Clinical Progress Notes
              </div>
              <p className="text-xs text-slate-200 leading-relaxed bg-navy-950/80 p-4 rounded-xl border border-white/10 font-sans">
                {selectedPatient.notes}
              </p>
            </div>

            {/* Prescribed Medications */}
            <div>
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Pill className="w-3.5 h-3.5 text-cyan-400" />
                <span>Active Prescription Regimen</span>
              </div>
              <div className="space-y-1.5">
                {selectedPatient.prescriptions.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200 flex items-center justify-between"
                  >
                    <span>{p}</span>
                    <span className="text-[10px] font-mono text-emerald-400">ACTIVE</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-mono">Attending: {selectedPatient.doctor}</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium"
              >
                Close Record
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
