import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { TransparencyLog } from '../../types/clinical';
import {
  Eye,
  Sunset,
  ShieldCheck,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

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
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
              <Sunset className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 border border-amber-500/30 text-amber-300">
                  Module 5 • Consensual Scaffolding
                </span>
                <span className="text-xs text-slate-400">Anti-Surveillance &amp; Sunset Protocol</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-1">
                Consensual Transparency Scaffolding &amp; Sunset Manager
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Provides temporary voluntary transparency to soothe epistemic panic while actively preventing long-term
                damaging electronic surveillance through systematic 30-day sunset phase-outs.
              </p>
            </div>
          </div>

          {/* Sunset Status Indicator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex items-center space-x-3 min-w-[240px]">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border shadow-inner ${
              isDecommissioned
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
            }`}>
              {isDecommissioned ? <ShieldCheck className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Surveillance State</div>
              <div className="text-xs font-semibold text-white">
                {isDecommissioned ? 'Surveillance Decommissioned' : 'Temporary Scaffolding Active'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30-Day Sunset Clause Review Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono uppercase bg-teal-950 border border-teal-500/30 text-teal-300 px-2.5 py-0.5 rounded-md">
                Automated 30-Day Sunset Clause Review
              </span>
              <span className="text-xs text-slate-400 font-mono">Next: {sunset.nextEvaluationDate}</span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Systematic Phase-Out of Digital Monitoring
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clinical research demonstrates that indefinite digital tracking increases anxiety and damages long-term relationship intimacy. Because Partner A has maintained a Behavioral Consistency Index of <span className="text-teal-300 font-bold font-mono">{calculatedBCI}% (&gt;95%)</span>, the couple is eligible to sunset digital checking and transition to earned internal trust.
            </p>
          </div>

          {/* Voting Action */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 min-w-[280px]">
            <div className="text-xs font-semibold text-slate-200">Decommissioning Agreement:</div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Partner A Approval:</span>
                {sunset.decommissionApprovedByPartnerA ? (
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Approved</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-[11px]">Pending Vote</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Partner B Approval:</span>
                {sunset.decommissionApprovedByPartnerB ? (
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Approved</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-[11px]">Pending Vote</span>
                )}
              </div>
            </div>

            {!isDecommissioned ? (
              <button
                onClick={() => submitSunsetVote(activeRole, true)}
                className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Vote to Decommission ({activeRole === 'partnerA' ? 'Partner A' : 'Partner B'})</span>
              </button>
            ) : (
              <div className="p-2 bg-emerald-950/80 rounded-lg border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium">
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
            <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Post Voluntary Transparency Update</span>
                </h3>
                <span className="text-[10px] font-mono uppercase bg-amber-950/50 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  Voluntary
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Voluntarily log your daily itinerary, location transitions, or financial transactions to provide clarity without requiring your partner to interrogate you.
              </p>

              <form onSubmit={handleAddLog} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Update Category:</label>
                  <select
                    value={logType}
                    onChange={(e) => setLogType(e.target.value as TransparencyLog['type'])}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="schedule">Schedule &amp; Calendar Update</option>
                    <option value="location">Location Check-in</option>
                    <option value="financial">Financial Transaction Summary</option>
                    <option value="digital_activity">Digital Transparency Note</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Summary Title:</label>
                  <input
                    type="text"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="e.g. Arrived at client office / Lunch expense"
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Details &amp; Timestamps:</label>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    rows={3}
                    placeholder="e.g. Meeting in Conference Room 3 until 3:00 PM. Charge of $18.50 on debit card."
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium flex items-center justify-center space-x-1.5 transition shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Post Voluntary Transparency Feed</span>
                </button>
              </form>
            </div>
          )}

          {/* Anti-Surveillance Guardrail Info */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-display font-bold text-white text-sm">Anti-Surveillance Clinical Policy</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Anchor <span className="text-rose-300 font-semibold">strictly prohibits covert background spyware or non-consensual tracking</span>. Clinical studies prove that coercive monitoring creates traumatic hypervigilance for Partner B and resentment for Partner A. Transparency must remain 100% voluntary and time-limited.
            </p>
          </div>
        </div>

        {/* Right: Voluntary Transparency Log Stream */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <h3 className="font-display font-bold text-white text-sm">Shared Voluntary Transparency Feed</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">{logs.length} Posts</span>
            </div>

            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {log.type === 'location' && <MapPin className="w-3.5 h-3.5 text-teal-400" />}
                      {log.type === 'schedule' && <Calendar className="w-3.5 h-3.5 text-indigo-400" />}
                      {log.type === 'financial' && <DollarSign className="w-3.5 h-3.5 text-amber-400" />}
                      {log.type === 'digital_activity' && <Eye className="w-3.5 h-3.5 text-rose-400" />}
                      <span className="font-bold text-white">{log.summary}</span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-850">
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
