"use client";

import React from "react";
import { Clock, TrendingUp, Award } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";

export default function BuyPerformanceStrip() {
  return (
    <section className="relative z-30 -mt-16 container mx-auto px-6 lg:px-12 max-w-7xl">
      <div className="bg-[#1a2744] text-white p-8 md:p-12 shadow-[0_30px_60px_rgba(26,39,68,0.25)] border border-[#c9a96e]/20 relative">
        {/* Subtle Graphic Texture Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10 items-center">
          {/* Metric 1 */}
          <div className="flex items-start gap-4 border-b border-white/10 md:border-b-0 md:border-r md:border-white/10 pb-6 md:pb-0 pr-4">
            <div className="w-12 h-12 rounded-none bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl lg:text-4xl font-serif text-[#c9a96e] tracking-tight font-medium">
                {agentConfig.stats.avgDaysOnMarket} Days
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
                Average Buyer Close
              </p>
              <p className="text-[10px] text-slate-400 font-light">
                vs 67 Days {region.listingPlatform} Market Average
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-start gap-4 border-b border-white/10 md:border-b-0 md:border-r md:border-white/10 pb-6 md:pb-0 pr-4">
            <div className="w-12 h-12 rounded-none bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl lg:text-4xl font-serif text-[#c9a96e] tracking-tight font-medium">
                {agentConfig.stats.listToSaleRatio}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
                List-to-Sale Purchase Ratio
              </p>
              <p className="text-[10px] text-slate-400 font-light">
                vs 97.4% Market Average
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-start gap-4 pr-4">
            <div className="w-12 h-12 rounded-none bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl lg:text-4xl font-serif text-[#c9a96e] tracking-tight font-medium">
                {agentConfig.stats.homesSold}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-200">
                Verified Acquisitions
              </p>
              <p className="text-[10px] text-slate-400 font-light">
                Delivering high-stakes contract protection
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-[0.25em] relative z-10">
          <span>{agentConfig.mapCenter.city} Board Audit</span>
          <span>Fiduciary Verified Statistics</span>
        </div>
      </div>
    </section>
  );
}
