// 学术与科研 Gallery — 纯客户端兼容组件
// 内容已内联在 content/academic-research/index.ts，无需 fs 读取。
import { AcademicResearchClient } from "./AcademicResearchClient";
import { academicResearchPosts } from "@/content/academic-research/index";

export function AcademicResearchGallery() {
  return <AcademicResearchClient posts={academicResearchPosts} />;
}
