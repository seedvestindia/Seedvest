export function KnowYourAnimalDetailsSection() {
  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20"
      aria-labelledby="animal-details-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="animal-details-heading"
          className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
        >
          Details for “Know your animal”
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Use this as a conversation starter in workshops or onboarding. Swap
          copy anytime to match your brand voice.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Tortoise
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Prefers stability, long horizons, and predictable cash flow. Great
              match for indexed strategies and core property holdings.
            </p>
          </li>
          <li className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Fox
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Curious and tactical—likes to test ideas with small bets before
              scaling. Benefits from clear guardrails and regular reviews.
            </p>
          </li>
          <li className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Lion
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Comfortable with volatility when upside aligns with goals. Needs
              explicit risk budgets and insurance that keeps pace.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}

