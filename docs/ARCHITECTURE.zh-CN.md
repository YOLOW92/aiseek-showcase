# 框架与运行结构

[作品集](../README.zh-CN.md) · [English](ARCHITECTURE.md) · [日本語](ARCHITECTURE.ja.md)

两张图展示经过源码核验的高层职责，不展开具体产品机制、部署和运营配置。它们是生成的技术示意图，不是产品截图。

## 框架 / 依赖方向

![AiSeek 框架：应用、工作流、引擎、数据访问和共享契约，依赖指向下层](../assets/framework.jpg)

| 图中层级 | 职责 |
|---|---|
| Applications／应用 | Web 和 Admin 展示 API 数据；API 处理请求；Worker 执行后台任务。 |
| Workflows／工作流 | Research、关注和发布协调长任务与公开输出。 |
| Engines／引擎 | 来源、实体、证据、图和财务模块分别处理各自领域。 |
| Data access／数据访问 | 仓储和 PostgreSQL 支撑的队列提供受控的状态访问。 |
| Shared contracts／共享契约 | 类型和结构定义模块边界。 |

箭头表示允许的依赖方向，不要求每次调用都穿过所有层。上层也使用共享契约。把应用归为一层不代表每个应用都能依赖所有后端模块：Web 和 Admin 仍只面向 API。为方便阅读，图中合并了相邻的引擎层。[架构片段](../proof/code/frontend-boundary.test.ts)展示其中一条受检查的前端边界。

## 运行结构 / 阅读与后台处理

![AiSeek 运行结构：读者通过 Web 和 API 读取 PostgreSQL；API 将任务交给 Worker，后台执行发布、文档处理和受控外部调用](../assets/runtime.jpg)

**公开阅读：**Web 通过 API 请求已发布数据，不开数据库连接，也不调用模型提供方。图中的 API 到 PostgreSQL 连线省略了仓储层。

**后台处理：**API 将长任务入队，Worker 执行；Publication 控制哪些内容可以公开。Document worker 处理文档；Model-router 通过请求凭据和预算控制模型调用。图中仅展示这条选定路径，省略其他任务、内部数据库访问和返回箭头。

**存储职责：**PostgreSQL 关系记录是标准事实源，图投影可以重建。Queue 是 PostgreSQL 支撑的逻辑组件，不是额外引入的队列服务。API 和 Worker 是同一产品中不同的运行职责。

实线表示选定的调用或写入，虚线表示入队任务。两张图解释职责，不是完整网络拓扑，也不承诺每项安全属性。[证据说明](../proof/README.zh-CN.md)列出了检查范围。

## 技术框架 / 按职责划分

| 职责 | 主站使用的技术 |
|---|---|
| Web 与 Admin | TypeScript、React、React Router |
| API 与 Worker | TypeScript、Fastify、pg-boss |
| 标准数据与检索 | PostgreSQL、pgvector、PGroonga |
| 图投影 | Apache AGE |
| 文档处理 | Python、FastAPI、文档处理库 |

这是一份框架概览，不是所有依赖的清单。上游归属保留在[产品鸣谢页](https://aiseek.dev/zh/credits)。核验日期 **2026-10-15**。
