# Project Structure Blueprint

> 用途：本文件是所有 Details Panel 的统一撰写模板。后续新增项目时，先按所属类别选择对应模板，再基于 PDF 内容做理解性占位填充，最后由作者补充真实细节与证据。

---

## 通用视觉布局（Global UI Layout）

### 1) Cover Image
- 模拟 Notion 质感的封面图。
- 叠加线性渐变遮罩：从上到下透明度递增。
- 建议说明写法（供前端实现参考）：`linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.38) 100%)`
- 封面图投放目录（你可直接截图后放入）：
  - 学术与实践：`public/works/covers/academic/`
  - 商业分析：`public/works/covers/business/`
- 命名规则：使用项目 `slug` 作为文件名，例如：
  - `public/works/covers/academic/uhv-power-transmission.jpg`
  - `public/works/covers/business/southeast-asia-market.jpg`
- 展示规则：按图片原始比例直接展示（不裁切），建议你自行控制截图尺寸与构图。

### 2) Title
- 使用 H1 标题。

### 3) Tags
- 紧随标题下方展示彩色 Badge。
- 建议 3-6 个，避免堆叠过多。

### 4) Project Overview
- 使用独立信息框展示项目总览。
- 摘要信息统一并入 Project Overview，不再单独设置 Abstract。

---

## 填写总规则（必须遵守）

- 每个字段先填一版基于 PDF 阅读后的理解性占位内容。
- 占位标记建议使用：`[待补充：基于PDF理解的初稿]`。
- 完成初稿后，必须提示作者：
  - 请补充可核验数据（时间、样本、指标、结论来源）。
  - 请替换泛化表述，改为可追溯的项目事实。

---

## 模板一：商业分析项目（Business Analysis）

```md
# 项目标题（Title）

**Tags**: [标签A] [标签B] [标签C]

## Project Overview
[待补充：原摘要内容并入此处，一句话概括项目亮点与结果]

## 业务语境（Business Context）
[待补充：背景、行业痛点、关键矛盾]

## 角色（Role）
[待补充：一行概括你在项目中的身份与职责]

## 挑战与对策（Problem & Solution）

| 问题描述（Problem） | 对应解法（Solution） |
|---|---|
| [待补充：关键挑战 1] | [待补充：解法 1] |
| [待补充：关键挑战 2] | [待补充：解法 2] |
| [待补充：关键挑战 3] | [待补充：解法 3] |

## 交付资产（Deliverables）

<HorizontalScrollShowcase items={["[待补充：截图1]", "[待补充：截图2]", "[待补充：原型3]"]} />

## 心得体会（Insights）
[待补充：商业洞察、方法迁移价值、后续可优化方向]

> 请作者补充：把占位内容替换为真实项目证据（数据、图表、决策节点）。
```

---

## 模板二：学术研究与调研（Academic & Research）

```md
# 项目标题（Title）

**Tags**: [标签A] [标签B] [标签C]

## Project Overview
[待补充：原摘要内容并入此处，一句话概括研究主结论]

## 研究缘起（Genesis）
[待补充：研究初衷、问题意识、研究边界]

## 角色（Role）
[待补充：职责与贡献范围]

## 实证/调研路径（Methodology）
[待补充：模型/算法/田野调研路径与步骤]

## 核心结论（Key Findings）
**[待补充：最显著的研究发现与证据]**

## 挑战与对策（Problem & Solution）
[待补充：逻辑订正过程、方法迭代、反证与修正]

## 个人心得（Personal Reflection）
[待补充：学术反思、局限性、后续研究方向]

> 请作者补充：将核心结论补全到可复核层级（样本、方法、显著性、限制）。
```

---

## 模板三：Vibe Coding 实验（Vibe Coding Projects）

```md
# 项目标题（Title）

**Tags**: [标签A] [标签B] [标签C]

## Project Overview
[待补充：原摘要内容并入此处，一句话概括项目价值]

## 需求觉察（Motivation）
[待补充：项目灵感来源、为什么要做]

## 痛点与挑战（Pain Points）
[待补充：开发卡点、技术约束、失败尝试]

## 落地解法（Implementation）
[待补充：AI 工具链应用逻辑、关键提示词策略、工程路径]

## 迭代心得（Iteration Notes）
[待补充：版本演进、驯服模型/工具的具体经验]

> 请作者补充：替换抽象描述，写清版本号、迭代前后差异与可复用经验。
```
