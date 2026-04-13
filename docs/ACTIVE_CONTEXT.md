# Active Context — 当前工作焦点

> 最后更新：2026-04-13（第七十三轮）
> 历史开发记录请查看 `docs/PROGRESS.md`

---

## 当前状态

Next Destination 中 Erasmus 条目图标已替换为欧洲旗帜，避免与 Area Studies 条目图标重复。

---

## 最近完成（第七十三轮）

### ✅ Erasmus 条目 icon 去重
1. `components/sections/NextDestSection.tsx`：将 `Academic Anchor（Erasmus）` 的图标从 `🌍` 改为 `🇪🇺`
2. 保持原有文案、布局与交互不变，仅做视觉区分优化

---

## 最近完成（第七十二轮）

### ✅ Next Destination 足迹与航向新增
1. `components/ui/ChinaProvinceMap.tsx`：`PROVINCE_EXPERIENCES` 新增 `重庆（500000）` 与 `贵州（520000）`，并标注旅游经历（贵州为“旅游 · 贵阳”）
2. `components/sections/NextDestSection.tsx`：在“航向与终极愿景”列表新增 `🌍 Area Studies & Global South` 条目，补充“区域国别与全球发展”目标阐述
3. 校验：相关文件改动后无类型/语法错误

---

## 最近完成（第七十一轮）

### ✅ 小民快跑角色文案精简
1. `content/career/internships/xiaomin-kuaipao.md`：`role` 文案从“市场营销与产品运营实习生 · 创业孵化 / 从 0 到 1”改为“市场营销与产品运营实习生 · 创业孵化”
2. 仅文字微调，不影响布局与交互

---

## 最近完成（第七十轮）

### ✅ Career 默认项 + 时间排序 + 侧边栏文案调整
1. `components/sections/CareerSection.tsx`：Career 默认详情改为首个实习项，加载完成后先显示好未来，不再落到香港岭南大学
2. `components/sections/gallery/AcademicResearchClient.tsx`：社会实践卡按时间升序重排，`SheNicest` 统一更新为 `2026.03`
3. `components/sections/SideWorksSection.tsx`：社会实践列表按时间升序重排，`SheNicest` 同步更新为 `2026.03`
4. `app/page.tsx`：侧边栏 Research 文案改为 `Academic & Practice`

---

## 最近完成（第六十九轮）

### ✅ 小民快跑实习条目接入
1. 新增 `content/career/internships/xiaomin-kuaipao.md`
2. 将 `E:\portfolio-site\个人资料\作品（待分类）\小民快跑.jpg` 复制到 `public/assets/icons/xiaomin-kuaipao.jpg`
3. `components/sections/CareerSection.tsx`：新增 `prefix` 字段支持，用于 `运营闭环效率 <24h` 的展示
4. 浏览器可直接读取该条目对应的 logo、指标、Highlights、Method 与 Reflection

---

## 最近完成（第六十八轮）

### ✅ 中央民族大学引言文案更新
1. `components/sections/CareerSection.tsx`：`minzu` 教育条目 `quote` 更新为新文案
2. 仅替换文字，不改动交互与布局

---

## 最近完成（第六十七轮）

### ✅ Career Journey 详情区占位卡移除 + 教育卡内容恢复
1. `components/sections/CareerSection.tsx`：移除详情区顶部机构名称信息卡（公司/学校名称占位卡）
2. `components/sections/CareerSection.tsx`：修复教育卡点击后被 effect 强制切回实习卡的问题
3. 保留实习与教育左侧卡片结构、右侧 Quote/Highlights/Skills 渲染逻辑不变
4. 浏览器复核：`香港岭南大学`、`中央民族大学` 点击后正文均正常渲染

---

## 最近完成（第六十六轮）

### ✅ 中国省图垂直位置微调
1. `components/ui/ChinaProvinceMap.tsx`：在 `projectionConfig` 增加 `translate: [400, 212]`
2. 目标：将省图整体向下轻移，避免顶部边缘被裁切
3. 结果：保持现有高亮/tooltip/图例逻辑不变，仅调整视觉布局

---

## 最近完成（第六十五轮）

### ✅ 中国省级地图“缩点/失真”根因修复
1. `components/ui/ChinaProvinceMap.tsx`：新增 GeoJSON ring 方向统一处理（`reverseGeometryRings`），修复 d3 将省份误判为“全球减去省份”造成的大面填充与视区失真
2. `components/ui/ChinaProvinceMap.tsx`：省级 feature 过滤增加兜底策略（严格 `level=province` 不足时回退到 `adcode` 规则），降低数据字段差异风险
3. `components/ui/ChinaProvinceMap.tsx`：`filteredGeo` 改为 `useMemo` 计算，确保投影输入稳定
4. `components/ui/ChinaProvinceMap.tsx`：投影参数回调为稳定中国视角（`rotate + center + scale`）
5. 浏览器复核：省图完整显示，港澳 marker、高亮颜色与图例正常

---

## 最近完成（第六十四轮）

### ✅ Academic Energy 抽屉正文恢复
1. 新增 `app/api/academic-content/route.ts`：读取 `content/academic-research/*.md` 正文内容
2. `components/sections/gallery/AcademicResearchClient.tsx`：抽屉新增 `contentFile` 异步加载逻辑（含 loading 与失败提示）
3. 兼容策略：若 `post.content` 已存在则优先使用；为空时自动回退到 API 读取 md
4. 结果：`uhv-power-transmission.md` 已可在抽屉正常渲染

---

## 最近完成（第六十三轮）

### ✅ Luma 播放速度 + 中国省图显示稳定性增强
1. `components/sections/gallery/AIPracticeClient.tsx`：Luma Flow 视频在抽屉内默认播放速度设为 `0.75x`
2. `components/ui/ChinaProvinceMap.tsx`：省图投影参数调整（`center/scale`）以提升不同屏宽下显示稳定性
3. `components/ui/ChinaProvinceMap.tsx`：省份边界线宽下调，避免港澳等微小区域被描边吞没
4. `components/ui/ChinaProvinceMap.tsx`：新增港澳可见锚点（Marker），解决“hover 命中但视觉空白”
5. 校验：相关文件均无错误

---

## 最近完成（第六十二轮）

### ✅ 足迹版图双 bug 修复（世界 tooltip + 中国省图层）
1. `components/ui/ClassicalMap.tsx`：世界地图 tooltip 对未收录国家改为友好兜底文案，不再回退显示数字 ID
2. `components/ui/ChinaProvinceMap.tsx`：省级地图 feature 过滤升级为仅保留 `level=province` + `adcode` 六位数字（排除全国聚合/遮挡层）
3. `components/ui/ChinaProvinceMap.tsx`：省份编码提取兼容 `adcode/id` 双来源，降低数据源差异导致的异常
4. 校验：`ClassicalMap.tsx`、`ChinaProvinceMap.tsx` 均无报错；页面下钻显示正常

