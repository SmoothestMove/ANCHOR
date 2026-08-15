import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ExerciseGuide, ExerciseGuideContent } from '../layout/ExerciseGuide';
import { MicroCommitment } from '../../types/clinical';
import {
  CheckSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Plus,
  FileCheck,
  Calendar,
} from 'lucide-react';

const GUIDE_CONTENT: ExerciseGuideContent = {
  moduleKey: 'module3_commitments',
  purpose:
    'Replace useless verbal apologies with observable, verifiable behavioral data. After betrayal, the injured partner\'s brain constructs a protective Threat Default Schema that cannot be overwritten by words alone. Only high-frequency, empirically verified behavioral consistency produces genuine safety reconditioning through operant learning principles.',
  howItWorks:
    'Partner A logs small, specific, verifiable daily commitments (scheduled check-ins, arrival/departure times, financial transparency, or attunement reflections). Upon completing each commitment, Partner A submits proof (timestamp, location, receipt, or self-verified reflection). Partner B independently reviews and verifies each action. The Behavioral Consistency Index (BCI) dynamically tracks cumulative reliability across all commitments.',
  steps: [
    { role: 'partnerA', text: 'Create a daily micro-commitment: enter a title, select a category (Scheduled Check-in, Arrival/Departure, Financial Transparency, or Attunement Reflection), and set a due time.' },
    { role: 'partnerA', text: 'When you complete the action, click "Complete Action with Proof"—select a proof type and provide the evidence details.' },
    { role: 'partnerB', text: 'Review each completed commitment and its submitted proof. Click "Verify & Validate Micro-Action" to confirm the action was genuinely completed.' },
    { role: 'both', text: 'Monitor the Behavioral Consistency Index (BCI) gauge to track overall reliability. The clinical target is \u226595%.' },
  ],
  successCriteria:
    'The Behavioral Consistency Index (BCI) reaches and sustains \u226595%, demonstrating reliable, verifiable behavioral patterns over time. Partner B\'s threat schema begins to yield to empirical safety data.',
};

