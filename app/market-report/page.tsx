import React from "react";
import { Metadata } from "next";
import { agentConfig } from "@/config/agent.config";
import { getAllPosts } from "@/lib/mdx";
import MarketReportTemplate from "@/features/market-report/components/MarketReportTemplate";

export const metadata: Metadata = {
  title: `Monthly Real Estate Market Report | ${agentConfig.name} - ${agentConfig.brokerage}`,
  description: `Subscribe to receive monthly insights on ${agentConfig.mapCenter.city}'s housing market. Review local property values, inventory changes, and average days on market.`,
};

export default function MarketReportPage() {
  const allPosts = getAllPosts();
  
  // Filter for posts with category "Market Update" first
  const marketUpdatePosts = allPosts.filter(
    (post) => post.category === "Market Update"
  );
  
  // If there are fewer than 3 market update posts, fill the rest with other categories as a fallback
  const fallbackPosts = allPosts.filter(
    (post) => post.category !== "Market Update"
  );
  
  const pastReports = [...marketUpdatePosts, ...fallbackPosts].slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f9f6f0]">
      <MarketReportTemplate pastReports={pastReports} />
    </main>
  );
}
