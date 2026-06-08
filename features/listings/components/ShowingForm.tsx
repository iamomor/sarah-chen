"use client";

import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { agentConfig } from "@/config/agent.config";
import { initEmailJS, sendShowingRequest } from "@/lib/emailjs";
import { trackConversion } from "@/components/layout/Analytics";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const TIME_OPTIONS = [
  { value: "Morning", label: "Morning (8am – 12pm)" },
  { value: "Afternoon", label: "Afternoon (12pm – 4pm)" },
  { value: "Evening", label: "Evening (4pm – 8pm)" },
];

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.enum(["Morning", "Afternoon", "Evening"], {
    message: "Preferred time is required",
  }),
  message: z.string().optional(),
  propertyAddress: z.string(),
});

interface ShowingFormProps {
  propertyAddress: string;
  mlsNumber?: string;
}

export default function ShowingForm({ propertyAddress, mlsNumber }: ShowingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    initEmailJS();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "Morning",
      message: "",
      propertyAddress,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      await sendShowingRequest({
        name: values.fullName,
        email: values.email,
        phone: values.phone,
        propertyAddress: values.propertyAddress,
        mlsNumber: mlsNumber,
        preferredDate: values.preferredDate,
        preferredTime: values.preferredTime,
        message: values.message,
      });
      setIsSubmitted(true);
      // ── Analytics: GA4 conversion + Meta Pixel Lead ──
      trackConversion('form_submit_showing', { method: 'ShowingForm' });
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
    } catch (error) {
      console.error("Showing request error:", error);
      toast.error("Submission failed", {
        description: "There was an issue sending your request. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 flex flex-col items-center text-center"
        style={{
          border: "1px solid rgba(201,169,110,0.3)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
          borderRadius: "4px",
        }}
      >
        <div className="w-16 h-16 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/20 flex items-center justify-center mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#c9a96e]" />
        </div>
        <h3 className="text-xl font-serif text-[#1a2744] mb-2">Showing Request Received</h3>
        <p className="text-sm text-slate-500 font-light max-w-sm leading-relaxed">
          {agentConfig.name} will confirm your private showing at{" "}
          <span className="font-medium text-slate-700">{propertyAddress}</span> within 2 business hours.
        </p>
        <button
          onClick={() => { setIsSubmitted(false); form.reset(); }}
          className="mt-6 text-xs text-[#c9a96e] font-semibold uppercase tracking-widest hover:underline"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <div
      className="bg-white p-8 md:p-12 transition-all duration-250 ease-out hover:-translate-y-1"
      style={{
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        borderRadius: "4px",
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Doe"
                      {...field}
                      className="h-[48px] border-gray-200 focus:border-[#c9a96e] rounded-[2px] transition-colors bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane@example.com"
                      {...field}
                      className="h-[48px] border-gray-200 focus:border-[#c9a96e] rounded-[2px] transition-colors bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={agentConfig.phone}
                      {...field}
                      className="h-[48px] border-gray-200 focus:border-[#c9a96e] rounded-[2px] transition-colors bg-white shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                    Preferred Date
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        {...field}
                        className="h-[48px] border-gray-200 focus:border-[#c9a96e] rounded-[2px] transition-colors bg-white shadow-none pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="preferredTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                  Preferred Time
                </FormLabel>
                <FormControl>
                  <CustomSelect
                    variant="light"
                    options={TIME_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select a time"
                    error={!!form.formState.errors.preferredTime}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                  Message (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="I'm interested in viewing this home..."
                    {...field}
                    className="min-h-[120px] border-gray-200 focus:border-[#c9a96e] rounded-[2px] transition-colors bg-white shadow-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="gold"
            className="w-full mt-4 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending Request...
              </>
            ) : (
              "Request Private Showing"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
