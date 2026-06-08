"use client";

import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import type { Property, RegionConfig } from "@/types";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

interface AgentSidebarCardProps {
  property: Property;
  region: RegionConfig;
}

export default function AgentSidebarCard({
  property,
  region,
}: AgentSidebarCardProps) {
  return (
    <div className="border border-[rgba(0,0,0,0.08)] bg-white p-6 rounded-[4px] sticky top-6">
      {/* Agency branding row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-[2px] bg-[#1a2744] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {agentConfig.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-[10px] text-[#6b7280] uppercase tracking-widest leading-none mb-0.5">
            Listed By
          </p>
          <p className="text-xs font-semibold text-[#1a1a1a]">
            {agentConfig.brokerage}
          </p>
        </div>
      </div>

      {/* Agent Info Row (with Headshot) */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[rgba(0,0,0,0.08)] bg-[#f9f6f0]">
          <Image
            src={agentConfig.headshot}
            alt={agentConfig.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div>
          <h3 className="text-lg font-serif text-[#1a2744] leading-snug">
            {agentConfig.name}
          </h3>
          <p className="text-[10px] text-[#6b7280] uppercase tracking-widest mt-0.5 leading-none">
            {region.agentTitle}
          </p>
        </div>
      </div>

      {/* Primary CTA */}
      <Button
        className="w-full h-12 bg-[#1a2744] hover:bg-[#243660] text-white rounded-none text-xs font-semibold uppercase tracking-widest mb-3"
        onClick={() =>
          document
            .getElementById("showing-form")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Contact Agent
      </Button>

      {/* Secondary CTA */}
      <button
        className="w-full text-xs text-[#c9a96e] underline py-2 mb-6 hover:text-[#b8915a] transition-colors text-center"
        onClick={() =>
          document
            .getElementById("showing-form")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Request a Showing
      </button>

      {/* Divider */}
      <div className="border-t border-[rgba(0,0,0,0.08)] pt-5 space-y-1">
        {/* Phone */}
        <a
          href={`tel:${agentConfig.phone}`}
          className="flex items-center gap-3 text-sm text-[#1a1a1a] py-2 hover:text-[#c9a96e] transition-colors"
        >
          <Phone size={14} className="flex-shrink-0" />
          {agentConfig.phone}
        </a>

        {/* Email */}
        <a
          href={`mailto:${agentConfig.email}`}
          className="flex items-center gap-3 text-sm text-[#1a1a1a] py-2 hover:text-[#c9a96e] transition-colors"
        >
          <Mail size={14} className="flex-shrink-0" />
          {agentConfig.email}
        </a>
      </div>

      {/* Days on market — context signal */}
      <p className="text-[11px] text-[#6b7280] mt-5 pt-4 border-t border-[rgba(0,0,0,0.06)]">
        Listed {property.daysOnMarket} days ago
      </p>
    </div>
  );
}
