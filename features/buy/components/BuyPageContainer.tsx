"use client";

import React from "react";

// Section Components
import BuyHero from "./BuyHero";
import BuyPerformanceStrip from "./BuyPerformanceStrip";
import WhySarahChen from "./WhySarahChen";
import BuyerFeaturedListings from "./BuyerFeaturedListings";
import AcquisitionTimeline from "./AcquisitionTimeline";
import BuyerResources from "./BuyerResources";
import BuyerBrokerAgreement from "./BuyerBrokerAgreement";
import BuyerTestimonials from "./BuyerTestimonials";
import BuyBottomCTA from "./BuyBottomCTA";

export default function BuyPageContainer() {
  return (
    <main className="bg-[#f9f6f0] min-h-screen relative">
      <BuyHero />
      <BuyPerformanceStrip />
      <WhySarahChen />
      <BuyerFeaturedListings />
      <AcquisitionTimeline />
      <BuyerResources />
      <BuyerBrokerAgreement />
      <BuyerTestimonials />
      <BuyBottomCTA />
    </main>
  );
}
