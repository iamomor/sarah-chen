"use client";

import React from "react";
import Image from "next/image";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

export default function WhySarahChen() {
  return (
    <section className="py-24 md:py-32 container mx-auto px-6 lg:px-12 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Brief Editorial & Strategy Matrix */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-[1px] w-6 bg-[#c9a96e]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                Fiduciary Disparity
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1a2744] leading-tight">
              The Right Buyer&apos;s Agent <br />
              <span className="italic font-medium text-[#c9a96e]">Changes Everything</span>
            </h2>
            <p className="text-slate-500 font-light text-sm max-w-xl leading-relaxed">
              Real estate transactions are high-stakes financial operations. A passive agent relies on hope; an elite fiduciary engineers the outcome. Compare our protocol against standard industry practices:
            </p>
          </div>

          {/* HIGH-IMPACT COMPARATIVE MATRIX - UX MASTERSTROKE */}
          <div className="border border-slate-200/80 bg-white shadow-xl shadow-slate-100/50 p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-[10px] font-bold uppercase tracking-widest text-[#1a2744]">
              <div className="flex items-center gap-1.5 text-[#c9a96e]">
                <Sparkles className="w-3.5 h-3.5 fill-[#c9a96e]/10" /> The Proactive Fiduciary
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldAlert className="w-3.5 h-3.5" /> Average Broker
              </div>
            </div>

            <div className="space-y-5 text-xs md:text-sm">
              {/* Row 1 */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-serif font-bold text-[#1a2744]">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Off-Market Sourcing
                  </div>
                  <p className="text-slate-500 font-light leading-relaxed pl-6">
                    Actively hunts unlisted pocket properties through high-end developer and owner networks in {agentConfig.markets[0]} and {agentConfig.markets[1]}.
                  </p>
                </div>
                <div className="space-y-1 opacity-70">
                  <div className="flex items-center gap-2 font-bold text-slate-500">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Passive Waiting
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed pl-6">
                    Waits for properties to upload on Zillow or public listing platforms.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-serif font-bold text-[#1a2744]">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Tactical Contracts
                  </div>
                  <p className="text-slate-500 font-light leading-relaxed pl-6">
                    Structures personalized seller-aligned terms to win without overpaying.
                  </p>
                </div>
                <div className="space-y-1 opacity-70">
                  <div className="flex items-center gap-2 font-bold text-slate-500">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Basic Templates
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed pl-6">
                    Submits generic contracts and suggests offering higher cash prices to win.
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-serif font-bold text-[#1a2744]">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" /> Asset Analytics
                  </div>
                  <p className="text-slate-500 font-light leading-relaxed pl-6">
                    Conducts local zoning, infrastructure, and valuation audits before advising.
                  </p>
                </div>
                <div className="space-y-1 opacity-70">
                  <div className="flex items-center gap-2 font-bold text-slate-500">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" /> Basic CMA Reports
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed pl-6">
                    Provides standard historical data tables with no predictive appreciation forecasting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Luxury Framed Visual */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0">
          <div className="absolute -top-6 -left-6 w-full h-full border border-[#c9a96e]/30 pointer-events-none z-0 translate-x-3 translate-y-3" />
          <div className="relative z-10 aspect-[3/4] w-full bg-slate-100 overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"
              alt={`${agentConfig.mapCenter.city} Luxury Estate Exterior`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#1a2744] text-[#c9a96e] py-4 px-6 relative z-20 inline-block shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
              {agentConfig.name} Protocol
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
