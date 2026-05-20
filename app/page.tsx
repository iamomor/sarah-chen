import Hero from "@/features/home/components/Hero";
import StatsStrip from "@/features/home/components/StatsStrip";
import FeaturedListings from "@/features/home/components/FeaturedListings";
import ThreeCardCTA from "@/features/home/components/ThreeCardCTA";
import AboutTeaser from "@/features/home/components/AboutTeaser";
import TestimonialsCarousel from "@/features/home/components/TestimonialsCarousel";
import PressStrip from "@/features/home/components/PressStrip";
import NeighborhoodGrid from "@/features/home/components/NeighborhoodGrid";
import BlogTeasers from "@/features/home/components/BlogTeasers";
import NewsletterSignup from "@/features/home/components/NewsletterSignup";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <FeaturedListings />
      <ThreeCardCTA />
      <AboutTeaser />
      <TestimonialsCarousel />
      <PressStrip />
      <NeighborhoodGrid />
      <BlogTeasers />
      <NewsletterSignup />
    </main>
  );
}
