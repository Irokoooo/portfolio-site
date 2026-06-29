import { NextResponse } from "next/server";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import matter from "gray-matter";

interface InternshipMetric {
  labelZh: string;
  labelEn: string;
  value: string;
  prefix?: string;
  suffix?: string;
  unitZh?: string;
  unitEn?: string;
}

interface InternshipFrontmatter {
  id: string;
  type?: "internship";
  order?: number;
  org: string;
  orgEn: string;
  roleZh: string;
  roleEn: string;
  directionZh?: string;
  directionEn?: string;
  period: string;
  periodShort: string;
  logoSrc: string;
  tagZh?: string;
  tagEn?: string;
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
    && typeof value.roleZh === "string"
    && typeof value.roleEn === "string"
    && typeof value.period === "string"
    && typeof value.periodShort === "string"
    && typeof value.logoSrc === "string";
}

// 解析 markdown 正文中的双语内容
function parseMarkdownContent(content: string): { zh: string[]; en: string[] } {
  const sections = content.split(/^## /m).filter(Boolean);
  const zhBullets: string[] = [];
  const enBullets: string[] = [];

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    let currentLang: 'zh' | 'en' | null = null;

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed === '### 中文') {
        currentLang = 'zh';
      } else if (trimmed === '### English') {
        currentLang = 'en';
      } else if (trimmed.startsWith('-') && currentLang) {
        const bullet = trimmed.substring(1).trim();
        if (currentLang === 'zh') {
          zhBullets.push(bullet);
        } else {
          enBullets.push(bullet);
        }
      }
    });
  });

  return { zh: zhBullets, en: enBullets };
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

        // 解析正文中的双语内容
        const bullets = parseMarkdownContent(parsed.content.trim());

        // 转换 metrics 格式
        const metrics = Array.isArray(data.metrics)
          ? data.metrics.map(m => ({
              label: { zh: m.labelZh, en: m.labelEn },
              value: m.value,
              prefix: m.prefix,
              suffix: m.suffix,
              unit: m.unitZh || m.unitEn ? { zh: m.unitZh, en: m.unitEn } : undefined,
            }))
          : [];

        return {
          id: data.id,
          type: "internship" as const,
          order: typeof data.order === "number" ? data.order : 999,
          org: data.org,
          orgEn: data.orgEn,
          role: { zh: data.roleZh, en: data.roleEn },
          direction: data.directionZh && data.directionEn
            ? { zh: data.directionZh, en: data.directionEn }
            : undefined,
          period: data.period,
          periodShort: data.periodShort,
          logoSrc: data.logoSrc,
          tag: data.tagZh && data.tagEn
            ? { zh: data.tagZh, en: data.tagEn }
            : undefined,
          metrics,
          bullets,
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
