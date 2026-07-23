'use client';
// 说明：不再 portal 到 document.body。
// 数字书房现在内嵌在 About 页的卡片里展开（见 StudyRoomCard），
// 用 absolute 定位挂在卡片自身的 relative 容器上，
// 这样点击物件弹出的内容只会盖住卡片区域，不会盖住整个页面。
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOverlayStore } from '@/lib/useOverlayStore';
import { OverlayRouter } from './OverlayRouter';

export function ContentPortal() {
  const { activeOverlay, closeOverlay } = useOverlayStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeOverlay]);

  return (
    <AnimatePresence>
      {activeOverlay && (
        <motion.div
          key="overlay"
          className="absolute inset-0 z-50 bg-[#f3ead8]/96 backdrop-blur-md overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <button
            onClick={closeOverlay}
            aria-label="返回书房"
            className="absolute top-4 right-4 z-[60] flex items-center gap-1.5 px-4 py-2 text-sm text-seed-shadow/70 hover:text-seed-shadow bg-cream-pour/80 hover:bg-cream-pour border border-seed-shadow/10 rounded-full transition-all duration-150 backdrop-blur-sm shadow-sm"
          >
            <span className="text-base leading-none">←</span>
            <span>返回书房</span>
          </button>
          <OverlayRouter activeKey={activeOverlay} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
