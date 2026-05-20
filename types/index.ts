// PROPERTY / LISTING
export interface Property {
  id: string;
  slug: string;
  status:
    | "Active"
    | "Under Contract"
    | "Sold"
    | "Coming Soon"
    | "Price Reduced";
  listingType: "For Sale" | "For Rent" | "Sold";
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    neighborhood: string;
    lat?: number;
    lng?: number;
  };
  details: {
    beds: number;
    baths: number;
    halfBaths?: number;
    sqft: number;
    lotSize?: number;
    yearBuilt: number;
    garage?: number;
    stories?: number;
    propertyType:
      | "Single Family"
      | "Condo"
      | "Townhouse"
      | "Multi-Family"
      | "Land";
  };
  financials: {
    hoaFee?: number;
    propertyTax?: number;
    mlsNumber?: string;
  };
  description: string;
  features: string[];
  photos: string[]; // array of image URLs
  virtualTourUrl?: string;
  openHouse?: {
    date: string;
    time: string;
  };
  daysOnMarket: number;
  listedDate: string;
}

// TESTIMONIAL
export interface Testimonial {
  id: string;
  authorName: string;
  authorPhoto?: string;
  role: "Buyer" | "Seller" | "Both";
  rating: number; // 1–5
  text: string;
  date: string;
  neighborhood?: string;
  source: "Google" | "Zillow" | "Direct";
  featured: boolean;
}

// NEIGHBORHOOD
export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  heroImage: string;
  tagline: string;
  description: string;
  stats: {
    avgPrice: number;
    pricePerSqft: number;
    avgDaysOnMarket: number;
    activeListings: number;
    yoyChange: number; // percentage
  };
  highlights: string[];
  schools: {
    elementary?: string;
    middle?: string;
    high?: string;
    rating?: number;
  };
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
  lat: number;
  lng: number;
}

// BLOG POST
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category:
    | "Market Update"
    | "Buyer Guide"
    | "Seller Guide"
    | "Neighborhood"
    | "Tips";
  coverImage: string;
  author: string;
  featured: boolean;
  content?: string; // MDX content
}

// PRESS MENTION
export interface PressMention {
  name: string;
  logo?: string;
  url: string;
  quote?: string;
}

// FORM SUBMISSIONS (for EmailJS)
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ValuationFormData {
  // Step 1
  street: string;
  city: string;
  state: string;
  zip: string;
  // Step 2
  propertyType: string;
  beds: string;
  baths: string;
  sqft: string;
  yearBuilt: string;
  condition: string;
  updates: string[];
  // Step 3
  name: string;
  email: string;
  phone: string;
  timing: "ASAP" | "1-3 months" | "3-6 months" | "Just curious";
}

export interface ShowingRequestData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  propertyAddress: string;
  mlsNumber?: string;
}

export interface SaveSearchData {
  email: string;
  firstName: string;
  frequency: "Instant" | "Daily" | "Weekly";
  searchQuery: string;
}

// NAVIGATION
export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
  dynamicMarkets?: boolean;
}

export type { RegionConfig } from "@/config/region.config";
