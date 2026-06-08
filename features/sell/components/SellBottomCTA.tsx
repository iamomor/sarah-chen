"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Button } from "@/components/ui/button";

export default function SellBottomCTA() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#1a2744] text-center border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10 space-y-8">
        <div className="flex justify-center items-center gap-3">
          <div className="h-[1px] w-8 bg-[#c9a96e]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e] font-sans">
            Schedule Consultation
          </span>
          <div className="h-[1px] w-8 bg-[#c9a96e]" />
        </div>
        <h2 className="text-3xl md:text-6xl font-serif font-light text-white leading-tight">
          Let&apos;s Talk About <br />
          <span className="italic font-medium text-[#c9a96e]">Selling Your Home</span>
        </h2>
        <p className="text-slate-300 font-light max-w-xl mx-auto text-sm leading-relaxed font-sans">
          Arrange a private, high-fidelity consultation to evaluate your property&apos;s true potential equity.
        </p>
        <div className="pt-4">
          <Button 
            asChild 
            className="w-full sm:w-auto border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] rounded-none px-6 py-4.5 sm:px-10 sm:py-6 h-auto text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-none font-sans"
          >
            <Link href={agentConfig.bookingUrl}>
              Schedule a Free Seller Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
