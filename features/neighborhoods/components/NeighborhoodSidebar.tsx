"use client";

import React, { useState, useEffect } from "react";
import { agentConfig } from "@/config/agent.config";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  Heart,
  Coffee,
  HelpCircle,
  GraduationCap,
  Navigation,
  Home,
  Map,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const SECTIONS = [
  { id: "overview",   label: "Overview",          icon: Compass },
  { id: "vibe",       label: "Vibe & Indicators", icon: Sparkles },
  { id: "highlights", label: "What to Love",       icon: Heart },
  { id: "lifestyle",  label: "Local Lifestyle",    icon: Coffee },
  { id: "qna",        label: "Insider Q&A",        icon: HelpCircle },
  { id: "schools",    label: "Education",          icon: GraduationCap },
  { id: "scores",     label: "Mobility & Scores",  icon: Navigation },
  { id: "listings",   label: "Active Listings",    icon: Home },
  { id: "map",        label: "Map View",           icon: Map },
  { id: "cta",        label: "Advisory",           icon: MessageSquare },
];

export default function NeighborhoodSidebar() {
  const [activeSection, setActiveSection] = useState("overview");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { colors } = agentConfig;

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    });

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setIsOpen(false); // Close mobile drawer on navigation
    }
  };

  return (
    <>
      {/* ─── Desktop Left Sidebar ─── 2xl+ only (visible on wide screens to prevent overlapping) ─── */}
      <div
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-1 select-none"
        style={{
          background: "rgba(249,246,240,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid rgba(201,169,110,0.22)`,
          boxShadow: "0 10px 40px rgba(26,39,68,0.08)",
          padding: "18px 16px",
          minWidth: "190px",
          borderRadius: "4px",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200/60">
          <div
            className="w-1.5 h-4 rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
          <span className="font-sans text-[9px] tracking-[0.25em] uppercase font-bold text-slate-400">
            Guide Index
          </span>
        </div>

        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          const isHovered = hoveredSection === section.id;
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
              className="group flex items-center gap-3 text-left transition-all duration-200 outline-none focus:outline-none py-2 px-2.5 relative overflow-hidden"
              style={{
                backgroundColor: isActive
                  ? `${colors.accent}12`
                  : isHovered
                  ? `${colors.primary}06`
                  : "transparent",
              }}
            >
              {/* Active left accent bar */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-bar"
                  className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                  style={{ backgroundColor: colors.accent }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}

              {/* Icon */}
              <div
                className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                style={{
                  color: isActive
                    ? colors.accent
                    : isHovered
                    ? colors.primary
                    : "#94a3b8",
                  filter: isActive
                    ? `drop-shadow(0 0 4px ${colors.accent}60)`
                    : "none",
                }}
              >
                <Icon size={14} strokeWidth={isActive ? 2.2 : 1.6} />
              </div>

              {/* Label */}
              <span
                className="font-sans text-[10px] tracking-wider uppercase font-bold transition-all duration-200 truncate"
                style={{
                  color: isActive ? colors.primary : "#94a3b8",
                  transform: isActive ? "translateX(1px)" : "translateX(0)",
                }}
              >
                {section.label}
              </span>

              {/* Active chevron */}
              {isActive && (
                <ChevronRight
                  size={10}
                  className="ml-auto flex-shrink-0 animate-pulse"
                  style={{ color: colors.accent }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Mobile/Tablet/Notebook Floating Side Button (below 2xl) ─── */}
      <div className="2xl:hidden fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none">
        <button
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center justify-center bg-[#1a2744] text-white border-l border-t border-b border-[#c9a96e]/30 rounded-l-xl py-3.5 pl-3 pr-2.5 shadow-2xl transition-all duration-300 hover:pl-4 group outline-none focus:outline-none"
        >
          <Compass
            size={18}
            className="text-[#c9a96e] group-hover:rotate-45 transition-transform duration-500 animate-spin-slow"
            style={{ color: colors.accent }}
          />
          <span className="font-sans text-[8px] tracking-[0.2em] font-bold uppercase mt-1.5 [writing-mode:vertical-lr] rotate-180">
            Guide Index
          </span>
        </button>
      </div>

      {/* ─── Premium Mobile/Tablet Drawer / Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="2xl:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="2xl:hidden fixed right-0 top-0 bottom-0 w-[78vw] max-w-[300px] h-full bg-[#1a2744] border-l border-[#c9a96e]/30 z-50 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div
                    className="w-1 h-3.5 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <span className="font-serif text-sm tracking-wide text-white uppercase font-bold">
                    Guide Index
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-full transition-colors text-white/70 hover:text-white outline-none focus:outline-none"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable list */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  const Icon = section.icon;

                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full flex items-center gap-3.5 text-left py-3 px-3.5 transition-all duration-300 relative rounded outline-none focus:outline-none group overflow-hidden"
                      style={{
                        backgroundColor: isActive
                          ? `${colors.accent}15`
                          : "transparent",
                      }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="drawer-active-bar"
                          className="absolute left-0 top-0 bottom-0 w-[3px]"
                          style={{ backgroundColor: colors.accent }}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className="w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                        style={{
                          color: isActive ? colors.accent : "#94a3b8",
                        }}
                      >
                        <Icon size={14} strokeWidth={isActive ? 2.2 : 1.6} />
                      </div>

                      {/* Label */}
                      <span
                        className="font-sans text-[11px] tracking-wider uppercase font-bold transition-all duration-200"
                        style={{
                          color: isActive ? "#f9f6f0" : "#94a3b8",
                        }}
                      >
                        {section.label}
                      </span>

                      {/* Chevron */}
                      {isActive && (
                        <ChevronRight
                          size={11}
                          className="ml-auto text-[#c9a96e]"
                          style={{ color: colors.accent }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Footer info */}
              <div className="p-5 border-t border-white/5 bg-black/10 text-center shrink-0">
                <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-white/40 block">
                  {agentConfig.name} • Guide
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

