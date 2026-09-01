'use client';
// 主页面：双栏架构（固定侧边栏 + 动态内容区）
// 侧边栏支持 Drill-down Navigation：点击 Side Works 后平移切换为二级菜单
// 全局光标：CSS SVG 内联光标（无 JS 延迟，原生流畅）
// 动态水印：<Watermark> 组件根据当前页面传入不同文字
// Emoji 已全部清除，替换为 public/assets/icons/ 下的 SVG 图标
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { AboutSection } from "@/components/sections/AboutSection";
import { InterestsSection } from "@/components/sections/InterestsSection";
import { CareerSection } from "@/components/sections/CareerSection";
import { SideWorksSection } from "@/components/sections/SideWorksSection";
import { NextDestSection } from "@/components/sections/NextDestSection";
import { BusinessAnalysisGallery } from "@/components/sections/gallery/BusinessAnalysisGallery";
import { AcademicResearchGallery } from "@/components/sections/gallery/AcademicResearchGallery";
import { SlidesGallery } from "@/components/sections/gallery/SlidesGallery";
import { AIPracticeGallery } from "@/components/sections/gallery/AIPracticeGallery";
import { GalaxyAbilitiesSection } from "@/components/sections/gallery/GalaxyAbilitiesSection";
import { MobileHomePage } from "@/components/mobile/MobileHomePage";
import { LanguageProvider, useLanguage } from "@/components/i18n/LanguageProvider";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

// ───────────────────────────────────────────────
// 类型定义
// ───────────────────────────────────────────────

/** 一级导航 key */
type NavKey = "about" | "interests" | "career" | "projects" | "sideworks" | "nextdest" | "galaxy";

/** 二级子菜单 key（Side Works + Galaxy 共用一套联合类型） */
type SubNavKey = "business" | "vibe" | "slides" | "abilities" | "growth";

interface NavItem {
  key: NavKey;
  /** 导航图标：public/assets/icons/ 下的 SVG 路径，替代原 emoji */
  icon: string;
  label: string;
  sublabel: string;
  hasDrilldown?: boolean;
  /** 每个板块对应的水印文字（大字号底层装饰）
   *  如需修改各板块水印，在此处更改对应的 watermark 字段即可 */
  watermark: string;
}

interface SubNavItem {
  key: SubNavKey;
  /** 导航图标：public/assets/icons/ 下的 SVG 路径 */
  icon: string;
  label: string;
  sublabel: string;
  watermark: string;
}

type SidebarTagId = "atyp-biz-student" | "idea-lander" | "vibe-coder" | "french-learning";

interface SidebarTag {
  id: SidebarTagId;
  label: { zh: string; en: string };
}

// ───────────────────────────────────────────────
// 导航配置（含水印文字）
// Emoji 全部替换为本地 SVG 图标
// ───────────────────────────────────────────────

const navItems: NavItem[] = [
  { key: "about",     icon: "/assets/icons/about.svg",             label: "About me",           sublabel: "关于我",     watermark: "XY",      hasDrilldown: false },
  { key: "career",    icon: "/assets/icons/career.svg",            label: "Career journey",     sublabel: "教育与经历", watermark: "JOURNEY" },
  { key: "sideworks", icon: "/assets/icons/sideworks.svg",         label: "Side works",         sublabel: "作品集",     watermark: "CRAFT",   hasDrilldown: true },
  { key: "projects",  icon: "/assets/icons/project-highlights.svg", label: "Academic & Practice", sublabel: "学术与实践", watermark: "RESEARCH" },
  { key: "interests", icon: "/assets/icons/interests.svg",         label: "My interests",       sublabel: "兴趣领域",   watermark: "IDEAS" },
  { key: "galaxy",    icon: "/assets/icons/galaxy.svg",            label: "Galaxy",             sublabel: "能力星系",   watermark: "GALAXY",  hasDrilldown: true },
  { key: "nextdest",  icon: "/assets/icons/destination.svg",       label: "Next destination",   sublabel: "申请规划",   watermark: "NEXT" },
];

// ── 水印文字配置说明 ──
// 如需修改某个板块的底层水印文字，直接修改上方 navItems 中对应条目的 watermark 字段
// 二级菜单水印在 subNavItems 中修改
// ── 二级抽屉注册表 ──
// 每个可 drill-down 的一级导航项，映射到它的子菜单配置。
// 新增一个二级抽屉：在此加一条即可，无需改动导航渲染逻辑。
interface DrilldownConfig {
  /** 抽屉顶部标题 */
  title: string;
  /** 抽屉顶部小图标 */
  icon: string;
  /** 子菜单项 */
  items: SubNavItem[];
  /** 默认进入的子项 */
  defaultTab: SubNavKey;
}

