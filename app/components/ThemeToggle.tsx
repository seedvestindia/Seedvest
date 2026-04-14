"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "seedvest-theme";
const THEME_EVENT = "seedvest-theme-change";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

function applyFaviconForTheme(theme: Theme) {
  const light = document.querySelector<HTMLLinkElement>(
    'link[rel="icon"][data-theme="light"]',
  );
  const dark = document.querySelector<HTMLLinkElement>(
    'link[rel="icon"][data-theme="dark"]',
  );

  // Use media swapping so browsers pick the right one immediately.
  if (light) light.media = theme === "light" ? "all" : "not all";
  if (dark) dark.media = theme === "dark" ? "all" : "not all";
}

function getThemeFromDom(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Layout script applies theme early; just sync state to DOM.
    setTheme(getThemeFromDom());

    function sync() {
      setTheme(getThemeFromDom());
    }

    window.addEventListener(THEME_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(THEME_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function toggle() {
    const next: Theme = getThemeFromDom() === "dark" ? "light" : "dark";

    applyTheme(next);
    applyFaviconForTheme(next);
    setTheme(next);
    window.localStorage.setItem(THEME_KEY, next);
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={[
        "inline-flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] px-4 text-sm font-semibold text-[var(--foreground)] transition",
        "hover:bg-[var(--muted-bg)] shadow-2xl backdrop-blur-2xl",
        className,
      ].join(" ")}
      aria-label="Toggle theme"
    >
      <span aria-hidden>
        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      </span>
    </button>
  );
}