---

## 最近完成（第六十一轮）

### ✅ Vibe 右侧封面流加载修复
1. `components/sections/gallery/AIPracticeClient.tsx`：封面候选改为按 slug 精确文件映射（匹配当前 `public/works/covers/vibe` 真实文件）
2. `components/sections/gallery/AIPracticeClient.tsx`：`VibeCoverThumb` 增加 `slug` 切换时状态重置，避免单次失败后长期停留占位态
3. `components/sections/gallery/AIPracticeClient.tsx`：新增封面加载过渡层与淡入，提升首次渲染观感
4. 浏览器校验：右侧封面流检测到 12 张图片、0 张损坏

---

## 最近完成（第六十轮）

### ✅ Vibe 区优雅动效升级 + Luma 资源落地
1. `components/sections/gallery/AIPracticeClient.tsx`：右侧竖向封面流高度拉满至视口底部（sticky 场景），滚动速度进一步降低
2. `components/sections/gallery/AIPracticeClient.tsx`：封面流单卡新增轻微 x/y/scale 波动，形成柔和视差感
3. `components/sections/gallery/AIPracticeClient.tsx`：卡片点击抽屉时新增高亮脉冲反馈（配合金粉扩散）
4. `components/sections/gallery/AIPracticeClient.tsx`：新增板块级金箔漂浮粒子装饰层，提升与主页面一致性
5. `content/vibe-coding/index.ts`：`luma-flow` 新增 `githubUrl`
6. 资源更新：`public/works/vibe/luma-flow.mp4` 已就位，替换原视频占位

---

## 最近完成（第五十九轮）

### ✅ Vibe Coding 双列重构 + 交互动效升级
1. `components/sections/gallery/AIPracticeClient.tsx`：新增按 `date` 字段倒序排序（最新项目置顶）
2. `components/sections/gallery/AIPracticeClient.tsx`：主内容改为双列结构（左侧列表 / 右侧封面流）
3. `components/sections/gallery/AIPracticeClient.tsx`：卡片点击新增金粉扩散反馈动效
4. `components/sections/gallery/AIPracticeClient.tsx`：右侧新增“竖向循环封面流”，支持持续下行与轻微波动

---

## 最近完成（第五十八轮）

### ✅ 实习成果滚动栏体验优化 + 规则文档落地
1. `components/sections/CareerSection.tsx`：成果图卡片由 `w-48 h-28` 放大为 `w-64 h-40`
2. `components/sections/CareerSection.tsx`：滚动时长由 `20s` 调整为 `36s`（更慢）
3. `components/sections/CareerSection.tsx`：实习详情去除顶部公司名称占位卡，教育经历保持原样
4. 新建 `docs/CAREER_INTERNSHIP_MD_RULES.md`：统一记录实习 md 新增/维护规则与图片滚动栏配置规范

---

## 最近完成（第五十七轮）

### ✅ 好未来实习接入三张成果图
1. 将 `个人资料/作品（待分类）` 下 3 张新图复制到 `public/works/internships/tal/` 并重命名为 `tal-01.jpg` ~ `tal-03.jpg`
2. `content/career/internships/tal-education-group.md` 新增 `galleryImages` 配置
3. 结果：Career Journey 的好未来详情页末尾自动显示成果图滚动栏

---

## 最近完成（第五十六轮）

### ✅ Career 实习改为 md 驱动（含可选图片滚动栏）
1. 新增 `content/career/internships/tal-education-group.md` 与 `content/career/internships/funcat.md`
2. 新增 `app/api/career-internships/route.ts`：服务端读取并解析 md/frontmatter，返回实习列表
3. `components/sections/CareerSection.tsx`：实习卡片改为 API 拉取，不再硬编码在组件内
4. `components/sections/CareerSection.tsx`：详情面板支持渲染 md 正文（ReactMarkdown + remark-gfm）
5. `components/sections/CareerSection.tsx`：新增可选成果图自动滚动栏，仅当 md frontmatter 配置 `galleryImages` 时展示
6. 按用户要求：函数猫实习不放图片滚动占位；新增后续实习模板 `content/career/internships/_template.md`

---

## 最近完成（第五十五轮）

### ✅ Vibe 新增项目：Luma Flow
1. `content/vibe-coding/index.ts`：新增 `luma-flow` 项目卡片（video 类型）
2. `content/vibe-coding/luma-flow.md`：新增正文（需求觉察 / 痛点与挑战 / 落地解法 / 迭代心得）
3. `components/sections/gallery/AIPracticeClient.tsx`：封面候选新增 `Luma Flow.jpg` 兼容
4. `components/sections/gallery/AIPracticeClient.tsx`：视频资源缺失时显示占位文案与目标路径，避免黑屏空播放器
5. 校验：`content/vibe-coding/index.ts`、`AIPracticeClient.tsx` 均无错误

---

## 最近完成（第五十四轮）

### ✅ 侧边栏顺序调整（兴趣领域后置）
1. `app/page.tsx`：调整 `navItems` 顺序，将 `My interests / 兴趣领域` 移动到 `Research / 学术与实践` 后方
2. 保持图标、文案、watermark 与现有跳转逻辑不变
3. 校验：`app/page.tsx` 无错误

---

## 最近完成（第五十三轮）

### ✅ 书架 hover 裁切二次修复 + Career 引导滚动质感优化
1. `components/sections/InterestsSection.tsx`：书架容器改为 `overflow-visible`，避免 `overflow-x-hidden/overflow-y-visible` 的浏览器退化裁切
2. `components/sections/CareerSection.tsx`：将 `scrollIntoView(smooth)` 替换为自定义缓动滚动（`easeInOutCubic` + `requestAnimationFrame`）
3. 引导滚动时长延长至约 1050ms，并保留触发延迟，避免“速度快、下滑生硬”
4. 增加滚动动画 RAF 清理，避免组件卸载时残留动画帧
5. 校验：`InterestsSection.tsx`、`CareerSection.tsx` 均无错误

---

## 最近完成（第五十二轮）

