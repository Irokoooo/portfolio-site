// ─────────────────────────────────────────────
// 能力星座 · 数据 & 类型（Ability Constellation）
// 这份文件是「展示端」与「本地可视化编辑器」共同的数据合同。
// 编辑器导出的 JSON 会覆盖 GALAXY_DATA 常量即可上线。
// ─────────────────────────────────────────────

/** 能力分类 → 决定星星颜色。四类对应 CLAUDE.md 的技能生态档案 */
export type AbilityCategory = "product" | "data" | "language" | "ai";

/** 熟练度 1–4 → 决定光晕亮度/呼吸感 */
export type Proficiency = 1 | 2 | 3 | 4;

/** 能力星节点 */
export interface AbilityNode {
  id: string;
  name: { zh: string; en: string };
  category: AbilityCategory;
  /** 星体半径系数 0.5–2.0，作者手动拖动决定 */
  size: number;
  /** 熟练度 1入门 / 2熟练 / 3精通 / 4核心 → 光晕亮度 */
  proficiency: Proficiency;
  /** 是否为「热爱」的能力 → 星旁光环标记 */
  passion?: boolean;
  /** 画布坐标（相对中心，作者拖动摆放后保存） */
  x: number;
  y: number;
  /** 一句话（悬停时浮现） */
  oneLiner: { zh: string; en: string };
  /** Proof of Work：一句可核验的成果 */
  proofOfWork?: { zh: string; en: string };
  /** 关联作品/项目链接 */
  links?: { label: { zh: string; en: string }; url: string }[];
  /** 习得时间（如 "2025"） */
  learnedSince?: string;
}

/** 能力之间的连线（可加文字标签） */
export interface AbilityEdge {
  from: string;
  to: string;
  label?: { zh: string; en: string };
}

export interface GalaxyData {
  nodes: AbilityNode[];
  edges: AbilityEdge[];
}

// ─────────────────────────────────────────────
// 分类配色（暖金 / 植物调，作为整站「夜晚」的诗意反差）
// core = 星芯高亮色，glow = 光晕色，label = 分类名
// ─────────────────────────────────────────────
// 取自 galaxy-template 的银河家族色：金 / 蓝紫 / 粉 / 紫，融在星系里不突兀
export const CATEGORY_PALETTE: Record<
  AbilityCategory,
  { core: string; glow: string; label: { zh: string; en: string } }
> = {
  product: {
    core: "#ffcf9a", // 珍贵金（银河里的稀疏金星）
    glow: "#ffb478",
    label: { zh: "产品与设计", en: "Product & Design" },
  },
  data: {
    core: "#8fb0ff", // 外圈蓝
    glow: "#6f90e0",
    label: { zh: "数据与分析", en: "Data & Analytics" },
  },
  language: {
    core: "#ff9ed4", // 内圈粉
    glow: "#e888c0",
    label: { zh: "语言与写作", en: "Language & Writing" },
  },
  ai: {
    core: "#c891ff", // 中段紫
    glow: "#a98cff",
    label: { zh: "AI 辅助工程", en: "AI-Assisted Engineering" },
  },
};

/** 熟练度 → 光晕强度参数（供展示端读取） */
export const PROFICIENCY_GLOW: Record<Proficiency, { intensity: number; breath: number }> = {
  1: { intensity: 0.35, breath: 2.4 }, // 入门：微弱、较快闪烁
  2: { intensity: 0.55, breath: 3.2 },
  3: { intensity: 0.8, breath: 4.2 },
  4: { intensity: 1.0, breath: 5.4 }, // 核心：明亮、缓慢呼吸
};

export const PROFICIENCY_LABEL: Record<Proficiency, { zh: string; en: string }> = {
  1: { zh: "入门", en: "Learning" },
  2: { zh: "熟练", en: "Proficient" },
  3: { zh: "精通", en: "Advanced" },
  4: { zh: "核心", en: "Core" },
};

