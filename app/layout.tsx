import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
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
  return (
    <html lang={region.language || "en"} className={`${inter.variable} ${cormorant.variable}`} suppressHydrationWarning>
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
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
