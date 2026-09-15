import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

// Temporary, one-time-use endpoint. Remove after use.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logoId = req.nextUrl.searchParams.get("logo");
  const logoDarkId = req.nextUrl.searchParams.get("logoDark");

  const payload = await getPayloadClient();
  const result = await payload.updateGlobal({
    slug: "site-settings",
    data: {
      ...(logoId ? { logo: Number(logoId) } : {}),
      ...(logoDarkId ? { logoDark: Number(logoDarkId) } : {}),
    },
    overrideAccess: true,
  });

  return NextResponse.json({ result });
}
