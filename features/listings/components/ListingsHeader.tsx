import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

import { agentConfig } from "@/config/agent.config";

export default function ListingsHeader() {
  const primaryMarket = agentConfig.markets[0] || "Austin";
  const city = agentConfig.address.split(",")[2]?.trim() || "Austin";

  return (
    <section className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60 mb-10">
          <Link
            href="/"
            className="hover:text-accent transition-colors flex items-center gap-1"
          >
            <Home className="w-2.5 h-2.5" />
            Home
          </Link>
          <span className="w-4 h-[1px] bg-border" />
          <span className="text-accent">Listings</span>
        </div>

        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-foreground leading-[0.9] mb-8">
            Curated {city}{" "}
            <span className="italic serif text-accent">Residences</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="h-px w-20 bg-accent hidden md:block" />
            <p className="text-xl text-muted-foreground/80 max-w-2xl font-light leading-relaxed">
              Discover architectural masterpieces and exclusive estates across{" "}
              {city}&apos;s premier neighborhoods, from the historic charm of{" "}
              {primaryMarket} to modern waterfront living.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
