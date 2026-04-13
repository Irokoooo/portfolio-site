# PROGRESS.md — 开发历史记录

> 本文件保存每一轮开发的完成内容，作为项目历史档案。
> 当前工作焦点请看 `docs/ACTIVE_CONTEXT.md`。

---

## 第五十五轮（2026-04-13）— Vibe 新增 Luma Flow 卡片

- [x] `content/vibe-coding/index.ts`：新增 `luma-flow` 项目（标题、描述、标签、类型、日期、正文文件映射）
- [x] `content/vibe-coding/luma-flow.md`：落地用户提供全文内容
- [x] `components/sections/gallery/AIPracticeClient.tsx`：封面 fallback 支持 `Luma Flow.jpg`
- [x] `components/sections/gallery/AIPracticeClient.tsx`：视频文件未上传时显示占位提示与目标路径
- [x] 校验：`content/vibe-coding/index.ts`、`AIPracticeClient.tsx` 无错误

---

## 第五十四轮（2026-04-13）— 侧边栏导航顺序调整

- [x] `app/page.tsx`：`navItems` 中将 `My interests / 兴趣领域` 移动到 `Research / 学术与实践` 之后
- [x] 仅调整显示顺序，不改动对应页面内容与交互逻辑
- [x] 校验：`app/page.tsx` 无错误

---

## 第五十三轮（2026-04-13）— 书架裁切根因修复 + 引导滚动缓动升级

- [x] `components/sections/InterestsSection.tsx`：书架容器改为 `overflow-visible`，彻底解除 hover 封面顶部裁切
- [x] `components/sections/CareerSection.tsx`：将 `scrollIntoView({ behavior: 'smooth' })` 升级为 `requestAnimationFrame` 自定义缓动滚动
- [x] 新增 `easeInOutCubic` 曲线与约 `1050ms` 时长，降低突兀感并提升“优雅下滑”体验
- [x] 增加 RAF/定时器清理逻辑，防止组件卸载后残留动画
- [x] 校验：`InterestsSection.tsx`、`CareerSection.tsx` 均无错误

---

## 第五十二轮（2026-04-13）— Career Journey 自动下滑引导

- [x] `components/sections/CareerSection.tsx`：新增 `handleExperienceSelect`，统一处理经历卡片点击
- [x] 点击 `中央民族大学（minzu）` 卡片后，延迟平滑滚动到 `Honours & Awards · 荣誉奖项` 区域
- [x] 引导行为仅触发一次（`hasGuidedToHonors`），减少重复打断
- [x] 增加定时器清理，避免组件卸载后残留回调
- [x] 校验：`components/sections/CareerSection.tsx` 无错误

---

## 第五十一轮（2026-04-13）— My Interests 书架 Hover 出框修复

- [x] `components/sections/InterestsSection.tsx`：书架外层容器由 `overflow-hidden` 调整为 `overflow-x-hidden overflow-y-visible`
- [x] 保持现有圆角边框与视觉风格不变，仅放开纵向溢出
- [x] 修复结果：第一排书籍 hover 封面弹窗可“出框”显示，不再被顶部裁切
- [x] 校验：`components/sections/InterestsSection.tsx` 无错误

---

## 第五十轮（2026-04-13）— CareerSection 图标去容器化 + 全站代码审查

### ✅ CareerSection 图标去容器化
- **用户需求**："icon 边框容器太丑了！不要有容器 就是直接嵌入"
- **方案**：CSS filter 链将白化 SVG 重新着色为暖棕色，无需背景容器
  ```
  invert(1) sepia(1) saturate(0.6) hue-rotate(330deg) brightness(0.55)
  ```
- `OrgLogo`：移除背景 div 容器，直接 `<img style={{ filter: ICON_FILTER }}>`
- `HonorIcon`：同上，直接 img + filter
- `OrgLogoProps`：移除 `fallbackLabel` 字段
- 清理孤立旧容器 `return (...)` 代码块（约 19 行残留代码）
- 清理两处 JSX 调用中废弃的 `fallbackLabel={exp.orgEn.charAt(0)}` prop
- 清理注释中旧"深色容器"描述
- 恢复被 linter 误删的 `style={{ filter: ICON_FILTER }}` 属性（确保图标可见）

### ✅ 全站代码审查
- TypeScript：`npx tsc --noEmit` 零错误
- Build：`npx next build` 全部通过（Static + Dynamic 均成功）
- 所有 `public/works/covers/vibe/` 封面图与 slug 对应，fallback 链（.jpg→.png）正常
- API 路由 `/api/vibe-coding-content`：文件路径校验与安全过滤正常
- 无 console.error / FIXME / TODO 遗留



### ✅ Bug 1：Career Journey 机构/奖项图标不可见
- **根因**：`tal.svg`, `fc.svg`, `ln.svg`, `muc.svg`, `icon-award.svg` 等 SVG 内部含有 `feColorMatrix` 白化滤镜，将所有像素映射为白色，导致图标在白色页面上不可见。
- **修复**：`CareerSection.tsx` 中 `OrgLogo` 和 `HonorIcon` 组件改为带背景容器的渲染方式：
  - 机构 Logo：深棕色（`rgba(63,46,47,0.88)`）圆角矩形容器
  - 奖项图标：金棕色（`rgba(140,100,40,0.82)`）圆形容器
  - 两者均新增 `fallbackLabel` / 星形文字兜底
  - 同步给 `OrgLogo` 调用处传入 `fallbackLabel={exp.orgEn.charAt(0)}`

### ✅ Bug 2：About Me 右侧视频不可见
- **根因**：`mix-blend-mode: multiply` 对 `<video>` 元素在大多数浏览器（含 Chrome/Edge）不生效，导致白底视频在羊皮纸背景上呈现白色方块。
- **修复**：`AboutSection.tsx` 中 `PhotoPanel()` 组件：
  - 移除 video 标签上的 `mixBlendMode: 'multiply'`
  - 改为容器设置 `isolation: 'isolate'`
  - 在视频上叠加半透明羊皮纸色 `div`（`rgba(245,237,220,0.38)`），使用 `mixBlendMode: 'multiply'`（div 支持该属性）
  - 保留原有 filter（contrast/brightness/saturate）

### ✅ Bug 3：学术与实践板块封面图"加载不出来"
- **根因**：`DrawerCover` 组件的 `loadError` useState 在 selectedPost 切换时**不会自动重置**，导致某次加载失败后，后续所有卡片都显示渐变占位（即使文件存在且 HTTP 200）。
- **修复**：`AcademicResearchClient.tsx` 和 `BusinessAnalysisClient.tsx` 中调用 `<DrawerCover>` 时加 `key={selectedPost.coverImage ?? selectedPost.slug}`，强制组件每次切换时重新挂载。

### ✅ 新增文档：媒体资源规范手册
- 新建 `docs/MEDIA_GUIDE.md`，完整描述 `public/` 下所有目录的资源放置规范：
  - 各板块封面图、缩略图、视频、PDF 的存放路径
  - 文件命名最佳实践
  - 已知遗留问题清单
  - 机构图标白化滤镜问题说明


- [x] `app/page.tsx`：Side Works 二级菜单使用 `visibleSubNavItems`，隐藏 `Business Analysis` 入口
- [x] `app/page.tsx`：增加状态兜底，若 `subActiveTab` 为 `business` 自动切回 `vibe`
- [x] 保留 `BusinessAnalysisGallery` 及其内容文件，不删除任何资源
- [x] 校验：`app/page.tsx` 无错误

---

## 第四十九轮（2026-04-13）— 学术与实践供应链条目正文替换

- [x] `content/academic-research/index.ts`：更新 `steel-supply-chain` 条目正文为最新版本
- [x] 完整写入章节：`研究缘起 / 角色 / 实证-调研路径 / 核心结论 / 问题与解决方案 / 个人心得`
- [x] 保持现有组件与交互不变，仅替换数据层内容
- [x] 校验：`content/academic-research/index.ts` 无错误

