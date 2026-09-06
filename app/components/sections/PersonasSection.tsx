"use client";

import { JSX, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type PersonaKey =
  | "professionals"
  | "business-owners"
  | "salaried"
  | "young-earner";

type Persona = {
  key: PersonaKey;
  label: string;
  quote: string;
  response: string;
};

const PERSONAS: Persona[] = [
  {
    key: "professionals",
    label: "Professionals",
    quote: "I have a high income. Why do I need to invest?",
    response:
      "A high income without a strategy still leaves gaps, tax efficiency, protection, and a plan for what happens if that income stops. We help structure what you earn into something durable.",
  },
  {
    key: "business-owners",
    label: "Business owners",
    quote: "I have my business. Why should I invest elsewhere?",
    response:
      "Your business is one asset, concentrated in one place. Investing outside it builds a safety net that doesn't rise and fall with your company, and gives you options if the business ever needs one.",
  },
  {
    key: "salaried",
    label: "Salaried professional",
    quote: "I earn every month. Isn't my salary enough?",
    response:
      "A steady salary covers today. It's a separate question whether it's building toward your goals, retirement, a home, your children's future, at the pace you actually need.",
  },
  {
    key: "young-earner",
    label: "Young earner",
    quote: "I've just started earning. Why should I invest now?",
    response:
      "Time is the one advantage that only gets smaller. Starting now, even modestly, does more work than starting later with more money, because compounding needs years, not just capital.",
  },
];

function IconBriefcase({ className }: { className?: string }) {
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
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M8 7.5V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5M3 13h18" />
    </svg>
  );
}

function IconBuilding({ className }: { className?: string }) {
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
      <rect x="4" y="3.5" width="10" height="17" rx="1" />
      <rect x="14" y="9.5" width="6" height="11" rx="1" />
      <path d="M7.5 7.5h1M11 7.5h1M7.5 11h1M11 11h1M7.5 14.5h1M11 14.5h1" />
    </svg>
  );
}

function IconWallet({ className }: { className?: string }) {
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
      <path d="M3 8a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z" />
      <path d="M3 8V6a2 2 0 0 1 2-2h9" />
      <circle cx="16.5" cy="13" r="1.25" />
    </svg>
  );
}

function IconSprout({ className }: { className?: string }) {
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
      <path d="M12 21V11" />
      <path d="M12 11c0-3 2-5 6-5 0 3.5-2.5 5.5-6 5.5" />
      <path d="M12 13c0-2.5-1.8-4.2-5-4.2 0 2.9 2 4.7 5 4.7" />
    </svg>
  );
}

const PERSONA_ICON: Record<
  PersonaKey,
  (props: { className?: string }) => JSX.Element
> = {
  professionals: IconBriefcase,
  "business-owners": IconBuilding,
  salaried: IconWallet,
  "young-earner": IconSprout,
};

export function PersonasSection() {
  const [expanded, setExpanded] = useState<PersonaKey | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-b border-[var(--border)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-2xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Does this sound like you?
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Everyone has a different reason for delaying, avoiding, or
            questioning investments. See if one of these sounds familiar.
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
                staggerChildren: prefersReducedMotion ? 0 : 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {PERSONAS.map((persona) => {
            const Icon = PERSONA_ICON[persona.key];
            const isOpen = expanded === persona.key;

            return (
              <motion.div
                key={persona.key}
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="group flex flex-col h-fit rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-lg"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full group-hover:bg-[var(--text)] group-hover:text-white bg-[var(--accent-soft)] text-[var(--text)] duration-300">
                  <Icon className="h-5 w-5" />
                </span>

                <p className="mt-4 text-sm font-semibold text-[var(--foreground)]">
                  {persona.label}
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-[var(--muted)]">
                  “{persona.quote}”
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 border-t border-[var(--border)] pt-3 text-sm leading-relaxed text-[var(--muted)]">
                        {persona.response}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() =>
                    setExpanded((prev) =>
                      prev === persona.key ? null : persona.key,
                    )
                  }
                  aria-expanded={isOpen}
                  className="mt-5 w-fit text-sm font-semibold text-[var(--text)] transition hover:underline"
                >
                  {isOpen ? "Show less" : "Know more"}
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
