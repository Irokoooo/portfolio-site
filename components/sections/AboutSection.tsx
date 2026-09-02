'use client';
// About Me 板块
// - 照片区：Ken Burns 纪录片效果
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLinkButton } from "@/components/ui/ExternalLinkButton";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { StudyRoomCard } from "@/components/scene/StudyRoomCard";

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
  { lang: '中文',    detail: { zh: '普通话二乙', en: 'Putonghua Level II-B' }, level: '母语', color: '#C6314A' },
  { lang: 'English', detail: { zh: '等级 C1 · IELTS 8.0 · CET-6 605', en: 'C1 · IELTS 8.0 · CET-6 605' }, level: 'C1', color: '#3A5A40' },
  { lang: 'Français', detail: { zh: '等级 B1+ · DELF 备考中（分数待更新）', en: 'B1+ · Preparing for DELF (score TBD)' }, level: 'B1+', color: '#4A6FA5' },
];
function LanguagesCard({ lang }: { lang: 'zh' | 'en' }) {
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
                <span className="text-[9px] font-normal text-seed-shadow/40 ml-1.5">{lang === 'zh' ? l.detail.zh : l.detail.en}</span>
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

const sopStepsEn = [
  { title: 'Goal Alignment', detail: 'Align team OKRs and personal objectives first, then define your role in the chain.' },
  { title: 'Write Before Review', detail: 'Draft a complete version independently before entering review and optimization.' },
  { title: 'Self Diagnosis', detail: 'Troubleshoot and identify causes first, then ask precise questions with options.' },
  { title: 'Clear Dependencies', detail: 'Clarify upstream and downstream dependencies so delivery usage is explicit.' },
  { title: 'Retrospective', detail: 'Maintain a mistake log and retrospectives to avoid repeating the same pitfalls.' },
];

function PersonalSopCard({ lang }: { lang: 'zh' | 'en' }) {
  const sopTexts = lang === 'zh'
    ? sopSteps.map((item) => ({ title: item.title, detail: item.detail }))
    : sopStepsEn;

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-md border border-seed-shadow/8 bg-milk-white/25 translate-x-1.5 translate-y-1.5" aria-hidden="true" />
      <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-3">Personal Workflow SOP</p>
      <p className="text-sm font-serif text-seed-shadow/80 mb-3">{lang === 'zh' ? '个人工作 SOP 指南' : 'Personal Workflow SOP Guide'}</p>
      <div className="space-y-2.5">
        {sopSteps.map((step, index) => (
          <div key={step.title} className="flex items-start gap-2.5 rounded-md border border-seed-shadow/10 bg-milk-white/45 p-2.5">
            <span className="w-5 h-5 mt-0.5 rounded-full border border-seed-shadow/20 bg-milk-white/70 text-[10px] text-seed-shadow/70 flex items-center justify-center shrink-0">
              {index + 1}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-1.5 text-seed-shadow/55 mb-1">
                <span className="w-4 h-4 flex items-center justify-center">{step.icon}</span>
                <p className="text-xs font-medium text-seed-shadow/78">{sopTexts[index]?.title ?? step.title}</p>
              </div>
              <p className="text-xs text-seed-shadow/70 leading-relaxed">{sopTexts[index]?.detail ?? step.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkPrinciplesCard({ lang }: { lang: 'zh' | 'en' }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-md border border-seed-shadow/8 bg-milk-white/25 -translate-x-1.5 translate-y-1.5" aria-hidden="true" />
      <p className="text-[10px] font-medium text-seed-shadow/35 uppercase tracking-widest mb-3">Working Principles</p>
      <p className="text-sm font-serif text-seed-shadow/80 mb-3">{lang === 'zh' ? '工作理念' : 'Working Principles'}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-md border border-seed-shadow/15 bg-milk-white/55 p-3">
          <div className="h-1 w-14 rounded-full bg-strawberry-jam/35 mb-2" aria-hidden="true" />
          <p className="text-xs font-medium text-seed-shadow mb-1">{lang === 'zh' ? '1. 利他原则' : '1. Reduce Cognitive Load'}</p>
          <p className="text-xs text-seed-shadow/70 leading-relaxed">
            {lang === 'zh'
              ? '面向对接方先降理解成本：信息按阅读顺序组织，避免抽象表达，提前准备例子与上下文。'
              : 'Organize information in reading order, avoid abstract wording, and prepare examples/context in advance.'}
          </p>
        </div>
        <div className="rounded-md border border-seed-shadow/15 bg-milk-white/55 p-3">
          <div className="h-1 w-14 rounded-full bg-leaf-green/35 mb-2" aria-hidden="true" />
          <p className="text-xs font-medium text-seed-shadow mb-1">{lang === 'zh' ? '2. 即时反馈' : '2. Fast Feedback'}</p>
          <p className="text-xs text-seed-shadow/70 leading-relaxed">
            {lang === 'zh'
              ? '主动同步正在做什么、产出什么、卡点在哪，用截图与文字给到可执行反馈，必要时快速拉会。'
              : 'Actively sync progress, outputs, and blockers. Provide actionable feedback with screenshots and concise notes.'}
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
    title: { zh: '业务桥梁与流程重构', en: 'Business Bridge & Process Design' },
    subtitle: 'Business-Tech Architect',
    desc: { zh: '具备极强业务沟通理解与 GenAI 场景落地能力；擅长将一线业务痛点转化为明确的技术需求与功能提案，并主导端到端内容工作流的自动化设计落地与 SOP 标准化搭建，有效降低跨部门协作沟通熵。', en: 'Strong business communication and GenAI deployment skills; adept at translating frontline pain points into clear technical requirements, and leading end-to-end workflow automation and SOP standardisation to reduce cross-team communication overhead.' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      </svg>
    ),
  },
  {
    index: '02',
    title: { zh: '商业洞察与数据驱动', en: 'Business Insight & Data Analytics' },
    subtitle: 'Data-Driven Strategist',
    desc: { zh: '具备"数据处理-深度挖掘-商业分析"的完整闭环能力。熟练运用 Python/SQL/Stata 独立完成复杂数据的清洗与可视化，能以商业思维进行多维剖析，高效输出业务策略交付物与数据看板。', en: 'Full-cycle capability from data processing to business analysis. Proficient in Python/SQL/Stata for data cleaning and visualisation; delivers business strategy outputs and dashboards with a commercial mindset.' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    index: '03',
    title: { zh: '敏捷执行与综合素养', en: 'Agile Execution & Versatility' },
    subtitle: 'Agile Execution',
    desc: { zh: '极具内驱力与高效自学能力，擅长多线程并发作业与多场景应用能力。兼备严密逻辑思维与深度田野调研能力，具备极强的商业路演与答辩表现，能在复杂业务环境下保持高质量的敏捷交付。', en: 'Highly self-motivated and fast-learning; skilled at parallel multi-stream work across contexts. Combines rigorous logical thinking with fieldwork research, strong pitch and defence performance, and high-quality agile delivery in complex environments.' },
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

function SkillStackCard({ lang }: { lang: 'zh' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const skills = [
    { label: 'AI Workflow / Multi-Agent', value: 95, tip: { zh: '用于并行审查、格式校对与流程自动化。', en: 'Used for parallel review, formatting QA, and workflow automation.' } },
    { label: 'SQL / Python', value: 92, tip: { zh: '用于用户反馈分析、特征提取与聚类。', en: 'Used for user feedback analysis, feature extraction, and clustering.' } },
    { label: 'PRD / SOP', value: 94, tip: { zh: '用于需求转译、流程沉淀与标准化交付。', en: 'Used for requirement translation, process documentation, and standardised delivery.' } },
    { label: 'Excel / PPT', value: 93, tip: { zh: '用于数据整理、复盘汇报与路演表达。', en: 'Used for data organisation, retrospective reporting, and pitch presentations.' } },
    { label: 'Figma / Canva', value: 90, tip: { zh: '用于原型、视觉排版与教学工具界面设计。', en: 'Used for prototyping, visual layout, and educational tool UI design.' } },
    { label: 'Notion / Obsidian', value: 93, tip: { zh: '用于知识库管理与结构化记录。', en: 'Used for knowledge base management and structured note-taking.' } },
    { label: 'Prompt Engineering', value: 95, tip: { zh: '用于高复用提示词与任务拆解。', en: 'Used for reusable prompt design and task decomposition.' } },
    { label: lang === 'en' ? 'EN / FR Languages' : '英文 / 法语', value: 90, tip: { zh: '用于跨文化沟通与多语种材料处理。', en: 'Used for cross-cultural communication and multilingual content handling.' } },
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
              {lang === 'zh' ? skill.tip.zh : skill.tip.en}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagePanelCard({ lang }: { lang: 'zh' | 'en' }) {
  return (
    <div>
      <p className="text-sm font-serif text-seed-shadow/90 mb-3">{lang === 'en' ? 'Languages' : '语言能力'}</p>
      <LanguagesCard lang={lang} />
    </div>
  );
}

// 证书资历卡（独立）— 统一古典暖棕色系
const certItems = [
  { label: { zh: "CDA 数据分析师", en: "CDA Data Analyst" }, icon: "◈" },
  { label: { zh: "NCRE 二级", en: "NCRE Level II" }, icon: "◈" },
  { label: { zh: "Prompt Cert.", en: "Prompt Cert." }, icon: "◈" },
  { label: { zh: "普通话二乙", en: "Putonghua II-B" }, icon: "◈" },
];

function CertificatePanelCard({ lang }: { lang: 'zh' | 'en' }) {
  return (
    <div>
      <p className="text-[9px] font-medium text-seed-shadow/30 uppercase tracking-widest mb-2">Credentials · 证书资历</p>
      <div className="grid grid-cols-2 gap-1.5">
        {certItems.map((cert) => (
          <div
            key={cert.label.zh}
            className="rounded px-2.5 py-1.5 flex items-center gap-1.5 bg-milk-white/70"
            style={{ border: '1px solid rgba(63,46,47,0.10)' }}
          >
            <span className="text-[8px] text-seed-shadow/30">{cert.icon}</span>
            <span className="text-xs text-seed-shadow/72">{lang === 'zh' ? cert.label.zh : cert.label.en}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanelCard({ lang }: { lang: 'zh' | 'en' }) {
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
          <span>{lang === 'en' ? 'Beijing / Shenzhen / Hong Kong' : '北京 / 深圳 / 香港'}</span>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ExternalLinkButton href="https://www.linkedin.com/in/xinyi-shi1015" label="View on LinkedIn" />
        <ExternalLinkButton href="/resume.pdf" label="Download CV" disabled />
      </div>
    </div>
  );
}

function PhotoPanel({ lang }: { lang: 'zh' | 'en' }) {
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
          {lang === 'en' ? '"Be an inexhaustible sponge."' : '"做一个不知疲倦的海绵"'}
        </p>
        {lang === 'zh' && (
          <p className="text-xs text-seed-shadow/35 mt-2 font-light">— Bridging insight and execution, always.</p>
        )}
      </div>
    </div>
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
  const { lang } = useLanguage();
  const aboutParagraphs = lang === 'zh'
    ? [
        '嗨，我是心怡，一个正在努力探索世界的人类！👋',
        '虽然读的是商科，但我想学的东西很多很多。AI、脑神经科学、人类行为学、语言学……看起来东一块西一块，说到底，我大概只是一直很好奇：',
        '碳基生物和硅基生物的边界，到底在哪里？',
        '人类是怎么理解、学习和创造的？模型又能学会多少？那些看起来越来越相似的能力背后，到底发生了什么？',
        '我还不知道答案。所以现在还在到处乱逛、乱学，也乱做一些东西。职业上好像也是这样。',
        '我依然没有一个特别明确的标签，也不太着急现在就给自己一个答案。我想多试一点、多学一点，在真正做事情的过程中，慢慢找到自己愿意一直走下去的方向。',
        '但至少现在，我已经知道一件事：我很喜欢做自己的产品。',
        '而驱动我的理由其实很简单——希望它真的能帮到某个人。可能是让同事早一点下班；可能是让一个原本晦涩难懂的东西变得平易近人；也可能只是让一个原本很难用的东西，变得好用一点。',
        '对我来说，技术和产品最有意思的地方，大概就在这里：把复杂留给系统，把简单留给人。',
        '这里是我探索世界时，留下的一些痕迹。',
      ]
    : [
        "Hi, I'm Xinyi — a human being trying to explore the world. 👋",
        'I study business, but the things I want to learn have never really stayed within the boundaries of my major. AI, neuroscience, human behavior, linguistics... They may seem a little all over the place, but I think they all come back to one question I am endlessly curious about:',
        'Where is the boundary between carbon-based and silicon-based intelligence?',
        "How do humans understand, learn, and create? How much of that can models learn to do? And as their capabilities begin to look increasingly similar, what's actually happening underneath?",
        "I don't know the answers yet. So for now, I'm wandering around, learning whatever catches my curiosity, and building things along the way. My career feels a bit like that, too.",
        "I still don't have a perfectly defined label for what I want to be, and I'm not in a hurry to give myself one. I'd rather keep trying, keep learning, and figure out what I want to pursue by actually doing things.",
        'But there is one thing I already know: I love building products of my own.',
        'And what drives me is actually pretty simple — I want what I build to genuinely help someone. Maybe it helps a colleague finish work a little earlier. Maybe it turns something intimidating and complicated into something approachable and accessible. Or maybe it simply makes something frustrating a little easier to use.',
        'To me, that is what makes technology and product-building so interesting: leave the complexity to the system, and simplicity to the people.',
        "This is where I keep some of the traces I've left while exploring the world.",
      ];
  const whoTags = lang === 'zh'
    ? ['国际经济与贸易', 'Vibe Coder / AI Workflow', 'IELTS 8.0 · 法语 B1+', '全链路中台运营', '高精力奋战人']
    : ['International Economics & Trade', 'Vibe Coder / AI Workflow', 'IELTS 8.0 · French B1+', 'End-to-End Ops', 'High-Energy Executor'];

  return (
    <>
      <div className="space-y-6">
      {/* 标题 */}
      <motion.div initial={{ opacity: 0, y: 16, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">About Me</h2>
        <p className="text-xs text-seed-shadow/50">{lang === 'zh' ? '关于我' : 'Profile'}</p>
        <img src="/assets/decorations/ornament-divider.svg" alt="" aria-hidden="true"
          className="mt-2 opacity-25 w-48 pointer-events-none select-none" />
      </motion.div>

      {/* 主体双栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧 Bento */}
        <motion.div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-3" variants={containerVariants} initial="hidden" animate="visible">
          <PaperCard variant="warm" colSpan="col-span-2" className="p-5 relative overflow-hidden">
            <VineDecoration />
            <p className="text-xs font-medium text-seed-shadow/40 uppercase tracking-widest mb-3">{lang === 'zh' ? '关于我' : 'Who I Am'}</p>
            <div className="space-y-3 text-sm text-seed-shadow leading-relaxed">
              {aboutParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 || index === 2 || index === 6 || index === 8 || index === 9 ? 'font-semibold text-seed-shadow' : undefined}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {whoTags.map(tag => (
                <span key={tag} className="text-xs bg-milk-white border border-seed-shadow/15 text-seed-shadow/70 px-2 py-0.5 rounded">{tag}</span>
              ))}
            </div>
          </PaperCard>

          <PaperCard variant="parchment" colSpan="col-span-2" className="p-4">
            <WorkPrinciplesCard lang={lang} />
          </PaperCard>

          {/* 3D 书房卡片：原地展开交互，逻辑见 components/scene/StudyRoomCard.tsx */}
          <StudyRoomCard />

          <PaperCard variant="parchment" colSpan="col-span-2" className="p-4">
            <SkillStackCard lang={lang} />
          </PaperCard>

          <PaperCard variant="parchment" colSpan="col-span-2" className="p-4">
            <PersonalSopCard lang={lang} />
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
          <PhotoPanel lang={lang} />
          <PaperCard className="p-5">
            <LanguagePanelCard lang={lang} />
          </PaperCard>
          {/* 证书资历卡 */}
          <PaperCard variant="parchment" className="p-5">
            <CertificatePanelCard lang={lang} />
          </PaperCard>
          {/* 联系方式卡 */}
          <PaperCard className="p-5">
            <ContactPanelCard lang={lang} />
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
              key={item.index}
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
                <p className="text-[13px] font-semibold text-seed-shadow/85 leading-snug mb-0.5">{lang === 'zh' ? item.title.zh : item.title.en}</p>
                <p className="text-[10px] font-medium text-seed-shadow/35 tracking-wide mb-3">{item.subtitle}</p>
                {/* 描述 */}
                <p className="text-xs text-seed-shadow/60 leading-relaxed">{lang === 'zh' ? item.desc.zh : item.desc.en}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

    </div>
    </>
  );
}
