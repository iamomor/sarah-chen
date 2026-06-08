import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import CrispChatLoader from "@/components/layout/CrispChatLoader";
import Analytics from "@/components/layout/Analytics";
import CookieBanner from "@/components/layout/CookieBanner";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { getLocalBusinessSchema } from "@/lib/schema";
import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: agentConfig.siteTitle,
  description: agentConfig.siteDescription,
  metadataBase: new URL(agentConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: agentConfig.siteTitle,
    description: agentConfig.siteDescription,
    url: agentConfig.siteUrl,
    siteName: agentConfig.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: agentConfig.siteTitle,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: agentConfig.siteTitle,
    description: agentConfig.siteDescription,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html lang={region.language || "en"} className={`${inter.className} ${cormorant.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body
        className="antialiased flex flex-col min-h-screen"
        style={{
          backgroundColor: agentConfig.colors.background,
          color: agentConfig.colors.text,
        }}
        suppressHydrationWarning
      >
        <ScrollToTop />
        <Suspense fallback={<div className="h-20 bg-[#1a2744]" />}>
          <Header />
        </Suspense>
        <main className="flex-grow pb-[62px] lg:pb-0">{children}</main>
        <Footer />
        <MobileBottomBar />
        <CrispChatLoader />
        <CookieBanner />
        {/* GA4 + Meta Pixel — loads only after cookie consent */}
        <Analytics />
      </body>
    </html>
  );
}
