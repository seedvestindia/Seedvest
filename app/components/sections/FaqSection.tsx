type FaqItem = {
  q: string;
  a: string;
};

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section
      id="faq"
      className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2
          id="faq-heading"
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
        >
          FAQ
        </h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Quick answers—expand each question for more detail.
        </p>
        <div className="mt-8 space-y-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-1 open:pb-4"
            >
              <summary className="cursor-pointer list-none py-3 text-sm font-semibold text-[var(--foreground)] outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-2">
                  {item.q}
                  <span className="text-[var(--muted)] transition group-open:rotate-180">
                    ▼
                  </span>
                </span>
              </summary>
              <p className="border-t border-[var(--border)] pt-3 text-sm leading-relaxed text-[var(--muted)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

