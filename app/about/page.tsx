"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { agentConfig } from "@/config/agent.config";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Quote,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    label: "Career Sales",
    value: agentConfig.stats.careerSalesVolume,
    icon: TrendingUp,
  },
  {
    label: "Homes Sold",
    value: agentConfig.stats.homesSold,
    icon: CheckCircle2,
  },
  {
    label: "Years Exp.",
    value: agentConfig.stats.yearsExperience,
    icon: Clock,
  },
  {
    label: "Google Rating",
    value: `${agentConfig.stats.googleRating}/5`,
    icon: Star,
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#f9f6f0] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full lg:w-1/2"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-[#c9a96e]/20 shadow-2xl">
                <Image
                  src={agentConfig.headshot}
                  alt={agentConfig.headshotAlt}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2744]/40 to-transparent" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-white p-8 border border-[#c9a96e]/30 shadow-xl hidden md:block">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl font-serif font-bold text-[#1a2744]">
                    {agentConfig.stats.yearsExperience}+
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#c9a96e] mt-1">
                    Years of Excellence
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="space-y-4">
                <span className="text-[12px] tracking-[0.3em] font-bold text-[#c9a96e] uppercase">
                  The Person Behind The Portfolio
                </span>
                <h1 className="text-5xl lg:text-7xl font-serif font-bold text-[#1a2744] leading-tight">
                  Meet {agentConfig.name}
                </h1>
                <p className="text-xl text-[#1a2744]/70 font-medium italic">
                  &quot;{agentConfig.shortBio}&quot;
                </p>
              </div>

              <div className="space-y-6 text-[#1a1a1a]/80 leading-relaxed text-lg">
                <p>
                  With a career defined by discretion, strategy, and an
                  unwavering commitment to my clients&apos; interests, I have
                  established myself as one of Austin&apos;s most sought-after
                  luxury property specialists. My approach is built on the
                  foundation of &quot;Quiet Luxury&quot;—focusing on substance,
                  heritage, and the intrinsic value of every property.
                </p>
                <p>
                  Whether navigating the complex nuances of Tarrytown’s historic
                  estates or the modern architecture of Westlake, I provide my
                  clients with unparalleled market insights and a global network
                  of high-net-worth buyers and sellers.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-[#1a2744] hover:bg-[#1a2744]/90 text-white rounded-none px-8 py-6 h-auto text-[13px] font-bold tracking-widest uppercase">
                  Work With {agentConfig.name.split(" ")[0]}
                </Button>
                <Button
                  variant="outline"
                  className="border-[#1a2744] text-[#1a2744] hover:bg-[#1a2744] hover:text-white rounded-none px-8 py-6 h-auto text-[13px] font-bold tracking-widest uppercase"
                >
                  View Listings
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-[#1a2744] py-20 text-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <stat.icon className="w-8 h-8 text-[#c9a96e]" />
                <div className="space-y-1">
                  <span className="block text-4xl lg:text-5xl font-serif font-bold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="block text-[11px] tracking-[0.2em] font-bold text-[#c9a96e] uppercase">
                    {stat.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 lg:px-12 text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="text-[12px] tracking-[0.3em] font-bold text-[#c9a96e] uppercase">
              The Support Network
            </span>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-[#1a2744]">
              Meet The Team
            </h2>
            <p className="text-lg text-[#1a1a1a]/60">
              Behind every successful transaction is a dedicated group of
              specialists handling everything from cinematic marketing to
              complex legal disclosures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Marcus Thorne",
                role: "Director of Operations",
                bio: "Former luxury hotelier ensuring every logistical detail is executed with white-glove precision.",
              },
              {
                name: "Elena Rodriguez",
                role: "Marketing Strategist",
                bio: "Award-winning creative director specializing in high-end real estate storytelling and digital outreach.",
              },
              {
                name: "David Sterling",
                role: "Client Relations",
                bio: "Dedicated concierge for our international buyers, facilitating smooth transitions to the Austin market.",
              },
            ].map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Card className="rounded-none border-none shadow-none bg-[#f9f6f0] transition-all duration-500 hover:shadow-2xl">
                  <CardContent className="p-10 space-y-6">
                    <div className="w-20 h-20 bg-[#1a2744]/5 flex items-center justify-center mx-auto transition-colors group-hover:bg-[#c9a96e]/10">
                      <Users className="w-8 h-8 text-[#1a2744] group-hover:text-[#c9a96e]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-bold text-[#1a2744]">
                        {member.name}
                      </h3>
                      <p className="text-[11px] tracking-[0.2em] font-bold text-[#c9a96e] uppercase">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-[#1a1a1a]/70 leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Media */}
      <section
        id="press"
        className="py-32 bg-[#1a2744] text-white scroll-mt-20 overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#c9a96e]/5 -skew-x-12 transform translate-x-1/2" />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <span className="text-[12px] tracking-[0.3em] font-bold text-[#c9a96e] uppercase">
                  Industry Authority
                </span>
                <h2 className="text-4xl lg:text-6xl font-serif font-bold leading-tight">
                  Press & Media
                </h2>
              </div>
              <p className="text-xl text-white/70 leading-relaxed">
                As a recognized expert in Austin&apos;s luxury real estate
                landscape, {agentConfig.name} is frequently cited in national
                and regional publications for market analysis and trend
                forecasting.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-8">
                {agentConfig.press.map((item) => (
                  <div
                    key={item.name}
                    className="border-b border-white/10 pb-4 group"
                  >
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-white/60 group-hover:text-[#c9a96e] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <Card className="rounded-none border-[#c9a96e]/20 bg-white/5 backdrop-blur-sm p-12 relative">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-[#c9a96e]/20" />
                <div className="space-y-8">
                  <p className="text-2xl font-serif italic leading-relaxed text-white/90">
                    &quot;Sarah Chen has become the go-to specialist for
                    Austin&apos;s most exclusive neighborhoods. Her analytical
                    approach to the luxury market is setting a new standard for
                    agents in Texas.&quot;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-[#c9a96e]" />
                    <span className="text-[11px] tracking-[0.3em] font-bold uppercase text-[#c9a96e]">
                      Austin Business Journal
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#f9f6f0]">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-[#1a2744]">
              Ready to Discuss Your Portfolio?
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Button className="bg-[#c9a96e] hover:bg-[#b8985e] text-[#1a2744] rounded-none px-12 py-8 h-auto text-sm font-bold tracking-[0.2em] uppercase shadow-xl">
                Schedule a Consultation
              </Button>
              <Button
                variant="outline"
                className="border-[#1a2744] text-[#1a2744] hover:bg-[#1a2744] hover:text-white rounded-none px-12 py-8 h-auto text-sm font-bold tracking-[0.2em] uppercase"
              >
                Contact Office
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