const drilldowns: Partial<Record<NavKey, DrilldownConfig>> = {
  sideworks: {
    title: "Side Works",
    icon: "/assets/icons/sideworks.svg",
    defaultTab: "vibe",
    items: [
      { key: "vibe",     icon: "/assets/icons/about.svg",     label: "Vibe Coding",       sublabel: "Vibe Coding 作品", watermark: "VIBE" },
      { key: "slides",   icon: "/assets/icons/interests.svg", label: "Slides",            sublabel: "路演作品", watermark: "SLIDES" },
      { key: "business", icon: "/assets/icons/career.svg",    label: "Work Systems", sublabel: "工作系统", watermark: "SYSTEMS" },
    ],
  },
  galaxy: {
    title: "Galaxy",
    icon: "/assets/icons/galaxy.svg",
    defaultTab: "abilities",
    items: [
      { key: "abilities", icon: "/assets/icons/galaxy.svg",     label: "Ability Constellation", sublabel: "能力星座", watermark: "STARS" },
      { key: "growth",    icon: "/assets/icons/interests.svg",  label: "Growth Galaxy",         sublabel: "成长星河 · 即将上线", watermark: "GROWTH" },
    ],
  },
};

// 商业分析板块开关：false 为隐藏入口（保留文件与组件，后续可直接恢复）
const ENABLE_BUSINESS_ANALYSIS = true;

// 按开关过滤某个抽屉的可见子项
function getVisibleSubItems(parent: NavKey | null): SubNavItem[] {
  if (!parent) return [];
  const cfg = drilldowns[parent];
  if (!cfg) return [];
  if (parent === "sideworks" && !ENABLE_BUSINESS_ANALYSIS) {
    return cfg.items.filter((item) => item.key !== "business");
  }
  return cfg.items;
}

const sidebarTags: { id: SidebarTagId; label: { zh: string; en: string } }[] = [
  { id: "atyp-biz-student", label: { zh: "非典型商科生", en: "Atypical Biz Student" } },
  { id: "idea-lander", label: { zh: "脑洞落地机", en: "Idea Executor" } },
  { id: "vibe-coder", label: { zh: "Vibe Coding驯服中", en: "Learning Vibe Coding" } },
  { id: "french-learning", label: { zh: "FR学习施法中...", en: "Learning French..." } },
];

// ───────────────────────────────────────────────
// 动态水印组件
// text: 传入该板块对应的大字水印文字（如 "XY", "JOURNEY"）
// 绝对定位于右侧 <main> 底部，pointer-events-none，不影响交互
// ── 如需修改水印外观（字号、透明度、位置），修改此组件 ──
// ───────────────────────────────────────────────

interface WatermarkProps {
  text: string;
}

// vine-right 视差装饰组件（随内容区滚动轻微上移）
function VineParallax({ mainRef }: { mainRef: React.RefObject<HTMLElement | null> }) {
  const { scrollY } = useScroll({ container: mainRef as React.RefObject<HTMLElement> });
  const y = useTransform(scrollY, [0, 800], [0, -40]);
  return (
    <motion.img
      src="/assets/decorations/vine-right.png"
      alt=""
      aria-hidden="true"
      style={{ y }}
      className="absolute top-0 right-0 w-32 opacity-[0.07] pointer-events-none select-none z-0"
    />
  );
}

function Watermark({ text }: WatermarkProps) {
  return (
    <div
      className="absolute bottom-8 right-6 pointer-events-none select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      {/* 关键：opacity 的目标值必须放在 animate 里，不能放在 style 里
          否则 framer-motion 会用 animate={{ opacity: 1 }} 覆盖 style 中的 0.018 */}
      <motion.p
        key={text}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.018 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          fontFamily: '"Palatino Linotype", "Book Antiqua", Palatino, "Times New Roman", Georgia, serif',
          fontSize: 'clamp(5rem, 10vw, 9rem)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: '#3F2E2F',
          letterSpacing: '0.06em',
          lineHeight: 1,
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </motion.p>
    </div>
  );
}

// ───────────────────────────────────────────────
// 导航图标辅助组件
// 统一渲染 SVG 图标，带蚀刻线稿风格滤镜（深棕色调）
// ───────────────────────────────────────────────

