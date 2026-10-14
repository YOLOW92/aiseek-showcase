# Evidence / 看行为与依据

[作品集](../README.zh-CN.md) · [English](README.md) · [简体中文](README.zh-CN.md) · [日本語](README.ja.md)

## 精选源码测试

| 片段 | 预期行为 |
|---|---|
| [evidence-locator.test.ts](code-excerpts/evidence-locator.test.ts) | 缺少原文定位的主张仍为 HYPOTHESIS |
| [history-length.test.ts](code-excerpts/history-length.test.ts) | 历史长度反映实际可用天数 |
| [script-identity.test.ts](code-excerpts/script-identity.test.ts) | 文字变体可以保持同一身份 |
| [model-identity.test.ts](code-excerpts/model-identity.test.ts) | 不同型号保持区分 |
| [async-boundary.test.ts](code-excerpts/async-boundary.test.ts) | API 源码不直接同步执行研究 |
| [release-command.test.sh](code-excerpts/release-command.test.sh) | 非法发布命令被拒绝 |

## 源码依据

核验于 2026 年 10 月 15 日。

`400c526728efb1b8bd7d7a7b914caa65f06ff217`

[源文件与准确截取范围](source-manifest.json)

## 公开产品证据

[方法说明](https://aiseek.dev/zh/method) · [更正记录](https://aiseek.dev/zh/corrections) · [更新日志](https://aiseek.dev/zh/changelog) · [开发者指南](https://aiseek.dev/zh/developers)

[交付状态与测量](status.zh-CN.md)
