"use client";

import { agentConfig } from "@/config/agent.config";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { House, Phone, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileBottomBar = () => {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Home",
      href: "/",
      icon: House,
    },
    {
      label: "Search",
      href: "/listings",
      icon: Search,
    },
    {
      label: "Valuation",
      href: "/valuation",
      icon: TrendingUp,
    },
    {
      label: "Contact",
      href: "/contact",
      icon: Phone,
    },
  ];

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] h-[60px] border-t shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
      style={{
        backgroundColor: agentConfig.colors.primary,
        borderColor: "rgba(249,246,240,0.1)",
      }}
    >
      <nav className="flex h-full items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="flex h-full w-full flex-col items-center justify-center"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.05 }} // 50ms tap feedback
                className="flex flex-col items-center gap-[3px]"
              >
                <Icon
                  size={22}
                  className="transition-colors duration-200"
                  style={{
                    color: isActive
                      ? agentConfig.colors.accent
                      : "rgba(249,246,240,0.45)",
                  }}
                />
                <span
                  className={cn(
                    "text-[10px] leading-none tracking-tight transition-colors duration-200",
                    isActive ? "font-medium" : "font-normal",
                  )}
                  style={{
                    color: isActive
                      ? agentConfig.colors.accent
                      : "rgba(249,246,240,0.45)",
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
