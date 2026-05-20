"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Loader2, Lock, Mail, MessageSquare, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { agentConfig } from "@/config/agent.config";
import { initEmailJS, sendContactForm } from "@/lib/emailjs";

const SUBJECT_OPTIONS = [
  { value: "Buy a Home", label: "I want to buy a home" },
  { value: "Sell a Home", label: "I want to sell my home" },
  { value: "Home Valuation", label: "Request a home valuation" },
  { value: "Market Update", label: "Get a market update" },
  { value: "Investment Opportunity", label: "Investment opportunity" },
  { value: "General Inquiry", label: "General inquiry" },
];

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const inputClass =
  "w-full h-14 px-4 bg-slate-50/50 border border-slate-200/80 rounded-none text-sm text-slate-800 font-light placeholder:text-slate-300 focus:outline-none focus:border-[#c9a96e] focus:bg-white transition-all duration-200";

const labelClass =
  "block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2";

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      subject: "",
      message: "",
    },
  });

  const subjectValue = watch("subject");

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await sendContactForm({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: `Subject: ${data.subject}\n\n${data.message}`,
      });
      setIsSubmitted(true);
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
          <span className="text-[10px] font-bold text-[#c9a96e] uppercase tracking-[0.3em] mb-3">
            Message Received
          </span>
          <h3 className="text-3xl font-serif text-[#1a2744] font-light mb-3">
            Thank You for Reaching Out
          </h3>
          <p className="text-sm text-slate-500 font-light max-w-sm leading-relaxed mb-8">
            {agentConfig.name} personally reviews every inquiry and will respond within 24 hours.
            For urgent matters, call{" "}
            <a href={`tel:${agentConfig.phoneRaw}`} className="text-[#c9a96e] font-medium hover:underline">
              {agentConfig.phone}
            </a>
            .
          </p>
          <button
            onClick={() => { setIsSubmitted(false); reset(); }}
            className="text-xs text-[#c9a96e] font-bold uppercase tracking-widest hover:underline"
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
                  <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" />Phone Number</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  placeholder="(512) 555-0147"
                  {...register("phone")}
                  className={inputClass}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className={labelClass}>How Can We Help?</label>
              <CustomSelect
                id="contact-subject"
                variant="light"
                options={SUBJECT_OPTIONS}
                value={subjectValue}
                onChange={(val) => setValue("subject", val, { shouldValidate: true })}
                placeholder="Select a subject"
                error={!!errors.subject}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject.message}</p>
              )}
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
                className={`${inputClass} h-auto resize-none py-4`}
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
              className="w-full h-14 bg-[#1a2744] hover:bg-[#c9a96e] text-white hover:text-[#1a2744] rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                </>
              ) : (
                `Send Message to ${agentConfig.name.split(" ")[0]}`
              )}
            </Button>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] pt-2">
              <Lock className="w-3 h-3 text-[#c9a96e]" />
              Your information is private and protected
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
