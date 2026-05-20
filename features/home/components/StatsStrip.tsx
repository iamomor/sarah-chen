"use client";

import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "react-intersection-observer";

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
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col p-4 border-l border-white/10 first:border-none"
    >
      <div 
        className="text-5xl md:text-6xl xl:text-7xl font-light mb-4 tracking-tighter leading-none"
        style={{ color: "white" }}
      >
        {prefix}{count}{suffix}
      </div>
      <div 
        className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/40"
      >
        {label}
      </div>
    </motion.div>
  );
};

export default function StatsStrip() {
  const { stats, colors } = agentConfig;
  
  // Parse Career Sales number from "$142M" or "£142M"
  const salesValue = parseInt(stats.careerSalesVolume.replace(/[^0-9]/g, ""));
  
  // Parse List-to-Sale Ratio
  const listToSaleValue = parseFloat(stats.listToSaleRatio.replace(/[^0-9.]/g, ""));

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
      label: "List-to-Sale",
      value: listToSaleValue,
      suffix: "%",
      decimals: 1,
    },
    {
      label: "Days on Market",
      value: stats.avgDaysOnMarket,
    },
    {
      label: "Google Rating",
      value: stats.googleRating,
      suffix: "/5",
      decimals: 1,
    },
  ];

  return (
    <section 
      className="w-full py-24 relative overflow-hidden"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Structural Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5" />

      <div className="container mx-auto px-8 md:px-16 xl:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8">
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
