"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";

interface ListingsNewsletterCTAProps {
  onSaveSearchClick: () => void;
}

export default function ListingsNewsletterCTA({ onSaveSearchClick }: ListingsNewsletterCTAProps) {
  return (
    <section className="py-24 bg-primary text-white overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
            Never miss the perfect <span className="italic serif">home.</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
            Save your search criteria and be the first to know when new
            listings hit the market in your favorite neighborhoods.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={onSaveSearchClick}
              className="bg-accent hover:bg-accent/90 text-primary font-bold uppercase tracking-widest text-xs h-14 px-10 rounded-full w-full sm:w-auto"
            >
              Save This Search
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/10 text-white font-bold uppercase tracking-widest text-xs h-14 px-10 rounded-full w-full sm:w-auto"
            >
              Contact {agentConfig.name}
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full" />
    </section>
  );
}
