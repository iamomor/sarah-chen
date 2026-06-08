"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { Sparkles, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error);
  }, [error]);

  const { colors } = agentConfig;

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden bg-[#f9f6f0] py-20">
      {/* Decorative luxury gradient background elements */}
      <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-gradient-to-b from-[#c9a96e]/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[45%] h-[60%] bg-gradient-to-t from-[#1a2744]/2 to-transparent pointer-events-none" />

      {/* Grid line styling */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-xl w-full text-center relative z-10 space-y-10">
        {/* Animated Accent Badge */}
        <div className="flex justify-center items-center gap-3">
          <div className="h-[1px] w-8 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9a96e]" style={{ color: colors.accent }}>
            System Notice
          </span>
          <div className="h-[1px] w-8 bg-[#c9a96e]" style={{ backgroundColor: colors.accent }} />
        </div>

        {/* Serif Headline */}
        <div className="space-y-4">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#1a2744]"
            style={{ color: colors.primary }}
          >
            Encountered an{" "}
            <span className="font-serif italic font-light text-[#c9a96e]" style={{ color: colors.accent }}>
              Anomaly
            </span>
          </h1>
          <p className="text-slate-500 font-light text-sm max-w-md mx-auto leading-relaxed">
            An unexpected interruption occurred. Our system is working to restore alignment.
          </p>
        </div>

        {/* Elegant card showing the error detail subtly */}
        <div className="p-6 bg-white border border-slate-200/60 shadow-[0_10px_35px_rgba(0,0,0,0.015)] rounded-none text-left max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c9a96e]" style={{ color: colors.accent }} />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#1a2744]" style={{ color: colors.primary }}>
              Diagnostic Code
            </span>
          </div>
          <p className="font-mono text-[10px] text-slate-400 break-all select-all">
            {error.digest || "ERR_UNEXPECTED_RENDER_FAILURE"}
          </p>
        </div>

        {/* Premium Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto">
          <Button
            onClick={() => reset()}
            className="w-full sm:w-auto rounded-none px-8 py-6 border-2 border-primary bg-primary text-white hover:bg-transparent hover:text-primary transition-all duration-500 text-[11px] font-bold tracking-[0.2em] uppercase h-auto"
            style={{ 
              backgroundColor: colors.primary, 
              borderColor: colors.primary 
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto rounded-none px-8 py-6 border-2 border-[#c9a96e]/40 bg-transparent text-primary hover:border-primary transition-all duration-500 text-[11px] font-bold tracking-[0.2em] uppercase h-auto"
            style={{ 
              color: colors.primary 
            }}
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
