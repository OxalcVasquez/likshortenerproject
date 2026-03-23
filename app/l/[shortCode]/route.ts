import { NextRequest, NextResponse } from "next/server";
import { getLinkBySlug } from "@/data/links";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> },
): Promise<NextResponse> {
  const { shortCode } = await params;

  const link = await getLinkBySlug(shortCode);

  if (!link) {
    return NextResponse.json({ error: "Short URL not found" }, { status: 404 });
  }

  return NextResponse.redirect(link.originalUrl, { status: 301 });
}
