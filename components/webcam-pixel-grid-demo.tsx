"use client";

import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

export default function WebcamPixelGridDemo() {
  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Webcam pixel grid background */}
      <div className="absolute inset-0">
        <WebcamPixelGrid
          gridCols={60}
          gridRows={40}
          maxElevation={50}
          motionSensitivity={0.25}
          elevationSmoothing={0.2}
          colorMode="webcam"
          backgroundColor="#030303"
          mirror={true}
          gapRatio={0.05}
          invertColors={false}
          darken={0.6}
          borderColor="#ffffff"
          borderOpacity={0.06}
          className="w-full h-full"
          onWebcamReady={() => console.log("Webcam ready!")}
          onWebcamError={(err) => console.error("Webcam error:", err)}
        />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <section
          className="py-16 sm:py-20"
          aria-label="Services overview"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
              What we help with
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
              Jump to a topic from the header, or skim the summaries below.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <article
                id="real-estate"
                className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  Real Estate
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Buy, hold, or transition property with numbers that reflect
                  your timeline and risk comfort.
                </p>
              </article>
              <article
                id="investments"
                className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  Investments
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Portfolios structured around goals—not noise—so progress is
                  easier to measure.
                </p>
              </article>
              <article
                id="insurance"
                className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  Insurance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Coverage reviews that connect policy details to what your
                  family or business actually needs.
                </p>
              </article>
              <article
                id="tools"
                className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  Tools
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Calculators, checklists, and workflows that keep decisions
                  transparent and repeatable.
                </p>
              </article>
              <article
                id="insights"
                className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  Insights
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Articles and updates that translate markets and policy changes
                  into plain language.
                </p>
              </article>
              <article
                id="about"
                className="scroll-mt-24 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)]">
                  About Us
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  A team focused on listening first—then building plans you can
                  follow without second-guessing every step.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Scroll indicator */}
      </div>
    </div>
  );
}
