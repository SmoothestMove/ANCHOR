# ANCHOR: Relational Trust Engine
### **A**ccountability • **N**urture • **C**larity • & **H**onest **O**pen **R**econnection

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Clinical Framework](https://img.shields.io/badge/Clinical-CBCT%20%7C%20EFT%20%7C%20Gottman-14b8a6?style=flat)](https://www.gottman.com/)

Welcome to the **ANCHOR** user manual. ANCHOR stands for **Accountability, Nurture, Clarity, & Honest Open Reconnection**. This guide provides a detailed walkthrough of every module, clinical protocol, user role, and interface control within the application.

---

## 📑 Table of Contents
1. [Introduction & Core Concepts](#1-introduction--core-concepts)
2. [Getting Started & Workspace Setup](#2-getting-started--workspace-setup)
3. [Global Navigation, Roles & Dual-Client Mode](#3-global-navigation-roles--dual-client-mode)
4. [Intake Screening & Safety Triage](#4-intake-screening--safety-triage)
5. [The 8-Phase Dynamic Clinical State Engine](#5-the-8-phase-dynamic-clinical-state-engine)
6. [Module 1: Asynchronous Dual-Lock Timeline & Disclosure Vault](#6-module-1-asynchronous-dual-lock-timeline--disclosure-vault)
7. [Module 2: Biometric Flooding Alert & Smart De-escalation](#7-module-2-biometric-flooding-alert--smart-de-escalation)
8. [Module 3: Behavioral Reliability Dashboard & Consistency Index (BCI)](#8-module-3-behavioral-reliability-dashboard--consistency-index-bci)
9. [Module 4: Real-Time NLP Non-Defensive Attunement Coach](#9-module-4-real-time-nlp-non-defensive-attunement-coach)
10. [Module 5: Consensual Transparency Scaffolding & Sunset Manager](#10-module-5-consensual-transparency-scaffolding--sunset-manager)
11. [Psychometrics & Longitudinal Assessment Suite](#11-psychometrics--longitudinal-assessment-suite)
12. [Data Backup, Multi-Device Sync & Privacy Ethics](#12-data-backup-multi-device-sync--privacy-ethics)
13. [Troubleshooting & Frequently Asked Questions (FAQ)](#13-troubleshooting--frequently-asked-questions-faq)

---

## 1. Introduction & Core Concepts

### What is ANCHOR?
**ANCHOR** (**A**ccountability, **N**urture, **C**larity, & **H**onest **O**pen **R**econnection) is an evidence-based clinical platform engineered to guide romantic couples through recovery from acute relationship betrayals, infidelity, or chronic deceit. Rather than acting as a standard messaging tool or a punitive tracking app, ANCHOR translates clinical methodologies from couples therapy into structured interactive software.

### The ANCHOR Pillars:
- **[A]ccountability**: Radical ownership of past deception without excuses, gaslighting, or blame-shifting.
- **[N]urture**: Emotionally Focused validation, attachment injury healing, and soothing somatic hyperarousal.
- **[C]larity**: Establishing a single, complete, shared factual reality through the dual-lock timeline vault to eliminate "trickle truth".
- **& [H]onest [O]pen [R]econnection**: Graduating from external verification into mature, earned autonomous trust and intimacy.

### Key Terminology
- **Partner A (Disclosing Partner)**: The partner who engaged in dishonesty, infidelity, or betrayal. Partner A's primary clinical task is radical accountability, non-defensive attunement, verifiable behavioral consistency, and providing factual disclosure.
- **Partner B (Injured / Betrayed Partner)**: The partner who experienced epistemic rupture and trauma. Partner B's primary task is establishing safety boundaries, submitting diagnostic inquiry questions, verifying commitment proof, and monitoring emotional safety.
- **Supervisor (Clinician)**: An optional facilitation perspective for therapists to oversee adherence, psychometric trends, and phase gates.
- **Trickle Truth**: The highly damaging clinical pattern where the disclosing partner confesses in small, piecemeal increments over months. ANCHOR completely eliminates trickle truth through its structured dual-lock timeline.
- **Post-Infidelity Stress Disorder (PISD)**: Trauma symptoms (intrusive imagery, hypervigilance, panic) triggered by graphic details. ANCHOR utilizes natural language processing (NLP) to filter out intrusive sexual/physical descriptions.
- **Diffuse Physiological Arousal (DPA / Flooding)**: When heart rate exceeds 100 BPM, the nervous system enters fight-or-flight, making constructive communication neurobiologically impossible.
- **Behavioral Consistency Index (BCI)**: The mathematical ratio of verified completed micro-actions to total assigned commitments.

---

## 2. Getting Started & Workspace Setup

### Prerequisites
- Node.js v18.0.0 or higher installed on your computer.
- Modern web browser (Google Chrome, Microsoft Edge, Brave, or Safari).

### Local Installation & Startup

#### Step 1: Install Project Dependencies (one-time)
Run this command once after cloning or unzipping the project:
```powershell
npm install
```

#### Step 2: Launch the Development Server (every session)
Run this command each time you start an active session:
```powershell
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

#### Step 3: Build for Production (one-time / deployment)
```powershell
npm run build
```

---

## 3. Global Navigation, Roles & Dual-Client Mode

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [Logo] ANCHOR   [Role Selector: Partner B ▾]  [Dual View ◫]  [Lobby: 7X9K] [PANIC ⨂] │
├──────────────────────────────────────────────────────────────────────────────────┤
│ ❖ Phase 1: Stabilization & Crisis Management — Impact & Grounding  [Advance Phase]│
├──────────────────────────────────────────────────────────────────────────────────┤
│ [M1: Timeline] [M2: Biometrics] [M3: Commitments] [M4: Attunement] [M5: Sunset]  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### Top Application Header Controls
1. **Role Switcher**: Click the user badge to instantly switch perspective between:
   - **Partner B (Injured / Betrayed)** *(Default on first load)*
   - **Partner A (Disclosing / Participating)**
   - **Supervisor (Clinical Observer)**
2. **Dual-Client View Button (`◫ Dual View`)**:
   - Toggles a split-screen viewport showing **Partner A** on the left and **Partner B** on the right simultaneously.
   - Ideal for solo demonstrations, clinician supervision, or joint co-located sessions.
3. **Lobby Code Button (`ANCHOR-XXXX`)**:
   - Opens the Lobby Pairing modal to create a new session code or join an existing partner room.
4. **Data Management Controls**:
   - **Export State (`↓`)**: Downloads the entire clinical history and state as an encrypted JSON backup file.
   - **Import State (`↑`)**: Restores a previously saved session state from JSON.
   - **Reset to Defaults (`↺`)**: Clears data back to initial clinical baseline.
5. **Emergency Panic Disconnect (`⨂ Emergency Panic`)**:
   - Instantly wipes active memory, terminates the session, and presents immediate national crisis resources.

---

## 4. Intake Screening & Safety Triage

When opening ANCHOR for the first time, the **Clinical Safety & Triage Assessment** modal automatically appears before any module can be accessed.

```
┌────────────────────────────────────────────────────────┐
│ ⚠️ Clinical Safety & Triage Assessment                  │
│                                                        │
│ [ ] Physical violence, threats, or intimidation?       │
│ [ ] Coercive control, isolation, or device tracking?   │
│ [ ] Active, ongoing deception or concealed contact?    │
│ [ ] Unmanaged substance dependence or active addiction?│
│                                                        │
│                  [Submit Screening Assessment]         │
└────────────────────────────────────────────────────────┘
```

### Purpose & Clinical Gate
Clinical trust reconstruction requires a foundational baseline of physical safety, freedom from coercive control, and the total cessation of active deception.

### How to Complete the Intake Screening:
1. Review each screening checkbox:
   - **Intimate Partner Violence (IPV)**: Physical aggression, threats of harm, or stalking.
   - **Coercive Control**: Financial hostage-taking, forced isolation from family, or unconsented surveillance.
   - **Active Deception**: Ongoing concealed communication with affair partners or hidden bank accounts.
   - **Active Addiction**: Unmanaged substance or behavioral addiction that precludes emotional stability.
2. Click **Submit Screening Assessment**.
3. **Outcome Scenarios**:
   - **Green Check / All Clear**: If zero contraindications are flagged, the couple receives full clearance into Phase 1.
   - **Red Hard-Stop Shield**: If any contraindication is selected, the application enters an emergency hard stop lock. A detailed safety plan is displayed alongside direct hotline links (988 and 1-800-799-SAFE). Clinical exercises remain locked until verified safe.

---

## 5. The 8-Phase Dynamic Clinical State Engine

ANCHOR structures recovery across **8 sequential, stage-gated clinical phases** displayed in the persistent banner across the top of the interface:

```
[Phase 1] ──> [Phase 2] ──> [Phase 3] ──> [Phase 4] ──> [Phase 5] ──> [Phase 6] ──> [Phase 7] ──> [Phase 8]
Stabilize     Truth Vault   Attunement    BCI Habits    Gottman Talk  Shared Goals  Sensate Focus Decommission
```

### Phase Breakdown & Unlocking Matrix

| Phase | Phase Name | Primary Clinical Objective | Gate Requirement to Advance |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Stabilization & Crisis** | Contain acute trauma, stop all contact with third parties, establish safety boundaries. | Zero new lies for 14 days; 100% agreement on safety boundaries. |
| **Phase 2** | **Truth Reconstruction** | Eliminate trickle truth via chronological factual disclosure in the dual-lock vault. | Both partners sign off on the complete factual timeline. |
| **Phase 3** | **Emotional Processing** | Process anger, betrayal trauma, and attachment injury using EFT blamer-softening. | Partner B reports feeling deeply heard; Partner A demonstrates zero defensiveness. |
| **Phase 4** | **Behavioral Reconditioning** | Replace verbal promises with daily verifiable micro-commitments. | 60 consecutive days with $\ge 95\%$ Behavioral Consistency Index (BCI). |
| **Phase 5** | **Communication Repair** | Eliminate Gottman's Four Horsemen and practice constructive dialogue. | 3 consecutive unflooded conflict resolution sessions completed. |
| **Phase 6** | **Shared Meaning & Connection**| Rebuild dyadic cohesion, shared vision, and positive rituals of connection. | Statistically significant increase in Revised Dyadic Adjustment Scale (RDAS). |
| **Phase 7** | **Vulnerability & Intimacy** | Sensate focus exercises and consensual physical reconnection. | Mutual agreement on emotional safety prior to physical intimacy. |
| **Phase 8** | **Maintenance & Sunset** | Mutual decommissioning of digital monitoring scaffolding into earned autonomous trust. | Successful vote to sunset digital tracking; graduation to maintenance. |

### Advancing Phases
Click the **Advance Phase** button in the Clinical Phase Banner once both partners and their therapist agree that the specific clinical gate criteria have been satisfied.

---

## 6. Module 1: Asynchronous Dual-Lock Timeline & Disclosure Vault

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Module 1: Asynchronous Dual-Lock Timeline & Disclosure Vault (CBCT)                     │
│ [Dual-Lock Session: UNLOCKED 🔓]                                                        │
├───────────────────────────────────────────┬─────────────────────────────────────────────┤
│ 📝 Partner A: Factual Disclosure Entry    │ 💬 Partner B: Diagnostic Inquiry Queue       │
│                                           │                                             │
│ Event Date: [ 2026-03-12 ]                │ Question Focus: [ Financial Impact ▾ ]      │
│ Title: [ Hotel Booking & Meeting ]        │ Question: [ Were marital funds used? ]      │
│ Category: [ Financial Expenditure ▾ ]     │                                             │
│ Financial Scope: [ $420.00 ]              │                                             │
│ Location: [ Downtown Westin ]             │                                             │
│ Factual Details:                          │                                             │
│ [ On March 12th, I reserved room 402... ] │                                             │
│                                           │                                             │
│ [ Submit Factual Disclosure Entry ]       │ [ Submit Diagnostic Inquiry Question ]      │
└───────────────────────────────────────────┴─────────────────────────────────────────────┘
```

### Purpose
To completely replace "trickle truth" with a structured, factual disclosure while preventing intrusive, sexually graphic details that trigger Post-Infidelity Stress Disorder (PISD).

### Workflow for Partner A (Disclosing Partner)
1. **Unlock the Session**: Ensure the Dual-Lock toggle is set to **Unlocked** with mutual readiness.
2. **Complete the Disclosure Form**:
   - Select the chronological **Date**.
   - Enter an objective **Event Summary Title**.
   - Select the **Category** (*Direct Contact*, *Digital Messaging*, *Financial Expenditure*, *Deception Event*, or *Disclosure Event*).
   - Specify **Financial Scope** (e.g. `$250.00`) and **Location Scope**.
   - Type the **Factual Diagnostic Details**.
3. **Clinical NLP Guardrail Interception**:
   - If you include sexually graphic or explicit physical descriptions, the NLP engine blocks submission and displays:
     > `Graphic physical description detected. Post-Infidelity Stress Disorder (PISD) guardrail triggered.`
   - If you include defensive justification (e.g. *"because you were distant"*), the engine flags blame-shifting and provides a 1-click button: **Apply Recommended Non-Defensive Reframe**.
4. **Sign-off**: Click **Sign & Certify Disclosure** to submit.

### Workflow for Partner B (Betrayed Partner)
1. **Review Disclosures**: Read newly submitted factual timeline cards.
2. **Acknowledge**: Click **Acknowledge Factual Disclosure** once processed. (Acknowledging confirms receipt of the fact, not approval or forgiveness).
3. **Ask Diagnostic Questions**:
   - Select a Clinical Intent: *Factual Clarity*, *Timeline Gap*, *Financial Impact*, or *Boundary Reassurance*.
   - Type your specific question and click **Submit Question**.
4. **Partner A Response**: Partner A can type answers directly in the diagnostic card, ensuring all ambiguities are addressed in writing.

---

## 7. Module 2: Biometric Flooding Alert & Smart De-escalation

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Module 2: Biometric Flooding Alert & Smart De-escalation (Gottman Method)               │
├───────────────────────────────────────────┬─────────────────────────────────────────────┤
│ 🫀 Wearable Biometric Telemetry           │ 🛑 Gottman 20-Minute Somatic Lockout        │
│                                           │                                             │
│ Current Heart Rate: 108 BPM [FLOODED]     │ ⏳ Lockout Active: 18:42 Remaining          │
│ Heart Rate Variability: 28 ms (Low)       │                                             │
│                                           │ 🫁 4-7-8 Guided Somatic Breathwork Visualizer│
│ [ Sim HR Slider: ===●====== 108 BPM ]     │     (( INHALE 4s - HOLD 7s - EXHALE 8s ))   │
│ [ Simulate Sudden Flooding Spike ]        │                                             │
│                                           │ [✔ Partner A Regulated]  [✔ Partner B Reg.] │
└───────────────────────────────────────────┴─────────────────────────────────────────────┘
```

### Clinical Rationale
When human heart rate exceeds 100 BPM during relational conflict, the amygdala hijacks cognitive functioning (*Diffuse Physiological Arousal*). Communication at this stage causes severe relational damage. Gottman clinical protocol mandates a **minimum 20-minute somatic cooling period**.

### Step-by-Step Instructions
1. **Monitoring**: View the live Heart Rate (BPM) and HRV indicator. Use the simulated slider or spike button during practice to trigger a flooding event.
2. **Automatic Lockout**:
   - Once BPM $> 100$, an emergency amber/red lockout activates immediately.
   - In-app text communication and phase advancing are disabled for 20 minutes ($1,200$ seconds).
3. **Follow the 4-7-8 Breathing Pacer**:
   - Inhale through the nose for **4 seconds** as the glowing sphere expands.
   - Hold your breath gently for **7 seconds**.
   - Exhale slowly through the mouth for **8 seconds** as the sphere contracts.
4. **Review Cognitive Reappraisal Prompts**:
   - Refrain from rehearsing counter-arguments during the break. Focus entirely on self-soothing and somatic grounding.
5. **Dual Regulation Sign-Off**:
   - Partner A clicks **Confirm Emotional Regulation (Partner A)**.
   - Partner B clicks **Confirm Emotional Regulation (Partner B)**.
   - Once both partners sign off and BPM falls below 100, the system safely unlocks.

---

## 8. Module 3: Behavioral Reliability Dashboard & Consistency Index (BCI)

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Module 3: Behavioral Reliability Dashboard (Operant Conditioning)                       │
├───────────────────────────────────────────┬─────────────────────────────────────────────┤
│ ➕ Log Daily Micro-Commitment (Partner A) │ 📊 Behavioral Consistency Index (BCI)       │
│                                           │                                             │
│ Title: [ Send receipt & location at lunch]│ ┌─────────────────────────────────────────┐ │
│ Category: [ Financial Transparency ▾ ]    │ │   96.8%  [ CLINICAL TARGET: ≥ 95% ]     │ │
│ Target Time: [ 12:30 PM ]                 │ └─────────────────────────────────────────┘ │
│                                           │ Total: 32  |  Verified: 31  |  Pending: 1   │
│ [ Create Micro-Commitment ]               │                                             │
├───────────────────────────────────────────┴─────────────────────────────────────────────┤
│ 📋 Active Daily Micro-Commitments Queue                                                 │
│ [✔ Completed] Arrive home by 5:45 PM  [ Proof: GPS Timestamp ]  [ Verify (Partner B) ]  │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Purpose
To rebuild predictive relational safety through empirical, high-frequency actions rather than empty verbal promises.

### How to Use the Commitments Dashboard
1. **Create Commitments (Partner A)**:
   - Enter a specific commitment title (e.g., *"Call at 12:15 PM during office break"*).
   - Select a domain: *Scheduled Check-in*, *Arrival/Departure*, *Financial Transparency*, or *Attunement Reflection*.
   - Set the scheduled time.
2. **Submit Proof of Completion (Partner A)**:
   - When finished, click **Complete Action with Proof**.
   - Choose proof type: *Timestamp Check-in*, *Location Verification*, *Receipt Upload*, or *Self-Verified Reflection*.
   - Enter brief evidence details and submit.
3. **Review & Validate (Partner B)**:
   - Partner B examines the proof and clicks **Verify & Validate Micro-Action**.
4. **Track the BCI Score**:
   - The dashboard dynamically updates the **Behavioral Consistency Index (BCI)**.
   - Sustaining a BCI $\ge 95\%$ over 60 days is the required gate for Phase 4 and surveillance sunsetting.

---

## 9. Module 4: Real-Time NLP Non-Defensive Attunement Coach

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Module 4: Real-Time NLP Non-Defensive Attunement Coach (EFT / AIRM)                     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ 💬 Interactive Dialogue Stream                                                          │
│ Partner B: "I felt completely sick when I found out about the hidden card."             │
│ Partner A: "I take full responsibility. I broke your trust and I hear your pain."       │
├───────────────────────────────────────────┬─────────────────────────────────────────────┤
│ ✍️ Message Composer (Partner A)          │ 💡 1-Click EFT Response Templates           │
│                                           │                                             │
│ Draft: [ "If you hadn't been so distant.."]│ • Unreserved Responsibility Template        │
│                                           │ • Attachment Trauma Validation Template     │
│ 🚨 NLP COACH INTERCEPTION: Blame-Shifting │ • Open-Ended Patience Template              │
│ Clinical Rationale: Shifts cause of       │                                             │
│ betrayal onto partner.                    │                                             │
│                                           │                                             │
│ [ Apply Reframed Response ]               │ Attunement Score: [ 92 / 100 ]              │
└───────────────────────────────────────────┴─────────────────────────────────────────────┘
```

### Purpose
To coach Partner A in real-time toward non-defensive attunement, facilitating Sue Johnson’s **Attachment Injury Resolution Model (AIRM)** and building **Accessibility, Responsiveness, and Engagement (A.R.E.)**.

### The 5 Intercepted Patterns & Clinical Rules
1. **Blame-Shifting** (*"I only did it because you were cold"*): Intercepted with full ownership reframes.
2. **Minimization** (*"It was only texting, no big deal"*): Intercepted to prevent invalidating epistemic trauma.
3. **Gaslighting / Premature Closure** (*"You're paranoid, just move on"*): Intercepted to eliminate rush for closure.
4. **Counter-Accusations** (*"What about what you did last year?"*): Intercepted to eliminate Gottman defensiveness.
5. **Stonewalling / Deflection** (*"Whatever, I'm not talking about this"*): Intercepted to encourage grounded presence.

### How to Compose Messages
1. **Type Draft in Composer**: As you type, the **Attunement Score (0–100)** calculates in real time.
2. **Evaluate Coach Interceptions**: If a violation triggers, read the clinical guidance banner.
3. **Apply 1-Click Reframe**: Click **Apply Reframed Response** to automatically substitute high-attunement phrasing.
4. **Send**: Once attunement is $\ge 80\%$, click **Send Message**.

---

## 10. Module 5: Consensual Transparency Scaffolding & Sunset Manager

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Module 5: Consensual Transparency Scaffolding & 30-Day Sunset Manager                   │
├───────────────────────────────────────────┬─────────────────────────────────────────────┤
│ 📤 Post Voluntary Transparency Update     │ 🌅 30-Day Sunset Clause & Decommissioning   │
│                                           │                                             │
│ Category: [ Location Check-in ▾ ]         │ BCI Maintained: 97.4% (64 Consecutive Days) │
│ Summary: [ Arrived at North Office ]      │ Eligibility: ELIGIBLE FOR DECOMMISSIONING   │
│ Details: [ Meeting starts at 2:00 PM ]    │                                             │
│                                           │ [ Vote to Sunset (Partner A) ✔ ]            │
│ [ Post Voluntary Transparency Update ]    │ [ Vote to Sunset (Partner B) ✔ ]            │
├───────────────────────────────────────────┴─────────────────────────────────────────────┤
│ 📜 Shared Transparency Feed                                                             │
│ • [1:50 PM] Location Check-in: Arrived at North Office (Meeting starts at 2:00 PM)      │
│ • [12:30 PM] Financial Receipt: Lunch with team ($18.50 at Cafe Bistro)                 │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Purpose & Anti-Surveillance Ethics
While temporary transparency soothes acute panic, indefinite digital surveillance damages intimacy and fosters paranoia. ANCHOR uses an automated **Sunset Clause** to dismantle monitoring once internal trust is restored.

### How to Use
1. **Post Updates (Partner A)**: Submit voluntary log entries for *Schedule*, *Location*, *Financial*, or *Digital Activity*.
2. **Feed Review (Partner B)**: Review the shared timeline without needing to demand passwords or interrogate.
3. **Decommissioning Process**:
   - When BCI remains $\ge 95\%$ over 60 days, the Sunset panel turns green.
   - Partner A clicks **Vote to Decommission (Partner A)**.
   - Partner B clicks **Vote to Decommission (Partner B)**.
   - Upon dual sign-off, monitoring is permanently marked **Sunsetted**, and the couple graduates into earned autonomy.

---

## 11. Psychometrics & Longitudinal Assessment Suite

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│ Clinical Psychometrics & Longitudinal Trajectory Suite                                  │
│ [ Complete 14-Day Micro-Assessment ]                                                    │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ 📈 Longitudinal Recovery Trajectory Graph                                               │
│                                                                                         │
│ 100 ┤                                        ● DTS (86)                                 │
│  80 ┤                            ●───────────● RDAS (82)                                │
│  60 ┤               ●───────────●              Epistemic Safety (80)                    │
│  40 ┤  ●───────────●                         ────────────────────────                   │
│  20 ┤                                        Clinical Target: > 70                      │
│   0 └────────────────────────────────────────────────────────                           │
│        Day 14       Day 28      Day 42       Day 56                                     │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│ • Dyadic Trust Scale (DTS): 86/100     • Revised Dyadic Adjustment (RDAS): 82/100       │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### Validated Clinical Scales Tracked
1. **Dyadic Trust Scale (DTS)**: Measures emotional predictability, sincerity, and faith in the relationship.
2. **Revised Dyadic Adjustment Scale (RDAS)**: Measures dyadic consensus, satisfaction, and cohesion.
3. **Perceived Epistemic Safety**: Measures reduction in obsessive rumination and trauma hypervigilance.

### Logging a Bi-Weekly Check-in
1. Every 14 days, click **Complete 14-Day Micro-Assessment**.
2. Adjust the 3 rating sliders (0–100) reflecting your honest emotional experience.
3. Click **Record Assessment**. The longitudinal chart will automatically plot the new trajectory point against the **Clinical Target Zone ($>70$)**.

---

## 12. Data Backup, Multi-Device Sync & Privacy Ethics

### Client-Side Zero-Knowledge Privacy
- No third-party ad tracking, secret surveillance tools, or remote backdoors.
- All session data is stored locally in your browser’s isolated storage sandbox.

### Real-Time Multi-Tab Synchronization
ANCHOR uses the modern browser `BroadcastChannel` standard:
- Open two browser tabs or windows (e.g. one for Partner A, one for Partner B, or one on Dual View).
- Any action taken in one tab immediately synchronizes across all open instances with zero network latency.

### Creating and Restoring Backups
- **Exporting (`↓` button)**: Generates a JSON file (`anchor-backup-XXXX.json`). Store this file on a secure private USB drive or cloud drive.
- **Importing (`↑` button)**: Select your JSON backup file to instantly reload your complete clinical history.

---

## 13. Troubleshooting & Frequently Asked Questions (FAQ)

### Q1: What should we do if the 20-minute flooding lockout activates?
**A**: Step away from the screen immediately. Do not attempt to discuss the relationship, send text messages, or argue during the 20 minutes. Engage with the 4-7-8 breathing visualizer and drink water until both partners are physiologically calm.

### Q2: Why won't the app let Partner A submit a timeline entry?
**A**: Check the red warning banner below the text box. The entry contains either sexually graphic physical details (which trigger trauma flashbacks in Partner B) or defensive rationalizations. Click **Apply Recommended Non-Defensive Reframe** to correct the text.

### Q3: How do we advance to the next phase?
**A**: Ensure the gate criteria for your current phase have been fully met (e.g. signing off on the complete timeline for Phase 2, or maintaining $\ge 95\%$ BCI for Phase 4). Once confirmed, click **Advance Phase** in the top banner.

### Q4: Can Partner B see Partner A’s draft messages before they are sent?
**A**: No. The Real-Time Attunement Coach is an asynchronous, private drafting coach for Partner A. Messages only appear in the shared chat stream once Partner A chooses to send them.

---

## 📜 Emergency Crisis Resources
If you are in immediate physical danger or experiencing severe emotional distress:
- **National Domestic Violence Hotline**: Call `1-800-799-SAFE (7233)` or text `"START"` to `88788`.
- **Suicide & Crisis Lifeline**: Call or text `988` (Available 24/7, free and confidential).
- Click the **Emergency Panic** button at the top right of ANCHOR at any time to instantly wipe your session and access direct help.
