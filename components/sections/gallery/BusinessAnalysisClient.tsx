'use client';
// 商业分析客户端组件：卡片列表 + framer-motion Drawer 展示 Markdown 正文
// 第四阶段升级：Drawer 打开时主页面 scale: 1→0.95 + backdrop-blur，营造景深推拉感
import { createPortal } from "react-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { MarkdownPost } from "@/lib/markdownLoader";

interface BusinessAnalysisClientProps {
  posts: MarkdownPost[];
}

function DrawerCover({ src, alt }: { src?: string; alt: string }) {
  const [loadError, setLoadError] = useState(false);

  if (!src || loadError) {
    return <div className="absolute inset-0 bg-gradient-to-br from-cream-pour via-[#f5efe6] to-[#ece3d6]" />;
  }

  return (
    <div className="absolute inset-0 bg-[#efe6db]">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block"
        onError={() => setLoadError(true)}
      />
    </div>
  );
}

function CaseMediaCarousel({ items, title }: { items: { src: string; label: string }[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  return (
    <section className="mb-7 overflow-hidden rounded-xl border border-seed-shadow/10 bg-cream-pour/20">
      <div className="flex items-center justify-between gap-3 border-b border-seed-shadow/8 px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-seed-shadow/35">Workflow Demo</p>
          <p className="mt-0.5 text-xs text-seed-shadow/65">{activeItem.label}</p>
        </div>
        <span className="shrink-0 font-mono text-[10px] text-seed-shadow/35">
          {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="relative aspect-video overflow-hidden bg-[#171b18]">
        <img
          key={activeItem.src}
          src={activeItem.src}
          alt={`${title}：${activeItem.label}`}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex gap-1.5" aria-label="演示选择">
          {items.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`查看演示 ${index + 1}：${item.label}`}
              aria-pressed={activeIndex === index}
              className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-7 bg-leaf-green/75" : "w-2.5 bg-seed-shadow/15 hover:bg-seed-shadow/30"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex - 1 + items.length) % items.length)}
            className="rounded border border-seed-shadow/12 px-2.5 py-1 text-[11px] text-seed-shadow/55 transition-colors hover:bg-seed-shadow/5"
          >
            上一个
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % items.length)}
            className="rounded border border-seed-shadow/12 px-2.5 py-1 text-[11px] text-seed-shadow/55 transition-colors hover:bg-seed-shadow/5"
          >
            下一个
          </button>
        </div>
      </div>
    </section>
  );
}

export function BusinessAnalysisClient({ posts }: BusinessAnalysisClientProps) {
  // 当前打开的文章（null 表示 Drawer 关闭）
  const [selectedPost, setSelectedPost] = useState<MarkdownPost | null>(null);
  const isDrawerOpen = selectedPost !== null;

  return (
    // 外层相对容器，用于景深缩放的锚点
    <div className="relative">
      {/* ── 主内容区：Drawer 打开时向后退缩（scale + blur） ── */}
      <motion.div
        animate={isDrawerOpen
          ? { scale: 0.95, filter: 'blur(2px)', opacity: 0.7 }
          : { scale: 1,    filter: 'blur(0px)', opacity: 1 }
        }
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'center top', willChange: 'transform' }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-serif text-seed-shadow mb-1">Work Systems</h2>
          <p className="text-xs text-seed-shadow/40 mb-6">工作系统 — 把复杂业务流程重构为可运行、可验证、可规模化的产品</p>
        </div>

        {/* ── 文章卡片列表 ── */}
        <div className="space-y-3">
          {posts.length === 0 ? (
            <div className="border border-dashed border-seed-shadow/15 rounded-lg p-8 text-center bg-cream-pour/20">
              <p className="text-sm text-seed-shadow/40">暂无内容</p>
              <p className="text-xs text-seed-shadow/25 mt-1">请在 content/business-analysis/ 目录下添加 .md 文件</p>
            </div>
          ) : (
            posts.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedPost(post)}
                className="w-full text-left bento-card rounded-lg p-5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block text-xs text-seed-shadow/50 bg-seed-shadow/5 px-2 py-0.5 border border-seed-shadow/10 rounded">
                        {post.type}
                      </span>
                      <span className="text-xs text-seed-shadow/30">{post.date}</span>
                    </div>
                    <p className="text-sm font-medium text-seed-shadow group-hover:text-seed-shadow/80 leading-snug">
                      {post.title}
                    </p>
                    <p className="text-xs text-seed-shadow/55 mt-1.5 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                    {post.highlights && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-3">
                        {post.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="text-[10px] leading-snug text-leaf-green/85 bg-leaf-green/[0.06] border border-leaf-green/15 px-2 py-1.5 rounded"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-seed-shadow/5 text-seed-shadow/50 px-2 py-0.5 border border-seed-shadow/8 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-seed-shadow/25 text-sm shrink-0 group-hover:text-leaf-green transition-colors mt-1">→</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* ── 工具生态 ── */}
        <div className="border-t border-seed-shadow/8 pt-6">
          <p className="text-xs font-medium text-seed-shadow/40 uppercase tracking-widest mb-3">Core Tools</p>
          <div className="flex flex-wrap gap-2">
            {["Python / Pandas", "Stata / SPSS", "ArcGIS", "LaTeX", "Excel"].map((tool) => (
              <span key={tool} className="text-xs text-seed-shadow/60 bg-cream-pour/50 border border-seed-shadow/10 px-3 py-1 rounded">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Drawer 层：遮罩 + 面板（Portal 到 body，避免被主内容 transform 影响） ── */}
      {typeof document !== "undefined" && selectedPost && createPortal(
        <AnimatePresence>
          <>
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-seed-shadow/25 backdrop-blur-sm z-[90]"
              style={{ position: "fixed", inset: 0, zIndex: 90 }}
              onClick={() => setSelectedPost(null)}
            />

            <motion.div
              key="drawer-layer"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              className="fixed inset-0 z-[100] pointer-events-none"
              style={{ position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none" }}
            >
            <motion.aside
              key="drawer-panel"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 h-screen w-[48rem] max-w-[92vw] bg-milk-white shadow-2xl flex flex-col relative pointer-events-auto"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                height: "100vh",
                width: "min(48rem, 92vw)",
                borderLeft: '1px solid rgba(63,46,47,0.08)',
                pointerEvents: "auto",
              }}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 text-white/90 hover:text-white transition-colors p-2 bg-black/20 hover:bg-black/35 backdrop-blur-sm rounded-lg"
                aria-label="关闭"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="relative h-64 overflow-hidden">
                  {/* key prop 确保切换卡片时 DrawerCover 重新挂载，防止 loadError 状态复用 */}
                  <DrawerCover key={selectedPost.coverImage ?? selectedPost.slug} src={selectedPost.coverImage} alt={selectedPost.title} />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.2) 38%, rgba(255,255,255,0.92) 100%)' }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(120% 88% at 50% 0%, rgba(20,16,13,0.02) 28%, rgba(20,16,13,0.22) 100%)' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-milk-white" />

                  <div className="absolute left-8 top-6 z-10">
                    <span className="text-xs text-white/95 bg-black/28 px-2 py-0.5 border border-white/30 rounded backdrop-blur-sm">
                      {selectedPost.type}
                    </span>
                    <p className="text-xs text-white/85 mt-1">{selectedPost.date}</p>
                  </div>

                  <div className="absolute left-8 right-14 bottom-4 z-10">
                    <div className="bg-white/60 rounded-xl p-1">
                      <div className="bg-white/78 rounded-[10px] p-1">
                        <div className="bg-white/92 backdrop-blur-sm border border-white/75 rounded-lg px-4 py-3 shadow-sm">
                          <h1 className="text-2xl font-serif text-seed-shadow leading-tight">
                            {selectedPost.title}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 px-8 pb-8 pt-4">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {selectedPost.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-seed-shadow/5 text-seed-shadow/50 px-2 py-0.5 border border-seed-shadow/8 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-cream-pour/30 border border-seed-shadow/10 rounded-lg px-5 py-4 mb-6">
                    <p className="text-[10px] font-medium text-seed-shadow/40 uppercase tracking-widest mb-2">
                      Project Overview
                    </p>
                    <p className="text-sm text-seed-shadow/65 leading-relaxed">
                      {selectedPost.description}
                    </p>
                  </div>

                  {selectedPost.highlights && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
                      {selectedPost.highlights.map((highlight, index) => (
                        <div key={highlight} className="relative overflow-hidden rounded-lg border border-leaf-green/15 bg-leaf-green/[0.05] px-3 py-3">
                          <span className="absolute right-2 top-1 text-2xl font-serif text-leaf-green/[0.08]">0{index + 1}</span>
                          <p className="relative text-xs font-medium leading-snug text-leaf-green/90">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedPost.mediaItems && selectedPost.mediaItems.length > 0 && (
                    <CaseMediaCarousel key={selectedPost.slug} items={selectedPost.mediaItems} title={selectedPost.title} />
                  )}

                  <div className="prose prose-sm max-w-none
                    prose-headings:font-serif prose-headings:text-seed-shadow
                    prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                    prose-p:text-seed-shadow/70 prose-p:leading-relaxed
                    prose-strong:text-seed-shadow prose-strong:font-medium
                    prose-code:text-seed-shadow/70 prose-code:bg-cream-pour/60 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-cream-pour/40 prose-pre:border prose-pre:border-seed-shadow/8 prose-pre:rounded-lg
                    prose-blockquote:border-l-leaf-green/40 prose-blockquote:text-seed-shadow/55
                    prose-table:text-xs prose-th:bg-cream-pour/50 prose-th:text-seed-shadow/70 prose-th:font-medium
                    prose-td:text-seed-shadow/60
                    prose-a:text-leaf-green prose-a:underline prose-a:underline-offset-2
                    prose-li:text-seed-shadow/70 prose-li:leading-relaxed
                    prose-hr:border-seed-shadow/8">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedPost.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.aside>
            </motion.div>
          </>
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
