"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: CustomSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Light variant: white bg with navy text — for dark page backgrounds */
  variant?: "dark" | "light" | "navy";
  className?: string;
  error?: boolean;
  id?: string;
}

const variants = {
  dark: {
    trigger: "bg-white/5 border-white/15 text-white hover:border-[#c9a96e]/60",
    placeholder: "text-white/40",
    chevron: "text-[#c9a96e]",
    panel: "bg-[#1a2744] border-white/10",
    item: "text-white/80 hover:bg-[#c9a96e]/15 hover:text-[#c9a96e]",
    itemSelected: "text-[#c9a96e] bg-[#c9a96e]/10",
    check: "text-[#c9a96e]",
  },
  light: {
    trigger: "bg-slate-50/50 border-slate-200/80 text-slate-800 hover:border-[#c9a96e]/60",
    placeholder: "text-slate-300",
    chevron: "text-[#c9a96e]",
    panel: "bg-white border-slate-200",
    item: "text-slate-700 hover:bg-[#c9a96e]/10 hover:text-[#1a2744]",
    itemSelected: "text-[#1a2744] bg-[#c9a96e]/10",
    check: "text-[#c9a96e]",
  },
  navy: {
    trigger: "bg-[#1a2744] border-[#c9a96e]/20 text-white hover:border-[#c9a96e]/60",
    placeholder: "text-white/40",
    chevron: "text-[#c9a96e]",
    panel: "bg-[#1a2744] border-[#c9a96e]/20",
    item: "text-white/80 hover:bg-[#c9a96e]/15 hover:text-[#c9a96e]",
    itemSelected: "text-[#c9a96e] bg-[#c9a96e]/10",
    check: "text-[#c9a96e]",
  },
};

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  variant = "dark",
  className = "",
  error = false,
  id,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const v = variants[variant];

  const selected = options.find((o) => o.value === value);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`} id={id}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`
          w-full h-12 px-4 flex items-center justify-between
          border transition-all duration-200 rounded-none outline-none
          text-sm font-light font-sans
          ${v.trigger}
          ${error ? "border-red-500" : ""}
          ${isOpen ? "border-[#c9a96e]" : ""}
        `}
      >
        <span className={selected ? "" : v.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown className={`w-4 h-4 ${v.chevron}`} />
        </motion.div>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ transformOrigin: "top" }}
            className={`
              absolute z-50 top-[calc(100%+4px)] left-0 right-0
              border shadow-xl overflow-hidden
              ${v.panel}
            `}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 text-sm font-sans
                    flex items-center justify-between
                    transition-colors duration-150
                    ${isSelected ? v.itemSelected : v.item}
                  `}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className={`w-3.5 h-3.5 ${v.check}`} />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
