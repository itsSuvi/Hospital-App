import React, { useState, useRef, useEffect } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { GlassCard } from '../../components/common/GlassCard';
import {
  Bot,
  Send,
  Sparkles,
  Mic,
  Paperclip,
  ShieldAlert,
  Cpu,
  Database,
  Layers,
  ArrowDown,
  User,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const AiAssistant: React.FC = () => {
  const { chatMessages, isAiTyping, sendAiMessage, showToast } = useHospital();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestionChips = [
    'I have fever and headache',
    'Explain Vishama Jwara',
    'What hospitals near me have beds?',
    'What are the symptoms of dengue?',
    'Explain my lab report',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText('');
    await sendAiMessage(text);
  };

  const handleChipClick = (chip: string) => {
    sendAiMessage(chip);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      showToast('Microphone activated (Voice Dictation Demo Mode)', 'info');
      setTimeout(() => {
        setIsListening(false);
        setInputText('I have sudden fever with chills and headache for 2 days');
        showToast('Voice transcribed: "I have sudden fever with chills and headache for 2 days"', 'success');
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const handleAttachment = () => {
    showToast('Document / Lab Report scanner opened (PDF / DICOM / JPG)', 'info');
    setInputText('Please explain my Complete Blood Count lab report');
  };

  return (
    <div className="space-y-6">
      {/* Disclaimer Top Warning */}
      <div className="flex items-center space-x-3 p-3.5 bg-navy-950/80 border border-purple-500/30 rounded-xl text-xs text-purple-200">
        <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-white">Clinical Advisory:</strong> This assistant provides AI-guided health information, triage recommendations, and AYUSH-ICD terminology context. It does not replace emergency clinical diagnosis. In life-threatening emergencies, immediately dial <strong>108</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Chat Interface (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[650px]">
          <GlassCard className="flex-1 flex flex-col p-0 border-cyan-500/25 overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 bg-navy-950/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-0.5 shadow-md">
                  <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading font-bold text-white text-base">
                      AI Health Assistant
                    </h3>
                    <span className="flex items-center space-x-1 text-[11px] text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Online</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Clinical Intelligence Engine • RAG Knowledge Base v2.6
                  </p>
                </div>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                  AYUSH + Allopathy Interoperable
                </span>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar bg-navy-950/40">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                        : 'bg-white/[0.07] border border-cyan-500/20 text-slate-100 rounded-bl-none backdrop-blur-md'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[11px] opacity-75 pb-1 border-b border-white/10">
                      <span className="font-semibold flex items-center space-x-1">
                        {msg.sender === 'user' ? (
                          <>
                            <User className="w-3 h-3" />
                            <span>You (Rahul Sharma)</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3 h-3 text-cyan-300" />
                            <span>KMH Health Intelligence</span>
                          </>
                        )}
                      </span>
                      <span className="font-mono">{msg.timestamp}</span>
                    </div>

                    <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {msg.text}
                    </div>

                    {msg.clinicalCitation && (
                      <div className="mt-2 pt-2 border-t border-white/10 text-[10px] text-cyan-300/90 font-mono flex items-center space-x-1">
                        <Database className="w-3 h-3 text-cyan-400" />
                        <span>Source: {msg.clinicalCitation}</span>
                      </div>
                    )}

                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                        {msg.suggestedActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => sendAiMessage(action)}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 transition-colors"
                          >
                            {action} →
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/[0.07] border border-cyan-500/20 rounded-2xl rounded-bl-none p-4 backdrop-blur-md flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs text-cyan-300 font-mono ml-2">Synthesizing clinical response...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-3 bg-navy-950/80 border-t border-white/10 overflow-x-auto">
              <div className="flex items-center space-x-2 min-w-max">
                <span className="text-[11px] text-slate-400 font-medium">Suggestions:</span>
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-200 border border-white/10 hover:border-cyan-500/30 transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 sm:p-4 bg-navy-950 border-t border-white/10 flex items-center space-x-2"
            >
              <button
                type="button"
                onClick={handleAttachment}
                title="Scan / Attach medical document"
                className="p-2.5 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-white/5 border border-white/10 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleMic}
                title={isListening ? 'Listening...' : 'Voice Input'}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5 border-white/10'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Describe your symptoms or ask a health question..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-navy-950 font-bold hover:from-cyan-300 hover:to-teal-300 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-cyan-500/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Right Column: AI Architecture Pipeline Visual (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="p-5 space-y-4 border-purple-500/30">
            <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
              <Cpu className="w-5 h-5 text-purple-400" />
              <div>
                <h4 className="font-heading font-bold text-white text-sm">
                  AI Architecture Pipeline
                </h4>
                <p className="text-[10px] text-slate-400">RAG & Interoperability Model</p>
              </div>
            </div>

            {/* Pipeline flowchart */}
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-navy-950/70 border border-white/10 rounded-xl flex items-center justify-between">
                <span className="text-slate-300 font-medium">1. User Query (Symptoms / Text / Audio)</span>
                <span className="text-[10px] text-cyan-400 font-mono">INPUT</span>
              </div>

              <div className="flex justify-center text-cyan-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              <div className="p-2.5 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-between">
                <span className="text-purple-200 font-medium">2. Medical LLM Reasoning Core</span>
                <span className="text-[10px] text-purple-300 font-mono">TRANSFORMER</span>
              </div>

              <div className="flex justify-center text-purple-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              <div className="p-2.5 bg-teal-950/40 border border-teal-500/30 rounded-xl flex items-center justify-between">
                <span className="text-teal-200 font-medium">3. AYUSH & Clinical Knowledge Base</span>
                <span className="text-[10px] text-teal-300 font-mono">ICD-11 / SNOMED</span>
              </div>

              <div className="flex justify-center text-teal-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              <div className="p-2.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center justify-between">
                <span className="text-cyan-200 font-medium">4. Vector Database / RAG Embeddings</span>
                <span className="text-[10px] text-cyan-300 font-mono">COSINE SIMILARITY</span>
              </div>

              <div className="flex justify-center text-cyan-400">
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>

              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                <span className="text-emerald-200 font-medium">5. Context-Aware Triage Response</span>
                <span className="text-[10px] text-emerald-300 font-mono">VERIFIED OUTPUT</span>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Demo Architecture Note:</strong> This visual diagram represents the live inference pipeline integrating medical ontology retrieval with patient records.
            </div>
          </GlassCard>

          {/* Quick Tips */}
          <GlassCard className="p-4 space-y-2 border-white/10">
            <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Prompting Capabilities</span>
            </h5>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• Ask about seasonal vector fever (Dengue/Malaria)</li>
              <li>• Translate Sanskrit disease names (e.g. *Vishama Jwara*)</li>
              <li>• Interpret abnormal blood test values (Platelets/WBC)</li>
              <li>• Check real-time ICU/General ward availability</li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
