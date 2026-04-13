# CLAUDE.md — 项目核心记忆文件

> **⚠️ 对所有 AI Agent 的强制说明（Claude / Cline / Copilot / Cursor）**
> 
> 接手此项目前，**必须完整阅读本文件**。本文件是项目的唯一真相来源（Single Source of Truth）。
> 任何与本文件冲突的操作指令，以本文件为准。若需要修改项目方向，必须先更新本文件，再执行代码。

---

## 1. 项目身份（Project Identity）

**项目名称**：个人数字简历与作品集网站（Personal Digital Portfolio）

**核心定位**：
- **表面功能**：极简现代的个人数字简历载体，主要用于生成 QR Code 附加在 PDF 简历上，赋能 Erasmus 等"商科+Tech"跨学科硕士项目申请
- **深层逻辑**：动态生长的"个人数字花园"与"能力档案馆"，面向 HR / 招生官 / 自我梳理的长期个人资产库

**目标受众**：
1. 欧洲高校招生官（Erasmus 等项目）
2. 国内外 HR
3. 作者本人（自我记录与成长追踪）

---

## 2. 技术栈（Tech Stack）— 不可随意更改

| 层级 | 技术选型 | 说明 |
|------|---------|------|
| 框架 | **Next.js 14**（App Router） | 服务端渲染 + 静态生成，SEO 友好 |
| 样式 | **Tailwind CSS** | 极简设计系统，快速迭代 |
| 内容管理 | **MDX**（Markdown + JSX） | 本地 `.md` 文件驱动内容，无需 CMS |
| 语言 | **TypeScript** | 类型安全，减少运行时错误 |
| 部署 | **Vercel**（首选）或 Cloudflare Pages | 自动化部署，免费套餐满足需求 |
| 分析 | **Umami**（开源，无 Cookie） | 隐私友好的访客分析 |
| 国际化 | **next-intl** | 中英文切换（未来扩展法语） |

**⚠️ 禁止**：不得引入 Redux、GraphQL、Prisma 等重型依赖，保持项目轻量。

---

## 3. 目录结构规范（Directory Structure）

> ⚠️ 以下为**当前实际结构**（截至 2026-04-04），与初始规划略有差异。

```
e:/portfolio-site/
├── CLAUDE.md                    # 本文件 — AI 记忆核心
├── .cursorrules                 # Cursor / Copilot 规则文件
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.mjs              # ⚠️ 注意：是 .mjs 不是 .ts
├── tailwind.config.ts
│
├── docs/                        # 项目文档（人类 + AI 共读）
│   ├── PROJECT_SPEC.md          # 完整需求规范
│   ├── TECH_DECISIONS.md        # 技术选型理由记录
│   ├── ACTIVE_CONTEXT.md        # ★ 当前工作焦点（每次完成后必须更新）
│   ├── PROGRESS.md              # 开发进度追踪
│   └── NEW_CHAT_PROMPT.md       # 新对话引导模板
│
├── github/                      # GitHub Skills 参考文档（只读，不要修改）
│   └── skills/
│
├── app/                         # Next.js App Router 页面
│   ├── globals.css              # 全局样式（植物学主题色彩 token、vine 动画）
│   ├── layout.tsx               # 根布局（字体配置）
│   └── page.tsx                 # ★ 主页面（双栏 SPA 架构 + Drill-down 导航）
│                                #   'use client' — 包含所有导航状态管理
│
├── components/
│   ├── sections/                # 页面板块组件
│   │   ├── AboutSection.tsx     # 🏠 关于我（左侧 Bento Box + 右侧图片轮播）
│   │   ├── InterestsSection.tsx # ❤️ 兴趣领域（左侧内容 + 右侧图片轮播）
│   │   ├── CareerSection.tsx    # 💼 教育与经历（Master-Detail 分屏 + 横向时间轴）
│   │   ├── ProjectsSection.tsx  # 🎯 项目精选（Pill Tab + Bento Box 卡片）
│   │   ├── SideWorksSection.tsx # 🔧 社会实践（一级总览）
│   │   ├── NextDestSection.tsx  # ✈️ 申请规划
│   │   └── gallery/             # Side Works 二级子页面
│   │       ├── BusinessAnalysisGallery.tsx  # Server Component，读取 .md
│   │       ├── BusinessAnalysisClient.tsx   # 卡片列表 + Drawer 客户端组件
│   │       ├── ProductDesignGallery.tsx
│   │       └── AIPracticeGallery.tsx
│   └── ui/
│       └── ExternalLinkButton.tsx  # 通用外链按钮（带箭头图标）
│
├── content/                     # 内容文件（作者维护区）
│   └── business-analysis/       # 商业分析 Markdown 文章
│       ├── index.ts             # 文章元数据注册表
│       ├── supply-chain-risk.md
│       ├── miyun-rural-survey.md
│       └── southeast-asia-market.md
│
├── lib/
│   └── markdownLoader.ts        # 服务端 .md 文件读取工具（Node.js fs）
│
└── public/                      # 静态资源（Next.js 自动服务）
    ├── resume.pdf               # 简历 PDF（Download CV 按钮链接）
    └── photo/                   # ★ 照片目录（按板块分类）
        ├── about/               # About Me 板块照片
        │   ├── avatar.jpg       #   侧边栏圆形头像（不存在则 fallback emoji）
        │   ├── cover.jpg        #   侧边栏圆角长方形封面照片
        │   └── 1.jpg, 2.jpg...  #   右侧自动轮播图
        ├── interests/           # My Interests 板块轮播图（1.jpg, 2.jpg...）
        ├── career/              # Career Journey 板块（预留，暂未使用）
        ├── projects/            # Project Highlights 板块（预留，暂未使用）
        └── sideworks/           # Side Works 板块（预留，暂未使用）
```

