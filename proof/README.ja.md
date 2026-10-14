# Evidence / 挙動と根拠を確認する

[ポートフォリオ](../README.ja.md) · [English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

## 選定したソースのテスト

| 抜粋 | 期待する挙動 |
|---|---|
| [evidence-locator.test.ts](code-excerpts/evidence-locator.test.ts) | 原文の位置がなければ HYPOTHESIS のまま |
| [history-length.test.ts](code-excerpts/history-length.test.ts) | 履歴の長さは実際の日数を反映 |
| [script-identity.test.ts](code-excerpts/script-identity.test.ts) | 表記差で共通の対象を保つ |
| [model-identity.test.ts](code-excerpts/model-identity.test.ts) | 異なる型番を区別 |
| [async-boundary.test.ts](code-excerpts/async-boundary.test.ts) | API ソースで調査を同期実行しない |
| [release-command.test.sh](code-excerpts/release-command.test.sh) | 不正な公開命令を拒否 |

## ソースの記録

2026 年 10 月 15 日に確認。

`400c526728efb1b8bd7d7a7b914caa65f06ff217`

[元ファイルと正確な抜粋範囲](source-manifest.json)

## 公開製品の根拠

[方法説明](https://aiseek.dev/ja/method) · [訂正記録](https://aiseek.dev/ja/corrections) · [更新履歴](https://aiseek.dev/ja/changelog) · [開発者ガイド](https://aiseek.dev/ja/developers)

[提供状況と測定](status.ja.md)
