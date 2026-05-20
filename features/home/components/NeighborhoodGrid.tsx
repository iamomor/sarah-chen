import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { agentConfig } from "@/config/agent.config";
import type { Neighborhood } from "@/types";

export default function NeighborhoodGrid() {
  const dirPath = path.join(process.cwd(), "content/neighborhoods");
  let neighborhoods: Neighborhood[] = [];

  try {
    const files = fs.readdirSync(dirPath);
    neighborhoods = files
      .filter((file) => file.endsWith(".md"))
      .map((file) => {
        const fullPath = path.join(dirPath, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        return data as Neighborhood;
      });
  } catch (error) {
    console.error("Error loading neighborhoods:", error);
  }

  if (neighborhoods.length === 0) return null;

  const cityMatch = agentConfig.address.match(/,\s*([^,]+),\s*[A-Z]{2}\s+\d{5}/);
  const city = cityMatch ? cityMatch[1] : "The Area";

  const fallbackImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <section className="py-32" style={{ backgroundColor: agentConfig.colors.background }}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8" style={{ backgroundColor: agentConfig.colors.accent }} />
            <span 
              className="text-[10px] font-bold uppercase tracking-[0.3em]" 
              style={{ color: agentConfig.colors.accent }}
            >
              The Portfolio
            </span>
            <div className="h-[1px] w-8" style={{ backgroundColor: agentConfig.colors.accent }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 tracking-tight">
            Explore {city} Neighborhoods
          </h2>
          <p className="text-lg font-light text-gray-500 max-w-xl">
            Hyperlocal expertise in {city}&apos;s most sought-after communities, offering a lifestyle of distinction and refinement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {neighborhoods.map((neighborhood, idx) => {
            const imageSrc = (neighborhood.heroImage && neighborhood.heroImage.startsWith('http')) 
              ? neighborhood.heroImage 
              : fallbackImages[idx % fallbackImages.length];

            return (
              <Link 
                key={neighborhood.id} 
                href={`/neighborhoods/${neighborhood.slug}`}
                className="group block relative overflow-hidden aspect-[3/4] bg-gray-100"
              >
                <Image
                  src={imageSrc}
                  alt={neighborhood.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-white flex flex-col items-center text-center transform transition-transform duration-700 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-3xl md:text-4xl font-serif mb-4 drop-shadow-md">
                    {neighborhood.name}
                  </h3>
                  
                  <div className="flex flex-col items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase" style={{ color: agentConfig.colors.accent }}>
                      From ${neighborhood.stats.avgPrice.toLocaleString()}
                    </span>
                    <span className="w-6 h-[1px] bg-white/30" />
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/80">
                      {neighborhood.stats.activeListings} Active Listings
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link 
            href="/neighborhoods" 
            className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity pb-2 border-b"
            style={{ color: agentConfig.colors.text, borderColor: agentConfig.colors.accent }}
          >
            <span>Discover All Communities</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
