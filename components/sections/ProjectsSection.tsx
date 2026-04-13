'use client';
// 项目精选板块：Bento Box 网格布局 + Pill Tab 切换 + Rich Media Skeleton 占位
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";

type TabKey = "all" | "research" | "product" | "competition";

const tabs: { key: TabKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "research", label: "Research · 学术" },
  { key: "product", label: "Product · 产品" },
  { key: "competition", label: "Competition · 竞赛" },
];

const projects = [
  {
    id: 1,
    category: "research" as TabKey,
    emoji: "📈",
    title: "特高压输电工程对服务业企业绩效的影响",
    subtitle: "独立学术论文",
    tags: ["Stata DID", "ArcGIS", "Python", "面板数据"],
    desc: "构建双重差分模型，独立完成 14 年跨度面板数据清洗与实证分析，产出高质量学术图表。",
    period: "2025.11 — 2026.03",
    award: "🏆 全国能源经济大赛本科生研究论文组一等奖",
    featured: true,
  },
  {
    id: 2,
    category: "research" as TabKey,
    emoji: "🤖",
    title: "基于机器学习的边疆企业数字化转型测度",
    subtitle: "科研项目 · 核心成员",
    tags: ["ERNIE 模型", "特征工程", "数据清洗"],
    desc: "负责核心面板数据收集整理，将原始数据转化为高质量结构化资产，为 ERNIE 模型训练提供基础。",
    period: "2024.09 — 2025.06",
    featured: false,
  },
  {
    id: 7,
    category: "research" as TabKey,
    emoji: "🚢",
    title: "厦门国贸供应链数智化转型分析",
    subtitle: "案例分析 · 核心成员",
    tags: ["商业分析", "供应链管理", "数据可视化", "结构化交付"],
    desc: "聚焦厦门国贸集团供应链数字化路径，深度拆解从传统贸易到数智化平台的转型逻辑，产出结构化分析报告。",
    period: "2026.01 — 至今",
    featured: false,
  },
  {
    id: 3,
    category: "product" as TabKey,
    emoji: "🌐",
    title: "本作品集网站 Portfolio Site",
    subtitle: "Vibe Coding 实践",
    tags: ["Next.js 14", "Tailwind CSS", "TypeScript", "framer-motion"],
    desc: "从零搭建个人作品集网站，采用双栏架构 + 状态驱动渲染，完整记录 AI 辅助开发的 Vibe Coding 工作流。",
    period: "2026.04",
    github: "https://github.com",
    featured: true,
  },
  {
    id: 4,
    category: "product" as TabKey,
    emoji: "⚖️",
    title: "AI 法律服务数字化展示平台",
    subtitle: "全国挑战赛 · 技术成员",
    tags: ["前端开发", "Agent 架构", "Prompt 调优"],
    desc: "负责 Agent 架构搭建、Prompt 调试调优与落地场景优化，以及数字化展示网页平台前端落地。",
    period: "2025.11 — 2025.12",
    award: "🏆 全国智法杯优秀奖 · 全国 AI 赋能司法创新大赛国家三等奖",
    featured: false,
  },
  {
    id: 5,
    category: "competition" as TabKey,
    emoji: "💡",
    title: "第十六届三创赛商业计划",
    subtitle: "全国二等奖",
    tags: ["商业计划书", "路演答辩", "商业模式"],
    desc: "负责核心商业文书结构化撰写，答辩 PPT 制作与商业模式运营落地规划。",
    period: "2026.03",
    award: "🏆 全国二等奖",
    featured: false,
  },
  {
    id: 6,
    category: "competition" as TabKey,
    emoji: "🌏",
    title: "国际商务大赛全英文论文",
    subtitle: "北京市二等奖",
    tags: ["学术英语写作", "商务分析", "路演答辩"],
    desc: "全英文论文主笔撰写，担任团队主答辩手。",
    period: "2025.11",
    award: "🏆 北京市二等奖",
    featured: false,
  },
];

// ── Rich Media Skeleton 占位符组件 ──
function VideoPlaceholder() {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
      <div className="aspect-video relative animate-pulse bg-gray-100 flex flex-col items-center justify-center gap-2">
        {/* 播放按钮 */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-gray-400 ml-1" />
        </div>
        <p className="text-xs text-gray-400 font-medium">🎥 Video Player Placeholder</p>
        <p className="text-xs text-gray-300">项目演示视频 · 即将上传</p>
      </div>
      {/* 进度条骨架 */}
      <div className="p-3 space-y-2 animate-pulse">
        <div className="h-1.5 bg-gray-200 rounded-full w-full">
          <div className="h-1.5 bg-gray-300 rounded-full w-1/3" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-8" />
          <div className="h-3 bg-gray-200 rounded w-8" />
        </div>
      </div>
    </div>
  );
}

