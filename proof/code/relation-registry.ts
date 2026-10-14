import type { ClaimClass } from "./claims.ts";
import type { EntityType } from "./entities.ts";

export type RelationDefinition = {
  key: string;
  sourceEntityTypes: EntityType[];
  targetEntityTypes: EntityType[];
  inverse?: string;
  symmetric: boolean;
  allowedClaimClasses: ("FACT" | "SUPPORTED" | "HYPOTHESIS")[];
  defaultDecayDays: number | null;
  requiresTemporalScope: boolean;
};

const ALL: ClaimClass[] = ["FACT", "SUPPORTED", "HYPOTHESIS"];

const ANY_ENTITY: EntityType[] = [
  "COMPANY",
  "ORGANIZATION",
  "PERSON",
  "PRODUCT",
  "TECHNOLOGY",
  "COMPONENT",
  "MATERIAL",
  "COMMODITY",
  "INDUSTRY",
  "MARKET",
  "FACILITY",
  "GEOGRAPHY",
  "POLICY",
  "STANDARD",
  "MODEL",
  "METRIC",
  "EVENT",
  "STATE",
  "GOVERNMENT",
  "SERVICE",
  "ASSET",
  "CURRENCY",
  "INDEX",
  "ECONOMIC_INDICATOR",
  "AGREEMENT",
];
const COMPANYISH: EntityType[] = ["COMPANY", "ORGANIZATION"];
/** Actors that can act in the world: companies, institutions, states, governments, people. */
const ACTORS: EntityType[] = ["COMPANY", "ORGANIZATION", "STATE", "GOVERNMENT", "PERSON"];
/** Parties to a trade flow. */
const TRADE_PARTIES: EntityType[] = ["STATE", "COMPANY", "ORGANIZATION"];
const GOODS: EntityType[] = ["PRODUCT", "COMPONENT", "MATERIAL", "COMMODITY", "TECHNOLOGY"];
/** Subjects that can carry an exposure. */
const EXPOSED: EntityType[] = ["COMPANY", "ORGANIZATION", "INDUSTRY", "MARKET", "STATE"];
const THINGS: EntityType[] = ["PRODUCT", "TECHNOLOGY", "COMPONENT", "MATERIAL", "COMMODITY", "MODEL", "STANDARD"];
const DOMAINS: EntityType[] = ["INDUSTRY", "MARKET", "TECHNOLOGY", "PRODUCT", "COMPONENT", "MATERIAL", "COMMODITY", "MODEL", "SERVICE", "ASSET"];

function def(
  d: Omit<RelationDefinition, "symmetric" | "allowedClaimClasses" | "defaultDecayDays" | "requiresTemporalScope"> &
    Partial<Pick<RelationDefinition, "symmetric" | "allowedClaimClasses" | "defaultDecayDays" | "requiresTemporalScope">>,
): RelationDefinition {
  return {
    symmetric: false,
    allowedClaimClasses: ALL,
    defaultDecayDays: 365,
    requiresTemporalScope: false,
    ...d,
  };
}

