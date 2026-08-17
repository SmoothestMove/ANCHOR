import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ShieldAlert, AlertTriangle, CheckCircle2, PhoneCall, ArrowRight, HeartHandshake, X } from 'lucide-react';
import { useModalA11y } from '../../hooks/useModalA11y';

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
  const dialogRef = useModalA11y(isOpen, onClose);
  const titleId = 'intake-screening-modal-title';
  const descId = 'intake-screening-modal-desc';

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
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden animate-in fade-in"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-950/90 border border-amber-500/40 text-amber-400">
              <ShieldAlert className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h2 id={titleId} className="text-base sm:text-lg font-bold text-white font-display">Clinical Safety &amp; Triage Assessment</h2>
              <p id={descId} className="text-xs text-slate-400">Mandatory contraindication screening prior to joint trust repair</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close safety triage dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-teal-300 font-display">Clinical Protocol:</span> Evidence-based trust repair requires a baseline of absolute physical safety and cessation of active deception. Please answer transparently.
            </div>

            <div className="space-y-3">
              <label className="flex items-start space-x-3 p-3.5 bg-slate-800/40 hover:bg-slate-800/70 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasPhysicalThreats}
                  onChange={(e) => setHasPhysicalThreats(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-slate-200 block text-xs">Intimate Partner Violence (IPV)</span>
                  <span className="text-[11px] text-slate-400 leading-relaxed">Any physical harm, threats of violence, intimidation, or weapon usage.</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3.5 bg-slate-800/40 hover:bg-slate-800/70 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasCoerciveIsolation}
                  onChange={(e) => setHasCoerciveIsolation(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-slate-200 block text-xs">Severe Coercive Control &amp; Hostage Dynamics</span>
                  <span className="text-[11px] text-slate-400 leading-relaxed">Total financial entrapment, forced isolation from support systems, or digital stalking.</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3.5 bg-slate-800/40 hover:bg-slate-800/70 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasActiveDeception}
                  onChange={(e) => setHasActiveDeception(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-slate-200 block text-xs">Active Ongoing Deception / Extra-Dyadic Contact</span>
                  <span className="text-[11px] text-slate-400 leading-relaxed">Affair or deceptive contact is currently still ongoing or not fully broken off.</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3.5 bg-slate-800/40 hover:bg-slate-800/70 rounded-xl border border-slate-800 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={hasActiveAddiction}
                  onChange={(e) => setHasActiveAddiction(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500"
                />
                <div>
                  <span className="font-semibold text-slate-200 block text-xs">Untreated Severe Substance/Gambling Addiction</span>
                  <span className="text-[11px] text-slate-400 leading-relaxed">Active untreated compulsions that impair behavioral accountability.</span>
                </div>
              </label>
            </div>

            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center space-x-1.5 transition shadow-md shadow-teal-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                <span>Complete Evaluation</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}

        {step === 2 && isHardStop && (
          <div className="space-y-4" role="alert">
            <div className="p-4 rounded-2xl bg-rose-950/90 border border-rose-600/60 text-rose-200 space-y-3 shadow-lg shadow-rose-950/50">
              <div className="flex items-center space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" aria-hidden="true" />
                <span className="font-bold text-rose-100 font-display">Clinical Contraindication Hard Stop Triggered</span>
              </div>
              <p className="text-xs leading-relaxed text-rose-200/90 font-normal">{state.triage.hardStopReason}</p>
            </div>

            {/* Confidential Safety Resources */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-teal-400 font-display">
                <PhoneCall className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-bold uppercase font-mono">Confidential Emergency Resources</span>
              </div>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white font-display">National Domestic Violence Hotline</div>
                    <div className="text-slate-400 text-[11px]">24/7 Free &amp; Confidential Support</div>
                  </div>
                  <a
                    href="tel:18007997233"
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-xs shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    1-800-799-SAFE
                  </a>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  Text <span className="text-teal-300 font-bold">&ldquo;START&rdquo;</span> to <span className="text-teal-300 font-bold">88788</span> for live chat support.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  resetSafetyState();
                  setStep(1);
                }}
                className="text-xs text-slate-400 hover:text-slate-200 underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 rounded"
              >
                Re-evaluate Answers
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                Close Safety Modal
              </button>
            </div>
          </div>
        )}

        {step === 2 && !isHardStop && (
          <div className="space-y-4 text-center py-2" role="status" aria-live="polite">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display">Safety Triage Cleared</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                No active physical contraindications or ongoing extra-dyadic deception detected. You are cleared to proceed through clinical recovery modules.
              </p>
            </div>

            <div className="p-3.5 bg-teal-950/40 rounded-xl border border-teal-500/30 text-xs text-teal-300 flex items-center justify-center space-x-2 font-medium">
              <HeartHandshake className="w-4 h-4 text-teal-400 flex-shrink-0" aria-hidden="true" />
              <span>Zero-Knowledge client-side protection and emergency panic disconnect active.</span>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition shadow-md shadow-teal-950/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Enter Trust Engine
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