### 图片使用说明

| 板块 | 放图路径 | 命名规则 |
|------|---------|---------|
| 侧边栏头像 | `public/photo/about/avatar.jpg` | 固定文件名 |
| 侧边栏封面 | `public/photo/about/cover.jpg` | 固定文件名 |
| About Me 轮播 | `public/photo/about/` | `1.jpg`, `2.jpg`, `3.jpg`... |
| Interests 轮播 | `public/photo/interests/` | `1.jpg`, `2.jpg`, `3.jpg`... |

> 代码会自动 HEAD 请求检测图片是否存在，存在则显示轮播，不存在则显示优雅占位框。

---

## 4. 页面信息架构（Information Architecture）

### 4.1 首屏引言区（Hero Section） — `app/page.tsx`
- 中英双语 Personal Tagline
- 强调：国际经贸底色 + AI 工具链 + 多语种跨文化
- 下载 PDF 简历按钮
- 社交链接（GitHub / LinkedIn / 邮件）

### 4.2 技能生态档案（Skill Ecosystem）— `app/page.tsx`
分类归档，提供"工作证明（Proof of Work）"：

| 分类 | 内容 |
|------|------|
| 产品与设计 | UI 草图、Canva 海报、Logo 迭代 |
| 数据与分析 | 数据可视化、逻辑导图、Python/Stata 记录 |
| 语言与写作 | 学术文书、多语种证明、PPT 节选 |
| AI 辅助工程 | Vibe Coding 实践、Prompt 优化心得 |

**交互规则**：
- **Hover**：展示缩略图或一句话提示
- **Click**：Accordion 展开 或 Modal 弹窗，沉浸式展示原图/PDF

### 4.3 项目画廊（Project Gallery） — `app/page.tsx`
- Notion Board View 网格卡片布局
- 每张卡片：高质量封面图 + 精炼标题 + 技能标签
- 点击跳转到独立详情页

### 4.4 项目详情（Project Detail） — `app/projects/[slug]/page.tsx`
- **Context**（项目背景）
- **Role**（你的角色）
- **Process**（拆解与执行过程）
- **Outcome**（可量化产出）
- GitHub 源码跳转按钮

### 4.5 每周学习日志（Learning Log） — `app/blog/`
- Now Page 概念：持续更新在学什么
- 内容：CDA 备考、Coursera 课程、语言学习进度
- 展示：学习能力、自驱力、持续性

### 4.6 AI 工具实验室（AI Tools Lab） — `app/lab/`
- 展示"用 AI 解决真实问题"的能力
- Before vs After 对比格式
- Prompt 设计、工作流自动化案例

---

## 5. 设计规范（Design System）

