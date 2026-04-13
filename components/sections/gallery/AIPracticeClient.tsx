'use client';
// Vibe Coding 板块客户端组件（第四十九轮重构）
// 卡片：植物学暖调羊皮纸风格，与站点整体风格统一
// 抽屉：Notion 风格封面 + 彩色标签 + 清晰排版

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { VibeCodingPost } from "@/content/vibe-coding/index";

interface AIPracticeClientProps {
  posts: VibeCodingPost[];
}

// ── URL 编码辅助 ──
function encodePublicFilePath(url: string) {
  const lastSlash = url.lastIndexOf("/");
  if (lastSlash === -1) return url;
  const dir = url.slice(0, lastSlash + 1);
  const filename = url.slice(lastSlash + 1);
  return `${dir}${encodeURIComponent(filename)}`;
}

// ── 封面候选路径（支持多后缀 fallback）──
function getCoverCandidates(slug: string) {
  if (slug === "lawflaw-ai-assistant") {
    return [
      "/works/covers/vibe/lawflaw-ai-assistant.jpg",
      "/works/covers/vibe/LawFlaw.jpg",
      "/works/covers/vibe/lawflaw-ai-assistant.png",
    ];
  }
  if (slug === "luma-flow") {
    return [
      "/works/covers/vibe/Luma Flow.jpg",
      "/works/covers/vibe/luma-flow.jpg",
      "/works/covers/vibe/luma-flow.png",
    ];
  }
  return [
    `/works/covers/vibe/${slug}.jpg`,
    `/works/covers/vibe/${slug}.png`,
  ];
}

// ── 媒体类型标签中文 ──
const mediaLabel: Record<string, string> = {
  image: "截图展示",
  video: "演示视频",
  mixed: "图文 + 视频",
};

// ── 项目类型色标 ──
const typeColor: Record<string, { bg: string; text: string; border: string }> = {
  "Product Prototype": { bg: "rgba(198,49,74,0.08)", text: "#9a1f33", border: "rgba(198,49,74,0.22)" },
  "UI Prototype":       { bg: "rgba(74,127,165,0.08)", text: "#2d5878", border: "rgba(74,127,165,0.22)" },
  "System Prototype":   { bg: "rgba(74,87,64,0.08)",  text: "#3a4532", border: "rgba(74,87,64,0.22)"  },
  "Website Prototype":  { bg: "rgba(184,134,11,0.08)", text: "#7a5800", border: "rgba(184,134,11,0.22)" },
  "Platform Demo":      { bg: "rgba(94,84,142,0.08)",  text: "#4a3d8a", border: "rgba(94,84,142,0.22)" },
};

const defaultTypeColor = { bg: "rgba(63,46,47,0.07)", text: "#3F2E2F", border: "rgba(63,46,47,0.18)" };

// ── 封面图组件（带 onError fallback）──
function DrawerCoverImg({ slug }: { slug: string }) {
  const covers = getCoverCandidates(slug);
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (idx + 1 < covers.length) {
      setIdx((i) => i + 1);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    // 渐变占位封面
    return (
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, #4A5740 0%, #2e3828 45%, #3F2E2F 100%)" }}
      />
    );
  }

  return (
    <img
      key={idx}
      src={encodePublicFilePath(covers[idx])}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      onError={handleError}
    />
  );
}

