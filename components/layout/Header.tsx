"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { agentConfig } from "@/config/agent.config";
import { cn, slugify } from "@/lib/utils";
import type { NavItem } from "@/types";
import { motion } from "framer-motion";
import { ChevronDown, Map, Menu, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  // Track scroll and hash changes
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleHashChange = () => setCurrentHash(window.location.hash || "");

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);

    // Initial check
    handleHashChange();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
    };
  }, [pathname, searchParams]); // Re-run on any navigation to ensure hash sync

  const navItems: NavItem[] = useMemo(
    () => [
      {
        label: "BUY",
        children: [
          { label: "Find a Home", href: "/listings" },
          { label: "Buyer's Guide", href: "/buy" },
          { label: "Mortgage Calculator", href: "/calculator" },
          { label: "First-Time Buyer Resources", href: "/buy#resources" },
        ],
      },
      {
        label: "SELL",
        children: [
          { label: "What's My Home Worth?", href: "/valuation" },
          { label: "Seller's Guide", href: "/sell" },
          { label: "Marketing Presentation", href: "/sell#marketing" },
          { label: "Recent Sales", href: "/listings?status=sold" },
        ],
      },
      {
        label: "SEARCH",
        children: [
          { label: "Search All Listings", href: "/listings" },
          { label: "Map Search", href: "/listings?view=map" },
          { label: "Open Houses", href: "/listings?type=openhouse" },
          { label: "New Developments", href: "/listings?type=new" },
        ],
      },
      {
        label: "AREAS",
        dynamicMarkets: true,
        children: [
          ...agentConfig.markets.map((market) => ({
            label: market,
            href: `/neighborhoods/${slugify(market)}`,
          })),
          { label: "View All Neighborhoods", href: "/neighborhoods" },
        ],
      },
      {
        label: "ABOUT",
        children: [
          { label: `Meet ${agentConfig.name}`, href: "/about" },
          { label: "Meet The Team", href: "/about#team" },
          { label: "Press & Media", href: "/about#press" },
          { label: "Client Reviews", href: "/testimonials" },
        ],
      },
    ],
    [],
  );

  // Priority-based active href resolver
  const activeHref = useMemo(() => {
    let bestMatch = null;
    let maxPriority = -1;

    const activeHash = currentHash.replace("#", "");

    for (const cat of navItems) {
      for (const item of cat.children || []) {
        const href = item.href || "";
        if (!href) continue;

        // Split href into path and hash
        const [hPath, hHash] = href.split("#");
        let priority = 0;

        // Path must match exactly
        if (pathname === hPath) {
          if (hHash && activeHash === hHash) {
            priority = 10; // Exact Path + Hash Match (Highest)
          } else if (!hHash && !activeHash) {
            priority = 5; // Path Match, No Hash in either (High)
          } else if (!hHash && activeHash) {
            priority = 2; // Path Match, URL has hash but item doesn't (Low)
          }
        }
        // Handle search params for status/view
        else if (href.includes("?") && pathname === hPath.split("?")[0]) {
          if (
            searchParams.toString() &&
            href.includes(searchParams.toString())
          ) {
            priority = 8;
          }
        }

        if (priority > maxPriority && priority > 0) {
          maxPriority = priority;
          bestMatch = href;
        }
      }
    }
    return bestMatch;
  }, [pathname, searchParams, currentHash, navItems]);

  const activeCategoryIndex = useMemo(() => {
    return navItems.findIndex((cat) =>
      cat.children?.some((item) => item.href === activeHref),
    );
  }, [navItems, activeHref]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-[#1a2744] shadow-[0_10px_30px_rgba(0,0,0,0.3)] py-3 border-b border-[#c9a96e]/20"
          : "bg-[#1a2744] py-6 border-b border-white/5",
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col group relative z-10 shrink-0">
          <span className="text-2xl lg:text-3xl font-serif font-bold tracking-[0.02em] transition-all duration-300 group-hover:text-[#c9a96e] text-[#f9f6f0]">
            {agentConfig.name.toUpperCase()}
          </span>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-4 bg-[#c9a96e]" />
            <span className="text-[9px] tracking-[0.3em] font-medium uppercase text-[#c9a96e] opacity-80">
              Luxury Portfolio
            </span>
            <div className="h-[1px] w-4 bg-[#c9a96e]" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((category, index) => {
            const isCatActive = index === activeCategoryIndex;

            return (
              <DropdownMenu key={category.label}>
                <DropdownMenuTrigger className="group relative py-2 outline-none cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-[13px] font-medium tracking-[0.15em] transition-colors duration-300 uppercase",
                        isCatActive
                          ? "text-[#c9a96e]"
                          : "text-[#f9f6f0] group-hover:text-[#c9a96e]",
                      )}
                    >
                      {category.label}
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform duration-300 group-data-[state=open]:rotate-180",
                        isCatActive ? "text-[#c9a96e]" : "text-white/40",
                      )}
                    />
                  </div>
                  {/* Hover/Active Indicator */}
                  <div
                    className={cn(
                      "absolute -bottom-1 left-0 h-[1px] bg-[#c9a96e] transition-all duration-300",
                      isCatActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  sideOffset={20}
                  className="min-w-[280px] p-0 bg-[#1a2744] border border-[#c9a96e]/30 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300"
                >
                  <div className="p-4 bg-white/5 backdrop-blur-md">
                    {category.children?.map((item) => {
                      const isItemActive = item.href === activeHref;
                      const isMap = item.label === "Map Search";

                      return (
                        <DropdownMenuItem key={item.label} asChild>
                          <Link
                            href={item.href || "#"}
                            onClick={() => {
                              // Force immediate hash update for highlighting
                              setTimeout(
                                () => setCurrentHash(window.location.hash),
                                0,
                              );
                            }}
                            className={cn(
                              "relative w-full px-5 py-4 text-[13px] tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-between group/item",
                              isItemActive
                                ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                                : "text-white/80 hover:bg-[#1a2744] hover:text-[#c9a96e]",
                            )}
                          >
                            <span className="relative z-10">{item.label}</span>
                            {isMap && (
                              <Map className="w-4 h-4 opacity-40 group-hover/item:opacity-100 transition-opacity" />
                            )}
                            {isItemActive && (
                              <motion.div
                                layoutId="activeBar"
                                className="absolute left-0 w-[3px] h-full bg-[#c9a96e]"
                              />
                            )}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-8 shrink-0">
          <a
            href={`tel:${agentConfig.phoneRaw}`}
            className="flex items-center gap-3 text-[13px] font-medium tracking-widest text-white hover:text-[#c9a96e] transition-all duration-300 group"
          >
            <div className="p-2 border border-white/10 group-hover:border-[#c9a96e]/50 transition-colors">
              <Phone className="w-4 h-4 text-[#c9a96e]" />
            </div>
            <span>{agentConfig.phone}</span>
          </a>
          <Button
            asChild
            className="rounded-none px-9 py-3 border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:!bg-[#c9a96e] hover:text-[#1a2744] transition-all duration-500 text-[13px] font-bold tracking-[0.2em] uppercase h-auto shadow-[0_0_20px_rgba(201,169,110,0.15)]"
          >
            <a
              href={agentConfig.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Call
            </a>
          </Button>
        </div>

        {/* Mobile Trigger */}
        <div className="lg:hidden flex items-center gap-4 relative z-10">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:max-w-md bg-[#1a2744] border-l border-[#c9a96e]/20 p-0 flex flex-col"
            >
              <SheetHeader className="p-8 border-b border-white/5">
                <SheetTitle className="text-left">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex flex-col"
                  >
                    <span className="text-2xl font-serif font-bold text-white tracking-tight">
                      {agentConfig.name.toUpperCase()}
                    </span>
                    <span className="text-[10px] tracking-[0.3em] text-[#c9a96e] font-medium uppercase mt-1">
                      Luxury Real Estate
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-8 py-6">
                <Accordion type="single" collapsible className="w-full">
                  {navItems.map((category) => {
                    const isCatActive =
                      navItems.indexOf(category) === activeCategoryIndex;
                    return (
                      <AccordionItem
                        key={category.label}
                        value={category.label}
                        className="border-b border-white/5 last:border-0"
                      >
                        <AccordionTrigger
                          className={cn(
                            "text-[13px] font-semibold py-6 hover:no-underline uppercase tracking-[0.2em] transition-colors",
                            isCatActive ? "text-[#c9a96e]" : "text-white/90",
                          )}
                        >
                          {category.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-2 pb-6 pl-4 border-l border-white/5">
                            {category.children?.map((item) => {
                              const isItemActive = item.href === activeHref;
                              return (
                                <Link
                                  key={item.label}
                                  href={item.href || "#"}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setTimeout(
                                      () =>
                                        setCurrentHash(window.location.hash),
                                      0,
                                    );
                                  }}
                                  className={cn(
                                    "text-[15px] py-4 px-4 transition-all duration-300 flex items-center justify-between group",
                                    isItemActive
                                      ? "text-[#c9a96e] bg-white/5 font-semibold"
                                      : "text-white/60 hover:text-white",
                                  )}
                                >
                                  <span>{item.label}</span>
                                  {item.label === "Map Search" && (
                                    <Map className="w-4 h-4 opacity-40" />
                                  )}
                                </Link>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>

              <div className="p-10 border-t border-white/5 bg-black/20 space-y-6">
                <a
                  href={`tel:${agentConfig.phoneRaw}`}
                  className="flex items-center justify-center gap-4 w-full py-5 text-lg font-medium border border-white/10 bg-white/5 text-white transition-all active:scale-[0.98]"
                >
                  <Phone className="w-5 h-5 text-[#c9a96e]" />
                  <span>{agentConfig.phone}</span>
                </a>
                <Button
                  asChild
                  className="w-full rounded-none py-6 border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] !hover:bg-[#c9a96e] hover:text-[#1a2744] transition-all duration-500 text-lg font-bold uppercase tracking-[0.2em] h-auto"
                >
                  <a
                    href={agentConfig.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Schedule a Call
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Header };
