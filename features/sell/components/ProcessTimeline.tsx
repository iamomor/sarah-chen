"use client";

import React from "react";


const timelinePhases = [
  { step: "01", title: "Pre-Listing Audit", time: "Days 1-7", activities: "Bespoke pricing modeling, localized inspections, and private market strategy coordination." },
  { step: "02", title: "Curation & Media", time: "Days 7-14", activities: "Professional staging overlays, architectural twilights, and high-fidelity asset narrative drafting." },
  { step: "03", title: "Bespoke Launch", time: "Day 15", activities: "Direct board syndicate activation, local buyer databases launch, and digital micro-site live release." },
  { step: "04", title: "Engagement Protocol", time: "Days 15-30", activities: "Strict private client showing verification, tactical escrow modeling, and contract negotiations." },
  { step: "05", title: "Fiduciary Closure", time: "Days 30-60", activities: "Escrow oversight, structural inspection mitigation, closing balance transfer support, and settlement." },
];

export default function ProcessTimeline() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
              Operational Blueprint
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1a2744]">
            The Seller <span className="italic font-medium text-[#c9a96e]">Process Timeline</span>
          </h2>
          <p className="text-slate-500 font-light text-base max-w-2xl mx-auto font-sans">
            A highly structured, repeatable operational playbook designed to take your luxury asset from first handshake to successful escrow wire transfer.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal Line (Desktop only - conforming to borders style guide) */}
          <div className="hidden lg:block absolute top-[28px] left-0 w-full h-[1px] bg-slate-200/80 z-0" />

          <div className="flex flex-col lg:flex-row justify-between relative z-10 gap-12 lg:gap-6">
            {timelinePhases.map((phase, i) => (
              <div key={i} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left group space-y-4">
                <div className="w-14 h-14 rounded-none bg-white border border-[#c9a96e]/30 text-[#1a2744] group-hover:bg-[#c9a96e] group-hover:text-[#1a2744] group-hover:border-[#c9a96e] transition-all duration-300 flex items-center justify-center font-serif text-lg font-bold shadow-none relative z-10">
                  {phase.step}
                  {/* Vertical Line on Mobile */}
                  {i !== timelinePhases.length - 1 && (
                    <div className="block lg:hidden absolute top-full left-1/2 w-[1px] h-[50px] bg-slate-200/80 -translate-x-1/2" />
                  )}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] font-sans block">
                    {phase.time}
                  </span>
                  <h3 className="text-lg font-serif font-semibold text-[#1a2744]">
                    {phase.title}
                  </h3>
                  <p className="text-slate-500 font-light text-xs leading-relaxed max-w-[220px] mx-auto lg:mx-0 font-sans">
                    {phase.activities}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
