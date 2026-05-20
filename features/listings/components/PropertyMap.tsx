"use client";

import dynamic from "next/dynamic";
import type { Property } from "@/types";

// MapView — Leaflet breaks on SSR, so it MUST be dynamically imported with ssr: false
const MapView = dynamic(
  () => import("@/features/listings/components/MapView"),
  { ssr: false },
);

interface PropertyMapProps {
  property: Property;
}

export default function PropertyMap({ property }: PropertyMapProps) {
  return (
    <MapView
      properties={[property]}
      onPropertySelect={() => {}}
      activePropertyId={property.id}
    />
  );
}
