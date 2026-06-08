import React from "react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import BuyPageContainer from "@/features/buy/components/BuyPageContainer";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema";

export const metadata = {
  title: `${region.defaultCity} Buyer Representation | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description: `Buy your dream ${region.defaultCity} home with confidence. Private off-market pocket listings, high-stakes fiduciary negotiation, and bespoke buyer advisory with ${agentConfig.name}.`,
};

export default function BuyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Buy", url: "/buy" },
  ]);

  const faqSchema = getFAQSchema([
    {
      question: `What is your approach to representing buyers in ${region.defaultCity}'s competitive luxury corridors?`,
      answer: `Our practice is founded on private buyer advocacy, off-market search protocols, and professional negotiation. We coordinate every component of the acquisition lifecycle to optimize transaction structures.`
    },
    {
      question: `Do you have access to off-market or pocket listings in ${region.defaultCity}?`,
      answer: `Yes. Through our extensive regional network, direct brokerage integrations, and strategic seller outreach, we consistently connect buyers with off-market pocket listings before they reach public MLS platforms.`
    }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BuyPageContainer />
    </>
  );
}
