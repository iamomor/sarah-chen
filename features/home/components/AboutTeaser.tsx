"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import Link from "next/link";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Button } from "@/components/ui/button";

export default function AboutTeaser() {
  const { colors, stats, name, headshot, headshotAlt, shortBio, title } = agentConfig;
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div 
          ref={ref}
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
        >
          {/* Left: Agent Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-[4/5]">
              <div 
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-bl-full"
                style={{ backgroundColor: colors.accent, opacity: 0.1 }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-bl-full shadow-xl">
                <Image
                  src={headshot}
                  alt={headshotAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="space-y-8 max-w-xl">
              <div className="space-y-4">
                <span 
                  className="uppercase tracking-widest text-sm font-medium"
                  style={{ color: colors.accent }}
                >
                  Meet {name}
                </span>
                
                <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
                  {title}
                </h2>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                {shortBio}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-gray-100">
                <div className="space-y-2">
                  <div className="text-3xl font-light text-gray-900">{stats.careerSalesVolume}</div>
                  <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Volume</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-gray-900">{stats.homesSold}</div>
                  <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Sold</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-gray-900">{stats.yearsExperience}</div>
                  <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Years</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-light text-gray-900 flex items-center gap-1">
                    {stats.googleRating}
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="text-xs font-medium tracking-widest text-gray-500 uppercase">Rating</div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  asChild
                  size="lg"
                  className="group rounded-none text-white hover:opacity-90 px-8 py-6 h-auto transition-all duration-300"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Link href="/about" className="flex items-center gap-3 text-base">
                    Read My Full Story
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