### ✅ Career Journey「中央民族大学」交互后自动下滑引导
1. `components/sections/CareerSection.tsx`：新增 `handleExperienceSelect` 统一处理卡片点击
2. 当点击 `minzu` 卡片时，延迟触发 `scrollIntoView({ behavior: 'smooth' })` 自动定位到荣誉区
3. 引导仅触发一次（`hasGuidedToHonors`），避免反复打断用户
4. 新增定时器清理逻辑，避免组件卸载后的悬空回调
5. 校验：`components/sections/CareerSection.tsx` 无错误

---

## 最近完成（第五十一轮）

### ✅ My Interests 书架 Hover 预览出框修复
1. `components/sections/InterestsSection.tsx`：将书架容器从 `overflow-hidden` 改为 `overflow-x-hidden overflow-y-visible`
2. 保留原有圆角、边框、阴影与背景风格，不改动书架交互逻辑
3. 结果：第一排书籍 hover 封面预览可向上溢出，不再被书架框截断
4. 校验：`components/sections/InterestsSection.tsx` 无错误

---

## 最近完成（第五十轮）

### ✅ 商业分析板块临时隐去（保留文件）
1. `app/page.tsx`：新增 `ENABLE_BUSINESS_ANALYSIS` 开关，当前设置为 `false`
2. Side Works 二级菜单改为使用 `visibleSubNavItems`，隐藏 `Business Analysis` 入口
3. 保留 `BusinessAnalysisGallery` 组件与所有内容文件，不做删除
4. 增加兜底：若状态落在 `business`，会自动回退到 `vibe`，避免空状态
5. 校验：`app/page.tsx` 无错误

---

## 最近完成（第四十九轮）

### ✅ 学术与实践：供应链条目内容更新
1. `content/academic-research/index.ts`：定位并更新 `steel-supply-chain` 条目正文
2. 将用户提供的完整文本按章节结构落地：
  - `研究缘起（Genesis）`
  - `角色（Role）`
  - `实证/调研路径（Methodology）`
  - `核心结论（Key Findings）`
  - `过程中遇到的问题和解决方案（Problem & Solution）`
  - `个人心得体会（Reflection）`
3. 保持现有学术抽屉渲染机制不变（无需改组件），仅替换内容数据
4. 校验：`content/academic-research/index.ts` 无错误

---

## 最近完成（第四十八轮）

### ✅ Next Destination 省级地图下钻空白修复
1. `components/ui/ChinaProvinceMap.tsx`：新增 GeoJSON 双源加载策略
  - 本地优先：`/geo/china-provinces.json`
  - 兜底源：`https://code.highcharts.com/mapdata/countries/cn/cn-all.geo.json`
2. 省份识别逻辑升级：兼容 `adcode` 与 `hc-key`，避免数据源切换导致足迹高亮失效
3. 新增强化状态：加载中提示、加载失败提示与重载按钮，避免“静默空白”
4. 验证：`npm.cmd run build` 通过（编译、类型检查、静态页面生成全部成功）

---

## 最近完成（第四十七轮）

### ✅ About Me 文案替换
1. `components/sections/AboutSection.tsx`：`Who I Am` 段落替换为用户提供的新引言与正文
2. 移除旧版“国际经贸底色 × AI Workflow 落地者…”文案
3. 浏览器验证：新文案显示，旧文案不再出现

---

## 最近完成（第四十六轮）

### ✅ 路演作品悬停下载问题彻底修复
1. `components/sections/gallery/SlidesGallery.tsx`：`PDFFrame` 由 iframe 改为多页图片（`_p1.jpg`~`_p6.jpg`）纵向滚动预览
2. 保留“手动滚动预览”交互语义，但不再请求 PDF 资源
3. 浏览器验证：Slides 悬停 `iframeCount=0`、`previewPages=6`

### ✅ 学术与实践（密云区）内容实装
1. `content/academic-research/index.ts`：`rural-agriculture` 条目替换为用户提供全文
2. 新增并补齐章节：
  - `研究缘起（Genesis）`
  - `角色（Role）`
  - `实证/调研路径（Methodology）`
  - `核心结论（Key Findings）`
  - `过程中遇到的问题和解决方案（Problem & Solution）`
  - `个人心得体会（Reflection）`

---

## 最近完成（第四十五轮）

### ✅ LawFlaw 抽屉下载触发修复（再次）
1. `components/sections/gallery/AIPracticeClient.tsx`：说明书预览改回手动展开
2. 抽屉打开时不再立刻挂载 PDF iframe，避免点击卡片即触发下载

### ✅ Slides 手动下滑预览能力恢复
1. `components/sections/gallery/SlidesGallery.tsx`：`PDFFrame` 恢复 iframe 预览（`scrollbar=1`）
2. 当前悬停卡片可再次使用 PDF 原生滚动浏览

### ✅ 路演时间修正
1. `components/sections/gallery/SlidesGallery.tsx`：`校园拼车出行新模式` 时间改为 `2025.3`

---

## 最近完成（第四十四轮）

### ✅ 路演作品预览不再触发 PDF 下载
1. `components/sections/gallery/SlidesGallery.tsx`：`PDFFrame` 从 iframe 改为 `*_p1.jpg` 预览图
2. `SlideCover` 缩略图加载失败时不再回退 iframe，改为纯占位文案
3. 移除卡片上的 `打开 PDF` / `在新窗口打开 PDF` 链接按钮
4. 浏览器验证：Slides 页面 `iframeCount=0`、`previewImg=1`，悬停预览仅显示图片不触发下载

---

## 最近完成（第四十三轮）

### ✅ 封面与嵌入图片去重
1. `components/sections/gallery/AIPracticeClient.tsx`：移除默认“嵌入图片”展示逻辑
2. 纯图片项目不再显示空的 `Media` 区块，避免“封面 + 嵌入图”重复表达

### ✅ LawFlaw 标题与说明书预览调整
1. `content/vibe-coding/index.ts`：标题改为 `LawFlaw AI 智能合规系统`
2. `AIPracticeClient`：说明书改为直接嵌入可滚动 PDF 预览（不再需要点击加载）
3. 移除下载按钮与跳转式交互入口

### ✅ 浏览器侧验证
1. LawFlaw 卡片标题已更新
2. 抽屉内不再出现“嵌入图片”
3. 说明书预览区为直接嵌入 iframe（无点击加载按钮）

---

## 最近完成（第四十二轮）

### ✅ LawFlaw 卡片点击触发 PDF 下载问题修复
1. `components/sections/gallery/AIPracticeClient.tsx`：LawFlaw 的说明书预览改为“手动加载”
2. 卡片打开时不再自动挂载 PDF iframe，避免浏览器直接下载 PDF