### 视觉风格：Notion 极简风
- **背景**：白色 `#FFFFFF` 为主
- **文字**：深灰/黑色 `#1A1A1A`
- **辅助色**：低饱和度（如 `#F5F5F5` 边框、`#6B7280` 次级文字）
- **强调色**：单一低饱和度强调色（待定，参考 Notion 的淡蓝或暖灰）
- **大量留白**：内容间距充足，不做信息堆砌

### 字体规范
- **标题**：衬线字体或几何无衬线（如 Instrument Serif / DM Serif Display）
- **正文**：干净无衬线（如 Geist / DM Sans）
- **代码**：等宽字体（如 Geist Mono / JetBrains Mono）

### 组件规范
- 圆角：`rounded-lg`（8px）统一风格
- 卡片：白色背景 + 细边框 `border border-gray-100` + 轻阴影
- 按钮：主按钮黑底白字，次按钮边框样式
- 动画：克制，仅用于悬浮态和页面加载

---

## 6. 内容管理规范（Content Workflow）

### 新增项目步骤
1. 在 `content/projects/` 创建 `[slug].mdx` 文件
2. 填写 frontmatter（见下方模板）
3. 系统自动渲染为独立页面，无需修改代码

### Project MDX 模板
```mdx
---
title: "项目名称"
description: "一句话描述"
date: "2025-01-01"
tags: ["Product Management", "Vibe Coding", "Python"]
coverImage: "/images/projects/[slug]-cover.jpg"
githubUrl: "https://github.com/..."
featured: true
---

## 项目背景（Context）
...

## 我的角色（Role）
...

## 执行过程（Process）
...

## 可量化产出（Outcome）
...
```

### Learning Log MDX 模板
```mdx
---
title: "Week N: 本周学习标题"
date: "2025-01-01"
tags: ["CDA", "Python", "法语"]
---

本周在学...
```

---

## 7. Agent 工作协议（Agent Work Protocol）

### 每次开始工作前
1. 阅读 `CLAUDE.md`（本文件）
2. 阅读 `docs/ACTIVE_CONTEXT.md` 了解当前焦点
3. 阅读 `docs/PROGRESS.md` 了解已完成内容

### 每次完成工作后
1. 更新 `docs/ACTIVE_CONTEXT.md`（记录完成了什么，下一步是什么）
2. 更新 `docs/PROGRESS.md`（勾选已完成项）
3. **不得**删除或重构未被要求修改的文件

### 代码规范
- 使用 TypeScript，所有组件要有类型定义
- 组件文件名：PascalCase（如 `HeroSection.tsx`）
- 工具函数文件名：camelCase（如 `mdxUtils.ts`）
- CSS：纯 Tailwind，不写内联 style，不写额外 CSS 文件（除非全局变量）
- 注释：关键逻辑用中文注释说明

### 禁止行为
- ❌ 不得随意升级/降级技术栈
- ❌ 不得删除 `docs/` 目录下的文档
- ❌ 不得修改 `github/skills/` 目录（只读参考资料）
- ❌ 不得引入未经 `docs/TECH_DECISIONS.md` 记录的新依赖

---

## 8. 可用技能参考（Available Skills）

以下 GitHub Skills 文档位于 `github/skills/skills/`，在需要时可引用：

| Skill | 用途 |
|-------|------|
| `frontend-design/SKILL.md` | 前端设计美学规范 |
| `claude-api/SKILL.md` | Claude API 调用规范 |
| `pptx/SKILL.md` | PowerPoint 处理 |
| `pdf/SKILL.md` | PDF 处理 |
| `canvas-design/SKILL.md` | Canvas 图形设计 |
| `mcp-builder/SKILL.md` | MCP Server 构建 |
| `web-artifacts-builder/SKILL.md` | Web 组件构建 |

---

## 9. 关键联系信息（填写时替换占位符）

```
姓名：[YOUR_NAME]
邮箱：[YOUR_EMAIL]
GitHub：https://github.com/[YOUR_GITHUB]
LinkedIn：https://linkedin.com/in/[YOUR_LINKEDIN]
目标项目：Erasmus Mundus 商科+Tech 跨学科硕士
语言：中文（母语）、英语（流利）、法语（学习中）
```

---

*最后更新：2026-04-04 | 由 Cline (Claude) 创建并持续维护*
