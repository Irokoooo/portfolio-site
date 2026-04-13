/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── 图片优化 ──────────────────────────────────────────────────────
  images: {
    // 本地图片不需要外部域名，保留结构供未来 CDN 扩展
    formats: ["image/webp", "image/avif"],
  },

  // ── 编译提速 ──────────────────────────────────────────────────────
  // 启用 SWC 编译器的极速模式（Next.js 14 默认已启用，但显式声明更稳）
  swcMinify: true,

  // ── 实验性优化（dev 冷启动加速）─────────────────────────────────
  experimental: {
    // 仅编译实际被访问的路由，减少 dev 冷启动时间
    optimizePackageImports: ["framer-motion", "react-markdown", "remark-gfm"],
  },

  // ── 生产构建：关闭 source map 节省构建时间 ──────────────────────
  productionBrowserSourceMaps: false,
};

export default nextConfig;
