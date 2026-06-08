"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type TestimonialFilterType = "all" | "buyer" | "seller" | "google" | "zillow";

interface TestimonialsFiltersProps {
  activeFilter: TestimonialFilterType;
  onFilterChange: (filter: TestimonialFilterType) => void;
}

export default function TestimonialsFilters({
  activeFilter,
  onFilterChange,
}: TestimonialsFiltersProps) {
  // Elevated, premium real-estate advisory terminology for psychological weight
  const filterTabs: { id: TestimonialFilterType; label: string }[] = [
    { id: "all", label: "All Endorsements" },
    { id: "buyer", label: "Acquisitions" },
    { id: "seller", label: "Dispositions" },
    { id: "google", label: "Google Verified" },
    { id: "zillow", label: "Zillow Verified" },
  ];

  return (
    <div className="w-full flex justify-center mb-12">
      {/* Premium Glassmorphic Selector Container */}
      <div className="bg-slate-100/40 backdrop-blur-md border border-slate-200/50 p-1.5 rounded-none flex items-center max-w-full overflow-x-auto scrollbar-none snap-x snap-mandatory shadow-[0_4px_25px_rgba(0,0,0,0.01)]">
        <div className="flex gap-1">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onFilterChange(tab.id)}
                className={cn(
                  "relative px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-500 focus:outline-none snap-start rounded-none z-10",
                  isActive ? "text-[#1a2744]" : "text-slate-400 hover:text-slate-600 cursor-pointer"
                )}
              >
                <span className="relative z-10">{tab.label}</span>
                
                {/* Framer Motion Sliding Glass Capsule Backdrop */}
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBorder"
                    className="absolute inset-0 bg-white border border-slate-200/40 shadow-[0_2px_10px_rgba(26,39,68,0.04)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    style={{ zIndex: 0 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
