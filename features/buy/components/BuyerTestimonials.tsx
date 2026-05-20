"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import type { Testimonial } from "@/types";
import testimonialsData from "@/content/testimonials/testimonials.json";
import { Button } from "@/components/ui/button";

export default function BuyerTestimonials() {
  // Filter buyer-specific testimonials (role is "Buyer" or "Both")
  const buyerTestimonials = (testimonialsData as Testimonial[])
    .filter((t) => t.role === "Buyer")
    .slice(0, 3);

  return (
    <section className="py-24 bg-[#f9f6f0] border-t border-slate-200/60">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] block">
              Acquisition Case Studies
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1a2744]">
              Validated Success by <span className="italic font-medium text-[#c9a96e]">{agentConfig.mapCenter.city} Buyers</span>
            </h2>
          </div>
          
          <ButtonLink />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {buyerTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white p-8 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.01)] flex flex-col justify-between hover:border-[#c9a96e]/30 transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={i < testimonial.rating ? "text-[#c9a96e] text-sm" : "text-slate-200 text-sm"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-[9px] uppercase tracking-widest text-emerald-500 font-bold ml-2 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>

                <p className="text-slate-600 font-serif italic text-sm leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-8">
                {testimonial.authorPhoto ? (
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#c9a96e]/20 flex-shrink-0">
                    <Image
                      src={testimonial.authorPhoto}
                      alt={testimonial.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#1a2744] text-[#c9a96e] border border-[#c9a96e]/20 flex items-center justify-center font-bold text-xs uppercase flex-shrink-0">
                    {testimonial.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1a2744]">
                    {testimonial.authorName}
                  </h4>
                  <p className="text-[9px] text-[#c9a96e] tracking-wide mt-0.5">
                    Acquired in {testimonial.neighborhood || agentConfig.mapCenter.city} • {testimonial.source}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Small subcomponent to keep code clean and readable
function ButtonLink() {
  return (
    <Link
      href="/testimonials"
      className="inline-flex items-center gap-1.5 text-[#1a2744] hover:text-[#c9a96e] font-bold uppercase tracking-widest text-[10px] border-b-2 border-[#c9a96e] pb-1 transition-all group hover:no-underline"
    >
      See All {agentConfig.stats.reviewCount} Reviews{" "}
      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}
