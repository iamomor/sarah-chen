import React from "react";
import Image from "next/image";
import Link from "next/link";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Calendar, Phone, Mail, ArrowRight } from "lucide-react";

interface NeighborhoodCTAProps {
  name: string;
}

export default function NeighborhoodCTA({ name }: NeighborhoodCTAProps) {
  const {
    name: agentName,
    title: agentTitle,
    headshot,
    headshotAlt,
    bookingUrl,
    phone,
    phoneRaw,
    email,
    licenseNumber,
    brokerage,
    stats,
    colors,
  } = agentConfig;

  return (
    <section 
      id="cta"
      style={{ 
        backgroundColor: colors.primary,
        "--accent-color": colors.accent,
        "--primary-color": colors.primary,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 text-white overflow-hidden border-t border-slate-800"
    >
      {/* Decorative luxury gradient/overlay */}
      <div 
        style={{
          background: `radial-gradient(circle at bottom right, ${colors.accent}1b, transparent 65%)`
        }}
        className="absolute inset-0 pointer-events-none animate-pulse-slow" 
      />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text / Info Column */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span 
                style={{ color: colors.accent }}
                className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold block"
              >
                Bespoke Real Estate Advisory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight leading-tight">
                Interested in {name} Real Estate?
              </h2>
              <p className="font-sans text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-xl">
                Get insider market intel, access to private off-market listings, and curated guidance from {region.defaultCity}&apos;s premier {region.agentTitle} specialist.
              </p>
            </div>

            {/* Agent Stats Strip */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10 max-w-lg">
              <div className="space-y-1">
                <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 block">
                  Career Volume
                </span>
                <span 
                  style={{ color: colors.accent }}
                  className="font-serif text-xl sm:text-2xl font-normal"
                >
                  {stats.careerSalesVolume}
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 block">
                  Homes Sold
                </span>
                <span 
                  style={{ color: colors.accent }}
                  className="font-serif text-xl sm:text-2xl font-normal"
                >
                  {stats.homesSold}
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-sans text-[9px] uppercase tracking-widest text-slate-400 block">
                  Experience
                </span>
                <span 
                  style={{ color: colors.accent }}
                  className="font-serif text-xl sm:text-2xl font-normal"
                >
                  {stats.yearsExperience} Yrs
                </span>
              </div>
            </div>

            {/* Direct Booking & Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: colors.accent, 
                  color: colors.primary 
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-sans text-[10px] uppercase tracking-widest font-bold transition-all duration-300 shadow-lg hover:opacity-90 active:scale-95"
              >
                <span>Schedule a {name} Tour</span>
                <Calendar className="w-4 h-4" />
              </Link>
              
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-white hover:bg-white/5 font-sans text-[10px] uppercase tracking-widest font-bold transition-all duration-300 active:scale-95"
              >
                <span>Request Market Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Agent Profile Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 rounded-none p-8 space-y-6 shadow-[0_30px_70px_rgba(0,0,0,0.2)] hover:border-white/20 transition-all duration-500">
              
              {/* Headshot & Info */}
              <div className="flex items-center gap-6">
                <div 
                  style={{ borderColor: colors.accent }}
                  className="relative w-24 h-24 rounded-full overflow-hidden border-2"
                >
                  <Image
                    src={headshot}
                    alt={headshotAlt}
                    fill
                    className="object-cover object-center"
                    sizes="96px"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-normal text-white">
                    {agentName}
                  </h3>
                  <p 
                    style={{ color: colors.accent }}
                    className="font-sans text-[10px] tracking-wider uppercase font-semibold"
                  >
                    {agentTitle}
                  </p>
                  <p className="font-sans text-[9px] text-slate-400">
                    {brokerage} • {licenseNumber}
                  </p>
                </div>
              </div>

              {/* Direct Contact Links */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <a
                  href={`tel:${phoneRaw}`}
                  className="flex items-center gap-4 transition-colors duration-300 group hover:text-[var(--accent-color)]"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-white/10 group-hover:text-[var(--accent-color)] transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-sm font-light">
                    {phone}
                  </span>
                </a>
                
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 transition-colors duration-300 group hover:text-[var(--accent-color)]"
                >
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-300 group-hover:bg-white/10 group-hover:text-[var(--accent-color)] transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-sans text-sm font-light truncate">
                    {email}
                  </span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
