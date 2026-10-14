# Three decisions behind AiSeek

[Portfolio](../README.md) · [中文](CASES.zh-CN.md) · [日本語](CASES.ja.md) · [Evidence](../proof/README.md)

## 01 / Make information useful

**Problem.** A feed can grow without helping a reader understand anything. An article, a claim and a verified change are different things; treating them as interchangeable makes the product look busy while leaving the reader to do the hard work.

**My decision.** I centred the information product on changes: what happened, why it matters, what supports it and what to watch. Research became a supporting capability rather than something every visitor had to understand before using the site. I required visible distinctions between facts, supported inferences and hypotheses, plus a path back to the supporting passages.

**Delivered result.** The main site combines changes, contextual dossiers, evidence passages, structure views and follow-up reading in three languages. Method and correction pages give readers a place to understand the treatment of evidence and challenge published material.

**A real tradeoff.** A quality gate can also block useful information. The public release history records a review rule that was too strict and left the lead stories stale. The subsequent correction matters more than claiming that verification never fails: freshness and confidence must be balanced, and a disputed item needs a review path.

**What this demonstrates.** Product framing, information architecture, acceptance criteria and willingness to revise a decision when it harms the reader.

**Examine:** [method](https://aiseek.dev/en/method), [corrections](https://aiseek.dev/en/corrections), [release history](https://aiseek.dev/en/changelog). These establish the product's documented behaviour, not a benchmark of its factual accuracy.

## 02 / Make boundaries enforceable

**Problem.** In a system with public reading, private research and external services, a promise in a document is insufficient. The wrong dependency can expose private work, make page rendering wait on an external call, or leave paid access controlled only by the browser.

**My decision.** I made those separations explicit engineering constraints. The frontend reads the API; long work stays asynchronous; access is enforced on the server; external calls pass through a controlled boundary. Canonical records and rebuildable views have separate responsibilities. I required checks that can catch boundary violations as the project grows.

**Selected implementation evidence:**

| Excerpt | What it shows | What it does not prove |
|---|---|---|
| [Server entitlement check](../proof/code/server-entitlements.ts) | A requested research depth is capped at the account's entitlement. | All authorization paths are correct. |
| [Run budget guard](../proof/code/run-budget.ts) | Estimated additional usage is checked against configured run ceilings. | A measured spending reduction or an audit of every external call. |
| [Frontend dependency check](../proof/code/frontend-boundary.test.ts) | An architecture test rejects direct frontend imports of backend services. | A complete security audit. |

These are short, verbatim excerpts from the reviewed private revision. They illustrate ordinary defensive engineering, without publishing the core product mechanisms. [Source manifest](../proof/source-manifest.json).

**A real tradeoff.** Explicit contracts and asynchronous work require more coordination than a single request that does everything. They provide clearer places to enforce access, handle failure and inspect work. That is a choice about system responsibility, not a claim that complexity disappears.

**What this demonstrates.** Architecture judgment, server-side controls, resource awareness and turning requirements into reviewable checks.

## 03 / Own the product after release

**Problem.** A working feature is only one part of an independent product. Readers also need understandable language, usable mobile behaviour, a reason to return, a way to report mistakes and a stable way to connect other tools.

**My decision.** I treated English, Chinese and Japanese as product surfaces. I included follows, alerts and briefs in the return journey; made corrections and contact accessible; and provided a read-only integration surface with account limits. Release notes describe changes for readers rather than narrating the stack.

**Delivered result.** The release history records multilingual search improvements, mobile refinements, subscriptions, newsletters, web push and API/MCP access. The public product also exposes status, methods, credits and corrections. The main site is the place to examine these experiences.

**A real tradeoff.** More interfaces mean more places to preserve the meaning of a claim and the terms of access. Localisation is not finished merely because labels have been translated. I keep product promises bounded by what is actually delivered and reserve measurement claims for evidence that can support them.

**What this demonstrates.** End-to-end delivery, multilingual product thinking, operational ownership and attention to the reader after launch.

**Examine:** [live product](https://aiseek.dev/en), [developer guide](https://aiseek.dev/en/developers), [release history](https://aiseek.dev/en/changelog), [status](https://status.aiseek.dev).

---

I initiated AiSeek and own the product direction, constraints, review, acceptance and operation. Implementation uses AI-assisted coding tools. The cases describe my responsibilities and decisions, not a claim that I manually wrote every line. Evidence was reviewed on **2026-10-15**.
