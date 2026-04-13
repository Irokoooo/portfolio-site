// 全局布局文件：包裹所有页面，引入字体、全局样式
// 三层动态复合背景：
//   Layer 1（底层）: parchment.jpg 羊皮纸纹理，opacity-30，mix-blend-mode: multiply
//   Layer 2（中层）: gold-foil.png 金箔，左侧区域绝对定位，animate-pulse 缓慢闪烁
//   Layer 3（顶层）: vine-left/right.png 角落藤蔓，Framer Motion 微小摇曳（客户端组件）
import type { Metadata } from "next";
import "./globals.css";
import { VineBackground } from "@/components/layout/VineBackground";
import { GoldDustParticles } from "@/components/layout/GoldDustParticles";

// 页面元数据：SEO、浏览器标签、社交分享
export const metadata: Metadata = {
  title: {
    default: "史心怡 · Xinyi Shi — Portfolio",
    template: "%s | Xinyi Shi",
  },
  description:
    "个人作品集：国际经贸 × AI 工具链 × 跨文化沟通。申请 Erasmus 等跨学科硕士项目。",
  keywords: ["portfolio", "Erasmus", "international trade", "AI", "vibe coding"],
  authors: [{ name: "Xinyi Shi" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://yoursite.com",
    siteName: "Xinyi Shi Portfolio",
  },
};

// RootLayout：所有页面的外壳 + 三层动态复合背景
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-milk-white text-seed-shadow antialiased relative">

        {/* ══════════════════════════════════════════════
            Layer 1（底层）：羊皮纸材质纹理
            fixed 定位覆盖全屏，opacity 极淡（0.3）
            mix-blend-mode: multiply 与奶白底色自然融合
            pointer-events-none 不影响任何交互
            z-index: 0（最底层）
        ══════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            backgroundImage: "url('/assets/textures/parchment.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3,
            mixBlendMode: 'multiply',
          }}
        />

        {/* ══════════════════════════════════════════════
            Layer 2（中层）：金箔呼吸光晕
            左侧区域定位，animate-pulse（CSS animation）
            opacity 极淡，mix-blend-mode: multiply
            仅装饰作用，不阻挡点击
        ══════════════════════════════════════════════ */}
        <div
          aria-hidden="true"
          className="animate-pulse"
          style={{
            position: 'fixed',
            top: '5%',
            left: '-4%',
            width: '340px',
            height: '340px',
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage: "url('/assets/decorations/gold-foil.png')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            opacity: 0.12,
            mixBlendMode: 'multiply',
          }}
        />

        {/* ══════════════════════════════════════════════
            Layer 3（顶层）：角落藤蔓摇曳（Framer Motion）
            客户端组件，固定在左下/右下角
            rotate: [-1deg, 1deg]，周期 4s
        ══════════════════════════════════════════════ */}
        <VineBackground />

        {/* ══════════════════════════════════════════════
            Layer 4：金粉飘落粒子（Canvas 2D）
            从左上角缓缓飘向右下角，稀疏优雅，25粒
            z-index: 2，在内容层之下
        ══════════════════════════════════════════════ */}
        <GoldDustParticles />

        {/* 页面内容：z-index: 10，覆盖所有背景层 */}
        <div className="relative" style={{ zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
