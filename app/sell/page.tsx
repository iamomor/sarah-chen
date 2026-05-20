import React from "react";
import { agentConfig } from "@/config/agent.config";
import SellPageContainer from "@/features/sell/components/SellPageContainer";

export const metadata = {
  title: `Sell Your Home | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description: `Sell your Austin home faster, for more, and with less stress. See why sellers who list with ${agentConfig.name} outperform the market. Get your free home valuation.`,
};

export default function SellPage() {
  return <SellPageContainer />;
}