---

## 第四十八轮（2026-04-13）— Next Destination 省级地图下钻显示修复

- [x] `components/ui/ChinaProvinceMap.tsx`：地图数据加载改为双源兜底（本地 `/geo/china-provinces.json` 优先，Highcharts CDN 兜底）
- [x] `components/ui/ChinaProvinceMap.tsx`：省份识别兼容 `adcode` 与 `hc-key`，确保不同数据源下足迹颜色与 tooltip 正常
- [x] `components/ui/ChinaProvinceMap.tsx`：新增“加载中/加载失败”可视状态和重载入口，避免省级视图空白无提示
- [x] 验证通过：`npm.cmd run build` 成功（Compiled successfully + type check + static pages）

---

## 第四十七轮（2026-04-13）— About Me「Who I Am」文案替换

- [x] `components/sections/AboutSection.tsx`：将 `Who I Am` 区块正文替换为用户提供的新文案
- [x] 删除旧版自我描述文案（“国际经贸底色 × AI Workflow 落地者 …”）
- [x] 浏览器验证：新文案存在，旧文案不存在

---

## 第四十六轮（2026-04-13）— Slides 防下载终版 + 密云区条目内容升级

- [x] `components/sections/gallery/SlidesGallery.tsx`：悬停预览改为多页图片纵向滚动（`_p1.jpg`~`_p6.jpg`），彻底规避 PDF 下载触发
- [x] `components/sections/gallery/SlidesGallery.tsx`：保留“手动滚动预览”交互文案，支持滚动查看
- [x] `content/academic-research/index.ts`：`rural-agriculture` 条目按用户提供内容完整重写
  - `研究缘起 / 角色 / 实证-调研路径 / 核心结论 / 问题与解决方案 / 个人心得`
- [x] 浏览器验证：Slides 悬停 `iframeCount=0` 且存在多页预览图；密云区抽屉新章节可检索

---

## 第四十五轮（2026-04-13）— LawFlaw 抽屉防下载 + Slides 手动滚动预览恢复

- [x] `components/sections/gallery/AIPracticeClient.tsx`：LawFlaw 说明书预览改为“展开说明书预览”后再加载，避免点卡即下载
- [x] `components/sections/gallery/SlidesGallery.tsx`：悬停预览恢复为 iframe（支持手动滚动）
- [x] `components/sections/gallery/SlidesGallery.tsx`：`校园拼车出行新模式` 时间改为 `2025.3`
- [x] 浏览器验证：LawFlaw 抽屉初始 `iframeCountBefore=0`；Slides 悬停有 iframe 且显示“手动滚动预览”

---

## 第四十四轮（2026-04-13）— 路演作品预览防下载修复（Slides）

- [x] `components/sections/gallery/SlidesGallery.tsx`：将悬停预览从 PDF iframe 改为静态页图（`_p1.jpg`）
- [x] `components/sections/gallery/SlidesGallery.tsx`：`SlideCover` 的失败回退从 iframe 改为占位文案，避免触发 PDF 资源请求
- [x] `components/sections/gallery/SlidesGallery.tsx`：移除卡片中的 `打开 PDF` 与 `在新窗口打开 PDF` 链接
- [x] 浏览器验证：Slides 预览状态无 iframe、无 PDF 外链按钮，仅渲染预览图

---

## 第四十三轮（2026-04-13）— Vibe 主图去重 + LawFlaw 标题/说明书预览终版

- [x] `components/sections/gallery/AIPracticeClient.tsx`：去除默认嵌入图片逻辑，封面图作为默认主视觉
- [x] `components/sections/gallery/AIPracticeClient.tsx`：纯图片项目不再渲染空 `Media` 区块
- [x] `content/vibe-coding/index.ts`：`LawFlaw AI 法律场景助手` 改名为 `LawFlaw AI 智能合规系统`
- [x] `components/sections/gallery/AIPracticeClient.tsx`：LawFlaw 说明书改为直接内嵌可滚动 PDF 预览，移除点击加载与下载入口
- [x] 浏览器验证：标题生效；抽屉无“嵌入图片”；PDF 预览直接显示

---

## 第四十二轮（2026-04-13）— Vibe 抽屉体验修复（LawFlaw PDF / Notion 封面 / 媒体去重）

- [x] `components/sections/gallery/AIPracticeClient.tsx`：LawFlaw 说明书预览改为“点击加载说明书预览”，避免点卡即触发 PDF 自动下载
- [x] `components/sections/gallery/AIPracticeClient.tsx`：抽屉封面改为学术与科研同款 Notion 风格（固定高度封面 + 渐变 + 暗角 + 标题叠层）
- [x] `components/sections/gallery/AIPracticeClient.tsx`：媒体展示逻辑调整，视频类条目不再展示“嵌入图片”
- [x] 浏览器验证：LawFlaw 抽屉出现手动加载按钮，未自动加载 PDF iframe

---

## 第四十一轮（2026-04-13）— 紧急修复网页打不开（fs 客户端引用）

- [x] 定位 500 根因：`components/sections/gallery/AIPracticeGallery.tsx` 在客户端渲染链路中引入 `fs`
- [x] `components/sections/gallery/AIPracticeGallery.tsx`：移除 `fs/path`，恢复为客户端安全 wrapper
- [x] `components/sections/gallery/AIPracticeClient.tsx`：恢复 md 正文 API 拉取逻辑，避免依赖服务端注入
- [x] `components/sections/gallery/AIPracticeClient.tsx`：修复 `selectedPost` 空值类型错误（提取 `contentFile`）
- [x] 验证：本地 `http://localhost:3000` 页面已可正常打开

---

## 第四十轮（2026-04-13）— 综测系统正文实装 + Vibe 素材源目录同步

- [x] `content/vibe-coding/student-evaluation-system.md`：写入完整项目内容
  - `Project Overview`
  - `需求觉察（Motivation）`
  - `痛点与挑战（Pain Points）`
  - `落地解法（Implementation）`
  - `迭代心得（Iteration Notes）`
- [x] `content/vibe-coding/index.ts`：优化多条 Vibe 项目描述，移除“占位”语气
- [x] `components/sections/gallery/AIPracticeClient.tsx`：增加 LawFlaw 封面多候选路径兜底，支持 `LawFlaw.jpg` 原命名
- [x] 按用户指定源目录 `个人资料/作品（待分类）/vibe coding/` 覆盖同步 Vibe 媒体到展示目录
  - `public/works/vibe/`
  - `public/works/covers/vibe/`

---

## 第三十九轮（2026-04-13）— 资源显示修复（封面/嵌入媒体/icon/路演 PDF）

- [x] 批量补齐 Vibe 资源映射到 `public`：
  - `public/works/vibe/`：`lawflaw-ai-assistant.mp4`、`lawflaw-ai-assistant.pdf`、`agrimind-eco-platform.mp4`、`challenge-cup-website-01.png`、`portfolio-early-version-01.png`、`student-evaluation-system-01.png`
  - `public/works/covers/vibe/`：`lawflaw-ai-assistant.jpg`、`agrimind-eco-platform.jpg`、`challenge-cup-website.png`、`portfolio-early-version.png`、`student-evaluation-system.png`
- [x] `components/sections/gallery/AIPracticeClient.tsx`：新增媒体展示区（封面、视频、图片、PDF 预览与外链）
- [x] `components/sections/gallery/SlidesGallery.tsx`：为中文文件名 PDF/缩略图增加 URL 编码处理，提升 iframe 兼容性
- [x] `components/sections/gallery/SlidesGallery.tsx`：卡片新增“打开 PDF / 在新窗口打开 PDF”入口
- [x] `app/page.tsx`：projects 导航 icon 改为 `/assets/icons/project-highlights.svg`（无空格命名）
- [x] `content/vibe-coding/*.md`：同步修正多篇封面路径与实际资源文件一致

---

## 第三十八轮（2026-04-13）— Vibe 卡片分隔优化 + md 正文稳定加载 + 挑战杯内容实装

