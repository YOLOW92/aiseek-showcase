# 02 / Stop mistaking missing history for change

[Portfolio](../README.md) · [English](change-detection.md) · [简体中文](change-detection.zh-CN.md) · [日本語](change-detection.ja.md)

**Visualisation · Statistical judgment · Error control**

## Problem

An early geographic index had only a few days of history. Treating the missing days as a full baseline made an ordinary day look unusually active. Collection failures can create a similar illusion.

## My judgment

I treated history coverage and collection health as prerequisites to interpretation. A geographic view should help readers navigate change without inventing certainty from thin data.

## Implementation

The correction accounts for the history that actually exists. Source-health work separates collection behaviour from real-world change. SeekMap and structure analysis supply navigation around the resulting information.

## Results and evidence

The published excerpt checks zero history, same-day history and four elapsed days. The source test suite also contains a synthetic regression for the inflated early baseline.

[history-length.test.ts](../proof/code-excerpts/history-length.test.ts) · [seekmap](https://aiseek.dev/en/seekmap) · [method](https://aiseek.dev/en/method)

## Next step

P63 has delivered its first structure-analysis work. Long-window detector evaluation waits for 60–90 days of history; the data-dependent P64 follow-ups remain planned.

[All engineering cases](README.md)
