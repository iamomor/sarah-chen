"use client";

import React, { useState } from "react";
import MarketReportHero from "./MarketReportHero";
import MarketReportPreview from "./MarketReportPreview";
import BlogPostCard from "@/features/blog/components/BlogPostCard";
import type { BlogPost } from "@/types";
import { agentConfig } from "@/config/agent.config";

interface MarketReportTemplateProps {
  pastReports: BlogPost[];
}

export default function MarketReportTemplate({ pastReports }: MarketReportTemplateProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("All " + agentConfig.mapCenter.city);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSteps, setScanSteps] = useState<string[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const handleSelectNeighborhood = (neighborhood: string) => {
    setIsScanning(true);
    setSelectedNeighborhood(neighborhood);
    setCurrentStepIdx(0);

    const steps = [
      "Accessing local MLS transaction registries...",
      "Compiling active and pending luxury inventory...",
      `Calculating historical price-per-${agentConfig.idxEnabled ? "sqft" : "sqm"} appreciation...`,
      "Synthesizing average days-on-market indices...",
      "Finalizing neighborhood intelligence briefing..."
    ];
    setScanSteps(steps);

    // Increment scanning steps for dynamic UX feel
    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 350);

    // Smooth scroll to preview section after animation finishes
    setTimeout(() => {
      clearInterval(interval);
      setIsScanning(false);
      const previewElement = document.getElementById("market-preview-section");
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 1800);
  };

  return (
    <div className="relative min-h-screen bg-[#f9f6f0]">
      {/* 1. Hero Section with Selection */}
      <MarketReportHero 
        onSelectNeighborhood={handleSelectNeighborhood} 
        selectedNeighborhood={selectedNeighborhood}
        isScanning={isScanning}
        scanStep={scanSteps[currentStepIdx] || ""}
      />

      {/* 2. Sample Report Metrics & Dashboard */}
      <div id="market-preview-section">
        <MarketReportPreview 
          selectedNeighborhood={selectedNeighborhood} 
          isScanning={isScanning}
        />
      </div>

      {/* 3. Past Reports Section */}
      <section className="py-14 sm:py-20 lg:py-24 bg-[#f9f6f0] border-t border-slate-200/50 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 justify-center">
              <div className="h-[1px] w-6 bg-[#c9a96e]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                Historical Data
              </span>
              <div className="h-[1px] w-6 bg-[#c9a96e]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#1a2744] font-medium leading-tight">
              Past Market Analyses
            </h2>
            <p className="text-slate-500 font-light text-sm max-w-md mx-auto leading-relaxed">
              Explore previous monthly reports and neighborhood intelligence briefings.
            </p>
          </div>

          {pastReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastReports.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 font-light text-sm">
              No past reports available at this time.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
