"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, Search } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";

export default function AboutBottomCTA() {
  const { colors, bookingUrl } = agentConfig;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative py-28 flex items-center justify-center overflow-hidden bg-[#1a2744]" ref={ref}>
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a2744]/90 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000"
          alt="Luxury Interior Background"
          fill
          className="object-cover object-center scale-105"
          quality={85}
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center max-w-4xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]" style={{ color: colors.accent }}>
              Begin Your Journey
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>

          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white tracking-tight leading-tight"
          >
            Ready to Work Together?
          </h2>
          
          <p className="text-slate-300 font-light max-w-xl mx-auto leading-relaxed text-sm md:text-base font-sans">
            Whether you are listing an architectural landmark or searching for a private residential retreat, we stand ready to advise you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto"
        >
          <Button
            asChild
            className="w-full sm:w-auto rounded-none text-[#1a2744] hover:opacity-90 px-10 py-7 h-auto text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 font-sans shadow-lg"
            style={{ backgroundColor: colors.accent, color: colors.primary }}
          >
            <Link href={bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
              <Calendar className="w-4 h-4 mr-1 stroke-[2]" /> Schedule a Call
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-none border-white/20 text-white hover:bg-white hover:text-[#1a2744] hover:border-white px-10 py-7 h-auto text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 font-sans"
          >
            <Link href="/listings" className="flex items-center gap-2 justify-center">
              <Search className="w-4 h-4 mr-1 stroke-[2]" /> Browse Listings
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
