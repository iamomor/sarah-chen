import React from "react";
import Link from "next/link";
import PropertyCard from "@/features/listings/components/PropertyCard";
import { Property } from "@/types";
import { ArrowRight, Inbox } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodListingsProps {
  name: string;
  slug: string;
  listings: Property[];
}

export default function NeighborhoodListings({
  name,
  slug,
  listings,
}: NeighborhoodListingsProps) {
  const displayedListings = listings.slice(0, 6);
  const totalCount = listings.length;
  const { colors } = agentConfig;

  return (
    <section 
      id="listings" 
      className="relative w-full py-14 sm:py-20 md:py-28 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block mb-2">
            Current Inventory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Homes For Sale in <span className="italic font-light" style={{ color: colors.accent }}>{name}</span>
          </h2>
        </div>

        {/* Listings Content */}
        {totalCount > 0 ? (
          <div className="space-y-12">
            {/* Properties Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayedListings.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  index={index}
                />
              ))}
            </div>

            {/* View All Redirection CTA Bar */}
            <div className="flex justify-center pt-4">
              <Link 
                href={`/listings?neighborhood=${slug}`}
                style={{ 
                  color: colors.accent,
                  borderColor: `${colors.accent}4d` 
                }}
                className="inline-flex items-center gap-2 group font-sans text-[10px] uppercase tracking-widest font-bold hover:text-slate-800 transition-colors duration-300 border-b pb-1"
              >
                <span>View All {totalCount} {name} Listings</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          /* High-converting lead Capture / Empty State */
          <div className="flex flex-col items-center justify-center text-center p-10 md:p-16 bg-[#f9f6f0] border border-slate-200/40 rounded-none space-y-6 max-w-2xl mx-auto shadow-[0_30px_70px_rgba(26,39,68,0.015)] relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-[3px]"
              style={{ backgroundColor: colors.accent }}
            />
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-300 border border-slate-200/50">
              <Inbox className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl text-slate-800 font-normal">
                No Active Listings Found
              </h3>
              <p className="font-sans text-xs text-slate-500 font-light leading-relaxed max-w-md">
                There are currently no active public properties listed in {name}. Please contact us directly to explore exclusive off-market pocket listings and upcoming opportunities.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/contact"
                style={{
                  backgroundColor: colors.primary,
                }}
                className="inline-flex items-center justify-center px-8 py-3.5 text-white font-sans text-[10px] tracking-widest uppercase font-bold transition-all duration-300 hover:opacity-90 shadow-md"
              >
                Inquire Privately
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
