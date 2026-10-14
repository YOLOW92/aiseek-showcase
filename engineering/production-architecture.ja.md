# 04 / 長い処理をリクエスト経路から分ける

[ポートフォリオ](../README.ja.md) · [English](production-architecture.md) · [简体中文](production-architecture.zh-CN.md) · [日本語](production-architecture.ja.md)

**キュー · 費用意識 · 障害対応 · 実行設計**

![04 / 長い処理をリクエスト経路から分ける](../assets/diagrams/runtime.jpg)

## 課題

個人製品の運用能力には限りがあります。収集や調査を表示時に待つと、閲覧の遅延が高コストで失敗しやすい処理に結び付き、問題ごとにサービスを増やすと負担も増えます。

## 私の判断

PostgreSQL に正規の記録とキューを置き、API と Worker の責任を分け、呼び出し記録と予算で外部要求を制御しました。フロントエンドは API を読みます。

## 実装

長い処理をキューからバックグラウンドで実行し、文書処理には独立した境界を設けます。グラフは関係記録から再構築する投影で、第二の正規データ源にはしません。

## 結果と根拠

選定した設計テストは API ソースでの同期調査を拒否します。実行構成では公開閲覧、キューの仕事、管理された外部呼び出しを分離し。

[async-boundary.test.ts](../proof/code-excerpts/async-boundary.test.ts) · [status](https://status.aiseek.dev)

## 次の作業

代償は調整です。再試行、権限、予算、仕事の契約を一貫させる必要があります。機能が増えても運用を簡潔に保つには規律が要ります。

[技術事例の一覧](README.ja.md)
