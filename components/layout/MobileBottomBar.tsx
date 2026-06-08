"use client";

import { agentConfig } from "@/config/agent.config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  House,
  Phone,
  Search,
  TrendingUp,
  CalendarDays,
  Newspaper,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomBar = () => {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Home",
      href: "/",
      icon: House,
      exactMatch: true,
    },
    {
      label: "Listings",
      href: "/listings",
      icon: Search,
      exactMatch: false,
    },
    {
      label: "Valuation",
      href: "/valuation",
      icon: TrendingUp,
      exactMatch: false,
    },
    {
      label: "Blog",
      href: "/blog",
      icon: Newspaper,
      exactMatch: false,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Phone,
      exactMatch: false,
    },
  ];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] border-t"
      style={{
        height: "62px",
        backgroundColor: agentConfig.colors.primary,
        borderColor: `${agentConfig.colors.accent}25`,
        boxShadow: "0 -4px 24px rgba(0,0,0,0.25), 0 -1px 0 rgba(201,169,110,0.15)",
      }}
    >
      {/* Subtle shimmer line at top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${agentConfig.colors.accent}50 30%, ${agentConfig.colors.accent}80 50%, ${agentConfig.colors.accent}50 70%, transparent 100%)`,
        }}
      />
      <nav className="flex h-full items-center justify-around px-1">
        {tabs.map((tab) => {
          const isActive = tab.exactMatch
            ? pathname === tab.href
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="relative flex h-full flex-1 flex-col items-center justify-center gap-[2px] group"
            >
              {/* Active glow indicator */}
              {isActive && (
                <motion.div
                  layoutId="tab-active-bg"
                  className="absolute inset-x-1 top-1 bottom-1 rounded-xl"
                  style={{
                    backgroundColor: `${agentConfig.colors.accent}15`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}

              {/* Active top bar indicator */}
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] rounded-full"
                  style={{ backgroundColor: agentConfig.colors.accent }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}

              <motion.div
                whileTap={{ scale: 0.88 }}
                transition={{ duration: 0.08 }}
                className="relative flex flex-col items-center gap-[3px]"
              >
                <Icon
                  size={isActive ? 21 : 20}
                  strokeWidth={isActive ? 2 : 1.6}
                  className="transition-all duration-200"
                  style={{
                    color: isActive
                      ? agentConfig.colors.accent
                      : "rgba(249,246,240,0.60)",
                    filter: isActive
                      ? `drop-shadow(0 0 6px ${agentConfig.colors.accent}80)`
                      : "none",
                  }}
                />
                <span
                  className="text-[9px] leading-none tracking-tight transition-all duration-200 font-sans"
                  style={{
                    color: isActive
                      ? agentConfig.colors.accent
                      : "rgba(249,246,240,0.50)",
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: isActive ? "0.04em" : "0.02em",
                  }}
                >
                  {tab.label}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileBottomBar;
