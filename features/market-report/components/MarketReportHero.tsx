"use client";

import { agentConfig } from "@/config/agent.config";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MarketReportHeroProps {
  onSelectNeighborhood: (neighborhood: string) => void;
  selectedNeighborhood: string;
  isScanning: boolean;
  scanStep: string;
}

export default function MarketReportHero({
  onSelectNeighborhood,
  selectedNeighborhood,
  isScanning,
  scanStep,
}: MarketReportHeroProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const city = agentConfig.mapCenter.city;

  const neighborhoods = ["All " + city, ...agentConfig.markets];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1a2744]">
      {/* Background Image & Luxury Solid Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1a2744]/80 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
          alt={`Luxury Architecture`}
          fill
          className="object-cover object-center scale-105"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-20 text-center max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: isScanning ? "blur(8px) scale(0.98)" : "blur(0px) scale(1)"
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <div className="flex justify-center items-center gap-3">
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
              Proprietary Market Intelligence
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white tracking-tight leading-[1.05] font-light">
            {city} Market <br />
            <span className="italic font-medium text-[#c9a96e]">Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-light max-w-2xl mx-auto leading-relaxed font-sans">
            Real-time analytics across {city}&apos;s luxury residential sectors. Select a neighborhood corridor below to aggregate live transaction statistics.
          </p>

          {/* Interactive Neighborhood Selection */}
          <div className="relative w-full max-w-md mx-auto pt-6" ref={dropdownRef}>
            <div className="relative z-40">
              <button
                type="button"
                onClick={() => !isScanning && setIsOpen(!isOpen)}
                disabled={isScanning}
                className="w-full h-14 px-6 bg-white/10 backdrop-blur-xl border border-white/20 hover:border-[#c9a96e] text-white flex items-center justify-between text-sm tracking-wider font-medium font-sans uppercase transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.3)] select-none cursor-pointer"
              >
                <span className="truncate">
                  {isScanning ? "Compiling Data..." : selectedNeighborhood}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#c9a96e] transition-transform duration-500 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 w-full mt-2 bg-[#1a2744] border border-[#c9a96e]/20 max-h-60 overflow-y-auto z-50 shadow-2xl scrollbar-thin scrollbar-thumb-[#c9a96e]/30"
                  >
                    {neighborhoods.map((n) => (
                      <li key={n}>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectNeighborhood(n);
                            setIsOpen(false);
                          }}
                          className={`w-full h-12 px-6 text-left text-xs uppercase tracking-widest transition-all duration-200 hover:bg-[#c9a96e] hover:text-[#1a2744] font-sans flex items-center justify-between cursor-pointer ${
                            selectedNeighborhood === n
                              ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                              : "text-slate-300"
                          }`}
                        >
                          {n}
                          {selectedNeighborhood === n && (
                            <span className="text-[8px] bg-[#c9a96e] text-[#1a2744] px-1.5 py-0.5 font-bold">
                              Active
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Glowing accent backdrops */}
            <div className="absolute inset-0 bg-[#c9a96e]/5 blur-2xl -z-10 rounded-full" />
          </div>

          <div className="pt-8 text-white/40 text-[9px] uppercase tracking-[0.25em] font-bold font-sans flex items-center justify-center gap-2">
            <span>★</span> Verified MLS Stream <span>★</span> Discretion Guaranteed
          </div>
        </motion.div>
      </div>

      {/* Simulated Scanner Sequence Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1a2744]/90 backdrop-blur-md z-50 flex flex-col items-center justify-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md w-full bg-[#1a2744]/55 backdrop-blur-xl border border-white/10 p-8 md:p-10 shadow-2xl relative text-center space-y-6"
            >
              {/* Perfect border-aligned gold corner accents */}
              <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-[#c9a96e]" />
              <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-[#c9a96e]" />
              <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-[#c9a96e]" />
              <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-[#c9a96e]" />

              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full border border-[#c9a96e]/20" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t border-l border-[#c9a96e]"
                />
                {/* Inner counter-rotating ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-b border-r border-[#c9a96e]/50"
                />
                
                {/* Premium Geometric Center Icon */}
                <div className="z-10 text-[#c9a96e] animate-pulse">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                  </svg>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c9a96e] flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-ping" />
                  Analyzing {selectedNeighborhood}
                </div>
                <h3 className="text-base font-serif italic text-white font-light h-14 flex items-center justify-center px-4 leading-relaxed">
                  {scanStep}
                </h3>
              </div>

              {/* Progress track */}
              <div className="h-[2px] w-40 bg-white/10 mx-auto overflow-hidden relative">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Editorial Border Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a96e]/30 to-transparent z-20" />
    </section>
  );
}
