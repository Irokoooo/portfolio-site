# 新对话快速衔接 Prompt

> 每次开新对话时，把下面这段 prompt 直接粘贴给 AI，它就能立刻了解所有上下文。

---

## 🚀 通用衔接 Prompt（直接复制粘贴）

```
你好！我有一个正在进行中的个人作品集网站项目，请在开始工作前先阅读以下文件了解背景：

1. `docs/ACTIVE_CONTEXT.md` — 最新工作进度和当前焦点
2. `docs/PROGRESS.md` — 所有开发任务的完成情况
3. `CLAUDE.md` — 项目核心记忆（架构、技术栈、禁止行为）

项目关键信息速览：
- 项目路径：e:\portfolio-site
- 技术栈：Next.js 14 + TypeScript + Tailwind CSS + framer-motion
- 架构：双栏 SPA（仿 Airbnb Profile），左侧固定 Sidebar + 右侧状态驱动内容区
- 本人：史心怡 / Xinyi Shi / Seraphina，国际经贸本科 + AI 工具落地，申请 Erasmus/香港/英国跨学科硕士
- 启动开发服务器：cd e:\portfolio-site && npx next dev（访问 http://localhost:3000，若端口冲突则 --port 3002）
- 注意：网络无法访问 Google Fonts，字体用系统字体栈；Next.js 配置文件是 .mjs 而非 .ts

读完文件后，告诉我你理解了哪些内容，然后问我今天想做什么。

**强制规则：每次完成任何代码改动后，必须同步更新 `docs/ACTIVE_CONTEXT.md`，记录「刚刚完成了什么」和「下一步建议」，不得遗漏。**
```

---

## 📁 项目核心文件速查（请阅读知道我们做到哪了！以及当前的文件架构！）

| 文件 | 作用 |
|------|------|
| `docs/ACTIVE_CONTEXT.md` | ★ 最新进度、已完成内容、下一步计划（每次完成后必须更新）|
| `docs/PROGRESS.md` | 所有开发任务清单（带勾选状态） |
| `CLAUDE.md` | AI 记忆文件（架构规范、禁止行为、完整目录结构）|
| `docs/PROJECT_SPEC.md` | 完整功能需求规范 |
| `docs/TECH_DECISIONS.md` | 技术选型决策记录 |

---

## 🗂️ 当前组件文件一览（截至 2026-04-04）

```
app/page.tsx                                    ← 主页（双栏 + Drill-down 导航，'use client'）
                                                  Sidebar：姓名「史心怡 / Xinyi Shi / Seraphina」
components/
├── sections/
│   ├── AboutSection.tsx                        ← 🏠 关于我
│   │                                              左侧：Bento Box（含 CoreTraitsTree 树状图）
│   │                                              右侧：PhotoPanel 大图轮播 + 底部个人宣言
│   ├── InterestsSection.tsx                    ← ❤️ 兴趣领域
│   │                                              左侧：可交互学术兴趣按钮 + 紧凑三列语言卡片
│   │                                              右侧：InterestImagePanel 联动图片（点击切换）
│   ├── CareerSection.tsx                       ← 💼 教育与经历（Master-Detail 分屏 + 横向时间轴）
│   ├── ProjectsSection.tsx                     ← 🎯 项目精选（Pill Tab + 3张学术卡含厦门国贸）
│   ├── SideWorksSection.tsx                    ← 🔧 社会实践（一级总览）
│   ├── NextDestSection.tsx                     ← ✈️ 申请规划
│   └── gallery/                                ← Side Works 二级子页面
│       ├── BusinessAnalysisGallery.tsx         ← 📊 商业分析（Server Component，读取 .md）
│       ├── BusinessAnalysisClient.tsx          ← 📊 商业分析客户端（卡片 + Drawer）
│       ├── ProductDesignGallery.tsx            ← 🎨 产品设计
│       └── AIPracticeGallery.tsx               ← 🤖 AI 工程
├── ui/
│   └── ExternalLinkButton.tsx                  ← 通用外链按钮
lib/
└── markdownLoader.ts                           ← 服务端 .md 文件读取工具
content/
└── business-analysis/                          ← 商业分析 Markdown 内容目录
    ├── index.ts                                ← 文章元数据注册
    ├── supply-chain-risk.md
    ├── miyun-rural-survey.md
    └── southeast-asia-market.md
public/
├── resume.pdf                                  ← 简历 PDF
└── photo/                                      ← ★ 照片目录（按板块命名）
    ├── about/                                  ← About Me 板块照片
    │   └── 1.jpg, 2.jpg ... 6.jpg             ←   右侧大图轮播（最多6张）
    ├── interests/                              ← Interests 板块照片
    │   ├── ai.jpg                              ←   点击"生产力重塑"时显示
    │   ├── digital.jpg                         ←   点击"数字化转型"时显示
    │   ├── psychology.jpg                      ←   点击"行为决策"时显示
    │   └── 1.jpg, 2.jpg, 3.jpg               ←   通用 fallback 图
    ├── career/                                 ← 预留（暂未使用）
    ├── projects/                               ← 预留（暂未使用）
    └── sideworks/                              ← 预留（暂未使用）
```

