import React, { useState } from 'react';
import { healthEducationTopics } from '../../data/mockData';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  GraduationCap,
  HeartPulse,
  Apple,
  Brain,
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Search
} from 'lucide-react';

export const HealthEducation: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<(typeof healthEducationTopics)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-400" />;
      case 'Apple':
        return <Apple className="w-6 h-6 text-emerald-400" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-purple-400" />;
      case 'BookOpen':
      default:
        return <BookOpen className="w-6 h-6 text-cyan-400" />;
    }
  };

  const filteredTopics = healthEducationTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOpenArticle = (topic: (typeof healthEducationTopics)[0]) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <GlassCard className="p-6 border-purple-500/30 bg-purple-950/15">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold font-heading text-white">
                Kanpur Metro Health Knowledge Hub
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Evidence-based wellness guides combining modern clinical pathophysiology with time-tested Ayurvedic chronobiology and nutrition.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics, nutrition, heart..."
              className="w-full pl-10 pr-4 py-2 bg-navy-950/80 border border-white/10 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>
      </GlassCard>

      {/* 4 Large Educational Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTopics.map((topic) => (
          <GlassCard
            key={topic.id}
            hoverEffect
            purpleGlow={topic.id === 'edu-2' || topic.id === 'edu-3'}
            onClick={() => handleOpenArticle(topic)}
            className="p-6 flex flex-col justify-between space-y-5 border-white/[0.08] hover:border-cyan-500/40 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {getIcon(topic.icon)}
                </div>

                <span className="flex items-center space-x-1 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{topic.readTime}</span>
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
                  {topic.subtitle}
                </p>
              </div>

              {/* Highlights Preview */}
              <div className="space-y-1.5 pt-2 border-t border-white/5">
                {topic.highlights.slice(0, 2).map((h, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2.5 py-0.5 rounded-md bg-navy-950/80 border border-white/10 text-slate-400 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>Read Full Educational Guide</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Guide Detail Modal */}
      {selectedTopic && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedTopic.title}
          subtitle={`Read Time: ${selectedTopic.readTime} • Kanpur Metro Medical Literacy Series`}
          maxWidth="2xl"
        >
          <div className="space-y-5">
            <p className="text-sm text-cyan-200/90 leading-relaxed font-medium bg-cyan-950/30 p-4 rounded-xl border border-cyan-500/20">
              {selectedTopic.subtitle}
            </p>

            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Core Clinical Takeaways
              </h4>
              <div className="space-y-2.5">
                {selectedTopic.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-xl bg-navy-950/70 border border-white/5 text-xs text-slate-200"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Interoperability Note:</strong> Knowledge modules are continuously reviewed by the Kanpur Metro Clinical Advisory Board to ensure alignment with both AYUSH pharmacopeia and modern Indian Council of Medical Research (ICMR) protocols.
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl text-xs"
              >
                Close Guide
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
