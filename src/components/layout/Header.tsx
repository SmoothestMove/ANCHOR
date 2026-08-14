import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { PartnerRole } from '../../types/clinical';
import {
  Anchor,
  Shield,
  Users,
  Activity,
  Download,
  Upload,
  AlertOctagon,
  Copy,
  Check,
  Radio,
  Eye,
  Lock,
} from 'lucide-react';

interface HeaderProps {
  onOpenLobbyModal: () => void;
  onOpenEmergencyModal: () => void;
  dualView: boolean;
  setDualView: (v: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLobbyModal,
  onOpenEmergencyModal,
  dualView,
  setDualView,
}) => {
  const { state, activeRole, setActiveRole, syncStatus, exportBackupJSON, importBackupJSON } = useTrustEngine();
  const [copied, setCopied] = useState(false);

  const handleCopyLobby = () => {
    navigator.clipboard.writeText(state.lobby.lobbyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importBackupJSON(text);
          if (success) {
            alert('Clinical session successfully restored!');
          } else {
            alert('Invalid backup JSON format.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding & Clinical Codename */}
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400 shadow-inner">
            <Anchor className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-lg tracking-tight text-white">ANCHOR</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-950 border border-teal-500/40 text-teal-300">
                Relational Trust Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Evidence-Based Clinical Betrayal Recovery</p>
          </div>
        </div>

        {/* Center: Lobby Pairing Code & Live Sync Indicator */}
        <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800 rounded-lg p-1.5 shadow-sm">
          <button
            onClick={onOpenLobbyModal}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-mono text-slate-200 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded transition"
            title="Click to manage Lobby pairing"
          >
            <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span className="text-slate-400">Lobby:</span>
            <span className="font-semibold text-teal-300">{state.lobby.lobbyCode}</span>
          </button>

          <button
            onClick={handleCopyLobby}
            className="p-1 text-slate-400 hover:text-teal-300 transition"
            title="Copy Lobby Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          {/* Sync Status Badge */}
          <div className="flex items-center space-x-1 px-2 py-0.5 text-[11px] font-mono rounded">
            {syncStatus === 'synced' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400">Synced</span>
              </>
            )}
            {syncStatus === 'syncing' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-spin" />
                <span className="text-amber-400">Syncing...</span>
              </>
            )}
            {syncStatus === 'offline' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-rose-400">Offline</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Asymmetric Role Switcher & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Asymmetric Role Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => setActiveRole('partnerA')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition ${
                activeRole === 'partnerA'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Partner A: Offending Partner (Truth-Breaker) - 100% voluntary transparency & commitments"
            >
              <Lock className="w-3 h-3" />
              <span>Partner A (Offender)</span>
            </button>

            <button
              onClick={() => setActiveRole('partnerB')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded transition ${
                activeRole === 'partnerB'
                  ? 'bg-teal-950/80 text-teal-300 border border-teal-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Partner B: Injured Partner (Betrayed) - Diagnostic inquiry, safety boundaries & verification"
            >
              <Shield className="w-3 h-3" />
              <span>Partner B (Injured)</span>
            </button>

            <button
              onClick={() => setActiveRole('supervisor')}
              className={`hidden md:flex items-center space-x-1 px-2 py-1 rounded transition ${
                activeRole === 'supervisor'
                  ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Clinical Observer / Supervisor View"
            >
              <Eye className="w-3 h-3" />
              <span>Supervisor</span>
            </button>
          </div>

          {/* Dual Split-View Simulator Toggle */}
          <button
            onClick={() => setDualView(!dualView)}
            className={`p-2 rounded-lg border text-xs transition flex items-center space-x-1 ${
              dualView
                ? 'bg-teal-900/40 border-teal-500/50 text-teal-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Dual-Client Split Simulation Mode (Partner A & Partner B side-by-side)"
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Dual View</span>
          </button>

          {/* Backup Export */}
          <button
            onClick={exportBackupJSON}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-teal-300 transition"
            title="Export Encrypted/JSON Session Backup"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Backup Import */}
          <label
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-teal-300 transition cursor-pointer"
            title="Import Session Backup"
          >
            <Upload className="w-3.5 h-3.5" />
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Panic Disconnect Emergency Button */}
          <button
            onClick={onOpenEmergencyModal}
            className="px-2.5 py-1.5 rounded-lg bg-rose-950/70 border border-rose-600/40 text-rose-300 hover:bg-rose-900/80 text-xs flex items-center space-x-1 transition shadow-sm font-medium"
            title="Emergency Panic Disconnect & Safety Resource Protocol"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Emergency Panic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
