"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatPrice, formatPricePerArea } from "@/lib/utils";

interface NeighborhoodStatsProps {
  stats: {
    avgPrice: number;
    pricePerSqft: number;
    avgDaysOnMarket: number;
    activeListings: number;
    yoyChange: number;
  };
}

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function NeighborhoodStats({ stats }: NeighborhoodStatsProps) {
  const { colors } = agentConfig;
  const isPositiveYoy = stats.yoyChange >= 0;

  const statItems = [
    {
      label: "Average Price",
      value: formatPrice(stats.avgPrice),
      sub: `${region.listingPlatform} Closed Average`,
    },
    {
      label: `Price / ${region.areaLabel}`,
      value: formatPricePerArea(stats.pricePerSqft),
      sub: `Based on active inventory`,
    },
    {
      label: "Days on Market",
      value: `${stats.avgDaysOnMarket}`,
      sub: "Average transaction velocity",
      suffix: " days",
    },
    {
      label: "Active Listings",
      value: `${stats.activeListings}`,
      sub: "Exclusive active properties",
      badge: true,
    },
    {
      label: "Year-Over-Year",
      value: `${isPositiveYoy ? "+" : ""}${stats.yoyChange}%`,
      sub: isPositiveYoy ? "Appreciation trend" : "Depreciation trend",
      trend: isPositiveYoy ? "up" : "down",
    },
  ];

  return (
    /* Overlaps the hero bottom edge slightly with negative margin */
    <section className="relative z-30 -mt-10 px-6 sm:px-8 lg:px-12 pb-0">
      <div className="max-w-7xl mx-auto">
        
        {/* ── Monolithic Velvet Panel ── */}
        <div
          className="relative overflow-hidden shadow-[0_50px_100px_rgba(10,14,26,0.25)] border border-slate-800/90 bg-slate-950 backdrop-blur-md"
          style={{ backgroundColor: colors.primary }}
        >
          {/* Top Elegant Gold Trim Line */}
          <div
            className="absolute top-0 left-0 w-full h-[3px]"
            style={{ backgroundColor: colors.accent }}
          />

          {/* Luxury background layout grid accent */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              background: `radial-gradient(circle at 75% 35%, ${colors.accent} 0%, transparent 55%)`,
            }}
          />

          {/* Main stats layout */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-y md:divide-y-0 divide-slate-800/50 lg:divide-x divide-slate-800/50">
            {statItems.map((item, i) => {
              return (
                <motion.div
                  key={item.label}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={statVariants}
                  className={`
                    flex flex-col justify-between
                    p-6 sm:p-8 gap-5
                    relative group
                    transition-all duration-300
                    ${i === statItems.length - 1 ? "col-span-2 md:col-span-3 lg:col-span-1" : ""}
                  `}
                >
                  {/* Subtle premium hover accent light */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                  />
                  <div
                    className="absolute -inset-px border border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                    style={{ borderColor: `${colors.accent}15` }}
                  />

                  {/* Stat Header - Label */}
                  <div className="flex items-center justify-between">
                    <span
                      className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold text-slate-400 block group-hover:text-slate-200 transition-colors"
                    >
                      {item.label}
                    </span>
                    {item.badge && (
                      <span 
                        className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(201,169,110,0.8)]"
                        style={{ backgroundColor: colors.accent }}
                      />
                    )}
                  </div>

                  {/* Stat Body - Massive Value */}
                  <div className="space-y-1.5 py-1">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`
                          font-serif font-normal tracking-tight block leading-none
                          text-2xl sm:text-3xl md:text-4xl
                          transition-transform duration-300 group-hover:scale-[1.02]
                          ${item.trend === "up" ? "text-emerald-400" : item.trend === "down" ? "text-rose-400" : "text-white"}
                        `}
                      >
                        {item.value}
                      </span>
                      {item.suffix && (
                        <span className="font-sans text-xs font-light text-slate-400">
                          {item.suffix}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stat Footer - Subtext / Scarcity Indicators */}
                  <div className="flex items-center gap-2 justify-between border-t border-white/5 pt-3.5">
                    <span className="font-sans text-[9px] text-slate-400 group-hover:text-slate-300 font-medium tracking-wide leading-none truncate block max-w-[90%] transition-colors">
                      {item.sub}
                    </span>
                    {item.trend === "up" && (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    )}
                    {item.trend === "down" && (
                      <TrendingDown className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                    )}
                    {!item.trend && (
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors flex-shrink-0" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ── Bottom Footnote bar ── */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-800/60 text-[9px] font-sans text-slate-400 tracking-[0.2em] uppercase font-bold gap-3"
            style={{ backgroundColor: "rgba(10, 14, 26, 0.45)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${colors.accent}80` }} />
              <span>Verified Local {region.listingPlatform} Exchange Database</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Updated {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