---

## ⚡ 常用任务 Prompt 模板

> ⚠️ **对所有 AI Agent 的强制要求：每次完成代码改动后，必须更新 `docs/ACTIVE_CONTEXT.md`。**

### 调整某个板块的内容
```
请打开 components/sections/[XXX]Section.tsx，
参考 docs/ACTIVE_CONTEXT.md 了解当前状态，
然后帮我[具体要修改的内容]。
修改完成后更新 docs/ACTIVE_CONTEXT.md。
```

### 添加新功能
```
请先阅读 docs/ACTIVE_CONTEXT.md 和 CLAUDE.md，
然后帮我实现[新功能描述]。
技术约束：使用 Tailwind CSS 类，不使用内联 style，
遵循 Notion 极简风格（低饱和度），主题色 milk-white/cream-pour/seed-shadow/leaf-green/strawberry-jam。
```

### 部署上线
```
请先阅读 docs/ACTIVE_CONTEXT.md，
然后帮我完成 Git 初始化和 Vercel 部署配置，
项目在 e:\portfolio-site。
```

### 响应式适配
```
请先阅读 docs/ACTIVE_CONTEXT.md，
当前网站是双栏架构（w-64 固定侧边栏 + flex-1 内容区），
帮我添加移动端响应式：屏幕小于 768px 时侧边栏折叠为顶部导航条。
```

---

## 📄 文档转 Markdown 工作流（最常用！）

> 当你有 Word 文档或 PDF 报告，想把它加到网站的 Gallery 板块时，使用以下 Prompt。

### 第一步：触发转换 Prompt
```
我有一份[Word文档/PDF报告]需要上传到网站，文档内容如下（或：我已将文件放在 [路径]）：

[粘贴文档内容 或 提供文件路径]

请帮我：
1. 先问我这份文档应该放入哪个 Gallery 板块（商业分析/产品设计/AI工程）
2. 根据我的回答，将文档内容转化为符合项目规范的 .md 文件
3. 将文件保存到对应目录，Gallery 会自动读取并展示
```

### 第二步：Agent 会询问你
Agent 会问：
> "这份文档放入哪个板块？
> 1. 📊 商业分析 → `content/business-analysis/`
> 2. 🎨 产品设计 → `content/product-design/`（待建）
> 3. 🤖 AI 工程 → `content/ai-practice/`（待建）"

### 第三步：Agent 自动生成 .md 文件

生成的 .md 文件格式规范如下（Agent 需遵守）：

```markdown
---
title: "从文档中提取的标题"
description: "一句话摘要（50字以内，显示在卡片预览区）"
date: "YYYY-MM"
tags: ["关键词1", "关键词2", "关键词3"]
type: "Research Report"  ← 可选值见下方
---

# 正文标题

## 项目背景（Context）
...

## 数据与方法
...

## 核心发现（Outcome）
...
```

**type 字段可选值：**
- `Research Report` — 学术/调研报告
- `Data Analysis` — 数据分析
- `Strategy Report` — 商业策略
- `Case Study` — 案例分析
- `Product Design` — 产品设计文档
- `AI Workflow` — AI 工程实践

### 当前支持的 Markdown Gallery 板块

| 板块 | 内容目录 | 是否已接入 Markdown 引擎 |
|------|----------|------------------------|
| 📊 商业分析 | `content/business-analysis/` | ✅ 已接入 |
| 🎨 产品设计 | `content/product-design/` | ⏳ 待扩展 |
| 🤖 AI 工程 | `content/ai-practice/` | ⏳ 待扩展 |

> 若目标板块尚未接入 Markdown 引擎，Agent 会自动帮你扩展。

### 注意事项
- 文档内容可以直接**粘贴文字**给 Agent，不需要上传文件本身
- Agent 会自动处理格式转换（Word 段落 → Markdown 标题/列表/表格）
- 文件名会根据标题自动生成（英文小写 + 连字符，如 `market-entry-strategy.md`）
- 保存后**无需重启开发服务器**，刷新页面即可看到新卡片

---

## 🖼️ 照片上传指南

将照片直接放入对应文件夹，代码**自动检测**：

| 板块 | 文件路径 | 命名规则 | 效果 |
|------|---------|---------|------|
| About Me 右侧大图 | `public/photo/about/` | `1.jpg`, `2.jpg` ... `6.jpg` | 自动轮播，可左右切换 |
| Interests AI 主题图 | `public/photo/interests/ai.jpg` | 固定文件名 | 点击"生产力重塑"显示 |
| Interests 数字化图 | `public/photo/interests/digital.jpg` | 固定文件名 | 点击"数字化转型"显示 |
| Interests 行为决策图 | `public/photo/interests/psychology.jpg` | 固定文件名 | 点击"行为决策"显示 |
| Interests 通用 fallback | `public/photo/interests/` | `1.jpg`, `2.jpg`, `3.jpg` | 无主题图时显示 |

> 图片不存在时显示优雅占位框，不会报错。
