"use client";

import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, BarChart2, Home, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function ThreeCardCTA() {
  const { colors, markets } = agentConfig;

  const cards = [
    {
      id: "buying",
      step: "01",
      icon: Home,
      heading:
        markets.length > 0 ? `Buying in ${markets[0]}?` : "Looking to Buy?",
      body: "Find your perfect home with a proven local expert who knows every neighborhood, every street, every deal.",
      ctaText: "Explore Buyer Resources",
      ctaLink: "/buy",
      accentTop: colors.accent,
    },
    {
      id: "selling",
      step: "02",
      icon: TrendingUp,
      heading: "Selling Your Home?",
      body: "Get top dollar with a marketing system that sells homes for more, faster — backed by real data.",
      ctaText: "See How We Sell",
      ctaLink: "/sell",
      accentTop: colors.accent,
    },
    {
      id: "valuation",
      step: "03",
      icon: BarChart2,
      heading: "What's My Home Worth?",
      body: `Get your free, no-obligation home valuation from a trusted local ${region.agentTitle}.`,
      ctaText: "Get Free Valuation",
      ctaLink: "/valuation",
      accentTop: colors.primary,
      isPrimary: true,
    },
  ];

  return (
    <section
      className="w-full py-24 overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      <div className="container mx-auto px-8 md:px-16 xl:px-24">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="text-[11px] font-bold uppercase tracking-[0.3em] block mb-4"
            style={{ color: colors.accent }}
          >
            How Can We Help?
          </span>
          <h2
            className="text-3xl md:text-4xl font-medium tracking-tight"
            style={{ color: colors.text }}
          >
            Your Real Estate Journey{" "}
            <span className="font-serif italic" style={{ color: colors.primary }}>
              Starts Here
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const isPrimary = card.isPrimary;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className={cn(
                  "group relative flex flex-col bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500",
                  index === 2 ? "md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto md:w-full" : ""
                )}
              >
                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: card.accentTop }}
                />

                <div className="flex flex-col flex-1 p-8 lg:p-10">
                  {/* Step number + Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-[11px] font-bold tracking-[0.2em]"
                      style={{ color: `${colors.text}30` }}
                    >
                      {card.step}
                    </span>
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: isPrimary
                          ? `${colors.primary}10`
                          : `${colors.accent}10`,
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{
                          color: isPrimary ? colors.primary : colors.accent,
                        }}
                      />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3
                    className="text-2xl font-semibold mb-4 tracking-tight"
                    style={{ color: colors.text }}
                  >
                    {card.heading}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-base leading-relaxed mb-8 flex-1"
                    style={{ color: colors.muted }}
                  >
                    {card.body}
                  </p>

                  {/* CTA */}
                  <Button
                    asChild
                    variant={isPrimary ? "default" : "outline"}
                    className="w-full h-12 rounded-sm text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 group"
                    style={
                      isPrimary
                        ? {
                            backgroundColor: colors.primary,
                            color: "white",
                            borderColor: "transparent",
                          }
                        : {
                            backgroundColor: "transparent",
                            color: colors.primary,
                            borderColor: `${colors.primary}30`,
                          }
                    }
                  >
                    <Link
                      href={card.ctaLink}
                      className="flex items-center justify-center gap-2"
                    >
                      {card.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
