// 工作系统案例索引：聚焦真实业务中的 AI 工作流、内部工具与规模化交付。
import type { MarkdownPost } from "@/lib/markdownLoader";

export const businessAnalysisPosts: MarkdownPost[] = [
  {
    slug: "ai-evaluation-workbench",
    title: "AI Evaluation Workbench｜可信评测基础设施",
    titleEn: "AI Evaluation Workbench | Trusted Evaluation Infrastructure",
    description: "把“寻找真正的高价值难题”从抽象业务要求，重构为可执行、可验证、可恢复并能规模化运行的 AI Evaluation Pipeline。",
    descriptionEn: "A configurable and recoverable evaluation pipeline that turns the search for genuinely high-value hard cases into an executable, verifiable workflow.",
    date: "2026",
    tags: ["Evaluation Pipeline", "Agent Orchestration", "Human-in-the-loop", "Internal Tool"],
    type: "Work System",
    typeEn: "Work System",
    highlights: ["50% → 80% 抽检一致率", "500 / 1,000 题级运行", "3 个团队复用"],
    highlightsEn: ["50% → 80% spot-check agreement", "500 / 1,000-question workloads", "Reused by 3 teams"],
    coverImage: "/works/work-systems/thumbs/evaluation-full-pipeline.jpg",
    mediaItems: [
      { src: "/works/work-systems/evaluation-full-pipeline.webp", label: "一张表启动完整评测链路", labelEn: "Launch the full evaluation pipeline from one table" },
      { src: "/works/work-systems/evaluation-judge-runner.webp", label: "通用节点操作与 Judger Runner", labelEn: "Configurable nodes and Judger Runner" },
      { src: "/works/work-systems/evaluation-control-center.webp", label: "中控台与运行配置", labelEn: "Control center and runtime configuration" },
      { src: "/works/work-systems/evaluation-monitor.webp", label: "长期监控与任务投递", labelEn: "Persistent monitoring and task dispatch" },
    ],
    contentEn: `## Project Overview

**Role:** Execution Owner / Evaluation Pipeline Design / Vibe Coding

I transformed an abstract goal—finding truly high-value hard cases—into an evidence-driven evaluation pipeline. The workbench connects completeness checks, AI-trace detection, value and scenario screening, rubric generation, SOTA response collection, three independent judges, disagreement review, trace analysis, and final acceptance.

## What I Built

- A configurable workbench for full-pipeline, single-node, and partial reruns
- Batch and streaming runners that simulate real user calls
- State tracking, failure recovery, attachment fallbacks, OCR/TTS parsing, and automated result write-back
- Human-in-the-loop gates for low-confidence cases and judge disagreement

## Outcomes

- Improved manual spot-check agreement from approximately **50% to 80%**
- Supported **500-question batch** and **1,000-question streaming** workloads
- Reused by **3 teams** and designed toward a **3,000-question** production target

## Product Judgment

A judge score is a signal, not a conclusion. Trusted evaluation requires explicit evidence boundaries, observable failure states, recovery paths, and clear rules for when judgment must return to a human.`,
    content: `## 项目概览

**角色：** Execution Owner / Evaluation Pipeline Design / Vibe Coding

**范围：** 高价值 AI Evaluation Dataset

**规模：** 一期 63 位专家、310 道候选题，最终保留 170 道高价值题；后续面向约 400 名专家与 3,000 题目标量级。

业务最初只提出了一个目标：**需要一批真正能用于模型评测的高价值难题。** 早期流程将 SOTA 模型的低 Judge Score 视为“难”，但生产中的低分可能来自信息不完整、Rubric 缺陷、附件未读取、题目与场景错位或模型随机波动。

我逐步把问题重新定义为：**如何证明一个 hard case 值得被信任？**

## 我的职责与边界

我负责把抽象业务目标转成可执行、可验证、可规模化的 Evaluation Pipeline，并根据线上 bad case 持续设计规则、Skill 与 Agent 节点。

我设计和实现的重点包括：

- 由 bad case 驱动的整体 Pipeline 演进与大量质量节点
- 场景契合度 Skill
- 3 个独立 Judge 与分差大于 30 时触发的 Review Agent
- Evaluation Workbench、后台 Monitor、任务中心与局部重跑
- Schema Mapping、失败恢复和跨团队可配置能力

Rubric Generation 与 Judger 的基础 Skill 来自团队已有能力，并由团队共同复用和适配；Trace Analysis 核心 Skill 主要由 leader 打磨，我负责将其集成进 Pipeline 并投入生产。

## 从单一分数到证据链

最终流程由多个独立但串联的证据节点组成：

**专家提交 → 完备性 → AI 痕迹 → 高价值筛选 → 场景契合 → Rubric → SOTA Runner → 3 Judges → 分歧复核 → Trace / Metric → 最终录用**

核心原则不是让某一个模型决定“难不难”，而是让多个证据源交叉验证：

- 完备性不只检查字段非空，而是判断任务是否真的可开始、专家是否认真完成
- AI 痕迹从“文风像不像”升级为基于原始附件与证据门槛的三态判断
- 高价值筛选围绕真实工作、价值与复杂度、明确交付物建立边界
- 场景契合比较 Business Object、Task Flow 与 Deliverable，而非关键词
- 三个 Judge 在独立环境中运行；高分歧 case 自动进入 Review Agent 与人工视图

## 工作台与可靠性

我独立 Vibe Coding 搭建 Evaluation Workbench，把模型、Skill、附件、飞书 Base 和任务状态整合为统一工作台。用户粘贴 Base URL 后即可确认字段映射、选择节点、模型与并发，并运行全链路、单节点或局部重跑。

为了让系统从 Demo 进入生产，我补齐了题级状态机、硬门禁、后台监控、结果自动回填、失败重试、附件多级 fallback、OCR / TTS 解析、超时与格式恢复，以及按题目、Judge 或 Rubric ID 的局部重跑。

人的角色由搬数据、等待、重试和回填，转向低置信结果、Judge 分歧与无法安全自动恢复的异常判断。

## 结果

- Skill 人工抽检一致率约 **50% → 80%**
- 实际完成 **500 题级批处理**与 **1,000 题级流式任务**
- 工作台完成交接后已被 **3 个团队使用**
- 一期从 310 道候选题中沉淀 170 道高价值题
- 后续支撑约 400 名专家、3,000 题目标量级的生产流程

## 产品判断

Judge Score 只是信号，不是结论。可信 AI Evaluation 的关键不在于增加更多模型调用，而在于建立证据边界、识别失败、设计恢复路径，并清楚规定何时必须把判断交还给人。

这段工作也让我确认：运营与工程之间没有绝对边界。当业务目标模糊、流程混乱、AI 能力又不稳定时，我真正擅长的是把它重新设计成一套可被人信任、可被系统执行、并能持续扩张的机制。`,
  },
  {
    slug: "lightflow-qc-workspace",
    title: "多语种质检工作台－飞书边栏插件",
    titleEn: "Multilingual QC Workspace | Feishu Sidebar Plugin",
    description: "把分散在字段、附件和翻译工具中的质检动作收进飞书侧边栏，让 QC 在一个决策界面完成阅读、对比、翻译、填写与任务导航。",
    descriptionEn: "A Feishu-native decision workspace that brings response comparison, translation, attachments, form filling, and task navigation into one sidebar.",
    date: "2026",
    tags: ["Product Design", "Feishu Plugin", "Multilingual QC", "Workflow Optimization"],
    type: "Internal Tool",
    typeEn: "Internal Tool",
    highlights: ["10 min → 3–5 min / 条", "约 12 名内部 QC", "2 期真实生产任务"],
    highlightsEn: ["10 min → 3–5 min per record", "Around 12 internal reviewers", "2 production batches"],
    coverImage: "/works/work-systems/thumbs/lightflow-qc-form.jpg",
    mediaItems: [
      { src: "/works/work-systems/lightflow-qc-form.webp", label: "QC 字段集中填写与翻译", labelEn: "Centralized QC fields and translation" },
      { src: "/works/work-systems/lightflow-translation.webp", label: "多语种内容翻译与质检阅读", labelEn: "Multilingual translation and review" },
      { src: "/works/work-systems/lightflow-layout.webp", label: "Reviewer 工作区与自定义布局", labelEn: "Reviewer workspace and custom layout" },
    ],
    contentEn: `## Project Overview

**Role:** Product Design / Vibe Coding / Internal Tool

LightFlow is a Feishu-native sidebar plugin for multilingual data quality control. It places prompts, multiple contributor responses, reviewer output, attachments, translation, editable QC fields, and next-task navigation in one decision surface.

## Product Decisions

- Kept the tool inside the Feishu Base where reviewers already worked
- Replaced repeated field-hunting and context switching with side-by-side comparison
- Added internal-first translation routing, cached results, and manual fallback
- Evolved a fixed three-column view into a configurable personal review workspace

## Outcomes

- Reduced average review time from about **10 minutes to 3–5 minutes per record**
- Used by around **12 internal reviewers**
- Ran for approximately **1.5 months across 2 production batches**

## Product Judgment

An AI capability is not production-ready merely because its API returns an answer. Productization also requires prompt boundaries, data compliance, latency control, caching, fallbacks, and human correction.`,
    content: `## 项目概览

**角色：** Product Design / Vibe Coding / Internal Tool

**业务场景：** Dola 东南亚多语种数据项目

**用户：** 约 12 名内部 QC

QC 需要同时阅读 Prompt、比较多份 Contributor Response、核查 Reviewer 结果、查看 PDF / CSV / DOCX / 图片附件、处理小语种文本，并填写英文 Comment 与 Justification。

原始飞书 Base 适合管理数据，却不适合高密度判断。随着任务量上升，时间大量消耗在找字段、滚动、切记录、打开附件、翻译、返回和寻找下一条任务。单条任务平均约需 10 分钟。

## 产品决策

我最初尝试过独立网页工具，最终选择将 LightFlow 做成**飞书多维表格原生侧边栏插件**。

关键判断是：**不要再让用户打开一个“效率工具”，而应把效率能力放进他们已经工作的地方。**

LightFlow 不增加新的系统切换，而是在当前 Base 内提供统一 Decision Surface：

- 两栏 / 三栏多 Response 横向对比
- PDF、CSV、DOCX 与图片附件内嵌预览
- 翻译、修正与结果回填
- 个人任务进度与 Next Task 导航
- 可拖拽、可隐藏、可保存的个人工作区

## 关键迭代

### 从外部翻译到 Internal-first

第一版直接接入 Google Translate，但出现延迟和内部业务文本外传风险。第二版迁移至飞书内部翻译与内部 AI，并重新规定 Prompt Boundary：待翻译的 Prompt 是“内容”，不是要被模型执行的指令。

最终形成多级路由：已有中文缓存 → 飞书内部能力 → 手动翻译 fallback，并加入预翻译、目标语言配置与人工修正。

### 从固定三栏到个人工作区

固定布局能够解决 Dola 当前流程，却难以复用。第二次迭代允许用户拖拽字段、隐藏内容、单独开关翻译、调整三栏结构并保存本地偏好，使产品从项目插件演进为可复用 Review Workspace。

### 把导航本身也当作成本

用户可以配置人员字段、分配条件与完成字段。仪表盘自动计算待做、已完成、进度和预计时间，并通过 Next Task 直接跳到下一条未完成记录。

## 我的交付

LightFlow 从问题识别、交互设计、开发、上线、说明书到后续迭代均由我独立推进，涵盖飞书 Base 插件、多记录聚合、自定义字段渲染、附件预览、Translation Routing、内部 AI 集成、本地偏好存储、任务仪表盘与 Next-task Navigation。

## 结果

- 单条 QC 耗时由约 **10 分钟降至 3–5 分钟**，下降约 50%–70%
- 约 **12 名内部 QC** 持续使用
- 在真实生产环境中运行约 **1.5 个月**
- 覆盖约 **2 期 Dola 生产 / 质检任务**

## 产品判断

AI API 能返回结果，并不代表能力已经适合生产。真正的产品化还需要明确 Prompt 边界、数据合规、延迟、缓存、失败 fallback 与人工修正。

LightFlow 最终解决的不是一个宏大的功能问题，而是重新设计人与信息之间的距离：让需要被同时理解的信息，同时出现在应该出现的位置。`,
  },
];
