import { JSX } from "react";

type PreviewCategory = "investments" | "real-estate" | "insurance";

type ArticlePreview = {
  title: string;
  category: PreviewCategory;
  categoryLabel: string;
  date: string;
};

function IconTrendingUp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="14 6 21 6 21 13" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4.5h4V19a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const CATEGORY_ICON: Record<
  PreviewCategory,
  (props: { className?: string }) => JSX.Element
> = {
  investments: IconTrendingUp,
  "real-estate": IconHome,
  insurance: IconShield,
};

const PREVIEW_ARTICLES: ArticlePreview[] = [
  {
    title: "Why Do You Need a Mutual Fund Advisor?",
    category: "investments",
    categoryLabel: "Investment",
    date: "Aug 10, 2026",
  },
  {
    title: "Why Do You Need a Real Estate Professional?",
    category: "real-estate",
    categoryLabel: "Real estate",
    date: "Aug 17, 2026",
  },
  {
    title: "Why Do You Need an Insurance Professional?",
    category: "insurance",
    categoryLabel: "Insurance",
    date: "Aug 24, 2026",
  },
];

export function InsightsPreviewSection() {
  return (
    <section className="border-b border-[var(--border)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
              Insights &amp; perspectives
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Thoughtful perspectives on investing, wealth creation, protection,
              and financial planning.
            </p>
          </div>

          <a
            href="?articles=all#articles"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--text)] transition hover:underline sm:inline-flex"
          >
            View all articles
            <IconArrow className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {PREVIEW_ARTICLES.map((article) => {
            const Icon = CATEGORY_ICON[article.category];

            return (
              <a
                key={article.title}
                href="#articles"
                className="group flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-lg"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--text)] transition group-hover:scale-105">
                  <Icon className="h-4.5 w-4.5" />
                </span>

                <p className="mt-4 line-clamp-3 text-sm font-semibold leading-snug text-[var(--foreground)]">
                  {article.title}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-xs font-medium text-[var(--text)]">
                    {article.categoryLabel}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {article.date}
                  </span>
                </div>
              </a>
            );
          })}
        </div>

        <a
          href="#articles"
          className="mt-8 flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--text)] transition hover:underline sm:hidden"
        >
          View all articles
          <IconArrow className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
