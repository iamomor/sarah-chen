import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import listingsData from "@/content/listings/listings.json";
import { getRealEstateListingSchema, getBreadcrumbSchema } from "@/lib/schema";
import AgentSidebarCard from "@/features/listings/components/AgentSidebarCard";
import PropertyCard from "@/features/listings/components/PropertyCard";
import PropertyGallery from "@/features/listings/components/PropertyGallery";
import PropertyHeader from "@/features/listings/components/PropertyHeader";
import PropertyMap from "@/features/listings/components/PropertyMap";
import ShowingForm from "@/features/listings/components/ShowingForm";
import MortgageCalculatorLoader from "@/features/tools/components/MortgageCalculatorLoader";
import { formatArea, formatPrice, slugify } from "@/lib/utils";
import type { Property } from "@/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ArrowRight,
  Calendar,
  Check,
  Layout,
  Mail,
  MapPin,
  School,
  Share2,
  Video,
} from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="text-3xl md:text-4xl font-serif mb-8 pb-4"
    style={{ color: "#1a2744", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
  >
    {children}
  </h2>
);

export async function generateStaticParams() {
  const listings = listingsData as Property[];
  return listings.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = (listingsData as Property[]).find((p) => p.slug === slug);

  if (!property) return {};

  const title = `${property.details.beds} Bed ${property.details.propertyType} For Sale — ${property.address.street}, ${property.address.neighborhood} | ${agentConfig.name}`;
  const description = `${formatPrice(property.price)}. ${property.details.beds} beds, ${property.details.baths} baths, ${property.details.sqft} sq ft. ${property.address.neighborhood} real estate. Contact ${agentConfig.name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: property.photos[0],
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function ListingPage({ params }: PageProps) {
  const { slug } = await params;
  const property = (listingsData as Property[]).find((p) => p.slug === slug);

  if (!property) notFound();

  // Load matching neighborhood to get dynamic schools and ratings
  let neighborhoodData: any = null;
  const neighborhoodSlug = slugify(property.address.neighborhood);
  const neighborhoodPath = path.join(
    process.cwd(),
    "content/neighborhoods",
    `${neighborhoodSlug}.md`
  );
  if (fs.existsSync(neighborhoodPath)) {
    try {
      const fileContents = fs.readFileSync(neighborhoodPath, "utf8");
      const firstName = agentConfig.name.split(" ")[0];
      const parsedContents = fileContents
        .replace(/\{\{agentName\}\}/g, agentConfig.name)
        .replace(/\{\{agentFirstName\}\}/g, firstName)
        .replace(/\{\{city\}\}/g, region.defaultCity)
        .replace(/\{\{state\}\}/g, region.defaultState)
        .replace(/\{\{regionName\}\}/g, region.regionName);
      const { data } = matter(parsedContents);
      neighborhoodData = data;
    } catch (e) {
      console.error("Error loading neighborhood for schools in listing page:", e);
    }
  }

  const schoolsList = [];
  if (neighborhoodData?.schools) {
    if (neighborhoodData.schools.elementary) {
      schoolsList.push({
        name: neighborhoodData.schools.elementary,
        type: "Elementary",
        grades: "Grades K-5",
        rating: neighborhoodData.schools.rating || 8,
      });
    }
    if (neighborhoodData.schools.middle) {
      schoolsList.push({
        name: neighborhoodData.schools.middle,
        type: "Middle",
        grades: "Grades 6-8",
        rating: neighborhoodData.schools.rating || 8,
      });
    }
    if (neighborhoodData.schools.high) {
      schoolsList.push({
        name: neighborhoodData.schools.high,
        type: "High",
        grades: "Grades 9-12",
        rating: neighborhoodData.schools.rating || 8,
      });
    }
  } else {
    // Default fallback
    schoolsList.push(
      {
        name: "Casis Elementary School",
        type: "Elementary",
        grades: "Grades K-5",
        rating: 9,
      },
      { name: "O. Henry Middle School", type: "Middle", grades: "Grades 6-8", rating: 7 },
      { name: "Austin High School", type: "High", grades: "Grades 9-12", rating: 8 }
    );
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Listings", href: "/listings" },
    {
      label: property.address.neighborhood,
      href: `/neighborhoods/${slugify(property.address.neighborhood)}`,
    },
    { label: property.address.street, href: `/listings/${property.slug}` },
  ];

  const similarListings = (listingsData as Property[])
    .filter(
      (l) =>
        l.id !== property.id &&
        l.status === "Active" &&
        l.address.neighborhood === property.address.neighborhood &&
        l.price >= property.price * 0.7 &&
        l.price <= property.price * 1.3,
    )
    .slice(0, 3);

  const listingSchema = getRealEstateListingSchema(property);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Listings", url: "/listings" },
    { name: property.address.neighborhood, url: `/neighborhoods/${slugify(property.address.neighborhood)}` },
    { name: property.address.street, url: `/listings/${property.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumb Section */}
      <div className="container mx-auto px-6 lg:px-12 py-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Property Gallery Section */}
      <PropertyGallery
        photos={property.photos}
        propertyAddress={property.address.street}
      />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <PropertyHeader property={property} />

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 py-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-24">
            {/* SECTION 1: DESCRIPTION */}
            <section id="description" className="scroll-mt-32">
              <SectionHeading>About This Property</SectionHeading>
              <div
                className="prose prose-lg max-w-none font-light leading-relaxed"
                style={{ color: "#1a1a1a" }}
              >
                <p className="whitespace-pre-line">{property.description}</p>
              </div>
              <p
                className="mt-8 text-sm font-medium italic"
                style={{ color: "#6b7280" }}
              >
                Listed: {property.listedDate} · {property.daysOnMarket} days on
                market
              </p>
            </section>

            {/* SECTION: FLOOR PLAN (Placeholder) */}
            <section id="floorplan" className="scroll-mt-32">
              <SectionHeading>Floor Plan</SectionHeading>
              <div
                className="aspect-[16/9] bg-[#f9f6f0] rounded-[4px] flex flex-col items-center justify-center p-8 text-center"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  color: "#6b7280",
                }}
              >
                <Layout className="w-12 h-12 mb-4 opacity-20" />
                <p className="text-lg font-medium" style={{ color: "#1a2744" }}>
                  Floor plan coming soon
                </p>
                <p className="text-sm">
                  Contact us to receive the full brochure for this property.
                </p>
              </div>
            </section>

            {/* SECTION 2: FEATURES */}
            <section id="features" className="scroll-mt-32">
              <SectionHeading>Property Features</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 mt-0.5 shrink-0 opacity-70"
                      style={{ color: agentConfig.colors.accent }}
                    />
                    <span className="font-medium" style={{ color: "#1a1a1a" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: DETAILS TABLE */}
            <section id="details" className="scroll-mt-32">
              <SectionHeading>Property Details</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  ["Property Type", property.details.propertyType],
                  ["Year Built", property.details.yearBuilt],
                  ["Square Feet", formatArea(property.details.sqft)],
                  [
                    "Lot Size",
                    property.details.lotSize
                      ? `${property.details.lotSize} acres`
                      : "N/A",
                  ],
                  ["Bedrooms", property.details.beds],
                  ["Bathrooms", property.details.baths],
                  ["Garage", property.details.garage || "None"],
                  ["HOA Fee", formatPrice(property.financials.hoaFee || 0)],
                  ["MLS Number", property.financials.mlsNumber],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="flex justify-between py-4"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#6b7280" }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#1a2744" }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION: VIRTUAL TOUR (Placeholder) */}
            <section id="tour" className="scroll-mt-32">
              <SectionHeading>Virtual Tour</SectionHeading>
              <div
                className="aspect-video bg-[#1a2744] rounded-[4px] overflow-hidden relative group cursor-pointer"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
              >
                {property.photos[1] && (
                  <Image
                    unoptimized
                    src={property.photos[1]}
                    alt={`Virtual tour preview — ${property.address.street}`}
                    width={1920}
                    height={1080}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                    className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s]"
                  />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Video className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-serif mb-2">
                    3D Virtual Walkthrough
                  </h4>
                  <p className="text-white/70">
                    Coming Soon — Request early access
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: MAP */}
            <section id="map" className="scroll-mt-32">
              <SectionHeading>Location</SectionHeading>
              <div
                className="h-[450px] w-full rounded-[4px] overflow-hidden relative"
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >
                <PropertyMap property={property} />
              </div>
              <div className="mt-6 flex items-center gap-3">
                <MapPin
                  className="w-5 h-5 shrink-0 opacity-80"
                  style={{ color: agentConfig.colors.accent }}
                />
                <p className="font-medium text-lg" style={{ color: "#1a1a1a" }}>
                  {property.address.street}, {property.address.city},{" "}
                  {property.address.state}
                </p>
              </div>
            </section>

            {/* SECTION 5: MORTGAGE CALCULATOR */}
            <section id="calculator" className="scroll-mt-32">
              <SectionHeading>Estimate Your Payment</SectionHeading>
              <MortgageCalculatorLoader defaultPrice={property.price} compact />
            </section>

            {/* STICKY AGENT CARD (Mobile Only) */}
            <div className="lg:hidden">
              <AgentSidebarCard property={property} region={region} />
            </div>

            {/* SECTION 6: SCHOOL INFORMATION */}
            <section id="schools" className="scroll-mt-32">
              <SectionHeading>Nearby Schools</SectionHeading>
              <p
                className="text-sm font-medium mb-8"
                style={{ color: "#6b7280" }}
              >
                School data provided by {region.schoolRating}
              </p>
              <div className="grid gap-4">
                {schoolsList.map((school, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-6 bg-white transition-colors"
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: "4px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center"
                        style={{
                          border: "1px solid rgba(0,0,0,0.08)",
                          color: "#6b7280",
                        }}
                      >
                        <School className="w-6 h-6" />
                      </div>
                      <div>
                        <h4
                          className="font-serif text-xl"
                          style={{ color: "#1a2744" }}
                        >
                          {school.name}
                        </h4>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#6b7280" }}
                        >
                          {school.type} · {school.grades}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className="text-2xl font-serif text-white w-12 h-12 flex items-center justify-center rounded-[2px]"
                        style={{ backgroundColor: agentConfig.colors.primary }}
                      >
                        {school.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm italic" style={{ color: "#6b7280" }}>
                Note: Verify school zones with the school district directly.
              </p>
            </section>

            {/* SECTION 7: OPEN HOUSE */}
            {property.openHouse && (
              <section id="openhouse" className="scroll-mt-32">
                <SectionHeading>Open House</SectionHeading>
                <div className="bg-slate-900 text-white p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
                  <div className="flex items-center gap-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: agentConfig.colors.accent }}
                    >
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-widest">
                        Upcoming Event
                      </p>
                      <h4 className="text-3xl font-serif">
                        {property.openHouse.date}
                      </h4>
                      <p className="text-slate-300 text-lg font-light mt-1">
                        {property.openHouse.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <Button variant="gold" className="flex-1 md:flex-initial">
                      RSVP
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 md:flex-initial border-white/20 text-white hover:bg-white/10"
                    >
                      Add to Cal
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* SECTION 8: REQUEST A SHOWING FORM */}
            <section id="showing-form" className="scroll-mt-32">
              <SectionHeading>Schedule a Showing</SectionHeading>
              <ShowingForm propertyAddress={property.address.street} />
            </section>

            {/* SECTION: SHARE (Placeholder) */}
            <section id="share" className="scroll-mt-32">
              <SectionHeading>Share This Property</SectionHeading>
              <div className="flex flex-wrap gap-4">
                <Button variant="secondary" className="gap-2">
                  <Share2 className="w-4 h-4" /> Share Listing
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Mail className="w-4 h-4" /> Email to a Friend
                </Button>
              </div>
            </section>

            {/* SECTION 9: SIMILAR LISTINGS */}
            <section id="similar" className="scroll-mt-32">
              <SectionHeading>More Homes Like This</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarListings.map((listing, i) => (
                  <PropertyCard key={listing.id} property={listing} index={i} />
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button variant="secondary" asChild className="h-12 px-8">
                  <Link href="/listings" className="flex items-center gap-3">
                    View All Listings <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar Column (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <AgentSidebarCard property={property} region={region} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
