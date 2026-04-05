"use client";

export function ContactForm() {
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-medium text-[var(--foreground)]"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)] focus:ring-2"
          placeholder="Your name"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-[var(--foreground)]"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)] focus:ring-2"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-[var(--foreground)]"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 w-full resize-y rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] outline-none ring-[var(--accent)] focus:ring-2"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-[var(--accent)] py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto sm:px-8"
      >
        Send message
      </button>
    </form>
  );
}
