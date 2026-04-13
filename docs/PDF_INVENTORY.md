# PDF 文件清单与分类方案

> 最后更新：2026-04-07  
> 此文件记录所有PDF的来源、分类和存储位置。每当新增PDF时，请更新此文件。

---

## 📋 PDF 清单与项目映射

### ✅ **Slides 路演作品**（放置：`public/works/slides/`）

| 文件名 | 项目名称 | 页数 | 大小 | 状态 | 说明 |
|--------|---------|------|------|------|------|
| `International Business Mgt(1).pdf` | International Business Management（北京市二等奖） | 41 | 9.3MB | ✓ 规范 | 全英文路演PPT |
| `特高压输电ppt.pdf` | 特高压输电工程对服务业企业绩效的影响（答辩PPT） | 12 | 65.6MB | ✓ 规范 | 高清答辩演示文稿 |
| `烽智安新——全场景具身智能消防机器人系统.pdf` | 挑战杯/创新创业竞赛作品 | 26 | 3.9MB | ✓ 候选 | 全国电子商务创新创业挑战赛 |
| `小民快跑ppt.pdf` | 校园拼车出行新模式（中央民族大学经创杯） | 20 | 5.9MB | ✓ 候选 | 校园创新创业赛事 |
| `本科创意组-新文科-巧愿·学者芸窗...pdf` | 以文化书吧实体IP赋能文娱社交APP（中国传媒大学） | 27 | 19.9MB | ? 待确认 | 社区服务+银发经济项目 |

---

### 📑 **学术与科研成果**（**新增分类**）— 建议放置：`public/works/research/` 或 `public/works/academic/`

| 文件名 | 论文/研究标题 | 页数 | 大小 | 来源 | 说明 |
|--------|----------|------|------|------|------|
| `特高压输电论文.pdf` | Energy-Computing Synergy: How UHV Projects and Digital Dependence Empower Producer Services | 25 | 2.3MB | 学术期刊/会议 | **英文学术研究** |
| `北京密云区农产品产销合作调研报告.pdf` | 农产品产销合作调研 | 91 | 6.4MB | 实地调研 | **实地调研报告** |
| `从交易中介到多层级供应链服务商：中国钢铁贸易产业转型升级研究(2).pdf` | 中国钢铁贸易产业转型升级研究 | 21 | 2.0MB | 商业分析/案例研究 | **产业转型分析** |
| `国际商务分析temu案例节选.pdf` | Theoretical Foundation & International Business Case Study | 14 | 2.1MB | 课程作业/案例分析 | **跨国商务分析** |

---

### 🏫 **学习资料与培训**（建议：暂时放 docs/ 子文件夹或不展示在作品集中）

| 文件名 | 内容 | 页数 | 大小 | 用途 |
|--------|------|------|------|------|
| `CDA_1级知识点汇总.pdf` | 数据分析师一级知识体系 | 37 | 30.9MB | 个人学习笔记，含VUCA等概念 |——这个放到个人知识库吧
| `Finance group project.pdf` | Exchange Rate Project（小组作业） | 9 | 939KB | 大学课程作业 |——放到个人知识库
| `Individual assignment.pdf` | 课程个人作业 | 4 | 1.4MB | 大学课程材料 |

---

### 🤖 **AI工程与技术**（归类到 Side Works > Vibe Coding）

| 文件名 | 项目名称 | 页数 | 大小 | 说明 |
|--------|---------|------|------|------|
| `LawFlaw AI使用手册.pdf` | LawFlaw AI 智能合规系统（v1.3） | 4 | 17.8MB | AI法律服务平台产品手册 |

---

## 🎯 **分类方案建议**

### 方案 A（推荐）— 四层结构
```
Side Works/
├── 1️⃣ Slides（路演演示）
│   ├── Business Plans（商业计划书）
│   └── Competition Works（竞赛作品）
├── 2️⃣ Research（学术与科研）
│   ├── Papers（发表论文/会议纸）
│   ├── Research Reports（调研报告）
│   └── Case Studies（案例研究）
├── 3️⃣ AI Engineering（AI工程）
│   └── Vibe Coding Projects
└── 4️⃣ Business Analysis（商业分析）
    ├── Industry Reports
    └── Market Analysis
```

### 方案 B（简洁版）— 三层结构
```
Side Works/
├── Slides（路演+竞赛）
├── Research（学术+调研）
├── AI Engineering（技术实践）
└── Analysis（商业分析和案例）
```

---

## 📂 **文件夹规范**

### Slides 组织方式
```
public/works/slides/
├── 特高压输电ppt.pdf
├── International_Business_Management.pdf
├── 烽智安新消防机器人.pdf
├── 小民快跑校园拼车.pdf
└── thumbnails/（PDF缩略图目录）
    ├── 特高压输电ppt-thumb.jpg
    └── International_Business_Management-thumb.jpg
```

### Research（新建）组织方式
```
public/works/research/
├── papers/（学术论文）
│   ├── UHV_Digital_Dependence_Energy.pdf
│   └── UHV_Digital_Dependence-thumb.jpg
├── reports/（调研报告）
│   ├── Miyun_Agricultural_Report.pdf
│   └── Miyun_Agricultural_Report-thumb.jpg
├── case-studies/（案例分析）
│   ├── China_Steel_Trade_Transformation.pdf
│   └── TEMU_International_Business.pdf
└── thumbnails/（所有缩略图）
```

---

## 🔄 **新增PDF工作流**

每当新增PDF时，请按以下步骤操作：

1. **确定分类**：Slides / Research / AI Engineering / Analysis
2. **重命名**：使用英文或拼音+项目名，去掉括号和特殊符号
   - ❌ `本科创意组-新文科-巧愿·学者芸窗：以文化书吧实体IP赋能文娱社交app的运营创业实践(1).pdf`
   - ✓ `Qiyuan_Scholar_Garden_Cultural_Bookbar_App.pdf`
3. **放置**：复制到对应的 `public/works/{category}/` 文件夹
4. **生成缩略图**：将PDF第1页转为JPG缩略图（推荐 500x320px）
5. **更新此清单**：添加新行，包括文件名、项目名称、分类信息
6. **更新组件**：在对应的 Gallery 组件中添加数据（由 AI Helper 辅助）

---

## 📝 **待处理分类**

- [ ] `烽智安新——全场景具身智能消防机器人系统.pdf` — 属于 Slides 还是单独分类？
- [ ] `小民快跑ppt.pdf` — 校园创业，放入 Slides？
- [ ] `巧愿·学者芸窗.pdf` — 社区服务+APP，归类到哪里？
- [ ] 是否需要为"科研成果"创建独立导航栏，还是放在 Side Works 内嵌？
