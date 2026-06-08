"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { cn, formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

const PROPERTY_TYPES = [
  "Single Family",
  "Condo",
  "Townhouse",
  "Multi-Family",
  "Land",
];
const STATUS_OPTIONS = [
  "Active",
  "Under Contract",
  "Sold",
  "Coming Soon",
  "Price Reduced",
];
const FEATURE_OPTIONS = [
  "Pool",
  "Waterfront",
  "New Construction",
  "Open House",
  "Virtual Tour",
];

export default function ListingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);

  const [localFilters, setLocalFilters] = useState({
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "any") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams],
  );

  const handleFilterChange = (key: string, value: string | null) => {
    updateParams({ [key]: value });
  };

  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = searchParams.get("features")?.split(",") || [];
    let newFeatures: string[];
    if (currentFeatures.includes(feature)) {
      newFeatures = currentFeatures.filter((f) => f !== feature);
    } else {
      newFeatures = [...currentFeatures, feature];
    }
    updateParams({
      features: newFeatures.length > 0 ? newFeatures.join(",") : null,
    });
  };

  const clearAllFilters = () => {
    setLocalFilters({ location: "", minPrice: "", maxPrice: "" });
    router.push(pathname, { scroll: false });
  };

  const activeFilterKeys = Array.from(searchParams.keys()).filter(
    (k) => k !== "sort" && k !== "view",
  );
  const hasActiveFilters = activeFilterKeys.length > 0;

  return (
    <div className="sticky top-[72px] z-40 w-full bg-white/95 backdrop-blur-xl border-b border-border shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="container mx-auto px-6 py-5">
        {/* Main Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-stretch lg:items-center">
          {/* Location Search - Sophisticated Input + Mobile Toggle */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-[280px] group">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <Input
                placeholder={`Search ${agentConfig.markets[0]}...`}
                className="pl-7 h-10 w-full bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent transition-all placeholder:text-muted-foreground/50 placeholder:font-light"
                value={localFilters.location}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                onBlur={() =>
                  handleFilterChange("location", localFilters.location)
                }
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  handleFilterChange("location", localFilters.location)
                }
              />
            </div>
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "lg:hidden h-10 w-10 border-border rounded-none shrink-0",
                isExpanded && "border-accent text-accent"
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </div>

          {/* Collapsible Area for Mobile / Standard Layout for Desktop */}
          <div
            className={cn(
              "w-full lg:w-auto flex-col lg:flex-row gap-5 lg:gap-6 items-stretch lg:items-center lg:flex",
              isExpanded ? "flex" : "hidden"
            )}
          >
            {/* Price Range - Minimalist */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-[130px] group">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Min
                </span>
                <Input
                  type="number"
                  placeholder="0"
                  className="pl-10 h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent transition-all placeholder:text-muted-foreground/30"
                  value={localFilters.minPrice}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      minPrice: e.target.value,
                    }))
                  }
                  onBlur={() =>
                    handleFilterChange("minPrice", localFilters.minPrice)
                  }
                />
              </div>
              <span className="text-border font-light">|</span>
              <div className="relative flex-1 lg:w-[130px] group">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Max
                </span>
                <Input
                  type="number"
                  placeholder="No Limit"
                  className="pl-10 h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent transition-all placeholder:text-muted-foreground/30"
                  value={localFilters.maxPrice}
                  onChange={(e) =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      maxPrice: e.target.value,
                    }))
                  }
                  onBlur={() =>
                    handleFilterChange("maxPrice", localFilters.maxPrice)
                  }
                />
              </div>
            </div>

            {/* Beds & Baths - Refined Selects */}
            <div className="flex gap-4 w-full lg:w-auto">
              <Select
                value={searchParams.get("beds") || "any"}
                onValueChange={(v) => handleFilterChange("beds", v)}
              >
                <SelectTrigger className="h-10 flex-1 lg:w-[100px] bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus:ring-0 focus:border-accent transition-all px-0 hover:border-accent/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
                    Beds
                  </span>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Beds</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={searchParams.get("baths") || "any"}
                onValueChange={(v) => handleFilterChange("baths", v)}
              >
                <SelectTrigger className="h-10 flex-1 lg:w-[100px] bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus:ring-0 focus:border-accent transition-all px-0 hover:border-accent/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
                    Baths
                  </span>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Baths</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Property Type & Status */}
            <div className="flex gap-4 w-full lg:w-auto">
              <Select
                value={searchParams.get("type") || "any"}
                onValueChange={(v) => handleFilterChange("type", v)}
              >
                <SelectTrigger className="h-10 flex-1 lg:w-[140px] bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus:ring-0 focus:border-accent transition-all px-0 hover:border-accent/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
                    Type
                  </span>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Type</SelectItem>
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={searchParams.get("status") || "any"}
                onValueChange={(v) => handleFilterChange("status", v)}
              >
                <SelectTrigger className="h-10 flex-1 lg:w-[140px] bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus:ring-0 focus:border-accent transition-all px-0 hover:border-accent/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mr-2">
                    Status
                  </span>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">All Status</SelectItem>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Save Search Button */}
            <Button
              variant="outline"
              className="h-10 w-full lg:w-auto gap-3 text-[10px] font-bold uppercase tracking-[0.2em] border-accent/20 text-accent hover:bg-accent hover:text-white transition-all rounded-full px-6"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("open-save-search"));
              }}
            >
              💾 Save Search
            </Button>

            {/* Advanced Filters Toggle - Desktop Only */}
            <Button
              variant="ghost"
              className={cn(
                "hidden lg:flex h-10 w-full lg:w-auto gap-3 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-transparent hover:text-accent group",
                isExpanded && "text-accent",
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Advanced
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-300",
                  isExpanded && "rotate-180",
                )}
              />
            </Button>
          </div>

          {/* Right Side - Sort (Visible on Large Screens) */}
          <div className="hidden xl:block ml-auto border-l border-border pl-6">
            <Select
              value={searchParams.get("sort") || "newest"}
              onValueChange={(v) => handleFilterChange("sort", v)}
            >
              <SelectTrigger className="h-10 w-[180px] bg-transparent border-none focus:ring-0 text-[11px] font-medium uppercase tracking-widest px-0">
                <span className="text-muted-foreground mr-2 font-normal">
                  Sort:
                </span>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-high">Price High → Low</SelectItem>
                <SelectItem value="price-low">Price Low → High</SelectItem>
                <SelectItem value="sqft">Square Footage</SelectItem>
                <SelectItem value="dom">Days on Market</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expanded Filters - Clean Grid */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-10 border-t border-border mt-6">
                {/* Sq Ft Range */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Square Footage
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      placeholder="Min"
                      type="number"
                      className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent"
                      defaultValue={searchParams.get("minSqft") || ""}
                      onBlur={(e) =>
                        handleFilterChange("minSqft", e.target.value)
                      }
                    />
                    <span className="text-border font-light">—</span>
                    <Input
                      placeholder="Max"
                      type="number"
                      className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent"
                      defaultValue={searchParams.get("maxSqft") || ""}
                      onBlur={(e) =>
                        handleFilterChange("maxSqft", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Year Built */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Year Built
                  </Label>
                  <div className="flex items-center gap-3">
                    <Input
                      placeholder="Min"
                      type="number"
                      className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent"
                      defaultValue={searchParams.get("minYear") || ""}
                      onBlur={(e) =>
                        handleFilterChange("minYear", e.target.value)
                      }
                    />
                    <span className="text-border font-light">—</span>
                    <Input
                      placeholder="Max"
                      type="number"
                      className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-accent"
                      defaultValue={searchParams.get("maxYear") || ""}
                      onBlur={(e) =>
                        handleFilterChange("maxYear", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* Garage Spaces */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Garage Spaces
                  </Label>
                  <Select
                    value={searchParams.get("garage") || "any"}
                    onValueChange={(v) => handleFilterChange("garage", v)}
                  >
                    <SelectTrigger className="h-10 bg-transparent border-t-0 border-x-0 border-b border-border rounded-none focus:ring-0 focus:border-accent px-0">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Features Checkboxes */}
                <div className="space-y-4">
                  <Label className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    Features
                  </Label>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                    {FEATURE_OPTIONS.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={feature}
                          checked={(
                            searchParams.get("features")?.split(",") || []
                          ).includes(feature)}
                          onCheckedChange={() => handleFeatureToggle(feature)}
                          className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                        />
                        <label
                          htmlFor={feature}
                          className="text-[11px] font-medium leading-none cursor-pointer hover:text-accent transition-colors"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filter Pills - Elegant Chips */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50 mt-2"
            >
              {activeFilterKeys.map((key) => {
                const value = searchParams.get(key);
                if (!value || value === "any") return null;

                let label = `${key}: ${value}`;
                if (key === "minPrice")
                  label = `Min ${formatPrice(Number(value), region.currency, region.language)}`;
                if (key === "maxPrice")
                  label = `Max ${formatPrice(Number(value), region.currency, region.language)}`;
                if (key === "beds") label = `${value}+ Beds`;
                if (key === "baths") label = `${value}+ Baths`;
                if (key === "type") label = value;
                if (key === "status") label = value;
                if (key === "features") label = value.split(",").join(", ");
                if (key === "minSqft")
                  label = `Min ${value} ${region.areaLabel}`;
                if (key === "maxSqft")
                  label = `Max ${value} ${region.areaLabel}`;

                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="pl-4 pr-2 py-1.5 gap-2 h-9 bg-accent/5 text-accent border border-accent/10 rounded-full font-bold text-[10px] uppercase tracking-widest"
                  >
                    {label}
                    <button
                      onClick={() => handleFilterChange(key, null)}
                      className="hover:bg-accent/10 rounded-full p-1 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                );
              })}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-accent h-9 gap-2 font-bold text-[10px] uppercase tracking-widest transition-all"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
