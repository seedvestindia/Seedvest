type Article = {
  title: string;
  excerpt: string;
  date: string;
};

export function ArticlesSection({ articles }: { articles: Article[] }) {
  return (
    <section
      id="articles"
      className="border-b border-[var(--border)] py-16 sm:py-20"
      aria-labelledby="articles-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="articles-heading"
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
        >
          Articles
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Practical notes from our desk—swap titles and excerpts with your own
          posts when ready.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {articles.map((a) => (
            <article
              key={a.title}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:border-[var(--accent)]/40"
            >
              <time
                dateTime={a.date}
                className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]"
              >
                {a.date}
              </time>
              <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                {a.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                {a.excerpt}
              </p>
              <span className="mt-4 text-sm font-medium text-[var(--accent)]">
                Read more →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

