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
  description: string;
}

const StatItem = ({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  index,
  icon: Icon,
  description,
}: StatItemProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const count = useCountUp(inView ? value : 0, 2000, decimals);
  const { colors } = agentConfig;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex flex-col items-center text-center px-4 py-8 relative group"
    >
      {/* Delicate, floating icon */}
      <div className="mb-4 transition-transform duration-500 group-hover:scale-110">
        <Icon className="w-5 h-5" style={{ color: colors.accent }} />
      </div>

      {/* Massive, elegant serif number */}
      <div
        className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-serif font-light mb-3 tracking-tight leading-none flex items-baseline justify-center"
        style={{ color: colors.primary }}
      >
        {prefix && <span className="font-serif font-light text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl mr-0.5 select-none">{prefix}</span>}
        <span className="font-serif font-light">{count}</span>
        {suffix && <span className="font-serif font-light text-xl sm:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl ml-0.5 select-none">{suffix}</span>}
      </div>

      {/* Thin Gold Separator */}
      <div 
        className="w-8 h-[1px] mb-3 transition-all duration-500 group-hover:w-12"
        style={{ backgroundColor: colors.accent }}
      />

      {/* High-status uppercase label */}
      <div
        className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] mb-2"
        style={{ color: colors.primary }}
      >
        {label}
      </div>

      {/* Psychological narrative statement */}
      <p 
        className="text-[11px] font-sans font-light leading-relaxed max-w-[180px] opacity-70"
        style={{ color: colors.text }}
      >
        {description}
      </p>
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
      label: "Sales Volume",
      value: salesValue,
      prefix: region.symbol,
      suffix: "M",
      icon: DollarSign,
      description: `Facilitating elite transactions in Austin's most exclusive corridors.`,
    },
    {
      label: "Estates Represented",
      value: stats.homesSold,
      suffix: "+",
      icon: Home,
      description: "Guiding clients home with absolute discretion and market precision.",
    },
    {
      label: "List-to-Sale Ratio",
      value: listToSaleValue,
      suffix: "%",
      decimals: 1,
      icon: TrendingUp,
      description: "Consistently securing maximum asset value through strategic advisory.",
    },
    {
      label: "Days on Market",
      value: stats.avgDaysOnMarket,
      icon: Clock,
      description: "Outperforming regional benchmarks through precision positioning.",
    },
    {
      label: "Client Rating",
      value: stats.googleRating,
      suffix: "/5",
      decimals: 1,
      icon: Star,
      description: "Trust earned through unwavering dedication and fiduciary advocacy.",
    },
  ];

  return (
    <section 
      className="w-full py-20 relative overflow-hidden border-y border-black/[0.06]"
      style={{ backgroundColor: colors.background }}
    >
      {/* Decorative luxury vertical keylines in background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex justify-between px-8 md:px-16 xl:px-24">
        <div className="w-[1px] h-full bg-black" />
        <div className="w-[1px] h-full bg-black hidden sm:block" />
        <div className="w-[1px] h-full bg-black hidden lg:block" />
        <div className="w-[1px] h-full bg-black hidden lg:block" />
        <div className="w-[1px] h-full bg-black" />
      </div>

      <div className="container mx-auto px-8 md:px-16 xl:px-24 relative z-10">
        {/* Psychological visual hook */}
        <div className="flex flex-col items-center mb-10">
          <span
            className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] mb-2"
            style={{ color: colors.accent }}
          >
            THE BENCHMARK OF TRUST
          </span>
          <h2
            className="text-2xl md:text-3xl font-serif font-light tracking-tight text-center"
            style={{ color: colors.primary }}
          >
            Quantitative Excellence in Luxury Brokerage
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-0 lg:divide-x divide-black/[0.06]">
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
              description={stat.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

