"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { initEmailJS, sendSellerWorksheet } from "@/lib/emailjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSelect from "@/components/ui/CustomSelect";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";


const worksheetSchema = z.object({
  address: z.string().min(5, "Valid street address is required"),
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  timing: z.string().min(1, "Please select an expected timeframe"),
});

type WorksheetFormValues = z.infer<typeof worksheetSchema>;

export default function SellerWorksheet() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    initEmailJS();
  }, []);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<WorksheetFormValues>({
    resolver: zodResolver(worksheetSchema),
    defaultValues: {
      address: "",
      name: "",
      email: "",
      phone: "",
      timing: "",
    },
  });

  const timingValue = watch("timing");

  const onSubmit = async (data: WorksheetFormValues) => {
    setIsSubmitting(true);
    try {
      await sendSellerWorksheet({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        timing: data.timing,
      });
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Submission Error", {
        description: "There was a pipeline issue sending your specifications. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#f9f6f0] border-t border-slate-200/50" id="worksheet">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
        <div className="bg-[#1a2744] text-white p-6 sm:p-10 md:p-14 shadow-none relative border border-[#c9a96e]/20 overflow-hidden rounded-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/30 flex items-center justify-center mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#c9a96e]" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-[1px] w-6 bg-[#c9a96e]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">Enrollment Confirmed</span>
                    <div className="h-[1px] w-6 bg-[#c9a96e]" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-light text-white leading-tight mb-3">
                    Your Strategy Sheet is <span className="italic font-medium text-[#c9a96e]">Submitted</span>
                  </h2>
                  <p className="text-slate-300 font-light text-sm leading-relaxed font-sans max-w-md">
                    {agentConfig.name} will analyze surrounding micro-comps and prepare your custom pre-consultation outline within 24 hours.
                  </p>
                  <button
                    onClick={() => { setIsSubmitted(false); reset(); }}
                    className="mt-6 text-xs text-[#c9a96e] font-bold uppercase tracking-widest hover:underline font-sans"
                  >
                    Submit Another Property
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="text-center space-y-4 max-w-xl mx-auto">
                    <div className="flex justify-center items-center gap-2">
                      <div className="h-[1px] w-6 bg-[#c9a96e]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] font-sans">
                        Secure Enrollment
                      </span>
                      <div className="h-[1px] w-6 bg-[#c9a96e]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-light text-white leading-tight">
                      Ready to <span className="italic font-medium text-[#c9a96e]">Get Started?</span>
                    </h2>
                    <p className="text-slate-300 font-light text-xs md:text-sm leading-relaxed font-sans">
                      Provide basic property details below. {agentConfig.name} will analyze surrounding micro-comps and prepare a custom pre-consultation outline.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto mt-8">
                    {/* Address */}
                    <div className="space-y-2">
                      <Label htmlFor="ws-address" className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] font-sans">
                        Property Street Address
                      </Label>
                      <Input
                        id="ws-address"
                        placeholder={
                          region.currency === "GBP"
                            ? "e.g. 12 Baker St, London, W1U 3BD"
                            : region.currency === "AUD"
                            ? "e.g. 44 Market St, Sydney, NSW 2000"
                            : region.currency === "CAD"
                            ? "e.g. 250 Yonge St, Toronto, ON M5B 2L7"
                            : "e.g. 1200 S Congress Ave, Austin, TX 78704"
                        }
                        className="bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-none h-12 focus:border-[#c9a96e] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-light font-sans"
                        {...register("address")}
                      />
                      {errors.address && <p className="text-red-400 text-xs mt-1 font-sans">{errors.address.message}</p>}
                    </div>

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="ws-name" className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] font-sans">
                          Full Name
                        </Label>
                        <Input
                          id="ws-name"
                          placeholder="Jane Doe"
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-none h-12 focus:border-[#c9a96e] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-light font-sans"
                          {...register("name")}
                        />
                        {errors.name && <p className="text-red-400 text-xs mt-1 font-sans">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="ws-email" className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] font-sans">
                          Email Address
                        </Label>
                        <Input
                          id="ws-email"
                          type="email"
                          placeholder="jane@example.com"
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-none h-12 focus:border-[#c9a96e] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-light font-sans"
                          {...register("email")}
                        />
                        {errors.email && <p className="text-red-400 text-xs mt-1 font-sans">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Phone & Timing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="ws-phone" className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] font-sans">
                          Phone Number
                        </Label>
                        <Input
                          id="ws-phone"
                          placeholder="(512) 555-0199"
                          className="bg-white/5 border-white/15 text-white placeholder:text-white/30 rounded-none h-12 focus:border-[#c9a96e] focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-light font-sans"
                          {...register("phone")}
                        />
                        {errors.phone && <p className="text-red-400 text-xs mt-1 font-sans">{errors.phone.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] font-sans">
                          Selling Timeframe
                        </Label>
                        <CustomSelect
                          variant="dark"
                          options={agentConfig.valuation.timings}
                          value={timingValue}
                          onChange={(val) => setValue("timing", val, { shouldValidate: true })}
                          placeholder="Select expected timeframe"
                          error={!!errors.timing}
                        />
                        {errors.timing && <p className="text-red-400 text-xs mt-1 font-sans">{errors.timing.message}</p>}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full border-2 border-[#c9a96e] bg-transparent text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#1a2744] rounded-none h-14 text-[11px] font-medium tracking-widest uppercase transition-all duration-300 shadow-none font-sans flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Processing Specifications...</>
                        ) : (
                          `Talk to ${agentConfig.name.split(" ")[0]} About Your Home`
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
