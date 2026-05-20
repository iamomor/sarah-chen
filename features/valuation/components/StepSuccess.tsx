"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";

interface StepSuccessProps {
  name: string;
  zip?: string;
}

export default function StepSuccess({ name, zip }: StepSuccessProps) {
  const firstName = name ? name.split(" ")[0] : "there";

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-10"
    >
      {/* Elegant luxury circular confirmation badge */}
      <div className="relative w-24 h-24 mx-auto mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
          className="w-full h-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-full flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-[#c9a96e]" />
        </motion.div>
        <div className="absolute top-0 left-0 w-full h-full border border-dashed border-[#c9a96e]/40 rounded-full animate-[spin_40s_linear_infinite]" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-3 block">
        Consultation Scheduled
      </span>
      <h2 className="text-4xl md:text-5xl font-serif font-light text-primary leading-tight mb-4">
        Thank you, <br />
        <span className="italic font-medium">{firstName}!</span>
      </h2>
      <p className="text-slate-500 font-light text-sm max-w-md mx-auto leading-relaxed mb-10">
        Your assets and details have been logged. {agentConfig.name} is
        personally compiling local comparable transactions and private market
        trends, and will deliver your valuation report via email within 2
        business hours.
      </p>

      {/* Premium, clean expert card */}
      <div className="bg-slate-50 border border-slate-100 p-6 rounded-none flex items-center gap-6 text-left max-w-sm mx-auto mb-10 shadow-[0_15px_40px_rgba(0,0,0,0.02)]">
        <div className="relative w-16 h-16 overflow-hidden border border-[#c9a96e]/30 shadow-md">
          <Image
            src={agentConfig.headshot}
            alt={agentConfig.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#c9a96e] mb-0.5">
            Assigned Consultant
          </p>
          <p className="font-serif text-lg font-medium text-primary">
            {agentConfig.name}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
            {agentConfig.title}
          </p>
        </div>
      </div>

      <Link
        className="w-full flex justify-center"
        href={zip ? `/listings?neighborhood=${zip}` : "/listings"}
      >
        <Button className="rounded-none bg-primary hover:bg-primary/95 text-white uppercase tracking-[0.2em] font-bold text-xs h-12 px-8 flex items-center justify-center gap-2 group cursor-pointer">
          Browse Neighborhood Sales{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
}
