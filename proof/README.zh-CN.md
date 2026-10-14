# 证据，以及它的边界

[作品集](../README.zh-CN.md) · [English](README.md) · [日本語](README.ja.md)

核验日期 **2026-10-15**；私有源码版本 `a05796c65f9119d4924bbaa26b5291492e47f3ed`。

## 可以查看的材料

| 作品集陈述 | 公开证据 | 能支持的范围 |
|---|---|---|
| AiSeek 是多语言信息产品 | [中文](https://aiseek.dev/zh)、[English](https://aiseek.dev/en)、[日本語](https://aiseek.dev/ja)、[更新日志](https://aiseek.dev/zh/changelog) | 公开阅读入口与已记录的发布。 |
| 证据和更正是产品的一部分 | [方法说明](https://aiseek.dev/zh/method)、[更正记录](https://aiseek.dev/zh/corrections) | 公开的方法与更正流程，不是准确率。 |
| 后端代码执行账户权限限制 | [深度检查](code/server-entitlements.ts) | 一个原样函数，不包含其依赖与调用路径。 |
| 任务预算有明确检查 | [预算检查](code/run-budget.ts) | 一个原样函数，不说明已测得的节省金额。 |
| 前端依赖边界有检查 | [架构测试](code/frontend-boundary.test.ts) | 一段测试，不说明本次重新运行通过，也不代表完整安全覆盖。 |
| 产品提供只读集成 | [开发者指南](https://aiseek.dev/zh/developers) | 已公开的 API/MCP 入口，当前条件以产品为准。 |
| SeekEarth 和 SeekTrace 是未来方向 | 作品集规划章节 | 核验版本的私有规划文件仍把实现标为计划，未声称已交付。 |

## 代码如何选取

三个文件是权限、资源和依赖检查的**原样局部片段**，合计 21 行源码。没有导入与周边上下文，**不是可独立运行的程序或测试套件**。[清单](source-manifest.json)记录原始路径、文件标识和行号。应用仓库保持私有，读作品集不需要访问它。

片段不包含具体来源名单、运营数据、核心算法或未来设计细节。它们用来讨论工程判断，不用于复刻应用。

## 未作出的承诺

没有展示访客、客户、收入、在线率、延迟或准确率数字；计划明确标注为计划。生成插画表达主题，不代表界面、测量或内部架构。更新日志是产品发布记录，不是此次重新进行端到端测试的结果。

产品会持续变化，当前可用性请查看[主站](https://aiseek.dev/zh)、[状态页](https://status.aiseek.dev)和[更新日志](https://aiseek.dev/zh/changelog)。[归属与使用说明](../THIRD_PARTY_NOTICES.md)。
