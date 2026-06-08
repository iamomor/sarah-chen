import React from "react";
import { Metadata } from "next";
import { agentConfig } from "@/config/agent.config";
import listingsData from "@/content/listings/listings.json";
import { Property } from "@/types";
import OpenHouseCard from "@/features/listings/components/OpenHouseCard";

export const metadata: Metadata = {
  title: `Upcoming Open Houses | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description: `Browse upcoming scheduled open houses in central ${agentConfig.mapCenter.city} corridors. Tour these fine residences this weekend without an appointment.`,
};

export default function OpenHousesPage() {
  const listings = listingsData as Property[];
  
  // Filter for properties containing scheduled open house details
  const openHouseProperties = listings.filter(
    (property) => property.status === "Active" && !!property.openHouse
  );

  return (
    <main className="min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 bg-[#f9f6f0]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        {/* Editorial Heading Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
              Weekend Viewings
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight font-serif text-[#1a2744]">
            Upcoming <span className="italic font-light text-[#c9a96e]">Open Houses</span>
          </h1>
          
          <p className="text-slate-500 font-light text-base leading-relaxed">
            Tour these luxury {agentConfig.mapCenter.city} properties this weekend. Fiduciary representation is present on site; no appointment or pre-registration is required.
          </p>
        </div>

        {/* Listings Grid */}
        {openHouseProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {openHouseProperties.map((property) => (
              <OpenHouseCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200/50 max-w-md mx-auto p-8 shadow-sm">
            <p className="text-slate-500 font-light text-sm">
              There are currently no scheduled open houses for this weekend. Please check back later or contact us to arrange a private tour.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
