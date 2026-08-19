"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { NotificationBanner } from "@/components/layout/NotificationBanner";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { SiteSettings } from "@/lib/types";

type SimpleNavItem = { href: string; label: string };
type DropdownNavItem = { label: string; items: SimpleNavItem[] };
type NavItem = SimpleNavItem | DropdownNavItem;

function isDropdown(item: NavItem): item is DropdownNavItem {
  return "items" in item;
}

const NAV_LINKS: NavItem[] = [
  {
    label: "About",
    items: [
      { href: "/about", label: "About us" },
      { href: "/staff", label: "Circuit staff" },
      { href: "/resources", label: "Resources" },
      { href: "/jobs", label: "Jobs" },
    ],
  },
  { href: "/churches", label: "Find a church" },
  { href: "/preaching-plan", label: "Preaching plan" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/hall-hire", label: "Hall hire" },
  { href: "/contact", label: "Contact" },
];

/** Kept in step with the `drawer-out` animation in globals.css. */
const DRAWER_EXIT_MS = 200;

const MOBILE_LINKS: SimpleNavItem[] = [
  { href: "/about", label: "About us" },
  { href: "/staff", label: "Circuit staff" },
  { href: "/resources", label: "Resources" },
  { href: "/churches", label: "Find a church" },
  { href: "/preaching-plan", label: "Preaching plan" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/hall-hire", label: "Hall hire" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
];

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const [drawerClosing, setDrawerClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drawerOpenRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // A link closes the drawer on its way to another page, where the router
  // scrolls to the top — restoring this page's offset would fight that.
  const navigatingRef = useRef(false);

  useEffect(() => {
    drawerOpenRef.current = open;
  }, [open]);

  useEffect(() => () => {
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
  }, []);

  /** Let the panel animate out before unmounting, so it slides rather than pops. */
  function closeDrawer() {
    if (drawerClosing) return;
    setDrawerClosing(true);
    exitTimerRef.current = setTimeout(() => {
      setDrawerClosing(false);
      setOpen(false);
      triggerRef.current?.focus();
    }, DRAWER_EXIT_MS);
  }

  /** Closing because we're navigating away: no exit animation, no scroll restore. */
  function closeDrawerForNavigation() {
    navigatingRef.current = true;
    setOpen(false);
  }

  /**
   * The header is 110px on a phone — 13.5% of the screen — so it slides out
   * of the way while reading down the page and comes straight back on any
   * upward flick, keeping the menu one gesture away without permanently
   * spending the space. Desktop has the room, so it stays put there.
   */
  useEffect(() => {
    const wideScreen = window.matchMedia("(min-width: 1024px)");
    lastScrollYRef.current = Math.max(0, window.scrollY);
    let queued = false;

    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        // Pinning and unpinning the body for the drawer moves the page
        // without the user scrolling, so never read a direction from it.
        if (drawerOpenRef.current) {
          lastScrollYRef.current = Math.max(0, window.scrollY);
          return;
        }
        if (wideScreen.matches) {
          setNavHidden(false);
          return;
        }
        // Clamp: iOS reports negative/overshooting values while rubber-banding.
        const y = Math.min(Math.max(0, window.scrollY), document.body.scrollHeight - window.innerHeight);
        const delta = y - lastScrollYRef.current;
        if (Math.abs(delta) < 8) return; // ride out scroll jitter
        // Near the top there's nothing to reclaim, so never hide there.
        setNavHidden(y > 140 && delta > 0);
        lastScrollYRef.current = y;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function clearCloseTimer() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openDropdownNow(label: string) {
    clearCloseTimer();
    setOpenDropdown(label);
  }

  function scheduleDropdownClose() {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeDrawer();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const firstLink = drawerRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    // Plain overflow:hidden on body reliably blocks background scroll on
    // iOS Safari, but touch scrolling can still leak through to the page
    // behind the drawer on Android Chrome. Pinning body with position:fixed
    // (restoring the scroll offset on close) blocks it on both.
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";

      if (navigatingRef.current) {
        // Heading elsewhere — leave the scroll position to the router.
        navigatingRef.current = false;
        return;
      }

      // Unpinning drops the page to the top, so it has to be put back. The
      // global `scroll-behavior: smooth` would animate that journey, which
      // reads as the page lurching about after the menu closes, so force the
      // jump to be instant.
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      root.style.scrollBehavior = previousBehavior;
      // Land the auto-hide handler on the restored offset so it reads no
      // movement here and leaves the header exactly as the user left it.
      lastScrollYRef.current = scrollY;
    };
  }, [open]);

  useEffect(() => {
    if (!openDropdown) return;

    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenDropdown(null);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  return (
    <>
      <NotificationBanner settings={settings} />
      <header
        // Keyboard users can tab into the header while it's tucked away, so
        // bring it back rather than moving focus somewhere invisible.
        onFocusCapture={() => setNavHidden(false)}
        className={cn(
          "sticky top-0 z-40 border-b-2 border-ink-900 bg-[var(--surface-page)]/95 backdrop-blur",
          "transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none",
          navHidden ? "-translate-y-full" : "translate-y-0",
          "lg:translate-y-0"
        )}
      >
        <div className="container-max flex items-center justify-between py-3.5">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Forest Circuit home">
            <Image src="/images/logo-ink.png" alt="" width={112} height={112} className="h-20 w-20 xl:h-28 xl:w-28" />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block" ref={navRef}>
            <ul className="flex items-center gap-4 2xl:gap-6">
              {NAV_LINKS.map((item) =>
                isDropdown(item) ? (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openDropdownNow(item.label)}
                    onMouseLeave={scheduleDropdownClose}
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.label}
                      onClick={() => setOpenDropdown((cur) => (cur === item.label ? null : item.label))}
                      onFocus={() => openDropdownNow(item.label)}
                      className="nav-link flex items-center gap-1 text-[18px] font-extrabold text-[var(--text-heading)] hover:text-forest-600 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
                      style={{ outlineColor: "var(--focus-ring)" }}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={openDropdown === item.label ? "rotate-180 transition-transform" : "transition-transform"}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <ul
                        className="sticker absolute left-0 top-full z-10 mt-3 min-w-[180px] rounded-[10px] bg-white py-2"
                        onMouseEnter={() => openDropdownNow(item.label)}
                        onMouseLeave={scheduleDropdownClose}
                      >
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-4 py-2.5 text-base font-semibold text-[var(--text-heading)] no-underline hover:bg-forest-100"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link text-[18px] font-extrabold text-[var(--text-heading)] no-underline hover:text-forest-600 hover:no-underline">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="hidden shrink-0 xl:block">
            <Button href="/churches" variant="primary" size="sm">
              Find a church near you
            </Button>
          </div>

          <button
            ref={triggerRef}
            type="button"
            className="sticker shrink-0 xl:hidden flex h-12 w-12 items-center justify-center rounded-[14px] bg-cream-50 text-ink-900 transition-[transform,background-color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:-rotate-3 hover:bg-orange-500 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
            style={{ outlineColor: "var(--focus-ring)" }}
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? closeDrawer() : setOpen(true))}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className={cn(
              "absolute inset-0 touch-none overscroll-contain bg-ink-900/60",
              drawerClosing && "backdrop-out"
            )}
            onClick={closeDrawer}
            aria-hidden="true"
          />
          <div
            id="mobile-nav-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className={cn(
              "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto overflow-x-hidden overscroll-contain rounded-l-[28px] border-l-2 border-ink-900 bg-[var(--surface-page)] p-6 shadow-[var(--shadow-lift)]",
              drawerClosing ? "drawer-panel-out" : "drawer-panel"
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border-2 border-orange-500/30"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 bottom-20 h-32 w-32 rounded-full bg-forest-100"
            />

            <div className="relative mb-8 flex items-center justify-between">
              <span className="text-lg font-bold text-[var(--text-heading)]" style={{ fontFamily: "var(--font-display)" }}>Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeDrawer}
                className="sticker flex h-10 w-10 items-center justify-center rounded-[12px] bg-cream-50 text-ink-900 transition-[transform,background-color] duration-200 ease-[cubic-bezier(.22,.61,.36,1)] hover:rotate-3 hover:bg-orange-500 focus:outline-none focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2"
                style={{ outlineColor: "var(--focus-ring)" }}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <ul className="relative flex flex-col gap-1.5">
              {MOBILE_LINKS.map((link, i) => (
                <li key={link.href} className="drawer-link" style={{ animationDelay: `${80 + i * 45}ms` }}>
                  <Link
                    href={link.href}
                    onClick={closeDrawerForNavigation}
                    className="block rounded-full px-4 py-3 text-lg font-bold text-[var(--text-heading)] no-underline transition-colors hover:bg-forest-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="drawer-link relative mt-8" style={{ animationDelay: `${80 + MOBILE_LINKS.length * 45}ms` }}>
              <Button href="/churches" variant="primary" size="md" className="w-full" onClick={closeDrawerForNavigation}>
                Find a church near you
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
