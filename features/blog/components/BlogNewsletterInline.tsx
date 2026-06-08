"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendNewsletterSignup } from "@/lib/emailjs";
import { Mail, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

export default function BlogNewsletterInline() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await sendNewsletterSignup(data.email, "Valued Subscriber");
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-[#1a2744] text-white p-8 lg:p-10 border border-accent/20 relative overflow-hidden my-12">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.15)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Copy Column */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex items-center gap-2 text-accent text-[9px] uppercase tracking-[0.3em] font-semibold">
            <Mail className="w-3.5 h-3.5" />
            Market Intelligence
          </div>
          <h3 className="text-xl lg:text-2xl font-serif text-white tracking-tight">
            Get Market Updates by Email
          </h3>
          <p className="text-xs text-white/60 font-light leading-relaxed max-w-lg">
            Receive exclusive off-market insights, local development updates, and macro-economic real estate briefings directly in your inbox twice a month.
          </p>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-6">
          {status === "success" ? (
            <div className="flex items-center gap-3 bg-white/5 border border-accent/30 p-4">
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">Subscription Confirmed</p>
                <p className="text-[11px] text-white/60">The next market update will be routed directly to your inbox.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 relative">
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 bg-white/5 text-white border-white/20 rounded-none placeholder:text-white/30 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent w-full text-xs tracking-wider"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[10px] mt-1 absolute -bottom-5 left-0">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 rounded-none px-6 text-[10px] uppercase font-bold tracking-widest bg-accent text-[#1a2744] hover:bg-accent/90 hover:text-[#1a2744] border-none shrink-0"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              {status === "error" && (
                <p className="text-red-400 text-[11px] mt-2">
                  Subscription failed. Please try again later.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
