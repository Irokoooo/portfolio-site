# TECH_DECISIONS.md — 技术选型决策记录

> **用途**：记录每一个重要技术选型的决策理由与权衡考量。
> 新引入任何依赖前，必须在本文件中添加记录。
> AI Agent 不得擅自引入未记录的重大依赖。

---

## 决策记录格式

```
## [决策编号] 技术名称
- 决策时间：YYYY-MM-DD
- 决策者：作者 / Agent
- 状态：✅ 已采用 | ⏳ 评估中 | ❌ 已放弃

### 选择了什么
### 为什么选它（优势）
### 放弃了什么（备选方案）
### 潜在风险与缓解策略
```

---

## TD-001：框架选择 — Next.js 14 (App Router)

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 选择了什么
Next.js 14，使用 App Router（非旧版 Pages Router）。

### 为什么选它
1. **SSG + SSR 混合渲染**：静态页面（项目详情、博客）用 SSG 预生成，SEO 友好；动态内容可用 SSR
2. **MDX 原生支持**：`@next/mdx` 可以直接渲染 Markdown 内容，内容管理极其轻量
3. **Vercel 原生集成**：部署零配置，Preview Deployment 便于查看修改效果
4. **生态成熟**：社区资源丰富，AI 工具训练数据充足，Vibe Coding 场景下 AI 生成代码质量高
5. **TypeScript 一等支持**：类型检查开箱即用
6. **Image 组件**：自动图片优化，WebP 转换，懒加载

### 放弃了什么
- **Astro**：内容站点更轻量，但 React 组件兼容性略差，社区相对小
- **Gatsby**：GraphQL 层过于复杂，不符合"保持轻量"原则
- **Nuxt（Vue）**：团队熟悉度低，AI 代码生成质量不如 React 生态
- **纯 HTML/CSS**：扩展性差，无法实现动态路由和 MDX 内容管理

### 潜在风险与缓解
- **风险**：App Router 仍相对新，部分第三方库兼容性问题
- **缓解**：尽量使用 Server Components，减少客户端 JS；遇到不兼容库加 `'use client'` 标记

---

## TD-002：样式方案 — Tailwind CSS

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 选择了什么
Tailwind CSS v3，配合自定义设计 Token（颜色、字体、间距）。

### 为什么选它
1. **快速迭代**：原子化 CSS 类，无需在 CSS 文件和组件间来回切换
2. **设计系统内置**：`tailwind.config.ts` 集中管理设计变量，保持视觉一致性
3. **零运行时**：编译时 PurgeCSS 删除未用样式，最终 CSS 体积极小
4. **AI 友好**：Tailwind 类名直观，AI 生成的 Tailwind 代码准确率高
5. **响应式直观**：`md:` `lg:` 前缀使响应式断点一目了然

### 放弃了什么
- **CSS Modules**：仍需写 CSS，切换成本高
- **Styled Components / Emotion**：运行时开销，SSR 配置复杂
- **Vanilla CSS**：维护成本高，没有设计约束

### 潜在风险与缓解
- **风险**：类名堆砌导致 HTML 可读性差
- **缓解**：复杂组件抽取为 React 组件，避免超长 className 字符串

---

## TD-003：内容管理 — MDX（本地文件驱动）

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 选择了什么
本地 `.mdx` 文件作为内容源，使用 `contentlayer2` 或 `next-mdx-remote` 解析，`gray-matter` 提取 frontmatter。

**技术细节**：
- 内容文件存放在 `content/` 目录
- Frontmatter 提供元数据（标题、日期、标签、封面图等）
- MDX 支持在 Markdown 中嵌入自定义 React 组件

### 为什么选它
1. **零维护成本**：无需数据库、无需后端、无需 CMS 账号
2. **Git 版本控制**：内容变更有完整历史记录
3. **写作体验好**：在本地编辑器（VS Code）写 Markdown，熟悉且高效
4. **自动化部署**：推送到 GitHub 自动触发 Vercel 重新构建
5. **AI 辅助内容创作**：AI 可直接生成 MDX 格式内容

### 放弃了什么
- **Notion as CMS**：需要付费 API、有速率限制、内容与代码分离
- **Contentful / Sanity**：免费套餐有限制，学习成本高，增加外部依赖
- **数据库（PostgreSQL/SQLite）**：完全不必要，过度工程化

### 潜在风险与缓解
- **风险**：内容很多时构建时间变长
- **缓解**：Next.js ISR（增量静态再生成）可以只重新构建变更的页面

---

## TD-004：部署方案 — Vercel

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 选择了什么
Vercel Hobby Plan（免费套餐）。

