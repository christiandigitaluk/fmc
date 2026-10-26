/** A run of plain text, or a link when `href` is set. */
export type InlinePart = { text: string; href?: string };

/** Splits "see [the form](https://…) here" into plain and link parts. */
export function splitLinks(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const at = match.index ?? 0;
    if (at > last) parts.push({ text: text.slice(last, at) });
    parts.push({ text: match[1], href: match[2] });
    last = at + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}
