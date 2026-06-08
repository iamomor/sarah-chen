"use client";

import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin, Phone, Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Extract city from region configuration directly
  const city = region.defaultCity;

  // Subtle parallax for cinematic feel
  const imageY = useTransform(scrollY, [0, 800], [0, 150]);
  const textY = useTransform(scrollY, [0, 800], [0, -50]);

  const { colors } = agentConfig;

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col lg:flex-row overflow-hidden bg-background border-b border-black/[0.06]"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* LEFT: The "Editorial Authority" Column (48%) */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-8 md:px-16 xl:px-24 py-20 relative z-30">
        <motion.div
          style={{ y: textY }}
          className="flex flex-col h-full justify-center max-w-2xl"
        >
          {/* Nook-Inspired Social Proof (Trust Signal Above the Fold) */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#f9f6f0] overflow-hidden bg-muted shadow-md relative"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt={`${agentConfig.name} — satisfied client`}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div
                className="w-10 h-10 rounded-full border-2 border-[#f9f6f0] flex items-center justify-center text-[10px] font-bold text-white shadow-md relative"
                style={{ backgroundColor: colors.accent }}
              >
                +
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-accent text-accent"
                    />
                  ))}
                </div>
                <span className="text-xs font-sans font-bold ml-1" style={{ color: colors.primary }}>
                  {agentConfig.stats.googleRating.toFixed(1)}
                </span>
              </div>
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.25em]" style={{ color: colors.muted }}>
                {agentConfig.stats.reviewCount}+ Five-Star Reviews
              </span>
            </div>
          </div>

          {/* Vestire-Inspired Bold Typography */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[56px] xl:text-[72px] 2xl:text-[88px] font-light tracking-tight leading-[0.9] mb-10"
            style={{ color: colors.primary }}
          >
            Find Your <br />
            <span className="font-serif italic font-normal text-accent">Perfect Home</span> <br />
            with Confidence.
          </h1>

          <p 
            className="text-lg md:text-xl font-sans font-light leading-relaxed mb-12 max-w-lg opacity-80"
            style={{ color: colors.text }}
          >
            {city}’s premier{" "}
            <span className="font-serif italic font-normal text-accent">
              {region.agentTitle}
            </span>{" "}
            delivering bespoke real estate strategy and data-driven luxury
            service.
          </p>

          {/* Dual Call-To-Action Portal (Elite Buyer/Seller Redesign) */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full max-w-lg">
            <Button
              asChild
              className="h-14 px-8 rounded-none text-[11px] font-sans font-bold uppercase tracking-[0.25em] transition-all duration-500 border border-accent flex-1 justify-center"
              style={{ 
                backgroundColor: colors.accent, 
                color: colors.primary,
                borderRadius: "2px"
              }}
            >
              <Link href="/listings" className="flex items-center gap-2 group hover:bg-transparent hover:text-accent">
                Explore Portfolio
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-14 px-8 rounded-none text-[11px] font-sans font-bold uppercase tracking-[0.25em] transition-all duration-500 border flex-1 justify-center"
              style={{ 
                borderColor: `${colors.primary}30`,
                color: colors.primary,
                borderRadius: "2px",
                backgroundColor: "transparent"
              }}
            >
              <Link href="/valuation" className="flex items-center gap-2 hover:border-primary">
                Get Asset Valuation
              </Link>
            </Button>
          </div>

          {/* Landmarka-Inspired CTA Copy */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
            <Link
              href="/contact"
              className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] pb-1 transition-all relative group"
              style={{ color: colors.primary }}
            >
              Schedule a Private Consultation
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent transition-transform duration-300 origin-left scale-x-100 group-hover:scale-x-75" />
            </Link>
            <a
              href={`tel:${agentConfig.phoneRaw}`}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-accent/30 group-hover:border-accent group-hover:bg-accent/10">
                <Phone className="w-3.5 h-3.5" style={{ color: colors.accent }} />
              </div>
              <span className="text-[11px] font-sans font-bold tracking-[0.15em] uppercase" style={{ color: colors.primary }}>
                {agentConfig.phone}
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Cinematic Visual Anchor (52%) */}
      <div className="w-full lg:w-[52%] relative h-[600px] lg:h-auto overflow-hidden border-l border-black/[0.04]">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 h-[120%] -top-[10%]"
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=75&w=1200&auto=format&fit=crop"
            alt={`Luxury ${city} Residence`}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          {/* Subtle editorial lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        {/* Signature Portrait Inset (Scofield Style refined with Sharp Art-Deco Framing) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-12 left-12 z-40 hidden xl:flex items-center gap-5 bg-white/90 backdrop-blur-md p-4 border border-black/[0.04] shadow-2xl rounded-xs"
          style={{ borderRadius: "2px" }}
        >
          <div 
            className="relative w-14 h-14 overflow-hidden border border-accent/30 shadow-md"
            style={{ borderRadius: "2px" }}
          >
            <Image
              src={agentConfig.headshot}
              alt={agentConfig.headshotAlt}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div>
            <div className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] mb-1" style={{ color: colors.primary }}>
              {agentConfig.name}
            </div>
            <div className="text-xs font-serif italic text-foreground/80 leading-tight">
              Expertly navigating <br /> the <span className="font-serif italic text-accent font-normal">{city}</span> market.
            </div>
          </div>
        </motion.div>

        {/* Vestire-Inspired Property Detail Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-16 left-4 right-4 sm:left-auto sm:right-12 bg-white p-8 shadow-[0_45px_100px_rgba(0,0,0,0.18)] sm:max-w-[360px] z-30 group border border-black/[0.03]"
          style={{ borderRadius: "2px" }}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-accent">
                <MapPin className="w-3 h-3" />
                {agentConfig.markets[1]}
              </div>
              <p 
                className="text-2xl md:text-3xl font-serif font-light tracking-tight leading-none pt-1"
                style={{ color: colors.primary }}
              >
                The Obsidian Villa
              </p>
            </div>
            <Link 
              href="/listings"
              className="w-10 h-10 border flex items-center justify-center transition-all duration-500 hover:scale-105"
              style={{ 
                borderColor: colors.accent,
                backgroundColor: colors.accent,
                color: colors.primary,
                borderRadius: "2px"
              }}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-500 hover:rotate-12" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-black/[0.06] pt-5">
            <div className="flex flex-col">
              <span className="text-base font-serif font-light leading-none mb-1" style={{ color: colors.primary }}>
                {region.symbol}8,450,000
              </span>
              <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em]" style={{ color: colors.muted }}>
                Price
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-serif font-light leading-none mb-1" style={{ color: colors.primary }}>
                6,840
              </span>
              <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em]" style={{ color: colors.muted }}>
                {region.areaLabel}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-serif font-light leading-none mb-1" style={{ color: colors.primary }}>
                5 Bed
              </span>
              <span className="text-[8px] font-sans font-bold uppercase tracking-[0.2em]" style={{ color: colors.muted }}>
                Rooms
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

