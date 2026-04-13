import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  if (!file) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }

  // Basic hardening: only allow local markdown filenames.
  if (!/^[a-z0-9-]+\.md$/i.test(file)) {
    return NextResponse.json({ error: "invalid file" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "content", "vibe-coding", file);

  try {
    const content = readFileSync(filePath, "utf-8");
    return NextResponse.json({ content });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
