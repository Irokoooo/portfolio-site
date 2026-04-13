# 素材下载清单 · ASSETS_NEEDED.md

> 整理时间：2026-04-06
> 本文件列出所有建议下载的素材，按优先级排序。
> 下载完成后请按照「存放路径」放置，代码已写好自动加载逻辑。

---

## 🔴 优先级 1 — 必须有，否则区域显示为空

### 1. 个人照片（About Me 轮播）

| 文件名 | 说明 | 存放路径 |
|--------|------|---------|
| `1.jpg` ~ `6.jpg` | 个人生活/工作照，任意比例，代码自动 object-cover | `public/photo/about/` |
| `avatar.jpg` | 圆形头像（建议正方形，至少 200×200px） | `public/photo/about/` |
| `cover.jpg` | 侧边栏封面竖图（建议 2:3 比例） | `public/photo/about/` |

### 2. 爱好照片（Interests — Moments 轮播）

| 文件名 | 对应爱好 | 存放路径 |
|--------|---------|---------|
| `craft.jpg` | 手工串珠/编绳 | `public/photo/hobbies/` |
| `hardware.jpg` | 硬件拼装/电焊 | `public/photo/hobbies/` |
| `sport.jpg` | 健身/羽毛球 | `public/photo/hobbies/` |
| `explore.jpg` | 探索跨界/旅行 | `public/photo/hobbies/` |
| `reading.jpg` | 阅读/语言学习 | `public/photo/hobbies/` |
| `coding.jpg` | Vibe Coding | `public/photo/hobbies/` |
| `pkm.jpg` | 知识整理/Obsidian | `public/photo/hobbies/` |

---

## 🟡 优先级 2 — 书架笔记图（书架功能核心）

点击书脊弹出 Modal 后，这里放你的读书笔记截图。
路径格式：`public/photo/interests/books/[书本ID]/note[序号].jpg`

| 书本 | ID | 建议内容 |
|------|----|---------|
| 思考，快与慢 | `book1` | Obsidian/Notion 笔记截图，或手写笔记照片 |
| 穷查理宝典 | `book2` | 同上 |
| 置身事内 | `book3` | 同上 |
| 人类简史 | `book4` | 同上 |
| 增长黑客 | `book5` | 同上 |
| The Mom Test | `book6` | 同上 |
| 结构思考力 | `book7` | 同上 |
| 纳瓦尔宝典 | `book8` | 同上 |
| 被讨厌的勇气 | `book9` | 同上 |
| 清醒思考的艺术 | `book10` | 同上 |
| Inspired | `book11` | 同上 |
| 原则 | `book12` | 同上 |
| 自控力 | `book13` | 同上 |
| Zero to One | `book14` | 同上 |
| 非暴力沟通 | `book15` | 同上 |
| 高效能人士的七个习惯 | `book16` | 同上 |

每本书最多可放 5 张笔记图（note1.jpg ~ note5.jpg），放几张都行。

---

## 🟢 优先级 3 — 视觉装饰素材（已有代码引用，素材缺失时静默跳过）

### 3.1 爱好泡泡图标（SVG 线稿图标）

> **不需要下载图片素材** — 目前泡泡图用纯色块 + 文字展示，效果已经完整。
> 如果你想升级为带图标的泡泡，可以用 Heroicons 或 Phosphor Icons（网页版直接复制 SVG path），不需要下载文件。
>
> 推荐来源：
> - **Heroicons**：https://heroicons.com（MIT 开源，Next.js 官方同团队出品）
> - **Phosphor Icons**：https://phosphoricons.com（风格更丰富，有线稿/填充/粗细多版本）
>
> 使用方式：在网站上找到对应图标 → 点击 Copy SVG → 直接粘贴进代码即可。

### 3.2 页面装饰素材（已有代码引用，缺失时不报错）

这些素材放在 `public/assets/decorations/`，代码已经写好加载逻辑，但素材缺失时会静默跳过（不影响整体）。

| 文件名 | 用途 | 推荐来源 |
|--------|------|---------|
| `vine-left.png` | 侧边栏左上角藤蔓装饰 | Freepik / Unsplash（搜 "botanical vine PNG transparent"） |
| `vine-right.png` | About Me 卡片右下角藤蔓 | 同上 |
| `gold-foil.png` | About Me 卡片右上角金箔点缀 | Freepik（搜 "gold foil texture PNG"） |
| `ornament-divider.svg` | 页面分割花纹（标题下方） | The Noun Project / Freepik（搜 "ornament divider SVG"） |
| `signature.svg` | 侧边栏底部花体签名 | 用 [Calligrapher.ai](https://www.calligrapher.ai) 生成，下载 SVG |

### 3.3 简历 PDF

| 文件名 | 存放路径 | 说明 |
|--------|---------|------|
| `resume.pdf` | `public/` | "Download CV" 按钮直接链接此文件 |

---

## 📦 素材下载推荐来源汇总

| 来源 | 适合类型 | 免费？ |
|------|---------|-------|
| [Freepik](https://freepik.com) | 装饰图形、PNG 透明素材 | 有免费额度，需注明来源 |
| [Unsplash](https://unsplash.com) | 高质量照片 | 完全免费 |
| [Heroicons](https://heroicons.com) | SVG 线稿图标 | MIT 完全免费 |
| [Phosphor Icons](https://phosphoricons.com) | SVG 图标（风格更丰富） | MIT 完全免费 |
| [The Noun Project](https://thenounproject.com) | 各类图标/插画 | 有免费额度 |
| [Calligrapher.ai](https://www.calligrapher.ai) | 手写花体签名 SVG | 完全免费 |
| [LottieFiles](https://lottiefiles.com) | 动画 JSON（如书本翻页） | 部分免费 |

---

## ✅ 当前已经不需要额外素材的功能

以下功能已用纯代码实现，**不需要任何外部素材**：

- 书架 3D 书脊（纯 CSS + SVG）
- 台灯交互（纯 SVG，内置开关动画）
- 泡泡图（纯 CSS 圆形）
- Core Traits 树状生长动画（纯 Framer Motion）
- 弹幕问句效果（纯 CSS marquee + React state）
- Ken Burns 照片效果（纯 Framer Motion）
- Notion 风 Modal（纯 CSS 毛玻璃）
