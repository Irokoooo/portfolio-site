// AI 工程实践 Gallery — Client-safe wrapper
import { vibeCodingPosts } from "@/content/vibe-coding/index";
import { businessAnalysisPosts } from "@/content/business-analysis/index";
import { AIPracticeClient } from "@/components/sections/gallery/AIPracticeClient";

export function AIPracticeGallery() {
  const workPosts = businessAnalysisPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    type: post.type,
    mediaType: "image" as const,
    sourceFiles: post.mediaItems?.map((item) => item.src) ?? [],
    contentFile: "",
    content: post.content,
    category: "work" as const,
    coverImage: post.coverImage,
    highlights: post.highlights,
    mediaItems: post.mediaItems,
  }));

  return <AIPracticeClient posts={[...vibeCodingPosts, ...workPosts]} />;
}
