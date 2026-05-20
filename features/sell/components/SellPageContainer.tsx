import MarketingPresentation from "./MarketingPresentation";
import MarketingSystem from "./MarketingSystem";
import PricingStrategy from "./PricingStrategy";
import ProcessTimeline from "./ProcessTimeline";
import SellBottomCTA from "./SellBottomCTA";
import SellHero from "./SellHero";
import SellerGuideHook from "./SellerGuideHook";
import SellerPerformance from "./SellerPerformance";
import SellerTestimonials from "./SellerTestimonials";
import SellerWorksheet from "./SellerWorksheet";

export default function SellPageContainer() {
  return (
    <main className="bg-[#f9f6f0] min-h-screen relative overflow-x-hidden">
      {/* 1. Luxury Landing Hero Header */}
      <SellHero />

      {/* 2. Audited Real Estate Board Performance statistics */}
      <SellerPerformance />

      {/* 3. Interactive Staging ROI & Equity Estimator widget (Hook) */}
      <SellerGuideHook />

      {/* 4. Omnichannel Digital Listing Marketing Stack */}
      <MarketingSystem />

      {/* 5. 5-Stage Listing Process Timeline roadmap */}
      <ProcessTimeline />

      {/* 6. Scientific Comparative Pricing strategies narrative */}
      <PricingStrategy />

      {/* 7. Client Presentation Preview lock block */}
      <MarketingPresentation />

      {/* 8. Active client testimonial grids */}
      <SellerTestimonials />

      {/* 9. Secure Pre-Consultation specs worksheet form */}
      <SellerWorksheet />

      {/* 10. Direct consult booking closing bar */}
      <SellBottomCTA />
    </main>
  );
}
