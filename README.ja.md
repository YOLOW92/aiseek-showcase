# AiSeek

[English](README.md) · [简体中文](README.zh-CN.md) · **日本語**

技術・経済・政策・企業の重要な変化を追い、出典、背景、次の観察につなぐ情報プラットフォーム。

[製品を使う](https://aiseek.dev/ja) · [開発者ガイド](https://aiseek.dev/ja/developers) · [方法](https://aiseek.dev/ja/method) · [更新履歴](https://aiseek.dev/ja/changelog)

<a href="https://www.producthunt.com/products/aiseek?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-aiseek" target="_blank" rel="noopener noreferrer"><img alt="AiSeek - Track global changes with evidence and context | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1281158&amp;theme=light&amp;t=1792141368596"></a>

**稼働中の製品 · 三言語 · 読み取り専用 API・MCP**

[![AiSeek MCP connector — tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek/badges/score.svg)](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek) [![Smithery Listed](https://img.shields.io/badge/Smithery-Listed-orange)](https://smithery.ai/servers/wyc610721/aiseek) [![Better Stack Badge](https://incidents.betterstack.com/status-badges/v1/monitor/30ry9.svg)](https://incidents.betterstack.com/?utm_source=status_badge)

**コード品質 · CodeScene のライブ指標**

[![CodeScene 平均コード健全性](https://codescene.io/projects/86173/status-badges/average-code-health)](https://codescene.io/projects/86173) [![CodeScene ホットスポットのコード健全性](https://codescene.io/projects/86173/status-badges/hotspot-code-health)](https://codescene.io/projects/86173) [![CodeScene システム習熟度](https://codescene.io/projects/86173/status-badges/system-mastery)](https://codescene.io/projects/86173)

## 製品の機能

- **変化を理解する。** 何が変わり、なぜ重要で、どの企業やテーマに関わるのかを読む。
- **根拠をたどる。** 出典を確認し、事実・裏付けのある推論・検証待ちの仮説を区別する。SeekTrace が判断の根拠、履歴、訂正を記録する。
- **関係を探索する。** 構造ビューで企業やテーマのつながりを捉え、既存の SeekMap で地理的な背景を確認する。
- **継続して追う。** ウォッチリスト、通知、日次・週次ブリーフ、発表カレンダーで関心のある対象を追う。

<img src="assets/product-flow.ja.png" alt="公開情報から重要な変化を整理し、根拠を確認して企業やテーマの関係をたどり、ブリーフと通知で継続観察する流れ。" width="720">

## エンジニアリング

<img src="assets/runtime.ja.png" alt="Web と Admin は API を呼び、公開境界がデータへのアクセスを制御する。Worker は文書処理、予算と記録を伴うモデル呼び出し、PostgreSQL を通じて永続ジョブを実行する。" width="720">

- **明確な責務：** 画面は API のみを呼び、各層は共通のデータ契約を使う。公開閲覧は公開境界を通り、非公開リサーチには所有者の確認を設ける。
- **永続性と再構築：** PostgreSQL を正本とし、Apache AGE は再構築可能なグラフ投影とする。キューとワークフローの状態にも PostgreSQL を使う。
- **根拠に基づく規則：** 主張の分類はモデルの自信ではなく根拠で決める。訂正の影響を示して再確認につなぎ、不足する履歴は不明のまま扱う。
- **実行と費用の管理：** 長時間の処理はバックグラウンドで行い、有料モデル呼び出しには予算確認と記録を伴わせる。中日文検索には PGroonga、英語には語形処理を使う。

**技術構成：** TypeScript · React Router · Fastify · Python · PostgreSQL · pgvector · PGroonga · Apache AGE · pg-boss。

## 実装と検証

実際の実装とテストを抜粋。インポートと周辺の準備は省略し、それぞれが示す技術的な判断を説明しています。

**01 · 型安全な API 境界**

未知の入力を実行時に検証し、TypeScript が推論する戻り値の型を維持します。

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

**02 · 二層の所有者確認**

利用者のデータベースコンテキストで取得した後、所有者も明示的に確認します。不存在とアクセス不可はいずれも NOT_FOUND を返します。

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

**03 · トランザクションと後処理**

処理が成功してからコミットします。ロールバックも失敗した場合は元のエラーを保持し、接続は必ず解放します。

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

**04 · 型で制約するバックグラウンド処理**

キュー名とペイロード型を対応させ、保存前に契約を検証。重複抑制、実行時刻、優先度を指定できます。

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

**05 · 上限のあるネットワーク読み取り**

応答がバイト上限を超えると読み取りを中止し、全体を保持してから判定することを避けます。

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

**06 · クライアントエラーを隠さない縮退**

バックエンドの障害時は代替結果を使い、大半のクライアントエラーはそのまま伝えます。レート制限は回復可能な場合として扱います。

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

**07 · 多言語エンティティの回帰テスト**

中国語の繁簡体や日本語の漢字表記が、同じエンティティに対応することを確認します。

```typescript
it("folds traditional Chinese and Japanese kanji to simplified", () => {
  expect(nameKey("日本銀行")).toBe(nameKey("日本银行"));
  expect(nameKey("臺積電")).toBe(nameKey("台积电"));
  expect(nameKey("経済産業省")).toBe(nameKey("经济产业省"));
  expect(nameKey("台風27号")).toBe(nameKey("台风27号"));
});
```

**08 · 履歴の精度を守る回帰テスト**

記録開始より前は存在のみを返し、過去の状態を推測しません。現在の主張分類が履歴の回答へ混入することを防ぎます。

```typescript
const r = at(A, rows, d("10-10"), d("09-20"));
expect(r).toMatchObject({
  precision: "EXISTENCE_ONLY", existed: true,
  state: null, evidence: null, knownSince: baseline
});
expect(JSON.stringify(r)).not.toMatch(/FACT|HYPOTHESIS/);
```

## API と MCP

公開済みの変化、出典リンク、企業、発表カレンダー、根拠の履歴を読み取り専用で提供。ツール呼び出しには個人キーを使い、サーバー側で権限と利用枠を確認します。非公開リサーチは公開出力に含めません。

[開発者ガイド](https://aiseek.dev/ja/developers) · [Glama](https://glama.ai/mcp/connectors/dev.aiseek/ai-seek) · [Smithery](https://smithery.ai/servers/wyc610721/aiseek)

## 開発状況

**AiSeek 2.0 は開発中です。** SeekTrace の根拠記録と履歴照会は実装済み。次は SeekEarth を軸に、場所と時間から世界の変化を捉える入口を作ります。SeekEarth は現在利用できる機能としては紹介していません。

## 開発者 WU Yuanchao

AiSeek を発案・主導・運営し、製品の方向性、技術の判断、受け入れ、リリースを担っています。選定したコード抜粋は公開レビュー用で、アプリケーション全体のソースは非公開です。

[LinkedIn](https://www.linkedin.com/in/yolow92/) · [GitHub](https://github.com/YOLOW92) · [メール](mailto:support@aiseek.dev) · [AiSeek を支援](https://aiseek.dev/ja/sponsor)

<sub>[公開訂正](https://aiseek.dev/ja/corrections) · [オープンソースのクレジット](https://aiseek.dev/ja/credits)</sub>
