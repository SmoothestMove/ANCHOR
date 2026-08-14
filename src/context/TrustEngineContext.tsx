import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  AnchorSystemState,
  PartnerRole,
  ClinicalPhaseId,
  TimelineEntry,
  DiagnosticQuestion,
  MicroCommitment,
  TransparencyLog,
  AttunementMessage,
  PsychometricCheckin,
} from '../types/clinical';
import { INITIAL_SYSTEM_STATE } from '../utils/mockClinicalData';
import { analyzeTimelineFactualEntry, analyzeAttunementResponse, calculateAttunementScore, NLPCheckResult } from '../utils/nlpDefensivenessDetector';

interface TrustEngineContextType {
  state: AnchorSystemState;
  activeRole: PartnerRole;
  setActiveRole: (role: PartnerRole) => void;
  syncStatus: 'synced' | 'syncing' | 'offline';
  
  // Lobby Pairing & Data Persistence
  setLobbyCode: (code: string) => void;
  createLobby: (coupleName: string) => string;
  joinLobby: (code: string, role: PartnerRole) => boolean;
  exportBackupJSON: () => void;
  importBackupJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;

  // Phase Navigation & Gates
  advancePhase: () => void;
  setPhase: (phaseId: ClinicalPhaseId) => void;
  completeCurrentPhaseGate: () => void;

  // Safety & Triage
  submitIntakeTriage: (answers: { ipv: boolean; coercive: boolean; activeDeceit: boolean; addiction: boolean }) => void;
  triggerEmergencyPanicDisconnect: () => void;
  resetSafetyState: () => void;

  // Module 1: Dual-Lock Timeline & Vault
  addTimelineEntry: (entry: Omit<TimelineEntry, 'id' | 'createdAt' | 'partnerA_Signed' | 'partnerB_Acknowledged'>) => { success: boolean; nlpResult?: NLPCheckResult };
  acknowledgeTimelineEntry: (id: string) => void;
  signoffTimelinePartnerA: (id: string) => void;
  addDiagnosticQuestion: (question: string, clinicalIntent: DiagnosticQuestion['clinicalIntent']) => void;
  answerDiagnosticQuestion: (id: string, answerText: string) => void;
  setDualLockSessionActive: (active: boolean) => void;

  // Module 2: Biometric Flooding & De-escalation
  updateBiometrics: (hr: number, hrv: number) => void;
  triggerFloodingAlert: (triggeredBy?: 'partnerA' | 'partnerB') => void;
  confirmRegulation: (role: PartnerRole) => void;
  resetFloodingLockout: () => void;

  // Module 3: Commitments & BCI
  addCommitment: (commitment: Omit<MicroCommitment, 'id' | 'completed' | 'verifiedByPartnerB'>) => void;
  completeCommitment: (id: string, proofType: MicroCommitment['proofType'], proofDetail: string) => void;
  verifyCommitment: (id: string) => void;
  calculatedBCI: number;

  // Module 4: NLP Attunement Coach
  checkDraftResponse: (text: string) => NLPCheckResult;
  sendAttunementMessage: (rawText: string, finalSentText: string, intercepted: boolean, violationType?: string) => void;

  // Module 5: Transparency & Sunset Manager
  addTransparencyLog: (log: Omit<TransparencyLog, 'id' | 'timestamp' | 'voluntary'>) => void;
  submitSunsetVote: (role: PartnerRole, approve: boolean) => void;

  // Psychometrics
  addPsychometricCheckin: (checkin: Omit<PsychometricCheckin, 'dayNumber'>) => void;
}

const TrustEngineContext = createContext<TrustEngineContextType | null>(null);

const STORAGE_KEY_PREFIX = 'anchor_state_';
const BROADCAST_CHANNEL_NAME = 'anchor_sync_channel';

