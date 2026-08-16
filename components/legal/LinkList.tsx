import { ExternalLink } from "lucide-react";

export type LegalLink = { label: string; href: string };

export function LinkList({ links }: { links: LegalLink[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-start gap-2 text-forest-600 hover:text-forest-700 hover:underline"
          >
            <ExternalLink size={16} className="mt-1 shrink-0" aria-hidden="true" />
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
