"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Real Estate", href: "#real-estate", tone: "primary" },
  { label: "Investments", href: "#investments", tone: "primary" },
  { label: "Insurance", href: "#insurance", tone: "primary" },
  { label: "Tools", href: "#tools", tone: "secondary" },
  { label: "Insights", href: "#insights", tone: "secondary" },
  { label: "About Us", href: "#about", tone: "secondary" },
  { label: "Contact", href: "#contact", tone: "secondary" },
] as const;

const WHATSAPP_URL = "https://wa.me/8169546916";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-[var(--foreground)]"
          onClick={() => setOpen(false)}
        >
          SeedVest
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={[
                "rounded-lg px-3 py-2 font-medium transition-all",
                item.tone === "primary"
                  ? "text-sm text-[var(--foreground)] hover:bg-[var(--muted-bg)]"
                  : "text-xs text-[var(--muted)] hover:bg-[var(--muted-bg)] hover:text-sm hover:text-[var(--foreground)]",
              ].join(" ")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {/* <ThemeToggle /> */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            <span aria-hidden>💬</span>
            Chat with us
          </a>
        </div>

        <div className="lg:hidden">
          <ThemeToggle className="h-10 px-3" />
        </div>
      </div>

      {/* Mobile left drawer */}
      <div className="lg:hidden">
        <div
          className={[
            "fixed inset-0 z-50 transition",
            open ? "pointer-events-auto" : "pointer-events-none",
          ].join(" ")}
          aria-hidden={!open}
        >
          <div
            className={[
              "absolute inset-0 bg-black/40 transition-opacity",
              open ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onClick={() => setOpen(false)}
          />

          <aside
            id="mobile-nav"
            className={[
              "absolute left-0 top-0 h-full w-80 max-w-[85vw] border-r border-[var(--border)] bg-[var(--surface)] shadow-xl transition-transform",
              open ? "translate-x-0" : "-translate-x-full",
            ].join(" ")}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-4">
              <Link
                href="/"
                className="text-base font-semibold tracking-tight text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                SeedVest
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)]"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-1 px-3 py-4" aria-label="Mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={[
                    "block rounded-lg px-3 py-3 font-medium hover:bg-[var(--muted-bg)]",
                    item.tone === "primary"
                      ? "text-sm text-[var(--foreground)]"
                      : "text-sm text-[var(--muted)] hover:text-[var(--foreground)]",
                  ].join(" ")}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Chat with us
                </a>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </header>
  );
}
