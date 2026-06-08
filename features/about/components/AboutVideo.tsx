"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { agentConfig } from "@/config/agent.config";

export default function AboutVideo() {
  const { colors } = agentConfig;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="py-24 bg-[#f9f6f0]" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]" style={{ color: colors.accent }}>
              Cinematic Introduction
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a2744]"
            style={{ color: colors.primary }}
          >
            Meet Sarah in 2 Minutes
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto">
            A quick introduction to how Sarah works with clients and structures transactions.
          </p>
        </div>

        {/* Video Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl mx-auto border border-[#c9a96e]/20 p-2 bg-white shadow-2xl"
        >
          {/* Main aspect ratio container */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
            <iframe
              src="https://www.youtube.com/embed/n42n_b-0n_w?modestbranding=1&rel=0"
              title="Meet Sarah Chen - Luxury Real Estate Advisor"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
