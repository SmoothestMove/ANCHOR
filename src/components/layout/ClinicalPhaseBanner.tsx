import React from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ClinicalPhaseId } from '../../types/clinical';
import { CheckCircle2, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const ClinicalPhaseBanner: React.FC = () => {
  const { state, setPhase, advancePhase, completeCurrentPhaseGate } = useTrustEngine();
  const currentPhaseInfo = state.phases[state.currentPhase];
  const phaseList = Object.values(state.phases);

  return (
    <div className="bg-slate-950/60 border-b border-slate-800/80 px-4 lg:px-8 py-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Phase Step Badges Carousel */}
        <div className="flex items-center justify-between overflow-x-auto pb-1.5 gap-2 scrollbar-none">
          {phaseList.map((p) => {
            const isCurrent = p.id === state.currentPhase;
            const isCompleted = p.isCompleted;
            const isUnlocked = p.isUnlocked;

            return (
              <button
                key={p.id}
                onClick={() => isUnlocked && setPhase(p.id as ClinicalPhaseId)}
                disabled={!isUnlocked}
                className={`flex-shrink-0 flex items-center space-x-2 px-3 py-2 rounded-xl text-xs border transition-colors ${
                  isCurrent
                    ? 'bg-teal-950/90 border-teal-500/60 text-teal-200 shadow-md shadow-teal-950/60 ring-1 ring-teal-500/40'
                    : isCompleted
                    ? 'bg-slate-900/70 border-slate-800 text-slate-400 hover:border-slate-700 opacity-80'
                    : isUnlocked
                    ? 'bg-slate-900/40 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                  ) : isCurrent ? (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
                    </span>
                  ) : isUnlocked ? (
                    <span className="w-3.5 h-3.5 flex items-center justify-center rounded-full border border-slate-600 text-[11px]">
                      {p.id}
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-slate-600" />
                  )}
                </div>
                <span className={`font-medium whitespace-nowrap ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                  P{p.id}: {p.name.split(':')[1]?.trim() || p.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Active Phase Highlight Card */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 relative z-10">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono uppercase font-bold bg-teal-950 border border-teal-500/40 text-teal-300">
                  Active Clinical Phase: {state.currentPhase} of 8
                </span>
                <span className="text-xs text-slate-400 font-mono font-medium">
                  • {currentPhaseInfo.subtitle}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
                {currentPhaseInfo.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                <span className="text-teal-400 font-semibold">Primary Objective:</span>{' '}
                {currentPhaseInfo.primaryObjective}
              </p>
            </div>

            {/* Clinical Gate & Progression Action Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 lg:min-w-[360px] space-y-3 shadow-md">
              <div className="flex items-start space-x-2.5 text-xs">
                <div className="p-1.5 rounded-lg bg-amber-950/80 border border-amber-500/30 text-amber-400 flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="font-bold text-amber-300 block font-display">Clinical Gate Requirement:</span>
                  <span className="text-slate-300 leading-relaxed text-xs block">
                    {currentPhaseInfo.clinicalGate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                {!currentPhaseInfo.isCompleted ? (
                  <button
                    onClick={completeCurrentPhaseGate}
                    className="flex-1 px-3 py-2 rounded-xl bg-teal-950/90 hover:bg-teal-900 border border-teal-500/50 text-teal-200 text-xs font-semibold flex items-center justify-center space-x-2 transition shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>Validate Gate Criteria</span>
                  </button>
                ) : (
                  <div className="flex-1 px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gate Criteria Met</span>
                  </div>
                )}

                {state.currentPhase < 8 && (
                  <button
                    onClick={advancePhase}
                    className="px-3.5 py-2 rounded-xl bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-500/50 text-indigo-200 text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
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
