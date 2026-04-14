"use client";

import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 19.1197,
    lng: 72.8468,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Andheri",
  },
];

export function Globe3DDemo({ globeSpeed }: { globeSpeed: number }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="w-full h-full"
      style={
        !isDark
          ? {
              filter: "contrast(0.9) brightness(1.6)",
            }
          : undefined
      }
    >
      <Globe3D
        key={resolvedTheme}
        markers={sampleMarkers}
        config={{
          bumpScale: 100,
          autoRotateSpeed: globeSpeed,
        }}
      />
    </div>
  );
}
