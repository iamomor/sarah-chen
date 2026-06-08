"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";

export default function ContactHero() {
  const { colors, contactPage } = agentConfig;

  return (
    <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-[#1a2744]">
      {/* Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a2744]/80 z-10" />
        <Image
          src={contactPage.heroImage}
          alt="Luxury Interior Background"
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
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e] font-sans" style={{ color: colors.accent }}>
              {contactPage.eyebrow}
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-none font-light">
            {contactPage.heading}{" "}
            <span className="font-serif italic font-normal text-[#c9a96e]" style={{ color: colors.accent }}>
              {contactPage.headingAccent}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 font-light max-w-2xl mx-auto leading-relaxed font-sans">
            {contactPage.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 z-20" />
    </section>
  );
}
