// 商业分析 Gallery — 直接从 TS 数据文件导入内容
// 改为纯客户端可用的数据导入，避免 fs 模块导致的 webpack 错误
import { businessAnalysisPosts } from "@/content/business-analysis/index";
import { BusinessAnalysisClient } from "./BusinessAnalysisClient";

export function BusinessAnalysisGallery() {
  return <BusinessAnalysisClient posts={businessAnalysisPosts} />;
}
