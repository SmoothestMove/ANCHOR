import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { PartnerRole } from '../../types/clinical';
import { Radio, Copy, Check, ArrowRight, X, RefreshCw } from 'lucide-react';
import { useModalA11y } from '../../hooks/useModalA11y';

interface LobbyPairingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LobbyPairingModal: React.FC<LobbyPairingModalProps> = ({ isOpen, onClose }) => {
  const { state, activeRole, createLobby, joinLobby } = useTrustEngine();
  const [inputCode, setInputCode] = useState('');
  const [selectedRole, setSelectedRole] = useState<PartnerRole>(activeRole);
  const [coupleNameInput] = useState(state.lobby.coupleName || '');
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const dialogRef = useModalA11y(isOpen, onClose);
  const titleId = 'lobby-pairing-modal-title';
  const descId = 'lobby-pairing-modal-desc';

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-teal-950 text-teal-400 border border-teal-500/40">
              <Radio className="w-5 h-5 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            </div>
            <div>
              <h2 id={titleId} className="text-base sm:text-lg font-bold text-white font-display">Lobby Connection &amp; Peer Pairing</h2>
              <p id={descId} className="text-xs text-slate-400">Synchronized cross-device trust session</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close lobby pairing dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {message && (
          <div className="p-3.5 bg-teal-950/80 border border-teal-500/50 text-teal-200 rounded-xl text-xs flex items-center space-x-2 font-medium" role="status" aria-live="polite">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" aria-hidden="true" />
            <span>{message}</span>
          </div>
        )}

        {/* Current Active Room */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase font-medium">Current Session Code:</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-mono font-extrabold text-teal-300 tracking-wider">
                {state.lobby.lobbyCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition text-xs flex items-center space-x-1 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                aria-label={copied ? 'Session code copied' : 'Copy session code'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-850">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <span className={`w-2 h-2 rounded-full ${state.lobby.partnerA_Online ? 'bg-emerald-400 animate-pulse motion-reduce:animate-none' : 'bg-slate-600'}`} aria-hidden="true" />
                <span className="font-medium">Partner A (Offender)</span>
              </div>
              <span className={`text-[11px] font-mono font-semibold ${state.lobby.partnerA_Online ? 'text-emerald-400' : 'text-slate-500'}`}>
                {state.lobby.partnerA_Online ? 'Connected' : 'Offline'}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-slate-300">
                <span className={`w-2 h-2 rounded-full ${state.lobby.partnerB_Online ? 'bg-emerald-400 animate-pulse motion-reduce:animate-none' : 'bg-slate-600'}`} aria-hidden="true" />
                <span className="font-medium">Partner B (Injured)</span>
              </div>
              <span className={`text-[11px] font-mono font-semibold ${state.lobby.partnerB_Online ? 'text-emerald-400' : 'text-slate-500'}`}>
                {state.lobby.partnerB_Online ? 'Connected' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Enter Existing Lobby Code */}
        <form onSubmit={handleJoin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="lobby-join-code" className="text-xs font-semibold text-slate-300 block font-display">
              Connect to Another Room Code:
            </label>
            <div className="flex gap-2">
              <input
                id="lobby-join-code"
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                placeholder="e.g. ANCHOR-9X42"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Select Role for this device */}
          <div className="space-y-2" role="radiogroup" aria-label="Select role on this device">
            <span className="text-xs font-semibold text-slate-300 block font-display">Select Role on this Device:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedRole('partnerA')}
                role="radio"
                aria-checked={selectedRole === 'partnerA'}
                className={`p-3 rounded-xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  selectedRole === 'partnerA'
                    ? 'bg-amber-950/70 border-amber-500/60 text-amber-200 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-amber-300">Partner A</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Offender / Truth-Breaker</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('partnerB')}
                role="radio"
                aria-checked={selectedRole === 'partnerB'}
                className={`p-3 rounded-xl border text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 ${
                  selectedRole === 'partnerB'
                    ? 'bg-teal-950/70 border-teal-500/60 text-teal-200 shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-teal-300">Partner B</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Injured / Betrayed</div>
              </button>
            </div>
          </div>
        </form>

        {/* Generate New Session Option */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={handleCreateNew}
            className="text-slate-400 hover:text-teal-300 flex items-center space-x-1.5 transition font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Generate New Lobby Code</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
