"use client";

import { agentConfig } from "@/config/agent.config";
import testimonialsData from "@/content/testimonials/testimonials.json";
import type { Testimonial } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TestimonialsCarousel() {
  const testimonials = (testimonialsData as Testimonial[])
    .filter((t) => t.featured)
    .slice(0, 6);
  const totalCount = agentConfig.stats.reviewCount;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
      "(min-width: 1024px)": { slidesToScroll: 1 },
    },
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Auto-advance
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) return null;

  const { colors } = agentConfig;

  // Source badge color mapping
  const getSourceStyle = (source: Testimonial["source"]) => {
    switch (source) {
      case "Google":
        return { bg: "#4285F410", text: "#4285F4" };
      case "Zillow":
        return { bg: "#006AFF10", text: "#006AFF" };
      default:
        return { bg: `${colors.accent}15`, text: colors.accent };
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-[2px] w-10"
                style={{ backgroundColor: colors.accent }}
              />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: colors.primary }}
              >
                Client Experiences
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight"
              style={{ color: colors.text }}
            >
              Trusted by{" "}
              <span
                className="font-serif italic"
                style={{ color: colors.primary }}
              >
                {totalCount}+
              </span>{" "}
              Families
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 hover:shadow-md"
              style={{ borderColor: `${colors.text}15`, color: colors.text }}
              aria-label="Previous testimonial"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: colors.primary, color: "white" }}
              aria-label="Next testimonial"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 lg:-ml-6">
            {testimonials.map((testimonial) => {
              const sourceStyle = getSourceStyle(testimonial.source);
              return (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 lg:pl-6"
                >
                  <div
                    className="flex flex-col h-full p-8 rounded-sm border transition-shadow duration-300 hover:shadow-lg"
                    style={{
                      borderColor: `${colors.text}08`,
                      backgroundColor: colors.background,
                    }}
                  >
                    {/* Quote icon */}
                    <Quote
                      className="w-8 h-8 mb-5 opacity-15"
                      style={{ color: colors.accent }}
                    />

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          style={{ fill: colors.accent, color: colors.accent }}
                        />
                      ))}
                    </div>

                    {/* Quote text */}
                    <p
                      className="text-base leading-relaxed font-light mb-8 flex-1 line-clamp-4"
                      style={{ color: `${colors.text}cc` }}
                    >
                      &ldquo;{testimonial.text}&rdquo;
                    </p>

                    {/* Author row */}
                    <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: `${colors.text}08` }}>
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 relative">
                        <Image
                          src={
                            testimonial.authorPhoto ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=random&size=80`
                          }
                          alt={testimonial.authorName}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm font-semibold truncate"
                          style={{ color: colors.text }}
                        >
                          {testimonial.authorName}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-medium"
                            style={{ color: colors.muted }}
                          >
                            {testimonial.role}
                          </span>
                          {/* Source badge */}
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: sourceStyle.bg,
                              color: sourceStyle.text,
                            }}
                          >
                            {testimonial.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === selectedIndex ? "28px" : "8px",
                backgroundColor:
                  index === selectedIndex ? colors.primary : `${colors.text}15`,
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
