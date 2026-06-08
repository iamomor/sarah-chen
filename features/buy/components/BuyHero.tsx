"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { region } from "@/config/region.config";
import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";

export default function BuyHero() {
  return (
    <section className="relative h-[85vh] min-h-[650px] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-[#f9f6f0] z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
          alt={`${agentConfig.mapCenter.city} Luxury Home Interior`}
          fill
          className="object-cover object-center scale-105"
          priority
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center max-w-4xl space-y-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
              {agentConfig.mapCenter.city} Private Client Group
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-tight">
            Buy Your Dream {agentConfig.mapCenter.city} <br />
            <span className="font-serif italic font-light text-[#c9a96e]">Home With Confidence</span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            Acquire premier real estate with {agentConfig.mapCenter.city}&apos;s most trusted luxury {region.agentTitle}. Gain private off-market access and elite fiduciary protection.
          </p>

          {/* CTA - CONVERSION FOCUSED */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6">
            <Button
              asChild
              className="w-full sm:w-auto bg-[#c9a96e] hover:bg-[#b8985e] text-[#1a2744] rounded-none px-6 py-4.5 sm:px-10 sm:py-6 h-auto text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-black/20"
            >
              <Link href="/listings">
                Start Your Search <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="pt-4 text-white/50 text-[10px] uppercase tracking-widest font-bold">
            ★ {agentConfig.mapCenter.city}&apos;s Top {agentConfig.stats.googleRating > 4.5 ? "0.5%" : "Luxury"} Premium Advisory
          </div>
        </motion.div>
      </div>
    </section>
  );
}
