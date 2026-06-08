import React from "react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import AboutPageContainer from "@/features/about/components/AboutPageContainer";
import { getPersonSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata = {
  title: `About ${agentConfig.name} | ${agentConfig.brokerage}`,
  description: `Learn more about ${agentConfig.name}, ${region.defaultCity}'s top luxury real estate specialist with ${agentConfig.stats.careerSalesVolume} in career sales. Read her story, credentials, and community work.`,
};

export default function AboutPage() {
  const personSchema = getPersonSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutPageContainer />
    </>
  );
}
