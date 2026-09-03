export type VibeMediaType = "image" | "video" | "mixed";

export interface VibeCodingPost {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  date: string;
  tags: string[];
  type: string;
  mediaType: VibeMediaType;
  sourceFiles: string[];
  contentFile: string;
  githubUrl?: string;
  demoUrl?: string;
  galleryImages?: string[];
  content?: string;
  contentEn?: string;
  category?: "personal" | "work";
  coverImage?: string;
  highlights?: string[];
  mediaItems?: { src: string; label: string }[];
}

export const vibeCodingPosts: VibeCodingPost[] = [
  {
    slug: "zenow-ai-health-game",
    title: "Zenow（之诺）AI 健康陪伴游戏",
    description: "以“心流时间”为命题，把真实健康任务变成掷骰探索、成长反馈与 AI 陪伴体验；在她来创造 Coding Lady 女性 AI 创造者黑客松中获得创意奖。",
    date: "2026-07",
    tags: ["AI Companion", "Gamified Health", "Multi-Agent Workflow", "Three.js", "Supabase"],
    type: "Hackathon Product",
    mediaType: "image",
    sourceFiles: [
      "zenow-coding-lady-01.jpg",
      "zenow-coding-lady-02.jpg",
      "zenow-coding-lady-03.jpg",
    ],
    contentFile: "zenow-ai-health-game.md",
    githubUrl: "https://github.com/Irokoooo/Zenow",
    demoUrl: "https://zen0w.me/?ui=20260725-2",
    galleryImages: [
      "/works/vibe/zenow-coding-lady-01.jpg",
      "/works/vibe/zenow-coding-lady-02.jpg",
      "/works/vibe/zenow-coding-lady-03.jpg",
    ],
    category: "personal",
    coverImage: "/works/covers/vibe/zenow-ai-health-game.png",
  },
  {
    slug: "spellbook-openclaw",
    title: "SpellBook｜OpenClaw 智能工作台",
    description: "用网页聊天替代传统终端操作的 AI Agent 可视化管理平台，通过 Web 与本地 Agent 双端架构降低 OpenClaw 的使用门槛。",
    date: "2026-06",
    tags: ["OpenClaw", "Agent Architecture", "Next.js", "FastAPI", "Supabase Realtime"],
    type: "Product Prototype",
    mediaType: "image",
    sourceFiles: [],
    contentFile: "spellbook-openclaw.md",
    githubUrl: "https://github.com/Irokoooo/spellbook-openclaw",
    demoUrl: "https://www.spellb00k.me",
    category: "personal",
  },
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
    sourceFiles: ["luma-flow.mp4"],
    contentFile: "luma-flow.md",
    githubUrl: "https://github.com/Irokoooo/Luma-Flow",
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
    galleryImages: ["/works/vibe/portfolio-early-version-01.png"],
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
    galleryImages: ["/works/vibe/student-evaluation-system-01.png"],
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
    galleryImages: ["/works/vibe/challenge-cup-website-01.png"],
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
