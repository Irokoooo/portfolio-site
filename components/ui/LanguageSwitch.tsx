'use client';

import { useLanguage } from '@/components/i18n/LanguageProvider';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageSwitchProps {
  compact?: boolean;
}

export function LanguageSwitch({ compact = false }: LanguageSwitchProps) {
  const { lang, setLang } = useLanguage();

  const isZh = lang === 'zh';

  if (compact) {
    return (
      <div className="relative inline-flex items-center rounded-full border border-seed-shadow/20 bg-milk-white/90 shadow-sm overflow-hidden"
           style={{ padding: '2px' }}>
        {/* Sliding pill indicator */}
        <motion.div
          className="absolute top-[2px] bottom-[2px] rounded-full bg-seed-shadow"
          initial={false}
          animate={{ left: isZh ? '2px' : '50%', width: '50%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
        <button
          onClick={() => setLang('zh')}
          className="relative z-10 px-2.5 py-0.5 text-[11px] font-medium rounded-full transition-colors duration-200"
          style={{ color: isZh ? '#F7F4EE' : '#3F2E2F99' }}
        >
          中
        </button>
        <button
          onClick={() => setLang('en')}
          className="relative z-10 px-2.5 py-0.5 text-[11px] font-medium rounded-full transition-colors duration-200"
          style={{ color: !isZh ? '#F7F4EE' : '#3F2E2F99' }}
        >
          EN
        </button>
      </div>
    );
  }

  return (
    <div
      className="relative inline-flex items-center rounded-full border border-seed-shadow/20 bg-milk-white/90 shadow-sm overflow-hidden"
      style={{ padding: '3px' }}
    >
      {/* Sliding pill indicator */}
      <motion.div
        className="absolute top-[3px] bottom-[3px] rounded-full bg-seed-shadow shadow-sm"
        initial={false}
        animate={{ left: isZh ? '3px' : '50%', width: 'calc(50% - 3px)' }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      />

      <button
        onClick={() => setLang('zh')}
        className="relative z-10 w-10 py-1 text-xs font-medium rounded-full transition-colors duration-200 select-none"
        style={{ color: isZh ? '#F7F4EE' : 'rgba(63,46,47,0.55)' }}
      >
        中文
      </button>
      <button
        onClick={() => setLang('en')}
        className="relative z-10 w-10 py-1 text-xs font-medium rounded-full transition-colors duration-200 select-none"
        style={{ color: !isZh ? '#F7F4EE' : 'rgba(63,46,47,0.55)' }}
      >
        EN
      </button>
    </div>
  );
}
