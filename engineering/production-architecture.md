# 04 / Keep long work out of the request path

[Portfolio](../README.md) · [English](production-architecture.md) · [简体中文](production-architecture.zh-CN.md) · [日本語](production-architecture.ja.md)

**Queues · Cost awareness · Fault handling · Runtime design**

![04 / Keep long work out of the request path](../assets/diagrams/runtime.jpg)

## Problem

An independent product has limited operational capacity. Making a page wait for collection or research couples reading latency to expensive, failure-prone work; adding a service for every problem increases the burden.

## My judgment

I used PostgreSQL for canonical records and a database-backed queue, separated API and Worker responsibilities, and kept external calls behind receipts and budgets. The frontend reads the API.

## Implementation

Long work is queued and handled in the background. Document processing has its own service boundary. The graph is a rebuildable projection of relational state, rather than a second canonical source.

## Results and evidence

The selected architecture test rejects synchronous research execution in API sources. The runtime separates public reading, queued work and controlled provider access.

[async-boundary.test.ts](../proof/code-excerpts/async-boundary.test.ts) · [status](https://status.aiseek.dev)

## Next step

The tradeoff is coordination: retries, access, budgets and job contracts must remain consistent. Operational simplicity requires discipline as features grow.

[All engineering cases](README.md)
