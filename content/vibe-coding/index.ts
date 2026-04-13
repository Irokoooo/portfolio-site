export type VibeMediaType = "image" | "video" | "mixed";

export interface VibeCodingPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  type: string;
  mediaType: VibeMediaType;
  sourceFiles: string[];
  contentFile: string;
  content?: string;
}

export const vibeCodingPosts: VibeCodingPost[] = [
  {
    slug: "lawflaw-ai-assistant",
    title: "LawFlaw AI 智能合规系统",
    description: "面向涉外合同合规场景的 AI 助手，打通 Agent 接入、会话管理与结构化结果回传。",
    date: "2025-10",
    tags: ["Vibe Coding", "AI Assistant", "Legal Tech"],
    type: "Product Prototype",
    mediaType: "mixed",
    sourceFiles: ["LawFlaw AI使用手册.pdf", "LawFlow视频.mp4"],
    contentFile: "lawflaw-ai-assistant.md",
  },
  {
    slug: "luma-flow",
    title: "Luma Flow 实时语境语言学习平台",
    description: "抓取实时新闻并按语言能力动态分级，支持同页口语对练，减少语言学习中的语境割裂与切换摩擦。",
    date: "2026-04",
    tags: ["Vibe Coding", "Language Learning", "Google AI Studio", "Product Architecture"],
    type: "Product Prototype",
    mediaType: "video",
    sourceFiles: ["luma-flow.mp4（待上传）"],
    contentFile: "luma-flow.md",
  },
  {
    slug: "portfolio-early-version",
    title: "个人作品集早期版本",
    description: "作品集初版视觉与信息架构探索，用于验证信息分层与页面骨架。",
    date: "2025-06",
    tags: ["Portfolio", "UI Iteration", "Vibe Coding"],
    type: "UI Prototype",
    mediaType: "image",
    sourceFiles: ["个人作品集一开始.png"],
    contentFile: "portfolio-early-version.md",
  },
  {
    slug: "student-evaluation-system",
    title: "大学生综测系统设计",
    description: "将综测细则算法化并落地双端审核流，面向班委与学生的校园管理效率系统。",
    date: "2025-09",
    tags: ["System Design", "Campus Product", "Prototype"],
    type: "System Prototype",
    mediaType: "image",
    sourceFiles: ["大学生综测系统设计.png"],
    contentFile: "student-evaluation-system.md",
  },
  {
    slug: "challenge-cup-website",
    title: "APPLE ASSENCE 商务平台",
    description: "围绕洛川苹果助农出海搭建跨国商务销售平台，结合大模型与数字人交互完成商业化验证。",
    date: "2025-01",
    tags: ["Competition", "Web Design", "Frontend"],
    type: "Website Prototype",
    mediaType: "image",
    sourceFiles: ["挑战杯网站的图片.png"],
    contentFile: "challenge-cup-website.md",
  },
  {
    slug: "agrimind-eco-platform",
    title: "耘境 AgriMind 生态农业智能协同平台",
    description: "基于田野调研构建科技助农场景原型，验证农业信息可视化与业务协同的可行性。",
    date: "2025-04",
    tags: ["AgriTech", "Platform", "AI Collaboration"],
    type: "Platform Demo",
    mediaType: "video",
    sourceFiles: ["耘境-AgriMind _ 生态农业智能协同平台 .mp4"],
    contentFile: "agrimind-eco-platform.md",
  },
];
