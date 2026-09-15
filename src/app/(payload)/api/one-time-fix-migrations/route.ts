import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

// Temporary, one-time-use endpoint to clear a stale "dev push" marker
// (batch === -1) from the payload-migrations table, which otherwise
// makes `payload migrate` hang on an interactive prompt during the
// Vercel build with no way to answer it. Protected by PAYLOAD_SECRET
// as a query param. Remove this route after use.
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "payload-migrations",
    limit: 100,
    overrideAccess: true,
  });

  const devPushDocs = docs.filter((d) => d.batch === -1);
  for (const doc of devPushDocs) {
    await payload.delete({
      collection: "payload-migrations",
      id: doc.id,
      overrideAccess: true,
    });
  }

  return NextResponse.json({
    allRecords: docs.map((d) => ({ id: d.id, name: d.name, batch: d.batch })),
    deleted: devPushDocs.map((d) => d.id),
  });
}
