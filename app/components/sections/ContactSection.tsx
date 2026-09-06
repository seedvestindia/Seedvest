"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ContactForm } from "../ContactForm";

function IconPhone({ className }: { className?: string }) {
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
      <path d="M5.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C11.4 18.7 5.3 12.6 4 6.6A1.5 1.5 0 0 1 5.5 4Z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
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
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

function IconMessageCircle({ className }: { className?: string }) {
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
      <path d="M12 20c4.7 0 8.5-3.4 8.5-7.5S16.7 5 12 5s-8.5 3.4-8.5 7.5c0 1.6.6 3.1 1.6 4.3L4.5 20l3.6-1.1c1.2.7 2.5 1.1 3.9 1.1Z" />
    </svg>
  );
}

const PHONE_NUMBER = "+918169546916";
const EMAIL_ADDRESS = "seedvestindia@gmail.com";
const WHATSAPP_URL = "https://wa.me/8169546916";

const CONTACT_METHODS = [
  {
    icon: IconPhone,
    label: "Call us",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`,
    caption: null,
  },
  {
    icon: IconMail,
    label: "Email us",
    value: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}`,
    caption: "For financial planning & general enquiries",
  },
];

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="py-16 sm:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            {/* Left: intro + direct contact methods */}
            <div className="border-b border-[var(--border)] p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2
                id="contact-heading"
                className="text-2xl font-semibold tracking-tight text-[var(--foreground)]"
              >
                Let&apos;s build your financial roadmap
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                Tell us where you are today and what you&apos;re working toward.
                We&apos;ll help you understand your options and identify the
                right next steps.
              </p>

              <motion.ul
                className="mt-8 space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: prefersReducedMotion ? 0 : 0.12,
                      delayChildren: 0.15,
                    },
                  },
                }}
              >
                {CONTACT_METHODS.map(
                  ({ icon: Icon, label, value, href, caption }) => (
                    <motion.li
                      key={label}
                      className="flex gap-3"
                      variants={{
                        hidden: {
                          opacity: 0,
                          x: prefersReducedMotion ? 0 : -12,
                        },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      <motion.span
                        whileHover={
                          prefersReducedMotion
                            ? undefined
                            : { scale: 1.1, rotate: -6 }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                        }}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--text)]"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {label}
                        </p>
                        <a
                          href={href}
                          className="mt-0.5 block text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] hover:underline"
                        >
                          {value}
                        </a>
                        {caption && (
                          <p className="mt-0.5 text-xs text-[var(--muted)]">
                            {caption}
                          </p>
                        )}
                      </div>
                    </motion.li>
                  ),
                )}

                <motion.li
                  className="flex gap-3"
                  variants={{
                    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -12 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <motion.span
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { scale: 1.1, rotate: -6 }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--text)]"
                  >
                    <IconMessageCircle className="h-4 w-4" />
                  </motion.span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      WhatsApp us
                    </p>
                    <p className="mt-0.5 text-sm text-[var(--muted)]">
                      Chat with an advisor
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-[var(--text)] hover:underline"
                    >
                      Start a conversation
                    </a>
                  </div>
                </motion.li>
              </motion.ul>
            </div>

            {/* Right: form */}
            <div className="p-8 lg:p-10">
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
