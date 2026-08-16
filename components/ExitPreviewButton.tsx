"use client";

export function ExitPreviewButton() {
  async function exitPreview() {
    await fetch("/api/draft-mode/disable", { method: "POST" });
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={exitPreview}
      className="fixed bottom-4 left-4 z-[999] rounded-full border-2 border-ink-900 bg-orange-500 px-4 py-2 text-sm font-bold text-ink-900 shadow-[3px_3px_0_var(--ink-900)]"
    >
      Exit preview
    </button>
  );
}
