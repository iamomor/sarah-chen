"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bath, Bed, Square } from "lucide-react";

import { region } from "@/config/region.config";
import { cn, formatArea, formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

interface CompactPropertyCardProps {
  property: Property;
  isSelected: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
}

export default function CompactPropertyCard({
  property,
  isSelected,
  onSelect,
  onHover,
  onLeave,
}: CompactPropertyCardProps) {
  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "flex gap-4 p-4 bg-white border rounded-lg transition-all duration-500 group mb-4 relative overflow-hidden cursor-pointer",
        isSelected
          ? "border-accent shadow-xl ring-1 ring-accent/20"
          : "border-border/50 hover:border-accent hover:shadow-lg",
      )}
    >
      {/* Photo with zoom effect */}
      <div className="relative w-28 h-28 shrink-0 rounded-sm overflow-hidden bg-gray-50 z-0">
        <Image
          src={
            property.photos[0] ||
            "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800&auto=format&fit=crop"
          }
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 z-0"
          alt={property.address.street}
          sizes="112px"
        />
        <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm rounded-sm">
          {property.status}
        </div>
      </div>

      {/* Elegant Details */}
      <div className="flex flex-col justify-center min-w-0 flex-1">
        <div className="text-xl font-bold tracking-tight text-foreground mb-0.5">
          {formatPrice(property.price, region.currency, region.language)}
        </div>
        <div className="text-xs font-medium truncate text-foreground/80 mb-2">
          {property.address.street}
          <span className="text-muted-foreground font-normal ml-1">
            · {property.address.neighborhood}
          </span>
        </div>

        {/* Fine Stats */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3 h-3 text-accent/60" />
            <span className="text-foreground font-bold">
              {property.details.beds}
            </span>{" "}
            BD
          </div>
          <div className="w-px h-2.5 bg-border" />
          <div className="flex items-center gap-1.5">
            <Bath className="w-3 h-3 text-accent/60" />
            <span className="text-foreground font-bold">
              {property.details.baths}
            </span>{" "}
            BA
          </div>
          <div className="w-px h-2.5 bg-border" />
          <div className="flex items-center gap-1.5">
            <Square className="w-3 h-3 text-accent/60" />
            <span className="text-foreground font-bold">
              {formatArea(property.details.sqft)}
            </span>
          </div>
        </div>
      </div>

      {/* Discrete Link Icon */}
      <div
        className={cn(
          "absolute bottom-4 right-4 transition-all duration-300",
          isSelected
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0",
        )}
      >
        <Link href={`/listings/${property.slug}`}>
          <ArrowUpRight className="w-4 h-4 text-accent hover:scale-125 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
