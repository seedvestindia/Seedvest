import Image from "next/image";

export function PhotosSection() {
  return (
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
  );
}

