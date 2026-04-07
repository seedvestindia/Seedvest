import { Geist_Mono, Sora, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SeedVest",
  description:
    "Professional guidance for real estate, investments, insurance, tools, and insights. Contact SeedVest to plan your next step.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "scroll-smooth", "antialiased", sora.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <head>
        {/* Default: system-based favicon switching */}
        <link
          rel="icon"
          href="/favicon-light.ico"
          data-theme="light"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          data-theme="dark"
          media="(prefers-color-scheme: dark)"
        />

        {/* Apply saved theme (overrides system) before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
  try {
    var key = "seedvest-theme";
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored === "dark" || stored === "light" ? stored : (prefersDark ? "dark" : "light");
    var root = document.documentElement;
    if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark");

    var light = document.querySelector('link[rel="icon"][data-theme="light"]');
    var dark = document.querySelector('link[rel="icon"][data-theme="dark"]');
    if (light && dark) {
      // If user explicitly chose a theme, force the favicon too.
      if (stored === "dark" || stored === "light") {
        light.media = theme === "light" ? "all" : "not all";
        dark.media = theme === "dark" ? "all" : "not all";
      }
    }
  } catch (e) {}
})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <a
          href="#contact"
          className="fixed bottom-5 right-5 z-50 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          aria-label="Get started"
        >
          Get Started
        </a>
        <SiteFooter />
      </body>
    </html>
  );
}
