import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { MicroCommitment } from '../../types/clinical';
import {
  CheckSquare,
  TrendingUp,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Plus,
  FileCheck,
  MapPin,
  DollarSign,
  MessageSquare,
  Sparkles,
  Info,
  Calendar,
} from 'lucide-react';

export const MicroCommitmentDashboard: React.FC = () => {
  const { state, activeRole, addCommitment, completeCommitment, verifyCommitment, calculatedBCI } = useTrustEngine();

  // New Commitment Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<MicroCommitment['category']>('communication');
  const [dueTime, setDueTime] = useState('12:30 PM');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);

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
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-teal-950 border border-teal-500/30 text-teal-300">
                  Module 3 • Operant Conditioning
                </span>
                <span className="text-xs text-slate-400">Truth-Default &amp; Threat Schema Extinction</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-1">
                Behavioral Reliability &amp; Micro-Commitment Dashboard
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Reconditions threat beliefs through observable, time-tested behavioral consistency—replacing useless verbal reassurances with empirical data.
              </p>
            </div>
          </div>

          {/* BCI Gauge Pill */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 min-w-[240px]">
            <div className="w-12 h-12 rounded-xl bg-teal-950/80 border border-teal-500/40 flex items-center justify-center text-teal-300 font-bold font-mono text-base shadow-inner">
              {calculatedBCI}%
            </div>
            <div>
              <div className="text-[11px] uppercase font-mono text-slate-400">Behavioral Consistency Index</div>
              <div className="text-xs font-semibold text-teal-300">
                {calculatedBCI >= 95 ? 'Clinical Target Exceeded (>95%)' : 'Building Empirical Consistency'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Log New Micro-Commitment (Partner A) & Clinical Rationale */}
        <div className="lg:col-span-5 space-y-6">
          {activeRole === 'partnerA' && (
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Partner A: Log Daily Micro-Commitment</span>
                </h3>
                <span className="text-[10px] font-mono uppercase bg-amber-950/50 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  Voluntary
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Log specific, verifiable daily commitments. Small, repeated follow-throughs rewire the partner's expectation of deception.
              </p>

              <form onSubmit={handleAdd} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Commitment Title:</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Call at 12:15 PM from desk / Upload lunch receipt"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as MicroCommitment['category'])}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="communication">Scheduled Check-in</option>
                      <option value="schedule">Arrival / Departure</option>
                      <option value="financial">Financial Transparency</option>
                      <option value="relational_care">Attunement Reflection</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Due Time:</label>
                    <input
                      type="text"
                      value={dueTime}
                      onChange={(e) => setDueTime(e.target.value)}
                      placeholder="e.g. 12:30 PM"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium flex items-center justify-center space-x-1.5 transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Micro-Commitment</span>
                </button>
              </form>
            </div>
          )}

          {/* Operant Psychology Explainer */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-teal-400">
              <TrendingUp className="w-4 h-4" />
              <h3 className="font-display font-bold text-white text-sm">Operant Trust Analytics</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When betrayal occurs, the injured partner's brain constructs a protective <span className="text-amber-300 font-semibold">Threat Default Scheme</span>. Verbal apologies are biologically ineffective at altering this schema. Only high-frequency, verifiable behavioral consistency produces long-term safety reconditioning.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Commitment Completion Rate:</span>
                <span className="font-mono text-teal-300 font-bold">{completed} of {total}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 transition-all duration-500"
                  style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                />
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-slate-400">Partner B Verified:</span>
                <span className="font-mono text-emerald-400 font-bold">{verified} Actions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Commitment Tracker & Verifications */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                <h3 className="font-display font-bold text-white text-sm">Active Daily Commitments</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{total} Logged</span>
            </div>

            <div className="space-y-3">
              {state.commitments.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border transition ${
                    c.completed && c.verifiedByPartnerB
                      ? 'bg-slate-950/60 border-slate-800'
                      : c.completed
                      ? 'bg-slate-900/80 border-teal-500/30'
                      : 'bg-slate-900/40 border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-teal-400">
                        {c.dueTime}
                      </span>
                      <span className="text-xs font-bold text-white">{c.title}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {c.completed ? (
                        c.verifiedByPartnerB ? (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Verified by Partner B</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-teal-300 bg-teal-950/60 border border-teal-500/30 px-2 py-0.5 rounded flex items-center space-x-1">
                            <FileCheck className="w-3 h-3" />
                            <span>Completed / Awaiting Verification</span>
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>Pending Action</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Proof Details if completed */}
                  {c.completed && c.proofDetail && (
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-850 text-xs text-slate-300 space-y-1 my-2">
                      <div className="flex items-center space-x-1 text-[11px] text-teal-400 font-mono">
                        <FileCheck className="w-3 h-3" />
                        <span>Submitted Proof ({c.proofType}):</span>
                      </div>
                      <p>{c.proofDetail}</p>
                    </div>
                  )}

                  {/* Partner A Action: Submit Proof */}
                  {activeRole === 'partnerA' && !c.completed && (
                    <div className="pt-2">
                      {activeCompletingId === c.id ? (
                        <div className="p-3 bg-slate-950 rounded-xl border border-teal-500/30 space-y-2 text-xs">
                          <div className="flex gap-2">
                            <select
                              value={proofType}
                              onChange={(e) => setProofType(e.target.value as MicroCommitment['proofType'])}
                              className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white text-xs"
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
                              className="px-3 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium"
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
                          className="px-3 py-1.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-900 text-xs font-medium transition"
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
                        className="px-3 py-1.5 rounded-lg bg-teal-950 hover:bg-teal-900 border border-teal-500/40 text-teal-300 text-xs font-medium flex items-center space-x-1.5 transition"
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
