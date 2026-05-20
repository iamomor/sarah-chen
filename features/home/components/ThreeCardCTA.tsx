"use client";

import { motion } from "framer-motion";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Home, TrendingUp, BarChart2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ThreeCardCTA() {
  const { colors, markets } = agentConfig;
  
  const mainMarket = markets[0] || "the area";

  const cards = [
    {
      id: "buying",
      icon: Home,
      heading: markets.length > 0 ? `Buying in ${markets[0]}?` : "Looking to Buy?",
      body: "Find your perfect home with a proven local expert who knows every neighborhood, every street, every deal.",
      ctaText: "Explore Buyer Resources",
      ctaLink: "/buy",
      style: {
        borderLeftColor: colors.accent,
        backgroundColor: "white",
        color: colors.text,
      },
      btnStyle: {
        backgroundColor: "transparent",
        color: colors.accent,
        borderColor: colors.accent,
      },
      isPrimary: false,
    },
    {
      id: "selling",
      icon: TrendingUp,
      heading: "Selling Your Home?",
      body: "Get top dollar with a marketing system that sells homes for more, faster — backed by real data.",
      ctaText: "See How We Sell",
      ctaLink: "/sell",
      style: {
        borderLeftColor: colors.accent,
        backgroundColor: "white",
        color: colors.text,
      },
      btnStyle: {
        backgroundColor: "transparent",
        color: colors.accent,
        borderColor: colors.accent,
      },
      isPrimary: false,
    },
    {
      id: "valuation",
      icon: BarChart2,
      heading: "What's My Home Worth?",
      body: `Get your free, no-obligation home valuation from a trusted local ${region.agentTitle}.`,
      ctaText: "Get Free Valuation",
      ctaLink: "/valuation",
      style: {
        borderLeftColor: "transparent",
        backgroundColor: colors.primary,
        color: "white",
        boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
      },
      btnStyle: {
        backgroundColor: colors.accent,
        color: "white",
        borderColor: "transparent",
      },
      isPrimary: true,
    },
  ];

  return (
    <section className="w-full py-24 overflow-hidden" style={{ backgroundColor: colors.background }}>
      <div className="container mx-auto px-4 md:px-8 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
               <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className={`flex flex-col p-8 md:p-10 rounded-2xl transition-all duration-300 ${
                  !card.isPrimary ? 'border-l-4 border-t border-r border-b border-gray-100 shadow-sm hover:shadow-md' : 'z-10 relative scale-100 md:scale-105'
                }`}
                style={card.style}
              >
                <div className="mb-6">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${card.isPrimary ? 'bg-white/10' : 'bg-gray-50'}`}
                  >
                    <Icon className={`w-7 h-7 ${card.isPrimary ? 'text-white' : ''}`} style={!card.isPrimary ? { color: colors.accent } : {}} />
                  </div>
                  <h3 className={`text-2xl font-semibold mb-4 ${card.isPrimary ? 'text-white' : 'text-gray-900'}`}>
                    {card.heading}
                  </h3>
                  <p className={`text-base leading-relaxed ${card.isPrimary ? 'text-white/90' : 'text-gray-600'}`}>
                    {card.body}
                  </p>
                </div>
                <div className="mt-auto pt-8">
                  <Button
                    asChild
                    variant={card.isPrimary ? "default" : "outline"}
                    className="w-full h-12 text-sm font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                    style={{
                      ...card.btnStyle,
                      borderWidth: card.isPrimary ? '0' : '1px'
                    }}
                  >
                    <Link href={card.ctaLink}>
                      {card.ctaText}
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
