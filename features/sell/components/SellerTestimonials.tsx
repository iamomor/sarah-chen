"use client";

import testimonialsData from "@/content/testimonials/testimonials.json";
import type { Testimonial } from "@/types";
import { agentConfig } from "@/config/agent.config";
import { Star } from "lucide-react";
import Image from "next/image";

export default function SellerTestimonials() {
  // Read and typecast testimonials
  const testimonials = testimonialsData as Testimonial[];
  
  // Filter for seller role and take top 3
  const sellerTestimonials = testimonials
    .filter((t) => t.role === "Seller" || t.role === "Both")
    .slice(0, 3);

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white relative">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
              Fiduciary Testaments
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1a2744]">
            Proven <span className="italic font-medium text-[#c9a96e]">Client Success</span>
          </h2>
          <p className="text-slate-500 font-light text-base max-w-2xl mx-auto font-sans">
            Verified accounts from luxury clients who optimized their selling outcomes with {agentConfig.name}.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sellerTestimonials.map((testimonial, idx) => (
            <div 
              key={testimonial.id} 
              className={`bg-[#f9f6f0] p-8 rounded-none border border-slate-200/50 shadow-none flex flex-col h-full space-y-6 relative hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 ${
                idx === 2 ? "sm:col-span-2 lg:col-span-1 sm:max-w-md sm:mx-auto sm:w-full" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#c9a96e] text-[#c9a96e]" />
                  ))}
                </div>
                <span className="font-sans text-[9px] uppercase tracking-widest text-[#c9a96e] bg-[#c9a96e]/10 px-2.5 py-1">
                  {testimonial.source} Verified
                </span>
              </div>

              <p className="text-slate-600 font-light text-xs md:text-sm italic leading-relaxed flex-grow font-sans">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="pt-4 border-t border-slate-200/55 flex items-center gap-4">
                {testimonial.authorPhoto ? (
                  <div className="relative w-10 h-10 overflow-hidden bg-slate-100 flex-shrink-0 rounded-none border border-slate-200">
                    <Image
                      src={testimonial.authorPhoto}
                      alt={testimonial.authorName}
                      fill
                      className="object-cover"
                      quality={85}
                      sizes="44px"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-[#1a2744]/5 border border-slate-200 flex items-center justify-center font-bold text-[#1a2744] rounded-none font-sans text-xs">
                    {testimonial.authorName[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-xs md:text-sm text-[#1a2744] font-sans">{testimonial.authorName}</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-sans block mt-0.5">
                    Sold in {testimonial.neighborhood}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
