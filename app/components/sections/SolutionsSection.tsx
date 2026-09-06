"use client";

import { JSX } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Solution = {
  name: string;
  icon: (props: { className?: string }) => JSX.Element;
  href?: string;
  comingSoon?: boolean;
};

function IconPieChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3v9l7.8 4.5" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconBarChart({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 20V10M12 20V4M20 20v-7" />
    </svg>
  );
}

function IconLayers({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5" />
      <path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.5 19 6v6c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  );
}

function IconHome({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4.5h4V19a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
    </svg>
  );
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

function IconSliders({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 6h9M17.5 6H19M5 12h2.5M10 12H19M5 18h12M19.5 18H19" />
      <circle cx="12" cy="6" r="1.75" />
      <circle cx="9" cy="12" r="1.75" />
      <circle cx="15.5" cy="18" r="1.75" />
    </svg>
  );
}

const SOLUTIONS: Solution[] = [
  {
    name: "Mutual funds",
    icon: IconPieChart,
    href: "/?article=mutual-funds#articles",
  },
  {
    name: "Capital markets",
    icon: IconBarChart,
    href: "#contact",
  },
  {
    name: "Fixed income",
    icon: IconLayers,
    comingSoon: true,
  },
  {
    name: "Insurance solutions",
    icon: IconShield,
    comingSoon: true,
  },
  {
    name: "Real estate",
    icon: IconHome,
    href: "/?article=real-estate#articles",
  },
  {
    name: "Specialised investment fund",
    icon: IconTarget,
    comingSoon: true,
  },
  {
    name: "Portfolio management services",
    icon: IconSliders,
    comingSoon: true,
  },
  {
    name: "Alternative investment fund",
    icon: IconLayers,
    comingSoon: true,
  },
];

export function SolutionsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Investment &amp; wealth solutions
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            A growing set of ways to build, protect, and structure your wealth.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.08,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {SOLUTIONS.map((solution) => {
            const Icon = solution.icon;

            return (
              <motion.div
                key={solution.name}
                variants={
                  solution.comingSoon
                    ? {
                        // Fade only — no movement, no hover lift, just presence.
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                      }
                    : {
                        hidden: {
                          opacity: 0,
                          y: prefersReducedMotion ? 0 : 16,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }
                }
                className={`flex flex-col rounded-2xl border p-6 transition duration-300 ${
                  solution.comingSoon
                    ? "border-[var(--border)] bg-[var(--muted-bg)]"
                    : "border-[var(--border)] bg-[var(--background)] shadow-sm hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      solution.comingSoon
                        ? "bg-[var(--border)] text-[var(--muted)]"
                        : "bg-[var(--accent-soft)] text-[var(--text)]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  {solution.comingSoon && (
                    <span className="rounded-full bg-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
                      Coming soon
                    </span>
                  )}
                </div>

                <p
                  className={`mt-4 text-sm font-semibold leading-snug ${
                    solution.comingSoon
                      ? "text-[var(--muted)]"
                      : "text-[var(--foreground)]"
                  }`}
                >
                  {solution.name}
                </p>

                {solution.comingSoon ? (
                  <button
                    type="button"
                    disabled
                    className="mt-5 w-fit cursor-not-allowed text-sm font-semibold text-[var(--muted)]"
                  >
                    Explore solutions
                  </button>
                ) : (
                  <a
                    href={solution.href}
                    className="mt-5 w-fit text-sm font-semibold text-[var(--text)] transition hover:underline"
                  >
                    Explore solutions
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
