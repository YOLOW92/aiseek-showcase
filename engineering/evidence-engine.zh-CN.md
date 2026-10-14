# 01 / 让主张有证据边界

[作品集](../README.zh-CN.md) · [English](evidence-engine.md) · [简体中文](evidence-engine.zh-CN.md) · [日本語](evidence-engine.ja.md)

**规则设计 · 数据建模 · 质量判断**

![01 / 让主张有证据边界](../assets/diagrams/information.jpg)

## 问题

表达流畅的陈述也可能没有支撑。如果同一条生成链路既写内容又宣布它是事实，读者就难以区分直接报道和推断。

## 我的判断

我要求按证据区分主张，并能追到支撑段落。定级是确定性的系统职责，模型信心不能成为宣布事实成立的依据。

## 通用实现

主张、证据和关系分别记录，标准关系指向主张。公开输出区分 FACT、SUPPORTED 和 HYPOTHESIS，更正流程可以重新检查已发布材料。

## 结果与证据

所选测试要求：直接陈述没有原文定位时，仍为 HYPOTHESIS。主站的方法与更正页面把相关产品行为公开给读者。

[evidence-locator.test.ts](../proof/code-excerpts/evidence-locator.test.ts) · [method](https://aiseek.dev/zh/method) · [corrections](https://aiseek.dev/zh/corrections)

## 下一步

标注评估基线仍待评分，下一步是在经过复核的样本上测量支撑质量。

[全部工程案例](README.zh-CN.md)
