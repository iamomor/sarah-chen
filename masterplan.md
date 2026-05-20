# REAL ESTATE WEBSITE — TECH STACK + COMPLETE BUILD SLICES

## IDE-Ready Prompt System | Jacob Rajan Standard Structure

### For Use With: Cursor · Zed · Claude Code · GitHub Copilot · Windsurf

---

> **HOW TO USE THIS DOCUMENT**
> Each SLICE is one self-contained IDE prompt.
> Copy the block under "PASTE THIS INTO YOUR IDE" for each slice.
> Do NOT paste multiple slices at once.
> Execute one slice → verify it works → move to next slice.
> Order matters. Do not skip slices.

---

# ═══════════════════════════════════════════════════

# SECTION 0 — TECH STACK DECISION

# ═══════════════════════════════════════════════════

## Your Skills Available

- Next.js (frontend + backend)
- MongoDB
- Node.js
- Express.js
- PostgreSQL

## Constraints

- $0 budget for hosting backend separately
- Must deploy on Vercel free tier
- Must look production-level to clients
- Must be deployable per client in 2–4 hours

---

## FINAL TECH STACK (CHOSEN FOR YOU — WITH REASONS)

### CORE

```
Next.js 14        App Router. Full-stack. API routes = your backend.
                  No separate Node/Express server needed.
                  Vercel free tier = zero cost.
                  Static + SSR = fast + SEO-ready.

TypeScript        Required for production level. Prevents 80% of bugs.
                  Your IDE autocompletes everything.

Tailwind CSS      No separate CSS files. Config-driven.
                  Changing a client's brand = edit 2 color values.

shadcn/ui         Free. Copy-paste components. No npm lock-in.
                  Built on Radix UI = accessible by default.
```

### BACKEND STRATEGY

```
Next.js API Routes    REPLACES Express.js for this project.
                      /app/api/[route]/route.ts = your endpoints.
                      Runs on Vercel serverless functions. Free.
                      No separate server. No separate hosting.

EmailJS              REPLACES any email backend.
                     Forms submit directly to agent's email.
                     Free tier: 200 emails/month. Enough for demo.
                     No backend code needed at all.

Supabase Free Tier   REPLACES MongoDB AND PostgreSQL for Phase 2.
                     You know PostgreSQL → Supabase IS PostgreSQL.
                     500MB free. Enough for 10+ clients.
                     Use ONLY when client portal (Slice 27) is built.
                     DO NOT set up Supabase for Phase 1.
```

### WHY NOT MONGODB?

```
MongoDB Atlas free tier = 512MB, shared cluster, slow cold starts.
Supabase free tier = 500MB PostgreSQL, faster, Row Level Security built-in.
You already know PostgreSQL → zero learning curve.
For Phase 1 (the demo + first client): NO DATABASE NEEDED AT ALL.
```

### WHY NOT EXPRESS.JS?

```
Express on a separate server = separate hosting = costs money.
Next.js API routes do everything Express does for this project.
Same Node.js runtime. Same logic. Zero extra cost.
```

### COMPLETE DEPENDENCY LIST

```bash
# Core
npx create-next-app@latest real-estate-template \
  --typescript --tailwind --eslint --app --src-dir=no \
  --import-alias="@/*"

# UI Components
npx shadcn@latest init
npx shadcn@latest add button card input label select \
  sheet dialog dropdown-menu badge separator tabs \
  form toast carousel accordion

# Key Libraries
npm install framer-motion           # Animations
npm install react-hook-form zod     # Form validation
npm install @hookform/resolvers     # Zod + RHF bridge
npm install @emailjs/browser        # Email (no backend)
npm install react-leaflet leaflet   # Maps (free)
npm install @types/leaflet          # Leaflet types
npm install next-mdx-remote         # Blog (MDX)
npm install gray-matter             # MDX frontmatter
npm install next-sitemap            # Auto XML sitemap
npm install react-cookie-consent    # Cookie banner
npm install lucide-react            # Icons (already with shadcn)
npm install clsx tailwind-merge     # Utility (already with shadcn)
npm install @next/third-parties     # GA4 + Meta Pixel (official)
npm install embla-carousel-react    # Testimonials carousel
npm install react-intersection-observer  # Scroll animations trigger
npm install sharp                   # Image optimization (Vercel)
```

---

## FOLDER STRUCTURE — JACOB RAJAN STANDARD

```
/real-estate-template
│
├── /app                                    // ROUTING LAYER — keep logic minimal here
│   ├── layout.tsx                          // Root layout — fonts, providers, metadata
│   ├── page.tsx                            // Homepage assembly
│   ├── error.tsx                           // Global error boundary
│   ├── /buy/page.tsx
│   ├── /sell/page.tsx
│   ├── /listings/page.tsx
│   ├── /listings/[slug]/page.tsx
│   ├── /valuation/page.tsx
│   ├── /about/page.tsx
│   ├── /contact/page.tsx
│   ├── /neighborhoods/page.tsx
│   ├── /neighborhoods/[slug]/page.tsx
│   ├── /testimonials/page.tsx
│   ├── /blog/page.tsx
│   ├── /blog/[slug]/page.tsx
│   ├── /calculator/page.tsx
│   ├── /market-report/page.tsx
│   ├── /open-houses/page.tsx
│   ├── /privacy-policy/page.tsx
│   ├── /terms/page.tsx
│   └── /api                               // API Routes — webhooks & external only
│       ├── /contact/route.ts
│       └── /subscribe/route.ts
│
├── /features                              // DOMAIN LAYER — core logic lives here
│   ├── /home
│   │   └── /components                   // Hero, StatsStrip, FeaturedListings,
│   │       ├── Hero.tsx                  // ThreeCardCTA, AboutTeaser,
│   │       ├── StatsStrip.tsx            // TestimonialsCarousel, PressStrip,
│   │       ├── FeaturedListings.tsx      // NewsletterSignup, NeighborhoodGrid,
│   │       ├── ThreeCardCTA.tsx          // BlogTeasers
│   │       ├── AboutTeaser.tsx
│   │       ├── TestimonialsCarousel.tsx
│   │       ├── PressStrip.tsx
│   │       ├── NewsletterSignup.tsx
│   │       ├── NeighborhoodGrid.tsx
│   │       └── BlogTeasers.tsx
│   │
│   ├── /listings
│   │   └── /components                   // PropertyCard, ListingFilters,
│   │       ├── PropertyCard.tsx          // MapView, SaveSearchModal,
│   │       ├── ListingFilters.tsx        // PropertyGallery
│   │       ├── MapView.tsx
│   │       ├── SaveSearchModal.tsx
│   │       └── PropertyGallery.tsx
│   │
│   ├── /neighborhoods
│   │   └── /components
│   │       └── NeighborhoodTemplate.tsx  // Reusable neighborhood page template
│   │
│   ├── /blog
│   │   └── /components
│   │       └── BlogPostLayout.tsx        // Single blog post layout wrapper
│   │
│   ├── /tools
│   │   └── /components
│   │       └── MortgageCalculator.tsx    // Mortgage calculator (used in 2+ pages)
│   │
│   ├── /valuation
│   │   └── /components
│   │       └── ValuationForm.tsx         // 3-step valuation wizard
│   │
│   └── /contact
│       └── /components
│           └── ContactForm.tsx           // Main contact form
│
├── /components                           // SHARED UI — dumb, reusable components
│   ├── /ui                               // Shadcn / Radix primitives (auto-created)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   └── /layout                          // Global page chrome
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── MobileBottomBar.tsx
│       ├── Analytics.tsx
│       ├── CookieBanner.tsx
│       └── CrispChat.tsx
│
├── /lib                                  // INFRASTRUCTURE — server-only utilities
│   ├── utils.ts                          // cn(), formatDate(), formatPrice(), slugify()
│   ├── emailjs.ts                        // EmailJS send helpers
│   ├── mdx.ts                            // MDX/blog file reading utilities
│   └── schema.ts                         // JSON-LD schema markup generators
│
├── /hooks                                // SHARED HOOKS — used across 2+ features
│   ├── useCountUp.ts                     // Animated counter for StatsStrip
│   └── useSavedListings.ts              // localStorage saved listings state
│
├── /types                                // GLOBAL TYPES — single source of truth
│   └── index.ts                          // Property, Testimonial, Neighborhood, etc.
│
├── /constants                            // NO MAGIC STRINGS
│   ├── routes.ts                         // Typed URL constants — rename once, updates everywhere
│   └── config.ts                         // Feature flags, app limits
│
├── /config                               // PER-CLIENT CONFIG — change per deployment
│   ├── agent.config.ts                   // Agent identity, colors, stats, keys
│   └── region.config.ts                  // US / AU / CA / UK regional settings
│
├── /content                              // STATIC DATA — no database needed for Phase 1
│   ├── /listings/listings.json
│   ├── /testimonials/testimonials.json
│   ├── /neighborhoods/tarrytown.md
│   ├── /neighborhoods/westlake.md
│   ├── /neighborhoods/hyde-park.md
│   └── /blog/[post].mdx
│
├── /public                               // STATIC ASSETS
│   ├── /images
│   └── /icons
│
├── next.config.ts                        // Image domains, redirects, bundle config
├── tailwind.config.ts                    // Theme tokens, content paths
├── tsconfig.json                         // Paths — sets @/ alias
└── .env.local                           // Secrets — never committed to git
```

---

# ═══════════════════════════════════════════════════

# SLICE INDEX

# ═══════════════════════════════════════════════════

```
GROUP A — FOUNDATION
  SLICE-01  Project Setup + Install
  SLICE-02  Config Files (agent + region)
  SLICE-03  TypeScript Types + Interfaces

GROUP B — LAYOUT SHELL
  SLICE-04  Header Component
  SLICE-05  Footer Component
  SLICE-06  Mobile Sticky Bottom Bar + Root Layout

GROUP C — DATA LAYER
  SLICE-07  listings.json (15 properties — Sarah Chen demo)
  SLICE-08  testimonials.json + agent stats
  SLICE-09  neighborhoods data files (3 neighborhoods)

GROUP D — HOMEPAGE
  SLICE-10  Hero Section + Stats Strip
  SLICE-11  Featured Listings Grid + 3-Card CTA + About Teaser
  SLICE-12  Testimonials Carousel + Press Strip + Newsletter
  SLICE-13  Neighborhood Grid + Blog Teasers + Homepage Assembly

GROUP E — LISTINGS SYSTEM
  SLICE-14  Listings Page + Filter Bar + Sort
  SLICE-15  Property Card Component
  SLICE-16  Map View (Leaflet) + Grid/Map Toggle
  SLICE-17  Save Search Modal (email capture)
  SLICE-18  Single Property Page — Top Section + Gallery
  SLICE-19  Single Property Page — Details + Tools + Lead Forms

GROUP F — TOOLS
  SLICE-20  Mortgage Calculator Component
  SLICE-21  Home Valuation Form (3-step wizard)

GROUP G — CORE PAGES
  SLICE-22  Buy Page
  SLICE-23  Sell Page
  SLICE-24  About Page
  SLICE-25  Contact Page

GROUP H — NEIGHBORHOOD SYSTEM
  SLICE-26  Neighborhood Template Component
  SLICE-27  3 Neighborhood Pages + Hub Page

GROUP I — BLOG SYSTEM
  SLICE-28  MDX Setup + Blog Index Page
  SLICE-29  Single Blog Post Template + 3 Sample Posts

GROUP J — SECONDARY PAGES
  SLICE-30  Testimonials Full Page
  SLICE-31  Market Report Subscription Page + Open Houses Page

GROUP K — FORMS + INTEGRATIONS
  SLICE-32  EmailJS Integration (all forms wired)
  SLICE-33  Crisp Chat Widget + After-Hours Config

GROUP L — SEO + ANALYTICS
  SLICE-34  Google Analytics 4 + Meta Pixel
  SLICE-35  Schema Markup (JSON-LD) + Sitemap + Open Graph

GROUP M — COMPLIANCE + LEGAL
  SLICE-36  Cookie Consent Banner + Privacy Policy + Terms + MLS Disclaimer

GROUP N — PERFORMANCE + FINAL
  SLICE-37  Image Optimization + Lighthouse Pass
  SLICE-38  ENV Setup + Vercel Deployment
  SLICE-39  Demo Data Final Population (Sarah Chen)
```

---

# ═══════════════════════════════════════════════════

# GROUP A — FOUNDATION

# ═══════════════════════════════════════════════════

---

## SLICE-01 — PROJECT SETUP + INSTALL

**Depends on:** Nothing (first slice)
**Creates:** Project scaffold, all dependencies installed, folder structure
**IDE Time:** ~5 minutes (mostly waiting for installs)

### PASTE THIS INTO YOUR IDE:

```
Create a new Next.js 14 real estate agent website project.

Run these commands in order:

1. npx create-next-app@latest real-estate-template --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*"

2. cd real-estate-template

3. npx shadcn@latest init
   When prompted:
   - Style: Default
   - Base color: Stone
   - CSS variables: Yes

4. npx shadcn@latest add button card input label select sheet dialog dropdown-menu badge separator tabs form toast carousel accordion

5. npm install framer-motion react-hook-form zod @hookform/resolvers @emailjs/browser react-leaflet leaflet @types/leaflet next-mdx-remote gray-matter next-sitemap react-cookie-consent embla-carousel-react react-intersection-observer @next/third-parties sharp

6. Create these empty folders (Jacob Rajan standard structure):

   // DOMAIN LAYER — features
   /features/home/components
   /features/listings/components
   /features/neighborhoods/components
   /features/blog/components
   /features/tools/components
   /features/valuation/components
   /features/contact/components

   // SHARED UI
   /components/layout

   // INFRASTRUCTURE
   /lib
   /hooks
   /types
   /constants

   // CONFIG + DATA
   /config
   /content/listings
   /content/testimonials
   /content/neighborhoods
   /content/blog

7. In next.config.ts, add:
   images: {
     domains: ['res.cloudinary.com', 'images.unsplash.com'],
     formats: ['image/avif', 'image/webp'],
   }

8. In tsconfig.json, verify these path aliases exist:
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"]
       }
     }
   }

9. Verify the dev server starts: npm run dev
   Expected: Next.js 14 running on localhost:3000
```

---

## SLICE-02 — CONFIG FILES

**Depends on:** SLICE-01
**Creates:** `/config/agent.config.ts` and `/config/region.config.ts`
**Purpose:** Every component reads from these. Nothing is hardcoded.

### PASTE THIS INTO YOUR IDE:

