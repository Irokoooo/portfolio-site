// AI 工程实践 Gallery — Client-safe wrapper
import { vibeCodingPosts } from "@/content/vibe-coding/index";
import { businessAnalysisPosts } from "@/content/business-analysis/index";
import { AIPracticeClient } from "@/components/sections/gallery/AIPracticeClient";

export function AIPracticeGallery() {
  const workPosts = businessAnalysisPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    titleEn: post.titleEn,
    description: post.description,
    descriptionEn: post.descriptionEn,
    date: post.date,
    tags: post.tags,
    tagsEn: post.tagsEn,
    type: post.type,
    typeEn: post.typeEn,
    mediaType: "image" as const,
    sourceFiles: post.mediaItems?.map((item) => item.src) ?? [],
    contentFile: "",
    content: post.content,
    contentEn: post.contentEn,
    category: "work" as const,
    coverImage: post.coverImage,
    highlights: post.highlights,
    highlightsEn: post.highlightsEn,
    mediaItems: post.mediaItems,
  }));

  return <AIPracticeClient posts={[...vibeCodingPosts, ...workPosts]} />;
}
