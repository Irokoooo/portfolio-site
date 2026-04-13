'use client';
// About Me 板块（第十五轮）
// - Core Traits：从右侧小卡片 → 独立大板块（滚动触发，水平树状生长）
// - 照片区：Ken Burns 纪录片效果
// - PhotoPanel 不再包含 Core Traits，CoreTraits 独立渲染在 AboutSection 底部
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";

// ── 动画变量 ──
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: "easeOut" as const } },
};

// ── 纸张微卷卡片 ──
function PaperCard({ children, className = '', variant = 'default', colSpan = '' }: {
  children: React.ReactNode; className?: string; variant?: 'default' | 'warm' | 'parchment'; colSpan?: string;
}) {
  const baseClass = variant === 'warm'
    ? 'bento-card-warm'
    : variant === 'parchment'
      ? 'paper-panel'
      : 'bento-card';
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        y: -3,
        boxShadow: variant === 'warm'
          ? '0 8px 32px rgba(198,49,74,0.10), 4px 8px 20px rgba(63,46,47,0.07)'
          : variant === 'parchment'
            ? '0 10px 30px rgba(63,46,47,0.12), 3px 6px 16px rgba(63,46,47,0.08)'
            : '0 8px 28px rgba(63,46,47,0.11), 4px 8px 18px rgba(63,46,47,0.06)',
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className={`${baseClass} rounded-lg ${colSpan} ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ── Languages 卡片 ──
const languages = [
  { lang: '中文',    detail: '普通话二乙',              level: '母语', color: '#C6314A' },
  { lang: 'English', detail: 'IELTS 8.0 · 六级 605 · 国才优秀', level: 'C1',   color: '#3A5A40' },
  { lang: 'Français', detail: '持续学习中',              level: 'B1+', color: '#4A6FA5' },
];
function LanguagesCard() {
  return (
    <div>
      <p className="text-[9px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-3">Languages · 语言能力</p>
      <div className="flex flex-col gap-2.5">
        {languages.map((l) => (
          <div key={l.lang} className="flex items-center gap-2.5">
            <div className="w-6 h-4 rounded-sm flex-shrink-0 opacity-80" style={{ backgroundColor: l.color }} />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-seed-shadow/80 leading-none">
                {l.lang}
                <span className="text-[9px] font-normal text-seed-shadow/40 ml-1.5">{l.detail}</span>
              </p>
            </div>
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded border flex-shrink-0"
              style={{ color: l.color, borderColor: `${l.color}40`, backgroundColor: `${l.color}0a` }}>
              {l.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const sopSteps = [
  {
    title: '目标对齐',
    detail: '先对齐团队 OKR / 个人目标，再倒推自己本环节作用。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="3" x2="12" y2="6" /><line x1="21" y1="12" x2="18" y2="12" />
      </svg>
    ),
  },
  {
    title: '先写后评',
    detail: '先独立完整写一版文档，再进入评审与优化。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
      </svg>
    ),
  },
  {
    title: '问题自诊',
    detail: '中间问题先自查归因，形成选项后再精准提问。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><line x1="20" y1="20" x2="16.65" y2="16.65" /><path d="M11 8v3l2 2" />
      </svg>
    ),
  },
  {
    title: '链路明确',
    detail: '明确上下游依赖，知道自己交付如何被使用。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 1 0-7l1.5-1.5a5 5 0 0 1 7 7L17 13" /><path d="M14 11a5 5 0 0 1 0 7L12.5 19.5a5 5 0 0 1-7-7L7 11" />
      </svg>
    ),
  },
  {
    title: '复盘沉淀',
    detail: '维护错题本，沉淀纰漏与复盘，避免重复踩坑。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" /><path d="M20.49 15A9 9 0 1 1 23 10" />
      </svg>
    ),
  },
];

function PersonalSopCard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-md border border-seed-shadow/8 bg-milk-white/25 translate-x-1.5 translate-y-1.5" aria-hidden="true" />
      <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-3">Personal Workflow SOP</p>
      <p className="text-sm font-serif text-seed-shadow/80 mb-3">个人工作 SOP 指南</p>
      <div className="space-y-2.5">
        {sopSteps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-2.5 rounded-md border border-seed-shadow/10 bg-milk-white/45 p-2.5">
            <span className="w-5 h-5 mt-0.5 rounded-full border border-seed-shadow/20 bg-milk-white/70 text-[10px] text-seed-shadow/70 flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-seed-shadow/55 mb-1">
                <span className="w-4 h-4 flex items-center justify-center">{step.icon}</span>
                <p className="text-xs font-medium text-seed-shadow/78">{step.title}</p>
              </div>
              <p className="text-xs text-seed-shadow/70 leading-relaxed">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkPrinciplesCard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-md border border-seed-shadow/8 bg-milk-white/25 -translate-x-1.5 translate-y-1.5" aria-hidden="true" />
      <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-3">Working Principles</p>
      <p className="text-sm font-serif text-seed-shadow/80 mb-3">工作理念</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-md border border-seed-shadow/15 bg-milk-white/55 p-3">
          <div className="h-1 w-14 rounded-full bg-strawberry-jam/35 mb-2" aria-hidden="true" />
          <p className="text-xs font-medium text-seed-shadow mb-1">1. 利他原则</p>
          <p className="text-xs text-seed-shadow/70 leading-relaxed">
            面向对接方先降理解成本：信息按阅读顺序组织，避免抽象表达，提前准备例子与上下文。
          </p>
        </div>
        <div className="rounded-md border border-seed-shadow/15 bg-milk-white/55 p-3">
          <div className="h-1 w-14 rounded-full bg-leaf-green/35 mb-2" aria-hidden="true" />
          <p className="text-xs font-medium text-seed-shadow mb-1">2. 即时反馈</p>
          <p className="text-xs text-seed-shadow/70 leading-relaxed">
            主动同步正在做什么、产出什么、卡点在哪，用截图与文字给到可执行反馈，必要时快速拉会。
          </p>
        </div>
      </div>
    </div>
  );
}

// 能力框架 — 统一古典暖棕色系，用数字序号区分层级
const capabilityItems = [
  {
    index: '01',
    title: '业务桥梁与流程重构',
    subtitle: 'Business-Tech Architect',
    desc: '具备极强业务沟通理解与 GenAI 场景落地能力；擅长将一线业务痛点转化为明确的技术需求与功能提案，并主导端到端内容工作流的自动化设计落地与 SOP 标准化搭建，有效降低跨部门协作沟通熵。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    index: '02',
    title: '商业洞察与数据驱动',
    subtitle: 'Data-Driven Strategist',
    desc: '具备"数据处理-深度挖掘-商业分析"的完整闭环能力。熟练运用 Python/SQL/Stata 独立完成复杂数据的清洗与可视化，能以商业思维进行多维剖析，高效输出业务策略交付物与数据看板。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    index: '03',
    title: '敏捷执行与综合素养',
    subtitle: 'Agile Execution',
    desc: '极具内驱力与高效自学能力，擅长多线程并发作业与多场景应用能力。兼备严密逻辑思维与深度田野调研能力，具备极强的商业路演与答辩表现，能在复杂业务环境下保持高质量的敏捷交付。',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

function SkillStackCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const skills = [
    { label: 'AI Workflow / Multi-Agent', value: 95, tip: '用于并行审查、格式校对与流程自动化。' },
    { label: 'SQL / Python', value: 92, tip: '用于用户反馈分析、特征提取与聚类。' },
    { label: 'PRD / SOP', value: 94, tip: '用于需求转译、流程沉淀与标准化交付。' },
    { label: 'Excel / PPT', value: 93, tip: '用于数据整理、复盘汇报与路演表达。' },
    { label: 'Figma / Canva', value: 90, tip: '用于原型、视觉排版与教学工具界面设计。' },
    { label: 'Notion / Obsidian', value: 93, tip: '用于知识库管理与结构化记录。' },
    { label: 'Prompt Engineering', value: 95, tip: '用于高复用提示词与任务拆解。' },
    { label: '英文 / 法语', value: 90, tip: '用于跨文化沟通与多语种材料处理。' },
  ];

  return (
    <div ref={ref} className="rounded-lg border border-seed-shadow/12 bg-milk-white/35 p-4">
      <div className="pb-2 border-b border-dashed border-seed-shadow/18 mb-3">
        <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-1">Skill Stack · 技能矩阵</p>
        <p className="text-xl font-serif text-seed-shadow/85 leading-none">技能堆栈</p>
      </div>
      <div className="space-y-3">
        {skills.map((skill, index) => (
          <div key={skill.label} className="group relative">
            <p className="text-sm font-semibold text-seed-shadow/85 mb-1.5">{skill.label}</p>
            <div className="h-2.5 rounded-sm bg-seed-shadow/10 overflow-hidden">
              <motion.div
                className="h-full rounded-sm"
                style={{ backgroundColor: '#8B6B4A' }}
                initial={{ width: 0 }}
                animate={{ width: isInView ? `${skill.value}%` : 0 }}
                transition={{ duration: 0.65, delay: 0.12 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="absolute right-0 -top-8 z-20 px-2 py-1 rounded border border-seed-shadow/15 bg-milk-white text-[11px] text-seed-shadow/70 whitespace-nowrap shadow-sm opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
              {skill.tip}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagePanelCard() {
  return (
    <div>
      <p className="text-sm font-serif text-seed-shadow/90 mb-3">语言能力</p>
      <LanguagesCard />
    </div>
  );
}

// 证书资历卡（独立）— 统一古典暖棕色系
const certItems = [
  { label: "CDA 数据分析师", icon: "◈" },
  { label: "NCRE 二级",      icon: "◈" },
  { label: "Prompt Cert.",   icon: "◈" },
  { label: "普通话二乙",     icon: "◈" },
];

function CertificatePanelCard() {
  return (
    <div>
      <p className="text-[9px] font-medium text-seed-shadow/30 uppercase tracking-widest mb-2">Credentials · 证书资历</p>
      <div className="grid grid-cols-2 gap-1.5">
        {certItems.map((cert) => (
          <div
            key={cert.label}
            className="rounded px-2.5 py-1.5 flex items-center gap-1.5 bg-milk-white/70"
            style={{ border: '1px solid rgba(63,46,47,0.10)' }}
          >
            <span className="text-[8px] text-seed-shadow/30">{cert.icon}</span>
            <span className="text-xs text-seed-shadow/72">{cert.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanelCard() {
  return (
    <div>
      <p className="text-[9px] font-medium text-seed-shadow/30 uppercase tracking-widest mb-2">Contact · 联系方式</p>
      <div className="grid grid-cols-1 gap-1.5 mb-4">
        <a href="mailto:2436698411@qq.com"
          className="flex items-center gap-2 text-sm text-seed-shadow/70 hover:text-seed-shadow transition-colors rounded px-2.5 py-1.5 bg-milk-white/70 hover:bg-milk-white"
          style={{ border: '1px solid rgba(63,46,47,0.10)' }}>
          <span className="text-base leading-none opacity-60">📧</span>
          <span>2436698411@qq.com</span>
        </a>
        <div className="flex items-center gap-2 text-sm text-seed-shadow/65 rounded px-2.5 py-1.5 bg-milk-white/50"
          style={{ border: '1px solid rgba(63,46,47,0.08)' }}>
          <span className="text-base leading-none opacity-60">📱</span>
          <span>+86 184 7665 9652</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-seed-shadow/65 rounded px-2.5 py-1.5 bg-milk-white/50"
          style={{ border: '1px solid rgba(63,46,47,0.08)' }}>
          <span className="text-base leading-none opacity-60">📍</span>
          <span>北京 / 深圳 / 香港</span>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ExternalLinkButton href="https://www.linkedin.com/in/xinyi-shi1015" label="View on LinkedIn" />
        <ExternalLinkButton href="/resume.pdf" label="Download CV" />
      </div>
    </div>
  );
}

function PhotoPanel() {
  return (
    <div className="rounded-2xl overflow-hidden border border-seed-shadow/8 shadow-sm">
      {/* 固定宽高比，防止视频加载导致布局跳动 */}
      {/* mix-blend-mode 对 video 标签在多数浏览器不生效，改用 CSS isolation 方案：
          容器设 isolation:isolate + mix-blend-mode，视频本身不加 blendMode */}
      <div
        className="relative bg-[#f5f0e8] aspect-[16/10] overflow-hidden"
        style={{ isolation: 'isolate' }}
      >
        {/* 视频层：正常渲染，白底视频 */}
        <video
          src="/assets/tree-growth.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-[1.22] origin-center"
          style={{
            filter: 'contrast(1.18) brightness(1.04) saturate(0.78)',
          }}
          preload="metadata"
        />
        {/* 羊皮纸色叠加层：用 multiply 混合消除白底，让视频自然融入背景 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(245, 237, 220, 0.38)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* 顶部渐变遮罩（增强与卡片顶部的过渡） */}
        <div
          className="absolute inset-x-0 top-0 h-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(245,240,232,0.5), transparent)',
          }}
        />
      </div>
      <div className="bg-white px-6 py-5 border-t border-seed-shadow/8">
        <p className="text-[10px] font-medium text-seed-shadow/30 uppercase tracking-widest mb-2">Personal Motto</p>
        <p className="font-serif text-base text-seed-shadow/80 leading-relaxed italic">
          "做一个不知疲倦的海绵"
        </p>
        <p className="text-xs text-seed-shadow/35 mt-2 font-light">— Bridging insight and execution, always.</p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// ── Core Traits 大板块（水平树状，滚动触发生长）──
// ────────────────────────────────────────────────
// 布局：FOUNDATION → (横线) → CORE ABILITIES → (横线) → OUTCOME
// 每层是一个竖排的节点列（圆点 + 层标签 + pills）
// 节点间用横线连接，横线 scaleX 0→1 生长
const traitColumns = [
  {
    label: 'Foundation · 底座',
    desc: '驱动一切的内在根基',
    traits: ['内驱执行', '高效自学'],
    dotColor: 'rgba(63,46,47,0.45)',
    lineColor: 'rgba(63,46,47,0.15)',
    pillStyle: 'border-seed-shadow/20 text-seed-shadow/60 bg-seed-shadow/4',
    accent: 'rgba(63,46,47,0.3)',
  },
  {
    label: 'Core Abilities · 树干',
    desc: '持续输出的核心能力',
    traits: ['逻辑分析', '高效沟通', '多线程作业'],
    dotColor: 'rgba(58,90,64,0.55)',
    lineColor: 'rgba(58,90,64,0.2)',
    pillStyle: 'border-[#3A5A40]/25 text-[#3A5A40]/70 bg-[#3A5A40]/5',
    accent: 'rgba(58,90,64,0.35)',
  },
  {
    label: 'Outcome · 树冠',
    desc: '面向外部的可见产出',
    traits: ['汇报展示', '商科 × Tech 落地'],
    dotColor: 'rgba(198,49,74,0.5)',
    lineColor: 'rgba(198,49,74,0.2)',
    pillStyle: 'border-strawberry-jam/20 text-strawberry-jam/65 bg-strawberry-jam/4',
    accent: 'rgba(198,49,74,0.35)',
  },
];

function CoreTraitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-120px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 42, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 42, scale: 0.96 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mt-20 relative"
    >
      {/* 标题区 */}
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-xs font-medium text-seed-shadow/35 uppercase tracking-widest mb-2"
        >
          Core Traits · 核心特质
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-serif text-[30px] text-seed-shadow/72"
        >
          从底座到树冠的能力生长
        </motion.p>
      </div>

      {/* 水平树状图 */}
      <div className="flex items-stretch justify-center gap-2">
        {traitColumns.map((col, i) => (
          <div key={col.label} className="flex items-center">
            {/* 节点列 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.25 + 0.3, duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center text-center"
              style={{ minWidth: 210 }}
            >
              {/* 节点圆点（弹出） */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: i * 0.25 + 0.4, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-5 h-5 rounded-full border-2 border-white shadow-md mb-4"
                style={{ backgroundColor: col.dotColor, boxShadow: `0 0 0 4px ${col.lineColor}` }}
              />

              {/* 层标签 */}
              <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-1">{col.label}</p>
              <p className="text-xs text-seed-shadow/45 mb-4 leading-relaxed px-2">{col.desc}</p>

              {/* Pills */}
              <div className="flex flex-col gap-1.5 items-center">
                {col.traits.map((t, ti) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                    transition={{ delay: i * 0.25 + 0.55 + ti * 0.08, duration: 0.35 }}
                    className={`text-xs px-3.5 py-1.5 rounded-full border font-medium ${col.pillStyle}`}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* 层间横线（生长动画） */}
            {i < traitColumns.length - 1 && (
              <div className="flex items-center px-3" style={{ marginTop: -72 }}>
                {/* 左圆点 */}
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: col.accent }} />
                {/* 生长横线 */}
                <div className="overflow-hidden" style={{ width: 96 }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: i * 0.25 + 0.6, duration: 0.5, ease: 'easeOut' }}
                    style={{
                      height: 1,
                      transformOrigin: 'left',
                      background: `linear-gradient(to right, ${col.accent}, ${traitColumns[i + 1].accent})`,
                    }}
                  />
                </div>
                {/* 右圆点 */}
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: traitColumns[i + 1].accent }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部细节装饰线 */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        className="mt-12 mx-auto"
        style={{
          height: 1,
          maxWidth: 720,
          transformOrigin: 'center',
          background: 'linear-gradient(to right, transparent, rgba(63,46,47,0.12), transparent)',
        }}
      />
    </motion.div>
  );
}

// ── 植物藤蔓装饰 ──
function VineDecoration() {
  return (
    <>
      <img src="/assets/decorations/vine-right.png" alt="" aria-hidden="true"
        className="absolute bottom-0 right-0 w-28 h-28 object-contain opacity-12 pointer-events-none select-none"
        style={{ mixBlendMode: 'multiply' }} />
      <img src="/assets/decorations/gold-foil.png" alt="" aria-hidden="true"
        className="absolute top-0 right-0 w-16 h-16 object-contain opacity-15 pointer-events-none select-none"
        style={{ mixBlendMode: 'multiply' }} />
    </>
  );
}

// ── 主组件 ──
export function AboutSection() {
  return (
    <div className="space-y-6">
      {/* 标题 */}
      <motion.div initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">About Me</h2>
        <p className="text-xs text-seed-shadow/50">关于我</p>
        <img src="/assets/decorations/ornament-divider.svg" alt="" aria-hidden="true"
          className="mt-2 opacity-25 w-48 pointer-events-none select-none" />
      </motion.div>

      {/* 主体双栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧 Bento */}
        <motion.div className="lg:col-span-7 grid grid-cols-2 gap-3" variants={containerVariants} initial="hidden" animate="visible">
          <PaperCard variant="warm" colSpan="col-span-2" className="p-5 relative overflow-hidden">
            <VineDecoration />
            <p className="text-xs font-medium text-seed-shadow/40 uppercase tracking-widest mb-3">Who I Am</p>
            <p className="text-sm text-seed-shadow leading-relaxed">
              与其坐以待毙寻找“为何而活”，我选择推开门，走向更大的世界。在探索中定义生命，而非在围城里自怨自艾。
              <br className="hidden sm:block" />
              在自学成本近乎为零的 AI 时代，我热衷于以极高的好奇心探索陌生领域，打破学科间的知识壁垒，探索跨领域结合的可能性。我享受高压下的多线程并发作业，并始终践行「开始做了，就做到最好」的准则，希望能够成为一个强悍的一体机。对我而言，探索本身就是对虚无最有力的回应，而高效、高质量的交付，则是对自己生命精力输出的最基本负责。
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["国际经济与贸易", "Vibe Coder / AI Workflow", "IELTS 8.0 · 法语 B1+", "全链路中台运营", "高精力奋战人"].map(tag => (
                <span key={tag} className="text-xs bg-milk-white border border-seed-shadow/15 text-seed-shadow/70 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </PaperCard>

          <PaperCard variant="parchment" colSpan="col-span-2" className="p-4">
            <WorkPrinciplesCard />
          </PaperCard>

          <PaperCard variant="parchment" className="p-4">
            <PersonalSopCard />
          </PaperCard>

          <PaperCard variant="parchment" className="p-4">
            <SkillStackCard />
          </PaperCard>
        </motion.div>

        {/* 右侧：Ken Burns 照片 + 语言与联系方式 */}
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'bottom' }}
          className="lg:col-span-5 lg:sticky lg:top-8 space-y-4"
        >
          <PhotoPanel />
          <PaperCard className="p-5">
            <LanguagePanelCard />
          </PaperCard>
          {/* 证书资历卡 */}
          <PaperCard variant="parchment" className="p-5">
            <CertificatePanelCard />
          </PaperCard>
          {/* 联系方式卡 */}
          <PaperCard className="p-5">
            <ContactPanelCard />
          </PaperCard>
        </motion.div>
      </div>

      {/* ── 能力框架 — 全宽三列并排 ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* 小标题 */}
        <div className="mb-4">
          <p className="text-[10px] font-medium text-seed-shadow/32 uppercase tracking-widest mb-0.5">Capability Frame · 能力框架</p>
          <div className="h-px w-32" style={{ background: 'linear-gradient(to right, rgba(63,46,47,0.18), transparent)' }} />
        </div>
        {/* 三列卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {capabilityItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="rounded-lg overflow-hidden flex flex-col bg-milk-white/55"
              style={{ border: '1px solid rgba(63,46,47,0.10)' }}
            >
              {/* 顶部色条 */}
              <div className="h-[3px] w-full" style={{ background: 'linear-gradient(to right, rgba(198,49,74,0.45), rgba(139,107,74,0.25))' }} />
              <div className="flex-1 p-4">
                {/* 序号 + 图标 */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-light text-seed-shadow/15 leading-none tabular-nums">{item.index}</span>
                  <span className="text-seed-shadow/35 w-7 h-7 flex items-center justify-center rounded-full bg-seed-shadow/5">
                    {item.icon}
                  </span>
                </div>
                {/* 标题 */}
                <p className="text-[13px] font-semibold text-seed-shadow/85 leading-snug mb-0.5">{item.title}</p>
                <p className="text-[10px] font-medium text-seed-shadow/35 tracking-wide mb-3">{item.subtitle}</p>
                {/* 描述 */}
                <p className="text-xs text-seed-shadow/60 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Core Traits 大板块（滚动进入视口触发） ── */}
      <CoreTraitsSection />
    </div>
  );
}