```
Create two TypeScript config files.

FILE 1: /config/agent.config.ts

This file holds ALL per-client data. Every string a client
would want to change. Structure it exactly like this:

export const agentConfig = {
  // Identity
  name: "Sarah Chen",
  title: "REALTOR® | Luxury Property Specialist",
  licenseNumber: "TX#0548291",
  brokerage: "Austin Luxury Realty Group",

  // Contact
  phone: "(512) 555-0147",
  phoneRaw: "+15125550147",
  email: "sarah@sarahchenrealty.com",
  address: "1200 S Congress Ave, Suite 400, Austin, TX 78704",

  // Brand
  colors: {
    primary: "#1a2744",      // deep navy
    accent: "#c9a96e",       // warm gold
    background: "#f9f6f0",   // warm white
    text: "#1a1a1a",
    muted: "#6b7280",
  },

  // Stats (homepage social proof strip)
  stats: {
    careerSalesVolume: "$142M",
    homesSold: 284,
    yearsExperience: 12,
    googleRating: 4.9,
    reviewCount: 127,
    avgDaysOnMarket: 28,
    listToSaleRatio: "101.2%",
  },

  // Bio (used on homepage teaser + about page)
  shortBio: "Austin's most trusted luxury real estate specialist with $142M in career sales and 12 years serving Tarrytown, Westlake, and Hyde Park.",
  fullBioFile: "sarah-chen-bio",

  // Social media links
  social: {
    facebook: "https://facebook.com/sarahchenrealty",
    instagram: "https://instagram.com/sarahchenrealty",
    linkedin: "https://linkedin.com/in/sarahchenrealty",
    youtube: "https://youtube.com/@sarahchenrealty",
  },

  // Photos (store in /public/images/)
  headshot: "/images/agent-headshot.jpg",
  headshotAlt: "Sarah Chen, Austin REALTOR®",

  // Markets served
  markets: ["Tarrytown", "Westlake", "Hyde Park", "Barton Hills", "Travis Heights"],

  // Press mentions
  press: [
    { name: "Austin Business Journal", url: "#" },
    { name: "Wall Street Journal", url: "#" },
    { name: "Inman News", url: "#" },
    { name: "RealTrends", url: "#" },
  ],

  // IDX / Listings
  idxEnabled: true,
  idxEmbedUrl: "",  // Showcase IDX embed URL goes here when client signs up

  // Calendly or booking link
  bookingUrl: "https://calendly.com/sarahchenrealty",

  // SEO
  siteUrl: "https://sarahchenrealty.com",
  siteTitle: "Sarah Chen | Austin REALTOR® | Luxury Property Specialist",
  siteDescription: "Austin's top luxury real estate agent. $142M in career sales. Serving Tarrytown, Westlake, Hyde Park. Get your free home valuation today.",

  // Google Analytics + Meta Pixel
  ga4MeasurementId: "G-XXXXXXXXXX",
  metaPixelId: "XXXXXXXXXXXXXXXX",

  // EmailJS
  emailjsServiceId: "service_XXXXXXX",
  emailjsPublicKey: "XXXXXXXXXXXXXXX",
  emailjsTemplates: {
    contact: "template_contact",
    valuation: "template_valuation",
    showing: "template_showing",
    newsletter: "template_newsletter",
  },

  // Crisp Chat
  crispWebsiteId: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
}

export type AgentConfig = typeof agentConfig

---

FILE 2: /config/region.config.ts

This file holds ALL per-region settings.
The entire site adapts when you change the "activeRegion" value.

export type Region = "US" | "AU" | "CA" | "UK"

export const regionConfigs = {
  US: {
    currency: "USD",
    symbol: "$",
    areaUnit: "sqft",
    areaLabel: "sq ft",
    agentTitle: "REALTOR®",
    listingPlatform: "MLS",
    idxEnabled: true,
    schoolRating: "GreatSchools",
    phoneFormat: "+1 (XXX) XXX-XXXX",
    mortgageTerms: [15, 30],
    compliance: "Licensed by [State] Real Estate Commission. MLS® data provided by [Local Board].",
    fairHousingRequired: true,
    language: "en",
  },
  AU: {
    currency: "AUD",
    symbol: "A$",
    areaUnit: "sqm",
    areaLabel: "m²",
    agentTitle: "Licensed Real Estate Agent",
    listingPlatform: "REA / Domain",
    idxEnabled: false,
    schoolRating: "MySchool.edu.au",
    phoneFormat: "+61 4XX XXX XXX",
    mortgageTerms: [25, 30],
    compliance: "Licensed under [State] Property, Stock & Business Agents Act. Listings sourced from [Provider].",
    fairHousingRequired: false,
    language: "en-AU",
  },
  CA: {
    currency: "CAD",
    symbol: "C$",
    areaUnit: "sqft",
    areaLabel: "sq ft",
    agentTitle: "REALTOR®",
    listingPlatform: "CREA / MLS®",
    idxEnabled: true,
    schoolRating: "Fraser Institute School Rankings",
    phoneFormat: "+1 (XXX) XXX-XXXX",
    mortgageTerms: [20, 25],
    compliance: "Member of CREA. MLS® data provided under license from [Local Board].",
    fairHousingRequired: true,
    language: "en-CA",
  },
  UK: {
    currency: "GBP",
    symbol: "£",
    areaUnit: "sqft",
    areaLabel: "sq ft",
    agentTitle: "Estate Agent",
    listingPlatform: "Rightmove / Zoopla",
    idxEnabled: false,
    schoolRating: "Ofsted",
    phoneFormat: "+44 XXXX XXXXXX",
    mortgageTerms: [25, 35],
    compliance: "Member of NAEA Propertymark. Licensed under Estate Agents Act 1979.",
    fairHousingRequired: false,
    language: "en-GB",
  },
}

// CHANGE THIS ONE VALUE TO SWITCH REGIONS
export const activeRegion: Region = "US"

export const region = regionConfigs[activeRegion]

export type RegionConfig = typeof regionConfigs.US
```

---

## SLICE-03 — TYPESCRIPT TYPES + INTERFACES

**Depends on:** SLICE-01, SLICE-02
**Creates:** `/types/index.ts`
**Purpose:** Shared types used by every component. Define once, use everywhere.
**Import path:** `import type { Property } from '@/types'`

### PASTE THIS INTO YOUR IDE:

```
Create /types/index.ts with all shared TypeScript interfaces
used across the real estate website.

This is the single source of truth for all types.
Import from '@/types' in any component or page.

Include these exact interfaces:

// PROPERTY / LISTING
export interface Property {
  id: string
  slug: string
  status: "Active" | "Under Contract" | "Sold" | "Coming Soon" | "Price Reduced"
  listingType: "For Sale" | "For Rent" | "Sold"
  price: number
  address: {
    street: string
    city: string
    state: string
    zip: string
    neighborhood: string
    lat?: number
    lng?: number
  }
  details: {
    beds: number
    baths: number
    halfBaths?: number
    sqft: number
    lotSize?: number
    yearBuilt: number
    garage?: number
    stories?: number
    propertyType: "Single Family" | "Condo" | "Townhouse" | "Multi-Family" | "Land"
  }
  financials: {
    hoaFee?: number
    propertyTax?: number
    mlsNumber?: string
  }
  description: string
  features: string[]
  photos: string[]       // array of image URLs
  virtualTourUrl?: string
  openHouse?: {
    date: string
    time: string
  }
  daysOnMarket: number
  listedDate: string
}

// TESTIMONIAL
export interface Testimonial {
  id: string
  authorName: string
  authorPhoto?: string
  role: "Buyer" | "Seller" | "Both"
  rating: number          // 1–5
  text: string
  date: string
  neighborhood?: string
  source: "Google" | "Zillow" | "Direct"
  featured: boolean
}

// NEIGHBORHOOD
export interface Neighborhood {
  id: string
  slug: string
  name: string
  city: string
  state: string
  heroImage: string
  tagline: string
  description: string
  stats: {
    avgPrice: number
    pricePerSqft: number
    avgDaysOnMarket: number
    activeListings: number
    yoyChange: number     // percentage
  }
  highlights: string[]
  schools: {
    elementary?: string
    middle?: string
    high?: string
    rating?: number
  }
  walkScore?: number
  transitScore?: number
  bikeScore?: number
  lat: number
  lng: number
}

// BLOG POST
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: "Market Update" | "Buyer Guide" | "Seller Guide" | "Neighborhood" | "Tips"
  coverImage: string
  author: string
  featured: boolean
  content?: string    // MDX content
}

// PRESS MENTION
export interface PressMention {
  name: string
  logo?: string
  url: string
  quote?: string
}

// FORM SUBMISSIONS (for EmailJS)
export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  message: string
}

export interface ValuationFormData {
  // Step 1
  street: string
  city: string
  state: string
  zip: string
  // Step 2
  propertyType: string
  beds: string
  baths: string
  sqft: string
  yearBuilt: string
  condition: string
  updates: string[]
  // Step 3
  name: string
  email: string
  phone: string
  timing: "ASAP" | "1-3 months" | "3-6 months" | "Just curious"
}

export interface ShowingRequestData {
  name: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  message?: string
  propertyAddress: string
  mlsNumber?: string
}

export interface SaveSearchData {
  email: string
  firstName: string
  frequency: "Instant" | "Daily" | "Weekly"
  searchQuery: string
}

// NAVIGATION
export interface NavItem {
  label: string
  href?: string
  children?: NavItem[]
}
```

---

# ═══════════════════════════════════════════════════

# GROUP B — LAYOUT SHELL

# ═══════════════════════════════════════════════════

---

## SLICE-04 — HEADER COMPONENT

**Depends on:** SLICE-01, SLICE-02, SLICE-03
**Creates:** `/components/layout/Header.tsx`
**Reference:** V2 MD Section 3.1 — Navigation & Global Layout

### PASTE THIS INTO YOUR IDE:

```
Create /components/layout/Header.tsx

This is a sticky navigation header for a real estate agent website.
It reads ALL data from agentConfig in /config/agent.config.ts.
Nothing is hardcoded.

Import types from '@/types' (not '@/lib/types').

REQUIREMENTS:

1. DESKTOP LAYOUT (lg: and above):
   - Sticky header (position: sticky, top: 0, z-index: 50)
   - Left: Logo (agent name in brand font or logo image)
   - Center: Navigation with dropdown menus
   - Right: Phone number (click-to-call href="tel:") + CTA button

2. NAVIGATION DROPDOWNS (5 items):
   a) BUY dropdown:
      - Find a Home → /listings
      - Buyer's Guide → /buy
      - Mortgage Calculator → /calculator
      - First-Time Buyer Resources → /buy#resources

   b) SELL dropdown:
      - What's My Home Worth? → /valuation
      - Seller's Guide → /sell
      - Marketing Presentation → /sell#marketing
      - Recent Sales → /listings?status=sold

   c) SEARCH dropdown:
      - Search All Listings → /listings
      - Map Search → /listings?view=map
      - Open Houses → /listings?type=openhouse
      - New Developments → /listings?type=new

   d) AREAS dropdown:
      - Dynamically generated from agentConfig.markets array
      - Each item → /neighborhoods/[market-slug]
      - Last item: View All Neighborhoods → /neighborhoods

   e) ABOUT dropdown:
      - Meet [agentConfig.name] → /about
      - Meet The Team → /about#team
      - Press & Media → /about#press
      - Client Reviews → /testimonials

3. MOBILE LAYOUT (below lg:):
   - Logo on left
   - Hamburger menu icon on right (lucide-react Menu icon)
   - Full-screen slide-in drawer (shadcn Sheet component)
   - All nav items as accordion (shadcn Accordion)
   - Phone number + CTA button at bottom of drawer

4. VISUAL REQUIREMENTS:
   - Background: white with subtle bottom border
   - On scroll > 50px: add box shadow
   - Active page: accent color indicator
   - CTA button: agentConfig.colors.accent background
   - Font: system-ui or next/font/google (Geist or similar)

5. CTA BUTTON:
   Label: "Schedule a Call"
   Link: agentConfig.bookingUrl
   Opens in new tab

6. PHONE DISPLAY:
   Show: agentConfig.phone
   href: tel: + agentConfig.phoneRaw
   Include phone icon (lucide Phone icon)

Use 'use client' directive.
Use framer-motion for dropdown animations (fadeIn + slideDown).
Use shadcn Sheet for mobile drawer.
Use shadcn DropdownMenu for desktop dropdowns.
All colors from agentConfig.colors — no hardcoded hex values.
```

---

## SLICE-05 — FOOTER COMPONENT

**Depends on:** SLICE-02, SLICE-03
**Creates:** `/components/layout/Footer.tsx`
**Reference:** V2 MD Section 3.1 — Footer spec

### PASTE THIS INTO YOUR IDE:

```
Create /components/layout/Footer.tsx

A full real estate agent website footer.
Reads ALL data from agentConfig and region (from /config/).

LAYOUT: 4-column grid on desktop, stacked on mobile.

COLUMN 1 — Brand:
  - Logo / Agent name (large)
  - Short tagline from agentConfig.shortBio (truncated to 2 lines)
  - Social media icons: Facebook, Instagram, LinkedIn, YouTube
    Each links to agentConfig.social.[platform]
    Use lucide-react icons (Facebook → ExternalLink fallback)

COLUMN 2 — Quick Links:
  Heading: "Quick Links"
  Links:
    - Search Homes → /listings
    - What's My Home Worth? → /valuation
    - Buy a Home → /buy
    - Sell Your Home → /sell
    - Mortgage Calculator → /calculator

COLUMN 3 — Explore:
  Heading: "Explore"
  Links:
    - About [agentConfig.name] → /about
    - Client Testimonials → /testimonials
    - Blog & Market News → /blog
    - Neighborhoods → /neighborhoods
    - Contact Us → /contact

COLUMN 4 — Contact:
  Heading: "Contact"
  - agentConfig.address (with map pin icon)
  - agentConfig.phone (with phone icon, click-to-call)
  - agentConfig.email (with mail icon, click-to-email)
  - CTA Button: "Schedule a Call" → agentConfig.bookingUrl

BOTTOM BAR (full width, below columns):
  Left side:
    - "© [current year] [agentConfig.name]. All Rights Reserved."
    - "License #[agentConfig.licenseNumber]"
    - "[agentConfig.brokerage]"

  Right side (links):
    - Privacy Policy → /privacy-policy
    - Terms of Service → /terms
    - Cookie Policy → /privacy-policy#cookies

  MLS DISCLAIMER (if region.idxEnabled is true):
    Full-width text below bottom bar:
    region.compliance string from region.config.ts
    Small font, muted color.

  FAIR HOUSING (if region.fairHousingRequired is true):
    Equal Housing Opportunity logo placeholder + text

STYLING:
  Background: agentConfig.colors.primary (dark navy)
  Text: white / white-70 for secondary
  Accent: agentConfig.colors.accent for hover states
  Responsive: stack columns at md: breakpoint
```

---

## SLICE-06 — MOBILE STICKY BOTTOM BAR + ROOT LAYOUT

**Depends on:** SLICE-04, SLICE-05
**Creates:** `/components/layout/MobileBottomBar.tsx` and `/app/layout.tsx`
**Reference:** V2 MD Section 3.1 — Mobile sticky bottom bar

### PASTE THIS INTO YOUR IDE:

