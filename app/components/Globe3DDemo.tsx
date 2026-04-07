"use client";

import { Globe3D, GlobeMarker } from "@/components/ui/3d-globe";

const sampleMarkers: GlobeMarker[] = [
  {
    lat: 19.1197,
    lng: 72.8468,
    src: "https://assets.aceternity.com/avatars/8.webp",
    label: "Andheri",
  },
];

export function Globe3DDemo() {
  return (
    <Globe3D
      markers={sampleMarkers}
      config={{
        atmosphereColor: "#4da6ff",
        atmosphereIntensity: 12, // softer glow
        bumpScale: 500,
        autoRotateSpeed: 0.15, // slower premium rotation
      }}
      onMarkerClick={(marker) => {
        console.log("Clicked marker:", marker.label);
      }}
      onMarkerHover={(marker) => {
        if (marker) {
          console.log("Hovering:", marker.label);
        }
      }}
    />
  );
}
