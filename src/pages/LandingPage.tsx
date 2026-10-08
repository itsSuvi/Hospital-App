import React from 'react';
import { Link } from 'react-router-dom';
import { LandingNavbar } from '../components/common/LandingNavbar';
import { DnaHeroAnimation } from '../components/visuals/DnaHeroAnimation';
import { GlassCard } from '../components/common/GlassCard';
import {
  HeartPulse,
  Building2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Bot,
  Binary,
  Layers,
  Activity,
  CheckCircle2,
  Cpu,
  Database,
  Lock,
  Network
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#061426] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & Trust Badges */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Pill badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-cyan-500/30 backdrop-blur-md text-xs text-cyan-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Next-Gen Healthcare Technology Platform</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-slate-400">Kanpur Metro</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white leading-[1.1]">
              Kanpur Metro <br />
              <span className="gradient-text-cyan">Hospital</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl font-medium text-purple-200/90 font-heading">
              “One bridge. A healthier tomorrow.”
            </p>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans">
              A secure digital health ecosystem connecting citizens, clinicians and hospital intelligence through AI-powered healthcare technology, real-time bed capacity, and traditional-to-modern medicinal ontologies.
            </p>

            {/* Live Ecosystem Stats */}
            <div className="pt-2 grid grid-cols-3 gap-3 sm:gap-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-heading">
                  5+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Connected Hospitals</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 font-heading">
                  94%+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">AYUSH-ICD11 Accuracy</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-heading">
                  &lt;60s
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Live Bed Sync</div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D DNA Helix Rotator */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/20 via-transparent to-purple-500/20 shadow-2xl backdrop-blur-sm border border-white/10">
              <DnaHeroAnimation />
            </div>
          </div>
        </div>

        {/* Section 2: Two Large Login / Portal Cards */}
        <div className="mt-16 sm:mt-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Select Your Access Portal
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Role-based secure entry points for patients and medical administrators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Citizen / Patient */}
            <GlassCard
              hoverEffect
              purpleGlow
              className="group flex flex-col justify-between border-purple-500/30 hover:border-purple-500/60 p-8"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-110 group-hover:bg-purple-600/30 transition-all shadow-lg shadow-purple-900/30">
                  <HeartPulse className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-heading text-white flex items-center space-x-2">
                    <span>Citizen / Patient</span>
                  </h3>
                  <p className="text-xs font-mono text-purple-300 mt-1 uppercase tracking-wider">
                    Personal Health Space
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Access your health records, appointments, nearby hospitals, emergency alerts and personalized AI health assistance.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Instant bed availability across 5+ hospitals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>24/7 AI-guided triage & symptom checker</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    <span>Encrypted portable electronic medical timeline</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/citizen/dashboard"
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 group-hover:translate-x-1"
                >
                  <span>Enter Citizen Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>

            {/* Card 2: Hospital Staff */}
            <GlassCard
              hoverEffect
              className="group flex flex-col justify-between border-cyan-500/30 hover:border-cyan-500/60 p-8"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all shadow-lg shadow-cyan-900/30">
                  <Building2 className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-heading text-white flex items-center space-x-2">
                    <span>Hospital Staff</span>
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 mt-1 uppercase tracking-wider">
                    Clinical Operations & AI Bridge
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Manage patient records, hospital capacity, disease intelligence, medicine inventory and clinical insights.
                </p>

                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span><strong>Medicinal Code Conversion Engine</strong> (AYUSH ↔ ICD-11)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Real-time ICU/General bed counter management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Epidemiological vector disease density mapping</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <Link
                  to="/staff/dashboard"
                  className="w-full py-3.5 px-6 rounded-xl font-heading font-semibold text-sm text-navy-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:from-cyan-300 hover:to-teal-200 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center space-x-2 group-hover:translate-x-1"
                >
                  <span>Enter Hospital Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </GlassCard>
          </div>

          {/* Security Banner Note */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-navy-900/60 border border-white/10 text-xs text-slate-400 backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Protected healthcare environment • Secure access • Privacy-first architecture</span>
            </div>
          </div>
        </div>

        {/* Section 3: AI Bridge Architecture Overview */}
        <div className="mt-24 pt-16 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
              Ecosystem Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">
              Unified Medical Intelligence Loop
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              How Kanpur Metro Hospital synchronizes patient triage with clinician ontology tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard className="p-6 space-y-3 border-cyan-500/20">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">
                1. Citizen AI Triage
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Patients report symptoms in natural language. The AI triages severity and matches nearby open beds.
              </p>
            </GlassCard>

            <GlassCard className="p-6 space-y-3 border-purple-500/20">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <Binary className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">
                2. Medicinal Code Engine
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Converts traditional AYUSH diagnoses (e.g., Vishama Jwara) into global ICD-11 & SNOMED CT clinical codes.
              </p>
            </GlassCard>

            <GlassCard className="p-6 space-y-3 border-teal-500/20">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300">
                <Network className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">
                3. Real-Time Bed Grid
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hospital staff update ICU and Emergency numbers with 1-click live broadcast across the city grid.
              </p>
            </GlassCard>

            <GlassCard className="p-6 space-y-3 border-emerald-500/20">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="font-heading font-bold text-white text-base">
                4. Disease Outbreak Radar
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Early-warning heatmap spots vector spikes (Dengue, Malaria) before hospital surges occur.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-navy-950/90 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
            {/* Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span className="font-heading font-bold text-white text-base">
                  KANPUR METRO HOSPITAL
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                “One bridge. A healthier tomorrow.”
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Next-generation digital healthcare platform facilitating interoperability between modern clinical systems and traditional medical wisdom.
              </p>
            </div>

            {/* Platform links */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Platform
              </div>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/citizen/dashboard" className="hover:text-cyan-300 transition-colors">Citizen Portal</Link></li>
                <li><Link to="/staff/dashboard" className="hover:text-cyan-300 transition-colors">Hospital Portal</Link></li>
                <li><Link to="/citizen/assistant" className="hover:text-cyan-300 transition-colors">AI Health Assistant</Link></li>
                <li><Link to="/citizen/education" className="hover:text-cyan-300 transition-colors">Health Education</Link></li>
              </ul>
            </div>

            {/* Security links */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Security & Ethics
              </div>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-center space-x-1.5"><Lock className="w-3.5 h-3.5 text-emerald-400" /><span>Privacy-first architecture</span></li>
                <li className="flex items-center space-x-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /><span>Role-based secure access</span></li>
                <li className="flex items-center space-x-1.5"><Cpu className="w-3.5 h-3.5 text-purple-400" /><span>Responsible AI Governance</span></li>
                <li className="flex items-center space-x-1.5"><Database className="w-3.5 h-3.5 text-cyan-400" /><span>FHIR / ABDM Interoperability</span></li>
              </ul>
            </div>

            {/* Support links */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Support & Contact
              </div>
              <ul className="space-y-1.5 text-xs">
                <li><span>Kanpur Emergency Helpline: <strong>108 / 112</strong></span></li>
                <li><span>Hospital Desk: <strong>+91 512 230 4500</strong></span></li>
                <li><Link to="/citizen/assistant" className="text-cyan-400 hover:underline">Interactive AI Support</Link></li>
                <li><span className="text-[11px] text-slate-500">Civil Lines, Kanpur, Uttar Pradesh 208001</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 Kanpur Metro Hospital — Healthcare Technology Demonstration
            </div>
            <div className="flex space-x-4">
              <span>Interoperability Demo</span>
              <span>•</span>
              <span>AYUSH-ICD11 Protocol</span>
              <span>•</span>
              <span>Demo Login Active</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
