"use client";

import React, { useState } from "react";
import { Check, Download, HelpCircle, Sparkles } from "lucide-react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatPrice } from "@/lib/utils";
import SellerGuideDialog from "./SellerGuideDialog";

interface UpgradeOption {
  id: string;
  label: string;
  description: string;
  cost: number;
  lift: number;
}

const UPGRADE_OPTIONS: UpgradeOption[] = [
  {
    id: "staging",
    label: "Bespoke Interior Staging",
    description: `Sourcing luxury European furnishings, curation of layout flow, and highlighting natural architectural accents.`,
    cost: 4500,
    lift: 18000,
  },
  {
    id: "media",
    label: "High-Fidelity Media Stack",
    description: "Architectural twilight photography, cinematic 4K drone videography, and spatial Matterport walkthroughs.",
    cost: 1500,
    lift: 6000,
  },
  {
    id: "landscaping",
    label: "Estate Landscape Dressings",
    description: "Re-dressing garden borders, styling architectural boxwoods, and installing luxury exterior uplighting.",
    cost: 3000,
    lift: 10500,
  },
  {
    id: "paint",
    label: "Neutral Designer Painting",
    description: "Warm-white designer paint curation in core living corridors to maximize natural lighting and space.",
    cost: 5500,
    lift: 22000,
  },
];

