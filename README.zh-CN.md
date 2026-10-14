<div align="center">

# AiSeek

**从变化信号，到结构化理解。**

一个由个人主导、借助 AI 编程代理开发的证据优先型变化情报平台。

[**体验线上产品 ↗**](https://aiseek.dev/zh) · [**阅读工程案例 ↗**](docs/engineering/CASES.zh-CN.md) · [**求职与合作 ↗**](docs/connect/README.zh-CN.md)

[English](README.md) · **简体中文** · [日本語](README.ja.md)

</div>

![AiSeek 原创概念横幅](assets/hero.svg)

> **作品集版本 · P0–P72 · 2026 年 10 月 2–12 日 · 游戏开发前。** 这是公开**展示仓库**，不是产品完整源码。所有图片均为原创 SVG 示意图，没有真实网页截图或伪造仪表盘。

## 我做了一个什么产品？

AiSeek 持续读取覆盖**24 个领域**的公开信息，涉及科技、市场、政策、科学等，将新闻中的变化整理为可以检查的**信号、证据、实体和关系**。

它不只回答“发生了什么”，还希望回答：**到底改变了什么？为什么重要？影响谁？结论有没有可靠出处？**

| 发现 | 深入研究 | 持续追踪与集成 |
|:--|:--|:--|
| 信号、每日简报、深度报道、三语搜索 | 原文出处、证据分级、企业结构、SeekMap、研究流程 | 关注与通知、日历、只读 API、MCP |

**中文、英文、日文三语言上线。** 目前主站可能已继续迭代，不能把实时状态与本作品集的历史范围混为一谈。[了解产品 →](docs/product/README.zh-CN.md)

## 两种阅读路线

| **招聘方／技术负责人** | **合作伙伴／潜在投资方** |
|:--|:--|
| 了解我的产品决策、AI 代理协作、工程约束、运营经验及实际问题解决能力。 | 了解用户问题、产品差异、商业探索、真实成果和仍需验证的问题。 |
| [**本人角色与历程 →**](docs/journey/README.zh-CN.md) | [**商业机会与模式 →**](docs/business/README.zh-CN.md) |
| [**架构与技术设计 →**](docs/engineering/README.zh-CN.md) | [**证据、指标与局限 →**](docs/proof/README.zh-CN.md) |

## 五项真正值得讨论的工程能力

![P72 阶段原创架构说明图](assets/architecture.svg)

1. **不让 AI 自己宣布“事实成立”。** FACT、SUPPORTED、HYPOTHESIS 都必须经过明确的证据规则。[工程案例](docs/engineering/CASES.zh-CN.md) · [真实源代码](proof/code/promote.ts)。
2. **不允许模型随意发明关系。** 受控注册表限定关联类型、对象类别、时间与证据约束。[工程案例](docs/engineering/CASES.zh-CN.md) · [真实源代码](proof/code/relation-registry.ts)。
3. **多语言不仅是翻译。** 中文、日文需要独立检索方案、实体归一化和跨语言引用检查。[工程案例](docs/engineering/CASES.zh-CN.md)。
4. **发布量暴增不等于世界发生异常。** 通过完整日期基线、信源变化判断降低误报。[工程案例](docs/engineering/CASES.zh-CN.md)。
5. **有限资源下保障持续运行。** 队列、模型调用预算、降级、恢复机制与页面速度同时考虑。[工程案例](docs/engineering/CASES.zh-CN.md) · [真实源代码](proof/code/gate.py)。

## 项目背后的人

**WU Yuanchao · [YOLOW92](https://github.com/YOLOW92)**

我以独立开发者身份启动、主导并自费运营 AiSeek，使用 **Claude Code 和 Codex 作为重要的代码实现协作者**。我的角色包括确定产品方向、拆分任务、制定技术约束、验收、集成、排障与持续交付。**不声称全部私有代码均由我个人逐行手写。**

[阅读从想法到上线的历程 →](docs/journey/README.zh-CN.md)

## 哪些已经实现？哪些尚未证实？

| 能展示的 P72 阶段成果 | 不做的夸大宣传 |
|:--|:--|
| 实际上线的三语产品、来源核验、关系网络和地图 | 未经独立审计的全站事实准确率 |
| 三份未经改写的真实源代码节选 | 声称完整开源或任何人都能直接部署 |
| 带日期的迭代记录和真实工程取舍 | 虚构活跃用户、增长、营收与利润 |
| 订阅和开发者接口的工程基础 | 宣称已验证 PMF 或已完成融资 |

**历史内容规模不等于商业增长：** 10 月 6 日旧展示记录过 740 个信号、13,337 个实体、5,654 条关系、64,473 条证据。这些只是**当日自述的内容库存快照**，不是 P72 的最新数量、更不是客户或收入。[指标口径与核验证据 →](docs/proof/README.zh-CN.md)

### 欢迎与我联系

目前希望寻找**技术产品和工程相关职业机会**，以及 AI 原生开发、研究与数据技术合作、产品试点、赞助和投资交流。

**[联系 WU Yuanchao →](docs/connect/README.zh-CN.md)** · [LinkedIn](https://www.linkedin.com/in/%E3%82%A8%E3%83%B3%E3%83%81%E3%83%A7%E3%82%A6-%E3%82%B4-6ab2a2413/) · [support@aiseek.dev](mailto:support@aiseek.dev)

---

<sub>**展示边界与版权：** 仅展示游戏开发前 P0–P72，不包含任何游戏开发或 AiSeek 2.0。主项目源码私有，三份公开代码节选按旧版原样保留。其他原创文字与插画 © 2026 YOLOW92，保留所有权利。第三方依赖及素材见[产品致谢页](https://aiseek.dev/zh/credits)。本作品集不构成投资要约或投资建议。</sub>
