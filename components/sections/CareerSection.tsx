'use client';

// 职业历程板块：Master-Detail 主从联动（上半部）+ 横向可滑动时间轴（下半部）
// 新增：Odometer 数字滚轮 + Ink Reveal 羽毛笔书写 + 真实荣誉数据
// Emoji 已全部清除：机构 Logo 用 public/assets/icons/ SVG，奖项图标循环使用 icon-award/medal/star

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';

// ─────────────────────────────────────────
// 类型定义
// ─────────────────────────────────────────

interface MetricCard {
  label: string;
  value: string;    // 数字部分（如 "500", "33.3"）
  unit?: string;
  suffix?: string;  // 数字后缀（如 "+", "%"）
}

interface Experience {
  id: string;
  type: 'internship' | 'education';
  org: string;
  orgEn: string;
  role: string;
  direction?: string;
  period: string;
  periodShort: string;
  /** 机构 Logo SVG 路径（public/assets/icons/），替代原 Emoji */
  logoSrc: string;
  tag?: string;
  metrics?: MetricCard[];
  quote?: string;
  bullets: string[];
  skills?: string[];
}

interface HonorItem {
  date: string;
  yearLabel: string;
  title: string;
  issuer: string;
  level?: string;
  /** 奖项图标 SVG 路径（icon-award / icon-medal / icon-star 循环） */
  iconSrc: string;
}

// ─────────────────────────────────────────
// 奖项图标循环数组（award → medal → star → 循环）
// ─────────────────────────────────────────
const HONOR_ICONS = [
  '/assets/icons/icon-award.svg',
  '/assets/icons/icon-medal.svg',
  '/assets/icons/icon-star.svg',
];

// ─────────────────────────────────────────
// 数据
// ─────────────────────────────────────────

const experiences: Experience[] = [
  {
    id: 'tal',
    type: 'internship',
    org: '好未来教育集团',
    orgEn: 'TAL Education Group',
    role: '数字化教研产品实习生 · AI Workflow',
    direction: 'Think Kids 海外业务 (国际数学竞赛教研)',
    period: '2025.11 — 至今',
    periodShort: '2025.11 —',
    logoSrc: '/assets/icons/tal.svg',
    tag: 'AI 工程',
    metrics: [
      { label: 'SOP 手册沉淀', value: '30', suffix: '+', unit: '份' },
      { label: '翻译校对总词量', value: '50', suffix: '+', unit: '万词' },
      { label: '错误率降低', value: '80', suffix: '%' },
    ],
    bullets: [
      '1 周内完成 36 本数学教材、共计 50 万+词的本地化翻译与校对，较传统人工模式提效 500% 以上。',
      '自研交互式教具网站，历经 20+ 个版本迭代，覆盖坐标轴、几何展开图等 8 类高频数学教研场景。',
      '通过多 Agent 并行评分与格式审查架构，将场景化翻译错误率降低 80%。',
      '针对新场景从 0 到 1 沉淀 30+ 份 SOP 手册，覆盖 Agent 复用、题库标签等全流程。',
    ],
    skills: ['AI Workflow', 'Multi-Agent', 'PRD 撰写', 'SOP 标准化'],
  },
  {
    id: 'func',
    type: 'internship',
    org: '上海函数猫有限公司',
    orgEn: 'Shanghai FuncCat Co.',
    role: '产品运营实习生 · UX 优化 / 需求转化',
    period: '2025.07 — 2025.09',
    periodShort: '2025 夏',
    logoSrc: '/assets/icons/fc.svg',
    tag: '产品设计',
    metrics: [
      { label: '结构化 PRD', value: '20', suffix: '+', unit: '条' },
      { label: '原始用户评价', value: '1000', suffix: '+', unit: '条' },
      { label: '高保真落地', value: '100', suffix: '%' },
    ],
    bullets: [
      '将模糊痛点精准转化为 20+ 条结构化需求清单（PRD），确保功能 100% 高保真落地。',
      '在用户反馈闭环建设中，利用 SQL/Python 对 1000+ 条原始用户评价进行特征提取与聚类分析。',
    ],
    skills: ['SQL', 'Python', 'PRD', '用户研究'],
  },
  {
    id: 'lingnan',
    type: 'education',
    org: '香港岭南大学',
    orgEn: 'Lingnan University, Hong Kong',
    role: '交换生 · 商学院 Global Business Focus',
    period: '2026.01 — 2026.06',
    periodShort: '2026',
    logoSrc: '/assets/icons/ln.svg',
    tag: '交换项目',
    quote: '额外申请人工智能数字化进阶课程，商科视野与 AI 工程能力在此深度融合。',
    bullets: [
      '商学院核心课程：全球商业战略、国际市场营销、国际商务分析、商业数据统计分析、数字化经济路径研究。',
      '额外申请人工智能数字化进阶课程，探索 AI 工具与商业场景的深度融合。',
      '获评学年优秀校际交换生，跨文化沟通与自适应能力得到认可。',
    ],
    skills: ['Global Business', '跨文化沟通', 'FinTech', '粤语'],
  },
  {
    id: 'minzu',
    type: 'education',
    org: '中央民族大学',
    orgEn: 'Minzu University of China',
    role: '经济学（本科）· 国际经济与贸易',
    period: '2024.09 — 2028.06',
    periodShort: '2024 —',
    logoSrc: '/assets/icons/muc.svg',
    tag: '主校',
    quote: '国际经贸底色，量化研究起点。在这里完成了从传统经济学到 AI 辅助研究的思维跨越。',
    bullets: [
      '主修国际经济与贸易。',
      '积极参与学校各类活动，包括学术科研、创赛商赛，探索不同场景下对于个人能力的要求，争做一体机。',
      '连续获评经济学院专业一等奖奖学金（前 5%），学业绩点优异。',
    ],
    skills: ['经济学', '国际贸易', 'Stata', 'Python', '学术写作'],
  },
];

