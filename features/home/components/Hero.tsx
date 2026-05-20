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

  // Extract city from address dynamically
  const city = agentConfig.address.split(",").reverse()[1]?.trim() || "Austin";

  // Subtle parallax for cinematic feel
  const imageY = useTransform(scrollY, [0, 800], [0, 150]);
  const textY = useTransform(scrollY, [0, 800], [0, -50]);

  const { colors } = agentConfig;

  return (
    <section
      ref={containerRef}
      className="relative w-full flex flex-col lg:flex-row overflow-hidden bg-background"
      style={{ minHeight: "calc(100vh - 80px)" }}
    >
      {/* LEFT: The "Editorial Authority" Column (48%) */}
      <div className="w-full lg:w-[48%] flex flex-col justify-center px-8 md:px-16 xl:px-24 py-20 relative z-30">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col h-full justify-center max-w-2xl"
        >
          {/* Nook-Inspired Social Proof (Trust Signal Above the Fold) */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-muted shadow-sm"
                >
                  <Image
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                    alt="Client"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              ))}
              <div
                className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
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
                <span className="text-sm font-bold ml-1 text-foreground">
                  {agentConfig.stats.googleRating.toFixed(1)}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                {agentConfig.stats.reviewCount}+ Five-Star Reviews
              </span>
            </div>
          </div>

          {/* Vestire-Inspired Bold Typography */}
          <h1 className="text-6xl md:text-7xl xl:text-[94px] font-medium tracking-tight leading-[0.85] mb-10 text-foreground">
            Find Your <br />
            <span className="font-serif italic font-light text-accent">
              Perfect Home
            </span>{" "}
            <br />
            with Confidence.
          </h1>

          <p className="text-xl font-light leading-relaxed text-foreground/70 mb-12 max-w-lg">
            {city}’s premier{" "}
            <span className="font-serif italic font-medium text-foreground">
              {region.agentTitle}
            </span>{" "}
            delivering bespoke real estate strategy and data-driven luxury
            service.
          </p>

          {/* Scofield-Inspired Integrated Search Bar */}
          <div className="relative w-full max-w-xl mb-12 group">
            <div className="absolute inset-0 bg-accent/5 blur-xl group-hover:bg-accent/10 transition-all duration-500 rounded-2xl" />
            <div className="relative flex items-center bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-border p-2 rounded-xl">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder="City, Address, Neighborhood, Zip..."
                  className="w-full bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground/60 h-12"
                />
              </div>
              <Button
                asChild
                className="h-12 px-8 rounded-lg font-bold uppercase tracking-widest text-[10px] shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                style={{ backgroundColor: colors.primary, color: "white" }}
              >
                <Link href="/listings">Search Homes</Link>
              </Button>
            </div>
          </div>

          {/* Landmarka-Inspired CTA Copy */}
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <Link
              href="/contact"
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground border-b-2 border-accent pb-1 hover:text-accent transition-colors"
            >
              Schedule a Private Consultation
            </Link>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold tracking-wider">
                {agentConfig.phone}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Cinematic Visual Anchor (52%) */}
      <div className="w-full lg:w-[52%] relative h-[600px] lg:h-auto overflow-hidden">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 h-[120%] -top-[10%]"
        >
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
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

        {/* Signature Portrait Inset (Scofield Style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="absolute top-12 left-12 z-40 hidden xl:flex items-center gap-6 bg-white/10 backdrop-blur-xl p-4 border border-white/20 rounded-2xl"
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden ring-2 ring-white/50 shadow-2xl">
            <Image
              src={agentConfig.headshot}
              alt={agentConfig.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1">
              {agentConfig.name}
            </div>
            <div className="text-xs font-serif italic text-white leading-tight">
              Expertly Navigating <br /> the {city} Market.
            </div>
          </div>
        </motion.div>

        {/* Vestire-Inspired Property Detail Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-16 right-12 bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,0.15)] max-w-[360px] z-30 group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.3em] text-accent">
                <MapPin className="w-3 h-3" />
                {agentConfig.markets[1]}
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-foreground leading-none">
                The Obsidian Villa
              </h3>
            </div>
            <div className="w-12 h-12 bg-primary text-white flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-border pt-6">
            <div className="flex flex-col">
              <span className="text-lg font-medium">
                {region.symbol}8,450,000
              </span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                Price
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">6,840</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                {region.areaLabel}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">5 Bed</span>
              <span className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
                Rooms
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
