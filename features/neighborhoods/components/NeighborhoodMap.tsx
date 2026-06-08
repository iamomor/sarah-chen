"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { Property } from "@/types";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodMapProps {
  name: string;
  lat: number;
  lng: number;
  listings?: Property[];
}

// Dynamically import Leaflet Map component to prevent SSR errors
const NeighborhoodLeafletMap = dynamic(
  () => import("./NeighborhoodLeafletMap"),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-50 text-slate-400 font-sans text-[10px] uppercase tracking-widest">
        Loading interactive map...
      </div>
    )
  }
);

export default function NeighborhoodMap({ name, lat, lng, listings = [] }: NeighborhoodMapProps) {
  const { colors } = agentConfig;

  return (
    <section 
      id="map" 
      className="relative w-full py-20 md:py-28 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block mb-2">
            Location & Boundaries
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            {name} <span className="italic font-light" style={{ color: colors.accent }}>Neighborhood Map</span>
          </h2>
        </div>

        {/* Map Container with custom gold border detail frame */}
        <div className="relative w-full h-[450px] md:h-[550px] rounded-none overflow-hidden border border-slate-200/60 shadow-[0_30px_70px_rgba(26,39,68,0.02)]">
          <NeighborhoodLeafletMap name={name} lat={lat} lng={lng} listings={listings} />
        </div>
      </div>
    </section>
  );
}
