# MEDIA_GUIDE.md — 媒体资源规范手册

> 最后更新：2026-04-13（第四十九轮）
> 本文件描述 `public/` 目录下所有媒体资源的**当前实际位置**、**命名规则**及**放置指引**。
> 每次新增图片/视频资源前，请先查阅本文件，确认目标目录。

---

## 一、目录总览

```
public/
├── assets/                    # 网站装饰性/功能性资源
│   ├── cursors/               # 自定义鼠标光标
│   ├── decorations/           # 装饰素材（金箔、藤蔓、签名）
│   ├── icons/                 # 导航图标、机构 Logo、奖项图标
│   ├── textures/              # 纸张/羊皮纸纹理
│   ├── videos/                # 视频（目前未使用，保留备用）
│   │   └── about/             # About Me 板块视频（备用路径）
│   └── tree-growth.mp4        # ★ About Me 右侧主视频（当前使用路径）
│
├── Book cover/                # 书架书本封面图（Interests 板块）
│
├── geo/                       # 地图 GeoJSON 数据
│   └── china-provinces.json   # 中国省级地图数据（Next Destination 板块）
│
├── photo/                     # 个人照片（生活/兴趣板块）
│   ├── hobbies/               # ★ 兴趣板块"Moments"胶片流照片
│   └── interests/             # 兴趣板块轮播图（currently: 12.jpg~19.jpg）
│
├── resume.pdf                 # ★ PDF 简历（Download CV 按钮链接）
│
└── works/                     # 所有作品文件
    ├── academic-research/     # 学术与实践板块缩略图
    ├── business-analysis/     # 商业分析原始 PDF
    ├── covers/                # ★ 各板块 Drawer 封面图
    │   ├── academic/          # 学术与实践板块封面
    │   ├── business/          # 商业分析板块封面
    │   └── vibe/              # Vibe Coding 板块封面
    ├── slides/                # 路演作品 PDF 及预览图
    └── vibe/                  # Vibe Coding 板块媒体文件
```

---

## 二、分板块放置规范

### 2.1 About Me 板块

| 文件 | 存放路径 | 命名规则 | 当前状态 |
|------|---------|---------|---------|
| 主视频（树生长动画） | `public/assets/tree-growth.mp4` | 固定文件名 | ✅ 已有 |
| 侧边栏签名图 | `public/assets/decorations/signature.png` | 固定，优先加载 PNG | ✅ 已有 |
| 侧边栏签名图（备用） | `public/assets/decorations/signature.jpg` | 固定，PNG 失败时回退 | ✅ 已有 |

> **视频注意事项**：`mix-blend-mode: multiply` 对 `<video>` 标签在多数浏览器无效，
> 已改用 CSS isolation + div 叠加层方案来实现白底融合效果（第四十九轮修复）。

---

### 2.2 Career Journey 板块

| 文件 | 存放路径 | 命名规则 | 当前状态 |
|------|---------|---------|---------|
| 好未来 Logo | `public/assets/icons/tal.svg` | 固定 | ✅ 已有（深色背景容器）|
| 函数猫 Logo | `public/assets/icons/fc.svg` | 固定 | ✅ 已有（深色背景容器）|
| 岭南大学 Logo | `public/assets/icons/ln.svg` | 固定 | ✅ 已有（深色背景容器）|
| 中央民族大学 Logo | `public/assets/icons/muc.svg` | 固定 | ✅ 已有（深色背景容器）|
| 奖项图标（奖杯） | `public/assets/icons/icon-award.svg` | 固定 | ✅ 已有（金棕背景容器）|
| 奖项图标（奖章） | `public/assets/icons/icon-medal.svg` | 固定 | ✅ 已有（金棕背景容器）|
| 奖项图标（星形） | `public/assets/icons/icon-star.svg` | 固定 | ✅ 已有（金棕背景容器）|

> **⚠️ 重要说明**：`tal.svg` / `fc.svg` / `ln.svg` / `muc.svg` / `icon-*.svg` 内部含有
> **白化 feColorMatrix 滤镜**（将所有 RGB 通道映射为 1，即白色），
> 导致图标在白色背景上不可见。第四十九轮已通过**深色背景容器**方案修复：
> - 机构 Logo：`深棕色（rgba(63,46,47,0.88)）` 圆角矩形背景
> - 奖项图标：`金棕色（rgba(140,100,40,0.82)）` 圆形背景
>
> 如需替换机构 Logo SVG，请确保新 SVG 内**不含白化滤镜**，否则仍需深色容器才能可见。

---

### 2.3 Interests 板块

#### 书架书本封面

| 文件 | 存放路径 | 命名规则 | 当前状态 |
|------|---------|---------|---------|
| 16 本书封面 | `public/Book cover/` | 中文书名.jpg/png | ✅ 已有 18 张 |

