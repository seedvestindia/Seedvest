import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/15551234567";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold text-[var(--foreground)]">
              SeedVest
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted)]">
              Clear guidance for real estate, investments, insurance, and the
              tools you need to plan with confidence.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#photos"
                  className="text-[var(--foreground)] hover:underline"
                >
                  Photos
                </a>
              </li>
              <li>
                <a
                  href="#articles"
                  className="text-[var(--foreground)] hover:underline"
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-[var(--foreground)] hover:underline"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Contact
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href="#contact"
                  className="text-[var(--foreground)] hover:underline"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--foreground)] hover:underline"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} SeedVest. All rights reserved.
          </p>
          <Link
            href="/"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Back to top
          </Link>
        </div>
      </div>
    </footer>
  );
}
