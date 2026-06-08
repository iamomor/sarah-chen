import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Neighborhood } from "@/types";
import { region } from "@/config/region.config";

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export default function NeighborhoodCard({ neighborhood }: NeighborhoodCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(region.language === "en" ? "en-US" : region.language, {
      style: "currency",
      currency: region.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const shortDesc =
    neighborhood.description.length > 150
      ? neighborhood.description.substring(0, 150) + "..."
      : neighborhood.description;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
      {/* Hero Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={neighborhood.heroImage}
          alt={neighborhood.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h2 className="text-2xl font-serif font-bold leading-tight group-hover:text-accent transition-colors">
            {neighborhood.name}
          </h2>
          <p className="text-xs text-gray-200 line-clamp-1 italic">{neighborhood.tagline}</p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4 pb-4 mb-4 border-b border-gray-100 text-sm">
          <div>
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Avg Price</span>
            <span className="font-semibold text-primary">
              {formatPrice(neighborhood.stats.avgPrice)}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block uppercase tracking-wider">Active Listings</span>
            <span className="font-semibold text-primary">
              {neighborhood.stats.activeListings} Properties
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
          {shortDesc}
        </p>

        {/* Highlight Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {neighborhood.highlights.slice(0, 3).map((pill, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full border border-gray-200"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Button */}
        <Link
          href={`/neighborhoods/${neighborhood.slug}`}
          className="w-full text-center py-3 bg-primary hover:bg-accent text-white font-medium rounded transition-colors duration-300 uppercase tracking-wider text-xs"
        >
          Explore {neighborhood.name} →
        </Link>
      </div>
    </div>
  );
}
