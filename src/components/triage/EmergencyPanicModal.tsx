import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { AlertOctagon, PhoneCall, ShieldAlert, Check, X } from 'lucide-react';

interface EmergencyPanicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyPanicModal: React.FC<EmergencyPanicModalProps> = ({ isOpen, onClose }) => {
  const { triggerEmergencyPanicDisconnect } = useTrustEngine();
  const [wiped, setWiped] = useState(false);

  if (!isOpen) return null;

  const handlePanicWipe = () => {
    triggerEmergencyPanicDisconnect();
    setWiped(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-rose-600/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-rose-400">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
            <h2 className="text-lg font-bold text-white">Emergency Panic Disconnect</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!wiped ? (
          <div className="space-y-4 text-xs text-slate-300">
            <p className="leading-relaxed">
              If at any point your physical or emotional safety feels compromised, activating the panic disconnect will
              <span className="font-semibold text-rose-300"> instantly wipe all location, schedule, and transparent activity feeds</span>,
              sever peer connection, and prevent further data sharing.
            </p>

            <div className="p-3.5 bg-rose-950/40 border border-rose-600/30 rounded-xl space-y-2">
              <div className="flex items-center space-x-1.5 text-rose-300 font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>Action Result:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
                <li>Clears real-time transparency logs and check-in entries.</li>
                <li>Disconnects active paired sync session immediately.</li>
                <li>Renders emergency crisis resources for quick access.</li>
              </ul>
            </div>

            <button
              onClick={handlePanicWipe}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-rose-950/80"
            >
              Confirm Emergency Panic Wipe &amp; Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500/50 text-rose-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Shared Feeds Wiped &amp; Disconnected</h3>
              <p className="text-xs text-slate-300 mt-1">
                Your shared transparency logs have been purged and peer sync severed.
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-left">
              <div className="flex items-center space-x-2 text-teal-400">
                <PhoneCall className="w-4 h-4" />
                <span className="text-xs font-semibold">Immediate Confidential Hotlines</span>
              </div>
              <div className="space-y-1 text-xs text-slate-300">
                <div className="flex justify-between items-center py-1">
                  <span>National Domestic Violence Hotline:</span>
                  <a href="tel:18007997233" className="font-mono text-teal-300 font-bold hover:underline">1-800-799-SAFE</a>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span>Crisis Text Line:</span>
                  <span className="font-mono text-teal-300">Text HOME to 741741</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
            >
              Exit to Safe Screen
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
