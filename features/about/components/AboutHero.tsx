"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";

export default function AboutHero() {
  const { name, title, colors, aboutPage } = agentConfig;

  return (
    <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-[#1a2744]">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a2744]/75 z-10" />
        <Image
          src={aboutPage.heroImage}
          alt="Luxury Architecture Background"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center max-w-4xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]" style={{ color: colors.accent }}>
              Advisory Profile
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-none font-light">
            About <span className="font-serif italic font-normal text-[#c9a96e]" style={{ color: colors.accent }}>{name}</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light tracking-[0.1em] uppercase font-sans max-w-2xl mx-auto">
            {title}
          </p>
        </motion.div>
      </div>

      {/* Elegant Accent Line at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
    </section>
  );
}
