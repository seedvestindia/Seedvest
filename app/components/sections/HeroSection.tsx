"use client";

import { AlertCircle, ChevronLeft, ChevronRight, Smile } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Globe3DDemo } from "../Globe3DDemo";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CanvasText } from "@/components/ui/canvas-text";

type HeroSlide = {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function HeroSection() {
  const [globeSpeed, setGlobeSpeed] = useState(0.15);

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
    }, 14_000);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const currentHeroSlide = heroSlides[activeHeroSlide];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, x: 30 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut", // ✅ now TS accepts it
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const isGlobeSlow = globeSpeed === 0.15;

  const iconClass =
    "w-4 h-4 transition-transform duration-300 group-hover:rotate-12";

  const Icon = isGlobeSlow ? AlertCircle : Smile;
  const label = isGlobeSlow ? "Don't Click" : "Told you";

  return (
    <motion.section
      className="relative border-b border-[var(--border)] overflow-hidden py-10 lg:py-25 lg:min-h-[calc(100vh-30px)]"
      style={{
        background:
          "linear-gradient(135deg, var(--accent), var(--surface), var(--accent))",
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Super Spinner Globe */}
        {/* <button
          onClick={() => setGlobeSpeed(globeSpeed === 0.15 ? 100 : 0.15)}
          className="flex gap-2 items-center-safe rounded-full border border-[var(--border)] p-2 cursor-pointer"
        >
          <Icon className={iconClass} />
          <span>{label}</span>
        </button> */}

        {/* Slider Dots */}
        <div className="z-50 absolute bottom-4 flex items-center gap-2">
          {heroSlides.map((_, idx) => {
            const isActive = idx === activeHeroSlide;
            return (
              <button
                key={idx}
                onClick={() => setActiveHeroSlide(idx)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  isActive
                    ? "bg-[var(--basic)]"
                    : "bg-[var(--border)] hover:bg-[var(--accent)]/50",
                ].join(" ")}
              />
            );
          })}
        </div>

        {/* Slider Arrows */}
        <div className="z-50 pointer-events-none absolute bottom-2 lg:bottom-[calc(25%-2.5rem)] right-4 lg:right-1/4 lg:translate-x-1/2 flex gap-3">
          <button
            onClick={() =>
              setActiveHeroSlide(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
              )
            }
            className="rounded-full border border-[var(--border)] p-2 cursor-pointer pointer-events-auto"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)
            }
            className="rounded-full border border-[var(--border)] p-2 cursor-pointer pointer-events-auto"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="flex lg:grid lg:grid-cols-2 items-center gap-8 relative">
          {/* LEFT CONTENT */}
          <div className="z-10">
            {/* <CanvasText
              text="SeedVest"
              backgroundClassName="bg-blue-600 dark:bg-blue-700"
              colors={[
                "rgba(0, 153, 255, 1)",
                "rgba(0, 153, 255, 0.9)",
                "rgba(0, 153, 255, 0.8)",
                "rgba(0, 153, 255, 0.7)",
                "rgba(0, 153, 255, 0.6)",
                "rgba(0, 153, 255, 0.5)",
                "rgba(0, 153, 255, 0.4)",
                "rgba(0, 153, 255, 0.3)",
                "rgba(0, 153, 255, 0.2)",
                "rgba(0, 153, 255, 0.1)",
              ]}
              lineGap={4}
              animationDuration={20}
            /> */}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSlide}
                className="min-h-[35lvh]"
                variants={container}
                initial="hidden"
                animate="show"
                exit="exit"
                // Draggable
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    // swipe left → next slide
                    setActiveHeroSlide(
                      (prev) => (prev + 1) % heroSlides.length,
                    );
                  } else if (swipe > swipeConfidenceThreshold) {
                    // swipe right → previous slide
                    setActiveHeroSlide(
                      (prev) =>
                        (prev - 1 + heroSlides.length) % heroSlides.length,
                    );
                  }
                }}
              >
                <motion.h1
                  variants={item}
                  className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl"
                >
                  {currentHeroSlide.title}
                </motion.h1>

                <motion.p
                  variants={item}
                  className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]"
                >
                  {currentHeroSlide.subtitle}
                </motion.p>

                {currentHeroSlide.ctaLabel && currentHeroSlide.ctaHref && (
                  <motion.div
                    variants={item}
                    className="mt-8 flex flex-wrap items-center gap-3"
                  >
                    <a
                      href={currentHeroSlide.ctaHref}
                      className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                      {currentHeroSlide.ctaLabel}
                    </a>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT GLOBE */}
          <div className="absolute lg:top-1/2 translate-y-1/2 lg:-translate-y-1/2 right-0 lg:right-[-30%] w-full h-[500px]">
            <Globe3DDemo globeSpeed={globeSpeed} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
