import { agentConfig } from "@/config/agent.config";
import MortgageCalculatorLoader from "@/features/tools/components/MortgageCalculatorLoader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${agentConfig.mapCenter.city} Mortgage Calculator | ${agentConfig.name}`,
  description: `Free mortgage calculator for ${agentConfig.mapCenter.city}. Estimate principal, interest, tax, and HOA payments instantly.`,
};

export default function CalculatorPage() {
  const city = agentConfig.mapCenter.city;

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Header Section */}
      <section className="bg-[#1a2744] text-white py-24 sm:py-32 relative overflow-hidden">
        {/* Background Texture/Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
          <div className="max-w-3xl space-y-6">
            <span className="text-[12px] tracking-[0.4em] font-bold text-[#c9a96e] uppercase block">
              Financial Tools
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-medium leading-tight">
              {city} Mortgage Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
              Estimate your monthly payment for any {city} home
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 sm:py-28 bg-[#f9f6f0]">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-1 gap-12">
            <MortgageCalculatorLoader />
          </div>
        </div>
      </section>
    </div>
  );
}
