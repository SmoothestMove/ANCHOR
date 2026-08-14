import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import {
  MessageSquareHeart,
  Sparkles,
  AlertTriangle,
  Send,
  ShieldCheck,
  Heart,
  Bot,
  User,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { analyzeAttunementResponse, NLPCheckResult, calculateAttunementScore } from '../../utils/nlpDefensivenessDetector';

export const AttunementCoachView: React.FC = () => {
  const { state, activeRole, sendAttunementMessage } = useTrustEngine();

  const [inputText, setInputText] = useState('');
  const [nlpWarning, setNlpWarning] = useState<NLPCheckResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);

    if (activeRole === 'partnerA' && text.length > 5) {
      const check = analyzeAttunementResponse(text);
      if (check.hasViolation) {
        setNlpWarning(check);
      } else {
        setNlpWarning(null);
      }
    } else {
      setNlpWarning(null);
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setInputText(suggestion);
    setNlpWarning(null);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const hadViolation = nlpWarning?.hasViolation || false;
    sendAttunementMessage(
      inputText,
      inputText,
      hadViolation,
      nlpWarning?.violationType
    );

    setInputText('');
    setNlpWarning(null);
  };

  const currentLiveScore = calculateAttunementScore(inputText);

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30 text-indigo-300">
                  Module 4 • EFT / AIRM Framework
                </span>
                <span className="text-xs text-slate-400">Johnson Attachment Injury Resolution</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-1">
                Real-Time NLP Non-Defensive Attunement Coach
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Analyzes typed inputs in real-time. Intercepts defensiveness, minimization, and blame-shifting while
                providing EFT-aligned blamer-softening and remorse templates.
              </p>
            </div>
          </div>

          {/* Real-time Empathy Rating */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3 min-w-[220px]">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-sm border shadow-inner ${
              currentLiveScore >= 80
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : currentLiveScore >= 60
                ? 'bg-teal-950/80 border-teal-500/40 text-teal-300'
                : 'bg-rose-950/80 border-rose-500/40 text-rose-300'
            }`}>
              {inputText.length > 5 ? `${currentLiveScore}%` : '--'}
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Attunement Validation</div>
              <div className="text-xs font-semibold text-slate-200">
                {inputText.length > 5
                  ? currentLiveScore >= 80 ? 'Deep Empathy & Validation' : 'Moderate Attunement'
                  : 'Awaiting Draft Input'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout: Live Reflection Room & NLP Interceptor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat History & Dialogue Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4 flex flex-col h-[520px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-indigo-400" />
                <h3 className="font-display font-bold text-white text-sm">AIRM Guided Reflection Dialogue</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {state.attunementChat.length} Attuned Exchanges
              </span>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto space-y-3.5 pr-2">
              {state.attunementChat.map((msg) => {
                const isPartnerA = msg.senderRole === 'partnerA';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isPartnerA ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-mono mb-1">
                      {isPartnerA ? (
                        <>
                          <span className="text-amber-400 font-semibold">Partner A (Offender)</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-mono">{msg.validationScore}% Attuned</span>
                        </>
                      ) : (
                        <>
                          <span className="text-teal-400 font-semibold">Partner B (Injured)</span>
                          <span>• Trauma Affect</span>
                        </>
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed border ${
                        isPartnerA
                          ? 'bg-amber-950/40 border-amber-500/30 text-slate-100 rounded-tr-sm'
                          : 'bg-teal-950/40 border-teal-500/30 text-slate-100 rounded-tl-sm'
                      }`}
                    >
                      <p>{msg.finalSentText}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Composer with Live NLP Interception */}
            <form onSubmit={handleSend} className="pt-2 border-t border-slate-800 space-y-2">
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder={
                    activeRole === 'partnerA'
                      ? 'Type reflection to Partner B. NLP coach will monitor for defensiveness or blame-shifting...'
                      : 'Express your current feelings or trauma-related pain...'
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 pr-10"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="absolute right-3 bottom-3 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Real-Time Coach Interceptions & EFT Templates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live NLP Interception Card */}
          {nlpWarning ? (
            <div className="glass-card rounded-2xl p-5 border-2 border-rose-600/60 bg-rose-950/30 space-y-3 animate-in fade-in">
              <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
                <span>Coach Interception: {nlpWarning.violationType?.replace('_', ' ').toUpperCase()}</span>
              </div>

              <p className="text-xs text-rose-100 leading-relaxed font-medium">
                {nlpWarning.warningMessage}
              </p>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                <span className="text-teal-300 font-semibold">Clinical Rationale: </span>
                {nlpWarning.clinicalGuidance}
              </div>

              {nlpWarning.reframingSuggestion && (
                <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-500/40 space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs text-indigo-300 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>EFT Non-Defensive Recommendation:</span>
                  </div>
                  <p className="text-xs text-slate-200 italic">
                    "{nlpWarning.reframingSuggestion}"
                  </p>
                  <button
                    type="button"
                    onClick={() => handleApplySuggestion(nlpWarning.reframingSuggestion!)}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Apply Reframed Response</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs">
                <Bot className="w-4 h-4" />
                <span>AI Clinical Safety Officer Active</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The NLP Coach actively protects both partners by filtering out Gottman's Four Horsemen
                and guiding Partner A into <span className="text-teal-300 font-semibold">Accessibility, Responsiveness, and Engagement (A.R.E.)</span>.
              </p>
            </div>
          )}

          {/* EFT Blamer-Softening Quick Templates */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-display font-bold text-white text-xs flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>EFT Attunement Response Templates</span>
              </h4>
            </div>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleApplySuggestion(
                    'I hear how much pain and uncertainty my actions caused you. You have every right to feel hurt, and I am committed to answering your questions without making excuses.'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white transition"
              >
                <div className="font-semibold text-teal-300 mb-0.5">Validation &amp; Non-Defensive Stance:</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  "I hear how much pain and uncertainty my actions caused you..."
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplySuggestion(
                    'I recognize that rebuilding safety takes time. I will not rush you or ask you to get over it. I am right here with you.'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white transition"
              >
                <div className="font-semibold text-indigo-300 mb-0.5">Patience &amp; De-Pressuring:</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  "I recognize that rebuilding safety takes time. I will not rush you..."
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplySuggestion(
                    'I take 100% responsibility for breaking your trust. There were no external excuses, and I am focused on proving my reliability each day.'
                  )
                }
                className="w-full p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white transition"
              >
                <div className="font-semibold text-amber-300 mb-0.5">Unreserved Responsibility:</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">
                  "I take 100% responsibility for breaking your trust..."
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
