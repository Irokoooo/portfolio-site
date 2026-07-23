# 🪟 窗户 + 银河页面 + 可交互物件方案

## 1️⃣ 窗户模型搜索关键词

### Poly.pizza 搜索（推荐，低多边形风格）
- `arched window`（拱形窗）
- `victorian window`（维多利亚窗框）
- `leaded glass window`（铅玻璃窗）
- `medieval window`（中世纪窗户）

### Sketchfab 搜索（写实风格）
- `gothic window`（哥特式窗户）
- `stained glass window`（彩色玻璃窗）
- `old window frame`（古董窗框）

**推荐具体模型（免费）：**
- [Gothic Window - Poly.pizza](https://poly.pizza/search/window) - 搜索结果第一页通常有多个免费窗框
- Sketchfab 搜 "medieval window" 筛选 CC0 或 CC BY 授权

---

## 2️⃣ 银河页面设计方案

### 视觉概念
**风格定位：** 中世纪星图 × 现代交互 - 像翻开古籍天文卷轴，每颗星球是一个思想碎片

### 技术架构
```
content/
  galaxy/
    thoughts/
      2026-07-15-idea-about-ai.md
      2026-06-20-travel-memory.md
      2026-05-10-book-notes.md
    _meta.json  ← 记录每条碎碎念对应的插图/模型路径
```

每个 `.md` 文件 frontmatter：
```yaml
---
date: 2026-07-15
title: "关于 AI 的一个想法"
planet: "mars"  # 或者 auto（自动分配未使用的行星）
mood: "curious" # 决定星球颜色/光晕
---

这里是碎碎念内容...
```

### 插图 vs 模型？推荐插图
**为什么用插图更合适：**
- ✅ 文件小（每张 50-200KB PNG），银河页面加载快
- ✅ 可以用 Stable Diffusion / Midjourney 快速生成统一风格的行星插图
- ✅ 用 CSS filter 实现悬浮动画、发光效果，比 3D 模型性能好
- ✅ 更容易控制风格（手绘星图、水彩星球、线稿星系）

**如果用模型：**
- ⚠️ 每个行星模型 500KB+，20条碎碎念就是 10MB
- ✅ 但如果行星可以旋转交互，沉浸感更强

**我的建议：插图 + CSS 动画**

---

## 3️⃣ 银河页面交互设计

### 布局
```
┌─────────────────────────────────────┐
│   [X] 返回书房                        │  ← 右上角关闭按钮
│                                       │
│      🪐 ← 行星悬浮                     │
│             ✨ ← 点击展开卡片         │
│                     ⭐               │
│   💫                                  │
│                🌍 ← hover 发光         │
│         🌙                            │
│                                       │
│   [按时间倒序展示] ← 左下角排序切换    │
└─────────────────────────────────────┘
```

### 交互流程
1. **打开窗户** → 背景淡出为深空黑 → 行星从四面八方飘入
2. **hover 行星** → 轻微放大 + 暖光晕 + 显示日期/标题 tooltip
3. **click 行星** → 行星移到中央 → 展开半透明卡片显示 Markdown 内容
4. **关闭卡片** → 行星飘回原位
5. **滚动** → 行星视差移动（近大远小）

### 自动分配插图逻辑
```ts
// lib/galaxyAssigner.ts
const PLANET_POOL = [
  '/assets/galaxy/planet-blue.png',
  '/assets/galaxy/planet-red.png',
  '/assets/galaxy/planet-purple.png',
  '/assets/galaxy/moon-sketch.png',
  '/assets/galaxy/nebula-soft.png',
  // ... 准备 20+ 张插图
];

// 根据 md 文件创建时间哈希，稳定分配（同一文章永远是同一行星）
function assignPlanet(mdFilePath: string) {
  const usedPlanets = getAllUsedPlanets(); // 读取已有 md 的 frontmatter
  const available = PLANET_POOL.filter(p => !usedPlanets.includes(p));
  return available[hash(mdFilePath) % available.length];
}
```

---

## 4️⃣ 可交互小物件头脑风暴

### 已有物件
✅ 电脑、书架、相框、地图、文件夹

### 新增物件建议（按优先级）

#### 🥇 核心物件（建议先做）

| 物件 | 位置 | 交互效果 | 内容展示 | 氛围作用 |
|------|------|---------|---------|---------|
| **窗户** | 后墙右侧 | 点击→背景变深空，行星飘入 | 碎碎念银河 | ⭐⭐⭐⭐⭐ 全新叙事维度 |
| **台灯** | 书桌右前角 | click 开关灯 | 整个房间变暗/变亮 | ⭐⭐⭐⭐ 环境氛围切换 |
| **壁炉** | 左墙下方 | hover 火光闪烁 | 无内容，纯氛围 | ⭐⭐⭐ 暖意与动态光源 |

#### 🥈 锦上添花物件（后续慢慢加）

| 物件 | 位置 | 交互 | 内容 |
|------|------|------|------|
| **茶杯** | 书桌左前角 | click → 冒热气动画 + 提示"休息一下" | 无内容，彩蛋 |
| **钢笔架** | 书桌中央 | click → 显示你的签名动画（花体字） | 关于你的笔迹故事 |
| **墙上证书/奖状** | 后墙左侧 | click → 放大显示获奖经历 | 教育背景/荣誉时间线 |
| **地球仪** | 书桌右后角或书架顶 | click 可旋转，hover 高亮城市 | 去过的城市标记 |
| **猫咪/植物** | 地板或窗台 | 随机走动/生长动画 | 无内容，动态彩蛋 |
| **时钟** | 后墙顶部 | 显示真实时间，整点会响 | 时间敏感问候语 |
| **留声机/唱片机** | 书架旁地面 | click → 播放背景音乐 | Spotify 播放列表 |

---

## 5️⃣ 台灯交互详细设计

### 视觉效果
```
初始状态：台灯 ON，房间正常亮度
点击台灯 → 台灯 OFF → 
  - 整个场景 ambientLight intensity 0.5 → 0.15
  - 桌面 pointLight intensity 12 → 0
  - 壁炉光源 intensity 提升（成为主光源）
  - 窗外月光透入（新增 directionalLight）
  - 所有物件的 emissive 强度略微提升（模拟夜视）
```

### 代码实现
在 `RoomScene.tsx` 添加 `<DeskLamp />` 组件，用 `zustand` 或 Context 管理全局光照状态。

---

## 6️⃣ 下一步操作建议

**现在先做：**
1. ✅ 模型已集成（书架、地图、桌子）
2. 🔄 运行 `npm run dev` 看效果，调整模型位置/缩放
3. 🪟 下载窗户模型（搜上面关键词）
4. 🪐 我帮你搭建银河页面框架 + Markdown 加载逻辑

**短期可做：**
- 台灯开关
- 窗户 + 银河完整流程

**长期慢慢加：**
- 茶杯、钢笔、证书等小物件

---

**你想先：**
- A. 跑一下 `npm run dev` 看当前3个模型效果
- B. 我现在就去下载窗户模型，你帮我集成
- C. 先搭建银河页面框架（我会创建好文件结构 + Markdown 读取逻辑）
- D. 先做台灯开关交互（简单，10分钟搞定）

选哪个？