- [x] `components/sections/gallery/AIPracticeClient.tsx`：重构列表卡片样式，采用统一容器 + `divide-y` 分隔，强化条目边界与视觉层级
- [x] `components/sections/gallery/AIPracticeClient.tsx`：抽屉正文改为直接使用服务端注入的 `post.content`，移除客户端 fetch/loading 依赖
- [x] `components/sections/gallery/AIPracticeGallery.tsx`：服务端读取 `content/vibe-coding/*.md` 并注入到客户端，避免 API 请求失败导致正文空白
- [x] `content/vibe-coding/challenge-cup-website.md`：写入完整正文（需求觉察/痛点与挑战/落地解法/迭代心得）并补全 Project Overview
- [x] `content/vibe-coding/index.ts`：更新挑战杯条目 `description`，去除占位描述

---

## 第三十五轮（2026-04-13）— Vibe Coding 清空旧内容并批量生成 md 占位

- [x] 扫描目录 `个人资料/作品（待分类）/vibe coding`，识别到 6 个原始素材文件（PDF/MP4/PNG）
- [x] 新建 `content/vibe-coding/index.ts`：建立 Vibe Coding 项目元数据（5 个项目）
- [x] 新建 5 个项目占位 md（按模板含 Project Overview + Motivation + Pain Points + Implementation + Iteration Notes）
  - `content/vibe-coding/lawflaw-ai-assistant.md`
  - `content/vibe-coding/portfolio-early-version.md`
  - `content/vibe-coding/student-evaluation-system.md`
  - `content/vibe-coding/challenge-cup-website.md`
  - `content/vibe-coding/agrimind-eco-platform.md`
- [x] `components/sections/gallery/AIPracticeGallery.tsx`：移除旧硬编码项目，改为读取新数据源并显示素材来源
- [x] 新建资源目录：
  - `public/works/covers/vibe/`
  - `public/works/vibe/`
- [x] 验证时修复 `content/academic-research/index.ts`：清理重复 `academicResearchPosts` 定义并修复字符串引号语法错误，避免页面构建失败

---

## 第三十六轮（2026-04-13）— Vibe Coding 抽屉接入 md 正文 + LawFlaw 内容实装

- [x] `components/sections/gallery/AIPracticeGallery.tsx`：改为服务端读取 `content/vibe-coding/*.md` 后传入客户端
- [x] 新建 `components/sections/gallery/AIPracticeClient.tsx`：实现卡片点击打开右侧详情抽屉，并渲染 Markdown 正文
- [x] `content/vibe-coding/index.ts`：新增可选字段 `content`
- [x] `content/vibe-coding/lawflaw-ai-assistant.md`：插入完整中文正文（需求觉察/痛点与挑战/落地解法/迭代心得）
- [x] 运行验证：`npm.cmd run dev` 启动成功（本地地址 `http://localhost:3004`）

---

## 第三十七轮（2026-04-13）— AgriMind 正文与可投递式 Overview 实装

- [x] `content/vibe-coding/agrimind-eco-platform.md`：将 `Project Overview` 改为可投递式一段话总结
- [x] `content/vibe-coding/agrimind-eco-platform.md`：写入用户提供的完整正文内容
  - `需求觉察（Motivation）`
  - `痛点与挑战（Pain Points）`
  - `落地解法（Implementation）`
  - `迭代心得（Iteration Notes）`
- [x] 保留封面图与视频占位模块不变，便于后续替换真实素材

---

## 第三十四轮（2026-04-13）— 网页无法打开紧急修复（Webpack Scheme Error）

- [x] 复现失败：`npm.cmd run build` 报错 `UnhandledSchemeError`（`node:fs` / `node:path`）
- [x] `components/sections/gallery/AcademicResearchGallery.tsx`：将导入改为 `fs` 与 `path`
- [x] 再验证：`npm.cmd run dev` 成功启动（本地地址 `http://localhost:3001`）

---

## 第三十一轮（2026-04-13）— ClassicalMap 古典航海足迹地图全系统构建

### ✅ 依赖安装
- 安装 `react-simple-maps@3.0.0` + `react-tooltip@5.30.1`

### ✅ 新建 `components/ui/ClassicalMap.tsx`（世界地图 + 视图切换主控）
- 世界地图视图（`geoNaturalEarth1`，scale 110，width 800 height 400）
- 已访问国家：中国 · 土耳其 · 日本（ISO 3166-1 numeric）
- 点击中国区域触发下钻（`zoom-in` 光标 + 特殊深红 hover 色 + tooltip 提示"点击探索省级足迹"）
- `AnimatePresence mode="wait"` 管理世界 ↔ 中国双视图切换动效
  - 世界→中国：`scale 0.88→1` 放大钻入
  - 中国→世界：`scale 1.06→1` 弹回外层
- 复古双线边框：外框 1.5px + 6px 羊皮纸间距 + 内框 1px
- 新版角纹 SVG（32×32）：L 形卡尺臂 + 内层细线 + 棱形锚点 + 3 档刻度线，CSS mirror 复用

### ✅ 新建 `components/ui/ChinaProvinceMap.tsx`（省级下钻视图）
- 数据源初版：阿里云 DataV（后换为 Highcharts CDN，见第三十二轮）
- 7 个省份足迹高亮（4 种类型色）：
  | 省份 | 类型 | 颜色 |
  |---|---|---|
  | 广东 | 家乡 home | `#7A2F2F` 深暗红 |
  | 北京 | 求学 study | `#8B4513` 深棕橙 |
  | 香港 | 交换 exchange | `#3D5A7A` 深蓝墨 |
  | 辽宁/天津/河北/内蒙古 | 旅游 travel | `#6B5B3E` 棕褐 |
- framer-motion 弹入动效 + 返回按钮（斜体衬线字 + 左箭头 SVG）
- react-tooltip float 模式，古典深棕底 + 金色边框 + 衬线字体
- 与 ClassicalMap 同款双线边框 + 角纹

### ✅ `NextDestSection.tsx` 接入地图
- 在板块标题下方插入 `<ClassicalMap />`
- TypeScript 零错误，Next.js build 通过

---

## 第三十二轮（2026-04-13）— 省级地图数据源修复 + 地图尺寸收缩 + 边框升级

### ✅ ChinaProvinceMap 数据源切换（修复加载失败）
- **根本原因**：阿里云 DataV API 在部分网络环境下有 CORS 限制，导致 GeoJSON 静默失败
- **修复**：切换至 Highcharts 官方 CDN
  ```
  旧：https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json
  新：https://code.highcharts.com/mapdata/countries/cn/cn-all.geo.json
  ```
- 同步更新省份识别策略：adcode 字符串 → `properties["hc-key"]`（如 `"cn-bj"`）
- 同步更新 tooltip fallback：读取 `properties["long-name"]`（中文全称）
- 省份 key 对照表：
  | hc-key | 省份 | hc-key | 省份 |
  |---|---|---|---|
  | cn-gd | 广东 | cn-ln | 辽宁 |
  | cn-bj | 北京 | cn-tj | 天津 |
  | cn-hk | 香港 | cn-he | 河北 |
  | cn-nm | 内蒙古 | — | — |

### ✅ 地图整体缩小
- 世界地图：`scale 140 → 110`，显式设 `width={800} height={400}`
- 中国地图：`scale 580 → 450`，`center [108,34] → [108,36]`（北移居中），`height 560 → 490`

### ✅ 复古双线边框升级（两地图同步）
- 结构：外框 div（`padding: 6px` + `1.5px solid` + 羊皮纸渐变背景 + 外阴影）包裹内框 div（`1px solid`）
- 角纹 SVG 升级（32×32 viewBox）：
  - 粗 L 形卡尺臂 `strokeWidth 1.1` + 细内层平行线 `strokeWidth 0.5`（双线视觉）
  - 角点棱形锚点（◆）
  - 3 档刻度线（opacity 递减 0.42 → 0.34 → 0.26，模拟真实测量尺刻度）
  - CSS `scaleX/scaleY/scale(-1,-1)` + `transformOrigin` 精准镜像至四角，零代码重复

