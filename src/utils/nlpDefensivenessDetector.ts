export interface NLPCheckResult {
  hasViolation: boolean;
  violationType?: 'blame_shifting' | 'minimization' | 'gaslighting' | 'counter_accusation' | 'graphic_detail' | 'stonewalling';
  warningMessage?: string;
  clinicalGuidance?: string;
  reframingSuggestion?: string;
  detectedPhrases: string[];
}

// Patterns for Intrusive Graphic Sexual/Physical Details (Module 1 - PISD Prevention)
const GRAPHIC_PATTERNS = [
  /\b(positions?|kissed\s+(passionately|everywhere)|sexual\s+acts?|bedroom\s+details?|naked|undressed|body\s+parts?|touching\s+her|touching\s+him|oral|intercourse|orgasm)\b/i,
  /\b(physically\s+intimate\s+details|specific\s+acts|graphic\s+descriptions)\b/i,
];

// Patterns for Defensive Blame-Shifting (Module 1 & Module 4)
const BLAME_SHIFTING_PATTERNS = [
  {
    regex: /\b(because\s+you\s+(were|are|never|didn't)|if\s+you\s+(had|didn't|cared|listened)|you\s+pushed\s+me|you\s+made\s+me\s+feel)\b/i,
    type: 'blame_shifting' as const,
    warning: 'Warning: This statement shifts the cause of betrayal onto your partner.',
    guidance: 'In clinical recovery (CBCT/EFT), fidelity and honesty are 100% individual responsibilities. Validating relational issues comes only after foundational trust is re-established.',
    suggestion: 'I take full, unreserved responsibility for my choice to deceive you. There is no excuse, and your feelings of hurt are completely justified.'
  },
  {
    regex: /\b(you\s+were\s+(distant|cold|nagging|busy|always\s+working|never\s+available|not\s+interested))\b/i,
    type: 'blame_shifting' as const,
    warning: 'Warning: You are attributing your actions to your partner’s behavior.',
    guidance: 'Blaming partner distance prevents safety from forming and reinjures Partner B.',
    suggestion: 'I know my choices caused this rupture. I want to listen and understand how deeply this impacted you without making excuses.'
  },
  {
    regex: /\b(only\s+(a\s+kiss|talking|texting|a\s+friend|once|flirting)|not\s+a\s+big\s+deal|wasn't\s+physical|making\s+a\s+mountain|it\s+didn't\s+mean\s+anything|exaggerating)\b/i,
    type: 'minimization' as const,
    warning: 'Warning: This statement minimizes the gravity of the betrayal.',
    guidance: 'Minimizing ("it didn\'t mean anything") invalidates the profound epistemic trauma experienced by the betrayed partner.',
    suggestion: 'I recognize that any breach of honesty is a profound betrayal. I will not diminish the seriousness of what I did.'
  },
  {
    regex: /\b(get\s+over\s+it|move\s+on|in\s+the\s+past|stop\s+bringing\s+it\s+up|why\s+can't\s+we\s+just\s+move|forgive\s+and\s+forget)\b/i,
    type: 'gaslighting' as const,
    warning: 'Warning: Rushing or demanding forgiveness creates premature closure and panic.',
    guidance: 'Trauma processing requires time and patience. Pressuring for quick closure triggers hyperarousal and distrust.',
    suggestion: 'I know this will take time, and I am willing to stand by you and answer your questions for as long as it takes to rebuild safety.'
  },
  {
    regex: /\b(you're\s+(crazy|paranoid|imagining|insane|psycho|delusional)|you\s+need\s+help|making\s+things\s+up)\b/i,
    type: 'gaslighting' as const,
    warning: 'Warning: High-risk invalidation / gaslighting detected.',
    guidance: 'Denying your partner’s reality when they seek clarity destroys the psychological safety required for healing.',
    suggestion: 'I hear how painful this uncertainty is for you. Let me share the truthful facts calmly and transparently.'
  },
  {
    regex: /\b(what\s+about\s+(what\s+you|you)|you're\s+no\s+saint|you\s+did\s+things\s+too|look\s+at\s+your\s+mistakes)\b/i,
    type: 'counter_accusation' as const,
    warning: 'Warning: Counter-accusation / Defensiveness (Gottman Horseman).',
    guidance: 'Responding with counter-attacks is an automatic defensive reflex. Step back and ground yourself.',
    suggestion: 'I am hearing your pain right now. I want to keep the focus on healing this hurt and supporting you.'
  }
];

/**
 * Evaluates Partner A's timeline entry for graphic sexual detail or defensive justification
 */
export function analyzeTimelineFactualEntry(text: string): NLPCheckResult {
  const detectedPhrases: string[] = [];

  // Check Graphic Detail
  for (const pattern of GRAPHIC_PATTERNS) {
    const match = text.match(pattern);
    if (match) {
      detectedPhrases.push(match[0]);
      return {
        hasViolation: true,
        violationType: 'graphic_detail',
        warningMessage: 'Graphic physical description detected. Post-Infidelity Stress Disorder (PISD) guardrail triggered.',
        clinicalGuidance: 'Focus strictly on essential diagnostic facts (who, what, when, financial scope). Avoid explicit physical or sexual descriptions that induce intrusive visual trauma in Partner B.',
        detectedPhrases
      };
    }
  }

  // Check Blame / Rationalization
  for (const item of BLAME_SHIFTING_PATTERNS) {
    const match = text.match(item.regex);
    if (match) {
      detectedPhrases.push(match[0]);
      return {
        hasViolation: true,
        violationType: item.type,
        warningMessage: item.warning,
        clinicalGuidance: item.guidance,
        reframingSuggestion: item.suggestion,
        detectedPhrases
      };
    }
  }

  return {
    hasViolation: false,
    detectedPhrases: []
  };
}

/**
 * Real-time analysis for reflection and attunement chat responses (Module 4)
 */
export function analyzeAttunementResponse(text: string): NLPCheckResult {
  const detectedPhrases: string[] = [];

  for (const item of BLAME_SHIFTING_PATTERNS) {
    const match = text.match(item.regex);
    if (match) {
      detectedPhrases.push(match[0]);
      return {
        hasViolation: true,
        violationType: item.type,
        warningMessage: item.warning,
        clinicalGuidance: item.guidance,
        reframingSuggestion: item.suggestion,
        detectedPhrases
      };
    }
  }

  return {
    hasViolation: false,
    detectedPhrases: []
  };
}

/**
 * Calculates emotional validation score (0 - 100) based on empathetic language presence
 */
export function calculateAttunementScore(text: string): number {
  let score = 70;
  const lower = text.toLowerCase();

  const positiveEmpathyKeywords = [
    'i hear', 'i understand', 'i take responsibility', 'i am sorry', 'i apologize',
    'you have every right', 'pain', 'hurt', 'listen', 'support', 'honest', 'truth',
    'safe', 'patience', 'no excuse'
  ];

  positiveEmpathyKeywords.forEach(kw => {
    if (lower.includes(kw)) score = Math.min(100, score + 6);
  });

  const negativeKeywords = ['but', 'however', 'you also', 'always', 'never', 'just'];
  negativeKeywords.forEach(kw => {
    if (lower.includes(kw)) score = Math.max(20, score - 8);
  });

  return score;
}
