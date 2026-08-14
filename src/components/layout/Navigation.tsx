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
      moduleId: 99, // always accessible
    },
  ];

  return (
    <nav className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80 mb-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isLocked = item.moduleId !== 99 && !unlocked.includes(item.moduleId);
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => !isLocked && setActiveTab(item.id)}
            disabled={isLocked}
            className={`flex-shrink-0 flex items-center space-x-2.5 px-4 py-2.5 rounded-xl text-xs font-medium border transition-all ${
              isActive
                ? 'bg-teal-950/80 border-teal-500/50 text-teal-200 shadow-md shadow-teal-950/50'
                : isLocked
                ? 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-60'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : isLocked ? 'text-slate-600' : 'text-slate-400'}`} />
            <div className="text-left">
              <div className="flex items-center space-x-1.5">
                <span>{item.label}</span>
                {isLocked && <Lock className="w-3 h-3 text-slate-600" />}
              </div>
              <span className="text-[10px] text-slate-500 block">{item.sublabel}</span>
            </div>
          </button>
        );
      })}

      {/* Safety Triage Shortcut */}
      <button
        onClick={onOpenTriageModal}
        className="flex-shrink-0 flex items-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-medium bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-amber-300 transition"
        title="Safety Contraindication Assessment"
      >
        <ShieldAlert className="w-4 h-4 text-amber-400" />
        <div className="text-left">
          <span>Safety Triage</span>
          <span className="text-[10px] text-slate-500 block">IPV Screen</span>
        </div>
      </button>
    </nav>
  );
};
