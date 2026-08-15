import React, { useState } from 'react';
import { TrustEngineProvider, useTrustEngine } from './context/TrustEngineContext';
import { Header } from './components/layout/Header';
import { ClinicalPhaseBanner } from './components/layout/ClinicalPhaseBanner';
import { Navigation, ActiveTab } from './components/layout/Navigation';
import { TimelineVaultView } from './components/module1_timeline/TimelineVaultView';
import { BiometricFloodingView } from './components/module2_biometrics/BiometricFloodingView';
import { MicroCommitmentDashboard } from './components/module3_commitments/MicroCommitmentDashboard';
import { AttunementCoachView } from './components/module4_attunement/AttunementCoachView';
import { TransparencySunsetView } from './components/module5_transparency/TransparencySunsetView';
import { PsychometricsView } from './components/psychometrics/PsychometricsView';
import { DualClientView } from './components/layout/DualClientView';
import { IntakeScreeningModal } from './components/triage/IntakeScreeningModal';
import { EmergencyPanicModal } from './components/triage/EmergencyPanicModal';
import { LobbyPairingModal } from './components/lobby/LobbyPairingModal';
import { ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { state } = useTrustEngine();
  const [activeTab, setActiveTab] = useState<ActiveTab>('module1_timeline');
  const [dualView, setDualView] = useState(false);

  // Modals
  const [showLobbyModal, setShowLobbyModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showTriageModal, setShowTriageModal] = useState(!state.triage.completed);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500/20 selection:text-teal-300">
      {/* Top Header */}
      <Header
        onOpenLobbyModal={() => setShowLobbyModal(true)}
        onOpenEmergencyModal={() => setShowEmergencyModal(true)}
        dualView={dualView}
        setDualView={setDualView}
      />

      {/* 8-Phase Dynamic Clinical State Banner */}
      <ClinicalPhaseBanner />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Module Navigation Bar */}
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenTriageModal={() => setShowTriageModal(true)}
        />

        {/* Dynamic View: Dual-Split Client or Single Focused Module */}
        {dualView ? (
          <DualClientView activeTab={activeTab} />
        ) : (
          <div className="animate-in fade-in duration-150">
            {activeTab === 'module1_timeline' && <TimelineVaultView />}
            {activeTab === 'module2_biometrics' && <BiometricFloodingView />}
            {activeTab === 'module3_commitments' && <MicroCommitmentDashboard />}
            {activeTab === 'module4_attunement' && <AttunementCoachView />}
            {activeTab === 'module5_transparency' && <TransparencySunsetView />}
            {activeTab === 'psychometrics' && <PsychometricsView />}
          </div>
        )}
      </main>

      {/* Clinical Foundations Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 lg:px-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal-500/70" />
            <span className="font-semibold text-slate-400">Anchor Relational Trust Engine</span>
            <span>• CBCT + EFT (AIRM) + Gottman Sound House + IBCT + Operant Learning</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <span>Zero-Knowledge Vault</span>
            <span>•</span>
            <span>Non-Coercive Transparency</span>
            <span>•</span>
            <span>Anti-Surveillance Protocol</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LobbyPairingModal isOpen={showLobbyModal} onClose={() => setShowLobbyModal(false)} />
      <EmergencyPanicModal isOpen={showEmergencyModal} onClose={() => setShowEmergencyModal(false)} />
      <IntakeScreeningModal isOpen={showTriageModal} onClose={() => setShowTriageModal(false)} />
    </div>
  );
};

export function App() {
  return (
    <TrustEngineProvider>
      <MainAppContent />
    </TrustEngineProvider>
  );
}

export default App;
