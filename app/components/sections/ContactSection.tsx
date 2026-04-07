import { ContactForm } from "../ContactForm";

export function ContactSection() {
  return (
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
  );
}