---

## 第三十三轮（2026-04-13）— NextDestSection 文案全面替换

### ✅ 区块结构重写（保留 `<ClassicalMap />` 不动）
- 删除旧有：`My Mission` / `Target Programs` / `Impact Directions` / `Personal Commitment` 四个模块
- 新建两个语义化 `<section>` 区块，以分割线标题 + 引言 + 条目列表呈现

### ✅ 区块一：一 · 航向与终极愿景
- 引言："我有野心，也很贪心，我要走向更远的世界，过上更好的生活。"
- 🌍 Academic Anchor（学术锚点）— Erasmus Mundus Joint Master Degrees
- 🦅 Urban Avian Conservation（城市生灵共存）— emoji 由 🪶 升级为 🦅
- 🌊 Pacific Ecological Governance（深蓝治理）

### ✅ 区块二：二 · 技能树攀升路线
- 引言："为了达到上述志向，我不会停下奋斗的步伐。"
- 📈 Applied Marketing（应用营销学）
- 🗣️ Francophone Mastery（法语冲刺）
- 🕸️ Digital Garden Cultivation（知识库重构）

### ✅ 排版细节
- 区块标题：`text-xs uppercase tracking-widest` + `flex-1 border-t` 延伸分割线
- 引言：`border-l-2 border-gray-200 pl-3 italic` 左侧竖线引用格式
- 区块一条目：`border` 卡片 + `h3 font-serif font-semibold`（英文主标 + 中文副标）
- 区块二条目：emoji 横排 + 轻分割线，呼吸感更强

---



- [x] `components/sections/AboutSection.tsx`：将证书资历迁移到联系方式卡片中
- [x] `components/sections/SideWorksSection.tsx`：移除技能矩阵，仅保留社会实践内容
- [x] `app/page.tsx`：作品集子菜单默认入口改为 `vibe`
- [x] `app/page.tsx`：返回按钮改为直接回到 `projects`（学术与实践）页面
- [x] 校验通过：相关 TSX 文件无错误

---

## 第二十八轮（2026-04-13）— 右侧抽屉定位内联兜底 + 商业封面恢复

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - 为遮罩层/固定层/抽屉本体添加内联定位样式兜底
  - 防止 Tailwind 资源偶发失效时抽屉退化为流式布局
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 同步添加内联定位样式兜底
  - 同步保持右侧贴边与滚动行为
- [x] 商业分析封面目录补入临时图：
  - `public/works/covers/business/southeast-asia-market.jpg`
  - 解决“封面图未加载”可见性问题

---

## 第二十九轮（2026-04-13）— 学术与实践 UHV 条目替换为论文正式稿

- [x] `content/academic-research/index.ts`：将 `uhv-power-transmission` 标题由“特高压输电与数字赋能”替换为论文标题
  - `Energy-Computing Synergy How UHV Projects and Digital`
- [x] `content/academic-research/index.ts`：将原“理解性占位稿”替换为用户提供的完整研究内容
  - 补全 `Project Overview`
  - 补全 `研究缘起 / 角色核心 / 实证/调研路径`
  - 增加 DID 公式、样本范围（2008-2023 A 股生产性服务业）与 189,822 条资产数据口径
  - 增加“挑战与破局”对照表及个人心得
- [x] `docs/ACTIVE_CONTEXT.md`：同步更新为第二十九轮工作焦点

---

## 第三十轮（2026-04-13）— 学术正文外置为 Markdown 便于后续自维护

- [x] `content/academic-research/index.ts`：为学术条目新增 `contentFile` 字段
- [x] `content/academic-research/index.ts`：`uhv-power-transmission` 改为 `contentFile: "uhv-power-transmission.md"`
- [x] 新建 `content/academic-research/uhv-power-transmission.md`：承载该论文完整正文
- [x] `components/sections/gallery/AcademicResearchGallery.tsx`：服务端新增 md 读取逻辑，优先读取外置正文，失败回退内联内容

---

## 第二十七轮（2026-04-13）— Drawer 右侧贴边硬锚定修复

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - 在 Portal 中新增全屏固定图层（`fixed inset-0`）
  - 抽屉改为图层内 `absolute right-0` 渲染
  - 宽度改为显式 `w-[min(48rem,100vw)]` + `maxWidth: 48rem`
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 同步应用硬锚定图层方案
  - 同步显式抽屉宽度，避免布局系统介入造成偏移
- [x] 校验通过：两个客户端组件无 TS 错误

---

## 第二十六轮（2026-04-13）— Drawer Portal 修复右侧定位

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - Drawer 改为 `createPortal(..., document.body)`
  - 避免被 `app/page.tsx` 中内容区 `motion.div` 的 transform 影响
  - 右侧抽屉应稳定显示在 viewport 右边
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 同步改为 Portal 渲染
  - 同步保留封面回退与右侧抽屉动画
- [x] 封面状态：学术封面可用；商业封面目录暂为空，仍按渐变封面兜底

---

## 第二十五轮（2026-04-12）— 封面图投放位建立 + 原始比例直出

- [x] 新建封面目录：
  - `public/works/covers/academic/`
  - `public/works/covers/business/`
- [x] `content/academic-research/index.ts`：4 个条目 `coverImage` 指向新目录（按 slug 命名）
- [x] `content/business-analysis/index.ts`：商业分析条目新增 `coverImage` 指向新目录
- [x] `lib/markdownLoader.ts`：`MarkdownPost` 新增可选字段 `coverImage`
- [x] `components/sections/gallery/AcademicResearchClient.tsx`：封面改为 `w-full h-auto` 原始比例展示（不裁切）
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：封面改为 `w-full h-auto` 原始比例展示（不裁切）
- [x] `docs/PROJECT_TEMPLATE.md`：补充封面投放目录与命名规则说明
- [x] 校验通过：相关文件无错误

---

## 第二十四轮（2026-04-12）— 标题半叠封面下缘 + 内容位置下沉修复

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - 标题上移并半叠在封面下缘
  - 标题底采用三层高透明白框（60%/78%/92%）提升可读性
  - 封面图展示策略调整为 `object-contain`，尽可能完整展示图片
  - 修复内容区域下沉：移除 `-mt-8` 负边距，改为正常流布局
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 同步标题半叠封面下缘与三层白框方案
  - 同步修复内容下沉布局问题
- [x] 校验通过：相关 TSX 文件无报错

---

## 第二十三轮（2026-04-12）— 封面信息一体化 + Abstract 收敛到 Project Overview

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - 移除 Drawer 独立顶部栏
  - 将类型/日期覆盖到封面图上
  - 封面增加多层渐变与底部淡出，平滑过渡到正文
  - 关闭按钮改为封面右上角浮层
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 同步执行封面信息一体化改造
  - 保留 Project Overview，去除摘要型重复表达
- [x] `docs/PROJECT_TEMPLATE.md`：
  - 删除 Abstract 章节与模板字段
  - 三类模板统一新增/保留 `## Project Overview`
- [x] `content/academic-research/index.ts` 与 `content/business-analysis/index.ts`：
  - 移除已填内容中的摘要引用块
  - 将总览语义统一到 Project Overview（description 显示）
- [x] `content/business-analysis/southeast-asia-market.md`：
  - 按新模板移除摘要并补 `Project Overview`

---

## 第二十二轮（2026-04-12）— 无边界 Notion 封面微调 + 框架化正文填充

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - 封面改为无边界全宽（`-mx-8 -mt-8`）
  - 封面高度调整为 `h-56`
  - 渐变遮罩调整为上浅下深
  - 增加柔和暗角（radial vignette）
  - 新增 Markdown 渲染，显示结构化正文内容
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 封面改为无边界全宽
  - 封面高度与渐变、暗角参数与学术 Drawer 对齐
