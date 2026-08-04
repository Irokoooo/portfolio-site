'use client';
import dynamic from 'next/dynamic';
import { LanguageProvider } from '@/components/i18n/LanguageProvider';
import { AboutSection } from '@/components/sections/AboutSection';
import { NextDestSection } from '@/components/sections/NextDestSection';
import { AcademicResearchGallery } from '@/components/sections/gallery/AcademicResearchGallery';
import type { OverlayKey } from '@/lib/useOverlayStore';

// Lazy-load the full portfolio to avoid bundling it with the 3D scene
const PortfolioPage = dynamic(() => import('@/app/portfolio/page'), { ssr: false });

interface Props {
  activeKey: OverlayKey;
}

export function OverlayRouter({ activeKey }: Props) {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        {activeKey === 'laptop'     && <PortfolioPage />}
        {activeKey === 'bookshelf'  && <ReadingNotes />}
        {activeKey === 'photoframe' && <PaddedSection><AboutSection /></PaddedSection>}
        {activeKey === 'wallmap'    && <PaddedSection><NextDestSection /></PaddedSection>}
        {activeKey === 'folder'     && <PaddedSection><AcademicResearchGallery /></PaddedSection>}
        {activeKey === 'globe'      && <PaddedSection><NextDestSection /></PaddedSection>}
      </div>
    </LanguageProvider>
  );
}

function PaddedSection({ children }: { children: React.ReactNode }) {
  return <div className="px-8 py-16 max-w-5xl mx-auto">{children}</div>;
}

function ReadingNotes() {
  return (
    <div className="px-8 py-16 max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif text-seed-shadow mb-2">Reading Notes</h2>
      <p className="text-seed-shadow/50 mb-8 text-sm">读书笔记 — 持续更新中</p>
      <div className="text-center py-20 text-seed-shadow/30 border border-seed-shadow/10 rounded-lg">
        <p className="text-4xl mb-3">📚</p>
        <p className="text-sm">内容整理中，敬请期待</p>
      </div>
    </div>
  );
}