### ✅ Vibe 封面改为 Notion 风格嵌入
1. 参考 AcademicResearch Drawer：固定高度封面 + 双层渐变 + 暗角 + 标题白框叠层
2. 封面区同时承载类型与日期信息，保持与学术抽屉一致的阅读节奏

### ✅ 清理视频下重复图片嵌入
1. 嵌入图片显示条件改为仅 `mediaType === "image"`
2. `video` 与 `mixed` 类型不再显示“嵌入图片”区块

---

## 最近完成（第四十一轮）

### ✅ 紧急修复：网页打不开（500 Internal Server Error）
1. 根因定位：`AIPracticeGallery` 被 `app/page.tsx`（`use client`）引入后，内部 `fs` 依赖触发 `Module not found: Can't resolve 'fs'`
2. 修复方案：
  - `components/sections/gallery/AIPracticeGallery.tsx` 改回纯客户端安全包装（不再引入 Node.js 模块）
  - `components/sections/gallery/AIPracticeClient.tsx` 恢复通过 `/api/vibe-coding-content` 拉取 md 正文
3. 稳定性补丁：
  - 修复 `selectedPost` 空值类型检查
  - 调整 `AIPracticeClient` 引用路径，消除模块解析抖动
4. 验证结果：`http://localhost:3000` 页面可打开，结构快照恢复正常

---

## 最近完成（第四十轮）

### ✅ 大学生综测系统正文实装
1. `content/vibe-coding/student-evaluation-system.md`：补全 `Project Overview`
2. 按用户提供内容写入四大章节：
  - `需求觉察（Motivation）`
  - `痛点与挑战（Pain Points）`
  - `落地解法（Implementation）`
  - `迭代心得（Iteration Notes）`

### ✅ Vibe 媒体目录再次按源文件覆盖同步
1. 源目录：`个人资料/作品（待分类）/vibe coding/`
2. 目标目录：
  - `public/works/vibe/`
  - `public/works/covers/vibe/`
3. 已覆盖同步视频、图片与 PDF 映射文件，确保嵌入区读取最新素材

### ✅ LawFlaw 封面路径增强兜底
1. `components/sections/gallery/AIPracticeClient.tsx` 新增封面候选路径机制
2. 对 `lawflaw-ai-assistant` 优先支持：
  - `/works/covers/vibe/lawflaw-ai-assistant.jpg`
  - `/works/covers/vibe/LawFlaw.jpg`
  - `/works/covers/vibe/lawflaw-ai-assistant.png`

---

## 最近完成（第三十九轮）

### ✅ 修复封面图 / 视频 / 图片 / PDF 不显示
1. 批量复制原始素材到页面实际路径：
  - `public/works/vibe/`（mp4、pdf、截图）
  - `public/works/covers/vibe/`（封面图）
2. `AIPracticeClient` 新增 `Media` 区块：
  - 封面图预览
  - 嵌入视频（video controls）
  - 嵌入图片
  - 路演 PDF iframe + 新窗口打开按钮
3. `SlidesGallery` 增加路径编码函数，修复中文文件名 PDF/缩略图在 iframe 中的兼容性
4. `SlidesGallery` 卡片新增“打开 PDF”按钮，避免仅依赖 iframe 预览

### ✅ 修复 icon 文件名兼容问题
1. 新增图标副本：`public/assets/icons/project-highlights.svg`
2. `app/page.tsx` 将 projects 导航图标路径改为无空格命名

### ✅ 修复 Vibe markdown 封面路径不一致
1. 更新以下 md 封面路径，和已存在文件保持一致：
  - `content/vibe-coding/lawflaw-ai-assistant.md`
  - `content/vibe-coding/challenge-cup-website.md`
  - `content/vibe-coding/portfolio-early-version.md`
  - `content/vibe-coding/student-evaluation-system.md`

---

## 最近完成（第三十八轮）

### ✅ Vibe Coding 卡片层级与分隔优化
1. `components/sections/gallery/AIPracticeClient.tsx`：卡片容器改为统一边框 + `divide-y` 分割结构
2. 增加左侧 hover 高亮条、标签圆角与日期对齐，提升条目可扫描性
3. 文案提示从“占位内容”改为“正文来自 markdown 文件”，降低认知偏差

### ✅ 修复 md 正文未加载
1. `components/sections/gallery/AIPracticeGallery.tsx`：改为服务端直接读取 `content/vibe-coding/*.md`
2. `AIPracticeClient` 移除客户端 fetch 依赖，抽屉直接渲染注入内容
3. 当文件读取失败时提供明确兜底文案，避免空白抽屉

### ✅ 挑战杯条目内容实装
1. `content/vibe-coding/challenge-cup-website.md`：补全 `Project Overview`
2. 按用户提供正文写入四大章节：
  - `需求觉察（Motivation）`
  - `痛点与挑战（Pain Points）`
  - `落地解法（Implementation）`
  - `迭代心得（Iteration Notes）`
3. `content/vibe-coding/index.ts`：同步更新挑战杯条目的描述文案

---

## 最近完成（第三十五轮）

### ✅ Vibe Coding 旧内容清空并改为素材驱动
1. `components/sections/gallery/AIPracticeGallery.tsx`：移除原硬编码 4 条旧项目文案
2. 新增数据源：`content/vibe-coding/index.ts`，根据用户目录扫描结果建立项目清单
3. 新增媒体类型标识（Image / Video / Image + Video）与素材来源展示
4. 验证阶段顺带修复 `content/academic-research/index.ts` 重复定义与引号语法错误，恢复页面可编译状态

### ✅ 按约定模板生成 Vibe Coding 项目 md 占位
1. 新建目录：`content/vibe-coding/`
2. 为识别出的项目创建 5 个 md 占位稿（含封面图位、图片位/视频位）
3. 新建静态投放目录：
  - `public/works/covers/vibe/`
  - `public/works/vibe/`

---

## 最近完成（第三十六轮）

### ✅ Vibe Coding 支持点击卡片查看 md 正文抽屉
1. `components/sections/gallery/AIPracticeGallery.tsx` 改为 Server Component：按 `contentFile` 读取 `content/vibe-coding/*.md`
2. 新增 `components/sections/gallery/AIPracticeClient.tsx`：实现卡片点击、右侧抽屉、Markdown 渲染（`react-markdown + remark-gfm`）
3. `content/vibe-coding/index.ts` 增加可选字段 `content`，用于承载服务端注入的正文

### ✅ LawFlaw 项目正文补全
1. `content/vibe-coding/lawflaw-ai-assistant.md` 已写入：
  - 需求觉察
  - 痛点与挑战
  - 落地解法
  - 迭代心得
