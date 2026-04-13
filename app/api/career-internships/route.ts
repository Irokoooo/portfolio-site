import { NextResponse } from "next/server";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

interface InternshipMetric {
  label: string;
  value: string;
  unit?: string;
  suffix?: string;
}

interface InternshipFrontmatter {
  id: string;
  type?: "internship";
  order?: number;
  org: string;
  orgEn: string;
  role: string;
  direction?: string;
  period: string;
  periodShort: string;
  logoSrc: string;
  tag?: string;
  metrics?: InternshipMetric[];
  skills?: string[];
  galleryImages?: string[];
}

function isInternshipFrontmatter(data: unknown): data is InternshipFrontmatter {
  if (!data || typeof data !== "object") return false;
  const value = data as Record<string, unknown>;

  return typeof value.id === "string"
    && typeof value.org === "string"
    && typeof value.orgEn === "string"
    && typeof value.role === "string"
    && typeof value.period === "string"
    && typeof value.periodShort === "string"
    && typeof value.logoSrc === "string";
}

export async function GET() {
  const internshipsDir = path.join(process.cwd(), "content", "career", "internships");

  try {
    const files = readdirSync(internshipsDir).filter((file) => file.toLowerCase().endsWith(".md"));

    const internships = files
      .map((file) => {
        if (file === "_template.md") {
          return null;
        }
        const filePath = path.join(internshipsDir, file);
        const raw = readFileSync(filePath, "utf-8");
        const parsed = matter(raw);

        if (!isInternshipFrontmatter(parsed.data)) {
          return null;
        }

        const data = parsed.data;
        if (data.id === "internship-slug" || data.org === "公司名称" || data.orgEn === "Company Name") {
          return null;
        }
        return {
          id: data.id,
          type: "internship" as const,
          order: typeof data.order === "number" ? data.order : 999,
          org: data.org,
          orgEn: data.orgEn,
          role: data.role,
          direction: typeof data.direction === "string" ? data.direction : undefined,
          period: data.period,
          periodShort: data.periodShort,
          logoSrc: data.logoSrc,
          tag: typeof data.tag === "string" ? data.tag : undefined,
          metrics: Array.isArray(data.metrics) ? data.metrics : [],
          bullets: [],
          skills: Array.isArray(data.skills) ? data.skills : [],
          galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
          markdownContent: parsed.content.trim(),
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => a.order - b.order);

    return NextResponse.json({ internships });
  } catch {
    return NextResponse.json({ internships: [] }, { status: 200 });
  }
}
