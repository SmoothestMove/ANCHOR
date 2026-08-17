import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ExerciseGuide, ExerciseGuideContent } from '../layout/ExerciseGuide';
import { TransparencyLog } from '../../types/clinical';
import {
  Eye,
  Sunset,
  ShieldCheck,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const GUIDE_CONTENT: ExerciseGuideContent = {
  moduleKey: 'module5_transparency',
  purpose:
    'Provide temporary, voluntary transparency to soothe episodic epistemic panic ("Where are they? What are they doing?") while actively preventing the relationship from becoming a long-term surveillance state. Clinical research demonstrates that indefinite digital tracking increases anxiety and erodes intimacy for both partners. This module uses systematic 30-day sunset cycles to phase out monitoring as earned internal trust replaces external verification.',
  howItWorks:
    'Partner A voluntarily posts transparency updates categorized by schedule, location, financial transactions, or digital activity. These updates flow into a shared feed visible to Partner B. The system enforces strict anti-surveillance ethics—no covert spyware or non-consensual tracking is permitted. When Partner A maintains a Behavioral Consistency Index (BCI) of \u226595% for sufficient time, both partners become eligible to vote on decommissioning digital monitoring through the 30-Day Sunset Clause.',
  steps: [
    { role: 'partnerA', text: 'Post voluntary transparency updates: select a category (Schedule, Location, Financial, or Digital Activity), write a summary title, and add details with timestamps.' },
    { role: 'partnerB', text: 'Review the Shared Voluntary Transparency Feed to stay informed without needing to interrogate or check up on Partner A.' },
    { role: 'both', text: 'When the system indicates eligibility for decommissioning (BCI \u226595%), review the 30-Day Sunset Clause.' },
    { role: 'partnerA', text: 'Vote to decommission digital monitoring by clicking "Vote to Decommission (Partner A)".' },
    { role: 'partnerB', text: 'Vote to decommission digital monitoring by clicking "Vote to Decommission (Partner B)". Both votes are required.' },
  ],
  successCriteria:
    'Both partners mutually vote to decommission digital monitoring. The relationship transitions from external verification to earned internal trust. The "Digital Monitoring Successfully Sunsetted" confirmation appears.',
};

export const TransparencySunsetView: React.FC = () => {
  const { state, activeRole, addTransparencyLog, submitSunsetVote, calculatedBCI } = useTrustEngine();

  const [logType, setLogType] = useState<TransparencyLog['type']>('schedule');
  const [summary, setSummary] = useState('');
  const [detail, setDetail] = useState('');

  const { sunset, logs } = state.transparency;
  const isDecommissioned = sunset.isMonitoringDecommissioned;

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;
    addTransparencyLog({
      type: logType,
      summary,
      detail,
    });
    setSummary('');
    setDetail('');
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-amber-950/90 border border-amber-500/40 text-amber-400 shadow-inner">
              <Sunset className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-amber-950 border border-amber-500/40 text-amber-300">
                  Module 5 • Consensual Scaffolding
                </span>
                <span className="text-xs text-slate-400 font-mono">Anti-Surveillance &amp; Sunset Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Consensual Transparency Scaffolding &amp; Sunset Manager
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Provides temporary voluntary transparency to soothe epistemic panic while actively preventing long-term
                damaging electronic surveillance through systematic 30-day sunset phase-outs.
              </p>
            </div>
          </div>

          {/* Sunset Status Indicator */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 min-w-[260px] shadow-sm">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base border shadow-inner ${
              isDecommissioned
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/90 border-amber-500/50 text-amber-300'
            }`}>
              {isDecommissioned ? <ShieldCheck className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </div>
            <div>
              <div className="text-[11px] uppercase font-mono text-slate-400 font-medium">Surveillance State</div>
              <div className="text-xs font-bold text-white font-display mt-0.5">
                {isDecommissioned ? 'Surveillance Decommissioned' : 'Temporary Scaffolding Active'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* On-Page Exercise Guide */}
      <ExerciseGuide content={GUIDE_CONTENT} />

      {/* 30-Day Sunset Clause Review Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-mono uppercase bg-teal-950/80 border border-teal-500/40 text-teal-300 px-3 py-0.5 rounded-md font-bold">
                Automated 30-Day Sunset Clause Review
              </span>
              <span className="text-xs text-slate-400 font-mono">Next Review: {sunset.nextEvaluationDate}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Systematic Phase-Out of Digital Monitoring
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Clinical research demonstrates that indefinite digital tracking increases anxiety and damages long-term intimacy. Because Partner A has maintained a Behavioral Consistency Index of <span className="text-teal-300 font-bold font-mono">{calculatedBCI}% (&gt;95%)</span>, the couple is eligible to sunset digital checking and transition to earned internal trust.
            </p>
          </div>

          {/* Voting Action */}
          <div className="p-5 bg-slate-900/95 rounded-2xl border border-slate-800 space-y-3.5 min-w-[300px] shadow-md">
            <div className="text-xs font-bold text-slate-200 font-display">Decommissioning Mutual Agreement:</div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-850">
                <span className="text-slate-400 font-medium">Partner A Approval:</span>
                {sunset.decommissionApprovedByPartnerA ? (
                  <span className="text-emerald-400 font-mono text-xs flex items-center space-x-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-xs font-semibold">Pending Vote</span>
                )}
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-850">
                <span className="text-slate-400 font-medium">Partner B Approval:</span>
                {sunset.decommissionApprovedByPartnerB ? (
                  <span className="text-emerald-400 font-mono text-xs flex items-center space-x-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-xs font-semibold">Pending Vote</span>
                )}
              </div>
            </div>

            {!isDecommissioned ? (
              <button
                onClick={() => submitSunsetVote(activeRole, true)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition shadow-md shadow-teal-950/50"
              >
                <Sparkles className="w-4 h-4 text-teal-200" />
                <span>Vote to Decommission ({activeRole === 'partnerA' ? 'Partner A' : 'Partner B'})</span>
              </button>
            ) : (
              <div className="p-3 bg-emerald-950/80 rounded-xl border border-emerald-500/50 text-emerald-300 text-xs text-center font-bold font-display">
                Digital Monitoring Successfully Sunsetted!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Voluntary Log Feed & Anti-Surveillance Guidelines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Voluntary Log Submission (Partner A) & Anti-Spyware Guardrail */}
        <div className="lg:col-span-5 space-y-6">
          {activeRole === 'partnerA' && !isDecommissioned && (
            <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span>Post Voluntary Transparency Update</span>
                </h3>
                <span className="text-[10px] font-mono uppercase bg-amber-950/60 text-amber-300 px-2.5 py-0.5 rounded border border-amber-500/40 font-semibold">
                  Voluntary
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Voluntarily log your daily itinerary, location transitions, or financial transactions to provide clarity without requiring your partner to interrogate you.
              </p>

              <form onSubmit={handleAddLog} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="transparency-log-type" className="text-slate-400 block mb-1 font-medium">Update Category:</label>
                  <select
                    id="transparency-log-type"
                    value={logType}
                    onChange={(e) => setLogType(e.target.value as TransparencyLog['type'])}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 text-xs"
                  >
                    <option value="schedule">Schedule &amp; Calendar Update</option>
                    <option value="location">Location Check-in</option>
                    <option value="financial">Financial Transaction Summary</option>
                    <option value="digital_activity">Digital Transparency Note</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="transparency-log-summary" className="text-slate-400 block mb-1 font-medium">Summary Title:</label>
                  <input
                    id="transparency-log-summary"
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="e.g. Arrived at client office / Lunch expense&hellip;"
                    required
                    autoComplete="off"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 text-xs"
                  />
                </div>

                <div>
                  <label htmlFor="transparency-log-detail" className="text-slate-400 block mb-1 font-medium">Details &amp; Timestamps:</label>
                  <textarea
                    id="transparency-log-detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    rows={3}
                    placeholder="e.g. Meeting in Conference Room 3 until 3:00 PM. Charge of $18.50 on debit card."
                    required
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus:border-amber-500 text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold flex items-center justify-center space-x-2 transition shadow-md shadow-amber-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>Post Voluntary Transparency Feed</span>
                </button>
              </form>
            </div>
          )}

          {/* Anti-Surveillance Guardrail Info */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs font-display">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              <span>Anti-Surveillance Clinical Policy</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Anchor <span className="text-rose-300 font-semibold">strictly prohibits covert background spyware or non-consensual tracking</span>. Clinical studies prove that coercive monitoring creates traumatic hypervigilance for Partner B and resentment for Partner A. Transparency must remain 100% voluntary and time-limited.
            </p>
          </div>
        </div>

        {/* Right: Voluntary Transparency Log Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-bold text-white text-sm">Shared Voluntary Transparency Feed</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono font-medium">{logs.length} Posts</span>
            </div>

            <div className="space-y-3.5">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {log.type === 'location' && <MapPin className="w-4 h-4 text-teal-400" />}
                      {log.type === 'schedule' && <Calendar className="w-4 h-4 text-indigo-400" />}
                      {log.type === 'financial' && <DollarSign className="w-4 h-4 text-amber-400" />}
                      {log.type === 'digital_activity' && <Eye className="w-4 h-4 text-rose-400" />}
                      <span className="font-bold text-white text-xs sm:text-sm">{log.summary}</span>
                    </div>

                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-slate-200 leading-relaxed bg-slate-900/70 p-3 rounded-xl border border-slate-800/80">
                    {log.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
