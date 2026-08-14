import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { PartnerRole } from '../../types/clinical';
import { Radio, Users, Copy, Check, ArrowRight, ShieldCheck, X, RefreshCw } from 'lucide-react';

interface LobbyPairingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LobbyPairingModal: React.FC<LobbyPairingModalProps> = ({ isOpen, onClose }) => {
  const { state, activeRole, createLobby, joinLobby } = useTrustEngine();
  const [inputCode, setInputCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<PartnerRole>(activeRole);
  const [coupleNameInput, setCoupleNameInput] = useState(state.lobby.coupleName || '');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(state.lobby.lobbyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateNew = () => {
    const newCode = createLobby(coupleNameInput);
    setMessage(`New lobby generated: ${newCode}`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const success = joinLobby(inputCode, selectedRole);
    if (success) {
      setMessage(`Successfully joined room ${inputCode.toUpperCase()}`);
      setTimeout(() => {
        setMessage(null);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-teal-950 text-teal-400 border border-teal-500/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">Lobby Connection &amp; Peer Pairing</h2>
              <p className="text-xs text-slate-400">Synchronized cross-device trust session</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {message && (
          <div className="p-3 bg-teal-950/60 border border-teal-500/40 text-teal-300 rounded-xl text-xs flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {/* Current Active Room */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase">Current Session Code:</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-mono font-bold text-teal-300 tracking-wider">
                {state.lobby.lobbyCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center space-x-1"
                title="Copy code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-850">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Partner A (Offender)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Connected</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Partner B (Injured)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Connected</span>
            </div>
          </div>
        </div>

        {/* Enter Existing Lobby Code */}
        <form onSubmit={handleJoin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-300 block">
              Connect to Another Room Code:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="e.g. ANCHOR-9X42"
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-850 rounded-xl text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-medium flex items-center space-x-1 transition shadow-sm"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Select Role for this device */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 block">Select Role on this Device:</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRole('partnerA')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedRole === 'partnerA'
                    ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Partner A</div>
                <div className="text-[10px] text-slate-400">Offender / Truth-Breaker</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('partnerB')}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedRole === 'partnerB'
                    ? 'bg-teal-950/60 border-teal-500/50 text-teal-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">Partner B</div>
                <div className="text-[10px] text-slate-400">Injured / Betrayed</div>
              </button>
            </div>
          </div>
        </form>

        {/* Generate New Session Option */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleCreateNew}
            className="text-slate-400 hover:text-teal-300 flex items-center space-x-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate New Lobby Code</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
