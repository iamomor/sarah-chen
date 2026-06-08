"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { agentConfig } from "@/config/agent.config";
import { Star } from "lucide-react";

interface QnaItem {
  q: string;
  a: string;
}

interface NeighborhoodQnaProps {
  name: string;
  qna?: QnaItem[];
}

export default function NeighborhoodQna({ name, qna }: NeighborhoodQnaProps) {
  const { colors } = agentConfig;

  const items = qna || [
    {
      q: `What is the general lifestyle in ${name}?`,
      a: `${name} is characterized by a refined lifestyle, combining exceptional security, historical or contemporary estate prestige, and easy access to both nature trails and fine dining.`,
    },
    {
      q: `How is the real estate investment potential here?`,
      a: "Historically, properties in this corridor exhibit remarkable price resilience. High demand for properties coupled with strict neighborhood zoning protections supports steady long-term appreciation.",
    },
    {
      q: `Are there off-market opportunities in ${name}?`,
      a: "Yes. Due to seller privacy and the exclusive profile of transactions, many properties sell privately off-market. Contact us directly to review off-market pocket listings.",
    },
  ];

  return (
    <section 
      id="qna"
      style={{
        backgroundColor: "white",
        "--accent-color": colors.accent,
        "--primary-color": colors.primary,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 border-t border-slate-200/40"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: colors.accent }}>
              Insider Intelligence
            </span>
            <div className="h-[1px] w-6" style={{ backgroundColor: colors.accent }} />
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light"
            style={{ color: colors.primary }}
          >
            Frequently Asked <span className="italic font-medium">Questions</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            Everything you need to know about properties, schools, and lifestyles in {name}.
          </p>
        </div>

        {/* Q&A Accordion */}
        <div className="border border-slate-200/50 p-6 md:p-10 shadow-[0_30px_70px_rgba(26,39,68,0.015)] bg-slate-50/30">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200/40 bg-white rounded-none transition-all duration-500 hover:border-slate-300"
              >
                <AccordionTrigger 
                  className="px-6 py-5 text-left hover:no-underline text-slate-800 text-sm font-semibold uppercase tracking-wider flex items-center justify-between group outline-none focus:outline-none"
                >
                  <span className="flex items-center gap-4">
                    <span 
                      className="font-serif text-xs font-medium tracking-wider"
                      style={{ color: colors.accent }}
                    >
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="group-hover:text-[var(--primary-color)] transition-colors duration-300">
                      {item.q}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-sm text-slate-600 font-light leading-relaxed pl-12 pt-1 border-t border-slate-50 bg-[#f9f6f0]/20">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Legal Advisory Footer */}
        <div className="mt-8 text-center">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-1.5">
            <Star className="w-3 h-3 text-[var(--accent-color)]" style={{ color: colors.accent }} />
            Direct Consultation Recommended for Zoning Mappings
          </span>
        </div>

      </div>
    </section>
  );
}