function FigmaPlaceholder() {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-100">
      {/* Figma 顶部工具栏骨架 */}
      <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-3 animate-pulse">
        <div className="w-4 h-4 bg-gray-700 rounded" />
        <div className="h-3 bg-gray-700 rounded w-32" />
        <div className="ml-auto flex gap-2">
          <div className="h-6 bg-gray-700 rounded w-16" />
          <div className="h-6 bg-gray-700 rounded w-16" />
        </div>
      </div>
      {/* iframe 主体骨架 */}
      <div className="aspect-video bg-gray-50 animate-pulse flex flex-col items-center justify-center gap-3">
        {/* Figma Logo 占位 */}
        <div className="flex items-center gap-2">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-3 h-3 bg-gray-300 rounded-sm" />
            <div className="w-3 h-3 bg-gray-200 rounded-sm" />
            <div className="w-3 h-3 bg-gray-200 rounded-sm" />
            <div className="w-3 h-3 bg-gray-300 rounded-sm" />
          </div>
          <span className="text-xs text-gray-400 font-medium">Figma</span>
        </div>
        <p className="text-xs text-gray-400 font-medium">🖱️ Figma Prototype iframe Placeholder</p>
        <p className="text-xs text-gray-300">交互原型内嵌展示 · 连接中...</p>
        {/* 加载点动画 */}
        <div className="flex gap-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filtered = activeTab === "all"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  // 找到 featured 项目（用于大卡展示）
  const featuredProjects = filtered.filter((p) => p.featured);
  const normalProjects = filtered.filter((p) => !p.featured);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">Project Highlights</h2>
        <p className="text-xs text-seed-shadow/50">项目精选</p>
      </div>

      {/* 二级 Pill Tab */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-seed-shadow text-milk-white border-seed-shadow"
                : "text-seed-shadow/50 border-seed-shadow/20 hover:border-seed-shadow/40 hover:text-seed-shadow"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Bento Box 项目网格 ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="space-y-3"
        >
          {/* Featured 大卡（跨 2 列） */}
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="border border-seed-shadow/12 rounded-lg p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group bg-cream-pour/60"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{project.emoji}</span>
                  <div>
                    <p className="text-sm font-medium text-seed-shadow group-hover:text-seed-shadow/80">{project.title}</p>
                    <p className="text-xs text-seed-shadow/40 mt-0.5">{project.subtitle}</p>
                  </div>
                </div>
                <span
                  className="text-xs text-seed-shadow/45 whitespace-nowrap shrink-0 font-serif italic"
                  style={{ fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif' }}
                >{project.period}</span>
              </div>
              <p className="text-xs text-seed-shadow/65 leading-relaxed mb-3">{project.desc}</p>
              {project.award && (
                <p className="text-xs text-amber-700/80 mb-3">{project.award.replace('🏆 ', '')}</p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-milk-white border border-seed-shadow/15 text-seed-shadow/60 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.github && (
                  <ExternalLinkButton href={project.github} label="GitHub" />
                )}
              </div>
            </div>
          ))}

          {/* 普通卡片网格（2 列） */}
          {normalProjects.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {normalProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-seed-shadow/10 rounded-lg p-4 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group bg-cream-pour/40"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xl">{project.emoji}</span>
                    <span
                      className="text-xs text-seed-shadow/40 whitespace-nowrap font-serif italic"
                      style={{ fontFamily: '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif' }}
                    >{project.period}</span>
                  </div>
                  <p className="text-xs font-medium text-seed-shadow group-hover:text-seed-shadow/80 mb-1">{project.title}</p>
                  <p className="text-xs text-seed-shadow/40 mb-2">{project.subtitle}</p>
                  <p className="text-xs text-seed-shadow/60 leading-relaxed mb-2">{project.desc}</p>
                  {project.award && (
                    <p className="text-xs text-amber-700/80 mb-2">{project.award.replace('🏆 ', '')}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-milk-white/80 text-seed-shadow/55 px-2 py-0.5 rounded border border-seed-shadow/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Rich Media Skeleton 占位区域（仅在 product tab 或 all tab 显示） ── */}
          {(activeTab === "all" || activeTab === "product") && (
            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                Rich Media · 项目媒体展示（即将上线）
              </p>
              <div className="grid grid-cols-1 gap-4">
                <VideoPlaceholder />
                <FigmaPlaceholder />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