export default function SellerGuideHook() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["staging", "media"]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Calculations
  const activeUpgrades = UPGRADE_OPTIONS.filter((opt) => selectedIds.includes(opt.id));
  const totalCost = activeUpgrades.reduce((sum, opt) => sum + opt.cost, 0);
  const totalLift = activeUpgrades.reduce((sum, opt) => sum + opt.lift, 0);
  const netGain = totalLift - totalCost;
  const roiMultiple = totalCost > 0 ? (totalLift / totalCost).toFixed(1) : "0.0";

  return (
    <section className="py-24 bg-[#f9f6f0] border-t border-slate-200/50 relative overflow-hidden">
      {/* Decorative background accents (Conforming to strictly solid colors) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-200/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex justify-center items-center gap-2">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
              Interactive Blueprint
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1a2744]">
            Pre-Market <span className="italic font-medium text-[#c9a96e]">Equity Curation</span>
          </h2>
          <p className="text-slate-500 font-light text-base max-w-2xl mx-auto font-sans">
            In luxury real estate, preparation is not an expense—it is a financial strategy. Toggle common upgrade profiles below to estimate your potential asset optimization before listing.
          </p>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto mb-16">
          
          {/* Left Column: Interactive Checkbox List */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {UPGRADE_OPTIONS.map((option) => {
                const isSelected = selectedIds.includes(option.id);
                return (
                  <div
                    key={option.id}
                    onClick={() => handleToggle(option.id)}
                    className={`p-5 border cursor-pointer transition-all duration-300 rounded-none flex items-start gap-4 select-none relative group bg-white ${
                      isSelected 
                        ? "border-[#c9a96e]/60 shadow-[0_4px_20px_rgba(201,169,110,0.08)]" 
                        : "border-slate-200/60 hover:border-slate-300"
                    }`}
                  >
                    {/* Left Accent strip on active */}
                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#c9a96e] transition-all duration-300 ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-30"}`} />

                    {/* Premium Styled Checkbox */}
                    <div className={`w-5 h-5 rounded-none flex items-center justify-center border flex-shrink-0 transition-all duration-200 ${
                      isSelected 
                        ? "bg-[#1a2744] border-[#c9a96e] text-[#c9a96e]" 
                        : "border-slate-300 text-transparent"
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>

                    {/* Meta Detail */}
                    <div className="space-y-1.5 flex-grow pr-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-[#1a2744] text-sm md:text-base font-sans tracking-tight">
                          {option.label}
                        </h4>
                        <span className="text-[11px] font-medium text-[#c9a96e] bg-[#c9a96e]/10 px-2 py-0.5 font-sans">
                          Cost: {formatPrice(option.cost)}
                        </span>
                      </div>
                      <p className="text-slate-500 font-light text-[11px] md:text-xs leading-relaxed font-sans">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Helper Info */}
            <div className="flex items-start gap-2.5 p-4 bg-white/40 border border-slate-200/40 mt-4 rounded-none">
              <HelpCircle className="w-4 h-4 text-[#c9a96e] flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 font-light leading-relaxed font-sans">
                Estimates based on regional data audits across {region.defaultCity} luxury corridors. Individual returns vary based on local school districts, architectural design complexity, and buyer demand indexing.
              </p>
            </div>
          </div>

          {/* Right Column: Navy Audited Outcome Card */}
          <div className="lg:col-span-5 bg-[#1a2744] border border-[#c9a96e]/20 text-white p-6 md:p-8 flex flex-col justify-between rounded-none relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-serif font-light text-xl tracking-wide text-white">Equity Optimization</h3>
                <span className="text-[9px] font-bold text-[#c9a96e] bg-[#c9a96e]/10 px-2.5 py-1 tracking-widest uppercase font-sans">AUDITED DATA</span>
              </div>

              {/* Data Strip */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest font-sans">Estimated Cost</span>
                  <span className="text-xl font-serif text-slate-200 font-medium">{formatPrice(totalCost)}</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest font-sans">Projected Lift</span>
                  <span className="text-xl font-serif text-[#c9a96e] font-medium">+{formatPrice(totalLift)}</span>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] text-[#c9a96e] font-bold uppercase tracking-[0.2em] block font-sans">PROJECTED MULTIPLE</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-serif font-bold text-white tracking-tight">{roiMultiple}x</span>
                    <span className="text-xs text-slate-400 font-sans tracking-wide">ROI Ratio</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block font-sans">Estimated Net Gain</span>
                  <span className="text-3xl font-serif font-semibold text-[#c9a96e]">{formatPrice(netGain)}</span>
                </div>
              </div>
            </div>

            {/* Micro Card CTA */}
            <div className="pt-8 relative z-10 mt-6 lg:mt-0">
              <button
                onClick={() => setIsDialogOpen(true)}
                className="w-full py-4 border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] font-bold uppercase tracking-widest text-[10px] rounded-none transition-all duration-300 flex items-center justify-center gap-2 font-sans"
              >
                Explore Seller Guide <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

        {/* Beautiful Floating Guide Banner */}
        <div className="max-w-5xl mx-auto border border-slate-200 bg-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_15px_30px_rgba(0,0,0,0.02)] rounded-none relative group overflow-hidden">
          <div className="absolute top-0 left-0 w-[4px] h-full bg-[#c9a96e]" />
          
          <div className="space-y-2 text-center md:text-left">
            <div className="flex justify-center md:justify-start items-center gap-2 text-[9px] font-bold text-[#c9a96e] uppercase tracking-[0.25em] font-sans">
              <Sparkles className="w-3.5 h-3.5" /> Premium Curation Materials
            </div>
            <h3 className="text-xl md:text-2xl font-serif font-light text-[#1a2744]">
              Maximize Your Listing&apos;s Financial Impact
            </h3>
            <p className="text-slate-500 font-light text-xs md:text-sm max-w-2xl leading-relaxed font-sans">
              Explore our confidential <strong>2026 property presentation guide</strong> instantly, featuring high-fidelity checklists detailing exact colors, staging layouts, and positioning metrics active in top residential neighborhoods.
            </p>
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="w-full md:w-auto px-8 py-4 border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] font-bold uppercase tracking-widest text-[10px] rounded-none transition-all duration-300 whitespace-nowrap font-sans"
          >
            Open Curation Handbook
          </button>
        </div>
      </div>

      {/* Sibling lead capture dialog */}
      <SellerGuideDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
}
