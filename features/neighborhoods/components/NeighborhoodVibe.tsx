"use client";

import React from "react";
import { motion } from "framer-motion";
import { EyeOff, Footprints, GraduationCap, Compass, TrendingUp, Clock } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

interface VibeScores {
  privacy: number;
  walkability: number;
  familyFriendly: number;
  architecture: number;
  investment: number;
}

interface NeighborhoodVibeProps {
  name: string;
  vibeScores?: VibeScores;
  vibeSummary?: string;
  commuteTime?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
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

export default function NeighborhoodVibe({
  name,
  vibeScores,
  vibeSummary,
  commuteTime,
}: NeighborhoodVibeProps) {
  const { colors } = agentConfig;

  const scores = vibeScores || {
    privacy: 8,
    walkability: 6,
    familyFriendly: 8,
    architecture: 7,
    investment: 8,
  };

  const summary = vibeSummary || "Bespoke enclave with exceptional residential architecture, private security details, and appreciation resilience.";
  const commute = commuteTime || "12 minutes to business district";

  const indicators = [
    {
      key: "privacy",
      label: "Privacy & Quietude",
      value: scores.privacy,
      icon: EyeOff,
      description: "Generous setbacks, gated entries, and minimal cut-through traffic.",
    },
    {
      key: "walkability",
      label: "Walkability & Dining",
      value: scores.walkability,
      icon: Footprints,
      description: "Curated cafes, boutique retail, and gorgeous community walkways.",
    },
    {
      key: "familyFriendly",
      label: "Education & Family",
      value: scores.familyFriendly,
      icon: GraduationCap,
      description: "Access to elite educational institutions and exceptional park infrastructures.",
    },
    {
      key: "architecture",
      label: "Architectural Integrity",
      value: scores.architecture,
      icon: Compass,
      description: "Aesthetic consistency across historic estates and structural marvels.",
    },
    {
      key: "investment",
      label: "Capital Appreciation",
      value: scores.investment,
      icon: TrendingUp,
      description: "Long-term asset resilience and price-per-area performance stability.",
    },
  ];

  return (
    <section 
      id="vibe"
      style={{
        backgroundColor: colors.background,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 border-t border-slate-200/40 overflow-hidden"
    >
      {/* Premium subtle background glow */}
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none filter blur-[120px] opacity-40"
        style={{
          background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 70%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT: Premium Summary Card ── */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block">
                Local Intelligence
              </span>
              <h2 
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-tight"
                style={{ color: colors.primary }}
              >
                Neighborhood <br />
                <span className="italic font-light" style={{ color: colors.accent }}>Vibe & Indicators</span>
              </h2>
              <p className="font-sans text-slate-600 text-sm md:text-base font-light leading-relaxed">
                Every residential corridor carries its own micro-climate. Our quantified ratings help you evaluate property suitability and lifestyle alignment at a glance.
              </p>
            </div>

            {/* Quick-Scan Briefing Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-slate-200/50 p-8 rounded-none shadow-[0_20px_50px_rgba(26,39,68,0.02)] space-y-6 relative overflow-hidden group hover:shadow-[0_30px_60px_rgba(26,39,68,0.04)] transition-all duration-500"
            >
              <div 
                className="absolute top-0 left-0 w-full h-[3px] transition-transform duration-500 origin-left"
                style={{ backgroundColor: colors.accent }}
              />
              
              <div className="space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                  Vibe Summary
                </span>
                <p className="text-base font-medium text-slate-800 leading-relaxed font-serif italic">
                  &ldquo;{summary}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                    Ideal Profile
                  </span>
                  <span className="text-xs font-semibold text-slate-800 tracking-wide uppercase">
                    Discerning Families
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 block">
                    Commute Index
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                    <Clock className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                    <span>{commute}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Visual Indicators Grid ── */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 space-y-8 bg-white p-8 md:p-12 border border-slate-200/40 shadow-[0_35px_80px_rgba(26,39,68,0.03)]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
              <h3 
                className="font-serif text-2xl font-normal text-slate-900 animate-pulse-slow"
              >
                Micro-Market Ratings
              </h3>
              <span className="font-sans text-[8px] tracking-widest text-slate-400 uppercase font-bold">
                10 Point Grading Scale
              </span>
            </div>
            
            <div className="space-y-8">
              {indicators.map((indicator) => {
                const IconComponent = indicator.icon;
                return (
                  <motion.div 
                    key={indicator.key} 
                    variants={itemVariants}
                    className="space-y-3 group"
                  >
                    <div className="flex justify-between items-end">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-10 h-10 rounded-none flex items-center justify-center text-white flex-shrink-0 transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <IconComponent className="w-4.5 h-4.5 transition-colors duration-300 group-hover:text-white" style={{ color: colors.accent }} />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 tracking-wide block uppercase transition-colors duration-300 group-hover:text-[var(--accent-color)]" style={{ "--accent-color": colors.accent } as React.CSSProperties}>
                            {indicator.label}
                          </span>
                          <span className="text-[10px] text-slate-400 font-light block mt-0.5 max-w-sm md:max-w-md">
                            {indicator.description}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-baseline gap-0.5 pl-4">
                        <span className="font-serif text-xl font-normal text-slate-950">
                          {indicator.value}
                        </span>
                        <span className="text-[9px] text-slate-400">/10</span>
                      </div>
                    </div>

                    {/* Premium Progress Bar with Gold Glow */}
                    <div className="w-full h-1 bg-slate-100 rounded-none overflow-hidden relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${indicator.value * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-0 left-0 h-full"
                        style={{ 
                          background: `linear-gradient(90deg, ${colors.accent}dd 0%, ${colors.accent} 100%)`
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