```
TASK 1: Create /components/layout/MobileBottomBar.tsx

A sticky bar that appears at the bottom of the screen on
MOBILE ONLY (hidden on lg: and above). Always visible while scrolling.

Layout: Two equal-width buttons side by side.

LEFT BUTTON:
  - Icon: Phone (lucide-react)
  - Label: "Call Now"
  - Action: href="tel:[agentConfig.phoneRaw]"
  - Background: agentConfig.colors.primary

RIGHT BUTTON:
  - Icon: Calendar (lucide-react)
  - Label: "Schedule Call"
  - Action: href=[agentConfig.bookingUrl], target="_blank"
  - Background: agentConfig.colors.accent

Styling:
  - Fixed position, bottom: 0, left: 0, right: 0
  - z-index: 100 (above everything)
  - Only visible below lg: breakpoint (hidden lg:hidden)
  - Box shadow: 0 -2px 10px rgba(0,0,0,0.1)
  - Height: 64px
  - Touch targets minimum 48px

---

TASK 2: Update /app/layout.tsx

Set up the root layout that wraps every page.
Import and use: Header, Footer, MobileBottomBar from /components/layout/.

Requirements:
1. Import next/font/google — use "Geist" or "Inter" as body font
2. Apply font as CSS variable to <html> element
3. Set metadata from agentConfig:
   - title: agentConfig.siteTitle
   - description: agentConfig.siteDescription
   - canonical URL
   - Open Graph (title, description, url, type: website)
   - Twitter card: summary_large_image
4. Layout structure:
   <html>
     <body>
       <Header />
       <main>{children}</main>
       <Footer />
       <MobileBottomBar />
     </body>
   </html>
5. Add a "scroll to top" behavior on route change
6. Background color: agentConfig.colors.background
7. Text color: agentConfig.colors.text
```

---

# ═══════════════════════════════════════════════════

# GROUP C — DATA LAYER

# ═══════════════════════════════════════════════════

---

## SLICE-07 — LISTINGS DATA (listings.json)

**Depends on:** SLICE-03
**Creates:** `/content/listings/listings.json`
**Purpose:** 15 realistic Austin properties for Sarah Chen demo site

### PASTE THIS INTO YOUR IDE:

```
Create /content/listings/listings.json

Generate 15 realistic real estate property listings for
Sarah Chen's demo site in Austin, Texas.

RULES:
- Use realistic Austin neighborhood names: Tarrytown, Westlake,
  Hyde Park, Barton Hills, Travis Heights, South Congress,
  Clarksville, Bryker Woods, Rosedale, Bouldin Creek
- Mix of property types: Single Family (10), Condo (3), Townhouse (2)
- Price range: $485,000 to $2,850,000
- Bedrooms: 2–6
- Bathrooms: 1–5
- Sqft: 950–5,200
- Year built: 1948–2024
- Status mix: 10 Active, 2 Under Contract, 2 Sold, 1 Coming Soon
- Each listing needs 6–8 realistic photo URLs
  (use Unsplash URLs for houses: https://images.unsplash.com/
   photo-[realistic-house-photo-id]?w=800&q=80)
- Every listing needs a unique slug (e.g., "4br-tarrytown-1234-oak-st")
- Include lat/lng coordinates for map view (Austin area)
- Include realistic MLS numbers (format: AUS-2026-XXXXX)
- Include realistic features arrays (10–15 items each)
  e.g., "Hardwood floors", "Updated kitchen", "Pool", "2-car garage"

Use the Property TypeScript interface from /types/index.ts exactly.
Export as a JSON array of 15 Property objects.

Include one property with virtual tour URL and open house data.
```

---

## SLICE-08 — TESTIMONIALS + AGENT STATS DATA

**Depends on:** SLICE-03
**Creates:** `/content/testimonials/testimonials.json`

### PASTE THIS INTO YOUR IDE:

```
Create /content/testimonials/testimonials.json

Generate 12 realistic client testimonials for Sarah Chen,
Austin luxury real estate agent.

RULES:
- Mix: 7 Buyers, 3 Sellers, 2 Both
- All ratings: 5 stars
- Source mix: 8 Google, 3 Zillow, 1 Direct
- Dates: spread across 2024–2026
- 4 marked as featured: true (these appear on homepage carousel)
- Each testimonial: 3–5 sentences, specific details
  (mention: neighborhoods, price ranges, market conditions,
   specific things Sarah did, outcomes achieved)
- Include author names that feel real and diverse
- Neighborhoods mentioned: Tarrytown, Westlake, Hyde Park,
  Barton Hills, Travis Heights
- Seller testimonials: mention days on market, sale price result
- Buyer testimonials: mention competition, offer strategy, timeline

Use the Testimonial TypeScript interface from /types/index.ts.
Export as a JSON array.
```

---

## SLICE-09 — NEIGHBORHOODS DATA

**Depends on:** SLICE-03
**Creates:**
`/content/neighborhoods/tarrytown.md`
`/content/neighborhoods/westlake.md`
`/content/neighborhoods/hyde-park.md`

### PASTE THIS INTO YOUR IDE:

```
Create 3 neighborhood Markdown files for Sarah Chen's Austin demo.

Each file uses YAML frontmatter matching the Neighborhood TypeScript
interface from /types/index.ts, followed by long-form markdown content.

---

FILE 1: /content/neighborhoods/tarrytown.md

Frontmatter:
  id: tarrytown
  slug: tarrytown
  name: Tarrytown
  city: Austin
  state: TX
  heroImage: /images/neighborhoods/tarrytown-hero.jpg
  tagline: "Austin's Most Coveted Address"
  stats:
    avgPrice: 1850000
    pricePerSqft: 645
    avgDaysOnMarket: 21
    activeListings: 14
    yoyChange: 4.2
  highlights:
    - Walk to Lake Austin waterfront
    - Top-rated AISD schools
    - Tree-lined streets with century-old oaks
    - 10 minutes to downtown Austin
    - Mix of historic estates and new construction
  schools:
    elementary: Casis Elementary (GreatSchools: 9/10)
    middle: O. Henry Middle School
    high: Austin High School
    rating: 9
  walkScore: 62
  transitScore: 38
  bikeScore: 71
  lat: 30.2973
  lng: -97.7701

Content (after frontmatter, min 600 words):
  Write genuine neighborhood description covering:
  - History and character
  - Real estate market overview
  - What to love (detailed)
  - Lifestyle description (morning to evening Saturday narrative)
  - Best local restaurants, coffee shops, boutiques (make realistic names)
  - School details
  - Why Sarah loves working in this neighborhood

---

FILE 2: /content/neighborhoods/westlake.md
Similar structure. Westlake Hills / Eanes ISD area.
Avg price: $2,200,000. Focus on top-ranked schools,
private community feel, luxury new builds.
lat: 30.2837, lng: -97.8236

---

FILE 3: /content/neighborhoods/hyde-park.md
Similar structure. Hyde Park Austin.
Avg price: $785,000. Focus on historic bungalows,
walkability, University of Texas proximity, eclectic vibe.
lat: 30.3168, lng: -97.7296
```

---

# ═══════════════════════════════════════════════════

# GROUP D — HOMEPAGE

# ═══════════════════════════════════════════════════

---

## SLICE-10 — HERO SECTION + STATS STRIP

**Depends on:** SLICE-02, SLICE-03, SLICE-06
**Creates:**
`/features/home/components/Hero.tsx`
`/features/home/components/StatsStrip.tsx`
**Reference:** V2 MD Section 3.2 — Homepage Section 1 + Section 2

### PASTE THIS INTO YOUR IDE:

```
Create two homepage section components inside /features/home/components/.

Import types from '@/types'.
Import config from '@/config/agent.config'.

---

COMPONENT 1: /features/home/components/Hero.tsx
'use client' component

LAYOUT:
  Full viewport height (min-h-screen).
  Background: dark overlay (rgba 0,0,0,0.45) over a hero image.
  Use /public/images/hero-bg.jpg as the background.
  Apply object-cover, object-center.

CONTENT (centered on desktop, left-aligned on mobile):
  Top badge: "Austin's #1 Luxury Real Estate Expert" (small pill badge)

  Headline (H1):
    "[agentConfig.name]"
    Subheadline: agentConfig.title
    Both in white. H1 large (text-5xl on desktop, text-3xl mobile).

  Performance sub-text (from agentConfig.stats):
    "$[careerSalesVolume] in Career Sales · [homesSold] Homes Sold"
    Muted white, smaller font.

  TWO CTA BUTTONS (side by side on desktop, stacked on mobile):
    Primary: "Search Austin Homes" → /listings
      Background: agentConfig.colors.accent
      White text

    Secondary: "Get My Home's Value" → /valuation
      Border only (outline style)
      White text and border

  Phone number below buttons:
    Icon: Phone
    Text: agentConfig.phone
    href: tel:agentConfig.phoneRaw
    White color

AGENT PHOTO (desktop only, right side):
  Position absolute or in a flex column layout.
  Show agentConfig.headshot image.
  Subtle circular or organic shape mask.
  Subtle drop shadow.

ANIMATIONS (framer-motion):
  - Headline fades in from bottom (0.5s delay)
  - Sub-text fades in (0.7s delay)
  - Buttons slide up (0.9s delay)
  - Agent photo slides in from right (0.6s delay)

SCROLL INDICATOR:
  Bottom center: animated chevron-down icon
  Fades in after 2 seconds

---

COMPONENT 2: /features/home/components/StatsStrip.tsx
'use client' component

Also create /hooks/useCountUp.ts — a reusable hook that animates
a number from 0 to a target value over a given duration.
This hook is shared and used in StatsStrip and anywhere else
animated counters are needed.

LAYOUT:
  Full-width horizontal bar.
  Background: agentConfig.colors.primary (dark navy)
  Text: white

CONTENT: 5 stats from agentConfig.stats displayed as columns:
  1. "[careerSalesVolume] Career Sales"
  2. "[homesSold]+ Homes Sold"
  3. "[yearsExperience] Years Experience"
  4. "[googleRating]★ Google Rating"
  5. "#1 Austin REALTOR®"

  Each stat: large number on top (text-4xl, accent color),
  label below (text-sm, white-70)

ANIMATION (react-intersection-observer + useCountUp hook):
  When StatsStrip enters viewport:
  Numbers count up from 0 to their value over 2 seconds.

LAYOUT: flex row, evenly spaced, padding-y-12.
Responsive: 2-column grid on mobile, 5 columns on desktop.
```

---

## SLICE-11 — FEATURED LISTINGS + 3-CARD CTA + ABOUT TEASER

**Depends on:** SLICE-07, SLICE-08, SLICE-10
**Creates:**
`/features/home/components/FeaturedListings.tsx`
`/features/home/components/ThreeCardCTA.tsx`
`/features/home/components/AboutTeaser.tsx`
**Reference:** V2 MD Section 3.2 — Homepage Sections 4, 5, 6

### PASTE THIS INTO YOUR IDE:

```
Create three homepage section components inside /features/home/components/.

Import types from '@/types'.
Import config from '@/config/agent.config'.

---

COMPONENT 1: /features/home/components/FeaturedListings.tsx
'use client' component

PURPOSE:
  Show 6 featured property cards from listings.json (Active status only,
  highest price first). Link to /listings for "View All".

LAYOUT:
  Section heading: "Current Listings"
  Subheading: "Exceptional Properties in Austin's Most Sought-After Neighborhoods"
  3-column grid on desktop, 2-column on tablet, 1-column on mobile.
  "View All [count] Listings →" link at bottom right.

PROPERTY CARD (inline, no separate component yet):
  Each card shows:
  - Photo (first photo from photos array) with hover effect (slight zoom)
  - Status badge top-left (color-coded:
      Active = green, Under Contract = orange, Coming Soon = blue)
  - Price (formatted: $1,250,000 — with commas)
  - Address (street + neighborhood)
  - Beds / Baths / Sqft icons in a row
  - "View Details" button on hover overlay
  - "Schedule Showing" link below price
  Card links to /listings/[slug]

DATA: Import from /content/listings/listings.json directly.
Filter: status === "Active", sort by price descending, take first 6.

---

COMPONENT 2: /features/home/components/ThreeCardCTA.tsx

PURPOSE:
  Three conversion cards for Buyers, Sellers, and Valuation.
  This is a critical conversion section — place below featured listings.

LAYOUT:
  3-column grid on desktop, stacked on mobile.
  Background: agentConfig.colors.background (warm white)

CARD 1 — BUYING:
  Icon: Home (lucide)
  Heading: "Buying in Austin?"
  Body: "Find your perfect home with a proven buyer's agent who knows
         every neighborhood, every street, every deal."
  CTA Button: "Explore Buyer Resources" → /buy
  Border: left border in agentConfig.colors.accent

CARD 2 — SELLING:
  Icon: TrendingUp (lucide)
  Heading: "Selling Your Home?"
  Body: "Get top dollar with a marketing system that sells homes
         for more, faster — backed by real data."
  CTA Button: "See How We Sell" → /sell
  Border: left border in agentConfig.colors.accent

CARD 3 — VALUATION:
  Icon: BarChart2 (lucide)
  Heading: "What's My Home Worth?"
  Body: "Get your free, no-obligation home valuation from Austin's
         most data-driven real estate expert."
  CTA Button: "Get Free Valuation" → /valuation
  Background: agentConfig.colors.primary (dark)
  Text: white
  This card is slightly elevated (bigger box-shadow)

---

COMPONENT 3: /features/home/components/AboutTeaser.tsx

PURPOSE:
  Brief intro to the agent. Two-column layout.

LEFT: Agent photo (agentConfig.headshot) with a decorative shape
RIGHT:
  - Eyebrow text: "About [agentConfig.name]"
  - Heading: "Austin's Most Trusted Luxury Real Estate Specialist"
  - Body: agentConfig.shortBio + 1–2 additional sentences
  - 3 credential badges in a row:
      "#1 in Tarrytown" | "Top 1% Statewide" | "12 Years"
  - CTA: "Read My Full Story" → /about

Animate: image slides from left, text slides from right (intersection observer).
```

---

## SLICE-12 — TESTIMONIALS CAROUSEL + PRESS STRIP + NEWSLETTER

**Depends on:** SLICE-08, SLICE-10
**Creates:**
`/features/home/components/TestimonialsCarousel.tsx`
`/features/home/components/PressStrip.tsx`
`/features/home/components/NewsletterSignup.tsx`

### PASTE THIS INTO YOUR IDE:

```
Create three homepage section components inside /features/home/components/.

Import types from '@/types'.
Import config from '@/config/agent.config'.

---

COMPONENT 1: /features/home/components/TestimonialsCarousel.tsx
'use client'

DATA: Import testimonials where featured === true from
      /content/testimonials/testimonials.json (max 4).

LAYOUT:
  Section heading: "What Our Clients Say"
  Sub: "200+ Five-Star Reviews on Google and Zillow"

  Carousel using embla-carousel-react.
  Shows 1 testimonial at a time on mobile,
  2 on tablet, 3 on desktop.

  Each testimonial card:
  - 5 gold stars (⭐ or SVG)
  - Quote text (testimonial.text) in italic
  - Author name (bold) + role badge (Buyer/Seller)
  - Neighborhood + date
  - Source badge (Google / Zillow)

  Navigation: dot indicators below.
  Auto-advance: every 5 seconds.
  Pause on hover.

  "View All [totalCount] Reviews" link → /testimonials

---

COMPONENT 2: /features/home/components/PressStrip.tsx

PURPOSE: Show media/press logos in a scrolling marquee.
Reads from agentConfig.press array.

LAYOUT:
  Eyebrow: "As Seen In"
  Auto-scrolling marquee of press logos (or text if no logo).
  Grayscale on default, full color on hover.
  Infinite loop. CSS animation (no JS needed).

  Below logos: Pull quote from most prestigious mention.
  Example: "[Agent] is consistently ranked among Austin's
   top-producing luxury agents." — Austin Business Journal

---

COMPONENT 3: /features/home/components/NewsletterSignup.tsx
'use client'

LAYOUT:
  Full-width section, background: agentConfig.colors.primary.
  Text: white.

  Centered content:
  Heading: "Stay Ahead of the Austin Market"
  Sub: "Get monthly market reports, new listing alerts, and
        neighborhood insights delivered to your inbox.
        Join 2,400+ Austin homeowners."

  Form (react-hook-form + zod):
  Fields: Email (required, valid email) + First Name (optional)
  Submit button: "Subscribe" (accent color background)

  Below form: "No spam, ever. Unsubscribe anytime."

  On success: Show "You're in! Check your inbox for a welcome email."
  On error: Show "Something went wrong. Please try again."

  Form submission: console.log for now.
  Wire to EmailJS in SLICE-32.
```