- [x] `content/academic-research/index.ts`：4 条内容全部按 Academic 模板填充
- [x] `content/business-analysis/index.ts`：保留条目按 Business 模板填充
- [x] 校验通过：相关文件 TypeScript / 文本错误为 0

---

## 第二十一轮（2026-04-12）— Drawer 封面规范统一 + PDF 下载项清理

- [x] `components/sections/gallery/AcademicResearchClient.tsx`：
  - 将“正文内嵌封面图”改为顶部 Cover 区块
  - 增加线性渐变遮罩（上浅下深）
  - 移除“查看完整 PDF”按钮
- [x] `components/sections/gallery/BusinessAnalysisClient.tsx`：
  - 新增顶部 Cover 区块
  - 增加线性渐变遮罩（上浅下深）
- [x] `components/sections/NextDestSection.tsx`：移除 Download CV
- [x] 全局校验：仅 `AboutSection` 保留 Download CV
- [x] 商业分析列表确认：仅保留 `southeast-asia-market`，钢铁贸易与密云调研已移出

---

## 第二十轮（2026-04-12）— Project Structure Blueprint 建立与商业分析框架收敛

- [x] 新建 `docs/PROJECT_TEMPLATE.md`，建立 Details Panel 统一撰写模板
- [x] 完成通用视觉布局规范：Cover Image / Title / Abstract / Tags
- [x] 完成三类模板：Business Analysis / Academic & Research / Vibe Coding
- [x] 增加“基于 PDF 理解占位 + 作者补充提醒”填写规则
- [x] 从 `content/business-analysis/index.ts` 移除两条项目：
  - 从交易中介到多层级供应链服务商：中国钢铁贸易产业转型升级研究
  - 北京密云区农产品产销合作调研报告
- [x] 将 `content/business-analysis/southeast-asia-market.md` 按新框架优化：
  - Abstract 引用块
  - Problem & Solution 表格
  - HorizontalScrollShowcase 占位
  - Insights 与补充提醒

---

## 第一轮（2026-04-03）— 项目规范体系建立

- [x] 创建 `CLAUDE.md` — 统一 AI 记忆文件
- [x] 创建 `docs/PROJECT_SPEC.md` — 完整功能需求规范
- [x] 创建 `docs/TECH_DECISIONS.md` — 技术选型决策记录
- [x] 创建 `.cursorrules` — Cursor / GitHub Copilot 规则文件
- [x] 创建 `docs/ACTIVE_CONTEXT.md` — 工作焦点追踪
- [x] 创建 `docs/PROGRESS.md` — 本文件

---

## 第二轮（2026-04-03）— 项目初始化与基础配置

- [x] 初始化 Next.js 14 项目（App Router + TypeScript + Tailwind CSS）
- [x] 配置 `tailwind.config.ts`（自定义颜色、字体、间距 Token）
- [x] 配置字体：Instrument Serif + Geist Sans + Geist Mono
- [x] 配置 `next.config.mjs`（注：Next.js 14 使用 .mjs 格式）
- [x] 创建 `app/globals.css`（全局样式变量）

---

## 第三轮（2026-04-04）— 双栏 SPA 架构 + 基础版各板块

- [x] 实现双栏架构（Fixed Sidebar + Dynamic Content Area）
  - 左侧固定 Sidebar：Profile 卡片 + 6 项主导航
  - 右侧动态内容区：AnimatePresence 淡入过渡
- [x] 安装并配置 framer-motion
- [x] 创建所有基础板块组件：
  - `AboutSection.tsx`（About Me）
  - `InterestsSection.tsx`（My Interests）
  - `CareerSection.tsx`（Career Journey）
  - `ProjectsSection.tsx`（Project Highlights）
  - `SideWorksSection.tsx`（Side Works）
  - `NextDestSection.tsx`（Next Destination）
- [x] Drill-down 导航（Side Works → 二级子页面）
- [x] `BusinessAnalysisGallery.tsx` + Markdown 文章驱动的卡片列表

---

## 第四轮（2026-04-04）— Languages 卡片 + Core Traits + 照片生长动画

### ✅ Languages 卡片移入 About Me Bento Box
- `AboutSection.tsx`：在 Bento Box 第5个卡片位置插入 `LanguagesCard`
- 三语（中文母语 / English C1 / Français B1+），色块旗帜 + level badge

### ✅ Core Traits 移到右侧照片区下方
- 新建 `CoreTraitsCard` 组件，放在 `PhotoPanel` 正下方
- 样式：`bg-white/80 border border-seed-shadow/10 shadow-sm rounded-lg`
- 去掉树状竖线，三层 pill groups 直接堆叠（OUTCOME / CORE ABILITIES / FOUNDATION）

### ✅ 照片区从下往上生长入场动画
- 右侧 `motion.div` 改为 `initial={{ scaleY: 0, opacity: 0 }}`，`style={{ transformOrigin: 'bottom' }}`
- spring-like ease `[0.16, 1, 0.3, 1]`，时长 0.75s

### ✅ Interests 学术兴趣右侧改为书架组件
- `InterestsSection.tsx`：新建 `BookShelf` 组件，8本书（后扩展至16本），分两排
- 点击书脊 → 书上浮 → 下方展开封面区（AnimatePresence 高度动画）

### ✅ 生活爱好改为杂志式布局 + 独立边框横向照片流
- 7个爱好从 pill 标签列表 → 2列杂志式卡片网格
- 横向照片流：`overflow-x: auto + scroll-snap`，每张图独立边框

### ✅ HTML 可交互调参原型
- 新建 `prototype.html`（浏览器直接打开，无需 npm）
- About Me Bento 完整预览 + 6个滑杆 + 3套预设 + 导出参数 JSON

---

## 第五轮（2026-04-04）— 金粉粒子 + 全局字体 + 荣誉时间轴

- [x] 侧边栏金粉粒子：粒子数量 25→40，速度加快，生命周期缩短
- [x] 全局字体：Times New Roman + 宋体
- [x] `CareerSection.tsx`：荣誉时间轴重构（横向时间轴 + Master-Detail 分屏）

---

## 第六轮（2026-04-04）— 内容规划头脑风暴

- [x] 与用户确认作品集内容规划：
  - Side Works 分为：商业分析 | Slides（路演作品）| Vibe Coding
  - Slides：绿壳鸡蛋 / 三创赛 / 国际商务大赛 / 特高压论文
  - Vibe Coding：LawFlaw / 其他 AI 工程项目
  - Digital Garden：Obsidian 自学笔记（暂缓）
- [x] 确认导航顺序：Side Works 在 Digital Garden 前

---

## 第七轮（2026-04-05）— 书架扩展 + 互动鱼缸 + 鼠标 + 金箔 + 签名

### ✅ 书架扩展至16本（上下各8）
- 上排8本 + 下排8本，下排右侧增加 SVG 台灯（可交互点亮/熄灭）

### ✅ 互动鱼缸（上排书架右侧）
- `FishTank` 组件：SVG 玻璃缸 + 2条小鱼摆动 + 点击投食（食物粒子下落，鱼上浮）

### ✅ 鼠标羽毛笔图标
- `public/assets/cursors/quill.svg`（32×32px，含 viewBox）
- `globals.css` cursor 热点修正：`url(...) 4 28`

### ✅ 侧边栏金箔叠加
- `app/page.tsx` aside：绝对定位金箔图片，`opacity: 0.055, mixBlendMode: 'multiply'`

### ✅ 签名修复
- 签名改为透明底 JPG，filter: `invert(1) brightness(0.25) sepia(0.3)`，w-40 尺寸

### ✅ 资源放置指南
- 新建 `docs/ASSETS_GUIDE.md`，记录所有图片/PDF/视频资源路径

---

## 第八轮（2026-04-05）— 导航重构 + Slides 画廊 + 全局动画

