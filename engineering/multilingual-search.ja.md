# 03 / 文字をまたいで探し、別の対象を混同しない

[ポートフォリオ](../README.ja.md) · [English](multilingual-search.md) · [简体中文](multilingual-search.zh-CN.md) · [日本語](multilingual-search.ja.md)

**多言語検索 · データ処理 · 技術選定**

![03 / 文字をまたいで探し、別の対象を混同しない](../assets/diagrams/search.jpg)

## 課題

画面の翻訳だけで中国語や日本語の検索は成立しません。表記差が同じ名前を分け、過度な正規化は別の型番をまとめてしまいます。

## 私の判断

読む言語、検索、対象の同一性を別の責任にしました。中日文には適した索引が必要で、同一性の処理では意味のある違いを保護します。

## 実装

PGroonga で中日文を検索し、英語には語形処理を残しています。表記差と別名で検索を支え、安定した対象参照で多言語の内容をつなぎ、型番検査で別製品を保護します。

## 結果と根拠

選定テストでは日本銀行／日本银行、臺積電／台积电を扱い、NVIDIA B200 と H200 を区別します。統合テストの標本では各言語の公開内容を検索し、未公開内容を除きます。

[script-identity.test.ts](../proof/code-excerpts/script-identity.test.ts) · [model-identity.test.ts](../proof/code-excerpts/model-identity.test.ts)

## 次の作業

より広い関連性の基準とデータ依存の同一性の作業には測定が必要です。

[技術事例の一覧](README.ja.md)
