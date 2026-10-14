# Architecture / 先分职责，再选服务

[作品集](../README.zh-CN.md) · [English](architecture.md) · [简体中文](architecture.zh-CN.md) · [日本語](architecture.ja.md)

## 框架

![模块架构](../assets/diagrams/framework.jpg)

| 职责 | 主要技术 |
|---|---|
| Web 与 Admin | TypeScript、React、React Router |
| API 与 Worker | TypeScript、Fastify、pg-boss |
| 标准记录与检索 | PostgreSQL、pgvector、PGroonga |
| 可重建图投影 | Apache AGE |
| 文档处理 | Python、FastAPI |

应用通过共享契约协调工作流和领域引擎，数据访问集中在仓储层。图按职责分组：Web 与 Admin 面向 API，API 与 Worker 可以使用后端模块。

## 运行结构

![运行结构](../assets/diagrams/runtime.jpg)

公开阅读经 Web 和 API 访问已发布数据，长任务入队交给 Worker。文档处理有独立边界，模型调用经过请求凭据与预算。API 到数据库的连线包含仓储访问。

队列由 PostgreSQL 支撑，不是另一个基础设施服务。关系记录是标准事实源，图状态可以重建。私有研究检查所有权，不进入公开发布。

## 技术选择背后的判断

我选择明确职责边界，并复用数据库承担存储和队列，让运维范围可控，同时允许后台工作、检索和产品界面分别演进。

[五个工程案例](README.zh-CN.md) · [精选测试](../proof/README.zh-CN.md)
