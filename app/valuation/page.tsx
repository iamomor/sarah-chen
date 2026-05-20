import { agentConfig } from "@/config/agent.config";
import listingsData from "@/content/listings/listings.json";
import testimonialsData from "@/content/testimonials/testimonials.json";
import PropertyCard from "@/features/listings/components/PropertyCard";
import ValuationForm from "@/features/valuation/components/ValuationForm";
import type { Property, Testimonial } from "@/types";
import {
  Award,
  ChevronRight,
  FileText,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: `Luxury Home Valuation | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description:
    "Experience a bespoke comparative market valuation conducted personally by top real estate specialist Sarah Chen.",
};

const getTrustIcon = (index: number) => {
  switch (index) {
    case 0:
      return TrendingUp;
    case 1:
      return FileText;
    default:
      return Award;
  }
};

export default function ValuationPage() {
  const listings = listingsData as Property[];
  const soldListings = listings.filter((l) => l.status === "Sold").slice(0, 3);

  const testimonials = testimonialsData as Testimonial[];
  // Get an excellent seller testimonial
  const sellerTestimonial =
    testimonials.find((t) => t.role === "Seller" || t.role === "Both") ||
    testimonials[1];

  const copy = agentConfig.valuation.pageCopy;

  return (
    <main className="min-h-screen bg-[#f9f6f0] pt-28 pb-24 relative overflow-hidden">
      {/* Dynamic Cinematic Accent Background Elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[60%] bg-gradient-to-b from-[#c9a96e]/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[30%] h-[40%] bg-gradient-to-tr from-[#1a2744]/2 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* EDITORIAL TOP HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-5">
          <div className="flex justify-center items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]">
              {copy.badge}
            </span>
            <div className="h-[1px] w-8 bg-[#c9a96e]" />
          </div>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-medium tracking-tight leading-tight text-[#1a2744]">
            {copy.title}{" "}
            <span className="font-serif italic font-light text-[#c9a96e]">
              {copy.titleAccent}
            </span>
          </h1>
          <p className="text-[#1a1a1a]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-20 mb-28 items-stretch">
          {/* Left Column - Form Container */}
          <div className="w-full lg:w-[60%] flex flex-col justify-start">
            <ValuationForm />
          </div>

          {/* Right Column - Luxury PM-designed Trust Signals */}
          <div className="w-full lg:w-[40%] flex flex-col justify-between py-2 space-y-12">
            <div className="space-y-10">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-[1px] w-6 bg-[#c9a96e]" />
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                    {copy.trustTitle}
                  </h2>
                </div>
                <h3 className="text-3xl font-serif font-light text-[#1a2744] leading-tight mb-8">
                  {copy.trustSubtitle.split(",")[0]}, <br />
                  <span className="italic font-medium text-[#c9a96e]">
                    {copy.trustSubtitle.split(",")[1] || "zero obligations."}
                  </span>
                </h3>
              </div>

              <div className="space-y-8">
                {copy.trustPoints.map((point, index) => {
                  const Icon = getTrustIcon(index);
                  return (
                    <div key={point.title} className="flex gap-5 group">
                      <div className="w-12 h-12 bg-[#c9a96e]/10 text-[#c9a96e] flex items-center justify-center flex-shrink-0 rounded-full border border-[#c9a96e]/20 transition-all duration-500 group-hover:bg-[#1a2744] group-hover:text-white group-hover:border-[#1a2744]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-medium text-[#1a2744] mb-1.5 group-hover:text-[#c9a96e] transition-colors">
                          {point.title}
                        </h4>
                        <p className="text-[#1a1a1a]/60 font-light text-xs leading-relaxed max-w-sm">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Seller Testimonial (WSJ-inspired layout) */}
            {sellerTestimonial && (
              <div className="bg-[#1a2744] text-white p-8 rounded-none border-l-4 border-[#c9a96e] relative shadow-[0_20px_55px_rgba(26,39,68,0.15)] mt-auto">
                <div className="absolute top-6 right-8 text-[#c9a96e] opacity-15 text-7xl font-serif pointer-events-none">
                  “
                </div>

                <div className="flex items-center gap-1.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-[#c9a96e] text-xs">
                      ★
                    </span>
                  ))}
                  <span className="text-[9px] uppercase tracking-widest text-[#c9a96e] font-bold ml-2">
                    Verified Transaction
                  </span>
                </div>

                <p className="font-serif italic font-light text-sm text-slate-200 leading-relaxed mb-6">
                  &quot;{sellerTestimonial.text}&quot;
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e] text-[#1a2744] flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {sellerTestimonial.authorName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#f9f6f0]">
                      {sellerTestimonial.authorName}
                    </p>
                    <p className="text-[10px] text-[#c9a96e] tracking-wide mt-0.5">
                      Sold in {sellerTestimonial.neighborhood} •{" "}
                      {sellerTestimonial.source}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PROCESS FLOW CHART */}
        <div className="border-t border-slate-200/80 pt-20 mb-28">
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-2.5 block">
              Methodology Flow
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-primary">
              {copy.processTitle}{" "}
              <span className="italic font-medium">{copy.processAccent}</span>
            </h2>
            <p className="text-slate-500 font-light text-sm max-w-md mx-auto mt-2 leading-relaxed">
              {copy.processSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {copy.processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-8 border border-slate-200/80 relative shadow-[0_10px_35px_rgba(0,0,0,0.01)] group hover:border-[#c9a96e]/40 transition-all duration-300"
              >
                <div className="absolute top-4 right-6 font-serif italic text-4xl text-slate-100 font-light group-hover:text-[#c9a96e]/10 transition-colors">
                  {step.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-light text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SOLD LISTINGS ROW (Social Proof) */}
        {soldListings.length > 0 && (
          <div className="border-t border-slate-200/80 pt-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-2 block">
                  Proof of Performance
                </span>
                <h2 className="text-3xl font-serif font-light text-primary">
                  Recent Sales by{" "}
                  <span className="italic font-medium">{agentConfig.name}</span>
                </h2>
              </div>
              <Link
                href="/listings?status=sold"
                className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1a2744] border-b-2 border-[#c9a96e] pb-0.5 hover:text-[#c9a96e] transition-colors"
              >
                View All Case Studies{" "}
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {soldListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
