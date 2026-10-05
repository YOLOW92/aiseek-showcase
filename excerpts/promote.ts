import { AUTHORITATIVE_LEVELS, type ClaimClass, type EvidenceLevel, type Stance } from "@aiseek/contracts";

export type EvidenceInput = {
  evidenceId: string;
  level: EvidenceLevel;
  stance: Stance;
  /** Stable key of the independent origin (publisher/filing); evidence sharing a group is not independent. */
  independentGroup: string;
  sourceName: string | null;
  hasLocator: boolean;
};

export type PromotionDecision = {
  target: ClaimClass;
  reasons: string[];
  supportingGroups: number;
  contradicted: boolean;
};

export type PromotionInput = {
  /** True when a source directly states the claim; false when the claim is an inference over several facts. */
  directlyStated: boolean;
  evidence: EvidenceInput[];
  /** True if an explicit inference rationale exists (required for SUPPORTED). */
  hasRationale: boolean;
};

const DIRECT_FACT_LEVELS: readonly EvidenceLevel[] = [...AUTHORITATIVE_LEVELS, "INSTITUTIONAL", "MEDIA"];

/**
 * Deterministic, evidence-based classification (spec 3.1, 38). Model confidence is never an input.
 *   FACT:       directly stated, >= 1 supporting evidence (primary/regulator/company/institutional/media) with an
 *               exact locator, and no contradiction that outweighs the support.
 *   SUPPORTED:  an inference with >= 2 independent supporting groups, an explicit rationale and no contradiction.
 *   HYPOTHESIS: everything else (visible as hypothesis, never shown as fact).
 */
export function decideClass(input: PromotionInput): PromotionDecision {
  const supports = input.evidence.filter((e) => e.stance === "SUPPORTS");
  const contradicts = input.evidence.filter((e) => e.stance === "CONTRADICTS");
  const groups = new Set(supports.map((e) => e.independentGroup));
  const contradicted = contradicts.length > 0;
  const reasons: string[] = [];

  if (input.directlyStated) {
    const qualifying = supports.filter((e) => e.hasLocator && DIRECT_FACT_LEVELS.includes(e.level));
    const authoritativeContradiction = contradicts.some((e) => AUTHORITATIVE_LEVELS.includes(e.level));
    const outweighed = contradicts.length >= supports.length;
    if (qualifying.length >= 1 && !authoritativeContradiction && !outweighed) {
      reasons.push(`${qualifying.length} qualifying direct evidence with locator`);
      return { target: "FACT", reasons, supportingGroups: groups.size, contradicted };
    }
    if (qualifying.length === 0) reasons.push("no qualifying direct evidence with locator");
    if (authoritativeContradiction) reasons.push("contradicted by an authoritative source");
    else if (outweighed && contradicted) reasons.push("contradicting evidence outweighs support");
  } else if (groups.size >= 2 && input.hasRationale && !contradicted) {
    reasons.push(`${groups.size} independent supporting groups with inference rationale`);
    return { target: "SUPPORTED", reasons, supportingGroups: groups.size, contradicted };
  } else {
    if (groups.size < 2) reasons.push("fewer than 2 independent evidence groups");
    if (!input.hasRationale) reasons.push("no inference rationale");
    if (contradicted) reasons.push("contradicting evidence present");
  }
  return { target: "HYPOTHESIS", reasons, supportingGroups: groups.size, contradicted };
}

export function evidenceWeight(level: EvidenceLevel): number {
  switch (level) {
    case "PRIMARY":
    case "REGULATOR":
      return 1;
    case "COMPANY":
      return 0.9;
    case "INSTITUTIONAL":
      return 0.75;
    case "MEDIA":
      return 0.55;
    case "DERIVED":
      return 0.5;
    case "COMMUNITY":
      return 0.3;
  }
}

/** Confidence derived from evidence only: probabilistic OR of independent group weights, discounted by contradiction. */
export function deriveConfidence(evidence: EvidenceInput[]): number {
  const byGroup = new Map<string, number>();
  for (const e of evidence.filter((x) => x.stance === "SUPPORTS")) {
    const w = evidenceWeight(e.level) * (e.hasLocator ? 1 : 0.8);
    byGroup.set(e.independentGroup, Math.max(byGroup.get(e.independentGroup) ?? 0, w));
  }
  let miss = 1;
  for (const w of byGroup.values()) miss *= 1 - Math.min(w, 0.95);
  let conf = 1 - miss;
  for (const e of evidence.filter((x) => x.stance === "CONTRADICTS")) conf *= 1 - evidenceWeight(e.level) * 0.5;
  return Math.max(0, Math.min(1, Number(conf.toFixed(4))));
}
