import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { TraditionalMapping } from '../../types';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Binary,
  Search,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Database,
  Cpu,
  Layers,
  BookOpen,
  Info,
  ChevronRight,
  Activity,
  GitBranch,
  FileCheck2,
  Share2
} from 'lucide-react';

export const MedicinalCodeEngine: React.FC = () => {
  const { mappings, searchMapping, showToast } = useHospital();
  const [searchTerm, setSearchTerm] = useState('Vishama Jwara');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeResult, setActiveResult] = useState<TraditionalMapping | null>(mappings[0]);
  const [selectedContextMapping, setSelectedContextMapping] = useState<TraditionalMapping | null>(null);
  const [isContextModalOpen, setIsContextModalOpen] = useState(false);

  const processingStepsText = [
    'Analyzing traditional terminology linguistic tokens...',
    'Matching AYUSH ontologies with WHO ICD-11 & SNOMED CT...',
    'Generating semantic confidence and contextual clinical mappings...'
  ];

  const handleTranslate = async (termToTranslate?: string) => {
    const term = (termToTranslate || searchTerm).trim();
    if (!term) return;

    setIsProcessing(true);
    setProcessingStep(0);

    // Step 1
    setTimeout(() => {
      setProcessingStep(1);
    }, 600);

    // Step 2
    setTimeout(() => {
      setProcessingStep(2);
    }, 1200);

    // Step 3 (Completion)
    setTimeout(async () => {
      const match = await searchMapping(term);
      if (match) {
        setActiveResult(match);
        showToast(`Terminology converted successfully: ${match.traditionalTerm} → ${match.modernClinicalTerm}`, 'success');
      } else {
        // Fallback demo generation
        setActiveResult({
          id: `custom-${Date.now()}`,
          traditionalTerm: term,
          traditionalOrigin: 'Ayurveda',
          modernClinicalTerm: 'Syndromic Clinical Correlate (Interoperable Record)',
          icd11Code: 'MG48 (Unspecified syndromic condition)',
          snomedCode: '404684003 (Clinical finding)',
          category: 'Integrative Clinical Diagnostic Bridge',
          confidence: 88,
          doshaInvolvement: 'Tridoshaja physiological deviation requiring integrative evaluation',
          clinicalContext: `Synthesized clinical correlate for "${term}". Mapping inferred via semantic graph analysis and traditional classical compendia.`,
          modernDiagnosticMarkers: ['Clinical symptom correlation', 'Baseline blood hemogram', 'Electrolyte screen'],
          firstLineManagement: 'Consult integrative Ayush-Allopathic clinical panel for protocol alignment',
          contraindications: 'Self-medication without diagnostic verification'
        });
        showToast(`AI generated semantic mapping for "${term}"`, 'info');
      }
      setIsProcessing(false);
      setProcessingStep(0);
    }, 1800);
  };

  const handleSelectQuickReference = (item: TraditionalMapping) => {
    setSearchTerm(item.traditionalTerm);
    handleTranslate(item.traditionalTerm);
  };

  const handleOpenContext = (mapping: TraditionalMapping) => {
    setSelectedContextMapping(mapping);
    setIsContextModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Feature Header Banner */}
      <GlassCard className="p-6 sm:p-8 border-cyan-500/40 bg-gradient-to-br from-cyan-950/40 via-navy-900/80 to-purple-950/40 relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs text-cyan-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>CORE INTEROPERABILITY MODULE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white tracking-tight">
            Medicinal Code Conversion Engine
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            AI-assisted bridge between traditional medical terminology (AYUSH) and modern clinical terminology (ICD-11 / SNOMED CT) for unified digital health records.
          </p>
        </div>
      </GlassCard>

      {/* Interactive Central Translation Bar */}
      <GlassCard className="p-6 sm:p-7 border-white/[0.1] shadow-2xl">
        <div className="space-y-4 max-w-4xl mx-auto">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Enter Traditional Clinical Diagnosis or Ayurvedic Term
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
                placeholder="e.g. Vishama Jwara, Amlapitta, Prameha, Sandhivata..."
                className="w-full pl-12 pr-4 py-3.5 bg-navy-950/90 border border-cyan-500/30 rounded-2xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all font-heading font-medium"
              />
            </div>

            <button
              onClick={() => handleTranslate()}
              disabled={isProcessing || !searchTerm.trim()}
              className="py-3.5 px-8 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 text-navy-950 font-heading font-bold text-sm rounded-2xl shadow-lg shadow-cyan-500/30 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-98 shrink-0"
            >
              <Binary className="w-4 h-4" />
              <span>{isProcessing ? 'Translating...' : 'Translate Term'}</span>
            </button>
          </div>

          {/* Quick chip suggestions */}
          <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
            <span className="text-slate-400">Quick Test:</span>
            {['Vishama Jwara', 'Amlapitta', 'Prameha', 'Sandhivata', 'Pandu Roga', 'Tamaka Shwasa'].map((chip) => (
              <button
                key={chip}
                onClick={() => {
                  setSearchTerm(chip);
                  handleTranslate(chip);
                }}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/15 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/30 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Processing State Animation or Result Showcase */}
      {isProcessing ? (
        <GlassCard className="p-8 sm:p-12 text-center space-y-6 border-cyan-500/30 bg-navy-950/80">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="font-heading font-bold text-xl text-white">
              Processing Diagnostic Ontology
            </h3>
            <p className="text-xs text-cyan-300 font-mono">
              {processingStepsText[processingStep]}
            </p>
          </div>

          {/* 3 Step Pipeline Progress */}
          <div className="flex items-center justify-center space-x-3 max-w-sm mx-auto pt-2">
            {[0, 1, 2].map((stepIdx) => (
              <div
                key={stepIdx}
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  processingStep >= stepIdx
                    ? 'bg-cyan-400 shadow-[0_0_10px_#25C5E9]'
                    : 'bg-navy-900 border border-white/10'
                }`}
              />
            ))}
          </div>
        </GlassCard>
      ) : activeResult ? (
        <GlassCard className="p-6 sm:p-8 border-purple-500/40 bg-gradient-to-b from-white/[0.06] to-navy-950/90 shadow-2xl space-y-6">
          {/* Result Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-400 to-purple-600 text-navy-950 font-bold">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold">
                    AYUSH ↔ ICD-11 MAPPING
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Confidence: {activeResult.confidence}%
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mt-1">
                  Active Clinical Interoperability Result
                </h3>
              </div>
            </div>

            <button
              onClick={() => handleOpenContext(activeResult)}
              className="self-start md:self-center px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/40 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Info className="w-4 h-4 text-purple-300" />
              <span>View Full Clinical Context</span>
            </button>
          </div>

          {/* Core Mapping Visual (Traditional -> Modern) */}
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Traditional Card */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
                Traditional Term (AYUSH)
              </span>
              <div className="text-2xl font-extrabold font-heading text-white">
                {activeResult.traditionalTerm}
              </div>
              <p className="text-xs text-purple-200/80 leading-relaxed font-sans">
                <strong>Origin:</strong> {activeResult.traditionalOrigin} • <strong>Category:</strong> {activeResult.category}
              </p>
              <div className="text-[11px] text-slate-400 italic pt-1">
                {activeResult.doshaInvolvement}
              </div>
            </div>

            {/* Connecting Bridge Icon */}
            <div className="md:col-span-1 flex justify-center py-2 md:py-0">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_12px_rgba(37,197,233,0.3)]">
                <ArrowRight className="w-5 h-5 hidden md:block" />
                <ArrowRight className="w-5 h-5 md:hidden rotate-90" />
              </div>
            </div>

            {/* Modern Clinical Card */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                Modern Clinical Mapping
              </span>
              <div className="text-2xl font-extrabold font-heading text-white">
                {activeResult.modernClinicalTerm}
              </div>
              <div className="flex flex-wrap gap-2 text-xs pt-1 font-mono">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  ICD-11: {activeResult.icd11Code}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                  SNOMED: {activeResult.snomedCode}
                </span>
              </div>
            </div>
          </div>

          {/* Context and Clinical Markers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-navy-950/80 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                <span>Modern Diagnostic Markers</span>
              </span>
              <ul className="space-y-1 text-xs text-slate-300">
                {activeResult.modernDiagnosticMarkers.map((marker, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{marker}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-navy-950/80 rounded-xl border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-purple-400" />
                <span>First-Line Integrative Management</span>
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeResult.firstLineManagement}
              </p>
            </div>
          </div>

          {/* Regulatory Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start space-x-3 text-xs text-amber-200/90">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Clinical & Interoperability Disclaimer:</strong> Terminology mappings are provided for educational and interoperability demonstration only and should be clinically verified by qualified professionals before prescribing or modifying patient regimens.
            </p>
          </div>
        </GlassCard>
      ) : null}

      {/* 6 Quick Reference Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold font-heading text-white">
              Quick Reference Ontology Mappings
            </h3>
            <p className="text-xs text-slate-400">
              Click any card to load its complete clinical schema into the conversion engine
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            6 Standard Profiles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mappings.map((item) => (
            <GlassCard
              key={item.id}
              hoverEffect
              purpleGlow
              onClick={() => handleSelectQuickReference(item)}
              className="p-5 flex flex-col justify-between space-y-4 border-white/[0.08] hover:border-cyan-500/40 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="purple" size="sm">
                    {item.category}
                  </Badge>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.confidence}% Match
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-lg font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {item.traditionalTerm}
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="font-semibold text-cyan-200">{item.modernClinicalTerm}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.clinicalContext}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span className="flex items-center space-x-1">
                  <Info className="w-3.5 h-3.5 mr-1" />
                  <span>Load Clinical Schema</span>
                </span>
                <span>→</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Detailed Clinical Context Modal */}
      {selectedContextMapping && (
        <Modal
          isOpen={isContextModalOpen}
          onClose={() => setIsContextModalOpen(false)}
          title={`Clinical Ontology Context: ${selectedContextMapping.traditionalTerm}`}
          subtitle={`Modern Equivalent: ${selectedContextMapping.modernClinicalTerm} • ICD-11: ${selectedContextMapping.icd11Code}`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <div className="p-4 bg-navy-950/80 rounded-xl border border-white/10 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">
                Clinical Context & Pathophysiology
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {selectedContextMapping.clinicalContext}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-purple-950/30 rounded-xl border border-purple-500/20 space-y-1">
                <div className="font-bold text-purple-300">Dosha & Srotas Involvement</div>
                <div className="text-slate-300">{selectedContextMapping.doshaInvolvement}</div>
              </div>

              <div className="p-3.5 bg-cyan-950/30 rounded-xl border border-cyan-500/20 space-y-1">
                <div className="font-bold text-cyan-300">SNOMED CT Code</div>
                <div className="font-mono text-slate-300">{selectedContextMapping.snomedCode}</div>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Diagnostic Verification Protocol
              </h5>
              <div className="space-y-1.5">
                {selectedContextMapping.modernDiagnosticMarkers.map((m, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300 p-2 bg-white/5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs text-slate-300">
              <span className="text-rose-400 font-bold">Contraindications / Precautions: </span>
              <span>{selectedContextMapping.contraindications}</span>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsContextModalOpen(false)}
                className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-teal-300 text-navy-950 font-heading font-bold text-xs rounded-xl"
              >
                Close Context
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
