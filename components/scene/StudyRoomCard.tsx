'use client';
// 数字书房卡片：原地展开交互
// - 折叠态：与其他 Bento 卡片一致的入口卡片
// - 展开态：卡片内部长高，内嵌 3D 书房 Canvas，可再次点击收起
// - Hover 时预热 3D 场景 chunk + 模型请求，降低展开时的等待感
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { OverlayProvider } from '@/lib/useOverlayStore';
import { ContentPortal } from '@/components/overlay/ContentPortal';
import { useLanguage } from '@/components/i18n/LanguageProvider';

const StudyRoomCanvas = dynamic(
  () => import('@/components/scene/StudyRoomCanvas').then(m => ({ default: m.StudyRoomCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a0f06]">
        <div className="text-[#c8a96e] text-sm tracking-[0.25em] opacity-60 animate-pulse">
          Loading Room...
        </div>
      </div>
    ),
  }
);

export function StudyRoomCard() {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const preloadedRef = useRef(false);

  // hover / focus 时提前拉起 3D 场景的 JS chunk 与模型请求，
  // 真正点击展开时大概率已经在缓存里，体感更快
  function warmUp() {
    if (preloadedRef.current) return;
    preloadedRef.current = true;
    import('@/components/scene/StudyRoomCanvas');
  }

  return (
    <motion.div
      layout
      onMouseEnter={warmUp}
      onFocus={warmUp}
      className="col-span-2 rounded-lg overflow-hidden"
      style={{ backgroundColor: '#1a1209', border: '1px solid rgba(200,169,110,0.15)' }}
      transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* 头部：始终可见，点击切换展开/收起 */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ backgroundColor: 'rgba(200,169,110,0.03)' }}
        className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <div>
          <p
            className="text-[9px] font-medium tracking-[0.25em] uppercase mb-1.5"
            style={{ color: 'rgba(200,169,110,0.5)' }}
          >
            Interactive · 3D Study Room
          </p>
          <p className="text-sm font-serif" style={{ color: '#c8a96e' }}>
            {lang === 'zh' ? '探索我的数字书房' : 'Explore My Digital Study'}
          </p>
          <p className="text-[11px] mt-1" style={{ color: 'rgba(200,169,110,0.45)' }}>
            {isOpen
              ? (lang === 'zh' ? '点击收起' : 'Click to collapse')
              : (lang === 'zh' ? '点击物品互动 · 发现隐藏内容' : 'Click objects to interact · Discover hidden content')}
          </p>
        </div>
        <motion.div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border"
          style={{ borderColor: 'rgba(200,169,110,0.2)', backgroundColor: 'rgba(200,169,110,0.06)' }}
          animate={{ rotate: isOpen ? 90 : 0, x: isOpen ? 0 : [0, 4, 0] }}
          transition={
            isOpen
              ? { duration: 0.3, ease: 'easeOut' }
              : { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <span style={{ color: '#c8a96e', fontSize: '16px' }}>→</span>
        </motion.div>
      </motion.button>

      {/* 底部进度条装饰（仅折叠态显示） */}
      {!isOpen && (
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.25), transparent)' }}
        />
      )}

      {/* 展开区域：内嵌 3D 场景 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="room-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 560, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative border-t"
            style={{ borderColor: 'rgba(200,169,110,0.12)' }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <OverlayProvider>
                <StudyRoomCanvas />
                <ContentPortal />
              </OverlayProvider>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors"
              style={{
                color: 'rgba(200,169,110,0.8)',
                borderColor: 'rgba(200,169,110,0.25)',
                backgroundColor: 'rgba(26,15,6,0.85)',
              }}
            >
              <span>×</span>
              <span>{lang === 'zh' ? '收起' : 'Collapse'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
