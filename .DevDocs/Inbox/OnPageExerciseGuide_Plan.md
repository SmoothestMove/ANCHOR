# On-Page Exercise Guide — Combined Plan Document

## Implementation Plan

Add a collapsible, on-page guide panel to every exercise module (Modules 1–5 + Psychometrics) that explains: **what it accomplishes** (clinical purpose), **how it works** (mechanism), and **what the user needs to do** (step-by-step completion instructions).

### New Component

| File | Action |
|------|--------|
| `src/components/layout/ExerciseGuide.tsx` | **[NEW]** Shared reusable collapsible guide panel |

### Modified Modules

| File | Action |
|------|--------|
| `src/components/module1_timeline/TimelineVaultView.tsx` | **[MODIFY]** Add ExerciseGuide |
| `src/components/module2_biometrics/BiometricFloodingView.tsx` | **[MODIFY]** Add ExerciseGuide |
| `src/components/module3_commitments/MicroCommitmentDashboard.tsx` | **[MODIFY]** Add ExerciseGuide |
| `src/components/module4_attunement/AttunementCoachView.tsx` | **[MODIFY]** Add ExerciseGuide |
| `src/components/module5_transparency/TransparencySunsetView.tsx` | **[MODIFY]** Add ExerciseGuide |
| `src/components/psychometrics/PsychometricsView.tsx` | **[MODIFY]** Add ExerciseGuide |

---

## Task Checklist

- [x] Create `ExerciseGuide.tsx` component
- [x] Integrate into Module 1 (Timeline Vault)
- [x] Integrate into Module 2 (Biometric Flooding)
- [x] Integrate into Module 3 (Micro-Commitments)
- [x] Integrate into Module 4 (Attunement Coach)
- [x] Integrate into Module 5 (Transparency Sunset)
- [x] Integrate into Psychometrics
- [x] Verify all guides render, collapse, and persist state
- [x] Verify no layout regressions

---

## Development Roadmap

### Phase 1: Core Component *(1 file)*
- [x] Build `ExerciseGuide.tsx` with collapsible 3-section layout, localStorage persistence, role-aware step highlighting

### Phase 2: Module Integration *(6 files)*
- [x] Add guide content to all 6 module views

### Phase 3: QA & Polish
- [x] Manual visual verification across all modules
- [x] Collapse state persistence testing
- [x] Role switching (Partner A / Partner B) verification

---

## Walkthrough

*(To be completed after implementation)*

---

## Guide Content Per Module

### Module 1: Dual-Lock Timeline & Disclosure Vault
- **Purpose**: Eliminate trickle truth by establishing a single, complete, shared factual timeline. NLP guardrails prevent PISD triggers.
- **How it works**: Partner A logs events into a dual-lock vault. NLP scans block graphic/defensive content. Partner B submits diagnostic questions asynchronously.
- **Steps**: Unlock session → Submit entries → Review & acknowledge → Submit questions → Answer questions.
- **Success**: All entries acknowledged, all questions answered.

### Module 2: Biometric Flooding & De-escalation
- **Purpose**: Prevent destructive communication during physiological flooding (HR > 100 bpm). Mandatory Gottman 20-minute cooling period.
- **How it works**: HR monitoring triggers automatic lockout. 4-7-8 breathwork and cognitive reappraisal framework guide regulation.
- **Steps**: Monitor HR → Lockout engages → Follow breathwork → Read reappraisal prompts → Confirm regulation.
- **Success**: Both partners confirm regulation; HR returns below threshold.

### Module 3: Behavioral Reliability & Micro-Commitments
- **Purpose**: Replace verbal apologies with observable behavioral data. Operant reconditioning of threat schema.
- **How it works**: Partner A logs verifiable daily commitments with proof. Partner B verifies. BCI tracks cumulative reliability.
- **Steps**: Create commitment → Complete with proof → Partner B verifies → Monitor BCI.
- **Success**: BCI ≥ 95%.

### Module 4: NLP Attunement Coach
- **Purpose**: Train Partner A in empathic communication. Intercept defensiveness in real time. EFT-aligned attachment injury resolution.
- **How it works**: NLP scans typed messages, intercepts violations, provides reframes. Attunement Score gives live feedback.
- **Steps**: Type reflection → Watch score → Review interceptions → Apply reframes → Send message.
- **Success**: Consistent ≥80% attunement without interceptions.

### Module 5: Transparency Scaffolding & Sunset
- **Purpose**: Temporary voluntary transparency to soothe epistemic panic. Systematic phase-out of digital monitoring.
- **How it works**: Partner A voluntarily logs updates. Anti-surveillance ethics enforced. Both partners vote to decommission when eligible.
- **Steps**: Post voluntary updates → Partner B reviews feed → Vote on Sunset Clause.
- **Success**: Both partners mutually vote to decommission.

### Psychometrics: Recovery Trajectory
- **Purpose**: Objectively track relational recovery using DTS, RDAS, and Perceived Epistemic Safety.
- **How it works**: 14-day micro-assessments plotted on longitudinal trajectory.
- **Steps**: Complete assessment → Rate scores → Review trajectory chart.
- **Success**: Sustained upward trajectory, DTS > 70.
