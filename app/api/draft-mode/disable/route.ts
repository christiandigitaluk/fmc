import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// POST only: a GET here would let Chrome's link preloading (or any crawler)
// silently kill an editor's preview session just by prefetching the "Exit
// preview" link in the background, since GET requests are treated as safe
// to speculatively fetch.
export async function POST() {
  (await draftMode()).disable();
  return NextResponse.json({ ok: true });
}
