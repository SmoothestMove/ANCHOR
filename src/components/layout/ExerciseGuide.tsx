import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Target, Cog, ListChecks, Trophy } from 'lucide-react';

export interface GuideStep {
  role?: 'partnerA' | 'partnerB' | 'both';
  text: string;
}

export interface ExerciseGuideContent {
  moduleKey: string;
  purpose: string;
  howItWorks: string;
  steps: GuideStep[];
  successCriteria: string;
}

interface ExerciseGuideProps {
  content: ExerciseGuideContent;
}

const STORAGE_PREFIX = 'anchor_guide_collapsed_';

const roleBadge = (role?: GuideStep['role']) => {
  if (!role || role === 'both') return null;
  return role === 'partnerA' ? (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-950/70 border border-amber-500/40 text-amber-300 mr-1.5">
      Partner A
    </span>
  ) : (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-mono font-bold bg-teal-950/70 border border-teal-500/40 text-teal-300 mr-1.5">
      Partner B
    </span>
  );
};

export const ExerciseGuide: React.FC<ExerciseGuideProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_PREFIX}${content.moduleKey}`);
      return stored === null ? false : stored === 'expanded';
    } catch {
      return false;
    }
  });

  const toggle = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    try {
      localStorage.setItem(
        `${STORAGE_PREFIX}${content.moduleKey}`,
        next ? 'expanded' : 'collapsed'
      );
    } catch {
      // localStorage unavailable
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-indigo-500/20 overflow-hidden transition-colors">
      {/* Collapsed Header / Toggle Bar */}
      <button
        type="button"
        onClick={toggle}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left group transition-colors hover:bg-slate-800/30"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 shadow-inner group-hover:border-indigo-400/50 transition-colors">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-bold font-display text-white">
              How to Use This Exercise
            </span>
            <span className="text-xs text-slate-400 font-mono ml-2">
              {isExpanded ? 'Click to collapse' : 'Click to expand guide'}
            </span>
          </div>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 group-hover:text-indigo-300 group-hover:border-indigo-500/40 transition-colors">
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Expandable Guide Body */}
      {isExpanded && (
        <div className="px-5 pb-5 space-y-4 animate-fade-scale border-t border-slate-800/60">
          {/* Section 1: Purpose */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <h4 className="text-xs font-bold font-display text-teal-300 uppercase tracking-wider">
                Purpose
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-6">
              {content.purpose}
            </p>
          </div>

          {/* Section 2: How It Works */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Cog className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <h4 className="text-xs font-bold font-display text-indigo-300 uppercase tracking-wider">
                How It Works
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pl-6">
              {content.howItWorks}
            </p>
          </div>

          {/* Section 3: Steps to Complete */}
          <div className="space-y-2.5">
            <div className="flex items-center space-x-2">
              <ListChecks className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <h4 className="text-xs font-bold font-display text-amber-300 uppercase tracking-wider">
                Steps to Complete
              </h4>
            </div>
            <ol className="space-y-2 pl-6">
              {content.steps.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center text-[11px] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-300 leading-relaxed">
                    {roleBadge(step.role)}
                    {step.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Success Criteria Callout */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/25">
            <Trophy className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold font-display text-emerald-300 uppercase tracking-wider mb-0.5">
                Success Looks Like
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {content.successCriteria}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
