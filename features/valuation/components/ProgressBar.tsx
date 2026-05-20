"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: 1 | 2 | 3 | "success";
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  if (currentStep === "success") return null;

  const progressPercent = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 95;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-[0.15em] text-[#c9a96e] mb-3">
        <span>Step {currentStep} of 3</span>
        <span className="font-sans font-medium uppercase tracking-[0.1em] text-slate-500 text-[10px]">
          {currentStep === 1 && "Location details"}
          {currentStep === 2 && "Asset details"}
          {currentStep === 3 && "Contact details"}
        </span>
      </div>
      <div className="w-full h-[2px] bg-slate-100 relative overflow-hidden rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 h-full bg-[#c9a96e] rounded-full shadow-[0_0_8px_rgba(201,169,110,0.5)]"
        />
      </div>
    </div>
  );
}
