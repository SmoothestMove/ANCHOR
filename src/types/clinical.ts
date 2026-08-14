export type PartnerRole = 'partnerA' | 'partnerB' | 'supervisor';

export type ClinicalPhaseId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ClinicalPhaseInfo {
  id: ClinicalPhaseId;
  name: string;
  subtitle: string;
  primaryObjective: string;
  clinicalGate: string;
  unlockedModuleIds: number[];
  lockedModuleIds: number[];
  isUnlocked: boolean;
  isCompleted: boolean;
  completionDate?: string;
}

export interface LobbySession {
  lobbyCode: string;
  coupleName: string;
  createdDate: string;
  partnerA_Online: boolean;
  partnerB_Online: boolean;
  partnerA_ReadyForSession: boolean;
  partnerB_ReadyForSession: boolean;
  activeSyncStatus: 'synced' | 'syncing' | 'offline';
  lastSyncTimestamp: number;
}

export interface IntakeTriage {
  completed: boolean;
  screenDate?: string;
  ipvFlag: boolean;
  coerciveControlFlag: boolean;
  activeDeceptionFlag: boolean;
  activeAddictionFlag: boolean;
  hardStopActive: boolean;
  hardStopReason?: string;
  safetyPlanAcknowledged: boolean;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  category: 'direct_contact' | 'digital_messaging' | 'financial_expenditure' | 'deception_event' | 'disclosure_event';
  factualDescription: string;
  financialScope?: string;
  locationScope?: string;
  status: 'draft' | 'locked_for_session' | 'disclosed_and_reviewed';
  hasGraphicDetailRisk?: boolean;
  hasDefensivenessRisk?: boolean;
  partnerA_Signed: boolean;
  partnerB_Acknowledged: boolean;
  createdAt: string;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  clinicalIntent: 'factual_clarity' | 'timeline_gap' | 'financial_impact' | 'boundary_reassurance';
  isAnswered: boolean;
  answerText?: string;
  answeredAt?: string;
  createdAt: string;
}

export interface BiometricState {
  currentHeartRate: number;
  currentHRV: number;
  isFlooded: boolean;
  floodingTriggeredBy: 'partnerA' | 'partnerB' | null;
  lockoutRemainingSeconds: number;
  lockoutTotalSeconds: number;
  partnerA_Regulated: boolean;
  partnerB_Regulated: boolean;
  groundingExerciseCompleted: boolean;
}

export interface MicroCommitment {
  id: string;
  title: string;
  category: 'communication' | 'schedule' | 'financial' | 'transparency' | 'relational_care';
  dueTime: string;
  targetDate: string;
  completed: boolean;
  verifiedByPartnerB: boolean;
  proofType?: 'timestamp' | 'location_checkin' | 'receipt_upload' | 'self_verified';
  proofDetail?: string;
  completedAt?: string;
  notes?: string;
}

export interface AttunementMessage {
  id: string;
  senderRole: PartnerRole;
  rawText: string;
  intercepted: boolean;
  violationType?: 'blame_shifting' | 'minimization' | 'gaslighting' | 'counter_accusation' | 'stonewalling';
  warningMessage?: string;
  reframingSuggestion?: string;
  finalSentText: string;
  timestamp: string;
  validationScore: number; // 0 to 100
}

export interface TransparencyLog {
  id: string;
  type: 'schedule' | 'location' | 'financial' | 'digital_activity';
  summary: string;
  detail: string;
  timestamp: string;
  voluntary: boolean;
}

export interface SunsetReviewState {
  lastEvaluationDate: string;
  nextEvaluationDate: string;
  consistencyScore: number; // e.g. 98.4
  minimumDaysMaintained: number; // e.g. 60
  eligibleForDecommissioning: boolean;
  decommissionApprovedByPartnerA: boolean;
  decommissionApprovedByPartnerB: boolean;
  isMonitoringDecommissioned: boolean;
}

export interface PsychometricCheckin {
  assessmentDate: string;
  dayNumber: number;
  dtsScore: number; // Dyadic Trust Scale (0 - 100)
  rdasScore: number; // Revised Dyadic Adjustment Scale (0 - 100)
  perceivedSafetyScore: number; // (0 - 100)
  partnerARating: number;
  partnerBRating: number;
}

export interface AnchorSystemState {
  version: number;
  lobby: LobbySession;
  activeRole: PartnerRole;
  currentPhase: ClinicalPhaseId;
  phases: Record<ClinicalPhaseId, ClinicalPhaseInfo>;
  triage: IntakeTriage;
  timeline: {
    entries: TimelineEntry[];
    questions: DiagnosticQuestion[];
    sessionActive: boolean;
    dualLockUnlocked: boolean;
  };
  biometrics: BiometricState;
  commitments: MicroCommitment[];
  attunementChat: AttunementMessage[];
  transparency: {
    logs: TransparencyLog[];
    sunset: SunsetReviewState;
  };
  psychometrics: PsychometricCheckin[];
}
