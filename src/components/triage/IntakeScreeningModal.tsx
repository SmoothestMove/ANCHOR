import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, PhoneCall, ArrowRight, HeartHandshake } from 'lucide-react';

interface IntakeScreeningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntakeScreeningModal: React.FC<IntakeScreeningModalProps> = ({ isOpen, onClose }) => {
  const { state, submitIntakeTriage, resetSafetyState } = useTrustEngine();

  const [hasPhysicalThreats, setHasPhysicalThreats] = useState(false);
  const [hasCoerciveIsolation, setHasCoerciveIsolation] = useState(false);
  const [hasActiveDeception, setHasActiveDeception] = useState(false);
  const [hasActiveAddiction, setHasActiveAddiction] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIntakeTriage({
      ipv: hasPhysicalThreats,
      coercive: hasCoerciveIsolation,
      activeDeceit: hasActiveDeception,
      addiction: hasActiveAddiction,
    });
    setStep(2);
  };

  const isHardStop = state.triage.hardStopActive;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white font-display">Clinical Safety &amp; Triage Assessment</h2>
            <p className="text-xs text-slate-400">Mandatory contraindication screening prior to joint trust repair</p>
          </div>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-teal-300">Clinical Protocol:</span> Evidence-based trust repair requires a baseline of absolute physical safety and cessation of active deception. Please answer transparently.
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasPhysicalThreats}
                  onChange={(e) => setHasPhysicalThreats(e.target.checked)}
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-medium text-slate-200 block">Intimate Partner Violence (IPV)</span>
                  <span className="text-xs text-slate-400">Any physical harm, threats of violence, intimidation, or weapon usage.</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasCoerciveIsolation}
                  onChange={(e) => setHasCoerciveIsolation(e.target.checked)}
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-medium text-slate-200 block">Severe Coercive Control &amp; Hostage Dynamics</span>
                  <span className="text-xs text-slate-400">Total financial entrapment, forced isolation from support systems, or digital stalking.</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasActiveDeception}
                  onChange={(e) => setHasActiveDeception(e.target.checked)}
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-medium text-slate-200 block">Active Ongoing Deception / Extra-Dyadic Contact</span>
                  <span className="text-xs text-slate-400">Affair or deceptive contact is currently still ongoing or not fully broken off.</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-slate-800/40 hover:bg-slate-800/60 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasActiveAddiction}
                  onChange={(e) => setHasActiveAddiction(e.target.checked)}
                  className="mt-1 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-medium text-slate-200 block">Untreated Severe Substance/Gambling Addiction</span>
                  <span className="text-xs text-slate-400">Active untreated compulsions that impair behavioral accountability.</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end space-x-2 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs flex items-center space-x-1.5 transition shadow-sm"
              >
                <span>Complete Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && isHardStop && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <span className="font-bold text-rose-100">Clinical Contraindication Hard Stop Triggered</span>
              </div>
              <p className="text-xs leading-relaxed text-rose-200/90">{state.triage.hardStopReason}</p>
            </div>

            {/* Confidential Safety Resources */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-teal-400">
                <PhoneCall className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase font-mono">Confidential Emergency Resources</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-white">National Domestic Violence Hotline</div>
                    <div className="text-slate-400">24/7 Free &amp; Confidential Support</div>
                  </div>
                  <a
                    href="tel:18007997233"
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono font-semibold text-xs"
                  >
                    1-800-799-SAFE
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">
                  Text <span className="font-mono text-teal-300">"START"</span> to <span className="font-mono text-teal-300">88788</span> for live chat support.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  resetSafetyState();
                  setStep(1);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline"
              >
                Re-evaluate Answers
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium"
              >
                Close Safety Modal
              </button>
            </div>
          </div>
        )}

        {step === 2 && !isHardStop && (
          <div className="space-y-4 text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Safety Triage Cleared</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                No active physical contraindications or ongoing extra-dyadic deception detected. You are cleared to proceed through clinical recovery modules.
              </p>
            </div>

            <div className="p-3 bg-teal-950/30 rounded-xl border border-teal-500/20 text-xs text-teal-300 flex items-center justify-center space-x-2">
              <HeartHandshake className="w-4 h-4 text-teal-400" />
              <span>Zero-Knowledge client-side protection and emergency panic disconnect active.</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs transition shadow-sm"
            >
              Enter Trust Engine
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