---

## SLICE-13 — NEIGHBORHOOD GRID + BLOG TEASERS + HOMEPAGE ASSEMBLY

**Depends on:** SLICE-09, SLICE-10, SLICE-11, SLICE-12
**Creates:**
`/features/home/components/NeighborhoodGrid.tsx`
`/features/home/components/BlogTeasers.tsx`
Updated `/app/page.tsx`
**Reference:** V2 MD Sections 9, 10 of Homepage

### PASTE THIS INTO YOUR IDE:

```
Create two section components and assemble the homepage.

Import types from '@/types'.
Import config from '@/config/agent.config'.

---

COMPONENT 1: /features/home/components/NeighborhoodGrid.tsx
'use server' component (no interactivity needed)

DATA: Import the 3 neighborhood .md files from /content/neighborhoods/
(parse YAML frontmatter only — no need for full content here)

LAYOUT:
  Heading: "Explore Austin Neighborhoods"
  Sub: "Hyperlocal expertise in Austin's most sought-after communities"

  3-column grid on desktop, 2 on tablet, 1 on mobile.

  Each neighborhood card:
  - Full-width photo (neighborhood.heroImage)
  - Overlay gradient (bottom to top, dark to transparent)
  - Neighborhood name (white, bottom-left, bold)
  - Avg price (white, smaller: "From $[avgPrice formatted]")
  - Active listings count: "[activeListings] Active Listings"
  - Click → /neighborhoods/[slug]
  - Hover: slight photo zoom + deepen overlay

  "View All Neighborhoods" link below grid → /neighborhoods

---

COMPONENT 2: /features/home/components/BlogTeasers.tsx
'use server' component

DATA: For now, use 3 hardcoded blog post placeholders:
  Post 1: "Austin Real Estate Market Update — May 2026"
           Category: Market Update, Read time: 5 min
  Post 2: "5 Things Every First-Time Buyer in Austin Must Know"
           Category: Buyer Guide, Read time: 7 min
  Post 3: "Why Tarrytown Homes Sell Faster Than Any Other Austin Neighborhood"
           Category: Neighborhood, Read time: 4 min

LAYOUT:
  Heading: "Market Insights & Resources"
  3-column card grid (1 column on mobile).

  Each card:
  - Cover image (placeholder color block or unsplash URL)
  - Category badge (colored by category)
  - Title (bold, 2-line clamp)
  - Excerpt (3-line clamp, muted text)
  - Read time + date
  - "Read More →" link

  "View All Articles" link → /blog

---

UPDATE /app/page.tsx to assemble the full homepage.

Import ALL section components from their feature folders:
  import Hero from '@/features/home/components/Hero'
  import StatsStrip from '@/features/home/components/StatsStrip'
  import FeaturedListings from '@/features/home/components/FeaturedListings'
  import ThreeCardCTA from '@/features/home/components/ThreeCardCTA'
  import AboutTeaser from '@/features/home/components/AboutTeaser'
  import TestimonialsCarousel from '@/features/home/components/TestimonialsCarousel'
  import PressStrip from '@/features/home/components/PressStrip'
  import NeighborhoodGrid from '@/features/home/components/NeighborhoodGrid'
  import BlogTeasers from '@/features/home/components/BlogTeasers'
  import NewsletterSignup from '@/features/home/components/NewsletterSignup'

Render in this exact order:
1. <Hero />
2. <StatsStrip />
3. <FeaturedListings />
4. <ThreeCardCTA />
5. <AboutTeaser />
6. <TestimonialsCarousel />
7. <PressStrip />
8. <NeighborhoodGrid />
9. <BlogTeasers />
10. <NewsletterSignup />

Add appropriate vertical padding between sections (py-16 or py-24).
Alternate section backgrounds:
  Odd sections: white
  Even sections: agentConfig.colors.background (warm white)
```

---

# ═══════════════════════════════════════════════════

# GROUP E — LISTINGS SYSTEM

# ═══════════════════════════════════════════════════

---

## SLICE-14 — LISTINGS PAGE + FILTER BAR + SORT

**Depends on:** SLICE-07, SLICE-03
**Creates:** `/app/listings/page.tsx` and `/features/listings/components/ListingFilters.tsx`
**Reference:** V2 MD Section 3.3 — Listings System

### PASTE THIS INTO YOUR IDE:

```
Create the main listings search page and its filter system.

Import types from '@/types'.

FILE 1: /features/listings/components/ListingFilters.tsx
'use client' component

PURPOSE: A sticky filter bar above the listings grid.

FILTERS TO IMPLEMENT:
  a) Location (text input — searches address + neighborhood)
  b) Price Range (two number inputs: min and max)
  c) Bedrooms (select: Any / 1+ / 2+ / 3+ / 4+ / 5+)
  d) Bathrooms (select: Any / 1+ / 2+ / 3+ / 4+)
  e) Property Type (select: Any / Single Family / Condo / Townhouse /
                            Multi-Family / Land)
  f) Status (select: All / Active / Under Contract / Sold / Coming Soon)
  g) "More Filters" toggle button — expands to show:
       - Square footage range (min/max inputs)
       - Year built range
       - Garage spaces (Any / 1+ / 2+)
       - Features checkboxes:
           Pool, Waterfront, New Construction, Open House, Virtual Tour

SORT DROPDOWN (right side):
  Options: Newest · Price (High→Low) · Price (Low→High) ·
           Sq Ft · Days on Market

ACTIVE FILTER PILLS:
  Show active filters as dismissible pill badges below the main bar.
  "Clear All Filters" button when any filter is active.

URL PARAMS:
  All filter state syncs to URL params using useSearchParams.
  Example: /listings?beds=3&priceMin=500000&status=Active
  This makes searches shareable and browser-back-navigable.

---

FILE 2: /app/listings/page.tsx
'use client' page

Import ListingFilters from '@/features/listings/components/ListingFilters'
Import PropertyCard from '@/features/listings/components/PropertyCard' (SLICE-15)

LAYOUT:
  Page title: "Search Austin Homes For Sale"
  <ListingFilters /> (sticky, stays at top while scrolling listings)

  Results header: "Showing [count] homes for sale in Austin, TX"
  Sort dropdown (repeated here inline for clarity)

  VIEW TOGGLE buttons: [Grid ▦] [Map 🗺] (Map connects in SLICE-16)

  Default view: Grid of <PropertyCard /> components (SLICE-15)

  EMPTY STATE (if no results):
    "No homes match your current filters."
    "Try adjusting your search criteria or view all listings."
    [Clear All Filters] button

  PAGINATION or LOAD MORE:
    Show first 12 listings.
    "Load More Listings" button at bottom.
    On click: show next 12.

DATA: Import all listings from /content/listings/listings.json.
Apply all active filters from URL params.
```

---

## SLICE-15 — PROPERTY CARD COMPONENT

**Depends on:** SLICE-03, SLICE-07
**Creates:** `/features/listings/components/PropertyCard.tsx`
**Reference:** V2 MD Section 3.3 — Property Card spec

### PASTE THIS INTO YOUR IDE:

```
Create /features/listings/components/PropertyCard.tsx
'use client' component

This is the most-used component in the app.
It appears on: homepage, listings page, neighborhood pages,
single property "similar listings", blog sidebar.

Import types from '@/types'.

PROPS: property: Property (from '@/types')

CARD STRUCTURE (from top to bottom):

1. IMAGE AREA:
   - Aspect ratio: 16/9
   - Show property.photos[0] as default
   - On mouse enter: cycle through photos[0], photos[1], photos[2]
     every 1.2 seconds (simple setInterval in useEffect)
   - On mouse leave: reset to photos[0]
   - next/image with fill + object-cover
   - Lazy loading enabled

   STATUS BADGE (top-left overlay):
     Active = green background
     Under Contract = orange background
     Coming Soon = blue background
     Sold = gray background
     Text: property.status

   SAVE BUTTON (top-right overlay):
     Heart icon (lucide Heart)
     On click: toggle saved state (localStorage key: "savedListings")
     Filled heart if saved, outline if not

   VIRTUAL TOUR badge (if property.virtualTourUrl exists):
     Small "3D Tour" badge bottom-left

2. DETAILS AREA (below image, card body):
   Price: $[formatted price] — bold, large
   If status === "Sold": show "Sold: $[price]" with strikethrough style

   Address: property.address.street
   Neighborhood: property.address.neighborhood — muted, smaller

   Stats row (icons + values):
     🛏 [beds] bd  |  🚿 [baths] ba  |  📐 [sqft] sq ft

   Days on market: "Listed [daysOnMarket] days ago" (muted, small)
   MLS number: "#[mlsNumber]" (tiny, muted)

3. CARD FOOTER:
   Two buttons:
   LEFT: "View Details" → links to /listings/[slug]
         full card is also clickable → same destination
   RIGHT: "Schedule Tour" → opens showing request (SLICE-19)

HOVER STATE:
  Card lifts (translateY(-4px) + stronger box shadow)
  Transition: 0.2s ease

RESPONSIVE:
  Works in 1, 2, or 3 column grids.
  Adapts padding + font sizes.

SKELETON LOADING STATE:
  When property data is loading, show a gray pulse skeleton
  matching the card dimensions. Use Tailwind animate-pulse.
```

---

## SLICE-16 — MAP VIEW + GRID/MAP TOGGLE

**Depends on:** SLICE-14, SLICE-15
**Creates:** `/features/listings/components/MapView.tsx`
**Reference:** V2 MD Section 3.3 — Map View spec

### PASTE THIS INTO YOUR IDE:

```
Create /features/listings/components/MapView.tsx
'use client' component (Leaflet requires browser APIs)

Import types from '@/types'.

IMPORTANT: Leaflet cannot run server-side.
Use dynamic import with ssr: false in the parent:
  const MapView = dynamic(
    () => import('@/features/listings/components/MapView'),
    { ssr: false }
  )

PROPS:
  properties: Property[]
  onPropertySelect: (property: Property) => void

MAP SETUP:
  Library: react-leaflet + leaflet
  Default center: [30.2672, -97.7431] (Austin, TX)
  Default zoom: 12
  Tile layer: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
  Attribution: © OpenStreetMap contributors
  Height: calc(100vh - 180px) on desktop, 60vh on mobile

MARKERS:
  For each property that has address.lat + address.lng:
  - Custom marker icon (color-coded by status):
      Active = green pin, Under Contract = orange pin,
      Sold = gray pin, Coming Soon = blue pin
  - Click marker → open popup

  POPUP ON CLICK:
  Width: 280px
  Shows:
    - Property photo (first from photos array, 100% width)
    - Price (bold)
    - Address
    - Beds / Baths / Sqft (single line)
    - "View Details" link → /listings/[slug]
    - "Schedule Tour" link

CLUSTER:
  When multiple properties are very close (< 50m apart),
  show a cluster circle with count number.
  Use leaflet.markercluster or manual distance grouping.

---

UPDATE /app/listings/page.tsx:

Add Grid/Map toggle functionality:
  State: viewMode = 'grid' | 'map'

  [▦ Grid] button active when viewMode === 'grid'
  [🗺 Map] button active when viewMode === 'map'

  When viewMode === 'map':
    Show <MapView properties={filteredProperties} />
    Hide the grid
    Show a side panel (desktop) or collapsible list (mobile)
    with filtered properties as compact list items

  When viewMode === 'grid':
    Show the normal <PropertyCard /> grid
    Hide the map
```

---

## SLICE-17 — SAVE SEARCH MODAL

**Depends on:** SLICE-14, SLICE-03
**Creates:** `/features/listings/components/SaveSearchModal.tsx`
**Reference:** V2 MD Section 7.2 — Form #2 (Save Search)

### PASTE THIS INTO YOUR IDE:

```
Create /features/listings/components/SaveSearchModal.tsx
'use client' component using shadcn Dialog

Import types from '@/types'.
Import config from '@/config/agent.config'.

TRIGGER:
  "💾 Save This Search" button in the listings page filter area.
  Also auto-appears after a user has scrolled through 6+ listings
  (based on a count state in listings page). Auto-appear once per session
  (use sessionStorage to track).

MODAL CONTENT:
  Title: "Save This Search"
  Subtitle: "Get notified when new homes match your criteria"

  Show a summary of active filters:
  "You're searching for: 3+ bed homes in Austin, $500K–$1.2M"
  (dynamically built from current URL params)

  FORM (react-hook-form + zod):
  Field 1: Email (required, valid email format)
  Field 2: First Name (optional)
  Field 3: Alert frequency (radio buttons):
    ○ Instant (as soon as a match is listed)
    ○ Daily digest
    ○ Weekly summary

  SUBMIT BUTTON: "Create My Search Alert"
  Background: agentConfig.colors.accent

  BELOW FORM:
  "No spam, ever. Unsubscribe anytime."
  Small lock icon + "Your info is private and secure."

  ON SUCCESS:
  Replace form with:
  ✅ "You're all set, [firstName]!"
  "We'll email you at [email] when new homes match your search."
  Close button.

  ON ERROR:
  Show error message inline below submit button.

FORM SUBMISSION:
  console.log for now.
  Wire to EmailJS in SLICE-32.
```

---

## SLICE-18 — SINGLE PROPERTY PAGE (TOP SECTION)

**Depends on:** SLICE-07, SLICE-03, SLICE-15
**Creates:**
`/app/listings/[slug]/page.tsx` (skeleton)
`/features/listings/components/PropertyGallery.tsx`
**Reference:** V2 MD Section 3.3 — Single Property Page spec

### PASTE THIS INTO YOUR IDE:

