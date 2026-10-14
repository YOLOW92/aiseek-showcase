# Architecture / Responsibilities before services

[Portfolio](../README.md) · [English](architecture.md) · [简体中文](architecture.zh-CN.md) · [日本語](architecture.ja.md)

## Framework

![Module architecture](../assets/diagrams/framework.jpg)

| Responsibility | Main technology |
|---|---|
| Web and Admin | TypeScript, React, React Router |
| API and Worker | TypeScript, Fastify, pg-boss |
| Canonical records and retrieval | PostgreSQL, pgvector, PGroonga |
| Rebuildable graph | Apache AGE |
| Document processing | Python, FastAPI |

Applications coordinate workflows and domain engines through shared contracts. Data access lives behind repositories. The diagram groups responsibilities; Web and Admin remain API-facing, while API and Worker can use backend modules.

## Runtime

![Runtime](../assets/diagrams/runtime.jpg)

Public reading goes through Web and API to published data. Long work is queued for Worker. Document processing has a separate boundary; model calls pass through receipts and budgets. The API-to-database line includes repository access.

Queue is PostgreSQL-backed, not another infrastructure service. Relational records are canonical; graph state can be rebuilt. Private research has ownership checks and stays outside public publication.

## The decision behind the stack

I chose clear responsibility boundaries and reused the database for storage and queues. This keeps the operational surface manageable while allowing background work, retrieval and product interfaces to evolve separately.

[Five engineering cases](README.md) · [Selected tests](../proof/README.md)
