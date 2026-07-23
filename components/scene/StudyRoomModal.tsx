'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { OverlayProvider } from '@/lib/useOverlayStore';
import { ContentPortal } from '@/components/overlay/ContentPortal';
import { LanguageProvider } from '@/components/i18n/LanguageProvider';

const StudyRoomCanvas = dynamic(
  () => import('@/components/scene/StudyRoomCanvas').then(m => ({ default: m.StudyRoomCanvas })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a0f06]">
        <div className="text-[#c8a96e] text-sm tracking-[0.25em] opacity-60 animate-pulse">Loading Room...</div>
      </div>
    ),
  }
);

interface StudyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudyRoomModal({ isOpen, onClose }: StudyRoomModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200]"
          style={{ backgroundColor: '#1a0f06' }}
        >
          <LanguageProvider>
            <OverlayProvider>
              <StudyRoomCanvas />
              <ContentPortal />
            </OverlayProvider>
          </LanguageProvider>

          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onClose}
            className="fixed top-5 left-6 z-[210] flex items-center gap-2 px-4 py-2 text-sm text-[#c8a96e]/70 hover:text-[#c8a96e] border border-[#c8a96e]/20 rounded-full transition-all duration-150 backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(26,15,6,0.85)' }}
          >
            <span>←</span>
            <span>返回 / Back</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
