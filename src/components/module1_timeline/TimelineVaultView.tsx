import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ExerciseGuide, ExerciseGuideContent } from '../layout/ExerciseGuide';
import { TimelineEntry, DiagnosticQuestion } from '../../types/clinical';
import {
  FileText,
  Lock,
  Unlock,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Send,
  Sparkles,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import { NLPCheckResult } from '../../utils/nlpDefensivenessDetector';

const GUIDE_CONTENT: ExerciseGuideContent = {
  moduleKey: 'module1_timeline',
  purpose:
    'Eliminate trickle truth and piecemeal disclosure by establishing a single, complete, shared factual timeline. AI-powered NLP guardrails actively prevent intrusive graphic descriptions that trigger Post-Infidelity Stress Disorder (PISD), ensuring disclosures remain clinically safe.',
  howItWorks:
    'Partner A logs chronological events into a dual-lock vault that both partners must unlock together. Each entry is scanned by a clinical NLP engine that blocks graphic sexual content, defensiveness, and blame-shifting. Partner B submits diagnostic questions asynchronously—removing the pressure of real-time confrontation—and Partner A answers them transparently.',
  steps: [
    { role: 'both', text: 'Unlock the Structured Disclosure Session using the Dual-Lock control at the top right. Both partners should be grounded and present.' },
    { role: 'partnerA', text: 'Fill out a Factual Disclosure Entry—select a date, category, event summary, factual diagnostic details, financial cost, and location.' },
    { role: 'partnerA', text: 'Submit the entry. If the NLP guardrail flags a violation, review the clinical guidance and apply the suggested reframe.' },
    { role: 'partnerB', text: 'Review each timeline entry and click "Acknowledge Factual Disclosure" to confirm you have read and processed it.' },
    { role: 'partnerB', text: 'Submit Diagnostic Questions to resolve timeline ambiguities—select a clinical intent focus and type your question.' },
    { role: 'partnerA', text: 'Answer each diagnostic question transparently without defensiveness.' },
  ],
  successCriteria:
    'All timeline entries have been acknowledged by Partner B, and all diagnostic questions have been answered transparently by Partner A. The shared factual reality is established without graphic triggers or defensive language.',
};

export const TimelineVaultView: React.FC = () => {
  const {
    state,
    activeRole,
    addTimelineEntry,
    acknowledgeTimelineEntry,
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
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-teal-950/90 border border-teal-500/40 text-teal-400 shadow-inner">
              <FileText className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-teal-950 border border-teal-500/40 text-teal-300">
                  Module 1 • CBCT Framework
                </span>
                <span className="text-xs text-slate-400 font-mono">Baucom 3-Stage Model</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Asynchronous Dual-Lock Timeline &amp; Disclosure Vault
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Eliminates piecemeal disclosure ("trickle truth") and establishes an objective shared reality while
                AI guardrails actively prevent intrusive graphic descriptions that trigger Post-Infidelity Stress Disorder (PISD).
              </p>
            </div>
          </div>

          {/* Dual-Lock Session Controller */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 shadow-sm">
            <div className="text-right text-xs">
              <div className="font-bold text-white font-display">Structured Disclosure Session</div>
              <div className="text-[11px] text-slate-400 font-mono">
                {isDualLockUnlocked ? 'Mutual Vault Unlocked' : 'Locked to Prevent Late-Night Panic'}
              </div>
            </div>
            <button
              onClick={() => setDualLockSessionActive(!isDualLockUnlocked)}
              aria-pressed={isDualLockUnlocked}
              className={`px-4 py-2.5 rounded-xl border transition-all flex items-center space-x-2 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                isDualLockUnlocked
                  ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200 shadow-md shadow-emerald-950/60 focus-visible:ring-emerald-400'
                  : 'bg-amber-950/90 border-amber-500/60 text-amber-200 shadow-md shadow-amber-950/60 focus-visible:ring-amber-400'
              }`}
            >
              {isDualLockUnlocked ? <Unlock className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Lock className="w-4 h-4 text-amber-400" aria-hidden="true" />}
              <span>{isDualLockUnlocked ? 'Session Active' : 'Unlock Session'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* On-Page Exercise Guide */}
      <ExerciseGuide content={GUIDE_CONTENT} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Partner A Timeline Form or Partner B Question Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Partner A Form */}
          {activeRole === 'partnerA' && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                  <span>Partner A: Submit Factual Disclosure Entry</span>
                </h3>
                <span className="text-[10px] font-mono text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/40 font-semibold">
                  Factual Reality
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Log chronological events. <span className="text-teal-300 font-semibold">Strict Rule:</span> Focus only on objective diagnostic facts (who, what, when, financial scope). Avoid self-justifications or graphic sexual descriptions.
              </p>

              {/* NLP Guardrail Warning Alert */}
              {nlpError && (
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-600/60 text-xs space-y-2.5 animate-in fade-in" role="alert">
                  <div className="flex items-center space-x-2 text-rose-300 font-bold">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-rose-400" aria-hidden="true" />
                    <span>{nlpError.warningMessage}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{nlpError.clinicalGuidance}</p>
                  {nlpError.reframingSuggestion && (
                    <div className="mt-2 pt-2.5 border-t border-rose-900/60">
                      <div className="text-[11px] text-teal-300 font-bold mb-1 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-teal-400" aria-hidden="true" />
                        <span>EFT Non-Defensive Recommendation:</span>
                      </div>
                      <p className="text-[11px] italic text-slate-200 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                        &ldquo;{nlpError.reframingSuggestion}&rdquo;
                      </p>
                      <button
                        type="button"
                        onClick={() => handleApplySuggestion(nlpError.reframingSuggestion!)}
                        className="mt-2 px-3 py-1.5 rounded-lg bg-teal-900/90 hover:bg-teal-800 border border-teal-500/40 text-teal-200 text-xs font-semibold flex items-center space-x-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                        <span>Apply Non-Defensive Reframe</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleCreateEntry} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="timeline-entry-date" className="text-slate-400 block mb-1 font-medium">Date of Event:</label>
                    <input
                      id="timeline-entry-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      autoComplete="off"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline-entry-category" className="text-slate-400 block mb-1 font-medium">Category:</label>
                    <select
                      id="timeline-entry-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TimelineEntry['category'])}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
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
                  <label htmlFor="timeline-entry-title" className="text-slate-400 block mb-1 font-medium">Event Summary Title:</label>
                  <input
                    id="timeline-entry-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. In-Person Meeting at Coffee Shop&hellip;"
                    required
                    autoComplete="off"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="timeline-entry-details" className="text-slate-400 block mb-1 font-medium">
                    Factual Diagnostic Details <span className="text-slate-500">(Scanned by Clinical NLP)</span>:
                  </label>
                  <textarea
                    id="timeline-entry-details"
                    value={factualDescription}
                    onChange={(e) => setFactualDescription(e.target.value)}
                    rows={4}
                    placeholder="Describe diagnostic facts (who was present, duration, nature of discussions)&hellip; Avoid explicit physical descriptions or defensive justifications."
                    required
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="timeline-entry-cost" className="text-slate-400 block mb-1 font-medium flex items-center space-x-1">
                      <DollarSign className="w-3 h-3 text-slate-500" aria-hidden="true" />
                      <span>Financial Cost:</span>
                    </label>
                    <input
                      id="timeline-entry-cost"
                      type="text"
                      inputMode="decimal"
                      value={financialScope}
                      onChange={(e) => setFinancialScope(e.target.value)}
                      placeholder="e.g. $45.00 personal card&hellip;"
                      autoComplete="off"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
                    />
                  </div>
                  <div>
                    <label htmlFor="timeline-entry-location" className="text-slate-400 block mb-1 font-medium flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-500" aria-hidden="true" />
                      <span>Location:</span>
                    </label>
                    <input
                      id="timeline-entry-location"
                      type="text"
                      value={locationScope}
                      onChange={(e) => setLocationScope(e.target.value)}
                      placeholder="e.g. Cafe Metro&hellip;"
                      autoComplete="off"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center justify-center space-x-2 transition shadow-md shadow-teal-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Submit to Dual-Lock Vault</span>
                </button>
              </form>
            </div>
          )}

          {/* Partner B Question Queue Form */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-teal-400" aria-hidden="true" />
                <span>Partner B: Diagnostic Question Queue</span>
              </h3>
              <span className="text-[10px] font-mono text-teal-300 uppercase bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/40 font-semibold">
                Epistemic Safety
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Input diagnostic inquiries to resolve timeline ambiguities without feeling pressured into immediate late-night confrontation.
            </p>

            <form onSubmit={handleAddQuestion} className="space-y-4 text-xs">
              <div>
                <label htmlFor="diagnostic-question-intent" className="text-slate-400 block mb-1 font-medium">Clinical Intent Focus:</label>
                <select
                  id="diagnostic-question-intent"
                  value={clinicalIntent}
                  onChange={(e) => setClinicalIntent(e.target.value as DiagnosticQuestion['clinicalIntent'])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
                >
                  <option value="factual_clarity">Factual Reality &amp; Clarification</option>
                  <option value="timeline_gap">Timeline Gap Resolution</option>
                  <option value="financial_impact">Financial Scope &amp; Asset Use</option>
                  <option value="boundary_reassurance">Relational Boundary &amp; No-Contact Confirmation</option>
                </select>
              </div>

              <div>
                <label htmlFor="diagnostic-question-text" className="text-slate-400 block mb-1 font-medium">Your Question:</label>
                <textarea
                  id="diagnostic-question-text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  rows={3}
                  placeholder="e.g. When did the first direct communication occur, and were joint accounts ever accessed?"
                  required
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-teal-300 hover:text-white font-semibold flex items-center justify-center space-x-2 transition border border-teal-500/40 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <Send className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Submit Diagnostic Question</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Timeline Chronology & Question Answers */}
        <div className="lg:col-span-7 space-y-6">
          {/* Timeline Feed */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-teal-400" aria-hidden="true" />
                <h3 className="font-display font-bold text-white text-sm">Chronological Disclosure Timeline</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono font-medium">
                {state.timeline.entries.length} Events Logged
              </span>
            </div>

            {!isDualLockUnlocked && (
              <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/40 text-xs text-slate-300 flex items-start space-x-3.5 shadow-sm">
                <Lock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1">
                  <div className="font-bold text-amber-300 font-display">Dual-Lock Active: Session Required to Read</div>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    To prevent triggering late-night rumination or panic, disclosures are visible during structured
                    disclosure sessions when both partners are grounded and present.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3.5">
              {state.timeline.entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    entry.status === 'disclosed_and_reviewed'
                      ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-900/90 border-teal-500/40 shadow-sm'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/80 px-2.5 py-0.5 rounded-md border border-teal-500/40">
                        {entry.date}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">{entry.title}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {entry.partnerB_Acknowledged ? (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-md flex items-center space-x-1 font-semibold">
                          <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                          <span>Reviewed &amp; Acknowledged</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded-md flex items-center space-x-1 font-semibold">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          <span>Pending Review</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Factual Description */}
                  {isDualLockUnlocked ? (
                    <div className="space-y-2.5 text-xs">
                      <p className="text-slate-200 leading-relaxed bg-slate-950/90 p-3.5 rounded-xl border border-slate-800/80 font-normal">
                        {entry.factualDescription}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 font-mono pt-1">
                        <span className="flex items-center space-x-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                          <span>Cost: <strong className="text-slate-300">{entry.financialScope}</strong></span>
                        </span>
                        <span className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                          <span>Location: <strong className="text-slate-300">{entry.locationScope}</strong></span>
                        </span>
                      </div>

                      {/* Partner B Review Action */}
                      {activeRole === 'partnerB' && !entry.partnerB_Acknowledged && (
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => acknowledgeTimelineEntry(entry.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-teal-950/90 hover:bg-teal-900 border border-teal-500/50 text-teal-200 text-xs font-semibold flex items-center space-x-2 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" aria-hidden="true" />
                            <span>Acknowledge Factual Disclosure</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic p-3 bg-slate-950/50 rounded-xl font-mono">
                      [Locked until structured disclosure session is active]
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Question Queue & Answers */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-teal-400" aria-hidden="true" />
                <h3 className="font-display font-bold text-white text-sm">Diagnostic Inquiry &amp; Answers</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono font-medium">
                {state.timeline.questions.length} Inquiries
              </span>
            </div>

            <div className="space-y-3.5">
              {state.timeline.questions.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-slate-200 text-xs sm:text-sm leading-relaxed">{q.question}</div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 whitespace-nowrap font-semibold">
                      {q.clinicalIntent.replace('_', ' ')}
                    </span>
                  </div>

                  {q.isAnswered ? (
                    <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 text-slate-300 space-y-1.5">
                      <div className="text-[11px] font-bold text-teal-400 flex items-center space-x-1.5 font-display">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Partner A Response:</span>
                      </div>
                      <p className="leading-relaxed text-slate-200">{q.answerText}</p>
                    </div>
                  ) : (
                    <div>
                      {activeRole === 'partnerA' ? (
                        activeAnswerId === q.id ? (
                          <div className="space-y-2.5 pt-2">
                            <label htmlFor={`answer-draft-${q.id}`} className="sr-only">Answer to diagnostic question</label>
                            <textarea
                              id={`answer-draft-${q.id}`}
                              value={answerDraft}
                              onChange={(e) => setAnswerDraft(e.target.value)}
                              rows={3}
                              placeholder="Provide transparent factual answer without defensiveness&hellip;"
                              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500 text-xs"
                            />
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setActiveAnswerId(null)}
                                className="px-3 py-1.5 text-slate-400 hover:text-slate-200 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 rounded"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveAnswer(q.id)}
                                className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
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
                            className="mt-1 px-3.5 py-1.5 bg-amber-950/90 border border-amber-500/50 text-amber-200 rounded-xl font-semibold text-xs hover:bg-amber-900 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                          >
                            Answer Diagnostic Question
                          </button>
                        )
                      ) : (
                        <div className="text-xs text-slate-500 italic font-mono pt-1">Awaiting Partner A response&hellip;</div>
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
