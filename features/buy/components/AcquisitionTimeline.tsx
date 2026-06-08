"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Wallet, Compass, FileSignature, Key, Clock, ShieldCheck, HelpCircle, ChevronRight } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

export default function AcquisitionTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      name: "Strategic Consultation",
      icon: PhoneCall,
      deliverable: "Bespoke Lifestyle Audit & Map",
      duration: "20 Mins Alignment Call",
      value: `Identifies precise sub-market micro-sectors, private specifications, and tax priorities to completely bypass wasteful standard public home tours in ${agentConfig.mapCenter.city}.`,
      fiduciaryBenefit: "Guarantees absolute client anonymity and establishes pre-market search parameters.",
    },
    {
      number: "02",
      name: "Capital Optimization",
      icon: Wallet,
      deliverable: "Private Banker Financing Dossier",
      duration: "24-48 Hours Pre-Flight",
      value: `Establishes institutional relationships with elite private mortgage bankers serving ${agentConfig.mapCenter.city}, yielding preferred interest indexes and bulletproof closing validation.`,
      fiduciaryBenefit: "Secures highest purchasing authority credentials to command priority seller respect.",
    },
    {
      number: "03",
      name: "Curated Portal Sourcing",
      icon: Compass,
      deliverable: "Off-Market Pocket Estate Portfolio",
      duration: "Continuous Access",
      value: "Direct first-look briefings on developer private collections, pocket inventory, and unlisted high-end listings before they touch the public MLS.",
      fiduciaryBenefit: "Grants you exclusive first-mover advantage, completely eliminating bidding wars.",
    },
    {
      number: "04",
      name: "Fiduciary Offer Blueprint",
      icon: FileSignature,
      deliverable: "Tactical Seller-Aligned Contract",
      duration: "Immediate Execution",
      value: "Deploys precise localized analytics and custom-engineered contract clauses targeted directly at the seller's specific underlying motives.",
      fiduciaryBenefit: "Secures properties at or below true market value, retaining option rights.",
    },
    {
      number: "05",
      name: "Diligence & Smooth Close",
      icon: Key,
      deliverable: "80-Point Fiduciary Ledger Escrow",
      duration: "30-45 Days Escort",
      value: "Rigorous escrow, structural engineering, boundary audits, and legal title checks managed under strict attorney supervision.",
      fiduciaryBenefit: "Prevents hidden liability risks, ensuring a seamless and flawless transition of keys.",
    },
  ];

  const SelectedIcon = steps[activeStep].icon;

  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#f9f6f0] border-t border-slate-200/60">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
              Fiduciary Roadmap
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1a2744]">
            Our Structured <span className="italic font-medium text-[#c9a96e]">Acquisition Protocol</span>
          </h2>
          <p className="text-slate-500 font-light text-xs max-w-md mx-auto leading-relaxed">
            Click through our active phases to preview how our private-client protocols protect your capital and secure exclusive estates.
          </p>
        </div>

        {/* INTERACTIVE CONSOLE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-5 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            
            {/* INTERACTIVE USER CUE HELP TAG */}
            <div className="hidden lg:flex text-center lg:text-left text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] animate-pulse pb-2 items-center gap-2 justify-center lg:justify-start">
              <span>➔ Click a phase below to view strategic deliverables</span>
            </div>
            <div className="lg:hidden text-center text-[9px] font-bold uppercase tracking-[0.2em] text-[#c9a96e] animate-pulse pb-2 flex items-center gap-2 justify-center w-full shrink-0">
              <span>➔ Swipe/Tap a phase to view specifications</span>
            </div>

            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              const isActive = activeStep === idx;

              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`flex items-center justify-between p-4 sm:p-5 text-left border transition-all duration-300 rounded-none relative overflow-hidden cursor-pointer group w-[280px] sm:w-[320px] lg:w-full shrink-0 snap-center ${
                    isActive
                      ? "bg-[#1a2744] text-white border-[#c9a96e] shadow-xl shadow-slate-200"
                      : "bg-white text-[#1a2744] border-slate-200/60 hover:border-[#c9a96e]/30 hover:bg-[#1a2744]/5"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-5">
                    {/* Step Selector Circle */}
                    <div
                      className={`w-10 h-10 rounded-none border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isActive
                          ? "bg-[#c9a96e]/10 border-[#c9a96e] text-[#c9a96e]"
                          : "bg-slate-50 border-slate-200 text-[#1a2744]/70"
                      }`}
                    >
                      <StepIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="space-y-1">
                      <span className={`text-[9px] font-bold tracking-widest uppercase block ${
                        isActive ? "text-[#c9a96e]" : "text-slate-400"
                      }`}>
                        Phase {step.number}
                      </span>
                      <span className="font-serif font-bold text-sm md:text-base block">
                        {step.name}
                      </span>
                    </div>
                  </div>

                  {/* VISUAL CUE: INTERACTIVE CHEVRON ANCHOR */}
                  <div className="flex items-center">
                    <ChevronRight 
                      className={`w-4 h-4 transition-all duration-300 ${
                        isActive 
                          ? "text-[#c9a96e] translate-x-1" 
                          : "text-slate-300 group-hover:text-[#c9a96e] group-hover:translate-x-1"
                      }`} 
                    />
                  </div>

                  {/* Active Selector Pointer Accent */}
                  {isActive && (
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#c9a96e]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Strategic Intelligence Panel */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/60 p-6 sm:p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.02)] h-full flex flex-col justify-between relative overflow-hidden">
              {/* Decorative Subtle Carbon Background */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                {/* Panel Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                  <div className="space-y-1">
                    <span className="text-[#c9a96e] text-[10px] font-bold uppercase tracking-widest block">
                      Protocol Delivery Spec
                    </span>
                    <h3 className="text-2xl font-serif text-[#1a2744] font-medium">
                      {steps[activeStep].name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#c9a96e]/10 text-[#c9a96e] py-1 px-3 text-[10px] font-bold uppercase tracking-widest border border-[#c9a96e]/20">
                    <Clock className="w-3.5 h-3.5" /> {steps[activeStep].duration}
                  </div>
                </div>

                {/* Specific Detailed Matrix Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <HelpCircle className="w-3 h-3 text-[#c9a96e]" /> Core Delivery Focus
                    </span>
                    <p className="text-[#1a1a1a]/85 text-sm md:text-base font-light leading-relaxed">
                      {steps[activeStep].value}
                    </p>
                  </div>

                  <div className="p-5 bg-[#f9f6f0] border-l-2 border-[#c9a96e] space-y-2">
                    <span className="text-[9px] font-bold text-[#1a2744] uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Fiduciary Protection Standard
                    </span>
                    <p className="text-slate-600 text-xs md:text-sm font-light leading-relaxed">
                      {steps[activeStep].fiduciaryBenefit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel Footer */}
              <div className="pt-8 border-t border-slate-100 mt-8 relative z-10 flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span>Verified Deliverable</span>
                <span className="text-[#1a2744] font-serif font-bold italic">
                  {steps[activeStep].deliverable}
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
