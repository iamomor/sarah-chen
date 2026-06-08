"use client";

import { agentConfig } from "@/config/agent.config";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactInfoCard from "./ContactInfoCard";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("./ContactMap"), { ssr: false });

export default function ContactPageContainer() {
  const { colors, name, contactPage } = agentConfig;

  return (
    <main className="bg-[#f9f6f0] min-h-screen relative overflow-x-hidden pb-24">
      {/* 1. Cinematic Hero Header */}
      <ContactHero />

      {/* 2. Main Columns Layout Section */}
      <section className="container mx-auto px-6 sm:px-8 lg:px-12 py-10 sm:py-16 lg:py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column (60%): Interactive Contact Lead Form */}
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header Content */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a96e] block font-sans">
                Professional Consultation Request
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-light tracking-tight  cursor-pointer leading-tight">
                Send a Message
              </h2>
              <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed max-w-xl font-sans">
                Fill out the secure dossier below to register your requirements. {name} and her advisory team review all submissions within 24 hours.
              </p>
            </div>

            {/* Reusable ContactForm */}
            <div className="bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-6 sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#1a2744]" style={{ backgroundColor: colors.primary }} />
              <ContactForm />
            </div>
          </motion.div>

          {/* Right Column (40%): Direct Contact Details, Office Hours & Location Map */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Direct Connect Details Card */}
            <ContactInfoCard />

            {/* Location Map Module */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 font-sans">
                Location Map
              </h4>
              <ContactMap />
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
