"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { agentConfig } from "@/config/agent.config";
import { AnimatePresence, motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  ListChecks,
  Paintbrush,
  Printer,
  Trees,
  X
} from "lucide-react";
import { useState } from "react";

interface SellerGuideDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TABS = [
  { id: "staging", label: "Staging Strategy", icon: <CheckCircle2 className="w-4 h-4" /> },
  { id: "palettes", label: "Designer Palettes", icon: <Paintbrush className="w-4 h-4" /> },
  { id: "media", label: "Media Stack", icon: <Camera className="w-4 h-4" /> },
  { id: "landscape", label: "Landscaping", icon: <Trees className="w-4 h-4" /> },
  { id: "checklist", label: "Launch Checklist", icon: <ListChecks className="w-4 h-4" /> },
];

const CHECKLIST_ITEMS = [
  "Depersonalize: Remove family photos, religious artifacts, and bold custom art.",
  "Deep Clean: Professional interior detailing, including baseboards and windows.",
  "Declutter: Clear all kitchen and bathroom countertops (max 2 curated items).",
  "Lighting Check: Replace all bulbs with matching 3000K (warm white) LEDs.",
  "Closet Diet: Remove 50% of items from all closets to showcase storage space.",
  "Hardware Refresh: Tighten loose door handles and replace dated cabinet pulls."
];

