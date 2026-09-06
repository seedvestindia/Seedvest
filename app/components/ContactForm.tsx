"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SERVICES = [
  "Financial Planning",
  "Mutual Funds & Investments",
  "Insurance",
  "Real Estate",
  "Investment Portfolio Review",
  "Other",
];

type FieldName = "name" | "phone" | "service" | "message";
type Status = "idle" | "submitting" | "success" | "error";

function validateField(field: FieldName, value: string): string | undefined {
  switch (field) {
    case "name": {
      const trimmed = value.trim();
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length < 2) return "Name looks too short.";
      if (!/^[a-zA-Z\s.'-]+$/.test(trimmed))
        return "Name can only contain letters.";
      return undefined;
    }
    case "phone": {
      const digits = value.replace(/\D/g, "");
      if (!digits) return "Please enter your phone number.";
      if (digits.length < 10) return "Enter a valid 10-digit phone number.";
      if (digits.length > 13) return "That number has too many digits.";
      return undefined;
    }
    case "service": {
      if (!value) return "Please select what you need help with.";
      return undefined;
    }
    case "message": {
      if (value.length > 600) return "Keep it under 600 characters.";
      return undefined;
    }
  }
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — real users never fill this in

  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {},
  );

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const values: Record<FieldName, string> = { name, phone, service, message };
  const setters: Record<FieldName, (v: string) => void> = {
    name: setName,
    phone: setPhone,
    service: setService,
    message: setMessage,
  };

  function handleChange(field: FieldName, value: string) {
    setters[field](value);
    // Once a field has been touched, re-validate live so the error clears as soon as it's fixed.
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }));
  }

  function validateAll(): boolean {
    const fields: FieldName[] = ["name", "phone", "service", "message"];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    fields.forEach((field) => {
      const err = validateField(field, values[field]);
      if (err) nextErrors[field] = err;
    });
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, service: true, message: true });
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (!validateAll()) {
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/google-sheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, service, message, company }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      }

      setStatus("success");
      setName("");
      setPhone("");
      setService("");
      setMessage("");
      setErrors({});
      setTouched({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  }

  function fieldClassName(field: FieldName) {
    const hasError = Boolean(errors[field]);
    return `mt-1.5 w-full rounded-lg border bg-[var(--background)] px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] transition-all duration-200 focus:ring-2 ${
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
        : "border-[var(--border)] focus:border-[var(--text)] focus:ring-[var(--text)]/10"
    }`;
  }

  function FieldError({ field }: { field: FieldName }) {
    return (
      <AnimatePresence>
        {errors[field] && (
          <motion.p
            key={errors[field]}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 6 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden text-xs text-red-600"
            role="alert"
          >
            {errors[field]}
          </motion.p>
        )}
      </AnimatePresence>
    );
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 text-center sm:p-8"
      >
        <motion.svg
          viewBox="0 0 52 52"
          className="h-14 w-14"
          initial="hidden"
          animate="visible"
        >
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="2"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          />
          <motion.path
            d="M15 27l7 7 15-15"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.45,
                },
              },
            }}
          />
        </motion.svg>

        <p className="mt-4 text-base font-semibold text-[var(--foreground)]">
          Thanks — we&apos;ve got your message.
        </p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Someone from our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-[var(--text)] hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Honeypot field — hidden from real users, bots tend to fill every input */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={fieldClassName("name")}
        />
        <div id="name-error">
          <FieldError field="name" />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          Phone No.
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+91 XXXXX XXXXX"
          value={phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          onBlur={() => handleBlur("phone")}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : undefined}
          className={fieldClassName("phone")}
        />
        <div id="phone-error">
          <FieldError field="phone" />
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          What can we help you with?
        </label>
        <select
          id="service"
          value={service}
          onChange={(e) => handleChange("service", e.target.value)}
          onBlur={() => handleBlur("service")}
          aria-invalid={Boolean(errors.service)}
          aria-describedby={errors.service ? "service-error" : undefined}
          className={fieldClassName("service")}
        >
          <option value="" disabled>
            Select a service
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div id="service-error">
          <FieldError field="service" />
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-sm font-medium text-[var(--foreground)]"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us what you're looking to achieve..."
          value={message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`resize-none ${fieldClassName("message")}`}
        />
        <div id="message-error">
          <FieldError field="message" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === "error" && (
          <motion.p
            key="error"
            role="alert"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: prefersReducedMotion ? 0 : [0, -6, 6, -4, 4, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={
          status === "submitting" || prefersReducedMotion
            ? undefined
            : { scale: 1.015 }
        }
        whileTap={
          status === "submitting" || prefersReducedMotion
            ? undefined
            : { scale: 0.985 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="w-full rounded-lg bg-[var(--foreground)] px-4 py-2.5 text-sm font-semibold text-[var(--background)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              className="h-3.5 w-3.5 rounded-full border-2 border-[var(--background)] border-t-transparent"
              animate={prefersReducedMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
            />
            Sending...
          </span>
        ) : (
          "Start a conversation"
        )}
      </motion.button>
    </motion.form>
  );
}
