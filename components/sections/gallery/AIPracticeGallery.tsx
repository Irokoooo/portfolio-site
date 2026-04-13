// AI 工程实践 Gallery — Client-safe wrapper
import { vibeCodingPosts } from "@/content/vibe-coding/index";
import { AIPracticeClient } from "@/components/sections/gallery/AIPracticeClient";

export function AIPracticeGallery() {
  return <AIPracticeClient posts={vibeCodingPosts} />;
}
