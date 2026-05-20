"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Calculator, Map, ArrowRight } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

export default function BuyerResources() {
  return (
    <section className="py-24 md:py-32 bg-[#ffffff] border-t border-slate-200/60">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] block">
            Knowledge Library
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1a2744]">
            Exclusive <span className="italic font-medium text-[#c9a96e]">Buyer Resources</span>
          </h2>
          <p className="text-slate-500 font-light text-xs max-w-md mx-auto leading-relaxed">
            Equip yourself with the same analytical tools, regional guidelines, and transaction logs our agents deploy daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* Resource Card 2: Mortgage Calculator */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-[#f9f6f0] p-8 md:p-10 border border-[#1a2744]/5 flex flex-col justify-between h-full group transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 bg-[#1a2744] text-[#c9a96e] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-6">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c9a96e] block">
                  Interactive Tool • Online
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1a2744] group-hover:text-[#c9a96e] transition-colors">
                  Mortgage Calculator
                </h3>
                <p className="text-slate-500 font-light text-xs leading-relaxed">
                  Analyze premium jumbo mortgage scenarios, custom amortization breakdowns, current down payments, and carry costs with our real-time regional indices.
                </p>
              </div>
            </div>
            <Link
              href="/calculator"
              className="pt-8 flex items-center text-[10px] font-bold tracking-widest text-[#c9a96e] uppercase gap-1.5 border-t border-slate-200/50 mt-6 group-hover:text-[#1a2744] transition-colors hover:no-underline"
            >
              Open Calculator <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Resource Card 3: Explore Neighborhoods */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="bg-[#f9f6f0] p-8 md:p-10 border border-[#1a2744]/5 flex flex-col justify-between h-full group transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
          >
            <div className="space-y-6">
              <div className="w-14 h-14 bg-[#1a2744] text-[#c9a96e] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:rotate-6">
                <Map className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#c9a96e] block">
                  Regional Intelligence • Guides
                </span>
                <h3 className="font-serif text-xl font-bold text-[#1a2744] group-hover:text-[#c9a96e] transition-colors">
                  Explore Neighborhoods
                </h3>
                <p className="text-slate-500 font-light text-xs leading-relaxed">
                  Dive into detailed micro-market reports, school performance metrics, historical appreciation charts, and off-market profiles for {agentConfig.mapCenter.city}&apos;s premier neighborhoods.
                </p>
              </div>
            </div>
            <Link
              href="/neighborhoods"
              className="pt-8 flex items-center text-[10px] font-bold tracking-widest text-[#c9a96e] uppercase gap-1.5 border-t border-slate-200/50 mt-6 group-hover:text-[#1a2744] transition-colors hover:no-underline"
            >
              Explore Regions <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