// 横向时间轴真实数据（按时间倒序）
// iconSrc 按 HONOR_ICONS 循环分配：award → medal → star → award → ...
const honors: HonorItem[] = [
  {
    date: '2026.4',
    yearLabel: '2026',
    title: '学年优秀校际交换生',
    issuer: '香港岭南大学 商学院',
    level: '校级',
    iconSrc: HONOR_ICONS[0],
  },
  {
    date: '2026.04',
    yearLabel: '2026',
    title: '全国能源经济大赛 · 本科生研究论文组一等奖',
    issuer: '中国能源研究会',
    level: '国家级',
    iconSrc: HONOR_ICONS[1],
  },
  {
    date: '2026.03',
    yearLabel: '2026',
    title: '第十六届全国大学生"三创赛" · 全国二等奖',
    issuer: '全国大学生创新创业大赛组委会',
    level: '国家级',
    iconSrc: HONOR_ICONS[2],
  },
  {
    date: '2026.03',
    yearLabel: '2026',
    title: '全国品牌策划竞赛（农里鸿项目）· 主撰稿人',
    issuer: '全国品牌策划竞赛组委会',
    level: '国家级',
    iconSrc: HONOR_ICONS[0],
  },
  {
    date: '2025.12',
    yearLabel: '2025',
    title: '"智法杯"人工智能赋能法学创新大赛 · 优秀奖',
    issuer: '智法杯组委会',
    level: '省级',
    iconSrc: HONOR_ICONS[1],
  },
  {
    date: '2025.11',
    yearLabel: '2025',
    title: '全国 AI 赋能司法行政创新挑战赛 · 国家三等奖',
    issuer: '司法部',
    level: '国家级',
    iconSrc: HONOR_ICONS[2],
  },
  {
    date: '2025.11',
    yearLabel: '2025',
    title: '国际商务大赛 · 北京市二等奖',
    issuer: '北京市教育委员会',
    level: '市级',
    iconSrc: HONOR_ICONS[0],
  },
  {
    date: '2025.09',
    yearLabel: '2025',
    title: '经济学院专业一等奖学金（前 5%）',
    issuer: '中央民族大学 经济学院',
    level: '院级',
    iconSrc: HONOR_ICONS[1],
  },
  {
    date: '2025.07',
    yearLabel: '2025',
    title: '全国商务大赛（巧愿自习室项目）· 国家级奖项',
    issuer: '中国国际贸易促进委员会',
    level: '国家级',
    iconSrc: HONOR_ICONS[2],
  },
  {
    date: '2025.05',
    yearLabel: '2025',
    title: '大学生创新创业大赛 · 全国三等奖',
    issuer: '教育部',
    level: '国家级',
    iconSrc: HONOR_ICONS[0],
  },
];

