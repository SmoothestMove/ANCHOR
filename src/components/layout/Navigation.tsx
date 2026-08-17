import React from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import {
  FileText,
  Activity,
  CheckSquare,
  MessageSquareHeart,
  Sunset,
  BarChart3,
  ShieldAlert,
  Lock,
} from 'lucide-react';

export type ActiveTab =
  | 'module1_timeline'
  | 'module2_biometrics'
  | 'module3_commitments'
  | 'module4_attunement'
  | 'module5_transparency'
  | 'psychometrics'
  | 'triage_safety';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenTriageModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onOpenTriageModal }) => {
  const { state } = useTrustEngine();
  const currentPhaseInfo = state.phases[state.currentPhase];
  const unlocked = currentPhaseInfo.unlockedModuleIds;

  const navItems = [
    {
      id: 'module1_timeline' as ActiveTab,
      label: '1. Disclosure Vault',
      sublabel: 'Dual-Lock (CBCT)',
      icon: FileText,
      moduleId: 1,
    },
    {
      id: 'module2_biometrics' as ActiveTab,
      label: '2. Biometric Flooding',
      sublabel: 'De-escalation (Gottman)',
      icon: Activity,
      moduleId: 2,
    },
    {
      id: 'module3_commitments' as ActiveTab,
      label: '3. Reliability Dashboard',
      sublabel: 'Micro-Actions (Operant)',
      icon: CheckSquare,
      moduleId: 3,
    },
    {
      id: 'module4_attunement' as ActiveTab,
      label: '4. NLP Attunement Coach',
      sublabel: 'Non-Defensiveness (EFT)',
      icon: MessageSquareHeart,
      moduleId: 4,
    },
    {
      id: 'module5_transparency' as ActiveTab,
      label: '5. Transparency & Sunset',
      sublabel: 'Scaffolding Sunset',
      icon: Sunset,
      moduleId: 5,
    },
    {
      id: 'psychometrics' as ActiveTab,
      label: 'Recovery Psychometrics',
      sublabel: 'DTS & RDAS Progress',
      icon: BarChart3,
      moduleId: 99,
    },
  ];

  return (
    <nav className="flex items-center space-x-2.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80 mb-6" aria-label="Clinical modules">
      <div role="tablist" aria-label="Recovery modules" className="flex items-center space-x-2.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isLocked = item.moduleId !== 99 && !unlocked.includes(item.moduleId);
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => !isLocked && setActiveTab(item.id)}
              disabled={isLocked}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isLocked}
              id={`tab-${item.id}`}
              aria-controls={`panel-${item.id}`}
              className={`flex-shrink-0 flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                isActive
                  ? 'bg-teal-950/90 border-teal-500/60 text-teal-200 shadow-md shadow-teal-950/60 ring-1 ring-teal-500/40'
                  : isLocked
                  ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : isLocked ? 'text-slate-600' : 'text-slate-400'}`} aria-hidden="true" />
              <div className="text-left">
                <div className="flex items-center space-x-1.5 font-display">
                  <span>{item.label}</span>
                  {isLocked && <Lock className="w-3 h-3 text-slate-600" aria-hidden="true" />}
                  {isLocked && <span className="sr-only">(locked)</span>}
                </div>
                <span className="text-[11px] text-slate-500 block font-mono font-normal">{item.sublabel}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Safety Triage Shortcut */}
      <button
        onClick={onOpenTriageModal}
        className="flex-shrink-0 flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-amber-300 hover:border-amber-500/40 transition ml-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        aria-label="Open safety triage assessment, IPV screen"
      >
        <ShieldAlert className="w-4 h-4 text-amber-400" aria-hidden="true" />
        <div className="text-left font-display">
          <span>Safety Triage</span>
          <span className="text-[11px] text-slate-500 block font-mono font-normal">IPV Screen</span>
        </div>
      </button>
    </nav>
  );
};
