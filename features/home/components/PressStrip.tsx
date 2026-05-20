"use client";

import { agentConfig } from "@/config/agent.config";
import React from "react";

export default function PressStrip() {
  const pressItems = agentConfig.press;

  if (!pressItems || pressItems.length === 0) return null;

  const cityMatch = agentConfig.address.match(
    /,\s*([^,]+),\s*[A-Z]{2}\s+\d{5}/,
  );
  const city = cityMatch ? cityMatch[1] : "the region";
  const mainPress = pressItems[0]?.name || "Business Journal";

  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        {/* The Quote */}
        <div className="mb-20 relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: agentConfig.colors.accent, opacity: 0.2 }}
            >
              <path
                d="M10 11L8 15H11V19H5V15L7 11H5V7H11V11H10ZM20 11L18 15H21V19H15V15L17 11H15V7H21V11H20Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight md:leading-snug mb-10 relative z-10"
            style={{ color: agentConfig.colors.text }}
          >
            &quot;{agentConfig.name} is consistently ranked among {city}&apos;s
            top-producing luxury agents, setting new standards for client
            service and market expertise.&quot;
          </h2>

          <div className="flex items-center justify-center gap-4">
            <div
              className="h-[1px] w-6"
              style={{ backgroundColor: agentConfig.colors.accent }}
            />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-900">
              {mainPress}
            </span>
            <div
              className="h-[1px] w-6"
              style={{ backgroundColor: agentConfig.colors.accent }}
            />
          </div>
        </div>

        {/* The Press "Logos" (Typography) */}
        <div className="pt-12 border-t border-gray-100">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-8">
            Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {pressItems.map((item, idx) => (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                key={idx}
                className="text-xl md:text-2xl font-serif text-gray-900 opacity-50 hover:opacity-100 transition-opacity duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