2. 保留封面图与视频占位区，便于后续直接替换素材

---

## 最近完成（第三十七轮）

### ✅ AgriMind 项目正文实装
1. `content/vibe-coding/agrimind-eco-platform.md`：补全可投递式 `Project Overview`
2. 按用户提供内容实装四大章节：
  - `需求觉察（Motivation）`
  - `痛点与挑战（Pain Points）`
  - `落地解法（Implementation）`
  - `迭代心得（Iteration Notes）`
3. 保留封面图/视频占位结构，便于后续素材替换与发布

---

## 最近完成（第三十四轮）

### ✅ 网页无法打开紧急修复（构建失败修复）
1. 复现并定位：`next build` 报错 `UnhandledSchemeError`，由 `node:fs` 与 `node:path` 导入触发
2. 修复文件：`components/sections/gallery/AcademicResearchGallery.tsx`
  - `import { readFileSync } from "node:fs"` → `import { readFileSync } from "fs"`
  - `import path from "node:path"` → `import path from "path"`
3. 验证：`npm.cmd run dev` 可正常启动，当前本地地址为 `http://localhost:3001`（3000 被占用自动切换）

---

## 最近完成（第三十轮）

### ✅ 学术条目改为 Markdown 外置可维护
1. `content/academic-research/index.ts`：`uhv-power-transmission` 新增 `contentFile` 字段，正文不再内联硬编码
2. 新建 `content/academic-research/uhv-power-transmission.md`：作为该条目的唯一正文来源，后续可直接编辑该 md 文件
3. `components/sections/gallery/AcademicResearchGallery.tsx`：在服务端增加 `contentFile` 读取逻辑（`node:fs` + `path`），优先加载 md 内容，读取失败时自动回退到内联内容

---

## 最近完成（第二十九轮）

### ✅ 学术与实践条目内容实装（UHV 论文）
1. `content/academic-research/index.ts` 中 `uhv-power-transmission` 条目标题已从中文占位改为论文英文标题：
  - `Energy-Computing Synergy How UHV Projects and Digital`
2. 原占位稿已替换为完整研究内容：
  - `Project Overview`
  - `研究缘起 / 角色核心 / 实证路径`
  - 多期 DID 模型公式、189,822 条资产数据口径
  - 核心结论、挑战与破局表格、个人心得
3. 内容已对齐“学术与实践”详情抽屉的结构化展示方式

---

## 最近完成（第二十八轮）

### ✅ 抽屉右侧定位兜底（防 CSS 失效）
1. 学术与商业 Drawer 的遮罩层、固定层、抽屉本体新增内联 `position/inset/right/height/width` 样式
2. 即使 utility class 瞬时失效，也能保持“固定全屏层 + 右侧抽屉”结构
3. 实测抽屉矩形已非 `left=0` 全铺形态，恢复右侧侧栏观感

### ✅ 商业分析封面可见性恢复
1. 当前检测到 `public/works/covers/business/` 为空导致封面不显示
2. 已放入临时文件：`public/works/covers/business/southeast-asia-market.jpg`
3. 用户可后续用自己的截图同名覆盖替换

---

## 最近完成（第二十七轮）

### ✅ Drawer 右侧贴边再加固（Hard Anchor）
1. 学术与商业 Drawer 均新增全屏 `fixed inset-0` 图层（`pointer-events-none`）
2. 抽屉本体改为该图层内 `absolute top-0 right-0`（`pointer-events-auto`）
3. 抽屉宽度显式设为 `w-[min(48rem,100vw)]` + `maxWidth: 48rem`
4. 保留原有滑入动画与封面视觉，不改交互内容结构

---

## 最近完成（第二十六轮）

### ✅ Drawer 右侧定位彻底修复
1. `AcademicResearchClient` 与 `BusinessAnalysisClient` 的 Drawer 改为 `createPortal(..., document.body)` 渲染
2. 避免被 `app/page.tsx` 的内容切换 `motion.div` 影响 fixed 定位
3. Drawer 现在应稳定贴右侧视口显示，不再跑到左下或内容区内部

### ✅ 封面加载保护保持有效
1. 学术封面目录已存在并可用
2. 商业分析封面目录当前仍为空时，会自动回退到渐变封面，不会破图
3. 商业封面仍建议按 `southeast-asia-market.jpg` 这一 slug 文件名补入

本轮已将 About Me 的证书资历迁移到联系方式卡片，清空 Side Works 中多余的技能矩阵，并把作品集子菜单的默认入口调整为 Vibe Coding；返回按钮现在直接落到“学术与实践”页面。

---

## 最近完成（第二十六轮）

### ✅ About Me 联系方式区补入证书资历
1. 将原先在 Side Works 中的证书资历迁移到 `AboutSection.tsx` 的联系方式卡片
2. 证书资历以标签形式展示，与电话、邮箱等联系方式同区承接

### ✅ Side Works 内容收敛
1. 移除 `SideWorksSection.tsx` 中的技能矩阵
2. Side Works 当前只保留社会实践内容，避免与 About Me 重复

### ✅ 作品集子菜单交互顺序调整
1. `app/page.tsx`：作品集子菜单默认入口从 `business` 改为 `vibe`
2. 点击作品集主入口后，首屏先进入 `Vibe Coding`
3. 返回按钮不再回到 Side Works 主页，直接落到 `projects`（学术与实践）页面

### 下一步
- 继续观察子菜单首屏与返回页的视觉节奏，必要时再微调文案顺序或卡片间距

---

## 最近完成（第二十五轮）

### ✅ 封面图投放位建立
1. 新增目录：`public/works/covers/academic/`
2. 新增目录：`public/works/covers/business/`
3. 学术与商业数据源中的 `coverImage` 已指向上述目录

### ✅ 封面按原始比例展示
1. `AcademicResearchClient`：封面改为 `w-full h-auto` 直接展示，不裁切
2. `BusinessAnalysisClient`：封面改为 `w-full h-auto` 直接展示，不裁切
3. 保留封面上的类型标签、标题白框与渐变过渡效果

### ✅ 模板文档同步
1. 在 `docs/PROJECT_TEMPLATE.md` 增加“封面图投放目录 + slug 命名规则 + 展示规则”说明

---

## 最近完成（第二十四轮）

### ✅ 标题半叠封面下缘（更接近 Notion 沉浸感）
1. `AcademicResearchClient` 与 `BusinessAnalysisClient` 的标题改为覆盖在封面底部区域
2. 标题容器采用三层高透明白框（`60% → 78% → 92%`）+ 轻微毛玻璃，避免被封面干扰
3. 保留封面类型标签与日期，视觉层次更统一

