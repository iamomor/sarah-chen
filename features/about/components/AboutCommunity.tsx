"use client";

import React from "react";
import { agentConfig } from "@/config/agent.config";
import { motion, type Variants } from "framer-motion";
import * as Icons from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function AboutCommunity() {
  const { colors, aboutPage } = agentConfig;
  const activities = aboutPage?.community || [];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

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
      transition: { duration: 0.8, ease: "easeInOut" }
    },
  };

  return (
    <section className="py-24 bg-[#f9f6f0] relative" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]" style={{ color: colors.accent }}>
              Social Impact
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a2744]"
            style={{ color: colors.primary }}
          >
            Giving Back to {agentConfig.mapCenter.city}
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto">
            A home is more than just property; it is a foundational part of a thriving community.
          </p>
        </div>

        {/* Activities Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16"
        >
          {activities.map((activity, idx) => {
            const Icon = Icons[activity.iconName as keyof typeof Icons] as React.ElementType || Icons.HeartHandshake;
            return (
              <motion.div 
                key={idx} 
                variants={itemVariants} 
                className="flex flex-col items-center text-center space-y-6 group"
              >
                {/* Circular Icon Container */}
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center bg-white border border-gray-100 shadow-lg group-hover:border-[#c9a96e] group-hover:scale-105 transition-all duration-500"
                >
                  <Icon className="w-8 h-8 text-[#1a2744] group-hover:text-[#c9a96e] transition-colors duration-500 stroke-[1.25]" style={{ color: colors.primary }} />
                </div>

                <div className="space-y-3">
                  <h3 
                    className="text-xl font-serif font-medium text-[#1a2744]"
                    style={{ color: colors.primary }}
                  >
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-light leading-relaxed max-w-sm">
                    {activity.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
