"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

import { agentConfig } from "@/config/agent.config";
import Link from "next/link";

export default function ContactInfoCard() {
  const { name, title, phone, phoneRaw, email, address, headshot, headshotAlt, social, contactPage } = agentConfig;

  const socialIcons = [
    { platform: "facebook", icon: FaFacebook, url: social.facebook },
    { platform: "instagram", icon:  FaInstagram, url: social.instagram },
    { platform: "linkedin", icon: FaLinkedin, url: social.linkedin },
    { platform: "youtube", icon: FaYoutube, url: social.youtube },
  ].filter(s => s.url && s.url !== "#" && s.url !== "");

  return (
    <div className="bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 md:p-10 space-y-8 relative overflow-hidden">
      {/* Decorative luxury accent lines */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#1a2744] via-[#c9a96e] to-[#1a2744]" />
      
      {/* Agent Quick Intro */}
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#c9a96e]/20 flex-shrink-0">
          <Image
            src={headshot}
            alt={headshotAlt}
            fill
            className="object-cover object-center"
            quality={90}
            sizes="96px"
          />
        </div>
        <div>
          <h3 className="text-xl font-serif text-[#1a2744] font-medium leading-snug">
            {name}
          </h3>
          <p className="text-xs text-slate-500 font-sans tracking-wide mt-0.5">
            {title}
          </p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-5 font-sans">
        <Link
          href={`tel:${phoneRaw}`}
          className="flex items-start gap-4 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#f9f6f0] flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-white transition-all duration-300 flex-shrink-0">
            <Phone className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Phone Number
            </span>
            <span className="text-sm font-medium text-[#1a2744] group-hover:text-[#c9a96e] transition-colors duration-200">
              {phone}
            </span>
          </div>
        </Link>

        <Link
          href={`mailto:${email}`}
          className="flex items-start gap-4 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-[#f9f6f0] flex items-center justify-center text-[#c9a96e] group-hover:bg-[#c9a96e] group-hover:text-white transition-all duration-300 flex-shrink-0">
            <Mail className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Email Address
            </span>
            <span className="text-sm font-medium text-[#1a2744] group-hover:text-[#c9a96e] transition-colors duration-200 break-all">
              {email}
            </span>
          </div>
        </Link>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#f9f6f0] flex items-center justify-center text-[#c9a96e] flex-shrink-0">
            <MapPin className="w-4 h-4 stroke-[1.5]" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
              Office Address
            </span>
            <span className="text-sm font-light text-slate-600 leading-relaxed">
              {address}
            </span>
          </div>
        </div>
      </div>

      {/* Office Hours */}
      <div className="pt-6 border-t border-slate-100 space-y-4 font-sans">
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-[#c9a96e] stroke-[1.5]" />
          <h4 className="text-xs font-bold text-[#1a2744] uppercase tracking-widest">
            Office Hours
          </h4>
        </div>
        <div className="space-y-2.5 text-xs text-slate-600 font-light pl-7">
          {contactPage.officeHours.map((oh, idx) => (
            <div key={idx} className="flex justify-between items-center max-w-[280px]">
              <span className="text-slate-500">{oh.days}</span>
              <span className="font-medium text-[#1a2744]">{oh.hours}</span>
            </div>
          ))}
          <p className="text-[10px] text-[#c9a96e] font-bold uppercase tracking-wider mt-3">
            • {contactPage.officeHoursNote}
          </p>
        </div>
      </div>

      {/* Social Links */}
      {socialIcons.length > 0 && (
        <div className="pt-6 border-t border-slate-100 space-y-3 font-sans">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Connect on Social Media
          </h4>
          <div className="flex items-center gap-3">
            {socialIcons.map(soc => {
              const Icon = soc.icon;
              return (
                <Link
                  key={soc.platform}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${name} on ${soc.platform}`}
                  className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-white hover:bg-[#1a2744] hover:border-[#1a2744] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
