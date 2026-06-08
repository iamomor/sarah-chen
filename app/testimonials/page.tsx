import { agentConfig } from "@/config/agent.config";
import { region, activeRegion } from "@/config/region.config";
import TestimonialsPageContainer from "@/features/testimonials/components/TestimonialsPageContainer";

export const metadata = {
  title: `Client Reviews & Experiences | ${agentConfig.name} | ${agentConfig.title}`,
  description: `Discover how ${agentConfig.name} leverages absolute discretion, hyper-local intelligence, and premium advocacy to optimize property portfolios for buyers and sellers in ${region.regionName || "Central Texas"}.`,
};

export default function TestimonialsPage() {
  // AggregateRating LocalBusiness Schema Markup (JSON-LD) for Search Engine Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": agentConfig.name,
    "image": `${agentConfig.siteUrl}${agentConfig.headshot}`,
    "telephone": agentConfig.phoneRaw,
    "email": agentConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": agentConfig.address,
      "addressLocality": region.defaultCity,
      "addressRegion": region.defaultState,
      "addressCountry": activeRegion,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agentConfig.stats.googleRating.toString(),
      "reviewCount": agentConfig.stats.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
  };

  return (
    <>
      {/* Search Engine Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Feature Orchestration Layer */}
      <TestimonialsPageContainer />
    </>
  );
}
