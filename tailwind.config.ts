import type { Config } from "tailwindcss";

// Tailwind 配置：定义项目的设计 Token（颜色、字体、间距等）
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 字体配置：使用系统字体栈，零网络依赖，加载极快
      // 未来可替换为本地 woff2 字体文件
      fontFamily: {
        // 无衬线：正文用，macOS/iOS 用 SF Pro，Windows 用 Segoe UI
        sans: [
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        // 等宽：代码用
        mono: [
          "ui-monospace",
          '"JetBrains Mono"',
          '"Fira Code"',
          '"Cascadia Code"',
          "Consolas",
          "monospace",
        ],
        // 衬线：英文标题用 Times New Roman，营造古典学术感
        serif: [
          '"Times New Roman"',
          "Times",
          "Georgia",
          "ui-serif",
          "serif",
        ],
      },
      // 颜色：欧式古典植物学色板
      colors: {
        // 保留 ink / canvas 以兼容旧代码
        ink: {
          DEFAULT: "#3F2E2F",
          light: "#6b7280",
          faint: "#9ca3af",
        },
        canvas: {
          DEFAULT: "#F7F4EE",
          warm: "#F1DDD1",
          subtle: "#f5f5f4",
        },
        // ── 欧式植物学专属色板 ──
        "milk-white": "#F7F4EE",   // 全局背景：羊皮纸奶白
        "cream-pour": "#F1DDD1",   // 卡片/次级模块背景：奶油玫瑰
        "seed-shadow": "#3F2E2F",  // 主文本 / 深色按钮：深棕焦糖
        "leaf-green": "#6EBB5E",   // 强调色 / 动效点缀：叶绿
        "strawberry-jam": "#C6314A", // 画龙点睛亮色：草莓果酱红
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