// ─────────────────────────────────────────
// 动效变体
// ─────────────────────────────────────────

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as [number, number, number, number];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

const detailVariants: Variants = {
  hidden: { opacity: 0, x: 12, filter: 'blur(4px)' },
  visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: EASE_OUT_EXPO } },
  exit: { opacity: 0, x: -8, filter: 'blur(4px)', transition: { duration: 0.2, ease: 'easeIn' } },
};

// ─────────────────────────────────────────
// Odometer：数字从 0 滚动到目标值
// 在进入视口时触发，营造仪表盘数据跳动感
// ─────────────────────────────────────────

interface OdometerProps {
  target: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
}

function Odometer({ target, decimals = 0, duration = 1200, suffix = '' }: OdometerProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCurrent(target * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  const displayVal = decimals > 0
    ? current.toFixed(decimals)
    : Math.floor(current).toString();

  return (
    <span ref={ref} className="tabular-nums">
      {displayVal}{suffix}
    </span>
  );
}

// ─────────────────────────────────────────
// Ink Reveal：Quote 短句仿羽毛笔逐词显示
// ─────────────────────────────────────────

function InkReveal({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
      }}
      className="inline"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, filter: 'blur(3px)', y: 4 },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              transition: { duration: 0.45, ease: EASE_OUT_EXPO },
            },
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ─────────────────────────────────────────
// 机构 Logo 图标组件
// ─────────────────────────────────────────

interface OrgLogoProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

