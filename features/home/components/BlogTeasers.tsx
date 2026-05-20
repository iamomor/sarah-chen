import React from "react";
import Link from "next/link";
import Image from "next/image";
import { agentConfig } from "@/config/agent.config";

const cityMatch = agentConfig.address.match(/,\s*([^,]+),\s*[A-Z]{2}\s+\d{5}/);
const city = cityMatch ? cityMatch[1] : "The Region";
const market = agentConfig.markets[0] || "The Area";

const placeholders = [
  {
    slug: "real-estate-market-update-may-2026",
    title: `${city} Real Estate Market Update — May 2026`,
    excerpt: `Discover the latest trends in the ${city} luxury market, including inventory levels, days on market, and pricing shifts for the upcoming season.`,
    category: "Market Update",
    readTime: "5 min",
    date: "May 12, 2026",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: "5-things-every-first-time-buyer-must-know",
    title: `5 Things Every First-Time Buyer in ${city} Must Know`,
    excerpt: `Navigating the competitive ${city} real estate market as a first-time buyer requires strategic planning. Here are the top 5 insights to give you an edge.`,
    category: "Buyer Guide",
    readTime: "7 min",
    date: "May 4, 2026",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop",
  },
  {
    slug: `why-${market.toLowerCase().replace(/\s+/g, '-')}-homes-sell-faster`,
    title: `Why ${market} Homes Sell Faster Than Any Other ${city} Neighborhood`,
    excerpt: `An inside look at what makes ${market} the most resilient and sought-after neighborhood in Central ${city}, and why buyers are acting quickly.`,
    category: "Neighborhood",
    readTime: "4 min",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  }
];

export default function BlogTeasers() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8" style={{ backgroundColor: agentConfig.colors.accent }} />
              <span 
                className="text-[10px] font-bold uppercase tracking-[0.3em]" 
                style={{ color: agentConfig.colors.accent }}
              >
                Editorial
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight">
              Market Insights & Resources
            </h2>
          </div>
          <Link 
            href="/blog"
            className="text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity whitespace-nowrap pb-1 border-b"
            style={{ color: agentConfig.colors.accent, borderColor: agentConfig.colors.accent }}
          >
            View All Articles
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Featured Post (Left Side) */}
          <Link 
            href={`/blog/${placeholders[0].slug}`} 
            className="group flex-1 cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/9] lg:aspect-[4/3] w-full overflow-hidden mb-8 bg-gray-100">
              <Image
                src={placeholders[0].image}
                alt={placeholders[0].title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            <div className="flex flex-col flex-1 pr-0 lg:pr-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900">
                  {placeholders[0].category}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {placeholders[0].date}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 transition-colors duration-300"
                  style={{ color: agentConfig.colors.text }}>
                {placeholders[0].title}
              </h3>
              
              <p className="text-gray-500 text-lg font-light leading-relaxed mb-6">
                {placeholders[0].excerpt}
              </p>

              <span className="text-[11px] font-bold uppercase tracking-wider mt-auto text-gray-400">
                {placeholders[0].readTime} read
              </span>
            </div>
          </Link>

          {/* Secondary Posts (Right Side) */}
          <div className="lg:w-1/3 flex flex-col pt-8 lg:pt-0 lg:border-l border-gray-100 lg:pl-16">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900 mb-8 pb-4 border-b border-gray-100">
              More Stories
            </h3>
            
            <div className="flex flex-col gap-12">
              {placeholders.slice(1).map((post, idx) => (
                <Link 
                  href={`/blog/${post.slug}`} 
                  key={idx} 
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-900">
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {post.date}
                    </span>
                  </div>

                  <h4 className="text-xl md:text-2xl font-serif text-gray-900 mb-4 transition-colors duration-300 group-hover:opacity-70"
                      style={{ color: agentConfig.colors.text }}>
                    {post.title}
                  </h4>
                  
                  <p className="text-gray-500 font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    {post.readTime} read
                  </span>
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-16">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
                style={{ color: agentConfig.colors.accent }}
              >
                <span>Read All Articles</span>
                <span className="w-12 h-[1px]" style={{ backgroundColor: agentConfig.colors.accent }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
