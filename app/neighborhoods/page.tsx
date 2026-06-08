import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Neighborhood } from "@/types";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import NeighborhoodShowcase from "@/features/neighborhoods/components/NeighborhoodShowcase";

// Premium SEO Metadata
export const metadata = {
  title: `Explore ${region.defaultCity} Neighborhoods | ${agentConfig.name}`,
  description: `Discover premier ${region.defaultCity} communities, including Tarrytown, Westlake, and Hyde Park. Get expert local insights, real estate market trends, school ratings, and local guides from top luxury specialist ${agentConfig.name}.`,
};

function parseDynamicContent(content: string) {
  const firstName = agentConfig.name.split(" ")[0];
  return content
    .replace(/\{\{agentName\}\}/g, agentConfig.name)
    .replace(/\{\{agentFirstName\}\}/g, firstName)
    .replace(/\{\{city\}\}/g, region.defaultCity)
    .replace(/\{\{state\}\}/g, region.defaultState)
    .replace(/\{\{regionName\}\}/g, region.regionName);
}

export default async function NeighborhoodsPage() {
  const dirPath = path.join(process.cwd(), "content/neighborhoods");
  let neighborhoods: Neighborhood[] = [];

  try {
    const files = fs.readdirSync(dirPath);
    neighborhoods = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        let fileContents = fs.readFileSync(path.join(dirPath, file), "utf8");
        fileContents = parseDynamicContent(fileContents);
        const { data } = matter(fileContents);
        return data as Neighborhood;
      });
  } catch (error) {
    console.error("Error reading neighborhoods:", error);
  }

  // Sort neighborhoods by price descending (luxury order: Westlake, Tarrytown, Hyde Park)
  const sortedNeighborhoods = [...neighborhoods].sort(
    (a, b) => b.stats.avgPrice - a.stats.avgPrice
  );

  return (
    <main className="min-h-screen">
      <NeighborhoodShowcase neighborhoods={sortedNeighborhoods} />
    </main>
  );
}
