"use client";

import React from "react";
import { ShieldCheck, Check, Lock, Award } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

export default function BuyerBrokerAgreement() {
  return (
    <section className="py-24 md:py-32 container mx-auto px-6 lg:px-12 max-w-5xl">
      <div className="bg-white border border-slate-200/80 shadow-[0_30px_70px_rgba(0,0,0,0.02)] p-8 md:p-16 relative overflow-hidden">
        
        {/* Certified Graphic Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#c9a96e]" />
        
        {/* Subtle Backdrop Stamp */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 opacity-50 z-0 pointer-events-none">
          <Award className="w-32 h-32 text-slate-200" />
        </div>

        <div className="space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] block">
              Contract Transparency Pledges
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-medium leading-tight">
              Understanding the Certified <br />
              <span className="italic font-light text-[#c9a96e]">Buyer Broker Agreement</span>
            </h2>
            <p className="text-slate-400 font-light text-xs max-w-md mx-auto leading-relaxed">
              We translate standard industry agreements into simple, transparent pledges. You are never locked in; you are legally protected.
            </p>
          </div>

          <div className="h-[1px] w-full bg-slate-100" />

          {/* Three-column certified guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            
            {/* Guarantee 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif font-bold text-[#1a2744] text-base">
                  100% Fiduciary Protection
                </h4>
              </div>
              <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
                By signing a Buyer Representation Agreement, our brokerage is bound by regional licensing laws to act strictly in your absolute financial interest. It binds our team to act as your private, loyal, and fully confidential legal advocates across inspections, financing audits, and closing negotiations.
              </p>
            </div>

            {/* Guarantee 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif font-bold text-[#1a2744] text-base">
                  Zero Commission Surprises
                </h4>
              </div>
              <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
                Buyer broker compensation is handled with absolute clarity. Generally, compensation is structured directly through the listing broker&apos;s cooperative MLS fee platform, paid from the seller proceeds. For off-market pocket transactions, any minor broker adjustments are openly negotiated and approved before an offer is written.
              </p>
            </div>

            {/* Guarantee 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <h4 className="font-serif font-bold text-[#1a2744] text-base">
                  Zero-Risk Performance Exit
                </h4>
              </div>
              <p className="text-slate-500 font-light text-xs md:text-sm leading-relaxed">
                We believe our elite localized value and continuous guidance speak for themselves. You are never trapped in an unproductive partnership. Our agreement includes performance-driven exit criteria. If our advisory does not meet your standards of absolute excellence, you have the right to request immediate termination.
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#c9a96e]" />
              <span>{agentConfig.mapCenter.city} Fiduciary Standard Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#c9a96e]">
              <ShieldCheck className="w-3.5 h-3.5" /> Certified Buyer Agreement Standard
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