interface NavIconProps {
  src: string;
  isActive?: boolean;
}

function NavIcon({ src, isActive }: NavIconProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="w-5 h-5 shrink-0 object-contain transition-opacity duration-150"
      style={{
        opacity: isActive ? 1 : 0.6,
      }}
    />
  );
}

function TagBadge({ tag, lang }: { tag: { id: SidebarTagId; label: { zh: string; en: string } }; lang: 'zh' | 'en' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [glitter, setGlitter] = useState({ x: 50, y: 50, opacity: 0 });
  const glitterTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const baseClass = "relative min-h-7 px-1.5 py-1 text-[9px] leading-none tracking-tight whitespace-nowrap text-center flex items-center justify-center bg-cream-pour border border-seed-shadow/15 rounded shadow-sm overflow-hidden";

  const handleFrenchMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (tag.id !== "french-learning") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (glitterTimeoutRef.current) clearTimeout(glitterTimeoutRef.current);
    setGlitter({ x, y, opacity: 0.55 });
    glitterTimeoutRef.current = setTimeout(() => {
      setGlitter((prev) => ({ ...prev, opacity: 0.2 }));
    }, 220);
  };

  const displayLabel = tag.label[lang];

  if (tag.id === "atyp-biz-student") {
    return (
      <motion.span
        whileHover={{
          scale: [0.98, 1.02],
          rotate: [-0.5, 0.5, -0.5, 0.5, 0],
        }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`${baseClass} text-seed-shadow/70`}
      >
        {displayLabel}
      </motion.span>
    );
  }

  if (tag.id === "idea-lander") {
    return (
      <motion.span
        whileHover={{
          scaleY: 0.95,
          y: 1,
          boxShadow: "inset 0 0 0 1px rgba(63,46,47,0.10), inset 0 -7px 11px rgba(63,46,47,0.12), 0 1px 2px rgba(63,46,47,0.10)",
        }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className={`${baseClass} text-seed-shadow/70`}
      >
        {displayLabel}
      </motion.span>
    );
  }

  if (tag.id === "vibe-coder") {
    return (
      <motion.span
        whileHover={{
          scale: [1, 1.03, 1],
          borderRadius: ["4px", "8px", "4px"],
        }}
        transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
        className={`${baseClass} text-seed-shadow/70`}
      >
        {displayLabel}
      </motion.span>
    );
  }

  return (
    <motion.span
      onHoverStart={() => {
        setIsHovered(true);
        setGlitter((prev) => ({ ...prev, opacity: 0.45 }));
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        setGlitter((prev) => ({ ...prev, opacity: 0 }));
      }}
      onMouseMove={handleFrenchMouseMove}
      className={`${baseClass}`}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.span
        animate={{ color: isHovered ? "#D4AF37" : "rgba(63,46,47,0.70)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="relative z-20"
      >
        {displayLabel}
      </motion.span>

      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-10"
        animate={{ opacity: isHovered ? glitter.opacity : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          background: `radial-gradient(24px circle at ${glitter.x}% ${glitter.y}%, rgba(212,175,55,0.38), rgba(212,175,55,0) 70%), radial-gradient(14px circle at calc(${glitter.x}% + 12px) calc(${glitter.y}% - 8px), rgba(255,240,180,0.45), rgba(255,240,180,0) 65%)`,
        }}
      />
    </motion.span>
  );
}

// ───────────────────────────────────────────────
// 动画变量配置
// ───────────────────────────────────────────────

const primaryMenuVariants = {
  enter: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

const subMenuVariants = {
  enter: { x: 0, opacity: 1 },
  exit: { x: 40, opacity: 0 },
};

const menuTransition = { duration: 0.22, ease: "easeOut" as const };

// ───────────────────────────────────────────────
// 内容组件映射
// ───────────────────────────────────────────────

const sectionMap: Record<NavKey, React.ReactNode> = {
  about: <AboutSection />,
  career: <CareerSection />,
  interests: <InterestsSection />,
  projects: <AcademicResearchGallery />,
  sideworks: <SideWorksSection />,
  nextdest: <NextDestSection />,
  // galaxy 为纯 drill-down 项，正常不经 sectionMap 渲染；此处提供兜底
  galaxy: <GalaxyAbilitiesSection />,
};

// 成长星河占位组件（第二板块，视觉原型阶段仅占位）
function GrowthGalaxyPlaceholder() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">Growth Galaxy</h2>
        <p className="text-xs text-seed-shadow/40">成长星河 · 碎碎念与近期事件</p>
      </div>
      <div
        className="rounded-2xl border border-seed-shadow/15 shadow-lg flex items-center justify-center"
        style={{
          height: "min(60vh, 520px)",
          background:
            "radial-gradient(120% 90% at 50% 20%, #241a35 0%, #16112a 45%, #0c0a1c 80%, #070510 100%)",
        }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
          🌌 按时间生长的成长星河即将上线 · Coming soon
        </p>
      </div>
    </div>
  );
}

function renderSubSection(key: SubNavKey): React.ReactNode {
  switch (key) {
    case "business":  return <BusinessAnalysisGallery />;
    case "vibe":      return <AIPracticeGallery />;
    case "slides":    return <SlidesGallery />;
    case "abilities": return <GalaxyAbilitiesSection />;
    case "growth":    return <GrowthGalaxyPlaceholder />;
  }
}

// ───────────────────────────────────────────────
// 侧边栏底部：版权文字 ⇄ 悬浮切换花体签名
// 两层叠在同一格子里做交叉淡入，节省纵向空间（免滚动）
// ───────────────────────────────────────────────
function SignatureFooter({
  signatureSrc,
  onSignatureError,
}: {
  signatureSrc: string;
  onSignatureError: (src: string) => void;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative select-none"
      style={{ height: 40 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* 版权文字层 */}
      <div
        className="absolute inset-0 flex flex-col justify-center transition-opacity duration-500"
        style={{ opacity: hover ? 0 : 1 }}
      >
        <p className="text-xs text-seed-shadow/25 leading-tight">Built with Vibe Coding</p>
        <p className="text-xs text-seed-shadow/25 mt-0.5 leading-tight">© 2026 Xinyi Shi</p>
      </div>
      {/* 花体签名层 */}
      <img
        src={signatureSrc}
        alt="Seraphina signature"
        aria-hidden="true"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-44 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hover ? 0.82 : 0,
          mixBlendMode: "multiply",
          filter: "contrast(1.08) saturate(0.78)",
        }}
        onError={() => {
          if (signatureSrc !== "/assets/decorations/signature.jpg") {
            onSignatureError("/assets/decorations/signature.jpg");
          }
        }}
      />
    </div>
  );
}

// ───────────────────────────────────────────────
// 主页面组件
// ───────────────────────────────────────────────

function HomePageContent() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<NavKey>("about");
  // 当前打开的二级抽屉对应的一级 key（null = 未打开任何抽屉）
  const [drillParent, setDrillParent] = useState<NavKey | null>(null);
  const [subActiveTab, setSubActiveTab] = useState<SubNavKey>("vibe");
  const [signatureSrc, setSignatureSrc] = useState("/assets/decorations/signature.png");
  // 右侧内容区 ref，用于切换页面时滚动回顶部
  const mainRef = useRef<HTMLElement>(null);

  function scrollToTop() {
    const el = mainRef.current;
    if (!el) return;
    // 先临时禁用 smooth，确保瞬间回顶（绕过 CSS scroll-behavior）
    el.style.scrollBehavior = 'auto';
    el.scrollTop = 0;
    // 恢复默认（此处不需要 smooth，保持 auto 即可）
  }

  const isSubMenuOpen = drillParent !== null;
  const visibleSubNavItems = getVisibleSubItems(drillParent);

  function handlePrimaryNav(key: NavKey, hasDrilldown?: boolean) {
    scrollToTop();
    if (hasDrilldown) {
      const cfg = drilldowns[key];
      setDrillParent(key);
      setSubActiveTab(cfg?.defaultTab ?? "vibe");
    } else {
      setDrillParent(null);
      setActiveTab(key);
    }
  }

  function handleSubNav(key: SubNavKey) {
    scrollToTop();
    setSubActiveTab(key);
  }

  function handleBack() {
    scrollToTop();
    // 返回主菜单，并把当前一级高亮落回抽屉所属的父项
    const parent = drillParent;
    setDrillParent(null);
    if (parent) setActiveTab(parent);
  }

  const currentContent = isSubMenuOpen
    ? renderSubSection(subActiveTab)
    : sectionMap[activeTab];

  const contentKey = isSubMenuOpen ? `sub-${subActiveTab}` : `main-${activeTab}`;

  // 每次 contentKey 变化（页面切换完成后）强制滚回顶部
  // 三重保险：
  // 1. handlePrimaryNav 里立刻滚一次（切换前）
  // 2. useEffect 在新内容 key 挂载后立刻同步重置 scrollTop
  // 3. setTimeout 兜底（等 Framer Motion exit 动画结束后再滚一次）
  useEffect(() => {
    scrollToTop();
    const tid = setTimeout(scrollToTop, 400); // 兜底：等 Framer Motion exit 动画(0.3s)结束
    return () => clearTimeout(tid);
  }, [contentKey]);

  useEffect(() => {
    if (!ENABLE_BUSINESS_ANALYSIS && subActiveTab === "business") {
      setSubActiveTab("vibe");
    }
  }, [subActiveTab]);

  // 当前抽屉配置（用于抽屉标题/图标）
  const currentDrilldown = drillParent ? drilldowns[drillParent] : undefined;

  // 当前水印文字：根据激活状态选取
  const currentWatermark = isSubMenuOpen
    ? (visibleSubNavItems.find(i => i.key === subActiveTab)?.watermark ?? "WORKS")
    : (navItems.find(i => i.key === activeTab)?.watermark ?? "XY");

  return (
    <>
      <div className="md:hidden min-h-screen">
        <MobileHomePage />
      </div>

      <div className="hidden md:flex h-screen bg-transparent overflow-hidden">
      {/* ===== 左侧固定侧边栏 ===== */}
      {/* Galaxy drilldown 激活时变强毛玻璃(沉浸式全屏银河背景) */}
      <aside className={`w-64 shrink-0 border-r h-screen overflow-hidden sticky top-0 transition-all duration-500 ${
        drillParent === 'galaxy'
          ? 'bg-milk-white/30 backdrop-blur-xl border-seed-shadow/5'
          : 'bg-milk-white/70 backdrop-blur-sm border-seed-shadow/10'
      }`}>
        {/* 金箔纹理叠加层：绝对定位覆盖整个侧边栏，multiply 混合模式 */}
        <img
          src="/assets/decorations/gold-foil.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
          style={{ opacity: 0.055, mixBlendMode: 'multiply' }}
        />
        <div className="h-full flex flex-col relative z-10">
          {/* 顶部藤蔓装饰：public/assets/decorations/vine-left.png */}
          <div className="relative shrink-0 overflow-hidden">
            <img
              src="/assets/decorations/vine-left.png"
              alt=""
              className="absolute top-0 right-0 w-20 opacity-10 pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>

          {/* Profile 卡片（固定在顶部） */}
          <div className="px-6 pt-5 pb-3 space-y-2.5 shrink-0">
            <div className="space-y-0.5">
              <h1 className="text-2xl font-serif leading-tight shimmer-name">史心怡</h1>
              <p className="text-sm text-seed-shadow/50 mt-0.5">Xinyi Shi / Seraphina</p>
            </div>

            <LanguageSwitch />

            <div className="grid grid-cols-2 gap-1.5">
              {sidebarTags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} lang={lang} />
              ))}
            </div>

            {/* 地点：lucide MapPin 内联 SVG 替代 Emoji */}
            <p className="text-xs text-seed-shadow/40 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12" height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 opacity-70"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>北京 / 深圳 / 香港</span>
            </p>
          </div>

          <div className="border-t border-seed-shadow/10 mx-6 shrink-0" />

          {/* 导航区域（Drill-down） */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait" initial={false}>
              {!isSubMenuOpen ? (
                <motion.nav
                  key="primary-menu"
                  initial={{ x: -40, opacity: 0 }}
                  animate={primaryMenuVariants.enter}
                  exit={primaryMenuVariants.exit}
                  transition={menuTransition}
                  className="absolute inset-0 px-6 pt-3 space-y-0.5 overflow-y-auto scrollbar-hide"
                >
                  {navItems.map((item) => {
                    const isActive =
                      (!isSubMenuOpen && activeTab === item.key) ||
                      (isSubMenuOpen && drillParent === item.key);
                    return (
                      <motion.button
                        key={item.key}
                        onClick={() => handlePrimaryNav(item.key, item.hasDrilldown)}
                        whileTap={{ scale: 0.96 }}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 group ${
                          isActive
                            ? "bg-cream-pour text-seed-shadow"
                            : "text-seed-shadow/50 hover:bg-cream-pour/60 hover:text-seed-shadow"
                        }`}
                      >
                        {/* SVG 导航图标：w-5 h-5，不拉伸，蚀刻深棕风格 */}
                        <NavIcon src={item.icon} isActive={isActive} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-tight ${isActive ? "font-medium" : ""}`}>
                            {item.label}
                          </p>
                          <p className="text-xs text-seed-shadow/40 mt-0.5">{item.sublabel}</p>
                        </div>
                        {item.hasDrilldown && (
                          <span className="text-seed-shadow/25 text-xs shrink-0">›</span>
                        )}
                      </motion.button>
                    );
                  })}
                </motion.nav>
              ) : (
                <motion.nav
                  key="sub-menu"
                  initial={{ x: 40, opacity: 0 }}
                  animate={subMenuVariants.enter}
                  exit={subMenuVariants.exit}
                  transition={menuTransition}
                  className="absolute inset-0 px-6 pt-4 flex flex-col overflow-y-auto"
                >
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-3 py-2.5 mb-3 text-left text-seed-shadow/50 hover:text-seed-shadow hover:bg-cream-pour/60 rounded transition-all duration-150 group w-full"
                  >
                    <span className="text-sm text-seed-shadow/30 group-hover:text-seed-shadow/60">&#8249;</span>
                    <div>
                      <p className="text-sm font-medium text-seed-shadow/70 group-hover:text-seed-shadow">Back</p>
                      <p className="text-xs text-seed-shadow/40">返回主菜单</p>
                    </div>
                  </button>

                  {/* 二级标题：根据当前抽屉动态显示 */}
                  <div className="px-3 mb-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={currentDrilldown?.icon ?? "/assets/icons/sideworks.svg"}
                        alt=""
                        aria-hidden="true"
                        className="w-4 h-4 object-contain opacity-60"
                      />
                      <p className="text-xs font-medium text-seed-shadow/30 uppercase tracking-widest">
                        {currentDrilldown?.title ?? "Side Works"}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-seed-shadow/10 mb-3" />

                  <div className="space-y-0.5">
                    {visibleSubNavItems.map((item) => {
                      const isActive = subActiveTab === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => handleSubNav(item.key)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-left transition-all duration-150 group ${
                            isActive
                              ? "bg-cream-pour text-seed-shadow"
                              : "text-seed-shadow/50 hover:bg-cream-pour/60 hover:text-seed-shadow"
                          }`}
                        >
                          {/* SVG 子导航图标 */}
                          <NavIcon src={item.icon} isActive={isActive} />
                          <div>
                            <p className={`text-sm leading-tight ${isActive ? "font-medium" : ""}`}>
                              {item.label}
                            </p>
                            <p className="text-xs text-seed-shadow/40 mt-0.5">{item.sublabel}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          {/* 底部：版权文字 ⇄ 悬浮切换为花体签名（省去独立签名块，侧边栏免滚动） */}
          <div className="px-6 py-4 border-t border-seed-shadow/10 shrink-0">
            <SignatureFooter signatureSrc={signatureSrc} onSignatureError={setSignatureSrc} />
          </div>
        </div>
      </aside>

      {/* ===== 右侧动态内容区 ===== */}
      {/* relative 定位是 <Watermark> 绝对定位的锚点 */}
      {/* Galaxy 二级页面时全屏无边距(沉浸式银河);其他页面保持白色卡片边距 */}
      <main ref={mainRef} className={`flex-1 h-screen overflow-y-auto relative ${drillParent === 'galaxy' ? 'bg-[#050209]' : 'bg-transparent'}`}>
        {/* vine-right 视差装饰：随滚动轻微上移 */}
        <VineParallax mainRef={mainRef} />
        {/* 动态水印：随页面切换淡入切换文字 */}
        {/* 如需修改各页面水印文字，在上方 navItems / subNavItems 的 watermark 字段修改 */}
        <AnimatePresence mode="wait">
          <Watermark key={currentWatermark} text={currentWatermark} />
        </AnimatePresence>

        {/* Galaxy 沉浸式全屏：直接渲染 fixed 层，跳过 padding 容器 */}
        {drillParent === 'galaxy' && subActiveTab === 'abilities' ? (
          <GalaxyAbilitiesSection />
        ) : (
          <div className={`w-full relative z-10 ${drillParent === 'galaxy' ? '' : 'px-8 py-10'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={contentKey}
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {currentContent}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>
      </div>
    </>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomePageContent />
    </LanguageProvider>
  );
}
