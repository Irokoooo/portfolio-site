'use client';
// 学术与实践客户端组件（两列布局）
// 左列：科研项目 + 调研项目（可交互）
// 右列：社会实践（非交互卡片）+ 自学笔记（可交互）
import { createPortal } from "react-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { AcademicResearchPost } from "@/content/academic-research/index";
import { categories } from "@/content/academic-research/index";

interface AcademicResearchClientProps {
  posts: AcademicResearchPost[];
}

function DrawerCover({ src, alt }: { src?: string; alt: string }) {
  const [loadError, setLoadError] = useState(false);

  if (!src || loadError) {
    // 无封面时：渐变色占位，带植物学风格纹理
    return (
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #4A5740 0%, #2e3828 40%, #3F2E2F 100%)',
        }}
      >
        {/* 细腻噪点叠加 */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
          <filter id="cover-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#cover-noise)"/>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setLoadError(true)}
    />
  );
}

// ── 各板块的色彩主题配置 ──
// 基于网站整体色板，每个分类用不同色调
const categoryTheme = {
  research: {
    // 橄榄苔绿：旧植物标本册质感，沉稳不鲜艳
    accent: '#4A5740',
    bgGradient: 'linear-gradient(135deg, rgba(74,87,64,0.07) 0%, rgba(74,87,64,0.025) 100%)',
    border: 'rgba(74,87,64,0.2)',
    borderLeft: '#4A5740',
    tagBg: 'rgba(74,87,64,0.1)',
    tagColor: '#2e3828',
    tagBorder: 'rgba(74,87,64,0.26)',
    headerColor: '#3a4532',
    dotColor: '#4A5740',
    // SVG 植物叶脉纹理
    patternId: 'leaf-pattern-research',
  },
  fieldwork: {
    // 草莓红系：调研项目
    accent: '#C6314A',
    bgGradient: 'linear-gradient(135deg, rgba(198,49,74,0.05) 0%, rgba(198,49,74,0.015) 100%)',
    border: 'rgba(198,49,74,0.2)',
    borderLeft: '#C6314A',
    tagBg: 'rgba(198,49,74,0.1)',
    tagColor: '#9a1f33',
    tagBorder: 'rgba(198,49,74,0.28)',
    headerColor: '#9a1f33',
    dotColor: '#C6314A',
    patternId: 'cross-pattern-fieldwork',
  },
  fieldExperience: {
    // 暖金棕系：社会实践
    accent: '#B8860B',
    bgGradient: 'linear-gradient(135deg, rgba(184,134,11,0.06) 0%, rgba(184,134,11,0.02) 100%)',
    border: 'rgba(184,134,11,0.22)',
    borderLeft: '#B8860B',
    tagBg: 'rgba(184,134,11,0.1)',
    tagColor: '#7a5800',
    tagBorder: 'rgba(184,134,11,0.28)',
    headerColor: '#7a5800',
    dotColor: '#B8860B',
    patternId: 'dot-pattern-field',
  },
  learning: {
    // 靛蓝系：自学笔记
    accent: '#4A7FA5',
    bgGradient: 'linear-gradient(135deg, rgba(74,127,165,0.06) 0%, rgba(74,127,165,0.02) 100%)',
    border: 'rgba(74,127,165,0.22)',
    borderLeft: '#4A7FA5',
    tagBg: 'rgba(74,127,165,0.1)',
    tagColor: '#2d5878',
    tagBorder: 'rgba(74,127,165,0.28)',
    headerColor: '#2d5878',
    dotColor: '#4A7FA5',
    patternId: 'wave-pattern-learning',
  },
};