```
Create the single property page (part 1 of 2).

Import types from '@/types'.

---

FILE 1: /features/listings/components/PropertyGallery.tsx
'use client' component

PURPOSE: Full-width photo gallery with lightbox for a single property.

PROPS: photos: string[], propertyAddress: string

GALLERY LAYOUT:
  Desktop: Featured large photo (left, 60% width) +
           2x2 grid of smaller photos (right, 40% width).
           "View All [count] Photos" button bottom-right
           of the grid that opens lightbox.

  Mobile: Horizontal swipe carousel. 1 photo at a time.
          Dots indicator. Swipe gesture support.

LIGHTBOX (full-screen overlay):
  Opens on clicking any photo or "View All" button.
  Shows current photo full-screen (object-contain).
  Left/Right arrow navigation.
  Keyboard navigation: ←/→ arrows, Escape to close.
  Photo counter: "3 / 8"
  Close button (X) top-right.
  Thumbnail strip at bottom (optional on desktop).
  Backdrop: rgba(0,0,0,0.95)

---

FILE 2: /app/listings/[slug]/page.tsx

GENERATE STATIC PARAMS:
  Read all listings from listings.json.
  Return array of { slug } for each listing.
  generateStaticParams() function.

GET LISTING DATA:
  Find listing by slug from listings.json.
  If not found: notFound() from next/navigation.

METADATA:
  title: "[beds] Bed [type] For Sale — [street], [neighborhood] | [agentName]"
  description: "[price]. [beds] beds, [baths] baths, [sqft] sq ft.
                [neighborhood] real estate. Contact [agentName]."
  Open Graph image: first photo from property.photos

PAGE STRUCTURE (top section only):

1. BREADCRUMB:
   Home → Listings → [neighborhood] → [street address]
   Use a BreadcrumbList component (shadcn or custom).
   Generates BreadcrumbList schema markup automatically.

2. PROPERTY GALLERY:
   import PropertyGallery from '@/features/listings/components/PropertyGallery'
   <PropertyGallery photos={property.photos} />

3. PROPERTY HEADER (below gallery):
   LEFT SIDE:
   - Status badge
   - Price (large, bold)
   - Address (street, city, state, zip)
   - Neighborhood badge → link to /neighborhoods/[slug]
   - Stats row: Beds | Baths | Sqft | Lot Size | Year Built
   - Days on market + MLS number

   RIGHT SIDE (sticky on desktop while scrolling):
   - Agent contact card (photo + name + phone + email)
   - Primary CTA: "Request a Showing" (accent button)
   - Secondary CTA: "Ask About This Property"
   - "❤ Save Listing" toggle

4. ACTION BAR (below header, full width):
   [🗺 View on Map] [📐 Floor Plan] [🎥 Virtual Tour] [📤 Share]
   Each button activates its section below on click.
```

---

## SLICE-19 — SINGLE PROPERTY PAGE (DETAILS + TOOLS + FORMS)

**Depends on:** SLICE-18, SLICE-20
**Creates:** Completes `/app/listings/[slug]/page.tsx`
**Reference:** V2 MD Section 3.3 — Single Property Page details section

### PASTE THIS INTO YOUR IDE:

```
Complete the single property page /app/listings/[slug]/page.tsx
by adding the lower sections below the property header.

Imports to add at top of file:
  import MortgageCalculator from '@/features/tools/components/MortgageCalculator'
  import PropertyCard from '@/features/listings/components/PropertyCard'

Add these sections in this exact order:

SECTION 1 — PROPERTY DESCRIPTION:
  Heading: "About This Property"
  Full text: property.description
  Below description: "Listed: [listedDate] · [daysOnMarket] days on market"

SECTION 2 — PROPERTY FEATURES:
  Heading: "Property Features"
  Display property.features as a responsive grid of checkboxes.
  3 columns on desktop, 2 on tablet, 1 on mobile.
  Each feature: ✓ icon (accent color) + feature text.

SECTION 3 — PROPERTY DETAILS TABLE:
  Two-column detail table with alternating row backgrounds:
  Property Type | [value]
  Year Built    | [value]
  Square Feet   | [value]
  Lot Size      | [value]
  Bedrooms      | [value]
  Bathrooms     | [value]
  Garage        | [value]
  HOA Fee       | [value or "None"]
  MLS Number    | [value]

SECTION 4 — MAP:
  Heading: "Location"
  Google Maps embed using iframe:
  src: "https://maps.google.com/maps?q=[lat],[lng]&z=15&output=embed"
  Height: 400px, width: 100%, border: none.
  Below map: "[property.address.street], [city], [state]"

SECTION 5 — MORTGAGE CALCULATOR (embedded):
  Heading: "Estimate Your Payment"
  <MortgageCalculator defaultPrice={property.price} compact />

SECTION 6 — SCHOOL INFORMATION:
  Heading: "Nearby Schools"
  Sub: "School data provided by GreatSchools"
  For demo: hardcoded placeholder data for 3 schools:
    Elementary / Middle / High
    Each shows: school name + type + rating out of 10
  Note: "Verify school zones with the school district directly."

SECTION 7 — OPEN HOUSE (if property.openHouse exists):
  Heading: "Open House"
  Card with: Date + Time + "Add to Calendar" button + "RSVP" button

SECTION 8 — REQUEST A SHOWING FORM:
  Heading: "Schedule a Showing"
  Form with react-hook-form + zod:
    - Full Name (required)
    - Email (required, valid format)
    - Phone (required)
    - Preferred Date (date input, min: today)
    - Preferred Time (select: Morning / Afternoon / Evening)
    - Message (textarea, optional)
  Hidden field: propertyAddress (auto-filled from property data)
  Submit: "Request Showing"
  Wire to EmailJS in SLICE-32.

SECTION 9 — SIMILAR LISTINGS:
  Heading: "More Homes Like This"
  Show 3 PropertyCard components.
  Filter: same neighborhood, similar price range (±30%), Active status.
  Import from listings.json. Exclude current listing.

STICKY AGENT CARD (desktop sidebar):
  On desktop: right column sidebar, position sticky.
  On mobile: shown between Sections 5 and 6.
  Content:
    - Agent headshot
    - Agent name + title
    - Phone (click-to-call)
    - Email (click-to-email)
    - "Request Showing" button
    - "Ask a Question" button (opens dialog)
```

---

# ═══════════════════════════════════════════════════

# GROUP F — TOOLS

# ═══════════════════════════════════════════════════

---

## SLICE-20 — MORTGAGE CALCULATOR COMPONENT

**Depends on:** SLICE-02, SLICE-03
**Creates:** `/features/tools/components/MortgageCalculator.tsx` + `/app/calculator/page.tsx`
**Reference:** V2 MD Section 3.3 — Mortgage Calculator spec

### PASTE THIS INTO YOUR IDE:

```
Create a reusable mortgage calculator component.

Import types from '@/types'.
Import config from '@/config/agent.config' and '@/config/region.config'.

FILE 1: /features/tools/components/MortgageCalculator.tsx
'use client' component

PROPS:
  defaultPrice?: number    (pre-fills from listing page)
  compact?: boolean        (compact mode for embedding)

INPUTS (all use react-hook-form):
  1. Home Price ($) — number input with dollar prefix
  2. Down Payment — percentage slider (5–50%) + auto-calculated dollar amount
  3. Loan Term — button group: [15 yr] [20 yr] [25 yr] [30 yr]
     (available terms from region.mortgageTerms config)
  4. Interest Rate (%) — number input, default 6.8
  5. Property Tax (% annual) — number input, default 1.8
  6. HOA Fee ($/month) — number input, default 0

CALCULATIONS (real-time, recalculate on every input change):
  Monthly principal + interest:
    P = (loanAmount * monthlyRate) / (1 - (1 + monthlyRate)^-nMonths)
  Monthly property tax: (homePrice * taxRate) / 12
  Monthly HOA: input value
  PMI (if down < 20%): (loanAmount * 0.01) / 12

OUTPUTS:
  Main display: Total monthly payment (large, accent color)
  Breakdown bar (colored segments):
    Principal & Interest (navy) | Tax (gold) | HOA (gray) | PMI (red if applicable)

  Breakdown table:
    Principal & Interest: $X,XXX
    Property Tax: $XXX
    HOA Fee: $XXX
    PMI (if applicable): $XXX
    ─────────────────────────────
    Total Monthly Payment: $X,XXX

  Loan summary:
    Loan Amount: $XXX,XXX
    Down Payment: $XX,XXX ([X]%)
    Total Interest Paid: $XXX,XXX

  "Get Pre-Approved" CTA link → agentConfig.bookingUrl

---

FILE 2: /app/calculator/page.tsx

Standalone calculator page.
Import MortgageCalculator from '@/features/tools/components/MortgageCalculator'

Heading: "Austin Mortgage Calculator"
Subheading: "Estimate your monthly payment for any Austin home"
Render <MortgageCalculator /> (not compact mode).
Add SEO metadata for the page.
Add a brief educational section below calculator:
  "How is my monthly payment calculated?"
  Explain PITI: Principal, Interest, Taxes, Insurance.
```

---

## SLICE-21 — HOME VALUATION FORM (3-STEP WIZARD)

**Depends on:** SLICE-02, SLICE-03
**Creates:** `/app/valuation/page.tsx` + `/features/valuation/components/ValuationForm.tsx`
**Reference:** V2 MD Section 3.4 — Home Valuation System

### PASTE THIS INTO YOUR IDE:

```
Create the home valuation lead capture page and form.

Import types from '@/types'.
Import config from '@/config/agent.config'.

FILE 1: /features/valuation/components/ValuationForm.tsx
'use client' multi-step form component

This is the #1 seller lead capture tool on the site.
It MUST be polished and feel professional.

STATE: currentStep: 1 | 2 | 3 | "success"

STEP INDICATOR (top):
  ① Property Address  ——  ② Property Details  ——  ③ Your Info
  Current step highlighted in accent color.

STEP 1 — Property Address:
  Heading: "What's Your Home Worth?"
  Sub: "Get your free, no-obligation home valuation in under 2 minutes"
  Fields (react-hook-form + zod):
    - Street Address (required)
    - City (required, default: "Austin")
    - State (required, default: "TX")
    - Zip Code (required, 5 digits)
  Button: "Next: Property Details →"
  Trust indicators below button:
    ✓ No commitment  ✓ Takes 60 seconds  ✓ Agent reviews personally

STEP 2 — Property Details:
  Heading: "Tell Us About Your Home"
  Fields:
    - Property Type (radio: Single Family / Condo / Townhouse / Multi-Family)
    - Bedrooms (select: 1 / 2 / 3 / 4 / 5+)
    - Bathrooms (select: 1 / 1.5 / 2 / 2.5 / 3 / 3.5 / 4+)
    - Approx. Square Footage (select: <1000 / 1000-1500 / 1500-2000 /
                                       2000-2500 / 2500-3500 / 3500+)
    - Year Built (select: Before 1950 / 1950-1980 / 1980-2000 /
                           2000-2010 / 2010-2020 / 2020+)
    - Condition (radio: Excellent / Good / Fair / Needs Work)
    - Recent Updates (checkbox multi-select):
        ☐ Updated Kitchen  ☐ Updated Bathrooms  ☐ New Roof
        ☐ New HVAC  ☐ New Flooring  ☐ Fresh Paint  ☐ Pool Added
  Buttons: "← Back" and "Next: Contact Info →"

STEP 3 — Contact Collection:
  Heading: "Where Should We Send Your Valuation?"
  Sub: "[agentConfig.name] will personally review your property
        and send your valuation within 2 business hours."
  Fields:
    - Full Name (required)
    - Email Address (required, valid)
    - Phone Number (required)
    - When are you thinking of selling? (select):
        ASAP / 1–3 months / 3–6 months / Just curious about value
  Submit button: "Get My Free Valuation"
  Note: "By submitting, you agree to be contacted about your
         property. No spam. Unsubscribe anytime."

SUCCESS STATE:
  Large checkmark animation (framer-motion scale + fade)
  Heading: "Thank you, [firstName]!"
  Sub: "[agentConfig.name] will review your property and
        send your personalized valuation within 2 business hours."
  Agent photo + contact card
  "In the meantime, see what's selling near you →"
  Links to /listings?neighborhood=[zip area]

---

FILE 2: /app/valuation/page.tsx

Import ValuationForm from '@/features/valuation/components/ValuationForm'
Import PropertyCard from '@/features/listings/components/PropertyCard'

TWO-COLUMN LAYOUT:
  Left (60%): <ValuationForm />
  Right (40%, desktop only):
    "Why Get a Professional Valuation?"
    3 bullet points with icons
    Agent photo + credentials
    Recent sold testimonial (from testimonials.json where role=Seller)

BELOW FORM (full width):
  "How Our Valuation Works"
  3-step process: Submit → Review → Receive Report
  Recent sales in Austin (3 PropertyCards from sold listings)
```

---

# ═══════════════════════════════════════════════════

# GROUP G — CORE PAGES

# ═══════════════════════════════════════════════════

---

## SLICE-22 — BUY PAGE

**Depends on:** SLICE-03, SLICE-10, SLICE-12
**Creates:** `/app/buy/page.tsx`
**Reference:** V2 MD Section 3.5 — Buy Page spec

### PASTE THIS INTO YOUR IDE:

```
Create /app/buy/page.tsx

Import types from '@/types'.
Import config from '@/config/agent.config'.
Import PropertyCard from '@/features/listings/components/PropertyCard'

This is the buyer-focused conversion page.
Every section should answer: "Why choose Sarah Chen as my buyer's agent?"

SECTIONS IN ORDER:

1. HERO:
   Background: full-width image with overlay
   Headline: "Buy Your Dream Austin Home With Confidence"
   Sub: "Expert buyer representation from Austin's most trusted REALTOR®"
   CTA: "Start Your Home Search →" → /listings

2. PERFORMANCE DATA STRIP:
   3 metrics with icons (data from agentConfig.stats):
   - "28 Days Average Close" vs "67 Days Market Average"
   - "101.2% List-to-Sale Ratio" vs "97.4% Market Average"
   - "284 Successful Buyer Closings"
   Source line: "Source: Austin MLS Board, 2025"

3. WHY YOUR BUYER AGENT CHOICE MATTERS:
   Heading: "The Right Buyer's Agent Changes Everything"
   4 paragraphs of editorial content explaining:
     - The stakes of buyer agent selection
     - How agent expertise affects negotiation outcomes
     - The difference between active and passive agents
     - What to look for when interviewing agents

4. HOW WE WORK TOGETHER (5-step process):
   Visual timeline (horizontal on desktop, vertical on mobile):
   Step 1: Free Consultation Call
   Step 2: Get Pre-Approved
   Step 3: Tour Homes
   Step 4: Negotiate & Make Offer
   Step 5: Close & Move In
   Each step: icon + name + 1-line description.

5. RESOURCES SECTION:
   Heading: "Buyer Resources"
   3 cards:
   - Download Buyer's Guide (PDF) → email capture dialog
   - Mortgage Calculator → /calculator
   - Explore Neighborhoods → /neighborhoods

6. BUYER BROKER AGREEMENT:
   Heading: "Understanding Your Buyer Representation Agreement"
   300-word transparent explanation of:
   - What the agreement covers
   - How buyer's agents are compensated
   - Your rights as a buyer

7. TESTIMONIALS (buyer-specific):
   Import testimonials.json, filter where role === "Buyer"
   Show 3 testimonials in card layout.
   Link: "See All [count] Reviews →" → /testimonials

8. BOTTOM CTA:
   Full-width section, dark background.
   "Ready to Find Your Austin Home?"
   "Schedule a free 20-minute buyer consultation call."
   [Schedule Now →] → agentConfig.bookingUrl
```

---

## SLICE-23 — SELL PAGE

**Depends on:** SLICE-03, SLICE-10, SLICE-12
**Creates:** `/app/sell/page.tsx`
**Reference:** V2 MD Section 3.6 — Sell Page spec

### PASTE THIS INTO YOUR IDE:

