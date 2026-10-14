# Evidence, with its limits

[Portfolio](../README.md) · [中文](README.zh-CN.md) · [日本語](README.ja.md)

Reviewed **2026-10-15** against private source revision `a05796c65f9119d4924bbaa26b5291492e47f3ed`.

## What you can inspect

| Portfolio statement | Public evidence | Scope of the evidence |
|---|---|---|
| AiSeek is a multilingual information product | [English](https://aiseek.dev/en), [中文](https://aiseek.dev/zh), [日本語](https://aiseek.dev/ja), [release notes](https://aiseek.dev/en/changelog) | Public reading surfaces and documented releases. |
| Evidence and corrections are part of the product | [Method](https://aiseek.dev/en/method), [corrections](https://aiseek.dev/en/corrections) | Published method and correction process, not an accuracy score. |
| Account limits are enforced in backend code | [Depth guard](code/server-entitlements.ts) | One exact function; its dependencies and calling paths are outside this excerpt. |
| Task budgets have explicit guards | [Budget guard](code/run-budget.ts) | One exact function; no measured cost-saving claim. |
| Frontend dependency boundaries have a check | [Architecture test](code/frontend-boundary.test.ts) | One test excerpt; no claim of a fresh passing test run or complete security coverage. |
| The product supports read-only integrations | [Developer guide](https://aiseek.dev/en/developers) | Published API/MCP entry points; current terms belong to the product. |
| SeekEarth and SeekTrace are future directions | Portfolio roadmap | The private planning file marks implementation as planned at the reviewed revision. No delivered feature claim. |

## How the code was selected

The three files are **verbatim, partial excerpts** of ordinary entitlement, resource and dependency checks. Together they contain 21 source lines. They exclude imports and surrounding context and are **not standalone programs or a runnable test suite**. The [manifest](source-manifest.json) records the original path, blob identifier and line range. The application repository remains private; its links are not required for reading this portfolio.

The excerpts intentionally leave out source inventories, operating data, core algorithms and detailed future designs. They support a discussion of engineering judgment rather than a reproduction of the application.

## What is not claimed

No visitor, customer, revenue, uptime, latency or accuracy figure is presented. Planned work is labelled as planned. Generated artwork illustrates themes, not interfaces, measurements or internal architecture. Release history is a record of published product changes; it is not a new end-to-end test result.

Product behaviour changes over time. Use the [current product](https://aiseek.dev/en), [status page](https://status.aiseek.dev) and [release notes](https://aiseek.dev/en/changelog) for current availability. [Attribution and reuse](../THIRD_PARTY_NOTICES.md).