export const MicroCommitmentDashboard: React.FC = () => {
  const { state, activeRole, addCommitment, completeCommitment, verifyCommitment, calculatedBCI } = useTrustEngine();

  // New Commitment Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MicroCommitment['category']>('communication');
  const [dueTime, setDueTime] = useState('12:30 PM');
  const [targetDate] = useState(new Date().toISOString().split('T')[0]);

  // Complete modal state
  const [activeCompletingId, setActiveCompletingId] = useState<string | null>(null);
  const [proofType, setProofType] = useState<MicroCommitment['proofType']>('timestamp');
  const [proofDetail, setProofDetail] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addCommitment({
      title,
      category,
      dueTime,
      targetDate,
      proofType: 'timestamp',
    });
    setTitle('');
  };

  const handleCompleteSubmit = (cId: string) => {
    if (!proofDetail.trim()) return;
    completeCommitment(cId, proofType, proofDetail);
    setActiveCompletingId(null);
    setProofDetail('');
  };

  const total = state.commitments.length;
  const completed = state.commitments.filter((c) => c.completed).length;
  const verified = state.commitments.filter((c) => c.completed && c.verifiedByPartnerB).length;

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-teal-950/90 border border-teal-500/40 text-teal-400 shadow-inner">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-teal-950 border border-teal-500/40 text-teal-300">
                  Module 3 • Operant Conditioning
                </span>
                <span className="text-xs text-slate-400 font-mono">Truth-Default &amp; Threat Schema Extinction</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Behavioral Reliability &amp; Micro-Commitment Dashboard
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Reconditions threat beliefs through observable, time-tested behavioral consistency—replacing useless verbal reassurances with empirical data.
              </p>
            </div>
          </div>

          {/* BCI Gauge Pill */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 min-w-[260px] shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-teal-950/90 border border-teal-500/50 flex items-center justify-center text-teal-300 font-extrabold font-mono text-lg shadow-inner">
              {calculatedBCI}%
            </div>
            <div>
              <div className="text-[11px] uppercase font-mono text-slate-400 font-medium">Behavioral Consistency Index</div>
              <div className="text-xs font-bold text-teal-300 font-display mt-0.5">
                {calculatedBCI >= 95 ? 'Clinical Target Exceeded (>95%)' : 'Building Empirical Consistency'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* On-Page Exercise Guide */}
      <ExerciseGuide content={GUIDE_CONTENT} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Log New Micro-Commitment (Partner A) & Clinical Rationale */}
        <div className="lg:col-span-5 space-y-6">
          {activeRole === 'partnerA' && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Partner A: Log Daily Micro-Commitment</span>
                </h3>
                <span className="text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/40 font-semibold">
                  Voluntary
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Log specific, verifiable daily commitments. Small, repeated follow-throughs rewire the partner's expectation of deception.
              </p>

              <form onSubmit={handleAdd} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Commitment Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Call at 12:15 PM from desk / Upload lunch receipt"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MicroCommitment['category'])}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 text-xs"
                    >
                      <option value="communication">Scheduled Check-in</option>
                      <option value="schedule">Arrival / Departure</option>
                      <option value="financial">Financial Transparency</option>
                      <option value="relational_care">Attunement Reflection</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1 font-medium">Due Time:</label>
                    <input
                      type="text"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      placeholder="e.g. 12:30 PM"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center justify-center space-x-2 transition shadow-md shadow-teal-950/50"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Micro-Commitment</span>
                </button>
              </form>
            </div>
          )}

          {/* Operant Psychology Explainer */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-2 text-teal-400">
              <TrendingUp className="w-4 h-4" />
              <h3 className="font-display font-bold text-white text-sm">Operant Trust Analytics</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When betrayal occurs, the injured partner's brain constructs a protective <span className="text-amber-300 font-semibold">Threat Default Schema</span>. Verbal apologies are biologically ineffective at altering this schema. Only high-frequency, verifiable behavioral consistency produces long-term safety reconditioning.
            </p>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-medium">Commitment Completion Rate:</span>
                <span className="font-mono text-teal-300 font-bold">{completed} of {total}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                />
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-400 font-medium">Partner B Verified:</span>
                <span className="font-mono text-emerald-400 font-bold">{verified} Actions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Commitment Tracker & Verifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h3 className="font-display font-bold text-white text-sm">Active Daily Commitments</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono font-medium">{total} Logged</span>
            </div>

            <div className="space-y-3.5">
              {state.commitments.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    c.completed && c.verifiedByPartnerB
                      ? 'bg-slate-950/70 border-slate-800'
                      : c.completed
                      ? 'bg-slate-900/90 border-teal-500/40 shadow-sm'
                      : 'bg-slate-900/40 border-slate-850'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-teal-400 font-semibold">
                        {c.dueTime}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white">{c.title}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {c.completed ? (
                        c.verifiedByPartnerB ? (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-md flex items-center space-x-1 font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified by Partner B</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-teal-300 bg-teal-950/70 border border-teal-500/40 px-2.5 py-0.5 rounded-md flex items-center space-x-1 font-semibold">
                            <FileCheck className="w-3 h-3" />
                            <span>Completed / Awaiting Verification</span>
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded-md flex items-center space-x-1 font-semibold">
                          <Clock className="w-3 h-3" />
                          <span>Pending Action</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Proof Details if completed */}
                  {c.completed && c.proofDetail && (
                    <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-300 space-y-1 my-2.5">
                      <div className="flex items-center space-x-1.5 text-[11px] text-teal-400 font-mono font-semibold">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Submitted Proof ({c.proofType}):</span>
                      </div>
                      <p className="leading-relaxed text-slate-200">{c.proofDetail}</p>
                    </div>
                  )}

                  {/* Partner A Action: Submit Proof */}
                  {activeRole === 'partnerA' && !c.completed && (
                    <div className="pt-2">
                      {activeCompletingId === c.id ? (
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-teal-500/40 space-y-2.5 text-xs">
                          <div className="flex gap-2">
                            <select
                              value={proofType}
                              onChange={(e) => setProofType(e.target.value as MicroCommitment['proofType'])}
                              className="px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                            >
                              <option value="timestamp">Timestamp Note</option>
                              <option value="location_checkin">Location / GPS Note</option>
                              <option value="receipt_upload">Receipt Summary</option>
                              <option value="self_verified">Self-Verified Reflection</option>
                            </select>
                          </div>
                          <textarea
                            value={proofDetail}
                            onChange={(e) => setProofDetail(e.target.value)}
                            placeholder="Provide proof details (e.g. Connected on call at 12:28 PM, uploaded receipt #104)"
                            rows={2}
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-teal-500"
                          />
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setActiveCompletingId(null)}
                              className="px-3 py-1 text-slate-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleCompleteSubmit(c.id)}
                              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold text-xs transition"
                            >
                              Confirm Completion
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveCompletingId(c.id);
                            setProofDetail('');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-950/90 border border-amber-500/50 text-amber-200 hover:bg-amber-900 text-xs font-semibold transition shadow-sm"
                        >
                          Complete Action with Proof
                        </button>
                      )}
                    </div>
                  )}

                  {/* Partner B Action: Verify Proof */}
                  {activeRole === 'partnerB' && c.completed && !c.verifiedByPartnerB && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => verifyCommitment(c.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-teal-950/90 hover:bg-teal-900 border border-teal-500/50 text-teal-200 text-xs font-semibold flex items-center space-x-2 transition shadow-sm"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                        <span>Verify &amp; Validate Micro-Action</span>
                      </button>
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
