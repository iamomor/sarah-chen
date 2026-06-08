"use client";

import React from "react";
import Image from "next/image";
import { region } from "@/config/region.config";

export default function PricingStrategy() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#1a2744] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Block */}
          <div className="lg:col-span-5 relative order-2 lg:order-1 px-2 sm:px-0">
            <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-full h-full border border-[#c9a96e]/30 pointer-events-none z-0 translate-x-3 translate-y-3" />
            <div className="relative z-10 aspect-[4/3] w-full bg-slate-800 overflow-hidden shadow-none border border-white/10 rounded-none">
              <Image
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                alt="Analytical pricing loops and documentation"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-[#c9a96e] text-[#1a2744] py-2 px-4 sm:py-3 sm:px-5 relative z-20 inline-block font-sans text-[8px] sm:text-[9px] uppercase tracking-widest font-bold rounded-none">
              Comparative Analysis Protocol
            </div>
          </div>

          {/* Copy Block */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-6 bg-[#c9a96e]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
                Scientific Valuation
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              Pricing Your Home <span className="italic font-medium text-[#c9a96e]">to Win</span>
            </h2>
            <div className="space-y-4 text-slate-300 font-light text-sm md:text-base leading-relaxed font-sans">
              <p>
                The ultimate pricing velocity relies on one simple law: <span className="text-[#c9a96e] font-semibold italic">The wrong price costs you active buyers. The right price creates competitive friction.</span> We do not list to test the waters; we price to command immediate leverage.
              </p>
              <p>
                Our Comparative Market Analysis (CMA) bypasses crude automated algorithms. We run localized comparative pricing loops that evaluate active inventory, pending escrows, and historically matched premium assets in {region.defaultCity}&apos;s luxury corridors.
              </p>
              <p>
                By factoring in micro-nuances—lot topography premiums, school district sub-ratings, architectural design styles, and off-market intelligence—we formulate a customized pricing range optimized to trigger dynamic multi-offer demand in {region.defaultCity}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