### ✅ 修复交互后内容位置下沉
1. 移除此前用于叠压的 `-mt-8` 负边距方案
2. 改为封面内标题叠层 + 正文区正常流布局（`pt-4`）
3. 解决点击卡片后内容起始位置偏下、观感断层的问题

---

## 最近完成（第二十三轮）

### ✅ Drawer 封面一体化重构（去掉泾渭分明）
1. `AcademicResearchClient` 与 `BusinessAnalysisClient` 移除独立顶部栏
2. 将类型与日期叠加到封面图上（原 `Research Paper` 区域已覆盖到封面）
3. 使用多层渐变与底部淡出，使封面自然过渡到标题与正文
4. 关闭按钮改为封面右上角浮层按钮

### ✅ 摘要逻辑收敛为 Project Overview
1. 移除已填内容中的 `Abstract` 引用块
2. 保留并强化 `Project Overview` 信息框作为唯一总览入口
3. 同步更新模板文档 `docs/PROJECT_TEMPLATE.md`：所有类别不再单列 Abstract

---

## 最近完成（第二十二轮）

### ✅ Drawer 封面视觉二次微调（Notion 风格）
1. 学术与商业分析 Drawer 封面改为无边界全宽（去除卡片框感）
2. 封面高度提升至 `h-56`，增强视觉呼吸感
3. 渐变遮罩微调为上浅下深（线性透明度递增）
4. 新增柔和暗角（radial vignette）提升图面层次

### ✅ 详情正文按框架完成首版填充
1. `content/academic-research/index.ts`：4 个学术/调研/学习条目均补全结构化内容
  - Genesis / Role / Methodology / Key Findings / Problem & Solution / Personal Reflection
2. `content/business-analysis/index.ts`：商业分析条目补全结构化内容
  - Business Context / Role / Problem & Solution 表格 / Deliverables / Insights
3. `AcademicResearchClient` 新增 Markdown 渲染逻辑，确保框架正文在 Drawer 中展示

---

## 最近完成（第二十一轮）

### ✅ 学术与商业分析 Drawer 封面交互统一
1. `AcademicResearchClient`：将正文内嵌封面图改为顶部 Cover 区块
2. `BusinessAnalysisClient`：新增顶部 Cover 区块，统一 Notion 质感视觉
3. 两处 Cover 均加入“由上到下透明度递增”的线性渐变遮罩

### ✅ PDF 下载入口清理（全站保留 About 的 Download CV）
1. 移除 `AcademicResearchClient` Drawer 内“查看完整 PDF”按钮
2. 移除 `NextDestSection` 中 Download CV 按钮
3. 校验后仅保留 `AboutSection` 的 Download CV

### ✅ 商业分析板块条目状态
1. `content/business-analysis/index.ts` 已维持仅 1 条：`southeast-asia-market`
2. “钢铁贸易转型研究”“密云农产品调研”不再出现在商业分析卡片列表中

---

## 最近完成（第二十轮）

### ✅ Project Structure Blueprint 建立（新增统一模板）
1. 新建 `docs/PROJECT_TEMPLATE.md`，作为所有 Details Panel 的统一撰写指南
2. 完成三类项目模板：
  - 商业分析（Business Analysis）
  - 学术研究与调研（Academic & Research）
  - Vibe Coding 实验（Vibe Coding Projects）
3. 增加通用视觉布局规范：Cover Image / Title / Abstract / Tags
4. 明确占位规则：先按 PDF 理解填入初稿，再由作者补充可核验事实

### ✅ 商业分析板块内容清理与优化
1. 从 `content/business-analysis/index.ts` 移除以下两项：
  - 从交易中介到多层级供应链服务商：中国钢铁贸易产业转型升级研究
  - 北京密云区农产品产销合作调研报告
2. 将保留项目 `southeast-asia-market` 的 Markdown 内容按新框架重写：
  - 新增 Abstract 引用块与标签展示
  - 使用 `Problem & Solution` 表格化表达挑战与解法
  - 增加 `HorizontalScrollShowcase` 组件占位
  - 补充可执行交付物与洞察段落

### 下一步
- 🎯 继续将其他类别（Academic & Research / Vibe Coding）的已填内容迁移到新模板结构
- 🎯 在具体项目详情生成时，按模板自动给出“PDF 理解占位稿 + 用户补充提醒”

---

## 最近完成（第十九轮）

### ✅ Next Destination 全页重塑（保留 Erasmus）
1. **纠正目标项目方向**：明确保留 `Erasmus Mundus` 作为核心申请路径，不删除
2. **定位升级**：从单一“申请规划”改为“申请 / 志愿 / 学术三线并行”
3. **新增研究导向**：加入 `Area Studies & Development Research`（区域国别与发展研究）
4. **新增生态志愿导向**：加入鸟类保护与太平洋海洋环境方向的志愿目标
5. **内容结构重组**：
  - `My Mission`：个人使命与网站用途重述
  - `Target Programs`：三条目标路径（Erasmus + 区域研究 + 生态志愿）
  - `Impact Directions`：未来行动议题
  - `Personal Commitment`：个人长期承诺

### 涉及文件
- `components/sections/NextDestSection.tsx`

### 下一步
- 🎯 与用户共创下一版文案语气：更偏申请书叙事 / 更偏行动者宣言
- 🎯 细化可投递的真实项目清单（高校项目、研究项目、环保志愿组织）

---

## 最近完成（第十八轮）

### ✅ 学术与实践页面两列布局重构
1. **Icon 更新**：
   - 项目导航 icon 改为 `Project highlights.svg`

2. **页面布局改为两列：**
   - **左列**：科研项目（0项）+ 调研项目（2项）
     - 两个分类各自带独立分类标题与描述
     - 卡片保持可交互状态，点击打开右侧 Drawer
   
   - **右列**：社会实践（3项）+ 自学笔记（1项）
     - **社会实践**（非交互卡片，纯展示）：
       - 北京国际短片节 (BISFF)
       - 深圳国际世博会 (Shenzhen Expo)
       - SheNicest 深圳黑客松 (Hackathon)
     - **自学笔记**（可交互卡片）：
       - CDA 数据分析体系（1项）
       - 点击打开 Drawer 查看详细内容

3. **社会实践卡片设计：**
   - 样式与科研/调研卡片一致（bento-card，rounded-lg，p-4）
   - 卡片内容：标题 + 职位 + 描述 + 标签 + 时间段
   - 无 hover 交互，无点击事件（纯展示）

