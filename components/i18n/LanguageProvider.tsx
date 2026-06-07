'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AppLanguage = 'zh' | 'en';

interface LanguageContextValue {
  lang: AppLanguage;
  setLang: (lang: AppLanguage) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'portfolio_lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AppLanguage>('zh');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'zh' || saved === 'en') {
        setLangState(saved);
      }
    } catch {
      // ignore storage read errors
    }
  }, []);

  const setLang = (next: AppLanguage) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage write errors
    }
  };

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  const value = useMemo(
    () => ({ lang, setLang, toggleLang }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
