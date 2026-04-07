export function KnowYourAnimalSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-[var(--border)] py-20 sm:py-28"
      aria-labelledby="animal-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 animal-glow rounded-full bg-[var(--accent-soft)] opacity-40 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="animal-heading"
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
          >
            Know your Animal
          </h2>
          <p className="mt-3 text-sm text-[var(--muted)] sm:text-base">
            A playful way to think about style: steady tortoise, curious fox, or
            bold lion—each has strengths in how they approach risk.
          </p>
        </div>

        <div className="relative mx-auto mt-14 flex max-w-lg justify-center">
          <span
            className="absolute -left-4 top-1/2 text-3xl paw-fade sm:-left-8"
            aria-hidden
          >
            🐾
          </span>
          <span
            className="absolute -right-4 top-1/4 text-2xl paw-fade-delay sm:-right-8"
            aria-hidden
          >
            🐾
          </span>
          <div className="animal-float relative flex h-44 w-44 items-center justify-center rounded-3xl border-2 border-[var(--accent)] bg-[var(--surface)] shadow-lg sm:h-52 sm:w-52">
            <svg
              viewBox="0 0 120 120"
              className="h-28 w-28 text-[var(--accent)] sm:h-32 sm:w-32"
              aria-hidden
            >
              <ellipse cx="60" cy="72" rx="38" ry="28" fill="currentColor" />
              <circle cx="60" cy="38" r="26" fill="currentColor" />
              <path
                d="M38 28 L32 12 L44 22 Z M82 28 L88 12 L76 22 Z"
                fill="currentColor"
              />
              <circle cx="48" cy="36" r="5" fill="var(--surface)" />
              <circle cx="72" cy="36" r="5" fill="var(--surface)" />
              <ellipse
                cx="60"
                cy="48"
                rx="6"
                ry="4"
                fill="var(--surface)"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

