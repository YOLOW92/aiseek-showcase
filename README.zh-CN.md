# AiSeek

[English](README.md) · **简体中文** · [日本語](README.ja.md)

追踪科技、经济、政策与公司的重要变化，连接来源、背景和后续跟进。

[体验产品](https://aiseek.dev/zh) · [开发者说明](https://aiseek.dev/zh/developers) · [方法说明](https://aiseek.dev/zh/method) · [更新记录](https://aiseek.dev/zh/changelog)

<a href="https://www.producthunt.com/products/aiseek?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-aiseek" target="_blank" rel="noopener noreferrer"><img alt="AiSeek - Track global changes with evidence and context | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1281158&amp;theme=light&amp;t=1792141368596"></a>

**真实运行的产品 · 中英日三语 · 只读 API 与 MCP**

[![AiSeek MCP connector — tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek/badges/score.svg)](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek) [![Smithery Listed](https://img.shields.io/badge/Smithery-Listed-orange)](https://smithery.ai/servers/wyc610721/aiseek) [![Better Stack Badge](https://incidents.betterstack.com/status-badges/v1/monitor/30ry9.svg)](https://incidents.betterstack.com/?utm_source=status_badge)

**代码质量 · CodeScene 动态指标**

[![CodeScene 整体代码健康度](https://codescene.io/projects/86173/status-badges/average-code-health)](https://codescene.io/projects/86173) [![CodeScene 热点代码健康度](https://codescene.io/projects/86173/status-badges/hotspot-code-health)](https://codescene.io/projects/86173) [![CodeScene 代码知识掌握度](https://codescene.io/projects/86173/status-badges/system-mastery)](https://codescene.io/projects/86173)

## 产品能力

- **理解变化。** 看清发生了什么、为什么重要，以及涉及哪些公司或主题。
- **追溯证据。** 查看支持来源，区分事实、有据推断和待验证假设。SeekTrace 记录判断依据、历史状态与更正。
- **探索关联。** 通过结构视图理解公司和主题之间的关系，利用现有 SeekMap 获得地理背景。
- **持续跟进。** 通过关注列表、提醒、每日与每周简报、发布日历，追踪关心的对象。

<img src="assets/product-flow.zh.png" alt="产品流程：从公开来源整理重要变化，查看证据，探索公司与主题的关联，再通过简报和提醒持续跟进。" width="720">

## 工程亮点

<img src="assets/runtime.zh.png" alt="Web 与 Admin 只调用 API。发布边界控制公开内容访问。Worker 通过文档处理、受预算和凭据约束的模型路由以及 PostgreSQL 执行持久任务。" width="720">

- **职责边界清楚：** 界面只访问 API，各层共用数据契约；公开读取经过发布边界，私有研究执行所有权校验。
- **数据可持久、图可重建：** PostgreSQL 保存标准记录，Apache AGE 作为可重建图投影；队列和工作流状态也复用 PostgreSQL。
- **证据规则落地：** 主张类别由证据决定，不由模型自信程度决定；更正标记受影响内容并进入复核，缺失历史保留未知。
- **执行与成本受控：** 长任务后台执行，付费模型请求经过预算与调用凭据；中日文检索使用 PGroonga，英文保留词形处理。

**技术栈：** TypeScript · React Router · Fastify · Python · PostgreSQL · pgvector · PGroonga · Apache AGE · pg-boss。

## 实现与验证

精选真实实现与测试，省略导入和外围准备代码。每段对应一个具体的工程判断。

**01 · 类型安全的 API 边界**

运行时校验未知输入，同时保留 TypeScript 对返回类型的推导。

```typescript
export function parse<T extends z.ZodTypeAny>(
  schema: T, input: unknown
): z.infer<T> {
  const r = schema.safeParse(input);
  if (!r.success) throw new AppError(
    "BAD_REQUEST",
    r.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ")
  );
  return r.data;
}
```

**02 · 双层所有权校验**

先在用户数据库上下文中读取，再显式检查所有权；不存在与无权访问的任务均返回 NOT_FOUND。

```typescript
async function loadOwned(pool: Pool, userId: string, runId: string) {
  const run = await withTx(
    pool, asUser(userId), (tx) => research.getRun(tx, runId)
  );
  if (!run || run.userId !== userId)
    throw new AppError("NOT_FOUND", "research run");
  return run;
}
```

**03 · 事务生命周期与资源清理**

事务内设置访问上下文，成功后才提交；回滚也失败时保留原始错误，并始终释放连接。

```typescript
export async function withTx<T>(
  pool: Pool, ctx: DbContext,
  fn: (tx: Queryable) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await applyContext(client, ctx);
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    try {
      await client.query("ROLLBACK");
    } catch {
    }
    throw err;
  } finally {
    client.release();
  }
}
```

**04 · 类型约束的后台任务派发**

任务名与载荷类型绑定，入队前校验数据契约，并支持去重、延迟执行与优先级控制。

```typescript
export class Queue {
  constructor(private readonly boss: PgBoss) {}

  async send<Q extends QueueName>(
    queue: Q, payload: JobPayload<Q>,
    opts: EnqueueOptions = {}
  ): Promise<string | null> {
    const envelope = newEnvelope(queue, payload, {
      actor: opts.actor, correlationId: opts.correlationId
    });
    parseJob(queue, envelope); // throws on contract violation
    const options: SendOptions = {};
    if (opts.singletonKey) options.singletonKey = opts.singletonKey;
    if (opts.singletonSeconds) options.singletonSeconds = opts.singletonSeconds;
    if (opts.startAfter !== undefined) options.startAfter = opts.startAfter;
    if (opts.priority !== undefined) options.priority = opts.priority;
    return this.boss.send(queue, envelope as unknown as object, options);
  }
}
```

**05 · 有界的网络读取**

响应超过字节预算时取消读取，避免先缓存整个响应再判断大小。

```typescript
for (;;) {
  const { done, value } = await reader.read();
  if (done) break;
  total += value.byteLength;
  if (total > maxBytes) {
    await reader.cancel();
    throw new SsrfError(`Response exceeds ${maxBytes} bytes`);
  }
  chunks.push(value);
}
```

**06 · 不掩盖客户端错误的降级**

公开页面在后端故障时使用回退结果，同时保留大部分客户端错误；限流作为可恢复情况处理。

```typescript
export async function safe<T>(p: Promise<T>, fallback: T): Promise<T> {
  try {
    return await p;
  } catch (e) {
    if (
      e instanceof ApiFailure &&
      e.status >= 400 && e.status < 500 && e.status !== 429
    ) throw e;
    return fallback;
  }
}
```

**07 · 多语言实体身份的回归测试**

用测试保护中文繁简体与日文汉字变体之间的实体一致性。

```typescript
it("folds traditional Chinese and Japanese kanji to simplified", () => {
  expect(nameKey("日本銀行")).toBe(nameKey("日本银行"));
  expect(nameKey("臺積電")).toBe(nameKey("台积电"));
  expect(nameKey("経済産業省")).toBe(nameKey("经济产业省"));
  expect(nameKey("台風27号")).toBe(nameKey("台风27号"));
});
```

**08 · 历史精度的回归测试**

记录开始之前只回答是否存在，不推断过去的状态；测试防止把今天的主张类别带回历史查询。

```typescript
const r = at(A, rows, d("10-10"), d("09-20"));
expect(r).toMatchObject({
  precision: "EXISTENCE_ONLY", existed: true,
  state: null, evidence: null, knownSince: baseline
});
expect(JSON.stringify(r)).not.toMatch(/FACT|HYPOTHESIS/);
```

## API 与 MCP

通过只读接口访问已公开的变化、来源链接、公司、发布日历与证据历史。工具调用使用个人密钥，服务端校验权限和额度；私有研究不会进入公开输出。

[开发者说明](https://aiseek.dev/zh/developers) · [Glama](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek) · [Smithery](https://smithery.ai/servers/wyc610721/aiseek)

## 开发进展

**AiSeek 2.0 正在开发中。** SeekTrace 的证据记录与历史查询已实现。下一阶段围绕 SeekEarth，以地点与时间组织世界的变化；SeekEarth 不作为当前已上线功能展示。

## 开发者 WU Yuanchao

我发起、主导并运营 AiSeek，负责产品方向、技术决策、验收与发布。精选代码片段用于公开审阅，完整应用源码保持私有。

[LinkedIn](https://www.linkedin.com/in/yolow92/) · [GitHub](https://github.com/YOLOW92) · [邮件](mailto:support@aiseek.dev) · [支持 AiSeek](https://aiseek.dev/zh/sponsor)

<sub>[公开更正](https://aiseek.dev/zh/corrections) · [开源鸣谢](https://aiseek.dev/zh/credits)</sub>
