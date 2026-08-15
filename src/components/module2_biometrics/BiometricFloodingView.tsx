import React, { useState } from 'react';
import { useTrustEngine } from '../../context/TrustEngineContext';
import { ExerciseGuide, ExerciseGuideContent } from '../layout/ExerciseGuide';
import {
  Activity,
  Heart,
  AlertOctagon,
  CheckCircle2,
  Wind,
  Brain,
  Shield,
  RotateCcw,
  Zap,
} from 'lucide-react';

const GUIDE_CONTENT: ExerciseGuideContent = {
  moduleKey: 'module2_biometrics',
  purpose:
    'Prevent destructive communication during physiological flooding (heart rate > 100 bpm). When the prefrontal cortex goes offline due to hyperarousal, productive conversation becomes neurobiologically impossible. This module enforces Gottman\'s mandatory 20\u201330 minute somatic cooling period before discussions can resume.',
  howItWorks:
    'The system monitors heart rate through a connected wearable device (or the built-in simulator). When heart rate crosses the clinical flooding threshold of 100 bpm, an automatic lockout engages—blocking all in-app communication. During lockout, the 4-7-8 breathing visualizer and cognitive reappraisal prompts guide both partners toward physiological regulation. Communication only resumes when both partners independently confirm they are emotionally regulated.',
  steps: [
    { role: 'both', text: 'Monitor real-time heart rate via the Wearable Biometric Telemetry panel. In demo mode, use the HR slider to simulate your current state.' },
    { role: 'both', text: 'If heart rate exceeds 100 bpm (or you click "Simulate Flooding Spike"), the Gottman Physiological Lockout activates automatically with a 20-minute countdown.' },
    { role: 'both', text: 'Follow the 4-7-8 Breathwork Visualizer: inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Sync your breathing with the pulsing sphere.' },
    { role: 'both', text: 'Read and internalize the Cognitive Reappraisal prompts—reject catastrophic framing and focus on pure self-soothing (no rehearsing counter-arguments).' },
    { role: 'partnerA', text: 'When you feel physiologically and emotionally regulated, click "Confirm My Emotional Regulation" for Partner A.' },
    { role: 'partnerB', text: 'When you feel physiologically and emotionally regulated, click "Confirm My Emotional Regulation" for Partner B.' },
  ],
  successCriteria:
    'Both partners have independently confirmed emotional regulation, heart rate has returned below 100 bpm, and the flooding lockout is cleared. Communication channels are re-opened safely.',
};

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
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-rose-950/90 border border-rose-500/40 text-rose-400 shadow-inner">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-md bg-rose-950 border border-rose-500/40 text-rose-300">
                  Module 2 • Gottman Method
                </span>
                <span className="text-xs text-slate-400 font-mono">Physiological Flooding Management</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                Biometric Flooding Alert &amp; Smart De-escalation Engine
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Prevents physiological hyperarousal (heart rate &gt; 100 bpm) and destructive communication cycles
                (Four Horsemen). Enforces mandatory 20–30 min somatic grounding before discussions resume.
              </p>
            </div>
          </div>

          {/* Quick Simulation Trigger */}
          <button
            onClick={handleSimulateSpike}
            className="px-4 py-2.5 rounded-xl bg-rose-950/90 border border-rose-600/60 text-rose-200 hover:bg-rose-900 text-xs font-semibold flex items-center space-x-2 transition shadow-md shadow-rose-950/50"
          >
            <Zap className="w-4 h-4 text-rose-400" />
            <span>Simulate Flooding Spike (&gt;100 bpm)</span>
          </button>
        </div>
      </div>

      {/* On-Page Exercise Guide */}
      <ExerciseGuide content={GUIDE_CONTENT} />

      {/* Active Flooding Lockout Banner if triggered */}
      {isFlooded && (
        <div className="glass-panel rounded-2xl p-6 border-2 border-rose-600/70 bg-rose-950/50 relative overflow-hidden animate-in fade-in zoom-in-95 shadow-xl shadow-rose-950/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-2xl bg-rose-600/30 border border-rose-500/50 text-rose-400 animate-pulse">
                <AlertOctagon className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase text-rose-300 font-bold tracking-wider">
                  Gottman Physiological Lockout Active
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                  Timeout Mandatory: Physiological Flooding Detected
                </h3>
                <p className="text-xs text-rose-200/90 max-w-xl mt-1 leading-relaxed">
                  Heart rate exceeded clinical flooding threshold (&gt;100 bpm). The prefrontal cortex goes offline during flooding, making productive conversation neurobiologically impossible.
                </p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="text-center p-4 bg-slate-950/95 rounded-2xl border border-rose-600/50 min-w-[170px] shadow-lg">
              <div className="text-xs text-slate-400 uppercase font-mono font-medium">Cooling Timer</div>
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-rose-400 tracking-wider my-0.5">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Mandatory Gottman 20m</div>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Biometric Telemetry & Somatic 4-7-8 Breathing Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Telemetry Stream */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                <Heart className={`w-4 h-4 ${state.biometrics.currentHeartRate > 100 ? 'text-rose-500 animate-ping' : 'text-teal-400'}`} />
                <span>Wearable Biometric Telemetry</span>
              </h3>
              <span className="text-[10px] font-mono uppercase text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-semibold">
                Apple Health / Wearable API
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-1 shadow-inner">
                <span className="text-[11px] text-slate-400 uppercase font-mono font-medium">Heart Rate</span>
                <div className={`text-3xl font-extrabold font-mono ${state.biometrics.currentHeartRate > 100 ? 'text-rose-400' : 'text-teal-300'}`}>
                  {state.biometrics.currentHeartRate} <span className="text-xs font-normal text-slate-500">BPM</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Threshold: 100 bpm</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center space-y-1 shadow-inner">
                <span className="text-[11px] text-slate-400 uppercase font-mono font-medium">HRV (RMSSD)</span>
                <div className="text-3xl font-extrabold font-mono text-indigo-300">
                  {state.biometrics.currentHRV} <span className="text-xs font-normal text-slate-500">ms</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Vagal Tone Index</div>
              </div>
            </div>

            {/* Simulated Wearable Input Slider */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-400 font-medium">
                <span>Simulate Heart Rate Sensor:</span>
                <span className="font-mono text-white font-bold">{simulatedHR} bpm</span>
              </div>
              <input
                type="range"
                min="55"
                max="140"
                value={simulatedHR}
                onChange={handleHRSlider}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>55 (Resting)</span>
                <span className="text-amber-400">100 (Threshold)</span>
                <span className="text-rose-400">140 (Flooded)</span>
              </div>
            </div>
          </div>

          {/* Re-engagement Readiness Status */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-display font-bold text-white text-sm flex items-center space-x-2">
                <Shield className="w-4 h-4 text-teal-400" />
                <span>Re-engagement Regulation Check</span>
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Both partners must individually confirm physiological and emotional regulation before communication channels unlock.
            </p>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Partner A Readiness:</span>
                {partnerA_Regulated ? (
                  <span className="text-emerald-400 font-mono text-xs flex items-center space-x-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Regulated</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-xs font-semibold">Cooling Down...</span>
                )}
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Partner B Readiness:</span>
                {partnerB_Regulated ? (
                  <span className="text-emerald-400 font-mono text-xs flex items-center space-x-1.5 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Regulated</span>
                  </span>
                ) : (
                  <span className="text-amber-400 font-mono text-xs font-semibold">Cooling Down...</span>
                )}
              </div>
            </div>

            {/* Individual Regulation Button */}
            <button
              onClick={() => confirmRegulation(activeRole)}
              className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition shadow-md shadow-teal-950/50"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-200" />
              <span>Confirm My Emotional Regulation ({activeRole === 'partnerA' ? 'Partner A' : 'Partner B'})</span>
            </button>

            {isFlooded && (
              <button
                onClick={resetFloodingLockout}
                className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 flex items-center justify-center space-x-1 font-mono transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Override Timeout (Supervisor Mode)</span>
              </button>
            )}
          </div>
        </div>

        {/* Somatic 4-7-8 Breathing Visualizer & Cognitive Reappraisal */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <Wind className="w-5 h-5 text-teal-400" />
                <h3 className="font-display font-bold text-white text-base">
                  Somatic Grounding &amp; 4-7-8 Breathwork Visualizer
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold text-teal-300 bg-teal-950/80 px-2.5 py-0.5 rounded-md border border-teal-500/40">
                Vagus Nerve Down-Regulation
              </span>
            </div>

            {/* Interactive Breathing Sphere */}
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 relative">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                {/* Outer Breathing Glow Aura */}
                <div className="absolute inset-0 rounded-full bg-teal-500/10 border border-teal-500/30 animate-somatic-breath pointer-events-none" />
                {/* Inner Glowing Core */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-teal-950/80 border border-teal-400/50 flex flex-col items-center justify-center p-4 text-center shadow-2xl shadow-teal-950">
                  <span className="text-[11px] uppercase font-mono tracking-widest text-teal-300 font-bold">
                    4-7-8 Rhythm
                  </span>
                  <span className="text-sm font-bold text-white mt-1 font-display">Inhale 4s</span>
                  <span className="text-xs text-sky-300 font-medium">Hold 7s</span>
                  <span className="text-xs text-teal-300 font-medium">Exhale 8s</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed font-normal">
                Follow the pulsing visual: Inhale deeply through your nose for 4 seconds, hold your breath gently for 7 seconds, and exhale slowly through your mouth for 8 seconds.
              </p>
            </div>

            {/* Cognitive Reappraisal Framework */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-300 font-bold text-xs font-display">
                <Brain className="w-4 h-4" />
                <span>Gottman Cognitive Reappraisal During Cooling Phase:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-rose-300 font-bold font-display">1. Reject Catastrophic Framing:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Avoid thoughts like "This will never work." Replace with: "We are physiologically flooded right now, and pausing is evidence-based care."
                  </p>
                </div>

                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-teal-300 font-bold font-display">2. Pure Self-Soothing Focus:</div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Do not rehearse counter-arguments during this break. Focus on somatic sensations and deep diaphragmatic breathing.
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
