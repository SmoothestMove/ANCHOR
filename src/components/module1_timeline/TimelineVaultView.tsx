import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { TimelineEntry, DiagnosticQuestion } from '../../types/clinical';
import {
  FileText,
  Lock,
  Unlock,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Send,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';
import { NLPCheckResult } from '../../utils/nlpDefensivenessDetector';

export const TimelineVaultView: React.FC = () => {
  const {
    state,
    activeRole,
    addTimelineEntry,
    acknowledgeTimelineEntry,
    signoffTimelinePartnerA,
    addDiagnosticQuestion,
    answerDiagnosticQuestion,
    setDualLockSessionActive,
  } = useTrustEngine();

  // Partner A Form State
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TimelineEntry['category']>('direct_contact');
  const [factualDescription, setFactualDescription] = useState('');
  const [financialScope, setFinancialScope] = useState('');
  const [locationScope, setLocationScope] = useState('');
  const [nlpError, setNlpError] = useState<NLPCheckResult | null>(null);

  // Partner B Question State
  const [questionText, setQuestionText] = useState('');
  const [clinicalIntent, setClinicalIntent] = useState<DiagnosticQuestion['clinicalIntent']>('factual_clarity');
  const [activeAnswerId, setActiveAnswerId] = useState<string | null>(null);
  const [answerDraft, setAnswerDraft] = useState('');

  const isDualLockUnlocked = state.timeline.dualLockUnlocked || state.timeline.sessionActive;

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    setNlpError(null);

    const result = addTimelineEntry({
      date,
      title,
      category,
      factualDescription,
      financialScope: financialScope || '$0.00',
      locationScope: locationScope || 'Unspecified',
      status: 'locked_for_session',
    });

    if (!result.success && result.nlpResult) {
      setNlpError(result.nlpResult);
    } else {
      // Reset form
      setTitle('');
      setFactualDescription('');
      setFinancialScope('');
      setLocationScope('');
      setNlpError(null);
    }
  };

  const handleApplySuggestion = (suggestion: string) => {
    setFactualDescription(suggestion);
    setNlpError(null);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    addDiagnosticQuestion(questionText, clinicalIntent);
    setQuestionText('');
  };

  const handleSaveAnswer = (qId: string) => {
    if (!answerDraft.trim()) return;
    answerDiagnosticQuestion(qId, answerDraft);
    setActiveAnswerId(null);
    setAnswerDraft('');
  };

  return (
    <div className="space-y-6">
      {/* Module 1 Header & Dual-Lock Status */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-teal-950 border border-teal-500/30 text-teal-300">
                  Module 1 • CBCT Framework
                </span>
                <span className="text-xs text-slate-400">Baucom 3-Stage Model</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-1">
                Asynchronous Dual-Lock Timeline &amp; Disclosure Vault
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Eliminates piecemeal disclosure ("trickle truth") and establishes an objective shared reality while
                AI guardrails actively prevent intrusive graphic descriptions that trigger Post-Infidelity Stress Disorder (PISD).
              </p>
            </div>
          </div>

          {/* Dual-Lock Session Controller */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center space-x-3">
            <div className="text-right text-xs">
              <div className="font-semibold text-white">Structured Disclosure Session</div>
              <div className="text-[11px] text-slate-400">
                {isDualLockUnlocked ? 'Mutual Vault Unlocked' : 'Locked to Prevent Late-Night Panic'}
              </div>
            </div>
            <button
              onClick={() => setDualLockSessionActive(!isDualLockUnlocked)}
              className={`p-2.5 rounded-xl border transition flex items-center space-x-1.5 text-xs font-semibold ${
                isDualLockUnlocked
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950/50'
                  : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
              }`}
            >
              {isDualLockUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isDualLockUnlocked ? 'Session Active' : 'Unlock Session'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Partner A Timeline Form or Partner B Question Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Asymmetric Role Guidance */}
          {activeRole === 'partnerA' && (
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Partner A: Submit Factual Disclosure Entry</span>
                </h3>
                <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
                  Factual Reality
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Log chronological factual events. <span className="text-teal-300 font-semibold">Strict Rule:</span> Focus only on objective diagnostic facts (who, what, when, financial scope). Avoid self-justifications or graphic sexual descriptions.
              </p>

              {/* NLP Guardrail Warning Alert */}
              {nlpError && (
                <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-600/50 text-xs space-y-2 animate-in fade-in">
                  <div className="flex items-center space-x-2 text-rose-300 font-semibold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>{nlpError.warningMessage}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{nlpError.clinicalGuidance}</p>
                  {nlpError.reframingSuggestion && (
                    <div className="mt-2 pt-2 border-t border-rose-900/50">
                      <div className="text-[11px] text-teal-300 font-medium mb-1">EFT Non-Defensive Recommendation:</div>
                      <p className="text-[11px] italic text-slate-200">"{nlpError.reframingSuggestion}"</p>
                      <button
                        type="button"
                        onClick={() => handleApplySuggestion(nlpError.reframingSuggestion!)}
                        className="mt-1.5 px-2.5 py-1 rounded bg-teal-900/80 hover:bg-teal-800 border border-teal-500/30 text-teal-200 text-[10px] font-medium flex items-center space-x-1"
                      >
                        <Sparkles className="w-3 h-3 text-teal-400" />
                        <span>Apply Non-Defensive Reframe</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleCreateEntry} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Date of Event:</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TimelineEntry['category'])}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="direct_contact">Direct In-Person Contact</option>
                      <option value="digital_messaging">Digital Messaging / Calls</option>
                      <option value="financial_expenditure">Financial Expenditure</option>
                      <option value="deception_event">Cover Story / Deception</option>
                      <option value="disclosure_event">Voluntary Disclosure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Event Summary Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. In-Person Meeting at Coffee Shop"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">
                    Factual Diagnostic Details <span className="text-slate-500">(Scanned by Clinical NLP)</span>:
                  </label>
                  <textarea
                    value={factualDescription}
                    onChange={(e) => setFactualDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe facts (who was present, duration, nature of discussions). Avoid explicit physical descriptions or defensive justifications."
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1 flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-slate-500" />
                      <span>Financial Cost:</span>
                    </label>
                    <input
                      type="text"
                      value={financialScope}
                      onChange={(e) => setFinancialScope(e.target.value)}
                      placeholder="e.g. $45.00 personal card"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1 flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>Location:</span>
                    </label>
                    <input
                      type="text"
                      value={locationScope}
                      onChange={(e) => setLocationScope(e.target.value)}
                      placeholder="e.g. Cafe Metro"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium flex items-center justify-center space-x-1.5 transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit to Dual-Lock Vault</span>
                </button>
              </form>
            </div>
          )}

          {/* Partner B Question Queue Form */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-teal-400" />
                <span>Partner B: Diagnostic Question Queue</span>
              </h3>
              <span className="text-[10px] font-mono text-teal-300 uppercase bg-teal-950/50 px-2 py-0.5 rounded border border-teal-500/30">
                Epistemic Safety
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Input diagnostic inquiries to resolve timeline ambiguities without feeling pressured into immediate confrontation.
            </p>

            <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Clinical Intent Focus:</label>
                <select
                  value={clinicalIntent}
                  onChange={(e) => setClinicalIntent(e.target.value as DiagnosticQuestion['clinicalIntent'])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="factual_clarity">Factual Reality &amp; Clarification</option>
                  <option value="timeline_gap">Timeline Gap Resolution</option>
                  <option value="financial_impact">Financial Scope &amp; Asset Use</option>
                  <option value="boundary_reassurance">Relational Boundary &amp; No-Contact Confirmation</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Your Question:</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={3}
                  placeholder="e.g. When did the first direct communication occur, and were joint accounts ever accessed?"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-medium flex items-center justify-center space-x-1.5 transition border border-teal-500/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Diagnostic Question</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Timeline Chronology & Question Answers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Timeline Feed */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h3 className="font-display font-bold text-white text-sm">Chronological Disclosure Timeline</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {state.timeline.entries.length} Events Logged
              </span>
            </div>

            {!isDualLockUnlocked && (
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 text-xs text-slate-300 flex items-start space-x-3">
                <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-amber-300">Dual-Lock Active: Session Required to Read</div>
                  <p className="text-slate-400">
                    To prevent triggering late-night rumination or panic, disclosures are visible during structured
                    disclosure sessions when both partners are grounded and present.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {state.timeline.entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-xl border transition ${
                    entry.status === 'disclosed_and_reviewed'
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-900/90 border-teal-500/30'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950 px-2 py-0.5 rounded border border-teal-500/30">
                        {entry.date}
                      </span>
                      <span className="text-xs font-bold text-white">{entry.title}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {entry.partnerB_Acknowledged ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center space-x-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Reviewed &amp; Acknowledged</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Factual Description (Protected by Session Lock) */}
                  {isDualLockUnlocked ? (
                    <div className="space-y-2 text-xs">
                      <p className="text-slate-200 leading-relaxed bg-slate-950/80 p-3 rounded-lg border border-slate-850">
                        {entry.factualDescription}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                        <span className="flex items-center space-x-1">
                          <DollarSign className="w-3 h-3 text-slate-500" />
                          <span>Cost: {entry.financialScope}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>Location: {entry.locationScope}</span>
                        </span>
                      </div>

                      {/* Asymmetric Review Action */}
                      {activeRole === 'partnerB' && !entry.partnerB_Acknowledged && (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => acknowledgeTimelineEntry(entry.id)}
                            className="px-3 py-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 border border-teal-500/40 text-teal-300 text-xs font-medium flex items-center space-x-1.5 transition"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                            <span>Acknowledge Factual Disclosure</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic p-2 bg-slate-950/40 rounded">
                      [Locked until structured disclosure session is active]
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Question Queue & Answers */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-teal-400" />
                <h3 className="font-display font-bold text-white text-sm">Diagnostic Inquiry &amp; Answers</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{state.timeline.questions.length} Inquiries</span>
            </div>

            <div className="space-y-3">
              {state.timeline.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-slate-200">{q.question}</div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap">
                      {q.clinicalIntent.replace('_', ' ')}
                    </span>
                  </div>

                  {q.isAnswered ? (
                    <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-500/20 text-slate-300 space-y-1">
                      <div className="text-[11px] font-semibold text-teal-400 flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Partner A Response:</span>
                      </div>
                      <p className="leading-relaxed">{q.answerText}</p>
                    </div>
                  ) : (
                    <div>
                      {activeRole === 'partnerA' ? (
                        activeAnswerId === q.id ? (
                          <div className="space-y-2 pt-2">
                            <textarea
                              value={answerDraft}
                              onChange={(e) => setAnswerDraft(e.target.value)}
                              rows={3}
                              placeholder="Provide transparent factual answer without defensiveness..."
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setActiveAnswerId(null)}
                                className="px-3 py-1 text-slate-400 hover:text-slate-200"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveAnswer(q.id)}
                                className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium"
                              >
                                Submit Answer
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveAnswerId(q.id);
                              setAnswerDraft('');
                            }}
                            className="mt-1 px-3 py-1.5 bg-amber-950/80 border border-amber-500/40 text-amber-300 rounded-lg font-medium text-xs hover:bg-amber-900 transition"
                          >
                            Answer Diagnostic Question
                          </button>
                        )
                      ) : (
                        <div className="text-xs text-slate-500 italic">Awaiting Partner A response...</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
