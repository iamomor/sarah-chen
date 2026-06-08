import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import type { BlogPost } from "@/types";

// Import feature components
import FeaturedPostCard from "@/features/blog/components/FeaturedPostCard";
import BlogPostCard from "@/features/blog/components/BlogPostCard";
import CategoryTabs from "@/features/blog/components/CategoryTabs";
import BlogSidebar from "@/features/blog/components/BlogSidebar";
import BlogNewsletterInline from "@/features/blog/components/BlogNewsletterInline";

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

// Generate SEO Metadata dynamically reading from agent and region configs
export async function generateMetadata(): Promise<Metadata> {
  const cityName = region.defaultCity || "Austin";
  const agentName = agentConfig.name;
  const agentTitle = region.agentTitle || "REALTOR®";

  return {
    title: `${cityName} Real Estate Blog | Market Updates | ${agentName}`,
    description: `Expert ${cityName} real estate insights, market updates, buyer and seller guides from ${agentName}, ${cityName} ${agentTitle}.`,
    openGraph: {
      title: `${cityName} Real Estate Blog | Market Updates | ${agentName}`,
      description: `Expert ${cityName} real estate insights, market updates, buyer and seller guides from ${agentName}, ${cityName} ${agentTitle}.`,
      type: "website",
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = await searchParams;
  const categoryQuery = resolvedParams.category || "all";

  // Fetch all posts sorted by date
  const allPosts = getAllPosts();

  // Compute category counts from all posts dynamically
  const categoryCounts: Record<string, number> = {
    "Market Update": 0,
    "Buyer Guide": 0,
    "Seller Guide": 0,
    "Neighborhood": 0,
    "Tips": 0,
  };

  allPosts.forEach((post) => {
    if (post.category in categoryCounts) {
      categoryCounts[post.category]++;
    }
  });

  // Map slug in URL to exact Category string in types
  const categoryMap: Record<string, string> = {
    "market-update": "Market Update",
    "buyer-guide": "Buyer Guide",
    "seller-guide": "Seller Guide",
    "neighborhood": "Neighborhood",
    "tips": "Tips",
  };

  const activeCategorySlug = categoryQuery.toLowerCase();
  const activeCategoryName = categoryMap[activeCategorySlug];

  // Filter posts based on category slug
  const filteredPosts = activeCategoryName
    ? allPosts.filter((post) => post.category === activeCategoryName)
    : allPosts;

  // We highlight the very first post of the "All" category as featured.
  // If the user is filtering by a specific category, we bypass the hero featured section
  // and display all matching posts inside the normal grid to make the filter transition direct.
  const isViewingAll = activeCategorySlug === "all" || !activeCategoryName;
  const featuredPost = isViewingAll && allPosts.length > 0 ? allPosts[0] : null;

  // The posts list to display in the main grid
  const gridPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <main className="min-h-screen bg-background pt-20 sm:pt-24 pb-16 sm:pb-20">
      {/* 1. Header Hero section */}
      <section className="border-b border-border/40 py-12 sm:py-16 bg-[#fdfcf9]">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Expert Editorial
            </span>
            <div className="h-[1px] w-8 bg-accent" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light text-primary tracking-tight font-serif">
            Market Insights & Resources
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed">
            Stay informed on {region.defaultCity || "Austin"} real estate with expert analysis, structural valuations, and neighborhood legacy profiles.
          </p>
        </div>
      </section>

      {/* 2. Content Directory Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
          {/* Highlight Featured Post at the top of the Blog Index Page */}
          {featuredPost && (
            <div className="w-full">
              <FeaturedPostCard post={featuredPost} />
            </div>
          )}

          {/* Categories Tab Bar */}
          <CategoryTabs activeCategory={categoryQuery} />

          {/* Main Layout Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Posts List */}
            <div className="lg:col-span-8 space-y-8">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-[#fdfcf9] border border-dashed border-border/60">
                  <p className="text-base text-muted-foreground font-light mb-4">
                    No articles found in this category.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-block text-xs uppercase font-bold tracking-widest text-accent border-b border-accent pb-1 hover:text-primary hover:border-primary transition-all"
                  >
                    Return to All Articles
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Render first row (up to 4 posts) */}
                    {gridPosts.slice(0, 4).map((post) => (
                      <BlogPostCard key={post.slug} post={post} />
                    ))}
                  </div>

                  {/* Render inline newsletter CTA between Row 2 and Row 3 (after 4 posts) */}
                  {gridPosts.length >= 2 && (
                    <div className="w-full">
                      <BlogNewsletterInline />
                    </div>
                  )}

                  {/* Render second row (posts index 4 and beyond) */}
                  {gridPosts.length > 4 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {gridPosts.slice(4).map((post) => (
                        <BlogPostCard key={post.slug} post={post} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Column: Sidebar (Desktop only) */}
            <div className="hidden lg:block lg:col-span-4">
              <BlogSidebar
                recentPosts={allPosts}
                categoryCounts={categoryCounts}
              />
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