// ─────────────────────────────────────────────
// 示例数据（视觉原型用，后续由编辑器导出的 JSON 覆盖）
// x/y 以画布中心为原点，单位与 viewBox 一致
// ─────────────────────────────────────────────
export const GALAXY_DATA: GalaxyData = {
  nodes: [
    {
      id: "ai-eng",
      name: { zh: "AI 辅助工程", en: "AI-Assisted Engineering" },
      category: "ai",
      size: 1.6,
      proficiency: 4,
      passion: true,
      x: 40,
      y: -30,
      oneLiner: { zh: "把 AI 当同事，不当玩具", en: "Treat AI as a colleague, not a toy" },
      proofOfWork: {
        zh: "用 Vibe Coding 独立做出了这个作品集网站",
        en: "Built this portfolio site solo via Vibe Coding",
      },
      links: [{ label: { zh: "这个网站", en: "This site" }, url: "/" }],
      learnedSince: "2024",
    },
    {
      id: "prompt",
      name: { zh: "Prompt 工程", en: "Prompt Engineering" },
      category: "ai",
      size: 1.1,
      proficiency: 3,
      passion: true,
      x: 175,
      y: -95,
      oneLiner: { zh: "和机器沟通的语言学", en: "Linguistics for talking to machines" },
      learnedSince: "2024",
    },
    {
      id: "multi-agent",
      name: { zh: "多 Agent 质量审查", en: "Multi-Agent Review" },
      category: "ai",
      size: 0.9,
      proficiency: 2,
      x: 150,
      y: 55,
      oneLiner: { zh: "让多个 Agent 互相挑错", en: "Let agents cross-check each other" },
      proofOfWork: { zh: "好未来实习中搭建审查流程", en: "Built a review pipeline at TAL" },
      learnedSince: "2025",
    },
    {
      id: "product-design",
      name: { zh: "产品设计", en: "Product Design" },
      category: "product",
      size: 1.3,
      proficiency: 3,
      passion: true,
      x: -120,
      y: -70,
      oneLiner: { zh: "从需求到原型的落地", en: "From need to prototype" },
      proofOfWork: { zh: "函数猫实习产出 20+ 条 PRD", en: "20+ PRDs during FuncCat internship" },
      learnedSince: "2024",
    },
    {
      id: "user-research",
      name: { zh: "用户研究", en: "User Research" },
      category: "product",
      size: 0.9,
      proficiency: 2,
      x: -215,
      y: 10,
      oneLiner: { zh: "1000+ 条用户评价里找信号", en: "Signals from 1000+ user reviews" },
      learnedSince: "2024",
    },
    {
      id: "data-viz",
      name: { zh: "数据可视化", en: "Data Visualization" },
      category: "data",
      size: 1.0,
      proficiency: 2,
      x: -80,
      y: 120,
      oneLiner: { zh: "让数据自己讲故事", en: "Let data tell its own story" },
      learnedSince: "2024",
    },
    {
      id: "python-stata",
      name: { zh: "Python / Stata", en: "Python / Stata" },
      category: "data",
      size: 1.1,
      proficiency: 2,
      x: -40,
      y: 210,
      oneLiner: { zh: "特征提取与聚类分析", en: "Feature extraction & clustering" },
      proofOfWork: { zh: "函数猫用户聚类分析", en: "User clustering at FuncCat" },
      learnedSince: "2023",
    },
    {
      id: "academic-writing",
      name: { zh: "学术写作", en: "Academic Writing" },
      category: "language",
      size: 1.2,
      proficiency: 3,
      x: 90,
      y: 175,
      oneLiner: { zh: "把复杂问题写清楚", en: "Writing complex things clearly" },
      proofOfWork: { zh: "特高压输电实证研究论文", en: "UHV empirical research paper" },
      learnedSince: "2023",
    },
    {
      id: "french",
      name: { zh: "法语", en: "French" },
      category: "language",
      size: 0.85,
      proficiency: 1,
      passion: true,
      x: 240,
      y: 130,
      oneLiner: { zh: "进入另一个世界的钥匙", en: "A key to another world" },
      learnedSince: "2025",
    },
    {
      id: "english",
      name: { zh: "英语", en: "English" },
      category: "language",
      size: 1.15,
      proficiency: 4,
      x: 205,
      y: 40,
      oneLiner: { zh: "IELTS 8.0 · 流利工作语言", en: "IELTS 8.0 · fluent working language" },
      learnedSince: "2015",
    },
  ],
  edges: [
    { from: "ai-eng", to: "prompt", label: { zh: "底层技能", en: "underlying skill" } },
    { from: "ai-eng", to: "multi-agent", label: { zh: "工程化落地", en: "engineered into" } },
    { from: "ai-eng", to: "product-design", label: { zh: "AI 加速原型验证", en: "AI speeds up prototyping" } },
    { from: "product-design", to: "user-research", label: { zh: "需求来源", en: "sourced from" } },
    { from: "product-design", to: "data-viz", label: { zh: "用数据支撑决策", en: "backed by data" } },
    { from: "data-viz", to: "python-stata", label: { zh: "工具", en: "tooling" } },
    { from: "user-research", to: "python-stata", label: { zh: "定量分析", en: "quantified via" } },
    { from: "academic-writing", to: "english", label: { zh: "语言载体", en: "expressed in" } },
    { from: "academic-writing", to: "python-stata", label: { zh: "实证支撑", en: "empirical backing" } },
    { from: "english", to: "french" },
  ],
};
