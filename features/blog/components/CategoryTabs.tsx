import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string; // e.g. "all", "market-update", "buyer-guide", etc.
}

const CATEGORIES = [
  { slug: "all", label: "All Insights" },
  { slug: "market-update", label: "Market Updates" },
  { slug: "buyer-guide", label: "Buyer Guides" },
  { slug: "seller-guide", label: "Seller Guides" },
  { slug: "neighborhood", label: "Neighborhoods" },
  { slug: "tips", label: "Tips & Secrets" },
];

export default function CategoryTabs({ activeCategory }: CategoryTabsProps) {
  const activeNormalized = activeCategory.toLowerCase();

  return (
    <div className="w-full border-b border-border/60 mb-12 overflow-x-auto scrollbar-none">
      <div className="flex space-x-8 lg:space-x-12 min-w-max px-2 py-1">
        {CATEGORIES.map((cat) => {
          const isActive = activeNormalized === cat.slug;
          const href = cat.slug === "all" ? "/blog" : `/blog?category=${cat.slug}`;

          return (
            <Link
              key={cat.slug}
              href={href}
              className={cn(
                "relative pb-4 text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none hover:text-accent",
                isActive
                  ? "text-primary border-b-2 border-accent"
                  : "text-muted-foreground/60"
              )}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
