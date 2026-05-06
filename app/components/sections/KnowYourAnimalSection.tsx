import { AnimatePresence } from "framer-motion";
import { AnimalOrbitAnimation } from "../AnimalAnimation";

export function KnowYourAnimalSection() {
  return (
    <section
      className="relative overflow-hidden border-b border-[var(--border)] py-20 sm:py-28"
      aria-labelledby="animal-heading"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full bg-[var(--accent-soft)] opacity-30 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Grid Layout */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT SIDE — Animation Placeholder */}
          <div className="flex w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <AnimalOrbitAnimation />
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE — Content */}
          <div className="text-center md:text-left">
            <h2
              id="animal-heading"
              className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
            >
              Discover Your Investment Personality
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Financial decisions aren’t just logical—they’re personal.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              That’s why we begin by understanding how you think about
              money—your instincts, your comfort with risk, and your
              decision-making style—so we can build a strategy that truly fits
              you.
            </p>

            {/* CTA */}
            <div className="mt-6">
              <button className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white shadow-md transition hover:opacity-90">
                Discover Yours
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