export const TrustEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AnchorSystemState>(() => {
    try {
      const savedCode = localStorage.getItem('anchor_active_lobby') || 'ANCHOR-7X9K';
      const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${savedCode}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load state from localStorage', e);
    }
    return INITIAL_SYSTEM_STATE;
  });

  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'offline'>('synced');

  // Broadcast channel for multi-tab / real-time synchronization
  const broadcastChannel = useMemo(() => {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    }
    return null;
  }, []);

  // Broadcast state changes and persist to localStorage
  const persistAndBroadcast = useCallback((newState: AnchorSystemState) => {
    setSyncStatus('syncing');
    try {
      const key = `${STORAGE_KEY_PREFIX}${newState.lobby.lobbyCode}`;
      localStorage.setItem(key, JSON.stringify(newState));
      localStorage.setItem('anchor_active_lobby', newState.lobby.lobbyCode);

      if (broadcastChannel) {
        broadcastChannel.postMessage({
          type: 'STATE_UPDATE',
          lobbyCode: newState.lobby.lobbyCode,
          state: newState,
          timestamp: Date.now(),
        });
      }
      setTimeout(() => setSyncStatus('synced'), 250);
    } catch (err) {
      console.error('Persistence error', err);
      setSyncStatus('offline');
    }
  }, [broadcastChannel]);

  // Listen for BroadcastChannel updates from other tabs/clients
  useEffect(() => {
    if (!broadcastChannel) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'STATE_UPDATE' && event.data.lobbyCode === state.lobby.lobbyCode) {
        setState((prev) => {
          if (event.data.timestamp > (prev.lobby.lastSyncTimestamp || 0)) {
            return event.data.state;
          }
          return prev;
        });
      }
    };

    broadcastChannel.addEventListener('message', handleMessage);
    return () => {
      broadcastChannel.removeEventListener('message', handleMessage);
    };
  }, [broadcastChannel, state.lobby.lobbyCode]);

  // Biometric countdown timer for Gottman Flooding Lockout
  useEffect(() => {
    if (!state.biometrics.isFlooded || state.biometrics.lockoutRemainingSeconds <= 0) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (!prev.biometrics.isFlooded) return prev;
        const newSeconds = Math.max(0, prev.biometrics.lockoutRemainingSeconds - 1);
        const nextState = {
          ...prev,
          biometrics: {
            ...prev.biometrics,
            lockoutRemainingSeconds: newSeconds,
          },
        };
        return nextState;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.biometrics.isFlooded, state.biometrics.lockoutRemainingSeconds]);

  // Helper to update state immutably and persist
  const updateState = useCallback((updater: (prev: AnchorSystemState) => AnchorSystemState) => {
    setState((prev) => {
      const next = updater(prev);
      const withTimestamp: AnchorSystemState = {
        ...next,
        lobby: {
          ...next.lobby,
          lastSyncTimestamp: Date.now(),
        },
      };
      persistAndBroadcast(withTimestamp);
      return withTimestamp;
    });
  }, [persistAndBroadcast]);

  // Role management
  const setActiveRole = useCallback((role: PartnerRole) => {
    updateState((prev) => ({ ...prev, activeRole: role }));
  }, [updateState]);

  // Lobby Pairing
  const createLobby = useCallback((coupleName: string) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'ANCHOR-';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    updateState((prev) => ({
      ...prev,
      lobby: {
        ...prev.lobby,
        lobbyCode: code,
        coupleName: coupleName.trim() || 'Anchor Couple',
        createdDate: new Date().toISOString().split('T')[0],
      },
    }));
    return code;
  }, [updateState]);

  const joinLobby = useCallback((code: string, role: PartnerRole) => {
    const cleaned = code.trim().toUpperCase();
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${cleaned}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setState({ ...parsed, activeRole: role });
        localStorage.setItem('anchor_active_lobby', cleaned);
        return true;
      } catch {
        // fallback
      }
    }
    // Create new paired session with that code if not existing
    updateState((prev) => ({
      ...prev,
      activeRole: role,
      lobby: {
        ...prev.lobby,
        lobbyCode: cleaned,
      },
    }));
    return true;
  }, [updateState]);

  const setLobbyCode = useCallback((code: string) => {
    joinLobby(code, state.activeRole);
  }, [joinLobby, state.activeRole]);

  // Backup Export & Import
  const exportBackupJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `anchor_backup_${state.lobby.lobbyCode}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [state]);

  const importBackupJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.version && parsed.lobby) {
        setState(parsed);
        persistAndBroadcast(parsed);
        return true;
      }
    } catch (e) {
      console.error('Import backup failed', e);
    }
    return false;
  }, [persistAndBroadcast]);

  const resetToDefaults = useCallback(() => {
    setState(INITIAL_SYSTEM_STATE);
    persistAndBroadcast(INITIAL_SYSTEM_STATE);
  }, [persistAndBroadcast]);

  // Clinical Phase Management
  const setPhase = useCallback((phaseId: ClinicalPhaseId) => {
    updateState((prev) => ({
      ...prev,
      currentPhase: phaseId,
      phases: {
        ...prev.phases,
        [phaseId]: {
          ...prev.phases[phaseId],
          isUnlocked: true,
        },
      },
    }));
  }, [updateState]);

  const advancePhase = useCallback(() => {
    updateState((prev) => {
      const nextPhaseId = Math.min(8, prev.currentPhase + 1) as ClinicalPhaseId;
      return {
        ...prev,
        currentPhase: nextPhaseId,
        phases: {
          ...prev.phases,
          [prev.currentPhase]: {
            ...prev.phases[prev.currentPhase],
            isCompleted: true,
            completionDate: new Date().toISOString().split('T')[0],
          },
          [nextPhaseId]: {
            ...prev.phases[nextPhaseId],
            isUnlocked: true,
          },
        },
      };
    });
  }, [updateState]);

  const completeCurrentPhaseGate = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      phases: {
        ...prev.phases,
        [prev.currentPhase]: {
          ...prev.phases[prev.currentPhase],
          isCompleted: true,
          completionDate: new Date().toISOString().split('T')[0],
        },
      },
    }));
  }, [updateState]);

  // Safety & Triage
  const submitIntakeTriage = useCallback((answers: { ipv: boolean; coercive: boolean; activeDeceit: boolean; addiction: boolean }) => {
    const isHardStop = answers.ipv || answers.coercive || answers.activeDeceit;
    let reason = '';
    if (answers.ipv || answers.coercive) {
      reason = 'Severe physical or coercive safety risk detected. Couple trust building is clinically contraindicated during active danger.';
    } else if (answers.activeDeceit) {
      reason = 'Active ongoing deception detected. Trust-building modules require a 100% truthful baseline. Individual professional therapy is required.';
    }

    updateState((prev) => ({
      ...prev,
      triage: {
        completed: true,
        screenDate: new Date().toISOString().split('T')[0],
        ipvFlag: answers.ipv,
        coerciveControlFlag: answers.coercive,
        activeDeceptionFlag: answers.activeDeceit,
        activeAddictionFlag: answers.addiction,
        hardStopActive: isHardStop,
        hardStopReason: reason,
        safetyPlanAcknowledged: false,
      },
    }));
  }, [updateState]);

  const triggerEmergencyPanicDisconnect = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      transparency: {
        ...prev.transparency,
        logs: [], // Instant safe wipe
      },
      lobby: {
        ...prev.lobby,
        partnerA_Online: false,
        partnerB_Online: false,
      },
    }));
  }, [updateState]);

  const resetSafetyState = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      triage: {
        ...prev.triage,
        hardStopActive: false,
        hardStopReason: undefined,
      },
    }));
  }, [updateState]);

  // Module 1: Timeline & Vault
  const addTimelineEntry = useCallback((entryData: Omit<TimelineEntry, 'id' | 'createdAt' | 'partnerA_Signed' | 'partnerB_Acknowledged'>) => {
    const nlpResult = analyzeTimelineFactualEntry(entryData.factualDescription);
    if (nlpResult.hasViolation) {
      return { success: false, nlpResult };
    }

    const newEntry: TimelineEntry = {
      ...entryData,
      id: `t-${Date.now()}`,
      status: 'locked_for_session',
      partnerA_Signed: true,
      partnerB_Acknowledged: false,
      createdAt: new Date().toISOString(),
    };

    updateState((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        entries: [newEntry, ...prev.timeline.entries],
      },
    }));

    return { success: true, nlpResult };
  }, [updateState]);

  const acknowledgeTimelineEntry = useCallback((id: string) => {
    updateState((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        entries: prev.timeline.entries.map((e) => (e.id === id ? { ...e, partnerB_Acknowledged: true, status: 'disclosed_and_reviewed' } : e)),
      },
    }));
  }, [updateState]);

  const signoffTimelinePartnerA = useCallback((id: string) => {
    updateState((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        entries: prev.timeline.entries.map((e) => (e.id === id ? { ...e, partnerA_Signed: true } : e)),
      },
    }));
  }, [updateState]);

  const addDiagnosticQuestion = useCallback((question: string, clinicalIntent: DiagnosticQuestion['clinicalIntent']) => {
    const newQ: DiagnosticQuestion = {
      id: `q-${Date.now()}`,
      question: question.trim(),
      clinicalIntent,
      isAnswered: false,
      createdAt: new Date().toISOString(),
    };
    updateState((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        questions: [newQ, ...prev.timeline.questions],
      },
    }));
  }, [updateState]);

  const answerDiagnosticQuestion = useCallback((id: string, answerText: string) => {
    updateState((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        questions: prev.timeline.questions.map((q) =>
          q.id === id
            ? {
                ...q,
                isAnswered: true,
                answerText: answerText.trim(),
                answeredAt: new Date().toISOString(),
              }
            : q
        ),
      },
    }));
  }, [updateState]);

  const setDualLockSessionActive = useCallback((active: boolean) => {
    updateState((prev) => ({
      ...prev,
      timeline: {
        ...prev.timeline,
        sessionActive: active,
        dualLockUnlocked: active,
      },
    }));
  }, [updateState]);

  // Module 2: Biometrics
  const updateBiometrics = useCallback((hr: number, hrv: number) => {
    updateState((prev) => {
      const isFlooded = hr >= 100;
      return {
        ...prev,
        biometrics: {
          ...prev.biometrics,
          currentHeartRate: hr,
          currentHRV: hrv,
          isFlooded: isFlooded ? true : prev.biometrics.isFlooded,
          lockoutRemainingSeconds: isFlooded && !prev.biometrics.isFlooded ? 1200 : prev.biometrics.lockoutRemainingSeconds,
        },
      };
    });
  }, [updateState]);

  const triggerFloodingAlert = useCallback((triggeredBy: 'partnerA' | 'partnerB' = 'partnerB') => {
    updateState((prev) => ({
      ...prev,
      biometrics: {
        ...prev.biometrics,
        currentHeartRate: 114,
        currentHRV: 24,
        isFlooded: true,
        floodingTriggeredBy: triggeredBy,
        lockoutRemainingSeconds: 1200,
        lockoutTotalSeconds: 1200,
        partnerA_Regulated: false,
        partnerB_Regulated: false,
        groundingExerciseCompleted: false,
      },
    }));
  }, [updateState]);

  const confirmRegulation = useCallback((role: PartnerRole) => {
    updateState((prev) => {
      const partnerA_Regulated = role === 'partnerA' ? true : prev.biometrics.partnerA_Regulated;
      const partnerB_Regulated = role === 'partnerB' ? true : prev.biometrics.partnerB_Regulated;
      const bothReady = partnerA_Regulated && partnerB_Regulated;

      return {
        ...prev,
        biometrics: {
          ...prev.biometrics,
          partnerA_Regulated,
          partnerB_Regulated,
          isFlooded: bothReady ? false : prev.biometrics.isFlooded,
          currentHeartRate: bothReady ? 74 : prev.biometrics.currentHeartRate,
        },
      };
    });
  }, [updateState]);

  const resetFloodingLockout = useCallback(() => {
    updateState((prev) => ({
      ...prev,
      biometrics: {
        ...prev.biometrics,
        isFlooded: false,
        currentHeartRate: 72,
        currentHRV: 56,
        lockoutRemainingSeconds: 0,
        partnerA_Regulated: true,
        partnerB_Regulated: true,
      },
    }));
  }, [updateState]);

  // Module 3: Commitments & BCI
  const addCommitment = useCallback((commitment: Omit<MicroCommitment, 'id' | 'completed' | 'verifiedByPartnerB'>) => {
    const newC: MicroCommitment = {
      ...commitment,
      id: `c-${Date.now()}`,
      completed: false,
      verifiedByPartnerB: false,
    };
    updateState((prev) => ({
      ...prev,
      commitments: [newC, ...prev.commitments],
    }));
  }, [updateState]);

  const completeCommitment = useCallback((id: string, proofType: MicroCommitment['proofType'], proofDetail: string) => {
    updateState((prev) => ({
      ...prev,
      commitments: prev.commitments.map((c) =>
        c.id === id
          ? {
              ...c,
              completed: true,
              proofType,
              proofDetail,
              completedAt: new Date().toISOString(),
            }
            : c
      ),
    }));
  }, [updateState]);

  const verifyCommitment = useCallback((id: string) => {
    updateState((prev) => ({
      ...prev,
      commitments: prev.commitments.map((c) => (c.id === id ? { ...c, verifiedByPartnerB: true } : c)),
    }));
  }, [updateState]);

  // Dynamic Behavioral Consistency Index calculation
  const calculatedBCI = useMemo(() => {
    const completedVerified = state.commitments.filter((c) => c.completed && c.verifiedByPartnerB).length;
    const total = state.commitments.length;
    if (total === 0) return 96.5;
    const ratio = (completedVerified / total) * 100;
    return Number(Math.max(65, Math.min(100, ratio)).toFixed(1));
  }, [state.commitments]);

  // Module 4: NLP Attunement Coach
  const checkDraftResponse = useCallback((text: string): NLPCheckResult => {
    return analyzeAttunementResponse(text);
  }, []);

  const sendAttunementMessage = useCallback((rawText: string, finalSentText: string, intercepted: boolean, violationType?: string) => {
    const score = calculateAttunementScore(finalSentText);
    const newMsg: AttunementMessage = {
      id: `msg-${Date.now()}`,
      senderRole: state.activeRole,
      rawText,
      finalSentText,
      intercepted,
      violationType: violationType as AttunementMessage['violationType'],
      timestamp: new Date().toISOString(),
      validationScore: score,
    };
    updateState((prev) => ({
      ...prev,
      attunementChat: [...prev.attunementChat, newMsg],
    }));
  }, [state.activeRole, updateState]);

  // Module 5: Transparency & Sunset Manager
  const addTransparencyLog = useCallback((log: Omit<TransparencyLog, 'id' | 'timestamp' | 'voluntary'>) => {
    const newLog: TransparencyLog = {
      ...log,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      voluntary: true,
    };
    updateState((prev) => ({
      ...prev,
      transparency: {
        ...prev.transparency,
        logs: [newLog, ...prev.transparency.logs],
      },
    }));
  }, [updateState]);

  const submitSunsetVote = useCallback((role: PartnerRole, approve: boolean) => {
    updateState((prev) => {
      const a = role === 'partnerA' ? approve : prev.transparency.sunset.decommissionApprovedByPartnerA;
      const b = role === 'partnerB' ? approve : prev.transparency.sunset.decommissionApprovedByPartnerB;
      const fullyDecommissioned = a && b;
      return {
        ...prev,
        transparency: {
          ...prev.transparency,
          sunset: {
            ...prev.transparency.sunset,
            decommissionApprovedByPartnerA: a,
            decommissionApprovedByPartnerB: b,
            isMonitoringDecommissioned: fullyDecommissioned,
          },
        },
      };
    });
  }, [updateState]);

  // Psychometrics
  const addPsychometricCheckin = useCallback((checkin: Omit<PsychometricCheckin, 'dayNumber'>) => {
    updateState((prev) => {
      const nextDay = prev.psychometrics.length > 0 ? prev.psychometrics[prev.psychometrics.length - 1].dayNumber + 7 : 1;
      const newCheckin: PsychometricCheckin = {
        ...checkin,
        dayNumber: nextDay,
      };
      return {
        ...prev,
        psychometrics: [...prev.psychometrics, newCheckin],
      };
    });
  }, [updateState]);

  const value: TrustEngineContextType = {
    state,
    activeRole: state.activeRole,
    setActiveRole,
    syncStatus,
    setLobbyCode,
    createLobby,
    joinLobby,
    exportBackupJSON,
    importBackupJSON,
    resetToDefaults,
    advancePhase,
    setPhase,
    completeCurrentPhaseGate,
    submitIntakeTriage,
    triggerEmergencyPanicDisconnect,
    resetSafetyState,
    addTimelineEntry,
    acknowledgeTimelineEntry,
    signoffTimelinePartnerA,
    addDiagnosticQuestion,
    answerDiagnosticQuestion,
    setDualLockSessionActive,
    updateBiometrics,
    triggerFloodingAlert,
    confirmRegulation,
    resetFloodingLockout,
    addCommitment,
    completeCommitment,
    verifyCommitment,
    calculatedBCI,
    checkDraftResponse,
    sendAttunementMessage,
    addTransparencyLog,
    submitSunsetVote,
    addPsychometricCheckin,
  };

  return <TrustEngineContext.Provider value={value}>{children}</TrustEngineContext.Provider>;
};

export const useTrustEngine = () => {
  const context = useContext(TrustEngineContext);
  if (!context) {
    throw new Error('useTrustEngine must be used within a TrustEngineProvider');
  }
  return context;
};
