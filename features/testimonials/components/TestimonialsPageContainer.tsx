"use client";

import { Suspense, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Testimonial } from "@/types";
import testimonialsData from "@/content/testimonials/testimonials.json";
import { agentConfig } from "@/config/agent.config";

import TestimonialsHeader from "./TestimonialsHeader";
import RatingDistribution from "./RatingDistribution";
import TestimonialsFilters, { type TestimonialFilterType } from "./TestimonialsFilters";
import TestimonialCard from "./TestimonialCard";
import ReviewCTA from "./ReviewCTA";

const testimonials = testimonialsData as Testimonial[];

// Inner content component that uses useSearchParams
function TestimonialsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read 'type' query parameter from URL, defaulting to 'all'
  const activeFilter = useMemo(() => {
    const typeParam = searchParams.get("type")?.toLowerCase();
    if (["buyer", "seller", "google", "zillow"].includes(typeParam || "")) {
      return typeParam as TestimonialFilterType;
    }
    return "all";
  }, [searchParams]);

  // Handle tab filter change, updating URL search parameters smoothly
  const handleFilterChange = (filter: TestimonialFilterType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") {
      params.delete("type");
    } else {
      params.set("type", filter);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter and sort testimonials list
  const filteredAndSortedTestimonials = useMemo(() => {
    // 1. Filter logic
    let list = [...testimonials];
    if (activeFilter === "buyer") {
      list = list.filter((t) => t.role === "Buyer" || t.role === "Both");
    } else if (activeFilter === "seller") {
      list = list.filter((t) => t.role === "Seller" || t.role === "Both");
    } else if (activeFilter === "google") {
      list = list.filter((t) => t.source === "Google");
    } else if (activeFilter === "zillow") {
      list = list.filter((t) => t.source === "Zillow");
    }

    // 2. Sort logic: Newest date first
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [activeFilter]);

  return (
    <>
      {/* Filtering Navigation Tabs */}
      <TestimonialsFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Grid of Testimonial Cards */}
      <div className="min-h-[400px]">
        {filteredAndSortedTestimonials.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedTestimonials.map((testimonial, idx) => (
                <motion.div
                  key={testimonial.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: idx < 6 ? idx * 0.03 : 0, // Staggered delay minimized to 0.03s for rapid UI response
                  }}
                  className="h-full will-change-transform"
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-24 bg-white border border-slate-200/60">
            <p className="text-slate-400 font-light text-base">
              No matching client reviews found in this category.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// Custom luxury skeleton loader matching the dual-ring editorial layout
function TestimonialsSkeleton() {
  return (
    <div className="w-full space-y-12 animate-pulse">
      {/* Tab Filter Placeholder */}
      <div className="w-80 h-11 bg-slate-200/30 border border-slate-200/40 mx-auto rounded-none" />
      
      {/* Grid Placeholder matching new card structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-80 bg-white border border-slate-200/40 p-8 md:p-10 flex flex-col justify-between rounded-none shadow-[0_4px_25px_rgba(0,0,0,0.005)]"
          >
            {/* Top Stars & Badge */}
            <div className="flex justify-between items-center mb-6">
              <div className="w-24 h-3 bg-slate-200/40 rounded-none" />
              <div className="w-16 h-5 bg-slate-200/30 rounded-none" />
            </div>

            {/* Quote Lines */}
            <div className="space-y-3 flex-1 mb-8">
              <div className="w-full h-3 bg-slate-200/30 rounded-none" />
              <div className="w-[90%] h-3 bg-slate-200/30 rounded-none" />
              <div className="w-[95%] h-3 bg-slate-200/30 rounded-none" />
            </div>

            {/* Footer matching dual-ring and metadata */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-slate-200/40 rounded-full shrink-0" />
                <div className="space-y-2">
                  <div className="w-24 h-3 bg-slate-200/40 rounded-none" />
                  <div className="w-16 h-2 bg-slate-200/30 rounded-none" />
                </div>
              </div>
              <div className="w-24 h-6 bg-slate-200/40 rounded-none" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsPageContainer() {
  return (
    <div
      className="min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 relative overflow-hidden"
      style={{ backgroundColor: agentConfig.colors.background }}
    >
      {/* Background Soft Parallax Accent Orbs */}
      <div 
        className="absolute top-[10%] left-[-15%] w-[50rem] h-[50rem] rounded-full pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, rgba(201,169,110,0) 70%)" }}
      />
      <div 
        className="absolute bottom-[20%] right-[-15%] w-[55rem] h-[55rem] rounded-full pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, rgba(26,39,68,0.025) 0%, rgba(26,39,68,0) 70%)" }}
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
        {/* Editorial Title & Overview */}
        <TestimonialsHeader />

        {/* Rating aggregate breakdown chart */}
        <RatingDistribution />

        {/* Suspense Wrapper to protect route builds against useSearchParams de-optimization */}
        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsContent />
        </Suspense>

        {/* Lower Review Platforms CTA */}
        <ReviewCTA />
      </div>
    </div>
  );
}