4. **数据来源：**
   - 社会实践数据从 `SideWorksSection.tsx` 移出，现在直接在 `AcademicResearchClient` 中维护
   - 共 3 条社会实践记录（已裁减至用户指定的 3 项）

### 技术细节
- **两列布局**：`grid grid-cols-1 lg:grid-cols-2 gap-8`（小屏幕 1 列，大屏幕 2 列）
- **左列逻辑**：遍历 categories，筛选非 learning 类目（research + fieldwork）
- **右列逻辑**：社会实践数据硬编码 + 单独遍历 learning 卡片
- **社会实践接口**：`FieldExperience` 类型定义，包含 title / role / tags / desc / period
- **事件处理**：社会实践卡片无 onClick，其他卡片保留 setSelectedPost 逻辑，打开相同 Drawer

### 待完成（下一步）
- 🎯 **深入优化交互卡片的 Drawer 内容展示**
  - 改进科研/调研/自学笔记卡片的 Drawer 展示格式
  - 可能涉及：段落结构、图片位置、信息框设计、副标题等

## 最近完成（第十七轮）

### ✅ Academic Research 组件 UI 重构 + 图标更新
1. **AcademicResearchClient 改造**：从 Pill Tab 分类导航改为分类标题 + 平铺卡片列表
   - 删除顶部分类选择 Tab UI
   - 添加分类标题（"科研项目 · N 项"）与描述文字说明
   - 实现分类分组显示（所有项目平铺，按分类聚合）

2. **Drawer 交互改造**：从底部弹出改为右侧滑入（与商业分析保持统一）
   - 改变动画方向：从 `y: 100%` 改为 `x: 100%`（从右侧滑入）
   - 调整背景遮罩色彩为与整体设计相符的浅色
   - 右侧面板宽度：`max-w-2xl`

3. **Drawer 内容改进**：PDF 封面图象嵌入在滚动内容中
   - 移除分离的 PDF 顶部展示
   - 将 PDF 第一页缩略图嵌入文章内容区（标签下方）
   - 添加"Project Overview"信息框（灰色背景）
   - 保留 PDF 下载按钮（右下角）

4. **导航图标更新**：创建知识库风格 icon
   - 创建 `public/assets/icons/knowledge.svg`（书籍形状，多线条表示知识结构）
   - `app/page.tsx` 中 projects 导航项 icon 改为 `/assets/icons/knowledge.svg`
   - 符合"学术与实践"的视觉主题

### 技术细节
- **分类描述对象**：`categoryDescriptions` Record<string, string> 包含各分类的中英文说明
- **分组逻辑**：遍历 categories 数组，再遍历对应分类的 posts
- **Drawer 位置**：`fixed top-0 right-0` 右侧边栏，flex 布局分为 header（固定）和 content（滚动）
- **状态管理**：保留单一 selectedPost，移除 activeCategory

## 最近完成（第十六轮）

### ✅ Interests + 侧边栏导航 + Moments 图片接入
- `components/sections/InterestsSection.tsx`：按既有样式新增学术兴趣项 `区域国别研究 (Area Studies)`，包含三行问题弹幕与思考气泡
- `app/page.tsx`：主侧边栏顺序调整为 `About → Career Journey → My Interests ...`，将“个人知识库 / PKM”替换为“学术与科研（Research）”
- `lib/hobbyPhotos.ts`：追加两张新图片路径 `moments-11.png`、`moments-12.png`
- 资源接入：将 `个人资料/作品（待分类）` 下两张新图复制到 `public/photo/hobbies/` 并重命名为 ASCII 文件名

## 最近完成（第十五轮）

### ✅ About 能力框架微调 + Career 指标修正
- `components/sections/AboutSection.tsx`：能力框架从 3 项调整为最终 5 项卡片
- 新增并替换为：业务桥梁与流程重构、商业洞察与数据驱动、敏捷执行与综合素养、多 Agent 质量审查、SOP 标准化沉淀
- `components/sections/CareerSection.tsx`：TAL 核心数据第一项由“本地化教材翻译”改为“SOP 手册沉淀 30+ 份”

## 最近完成（第十四轮）

### ✅ Career Journey & About Me 内容同步新简历
- `components/sections/CareerSection.tsx`：将 TAL Education 与 FuncCat 的经历内容替换为新简历版本
- TAL 更新为：36 本数学教材、50 万+词本地化翻译与校对、20+ 版本教具网站、多 Agent 审查、30+ SOP
- FuncCat 更新为：20+ 条 PRD、1000+ 条用户评价、SQL/Python 特征提取与聚类分析
- 荣誉时间轴中的“学年优秀校际交换生”日期调整为 `2026.4`
- `components/sections/AboutSection.tsx`：更新 Who I Am、人设标签、能力框架与技能栈，使其与新简历表述一致

## 最近完成（第十三轮）

### ✅ Interests 学术兴趣补充“区域国别研究”
- `components/sections/InterestsSection.tsx`：在现有学术兴趣列表中新增 `区域国别研究 (Area Studies)` 卡片
- 结构保持与原有三项一致：标题 + 简述 + 三行横向弹幕问句
- 问题内容聚焦比较视角、区域合作、制度差异、语言材料与商务决策的连接
- 视觉与交互未改动，继续沿用原有羊皮纸浅色风格和 hover 思考气泡样式

## 最近完成（第十二轮）

### ✅ About Me & 侧边栏表达升级
- **侧边栏 Tag 更新**：改为 4 个新标签并规则对齐展示
  - 非典型商科生
  - 脑洞落地机
  - Vibe Coding驯服中
  - FR学习施法中...
- **签名修复**：侧边栏底部签名资源改为 `signature.jpg`，解决加载异常
- **About 新增两张羊皮纸卡片**（复用 Career 羊皮纸视觉）
  - Personal Workflow SOP（个人工作 SOP 指南，5 步流程）
  - Working Principles（工作理念：利他原则 / 即时反馈）
- **信息表达升级**：新增内容不再平铺直叙，改为编号流程 + 双原则分层卡片，增强结构感与可读性
- **A+C 融合迭代（本轮）**：
  - 保留 A 方案的信息结构（SOP 编号流程 + 双原则）
  - 叠加 C 方案视觉强化（纸张层叠感、SOP 微图标、原则高亮色条）
  - 在“清晰可读”前提下提升记忆点与视觉节奏
- **按图二重排 About 布局（本轮增量）**：
  - 工作理念改为横向双栏展示（两原则左右并排）
  - “业务与技术桥梁 / 数据驱动与流程优化 / 商业级交付能力”合并为一个大横向能力框架卡
  - 新增 Skill Stack 区块，并将“语言能力 + 联系方式”合并为底部双栏总卡
