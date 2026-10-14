# Architecture / サービスより先に責任を分ける

[ポートフォリオ](../README.ja.md) · [English](architecture.md) · [简体中文](architecture.zh-CN.md) · [日本語](architecture.ja.md)

## 構成

![モジュール構成](../assets/diagrams/framework.jpg)

| 責任 | 主な技術 |
|---|---|
| Web と Admin | TypeScript、React、React Router |
| API と Worker | TypeScript、Fastify、pg-boss |
| 正規の記録と検索 | PostgreSQL、pgvector、PGroonga |
| 再構築するグラフ | Apache AGE |
| 文書処理 | Python、FastAPI |

アプリケーションは共通の契約を通してワークフローと領域のエンジンを調整し、データアクセスはリポジトリ層に置きます。図は責任をまとめています。Web と Admin は API を利用し、API と Worker はバックエンドのモジュールを使います。

## 実行構成

![実行構成](../assets/diagrams/runtime.jpg)

公開閲覧は Web と API から公開済みデータへ進み、長い仕事はキューから Worker に渡します。文書処理には独立した境界があり、モデル呼び出しは記録と予算を通ります。API とデータベースの線にはリポジトリ層を含みます。

キューは PostgreSQL を使い、別の基盤サービスを増やしません。関係レコードが正規の記録で、グラフは再構築できます。非公開の調査では所有者を確認し、公開経路から分離します。

## 技術選定の判断

責任の境界を明確にし、保存とキューに同じデータベースを使いました。運用範囲を管理しながら、バックグラウンド処理、検索、製品の画面を別々に進化させる選択です。

[五つの技術事例](README.ja.md) · [選定テスト](../proof/README.ja.md)
