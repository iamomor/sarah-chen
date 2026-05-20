import React from "react";
import { agentConfig } from "@/config/agent.config";
import BuyPageContainer from "@/features/buy/components/BuyPageContainer";

export const metadata = {
  title: `Austin Buyer Representation | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description: `Buy your dream Austin home with confidence. Private off-market pocket listings, high-stakes fiduciary negotiation, and bespoke buyer advisory with Sarah Chen.`,
};

export default function BuyPage() {
  return <BuyPageContainer />;
}
