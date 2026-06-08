"use client";

import { agentConfig } from "@/config/agent.config";
import { ArrowUpRight } from "lucide-react";

export default function ReviewCTA() {
  // Extract the agent's first name to keep the copy completely dynamic
  const firstName = agentConfig.name.split(" ")[0] || "us";

  // Premium review platforms from configuration with fallback safety
  const googleReviewUrl = agentConfig.social.googleReviews || "https://google.com";
  const zillowReviewUrl = agentConfig.social.zillowReviews || "https://zillow.com";

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 border-t border-slate-200/60 pt-20">
      {/* Outer Invitation Frame */}
      <div className="border border-[#c9a96e]/20 p-4 md:p-6 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.01)] relative overflow-hidden">
        {/* Subtle structural corner indicators */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#c9a96e]" />
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#c9a96e]" />
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#c9a96e]" />
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#c9a96e]" />
        
        {/* Inner Inset Hairline Frame */}
        <div className="border border-[#c9a96e]/30 px-6 py-12 md:px-12 md:py-16 text-center space-y-6 relative">
          
          {/* Eyebrow */}
          <div className="text-[10px] tracking-[0.3em] font-bold text-[#c9a96e] uppercase">
            Private Client Registry
          </div>

          {/* Heading */}
          <h3 className="text-3xl md:text-4xl font-serif font-light text-[#1a2744]">
            Have you collaborated with <span className="font-serif italic text-[#c9a96e]">{firstName}</span>?
          </h3>
          
          {/* Descriptive Copy */}
          <p className="text-slate-500 font-light text-[14px] max-w-lg mx-auto leading-relaxed">
            Your personal evaluation is highly valued. Help future property leaders optimize their acquisitions and portfolios by contributing your verified experience to our private client registry.
          </p>

          {/* Buttons Block */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {/* Google Review Button */}
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#1a2744] hover:bg-[#c9a96e] text-white hover:text-[#1a2744] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-none shadow-[0_4px_20px_rgba(26,39,68,0.08)] relative group overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <span>Google Endorsement</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-2 stroke-[2.5]" />
              </span>
            </a>

            {/* Zillow Review Button */}
            <a
              href={zillowReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-[#c9a96e]/50 text-slate-700 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 rounded-none shadow-[0_4px_15px_rgba(0,0,0,0.01)]"
            >
              <span className="flex items-center">
                <span>Zillow Verification</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-2 text-slate-400 stroke-[2.5]" />
              </span>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
