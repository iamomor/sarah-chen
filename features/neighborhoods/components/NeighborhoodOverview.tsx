"use client";

import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodOverviewProps {
  name: string;
  description: string;
}

export default function NeighborhoodOverview({
  name,
  description,
}: NeighborhoodOverviewProps) {
  const { colors } = agentConfig;

  return (
    <section 
      className="relative w-full py-14 sm:py-20 md:py-28 bg-[#f9f6f0] overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Delicate background logo/accent circle */}
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-[0.015] pointer-events-none"
        style={{ border: `2px solid ${colors.accent}` }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Typographic Left Label */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex flex-col justify-start"
          >
            <div 
              className="border-l-2 pl-6 space-y-3"
              style={{ borderColor: colors.accent }}
            >
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block">
                Neighborhood Profile
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight leading-tight">
                An Insider’s <br />
                <span className="italic font-light" style={{ color: colors.accent }}>Perspective</span>
              </h2>
            </div>
          </motion.div>

          {/* Right Prose Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="max-w-prose text-slate-700 text-base sm:text-lg leading-relaxed font-light space-y-6">
              {/* Splitting paragraphs by double newlines for proper editorial structure */}
              {description?.split(/\n\n+/).map((paragraph, index) => {
                if (index === 0) {
                  const trimmed = paragraph.trim();
                  const firstChar = trimmed.charAt(0);
                  const rest = trimmed.slice(1);
                  return (
                    <p key={index} className="relative">
                      {/* Premium Drop Cap */}
                      <span 
                        className="text-6xl font-serif font-normal mr-3 float-left leading-[0.75] mt-1.5 select-none"
                        style={{ color: colors.accent }}
                      >
                        {firstChar}
                      </span>
                      {rest}
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-slate-600">
                    {paragraph.trim()}
                  </p>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

