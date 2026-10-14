# Five engineering case studies

[← Engineering](README.md) · [中文](CASES.zh-CN.md) · [日本語](CASES.ja.md) · [Evidence register](../proof/README.md)

These are **implementation narratives**, not claims of formal security certification or external performance benchmarking. The full product code is private. Three unchanged samples can be inspected in [proof/code](../../proof/code/).

## 01 — Deciding what may be called a fact

**Problem.** A model can produce fluent explanations even when an underlying article only hints at a relationship. A reader needs a visible distinction between directly supported events and analysis.

**Design.** A canonical claim is linked to specific evidence. The classifier accepts the source's tier, whether there is an exact passage locator, its support/contradiction stance, independent-source group and whether the claim is directly stated. **FACT** needs qualifying direct support with a locator and no disqualifying contradiction. **SUPPORTED** describes an inference with at least two independent supporting groups, an explicit rationale and no contradiction. Otherwise the claim is **HYPOTHESIS**. Model-provided confidence is not a promotion input.

**Evidence.** [Read the original `decideClass` implementation](../../proof/code/promote.ts). The public product exposes evidence and corrections; classification rules are described in the [methodology](https://aiseek.dev/en/method).

**Limit.** A formally correct promotion decision still depends on the reliability of source metadata, locators and upstream extraction. It is not independent proof that the statement is true.

## 02 — Making a relationship graph explainable

**Problem.** An unconstrained graph tends to accumulate vague and unstable AI-generated edges, especially when entity types and time are ignored.

**Design.** The controlled registry defines **47 relationship types at the documented early stage**, including allowed source/target entity kinds, reverses, symmetric behavior, temporal scope and decay settings. Canonical relationships point to claims. PostgreSQL relational rows are authoritative; Apache AGE serves as a rebuildable projection. At P63, daily graph analysis introduced PageRank-style positions, Louvain communities and limited connection paths over the public relation subset.

**Evidence.** [Relationship registry source](../../proof/code/relation-registry.ts) and documented [company-network functionality](https://aiseek.dev/en/companies/anthropic-company).

**Limit.** Centrality is not investment quality. A path is not causation. P63's second part — judging alternative trend detectors — was deferred.

## 03 — Finding one entity across languages

**Problem.** Chinese characters, Japanese names, simplified/traditional variants and model-number differences can make the same real-world object fragmented or unrelated objects incorrectly merged.

**Design.** P57 added script-aware name keys, OpenCC normalization, model-number safeguards and Wikidata identity linkage with review paths. P59 added PGroonga coverage for Chinese/Japanese entity names, evidence passages, changes and stories. English retains its own stemming index. P58/P62 added Chinese/Japanese passage and Ask-answer support checks; these are fallible checks, not guaranteed verification.

**Evidence.** The work is recorded in the dated P57–P62 task history and can be exercised via the [multilingual public site](https://aiseek.dev/en). These subsystem sources are private; no excerpt is falsely attributed to them.

**Limit.** Name deduplication is never universally correct. P64's reading/merge follow-ups were left waiting for more data.

## 04 — Distinguishing news volume from an actual change

**Problem.** A newly enabled publisher, a missed collection, or a half-finished day can trigger a misleading spike even if nothing important happened.

**Design.** P54 changed trend evaluation to compare complete days, account for global coverage volume and derive country heat from *actual accumulated history* instead of assuming a 30-day baseline. P56 flags collection start/stop/failure/volume changes so the system can label a spike as **source change** rather than a world event. Alternative detectors were logged for comparison but did not automatically replace the production rule.

**Evidence.** [SeekMap method notes](https://aiseek.dev/en/method#seekmap) and the P54–P56 implementation record.

**Limit.** The 60–90-day historical benchmark for P63's detector comparison was **not complete** at the P72 cutoff. This document makes no unmeasured precision or recall claim.

## 05 — Shipping on constrained infrastructure

**Problem.** Background AI jobs, expensive models and document processing can compete with latency-sensitive pages. Limited CPUs cannot service an unbounded queue.

**Design.** The architecture separates SSR/API from async jobs and document processing. Paid model calls pass through a budgeted router with receipts, breaker/fallback behavior. The Python admission gate allows one intensive computation and a bounded wait; late requests fail as busy for fallback or retry, instead of wasting compute. PostgreSQL is the canonical data store; backups, recovery drills and forward-only migrations are defined. P65–P66 added smaller edge-cached images, client-side reuse and prefetch behavior.

**Evidence.** [Original admission gate](../../proof/code/gate.py), [architecture](README.md), and [public product](https://aiseek.dev/en).

**Limit.** No independent uptime or latency service-level measurement is claimed here. P72 added browser error reporting; the experimental pre-release browser smoke test was subsequently removed.

---

**What the cases demonstrate:** explicit design constraints, trade-offs and operational reasoning under AI-assisted development — **not** a claim that the solo creator typed the entire private source tree unaided.
