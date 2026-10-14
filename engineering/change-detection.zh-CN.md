# 02 / 别把缺失历史当成变化

[作品集](../README.zh-CN.md) · [English](change-detection.md) · [简体中文](change-detection.zh-CN.md) · [日本語](change-detection.ja.md)

**可视化 · 统计判断 · 误差控制**

## 问题

地理指数早期只有几天历史，把缺失的天数当成完整基线，会把平常一天放大成异常活跃。采集故障也会制造类似假象。

## 我的判断

我把历史覆盖和采集健康作为解释变化的前提。地理视图应帮助读者观察变化，而不是从稀薄数据里制造确定性。

## 通用实现

修正后按实际存在的历史处理基线；来源健康检查把采集行为与现实变化分开。SeekMap 和结构分析围绕这些信息提供导航。

## 结果与证据

公开片段检查无历史、当天历史和四天历史。源码测试还包含针对早期基线被放大的合成回归案例。

[history-length.test.ts](../proof/code-excerpts/history-length.test.ts) · [seekmap](https://aiseek.dev/zh/seekmap) · [method](https://aiseek.dev/zh/method)

## 下一步

P63 已完成首部分结构分析工作，长窗口检测评估仍需 60–90 天历史；依赖数据的 P64 跟进仍在计划中。

[全部工程案例](README.zh-CN.md)
