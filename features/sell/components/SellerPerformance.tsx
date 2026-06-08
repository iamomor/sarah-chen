"use client";

import React from "react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";

export default function SellerPerformance() {
  return (
    <section className="py-24 bg-[#f9f6f0] relative z-30">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="bg-[#1a2744] text-white p-6 sm:p-10 md:p-14 shadow-none border border-[#c9a96e]/20 relative overflow-hidden rounded-none">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Header Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <div className="h-[1px] w-6 bg-[#c9a96e]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
                  Data vs Rhetoric
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight">
                Our Results vs. <br />
                <span className="italic font-medium text-[#c9a96e]">The {region.defaultCity} Market</span>
              </h2>
              <p className="text-slate-300 font-light text-sm leading-relaxed max-w-md font-sans">
                In high-end real estate, marketing is a financial optimization engine. By treating every home as a brand launch, we deliver returns that substantially beat standard local averages.
              </p>
            </div>

            {/* Premium Audited Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 space-y-6 rounded-none">
                
                {/* Metric 1 */}
                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-white/10">
                   <div className="flex-1 space-y-1">
                     <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-bold font-sans">Pricing Velocity</span>
                     <h4 className="text-sm font-medium text-white font-sans">Average Sale vs Asking</h4>
                   </div>
                   <div className="flex items-center gap-6 sm:gap-8">
                     <div className="text-center">
                       <span className="text-2xl font-serif font-semibold text-[#c9a96e] block">+5.2%</span>
                       <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold font-sans">{agentConfig.name}</p>
                     </div>
                     <div className="text-center border-l border-white/10 pl-6 sm:pl-8">
                       <span className="text-xl font-serif text-slate-400 block">-1.1%</span>
                       <p className="text-[9px] uppercase tracking-widest text-slate-500 font-sans">Market Avg</p>
                     </div>
                   </div>
                 </div>

                {/* Metric 2 */}
                 <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-white/10">
                   <div className="flex-1 space-y-1">
                     <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-bold font-sans">Liquidity Velocity</span>
                     <h4 className="text-sm font-medium text-white font-sans">Average Days on Market</h4>
                   </div>
                   <div className="flex items-center gap-6 sm:gap-8">
                     <div className="text-center">
                       <span className="text-2xl font-serif font-semibold text-[#c9a96e] block">{agentConfig.stats.avgDaysOnMarket} Days</span>
                       <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold font-sans">{agentConfig.name}</p>
                     </div>
                     <div className="text-center border-l border-white/10 pl-6 sm:pl-8">
                       <span className="text-xl font-serif text-slate-400 block">67 Days</span>
                       <p className="text-[9px] uppercase tracking-widest text-slate-500 font-sans">Market Avg</p>
                     </div>
                   </div>
                 </div>

                {/* Metric 3 */}
                 <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                   <div className="flex-1 space-y-1">
                     <span className="text-xs uppercase tracking-widest text-[#c9a96e] font-bold font-sans">Capital Efficiency</span>
                     <h4 className="text-sm font-medium text-white font-sans">List-to-Sale Ratio</h4>
                   </div>
                   <div className="flex items-center gap-6 sm:gap-8">
                     <div className="text-center">
                       <span className="text-2xl font-serif font-semibold text-[#c9a96e] block">{agentConfig.stats.listToSaleRatio}</span>
                       <p className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold font-sans">{agentConfig.name}</p>
                     </div>
                     <div className="text-center border-l border-white/10 pl-6 sm:pl-8">
                       <span className="text-xl font-serif text-slate-400 block">97.4%</span>
                       <p className="text-[9px] uppercase tracking-widest text-slate-500 font-sans">Market Avg</p>
                     </div>
                   </div>
                 </div>

              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] px-2 font-sans">
                <span>{region.listingPlatform} Board Intelligence</span>
                <span>Jan–Dec 2025 Audit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
