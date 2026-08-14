import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import {
  Activity,
  Heart,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Wind,
  Brain,
  Shield,
  RotateCcw,
  Zap,
} from 'lucide-react';

export const BiometricFloodingView: React.FC = () => {
  const {
    state,
    activeRole,
    updateBiometrics,
    triggerFloodingAlert,
    confirmRegulation,
    resetFloodingLockout,
  } = useTrustEngine();

  const [simulatedHR, setSimulatedHR] = useState(state.biometrics.currentHeartRate);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const { isFlooded, lockoutRemainingSeconds, partnerA_Regulated, partnerB_Regulated } = state.biometrics;

  const minutes = Math.floor(lockoutRemainingSeconds / 60);
  const seconds = lockoutRemainingSeconds % 60;

  const handleHRSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSimulatedHR(val);
    updateBiometrics(val, Math.max(15, 80 - (val - 60)));
  };

  const handleSimulateSpike = () => {
    triggerFloodingAlert(activeRole === 'partnerA' ? 'partnerA' : 'partnerB');
    setSimulatedHR(114);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-rose-950 border border-rose-500/30 text-rose-300">
                  Module 2 • Gottman Method
                </span>
                <span className="text-xs text-slate-400">Physiological Flooding Management</span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-1">
                Biometric Flooding Alert &amp; Smart De-escalation Engine
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Prevents physiological hyperarousal (heart rate &gt; 100 bpm) and destructive communication cycles
                (Four Horsemen). Enforces mandatory 20–30 min somatic grounding before discussions resume.
              </p>
            </div>
          </div>

          {/* Quick Simulation Trigger */}
          <button
            onClick={handleSimulateSpike}
            className="px-3.5 py-2 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-300 hover:bg-rose-900 text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
          >
            <Zap className="w-4 h-4 text-rose-400" />
            <span>Simulate Flooding Spike (&gt;100 bpm)</span>
          </button>
        </div>
      </div>

      {/* Active Flooding Lockout Banner if triggered */}
      {isFlooded && (
        <div className="glass-panel rounded-2xl p-6 border-2 border-rose-600/60 bg-rose-950/40 relative overflow-hidden animate-in fade-in zoom-in-95">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-2xl bg-rose-600/30 border border-rose-500/50 text-rose-400 animate-pulse">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
                  Gottman Physiological Lockout Active
                </span>
                <h3 className="text-2xl font-bold text-white font-display">
                  Timeout Mandatory: Physiological Flooding Detected
                </h3>
                <p className="text-xs text-rose-200/90 max-w-xl mt-1">
                  Heart rate exceeded clinical flooding threshold (&gt;100 bpm). The prefrontal cortex goes offline during flooding, making productive conversation neurobiologically impossible.
                </p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="text-center p-4 bg-slate-950/90 rounded-2xl border border-rose-600/40 min-w-[160px]">
              <div className="text-xs text-slate-400 uppercase font-mono">Cooling Timer</div>
              <div className="text-3xl font-mono font-bold text-rose-400 tracking-wider">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">Mandatory Gottman 20m</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Biometric Telemetry & Somatic 4-7-8 Breathing Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Telemetry Stream */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                <Heart className={`w-4 h-4 ${state.biometrics.currentHeartRate > 100 ? 'text-rose-500 animate-ping' : 'text-teal-400'}`} />
                <span>Wearable Biometric Stream</span>
              </h3>
              <span className="text-[10px] font-mono uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                HealthKit / Wearable
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-center space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-mono">Heart Rate</span>
                <div className={`text-3xl font-bold font-mono ${state.biometrics.currentHeartRate > 100 ? 'text-rose-400' : 'text-teal-300'}`}>
                  {state.biometrics.currentHeartRate} <span className="text-xs font-normal text-slate-500">BPM</span>
                </div>
                <div className="text-[10px] text-slate-500">Threshold: 100 bpm</div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-850 text-center space-y-1">
                <span className="text-[11px] text-slate-400 uppercase font-mono">HRV (RMSSD)</span>
                <div className="text-3xl font-bold font-mono text-indigo-300">
                  {state.biometrics.currentHRV} <span className="text-xs font-normal text-slate-500">ms</span>
                </div>
                <div className="text-[10px] text-slate-500">Vagal Tone Indicator</div>
              </div>
            </div>

            {/* Simulated Wearable Input Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-850 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Simulate Heart Rate Sensor:</span>
                <span className="font-mono text-white font-bold">{simulatedHR} bpm</span>
              </div>
              <input
                type="range"
                min="55"
                max="140"
                value={simulatedHR}
                onChange={handleHRSlider}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>55 (Resting)</span>
                <span className="text-amber-400">100 (Threshold)</span>
                <span className="text-rose-400">140 (Panic)</span>
              </div>
            </div>
          </div>

          {/* Re-engagement Readiness Status */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>Re-engagement Regulation Check</span>
              </h3>
            </div>

            <p className="text-xs text-slate-300">
              Both partners must individually confirm physiological and emotional regulation before communication resumes.
            </p>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Partner A Readiness:</span>
                {partnerA_Regulated ? (
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Regulated</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-[11px]">Cooling Down...</span>
                )}
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Partner B Readiness:</span>
                {partnerB_Regulated ? (
                  <span className="text-emerald-400 font-mono text-[11px] flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Regulated</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-[11px]">Cooling Down...</span>
                )}
              </div>
            </div>

            {/* Individual Regulation Button */}
            <button
              onClick={() => confirmRegulation(activeRole)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Confirm My Emotional Regulation ({activeRole === 'partnerA' ? 'Partner A' : 'Partner B'})</span>
            </button>

            {isFlooded && (
              <button
                onClick={resetFloodingLockout}
                className="w-full py-1.5 text-[11px] text-slate-400 hover:text-slate-200 flex items-center justify-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Override Timeout (Supervisor/Testing)</span>
              </button>
            )}
          </div>
        </div>

        {/* Somatic 4-7-8 Breathing Visualizer & Cognitive Reappraisal */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-teal-400" />
                <h3 className="font-display font-bold text-white text-base">
                  Somatic Grounding &amp; 4-7-8 Breathwork Visualizer
                </h3>
              </div>
              <span className="text-xs font-mono text-teal-300 bg-teal-950 px-2.5 py-0.5 rounded border border-teal-500/30">
                Vagus Nerve Activation
              </span>
            </div>

            {/* Interactive Breathing Sphere */}
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-6 relative">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 rounded-full bg-teal-500/10 border border-teal-500/20 animate-somatic-breath pointer-events-none" />
                {/* Middle Pulse Ring */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-teal-950/60 border border-teal-400/40 flex flex-col items-center justify-center p-4 text-center shadow-xl shadow-teal-950/80">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-teal-400 font-bold">
                    4-7-8 Rhythm
                  </span>
                  <span className="text-sm font-semibold text-white mt-1">Inhale 4s</span>
                  <span className="text-xs text-sky-300">Hold 7s</span>
                  <span className="text-xs text-teal-300">Exhale 8s</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                Follow the pulsing rhythm: Inhale deeply through your nose for 4 seconds, hold your breath gently for 7 seconds, and exhale slowly through your mouth for 8 seconds.
              </p>
            </div>

            {/* Cognitive Reappraisal Framework */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-300 font-semibold text-xs">
                <Brain className="w-4 h-4" />
                <span>Gottman Cognitive Reappraisal During Cooling Phase:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 space-y-1">
                  <div className="text-rose-300 font-medium">1. Reject Catastrophic Framing:</div>
                  <p className="text-slate-400 text-[11px]">
                    Avoid thoughts like "This will never be fixed" or "They don't care at all." Replace with: "We are flooded right now, and cooling down is the healthiest choice."
                  </p>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-850 space-y-1">
                  <div className="text-teal-300 font-medium">2. Self-Soothing Focus:</div>
                  <p className="text-slate-400 text-[11px]">
                    Do not rehearse arguments or draft counter-points during the 20-minute break. Focus entirely on physical relaxation and soothing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
