"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";

export default function BuyBottomCTA() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#1a2744] text-white text-center relative overflow-hidden">
      {/* Decorative Subtle Grid Backdrop */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10 space-y-8">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="h-[1px] w-6 bg-[#c9a96e]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
            Initiate Consultation
          </span>
          <div className="h-[1px] w-6 bg-[#c9a96e]" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight">
          Partner with {agentConfig.mapCenter.city}&apos;s <br />
          <span className="italic font-medium text-[#c9a96e]">Premier Luxury Specialists</span>
        </h2>
        
        <p className="text-slate-300 font-light text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
          Experience the {agentConfig.name} Protocol. Whether searching in {agentConfig.markets[0]}, {agentConfig.markets[1]}, or sourcing off-market luxury estates, our advisory protects your interests at every step.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Button
            asChild
            className="w-full sm:w-auto bg-[#c9a96e] hover:bg-[#b8985e] text-[#1a2744] rounded-none px-8 py-6 h-auto text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
          >
            <Link href="/contact" className="flex items-center gap-1.5">
              Secure Consultation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-[#c9a96e] rounded-none px-8 py-6 h-auto text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300"
          >
            <a href={`tel:${agentConfig.phoneRaw}`} className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#c9a96e]" /> {agentConfig.phone}
            </a>
          </Button>
        </div>

        <div className="pt-6 text-[9px] uppercase tracking-widest text-slate-400 font-bold flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#c9a96e]" /> 24-Hour Confidential Response
          </span>
          <span className="hidden sm:inline">•</span>
          <span>Licensed by regional estate licensing commissions</span>
        </div>
      </div>
    </section>
  );
}
