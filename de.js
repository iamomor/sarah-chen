"use client";

import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";
import { Clock, DollarSign, Home, Star, TrendingUp } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  index: number;
  icon: React.ElementType;
}

const StatItem = ({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  index,
  icon: Icon,
}: StatItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const count = useCountUp(inView ? value : 0, 2500, decimals);
  const { colors } = agentConfig;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{
        delay: index * 0.12,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center text-center p-6 relative"
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: `${colors.accent}12` }}
      >
        <Icon className="w-5 h-5" style={{ color: colors.accent }} />
      </div>

      {/* Number */}
      <div
        className="text-4xl md:text-5xl font-light mb-2 tracking-tight leading-none"
        style={{ color: colors.primary }}
      >
        {prefix}
        {count}
        {suffix}
      </div>

      {/* Label */}
      <div
        className="text-[10px] font-semibold uppercase tracking-[0.3em]"
        style={{ color: colors.muted }}
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
  const listToSaleValue = parseFloat(
    stats.listToSaleRatio.replace(/[^0-9.]/g, "")
  );

  const statItems = [
    {
      label: "Career Sales Volume",
      value: salesValue,
      prefix: region.symbol,
      suffix: "M",
      icon: DollarSign,
    },
    {
      label: "Homes Sold",
      value: stats.homesSold,
      suffix: "+",
      icon: Home,
    },
    {
      label: "List-to-Sale Ratio",
      value: listToSaleValue,
      suffix: "%",
      decimals: 1,
      icon: TrendingUp,
    },
    {
      label: "Avg Days on Market",
      value: stats.avgDaysOnMarket,
      icon: Clock,
    },
    {
      label: "Google Rating",
      value: stats.googleRating,
      suffix: "/5",
      decimals: 1,
      icon: Star,
    },
  ];

  return (
    <section className="w-full py-16 bg-white relative overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px]"
        style={{ backgroundColor: colors.accent }}
      />

      <div className="container mx-auto px-8 md:px-16 xl:px-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-black/5">
          {statItems.map((stat, index) => (
            <StatItem
              key={index}
              index={index}
              label={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-black/5" />
    </section>
  );
}
