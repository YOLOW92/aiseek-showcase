# Engineering: decisions and boundaries

[← Portfolio](../../README.md) · [中文](README.zh-CN.md) · [日本語](README.ja.md) · [Five technical case studies](CASES.md)

AiSeek P0–P72 is a deployed product, not an installable open-source release. Its implementation repository is private. The architecture below reflects the **pre-game milestone** and should not be read as a live, post-2.0 inventory.

![Original architecture diagram](../../assets/architecture.svg)

> This is an original simplified systems diagram, **not a screenshot or a claim of an independent architecture audit**.

## Core layout

| Boundary | Technology / design at the stage | Invariant |
|:--|:--|:--|
| Web | React 19, React Router SSR, Tailwind, TypeScript, Motion | Rendering does not synchronously call an LLM or connect to the database |
| API | Node 24, Fastify, Zod contracts | Private data and plan entitlements checked server-side |
| Jobs & research | pg-boss, LangGraph.js, research SSE | Long-running work outside request-render paths |
| Document processing | Python, FastAPI, Crawl4AI / Docling / parsers | Source collection policy and extraction separated |
| Canonical store | PostgreSQL 17, pgvector, PGroonga, Apache AGE projection | Relational records authoritative; graph projection rebuildable |
| Delivery | Docker Compose, VPS CI, scoped reverse proxy, backup & restore procedure | Release, database changes and secrets have operational constraints |

This is **one system with independent layers**, not a microservice count competition. The language tools and exact dependency versions shifted over P0–P72; the original October 6 stack table should not be mistaken for the P72 toolchain.

## Five engineering choices

**1 · Evidence is a policy, not an AI score.** Public claims may be FACT, SUPPORTED or HYPOTHESIS. The model cannot assign a final public classification through confidence alone. [Code: classification](../../proof/code/promote.ts).

**2 · Relationships have a bounded vocabulary.** Relation definitions specify allowed endpoint types, inverses, temporal requirements and decay. No free-form relation keys from a model. [Code: registry](../../proof/code/relation-registry.ts).

**3 · Human-language search needs locale-specific engineering.** The Chinese/Japanese search path gained PGroonga indexing and multilingual identity normalization; English stemming remained separate.

**4 · A trend is not simply a larger article count.** Complete days, historical baselines and source-behavior flags reduce false signals from publication or collection changes. Additional detector benchmarking was deferred pending data.

**5 · A small team needs bounded cost and recoverability.** Central model routing records budgeted calls and fallbacks. Limited local compute rejects excess waiting work rather than silently building unlimited queues. [Code: admission gate](../../proof/code/gate.py).

## Safety, reliability and limits

- Publisher rights for public excerpts are evaluated separately from a site's crawl permission.
- Private research paths require authentication, ownership checks and database row-level protection where applicable.
- Architecture tests protect dependency direction and the model-router boundary.
- Database migrations are forward-only. Deployment uses staged checks, backup practices and procedures for redeploying previous application images.
- P72 introduced **browser-side error reporting**. A browser smoke test introduced with P72 **was later explicitly removed** and is **not counted** as an active release control.
- Source linking and confidence classification reduce some failure modes but do not guarantee factual correctness; accuracy claims require defined evaluation samples.

**Read:** [Technical case studies](CASES.md) · [Verification and limitations](../proof/README.md) · [Product](../product/README.md)
