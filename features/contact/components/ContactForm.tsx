"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Lock, Mail, MessageSquare, Phone, Send, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { agentConfig } from "@/config/agent.config";
import { initEmailJS, sendContactForm } from "@/lib/emailjs";
import { trackConversion } from "@/components/layout/Analytics";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().optional(),
  inquiryType: z.string().min(1, "Please select how we can help"),
  referralSource: z.string().min(1, "Please let us know how you found us"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClass =
  "w-full h-14 px-4 bg-slate-50/50 border border-slate-200/80 rounded-none text-sm text-slate-800 font-light placeholder:text-slate-300 focus:outline-none focus:border-[#c9a96e] focus:bg-white transition-all duration-200 font-sans cursor-pointer";

const labelClass =
  "block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  const { contactPage } = agentConfig;

  useEffect(() => {
    initEmailJS();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      inquiryType: "",
      referralSource: "",
      message: "",
    },
  });

  const inquiryValue = watch("inquiryType");
  const referralValue = watch("referralSource");

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await sendContactForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        inquiryType: data.inquiryType,
        referralSource: data.referralSource,
        message: data.message,
      });
      setSubmittedName(data.firstName);
      setIsSubmitted(true);
      // ── Analytics: GA4 conversion + Meta Pixel Lead ──
      trackConversion('form_submit_contact', { method: 'ContactForm' });
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitError(
        "There was an issue sending your message. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center text-center py-16"
        >
          <div className="w-20 h-20 bg-[#c9a96e]/10 rounded-full border border-[#c9a96e]/20 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#c9a96e]" />
          </div>
          <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-3 font-sans">
            Message Received
          </span>
          <h3 className="text-3xl font-serif text-[#1a2744] font-light mb-3">
            Thanks, {submittedName}!
          </h3>
          <p className="text-sm text-slate-500 font-light max-w-sm leading-relaxed mb-8 font-sans">
            {agentConfig.name} personally reviews every inquiry and will be in touch within 24 hours.
            For urgent matters, call{" "}
            <a href={`tel:${agentConfig.phoneRaw}`} className="text-[#c9a96e] font-medium hover:underline">
              {agentConfig.phone}
            </a>
            .
          </p>
          <button
            onClick={() => { setIsSubmitted(false); setSubmittedName(""); reset(); }}
            className="text-xs cursor-pointer text-[#c9a96e] font-bold uppercase tracking-widest hover:underline font-sans"
          >
            Send Another Message
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-firstName" className={labelClass}>
                  <span className="flex items-center gap-1.5"><User className="w-3 h-3" />First Name</span>
                </label>
                <input
                  id="contact-firstName"
                  placeholder="Jane"
                  {...register("firstName")}
                  className={inputClass}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-lastName" className={labelClass}>
                  Last Name
                </label>
                <input
                  id="contact-lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className={inputClass}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Contact Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" />Email Address</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-phone" className={labelClass}>
                  <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />Phone <span className="font-normal text-slate-400">(Optional)</span></span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="(512) 555-0147"
                  {...register("phone")}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Inquiry Type + Referral Source Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>I Am A</label>
                <CustomSelect
                  id="contact-inquiryType"
                  variant="light"
                  options={contactPage.inquiryTypes}
                  value={inquiryValue}
                  onChange={(val) => setValue("inquiryType", val, { shouldValidate: true })}
                  placeholder="Select your role"
                  error={!!errors.inquiryType}
                />
                {errors.inquiryType && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.inquiryType.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>How Did You Hear About Us?</label>
                <CustomSelect
                  id="contact-referralSource"
                  variant="light"
                  options={contactPage.referralSources}
                  value={referralValue}
                  onChange={(val) => setValue("referralSource", val, { shouldValidate: true })}
                  placeholder="Select source"
                  error={!!errors.referralSource}
                />
                {errors.referralSource && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.referralSource.message}</p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className={labelClass}>
                <span className="flex items-center gap-1.5"><MessageSquare className="w-3 h-3" />Your Message</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell us about your real estate goals..."
                {...register("message")}
                className={`${inputClass} h-auto resize-none py-4 cursor-pointer`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.message.message}</p>
              )}
            </div>

            {/* Error Banner */}
            {submitError && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-xs font-medium text-center py-2 border border-red-200 bg-red-50 px-4"
              >
                {submitError}
              </motion.p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-[#1a2744] hover:bg-[#c9a96e] text-white hover:text-[#1a2744] rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2 font-sans !cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 mr-1 " /> Send Message
                </>
              )}
            </Button>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pt-2 font-sans">
              <Lock className="w-3 h-3 text-[#c9a96e]" />
              Your information is private and protected
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
