"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";

export default function MarketingPresentation() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#f9f6f0] border-b border-slate-200/50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl text-center space-y-8">
        <div className="space-y-3">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
              Exclusive Preview
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1a2744]">
            See Our <span className="italic font-medium text-[#c9a96e]">Listing Presentation</span>
          </h2>
          <p className="text-slate-500 font-light max-w-xl mx-auto text-xs md:text-sm font-sans">
            Review the exact digital, staging, and print strategies we use to launch premium homes to qualified global buyers.
          </p>
        </div>

        {/* Mock Presentation Frame */}
        <div className="bg-slate-900 border border-slate-200/80 shadow-none max-w-4xl mx-auto overflow-hidden relative rounded-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-25 z-0" />
          <div className="absolute inset-0 bg-slate-950/60 z-10" />
          
          <div className="relative z-20 h-[400px] flex flex-col justify-center items-center p-6 text-center space-y-6 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-none border border-[#c9a96e] bg-[#1a2744]/80 flex items-center justify-center text-[#c9a96e]">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#f9f6f0] tracking-wide">
              Confidential Client Portfolio
            </h3>
            <p className="text-slate-300 font-light text-xs md:text-sm leading-relaxed font-sans">
              Our comprehensive multi-channel pricing strategy and off-market networks are shared exclusively on our seller consultation calls. Schedule a private call below to unlock your custom marketing blueprint.
            </p>
            <Button asChild className="border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] rounded-none px-8 py-6 h-auto text-xs font-bold tracking-widest uppercase transition-all duration-300 font-sans shadow-none">
              <Link href={agentConfig.bookingUrl}>
                Schedule Your Seller Call <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
