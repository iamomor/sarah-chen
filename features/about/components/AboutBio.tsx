"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";

export default function AboutBio() {
  const { headshot, headshotAlt, bookingUrl, colors, aboutPage } = agentConfig;
  const { eyebrow, heading, paragraphs, ctaText } = aboutPage.bio;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#f9f6f0]" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-24">
          
          {/* Left Column: Image with Decorative Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-[340px] sm:max-w-md mx-auto">
              {/* Outer Decorative Shape */}
              <div 
                className="absolute inset-0 translate-x-4 translate-y-4 border border-[#c9a96e] rounded-none z-0"
                style={{ borderColor: colors.accent }}
              />
              {/* Main Image Container */}
              <div className="relative h-full w-full overflow-hidden border border-[#c9a96e]/20 shadow-2xl z-10 bg-white">
                <Image
                  src={headshot}
                  alt={headshotAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center filter grayscale-[10%] hover:grayscale-0 transition-all duration-700"
                />
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="space-y-3">
              <span 
                className="text-[11px] font-bold uppercase tracking-[0.3em] font-sans block"
                style={{ color: colors.accent }}
              >
                {eyebrow}
              </span>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-serif font-light leading-tight text-[#1a2744]"
                style={{ color: colors.primary }}
              >
                {heading}
              </h2>
            </div>

            <div className="space-y-6 text-[#1a1a1a]/85 font-sans text-sm md:text-base font-light leading-relaxed">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4">
              <Button
                asChild
                className="group rounded-none text-white px-8 py-6 h-auto text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 font-sans shadow-md"
                style={{ backgroundColor: colors.accent }}
              >
                <Link href={bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  {ctaText} <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
