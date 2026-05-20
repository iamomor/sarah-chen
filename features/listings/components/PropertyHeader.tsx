"use client";

import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatArea, formatPrice, slugify } from "@/lib/utils";
import type { Property } from "@/types";
import Link from "next/link";

interface PropertyHeaderProps {
  property: Property;
}

export default function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div 
      className="flex flex-col items-center text-center py-16 lg:py-20"
      style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <Link
        href={`/neighborhoods/${slugify(property.address.neighborhood)}`}
        className="text-[12px] font-medium uppercase tracking-[0.25em] transition-colors mb-6 hover:opacity-70"
        style={{ color: agentConfig.colors.accent }}
      >
        {property.address.neighborhood}
      </Link>

      <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif mb-6 tracking-tight max-w-4xl leading-[1.2]" style={{ color: "#1a2744" }}>
        {property.address.street}
      </h1>
      
      <p className="text-[18px] font-normal tracking-wide mb-12" style={{ color: "#6b7280" }}>
        {property.address.city}, {property.address.state} {property.address.zip}
      </p>

      <div className="text-3xl md:text-[32px] font-serif mb-12" style={{ color: "#1a2744" }}>
        {formatPrice(property.price)}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[14px] uppercase tracking-[0.2em] font-medium" style={{ color: "#1a1a1a" }}>
        <span>{property.details.beds} BEDS</span>
        <span style={{ color: "rgba(0,0,0,0.08)" }}>|</span>
        <span>
          {property.details.baths}
          {property.details.halfBaths ? ".5" : ""} BATHS
        </span>
        <span style={{ color: "rgba(0,0,0,0.08)" }}>|</span>
        <span>{formatArea(property.details.sqft)}</span>
        {property.details.lotSize && (
          <>
            <span style={{ color: "rgba(0,0,0,0.08)" }}>|</span>
            <span>{property.details.lotSize} ACRES</span>
          </>
        )}
      </div>
      
      <div className="mt-10 text-[12px] uppercase tracking-widest font-medium flex gap-6" style={{ color: "#6b7280" }}>
        <span>{property.status}</span>
        {property.financials.mlsNumber && (
          <span>{region.listingPlatform}# {property.financials.mlsNumber}</span>
        )}
      </div>
    </div>
  );
}
