# 03 / 跨文字检索，不把不同对象混为一谈

[作品集](../README.zh-CN.md) · [English](multilingual-search.md) · [简体中文](multilingual-search.zh-CN.md) · [日本語](multilingual-search.ja.md)

**多语言检索 · 数据工程 · 技术选型**

![03 / 跨文字检索，不把不同对象混为一谈](../assets/diagrams/search.jpg)

## 问题

翻译界面标签不会自动让中文和日文查询可用。文字变体会拆散熟悉的名称，过度归一却会把不同型号合并。

## 我的判断

我把阅读语言、检索和实体身份分开处理。中日文需要合适的索引，身份处理还要保护有意义的差异。

## 通用实现

PGroonga 支撑中日文检索，英文保留词形处理路径。文字变体和别名帮助查找，稳定的实体引用连接多语言内容；型号检查保护不同产品。

## 结果与证据

所选测试覆盖「日本銀行／日本银行」「臺積電／台积电」，并区分 NVIDIA B200 与 H200。集成测试样例检查多语言已发布内容的检索，并排除未发布材料。

[script-identity.test.ts](../proof/code-excerpts/script-identity.test.ts) · [model-identity.test.ts](../proof/code-excerpts/model-identity.test.ts)

## 下一步

更广的相关性基线与依赖数据的身份跟进仍需测量。

[全部工程案例](README.zh-CN.md)