### ✅ 导航重构
- "AI Practice" → "Vibe Coding"
- SubNavKey: `"business" | "slides" | "vibe"`（原 `"ai"` → `"vibe"`，`"product"` → `"slides"`）
- Side Works 移到 Digital Garden 前

### ✅ SlidesGallery.tsx（新建）
- 2×2 网格，hover 时展开描述 + award + tags + PDF 链接
- 4个作品：绿壳鸡蛋 / 三创赛 / 国际商务大赛 / 特高压论文

### ✅ AIPracticeGallery → Vibe Coding
- 标题改为 Vibe Coding，副标题同步更新

### ✅ 全局动画
- 页面切换：blur + 弹性入场 `initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}`
- 导航按钮：`<motion.button whileTap={{ scale: 0.96 }}>`
- vine-right 视差：`useScroll + useTransform`（y: 0→-40px over 800px scroll）
- 侧边栏姓名金光扫过：`.shimmer-name` CSS keyframe 动画
- `globals.css` 新增：`@keyframes wave-scroll`、`@keyframes shimmer`

---

## 第九轮（2026-04-05）— 爱好照片注册表 + 漂流瓶 + 胶片轮播

### ✅ 爱好照片静态注册表
- 新建 `lib/hobbyPhotos.ts`，记录10张哈希文件名照片路径
- 解决 Next.js 无法在运行时枚举 public/ 目录的问题

### ✅ 兴趣板块 — 漂流瓶（生活爱好）
- 替换原 BubbleChart，使用用户提供的 `public/assets/decorations/1.svg` 和 `2.svg`
- 7个爱好瓶子交替使用两种 SVG，大小各异（52~76px 高）
- 各瓶独立上下浮动动画（3.4~4.7s 周期，错开延迟）
- 三层海浪 SVG 背景（CSS wave-scroll 无限左移，颜色加深至可见）
- 点击瓶子弹出复古纸条描述

### ✅ 兴趣板块 — 横向胶片带轮播（Moments）
- 替换原 KenBurns 单图轮播
- marquee 无缝循环：数组×2，motion.div 持续向左平移
- 148×148px 正方形照片，14px 间距，网站背景色（无黑底）
- 每张图叠加 Ken Burns 缓动缩放
- 左右边缘渐变软遮罩

---

## 第十轮（2026-04-07）— 漂流瓶 marquee 化 + 文字移至瓶下 + 切页回顶

### ✅ 漂流瓶改为 marquee 横向漂移
- 7个瓶子排成一行，从右向左持续飘过（约 63s 一圈，节奏舒缓）
- 每个瓶子叠加独立上下浮动（3.4~4.7s 周期）
- 超出左侧自动从右侧重新出现（数组复制×2 无缝循环）
- 左右边缘渐变遮罩

### ✅ 爱好标签文字移至瓶子正下方
- 移除瓶身内叠加文字（SVG 不规则形状导致对齐混乱）
- 改为瓶子下方固定 11px serif 字体，`whitespace-nowrap` 保证不换行

### ✅ 海浪颜色加深
- 主波：opacity 0.20→0.45，strokeWidth 1.5→2
- 副波：opacity 0.13→0.30，strokeWidth 1→1.5
- 细波：opacity 0.09→0.22，strokeWidth 0.8→1.2

### ✅ 切换页面滚动回顶部（双保险）
- `app/page.tsx`：新增 `useEffect`，每当 `contentKey` 变化后强制 `scrollTo({ top: 0, behavior: 'instant' })`
- 配合原有 `handlePrimaryNav` 里的即时滚动，解决 exit 动画期间滚动位置漂移问题

---

## 第十一轮（2026-04-07）— Slides 路演作品完全升级 + PDF预览 + 导航重组

### ✅ Slides 卡片交互全面重构
- **从模拟PPT框** → **实际PDF缩略图展示**
- 未悬停：显示 PDF 第1页缩略图 + 项目信息卡片（覆盖色背景）
- 悬停时：
  - 缩略图被替换为 **PDF预览卡片**（带黑色边框）
  - Framer Motion 动画切换，duration 0.2s
  - 显示**自动轮播感**（虽然当前仅映射第1页，但UI显示页码与自动播放状态）
  - 页码指示器：`Page 1 / {pageCount}`（如 "Page 1 / 35"）
  - 悬停提示：`"⏸ Auto-play paused"`（表现轮播暂停）

### ✅ PDF 自动轮播 + 悬停暂停逻辑
- `PDFPreview` 子组件独立实现
- `useEffect` 监听 `isHovered` 状态：
  - 未悬停时：`setInterval` 每 1.5s 切换页码
  - 悬停时：清除 interval，暂停轮播
- 页码循环：`prev >= pageCount ? 1 : prev + 1`

### ✅ Slides 数据结构升级
- 新增字段：
  - `pdfUrl`：PDF 文件路径（`/works/slides/` 目录）
  - `pdfPageCount`：PDF 总页数
  - `thumbUrl`：缩略图路径（用于卡片初始显示）
- 所有6个项目完成数据填充（包括新增4个项目）

### ✅ 新增 4 个 Slides 项目
| ID | 项目名称 | 赛事 | 年份 | PDF页数 |
|----|---------|----|------|---------|
| 1 | 绿壳鸡蛋农业品牌商业计划 | 全国商赛 | 2026.03 | 35 |
| 2 | 全场景具身智能消防机器人系统 | 三创赛 | 2026.03 | 26 |
| 3 | 校园拼车出行新模式 | 三创赛 | 2025.09 | 20 |
| 4 | 文化书吧实体IP赋能社交APP | 商赛 | 2025.06 | 27 |

### ✅ PDF 文件规范化 & 缩略图生成
- 创建目录：`public/works/slides/` 与 `public/works/research/`
- 复制6个 PPT PDF 文件到 `public/works/slides/`
- 使用 PyPDF2 + Pillow，为每个 PDF 生成**第1页缩略图**：
  - 格式：JPG，规格 500×360px，质量 85%
  - 命名：`原文件名_thumb.jpg`
  - 共生成6张缩略图，总占用空间 ~250KB（5个图）

### ✅ Side Works 导航顺序重组
- 旧顺序：Business | Slides | Vibe Coding
- 新顺序：Business | Vibe Coding | **Research** | Slides
- 导航配置位置：`app/page.tsx` 中的 `subNavItems` 数组

### ✅ Research（学术与科研）占位符
- 在 `subNavItems` 中添加 `research` 项
- `SubNavKey` 类型更新：`type SubNavKey = "business" | "vibe" | "research" | "slides"`
- `renderSubSection` 添加 research 分支（当前为 Coming Soon 占位符）
- 预留 icon：`"/assets/icons/project.svg"`，watermark："RESEARCH"
- 后续待填充：论文 PPT、调研报告、案例分析等学术内容

### ✅ 文档更新
- 新建 `docs/PDF_INVENTORY.md`：所有 PDF 文件清单、分类方案、文件夹规范
- 更新 `docs/ACTIVE_CONTEXT.md`：本轮工作内容总结 + 下一步计划
- 更新 `docs/PROGRESS.md`：补充第十一轮记录

### 🔧 技术变更
**修改文件**：
- `app/page.tsx`：更新 `SubNavKey` 类型、`subNavItems` 顺序、`renderSubSection` 函数
- `components/sections/gallery/SlidesGallery.tsx`：
  - 完全重写组件逻辑
  - 新增 `PDFPreview` 子组件（自动轮播 + 悬停暂停）
  - 导入 `useEffect`、`Image` from next/image
  - SlideItem 接口新增 pdfUrl / pdfPageCount / thumbUrl 字段
  - 使用 `motion.div` + `AnimatePresence` 实现卡片切换动画

**未修改**：
- 保持所有其他板块（AboutSection、InterestsSection 等）完全不变

---

## 第十三轮（2026-04-12）— Interests 学术兴趣补充区域国别研究

## 第十九轮（2026-04-12）— Next Destination 重塑（申请+志愿+学术）

