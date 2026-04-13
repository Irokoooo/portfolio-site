# 资源放置指南 (ASSETS GUIDE)

> 每次添加新资源后，请按此文档放置文件。部分资源需要同步更新对应的 `.ts` 配置文件。

---

## 📸 照片资源

### About Me 板块照片

| 用途 | 路径 | 说明 |
|------|------|------|
| 侧边栏头像（圆形） | `public/photo/about/avatar.jpg` | 建议正方形裁剪，脸部居中 |
| 侧边栏封面（长方形） | `public/photo/about/cover.jpg` | 生活照/场景照，宽幅效果更好 |
| About Me 右侧轮播 | `public/photo/about/1.jpg` `2.jpg` `3.jpg`... | 自动检测，数字命名，放多少张自动轮播多少张 |

### Interests 板块照片

| 用途 | 路径 | 说明 |
|------|------|------|
| 爱好 Ken Burns 轮播 | `public/photo/hobbies/任意文件名.jpg` | **放入后必须同步更新 `lib/hobbyPhotos.ts`** |
| 书架读书笔记（书1） | `public/photo/interests/books/book1/note1.jpg` | 最多 5 张（note1~note5），点击书脊后弹窗显示 |
| 书架读书笔记（书2） | `public/photo/interests/books/book2/note1.jpg` | 同上，book1~book16 对应16本书 |

> ⚠️ 爱好照片特别说明：文件名可以是任意名称，但每次添加新照片后，必须在 `lib/hobbyPhotos.ts` 里追加一行路径，格式为：
> ```ts
> "/photo/hobbies/你的文件名.jpg",
> ```

### Career 板块（预留）

| 用途 | 路径 |
|------|------|
| 时间轴配图（预留） | `public/photo/career/` |

---

## 📄 文档资源

| 用途 | 路径 | 说明 |
|------|------|------|
| 下载简历 PDF | `public/resume.pdf` | About Me 板块「Download CV」按钮链接此文件 |
| Business Analysis 文章 PDF | `public/pdf/business/文件名.pdf` | 在 `content/business-analysis/index.ts` 里注册路径 |
| Slides 路演作品 PDF | `public/pdf/slides/文件名.pdf` | 在 `components/sections/gallery/SlidesGallery.tsx` 的 `pdfUrl` 字段填路径 |
| Vibe Coding 演示视频 | `public/video/vibe/文件名.mp4` | 在 `AIPracticeGallery.tsx` 对应条目添加 videoUrl 字段 |

---

## 🎨 设计素材（已放置，只读参考）

| 素材 | 路径 | 用途 |
|------|------|------|
| 羽毛笔光标 | `public/assets/cursors/quill.svg` | 全局鼠标光标（已配置，32×32） |
| 金箔纹理 | `public/assets/decorations/gold-foil.png` | 侧边栏金箔叠加（已配置） |
| 藤蔓装饰（左） | `public/assets/decorations/vine-left.png` | 侧边栏顶部装饰（已配置） |
| 藤蔓装饰（右） | `public/assets/decorations/vine-right.png` | 预留，可用于右侧内容区 |
| 花体签名 | `public/assets/decorations/signature.svg` | 侧边栏底部（已配置） |
| 羊皮纸纹理 | `public/assets/textures/parchment.jpg` | Career 详情面板（已配置为 `.paper-panel` CSS类） |
| 导航图标 | `public/assets/icons/` | 各板块 SVG 图标（已配置） |

---

## 🔧 更新流程速查

### 新增爱好照片
1. 把图片放入 `public/photo/hobbies/`
2. 打开 `lib/hobbyPhotos.ts`，在数组末尾追加路径
3. 重启开发服务器（`npm run dev`）

### 新增 PPT/Slides 作品
1. 把 PDF 放入 `public/pdf/slides/`
2. 打开 `components/sections/gallery/SlidesGallery.tsx`
3. 在 `slides` 数组末尾添加新条目，填写 `pdfUrl` 字段

### 新增 Business Analysis 文章
1. 把 PDF 放入 `public/pdf/business/`
2. 打开 `content/business-analysis/index.ts`
3. 添加新文章元数据

### 新增 Vibe Coding 作品
1. 演示视频放入 `public/video/vibe/`
2. 打开 `components/sections/gallery/AIPracticeGallery.tsx`
3. 在 `items` 数组添加新条目

---

*最后更新：2026-04-06*
