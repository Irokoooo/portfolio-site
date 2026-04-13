# GitHub Copilot 项目指令

> 本文件由 GitHub Copilot 自动读取，为 AI 辅助编程提供项目上下文。
> 等效于 spec-kit 的 `specify-rules.md` 文件。

---

## 项目概述

这是一个**个人数字作品集网站**，基于 Next.js 14 + Tailwind CSS + MDX 构建。
核心目标：生成 QR Code 用于 Erasmus 等"商科+Tech"跨学科硕士项目申请。

完整规范请阅读：`CLAUDE.md`（项目核心记忆文件）

---

## 技术栈（必须遵守）

- **框架**：Next.js 14，App Router（非 Pages Router）
- **样式**：Tailwind CSS，禁止内联 style
- **语言**：TypeScript，所有文件 `.ts` / `.tsx`
- **内容**：MDX，`gray-matter` 解析 frontmatter

## 禁止使用

- Redux、Zustand、GraphQL
- Material UI、Ant Design、Chakra UI
- Inter、Roboto、Arial 字体（用 Instrument Serif + Geist 替代）
- 紫色渐变配色（典型 AI 生成风格）
- 额外 `.css` / `.scss` 文件（除 `globals.css`）

---

## 代码规范

### 文件命名
- React 组件：`PascalCase.tsx`（如 `HeroSection.tsx`）
- 工具函数：`camelCase.ts`（如 `mdxUtils.ts`）

### 组件模板
```typescript
// 组件功能的一行中文说明
interface ComponentProps {
  // 必须有明确的 TypeScript 类型定义
}

export function ComponentName({ prop }: ComponentProps) {
  return <div>...</div>;
}
```

### Server vs Client
- 默认 Server Components（无 `'use client'`）
- 只有需要 Hooks / 事件监听 / 浏览器 API 时才加 `'use client'`

---

## 设计系统

### Notion 极简风格
- 背景：`bg-white`
- 文字：`text-gray-900`
- 边框：`border border-gray-100`
- 留白：`py-16` / `py-24`

### 字体
- 标题：`font-serif`（Instrument Serif）
- 正文：`font-sans`（Geist Sans）
- 代码：`font-mono`（Geist Mono）

---

## 目录结构

```
app/           → Next.js 页面（App Router）
components/
  ui/          → 基础 UI 组件（无业务逻辑）
  sections/    → 页面区块
  layout/      → Navbar、Footer
content/       → MDX 内容文件（作者维护）
lib/           → 工具函数
public/        → 静态资源
docs/          → 项目文档（不要修改）
github/        → GitHub Skills 参考（学习）
```

---

## 每次完成工作后

1. 更新 `docs/ACTIVE_CONTEXT.md` — 记录完成了什么、下一步是什么
2. 更新 `docs/PROGRESS.md` — 勾选已完成项
