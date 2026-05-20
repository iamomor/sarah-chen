"use client";

import { agentConfig } from "@/config/agent.config";
import testimonialsData from "@/content/testimonials/testimonials.json";
import type { Testimonial } from "@/types";
import useEmblaCarousel from "embla-carousel-react";
import { Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function TestimonialsCarousel() {
  const testimonials = (testimonialsData as Testimonial[])
    .filter((t) => t.featured)
    .slice(0, 4);
  const totalCount = (testimonialsData as Testimonial[]).length;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  return (
    <section
      className="py-24"
      style={{ backgroundColor: agentConfig.colors.background }}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex justify-center items-center gap-4 mb-20">
          <div
            className="h-6 w-1"
            style={{ backgroundColor: agentConfig.colors.accent }}
          />
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] text-gray-900">
            Client Experiences
          </h2>
        </div>

        <div className="relative px-12 md:px-20">
          {/* Navigation Arrows */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] min-w-0">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 max-w-4xl mx-auto">
                    {/* Left: Author Image */}
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shrink-0 shadow-lg relative border-4 border-white">
                      {/* We'll use a placeholder image if authorPhoto isn't set */}
                      <Image
                        src={
                          testimonial.authorPhoto ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.authorName)}&background=random&size=256`
                        }
                        alt={testimonial.authorName}
                        fill
                        sizes="(max-width: 768px) 160px, 224px"
                        className="object-cover"
                      />
                    </div>

                    {/* Right: Stars, Quote, Author */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-current"
                            style={{ color: agentConfig.colors.accent }}
                          />
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light mb-8">
                        {testimonial.text}
                      </p>

                      <p className="font-bold text-gray-900 text-lg uppercase tracking-wider">
                        - {testimonial.authorName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Line Navigation */}
        <div className="flex justify-center gap-2 mt-16 max-w-sm mx-auto">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="h-1 flex-1 transition-all duration-300 rounded-full"
              style={{
                backgroundColor:
                  index === selectedIndex ? agentConfig.colors.text : "#E5E7EB",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
