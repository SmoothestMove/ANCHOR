import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import {
  Anchor,
  Shield,
  Users,
  Download,
  Upload,
  AlertOctagon,
  Copy,
  Check,
  Radio,
  Eye,
  Lock,
  Sparkles,
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

  const handleCopyLobby = (e: React.MouseEvent) => {
    e.stopPropagation();
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
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-colors shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding & Clinical Engine Name */}
        <div className="flex items-center space-x-3.5">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300" />
            <div className="relative p-2.5 rounded-xl bg-slate-900 border border-teal-500/30 text-teal-400 shadow-inner flex items-center justify-center">
              <Anchor className="w-5 h-5 text-teal-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                ANCHOR
              </span>
              <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md bg-teal-950/80 border border-teal-500/40 text-teal-300 tracking-wider">
                Relational Trust Engine
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block font-medium">
              <span className="text-teal-400/90 font-semibold">A</span>ccountability • <span className="text-teal-400/90 font-semibold">N</span>urture • <span className="text-teal-400/90 font-semibold">C</span>larity • &amp; <span className="text-teal-400/90 font-semibold">H</span>onest <span className="text-teal-400/90 font-semibold">O</span>pen <span className="text-teal-400/90 font-semibold">R</span>econnection
            </p>
          </div>
        </div>

        {/* Center: Lobby Pairing Code & Live Sync Indicator */}
        <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-800/90 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={onOpenLobbyModal}
            className="flex items-center space-x-2 px-3 py-1 text-xs font-mono text-slate-200 hover:text-white bg-slate-800/70 hover:bg-slate-800 rounded-lg transition group"
            title="Click to manage Lobby pairing"
          >
            <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span className="text-slate-400">Lobby:</span>
            <span className="font-bold text-teal-300 group-hover:text-teal-200 tracking-wider">
              {state.lobby.lobbyCode}
            </span>
          </button>

          <button
            onClick={handleCopyLobby}
            className="p-1.5 text-slate-400 hover:text-teal-300 hover:bg-slate-800/60 rounded-lg transition"
            title="Copy Lobby Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <div className="h-4 w-px bg-slate-800 mx-0.5" />

          {/* Sync Status Badge */}
          <div className="flex items-center space-x-1.5 px-2.5 py-1 text-[11px] font-mono rounded-lg bg-slate-950/60 border border-slate-800">
            {syncStatus === 'synced' && (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/50" />
                <span className="text-emerald-400 font-medium">Synced</span>
              </>
            )}
            {syncStatus === 'syncing' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-spin" />
                <span className="text-amber-400 font-medium">Syncing...</span>
              </>
            )}
            {syncStatus === 'offline' && (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span className="text-rose-400 font-medium">Offline</span>
              </>
            )}
          </div>
        </div>

        {/* Right: Asymmetric Role Switcher & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Asymmetric Role Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs shadow-inner">
            <button
              onClick={() => setActiveRole('partnerA')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRole === 'partnerA'
                  ? 'bg-amber-950/90 text-amber-200 border border-amber-500/50 shadow-md shadow-amber-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              title="Partner A: Offending Partner (Truth-Breaker) - 100% voluntary transparency & commitments"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Partner A <span className="hidden sm:inline font-normal text-amber-300/80">(Offender)</span></span>
            </button>

            <button
              onClick={() => setActiveRole('partnerB')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeRole === 'partnerB'
                  ? 'bg-teal-950/90 text-teal-200 border border-teal-500/50 shadow-md shadow-teal-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              title="Partner B: Injured Partner (Betrayed) - Diagnostic inquiry, safety boundaries & verification"
            >
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              <span>Partner B <span className="hidden sm:inline font-normal text-teal-300/80">(Injured)</span></span>
            </button>

            <button
              onClick={() => setActiveRole('supervisor')}
              className={`hidden md:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                activeRole === 'supervisor'
                  ? 'bg-indigo-950/90 text-indigo-200 border border-indigo-500/50 shadow-md shadow-indigo-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              title="Clinical Observer / Supervisor View"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              <span>Supervisor</span>
            </button>
          </div>

          {/* Dual Split-View Simulator Toggle */}
          <button
            onClick={() => setDualView(!dualView)}
            className={`p-2 rounded-xl border text-xs font-medium transition flex items-center space-x-1.5 ${
              dualView
                ? 'bg-teal-950/80 border-teal-500/60 text-teal-200 shadow-md shadow-teal-950/50'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Toggle Dual-Client Split Simulation Mode"
          >
            <Users className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden xl:inline">Dual Mode</span>
          </button>

          {/* Backup Export */}
          <button
            onClick={exportBackupJSON}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition"
            title="Export Encrypted/JSON Session Backup"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Backup Import */}
          <label
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-teal-300 hover:bg-slate-800 transition cursor-pointer"
            title="Import Session Backup"
          >
            <Upload className="w-3.5 h-3.5" />
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Panic Disconnect Emergency Button */}
          <button
            onClick={onOpenEmergencyModal}
            className="px-3 py-1.5 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 hover:bg-rose-900/90 text-xs flex items-center space-x-1.5 transition shadow-md shadow-rose-950/50 font-semibold"
            title="Emergency Panic Disconnect & Safety Resource Protocol"
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="hidden sm:inline">Emergency Panic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