- **按最新标注继续微调（本轮增量）**：
  - 侧边栏 4 个 Tag 缩小字号并强制单行显示，避免换行挤压
  - 签名放大并用 `mix-blend-mode: multiply` 弱化白底视觉
  - “语言能力 + 联系方式”从左侧移至右侧照片卡下方（箭头目标位）
  - Core Traits 区块整体放大，并改为每次滚入视口都触发生长动画
  - Skill Stack 改为“标签墙”呈现，增强扫描效率
- **本轮新增（用户确认）**：
  - 签名接入 `signature.png` 优先加载，失败自动回退 `signature.jpg`
  - Skill Stack 从“标签墙”改为图二风格：深色面板 + 横向能力进度条
- **本轮修正（用户反馈）**：
  - 移除 Skill Stack 深色面板，恢复与站点一致的浅色羊皮纸风格
  - 保留横向能力条样式，并为每个技能添加悬停短句（具体应用场景）
  - 技能条颜色改为棕色系，统一站点色调
  - 进入页面时技能条按序从 0 生长到目标值（入场动效）
- **Sidebar Tag Hover 动效升级（本轮新增）**：
  - 非典型商科生：轻微缩放 + 不规则微旋转
  - 脑洞落地机：纵向轻压 + 下沉 1px + 内阴影加深
  - Vibe Coding驯服中：scale + 圆角节奏脉冲
  - FR学习施法中...：文字 1s 渐变至古董金 + 轻量 glitter overlay 跟随鼠标缓慢消散
- **Interests 书架区优化（本轮新增）**：
  - 调整书本宽度与间距，降低右侧留白感
  - 上下排装饰（鱼缸/台灯）改为右侧独立对齐区域，视觉重心更稳定
  - 鱼缸改为横向长方形比例，整体更贴近书架横向构图
  - 台灯加宽并重绘比例，避免过细过长的失衡感
- **About 右侧信息卡拆分（本轮新增）**：
  - 原“语言能力 + 联系方式”合并卡拆为两张独立卡片
  - 上卡专注语言能力，下卡专注联系方式与外链按钮
- **About 右侧媒体替换（本轮新增）**：
  - 右侧图片/徽章区域改为自动播放视频 `public/assets/tree-growth.mp4`
  - 使用 `mix-blend-multiply` 让白底视频与羊皮纸背景自然融合
  - 设置固定宽高比容器（`aspect-[16/10]`）避免加载跳动
  - 根据反馈继续优化：视频去掉 `loop`（仅开场播放一遍），并通过 `object-cover + scale` 聚焦树体区域
  - 增强滤镜参数（contrast/brightness/saturate）压低白底残留感

---

## 最近完成（第十一轮）

### ✅ Slides 路演作品板块重构
- **PDF预览卡片**：从"模拟PPT文字框"升级为**实际PDF缩略图展示**
- **自动轮播交互**：非悬停时自动轮播PDF页码（1.5秒/页），悬停时暂停
- **黑色边框强调**：悬停显示PDF预览时加入黑色边框框架，增强视觉焦点
- **新增4个项目**：
  - 🟢 绿壳鸡蛋农业品牌商业计划（全国商赛 26年）
  - 🟠 全场景具身智能消防机器人（三创赛 26年）
  - 🔵 校园拼车出行新模式（三创赛 25年）
  - 🌸 文化书吧实体IP赋能社交APP（商赛 25年）
- **PDF文件规范化**：所有PPT PDF文件统一放置在 `public/works/slides/`，并生成缩略图
- **导航顺序升级**：Side Works 子导航调整为
  ```
  Business Analysis → Vibe Coding → Research → Slides
  ```
- **Research 占位符**：已在导航中预留 Research（学术与科研）分类位置，待后续填充学术论文与调研报告

---

## 文件结构更新

```
public/works/
├── slides/           ← 所有PPT PDF + 缩略图
│   ├── 绿壳鸡蛋ppt.pdf
│   ├── 绿壳鸡蛋ppt_thumb.jpg
│   ├── 小民快跑ppt.pdf
│   ├── 小民快跑ppt_thumb.jpg
│   ├── 烽智安新——全场景具身智能消防机器人系统.pdf
│   ├── 烽智安新——全场景具身智能消防机器人系统_thumb.jpg
│   ├── 本科创意组-新文科-巧愿...pdf
│   ├── 本科创意组-新文科-巧愿..._thumb.jpg
│   ├── International Business Mgt(1).pdf
│   ├── International Business Mgt(1)_thumb.jpg
│   ├── 特高压输电ppt.pdf
│   └── 特高压输电ppt_thumb.jpg
└── research/        ← 占位（学术论文 + 调研报告）
```

---

## 下一步

### 🎯 Research 板块内容填充
- 学术论文路演 PPT（特高压输电）
- 实地调研报告（北京密云农产品）
- 产业转型案例分析（中国钢铁贸易）
- 跨国商务案例研究（TEMU案例）

### 🎯 内容消填
- Business Analysis 完整作品内容
- Next Destination 申请规划板块
- About Me 照片（待用户决定）

### 🎯 部署 & 上线
- Git → GitHub → Vercel 部署
- QR Code 生成与整合

---

## 关键组件变更

**修改文件**：
- [app/page.tsx](app/page.tsx) — 更新导航顺序，添加 Research 占位
- [components/sections/gallery/SlidesGallery.tsx](components/sections/gallery/SlidesGallery.tsx) — 完全重构，实现PDF预览 + 轮播 + 暂停交互

**新增说明文档**：
- [docs/PDF_INVENTORY.md](docs/PDF_INVENTORY.md) — PDF 文件清单与分类规范

---

## 技术细节

### SlidesGallery 交互逻辑
1. **未悬停**：显示缩略图 + 项目信息卡片
2. **悬停**：
   - 缩略图区域替换为PDF预览卡片（黑色边框）
   - PDF自动轮播暂停
   - 页码指示器显示（如 "Page 1 / 35"）
   - 悬停提示显示（"⏸ Auto-play paused"）
3. **轮播细节**：
   - 仅显示PDF第1页缩略图（对应 `_thumb.jpg`）
   - 页码逻辑在组件中管理（虽映射缩略图，但UI显示轮播效果）
   - useEffect 监听 isHovered 状态控制轮播开始/暂停

---

## 问题追踪

- [ ] ResearchGallery 组件需要创建（当前为占位符）
- [ ] 缩略图是否需要动态展示多页（当前仅展示第1页）
- [ ] 页码轮播视觉效果是否满足预期
