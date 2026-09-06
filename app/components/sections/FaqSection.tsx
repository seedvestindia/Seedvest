"use client";

import { JSX, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";

type CategoryKey =
  | "general"
  | "planning"
  | "investments"
  | "insurance"
  | "real-estate";

type Category = {
  key: CategoryKey;
  label: string;
};

const CATEGORIES: Category[] = [
  { key: "general", label: "General" },
  { key: "planning", label: "Planning" },
  { key: "investments", label: "Investments" },
  { key: "insurance", label: "Insurance" },
  { key: "real-estate", label: "Real estate" },
];

/* ---------- icons (shared visual language with Articles) ---------- */

function IconSparkle({ className }: { className?: string }) {
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
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" />
    </svg>
  );
}

function IconCompass({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 6-6 2 2-6 6-2Z" />
    </svg>
  );
}

function IconTrendingUp({ className }: { className?: string }) {
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
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="14 6 21 6 21 13" />
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

function IconArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const CATEGORY_ICON: Record<
  CategoryKey,
  (props: { className?: string }) => JSX.Element
> = {
  general: IconSparkle,
  planning: IconCompass,
  investments: IconTrendingUp,
  insurance: IconShield,
  "real-estate": IconHome,
};

/* ---------- related articles (mirrors ArticlesSection) ---------- */

type RelatedArticle = {
  title: string;
  category: Exclude<CategoryKey, "general" | "planning">;
};

const RELATED_ARTICLES: RelatedArticle[] = [
  { title: "Why Do You Need a Mutual Fund Advisor?", category: "investments" },
  {
    title: "Why Do You Need a Real Estate Professional?",
    category: "real-estate",
  },
  {
    title: "Why Do You Need an Insurance Professional?",
    category: "insurance",
  },
];

/* ---------- content ---------- */

type FaqItem = {
  q: string;
  category: CategoryKey;
  a: string;
  bullets?: string[];
  closing?: string;
};

const faqItems: FaqItem[] = [
  {
    q: "What is SeedVest?",
    category: "general",
    a: "SeedVest brings financial planning, investments, insurance, and real estate advisory together in one place. We start by understanding your income, expenses, existing investments, liabilities, protection needs, and long-term goals, then help you make decisions aligned with your priorities, not just individual products in isolation.",
  },
  {
    q: "What services do you offer?",
    category: "general",
    a: "We work across four areas: financial planning and advisory, investments and mutual funds, insurance planning, and real estate advisory. Instead of treating these as separate decisions, we coordinate them, portfolio reviews, mutual fund distribution, insurance planning, property guidance, and retirement and goal planning, so they work together.",
  },
  {
    q: "How do you help me plan my finances?",
    category: "planning",
    a: "We start by mapping where you stand today: income, expenses, assets, liabilities, investments, insurance, and goals. Then we help you prioritise and build a strategy around them, an emergency fund, long-term investing, adequate insurance, a home purchase, or retirement. The aim is a structure that's practical and sustainable, not a one-off plan.",
  },
  {
    q: "What's included in the financial planning process?",
    category: "planning",
    a: "Depending on what you need, the process can cover:",
    bullets: [
      "Your current financial position",
      "Short-, medium-, and long-term goals",
      "Existing investments and liabilities",
      "Insurance and protection needs",
      "Your risk profile",
      "Major expenses and purchases",
      "An investment strategy",
      "Retirement planning",
      "Tax implications",
      "Real estate goals",
      "Periodic reviews and updates",
    ],
    closing:
      "The goal isn't to recommend products, it's a framework for better financial decisions over time.",
  },
  {
    q: "Can you help me invest in mutual funds?",
    category: "investments",
    a: "Yes. The right fund depends on your objective, time horizon, risk profile, liquidity needs, and existing portfolio. We help you identify investments that fit those factors, structure them across categories, and review the portfolio periodically. As a Mutual Fund Distributor, the investment is carried out through the applicable distribution framework.",
  },
  {
    q: "Can you review my existing portfolio?",
    category: "investments",
    a: "Yes. A review looks at asset allocation, diversification, concentration, investment horizon, liquidity, fund overlap, and overall structure. If your goals or circumstances have changed, your portfolio may need to change with them, a review helps identify what needs attention.",
  },
  {
    q: "How do you help with insurance planning?",
    category: "insurance",
    a: "Insurance is about protection, not returns. We look at your income, dependants, liabilities, existing coverage, healthcare needs, and long-term commitments to work out what protection makes sense, then walk you through coverage, exclusions, premiums, and terms before you decide.",
  },
  {
    q: "What types of insurance do you help with?",
    category: "insurance",
    a: "We can help you evaluate:",
    bullets: [
      "Term/life insurance, financial protection for your dependants",
      "Health insurance, help managing the cost of medical expenses",
      "General insurance, protection for assets and other applicable risks",
    ],
    closing:
      "The right coverage depends on your situation. We start with the risk, not the premium.",
  },
  {
    q: "Can you help me plan a property purchase or investment?",
    category: "real-estate",
    a: "Real estate is often the largest financial decision you'll make. We help you work through the budget, down payment, loan affordability, expected cash flows, holding period, rental potential, location, and property type, so the decision fits your broader financial plan, whether it's a first home, an upgrade, or an investment.",
  },
  {
    q: "Can you help me find and evaluate a property?",
    category: "real-estate",
    a: "Yes. We help identify properties based on your budget, location, intended use, and objectives, then evaluate pricing, location, connectivity, surrounding development, specifications, rental demand, and investment potential, so the decision is based on more than appearance or marketing.",
  },
  {
    q: "How do you evaluate real estate as an investment?",
    category: "real-estate",
    a: "Beyond the purchase price, we look at entry price, financing, rental potential, expected holding period, liquidity, location, development potential, and how it fits your overall exposure to real estate. That lets you compare a property against your other goals and investment options, not just judge it on its own.",
  },
  {
    q: "Can you help me plan for retirement?",
    category: "planning",
    a: "Yes. We start with your current age, target retirement age, lifestyle expectations, current savings and investments, inflation, income sources, and likely healthcare costs, then translate that into an investment strategy you can adjust as your circumstances change.",
  },
  {
    q: "How do you align my investments, insurance, and real estate?",
    category: "planning",
    a: "These decisions affect each other, a large home loan can limit how much you invest, and inadequate insurance can put your goals at risk if something goes wrong. We look at your investments, insurance, real estate, liabilities, and cash flow together, so you get the right balance instead of optimising one area at the expense of another.",
  },
  {
    q: "How often should my plan be reviewed?",
    category: "planning",
    a: "As often as your life changes. A new job, marriage, a child, a home purchase, a business, an inheritance, or approaching retirement can all shift your strategy. We recommend a periodic review plus a check-in whenever something significant changes, to keep your investments, insurance, and allocation aligned.",
  },
  {
    q: "How do I get started?",
    category: "general",
    a: "With a conversation. Tell us what you're working towards, wealth, mutual funds, protecting your family, a property, retirement, or a full plan, and we'll look at your existing finances, flag what needs attention, and recommend the right advisory, investment, insurance, or real estate services from there.",
  },
];

/* ---------- accordion row ---------- */

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const slug = item.q
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const buttonId = `faq-${slug}-button`;
  const panelId = `faq-${slug}-panel`;
  const Icon = CATEGORY_ICON[item.category];

  return (
    <div>
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center gap-3 px-4 py-4 text-left transition hover:bg-[var(--muted-bg)] sm:px-5"
        >
          {/* <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
              isOpen
                ? "bg-[var(--accent)] text-[var(--text)]"
                : "bg-[var(--accent-soft)] text-white"
            }`}
          >
            <Icon className="h-4 w-4" />
          </span> */}

          <span
            className={`min-w-0 flex-1 text-sm font-semibold transition-colors sm:text-base ${
              isOpen
                ? "text-[var(--foreground)]"
                : "text-[var(--foreground)]/90"
            }`}
          >
            {item.q}
          </span>

          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="shrink-0 text-[var(--muted)]"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pl-12 pr-4 sm:px-5 sm:pl-14">
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {item.a}
              </p>

              {item.bullets && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--muted)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}

              {item.closing && (
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.closing}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- section ---------- */

export function FaqSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryKey | "all">("all");
  const [openQuestion, setOpenQuestion] = useState<string | null>(
    faqItems[0]?.q ?? null,
  );

  const filteredItems = useMemo(
    () =>
      activeFilter === "all"
        ? faqItems
        : faqItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  useEffect(() => {
    const first =
      activeFilter === "all"
        ? faqItems[0]
        : faqItems.find((item) => item.category === activeFilter);
    setOpenQuestion(first?.q ?? null);
  }, [activeFilter]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2
              id="faq-heading"
              className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl"
            >
              FAQ
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Answers to what people usually ask before working with us, grouped
              by topic.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr_260px] lg:gap-10">
            {/* left: category nav */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <nav
                className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
                role="group"
                aria-label="Filter FAQs by topic"
              >
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className="relative shrink-0 rounded-lg px-3.5 py-2 text-left text-sm font-medium"
                >
                  {activeFilter === "all" && (
                    <motion.span
                      layoutId="faq-active-filter"
                      className="absolute inset-0 rounded-lg bg-[var(--accent)]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 34,
                      }}
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-2 ${
                      activeFilter === "all"
                        ? "text-white"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    <IconSparkle className="h-4 w-4" />
                    All questions
                  </span>
                </button>

                {CATEGORIES.map((category) => {
                  const Icon = CATEGORY_ICON[category.key];
                  return (
                    <button
                      key={category.key}
                      type="button"
                      onClick={() => setActiveFilter(category.key)}
                      className="relative shrink-0 rounded-lg px-3.5 py-2 text-left text-sm font-medium"
                    >
                      {activeFilter === category.key && (
                        <motion.span
                          layoutId="faq-active-filter"
                          className="absolute inset-0 rounded-lg bg-[var(--accent)]"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 34,
                          }}
                        />
                      )}
                      <span
                        className={`relative z-10 flex items-center gap-2 ${
                          activeFilter === category.key
                            ? "text-white"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* middle: accordion list */}
            <div className="min-w-0 max-w-2xl">
              <motion.div
                layout
                className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] divide-y divide-[var(--border)]"
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.q}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <FaqRow
                        item={item}
                        isOpen={openQuestion === item.q}
                        onToggle={() =>
                          setOpenQuestion((prev) =>
                            prev === item.q ? null : item.q,
                          )
                        }
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* right: contact CTA + related articles */}
            <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start lg:space-y-6">
              <a
                href="#contact"
                className="block rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition hover:border-[var(--accent)]/40"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Still have questions?
                </p>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Talk to us directly, no obligation.
                </p>
              </a>

              <div>
                <p className="px-1 text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
                  Related reading
                </p>
                <div className="mt-3 space-y-1">
                  {RELATED_ARTICLES.map((article) => {
                    const Icon = CATEGORY_ICON[article.category];
                    return (
                      <a
                        key={article.title}
                        href="#articles"
                        className="group flex items-start gap-2.5 rounded-lg p-2 transition hover:bg-[var(--accent-soft)]/45"
                      >
                        {/* <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                          <Icon className="h-3.5 w-3.5" />
                        </span> */}
                        <span className="flex-1 text-sm leading-snug text-[var(--foreground)]/90 transition group-hover:text-[var(--foreground)]">
                          {article.title}
                        </span>
                        <IconArrow className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--muted)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--text)]" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
