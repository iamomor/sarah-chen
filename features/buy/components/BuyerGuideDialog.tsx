"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

import { agentConfig } from "@/config/agent.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, Lock, Sparkles, Download } from "lucide-react";
import { sendBuyerGuide } from "@/lib/emailjs";

const downloadSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type DownloadFormValues = z.infer<typeof downloadSchema>;

interface BuyerGuideDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BuyerGuideDialog({ isOpen, onOpenChange }: BuyerGuideDialogProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<DownloadFormValues>({
    resolver: zodResolver(downloadSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: DownloadFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await sendBuyerGuide(values.email, values.name);



      setIsSubmitted(true);
    } catch (err) {
      console.error("Error during Buyer Guide request:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmitError(null);
        form.reset();
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden border-none shadow-2xl bg-[#f9f6f0] rounded-none">
        <div className="p-8">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="w-20 h-20 bg-[#c9a96e]/10 rounded-full border border-[#c9a96e]/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-[#c9a96e]" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#1a2744] tracking-tight mb-2">
                  Bespoke Intel Dispatched
                </h2>
                <p className="text-xs text-slate-500 font-light max-w-sm mb-8 leading-relaxed">
                  Check your inbox at <span className="font-semibold text-slate-700">{form.getValues("email")}</span>. We have delivered your complimentary copy of the 2026 {agentConfig.mapCenter.city} Acquisition Handbook.
                </p>
                <Button
                  onClick={() => handleOpenChange(false)}
                  className="w-full h-12 bg-[#1a2744] hover:bg-[#c9a96e] text-white hover:text-[#1a2744] rounded-none font-bold uppercase tracking-widest text-[10px] transition-all"
                >
                  Close & Begin Reading
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <DialogHeader className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#c9a96e] uppercase tracking-[0.25em]">
                    <Sparkles className="w-3.5 h-3.5 fill-[#c9a96e]/10" /> Private Intelligence Access
                  </div>
                  <DialogTitle className="text-3xl font-serif text-[#1a2744] font-medium tracking-tight leading-tight">
                    Acquire the {agentConfig.mapCenter.city} <br />
                    <span className="italic font-light text-[#c9a96e]">Buyer&apos;s Guide</span>
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-500 font-light leading-relaxed">
                    Enter your details securely below. We will instantly email your custom 2026 PDF acquisition guide.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="h-12 border-t-0 border-x-0 border-b border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-[#c9a96e] px-0 placeholder:text-slate-300 text-sm font-light text-slate-800"
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] font-medium text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="email@domain.com"
                              {...field}
                              className="h-12 border-t-0 border-x-0 border-b border-slate-200 rounded-none bg-transparent focus-visible:ring-0 focus-visible:border-[#c9a96e] px-0 placeholder:text-slate-300 text-sm font-light text-slate-800"
                            />
                          </FormControl>
                          <FormMessage className="text-[11px] font-medium text-red-500" />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4 space-y-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-[#c9a96e] hover:bg-[#b8985e] text-[#1a2744] rounded-none font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-slate-200/50 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          "Preparing Intelligence..."
                        ) : (
                          <>
                            Get the Guide <Download className="w-3.5 h-3.5" />
                          </>
                        )}
                      </Button>

                      {submitError && (
                        <p className="text-red-500 text-xs font-semibold text-center mt-2 animate-shake">
                          {submitError}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-4 pt-6 border-t border-slate-200/50">
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest">
                        No spam, ever. Your privacy is legally protected.
                      </p>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                        <Lock className="w-3.5 h-3.5 text-[#c9a96e]" />
                        Absolute Data Security Guaranteed
                      </div>
                    </div>

                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
