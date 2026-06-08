"use client";

import { agentConfig } from "@/config/agent.config";
import Link from "next/link";
import { useEffect, useState } from "react";
import CookieConsent from "react-cookie-consent";

export const CookieBanner = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="CookieConsent"
      onAccept={() => {
        window.dispatchEvent(new Event("cookie-consent-updated"));
      }}
      onDecline={() => {
        window.dispatchEvent(new Event("cookie-consent-updated"));
      }}
      disableStyles={true}
      containerClasses="fixed bottom-[60px] lg:bottom-0 left-0 right-0 z-[90] flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-3.5 gap-4 border-t border-[rgba(249,246,240,0.1)] transition-all duration-300"
      style={{
        backgroundColor: agentConfig.colors.primary,
      }}
      contentClasses="text-sm font-sans font-normal text-[#f9f6f0]/95 leading-relaxed max-w-4xl text-center md:text-left"
      buttonWrapperClasses="flex items-center gap-3 shrink-0 w-full md:w-auto justify-center"
      buttonClasses="px-5 py-2.5 text-[11px] font-semibold tracking-[1px] uppercase cursor-pointer transition-all duration-150 hover:opacity-90 active:scale-95 text-center shrink-0"
      buttonStyle={{
        backgroundColor: agentConfig.colors.accent,
        color: agentConfig.colors.primary,
      }}
      declineButtonClasses="px-5 py-2.5 text-[11px] font-semibold tracking-[1px] uppercase bg-transparent cursor-pointer transition-all duration-150 hover:bg-white/5 active:scale-95 text-center shrink-0 border border-[rgba(249,246,240,0.3)] text-[#f9f6f0]"
    >
      We use cookies to personalize your experience and analyze site traffic. By
      continuing, you agree to our use of cookies.{" "}
      <Link
        href="/privacy-policy"
        className="underline font-medium hover:opacity-80 transition-opacity ml-1"
        style={{ color: agentConfig.colors.accent }}
      >
        Privacy Policy
      </Link>
    </CookieConsent>
  );
};

export default CookieBanner;
