import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Neighborhood, Property } from "@/types";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import listingsData from "@/content/listings/listings.json";
import NeighborhoodTemplate from "@/features/neighborhoods/components/NeighborhoodTemplate";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseDynamicContent(content: string) {
  const firstName = agentConfig.name.split(" ")[0];
  return content
    .replace(/\{\{agentName\}\}/g, agentConfig.name)
    .replace(/\{\{agentFirstName\}\}/g, firstName)
    .replace(/\{\{city\}\}/g, region.defaultCity)
    .replace(/\{\{state\}\}/g, region.defaultState)
    .replace(/\{\{regionName\}\}/g, region.regionName);
}

// Generate static params for static builds
export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), "content/neighborhoods");
  try {
    const files = fs.readdirSync(dirPath);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => ({
        slug: file.replace(".md", ""),
      }));
  } catch (error) {
    console.error("Error reading neighborhood directory for static params:", error);
    return [];
  }
}

// Generate metadata for premium SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/neighborhoods", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return {};
  }

  try {
    let fileContents = fs.readFileSync(filePath, "utf8");
    fileContents = parseDynamicContent(fileContents);
    const { data } = matter(fileContents);
    const neighborhood = data as Neighborhood;

    const title = `Living in ${neighborhood.name}, ${region.defaultCity} ${region.defaultState} | Homes For Sale | ${agentConfig.name}`;
    const description = `Explore ${neighborhood.name} ${region.defaultCity} — real estate market data, local lifestyle, schools, and active listings. ${agentConfig.name} is ${region.defaultCity}'s most trusted ${neighborhood.name} specialist.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [
          {
            url: neighborhood.heroImage,
            width: 1200,
            height: 630,
            alt: `${neighborhood.name} Guide`,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata for neighborhood:", error);
    return {};
  }
}

// Server Component page renderer
export default async function NeighborhoodPage({ params }: PageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "content/neighborhoods", `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  try {
    let fileContents = fs.readFileSync(filePath, "utf8");
    fileContents = parseDynamicContent(fileContents);
    const { data, content } = matter(fileContents);
    const neighborhood = data as Neighborhood;

    // Load active listings belonging to this neighborhood using target filtering logic
    const listings = (listingsData as Property[]).filter((property) =>
      property.address.neighborhood.toLowerCase().includes(neighborhood.name.toLowerCase())
    );

    return (
      <main className="min-h-screen">
        <NeighborhoodTemplate
          neighborhood={neighborhood}
          listings={listings}
          lifestyleContent={content}
        />
      </main>
    );
  } catch (error) {
    console.error("Error loading neighborhood page:", error);
    notFound();
  }
}
