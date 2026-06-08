"use client";

import { Card, CardContent } from "@/components/ui/card";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function AboutTeam() {
  const { colors } = agentConfig;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const team = agentConfig.aboutPage?.team || [];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
  };

  return (
    <section className="py-24 bg-white scroll-mt-20" ref={ref} id="team">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]" style={{ color: colors.accent }}>
              The Support Network
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a2744]"
            style={{ color: colors.primary }}
          >
            The Team Behind Every Transaction
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto">
            {agentConfig.name.split(" ")[0]} is supported by a dedicated team of specialists handling cinematic marketing, escrow coordination, and buyer representation.
          </p>
        </div>

        {/* Team Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {team.map((member, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="rounded-none border border-gray-100 shadow-none bg-[#f9f6f0]/30 hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col h-full">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-gray-100 bg-white">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter grayscale-[10%]"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                <CardContent className="p-5 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 
                      className="text-2xl font-serif font-medium text-[#1a2744]"
                      style={{ color: colors.primary }}
                    >
                      {member.name}
                    </h3>
                    <div 
                      className="text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: colors.accent }}
                    >
                      {member.role || (member as any).title}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 font-light leading-relaxed flex-grow">
                    {member.desc}
                  </p>

                  <div className="pt-4 border-t border-gray-100/50 flex justify-between items-center">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400">
                      {region.defaultCity}, {region.defaultState}
                    </span>
                    <button 
                      className="text-gray-400 hover:text-[#c9a96e] transition-colors"
                      style={{ color: colors.accent }}
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>

              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
