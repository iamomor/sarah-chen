"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types";
import listingsData from "@/content/listings/listings.json";
import PropertyCard from "@/features/listings/components/PropertyCard";
import { agentConfig } from "@/config/agent.config";

export default function BuyerFeaturedListings() {
  // Grab three active luxury listings from listings.json database
  const activeListings = (listingsData as Property[])
    .filter((p) => p.status === "Active" || p.status === "Coming Soon")
    .slice(0, 3);

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white border-y border-slate-200/60">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-6 bg-[#c9a96e]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                Exclusive Inventory
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1a2744]">
              Curated Collections in <span className="italic font-medium text-[#c9a96e]">{agentConfig.mapCenter.city}</span>
            </h2>
            <p className="text-slate-500 font-light text-xs max-w-lg leading-relaxed">
              We leverage deep industry relationships to source premier residential assets. Preview a selection of our featured opportunities below:
            </p>
          </div>
          <Button
            asChild
            variant="link"
            className="text-[#1a2744] hover:text-[#c9a96e] p-0 h-auto font-bold uppercase tracking-widest text-[10px] border-b-2 border-[#c9a96e] pb-1 hover:no-underline group transition-all"
          >
            <Link href="/listings" className="flex items-center gap-1.5">
              Explore All Listings <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* 3-Column Grid rendering real listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeListings.map((property, idx) => (
            <div
              key={property.id}
              className={idx === 2 ? "sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto sm:w-full" : ""}
            >
              <PropertyCard property={property} index={idx} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
