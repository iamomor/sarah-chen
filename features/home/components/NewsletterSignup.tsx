"use client";

import { Button } from "@/components/ui/button";
import { trackConversion } from "@/components/layout/Analytics";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { sendNewsletterSignup } from "@/lib/emailjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    try {
      await sendNewsletterSignup(data.email, "Valued Subscriber");
      setStatus("success");
      reset();
      // ── Analytics: GA4 conversion + Meta Pixel Lead ──
      trackConversion("form_submit_newsletter", {
        method: "NewsletterSignup",
      });
      if (
        typeof window !== "undefined" &&
        typeof window.fbq === "function"
      ) {
        window.fbq("track", "Lead");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const city = region.defaultCity;
  const { colors } = agentConfig;

  return (
    <section
      className="relative w-full py-20 overflow-hidden border-b border-black/[0.06]"
      style={{ backgroundColor: colors.background }}
    >
      <div className="container mx-auto px-8 md:px-16 xl:px-24">
        {/* Floating Inset Envelope Card */}
        <div
          className="w-full relative p-6 sm:p-10 md:p-16 overflow-hidden border shadow-2xl"
          style={{ 
            backgroundColor: colors.primary,
            borderColor: `${colors.accent}30`,
            borderRadius: "2px"
          }}
        >
          {/* Subtle concentric luxury rings in background */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-white/[0.02] pointer-events-none" />
          <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full border border-white/[0.04] pointer-events-none" />
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.1)_0%,transparent_100%)] pointer-events-none" />

          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-6 gap-4 text-center max-w-md mx-auto"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center border"
                style={{ 
                  backgroundColor: `${colors.accent}12`,
                  borderColor: colors.accent
                }}
              >
                <CheckCircle className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xl font-serif font-light text-white tracking-wide">
                Welcome to the Inner Circle
              </h3>
              <p className="text-white/60 text-xs font-sans font-light leading-relaxed">
                Your credentials are successfully logged. Look for our weekly bespoke intelligence brief directly in your inbox.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
              {/* Left Side: Editorial Typography Copy */}
              <div className="text-center lg:text-left space-y-3 max-w-xl">
                <span
                  className="text-[9px] font-sans font-bold uppercase tracking-[0.4em]"
                  style={{ color: colors.accent }}
                >
                  EXCLUSIVITY REGISTERED
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-light text-white tracking-tight leading-tight">
                  The Weekly <span className="font-serif italic font-normal text-accent">{city}</span> Market Brief
                </h2>
                <p className="text-xs md:text-sm text-white/70 font-sans font-light leading-relaxed max-w-md">
                  Join a selective circle of local homeowners receiving curated real estate observations, premium off-market insights, and quantitative regional analytics. Delivered weekly with total discretion.
                </p>
              </div>

              {/* Right Side: Ultra-Clean Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full lg:max-w-md group"
              >
                <div className="flex flex-col sm:flex-row gap-3 relative">
                  <div className="relative flex-1">
                    <input
                      id="newsletter-email"
                      {...register("email")}
                      type="email"
                      placeholder="Enter your email address"
                      aria-label="Email address for private market brief"
                      className="w-full h-12 bg-white/5 border text-white text-xs px-5 rounded-none placeholder:text-white/30 focus:outline-none focus:border-accent focus:bg-white/10 transition-all duration-500"
                      style={{ 
                        borderColor: "rgba(255,255,255,0.12)",
                        borderRadius: "2px"
                      }}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[10px] mt-1 absolute -bottom-5 left-1 font-sans">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="h-12 px-8 rounded-none text-[10px] font-sans font-bold tracking-[0.25em] uppercase transition-all duration-500 whitespace-nowrap flex items-center justify-center gap-2 border border-accent"
                    style={{ 
                      backgroundColor: colors.accent, 
                      color: colors.primary,
                      borderRadius: "2px" 
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                </div>
                {status === "error" && (
                  <p className="text-red-400 text-xs mt-4 font-sans font-light">
                    Something went wrong. Please check your connection and try again.
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

