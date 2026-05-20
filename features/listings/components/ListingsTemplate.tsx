"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  Map as MapIcon,
  SearchX,
  ChevronDown,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agentConfig } from "@/config/agent.config";
import listingsData from "@/content/listings/listings.json";
import type { Property } from "@/types";
import { cn } from "@/lib/utils";

// Sub-components in feature folder
import ListingFilters from "./ListingFilters";
import PropertyCard from "./PropertyCard";
import PropertyPreviewModal from "./PropertyPreviewModal";
import SaveSearchModal from "./SaveSearchModal";
import CompactPropertyCard from "./CompactPropertyCard";
import ListingsHeader from "./ListingsHeader";
import ListingsNewsletterCTA from "./ListingsNewsletterCTA";

// Dynamic map view to avoid SSR issues
const MapView = dynamic(
  () => import("./MapView"),
  { ssr: false },
);

const ITEMS_PER_PAGE = 12;

export default function ListingsTemplate() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get("view") === "map" ? "map" : "grid";
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
  const [previewProperty, setPreviewProperty] = useState<Property | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaveSearchOpen, setIsSaveSearchOpen] = useState(false);

  // 0. Listen for Save Search Event & Auto-trigger
  useEffect(() => {
    const handleOpen = () => setIsSaveSearchOpen(true);
    window.addEventListener("open-save-search", handleOpen);

    // Auto-trigger once per session after scrolling a bit
    const hasTriggered = sessionStorage.getItem("save-search-triggered");
    const handleScroll = () => {
      // scrollY > 1500 is roughly after 6 listings on desktop
      if (
        window.scrollY > 1500 &&
        !sessionStorage.getItem("save-search-triggered")
      ) {
        setIsSaveSearchOpen(true);
        sessionStorage.setItem("save-search-triggered", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    if (!hasTriggered) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("open-save-search", handleOpen);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 1. Filter Data
  const filteredListings = useMemo(() => {
    let results = [...(listingsData as Property[])];

    // Location
    const location = searchParams.get("location")?.toLowerCase();
    if (location) {
      results = results.filter(
        (p) =>
          p.address.street.toLowerCase().includes(location) ||
          p.address.neighborhood.toLowerCase().includes(location) ||
          p.address.city.toLowerCase().includes(location) ||
          p.address.zip.includes(location),
      );
    }

    // Price
    const minPrice = Number(searchParams.get("minPrice"));
    const maxPrice = Number(searchParams.get("maxPrice"));
    if (minPrice) results = results.filter((p) => p.price >= minPrice);
    if (maxPrice) results = results.filter((p) => p.price <= maxPrice);

    // Beds
    const beds = searchParams.get("beds");
    if (beds && beds !== "any")
      results = results.filter((p) => p.details.beds >= Number(beds));

    // Baths
    const baths = searchParams.get("baths");
    if (baths && baths !== "any")
      results = results.filter((p) => p.details.baths >= Number(baths));

    // Type
    const type = searchParams.get("type");
    if (type && type !== "any")
      results = results.filter((p) => p.details.propertyType === type);

    // Status
    const status = searchParams.get("status");
    if (status && status !== "any") {
      results = results.filter((p) => p.status === status);
    }

    // Extended Filters
    const minSqft = Number(searchParams.get("minSqft"));
    const maxSqft = Number(searchParams.get("maxSqft"));
    if (minSqft) results = results.filter((p) => p.details.sqft >= minSqft);
    if (maxSqft) results = results.filter((p) => p.details.sqft <= maxSqft);

    const minYear = Number(searchParams.get("minYear"));
    const maxYear = Number(searchParams.get("maxYear"));
    if (minYear)
      results = results.filter((p) => p.details.yearBuilt >= minYear);
    if (maxYear)
      results = results.filter((p) => p.details.yearBuilt <= maxYear);

    const garage = searchParams.get("garage");
    if (garage && garage !== "any")
      results = results.filter(
        (p) => (p.details.garage || 0) >= Number(garage),
      );

    const features = searchParams.get("features")?.split(",");
    if (features && features.length > 0 && features[0] !== "") {
      results = results.filter((p) =>
        features.every((f) => {
          if (f === "Open House") return !!p.openHouse;
          if (f === "Virtual Tour") return !!p.virtualTourUrl;
          if (f === "New Construction") return p.details.yearBuilt >= 2024;

          return p.features.some((pf) =>
            pf.toLowerCase().includes(f.toLowerCase()),
          );
        }),
      );
    }

    // 2. Sort Data
    const sort = searchParams.get("sort") || "newest";
    results.sort((a, b) => {
      switch (sort) {
        case "price-high":
          return b.price - a.price;
        case "price-low":
          return a.price - b.price;
        case "sqft":
          return b.details.sqft - a.details.sqft;
        case "dom":
          return a.daysOnMarket - b.daysOnMarket;
        case "newest":
        default:
          return (
            new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime()
          );
      }
    });

    return results;
  }, [searchParams]);

  // 4. View Switcher
  const toggleView = (newView: "grid" | "map") => {
    const params = new URLSearchParams(searchParams.toString());
    if (newView === "map") {
      params.set("view", "map");
    } else {
      params.delete("view");
    }
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  // 3. Pagination
  const displayedListings = filteredListings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredListings.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <ListingsHeader />

      {/* Filters Sticky Bar */}
      <ListingFilters />

      {/* Results Section */}
      <section className="py-12 bg-[#fdfcf9]">
        <div className="container mx-auto px-4">
          
          {/* Results Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold tracking-tighter text-foreground">
                  {filteredListings.length}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                  Exclusive Results
                </span>
              </div>
              <div className="h-[1px] w-12 bg-accent/30" />
            </div>

            <div className="flex items-center gap-8">
              {/* View Toggle - Sophisticated */}
              <div className="flex bg-white p-1.5 rounded-full border border-border/50 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                <button
                  onClick={() => toggleView("grid")}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
                    view === "grid"
                      ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <LayoutGrid className="w-3 h-3" />
                  Grid
                </button>
                <button
                  onClick={() => toggleView("map")}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
                    view === "map"
                      ? "bg-primary text-white shadow-2xl shadow-primary/30 scale-105"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <MapIcon className="w-3 h-3" />
                  Map
                </button>
              </div>

              {/* Desktop Sort Dropdown - Minimalist */}
              <div className="hidden xl:block">
                <Select
                  value={searchParams.get("sort") || "newest"}
                  onValueChange={(v) => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set("sort", v);
                    window.history.pushState(null, "", `?${params.toString()}`);
                  }}
                >
                  <SelectTrigger className="border-none bg-transparent h-auto py-0 focus:ring-0 text-[10px] font-bold uppercase tracking-[0.2em] gap-2 hover:text-accent transition-colors group">
                    <span className="text-muted-foreground/60 font-normal group-hover:text-accent">
                      Sort
                    </span>
                    <SelectValue />
                    <ChevronDown className="w-3 h-3 text-muted-foreground group-hover:text-accent transition-colors" />
                  </SelectTrigger>
                  <SelectContent
                    align="end"
                    className="rounded-none border-border"
                  >
                    <SelectItem
                      value="newest"
                      className="text-[10px] uppercase tracking-widest font-bold"
                    >
                      Newest First
                    </SelectItem>
                    <SelectItem
                      value="price-high"
                      className="text-[10px] uppercase tracking-widest font-bold"
                    >
                      Price High → Low
                    </SelectItem>
                    <SelectItem
                      value="price-low"
                      className="text-[10px] uppercase tracking-widest font-bold"
                    >
                      Price Low → High
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Listings Grid or Map */}
          {view === "grid" ? (
            <>
              {displayedListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode="popLayout">
                    {displayedListings.map((property, idx) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        index={idx % 12}
                        onSelect={() => {
                          setPreviewProperty(property);
                          setIsPreviewOpen(true);
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-32 text-center">
                  <div className="w-20 h-20 rounded-full bg-accent/5 flex items-center justify-center mb-6">
                    <SearchX className="w-10 h-10 text-accent/40" />
                  </div>
                  <h3 className="text-2xl font-medium mb-2">
                    No properties match your criteria
                  </h3>
                  <p className="text-muted-foreground mb-8 max-w-md">
                    Try adjusting your filters or clearing them to see all
                    available listings.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full px-8 h-12 border-accent text-accent hover:bg-accent hover:text-white"
                    onClick={() =>
                      window.history.pushState(
                        null,
                        "",
                        window.location.pathname,
                      )
                    }
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center mt-20">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLoadMore}
                    className="h-14 px-12 rounded-full border-border bg-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 font-bold uppercase tracking-widest text-xs"
                  >
                    Load More Listings
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="relative flex flex-col lg:flex-row gap-0 h-[60vh] lg:h-[calc(100vh-180px)] bg-white border border-border overflow-hidden rounded-sm shadow-2xl">
              
              {/* Refined Side Panel (Editorial Sidebar) */}
              <div className="w-full lg:w-[420px] xl:w-[480px] shrink-0 h-[350px] lg:h-full bg-white z-20 flex flex-col border-r border-border">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-foreground">
                      {filteredListings.length}{" "}
                      <span className="italic serif text-accent">Curated</span>{" "}
                      Homes
                    </h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">
                      Currently available in {agentConfig.mapCenter.city}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleView("grid")}
                    className="lg:hidden rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-2">
                  {displayedListings.length > 0 ? (
                    <>
                      {displayedListings.map((property) => (
                        <CompactPropertyCard
                          key={property.id}
                          property={property}
                          isSelected={activePropertyId === property.id}
                          onSelect={() => {
                            setPreviewProperty(property);
                            setIsPreviewOpen(true);
                          }}
                          onHover={() => setActivePropertyId(property.id)}
                          onLeave={() => setActivePropertyId(null)}
                        />
                      ))}
                      {hasMore && (
                        <div className="py-8 text-center">
                          <Button
                            variant="outline"
                            className="rounded-full px-10 border-border text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                            onClick={handleLoadMore}
                          >
                            Discover More
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-20">
                      <SearchX className="w-12 h-12 text-accent/20 mx-auto mb-4" />
                      <p className="text-muted-foreground font-medium">
                        No residences found.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Premium Map View */}
              <div className="flex-1 h-full relative">
                <MapView
                  properties={filteredListings}
                  activePropertyId={activePropertyId}
                  onPropertySelect={(property) => {
                    setPreviewProperty(property);
                    setIsPreviewOpen(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <ListingsNewsletterCTA onSaveSearchClick={() => setIsSaveSearchOpen(true)} />

      <SaveSearchModal
        isOpen={isSaveSearchOpen}
        onOpenChange={setIsSaveSearchOpen}
        searchParams={searchParams}
      />

      <PropertyPreviewModal
        property={previewProperty}
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />
    </main>
  );
}
