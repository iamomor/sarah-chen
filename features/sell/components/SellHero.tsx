"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Button } from "@/components/ui/button";

export default function SellHero() {
  return (
    <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden bg-[#1a2744]">
      {/* Background & Luxury Solid/Opaque Dark Overlay (No heavy CSS gradients) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a2744]/75 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Austin Architectural Property"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={85}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center max-w-5xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
              Asset Capital Optimization
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] font-light">
            Sell Faster. For More. <br />
            <span className="italic font-medium text-[#c9a96e]">With Less Stress.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200 font-light max-w-3xl mx-auto leading-relaxed font-sans">
            {region.defaultCity} sellers who list with {agentConfig.name} sell for{" "}
            <span className="text-[#c9a96e] font-normal">
              {agentConfig.stats.listToSaleRatio} more per {region.areaLabel}
            </span>{" "}
            in{" "}
            <span className="text-[#c9a96e] font-normal">
              {agentConfig.stats.avgDaysOnMarket} days
            </span>{" "}
            average—substantially outperforming local averages.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Button
              asChild
              className="w-full sm:w-auto border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] rounded-none px-10 py-7 h-auto text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-none font-sans"
            >
              <Link href="/valuation">
                Get Your Free Home Valuation <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="pt-8 text-white/50 text-[10px] uppercase tracking-[0.25em] font-bold font-sans flex items-center justify-center gap-2">
            <span>★</span> Verified Private Advisory <span>★</span> Fiduciary representation
          </div>
        </motion.div>
      </div>
    </section>
  );
}
