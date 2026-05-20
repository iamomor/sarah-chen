import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { Home, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Search Homes", href: "/listings" },
        { name: "Home Valuation", href: "/valuation" },
        { name: "Buyer Guide", href: "/buy" },
        { name: "Seller Services", href: "/sell" },
        { name: "Mortgage Calculator", href: "/calculator" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: `About ${agentConfig.name.split(" ")[0]}`, href: "/about" },
        { name: "Client Testimonials", href: "/testimonials" },
        { name: "Blog & News", href: "/blog" },
        { name: "Neighborhoods", href: "/neighborhoods" },
        { name: "Schedule a Consultation", href: "/contact" },
      ],
    },
  ];

  const bottomLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/privacy-policy#cookies" },
  ];

  return (
    <footer
      className="text-white pt-12 md:pt-20 overflow-hidden"
      style={{ backgroundColor: agentConfig.colors.primary }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* COLUMN 1 — Brand */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block group">
              <h2
                className="font-serif text-[26px] font-bold leading-tight"
                style={{ color: "#f9f6f0" }}
              >
                {agentConfig.name} Realty
              </h2>
            </Link>
            <p
              className="mt-2 text-sm font-normal leading-relaxed max-w-[280px] line-clamp-2"
              style={{ color: "rgba(249,246,240,0.6)" }}
            >
              {agentConfig.shortBio}
            </p>

            <div className="mt-8 flex flex-col gap-2">
              <a
                href={`tel:${agentConfig.phoneRaw}`}
                className="text-sm font-medium transition-opacity hover:opacity-80 flex items-center gap-2"
                style={{ color: agentConfig.colors.accent }}
              >
                <Phone size={14} />
                {agentConfig.phone}
              </a>
              <a
                href={`mailto:${agentConfig.email}`}
                className="text-sm font-normal transition-colors hover:text-[#f9f6f0] flex items-center gap-2"
                style={{ color: "rgba(249,246,240,0.7)" }}
              >
                <Mail size={14} />
                {agentConfig.email}
              </a>
            </div>
          </div>

          {/* COLUMNS 2 & 3 — Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3
                className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-6"
                style={{ color: agentConfig.colors.accent }}
              >
                {section.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal transition-colors hover:text-[#f9f6f0]"
                      style={{ color: "rgba(249,246,240,0.7)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* COLUMN 4 — Connect */}
          <div>
            <h3
              className="text-[11px] font-semibold uppercase tracking-[1.5px] mb-6"
              style={{ color: agentConfig.colors.accent }}
            >
              Follow {agentConfig.name.split(" ")[0]}
            </h3>
            <div className="flex gap-6 mb-10">
              {agentConfig.social.instagram && (
                <a
                  href={agentConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#c9a96e]"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {agentConfig.social.facebook && (
                <a
                  href={agentConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#c9a96e]"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              )}
              {agentConfig.social.linkedin && (
                <a
                  href={agentConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#c9a96e]"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </a>
              )}
              {agentConfig.social.youtube && (
                <a
                  href={agentConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-[#c9a96e]"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0"
                  style={{ color: agentConfig.colors.accent }}
                />
                <span
                  className="text-sm font-normal leading-relaxed"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                >
                  {agentConfig.address}
                </span>
              </div>
              <Button
                asChild
                className="w-full mt-2 h-12 rounded-none transition-all hover:opacity-90 active:scale-95"
                style={{
                  backgroundColor: agentConfig.colors.accent,
                  color: agentConfig.colors.primary,
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                <Link
                  href={agentConfig.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Private Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-20 pt-8 pb-12 border-t border-[rgba(249,246,240,0.1)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div
              className="text-[12px] text-center md:text-left"
              style={{ color: "rgba(249,246,240,0.4)" }}
            >
              © {currentYear} {agentConfig.name} Realty. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              {bottomLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[12px] transition-colors hover:text-[#f9f6f0]"
                  style={{ color: "rgba(249,246,240,0.4)" }}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div
              className="text-[12px] text-center md:text-right"
              style={{ color: "rgba(249,246,240,0.4)" }}
            >
              {agentConfig.licenseNumber} | Powered by {agentConfig.brokerage}
            </div>
          </div>

          {/* MLS & FAIR HOUSING */}
          <div className="flex flex-col items-center gap-6">
            {region.idxEnabled && (
              <p
                className="text-[11px] text-center max-w-3xl mx-auto leading-relaxed"
                style={{ color: "rgba(249,246,240,0.3)" }}
              >
                {region.compliance}
              </p>
            )}

            {region.fairHousingRequired && (
              <div className="flex items-center gap-3 opacity-30 cursor-default grayscale">
                <div className="w-5 h-5 border border-white/50 flex items-center justify-center">
                  <Home size={10} className="text-white/50" />
                </div>
                <span
                  className="text-[10px] uppercase tracking-[2px] font-medium"
                  style={{ color: "rgba(249,246,240,0.3)" }}
                >
                  Equal Housing Opportunity
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
