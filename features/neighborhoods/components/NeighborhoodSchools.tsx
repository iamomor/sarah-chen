"use client";

import React from "react";
import { motion } from "framer-motion";
import { region } from "@/config/region.config";
import { GraduationCap, Star, Info, School } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodSchoolsProps {
  name: string;
  schools: {
    elementary?: string;
    middle?: string;
    high?: string;
    rating?: number;
  };
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

export default function NeighborhoodSchools({
  name,
  schools,
}: NeighborhoodSchoolsProps) {
  const { elementary, middle, high, rating = 0 } = schools;
  const accentColor = agentConfig.colors.accent;

  const schoolList = [
    { name: elementary, type: "Elementary School" },
    { name: middle, type: "Middle School" },
    { name: high, type: "High School" },
  ].filter((s) => s.name);

  return (
    <section 
      id="schools"
      style={{
        "--accent-color": accentColor,
        "--accent-muted": `${accentColor}22`,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-3xl space-y-2">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block">
              Education Profile
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
              Schools Serving <span className="italic font-light" style={{ color: accentColor }}>{name}</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <Info className="w-4 h-4 text-[var(--accent-color)]" />
            <span>Ratings sourced from <strong className="text-slate-600 font-bold">{region.schoolRating}</strong></span>
          </div>
        </div>

        {/* Schools Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {schoolList.map((school, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between p-8 bg-[#f9f6f0] border border-slate-200/30 rounded-none hover:shadow-[0_20px_50px_rgba(26,39,68,0.04)] hover:bg-white hover:border-slate-200/60 transition-all duration-500 relative group"
            >
              {/* Card Top Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 bg-white border border-[var(--accent-muted)] rounded-full flex items-center justify-center text-[var(--accent-color)] group-hover:bg-[var(--accent-color)] group-hover:text-white transition-all duration-500">
                    {index === 2 ? (
                      <GraduationCap className="w-5 h-5" />
                    ) : (
                      <School className="w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Rating Numeric Badge */}
                  <div className="flex flex-col items-end">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-slate-400 font-bold">
                      Rating
                    </span>
                    <span className="font-serif text-xl font-bold text-slate-800">
                      {rating || "N/A"}<span className="text-xs text-slate-400 font-normal">/10</span>
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-sans text-[9px] tracking-wider uppercase font-bold text-[var(--accent-color)]">
                    {school.type}
                  </span>
                  <h3 className="font-serif text-xl text-slate-900 font-normal leading-tight group-hover:text-[var(--accent-color)] transition-colors duration-300">
                    {school.name}
                  </h3>
                </div>
              </div>

              {/* Stars Visual Track */}
              <div className="mt-8 pt-4 border-t border-slate-200/40 flex items-center gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${
                      i < rating 
                        ? "fill-[var(--accent-color)] text-[var(--accent-color)]" 
                        : "text-slate-200"
                    } transition-all duration-500 group-hover:scale-110`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Legal Boundary Compliance Disclaimer */}
        <div className="mt-10 p-4 bg-slate-50 border border-slate-200/50 rounded-none flex items-start sm:items-center gap-3">
          <Info className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
          <p className="font-sans text-[11px] text-slate-500 leading-relaxed font-light">
            School boundaries are subject to change by the local administration. Please verify current school zone mappings and enrollment capacity directly with the local school district board prior to contract signing.
          </p>
        </div>

      </div>
    </section>
  );
}
