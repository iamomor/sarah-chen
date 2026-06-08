"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { agentConfig } from "@/config/agent.config";
import { sendNewsletterSignup } from "@/lib/emailjs";
import type { BlogPost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import * as z from "zod";

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categoryCounts: Record<string, number>;
}

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const categorySlugs: Record<string, string> = {
  "Market Update": "market-update",
  "Buyer Guide": "buyer-guide",
  "Seller Guide": "seller-guide",
  Neighborhood: "neighborhood",
  Tips: "tips",
};

export default function BlogSidebar({ recentPosts, categoryCounts }: BlogSidebarProps) {
  const [signupStatus, setSignupStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onNewsletterSubmit = async (data: NewsletterFormValues) => {
    try {
      await sendNewsletterSignup(data.email, "Valued Subscriber");
      setSignupStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setSignupStatus("error");
    }
  };

  return (
    <aside className="w-full space-y-12">
      {/* 1. Agent Contact Card */}
      <div className="bg-white border border-border/40 p-6 text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto overflow-hidden bg-muted">
          <Image
            src={agentConfig.headshot}
            alt={agentConfig.headshotAlt}
            fill
            sizes="128px"
            className="object-cover object-top"
          />
        </div>
        
        <div>
          <h4 className="text-lg font-serif text-primary tracking-tight">{agentConfig.name}</h4>
          <p className="text-[10px] text-accent uppercase tracking-widest font-semibold mt-1">
            {agentConfig.title}
          </p>
        </div>

        <p className="text-xs text-muted-foreground font-light leading-relaxed px-2">
          {agentConfig.shortBio}
        </p>

        <div className="pt-4 border-t border-border/40 space-y-3">
          <a
            href={`tel:${agentConfig.phoneRaw}`}
            className="flex items-center justify-center gap-2 text-xs text-primary hover:text-accent transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-accent" />
            {agentConfig.phone}
          </a>
          <a
            href={`mailto:${agentConfig.email}`}
            className="flex items-center justify-center gap-2 text-xs text-primary hover:text-accent transition-colors font-medium break-all"
          >
            <Mail className="w-3.5 h-3.5 text-accent" />
            {agentConfig.email}
          </a>
        </div>

        {agentConfig.bookingUrl && (
          <Button
            asChild
            variant="default"
            className="w-full h-11 text-[10px] font-bold uppercase tracking-widest"
          >
            <a href={agentConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
              Schedule Consultation
            </a>
          </Button>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-2">
          {agentConfig.social.facebook && (
            <a
              href={agentConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
          )}
          {agentConfig.social.instagram && (
            <a
              href={agentConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          )}
          {agentConfig.social.linkedin && (
            <a
              href={agentConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          )}
          {agentConfig.social.youtube && (
            <a
              href={agentConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent transition-all duration-300"
            >
              <FaYoutube className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Categories with Post Counts */}
      <div className="bg-white border border-border/40 p-6 space-y-6">
        <h4 className="text-base font-serif text-primary tracking-tight border-b border-border/40 pb-3">
          Explore Categories
        </h4>
        <ul className="space-y-3">
          {Object.entries(categoryCounts).map(([catName, count]) => {
            const slug = categorySlugs[catName] || catName.toLowerCase();
            return (
              <li key={catName}>
                <Link
                  href={`/blog?category=${slug}`}
                  className="flex items-center justify-between text-xs text-muted-foreground hover:text-accent transition-colors duration-300 group"
                >
                  <span className="flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5" />
                    {catName}
                  </span>
                  <span className="text-[10px] bg-muted px-2 py-0.5 text-muted-foreground font-semibold rounded-full">
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 3. Recent Posts */}
      <div className="bg-white border border-border/40 p-6 space-y-6">
        <h4 className="text-base font-serif text-primary tracking-tight border-b border-border/40 pb-3">
          Recent Articles
        </h4>
        <div className="space-y-4">
          {recentPosts.slice(0, 5).map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            return (
              <div key={post.slug} className="space-y-1 group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-medium text-primary hover:text-accent leading-snug block transition-colors duration-300 line-clamp-2"
                >
                  {post.title}
                </Link>
                <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground uppercase tracking-wider">
                  <CalendarDays className="w-3 h-3 text-accent/70" />
                  {formattedDate}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Condensed Newsletter Signup */}
      <div className="bg-[#1a2744] text-white p-6 border border-accent/20 space-y-4 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(201,169,110,0.1)_0%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <h4 className="text-base font-serif text-white tracking-tight">
            Market Briefings
          </h4>
          <p className="text-[11px] text-white/60 font-light leading-relaxed">
            Subscribe for local market micro-reports and exclusive private property listings.
          </p>
        </div>

        {signupStatus === "success" ? (
          <div className="relative z-10 flex items-start gap-2 bg-white/5 border border-accent/30 p-3">
            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white">Subscribed</p>
              <p className="text-[9px] text-white/50">Check your inbox for our latest market handbook.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onNewsletterSubmit)} className="relative z-10 space-y-2">
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Your email address"
                className="h-10 bg-white/5 text-white border-white/20 rounded-none placeholder:text-white/30 focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent text-xs"
              />
              {errors.email && (
                <p className="text-red-400 text-[9px] mt-1">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 rounded-none text-[9px] font-bold uppercase tracking-widest bg-accent text-[#1a2744] hover:bg-accent/90 hover:text-[#1a2744] border-none"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
      </div>

      {/* 5. Free Home Valuation CTA */}
      <div className="relative overflow-hidden border border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 p-6 text-center space-y-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMCAwaDFNMzkgMGgxTTAgMzloMU0zOSAzOWgxIiBzdHJva2U9InJnYmEoMjAxLDE2OSw5MCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-50 pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="w-10 h-10 mx-auto bg-accent/20 border border-accent/30 flex items-center justify-center">
            <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent mb-1">Complimentary</p>
            <h4 className="text-sm font-serif text-primary tracking-tight leading-snug">
              What Is Your Home Worth?
            </h4>
            <p className="text-[11px] text-muted-foreground font-light mt-2 leading-relaxed">
              Get a precise, data-driven valuation from {agentConfig.name} — no cost, no obligation.
            </p>
          </div>
          <Button asChild variant="gold" className="w-full h-10 text-[9px] tracking-widest uppercase font-bold">
            <Link href="/valuation">
              Get Free Valuation →
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
