"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";

import { sendNewsletterSignup } from "@/lib/emailjs";

const newsletterSchema = z.object({
  firstName: z.string().optional(),
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
      await sendNewsletterSignup(data.email, data.firstName || "Valued Subscriber");
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const cityMatch = agentConfig.address.match(/,\s*([^,]+),\s*[A-Z]{2}\s+\d{5}/);
  const city = cityMatch ? cityMatch[1] : "Your Area";

  return (
    <section className="relative w-full py-16 overflow-hidden" style={{ backgroundColor: agentConfig.colors.primary }}>
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)] pointer-events-none" />
      
      <div className="container relative z-10 mx-auto px-4 md:px-8 xl:px-16 flex flex-col items-center text-center">
        <div className="max-w-3xl w-full">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-6" style={{ backgroundColor: agentConfig.colors.accent }} />
            <span 
              className="text-[10px] font-bold uppercase tracking-[0.4em]" 
              style={{ color: agentConfig.colors.accent }}
            >
              Exclusive Insights
            </span>
            <div className="h-[1px] w-6" style={{ backgroundColor: agentConfig.colors.accent }} />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-tight">
            Stay Ahead of the <span className="font-serif italic" style={{ color: agentConfig.colors.accent }}>{city}</span> Market
          </h2>
          
          <p className="text-base text-white/70 font-light mb-10 leading-relaxed max-w-xl mx-auto">
            Get curated market reports, exclusive off-market alerts, and neighborhood insights delivered directly to your inbox. Join 2,400+ {city} homeowners.
          </p>

          {status === "success" ? (
            <div className="p-6 backdrop-blur-md bg-white/5 border border-white/10 flex flex-col items-center justify-center rounded-sm">
              <div className="w-10 h-10 rounded-full mb-3 flex items-center justify-center" style={{ backgroundColor: agentConfig.colors.accent }}>
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-lg text-white font-light tracking-wide">Welcome to the inner circle.</p>
              <p className="text-white/60 text-sm mt-1">Check your inbox for our latest market brief.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto text-left">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="relative group flex-1">
                  <input
                    {...register("firstName")}
                    placeholder=" "
                    className="block w-full bg-transparent border-0 border-b border-white/20 text-white text-base py-2 px-0 focus:ring-0 focus:border-white transition-colors peer"
                  />
                  <label className="absolute text-white/50 text-base duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    First Name (Optional)
                  </label>
                </div>
                
                <div className="relative group flex-[1.5]">
                  <input
                    {...register("email")}
                    placeholder=" "
                    type="email"
                    className="block w-full bg-transparent border-0 border-b border-white/20 text-white text-base py-2 px-0 focus:ring-0 focus:border-white transition-colors peer"
                  />
                  <label className="absolute text-white/50 text-base duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Email Address *
                  </label>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 absolute -bottom-5">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              {status === "error" && (
                <p className="text-red-400 text-sm text-center mb-4">Something went wrong. Please try again.</p>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 rounded-none text-white text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all mt-2"
                style={{ backgroundColor: agentConfig.colors.accent }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe to Updates"}
              </Button>
              
              <p className="text-center text-[10px] font-light text-white/40 mt-4 tracking-wider">
                WE RESPECT YOUR PRIVACY. UNSUBSCRIBE ANYTIME.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