- [x] 重构 `components/sections/NextDestSection.tsx` 全页文案结构
- [x] 保留 `Erasmus Mundus` 为核心申请目标（按用户新指令修正）
- [x] 新增 `Area Studies & Development Research` 目标路径
- [x] 新增生态志愿方向：鸟类保护与太平洋海洋环境项目
- [x] 页面副标题更新为“申请 / 志愿 / 学术三线并行”
- [x] 新增模块：`My Mission`、`Impact Directions`、`Personal Commitment`

### ✅ Interests 新增“区域国别研究”卡片
- `components/sections/InterestsSection.tsx`：在学术兴趣数组中新增 `区域国别研究 (Area Studies)`
- 保持与原三张卡一致的结构与交互：点击展开、三行滚动问句、hover 思考气泡
- 新增问句覆盖：区域研究方法、东盟与中欧经贸、语言能力、制度与文化差异、比较政治经济学
- 未调整现有书架、生活爱好与照片流布局，维持原有视觉节奏

### 📝 文档同步
- 更新 `docs/ACTIVE_CONTEXT.md`
- 更新 `docs/PROGRESS.md`

## 第十四轮（2026-04-12）— Career Journey 与 About Me 内容同步新简历

### ✅ Career Journey 内容更新
- `components/sections/CareerSection.tsx`：替换 TAL Education 与 FuncCat 的经历描述，改为新简历中的量化结果与职责表达
- TAL 更新为：36 本数学教材、50 万+词本地化翻译与校对、20+ 版本教具网站、多 Agent 审查、30+ SOP
- FuncCat 更新为：20+ 条 PRD、1000+ 条用户评价、SQL/Python 特征提取与聚类分析
- 荣誉时间轴中“学年优秀校际交换生”日期改为 `2026.4`

### ✅ About Me 内容同步
- `components/sections/AboutSection.tsx`：更新人设文案、人设标签、能力框架标题与技能栈内容
- 调整表达重点为教育科技 AI Workflow、业务翻译、SQL/Python、多 Agent 与 SOP 标准化

### 📝 文档同步
- 更新 `docs/ACTIVE_CONTEXT.md`
- 更新 `docs/PROGRESS.md`

## 第十五轮（2026-04-12）— About 能力框架与 TAL 指标微调

### ✅ About 能力框架保留 5 个框
- `components/sections/AboutSection.tsx`：能力框架由 3 个扩展为 5 个卡片
- 最终保留项：业务桥梁与流程重构、商业洞察与数据驱动、敏捷执行与综合素养、多 Agent 质量审查、SOP 标准化沉淀

### ✅ TAL 量化板块修正
- `components/sections/CareerSection.tsx`：将 TAL 第一条量化指标改为 `SOP 手册沉淀 30+ 份`
- 其余指标保持：`50 万+词` 与 `错误率降低 80%`

### 📝 文档同步
- 更新 `docs/ACTIVE_CONTEXT.md`
- 更新 `docs/PROGRESS.md`

## 第十八轮（2026-04-12）— 学术与实践两列布局 + 社会实践整合 + 图标更新

### ✅ Icon 路径更新
- `app/page.tsx`：projects 导航项 icon 改为 `"/assets/icons/Project highlights.svg"`（原为 `knowledge.svg`）

### ✅ AcademicResearchClient 完全重构为两列布局
- **组件改造**：
  - 新增 `FieldExperience` 接口（社会实践卡片数据结构）
  - 新增 `fieldExperiences` 常量，包含 3 条社会实践记录（BISFF、Shenzhen Expo、Hackathon）
  - 删除了原来的单列分类遍历逻辑
  
- **页面布局**：使用 `grid grid-cols-1 lg:grid-cols-2 gap-8`
  
- **左列（科研+调研）**：
  - 遍历 categories 筛选非 learning 类目
  - 挂载 research + fieldwork 卡片（2项调研）
  - 按分类分组，各有标题 + 描述 + 卡片列表
  - 卡片保持 whileHover + onClick 交互
  
- **右列（社会实践+自学笔记）**：
  - 社会实践（非交互）：
    - 硬编码 3 条数据，展示为普通 `<div>`（非 `<motion.button>`）
    - 无 onClick 处理，无 hover 动画
    - 卡片布局一致性，内含 title / role / desc / tags / period
  - 自学笔记（可交互）：
    - 筛选 category === "learning" 的 posts
    - 保留 motion.button + onClick + Drawer 逻辑
    - 共 1 项（CDA 数据分析体系）

### ✅ Drawer 区块保持不变
- 右侧滑入动画、内容展示、PDF 下载链接等逻辑保持第十七轮的设计

### ✅ 验证通过
- TypeScript 编译：零错误
- 导入链路：AcademicResearchGallery → AcademicResearchClient 正常
- 数据完整性：academicResearchPosts 4 项、fieldExperiences 3 项以及对应 categories

### 📝 文档更新
- 更新 `docs/ACTIVE_CONTEXT.md`（第十八轮详细记录 + 下一步计划深化 Drawer 内容）
- 更新 `docs/PROGRESS.md`

### 下一步计划（用户指定）
- 🎯 **深入优化交互卡片的 Drawer 展示内容**（用户原话："改完布局后我们来深入优化一下交互卡片后弹出来展示的内容"）
  - 等待用户的具体优化指示

## 第十七轮（2026-04-12）— Academic Research UI 统一重构 + 知识库图标创建

### ✅ AcademicResearchClient 完全重构
- `components/sections/gallery/AcademicResearchClient.tsx`：
  - 删除 Pill Tab 分类导航（原有 3 个分类切换按钮）
  - 删除 `activeCategory` 状态，保留单一 `selectedPost`
  - 重写布局：分类标题 + 平铺卡片列表（所有项目始终可见，按分类聚合）
  - 新增 `categoryDescriptions` 对象，为各分类提供详细说明文字

### ✅ Drawer 交互协议统一化
- 动画方向改为右侧滑入：`initial={{ x: "100%", opacity: 0 }}` → `animate={{ x: 0, opacity: 1 }}`（原为底部：`y: "100%"`）
- Drawer 面板：`fixed top-0 right-0 h-full w-full max-w-2xl`（全高右侧边栏）
- 背景遮罩色调：`bg-seed-shadow/25` 与整体设计风格一致
- 内部布局：flex 分为 header（固定顶栏）+ content（overflow-y 可滚动）

### ✅ Drawer 内容改进 — PDF 封面嵌入滚动区
- 标题 → 描述 → 标签 → 分割线 →  **[PDF 缩略图嵌入此处]** → Project Overview 信息框 → 下载按钮
- `coverImage` 从 Drawer 顶部分离的展示位置改为内容流中嵌入（真正随内容滚动）
- 添加 "Project Overview" 灰色背景信息框，重复显示 description 字段

### ✅ 导航图标创建与应用
- 新建 `public/assets/icons/knowledge.svg`（知识库风格 icon）：
  - 设计：藏青色书籍形状 + 多条水平线代表知识结构
  - 大小：SVG viewBox="0 0 24 24"，无固定填充（继承 currentColor）
- 更新 `app/page.tsx`：projects 导航 icon 改为 `"/assets/icons/knowledge.svg"`（原路径 `project.svg` 不存在）

### ✅ 验证与测试
- TypeScript 编译通过：零错误
- 组件导入链路正常：
  - `AcademicResearchGallery.tsx` → `AcademicResearchClient.tsx`
  - `categories` 正确导出自 `@/content/academic-research/index.ts`
  - `academicResearchPosts` 4 项数据完整
- PDF 缩略图文件确认存放：`public/works/academic-research/` 目录 4 张 JPG

### 📝 文档更新
- 更新 `docs/ACTIVE_CONTEXT.md`：新增第十七轮详细内容
- 更新 `docs/PROGRESS.md`：本条目

---

## 第十六轮（2026-04-12）— Interests 区域国别研究 + 导航重排 + Moments 新图

