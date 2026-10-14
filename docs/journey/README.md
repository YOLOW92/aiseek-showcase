# Independent builder: decisions, not just generated code

[← Portfolio](../../README.md) · [中文](README.zh-CN.md) · [日本語](README.ja.md)

**Creator / product owner:** WU Yuanchao (YOLOW92). AiSeek began on **2 October 2026** as a self-funded, independently directed project. This is a case study of building and operating a real product with AI-assisted development, **not a claim that every line was hand-written**.

## My role

| Responsibility | What I directed | Publicly inspectable artifact |
|:--|:--|:--|
| **Product direction** | Problem definition, expansion from AI trends to a cross-domain change platform, priorities, reader journeys, plan boundaries | [Product](../product/README.md), live site |
| **System constraints** | Rules for facts, source permissions, architecture layers, paid model usage, failure modes and data custody | [Engineering](../engineering/README.md), [code excerpts](../proof/README.md) |
| **AI-agent orchestration** | Requirements and acceptance criteria for Claude Code / Codex; review, integration and iteration | Documented decisions and reproducible rules |
| **Delivery** | Production deployment decisions, troubleshooting, release processes, cost-sensitive infrastructure | Architecture and operational case studies |
| **Communication** | Chinese, English and Japanese user experience, docs, trust explanations | Public product and this portfolio |

**How the work was done:** AI coding agents were substantial implementation collaborators. I set the direction, constraints and acceptance criteria, reviewed results, diagnosed problems and managed product delivery. The repository does not claim that those activities are identical to manually implementing every component, nor does it present unaudited personal attribution as a measurement.

## A short development timeline

| Date (2026) | Product stages | Decision demonstrated |
|:--|:--|:--|
| **Oct 2–6** | Foundation through **P30** | Moved from an initial idea to a multilingual live product, with a controlled relation vocabulary, evidence policy, SSR web front end and revamped mobile experience |
| **Oct 7–8** | **P31–P50** | Invested in verifiable reading, SeekMap, source resiliency, developer interfaces, sign-in and onboarding |
| **Oct 9–11** | **P51–P67** | Improved change baselines, international-language evidence, entity resolution, search, relationship analysis and load speed; deferred unneeded local-model work |
| **Oct 12** | **P68–P72** | Added search-trend context, behavioral instrumentation, re-engagement, first-hand official sources and browser error reporting |

The P numbers are **internal milestones**, not versions or a standard measure of completeness. Details and partial-stage caveats: [Evidence & scope](../proof/README.md).

## Three decisions that matter more than code volume

**1. Do not equate model confidence with truth.** A controlled evidence policy classifies public claims. Unsupported assertions remain hypotheses, even when a model is persuasive.

**2. Do not turn collection noise into a world event.** Source outages, publishing spikes and partial day windows can distort heat scores; baseline rules and source-change flags were added before making stronger trend claims.

**3. Do not buy infrastructure just to look sophisticated.** PostgreSQL acts as the canonical store; expensive model work is accounted for and backed by fallback paths. Deployments and backups are designed for a resource-constrained independent operation.

## What I want this work to demonstrate

- Ability to **define a product and ship it**, not only prototype a UI.
- Ability to **translate ambiguity into enforceable engineering constraints** while using AI coding agents.
- Willingness to **separate evidence from estimates**, describe limitations and revise earlier decisions.
- Experience connecting **product, architecture, privacy, operations and commercialization**.

I welcome conversations about product engineering, AI-native development, technical product roles, partnerships and project support. [Get in touch](../connect/README.md).

**Boundary:** Pre-game P0–P72 only. No game work, no AiSeek 2.0 roadmap, and no claim of a formally incorporated company.
