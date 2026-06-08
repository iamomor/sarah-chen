"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Camera, 
  Box, 
  Smartphone, 
  Mail, 
  Globe, 
  Compass, 
  BarChart3, 
  Users 
} from "lucide-react";
const marketingServices = [
  { icon: Camera, title: "Editorial Imagery & Cinematic Drone", desc: "Magazine-quality daytime and twilight photos to capture immediate digital attention." },
  { icon: Box, title: "3D Virtual Matterport Spatial Tours", desc: "Premium interactive walkthroughs allowing international buyers to tour 24/7." },
  { icon: Smartphone, title: "Targeted Paid Social Media Stack", desc: "Dynamic paid campaigns hyper-targeted to affluent buyers across 3 platforms." },
  { icon: Mail, title: "Private Database Campaign", desc: "Direct, high-touch outreach to our database of 2,400+ active luxury buyers." },
  { icon: Globe, title: "Dedicated Single-Property Microsite", desc: "Bespoke digital home built to fully showcase architectural details and narrative." },
  { icon: Compass, title: "Featured Global Syndication", desc: "Premium placement on Zillow, Realtor.com, and 100+ global luxury portals." },
  { icon: BarChart3, title: "Weekly Analytical Reporting", desc: "Actionable weekly reports detailing impressions, showing feedback, and market shifts." },
  { icon: Users, title: "Vetted Private Client Showings Only", desc: "Strict verification of buyer funds and qualifications prior to property access." },
];

export default function MarketingSystem() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#1a2744] text-white border-t border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
              Omnichannel Strategy
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-white">
            What We Do For <span className="italic font-medium text-[#c9a96e]">Your Listing</span>
          </h2>
          <p className="text-slate-300 font-light text-base max-w-2xl mx-auto font-sans">
            Every listing receives our comprehensive, high-fidelity marketing stack. We do not simply post properties; we launch an elite capital positioning campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {marketingServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="bg-white/5 p-8 rounded-none border border-white/10 hover:border-[#c9a96e]/30 transition-all duration-300 flex items-start gap-5 relative group"
            >
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-[#c9a96e] group-hover:h-full transition-all duration-300" />
              <div className="w-12 h-12 rounded-none bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] flex-shrink-0">
                <service.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-white text-lg tracking-tight font-sans">{service.title}</h3>
                <p className="text-slate-300 font-light text-xs leading-relaxed font-sans">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
