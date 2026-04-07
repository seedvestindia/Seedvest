"use client";

import { useEffect, useMemo, useState } from "react";

type HeroSlide = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function HeroSection() {
  const heroSlides = useMemo<HeroSlide[]>(
    () => [
      {
        title: "Plan your wealth with clarity and confidence",
        subtitle:
          "SeedVest brings together property, investments, insurance, and Financial Planning, so you can move forward with a single, coherent strategy",
      },
      {
        title: "Make Smart Property Decisions, Not Guesswork",
        subtitle:
          "Buying your first home? Or building a portfolio that actually performs? We cut through the noise, Provide location insights, pricing clarity and future potential, so you invest where it truly matters.",
        ctaLabel: "Explore Properties",
        ctaHref: "#real-estate",
      },
      {
        title: "Make Your Money Work Smarter",
        subtitle:
          "Saving is just the start, real growth comes from investing the right way. From mutual funds to long-term strategies, we help you build wealth through the power of compounding that aligns with your goals.",
        ctaLabel: "Start Investing",
        ctaHref: "#investments",
      },
      {
        title: "Secure What You’re Building",
        subtitle:
          "You work hard to build your wealth, don’t leave it exposed. We help you choose the right insurance to protect your income, your family, and everything you’re working towards, without the usual confusion or fine print.",
        ctaLabel: "Get Protected",
        ctaHref: "#insurance",
      },
      {
        title: "Everything You Need. One Clear Plan.",
        subtitle:
          "Build a clear, step-by-step strategy for your wealth—with expert guidance at every stage—bringing you clarity, confidence, and control over your financial life.",
        ctaLabel: "Get Started",
        ctaHref: "#contact",
      },
    ],
    []
  );

  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const currentHeroSlide = heroSlides[activeHeroSlide];

  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--surface)]"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
          SeedVest
        </p>
        <h1
          id="hero-heading"
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl"
        >
          {currentHeroSlide.title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
          {currentHeroSlide.subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {currentHeroSlide.ctaLabel && currentHeroSlide.ctaHref ? (
            <a
              href={currentHeroSlide.ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              {currentHeroSlide.ctaLabel}
            </a>
          ) : null}

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setActiveHeroSlide(
                  (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                )
              }
              className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40"
              aria-label="Previous slide"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)
              }
              className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--accent)]/40"
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>

        <div
          className="mt-8 flex items-center gap-2"
          role="tablist"
          aria-label="Hero slides"
        >
          {heroSlides.map((_, idx) => {
            const isActive = idx === activeHeroSlide;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveHeroSlide(idx)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  isActive
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--border)] hover:bg-[var(--accent)]/50",
                ].join(" ")}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : undefined}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