export function AIPracticeClient({ posts }: AIPracticeClientProps) {
  const [selectedPost, setSelectedPost] = useState<VibeCodingPost | null>(null);
  const [selectedContent, setSelectedContent] = useState("");
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [showLawflawManualPreview, setShowLawflawManualPreview] = useState(false);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  // 内容加载
  useEffect(() => {
    if (!selectedPost) {
      setSelectedContent("");
      setIsLoadingContent(false);
      setShowLawflawManualPreview(false);
      setVideoUnavailable(false);
      return;
    }

    setShowLawflawManualPreview(false);
    setVideoUnavailable(false);

    if (selectedPost.content && selectedPost.content.trim().length > 0) {
      setSelectedContent(selectedPost.content);
      setIsLoadingContent(false);
      return;
    }

    const contentFile = selectedPost.contentFile;
    let cancelled = false;

    async function loadMarkdown() {
      setIsLoadingContent(true);
      try {
        const res = await fetch(`/api/vibe-coding-content?file=${encodeURIComponent(contentFile)}`);
        if (!res.ok) throw new Error("failed");
        const data = (await res.json()) as { content?: string };
        if (!cancelled) {
          setSelectedContent(data.content ?? "正文暂未同步，请检查对应 md 文件。");
        }
      } catch {
        if (!cancelled) {
          setSelectedContent("加载正文失败，请检查 md 文件与 API 路由。");
        }
      } finally {
        if (!cancelled) setIsLoadingContent(false);
      }
    }

    loadMarkdown();
    return () => { cancelled = true; };
  }, [selectedPost]);

  return (
    <div className="space-y-6">
      {/* ── 板块标题 ── */}
      <div>
        <h2 className="text-2xl font-serif text-seed-shadow mb-1">Vibe Coding</h2>
        <p className="text-xs text-seed-shadow/40 mb-6">用 AI 工具链从零构建产品原型 — 点击卡片展开详情</p>
      </div>

      {/* ── 项目卡片列表 ── */}
      <div className="space-y-3">
        {posts.map((item, i) => {
          const tc = typeColor[item.type] ?? defaultTypeColor;
          return (
            <motion.button
              key={item.slug}
              onClick={() => setSelectedPost(item)}
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-full text-left rounded-xl overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, rgba(247,244,238,0.9) 0%, rgba(245,237,220,0.6) 100%)",
                border: "1px solid rgba(63,46,47,0.12)",
                borderLeft: `3px solid ${tc.text}`,
                boxShadow: "0 1px 6px rgba(63,46,47,0.05)",
              }}
            >
              <div className="relative p-4 flex gap-4">
                {/* 序号 */}
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* 文字区 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[15px] font-semibold text-seed-shadow leading-snug group-hover:text-seed-shadow/80">
                      {item.title}
                    </p>
                    <span className="text-[11px] text-seed-shadow/35 whitespace-nowrap shrink-0 pt-0.5 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span
                      className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-sm"
                      style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                    >
                      {item.type}
                    </span>
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-sm"
                      style={{
                        background: "rgba(184,134,11,0.07)",
                        color: "#7a5800",
                        border: "1px solid rgba(184,134,11,0.18)",
                      }}
                    >
                      {mediaLabel[item.mediaType] ?? item.mediaType}
                    </span>
                  </div>

                  <p className="text-xs text-seed-shadow/55 mt-2 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-1.5 py-0.5 rounded"
                        style={{
                          background: "rgba(63,46,47,0.06)",
                          color: "rgba(63,46,47,0.6)",
                          border: "1px solid rgba(63,46,47,0.1)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 右箭头指示 */}
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M8 4l3 3-3 3" stroke="rgba(63,46,47,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* ── Drawer（Portal 到 body） ── */}
      {typeof document !== "undefined" &&
        selectedPost &&
        createPortal(
          <AnimatePresence>
            <>
              {/* 背景遮罩 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-seed-shadow/25 backdrop-blur-sm z-[90]"
                onClick={() => setSelectedPost(null)}
              />

              {/* Drawer 面板 */}
              <motion.aside
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 h-screen z-[100] shadow-2xl flex flex-col"
                style={{
                  width: "min(48rem, 92vw)",
                  backgroundColor: "#faf8f4",
                  borderLeft: "1px solid rgba(63,46,47,0.1)",
                }}
              >
                <div className="overflow-y-auto flex-1 overscroll-contain">

                  {/* ── 封面区 ── */}
                  <div className="relative h-56 overflow-hidden">
                    {/* key 确保切换项目时封面组件重新挂载 */}
                    <DrawerCoverImg key={selectedPost.slug} slug={selectedPost.slug} />

                    {/* 渐变遮罩层 */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to bottom, rgba(250,248,244,0.04) 0%, rgba(250,248,244,0.2) 42%, rgba(250,248,244,0.92) 100%)" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "radial-gradient(120% 90% at 50% 0%, rgba(20,16,13,0.0) 30%, rgba(20,16,13,0.26) 100%)" }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: "linear-gradient(to bottom, transparent, #faf8f4)" }} />

                    {/* 左上：类型标签 + 日期 */}
                    <div className="absolute left-7 top-5 z-10">
                      <span className="text-xs text-white/95 bg-black/30 px-2.5 py-1 border border-white/20 rounded-full backdrop-blur-sm font-medium tracking-wide">
                        {selectedPost.type}
                      </span>
                      <p className="text-[11px] text-white/75 mt-1.5 font-medium">{selectedPost.date}</p>
                    </div>

                    {/* 右上：关闭按钮 */}
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="absolute top-4 right-4 z-20 text-white/90 hover:text-white transition-colors p-2 bg-black/22 hover:bg-black/38 backdrop-blur-sm rounded-lg"
                      aria-label="关闭"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>

                    {/* 底部：标题三层白框叠层 */}
                    <div className="absolute left-7 right-7 bottom-3 z-10">
                      <div className="rounded-xl p-1" style={{ background: "rgba(250,248,244,0.55)" }}>
                        <div className="rounded-[10px] p-1" style={{ background: "rgba(250,248,244,0.75)" }}>
                          <div
                            className="rounded-lg px-4 py-3 shadow-sm"
                            style={{ background: "rgba(250,248,244,0.90)", border: "1px solid rgba(250,248,244,0.7)" }}
                          >
                            <h3 className="text-xl font-serif text-seed-shadow leading-snug">{selectedPost.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── 正文区 ── */}
                  <div className="px-7 pb-10 pt-4">

                    {/* 标签行 */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {selectedPost.tags.map((tag) => {
                        const tc = typeColor[selectedPost.type] ?? defaultTypeColor;
                        return (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                            style={{ background: tc.bg, color: tc.text, border: `1px solid ${tc.border}` }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>

                    {/* Project Overview 信息框 */}
                    <div
                      className="rounded-xl px-4 py-3.5 mb-6"
                      style={{ background: "rgba(63,46,47,0.04)", border: "1px solid rgba(63,46,47,0.1)" }}
                    >
                      <p className="text-[10px] uppercase tracking-widest text-seed-shadow/35 mb-1.5">Project Overview</p>
                      <p className="text-sm text-seed-shadow/70 leading-relaxed">{selectedPost.description}</p>
                    </div>

                    {/* 演示视频（仅 video / mixed 类型） */}
                    {(selectedPost.mediaType === "video" || selectedPost.mediaType === "mixed") && (
                      <div className="mb-6 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(63,46,47,0.1)" }}>
                        <div
                          className="px-4 py-2.5 flex items-center gap-2"
                          style={{ background: "rgba(63,46,47,0.04)", borderBottom: "1px solid rgba(63,46,47,0.08)" }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5" stroke="rgba(63,46,47,0.4)" strokeWidth="1"/>
                            <path d="M4.5 4l4 2-4 2V4z" fill="rgba(63,46,47,0.5)"/>
                          </svg>
                          <p className="text-[10px] uppercase tracking-widest text-seed-shadow/40">Demo Video</p>
                        </div>
                        {videoUnavailable ? (
                          <div className="px-4 py-8 bg-black/85 text-center">
                            <p className="text-sm text-white/85">视频占位中，上传后将自动嵌入展示。</p>
                            <p className="text-xs text-white/55 mt-1.5 font-mono">/public/works/vibe/{selectedPost.slug}.mp4</p>
                          </div>
                        ) : (
                          <video
                            controls
                            preload="metadata"
                            className="w-full bg-black block"
                            onError={() => setVideoUnavailable(true)}
                          >
                            <source src={encodePublicFilePath(`/works/vibe/${selectedPost.slug}.mp4`)} type="video/mp4" />
                          </video>
                        )}
                      </div>
                    )}

                    {/* Markdown 正文 */}
                    <div className="text-seed-shadow/80">
                      {isLoadingContent ? (
                        <div className="flex items-center gap-2 py-6">
                          <div className="w-4 h-4 border-2 border-seed-shadow/20 border-t-seed-shadow/60 rounded-full animate-spin" />
                          <p className="text-sm text-seed-shadow/40">正在加载正文...</p>
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none
                          prose-headings:font-serif prose-headings:text-seed-shadow prose-headings:font-semibold
                          prose-h2:text-base prose-h2:mt-6 prose-h2:mb-2
                          prose-h3:text-sm prose-h3:mt-4 prose-h3:mb-1.5
                          prose-p:text-seed-shadow/70 prose-p:leading-relaxed prose-p:text-sm
                          prose-li:text-seed-shadow/70 prose-li:text-sm
                          prose-strong:text-seed-shadow prose-strong:font-semibold
                          prose-a:text-leaf-green prose-a:no-underline hover:prose-a:underline
                          prose-table:text-xs prose-th:text-seed-shadow/60 prose-td:text-seed-shadow/70
                          prose-blockquote:border-l-2 prose-blockquote:border-seed-shadow/20
                          prose-blockquote:text-seed-shadow/55 prose-blockquote:pl-4 prose-blockquote:italic
                          prose-code:text-strawberry-jam prose-code:bg-strawberry-jam/8
                          prose-code:px-1 prose-code:rounded prose-code:text-[11px]
                          [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2
                          [&_h2]:pb-1.5 [&_h2]:border-b [&_h2]:border-seed-shadow/10
                        ">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {selectedContent || "正文暂未同步，请检查对应 md 文件。"}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>

                    {/* LawFlaw 专属：产品说明书 PDF 预览 */}
                    {selectedPost.slug === "lawflaw-ai-assistant" && (
                      <div
                        className="mt-8 rounded-xl overflow-hidden"
                        style={{ border: "1px solid rgba(63,46,47,0.1)" }}
                      >
                        <div
                          className="px-4 py-2.5 flex items-center justify-between"
                          style={{ background: "rgba(63,46,47,0.04)", borderBottom: "1px solid rgba(63,46,47,0.08)" }}
                        >
                          <div className="flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <rect x="1.5" y="0.5" width="9" height="11" rx="1" stroke="rgba(63,46,47,0.45)" strokeWidth="1"/>
                              <path d="M3.5 3.5h5M3.5 5.5h5M3.5 7.5h3" stroke="rgba(63,46,47,0.35)" strokeWidth="0.9" strokeLinecap="round"/>
                            </svg>
                            <p className="text-[10px] uppercase tracking-widest text-seed-shadow/40">产品说明书预览</p>
                          </div>
                          {!showLawflawManualPreview && (
                            <button
                              onClick={() => setShowLawflawManualPreview(true)}
                              className="text-[11px] px-3 py-1 rounded-lg transition-colors"
                              style={{
                                background: "rgba(63,46,47,0.08)",
                                color: "rgba(63,46,47,0.7)",
                                border: "1px solid rgba(63,46,47,0.15)",
                              }}
                            >
                              展开预览
                            </button>
                          )}
                        </div>
                        {showLawflawManualPreview ? (
                          <iframe
                            src={`${encodePublicFilePath("/works/vibe/lawflaw-ai-assistant.pdf")}#page=1&toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                            title="LawFlaw 产品说明书预览"
                            className="w-full block"
                            style={{ height: "28rem", background: "#fff" }}
                          />
                        ) : (
                          <div
                            className="px-4 py-5 text-center"
                            style={{ background: "rgba(63,46,47,0.02)" }}
                          >
                            <p className="text-xs text-seed-shadow/35">点击"展开预览"查看 PDF 说明书内容</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.aside>
            </>
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
