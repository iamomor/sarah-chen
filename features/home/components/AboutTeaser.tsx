"use client";

import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { motion } from "framer-motion";
import { ArrowRight, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function AboutTeaser() {
  const { colors, stats, name, headshot, headshotAlt, shortBio, title } =
    agentConfig;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const credentials = [
    {
      value: `${stats.homesSold}+`,
      label: "Estates Sold",
    },
    {
      value: `${stats.yearsExperience} Yrs`,
      label: "Experience",
    },
    {
      value: stats.googleRating.toFixed(1),
      label: "Client Rating",
    },
  ];

  return (
    <section
      className="py-14 sm:py-20 lg:py-24 overflow-hidden border-b border-black/[0.06] relative"
      style={{ backgroundColor: colors.background }}
    >
      {/* Delicate geometric background line */}
      <div 
        className="absolute top-0 right-1/4 w-[1px] h-full opacity-[0.03] pointer-events-none"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div
          ref={ref}
          className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20"
        >
          {/* Left: Editorial Portrait Asymmetrical Gallery (45%) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] relative px-3 sm:px-0"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Double-offset framing for an art gallery aesthetic */}
              <div
                className="absolute -top-2.5 -left-2.5 sm:-top-4 sm:-left-4 w-full h-full border border-accent/40 rounded-xs pointer-events-none"
                style={{ borderRadius: "2px" }}
              />
              <div
                className="absolute -bottom-2.5 -right-2.5 sm:-bottom-4 sm:-right-4 w-full h-full border border-primary/10 rounded-xs pointer-events-none"
                style={{ borderRadius: "2px" }}
              />

              {/* Photo container — elegant vertical aspect ratio */}
              <div 
                className="relative aspect-[3/4] w-full overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01]"
                style={{ borderRadius: "2px" }}
              >
                <Image
                  src={headshot}
                  alt={headshotAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>

              {/* Float career volume badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-6 -right-6 bg-white px-6 py-4 shadow-xl border border-black/[0.04] rounded-xs hidden md:block"
                style={{ borderRadius: "2px" }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}06` }}
                  >
                    <Award
                      className="w-5 h-5"
                      style={{ color: colors.accent }}
                    />
                  </div>
                  <div>
                    <div
                      className="text-xl font-serif font-light leading-tight"
                      style={{ color: colors.primary }}
                    >
                      {stats.careerSalesVolume}
                    </div>
                    <div
                      className="text-[9px] font-sans font-bold uppercase tracking-[0.25em]"
                      style={{ color: colors.muted }}
                    >
                      Career Volume
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text Content Editorial Layout (55%) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full lg:w-[55%]"
          >
            <div className="space-y-8 max-w-xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-sans font-bold uppercase tracking-[0.4em]"
                  style={{ color: colors.accent }}
                >
                  THE ART OF REPRESENTATION
                </span>
              </div>

              {/* Massive, Prestige Headline */}
              <h2
                className="text-4xl md:text-5xl lg:text-[54px] font-serif font-light leading-[1.1] tracking-tight"
                style={{ color: colors.primary }}
              >
                Advising with <span className="font-serif italic font-normal text-accent">Discretion.</span> <br />
                Negotiating with <span className="font-serif italic font-normal text-accent">Objectivity.</span>
              </h2>

              {/* Sub-label showing current title */}
              <div
                className="text-xs font-sans font-bold uppercase tracking-[0.25em]"
                style={{ color: colors.primary }}
              >
                {name} <span className="mx-2 text-accent">|</span> {title}
              </div>

              {/* Editorial Pull-Quote */}
              <blockquote
                className="border-l-[2px] pl-6 py-1"
                style={{ borderColor: colors.accent }}
              >
                <p
                  className="text-lg md:text-xl font-serif italic leading-relaxed text-foreground/80"
                >
                  &ldquo;Every transaction deserves the gravity of fiduciary representation. My clients don&apos;t get standard service — they get an advocate.&rdquo;
                </p>
              </blockquote>

              {/* Short Bio */}
              <p
                className="text-sm md:text-base leading-relaxed font-sans font-light opacity-80"
                style={{ color: colors.text }}
              >
                {shortBio}
              </p>

              {/* Typographic Credentials (No bulky icons) */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-black/[0.06]">
                {credentials.map((cred, idx) => {
                  return (
                    <div key={idx} className="flex flex-col">
                      <span
                        className="text-2xl lg:text-3xl font-serif font-light leading-none mb-2"
                        style={{ color: colors.primary }}
                      >
                        {cred.value}
                      </span>
                      <span
                        className="text-[9px] font-sans font-bold uppercase tracking-[0.2em]"
                        style={{ color: colors.muted }}
                      >
                        {cred.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Elegant Button with Dual-State Hover */}
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="rounded-none text-[11px] font-sans font-bold uppercase tracking-[0.25em] px-10 py-5 h-auto transition-all duration-500 group border border-accent"
                  style={{ 
                    backgroundColor: colors.accent, 
                    color: colors.primary,
                    borderRadius: "2px" 
                  }}
                >
                  <Link
                    href="/about"
                    className="flex items-center gap-3 hover:bg-transparent hover:text-accent"
                  >
                    Read My Full Story
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

