# 01 / Give claims an evidence boundary

[Portfolio](../README.md) · [English](evidence-engine.md) · [简体中文](evidence-engine.zh-CN.md) · [日本語](evidence-engine.ja.md)

**Rules · Data modelling · Quality judgment**

![01 / Give claims an evidence boundary](../assets/diagrams/information.jpg)

## Problem

A fluent statement can still lack support. If the same pipeline produces text and declares it factual, a reader cannot tell a direct report from an inference.

## My judgment

I required evidence-based classes and a traceable supporting passage. Classification is a deterministic responsibility; confidence from a model is not its authority.

## Implementation

Claims, evidence and relations have separate records. A canonical relation points to a claim. Public output keeps FACT, SUPPORTED and HYPOTHESIS distinguishable, while corrections can revisit published material.

## Results and evidence

The selected test expects a direct claim without a locator to remain HYPOTHESIS. The live method and correction pages expose the product behaviour to readers.

[evidence-locator.test.ts](../proof/code-excerpts/evidence-locator.test.ts) · [method](https://aiseek.dev/en/method) · [corrections](https://aiseek.dev/en/corrections)

## Next step

The labelled evaluation baseline still needs scoring. The next step is to measure support quality on reviewed samples.

[All engineering cases](README.md)
