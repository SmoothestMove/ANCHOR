import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { AlertOctagon, PhoneCall, ShieldAlert, Check, X } from 'lucide-react';
import { useModalA11y } from '../../hooks/useModalA11y';

interface EmergencyPanicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyPanicModal: React.FC<EmergencyPanicModalProps> = ({ isOpen, onClose }) => {
  const { triggerEmergencyPanicDisconnect } = useTrustEngine();
  const [wiped, setWiped] = useState(false);
  const dialogRef = useModalA11y(isOpen, onClose);
  const titleId = 'emergency-panic-modal-title';
  const descId = 'emergency-panic-modal-desc';

  if (!isOpen) return null;

  const handlePanicWipe = () => {
    triggerEmergencyPanicDisconnect();
    setWiped(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-rose-600/50 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3 text-rose-400">
            <div className="p-2.5 rounded-xl bg-rose-950 border border-rose-600/40">
              <AlertOctagon className="w-6 h-6 animate-pulse motion-reduce:animate-none" />
            </div>
            <div>
              <h2 id={titleId} className="text-base sm:text-lg font-bold text-white font-display">Emergency Panic Disconnect</h2>
              <p id={descId} className="text-xs text-rose-300/80">Immediate Safety Data Purge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close emergency panic dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {!wiped ? (
          <div className="space-y-4 text-xs text-slate-300">
            <p className="leading-relaxed">
              If at any point your physical or emotional safety feels compromised, activating the panic disconnect will
              <span className="font-bold text-rose-300"> instantly wipe all location, schedule, and transparent activity feeds</span>,
              sever peer connection, and prevent further data sharing.
            </p>

            <div className="p-4 bg-rose-950/40 border border-rose-600/40 rounded-xl space-y-2.5">
              <div className="flex items-center space-x-2 text-rose-300 font-bold text-xs font-display">
                <ShieldAlert className="w-4 h-4" aria-hidden="true" />
                <span>Immediate Safety Consequences:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-xs leading-relaxed">
                <li>Clears real-time transparency logs and check-in entries.</li>
                <li>Disconnects active paired sync session immediately.</li>
                <li>Displays emergency crisis support contact lines.</li>
              </ul>
            </div>

            <button
              onClick={handlePanicWipe}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Confirm Emergency Panic Wipe &amp; Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center py-2" role="status" aria-live="polite">
            <div className="w-14 h-14 rounded-2xl bg-rose-950 border border-rose-500/50 text-rose-400 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">Shared Feeds Wiped &amp; Disconnected</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Your shared transparency logs have been purged and peer sync severed.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 text-left">
              <div className="flex items-center space-x-2 text-teal-400 font-display">
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-bold">Immediate Confidential Hotlines</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">National Domestic Violence Hotline:</span>
                  <a href="tel:18007997233" className="font-mono text-teal-300 font-bold hover:underline">1-800-799-SAFE</a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="font-medium">Crisis Text Line:</span>
                  <span className="font-mono text-teal-300 font-bold">Text HOME to 741741</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Exit to Safe Screen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
