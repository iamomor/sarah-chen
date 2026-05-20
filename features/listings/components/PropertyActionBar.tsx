"use client";

import { Map, Layout, Video, Share2 } from "lucide-react";
import { agentConfig } from "@/config/agent.config";

export default function PropertyActionBar() {
  const actions = [
    { label: "View on Map", icon: Map, id: "map" },
    { label: "Floor Plan", icon: Layout, id: "floorplan" },
    { label: "Virtual Tour", icon: Video, id: "tour" },
    { label: "Share", icon: Share2, id: "share" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full bg-slate-50 rounded-xl mb-12">
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-8 py-2 px-4">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => scrollToSection(action.id)}
              className="flex items-center gap-2 py-3 px-4 hover:bg-white rounded-lg transition-all group"
            >
              <Icon
                className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors"
                style={{
                  color: action.id === "tour" ? agentConfig.colors.accent : undefined,
                }}
              />
              <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
