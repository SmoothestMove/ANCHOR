import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ExerciseGuide, ExerciseGuideContent } from '../layout/ExerciseGuide';
import {
  TrendingUp,
  BarChart3,
  Plus,
} from 'lucide-react';

const GUIDE_CONTENT: ExerciseGuideContent = {
  moduleKey: 'psychometrics',
  purpose:
    'Objectively track relational recovery over time using validated clinical instruments. Rather than relying on subjective feelings alone, this module provides empirical data points that reveal whether trust, relational cohesion, and emotional safety are genuinely improving—or plateauing. Consistent measurement enables both partners and their therapist to make evidence-based decisions about treatment progress.',
  howItWorks:
    'Every 14 days, both partners complete a brief micro-assessment rating three validated scales: the Dyadic Trust Scale (DTS) measuring perceived reliability and honesty, the Revised Dyadic Adjustment Scale (RDAS) measuring relational consensus and satisfaction, and Perceived Epistemic Safety measuring absence of intrusive anxiety and rumination. Scores are plotted on a longitudinal trajectory chart to visualize trust reconstruction over time.',
  steps: [
    { role: 'both', text: 'Review the current metric cards showing your latest DTS, RDAS, and Perceived Epistemic Safety scores.' },
    { role: 'both', text: 'When a 14-day interval has elapsed, click "Complete 14-Day Micro-Assessment" in the header.' },
    { role: 'both', text: 'In the assessment modal, adjust each slider to honestly rate your Dyadic Trust Score, Dyadic Adjustment, and Perceived Epistemic Safety (0–100).' },
    { role: 'both', text: 'Click "Record Assessment" to log the data point.' },
    { role: 'both', text: 'Review the Longitudinal Recovery Trajectory chart to observe trends, compare DTS vs RDAS trajectories, and track progress toward the Clinical Target Zone (>70).' },
  ],
  successCriteria:
    'Scores show a sustained upward trajectory across multiple 14-day intervals, with the Dyadic Trust Scale (DTS) reaching and maintaining the Clinical Target Zone (>70). Both partners report increasing epistemic safety over time.',
};

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
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-teal-950/90 border border-teal-500/40 text-teal-400 shadow-inner">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-teal-950 border border-teal-500/40 text-teal-300">
                  Clinical Psychometrics
                </span>
                <span className="text-xs text-slate-400 font-mono">Dyadic Trust Scale (DTS) &amp; RDAS Tracking</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Relational Recovery Trajectory &amp; Psychometrics
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Automated 14-day micro-assessments measuring internal trust reconstruction, relational cohesion, and emotional safety across time.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCheckinModal(true)}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center space-x-2 transition shadow-md shadow-teal-950/50"
          >
            <Plus className="w-4 h-4" />
            <span>Complete 14-Day Micro-Assessment</span>
          </button>
        </div>
      </div>

      {/* On-Page Exercise Guide */}
      <ExerciseGuide content={GUIDE_CONTENT} />

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2.5">
          <span className="text-xs font-mono uppercase text-slate-400 font-medium">Dyadic Trust Scale (DTS)</span>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-4xl font-extrabold font-mono text-teal-300">{latest.dtsScore}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
            <span className="text-xs text-emerald-400 font-mono font-semibold">+60 pts from baseline</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">Assesses perceived reliability, honesty, and emotional vulnerability.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2.5">
          <span className="text-xs font-mono uppercase text-slate-400 font-medium">Dyadic Adjustment (RDAS)</span>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-4xl font-extrabold font-mono text-indigo-300">{latest.rdasScore}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
            <span className="text-xs text-emerald-400 font-mono font-semibold">+48 pts from baseline</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">Measures relational consensus, cohesion, and joint satisfaction.</p>
        </div>

        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-2.5">
          <span className="text-xs font-mono uppercase text-slate-400 font-medium">Perceived Epistemic Safety</span>
          <div className="flex items-baseline space-x-2.5">
            <span className="text-4xl font-extrabold font-mono text-emerald-300">{latest.perceivedSafetyScore}</span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
            <span className="text-xs text-emerald-400 font-mono font-semibold">Safe Boundary Zone</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">Absence of intrusive anxiety spikes and rumination episodes.</p>
        </div>
      </div>

      {/* Longitudinal Graph Visualizer */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <h3 className="font-display font-bold text-white text-sm sm:text-base">
              Longitudinal Recovery Trajectory (Baseline to Day 28)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400 font-medium">14-Day Evaluation Intervals</span>
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
              strokeWidth="3.5"
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
                  <circle cx={x} cy={yDts} r="6" fill="#0d9488" stroke="#2dd4bf" strokeWidth="2.5" />
                  <text x={x - 10} y={yDts - 12} fill="#f1f5f9" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    {h.dtsScore}
                  </text>
                  <text x={x - 14} y="195" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                    Day {h.dayNumber}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono pt-2">
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-3.5 rounded-full bg-teal-400" />
            <span className="text-slate-300 font-medium">Dyadic Trust Scale (DTS)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3.5 h-1.5 bg-indigo-400 rounded" />
            <span className="text-slate-300 font-medium">Dyadic Adjustment (RDAS)</span>
          </div>
        </div>
      </div>

      {/* Assessment Modal */}
      {showCheckinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in fade-in">
            <h3 className="font-display font-bold text-white text-base">Complete 14-Day Micro-Assessment</h3>

            <form onSubmit={handleAddCheckin} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Dyadic Trust Score:</span>
                  <span className="font-mono text-teal-300 font-bold">{dtsInput}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dtsInput}
                  onChange={(e) => setDtsInput(Number(e.target.value))}
                  className="w-full accent-teal-400 h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Dyadic Adjustment (RDAS):</span>
                  <span className="font-mono text-indigo-300 font-bold">{rdasInput}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rdasInput}
                  onChange={(e) => setRdasInput(Number(e.target.value))}
                  className="w-full accent-indigo-400 h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Perceived Epistemic Safety:</span>
                  <span className="font-mono text-emerald-300 font-bold">{safetyInput}/100</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={safetyInput}
                  onChange={(e) => setSafetyInput(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowCheckinModal(false)}
                  className="px-3.5 py-1.5 text-slate-400 hover:text-white text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold text-xs transition"
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
