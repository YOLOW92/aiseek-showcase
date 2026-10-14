export function resolveResearchDepth(ent: Entitlements, requested: number): DepthResolution {
  if (!ent.privateRuns) throw new AppError("ENTITLEMENT_REQUIRED", "Private research runs require a paid plan");
  const entitled = ent.maxDepth;
  return { requestedDepth: requested, entitledDepth: entitled, effectiveDepth: clampDepth(requested, entitled) };
}