```
Create /app/sell/page.tsx

Import types from '@/types'.
Import config from '@/config/agent.config'.

This is the seller conversion page. Primary goal:
get seller to click "Get My Home's Value" or schedule a call.

SECTIONS IN ORDER:

1. HERO:
   Background: luxury Austin home exterior image with dark overlay
   Headline: "Sell Faster. For More. With Less Stress."
   Sub: "Austin sellers who list with Sarah Chen sell for 5.2% more
         per sq ft in 46% less time than the market average."
   CTA: "Get Your Free Home Valuation →" → /valuation

2. SELLER PERFORMANCE DATA:
   Full-width comparison table (2 columns):
   Heading: "Our Results vs. The Austin Market"
   Data rows:
     Average Sale Price vs Asking: +5.2% (market: -1.1%)
     Average Days on Market: 28 days (market: 67 days)
     List-to-Sale Ratio: 101.2% (market: 97.4%)
   Source: "Austin Board of REALTORS® MLS, Jan–Dec 2025"
   This builds credibility. Data beats claims.

3. MARKETING SYSTEM:
   Heading: "What We Do For Your Listing"
   Sub: "Every listing gets the full marketing stack — not just an MLS entry."
   Grid of marketing services (8 items, 2 columns on desktop):
   Each item: icon + title + 1-line description
     📸 Professional Photography + Drone Video
     🏠 3D Virtual Matterport Tour
     📱 Targeted Social Media Campaign (3 platforms)
     📧 Email Campaign to 2,400+ buyer database
     🌐 Dedicated Single-Property Microsite
     🗺 Featured Placement on All Major Portals
     📊 Weekly Performance Reports to Seller
     🤝 Pre-qualified Buyer Showings Only

4. SELLER PROCESS TIMELINE:
   Horizontal timeline (vertical on mobile):
   Pre-Listing → Photography & Staging → Go Live → Showings & Offers → Close
   Each phase: estimated days + key activities

5. PRICING STRATEGY:
   Heading: "Pricing Your Home to Win"
   3-paragraph explanation of the CMA process.
   "The wrong price costs you buyers. The right price creates competition."

6. MARKETING PRESENTATION EMBED:
   Heading: "See Our Listing Presentation"
   Placeholder iframe (400px tall) with:
   "Our full marketing presentation is shared with you on our
    consultation call. Schedule yours below."
   [Schedule Your Seller Call →]

7. SELLER TESTIMONIALS:
   Filter testimonials.json where role === "Seller" OR role === "Both".
   Show 3 cards. Include specific results in each ("sold in 12 days
   for $42K over asking").

8. SELLER WORKSHEET:
   Heading: "Ready to Get Started?"
   A shortened version of the ValuationForm Step 1 + Step 3.
   Just: Address + Name + Email + Phone + Timing.
   Submit: "Talk to Sarah About Your Home"

9. BOTTOM CTA:
   Dark section.
   "Let's Talk About Selling Your Home"
   [Schedule a Free Seller Consultation →] → agentConfig.bookingUrl
```

---

## SLICE-24 — ABOUT PAGE

**Depends on:** SLICE-02, SLICE-08
**Creates:** `/app/about/page.tsx`
**Reference:** V2 MD Section 3.9 — About Page spec

### PASTE THIS INTO YOUR IDE:

```
Create /app/about/page.tsx

Import config from '@/config/agent.config'.

This page humanizes the agent and builds deep trust.
Everything reads from agentConfig where possible.

SECTIONS IN ORDER:

1. HERO:
   Full-width. Agent large professional photo as background.
   Dark overlay. White text.
   Heading: "About [agentConfig.name]"
   Sub: agentConfig.title

2. BIO SECTION (two-column on desktop):
   LEFT: Large agent photo with decorative frame or shape
   RIGHT:
     Eyebrow: "My Story"
     Heading: "Why I Do This Work"
     Full bio text (600–900 words — write genuine content for Sarah Chen):
       - How she got into real estate
       - Philosophy: client-first approach
       - What she loves about Austin
       - 2 personal touches (family, hobby, community)
     CTA: "Let's Find Your Austin Home →" → agentConfig.bookingUrl

3. CAREER STATS (expanded repeat of stats strip):
   Same visual as StatsStrip but with 6 stats:
   Career Sales Volume | Homes Sold | Years Experience |
   Google Rating | Neighborhoods Served | Avg Days on Market

4. CREDENTIALS + AWARDS:
   Heading: "Credentials & Recognition"
   Grid of credential/award badges:
     - Licensed REALTOR® (TX#0548291)
     - NAR Member
     - Austin Board of REALTORS® Member
     - RealTrends Verified Top Agent
     - Luxury Specialist Designation
     - ABR (Accredited Buyer's Representative)
   Each as a styled card with icon + name + description.

5. VIDEO SECTION:
   Heading: "Meet Sarah in 2 Minutes"
   YouTube iframe embed (placeholder: use a public real estate
   introduction video URL for demo).
   Subtitle: "A quick introduction to how Sarah works with clients"

6. TEAM SECTION:
   Heading: "The Team Behind Every Transaction"
   Sub: "Sarah is supported by a dedicated team of specialists"
   3 team member cards (fictional for demo):
     - Marcus Webb | Transaction Coordinator
     - Priya Sharma | Marketing Director
     - Daniel Okafor | Buyer Specialist
   Each: placeholder photo + name + title + 2-sentence bio

7. COMMUNITY INVOLVEMENT:
   Heading: "Giving Back to Austin"
   3 community activities (text + icon):
     - Austin Housing Coalition supporter
     - Annual sponsor: Hyde Park neighborhood cleanup
     - Youth homeownership education workshops

8. BOTTOM CTA:
   "Ready to work together?"
   [Schedule a Call →] + [Browse Listings →]
```

---

## SLICE-25 — CONTACT PAGE

**Depends on:** SLICE-02, SLICE-03
**Creates:** `/app/contact/page.tsx` + `/features/contact/components/ContactForm.tsx`

### PASTE THIS INTO YOUR IDE:

```
Create the contact page and form.

Import types from '@/types'.
Import config from '@/config/agent.config'.

FILE 1: /features/contact/components/ContactForm.tsx
'use client'

FORM (react-hook-form + zod validation):
  Fields:
    - First Name (required)
    - Last Name (required)
    - Email (required, valid format)
    - Phone (optional, format validation)
    - I am a: (select) Buyer / Seller / Both / Just Curious
    - How did you hear about us? (select):
        Google / Zillow / Referral / Instagram / LinkedIn / Other
    - Message (textarea, required, min 10 chars)

  Submit: "Send Message"
  Success state: "Thanks [firstName]! I'll be in touch within 24 hours."
  Error state: Inline error message.

  Wire to EmailJS in SLICE-32.

---

FILE 2: /app/contact/page.tsx

Import ContactForm from '@/features/contact/components/ContactForm'

LAYOUT: Two columns on desktop.

LEFT COLUMN (60%):
  Heading: "Let's Connect"
  Sub: "Whether you're buying, selling, or just exploring your options,
        [agentConfig.name] is here to help."
  <ContactForm />

RIGHT COLUMN (40%):
  Contact Card:
    Agent photo (small, circular)
    Name + Title

    Contact Details (each with icon):
    📞 [agentConfig.phone] (click-to-call)
    📧 [agentConfig.email] (click-to-email)
    📍 [agentConfig.address]

    Office Hours:
    Mon–Fri: 8:00 AM – 7:00 PM
    Sat: 9:00 AM – 6:00 PM
    Sun: 10:00 AM – 4:00 PM
    "Responding to inquiries 7 days a week"

  Google Maps Embed:
    iframe showing agentConfig.address location
    Height: 300px

  Social Links:
    Row of social icons (Facebook, Instagram, LinkedIn, YouTube)
    Each links to agentConfig.social.[platform]

SEO METADATA:
  Title: "Contact [agentName] | Austin REALTOR®"
  Description: "Get in touch with [agentName], Austin's top luxury
                real estate agent. Call, email, or send a message."
```

---

# ═══════════════════════════════════════════════════

# GROUP H — NEIGHBORHOOD SYSTEM

# ═══════════════════════════════════════════════════

---

## SLICE-26 — NEIGHBORHOOD TEMPLATE COMPONENT

**Depends on:** SLICE-09, SLICE-07, SLICE-15
**Creates:** `/features/neighborhoods/components/NeighborhoodTemplate.tsx`
**Reference:** V2 MD Section 3.7 — Neighborhood Pages

### PASTE THIS INTO YOUR IDE:

```
Create /features/neighborhoods/components/NeighborhoodTemplate.tsx

Import types from '@/types'.
Import PropertyCard from '@/features/listings/components/PropertyCard'
Import config from '@/config/agent.config'.

This is a reusable template that renders any neighborhood page.
ALL neighborhood pages use this same component — the data changes,
the structure stays identical.

PROPS:
  neighborhood: Neighborhood  (from '@/types')
  listings: Property[]        (pre-filtered to this neighborhood)
  content: string             (MDX/markdown body content)

SECTIONS IN ORDER:

1. HERO:
   Full-width image: neighborhood.heroImage
   Min-height: 60vh
   Dark gradient overlay
   Bottom-left:
     Neighborhood name (H1, white, large)
     Tagline: neighborhood.tagline
     City + State badge

2. MARKET STATS BAR:
   5-column responsive grid:
   Avg Price: $[formatted] | Price/Sqft: $[value]/sq ft |
   Days on Market: [value] | Active Listings: [value] |
   Year-over-Year: [value]% ↑↓
   Background: agentConfig.colors.primary. White text.

3. OVERVIEW (prose):
   Render neighborhood.description as Markdown.
   Full prose, left-aligned, max-w-prose.

4. WHAT TO LOVE:
   Heading: "What to Love About [neighborhood.name]"
   Render neighborhood.highlights as styled bullet list.
   Each bullet: checkmark icon (accent color) + text.

5. LOCAL LIFESTYLE:
   This comes from the .md file body content.
   Render the MDX/markdown content here.
   (The .md files written in SLICE-09 contain this section)

6. SCHOOLS:
   Heading: "Schools Serving [neighborhood.name]"
   Cards for each school from neighborhood.schools:
     - School name
     - Type (Elementary/Middle/High)
     - Rating out of 10 (star visual)
   Note: "Verify with school district for enrollment boundaries."

7. WALKABILITY SCORES:
   3 score cards: Walk Score | Transit Score | Bike Score
   Each: number + label + visual bar (0–100)

8. LIVE LISTINGS:
   Heading: "Homes For Sale in [neighborhood.name]"
   Render <PropertyCard /> grid for listings prop (max 6).
   "View All [count] [neighborhood.name] Listings →" →
     /listings?neighborhood=[neighborhood.slug]

9. NEIGHBORHOOD MAP:
   Google Maps iframe centered on neighborhood.lat + neighborhood.lng.
   Zoom: 14. Height: 400px.

10. CTA:
    "Thinking About [neighborhood.name]?"
    "I've helped [X] families find their perfect home here."
    [Schedule a Neighborhood Tour →] → agentConfig.bookingUrl
```

---

## SLICE-27 — NEIGHBORHOOD PAGES + HUB

**Depends on:** SLICE-26, SLICE-09
**Creates:**
`/app/neighborhoods/page.tsx`
`/app/neighborhoods/[slug]/page.tsx`

### PASTE THIS INTO YOUR IDE:

```
Create the neighborhood hub page and dynamic neighborhood page.

Import NeighborhoodTemplate from '@/features/neighborhoods/components/NeighborhoodTemplate'
Import types from '@/types'.

FILE 1: /app/neighborhoods/page.tsx

HEADING: "Explore Austin Neighborhoods"
SUB: "Expert local knowledge from someone who actually lives and works here"

GRID of all 3 neighborhood cards (full details this time, not the compact
homepage version):
  Each card:
  - Hero image (neighborhood.heroImage)
  - Neighborhood name (bold, large)
  - Tagline
  - Avg price + active listings count
  - Short description (first 150 chars of neighborhood.description)
  - 3 highlight pills (first 3 from neighborhood.highlights)
  - "Explore [Name] →" button

BELOW GRID:
  "Don't see your neighborhood?"
  "Sarah serves all Austin-area neighborhoods. Contact her for
   hyperlocal market data on any Austin area."
  [Get in Touch →] → /contact

---

FILE 2: /app/neighborhoods/[slug]/page.tsx

generateStaticParams():
  Read all .md files from /content/neighborhoods/
  Return array of { slug } values.

Get neighborhood data:
  Parse the .md file for the given slug.
  Extract: frontmatter (Neighborhood interface) + body content.

Get related listings:
  Import listings.json.
  Filter: address.neighborhood.toLowerCase() includes the neighborhood name.

generateMetadata():
  title: "Living in [name], Austin TX | Homes For Sale | [agentName]"
  description: "Explore [name] Austin — real estate market data,
                local lifestyle, schools, and active listings.
                [agentName] is Austin's most trusted [name] specialist."

PAGE RENDER:
  <NeighborhoodTemplate
    neighborhood={neighborhoodData}
    listings={relatedListings}
    content={bodyContent}
  />
```

---

# ═══════════════════════════════════════════════════

# GROUP I — BLOG SYSTEM

# ═══════════════════════════════════════════════════

---

## SLICE-28 — MDX SETUP + BLOG INDEX

**Depends on:** SLICE-01, SLICE-03
**Creates:**
`/lib/mdx.ts`
`/app/blog/page.tsx`

### PASTE THIS INTO YOUR IDE:

```
Set up the MDX blog system and blog index page.

Import types from '@/types'.

FILE 1: /lib/mdx.ts

Utility functions for reading MDX blog posts.

Functions to create:

1. getAllPosts(): BlogPost[]
   - Read all .mdx files from /content/blog/
   - Parse frontmatter with gray-matter
   - Return array of BlogPost objects (without content)
   - Sort by date descending (newest first)

2. getPostBySlug(slug: string): { meta: BlogPost, content: string }
   - Read specific .mdx file
   - Return frontmatter + raw MDX content string

3. getPostsByCategory(category: string): BlogPost[]
   - Filter getAllPosts() by category field

---

FILE 2: /app/blog/page.tsx
'use server' component

DATA: Use getAllPosts() from '@/lib/mdx'

LAYOUT:
  Heading: "Market Insights & Resources"
  Sub: "Stay informed on Austin real estate with expert analysis
        and neighborhood guides"

  FEATURED POST (first/most recent post):
    Full-width card, larger than others.
    Cover image, category badge, title (H2), excerpt, date, read time.
    "Read Article →" button.

  CATEGORY FILTER TABS:
    All | Market Update | Buyer Guide | Seller Guide | Neighborhood | Tips
    On click: filter displayed posts.
    Use URL params for shareable filtered views: /blog?category=buyer-guide

  POSTS GRID (below featured):
    3-column grid on desktop, 2 on tablet, 1 on mobile.
    Each card: cover image + category badge + title + excerpt +
    date + read time + "Read More →"

  NEWSLETTER INLINE CTA:
    Between row 2 and row 3 of posts:
    "Get Market Updates by Email" compact signup bar
    [Email input] [Subscribe]

  SIDEBAR (desktop only):
    Recent Posts (5 titles with dates)
    Categories list with post counts
    Newsletter signup (condensed)
    Agent contact card

SEO METADATA:
  title: "Austin Real Estate Blog | Market Updates | [agentName]"
  description: "Expert Austin real estate insights, market updates,
                buyer and seller guides from [agentName], Austin REALTOR®."
```

---

## SLICE-29 — BLOG POST TEMPLATE + 3 SAMPLE POSTS

**Depends on:** SLICE-28
**Creates:**
`/app/blog/[slug]/page.tsx`
`/content/blog/austin-market-update-may-2026.mdx`
`/content/blog/first-time-buyer-guide-austin.mdx`
`/content/blog/why-tarrytown-sells-fast.mdx`

