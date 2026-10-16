# AiSeek

**English** · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

Track important changes across technology, the economy, policy and companies, with sources, context and a way to follow up.

[Live product](https://aiseek.dev/en) · [Developer guide](https://aiseek.dev/en/developers) · [Method](https://aiseek.dev/en/method) · [Release history](https://aiseek.dev/en/changelog)

<a href="https://www.producthunt.com/products/aiseek?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-aiseek" target="_blank" rel="noopener noreferrer"><img alt="AiSeek - Track global changes with evidence and context | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1281158&amp;theme=light&amp;t=1792141368596"></a>

**Live product · Three languages · Read-only API & MCP**

[![AiSeek MCP connector — tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek/badges/score.svg)](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek) [![Smithery Listed](https://img.shields.io/badge/Smithery-Listed-orange)](https://smithery.ai/servers/wyc610721/aiseek) [![Better Stack Badge](https://incidents.betterstack.com/status-badges/v1/monitor/30ry9.svg)](https://incidents.betterstack.com/?utm_source=status_badge)

**Code quality · Live CodeScene metrics**

[![CodeScene Average Code Health](https://codescene.io/projects/86173/status-badges/average-code-health)](https://codescene.io/projects/86173) [![CodeScene Hotspot Code Health](https://codescene.io/projects/86173/status-badges/hotspot-code-health)](https://codescene.io/projects/86173) [![CodeScene System Mastery](https://codescene.io/projects/86173/status-badges/system-mastery)](https://codescene.io/projects/86173)

## Product

- **Changes with context.** Understand what changed, why it matters and which companies or topics it touches.
- **Evidence you can inspect.** Trace supporting sources; distinguish facts, supported inferences and open hypotheses. SeekTrace records assessments, historical states and corrections.
- **Connected exploration.** Explore company and topic relationships through structure views and the existing geographic SeekMap.
- **A reason to return.** Follow subjects through watchlists, alerts, daily and weekly briefs, and the release calendar.

<img src="assets/product-flow.en.png" alt="Product flow: sources become changes with evidence, company and topic connections, and follow-up through briefs and alerts." width="720">

## Engineering

<img src="assets/runtime.en.png" alt="Web and Admin call the API. Publication checks govern data access. A durable Worker connects document processing and budgeted model routing to PostgreSQL." width="720">

- **Clear boundaries:** API-facing interfaces, shared data contracts, a publication layer for public reads, and ownership checks for private research.
- **Durable data:** PostgreSQL is canonical; Apache AGE is a rebuildable graph projection. PostgreSQL also backs job queues and workflow state.
- **Evidence rules:** claim classification follows evidence, not model confidence. Corrections flag affected work for review; unavailable history remains unknown.
- **Controlled execution:** long tasks run in the background; paid model requests use budgets and provider receipts. Chinese and Japanese retrieval use PGroonga alongside English stemming.

**Stack:** TypeScript · React Router · Fastify · Python · PostgreSQL · pgvector · PGroonga · Apache AGE · pg-boss.

## API & MCP

Read-only access to published changes, source links, companies, release calendars and evidence history. Tool calls use personal API keys with server-enforced permissions and quotas; private research stays outside public output.

[Developer guide](https://aiseek.dev/en/developers) · [Glama](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek) · [Smithery](https://smithery.ai/servers/wyc610721/aiseek)

## In development

**AiSeek 2.0 is in development.** SeekTrace evidence records and historical queries are implemented. SeekEarth is the next direction: organising world changes by place and time. SeekEarth is not presented as an available feature.

## Built by WU Yuanchao

I initiated, lead and operate AiSeek, owning product direction, technical decisions, acceptance and releases. This showcase presents the product and its engineering; application source remains private.

[LinkedIn](https://www.linkedin.com/in/yolow92/) · [GitHub](https://github.com/YOLOW92) · [Email](mailto:support@aiseek.dev) · [Support AiSeek](https://aiseek.dev/en/sponsor)

<sub>[Corrections](https://aiseek.dev/en/corrections) · [Open-source credits](https://aiseek.dev/en/credits)</sub>