/** Controlled relation registry. No relation type may be created dynamically by an LLM. */
export const RELATION_REGISTRY = {
  PART_OF: def({ key: "PART_OF", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: ANY_ENTITY, defaultDecayDays: null }),
  DEPENDS_ON: def({ key: "DEPENDS_ON", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: ANY_ENTITY, inverse: "ENABLES" }),
  DRIVES_DEMAND_FOR: def({
    key: "DRIVES_DEMAND_FOR",
    sourceEntityTypes: ANY_ENTITY,
    targetEntityTypes: DOMAINS,
    allowedClaimClasses: ALL,
    defaultDecayDays: 180,
  }),
  SUPPLIES: def({
    key: "SUPPLIES",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: [...COMPANYISH, "PRODUCT", "COMPONENT", "MARKET", "INDUSTRY"],
    inverse: "CUSTOMER_OF",
    requiresTemporalScope: true,
    defaultDecayDays: 365,
  }),
  CUSTOMER_OF: def({ key: "CUSTOMER_OF", sourceEntityTypes: COMPANYISH, targetEntityTypes: COMPANYISH, inverse: "SUPPLIES", requiresTemporalScope: true }),
  COMPETES_WITH: def({
    key: "COMPETES_WITH",
    sourceEntityTypes: [...COMPANYISH, "PRODUCT", "TECHNOLOGY"],
    targetEntityTypes: [...COMPANYISH, "PRODUCT", "TECHNOLOGY"],
    symmetric: true,
  }),
  SUBSTITUTES: def({ key: "SUBSTITUTES", sourceEntityTypes: THINGS, targetEntityTypes: THINGS, allowedClaimClasses: ALL }),
  MANUFACTURES: def({
    key: "MANUFACTURES",
    sourceEntityTypes: [...COMPANYISH, "FACILITY"],
    targetEntityTypes: ["PRODUCT", "COMPONENT", "MATERIAL"],
    requiresTemporalScope: true,
  }),
  USES: def({ key: "USES", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: THINGS }),
  OWNS: def({
    key: "OWNS",
    sourceEntityTypes: [...COMPANYISH, "PERSON"],
    targetEntityTypes: [...COMPANYISH, "FACILITY", "PRODUCT"],
    defaultDecayDays: null,
    requiresTemporalScope: true,
  }),
  INVESTS_IN: def({
    key: "INVESTS_IN",
    sourceEntityTypes: [...COMPANYISH, "PERSON"],
    targetEntityTypes: [...COMPANYISH, "FACILITY", "MARKET", "TECHNOLOGY"],
    requiresTemporalScope: true,
  }),
  LOCATED_IN: def({
    key: "LOCATED_IN",
    sourceEntityTypes: [...COMPANYISH, "FACILITY", "PERSON"],
    targetEntityTypes: ["GEOGRAPHY", "STATE"],
    defaultDecayDays: null,
  }),
  REGULATED_BY: def({ key: "REGULATED_BY", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: ["POLICY", "ORGANIZATION", "STANDARD", "GOVERNMENT", "STATE"] }),
  CAPACITY_CONSTRAINT: def({
    key: "CAPACITY_CONSTRAINT",
    sourceEntityTypes: ANY_ENTITY,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  SUPPLY_CONSTRAINT: def({
    key: "SUPPLY_CONSTRAINT",
    sourceEntityTypes: ANY_ENTITY,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  REVENUE_EXPOSURE: def({
    key: "REVENUE_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    allowedClaimClasses: ALL,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  CAPEX_EXPOSURE: def({
    key: "CAPEX_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  COST_EXPOSURE: def({
    key: "COST_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  MARGIN_EXPOSURE: def({
    key: "MARGIN_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  INVENTORY_EXPOSURE: def({
    key: "INVENTORY_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  PRICE_EXPOSURE: def({
    key: "PRICE_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 90,
  }),
  GUIDANCE_EXPOSURE: def({
    key: "GUIDANCE_EXPOSURE",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 90,
  }),
  ENABLES: def({ key: "ENABLES", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: ANY_ENTITY, inverse: "DEPENDS_ON" }),
  REQUIRES: def({ key: "REQUIRES", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: ANY_ENTITY }),
  PRODUCES: def({
    key: "PRODUCES",
    sourceEntityTypes: [...COMPANYISH, "FACILITY", "TECHNOLOGY"],
    targetEntityTypes: ["PRODUCT", "COMPONENT", "MATERIAL", "COMMODITY"],
    inverse: "CONSUMES",
  }),
  CONSUMES: def({ key: "CONSUMES", sourceEntityTypes: ANY_ENTITY, targetEntityTypes: ["PRODUCT", "COMPONENT", "MATERIAL", "COMMODITY"], inverse: "PRODUCES" }),

  // ---- Pivot additions (all-domain coverage). Every edge has a specific meaning; there is no generic "related" edge. ----
  PROVIDES_SERVICE_TO: def({
    key: "PROVIDES_SERVICE_TO",
    sourceEntityTypes: ["COMPANY", "ORGANIZATION", "SERVICE"],
    targetEntityTypes: ["COMPANY", "ORGANIZATION", "MARKET", "INDUSTRY", "STATE", "GOVERNMENT"],
    requiresTemporalScope: true,
  }),
  OPERATES_IN: def({
    key: "OPERATES_IN",
    sourceEntityTypes: ["COMPANY", "ORGANIZATION", "SERVICE"],
    targetEntityTypes: ["MARKET", "GEOGRAPHY", "STATE", "INDUSTRY"],
  }),
  PARTNERS_WITH: def({ key: "PARTNERS_WITH", sourceEntityTypes: ACTORS, targetEntityTypes: ACTORS, symmetric: true, requiresTemporalScope: true }),
  ACQUIRES: def({
    key: "ACQUIRES",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: [...COMPANYISH, "FACILITY", "PRODUCT"],
    requiresTemporalScope: true,
    defaultDecayDays: null,
  }),
  MERGES_WITH: def({
    key: "MERGES_WITH",
    sourceEntityTypes: COMPANYISH,
    targetEntityTypes: COMPANYISH,
    symmetric: true,
    requiresTemporalScope: true,
    defaultDecayDays: null,
  }),
  FINANCES: def({
    key: "FINANCES",
    sourceEntityTypes: ACTORS,
    targetEntityTypes: [...COMPANYISH, "FACILITY", "INDUSTRY", "MARKET", "STATE", "GOVERNMENT"],
    requiresTemporalScope: true,
  }),
  MEMBER_OF: def({
    key: "MEMBER_OF",
    sourceEntityTypes: ACTORS,
    targetEntityTypes: ["ORGANIZATION", "AGREEMENT", "INDEX", "INDUSTRY"],
    defaultDecayDays: null,
    requiresTemporalScope: true,
  }),
  SIGNS_AGREEMENT_WITH: def({
    key: "SIGNS_AGREEMENT_WITH",
    sourceEntityTypes: ACTORS,
    targetEntityTypes: ACTORS,
    symmetric: true,
    requiresTemporalScope: true,
    defaultDecayDays: null,
  }),
  SANCTIONS: def({
    key: "SANCTIONS",
    sourceEntityTypes: ["STATE", "GOVERNMENT", "ORGANIZATION"],
    targetEntityTypes: ["STATE", "GOVERNMENT", "COMPANY", "ORGANIZATION", "PERSON", "COMMODITY"],
    requiresTemporalScope: true,
  }),
  EXPORT_RESTRICTS: def({
    key: "EXPORT_RESTRICTS",
    sourceEntityTypes: ["STATE", "GOVERNMENT", "ORGANIZATION", "POLICY"],
    targetEntityTypes: ["STATE", "GOVERNMENT", "COMPANY", "ORGANIZATION", ...GOODS],
    requiresTemporalScope: true,
  }),
  IMPORT_RESTRICTS: def({
    key: "IMPORT_RESTRICTS",
    sourceEntityTypes: ["STATE", "GOVERNMENT", "ORGANIZATION", "POLICY"],
    targetEntityTypes: ["STATE", "GOVERNMENT", "COMPANY", "ORGANIZATION", ...GOODS],
    requiresTemporalScope: true,
  }),
  TRADES_WITH: def({ key: "TRADES_WITH", sourceEntityTypes: TRADE_PARTIES, targetEntityTypes: TRADE_PARTIES, symmetric: true, requiresTemporalScope: true }),
  IMPORTS_FROM: def({
    key: "IMPORTS_FROM",
    sourceEntityTypes: TRADE_PARTIES,
    targetEntityTypes: [...TRADE_PARTIES, "GEOGRAPHY"],
    inverse: "EXPORTS_TO",
    requiresTemporalScope: true,
  }),
  EXPORTS_TO: def({
    key: "EXPORTS_TO",
    sourceEntityTypes: TRADE_PARTIES,
    targetEntityTypes: [...TRADE_PARTIES, "GEOGRAPHY"],
    inverse: "IMPORTS_FROM",
    requiresTemporalScope: true,
  }),
  TRANSPORTS: def({
    key: "TRANSPORTS",
    sourceEntityTypes: [...COMPANYISH, "FACILITY", "SERVICE"],
    targetEntityTypes: ["COMMODITY", "PRODUCT", "MATERIAL", "COMPONENT"],
    requiresTemporalScope: true,
    defaultDecayDays: 180,
  }),
  RATE_EXPOSURE: def({
    key: "RATE_EXPOSURE",
    sourceEntityTypes: EXPOSED,
    targetEntityTypes: ["ECONOMIC_INDICATOR", "ASSET", "INDEX", "POLICY"],
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  FX_EXPOSURE: def({ key: "FX_EXPOSURE", sourceEntityTypes: EXPOSED, targetEntityTypes: ["CURRENCY"], requiresTemporalScope: true, defaultDecayDays: 120 }),
  TRADE_EXPOSURE: def({
    key: "TRADE_EXPOSURE",
    sourceEntityTypes: EXPOSED,
    targetEntityTypes: ["STATE", "GEOGRAPHY", "AGREEMENT", "POLICY", "COMMODITY"],
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
  REGULATORY_EXPOSURE: def({
    key: "REGULATORY_EXPOSURE",
    sourceEntityTypes: EXPOSED,
    targetEntityTypes: ["POLICY", "ORGANIZATION", "GOVERNMENT", "STATE", "STANDARD"],
    requiresTemporalScope: true,
    defaultDecayDays: 180,
  }),
  GEOGRAPHIC_EXPOSURE: def({
    key: "GEOGRAPHIC_EXPOSURE",
    sourceEntityTypes: EXPOSED,
    targetEntityTypes: ["GEOGRAPHY", "STATE"],
    requiresTemporalScope: true,
    defaultDecayDays: 180,
  }),
  DEMAND_EXPOSURE: def({
    key: "DEMAND_EXPOSURE",
    sourceEntityTypes: EXPOSED,
    targetEntityTypes: ANY_ENTITY,
    requiresTemporalScope: true,
    defaultDecayDays: 120,
  }),
} as const satisfies Record<string, RelationDefinition>;

export type RelationKey = keyof typeof RELATION_REGISTRY;

export const RELATION_KEYS = Object.keys(RELATION_REGISTRY) as RelationKey[];

export function isRelationKey(value: string): value is RelationKey {
  return Object.prototype.hasOwnProperty.call(RELATION_REGISTRY, value);
}

export function getRelationDefinition(key: string): RelationDefinition {
  if (!isRelationKey(key)) throw new UnknownRelationTypeError(key);
  return RELATION_REGISTRY[key];
}

export class UnknownRelationTypeError extends Error {
  constructor(public readonly relationType: string) {
    super(`Relation type "${relationType}" is not registered`);
    this.name = "UnknownRelationTypeError";
  }
}

export type RelationValidation = { ok: true } | { ok: false; reason: string };

export function validateRelationShape(relationType: string, sourceType: EntityType, targetType: EntityType, claimClass: ClaimClass): RelationValidation {
  if (!isRelationKey(relationType)) return { ok: false, reason: `unregistered relation type ${relationType}` };
  const d: RelationDefinition = RELATION_REGISTRY[relationType];
  if (!d.sourceEntityTypes.includes(sourceType)) return { ok: false, reason: `${sourceType} cannot be source of ${relationType}` };
  if (!d.targetEntityTypes.includes(targetType)) return { ok: false, reason: `${targetType} cannot be target of ${relationType}` };
  if (!d.allowedClaimClasses.includes(claimClass)) return { ok: false, reason: `${claimClass} not allowed for ${relationType}` };
  return { ok: true };
}