export default function SellerGuideDialog({ isOpen, onOpenChange }: SellerGuideDialogProps) {
  const [activeTab, setActiveTab] = useState("staging");
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    if (checkedItems.includes(index)) {
      setCheckedItems(checkedItems.filter(i => i !== index));
    } else {
      setCheckedItems([...checkedItems, index]);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Property Value Optimization Handbook</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;600;700&display=swap');
    body { font-family: 'Inter', sans-serif; color: #1a1a1a; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; }
    .cover { text-align: center; padding: 60px 0 40px; border-bottom: 2px solid #c9a96e; margin-bottom: 48px; }
    .cover-label { font-size: 9px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a96e; margin-bottom: 12px; }
    .cover-title { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #1a2744; line-height: 1.2; }
    .module { margin-bottom: 48px; padding-bottom: 48px; border-bottom: 1px solid #e5e7eb; page-break-inside: avoid; }
    .module:last-child { border-bottom: none; }
    .module-label { font-size: 9px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a96e; margin-bottom: 8px; }
    .module-title { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; color: #1a2744; margin-bottom: 12px; }
    .module-desc { font-size: 13px; color: #6b7280; line-height: 1.7; font-weight: 300; margin-bottom: 24px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .card { background: #f9f6f0; padding: 20px; border: 1px solid #e5e7eb; }
    .card h4 { font-weight: 600; color: #1a2744; font-size: 13px; margin-bottom: 6px; }
    .card p { font-size: 11px; color: #6b7280; line-height: 1.6; font-weight: 300; }
    .commandment-title { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #1a2744; margin-bottom: 10px; }
    blockquote { border-left: 2px solid #c9a96e; padding-left: 16px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 18px; color: #4b5563; }
    .swatch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .swatch { border: 1px solid #e5e7eb; }
    .swatch-color { height: 80px; width: 100%; }
    .swatch-info { padding: 12px; background: #fff; display: flex; justify-content: space-between; align-items: center; }
    .swatch-name { font-family: 'Cormorant Garamond', serif; font-weight: 600; color: #1a2744; font-size: 14px; }
    .swatch-role { font-size: 9px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }
    .swatch-hex { font-size: 9px; color: #6b7280; font-family: monospace; background: #f9fafb; padding: 2px 6px; }
    .media-item { display: flex; gap: 16px; margin-bottom: 20px; }
    .media-num { width: 40px; height: 40px; background: #f9f6f0; border: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-family: 'Cormorant Garamond', serif; font-weight: 700; color: #c9a96e; font-size: 16px; }
    .media-num-content h4 { font-weight: 600; color: #1a2744; font-size: 13px; margin-bottom: 4px; }
    .media-num-content p { font-size: 11px; color: #6b7280; line-height: 1.6; font-weight: 300; }
    .landscape-box { background: #f9f6f0; border-left: 4px solid #c9a96e; padding: 24px; }
    .landscape-box h4 { font-family: 'Cormorant Garamond', serif; font-size: 18px; color: #1a2744; margin-bottom: 16px; }
    .landscape-box ul { list-style: none; }
    .landscape-box li { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 12px; font-size: 12px; color: #4b5563; line-height: 1.6; font-weight: 300; }
    .dot { width: 6px; height: 6px; border-radius: 50%; background: #c9a96e; flex-shrink: 0; margin-top: 5px; }
    .checklist-item { padding: 14px; border: 1px solid #e5e7eb; display: flex; gap: 14px; align-items: flex-start; margin-bottom: 10px; }
    .checkbox { width: 18px; height: 18px; border: 1px solid #d1d5db; flex-shrink: 0; margin-top: 1px; }
    .checklist-text { font-size: 12px; color: #374151; font-weight: 300; line-height: 1.6; }
    .footer { text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e7eb; font-size: 10px; color: #9ca3af; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="cover">
    <div class="cover-label">Curation Handbook</div>
    <div class="cover-title">Property Value<br/>Optimization</div>
  </div>

  <!-- Module 01: Staging Strategy -->
  <div class="module">
    <div class="module-label">Module 01</div>
    <h2 class="module-title">Bespoke Interior Staging</h2>
    <p class="module-desc">Staging is the art of creating spatial desire. Buyers are not just purchasing square footage; they are purchasing an aspirational lifestyle. Our bespoke staging protocol increases perceived value and accelerates market velocity.</p>
    <div class="grid-2">
      <div class="card">
        <h4>Spatial Flow Optimization</h4>
        <p>Furniture must float away from walls to emphasize room scale. Traffic corridors should be widened by removing oversized sectionals and replacing them with tailored, low-profile seating.</p>
      </div>
      <div class="card">
        <h4>Textural Layering</h4>
        <p>Incorporate tactile luxury through organic materials. Think bouclé armchairs, raw linen drapery, and honed marble accents. This offsets cold architectural features and invites emotional connection.</p>
      </div>
    </div>
    <div class="commandment-title">The Staging Commandment</div>
    <blockquote>"Never sell a room's purpose; sell its possibility. A properly staged property allows a buyer to immediately insert their own future into the space."</blockquote>
  </div>

  <!-- Module 02: Designer Palettes -->
  <div class="module">
    <div class="module-label">Module 02</div>
    <h2 class="module-title">Designer Palettes</h2>
    <p class="module-desc">Paint is the highest ROI investment in real estate preparation. Avoid cold, sterile builder-whites and dated grays. We utilize complex, warm-toned neutrals that interact dynamically with natural light and photograph exceptionally well.</p>
    <div class="swatch-grid">
      <div class="swatch"><div class="swatch-color" style="background:#f5f0e6"></div><div class="swatch-info"><div><div class="swatch-name">Warm Alabaster</div><div class="swatch-role">Primary Walls</div></div><span class="swatch-hex">#F5F0E6</span></div></div>
      <div class="swatch"><div class="swatch-color" style="background:#e3dbcb"></div><div class="swatch-info"><div><div class="swatch-name">Soft Greige</div><div class="swatch-role">Cabinetry &amp; Trim</div></div><span class="swatch-hex">#E3DBCB</span></div></div>
      <div class="swatch"><div class="swatch-color" style="background:#2d3a3f"></div><div class="swatch-info"><div><div class="swatch-name">Deep Slate</div><div class="swatch-role">Accent / Front Door</div></div><span class="swatch-hex">#2D3A3F</span></div></div>
      <div class="swatch"><div class="swatch-color" style="background:#e9e4d9"></div><div class="swatch-info"><div><div class="swatch-name">Gallery White</div><div class="swatch-role">Ceilings</div></div><span class="swatch-hex">#E9E4D9</span></div></div>
    </div>
  </div>

  <!-- Module 03: Media Stack -->
  <div class="module">
    <div class="module-label">Module 03</div>
    <h2 class="module-title">High-Fidelity Media Stack</h2>
    <p class="module-desc">Your first showing is always online. A premium property requires a cinematic approach to visual asset creation. We coordinate extensive media days to capture your asset from every strategic angle.</p>
    <div class="media-item"><div class="media-num">01</div><div class="media-num-content"><h4>The Golden Hour Protocol (Twilight)</h4><p>Twilight photography is mandatory for luxury listings. It evokes emotional warmth, showcases interior and exterior lighting design, and statistically receives 40% more click-throughs on syndication portals.</p></div></div>
    <div class="media-item"><div class="media-num">02</div><div class="media-num-content"><h4>Architectural Drone Videography</h4><p>4K aerial passes establish property boundaries, highlight neighborhood proximity to amenities, and present rooflines and landscaping scale that ground-level photography simply cannot convey.</p></div></div>
    <div class="media-item"><div class="media-num">03</div><div class="media-num-content"><h4>Spatial Scanning (Matterport/3D)</h4><p>A 3D spatial scan acts as a 24/7 open house, filtering out unqualified foot traffic and allowing out-of-state or international buyers to walk the floorplan and measure spaces digitally.</p></div></div>
  </div>

  <!-- Module 04: Landscaping -->
  <div class="module">
    <div class="module-label">Module 04</div>
    <h2 class="module-title">Estate Landscaping</h2>
    <p class="module-desc">Curb appeal dictates the buyer's subconscious emotional baseline before they ever unlock the front door. Landscaping must be tailored, crisp, and undeniably intentional.</p>
    <div class="landscape-box">
      <h4>The Pre-Market Exterior Checklist</h4>
      <ul>
        <li><span class="dot"></span><span><strong>Black Mulch:</strong> Replace all faded garden mulch with fresh, rich black or dark brown mulch to instantly contrast with green foliage.</span></li>
        <li><span class="dot"></span><span><strong>Symmetrical Boxwoods:</strong> Flank the primary entryway with matching oversized planters containing structured, manicured boxwoods.</span></li>
        <li><span class="dot"></span><span><strong>Architectural Uplighting:</strong> Install low-voltage brass uplights at the base of primary trees and architectural facade columns.</span></li>
        <li><span class="dot"></span><span><strong>Power Washing:</strong> Cleanse all concrete driveways, stone pathways, and siding of organic buildup and discoloration.</span></li>
      </ul>
    </div>
  </div>

  <!-- Module 05: Launch Checklist -->
  <div class="module">
    <div class="module-label">Module 05</div>
    <h2 class="module-title">Launch Readiness</h2>
    <p class="module-desc">Use this checklist as you prepare your home for its market debut. Achieving 100% completion maximizes your likelihood of a premium valuation.</p>
    ${[
      "Depersonalize: Remove family photos, religious artifacts, and bold custom art.",
      "Deep Clean: Professional interior detailing, including baseboards and windows.",
      "Declutter: Clear all kitchen and bathroom countertops (max 2 curated items).",
      "Lighting Check: Replace all bulbs with matching 3000K (warm white) LEDs.",
      "Closet Diet: Remove 50% of items from all closets to showcase storage space.",
      "Hardware Refresh: Tighten loose door handles and replace dated cabinet pulls."
    ].map(item => `<div class="checklist-item"><div class="checkbox"></div><p class="checklist-text">${item}</p></div>`).join("")}
  </div>

  <div class="footer">${agentConfig.name} • Property Value Optimization Handbook • Confidential</div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-5xl sm:max-w-5xl h-[90vh] md:h-[80vh] p-0 overflow-hidden border-none shadow-2xl bg-[#f9f6f0] rounded-none flex flex-col md:flex-row">
        
        {/* Hide default Title and Description for screen readers visually but provide them */}
        <div className="sr-only">
          <DialogTitle>2026 {agentConfig.mapCenter.city} Equity Optimization Handbook</DialogTitle>
          <DialogDescription>Interactive guide for preparing your home for sale.</DialogDescription>
        </div>

        {/* Left/Top Navigation Sidebar */}
        <div className="w-full md:w-64 bg-[#1a2744] flex-shrink-0 flex flex-col border-r border-[#c9a96e]/20 relative print:hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
          
          <div className="p-6 border-b border-white/10 relative z-10 flex justify-between items-center md:block">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-[#c9a96e] uppercase tracking-[0.25em]">Curation Handbook</span>
              <h3 className="text-white font-serif text-lg leading-tight">Property Value<br/>Optimization</h3>
            </div>
            {/* Mobile close button inside header area */}
            <button onClick={() => onOpenChange(false)} className="md:hidden text-white/50 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-grow overflow-x-auto md:overflow-y-auto no-scrollbar relative z-10">
            <div className="flex md:flex-col p-4 md:p-6 gap-2 md:gap-4">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 rounded-none whitespace-nowrap md:whitespace-normal text-xs md:text-sm font-sans ${
                    activeTab === tab.id 
                      ? "bg-[#c9a96e]/10 text-[#c9a96e] border-l-2 border-[#c9a96e] font-semibold" 
                      : "text-slate-400 hover:text-slate-200 border-l-2 border-transparent"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6 border-t border-white/10 relative z-10 hidden md:block">
            <Button
              onClick={handlePrint}
              className="w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-none font-bold uppercase tracking-widest text-[9px] transition-all duration-300 flex items-center justify-center gap-2 font-sans"
            >
              <Printer className="w-3 h-3" /> Print Strategy
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto bg-white relative print:p-0 print:overflow-visible">
          
          {/* Close Button Desktop */}
          {/* <button 
            onClick={() => onOpenChange(false)} 
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors z-20 hidden md:block print:hidden"
          >
            <X className="w-5 h-5" />
          </button> */}

          <div className="p-6 md:p-12 lg:p-16 max-w-3xl mx-auto h-full pb-24 md:pb-16 print:max-w-full">
            <AnimatePresence mode="wait">
              {activeTab === "staging" && (
                <motion.div
                  key="staging"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-widest font-sans">Module 01</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-light">Bespoke Interior Staging</h2>
                    <p className="text-slate-500 font-light text-sm leading-relaxed font-sans">
                      Staging is the art of creating spatial desire. Buyers are not just purchasing square footage; they are purchasing an aspirational lifestyle. Our bespoke staging protocol increases perceived value and accelerates market velocity.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="bg-[#f9f6f0] p-6 border border-slate-200/50">
                      <h4 className="font-semibold text-[#1a2744] mb-2 font-sans text-sm">Spatial Flow Optimization</h4>
                      <p className="text-xs text-slate-500 font-light leading-relaxed font-sans">
                        Furniture must float away from walls to emphasize room scale. Traffic corridors should be widened by removing oversized sectionals and replacing them with tailored, low-profile seating.
                      </p>
                    </div>
                    <div className="bg-[#f9f6f0] p-6 border border-slate-200/50">
                      <h4 className="font-semibold text-[#1a2744] mb-2 font-sans text-sm">Textural Layering</h4>
                      <p className="text-xs text-slate-500 font-light leading-relaxed font-sans">
                        Incorporate tactile luxury through organic materials. Think bouclé armchairs, raw linen drapery, and honed marble accents. This offsets cold architectural features and invites emotional connection.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-4">
                    <h3 className="font-serif text-xl text-[#1a2744]">The Staging Commandment</h3>
                    <blockquote className="border-l-2 border-[#c9a96e] pl-4 italic text-slate-600 font-serif text-lg">
                      "Never sell a room's purpose; sell its possibility. A properly staged property allows a buyer to immediately insert their own future into the space."
                    </blockquote>
                  </div>
                </motion.div>
              )}

              {activeTab === "palettes" && (
                <motion.div
                  key="palettes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-widest font-sans">Module 02</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-light">Designer Palettes</h2>
                    <p className="text-slate-500 font-light text-sm leading-relaxed font-sans">
                      Paint is the highest ROI investment in real estate preparation. Avoid cold, sterile builder-whites and dated grays. We utilize complex, warm-toned neutrals that interact dynamically with natural light and photograph exceptionally well.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    {/* Color Swatch 1 */}
                    <div className="border border-slate-200 group">
                      <div className="h-32 bg-[#f5f0e6] w-full" />
                      <div className="p-4 bg-white flex justify-between items-center">
                        <div>
                          <h4 className="font-serif text-[#1a2744] font-semibold">Warm Alabaster</h4>
                          <p className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Primary Walls</p>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono bg-slate-50 px-2 py-1">#F5F0E6</span>
                      </div>
                    </div>

                    {/* Color Swatch 2 */}
                    <div className="border border-slate-200 group">
                      <div className="h-32 bg-[#e3dbcb] w-full" />
                      <div className="p-4 bg-white flex justify-between items-center">
                        <div>
                          <h4 className="font-serif text-[#1a2744] font-semibold">Soft Greige</h4>
                          <p className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Cabinetry & Trim</p>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono bg-slate-50 px-2 py-1">#E3DBCB</span>
                      </div>
                    </div>

                    {/* Color Swatch 3 */}
                    <div className="border border-slate-200 group">
                      <div className="h-32 bg-[#2d3a3f] w-full" />
                      <div className="p-4 bg-white flex justify-between items-center">
                        <div>
                          <h4 className="font-serif text-[#1a2744] font-semibold">Deep Slate</h4>
                          <p className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Accent / Front Door</p>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono bg-slate-50 px-2 py-1">#2D3A3F</span>
                      </div>
                    </div>

                     {/* Color Swatch 4 */}
                     <div className="border border-slate-200 group">
                      <div className="h-32 bg-[#e9e4d9] w-full" />
                      <div className="p-4 bg-white flex justify-between items-center">
                        <div>
                          <h4 className="font-serif text-[#1a2744] font-semibold">Gallery White</h4>
                          <p className="text-[10px] text-slate-400 font-sans uppercase tracking-wider">Ceilings</p>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono bg-slate-50 px-2 py-1">#E9E4D9</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "media" && (
                <motion.div
                  key="media"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-widest font-sans">Module 03</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-light">High-Fidelity Media Stack</h2>
                    <p className="text-slate-500 font-light text-sm leading-relaxed font-sans">
                      Your first showing is always online. A premium property requires a cinematic approach to visual asset creation. We coordinate extensive media days to capture your asset from every strategic angle.
                    </p>
                  </div>

                  <div className="space-y-6 pt-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#f9f6f0] text-[#c9a96e] flex items-center justify-center flex-shrink-0 border border-slate-200">
                        <span className="font-bold font-serif">01</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a2744] font-sans">The Golden Hour Protocol (Twilight)</h4>
                        <p className="text-xs text-slate-500 font-light leading-relaxed mt-1 font-sans">
                          Twilight photography is mandatory for luxury listings. It evokes emotional warmth, showcases interior and exterior lighting design, and statistically receives 40% more click-throughs on syndication portals.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#f9f6f0] text-[#c9a96e] flex items-center justify-center flex-shrink-0 border border-slate-200">
                        <span className="font-bold font-serif">02</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a2744] font-sans">Architectural Drone Videography</h4>
                        <p className="text-xs text-slate-500 font-light leading-relaxed mt-1 font-sans">
                          4K aerial passes establish property boundaries, highlight neighborhood proximity to amenities, and present rooflines and landscaping scale that ground-level photography simply cannot convey.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-none bg-[#f9f6f0] text-[#c9a96e] flex items-center justify-center flex-shrink-0 border border-slate-200">
                        <span className="font-bold font-serif">03</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1a2744] font-sans">Spatial Scanning (Matterport/3D)</h4>
                        <p className="text-xs text-slate-500 font-light leading-relaxed mt-1 font-sans">
                          A 3D spatial scan acts as a 24/7 open house, filtering out unqualified foot traffic and allowing out-of-state or international buyers to walk the floorplan and measure spaces digitally.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "landscape" && (
                <motion.div
                  key="landscape"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-widest font-sans">Module 04</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-light">Estate Landscaping</h2>
                    <p className="text-slate-500 font-light text-sm leading-relaxed font-sans">
                      Curb appeal dictates the buyer's subconscious emotional baseline before they ever unlock the front door. Landscaping must be tailored, crisp, and undeniably intentional.
                    </p>
                  </div>

                  <div className="bg-[#f9f6f0] border-l-4 border-[#c9a96e] p-6 space-y-4">
                    <h4 className="font-serif text-lg text-[#1a2744]">The Pre-Market Exterior Checklist</h4>
                    <ul className="space-y-3 text-sm text-slate-600 font-light font-sans">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />
                        <span><strong>Black Mulch:</strong> Replace all faded garden mulch with fresh, rich black or dark brown mulch to instantly contrast with green foliage.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />
                        <span><strong>Symmetrical Boxwoods:</strong> Flank the primary entryway with matching oversized planters containing structured, manicured boxwoods.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />
                        <span><strong>Architectural Uplighting:</strong> Install low-voltage brass uplights at the base of primary trees and architectural facade columns.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] mt-1.5 flex-shrink-0" />
                        <span><strong>Power Washing:</strong> Cleanse all concrete driveways, stone pathways, and siding of organic buildup and discoloration.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === "checklist" && (
                <motion.div
                  key="checklist"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-widest font-sans">Module 05</span>
                    <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-light">Launch Readiness</h2>
                    <p className="text-slate-500 font-light text-sm leading-relaxed font-sans">
                      Use this interactive checklist as you prepare your home for its market debut. Achieving 100% completion maximizes your likelihood of a premium valuation.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    {CHECKLIST_ITEMS.map((item, index) => {
                      const isChecked = checkedItems.includes(index);
                      return (
                        <div 
                          key={index}
                          onClick={() => toggleCheck(index)}
                          className={`p-4 border transition-all duration-300 cursor-pointer flex gap-4 items-start ${
                            isChecked 
                              ? "bg-[#f9f6f0] border-[#c9a96e]/40" 
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-none border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                            isChecked ? "bg-[#c9a96e] border-[#c9a96e] text-white" : "border-slate-300 text-transparent"
                          }`}>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                          <p className={`text-sm font-light font-sans transition-all duration-300 ${
                            isChecked ? "text-slate-400 line-through decoration-slate-300" : "text-slate-700"
                          }`}>
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-8 flex justify-between items-center border-t border-slate-100">
                    <p className="text-xs text-slate-400 font-sans">
                      {checkedItems.length} of {CHECKLIST_ITEMS.length} items completed
                    </p>
                    <div className="w-1/2 h-1 bg-slate-100 relative">
                      <div 
                        className="absolute left-0 top-0 h-full bg-[#c9a96e] transition-all duration-500" 
                        style={{ width: `${(checkedItems.length / CHECKLIST_ITEMS.length) * 100}%` }}
                      />
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Print Button inside content area bottom */}
          <div className="p-6 border-t border-slate-100 md:hidden pb-8 print:hidden">
             <Button
                onClick={handlePrint}
                className="w-full border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2 font-sans"
              >
                <Printer className="w-3.5 h-3.5" /> Print Strategy
              </Button>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
