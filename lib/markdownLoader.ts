// Markdown 内容类型定义（纯类型文件，无 Node.js 依赖）
// 内容数据存放在 content/[category]/index.ts 中，以 TS 数组形式导出
// 这样可以在客户端和服务端组件中通用，避免 fs 模块引发的 webpack 错误

export interface MarkdownPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  type: string;
  content: string; // Markdown 正文字符串
  pdfUrl?: string; // 可选：原始 PDF 文件链接
  coverImage?: string; // 可选：Drawer 顶部封面图路径
}
