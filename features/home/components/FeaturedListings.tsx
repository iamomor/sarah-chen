"use client";

import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";
import PropertyCard from "@/features/listings/components/PropertyCard";
import listingsData from "@/content/listings/listings.json";
import { Property } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedListings() {
  const { colors, address } = agentConfig;
  const listings = listingsData as Property[];
  
  // Try to extract city from address, otherwise fallback
  const cityMatch = address.match(/,\s*([^,]+),\s*[A-Z]{2}\s+\d{5}/);
  const city = cityMatch ? cityMatch[1] : "Our Area";
  
  // Show 6 featured/active listings for the home section, sorted by price desc
  const featured = listings
    .filter(l => l.status === "Active")
    .sort((a, b) => b.price - a.price)
    .slice(0, 6);

  return (
    <section className="w-full py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12" style={{ backgroundColor: colors.accent }} />
              <span 
                className="text-[10px] font-bold uppercase tracking-[0.4em]" 
                style={{ color: colors.accent }}
              >
                Current Listings
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] text-foreground">
              Exceptional Properties in <span className="font-serif italic" style={{ color: colors.accent }}>{city}&apos;s</span> Most Sought-After Neighborhoods
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              href="/listings" 
              className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors"
            >
              View All {listings.filter(l => l.status === "Active").length} Listings
              <div 
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:text-white"
                style={{ 
                  borderColor: colors.accent,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featured.map((property, index) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
