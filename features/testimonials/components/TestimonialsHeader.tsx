"use client";

import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Star, ShieldCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsHeader() {
  const { googleRating, reviewCount } = agentConfig.stats;

  return (
    <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
      {/* Decorative Gold Accent Eyebrow */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-3"
      >
        <span className="h-[1px] w-8 bg-[#c9a96e]/60" />
        <span className="text-[11px] tracking-[0.4em] font-bold text-[#c9a96e] uppercase">
          Client Endorsements
        </span>
        <span className="h-[1px] w-8 bg-[#c9a96e]/60" />
      </motion.div>

      {/* Main Page Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1a2744] tracking-tight leading-tight"
      >
        What Our Clients <span className="font-serif italic text-[#c9a96e]">Value Most</span>
      </motion.h1>

      {/* Dispersed Description */}
      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-base md:text-lg text-slate-600 font-light max-w-2xl mx-auto leading-relaxed"
      >
        A legacy of trust and premium advocacy built on absolute discretion, hyper-local intelligence, and a relentless commitment to optimizing our clients&apos; property portfolios in {region.regionName}.
      </motion.p>

      {/* Luxury Stats Summary Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-8 py-5 bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)] rounded-none mt-4 relative overflow-hidden group"
      >
        {/* Left vertical border hover accent */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-[#c9a96e] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
        
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#c9a96e] text-[#c9a96e]" />
            ))}
          </div>
          <span className="text-[13px] font-bold text-[#1a2744] tracking-wide">
            {googleRating.toFixed(1)} / 5.0
          </span>
          <span className="text-[11px] text-slate-400 font-light font-sans">Average Rating</span>
        </div>

        <div className="hidden sm:block text-slate-200">|</div>

        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#c9a96e]" />
          <span className="text-[13px] font-bold text-[#1a2744] tracking-wide">
            {reviewCount}
          </span>
          <span className="text-[11px] text-slate-500 font-light">Verified Reviews</span>
        </div>

        <div className="hidden sm:block text-slate-200">|</div>

        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#c9a96e]" />
          <span className="text-[13px] font-bold text-[#1a2744] tracking-wide">
            200+
          </span>
          <span className="text-[11px] text-slate-500 font-light">Premium Transactions</span>
        </div>
      </motion.div>
    </div>
  );
}