### ✅ Interests 学术兴趣新增区域国别研究
- `components/sections/InterestsSection.tsx`：新增 `区域国别研究 (Area Studies)` 卡片
- 保持原有交互风格：点击展开、三行滚动问题、hover 思考气泡

### ✅ 侧边栏顺序与入口调整
- `app/page.tsx`：将 `Career Journey` 提前到 `My Interests` 之前
- `app/page.tsx`：将主侧边栏 `Digital Garden / 个人知识库` 替换为 `Research / 学术与科研`

### ✅ Moments 新图片接入
- 复制 `个人资料/作品（待分类）` 下两张 PNG 到 `public/photo/hobbies/`
- 新文件名：`moments-11.png`、`moments-12.png`
- `lib/hobbyPhotos.ts`：已追加上述两张图片路径

### 📝 文档同步
- 更新 `docs/ACTIVE_CONTEXT.md`
- 更新 `docs/PROGRESS.md`

## 待完成事项

### 🎯 Research 板块内容（优先级 HIGH）
- [ ] 创建 `ResearchGallery.tsx` 组件，替换 Coming Soon 占位符
- [ ] 为学术论文 & 调研报告生成缩略图
- [ ] 填充数据：论文 PPT、实地调研报告、产业案例、商务案例

### 🎯 Slides 内容优化（可选）
- [ ] 是否需要实现多页缩略图阅览（当前仅显示第1页）
- [ ] PDF 链接是否添加下载按钮（当前仅为轮播预览）

### 🎯 内容填充（最核心）
- [ ] Business Analysis 作品内容完善
- [ ] Next Destination 申请规划板块内容
- [ ] 书架16本书确认为真实读过的书目

### 🎯 部署上线
- [ ] Git 初始化 → 推送 GitHub
- [ ] Vercel 连接部署
- [ ] QR Code 生成与简历整合

---

## 第十二轮（2026-04-07）— 侧边栏人设标签 + About SOP/理念卡片升级

### ✅ 侧边栏标签重写并对齐
- `app/page.tsx`：原 3 个标签替换为 4 个新标签
  - 非典型商科生
  - 脑洞落地机
  - Vibe Coding驯服中
  - FR学习施法中...
- 布局由 `flex wrap` 调整为 `2x2` 网格，标签统一高度与居中，排列更整齐

### ✅ 签名加载问题修复
- `app/page.tsx`：签名路径从 `/assets/decorations/signature.svg` 改为 `/assets/decorations/signature.jpg`
- 调整签名透明度，去除过度滤镜，保证签名清晰可见

### ✅ About 新增“个人工作 SOP 指南”与“工作理念”卡片
- `components/sections/AboutSection.tsx`：
  - `PaperCard` 新增 `parchment` 变体，复用 `paper-panel` 羊皮纸背景
  - 新增 `PersonalSopCard`（5 步 SOP）
  - 新增 `WorkPrinciplesCard`（利他原则 / 即时反馈）
  - 在 About 左侧 Bento 网格插入两张新卡，增强叙事层次

### ✅ 表达形式优化（非平铺直叙）
- SOP 采用编号步骤流呈现（1→5），强调流程化思维
- 工作理念采用双分栏重点卡片，突出可执行原则

### ✅ A + C 融合微迭代（同轮增量）
- `components/sections/AboutSection.tsx`：
  - SOP 每步新增微图标（目标/文档/诊断/链路/复盘）
  - SOP 与理念卡新增“纸张层叠”底片，增强羊皮纸质感
  - 工作理念卡新增关键句高亮色条（红/绿），提升扫描效率
- 结果：保持 A 方案清晰结构，同时吸收 C 方案视觉记忆点

### ✅ About 布局 V2（按图二重排）
- `components/sections/AboutSection.tsx`：
  - 工作理念改为横向双栏（两原则并排）
  - 三张能力小卡合并为一张大横向 `Capability Frame` 卡（3列）
  - 新增 `SkillStackCard`（从作品侧能力结构迁移）
  - 底部合并为 `LanguageContactPanel`（语言能力 + 联系方式双栏）

### ✅ About 布局 V3（按截图标注微调）
- `app/page.tsx`：
  - 侧边栏 Tag 缩小字号并固定单行显示
  - 签名尺寸放大，叠加 `multiply` 混合模式减弱白底突兀感
- `components/sections/AboutSection.tsx`：
  - 语言能力 + 联系方式移动到右侧照片区下方
  - Skill Stack 从分组列表改为标签墙风格
  - Core Traits 整体放大（标题、节点、连线、胶囊），并改为每次滚入都触发生长动画

### ✅ About 布局 V4（签名 PNG + 技能堆栈视觉改版）
- `app/page.tsx`：
  - 侧边栏签名改为优先加载 `/assets/decorations/signature.png`
  - 若 PNG 不存在则自动回退 `/assets/decorations/signature.jpg`
- `components/sections/AboutSection.tsx`：
  - Skill Stack 改为“深色卡片 + 技能进度条”风格
  - 视觉参考用户图二：高对比标题、横向蓝色进度条、分层信息密度更强

### ✅ About 布局 V5（技能堆栈风格回归 + 悬停文案）
- `components/sections/AboutSection.tsx`：
  - 按用户要求移除深色背景，Skill Stack 回归站点浅色风格
  - 保留横向技能条样式，统一在羊皮纸语境下呈现
  - 新增每个技能条的 hover 提示文案（软件具体应用短句）

### ✅ About 布局 V6（技能条棕色化 + 入场生长动画）
- `components/sections/AboutSection.tsx`：
  - 技能条主色由蓝色改为棕色（与站点配色统一）
  - 技能条改为 `motion.div`，页面进入时按序生长显示

### ✅ 侧边栏 Tag 动效定制（按 ID 分配）
- `app/page.tsx`：
  - 侧边栏四个 Tag 改为 `motion` 组件并基于 `id` 分配独立 `whileHover` 动效
  - 新增 `TagBadge` 组件，封装每个标签的专属交互逻辑
  - FR 标签新增金色文字渐变与轻量 glitter 叠加层（鼠标移动触发并缓慢消散）

### ✅ Interests 书架布局优化（右侧留白收敛）
- `components/sections/InterestsSection.tsx`：
  - `Book3D` 书脊宽度 20→22，`Shelf` 内书本间距由 `gap-0.5` 调整为 `gap-1.5`
  - `Shelf` 改为左右分区布局：左侧书本、右侧装饰（鱼缸/台灯）独立右对齐
  - `FishTank` 重绘为横向长方形缸体（宽 136 / 高 90），鱼与投食动画轨迹同步改造
  - `DeskLamp` 改为更宽比例（宽 84 / 高 146），灯罩、灯臂、底座整体加厚

### ✅ About 右侧信息卡拆分（语言能力单独一卡片）
- `components/sections/AboutSection.tsx`：
  - `LanguageContactPanel` 拆分为 `LanguagePanelCard` 与 `ContactPanelCard`
  - 右侧照片下方改为两张独立 `PaperCard` 纵向堆叠
  - 联系方式文字字号由 `text-xs` 提升为 `text-sm`

### ✅ About 右侧媒体替换为视频（白底融合）
- `components/sections/AboutSection.tsx`：
  - `PhotoPanel` 顶部区域替换为 `/assets/tree-growth.mp4`
  - 视频属性：`autoPlay` + `loop` + `muted` + `playsInline`（无 controls）
  - 样式使用 `mix-blend-multiply` + `opacity-90`，提升白底素材融合质感
  - 采用固定比例容器 `aspect-[16/10]`，避免页面布局抖动

### ✅ About 树视频二次调优（开场一次 + 树体聚焦）
- `components/sections/AboutSection.tsx`：
  - 去除 `loop`，视频仅开场自动播放一遍
  - `object-cover + scale` 裁切聚焦树体，减少空白边缘干扰
  - 强化滤镜：`contrast + brightness + saturate`，进一步压低白底可见度

---

*最后更新：2026-04-07 | 记录至第十二轮开发*
