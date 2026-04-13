'use client';

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AboutSection } from "@/components/sections/AboutSection";
import { InterestsSection } from "@/components/sections/InterestsSection";
import { SideWorksSection } from "@/components/sections/SideWorksSection";
import { NextDestSection } from "@/components/sections/NextDestSection";
import { AcademicResearchGallery } from "@/components/sections/gallery/AcademicResearchGallery";
import { BusinessAnalysisGallery } from "@/components/sections/gallery/BusinessAnalysisGallery";
import { AIPracticeGallery } from "@/components/sections/gallery/AIPracticeGallery";
import { SlidesGallery } from "@/components/sections/gallery/SlidesGallery";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileCareerSection } from "./MobileCareerSection";

type MobileTabKey = "about" | "career" | "projects" | "interests" | "works" | "next";
type MobileSubTabKey = "vibe" | "slides" | "business";

interface MobileTabItem {
  key: MobileTabKey;
  label: string;
  icon: string;
  hasSubTabs?: boolean;
}

interface MobileSubTabItem {
  key: MobileSubTabKey;
  label: string;
}

const tabs: MobileTabItem[] = [
  { key: "about", label: "我", icon: "👤" },
  { key: "career", label: "经历", icon: "🎓" },
  { key: "projects", label: "作品", icon: "📚" },
  { key: "works", label: "创作", icon: "✨", hasSubTabs: true },
  { key: "interests", label: "兴趣", icon: "💭" },
  { key: "next", label: "规划", icon: "✈️" },
];

const subTabs: MobileSubTabItem[] = [
  { key: "vibe", label: "Vibe" },
  { key: "slides", label: "Slides" },
  { key: "business", label: "Analysis" },
];

const ENABLE_BUSINESS_ANALYSIS = false;
const visibleSubTabs = ENABLE_BUSINESS_ANALYSIS
  ? subTabs
  : subTabs.filter((tab) => tab.key !== "business");

function renderMainContent(tab: MobileTabKey): React.ReactNode {
  switch (tab) {
    case "about":
      return <AboutSection />;
    case "career":
      return <MobileCareerSection />;
    case "projects":
      return <AcademicResearchGallery />;
    case "works":
      return <SideWorksSection />;
    case "interests":
      return <InterestsSection />;
    case "next":
      return <NextDestSection />;
  }
}

function renderSubContent(tab: MobileSubTabKey): React.ReactNode {
  switch (tab) {
    case "vibe":
      return <AIPracticeGallery />;
    case "slides":
      return <SlidesGallery />;
    case "business":
      return <BusinessAnalysisGallery />;
  }
}

export function MobileHomePage() {
  const [activeTab, setActiveTab] = useState<MobileTabKey>("about");
  const [activeSubTab, setActiveSubTab] = useState<MobileSubTabKey>("vibe");

  const showSubTabs = activeTab === "works";

  const content = useMemo(() => {
    if (showSubTabs) return renderSubContent(activeSubTab);
    return renderMainContent(activeTab);
  }, [activeTab, activeSubTab, showSubTabs]);

  const contentKey = showSubTabs ? `works-${activeSubTab}` : activeTab;

  return (
    <div className="min-h-screen bg-milk-white text-seed-shadow pb-20">
      <header className="sticky top-0 z-20 border-b border-seed-shadow/10 bg-milk-white/95 backdrop-blur">
        <div className="px-4 pt-4 pb-4">
          <h1 className="text-2xl font-serif leading-tight">史心怡</h1>
          <p className="text-xs text-seed-shadow/50 mt-1">Xinyi Shi / Seraphina</p>
        </div>
      </header>

      {showSubTabs && (
        <div className="sticky top-14 z-19 border-b border-seed-shadow/10 bg-milk-white/90 px-4 py-3 overflow-x-auto scrollbar-hide">
          <nav className="flex gap-2 min-w-max">
            {visibleSubTabs.map((subTab) => {
              const isActive = activeSubTab === subTab.key;
              return (
                <button
                  key={subTab.key}
                  onClick={() => setActiveSubTab(subTab.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                    isActive ? "bg-seed-shadow text-milk-white" : "bg-cream-pour text-seed-shadow/70"
                  }`}
                >
                  {subTab.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      <main className="px-4 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={contentKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>

      <MobileBottomNav 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={(key) => setActiveTab(key as MobileTabKey)} 
      />
    </div>
  );
}
