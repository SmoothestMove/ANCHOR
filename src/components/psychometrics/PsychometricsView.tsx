import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Plus,
} from 'lucide-react';

export const PsychometricsView: React.FC = () => {
  const { state, addPsychometricCheckin } = useTrustEngine();

  const [dtsInput, setDtsInput] = useState(82);
  const [rdasInput, setRdasInput] = useState(80);
  const [safetyInput, setSafetyInput] = useState(78);
  const [showCheckinModal, setShowCheckinModal] = useState(false);

  const history = state.psychometrics;
  const latest = history[history.length - 1] || {
    dtsScore: 78,
    rdasScore: 76,
    perceivedSafetyScore: 74,
  };

  const handleAddCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    addPsychometricCheckin({
      assessmentDate: new Date().toISOString().split('T')[0],
      dtsScore: dtsInput,
      rdasScore: rdasInput,
      perceivedSafetyScore: safetyInput,
      partnerARating: Math.min(100, dtsInput + 8),
      partnerBRating: dtsInput,
    });
    setShowCheckinModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-teal-950 border border-teal-500/30 text-teal-300">
                  Clinical Psychometrics
                </span>
                <span className="text-xs text-slate-400">Dyadic Trust Scale (DTS) &amp; RDAS Tracking</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-1">
                Relational Recovery Trajectory &amp; Psychometrics
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Automated 14-day micro-assessments measuring internal trust reconstruction, relational cohesion, and emotional safety across time.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCheckinModal(true)}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Complete 14-Day Micro-Assessment</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400">Dyadic Trust Scale (DTS)</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-teal-300">{latest.dtsScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
            <span className="text-xs text-emerald-400 font-mono font-medium">+60 pts from baseline</span>
          </div>
          <p className="text-[11px] text-slate-400">Assesses perceived reliability, honesty, and emotional vulnerability.</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400">Dyadic Adjustment (RDAS)</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-indigo-300">{latest.rdasScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
            <span className="text-xs text-emerald-400 font-mono font-medium">+48 pts from baseline</span>
          </div>
          <p className="text-[11px] text-slate-400">Measures relational consensus, cohesion, and joint satisfaction.</p>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400">Perceived Epistemic Safety</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-mono text-emerald-300">{latest.perceivedSafetyScore}</span>
            <span className="text-xs text-slate-400">/ 100</span>
            <span className="text-xs text-emerald-400 font-mono font-medium">Safe Boundary Zone</span>
          </div>
          <p className="text-[11px] text-slate-400">Absence of intrusive anxiety spikes and rumination episodes.</p>
        </div>
      </div>

      {/* Longitudinal Graph Visualizer */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <h3 className="font-display font-bold text-white text-sm">
              Longitudinal Recovery Trajectory (Baseline to Day 28)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">14-Day Evaluation Intervals</span>
        </div>

        {/* Custom SVG Longitudinal Chart */}
        <div className="h-64 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="40" x2="700" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
            <line x1="0" y1="90" x2="700" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
            <line x1="0" y1="140" x2="700" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

            {/* Threshold Clinical Line */}
            <line x1="0" y1="60" x2="700" y2="60" stroke="rgba(20, 184, 166, 0.3)" strokeDasharray="2" />
            <text x="10" y="55" fill="#14b8a6" fontSize="10" fontFamily="monospace">
              Clinical Target Zone (&gt;70)
            </text>

            {/* Trajectory Polyline DTS */}
            <polyline
              fill="none"
              stroke="#2dd4bf"
              strokeWidth="3"
              points={history
                .map((h, i) => {
                  const x = (i / Math.max(1, history.length - 1)) * 660 + 20;
                  const y = 180 - (h.dtsScore / 100) * 150;
                  return `${x},${y}`;
                })
                .join(' ')}
            />

            {/* Trajectory Polyline RDAS */}
            <polyline
              fill="none"
              stroke="#818cf8"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              points={history
                .map((h, i) => {
                  const x = (i / Math.max(1, history.length - 1)) * 660 + 20;
                  const y = 180 - (h.rdasScore / 100) * 150;
                  return `${x},${y}`;
                })
                .join(' ')}
            />

            {/* Data point dots */}
            {history.map((h, i) => {
              const x = (i / Math.max(1, history.length - 1)) * 660 + 20;
              const yDts = 180 - (h.dtsScore / 100) * 150;
              return (
                <g key={i}>
                  <circle cx={x} cy={yDts} r="5" fill="#0d9488" stroke="#2dd4bf" strokeWidth="2" />
                  <text x={x - 10} y={yDts - 10} fill="#f1f5f9" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    {h.dtsScore}
                  </text>
                  <text x={x - 14} y="195" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                    Day {h.dayNumber}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-teal-400" />
            <span className="text-slate-300">Dyadic Trust Scale (DTS)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-1 bg-indigo-400 rounded" />
            <span className="text-slate-300">Dyadic Adjustment (RDAS)</span>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {showCheckinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-white text-base">Complete 14-Day Micro-Assessment</h3>

            <form onSubmit={handleAddCheckin} className="space-y-4 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Dyadic Trust Score:</span>
                  <span className="font-mono text-teal-300 font-bold">{dtsInput}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dtsInput}
                  onChange={(e) => setDtsInput(Number(e.target.value))}
                  className="w-full accent-teal-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Dyadic Adjustment (RDAS):</span>
                  <span className="font-mono text-indigo-300 font-bold">{rdasInput}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rdasInput}
                  onChange={(e) => setRdasInput(Number(e.target.value))}
                  className="w-full accent-indigo-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Perceived Epistemic Safety:</span>
                  <span className="font-mono text-emerald-300 font-bold">{safetyInput}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={safetyInput}
                  onChange={(e) => setSafetyInput(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-medium"
                >
                  Record Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
