'use client';
// ─────────────────────────────────────────────
// 能力星座 · 沉浸式全屏银河（侧边栏变毛玻璃，右侧整屏银河）
// 银河引擎在 AbilityGalaxy3D（dynamic ssr:false 加载，避免 SSR 触碰 WebGL）。
// 本组件负责：全屏容器、分类图例（右下角浮动）、点击详情从底部浮起。
// 数据来自 content/galaxy/abilities.ts（后续由本地编辑器导出的 JSON 覆盖）。
// ─────────────────────────────────────────────
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import {
  GALAXY_DATA,
  CATEGORY_PALETTE,
  PROFICIENCY_LABEL,
  type AbilityCategory,
} from "@/content/galaxy/abilities";

// 银河 3D 引擎：仅客户端加载
const AbilityGalaxy3D = dynamic(() => import("./AbilityGalaxy3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-sm italic" style={{ color: "rgba(230,205,240,.5)", letterSpacing: ".12em" }}>
        entering the galaxy…
      </p>
    </div>
  ),
});

export function GalaxyAbilitiesSection() {
  const { lang } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const nodeMap = useMemo(() => {
    const m = new Map(GALAXY_DATA.nodes.map((n) => [n.id, n]));
    return m;
  }, []);
  const selectedNode = selectedId ? nodeMap.get(selectedId) ?? null : null;

  return (
    <div className="fixed inset-0 left-64 flex flex-col" style={{ background: "#050209" }}>
      {/* 3D 银河全屏 */}
      <div className="flex-1 relative">
        <AbilityGalaxy3D lang={lang} selectedId={selectedId} onSelect={setSelectedId} />
      </div>

      {/* 右下角图例（悬浮、半透明、紧凑） */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-none">
        <div className="backdrop-blur-md rounded-lg px-4 py-3" style={{ background: "rgba(5,2,12,0.75)" }}>
          <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: "rgba(230,205,242,0.5)" }}>
            {lang === "zh" ? "分类图例" : "Category"}
          </p>
          <div className="space-y-1.5">
            {(Object.keys(CATEGORY_PALETTE) as AbilityCategory[]).map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: CATEGORY_PALETTE[cat].core, boxShadow: `0 0 6px ${CATEGORY_PALETTE[cat].glow}` }}
                />
                <span className="text-[11px]" style={{ color: "rgba(244,234,248,0.85)" }}>
                  {CATEGORY_PALETTE[cat].label[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 详情卡 — 从底部淡淡浮起（模板式、不用弹窗框，星空永远是主角） */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 bottom-0 z-30 px-8 pb-8 pt-20 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(5,2,12,0.96) 40%, rgba(5,2,12,0.6) 70%, transparent 100%)",
            }}
          >
            <div className="pointer-events-auto max-w-4xl mx-auto">
              {/* 关闭按钮 */}
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-6 right-8 w-9 h-9 rounded-full transition-colors flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(230,205,242,0.2)",
                  color: "rgba(230,205,242,0.7)",
                }}
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 6L18 18M18 6L6 18" />
                </svg>
              </button>

              <div className="grid md:grid-cols-[2fr_3fr] gap-8">
                {/* 左：标题与元数据 */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full"
                      style={{
                        background: CATEGORY_PALETTE[selectedNode.category].core,
                        boxShadow: `0 0 8px ${CATEGORY_PALETTE[selectedNode.category].glow}`,
                      }}
                    />
                    <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(230,205,242,0.6)" }}>
                      {CATEGORY_PALETTE[selectedNode.category].label[lang]}
                      {"  ·  "}
                      {PROFICIENCY_LABEL[selectedNode.proficiency][lang]}
                      {selectedNode.passion ? (lang === "zh" ? "  ·  热爱" : "  ·  Passion") : ""}
                    </span>
                  </div>

                  <h3 className="text-2xl font-serif mb-2" style={{ color: "#FCF0FA" }}>
                    {selectedNode.name[lang]}
                  </h3>
                  <p className="text-sm italic mb-4" style={{ color: "rgba(255,220,242,0.85)" }}>
                    "{selectedNode.oneLiner[lang]}"
                  </p>
                </div>

                {/* 右：作品证明与关联链接 */}
                <div className="space-y-4">
                  {selectedNode.proofOfWork && (
                    <div>
                      <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "rgba(230,205,242,0.5)" }}>
                        {lang === "zh" ? "成果证明" : "Proof of Work"}
                      </p>
                      <p className="text-sm leading-relaxed" style={{ color: "rgba(244,234,248,0.8)" }}>
                        {selectedNode.proofOfWork[lang]}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-3">
                    {selectedNode.learnedSince && (
                      <span className="text-xs" style={{ color: "rgba(230,205,242,0.5)" }}>
                        {lang === "zh" ? "自 " : "Since "}
                        {selectedNode.learnedSince}
                      </span>
                    )}
                    {selectedNode.links?.map((l) => (
                      <a
                        key={l.url}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3 py-1.5 rounded-full border transition-colors"
                        style={{
                          color: "rgba(255,220,242,0.9)",
                          borderColor: "rgba(230,170,220,0.3)",
                          background: "rgba(210,140,200,0.14)",
                        }}
                      >
                        {l.label[lang]} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