### 为什么选它
1. **Next.js 原生**：Vercel 是 Next.js 的创建者，零配置部署
2. **自动 Preview**：每个 PR/Push 自动生成预览链接，方便检查效果
3. **全球 CDN**：边缘节点分发，中国大陆访问速度尚可（若不需要国内访问可忽略）
4. **免费额度充足**：个人项目完全够用
5. **域名绑定简单**：支持自定义域名，一键 SSL

### 放弃了什么
- **Cloudflare Pages**：速度可能更快，但 Next.js 支持有限制（部分 Edge Runtime 功能）
- **GitHub Pages**：不支持 Next.js SSR，只能做纯静态
- **Netlify**：功能类似 Vercel，但 Next.js 支持不如 Vercel 原生

### 备选方案
若未来需要更好的中国大陆访问速度，可迁移到 Cloudflare Pages 并使用纯静态导出模式。

---

## TD-005：访客分析 — Umami

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：⏳ 评估中（待项目上线后接入）

### 选择了什么
[Umami](https://umami.is/) — 开源、隐私友好、无 Cookie 的网站分析工具。

### 为什么选它
1. **隐私合规**：GDPR 友好，无 Cookie，无需弹出隐私声明
2. **开源免费**：Umami Cloud 提供免费套餐（10万月浏览量）
3. **数据自主**：可自部署，数据完全掌控
4. **轻量**：脚本体积 < 2KB，不影响页面性能
5. **实用数据**：页面浏览量、访客来源、设备类型——够用就好

### 放弃了什么
- **Google Analytics**：需要 Cookie 同意、数据被 Google 收集、过于复杂
- **Plausible**：功能类似，但免费套餐限制更严格
- **Vercel Analytics**：与 Vercel 平台绑定，灵活性低

---

## TD-006：国际化 — next-intl

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 选择了什么
`next-intl` 库，配合 Next.js App Router。

### 为什么选它
1. **App Router 原生支持**：专为 Next.js App Router 设计，Server Components 友好
2. **类型安全**：翻译键值有 TypeScript 类型推断，减少拼写错误
3. **URL 路由**：`/zh/`、`/en/` 路径前缀，SEO 友好
4. **简单轻量**：API 直观，学习成本低

### 放弃了什么
- **react-i18next**：需要 Client Component，App Router 下配置复杂
- **next-i18n-router**：功能较少，社区维护较少

### 实施策略
- 第一版先做中英双语
- 翻译文件放在 `messages/zh.json` 和 `messages/en.json`
- 法语作为未来扩展（`messages/fr.json`）

---

## TD-007：字体方案 — next/font + Google Fonts

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 选择了什么
- **标题字体**：`Instrument Serif`（衬线，优雅文艺）
- **正文字体**：`Geist Sans`（Vercel 出品，极简无衬线）
- **代码字体**：`Geist Mono`（等宽，一致性）

通过 `next/font/google` 自动优化加载（子集提取、字体预加载、零布局抖动）。

### 为什么这套搭配
- `Instrument Serif` 有独特的艺术气质，与"商科+Tech 跨界"的个人品牌契合
- `Geist` 系列是 Vercel 为开发者设计的字体，现代、可读性强
- 衬线+无衬线的经典搭配，既有人文气息又有技术感

### 禁止使用
根据 `frontend-design/SKILL.md` 规范，**禁止使用以下"AI 滥用"字体**：
- ❌ Inter
- ❌ Roboto
- ❌ Arial
- ❌ Space Grotesk（过于常见）

---

## TD-008：组件库策略 — 不引入第三方 UI 库

- **决策时间**：2026-04-03
- **决策者**：作者
- **状态**：✅ 已采用

### 决策
**不引入** Material UI、Ant Design、Chakra UI 等重型 UI 库。

所有组件从零开始手写（基于 Tailwind CSS），可以按需引入：
- `@radix-ui/react-dialog` — Modal 弹窗原语（无样式、无障碍）
- `@radix-ui/react-accordion` — Accordion 原语
- `framer-motion` — 动画（如需复杂动画效果）

### 为什么这样
1. **视觉控制**：第三方 UI 库自带风格，难以实现完全自定义的 Notion 极简风
2. **体积控制**：Material UI 等库体积动辄 100KB+，严重影响加载速度
3. **学习资产**：手写组件是真实的能力证明，本身就是 Proof of Work

---

## 待评估技术

| 技术 | 用途 | 优先级 | 状态 |
|------|------|-------|------|
| `react-pdf` | 在 Modal 中预览 PDF 文件 | 中 | ⏳ 评估中 |
| `sharp` | 服务端图片处理（生成 OG 图） | 低 | ⏳ 评估中 |
| `qrcode` | 生成指向本站的 QR Code | 高 | ⏳ 评估中 |
| `rehype-pretty-code` | 代码块语法高亮 | 中 | ⏳ 评估中 |

---

*最后更新：2026-04-03 | 由 Cline (Claude) 创建*
