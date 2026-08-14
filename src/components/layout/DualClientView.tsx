import React from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { TimelineVaultView } from '../module1_timeline/TimelineVaultView';
import { MicroCommitmentDashboard } from '../module3_commitments/MicroCommitmentDashboard';
import { AttunementCoachView } from '../module4_attunement/AttunementCoachView';
import { TransparencySunsetView } from '../module5_transparency/TransparencySunsetView';
import { Lock, Shield, ArrowRight } from 'lucide-react';
import { ActiveTab } from './Navigation';

interface DualClientViewProps {
  activeTab: ActiveTab;
}

export const DualClientView: React.FC<DualClientViewProps> = ({ activeTab }) => {
  const { setActiveRole } = useTrustEngine();

  const renderModule = () => {
    switch (activeTab) {
      case 'module1_timeline':
        return <TimelineVaultView />;
      case 'module3_commitments':
        return <MicroCommitmentDashboard />;
      case 'module4_attunement':
        return <AttunementCoachView />;
      case 'module5_transparency':
        return <TransparencySunsetView />;
      default:
        return <TimelineVaultView />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-xs text-indigo-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold font-mono uppercase bg-indigo-950 px-2 py-0.5 rounded border border-indigo-500/40">
            Dual Split Simulation Mode
          </span>
          <span>Observing asymmetric roles and synchronized real-time state.</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveRole('partnerA')}
            className="px-2 py-1 rounded bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-900 text-[11px]"
          >
            Switch Active to Partner A
          </button>
          <button
            onClick={() => setActiveRole('partnerB')}
            className="px-2 py-1 rounded bg-teal-950/80 border border-teal-500/40 text-teal-300 hover:bg-teal-900 text-[11px]"
          >
            Switch Active to Partner B
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Partner A Perspective */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-900/40 border border-amber-500/20">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-amber-300 text-xs font-display uppercase tracking-wider">
                Partner A (Offending Partner / Truth-Breaker View)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">100% Voluntary Transparency</span>
          </div>
          {renderModule()}
        </div>

        {/* Right: Partner B Perspective */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-900/40 border border-teal-500/20">
          <div className="flex items-center justify-between pb-2 border-b border-teal-500/20">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-teal-300 text-xs font-display uppercase tracking-wider">
                Partner B (Injured Partner / Betrayed View)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Epistemic Safety &amp; Verification</span>
          </div>
          {renderModule()}
        </div>
      </div>
    </div>
  );
};