function OrgLogo({ src, size = 'md' }: OrgLogoProps) {
  const sizeClass = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6';
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${sizeClass} object-contain shrink-0`}
    />
  );
}

// ─────────────────────────────────────────
// 奖项图标组件（同样应用 CSS filter）
// ─────────────────────────────────────────

function HonorIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="w-4 h-4 object-contain shrink-0"
    />
  );
}

// ─────────────────────────────────────────
// 左侧经历卡片
// ─────────────────────────────────────────

interface ExperienceCardProps {
  exp: Experience;
  isActive: boolean;
  onClick: () => void;
}

function ExperienceCard({ exp, isActive, onClick }: ExperienceCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      onClick={onClick}
      className={[
        'group relative cursor-pointer rounded-xl p-4 transition-all duration-300 select-none border-t border-b border-r',
        isActive
          ? 'border-t-seed-shadow/8 border-b-seed-shadow/8 border-r-seed-shadow/8 border-l-[3px] bg-cream-pour/50 shadow-sm [border-left-color:#3A5A40]'
          : 'border-seed-shadow/10 bg-cream-pour/40 hover:border-seed-shadow/20 hover:bg-cream-pour/60 border-l',
      ].join(' ')}
    >
      {/* 左侧 active 指示条 */}
      <div className={[
        'absolute left-0 top-4 bottom-4 w-0.5 rounded-full transition-all duration-300',
        isActive ? 'bg-leaf-green' : 'bg-transparent',
      ].join(' ')} />

      <div className="pl-2">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            {/* 机构 Logo */}
            <OrgLogo src={exp.logoSrc} size="sm" />
            <div className="min-w-0">
              <p className={[
                'text-sm font-semibold leading-snug truncate transition-colors duration-200',
                isActive ? 'text-seed-shadow' : 'text-seed-shadow/80 group-hover:text-seed-shadow',
              ].join(' ')}>
                {exp.org}
              </p>
              <p className="text-[10px] text-seed-shadow/40 truncate">{exp.orgEn}</p>
            </div>
          </div>
          <span className={[
            'shrink-0 text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap',
            isActive
              ? 'bg-strawberry-jam/10 text-strawberry-jam'
              : 'bg-seed-shadow/6 text-seed-shadow/50',
          ].join(' ')}>
            {exp.periodShort}
          </span>
        </div>
        <p className="text-xs text-seed-shadow/60 leading-snug mb-2 pl-0.5">{exp.role}</p>
        {exp.tag && (
          <span className={[
            'inline-block text-[10px] px-1.5 py-0.5 rounded font-medium',
            exp.type === 'internship'
              ? 'bg-leaf-green/10 text-leaf-green'
              : 'bg-strawberry-jam/10 text-strawberry-jam',
          ].join(' ')}>
            {exp.tag}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// 右侧详情面板（含 Odometer + Ink Reveal）
// ─────────────────────────────────────────

function DetailPanel({ exp }: { exp: Experience }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={exp.id}
        variants={detailVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="h-full"
      >
        {/* paper-panel 类使用真实羊皮纸纹理（parchment.jpg），详见 globals.css */}
        <div className="paper-panel rounded-2xl h-full p-6 flex flex-col gap-5">

          {/* 顶部：机构 Logo + 名称 + 日期 */}
          <div className="flex items-start justify-between gap-3 pb-4 border-b border-seed-shadow/6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                {/* 大尺寸机构 Logo */}
                <OrgLogo src={exp.logoSrc} size="lg" />
                <div>
                  <h3 className="text-xl font-serif font-semibold text-seed-shadow leading-tight">{exp.org}</h3>
                  <p className="text-xs text-seed-shadow/40">{exp.orgEn}</p>
                </div>
              </div>
              <p className="text-sm text-seed-shadow/70 mt-1.5 font-medium">{exp.role}</p>
              {exp.direction && (
                <p className="text-sm text-seed-shadow/60 mt-1">{exp.direction}</p>
              )}
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-block bg-strawberry-jam/8 text-strawberry-jam text-xs font-semibold px-3 py-1.5 rounded-lg border border-strawberry-jam/15">
                {exp.period}
              </span>
              <div className="mt-1.5">
                <span className={[
                  'inline-block text-[10px] px-2 py-0.5 rounded-full font-medium',
                  exp.type === 'internship' ? 'bg-leaf-green/12 text-leaf-green' : 'bg-seed-shadow/8 text-seed-shadow/60',
                ].join(' ')}>
                  {exp.type === 'internship' ? '实习经历' : '教育背景'}
                </span>
              </div>
            </div>
          </div>

          {/* 指标看板（含 Odometer）或 Ink Reveal Quote */}
          {exp.metrics && exp.metrics.length > 0 ? (
            <div>
              <p className="text-[10px] font-medium text-seed-shadow/40 uppercase tracking-widest mb-2.5">
                Key Metrics · 核心数据
              </p>
              <div className="grid grid-cols-3 gap-2">
                {exp.metrics.map((m) => {
                  const numVal = parseFloat(m.value);
                  const isDecimal = m.value.includes('.');
                  return (
                    <div
                      key={m.label}
                      className="bg-milk-white/60 backdrop-blur-sm rounded-xl p-3 border border-seed-shadow/6 text-center"
                    >
                      <p className="text-[10px] text-seed-shadow/50 mb-1 leading-snug">{m.label}</p>
                      <p className="text-xl font-serif font-bold text-leaf-green leading-none">
                        <Odometer
                          target={numVal}
                          decimals={isDecimal ? 1 : 0}
                          duration={1000}
                          suffix={m.suffix ?? ''}
                        />
                        {m.unit && (
                          <span className="text-xs font-sans font-normal text-seed-shadow/40 ml-0.5">
                            {m.unit}
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : exp.quote ? (
            <div className="relative bg-cream-pour/50 rounded-xl p-4 border-l-2 border-leaf-green">
              <span className="absolute -top-1.5 left-3 text-2xl text-leaf-green/30 font-serif leading-none select-none">
                &ldquo;
              </span>
              <p className="text-sm text-seed-shadow/70 italic leading-relaxed pt-2">
                <InkReveal text={exp.quote} />
              </p>
            </div>
          ) : null}

          {/* 核心职责 */}
          <div className="flex-1">
            <p className="text-[10px] font-medium text-seed-shadow/40 uppercase tracking-widest mb-2.5">
              Highlights · 核心职责
            </p>
            <ul className="space-y-2.5">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 group/item">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-leaf-green/60 group-hover/item:bg-leaf-green transition-colors duration-200" />
                  <span className="text-xs text-seed-shadow/70 leading-relaxed group-hover/item:text-seed-shadow transition-colors duration-200">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 技能标签 */}
          {exp.skills && exp.skills.length > 0 && (
            <div className="pt-3 border-t border-seed-shadow/6">
              <p className="text-[10px] font-medium text-seed-shadow/40 uppercase tracking-widest mb-2">
                Skills · 相关技能
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((s) => (
                  <span key={s} className="text-[10px] bg-seed-shadow/5 text-seed-shadow/60 px-2 py-0.5 rounded-full border border-seed-shadow/8 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────
// SVG 正弦波浪线：替代直线，贯穿时间轴中部
// ─────────────────────────────────────────

interface SineWaveLineProps {
  nodeCount: number;
  nodeWidth: number;
  nodeGap: number;
  paddingX: number;
}

function SineWaveLine({ nodeCount, nodeWidth, nodeGap, paddingX }: SineWaveLineProps) {
  const totalWidth = paddingX * 2 + nodeCount * nodeWidth + (nodeCount - 1) * nodeGap;
  const centerY = 156;
  const svgHeight = 320;
  const amplitude = 0;
  const step = nodeWidth + nodeGap;

  const points = Array.from({ length: nodeCount }, (_, i) => {
    const x = paddingX + nodeWidth / 2 + i * step;
    const y = centerY + (i % 2 === 0 ? -amplitude : amplitude);
    return { x, y };
  });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX = (prev.x + curr.x) / 2;
    d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
  }

  return (
    <svg
      width={totalWidth}
      height={svgHeight}
      viewBox={`0 0 ${totalWidth} ${svgHeight}`}
      className="absolute inset-0 pointer-events-none"
      style={{ top: 0, left: 0 }}
      aria-hidden="true"
    >
      <path d={d} fill="none" stroke="rgba(63,46,47,0.12)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="rgba(198,49,74,0.08)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 8" />
    </svg>
  );
}

// ─────────────────────────────────────────
// 横向可滑动时间轴节点（上下交替，中线居中，顺序淡入）
// ─────────────────────────────────────────

function TimelineNode({ honor, index }: { honor: HonorItem; index: number }) {
  const isUp = index % 2 === 0; // 偶数上，奇数下

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: isUp ? -12 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="bg-milk-white/70 backdrop-blur-sm rounded-xl border border-seed-shadow/8 p-3 shadow-sm group-hover:shadow-md group-hover:border-leaf-green/20 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-1.5">
        <HonorIcon src={honor.iconSrc} />
        <span className="text-[10px] font-serif italic font-semibold text-strawberry-jam bg-strawberry-jam/8 px-1.5 py-0.5 rounded">
          {honor.date}
        </span>
      </div>
      <p className="text-[11px] font-semibold text-seed-shadow leading-snug mb-1">{honor.title}</p>
      <p className="text-[10px] text-seed-shadow/45 leading-snug mb-1.5">{honor.issuer}</p>
      {honor.level && (
        <span className="inline-block text-[9px] px-1.5 py-0.5 rounded-full bg-strawberry-jam/8 text-strawberry-jam font-semibold border border-strawberry-jam/15">
          {honor.level}
        </span>
      )}
    </motion.div>
  );

  return (
    <div
      className="flex flex-col items-center group shrink-0"
      style={{ width: '180px' }}
    >
      {/* 上方区域：偶数节点放卡片，奇数节点占等高空白 */}
      <div className="w-full flex flex-col justify-end" style={{ height: '160px' }}>
        {isUp && (
          <div className="w-full">
            <p className="font-serif text-2xl font-bold text-seed-shadow/12 group-hover:text-seed-shadow/22 leading-none mb-1.5 text-center transition-colors duration-300">
              {honor.yearLabel}
            </p>
            {cardContent}
          </div>
        )}
      </div>

      {/* 中间横轴上的锚点（圆点） */}
      <div className="flex items-center justify-center shrink-0 py-1">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.06 + 0.1 }}
          className="w-3 h-3 rounded-full bg-strawberry-jam ring-2 ring-strawberry-jam/25 ring-offset-2 ring-offset-milk-white shrink-0 group-hover:ring-strawberry-jam/50 transition-all duration-300"
        />
      </div>

      {/* 下方区域：奇数节点放卡片，偶数节点占等高空白 */}
      <div className="w-full" style={{ minHeight: '160px' }}>
        {!isUp && (
          <div className="w-full">
            {cardContent}
            <p className="font-serif text-2xl font-bold text-seed-shadow/12 group-hover:text-seed-shadow/22 leading-none mt-1.5 text-center transition-colors duration-300">
              {honor.yearLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// 主组件
// ─────────────────────────────────────────

export function CareerSection() {
  const [activeExp, setActiveExp] = useState<Experience>(experiences[0]);
  const timelineRef = useRef<HTMLDivElement>(null);
  const honorsSectionRef = useRef<HTMLDivElement>(null);
  const guideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const [hasGuidedToHonors, setHasGuidedToHonors] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  function onMouseDown(e: React.MouseEvent) {
    if (!timelineRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    timelineRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5;
  }
  function onMouseUp() { setIsDragging(false); }

  function easeInOutCubic(t: number) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollMainToHonors() {
    const honorsEl = honorsSectionRef.current;
    if (!honorsEl) return;
    const mainEl = honorsEl.closest('main');
    if (!(mainEl instanceof HTMLElement)) {
      honorsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    const mainRect = mainEl.getBoundingClientRect();
    const honorsRect = honorsEl.getBoundingClientRect();

    const start = mainEl.scrollTop;
    const target = Math.max(0, start + (honorsRect.top - mainRect.top) - 18);
    const distance = target - start;
    if (Math.abs(distance) < 2) return;

    const duration = 1050;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      mainEl.scrollTop = start + distance * eased;
      if (progress < 1) {
        scrollRafRef.current = requestAnimationFrame(step);
      } else {
        scrollRafRef.current = null;
      }
    };

    if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    scrollRafRef.current = requestAnimationFrame(step);
  }

  function handleExperienceSelect(exp: Experience) {
    setActiveExp(exp);

    if (exp.id !== 'minzu' || hasGuidedToHonors) return;
    setHasGuidedToHonors(true);
    guideTimerRef.current = setTimeout(() => {
      smoothScrollMainToHonors();
    }, 420);
  }

  useEffect(() => {
    return () => {
      if (guideTimerRef.current) clearTimeout(guideTimerRef.current);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12"
    >
      {/* 顶部标题 */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">Career Journey</h2>
        <p className="text-xs text-seed-shadow/40">教育与经历</p>
      </motion.div>

      {/* ══ 上半部：Master-Detail 主从分屏 ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 左侧导航（col-span-5） */}
        <motion.div variants={containerVariants} className="lg:col-span-5 flex flex-col gap-2.5">
          <motion.p variants={itemVariants} className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest px-1 mb-0.5">
            Internships · 核心实习
          </motion.p>
          {experiences.filter(e => e.type === 'internship').map(exp => (
            <ExperienceCard key={exp.id} exp={exp} isActive={activeExp.id === exp.id} onClick={() => handleExperienceSelect(exp)} />
          ))}

          <motion.p variants={itemVariants} className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest px-1 mt-2 mb-0.5">
            Education · 教育背景
          </motion.p>
          {experiences.filter(e => e.type === 'education').map(exp => (
            <ExperienceCard key={exp.id} exp={exp} isActive={activeExp.id === exp.id} onClick={() => handleExperienceSelect(exp)} />
          ))}
        </motion.div>

        {/* 右侧详情（col-span-7，sticky） */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 lg:sticky lg:top-8 lg:self-start"
          style={{ minHeight: '420px' }}
        >
          <DetailPanel exp={activeExp} />
        </motion.div>
      </div>

      {/* ══ 下半部：横向可拖拽滑动时间轴 ══ */}
      <motion.div ref={honorsSectionRef} variants={itemVariants} className="pt-4">
        <div className="flex items-center gap-3 mb-6">
          <p className="text-[10px] font-semibold text-seed-shadow/40 uppercase tracking-widest shrink-0">
            Honours &amp; Awards · 荣誉奖项
          </p>
          <div className="flex-1 h-px bg-seed-shadow/8" />
          <p className="text-[10px] text-seed-shadow/30 shrink-0 flex items-center gap-1">
            <span>←</span>
            <span>拖动滑动</span>
            <span>→</span>
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-milk-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-milk-white to-transparent z-10 pointer-events-none" />

          <div
            ref={timelineRef}
            className={`overflow-x-auto scrollbar-hide pb-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div className="relative" style={{ minWidth: 'max-content' }}>
              {/* 中间贯穿横线：绝对定位到上下区域的分界处（上方160px + 锚点高度约22px的一半 = 171px） */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '171px',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'rgba(63,46,47,0.13)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />
              <div className="flex items-start gap-4 px-8 py-2" style={{ alignItems: 'flex-start' }}>
                {honors.map((honor, i) => (
                  <TimelineNode key={i} honor={honor} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
