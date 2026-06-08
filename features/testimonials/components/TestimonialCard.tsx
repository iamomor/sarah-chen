"use client";

import type { Testimonial } from "@/types";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Star, Quote, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Localized date formatting based on active region
  const formattedDate = new Date(testimonial.date).toLocaleDateString(
    region.language || "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  // Helper to extract initials for custom luxury monograms
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0]?.[0] || ""}${parts[parts.length - 1]?.[0] || ""}`.toUpperCase();
    }
    return (name[0] || "").toUpperCase();
  };

  // Luxury transaction terms to optimize user psychology
  const getTransactionBadge = (role: string) => {
    switch (role) {
      case "Buyer":
        return "Estate Acquisition";
      case "Seller":
        return "Premium Disposition";
      case "Both":
      default:
        return "Asset Optimization";
    }
  };

  // Custom inline SVG icons for verified premium sources
  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Google":
        return (
          <svg className="w-3 h-3 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#c9a96e"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#1a2744"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#c9a96e"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#1a2744"
            />
          </svg>
        );
      case "Zillow":
        return (
          <svg
            className="w-3 h-3 mr-1.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M12 2L2 12h3v8h14v-8h3L12 2z"
              className="text-[#c9a96e]"
              fill="#c9a96e"
            />
            <path
              d="M12 7l4 4H8l4-4z"
              fill="white"
              className="text-white"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-white p-8 md:p-10 border border-slate-200/60 shadow-[0_4px_25px_rgba(0,0,0,0.008)] hover:shadow-[0_20px_45px_rgba(193,154,107,0.06)] hover:border-[#c9a96e]/30 transition-all duration-500 rounded-none h-full overflow-hidden"
    >
      {/* Structural subtle blueprint background line */}
      <div className="absolute top-0 right-0 w-[4rem] h-[4rem] opacity-[0.02] pointer-events-none bg-[radial-gradient(#c9a96e_1px,transparent_1px)] bg-[size:10px_10px]" />
      
      {/* Luxury gold accent line on top border hover */}
      <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#c9a96e] group-hover:w-full transition-all duration-700" />

      {/* Star Ratings & Verified Badge */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < testimonial.rating
                  ? "fill-[#c9a96e] text-[#c9a96e]"
                  : "text-slate-100 fill-slate-100"
              }`}
            />
          ))}
        </div>
        
        {/* Source Stamp */}
        <span className="flex items-center text-[9px] uppercase font-bold tracking-[0.2em] px-3 py-1 border border-slate-100 bg-slate-50 text-slate-500">
          {getSourceIcon(testimonial.source)}
          {testimonial.source === "Direct" ? "Verified Registry" : `${testimonial.source} AUDIT`}
        </span>
      </div>

      {/* Quote Icon */}
      <div className="text-slate-100/70 absolute right-8 top-12 pointer-events-none group-hover:text-[#c9a96e]/5 transition-colors duration-700">
        <Quote className="w-12 h-12 stroke-[1]" />
      </div>

      {/* Quote Body Text */}
      <blockquote className="flex-1 text-[14px] md:text-[15px] leading-relaxed text-slate-600 font-light mb-8 italic relative z-10">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>

      {/* Author details & Metadata */}
      <div className="pt-6 border-t border-slate-100 mt-auto relative z-10">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Avatar + name/meta — min-w-0 allows truncation */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar with contained dual-ring effect */}
            <div className="relative shrink-0 w-11 h-11">
              {/* Outer decorative rings — absolutely positioned, clipped by parent overflow */}
              <div className="absolute -inset-1.5 rounded-full border border-[#c9a96e]/25 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 ease-out" />
              <div className="absolute -inset-1 rounded-full border border-[#1a2744]/10 group-hover:scale-105 group-hover:-rotate-12 transition-all duration-700 ease-out" />

              <div className="relative w-11 h-11 rounded-full overflow-hidden bg-slate-50 border border-slate-200/50 flex items-center justify-center shadow-inner">
                {testimonial.authorPhoto ? (
                  <Image
                    src={testimonial.authorPhoto}
                    alt={testimonial.authorName}
                    width={44}
                    height={44}
                    sizes="44px"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-tr from-[#1a2744] to-[#1a2744]/90 flex items-center justify-center">
                    <span className="text-[11px] font-serif font-bold tracking-widest text-[#c9a96e] uppercase">
                      {getInitials(testimonial.authorName)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name + meta — min-w-0 + truncate prevents overflow */}
            <div className="min-w-0">
              <h4 className="font-serif font-bold text-[#1a2744] text-[14px] tracking-wide truncate">
                {testimonial.authorName}
              </h4>
              <div className="flex items-center gap-1.5 mt-0.5 text-slate-400 flex-wrap">
                <span className="text-[10px] font-medium tracking-wide whitespace-nowrap">
                  {formattedDate}
                </span>
                {testimonial.neighborhood && (
                  <>
                    <span className="text-[8px]">•</span>
                    <span className="flex items-center text-[10px] font-medium whitespace-nowrap">
                      <MapPin className="w-3 h-3 mr-0.5 text-[#c9a96e]/85 shrink-0" />
                      {testimonial.neighborhood}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Badge — shrink-0 keeps it from squashing, but it will wrap gracefully */}
          <Badge
            variant="outline"
            className="shrink-0 rounded-none text-[8px] uppercase font-bold tracking-[0.15em] px-2.5 py-1.5 border-slate-200 text-[#1a2744] bg-slate-50/50 hover:bg-transparent whitespace-nowrap"
          >
            {getTransactionBadge(testimonial.role)}
          </Badge>
        </div>
      </div>
    </div>
  );
}
