# 素材采购清单 · Asset Shopping List

> 面向"典雅欧式手稿"风格，按优先级排序。  
> 所有素材放入 `public/assets/` 对应子目录，按下方**文件名**命名，Claude 可直接识别并接入代码。

---

## 🗂️ 文件夹总览

```
public/assets/
├── textures/      ← 纸张、羊皮纸等背景纹理
├── cursors/       ← 自定义光标文件
├── decorations/   ← 花纹、藤蔓、金箔等装饰性素材
└── icons/         ← 时间轴节点图标、徽章等
```

---

## 优先级 1 — 必备素材（视觉影响最大）

### 🟠 1. 羊皮纸背景纹理（全局 + 面板）

| 项目 | 要求 |
|------|------|
| **用途** | 全站背景 / CareerSection 右侧 DetailPanel（`.paper-panel`）/ Drawer 抽屉背景 |
| **格式** | JPG（无需透明背景，越真实越好） |
| **尺寸** | 建议 **1200×900px**（会被 `background-size: cover` 自动平铺） |
| **风格** | 米黄/象牙色、有纸纤维细节、轻微污渍或做旧感、无文字 |
| **保存路径** | `public/assets/textures/parchment.jpg` |
| **接入方式** | 取消 `globals.css` 中 `.paper-panel` 注释行即可启用 |

---

### 🖱️ 2. 古典羽毛笔光标

| 项目 | 要求 |
|------|------|
| **用途** | 替换全站 CSS 光标（替换 `globals.css` 中 `cursor: url(...)` 的 SVG 数据） |
| **格式** | **SVG**（透明背景，矢量，放大不失真）或 `.cur` / `.png` (32×32px) |
| **尺寸** | SVG 推荐 **32×32px** viewBox |
| **风格** | 古典羽毛笔 (quill pen)，笔尖朝右下角，黑色/深棕色线条，无填充色 |
| **保存路径** | `public/assets/cursors/quill.svg` |
| **接入方式** | 将 `globals.css` 的 `cursor:` 值改为 `url('/assets/cursors/quill.svg') 0 32, auto` |

---

## 优先级 2 — 重要素材（显著提升品质）

### 🌿 3. 植物藤蔓装饰（页面角落/分割线）

| 项目 | 要求 |
|------|------|
| **用途** | Sidebar 顶部/底部装饰、分割线旁装饰、AboutSection 角落点缀 |
| **格式** | **SVG**（**必须透明背景**，便于叠加在任意底色上） |
| **尺寸** | 建议 **400×200px**（宽型），用于水平排列 |
| **风格** | 细线手绘风格藤蔓、叶子、花苞，单色（深棕 `#3F2E2F` 或墨绿），不要填充色 |
| **文件数量** | 2张：左侧角落版(`vine-left.svg`) + 右侧角落版(`vine-right.svg`) |
| **保存路径** | `public/assets/decorations/vine-left.svg` `public/assets/decorations/vine-right.svg` |
| **接入方式** | 直接在组件内 `<img src="/assets/decorations/vine-left.svg" />` 叠加 |

---

### ✨ 4. 金箔/金粉点缀纹理

| 项目 | 要求 |
|------|------|
| **用途** | AboutSection Bento Box 卡片角落点缀 / 时间轴节点装饰 |
| **格式** | **PNG**（**必须透明背景**） |
| **尺寸** | **200×200px**（小型，用于角落贴图） |
| **风格** | 金箔碎片、轻薄散开感、暖金色(`#C9A84C`)，不要太规则，要有手工质感 |
| **保存路径** | `public/assets/decorations/gold-foil.png` |
| **接入方式** | 绝对定位叠加在卡片右上角，`opacity: 0.15~0.25`，`pointer-events: none` |

---

### 🎭 5. 欧式古典分割花纹（Ornamental Divider）

| 项目 | 要求 |
|------|------|
| **用途** | 各板块标题下方的分割线装饰（替代普通 `<hr>`） |
| **格式** | **SVG**（透明背景） |
| **尺寸** | **600×24px**（宽型横条，高度极小） |
| **风格** | 对称古典花纹分割线，如 `❧ ─── ✦ ─── ❧`，单色深棕，中间有小装饰节点 |
| **保存路径** | `public/assets/decorations/ornament-divider.svg` |
| **接入方式** | `<img src="/assets/decorations/ornament-divider.svg" className="opacity-30 mx-auto" />` |

---

## 优先级 3 — 加分素材（锦上添花）

### 🔴 6. 时间轴节点图标（替代 emoji）

| 项目 | 要求 |
|------|------|
| **用途** | 替换 CareerSection 横向时间轴上的 `🏆🥈🌟` emoji，用精致的古典图标 |
| **格式** | **SVG**（透明背景，单色可用 CSS 变色） |
| **尺寸** | **24×24px** 或 **32×32px** |
| **风格** | 线描风格，奖章/证书/星章样式，无填充，仅线条描边 |
| **文件数量** | 3张：`icon-award.svg` `icon-star.svg` `icon-medal.svg` |
| **保存路径** | `public/assets/icons/icon-award.svg` 等 |
| **接入方式** | 替换 `HonorItem.emoji` 字段，改用 `<img src>` 渲染 |

---

### 🖊️ 7. 手写签名/花体字装饰

| 项目 | 要求 |
|------|------|
| **用途** | Sidebar 或 About 板块的签名装饰（替代纯文字水印） |
| **格式** | **SVG** 或 **PNG**（透明背景） |
| **尺寸** | **300×80px** 横向 |
| **内容** | 英文花体签名 "Seraphina" 或 "XY" 任选 |
| **风格** | 手写花体字（Cursive/Calligraphy），黑色线条，笔触自然 |
| **保存路径** | `public/assets/decorations/signature.svg` |
| **接入方式** | Sidebar 底部：`<img src="/assets/decorations/signature.svg" className="opacity-20" />` |

---

## 📌 推荐素材来源

| 网站 | 适合采购 | 费用 |
|------|---------|------|
| **Canva** (canva.com) | 羊皮纸纹理、金箔、藤蔓装饰 | 免费/Pro |
| **Freepik** (freepik.com) | 古典花纹 SVG、分割线、欧式装饰 | 免费（注明来源） |
| **Flaticon** (flaticon.com) | 时间轴图标 SVG、奖章图标 | 免费/Pro |
| **Vecteezy** (vecteezy.com) | 手绘藤蔓 SVG、植物装饰 | 免费 |
| **Unsplash** (unsplash.com) | 真实羊皮纸/纸张照片 JPG | 完全免费 |
| **LottieFiles** (lottiefiles.com) | 动态羽毛笔动画（Lottie JSON） | 免费 |

---

## ✅ 上传后需要我做的事

上传素材后，告诉我"素材已上传"，我将：

1. **羊皮纸纹理** → 取消 `.paper-panel` 注释 + 调整 `mix-blend-mode`
2. **羽毛笔光标** → 更新 `globals.css` cursor URL
3. **藤蔓装饰** → 注入 Sidebar 和 AboutSection 角落
4. **金箔纹理** → 叠加到 Bento Card 右上角
5. **分割花纹** → 替换各板块标题下的 `<div className="h-px">` 分隔线
