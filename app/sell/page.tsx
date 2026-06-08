import React from "react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import SellPageContainer from "@/features/sell/components/SellPageContainer";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema";

export const metadata = {
  title: `Sell Your Home | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description: `Sell your ${region.defaultCity} home faster, for more, and with less stress. See why sellers who list with ${agentConfig.name} outperform the market. Get your free home valuation.`,
};

export default function SellPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Sell", url: "/sell" },
  ]);

  const faqSchema = getFAQSchema([
    {
      question: `How do you determine the optimal listing price for luxury properties in ${region.defaultCity}?`,
      answer: `We perform a comprehensive Micro-Market Audit that corrects for standard algorithmic error. This analysis incorporates spatial aesthetics, local infrastructure updates, structural upgrades, and private transaction registries.`
    },
    {
      question: `What channels do you use to market high-end real estate?`,
      answer: `We deploy a multi-channel marketing blueprint including cinematic 4K videography, high-end architectural photography, custom single-property websites, and targeted demographic advertising to local, national, and international buyer networks.`
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
      <SellPageContainer />
    </>
  );
}
