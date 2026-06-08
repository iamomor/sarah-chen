"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { agentConfig } from "@/config/agent.config";

export default function BuyerResources() {
  const { resources } = agentConfig.buyPage;

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#ffffff] border-t border-slate-200/60">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] block">
            {resources.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1a2744]">
            {resources.heading} <span className="italic font-medium text-[#c9a96e]">{resources.headingAccent}</span>
          </h2>
          <p className="text-slate-500 font-light text-xs max-w-md mx-auto leading-relaxed">
            {resources.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resources.cards.map((card, idx) => {
            const Icon = Icons[card.iconName as keyof typeof Icons] as React.ElementType || Icons.ArrowRight;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f9f6f0] p-8 md:p-10 border border-[#1a2744]/5 flex flex-col justify-between h-full group transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
              >
                <div className="space-y-6">
                  <div className="w-14 h-14 bg-[#1a2744] text-[#c9a96e] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#c9a96e] block">
                      {card.subtitle}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#1a2744] group-hover:text-[#c9a96e] transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-slate-500 font-light text-xs leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <Link
                  href={card.link}
                  className="pt-8 flex items-center text-[10px] font-bold tracking-widest text-[#c9a96e] uppercase gap-1.5 border-t border-slate-200/50 mt-6 group-hover:text-[#1a2744] transition-colors hover:no-underline"
                >
                  {card.linkText} <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
