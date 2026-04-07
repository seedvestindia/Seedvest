"use client";

import { useEffect, useMemo, useState } from "react";
import { Globe3DDemo } from "../Globe3DDemo";

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
          "Buying your first home? Or building a portfolio that actually performs? We cut through the noise, provide location insights, pricing clarity and future potential, so you invest where it truly matters.",
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
          "You work hard to build your wealth, don’t leave it exposed. We help you choose the right insurance to protect your income, your family, and everything you’re working towards.",
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
    [],
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
    <section className="relative border-b border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center gap-8">
          {/* LEFT CONTENT */}
          <div className="z-10">
            <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
              SeedVest
            </p>

            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">
              {currentHeroSlide.title}
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400">
              {currentHeroSlide.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {currentHeroSlide.ctaLabel && currentHeroSlide.ctaHref && (
                <a
                  href={currentHeroSlide.ctaHref}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {currentHeroSlide.ctaLabel}
                </a>
              )}
            </div>
          </div>

          {/* RIGHT GLOBE */}
          <div className="relative h-[500px] lg:h-[500px] w-full overflow-hidden">
            {/* Gradient fade */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[var(--surface)] via-transparent to-transparent z-10" />

            {/* Perfect half-globe */}
            <div className="absolute lg:top-1/2 lg:-translate-y-1/2 right-[-20%] w-[1000px] h-[500px]">
              <Globe3DDemo />
            </div>
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <div className="mt-10 flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((_, idx) => {
              const isActive = idx === activeHeroSlide;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveHeroSlide(idx)}
                  className={[
                    "h-2.5 w-2.5 rounded-full transition",
                    isActive
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--border)] hover:bg-[var(--accent)]/50",
                  ].join(" ")}
                />
              );
            })}
          </div>

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() =>
                setActiveHeroSlide(
                  (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
                )
              }
              className="rounded-full border border-[var(--border)] px-3 py-2"
            >
              ←
            </button>
            <button
              onClick={() =>
                setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)
              }
              className="rounded-full border border-[var(--border)] px-3 py-2"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
