"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Icons from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutCredentials() {
  const { colors, aboutPage } = agentConfig;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const credentials = aboutPage?.credentials || [];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    },
  };

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]" style={{ color: colors.accent }}>
              Professional Standards
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          </div>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a2744]"
            style={{ color: colors.primary }}
          >
            Credentials & Recognition
          </h2>
          <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Fiduciary representation requires active credentialing and adherence to national standards of excellence.
          </p>
        </div>

        {/* Credentials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {credentials.map((cred, idx) => {
            const Icon = Icons[cred.iconName as keyof typeof Icons] as React.ElementType || Icons.ShieldCheck;
            return (
              <motion.div key={idx} variants={cardVariants}>
                <Card className="rounded-none border border-gray-100 bg-[#f9f6f0]/30 hover:bg-white hover:border-[#c9a96e]/30 hover:shadow-xl transition-all duration-500 h-full group">
                  <CardContent className="p-8 space-y-6 flex flex-col justify-between h-full">
                    <div className="space-y-4">
                      {/* Icon Container */}
                      <div 
                        className="w-12 h-12 flex items-center justify-center bg-[#1a2744]/5 text-[#1a2744] group-hover:bg-[#c9a96e]/10 group-hover:text-[#c9a96e] transition-colors duration-500 rounded-none"
                      >
                        <Icon className="w-6 h-6 stroke-[1.5]" />
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <h3 
                          className="text-xl font-serif font-medium text-[#1a2744] group-hover:text-[#c9a96e] transition-colors duration-500"
                          style={{ color: colors.primary }}
                        >
                          {cred.title}
                        </h3>
                        <span 
                          className="block text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: colors.accent }}
                        >
                          {cred.detail}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 font-light leading-relaxed">
                        {cred.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
