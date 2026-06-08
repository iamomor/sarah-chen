"use client";

import React from "react";
import { motion } from "framer-motion";
import { Footprints, Bus, Bike, Info } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodScoresProps {
  name: string;
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
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

export default function NeighborhoodScores({
  name,
  walkScore = 0,
  transitScore = 0,
  bikeScore = 0,
}: NeighborhoodScoresProps) {
  const getWalkLabel = (score: number) => {
    if (score >= 90) return "Walker's Paradise";
    if (score >= 70) return "Very Walkable";
    if (score >= 50) return "Somewhat Walkable";
    return "Car-Dependent";
  };

  const getTransitLabel = (score: number) => {
    if (score >= 90) return "Rider's Paradise";
    if (score >= 70) return "Excellent Transit";
    if (score >= 50) return "Good Transit";
    return "Minimal Transit";
  };

  const getBikeLabel = (score: number) => {
    if (score >= 90) return "Biker's Paradise";
    if (score >= 70) return "Very Bikeable";
    if (score >= 50) return "Somewhat Bikeable";
    return "Somewhat Bikeable";
  };

  const scores = [
    {
      title: "Walk Score",
      value: walkScore,
      icon: Footprints,
      label: getWalkLabel(walkScore),
      desc: "Daily errands do not require a car.",
    },
    {
      title: "Transit Score",
      value: transitScore,
      icon: Bus,
      label: getTransitLabel(transitScore),
      desc: "Transit options are available and convenient.",
    },
    {
      title: "Bike Score",
      value: bikeScore,
      icon: Bike,
      label: getBikeLabel(bikeScore),
      desc: "Flat terrain with excellent bike lanes.",
    },
  ];

  const accentColor = agentConfig.colors.accent;

  return (
    <section 
      id="scores"
      style={{
        "--accent-color": accentColor,
        "--accent-muted": `${accentColor}22`,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 bg-[#f9f6f0] border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block mb-2">
            Mobility & Transit
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Walkability & Scores for <span className="italic font-light" style={{ color: accentColor }}>{name}</span>
          </h2>
        </div>

        {/* Scores Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {scores.map((score, index) => {
            const IconComponent = score.icon;
            return (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="p-8 bg-white border border-slate-200/30 rounded-none shadow-[0_10px_35px_rgba(26,39,68,0.01)] hover:shadow-[0_20px_50px_rgba(26,39,68,0.03)] transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  {/* Icon & Score Number */}
                  <div className="flex justify-between items-center">
                    <div className="w-10 h-10 bg-[#f9f6f0] border border-[var(--accent-muted)] rounded-full flex items-center justify-center text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-500">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-serif text-3xl font-normal text-slate-900 leading-none group-hover:text-[var(--accent-color)] transition-colors duration-300">
                      {score.value}
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1">
                    <span className="font-sans text-[8px] tracking-[0.15em] uppercase font-bold text-slate-400 block">
                      {score.title}
                    </span>
                    <h3 className="font-serif text-lg text-slate-800 font-normal leading-tight">
                      {score.label}
                    </h3>
                    <p className="font-sans text-xs text-slate-500 font-light leading-relaxed">
                      {score.desc}
                    </p>
                  </div>
                </div>

                {/* Horizontal Progress Gauge Bar */}
                <div className="mt-8 space-y-1.5">
                  <div className="w-full h-1.5 bg-slate-100 rounded-none overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${score.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-0 left-0 h-full bg-[var(--accent-color)]"
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                    <span>0</span>
                    <span>100</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