// ── 内联 SVG 纹理 Defs（植物学风格）──
function SvgPatternDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* 叶脉纹理 — 科研项目（橄榄苔绿） */}
        <pattern id="leaf-pattern-research" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 2 Q28 10 20 20 Q12 10 20 2Z" fill="none" stroke="rgba(74,87,64,0.14)" strokeWidth="0.8"/>
          <path d="M20 20 L20 38" stroke="rgba(74,87,64,0.1)" strokeWidth="0.6" strokeDasharray="2 3"/>
          <path d="M20 20 Q24 24 28 22" stroke="rgba(74,87,64,0.08)" strokeWidth="0.5" fill="none"/>
          <path d="M20 20 Q16 24 12 22" stroke="rgba(74,87,64,0.08)" strokeWidth="0.5" fill="none"/>
        </pattern>

        {/* 交叉细纹 — 调研项目 */}
        <pattern id="cross-pattern-fieldwork" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="20" y2="20" stroke="rgba(198,49,74,0.07)" strokeWidth="0.6"/>
          <line x1="20" y1="0" x2="0" y2="20" stroke="rgba(198,49,74,0.07)" strokeWidth="0.6"/>
          <circle cx="10" cy="10" r="0.8" fill="rgba(198,49,74,0.1)"/>
        </pattern>

        {/* 点阵纹理 — 社会实践 */}
        <pattern id="dot-pattern-field" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="1.2" fill="rgba(184,134,11,0.12)"/>
          <circle cx="0" cy="0" r="0.6" fill="rgba(184,134,11,0.07)"/>
          <circle cx="16" cy="0" r="0.6" fill="rgba(184,134,11,0.07)"/>
          <circle cx="0" cy="16" r="0.6" fill="rgba(184,134,11,0.07)"/>
          <circle cx="16" cy="16" r="0.6" fill="rgba(184,134,11,0.07)"/>
        </pattern>

        {/* 水波纹 — 自学笔记 */}
        <pattern id="wave-pattern-learning" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 10 Q10 4 20 10 Q30 16 40 10" fill="none" stroke="rgba(74,127,165,0.1)" strokeWidth="0.8"/>
          <path d="M0 18 Q10 12 20 18 Q30 24 40 18" fill="none" stroke="rgba(74,127,165,0.06)" strokeWidth="0.6"/>
        </pattern>
      </defs>
    </svg>
  );
}

// ── 分类标题分隔区 ──
function CategoryHeader({ label, description, themeKey }: {
  label: string;
  description: string;
  themeKey: keyof typeof categoryTheme;
}) {
  const theme = categoryTheme[themeKey];
  return (
    <div className="pb-3 mb-1" style={{ borderBottom: `1.5px solid ${theme.border}` }}>
      <div className="flex items-center gap-2 mb-1">
        {/* 小色块标识 */}
        <span
          className="inline-block w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: theme.accent }}
        />
        <p
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: theme.headerColor }}
        >
          {label}
        </p>
      </div>
      <p className="text-sm text-seed-shadow/65 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ── 彩色 Tag 徽章 ──
function ColorTag({ tag, themeKey }: { tag: string; themeKey: keyof typeof categoryTheme }) {
  const theme = categoryTheme[themeKey];
  return (
    <span
      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
      style={{
        background: theme.tagBg,
        color: theme.tagColor,
        border: `1px solid ${theme.tagBorder}`,
      }}
    >
      {tag}
    </span>
  );
}

// 分类描述
const categoryDescriptions: Record<string, string> = {
  research: "在跨学科交叉领域深度探讨，完成学术论文研究与成果发表",
  fieldwork: "通过田野调查与定性研究，深化对产业与社区的实地理解",
  learning: "系统化整理与总结的知识框架与学习进度记录",
};

// 社会实践数据
interface FieldExperience {
  title: string;
  role: string;
  tags: string[];
  desc: string;
  period: string;
}

const fieldExperiences: FieldExperience[] = [
  {
    title: "北京国际短片节 (BISFF)",
    role: "国际组联络志愿者",
    tags: ["国际交流", "双语宣发", "媒体统筹"],
    desc: "统筹现场执行与国际文化交流，负责双语媒体宣传，展现跨文化沟通与媒体统筹能力。",
    period: "2025.10 — 2025.12",
  },
  {
    title: "深圳国际世博会 (Shenzhen Expo)",
    role: "外事协调组志愿者",
    tags: ["跨文化沟通", "外宾接待", "现场统筹"],
    desc: "在多语言环境下负责外宾接待，敏捷应对突发状况，保障大型外事活动顺畅执行。",
    period: "2024.09 — 2025.06",
  },
  {
    title: "SheNicest 深圳黑客松 (Hackathon)",
    role: "统筹志愿者 & 软件组参与者",
    tags: ["GenAI 赋能", "Prompt 调优", "跨界参与"],
    desc: "统筹赛事现场执行与流程推进，同时作为参赛团队外部伙伴提供 AI Prompt 调优与应用建议指导。",
    period: "2024",
  },
];

