import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * On-demand revalidation for Sanity content changes.
 *
 * Set up in Sanity: manage.sanity.io -> API -> Webhooks -> create one
 * pointing at https://<your-domain>/api/revalidate, POST, with a secret
 * matching SANITY_REVALIDATE_SECRET below. Trigger on create/update/delete
 * for all document types (or scope per type if preferred).
 *
 * Without this, Sanity edits only appear after the 5-minute time-based
 * revalidate window in lib/content.ts, or a full redeploy.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const type = body?._type;
    if (!type) {
      return NextResponse.json({ message: "Missing _type in payload" }, { status: 400 });
    }

    revalidateTag(type);

    return NextResponse.json({ revalidated: true, type, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: (err as Error).message }, { status: 500 });
  }
}
