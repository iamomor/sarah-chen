"use client";

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { useCountUp } from "@/hooks/useCountUp";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  index: number;
}

const StatItem = ({ label, value, suffix = "", prefix = "", decimals = 0, index }: StatItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const count = useCountUp(inView ? value : 0, 2500, decimals);
  const { colors } = agentConfig;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col p-6 sm:p-8"
      style={{ backgroundColor: colors.primary }}
    >
      <div 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-4 tracking-tighter leading-none"
        style={{ color: "white" }}
      >
        {prefix}{count}{suffix}
      </div>
      <div 
        className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 font-sans"
      >
        {label}
      </div>
    </motion.div>
  );
};

export default function AboutCareerStats() {
  const { stats, markets, colors } = agentConfig;

  // Parse Career Sales number from volume config (e.g., "$142M")
  const salesValue = parseInt(stats.careerSalesVolume.replace(/[^0-9]/g, ""));

  const statItems = [
    {
      label: "Sales Volume",
      value: salesValue,
      prefix: region.symbol,
      suffix: "M",
    },
    {
      label: "Homes Sold",
      value: stats.homesSold,
      suffix: "+",
    },
    {
      label: "Years Active",
      value: stats.yearsExperience,
      suffix: " Yrs",
    },
    {
      label: "Google Rating",
      value: stats.googleRating,
      suffix: "/5",
      decimals: 1,
    },
    {
      label: `${region.defaultCity} Markets`,
      value: markets.length,
      suffix: " Areas",
    },
    {
      label: "Days on Market",
      value: stats.avgDaysOnMarket,
      suffix: " Avg",
    },
  ];

  return (
    <section 
      className="w-full py-20 relative overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Structural Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px overflow-hidden"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        >
          {statItems.map((stat, index) => (
            <StatItem
              key={index}
              index={index}
              label={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