> **后续放图**：直接放入 `public/Book cover/`，文件名为书名（中文可用）。
> 书架组件 `InterestsSection.tsx` 中书本数据是硬编码的，放图后还需在组件里更新书目配置。

#### Moments 胶片流

| 文件 | 存放路径 | 命名规则 | 当前状态 |
|------|---------|---------|---------|
| 生活瞬间照片 | `public/photo/hobbies/` | 任意文件名（需在代码中注册） | ✅ 12 张已注册 |

> **后续放图步骤**：
> 1. 把图片放入 `public/photo/hobbies/`
> 2. 在 `lib/hobbyPhotos.ts` 中追加文件路径
> 3. 无需其他修改，轮播自动识别

#### 兴趣轮播图（Interests 右侧轮播）

| 文件 | 存放路径 | 命名规则 | 当前状态 |
|------|---------|---------|---------|
| 兴趣照片 | `public/photo/interests/` | `12.jpg`, `13.jpg`... 数字命名 | ✅ 已有 12/13/14/17/19 |

> **后续放图**：继续按数字命名（如 `20.jpg`），
> 需同步更新 `components/sections/InterestsSection.tsx` 中的图片路径数组。

---

### 2.4 Side Works — 学术与实践（Research）板块

#### 卡片缩略图（左侧列表卡片）

| slug | 缩略图路径 | 文件状态 |
|------|---------|---------|
| `uhv-power-transmission` | `public/works/academic-research/uhv-power-thumb.jpg` | ✅ 已有 |
| `steel-supply-chain` | `public/works/academic-research/steel-supply-thumb.jpg` | ✅ 已有 |
| `rural-agriculture` | `public/works/academic-research/agriculture-thumb.jpg` | ✅ 已有 |
| `cda-data-analysis` | `public/works/academic-research/cda-data-thumb.jpg` | ✅ 已有 |

#### Drawer 封面图（详情抽屉顶部封面）

| slug | 封面图路径 | 文件状态 |
|------|---------|---------|
| `uhv-power-transmission` | `public/works/covers/academic/uhv-power-transmission.jpg` | ✅ 已有 |
| `steel-supply-chain` | `public/works/covers/academic/steel-supply-chain.jpg` | ✅ 已有 |
| `rural-agriculture` | `public/works/covers/academic/rural-agriculture.jpg` | ✅ 已有 |
| `cda-data-analysis` | `public/works/covers/academic/cda-data-analysis.jpg` | ✅ 已有 |

> **后续新增学术条目步骤**：
> 1. 在 `content/academic-research/index.ts` 中追加条目，`slug` 使用英文短横线命名
> 2. 封面图放入 `public/works/covers/academic/{slug}.jpg`
> 3. 缩略图（可选）放入 `public/works/academic-research/{slug}-thumb.jpg`
> 4. 若有 PDF，放入 `public/works/academic-research/`
> 5. 正文内容写入 `content/academic-research/{slug}.md`，在 index.ts 中设置 `contentFile`

> **⚠️ 封面图 Bug 修复说明（第四十九轮）**：
> `DrawerCover` 组件的 `loadError` state 在切换卡片时不会自动重置，
> 导致第一次加载失败后，所有后续卡片都显示渐变占位。
> 修复方案：在调用处加 `key={selectedPost.coverImage ?? selectedPost.slug}`，
> 强制组件重新挂载，确保每次切换卡片都是全新的加载状态。

---

### 2.5 Side Works — 商业分析（Business Analysis）板块

#### Drawer 封面图

| slug | 封面图路径 | 文件状态 |
|------|---------|---------|
| `southeast-asia-market` | `public/works/covers/business/southeast-asia-market.jpg` | ✅ 已有 |

> **后续新增商业分析条目步骤**：
> 1. 在 `content/business-analysis/index.ts` 中追加条目
> 2. 封面图放入 `public/works/covers/business/{slug}.jpg`
> 3. 正文写入 `content/business-analysis/{slug}.md`

---

### 2.6 Side Works — Vibe Coding 板块

#### 封面图（Drawer 顶部）

| slug | 封面图路径 | 文件状态 |
|------|---------|---------|
| `lawflaw-ai-assistant` | `public/works/covers/vibe/lawflaw-ai-assistant.jpg` | ✅ |
| `agrimind-eco-platform` | `public/works/covers/vibe/agrimind-eco-platform.jpg` | ✅ |
| `challenge-cup-website` | `public/works/covers/vibe/challenge-cup-website.png` | ✅ |
| `portfolio-early-version` | `public/works/covers/vibe/portfolio-early-version.png` | ✅ |
| `student-evaluation-system` | `public/works/covers/vibe/student-evaluation-system.png` | ✅ |

