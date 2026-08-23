/**
 * An invisible field that only a bot fills in.
 *
 * Real visitors never see or reach it: it sits off-screen rather than under
 * display:none, since some scrapers skip fields hidden that way but still
 * fill in ones that are merely positioned off the visible page. tabIndex=-1
 * keeps it out of keyboard navigation, and aria-hidden keeps screen readers
 * from ever announcing it, so it costs a genuine visitor nothing.
 *
 * Field name matches lib/honeypot.ts's isHoneypotFilled, which checks it
 * server-side before anything is written.
 */
export function Honeypot() {
  return (
    <div style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 0, height: 0, overflow: "hidden" }}>
      <input type="text" name="hp_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    </div>
  );
}
