"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const HEADLINE = "Plant today. Grow tomorrow. Build a legacy.";

// A loose vine path that reads as "seed climbing into growth."
// Leaves are placed at rough points along the curve.
const LEAVES = [
  { x: 150, y: 232 },
  { x: 235, y: 188 },
  { x: 300, y: 110 },
];

export function WelcomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotlightX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const spotlightY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const spotlightBackground = useMotionTemplate`radial-gradient(480px circle at ${spotlightX}px ${spotlightY}px, var(--foreground) 0%, transparent 70%)`;

  function handlePointerMove(e: React.MouseEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set(e.clientX - rect.left);
    pointerY.set(e.clientY - rect.top);
  }

  const words = HEADLINE.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={prefersReducedMotion ? undefined : handlePointerMove}
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] py-20 sm:py-28"
    >
      {/* Cursor-tracked spotlight — subtle, responds to the visitor, not a decoration */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-[0.05] sm:block"
          style={{ background: spotlightBackground }}
        />
      )}

      {/* The growth line: draws in once on load, then sits quietly */}
      <svg
        aria-hidden
        viewBox="0 0 400 420"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute inset-y-0 right-0 h-full w-full opacity-[0.14] sm:w-3/5"
      >
        <motion.path
          d="M30,400 C110,400 70,300 140,270 C220,235 190,190 235,150 C275,115 260,80 300,45 C320,28 330,20 345,12"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={
            prefersReducedMotion
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: 0, opacity: 0 }
          }
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />
        {!prefersReducedMotion &&
          LEAVES.map((leaf, i) => (
            <motion.circle
              key={i}
              cx={leaf.x}
              cy={leaf.y}
              r={4}
              fill="var(--foreground)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.5 + i * 0.35,
                duration: 0.4,
                ease: "backOut",
              }}
            />
          ))}
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-[var(--text)]"
        >
          Welcome to SeedVest
        </motion.p>

        <motion.h1
          className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.06,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.28em] inline-block"
              variants={{
                hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-[var(--muted)]"
        >
          <p>
            At{" "}
            <span className="font-semibold text-[var(--foreground)]">
              SeedVest
            </span>
            , we believe every financial journey begins with a seed, a
            well-planned investment that, with time and the right guidance, can
            grow into lasting wealth.
          </p>
          <p>
            We help you navigate your financial journey through{" "}
            <span className="font-semibold text-[var(--foreground)]">
              investments, insurance, and wealth management
            </span>{" "}
            solutions designed around your goals, aspirations, and future needs.
          </p>
          <p>
            Our approach goes beyond simply investing. We work with you at every
            stage, from{" "}
            <span className="font-semibold text-[var(--foreground)]">
              building wealth and protecting it
            </span>{" "}
            to planning for your family's future and creating a lasting legacy.
          </p>
          <p>
            Because true financial success isn't just about how much you earn.
            It's about{" "}
            <span className="font-semibold text-[var(--foreground)]">
              how wisely you grow, protect, and pass on what you build.
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-8 max-w-2xl pl-5"
        >
          <motion.span
            aria-hidden
            className="absolute left-0 top-0 w-[2px] origin-top bg-[var(--text)]"
            initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            style={{ height: "100%" }}
          />
          <p className="text-base font-medium leading-relaxed text-[var(--foreground)] sm:text-lg">
            Welcome to SeedVest, where your wealth takes root, grows with
            purpose, and creates prosperity for generations.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
