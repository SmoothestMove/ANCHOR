import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ExerciseGuide, ExerciseGuideContent } from '../layout/ExerciseGuide';
import {
  MessageSquareHeart,
  Sparkles,
  AlertTriangle,
  Send,
  Heart,
  Bot,
  CheckCircle2,
} from 'lucide-react';
import { analyzeAttunementResponse, NLPCheckResult, calculateAttunementScore } from '../../utils/nlpDefensivenessDetector';

const GUIDE_CONTENT: ExerciseGuideContent = {
  moduleKey: 'module4_attunement',
  purpose:
    'Train Partner A to communicate with deep empathy and emotional attunement by intercepting defensiveness, minimization, blame-shifting, and stonewalling in real time. This module facilitates EFT-aligned Attachment Injury Resolution (AIRM)—guiding the offending partner away from self-protection and toward genuine Accessibility, Responsiveness, and Engagement (A.R.E.).',
  howItWorks:
    'As Partner A types a message, a real-time NLP engine scans for Gottman\'s Four Horsemen and other defensive patterns. If a violation is detected, the coach intercepts with clinical rationale and offers an EFT-aligned reframed alternative. The live Attunement Score provides instant feedback on empathic quality. Pre-built EFT response templates are available as starting points for difficult conversations.',
  steps: [
    { role: 'partnerA', text: 'Type a reflection or response to Partner B in the message composer. Watch the Attunement Score update in real time as you type.' },
    { role: 'partnerA', text: 'If the NLP Coach Interception panel appears, read the violation type, clinical rationale, and the recommended non-defensive reframe.' },
    { role: 'partnerA', text: 'Optionally click "Apply Reframed Response" to replace your draft with the coach\'s suggestion, or edit it yourself to achieve a higher attunement score.' },
    { role: 'partnerA', text: 'Send the finalized message once you are satisfied with the attunement quality.' },
    { role: 'partnerB', text: 'Share your current feelings, pain, or trauma-related experience in the dialogue. There is no NLP filtering on Partner B\'s messages—express freely.' },
    { role: 'partnerA', text: 'If you\'re stuck, use the EFT Attunement Response Templates on the right sidebar as starting points for validation, patience, or unreserved responsibility.' },
  ],
  successCriteria:
    'Partner A consistently sends messages scoring \u226580% attunement without coach interceptions. The dialogue demonstrates genuine emotional validation, non-defensive stance, and empathic responsiveness.',
};

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
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-indigo-950/90 border border-indigo-500/40 text-indigo-400 shadow-inner">
              <MessageSquareHeart className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-indigo-950 border border-indigo-500/40 text-indigo-300">
                  Module 4 • EFT / AIRM Framework
                </span>
                <span className="text-xs text-slate-400 font-mono">Johnson Attachment Injury Resolution</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Real-Time NLP Non-Defensive Attunement Coach
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Analyzes typed inputs in real-time. Intercepts defensiveness, minimization, and blame-shifting while
                providing EFT-aligned blamer-softening and remorse templates.
              </p>
            </div>
          </div>

          {/* Real-time Empathy Rating */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 min-w-[240px] shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-extrabold font-mono text-base border shadow-inner ${
              currentLiveScore >= 80
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                : currentLiveScore >= 60
                ? 'bg-teal-950/90 border-teal-500/50 text-teal-300'
                : 'bg-rose-950/90 border-rose-500/50 text-rose-300'
            }`}>
              {inputText.length > 5 ? `${currentLiveScore}%` : '--'}
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-slate-400 font-medium">Attunement Score</div>
              <div className="text-xs font-bold text-slate-200 font-display mt-0.5">
                {inputText.length > 5
                  ? currentLiveScore >= 80 ? 'Deep Empathy & Validation' : 'Moderate Attunement'
                  : 'Awaiting Draft Input'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* On-Page Exercise Guide */}
      <ExerciseGuide content={GUIDE_CONTENT} />

      {/* Main Layout: Live Reflection Room & NLP Interceptor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat History & Dialogue Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col h-[540px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-indigo-400" />
                <h3 className="font-display font-bold text-white text-sm">AIRM Guided Reflection Dialogue</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono font-medium">
                {state.attunementChat.length} Exchanges
              </span>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {state.attunementChat.map((msg) => {
                const isPartnerA = msg.senderRole === 'partnerA';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isPartnerA ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono mb-1.5">
                      {isPartnerA ? (
                        <>
                          <span className="text-amber-400 font-bold">Partner A (Offender)</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-mono font-semibold">{msg.validationScore}% Attuned</span>
                        </>
                      ) : (
                        <>
                          <span className="text-teal-400 font-bold">Partner B (Injured)</span>
                          <span>• Trauma Affect</span>
                        </>
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border shadow-sm ${
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
            <form onSubmit={handleSend} className="pt-3 border-t border-slate-800 space-y-2">
              <div className="relative">
                <label htmlFor="attunement-message" className="sr-only">
                  {activeRole === 'partnerA' ? 'Reflection to Partner B' : 'Your current feelings'}
                </label>
                <textarea
                  id="attunement-message"
                  value={inputText}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder={
                    activeRole === 'partnerA'
                      ? 'Type reflection to Partner B. NLP coach will monitor for defensiveness or blame-shifting in real-time&hellip;'
                      : 'Express your current feelings or trauma-related pain&hellip;'
                  }
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs sm:text-sm placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus:border-indigo-500 pr-12 leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  aria-label="Send message"
                  className="absolute right-3 bottom-3 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white transition shadow-md shadow-indigo-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Real-Time Coach Interceptions & EFT Templates */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live NLP Interception Card */}
          {nlpWarning ? (
            <div className="glass-card rounded-2xl p-6 border-2 border-rose-600/70 bg-rose-950/40 space-y-4 animate-in fade-in shadow-xl shadow-rose-950/50" role="alert">
              <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs font-display">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
                <span>Coach Interception: {nlpWarning.violationType?.replace('_', ' ').toUpperCase()}</span>
              </div>

              <p className="text-xs text-rose-100 leading-relaxed font-semibold">
                {nlpWarning.warningMessage}
              </p>

              <div className="p-3.5 bg-slate-950/90 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="text-teal-300 font-bold">Clinical Rationale: </span>
                {nlpWarning.clinicalGuidance}
              </div>

              {nlpWarning.reframingSuggestion && (
                <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-500/40 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-xs text-indigo-300 font-bold font-display">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                    <span>EFT Non-Defensive Recommendation:</span>
                  </div>
                  <p className="text-xs text-slate-200 italic leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                    &ldquo;{nlpWarning.reframingSuggestion}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => handleApplySuggestion(nlpWarning.reframingSuggestion!)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition shadow-md shadow-indigo-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Apply Reframed Response</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-xs font-display">
                <Bot className="w-4 h-4" aria-hidden="true" />
                <span>AI Clinical Safety Officer Active</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The NLP Coach actively protects both partners by filtering out Gottman's Four Horsemen
                and guiding Partner A into <span className="text-teal-300 font-semibold">Accessibility, Responsiveness, and Engagement (A.R.E.)</span>.
              </p>
            </div>
          )}

          {/* EFT Blamer-Softening Quick Templates */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-display font-bold text-white text-xs flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                <span>EFT Attunement Response Templates</span>
              </h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <button
                type="button"
                onClick={() =>
                  handleApplySuggestion(
                    'I hear how much pain and uncertainty my actions caused you. You have every right to feel hurt, and I am committed to answering your questions without making excuses.'
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <div className="font-bold text-teal-300 mb-0.5">Validation &amp; Non-Defensive Stance:</div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  &ldquo;I hear how much pain and uncertainty my actions caused you&hellip;&rdquo;
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplySuggestion(
                    'I recognize that rebuilding safety takes time. I will not rush you or ask you to get over it. I am right here with you.'
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <div className="font-bold text-indigo-300 mb-0.5">Patience &amp; De-Pressuring:</div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  &ldquo;I recognize that rebuilding safety takes time. I will not rush you&hellip;&rdquo;
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplySuggestion(
                    'I take 100% responsibility for breaking your trust. There were no external excuses, and I am focused on proving my reliability each day.'
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-left text-slate-300 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <div className="font-bold text-amber-300 mb-0.5">Unreserved Responsibility:</div>
                <div className="text-xs text-slate-400 line-clamp-2">
                  &ldquo;I take 100% responsibility for breaking your trust&hellip;&rdquo;
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
