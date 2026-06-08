"use client";

import { agentConfig } from "@/config/agent.config";
import listingsData from "@/content/listings/listings.json";
import PropertyCard from "@/features/listings/components/PropertyCard";
import { Property } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedListings() {
  const { colors, address } = agentConfig;
  const listings = listingsData as Property[];

  // Extract city from address
  const cityMatch = address.match(/,\s*([^,]+),\s*[A-Z]{2}\s+\d{5}/);
  const city = cityMatch ? cityMatch[1] : "Our Area";

  // Show 3 premium active listings — curated, not overwhelming
  const featured = listings
    .filter((l) => l.status === "Active")
    .sort((a, b) => b.price - a.price)
    .slice(0, 6);

  const totalActive = listings.filter((l) => l.status === "Active").length;

  return (
    <section className="w-full py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-[2px] w-10"
                style={{ backgroundColor: colors.accent }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: colors.primary }}
              >
                Curated Listings
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]"
              style={{ color: colors.text }}
            >
              Exceptional Properties in{" "}
              <span
                className="font-serif italic"
                style={{ color: colors.primary }}
              >
                {city}
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/listings"
              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300"
              style={{ color: colors.text }}
            >
              <span>View All {totalActive} Listings</span>
              <div
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:text-white"
                style={{ borderColor: colors.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* 3 Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
