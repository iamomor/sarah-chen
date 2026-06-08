"use client";

import { agentConfig } from "@/config/agent.config";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function PressStrip() {
  const pressItems = agentConfig.press;
  const { colors } = agentConfig;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  if (!pressItems || pressItems.length === 0) return null;

  return (
    <section
      ref={ref}
      className="py-10 sm:py-14 md:py-16 border-y"
      style={{
        backgroundColor: colors.background,
        borderColor: `${colors.text}08`,
      }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6"
        >
          {/* Label */}
          <span
            className="text-[10px] font-bold uppercase tracking-[0.4em] shrink-0"
            style={{ color: colors.muted }}
          >
            As Featured In
          </span>

          {/* Separator */}
          <div
            className="hidden md:block w-px h-6"
            style={{ backgroundColor: `${colors.text}15` }}
          />

          {/* Press names as styled "logos" */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {pressItems.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + idx * 0.1, duration: 0.6 }}
                className="text-lg md:text-xl font-bold uppercase tracking-[0.08em] opacity-40 hover:opacity-100 transition-opacity duration-300"
                style={{ color: colors.text }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
