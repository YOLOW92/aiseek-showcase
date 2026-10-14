# Evidence register & scope control

[← Portfolio](../../README.md) · [中文](README.zh-CN.md) · [日本語](README.ja.md)

## Exactly what this release covers

**Product milestone window: P0–P72 of AiSeek 1.x, through 12 October 2026 (Japan time), before game development became part of the repository.** This is a curated *feature scope*, not a reproducible one-commit snapshot. Later live changes are not imported into this portfolio; games and AiSeek 2.0 are excluded.

Three original code excerpts were already public in the previous showcase and are preserved **byte-for-byte from that showcase's blobs**:

| Excerpt | What a reviewer can inspect | Caveat |
|:--|:--|:--|
| [`promote.ts`](../../proof/code/promote.ts) | FACT / SUPPORTED / HYPOTHESIS conditions and evidence-based confidence | Imports private shared contracts; not standalone runnable |
| [`relation-registry.ts`](../../proof/code/relation-registry.ts) | Typed relationship definitions and constraints | Imports private types; reflects the previously disclosed excerpt |
| [`gate.py`](../../proof/code/gate.py) | One-at-a-time compute admission and bounded waiting | Only one component, not a whole production service |

These excerpts were taken from an **earlier disclosed stage**. They are concrete design evidence, **not proof that every line or dependency remains identical at P72**. The full product source is private.

## Evidence quality levels

| Claim | Basis | What it does **not** prove |
|:--|:--|:--|
| There is a production product at aiseek.dev | Public multilingual website and routes | No independent uptime SLA, active user count or profitability |
| Claims are classified using provenance rules | Original public code excerpt, product methodology | Perfect extraction or factual correctness |
| Relation vocabulary is constrained | Original registry excerpt; earlier documentation says 47 types | Real-world completeness or causality of links |
| International-language, trends and map milestones reached P54–P72 | Dated internal project task log, specific features on the public product | External code audit or quantified user value |
| October 6 inventory: **740 signals, 13,337 entities, 5,654 relations, 64,473 evidence items** | Historical self-reported snapshot in the original public showcase | P72 totals, paid usage, customer growth or independent verification |

Inventory figures are a **dated historical operational snapshot, not product KPIs**. The original statement is recoverable in [repository history](https://github.com/YOLOW92/aiseek-showcase/commit/4aa8243e0f958ef554927bb8cda83cfc54705665).

### Milestones deliberately not overstated

- **P55:** evaluation fixtures/framework established; owner-labeled benchmark completeness must not be assumed.
- **P61:** an internal labeled-location sample rose from approximately **64.0% to 75.7% exact matching**, as recorded in the task log. This is **not** global map accuracy and was not independently audited here.
- **P63:** graph/network analysis was delivered; long-history comparison of candidate change detectors required further data and was postponed.
- **P64:** name-readings, recurring evaluation and entity-merge follow-ups were planned, not completed at the cutoff.
- **P71:** sanctions-list integration was live; some additional official data collection paths were still transitioning from code to activation.
- **P72:** browser error reporting delivered; pre-release browser smoke test was later *removed* by project decision.
- **P48:** API, MCP and distribution plumbing existed; a coordinated promotion launch was a separate, still-pending owner decision.

## Traffic numbers: why there is no public growth chart

The creator's Cloudflare account was consulted during this rebuild (October 2026). The edge analytics series yielded unusually large page-view totals compared with browser-side analytics. **Edge page views are not verified human sessions**, and different datasets have different collection and sampling methods. Neither raw edge requests nor inferred unique IPs are published here as users, customer acquisition or traction.

Likewise, analytics instrumentation introduced in P69 **does not itself demonstrate sign-ups, retention or monetization**. Valid figures would need to be defined, filtered and reconciled with first-party browser events and conversion records before publication.

## Original illustrations, not fake UI

All new [SVG assets](../../assets/) were drawn specifically to explain the product and architecture. There are **no website screenshots, fabricated dashboards, simulated testimonials, fake logos or invented performance plots** in this edition.

## Reuse and attribution

This is a **showcase-only** repository. The private production code is **not licensed through this project**. Unless a file explicitly declares different terms, original prose, diagrams and disclosed code excerpts remain copyright © 2026 YOLOW92, all rights reserved. Product dependencies and third-party materials carry their respective rights; [product credits](https://aiseek.dev/en/credits).

[Technical cases](../engineering/CASES.md) · [Commercial position](../business/README.md) · [Contact](../connect/README.md)