#### 媒体文件（视频/图片/PDF 用于 Drawer 内展示）

| 文件 | 路径 | 类型 |
|------|---------|---------|
| LawFlaw 演示视频 | `public/works/vibe/lawflaw-ai-assistant.mp4` | 视频 |
| LawFlaw 说明书 | `public/works/vibe/lawflaw-ai-assistant.pdf` | PDF |
| AgriMind 演示视频 | `public/works/vibe/agrimind-eco-platform.mp4` | 视频 |
| 挑战杯网站截图 | `public/works/vibe/challenge-cup-website-01.png` | 图片 |
| 作品集早期版本截图 | `public/works/vibe/portfolio-early-version-01.png` | 图片 |
| 综测系统截图 | `public/works/vibe/student-evaluation-system-01.png` | 图片 |

> **后续新增 Vibe 项目步骤**：
> 1. 在 `content/vibe-coding/index.ts` 中追加条目
> 2. 封面图放入 `public/works/covers/vibe/{slug}.jpg` 或 `.png`
> 3. 媒体文件（视频/截图/PDF）放入 `public/works/vibe/`
> 4. 正文写入 `content/vibe-coding/{slug}.md`

---

### 2.7 Side Works — 路演作品（Slides）板块

> 文件路径：`public/works/slides/`
> 每个路演项目需要：1 个 PDF + 多张预览图

| 文件类型 | 命名规则 | 举例 |
|---------|---------|---------|
| PDF 文件 | 任意中文/英文文件名 | `绿壳鸡蛋ppt.pdf` |
| 主缩略图 | `{原文件名}_thumb.jpg` | `绿壳鸡蛋ppt_thumb.jpg` |
| 多页预览图 | `{原文件名}_p1.jpg` ~ `_p6.jpg` | `绿壳鸡蛋ppt_p1.jpg` |

> **⚠️ 中文/特殊字符文件名**：浏览器 URL 编码可能导致加载问题。
> 代码中已对路径做 `encodeURIComponent` 处理，但建议**新增文件尽量使用英文命名**。

> **后续新增 Slides 条目步骤**：
> 1. PDF 和预览图放入 `public/works/slides/`
> 2. 在 `components/sections/gallery/SlidesGallery.tsx` 中追加条目数据
> 3. 生成预览图：可用 Python + Pillow 将 PDF 每页转为 JPG

---

### 2.8 Next Destination 板块

| 文件 | 存放路径 | 当前状态 |
|------|---------|---------|
| 中国省级地图数据 | `public/geo/china-provinces.json` | ✅ 已有 |

---

## 三、导航图标规范

> 路径：`public/assets/icons/`
> 格式：SVG（内联矢量，无白化滤镜）

| 图标 | 文件名 | 用途 |
|------|--------|------|
| 关于我 | `about.svg` | 主导航 - About Me |
| 教育经历 | `career.svg` | 主导航 - Career Journey |
| 兴趣 | `interests.svg` | 主导航 - My Interests |
| 作品集 | `sideworks.svg` | 主导航 - Side Works |
| 学术研究 | `project-highlights.svg` | 主导航 - Research |
| 申请规划 | `destination.svg` | 主导航 - Next Destination |

> **⚠️ 命名陷阱**：`public/assets/icons/` 下同时存在：
> - `Project highlights.svg`（文件名含空格，旧版，已弃用）
> - `project-highlights.svg`（正确版本，代码当前引用）
>
> 请勿混淆，新增图标时**文件名不得含空格或中文**。

---

## 四、文件命名最佳实践

| ✅ 推荐 | ❌ 避免 |
|---------|---------|
| `slug-name.jpg` | `文件名.jpg`（中文） |
| `slug-name_thumb.jpg` | `slug_name thumb.jpg`（含空格） |
| `slug-name_p1.jpg` | `Slug Name P1.JPG`（大写） |

---

## 五、已知遗留问题

| 问题 | 位置 | 状态 |
|------|------|------|
| `public/works/academic-research/agriculture-thumb.jpg` 对应的是 `rural-agriculture` 还是另一个 `agriculture` slug？ | 学术板块 | ⚠️ 待厘清 |
| `public/assets/videos/about/tree-growth.mp4` 是备用路径，当前未使用 | About Me | 🟡 可清理 |
| Slides PDF 文件名含中文，URL 编码兼容性依赖代码处理 | Slides 板块 | 🟡 建议新增时改英文 |
| `Book cover/` 目录名含空格，不规范 | Interests 板块 | 🟡 不影响功能 |

---

*本文件由 Claude Code 生成，第四十九轮（2026-04-13）*
