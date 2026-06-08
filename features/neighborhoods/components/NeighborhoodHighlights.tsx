"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodHighlightsProps {
  name: string;
  highlights: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

export default function NeighborhoodHighlights({
  name,
  highlights,
}: NeighborhoodHighlightsProps) {
  const accentColor = agentConfig.colors.accent;

  return (
    <section 
      id="highlights"
      style={{
        "--accent-color": accentColor,
        "--accent-muted": `${accentColor}22`,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden"
    >
      {/* Premium background grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block mb-2">
            Curated Highlights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            What to Love About <span className="italic font-light" style={{ color: accentColor }}>{name}</span>
          </h2>
        </div>

        {/* Highlights Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {highlights.map((highlight, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex items-start gap-5 p-8 bg-[#f9f6f0] border-l-2 border-l-[var(--accent-color)] border-y border-r border-slate-200/30 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_50px_rgba(26,39,68,0.04)] hover:bg-white hover:border-slate-200 transition-all duration-500 group relative"
            >
              {/* Gold Check Accent Container */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white border border-[var(--accent-muted)] flex items-center justify-center text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white group-hover:scale-105 transition-all duration-500">
                <Check className="w-4.5 h-4.5" />
              </div>

              {/* Highlight Text */}
              <div className="space-y-2">
                <span className="font-sans text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] block">
                  Feature {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-sans text-slate-800 text-sm sm:text-base font-light leading-relaxed">
                  {highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
