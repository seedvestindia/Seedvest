import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/8169546916";

function IconInstagram({ className }: { className?: string }) {
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
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLinkedin({ className }: { className?: string }) {
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
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10.5V17M8 7.5v.01M12.5 17v-4a2 2 0 0 1 4 0v4M12.5 10.5V17" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
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
      <path d="M14.5 8.5h2V5.5h-2c-2 0-3.5 1.5-3.5 3.5v2h-2v3h2V21h3v-7h2.3l.7-3h-3v-1.5c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function IconYoutube({ className }: { className?: string }) {
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
      <rect x="3" y="6.5" width="18" height="11" rx="3" />
      <path
        d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/seedvest.in/",
    icon: IconInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/seedvest-835425415/",
    icon: IconLinkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61591058955716",
    icon: IconFacebook,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCxrJat6aEGpsnvgdhGWSmjw",
    icon: IconYoutube,
  },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-2)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Link columns */}
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
                  href="#top"
                  className="text-[var(--foreground)] hover:underline"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#solutions"
                  className="text-[var(--foreground)] hover:underline"
                >
                  Solutions
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
                <a href="#contact" className="text-[var(--foreground)] hover:underline">
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

        {/* Office + social row */}
        <div className="mt-10 grid md:flex justify-between gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-2 lg:grid-cols-2">
          {/* <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Registered office
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--foreground)]">
              [Entity name]
              <br />
              [Address line 1, Address line 2]
              <br />
              [City – Pincode]
            </p>
          </div> */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Your data security is a priority
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              Built on secure infrastructure with encryption and standard
              safeguards for your information.
            </p>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Find us on
            </p>
            <div className="mt-3 flex gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright + legal */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--muted)]">
            © {year} SeedVest. All rights reserved.
          </p>
          <Link
            href="#top"
            className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Back to top
          </Link>
        </div>

        {/* Disclaimer — fill in only what actually applies to your registration status */}
        <p className="mt-6 text-[11px] leading-relaxed text-[var(--muted)]">
          Investments in securities market are subject to market risks. Read all
          related documents carefully before investing. The securities quoted
          are for illustration only and are not recommendatory.
        </p>
      </div>
    </footer>
  );
}