### PASTE THIS INTO YOUR IDE:

```
Create the single blog post template and 3 sample blog posts.

Import types from '@/types'.

FILE 1: /app/blog/[slug]/page.tsx

generateStaticParams():
  Use getAllPosts() from '@/lib/mdx'.
  Return array of { slug } values.

generateMetadata({ params }):
  Get post meta by slug.
  title: "[post.title] | [agentName]"
  description: post.excerpt
  Open Graph: post.coverImage as image

PAGE LAYOUT (two-column on desktop):

MAIN COLUMN (70%):
  Breadcrumb: Blog → [Category] → [Title]

  Article header:
    Category badge
    H1: post.title
    Author + date + read time
    Cover image (full-width, 16:9)

  ARTICLE BODY:
    Render MDX content using next-mdx-remote.
    Custom MDX components:
      h2: styled with accent left border
      h3: slightly smaller, bold
      ul/ol: styled list with accent color markers
      blockquote: styled callout box
      a: accent color links

  ARTICLE FOOTER:
    "Was this helpful?" thumbs up/down (no functionality needed)
    Share buttons: Twitter/X, LinkedIn, Facebook (simple links)
    "About the Author" card: agent photo + name + shortBio + CTA

SIDEBAR (30%, desktop only):
  Agent contact card
  Recent posts (5 items)
  Newsletter signup
  [Get a Free Home Valuation →]

---

FILE 2: /content/blog/austin-market-update-may-2026.mdx

Frontmatter:
  title: Austin Real Estate Market Update — May 2026
  slug: austin-market-update-may-2026
  excerpt: Austin's housing market in May 2026 is showing signs of...
  date: 2026-05-01
  readTime: 5 min read
  category: Market Update
  coverImage: /images/blog/austin-market-cover.jpg
  author: Sarah Chen
  featured: true

Content (write 600–800 words):
  Authentic market update covering:
  - Current inventory levels in Austin
  - Median price trends (use realistic 2026 data)
  - What buyers should know right now
  - What sellers should know right now
  - Neighborhood-specific highlights (mention Tarrytown, Westlake)
  Include 2 subheadings (##), 1 bulleted list.

---

FILE 3: /content/blog/first-time-buyer-guide-austin.mdx

Frontmatter:
  title: "5 Things Every First-Time Buyer in Austin Must Know in 2026"
  category: Buyer Guide
  readTime: 7 min read
  featured: false

Content (700 words): Practical buyer tips for Austin, Texas.
  Cover: mortgage pre-approval, offer strategy in competitive markets,
  which neighborhoods have best value, working with a buyer's agent.

---

FILE 4: /content/blog/why-tarrytown-sells-fast.mdx

Frontmatter:
  title: "Why Tarrytown Homes Sell Faster Than Any Other Austin Neighborhood"
  category: Neighborhood
  readTime: 4 min read

Content (500 words): Data-driven analysis of Tarrytown's real estate
  performance. Mention schools, walkability, Lake Austin access,
  limited supply driving demand.
```

---

# ═══════════════════════════════════════════════════

# GROUP J — SECONDARY PAGES

# ═══════════════════════════════════════════════════

---

## SLICE-30 — TESTIMONIALS FULL PAGE

**Depends on:** SLICE-08
**Creates:** `/app/testimonials/page.tsx`
**Reference:** V2 MD — Testimonials page spec

### PASTE THIS INTO YOUR IDE:

```
Create /app/testimonials/page.tsx

Import types from '@/types'.
Import config from '@/config/agent.config'.

PURPOSE: Show all client reviews in a filterable, scannable layout.

HEADER:
  Heading: "What Our Clients Say"
  Stats summary bar:
    ⭐ 4.9 Average Rating | 127 Google Reviews | 200+ Total Reviews

FILTER TABS:
  All | Buyers | Sellers | Google | Zillow
  (use URL params for shareable: /testimonials?type=seller)

AGGREGATE RATING DISPLAY:
  Large "4.9 ★★★★★" display
  Bar chart showing distribution:
    5 stars: ████████████████ 118
    4 stars: ██ 9
    3 stars: 0
    2 stars: 0
    1 star: 0

GRID OF TESTIMONIAL CARDS:
  3-column on desktop, 2 on tablet, 1 on mobile.
  Sort: newest first.

  Each card:
    5 gold stars
    Quote text (full, no truncation)
    Author name (bold)
    Role badge: Buyer / Seller / Both
    Neighborhood (if present)
    Date
    Source badge (Google / Zillow / Direct)

REVIEW PLATFORMS CTA:
  Below grid:
  "Have you worked with Sarah?"
  [Leave a Google Review ▶] [Leave a Zillow Review ▶]
  Both link to real review platforms (placeholder # for demo)

SEO: Add AggregateRating schema markup (JSON-LD) in page head.
     rating: 4.9, reviewCount: 127, bestRating: 5
```

---

## SLICE-31 — MARKET REPORT + SUPPLEMENTARY PAGES

**Depends on:** SLICE-01
**Creates:**
`/app/market-report/page.tsx`
`/app/open-houses/page.tsx`

### PASTE THIS INTO YOUR IDE:

```
Create two supplementary pages.

Import config from '@/config/agent.config'.

FILE 1: /app/market-report/page.tsx

PURPOSE: Email list capture for monthly market reports.

LAYOUT:
  Hero section:
    Heading: "Austin Market Report"
    Sub: "Monthly insights on Austin's housing market.
          What's selling, what's not, and what it means for you."
    [Subscribe for Free →] scrolls to form below

  SAMPLE REPORT PREVIEW:
    3 metric cards previewing what the report contains:
    - Median Sale Price this month
    - Inventory levels (months of supply)
    - Average days on market
    (Use realistic placeholder data)

  SUBSCRIBE FORM:
    Name + Email + What describes you: (Buyer / Seller / Investor / Curious)
    [Get Monthly Reports →]
    "Sent the first of every month. Unsubscribe anytime."

  PAST REPORTS:
    3 cards linking to blog posts tagged "Market Update"

---

FILE 2: /app/open-houses/page.tsx

PURPOSE: List upcoming open houses. Static for demo.

LAYOUT:
  Heading: "Upcoming Open Houses"
  Sub: "Tour these Austin homes this weekend. No appointment needed."

  List of 3 open house listings (filter listings.json where
  openHouse data exists).
  For each:
    - Property photo
    - Address + neighborhood
    - Price + beds/baths/sqft
    - Open house date + time
    - [Add to Calendar] button (creates .ics file download — simple version)
    - [RSVP / More Info] → single property page
```

---

# ═══════════════════════════════════════════════════

# GROUP K — FORMS + INTEGRATIONS

# ═══════════════════════════════════════════════════

---

## SLICE-32 — EMAILJS INTEGRATION (ALL FORMS WIRED)

**Depends on:** ALL form components (SLICE-17, SLICE-21, SLICE-25, SLICE-23)
**Creates:** `/lib/emailjs.ts` + updates all form components

### PASTE THIS INTO YOUR IDE:

```
Wire all forms to EmailJS. This replaces all console.log placeholders
with real email sending.

IMPORTANT: EmailJS sends form data directly from the browser to
the agent's email — no backend code needed, no server costs.

Import types from '@/types'.

FILE 1: /lib/emailjs.ts

import emailjs from '@emailjs/browser'
import { agentConfig } from '@/config/agent.config'

// Initialize once (call in root layout)
export function initEmailJS() {
  emailjs.init(agentConfig.emailjsPublicKey)
}

// Generic send function
export async function sendEmail(
  templateId: string,
  templateParams: Record<string, string>
): Promise<{ success: boolean; error?: string }> {
  try {
    await emailjs.send(
      agentConfig.emailjsServiceId,
      templateId,
      {
        ...templateParams,
        to_email: agentConfig.email,
        agent_name: agentConfig.name,
        site_url: agentConfig.siteUrl,
      }
    )
    return { success: true }
  } catch (error) {
    console.error('EmailJS error:', error)
    return { success: false, error: 'Failed to send. Please try again.' }
  }
}

// Specific form senders (use agentConfig.emailjsTemplates)
export const sendContactForm = (data: ContactFormData) =>
  sendEmail(agentConfig.emailjsTemplates.contact, {
    from_name: `${data.firstName} ${data.lastName}`,
    from_email: data.email,
    from_phone: data.phone || 'Not provided',
    message: data.message,
    subject: 'New Contact Form Submission',
  })

export const sendValuationRequest = (data: ValuationFormData) =>
  sendEmail(agentConfig.emailjsTemplates.valuation, {
    from_name: data.name,
    from_email: data.email,
    from_phone: data.phone,
    property_address: `${data.street}, ${data.city}, ${data.state} ${data.zip}`,
    property_type: data.propertyType,
    beds: data.beds,
    baths: data.baths,
    sqft: data.sqft,
    condition: data.condition,
    timing: data.timing,
    subject: 'New Home Valuation Request',
  })

export const sendShowingRequest = (data: ShowingRequestData) =>
  sendEmail(agentConfig.emailjsTemplates.showing, {
    from_name: data.name,
    from_email: data.email,
    from_phone: data.phone,
    property_address: data.propertyAddress,
    preferred_date: data.preferredDate,
    preferred_time: data.preferredTime,
    message: data.message || 'No message',
    subject: `Showing Request: ${data.propertyAddress}`,
  })

export const sendNewsletterSignup = (email: string, name: string) =>
  sendEmail(agentConfig.emailjsTemplates.newsletter, {
    from_name: name || 'Subscriber',
    from_email: email,
    subject: 'New Newsletter Signup',
  })

---

UPDATES TO EXISTING FORM COMPONENTS:

Update these components to use the functions above:
1. /features/contact/components/ContactForm.tsx → use sendContactForm()
2. /features/valuation/components/ValuationForm.tsx → use sendValuationRequest()
3. Showing request form in /app/listings/[slug]/page.tsx → use sendShowingRequest()
4. /features/home/components/NewsletterSignup.tsx → use sendNewsletterSignup()
5. /features/listings/components/SaveSearchModal.tsx → use sendNewsletterSignup() (for now)

In root layout.tsx (/app/layout.tsx):
  import { initEmailJS } from '@/lib/emailjs'
  Call initEmailJS() once when the app loads.

EMAILJS TEMPLATE SETUP INSTRUCTIONS (add as code comment):
  1. Create account at emailjs.com (free)
  2. Add Email Service (Gmail recommended)
  3. Create 4 templates (one per form type)
  4. Template variables use double braces: {{from_name}}, {{message}}
  5. Copy Service ID + Template IDs + Public Key
  6. Paste into agentConfig.emailjsServiceId/emailjsTemplates/emailjsPublicKey
```

---

## SLICE-33 — CRISP CHAT + AFTER-HOURS CONFIG

**Depends on:** SLICE-06
**Creates:** `/components/layout/CrispChat.tsx` + updates root layout

### PASTE THIS INTO YOUR IDE:

```
Add Crisp Chat to the website for live chat + after-hours capture.

Import config from '@/config/agent.config'.

FILE: /components/layout/CrispChat.tsx
'use client' component

PURPOSE:
  Load the Crisp chat widget. Configure it with the agent's data.
  The widget appears after 3 seconds (not immediately — respects UX).

IMPLEMENTATION:
  Use useEffect to inject the Crisp script.
  Script only loads in browser (check typeof window !== 'undefined').
  Delay loading with setTimeout(3000ms).

  window.$crisp = []
  window.CRISP_WEBSITE_ID = agentConfig.crispWebsiteId

  After Crisp loads, configure with agent data:
    $crisp.push(["config", "chatbox:css", ".crisp-client .cc-unoo { ... }"])
    // Accent color from agentConfig.colors.accent

AFTER-HOURS MESSAGE CONFIG:
  Add a comment block explaining manual setup in Crisp dashboard:

  /*
   * CRISP AFTER-HOURS SETUP (do in Crisp dashboard, not in code):
   * 1. Settings → Chatbox → Away Message
   * 2. Set schedule: Available 9:00 AM – 6:00 PM Mon–Sat
   * 3. Away message text:
   *    "Hi! Sarah is away right now but you're in the right place.
   *     Leave your name and number and she'll call you first thing
   *     tomorrow — usually within 15 minutes of opening."
   * 4. Enable push notifications to agent's mobile app (iOS/Android)
   *    Crisp has a free mobile app — agent gets instant push when
   *    anyone messages after hours.
   */

UPDATE root layout (/app/layout.tsx):
  Import and add <CrispChat /> inside <body> after <MobileBottomBar />.
  It renders nothing visible — just loads the script.

ENVIRONMENT VARIABLE:
  Move agentConfig.crispWebsiteId to .env.local:
  NEXT_PUBLIC_CRISP_WEBSITE_ID=your-crisp-id
  Update agentConfig to read: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
```

---

# ═══════════════════════════════════════════════════

# GROUP L — SEO + ANALYTICS

# ═══════════════════════════════════════════════════

---

## SLICE-34 — GOOGLE ANALYTICS 4 + META PIXEL

**Depends on:** SLICE-06
**Creates:** `/components/layout/Analytics.tsx` + updates `/app/layout.tsx`

### PASTE THIS INTO YOUR IDE:

```
Add Google Analytics 4 and Meta Pixel to the website.

Import config from '@/config/agent.config'.

Use @next/third-parties for GA4 (official Next.js package).
This handles script loading, Core Web Vitals, and privacy.

FILE: /components/layout/Analytics.tsx
'use client'

Part 1 — GA4:
  import { GoogleAnalytics } from '@next/third-parties/google'
  Render: <GoogleAnalytics gaId={agentConfig.ga4MeasurementId} />

  Also add conversion event tracking:
  Create a function: trackConversion(eventName: string, data?: object)
  Use window.gtag() to fire events.

  Events to track:
  - 'form_submit_contact' (from ContactForm)
  - 'form_submit_valuation' (from ValuationForm)
  - 'form_submit_showing' (from showing request)
  - 'form_submit_newsletter' (newsletter signup)
  - 'listing_view' (on single property page load)
  - 'phone_click' (any tel: link click)
  - 'schedule_click' (any bookingUrl click)

  Export trackConversion for use in form components.

Part 2 — Meta Pixel:
  Use next/script to load the Meta Pixel.
  Strategy: 'afterInteractive'

  Pixel base code:
  !function(f,b,e,v,n,t,s){...}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', agentConfig.metaPixelId);
  fbq('track', 'PageView');

  Track on form submissions:
  fbq('track', 'Lead') — fire on any successful form submission.

UPDATE /app/layout.tsx:
  Import and add <Analytics /> inside <body>.
  It should load after the main content (strategy: afterInteractive).

UPDATE all form success handlers:
  Call trackConversion() and fbq('track', 'Lead') after successful submit.

ENVIRONMENT VARIABLES:
  Move to .env.local:
  NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
  NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXX
```

---

## SLICE-35 — SCHEMA MARKUP + SITEMAP + OPEN GRAPH

**Depends on:** SLICE-02, SLICE-06
**Creates:**
`/lib/schema.ts`
`/next-sitemap.config.js`
Updates `/app/layout.tsx`

### PASTE THIS INTO YOUR IDE:

