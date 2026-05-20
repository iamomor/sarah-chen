"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { agentConfig } from "@/config/agent.config";
import testimonialsData from "@/content/testimonials/testimonials.json";
import type { Testimonial } from "@/types";
import { motion } from "framer-motion";
import { Award, Quote, Star } from "lucide-react";

const testimonials = testimonialsData as Testimonial[];

export default function TestimonialsPage() {
  return (
    <div className="bg-[#f9f6f0] min-h-screen pt-20 pb-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <span className="text-[12px] tracking-[0.3em] font-bold text-[#c9a96e] uppercase">
            Proven Excellence
          </span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#1a2744] leading-tight">
            Client Success Stories
          </h1>
          <p className="text-xl text-[#1a1a1a]/60 leading-relaxed">
            Our commitment to discretion and results has built a legacy of trust
            among Austin&apos;s most discerning homeowners.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-12 border-y border-[#1a2744]/10">
          <div className="text-center space-y-1">
            <span className="block text-4xl font-serif font-bold text-[#1a2744]">
              {agentConfig.stats.reviewCount}
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-[#c9a96e] font-bold">
              Five Star Reviews
            </span>
          </div>
          <div className="text-center space-y-1">
            <span className="block text-4xl font-serif font-bold text-[#1a2744]">
              {agentConfig.stats.googleRating}
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-[#c9a96e] font-bold">
              Google Rating
            </span>
          </div>
          <div className="text-center space-y-1">
            <span className="block text-4xl font-serif font-bold text-[#1a2744]">
              {agentConfig.stats.listToSaleRatio}
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-[#c9a96e] font-bold">
              Avg List-to-Sale
            </span>
          </div>
          <div className="text-center space-y-1">
            <span className="block text-4xl font-serif font-bold text-[#1a2744]">
              100%
            </span>
            <span className="block text-[10px] tracking-widest uppercase text-[#c9a96e] font-bold">
              Client Discretion
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              <Card className="rounded-none border-none bg-white p-10 shadow-sm hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-0 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#c9a96e] text-[#c9a96e]"
                      />
                    ))}
                  </div>
                  <Quote className="w-10 h-10 text-[#c9a96e]/10 -mb-4" />
                  <p className="text-lg leading-relaxed text-[#1a1a1a]/80 font-medium italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="pt-6 border-t border-[#1a2744]/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#1a2744]">
                        {testimonial.authorName}
                      </h4>
                      <p className="text-[10px] tracking-widest uppercase text-[#c9a96e] font-bold">
                        {testimonial.role} • {testimonial.neighborhood}
                      </p>
                    </div>
                    {testimonial.featured && (
                      <div className="p-2 bg-[#1a2744]/5 rounded-full">
                        <Award className="w-4 h-4 text-[#c9a96e]" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Video Testimonials Teaser */}
        <section className="mt-32 py-20 bg-[#1a2744] text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9a96e]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="container mx-auto px-12 flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-serif font-bold">
                Hear Their Stories
              </h2>
              <p className="text-white/70 text-lg">
                Sometimes words on a page aren&apos;t enough. Watch our short
                cinematic interviews with clients who navigated Austin&apos;s
                most complex real estate transactions with Sarah.
              </p>
              <Button className="bg-[#c9a96e] hover:bg-[#b8985e] text-[#1a2744] rounded-none px-10 py-6 h-auto text-[13px] font-bold tracking-widest uppercase">
                Watch Video Reviews
              </Button>
            </div>
            <div className="lg:w-1/2 aspect-video bg-black/40 border border-[#c9a96e]/20 flex items-center justify-center group cursor-pointer overflow-hidden">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#c9a96e] border-b-[10px] border-b-transparent ml-1" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
