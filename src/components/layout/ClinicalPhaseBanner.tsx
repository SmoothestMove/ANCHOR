import React from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ClinicalPhaseId } from '../../types/clinical';
import { CheckCircle2, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ClinicalPhaseBanner: React.FC = () => {
  const { state, setPhase, advancePhase, completeCurrentPhaseGate } = useTrustEngine();
  const currentPhaseInfo = state.phases[state.currentPhase];

  const phaseList = Object.values(state.phases);

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Phase Step Badges */}
        <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2 scrollbar-none">
          {phaseList.map((p) => {
            const isCurrent = p.id === state.currentPhase;
            const isCompleted = p.isCompleted;
            const isUnlocked = p.isUnlocked;

            return (
              <button
                key={p.id}
                onClick={() => isUnlocked && setPhase(p.id as ClinicalPhaseId)}
                disabled={!isUnlocked}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-xl text-xs border transition-all ${
                  isCurrent
                    ? 'bg-teal-950/90 border-teal-500/60 text-teal-200 shadow-md shadow-teal-950/50 ring-1 ring-teal-500/30'
                    : isCompleted
                    ? 'bg-slate-900/80 border-slate-700/60 text-slate-300 hover:border-slate-600 line-through opacity-80'
                    : isUnlocked
                    ? 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    : 'bg-slate-950/50 border-slate-900 text-slate-600 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 no-underline" />
                  ) : isCurrent ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
                  ) : isUnlocked ? (
                    <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-slate-600 text-[10px]">
                      {p.id}
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600" />
                  )}
                </div>
                <span className="font-medium whitespace-nowrap">
                  P{p.id}: {p.name.split(':')[1]?.trim() || p.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Active Phase Highlight Card */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono uppercase bg-teal-950 border border-teal-500/30 text-teal-300">
                  Current Clinical Phase: {state.currentPhase} of 8
                </span>
                <span className="text-xs text-slate-400 font-mono">• {currentPhaseInfo.subtitle}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {currentPhaseInfo.name}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-slate-400 font-medium">Primary Objective:</span> {currentPhaseInfo.primaryObjective}
              </p>
            </div>

            {/* Clinical Gate & Progression Action */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 lg:min-w-[340px] space-y-2.5">
              <div className="flex items-start space-x-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300 block">Clinical Gate Requirement:</span>
                  <span className="text-slate-300">{currentPhaseInfo.clinicalGate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                {!currentPhaseInfo.isCompleted ? (
                  <button
                    onClick={completeCurrentPhaseGate}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-teal-950 border border-teal-500/40 text-teal-300 hover:bg-teal-900/60 text-xs font-medium flex items-center justify-center space-x-1.5 transition shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Validate Gate Criteria</span>
                  </button>
                ) : (
                  <div className="flex-1 px-3 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gate Criteria Met</span>
                  </div>
                )}

                {state.currentPhase < 8 && (
                  <button
                    onClick={advancePhase}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950 border border-indigo-500/40 text-indigo-200 hover:bg-indigo-900/60 text-xs font-medium flex items-center space-x-1 transition shadow-sm"
                    title="Advance to Next Phase"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