export function AcademicResearchClient({ posts }: AcademicResearchClientProps) {
  const [selectedPost, setSelectedPost] = useState<AcademicResearchPost | null>(null);
  const isDrawerOpen = selectedPost !== null;

  // 分离科研/调研与自学笔记
  const researchAndFieldwork = posts.filter((p) => p.category === "research" || p.category === "fieldwork");
  const learningNotes = posts.filter((p) => p.category === "learning");

  return (
    <div className="relative">
      {/* SVG 纹理 defs（全局注入，供 pattern 引用） */}
      <SvgPatternDefs />

      {/* ── 主内容区：Drawer 打开时向后退缩 ── */}
      <motion.div
        animate={isDrawerOpen
          ? { scale: 0.95, filter: "blur(2px)", opacity: 0.7 }
          : { scale: 1, filter: "blur(0px)", opacity: 1 }
        }
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "center top", willChange: "transform" }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-serif text-seed-shadow mb-1">Academic Research</h2>
          <p className="text-xs text-seed-shadow/40 mb-8">学术与实践 — 跨学科深度学习与研究记录</p>
        </div>

        {/* ── 两列布局 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ═════ 左列：科研项目 + 调研项目 ═════ */}
          <div className="space-y-8">
            {categories
              .filter((cat) => cat.key !== "learning") // 左列只显示科研+调研
              .map((category) => {
                const themeKey = category.key as keyof typeof categoryTheme;
                const theme = categoryTheme[themeKey];
                const categoryPosts = researchAndFieldwork.filter(
                  (p) => p.category === category.key
                );
                if (categoryPosts.length === 0) return null;

                return (
                  <div key={category.key} className="space-y-3">
                    {/* 分类标题（去掉数字） */}
                    <CategoryHeader
                      label={category.label}
                      description={categoryDescriptions[category.key]}
                      themeKey={themeKey}
                    />

                    {/* 卡片列表 */}
                    <div className="space-y-3">
                      {categoryPosts.map((post) => (
                        <motion.button
                          key={post.slug}
                          onClick={() => setSelectedPost(post)}
                          whileHover={{ y: -2, scale: 1.005 }}
                          className="w-full text-left rounded-xl overflow-hidden transition-all duration-200 group"
                          style={{
                            background: theme.bgGradient,
                            border: `1px solid ${theme.border}`,
                            borderLeft: `3px solid ${theme.borderLeft}`,
                            boxShadow: '0 1px 4px rgba(63,46,47,0.04)',
                          }}
                        >
                          {/* SVG 纹理背景叠加 */}
                          <div className="relative p-4">
                            <svg
                              className="absolute inset-0 w-full h-full pointer-events-none"
                              aria-hidden="true"
                            >
                              <rect width="100%" height="100%" fill={`url(#${theme.patternId})`} />
                            </svg>

                            <div className="relative flex gap-3">
                              {/* 左侧：文字 */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  {/* type 徽章 */}
                                  <span
                                    className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
                                    style={{
                                      background: theme.tagBg,
                                      color: theme.tagColor,
                                      border: `1px solid ${theme.tagBorder}`,
                                    }}
                                  >
                                    {post.type}
                                  </span>
                                  <span className="text-xs text-seed-shadow/30">{post.date}</span>
                                </div>
                                <p className="text-sm font-semibold text-seed-shadow group-hover:text-seed-shadow/80 leading-snug mb-1.5">
                                  {post.title}
                                </p>
                                <p className="text-xs text-seed-shadow/55 leading-relaxed line-clamp-2">
                                  {post.description}
                                </p>
                                {post.tags.length > 0 && (
                                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                                    {post.tags.slice(0, 3).map((tag) => (
                                      <ColorTag key={tag} tag={tag} themeKey={themeKey} />
                                    ))}
                                  </div>
                                )}
                              </div>
                              {/* 右侧：箭头 */}
                              <span
                                className="text-sm shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5"
                                style={{ color: theme.accent }}
                              >
                                →
                              </span>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* ═════ 右列：社会实践 + 自学笔记 ═════ */}
          <div className="space-y-8">
            {/* ─── 社会实践（非交互卡片）─── */}
            <div className="space-y-3">
              <CategoryHeader
                label="Field Experience · 社会实践"
                description="国际交流与现场统筹——在大型赛事与论坛中担任核心协调与外事支撑角色"
                themeKey="fieldExperience"
              />

              <div className="space-y-3">
                {fieldExperiences.map((exp) => {
                  const theme = categoryTheme.fieldExperience;
                  return (
                    <div
                      key={exp.title}
                      className="rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        background: theme.bgGradient,
                        border: `1px solid ${theme.border}`,
                        borderLeft: `3px solid ${theme.borderLeft}`,
                        boxShadow: '0 1px 4px rgba(63,46,47,0.04)',
                      }}
                    >
                      <div className="relative p-4">
                        <svg
                          className="absolute inset-0 w-full h-full pointer-events-none"
                          aria-hidden="true"
                        >
                          <rect width="100%" height="100%" fill={`url(#${theme.patternId})`} />
                        </svg>

                        <div className="relative flex gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-seed-shadow leading-snug mb-0.5">
                              {exp.title}
                            </p>
                            <p
                              className="text-xs font-medium mb-2"
                              style={{ color: theme.headerColor }}
                            >
                              {exp.role}
                            </p>
                            <p className="text-xs text-seed-shadow/55 leading-relaxed line-clamp-2 mb-2.5">
                              {exp.desc}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.tags.map((tag) => (
                                <ColorTag key={tag} tag={tag} themeKey="fieldExperience" />
                              ))}
                            </div>
                            <p
                              className="text-[11px] mt-2 font-medium"
                              style={{ color: `${theme.accent}99` }}
                            >
                              {exp.period}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ─── 自学笔记（交互卡片）─── */}
            {learningNotes.length > 0 && (
              <div className="space-y-3">
                <CategoryHeader
                  label="Learning Notes · 自学笔记"
                  description={categoryDescriptions["learning"]}
                  themeKey="learning"
                />

                <div className="space-y-3">
                  {learningNotes.map((post) => {
                    const theme = categoryTheme.learning;
                    return (
                      <motion.button
                        key={post.slug}
                        onClick={() => setSelectedPost(post)}
                        whileHover={{ y: -2, scale: 1.005 }}
                        className="w-full text-left rounded-xl overflow-hidden transition-all duration-200 group"
                        style={{
                          background: theme.bgGradient,
                          border: `1px solid ${theme.border}`,
                          borderLeft: `3px solid ${theme.borderLeft}`,
                          boxShadow: '0 1px 4px rgba(63,46,47,0.04)',
                        }}
                      >
                        <div className="relative p-4">
                          <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            aria-hidden="true"
                          >
                            <rect width="100%" height="100%" fill={`url(#${theme.patternId})`} />
                          </svg>

                          <div className="relative flex gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded"
                                  style={{
                                    background: theme.tagBg,
                                    color: theme.tagColor,
                                    border: `1px solid ${theme.tagBorder}`,
                                  }}
                                >
                                  {post.type}
                                </span>
                                <span className="text-xs text-seed-shadow/30">{post.date}</span>
                              </div>
                              <p className="text-sm font-semibold text-seed-shadow group-hover:text-seed-shadow/80 leading-snug mb-1.5">
                                {post.title}
                              </p>
                              <p className="text-xs text-seed-shadow/55 leading-relaxed line-clamp-2">
                                {post.description}
                              </p>
                              {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-2.5">
                                  {post.tags.slice(0, 3).map((tag) => (
                                    <ColorTag key={tag} tag={tag} themeKey="learning" />
                                  ))}
                                </div>
                              )}
                            </div>
                            <span
                              className="text-sm shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-0.5"
                              style={{ color: theme.accent }}
                            >
                              →
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Drawer：右侧滑入（Portal 到 body，避免被主内容 transform 影响） ── */}
      {typeof document !== "undefined" && selectedPost && createPortal(
        <AnimatePresence>
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-seed-shadow/25 backdrop-blur-sm z-[90]"
              style={{ position: "fixed", inset: 0, zIndex: 90 }}
              onClick={() => setSelectedPost(null)}
            />

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}
            >
            <motion.aside
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 h-screen w-[48rem] max-w-[92vw] bg-milk-white shadow-2xl flex flex-col relative pointer-events-auto"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100vh",
                width: "min(48rem, 92vw)",
                borderLeft: "1px solid rgba(63,46,47,0.08)",
                pointerEvents: "auto",
              }}
            >
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* ── Notion 风格封面区：固定高度 + 全宽 + 渐变+暗角+标题叠底 ── */}
                <div className="relative h-56 overflow-hidden">
                  {/* key={coverImage} 确保每次切换卡片时 DrawerCover 重新挂载，
                      避免上次加载失败的 loadError state 被复用到下一个卡片 */}
                  <DrawerCover key={selectedPost.coverImage ?? selectedPost.slug} src={selectedPost.coverImage} alt={selectedPost.title} />

                  {/* 由上到下渐变遮罩（上透明 → 下半透明奶白） */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to bottom, rgba(247,244,238,0.05) 0%, rgba(247,244,238,0.18) 40%, rgba(247,244,238,0.88) 100%)" }}
                  />
                  {/* 柔和暗角 */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(20,16,13,0.0) 30%, rgba(20,16,13,0.28) 100%)" }}
                  />
                  {/* 底部到奶白的最终淡出，让标题自然衔接正文 */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-milk-white" />

                  {/* 左上：类型标签 + 日期（叠加在封面上） */}
                  <div className="absolute left-8 top-6 z-10">
                    <span className="text-xs text-white/95 bg-black/30 px-2.5 py-1 border border-white/25 rounded-full backdrop-blur-sm font-medium tracking-wide">
                      {selectedPost.type}
                    </span>
                    <p className="text-[11px] text-white/75 mt-1.5 font-medium">{selectedPost.date}</p>
                  </div>

                  {/* 关闭按钮：右上角 */}
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 z-20 text-white/90 hover:text-white transition-colors p-2 bg-black/22 hover:bg-black/38 backdrop-blur-sm rounded-lg"
                    aria-label="关闭"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>

                  {/* 标题三层白框，半叠在封面底部 */}
                  <div className="absolute left-8 right-8 bottom-4 z-10">
                    <div className="bg-white/55 rounded-xl p-1 backdrop-blur-[2px]">
                      <div className="bg-white/75 rounded-[10px] p-1">
                        <div className="bg-white/90 backdrop-blur-sm border border-white/70 rounded-lg px-4 py-3 shadow-sm">
                          <h1 className="text-xl font-serif text-seed-shadow leading-snug">
                            {selectedPost.title}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 px-8 pb-8 pt-4">
                  {/* Drawer 内的 tag 用彩色 */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {selectedPost.tags.map((tag, i) => {
                      // 轮换色系
                      const themeKeys: (keyof typeof categoryTheme)[] = ['research', 'fieldwork', 'learning', 'fieldExperience'];
                      const themeKey = themeKeys[i % themeKeys.length];
                      return <ColorTag key={tag} tag={tag} themeKey={themeKey} />;
                    })}
                  </div>

                  <div className="bg-cream-pour/30 border border-seed-shadow/10 rounded-lg px-5 py-4 mb-6">
                    <p className="text-[10px] font-medium text-seed-shadow/40 uppercase tracking-widest mb-2">
                      Project Overview
                    </p>
                    <p className="text-sm text-seed-shadow/65 leading-relaxed">
                      {selectedPost.description}
                    </p>
                  </div>

                  {selectedPost.content && (
                    <div className="prose prose-sm max-w-none
                      prose-headings:font-serif prose-headings:text-seed-shadow
                      prose-h2:text-lg prose-h3:text-base
                      prose-p:text-seed-shadow/70 prose-p:leading-relaxed
                      prose-strong:text-seed-shadow prose-strong:font-medium
                      prose-blockquote:border-l-leaf-green/40 prose-blockquote:text-seed-shadow/58
                      prose-table:text-xs prose-th:bg-cream-pour/50 prose-th:text-seed-shadow/70 prose-th:font-medium
                      prose-td:text-seed-shadow/65
                      prose-li:text-seed-shadow/70 prose-li:leading-relaxed
                      prose-hr:border-seed-shadow/8">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {selectedPost.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
            </motion.div>
          </>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
