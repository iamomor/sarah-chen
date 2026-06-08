"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  MapPin, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Compass, 
  GraduationCap 
} from "lucide-react";
import type { Neighborhood } from "@/types";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";

interface NeighborhoodShowcaseProps {
  neighborhoods: Neighborhood[];
}

export default function NeighborhoodShowcase({ neighborhoods }: NeighborhoodShowcaseProps) {
  const { colors, name: agentName, bookingUrl } = agentConfig;

  // Format currencies appropriately
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat(region.language === "en" ? "en-US" : region.language, {
      style: "currency",
      currency: region.currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Stagger variants for entry animations
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="w-full bg-[#f9f6f0] pb-24">
      {/* ─────────────────────────────────────────────────────────────────
          EDITORIAL HERO HEADER
      ───────────────────────────────────────────────────────────────── */}
      <section 
        className="relative w-full overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28 bg-primary text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(26, 39, 68, 0.96), rgba(26, 39, 68, 0.88)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Visual frame element */}
        <div className="absolute inset-8 border border-white/10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-5 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-sans text-[10px] tracking-[0.35em] uppercase font-bold text-accent block"
          >
            Curated Local Enclaves
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-white"
          >
            Explore {region.defaultCity}’s <span className="italic">Premier Corridors</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-px bg-accent mx-auto"
          />

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="font-sans text-base md:text-lg text-slate-300 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Hyperlocal micro-market metrics, school district intelligence, and custom lifestyle guides across the region&apos;s most sought-after residential destinations.
          </motion.p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          ASYMMETRIC EDITORIAL LIST
      ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 md:mt-24 relative z-10">
        <motion.div 
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-24 md:space-y-36"
        >
          {neighborhoods.map((n, idx) => {
            const isEven = idx % 2 === 0;
            const yoyPositive = n.stats.yoyChange >= 0;
            
            // Extract vibe metrics with robust fallbacks
            const privacy = n.vibeScores?.privacy ?? 8;
            const walkability = n.vibeScores?.walkability ?? 5;
            const investment = n.vibeScores?.investment ?? 8;

            return (
              <motion.div
                key={n.slug}
                variants={itemVariants}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center`}
              >
                {/* Visual Panel Column */}
                <div 
                  className={`w-full lg:col-span-6 group relative ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="relative aspect-[16/10] sm:aspect-[1.5] w-full overflow-hidden shadow-[0_20px_50px_rgba(26,39,68,0.06)] bg-white p-3 border border-slate-200/60">
                    {/* Inner gold frame that contracts/expands on hover */}
                    <div 
                      className="absolute inset-0 z-20 border pointer-events-none transition-all duration-700 group-hover:inset-1.5"
                      style={{ borderColor: `${colors.accent}40` }}
                    />
                    <div 
                      className="absolute inset-3 border pointer-events-none z-20"
                      style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
                    />

                    {/* Image */}
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={n.heroImage}
                        alt={`${n.name} Estate Profile`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Floating YoY appreciation tag */}
                    <div className="absolute top-6 left-6 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-slate-200 shadow-md">
                      {yoyPositive ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                      )}
                      <span className="font-sans text-[10px] tracking-wider uppercase font-bold text-slate-800">
                        {yoyPositive ? "+" : ""}{n.stats.yoyChange}% YoY Value
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Statistics Column */}
                <div 
                  className={`w-full lg:col-span-6 flex flex-col space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  {/* Eyebrow index */}
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-3xl font-light text-accent italic">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="w-8 h-px bg-slate-300" />
                    <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold text-slate-400">
                      Estate Value Profile
                    </span>
                  </div>

                  {/* Neighborhood Title & Tagline */}
                  <div className="space-y-1">
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-900 font-normal tracking-tight">
                      {n.name}
                    </h2>
                    <p className="font-sans text-xs italic text-slate-500 tracking-wide">
                      {n.tagline}
                    </p>
                  </div>

                  {/* Vibe / Summary */}
                  <p className="font-sans text-sm text-slate-600 font-light leading-relaxed">
                    {n.description.split("\n")[0]}
                  </p>

                  {/* KPI Statistics Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200/70">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Average Value</span>
                      <span className="font-serif text-lg text-primary font-medium mt-0.5 block">
                        {formatPrice(n.stats.avgPrice)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Price Per {region.areaLabel}</span>
                      <span className="font-serif text-lg text-primary font-medium mt-0.5 block">
                        {formatPrice(n.stats.pricePerSqft)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Active Inventory</span>
                      <span className="font-serif text-lg text-primary font-medium mt-0.5 block">
                        {n.stats.activeListings} Estates
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase tracking-wider font-bold">Days on Market</span>
                      <span className="font-serif text-lg text-primary font-medium mt-0.5 block">
                        {n.stats.avgDaysOnMarket} Days
                      </span>
                    </div>
                  </div>

                  {/* Graphic Vibe Scales & School Ratings */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                    {/* Vibe Slider Scales */}
                    <div className="space-y-3">
                      <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-slate-400 block">
                        Community Attributes
                      </span>
                      <div className="space-y-2">
                        {/* Privacy */}
                        <div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-0.5 uppercase tracking-wide">
                            <span>Privacy & Discretion</span>
                            <span>{privacy}/10</span>
                          </div>
                          <div className="h-1 bg-slate-200/80 w-full rounded-none overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${privacy * 10}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full"
                              style={{ backgroundColor: colors.accent }}
                            />
                          </div>
                        </div>

                        {/* Walkability */}
                        <div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-0.5 uppercase tracking-wide">
                            <span>Walkability</span>
                            <span>{walkability}/10</span>
                          </div>
                          <div className="h-1 bg-slate-200/80 w-full rounded-none overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${walkability * 10}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full"
                              style={{ backgroundColor: colors.accent }}
                            />
                          </div>
                        </div>

                        {/* Investment */}
                        <div>
                          <div className="flex justify-between text-[10px] font-bold text-slate-700 mb-0.5 uppercase tracking-wide">
                            <span>Asset Appreciation</span>
                            <span>{investment}/10</span>
                          </div>
                          <div className="h-1 bg-slate-200/80 w-full rounded-none overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${investment * 10}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                              className="h-full"
                              style={{ backgroundColor: colors.accent }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights & Schools Info */}
                    <div className="space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-slate-400 block">
                          District Advantage
                        </span>
                        {n.schools && (
                          <div className="flex items-start gap-2 bg-white p-3 border border-slate-200/50">
                            <GraduationCap className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-sans text-[10px] font-bold text-slate-800 block">
                                {n.schools.high || n.schools.elementary || "District Schools"}
                              </span>
                              <span className="font-sans text-[9px] text-slate-400 uppercase tracking-wider block">
                                Ranked {n.schools.rating || "N/A"}/10 • {region.schoolRating}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Primary Action Button */}
                      <Link
                        href={`/neighborhoods/${n.slug}`}
                        className="inline-flex items-center gap-2 group font-sans text-[10px] tracking-[0.2em] uppercase font-bold mt-2"
                        style={{ color: colors.primary }}
                      >
                        <span>Explore {n.name} Guide</span>
                        <div className="relative">
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          <div 
                            className="absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 w-1/3 group-hover:w-full"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          PRIVATE ADVISORY / OFF-MARKET PORTFOLIO CTA
      ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 mt-32 md:mt-40 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="bg-primary text-white relative overflow-hidden p-8 md:p-16 shadow-[0_30px_70px_rgba(26,39,68,0.18)] border border-accent/20 text-center"
        >
          {/* Decorative assets */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d315c] via-primary to-[#0f192e] opacity-95"></div>
          <div className="absolute inset-4 border border-white/5 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-accent/30 bg-white/5 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold text-accent">
                Confidential Portfolio Access
              </span>
            </div>

            <h3 className="font-serif text-3xl md:text-4xl text-accent font-normal leading-tight">
              Private Advisory &amp; <span className="italic font-light text-white">Off-Market Inventory</span>
            </h3>

            <div className="w-12 h-px bg-accent/40 mx-auto" />

            <p className="font-sans text-sm md:text-base text-slate-300 font-light leading-relaxed">
              In {region.defaultCity}’s premium enclaves like Westlake and Tarrytown, up to 30% of high-end estates transact privately to preserve homeowner discretion. Our advisory coordinates off-market search matching for qualified buyers.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-white text-primary hover:text-primary font-bold font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-300"
              >
                Request Advisory Consultation
              </Link>
              
              {bookingUrl && (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Reserve Calendar Slot</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
