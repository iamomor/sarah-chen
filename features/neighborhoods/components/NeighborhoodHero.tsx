"use client";

import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  Map,
  MapPin,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HeroScene {
  id: string;
  label: string;  // short tab label
  title: string;  // caption shown on the image overlay
  url: string;    // image URL
}

interface NeighborhoodHeroProps {
  name: string;
  heroImage: string;
  tagline: string;
  city: string;
  state: string;
  /** Optional curated scenes from the neighborhood .md frontmatter.
   *  Falls back to a single scene using heroImage if not provided. */
  heroScenes?: HeroScene[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function NeighborhoodHero({
  name,
  heroImage,
  tagline,
  city,
  state,
  heroScenes,
}: NeighborhoodHeroProps) {
  const { colors, name: agentName } = agentConfig;

  // Derive scenes: use provided scenes, or fall back to a single default scene
  const scenes: HeroScene[] =
    heroScenes && heroScenes.length > 0
      ? heroScenes
      : [
          {
            id: "main",
            label: name,
            title: tagline,
            url: heroImage,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24"
      style={{ minHeight: "88vh", backgroundColor: colors.background }}
    >
      {/* ── Warm editorial background tint ── */}
      <div
        className="absolute top-0 right-0 w-[45%] h-full opacity-40 pointer-events-none z-0"
        style={{ backgroundColor: `${colors.accent}18` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ─────────────────────────────────────────────────────────────────
              LEFT COLUMN — Identity, Tagline & Action Hub
          ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center z-10 space-y-8 lg:pr-4">

            {/* Breadcrumb nav */}
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-slate-400"
            >
              <Link href="/" className="hover:text-slate-800 transition-colors duration-200">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <Link href="/neighborhoods" className="hover:text-slate-800 transition-colors duration-200">
                Neighborhoods
              </Link>
              <ChevronRight className="w-3 h-3 opacity-40" />
              <span style={{ color: colors.accent }}>{name}</span>
            </motion.nav>

            {/* Location + agent-title badge */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex"
            >
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2 border backdrop-blur-md bg-white/70 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                style={{ borderColor: `${colors.accent}40` }}
              >
                <MapPin className="w-3.5 h-3.5" style={{ color: colors.accent }} />
                <span className="font-sans text-[9px] tracking-[0.3em] uppercase font-bold text-slate-800">
                  {city}, {state}
                </span>
                <span className="w-px h-3.5 bg-slate-200" />
                {/* agentTitle adapts to US / AU / CA / UK via region config */}
                <span className="font-sans text-[9px] tracking-[0.2em] uppercase font-bold text-slate-500">
                  {region.agentTitle} Guide
                </span>
              </div>
            </motion.div>

            {/* Eyebrow + H1 */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif italic text-lg lg:text-xl font-light text-slate-500 block"
              >
                Curated Regional Profile
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-normal tracking-tight text-slate-900 leading-[0.95]"
                style={{ fontSize: "clamp(3rem, 7.5vw, 5.5rem)" }}
              >
                {name}
              </motion.h1>
            </div>

            {/* Gold accent line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-0.5 origin-left"
              style={{ backgroundColor: colors.accent }}
            />

            {/* Tagline — comes from neighborhood frontmatter, region-replaced by server */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-lg text-slate-700 font-light leading-relaxed tracking-wide cursor-pointer"
            >
              {tagline}
            </motion.p>

            {/* ── Action Hub — smooth in-page navigation ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {/* Primary CTA — scroll to listings */}
              <button
                onClick={() => handleScroll("listings")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border transition-all duration-300 group font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-white shadow-[0_10px_35px_rgba(26,39,68,0.15)] cursor-pointer"
                style={{ backgroundColor: colors.primary, borderColor: colors.primary }}
              >
                <span>Explore {region.listingPlatform} Listings</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secondary — scroll to map */}
              <button
                onClick={() => handleScroll("map")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border transition-all duration-300 font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-slate-700 bg-white hover:bg-slate-50 border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] cursor-pointer"
              >
                <Map className="w-3.5 h-3.5 text-slate-400" />
                <span>Interactive Map</span>
              </button>

              {/* Ghost — share */}
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 border transition-all duration-300 font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-slate-500 hover:text-slate-800 bg-transparent border-transparent hover:border-slate-200/50 cursor-pointer"
              >
                {shared ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Share Guide</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Agent advisory signature — fully config-driven */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 border-t border-slate-200/60 pt-6"
            >
              <Compass className="w-5 h-5 opacity-40 text-slate-500" />
              <span className="font-sans text-[10px] tracking-widest text-slate-400 uppercase font-medium">
                {/* agentName and regionName both come from config — zero hardcoding */}
                Personal Advisory by {agentName} • {region.regionName}
              </span>
            </motion.div>

          </div>

          {/* ─────────────────────────────────────────────────────────────────
              RIGHT COLUMN — Visual Scene Slider (data from heroScenes frontmatter)
          ───────────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 w-full flex flex-col items-center lg:items-end space-y-4">

            {/* Scene tab switcher — only visible when there are multiple scenes */}
            {scenes.length > 1 && (
              <div
                className="flex items-center gap-1 p-1 backdrop-blur-md border border-slate-200/60 bg-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] z-20 self-center lg:self-end"
              >
                {scenes.map((scene, index) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveIndex(index)}
                    className={`relative px-4 py-2 font-sans text-[8px] sm:text-[9px] tracking-widest uppercase font-bold transition-all duration-300 ${
                      activeIndex === index
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {activeIndex === index && (
                      <motion.div
                        layoutId="activeSceneTab"
                        className="absolute inset-0 z-0"
                        style={{ backgroundColor: colors.accent }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{scene.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* The framed visual panel */}
            <div
              className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] lg:aspect-[1.35] max-w-3xl overflow-hidden group shadow-[0_45px_100px_rgba(26,39,68,0.12)] bg-white p-3 border border-slate-200/50"
            >
              {/* Inner editorial frame line */}
              <div
                className="absolute inset-4 z-20 border pointer-events-none"
                style={{ borderColor: "rgba(255,255,255,0.28)" }}
              />
              {/* Accent border — animates on hover */}
              <div
                className="absolute inset-0 z-20 border pointer-events-none transition-all duration-700 group-hover:inset-2"
                style={{ borderColor: `${colors.accent}40` }}
              />

              {/* Slider with cross-fade + scale */}
              <div className="relative w-full h-full overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={scenes[activeIndex].id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1.01 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={scenes[activeIndex].url}
                      alt={`${scenes[activeIndex].title} — ${name}`}
                      fill
                      priority={activeIndex === 0}
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover object-center select-none"
                    />

                    {/* Cinematic vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent z-10 pointer-events-none" />

                    {/* Caption card — title from frontmatter, accent from config */}
                    <div className="absolute bottom-4 left-4 right-4 z-30 p-4 bg-slate-900/80 backdrop-blur-md border border-white/10 space-y-0.5">
                      <span
                        className="font-sans text-[8px] tracking-[0.25em] uppercase font-bold block"
                        style={{ color: colors.accent }}
                      >
                        Scene {activeIndex + 1} of {scenes.length} • {name}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-light tracking-wide text-white">
                        {scenes[activeIndex].title}
                      </h4>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 right-8 sm:right-12 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-slate-400 rotate-90 origin-center mb-3">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </motion.div>

      {/* ── Bottom accent line — color from config ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-[1px] opacity-20"
        style={{ backgroundColor: colors.accent }}
      />
    </section>
  );
}