```
Add complete SEO infrastructure.

Import types from '@/types'.
Import config from '@/config/agent.config'.

FILE 1: /lib/schema.ts

JSON-LD schema markup generators.
These get injected into each page's <head>.

Create these functions:

1. getLocalBusinessSchema():
   Returns JSON-LD for LocalBusiness + RealEstateAgent.
   Fields: name, address, phone, email, url, priceRange,
           areaServed, sameAs (social URLs), aggregateRating.

2. getPersonSchema():
   Returns JSON-LD for Person (agent bio page).
   Fields: name, jobTitle, worksFor, address, telephone, email.

3. getBreadcrumbSchema(items: {name: string, url: string}[]):
   Returns BreadcrumbList JSON-LD.

4. getArticleSchema(post: BlogPost):
   Returns Article JSON-LD for blog posts.
   Fields: headline, author, datePublished, image, description.

5. getFAQSchema(faqs: {question: string, answer: string}[]):
   Returns FAQPage JSON-LD for buy/sell pages.

6. getRealEstateListingSchema(property: Property):
   Returns Product schema adapted for real estate listings.

Usage pattern in each page:
  import { getLocalBusinessSchema } from '@/lib/schema'

  In page component:
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
  />

Add LocalBusiness schema to: root layout (every page)
Add Person schema to: /about page
Add Breadcrumb schema to: all interior pages
Add Article schema to: blog post pages
Add FAQ schema to: /buy and /sell pages

---

FILE 2: /next-sitemap.config.js

const config = {
  siteUrl: process.env.SITE_URL || 'https://sarahchenrealty.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: [
      'https://sarahchenrealty.com/sitemap.xml',
    ],
  },
  exclude: ['/privacy-policy', '/terms'],
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async (config) => [
    await config.transform(config, '/listings/tarrytown'),
  ],
}

Add to package.json scripts:
  "postbuild": "next-sitemap"

---

ADD TO ALL PAGES (via generateMetadata):

Every page should have:
  title: (unique, 60 chars max)
  description: (unique, 155 chars max)
  canonical: (full URL)
  openGraph: {
    title, description,
    url, type: 'website',
    images: [{ url: ogImageUrl, width: 1200, height: 630 }]
  }
  twitter: {
    card: 'summary_large_image',
    title, description, images: [ogImageUrl]
  }
```

---

# ═══════════════════════════════════════════════════

# GROUP M — COMPLIANCE + LEGAL

# ═══════════════════════════════════════════════════

---

## SLICE-36 — COOKIE CONSENT + LEGAL PAGES + MLS DISCLAIMER

**Depends on:** SLICE-05
**Creates:**
`/components/layout/CookieBanner.tsx`
`/app/privacy-policy/page.tsx`
`/app/terms/page.tsx`

### PASTE THIS INTO YOUR IDE:

```
Add compliance components required for production launch.

Import config from '@/config/agent.config' and '@/config/region.config'.

FILE 1: /components/layout/CookieBanner.tsx
'use client'

Uses react-cookie-consent library.

BANNER APPEARANCE:
  Position: bottom of screen (above mobile bottom bar)
  Background: agentConfig.colors.primary (dark navy)
  Text: white

  Text: "We use cookies to personalize your experience and analyze
         site traffic. By continuing, you agree to our use of cookies."

  Two buttons:
    "Accept All" → sets consent cookie, hides banner, enables GA4+Pixel
    "Decline" → hides banner, does NOT load GA4 or Meta Pixel

  Link: "Privacy Policy" → /privacy-policy

CONDITIONAL ANALYTICS:
  GA4 and Meta Pixel should only load after cookie consent.
  Update /components/layout/Analytics.tsx to check for consent cookie first.

---

FILE 2: /app/privacy-policy/page.tsx

Generate a comprehensive privacy policy page for a US real estate
agent website. Include sections:

1. Information We Collect
   - Contact forms (name, email, phone)
   - Property search data
   - Analytics (Google Analytics 4)
   - Marketing pixels (Meta Pixel)
   - Chat (Crisp)
   - Cookies

2. How We Use Your Information
   - Responding to inquiries
   - Sending market updates (with consent)
   - Improving our website

3. Third-Party Services
   - EmailJS (form processing)
   - Google Analytics
   - Meta/Facebook
   - Crisp Chat

4. Your Rights (CCPA, CAN-SPAM)
   - Right to access your data
   - Right to delete your data
   - Right to opt out of marketing
   - How to exercise these rights

5. Data Retention
6. Contact Information
7. Updates to This Policy

Include: effective date, last updated date.
Professional but readable prose (not legal gibberish).

---

FILE 3: /app/terms/page.tsx

Terms of service covering:
1. Use of Website
2. IDX / Listing Information (MLS data accuracy disclaimer)
3. No Warranty of Information
4. Limitation of Liability
5. Intellectual Property
6. Third-Party Links
7. Governing Law ([State] law)
8. Contact

MLS DISCLAIMER (also used in Footer — already there from SLICE-05):
  "The data relating to real estate for sale on this website comes
   in part from the Internet Data Exchange Program. Information is
   deemed reliable but not guaranteed. © [year] [Local MLS Board]."

  If region.fairHousingRequired:
   "We are pledged to the letter and spirit of the U.S. policy for
    the achievement of equal housing opportunity throughout the nation."
```

---

# ═══════════════════════════════════════════════════

# GROUP N — PERFORMANCE + FINAL POLISH

# ═══════════════════════════════════════════════════

---

## SLICE-37 — IMAGE OPTIMIZATION + PERFORMANCE

**Depends on:** All previous slices
**Creates:** No new files — optimizes existing ones

### PASTE THIS INTO YOUR IDE:

```
Run a performance optimization pass on the entire codebase.

TASK 1: IMAGE OPTIMIZATION
  Audit every next/image usage:
  - All images have width + height OR fill + sizes prop
  - All images have alt text (read from data or config)
  - Hero image: priority={true} (above fold, loads immediately)
  - All other images: lazy loading (default in Next.js)
  - All images have correct sizes attribute:
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

TASK 2: DYNAMIC IMPORTS
  These components use browser APIs — must be dynamically imported:
  a) MapView → import dynamic with ssr: false
     import dynamic from 'next/dynamic'
     const MapView = dynamic(
       () => import('@/features/listings/components/MapView'),
       { ssr: false }
     )
  b) MortgageCalculator → import dynamic with ssr: false (if uses browser APIs)
     const MortgageCalculator = dynamic(
       () => import('@/features/tools/components/MortgageCalculator'),
       { ssr: false }
     )
  c) CrispChat → import dynamic with ssr: false
     const CrispChat = dynamic(
       () => import('@/components/layout/CrispChat'),
       { ssr: false }
     )

TASK 3: FONT OPTIMIZATION
  In root layout.tsx, ensure next/font/google is used:
  import { Inter } from 'next/font/google'
  const inter = Inter({ subsets: ['latin'], display: 'swap' })
  Apply: <html className={inter.className}>

TASK 4: BUNDLE ANALYSIS
  Add to package.json scripts:
  "analyze": "ANALYZE=true next build"
  Install: npm install --save-dev @next/bundle-analyzer
  Identify and tree-shake any large unused imports.

TASK 5: LIGHTHOUSE TARGETS
  Run: npx lighthouse http://localhost:3000 --view
  Target scores:
    Performance: 90+
    Accessibility: 90+
    Best Practices: 90+
    SEO: 95+

  Common fixes needed:
  - Missing image alt text → add from data
  - Render-blocking resources → already handled by next/font
  - Large network payloads → compress images
  - Missing meta description → already added in each page
```

---

## SLICE-38 — ENV SETUP + VERCEL DEPLOYMENT

**Depends on:** All previous slices
**Creates:** `.env.local` template + `vercel.json`

### PASTE THIS INTO YOUR IDE:

```
Set up environment variables and configure Vercel deployment.

FILE 1: .env.local (create this, add to .gitignore)

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_XXXXXXX
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXX
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT=template_contact
NEXT_PUBLIC_EMAILJS_TEMPLATE_VALUATION=template_valuation
NEXT_PUBLIC_EMAILJS_TEMPLATE_SHOWING=template_showing
NEXT_PUBLIC_EMAILJS_TEMPLATE_NEWSLETTER=template_newsletter

# Analytics
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXX

# Crisp Chat
NEXT_PUBLIC_CRISP_WEBSITE_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX

# Site
NEXT_PUBLIC_SITE_URL=https://sarahchenrealty.com

FILE 2: .env.example (commit this — safe to share)
Copy .env.local with all values replaced by "REPLACE_ME"

FILE 3: vercel.json (optimization)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}

UPDATE /config/agent.config.ts:
  Replace all hardcoded keys with process.env.NEXT_PUBLIC_* values.

DEPLOYMENT CHECKLIST:
  ☐ All env vars added to Vercel dashboard (Project → Settings → Env Variables)
  ☐ .env.local in .gitignore (already there from create-next-app)
  ☐ npm run build passes with no errors
  ☐ npm run start works locally
  ☐ Push to GitHub main branch → auto-deploys to Vercel
  ☐ Custom domain connected in Vercel dashboard
  ☐ HTTPS certificate auto-provisioned (Vercel handles this)
```

---

## SLICE-39 — DEMO DATA FINAL POPULATION (SARAH CHEN)

**Depends on:** All previous slices
**Creates:** Final demo site ready to pitch

### PASTE THIS INTO YOUR IDE:

```
Final polish pass — make the demo site pitch-ready.

This is the last slice before showing clients.

TASK 1: VERIFY ALL CONFIG
  Open /config/agent.config.ts and confirm:
  - name: "Sarah Chen" ✓
  - All stats filled in (from SLICE-02)
  - colors.primary: "#1a2744" ✓
  - colors.accent: "#c9a96e" ✓
  - All social links set to valid placeholder URLs
  - bookingUrl: set to any working Calendly link
    (create free account at calendly.com)

TASK 2: PLACEHOLDER IMAGES
  Download or reference these Unsplash images for demo:

  Agent headshot: Use a professional-looking stock photo
    https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400

  Hero background: Luxury Austin home exterior
    https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920

  For each listing in /content/listings/listings.json: verify 6 photo URLs exist
  For each neighborhood in /content/neighborhoods/: set heroImage to a valid Unsplash URL

TASK 3: CROSS-DEVICE QA CHECKLIST
  Test on each of these:
  ☐ Mobile (375px) — iPhone SE size
  ☐ Mobile (390px) — iPhone 14 size
  ☐ Tablet (768px) — iPad size
  ☐ Desktop (1280px) — standard laptop
  ☐ Wide (1440px) — large monitor

  On each screen size, verify:
  ☐ Header is not broken
  ☐ Mobile bottom bar appears on mobile, hidden on desktop
  ☐ Homepage hero text is readable
  ☐ Listings grid shows correct columns
  ☐ Forms are usable (inputs not too small)
  ☐ No horizontal scroll on any page
  ☐ Footer looks correct

TASK 4: FORMS END-TO-END TEST
  ☐ Contact form → send to your own email → verify receipt
  ☐ Valuation form (all 3 steps) → verify success state
  ☐ Newsletter form → verify Mailchimp signup (or just email receipt)

TASK 5: FINAL SEO CHECK
  ☐ View page source on homepage → confirm JSON-LD schema in <head>
  ☐ Visit /sitemap.xml → verify it loads and lists all pages
  ☐ Visit /robots.txt → verify it loads correctly
  ☐ Use browser DevTools → Network tab → no 404 errors

TASK 6: DEMO URL
  Deploy to Vercel. Your demo URL format:
  https://sarah-chen-realty.vercel.app

  This is the URL you send to every prospect.
  Test it from a mobile phone (not just your computer).
  Show your client this URL on your discovery call.

✅ DEMO SITE IS NOW PITCH-READY.
   Go to your 20-Day Execution Plan.
   Start Phase 2: Pitch (Days 8–14).
```

---

# ═══════════════════════════════════════════════════

# QUICK REFERENCE: SLICE EXECUTION ORDER

# ═══════════════════════════════════════════════════

```
DAY 1 — Foundation + Layout:
  SLICE-01 → SLICE-02 → SLICE-03
  SLICE-04 → SLICE-05 → SLICE-06

DAY 2 — Data + Homepage:
  SLICE-07 → SLICE-08 → SLICE-09
  SLICE-10 → SLICE-11 → SLICE-12 → SLICE-13

DAY 3 — Listings System:
  SLICE-14 → SLICE-15 → SLICE-16 → SLICE-17
  SLICE-18 → SLICE-19

DAY 4 — Tools + Core Pages:
  SLICE-20 → SLICE-21
  SLICE-22 → SLICE-23 → SLICE-24 → SLICE-25

DAY 5 — Neighborhoods + Blog:
  SLICE-26 → SLICE-27
  SLICE-28 → SLICE-29

DAY 6 — Secondary Pages + Integrations:
  SLICE-30 → SLICE-31
  SLICE-32 → SLICE-33

DAY 7 — SEO + Analytics + Compliance + Deploy:
  SLICE-34 → SLICE-35 → SLICE-36
  SLICE-37 → SLICE-38 → SLICE-39
```

---

# ═══════════════════════════════════════════════════

# IMPORT CHEAT SHEET — QUICK REFERENCE

# ═══════════════════════════════════════════════════

```typescript
// TYPES — always from here
import type { Property, Testimonial, Neighborhood, BlogPost } from "@/types";

// CONFIG — always from here
import { agentConfig } from "@/config/agent.config";
import { region, activeRegion } from "@/config/region.config";

// INFRASTRUCTURE
import { sendContactForm, sendValuationRequest } from "@/lib/emailjs";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { getLocalBusinessSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

// HOOKS
import { useCountUp } from "@/hooks/useCountUp";
import { useSavedListings } from "@/hooks/useSavedListings";

// SHARED LAYOUT COMPONENTS
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";

// FEATURE COMPONENTS
import PropertyCard from "@/features/listings/components/PropertyCard";
import ListingFilters from "@/features/listings/components/ListingFilters";
import MapView from "@/features/listings/components/MapView";
import SaveSearchModal from "@/features/listings/components/SaveSearchModal";
import PropertyGallery from "@/features/listings/components/PropertyGallery";

import MortgageCalculator from "@/features/tools/components/MortgageCalculator";
import ValuationForm from "@/features/valuation/components/ValuationForm";
import ContactForm from "@/features/contact/components/ContactForm";

import NeighborhoodTemplate from "@/features/neighborhoods/components/NeighborhoodTemplate";

import Hero from "@/features/home/components/Hero";
import StatsStrip from "@/features/home/components/StatsStrip";
import FeaturedListings from "@/features/home/components/FeaturedListings";
import ThreeCardCTA from "@/features/home/components/ThreeCardCTA";
import AboutTeaser from "@/features/home/components/AboutTeaser";
import TestimonialsCarousel from "@/features/home/components/TestimonialsCarousel";
import PressStrip from "@/features/home/components/PressStrip";
import NewsletterSignup from "@/features/home/components/NewsletterSignup";
import NeighborhoodGrid from "@/features/home/components/NeighborhoodGrid";
import BlogTeasers from "@/features/home/components/BlogTeasers";
```

---

_Total Slices: 39_
_Total Build Time: 7 days_
_Structure: Jacob Rajan Standard (features/ domain layer)_
_Tech Stack: Next.js 14 · TypeScript · Tailwind CSS · shadcn/ui · EmailJS · Vercel_
