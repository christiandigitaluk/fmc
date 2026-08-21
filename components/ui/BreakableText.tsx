import { Fragment } from "react";

/**
 * Text with break opportunities after dots and @, for addresses and URLs.
 *
 * A long address has no spaces, so a browser either overflows it or breaks it
 * mid-word ("leytontrinitymethodistchur / ch.org.uk"). A <wbr> after each dot
 * and @ means that when a wrap is genuinely unavoidable it lands on a boundary
 * a reader recognises.
 *
 * It also lowers the element's min-content width, which matters here: grid
 * items default to min-width:auto, so without this a long unbroken address
 * can widen its whole column.
 */
export function BreakableText({ text }: { text: string }) {
  const parts = text.split(/(?<=[.@])/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && <wbr />}
        </Fragment>
      ))}
    </>
  );
}
