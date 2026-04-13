import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }

  // 仅允许本地 markdown 文件名，避免路径穿越。
  if (!/^[a-z0-9-]+\.md$/i.test(file)) {
    return NextResponse.json({ error: "invalid file" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "content", "academic-research", file);

  try {
    const content = readFileSync(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
