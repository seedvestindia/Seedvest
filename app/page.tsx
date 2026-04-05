import Image from "next/image";
import { ContactForm } from "./components/ContactForm";

const articles = [
  {
    title: "Building a balanced portfolio",
    excerpt:
      "How to align property, equities, and protection so your plan stays steady through market cycles.",
    date: "Mar 2026",
  },
  {
    title: "Insurance beyond the basics",
    excerpt:
      "The questions worth asking before you renew—so coverage matches how your life actually looks.",
    date: "Feb 2026",
  },
  {
    title: "Tools that save real time",
    excerpt:
      "A shortlist of calculators and workflows we use with clients to keep decisions clear and fast.",
    date: "Jan 2026",
  },
];

const faqItems = [
  {
    q: "How do I get started?",
    a: "Use Contact Us or WhatsApp to share your goals. We will suggest a short intro call and outline next steps—no obligation.",
  },
  {
    q: "Do you cover all areas you list in the header?",
    a: "Yes. Real estate, investments, insurance, and planning tools are part of how we help clients see the full picture.",
  },
  {
    q: "Is my information kept private?",
    a: "We treat conversations and documents as confidential and only use them to support your planning.",
  },
];

export default function Home() {
  return (
    <>
      <section
        className="border-b border-[var(--border)] bg-[var(--surface)]"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-medium uppercase tracking-wider text-[var(--accent)]">
            Welcome
          </p>
          <h1
            id="hero-heading"
            className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl"
          >
            Plan your wealth with clarity and calm
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)]">
            SeedVest brings together property, investments, insurance, and
            practical tools—so you can move forward with a single, coherent
            strategy.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Contact Us
            </a>
            <a
              href="mailto:test@example.com"
              className="text-sm font-medium text-[var(--muted)] underline-offset-4 transition hover:text-[var(--foreground)] hover:underline"
            >
              test
            </a>
          </div>
        </div>
      </section>

      <section
        id="photos"
        className="border-b border-[var(--border)] py-16 sm:py-20"
        aria-labelledby="photos-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="photos-heading"
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Photos
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            A glimpse of spaces, milestones, and the environments where great
            plans take shape.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <figure
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={`https://picsum.photos/seed/seedvest${i}/800/600`}
                    alt={`Gallery image ${i}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <figcaption className="border-t border-[var(--border)] px-4 py-3 text-xs text-[var(--muted)]">
                  Placeholder photo {i} — replace with your imagery
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20"
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
                Real-Estate
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
              <h3 className="font-semibold text-[var(--foreground)]">Tools</h3>
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
              A playful way to think about style: steady tortoise, curious fox,
              or bold lion—each has strengths in how they approach risk.
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

      <section
        className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20"
        aria-labelledby="animal-details-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="animal-details-heading"
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Details for “Know your animal”
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Use this as a conversation starter in workshops or onboarding. Swap
            copy anytime to match your brand voice.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Tortoise
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Prefers stability, long horizons, and predictable cash flow.
                Great match for indexed strategies and core property holdings.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Fox
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Curious and tactical—likes to test ideas with small bets before
                scaling. Benefits from clear guardrails and regular reviews.
              </p>
            </li>
            <li className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                Lion
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Comfortable with volatility when upside aligns with goals.
                Needs explicit risk budgets and insurance that keeps pace.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section
        id="articles"
        className="border-b border-[var(--border)] py-16 sm:py-20"
        aria-labelledby="articles-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2
            id="articles-heading"
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            Articles
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
            Practical notes from our desk—swap titles and excerpts with your own
            posts when ready.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {articles.map((a) => (
              <article
                key={a.title}
                className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:border-[var(--accent)]/40"
              >
                <time
                  dateTime={a.date}
                  className="text-xs font-medium uppercase tracking-wider text-[var(--accent)]"
                >
                  {a.date}
                </time>
                <h3 className="mt-2 text-lg font-semibold text-[var(--foreground)]">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  {a.excerpt}
                </p>
                <span className="mt-4 text-sm font-medium text-[var(--accent)]">
                  Read more →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
          >
            FAQ
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Quick answers—expand each question for more detail.
          </p>
          <div className="mt-8 space-y-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-1 open:pb-4"
              >
                <summary className="cursor-pointer list-none py-3 text-sm font-semibold text-[var(--foreground)] outline-none marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {item.q}
                    <span className="text-[var(--muted)] transition group-open:rotate-180">
                      ▼
                    </span>
                  </span>
                </summary>
                <p className="border-t border-[var(--border)] pt-3 text-sm leading-relaxed text-[var(--muted)]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-16 sm:py-24"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="border-b border-[var(--border)] p-8 lg:border-b-0 lg:border-r lg:p-10">
                <h2
                  id="contact-heading"
                  className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
                >
                  Contact
                </h2>
                <p className="mt-2 text-sm text-[var(--muted)]">
                  Tell us what you are working toward. We will respond with
                  sensible next steps.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
                  <li>
                    <span className="font-medium text-[var(--foreground)]">
                      Email
                    </span>
                    <br />
                    <a
                      href="mailto:hello@seedvest.example"
                      className="text-[var(--accent)] hover:underline"
                    >
                      hello@seedvest.example
                    </a>
                  </li>
                  <li>
                    <span className="font-medium text-[var(--foreground)]">
                      WhatsApp
                    </span>
                    <br />
                    <a
                      href="https://wa.me/8169546916"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline"
                    >
                      Open chat
                    </a>
                  </li>
                </ul>
              </div>
              <div className="p-8 lg:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
