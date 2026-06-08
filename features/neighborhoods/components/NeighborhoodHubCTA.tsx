import React from "react";
import Link from "next/link";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";

export default function NeighborhoodHubCTA() {
  const ctaHeading = "Don't see your neighborhood?";
  const ctaDescription = `${agentConfig.name} serves all ${region.defaultCity}-area neighborhoods. Contact her for hyperlocal market data on any ${region.defaultCity} area.`;

  return (
    <div className="bg-primary rounded-lg p-8 md:p-12 text-center text-white relative overflow-hidden shadow-lg border border-accent/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d315c] via-primary to-[#0f192e] opacity-90"></div>
      <div className="relative z-10 max-w-2xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-accent">
          {ctaHeading}
        </h3>
        <p className="text-gray-300 mb-8 leading-relaxed">
          {ctaDescription}
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3.5 bg-accent hover:bg-white hover:text-primary text-primary font-semibold rounded uppercase tracking-wider text-xs transition-colors duration-300"
        >
          Get in Touch →
        </Link>
      </div>
    </div>
  );
}
