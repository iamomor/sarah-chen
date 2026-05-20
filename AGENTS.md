# AGENTS.MD — PROJECT CONTEXT FOR AI AGENTS

## Real Estate Agent Website | Next.js 16 Template

### Read this file COMPLETELY before writing any code, creating any file, or suggesting any change.

---

## WHO THIS IS FOR

This file is the single source of truth for any AI agent (Claude Code, Cursor, Copilot, Windsurf, Zed)
working on this codebase. It tells you:

- What this project is
- How the folder structure is organized and WHY
- Where every file lives
- What every import path looks like
- What rules you must follow
- What you must NEVER do
  Do not guess. Do not use patterns from other projects. Follow this file exactly.

---

## WHAT THIS PROJECT IS

A **white-label real estate agent website** built as a reusable template.

- One codebase → deployable for any real estate agent in 2–4 hours
- Zero backend server → runs fully on Vercel free tier
- Zero database in Phase 1 → all data is flat JSON + MDX files
- Config-driven → changing a client = editing 2 files (`agent.config.ts` + `region.config.ts`)
- Demo persona → **Sarah Chen**, Austin TX luxury REALTOR®
  **Primary goal of this codebase:** Build a production-quality demo site, show it to real estate agent prospects, close a paying client, then swap the config for their data.

---

## TECH STACK — NON-NEGOTIABLE

| Layer         | Technology                    | Why                                     |
| ------------- | ----------------------------- | --------------------------------------- |
| Framework     | Next.js 16 (App Router)       | Full-stack, Vercel-native, SSR + static |
| Language      | TypeScript (strict)           | Every file is `.ts` or `.tsx`           |
| Styling       | Tailwind CSS                  | Config-driven, no separate CSS files    |
| UI Components | shadcn/ui (Radix)             | Copy-paste, accessible, no lock-in      |
| Forms         | react-hook-form + zod         | Validation, type-safe, performant       |
| Animations    | framer-motion                 | Page transitions, scroll effects        |
| Maps          | react-leaflet + Leaflet       | Free, no API key needed                 |
| Email         | EmailJS                       | Browser-to-email, zero backend          |
| Blog          | next-mdx-remote + gray-matter | MDX files, no CMS needed                |
| Icons         | lucide-react                  | Already included with shadcn            |
| Images        | next/image (sharp)            | Optimized, lazy-loaded                  |
| Analytics     | @next/third-parties (GA4)     | Official Next.js package                |
| Hosting       | Vercel free tier              | Zero cost, auto-deploy                  |
| Database      | NONE in Phase 1               | Supabase added only in Phase 2          |

**NEVER suggest:**

- MongoDB (replaced by Supabase when needed)
- Express.js (replaced by Next.js API routes)
- A separate backend server (zero budget)
- Any paid tooling
- Database setup in Phase 1

---

## FOLDER STRUCTURE — THE RULE

This project uses the **Jacob Rajan standard** structure. Every folder has a single, specific purpose. Do not create files in the wrong folder.

```
/real-estate-template
│
├── /app                        ← ROUTING ONLY. Pages + API routes. Minimal logic.
├── /features                   ← DOMAIN LOGIC. All feature-specific components live here.
├── /components                 ← SHARED UI. Dumb, reusable, used across 2+ features.
├── /lib                        ← INFRASTRUCTURE. Server utilities, helpers, integrations.
├── /hooks                      ← SHARED HOOKS. Used across 2+ features.
├── /types                      ← GLOBAL TYPES. Single source of truth for all interfaces.
├── /constants                  ← NO MAGIC STRINGS. Routes, config constants.
├── /config                     ← PER-CLIENT CONFIG. Change this per deployment.
├── /content                    ← STATIC DATA. JSON files + MDX blog posts.
└── /public                     ← STATIC ASSETS. Images, icons.
```

---

## LAYER 1 — `/app` — ROUTING LAYER

**Rule:** Pages are thin. They import from `/features` and render. No business logic here.

```
/app
├── layout.tsx                      ← Root layout. Header + Footer + MobileBottomBar.
├── page.tsx                        ← Homepage. Imports from /features/home/components/.
├── error.tsx                       ← Global error boundary.
├── /buy/page.tsx
├── /sell/page.tsx
├── /listings/page.tsx
├── /listings/[slug]/page.tsx       ← Single property page.
├── /valuation/page.tsx
├── /about/page.tsx
├── /contact/page.tsx
├── /neighborhoods/page.tsx
├── /neighborhoods/[slug]/page.tsx  ← Dynamic neighborhood page.
├── /testimonials/page.tsx
├── /blog/page.tsx
├── /blog/[slug]/page.tsx           ← Single blog post (MDX).
├── /calculator/page.tsx
├── /market-report/page.tsx
├── /open-houses/page.tsx
├── /privacy-policy/page.tsx
├── /terms/page.tsx
└── /api
    ├── /contact/route.ts           ← Webhook / external only.
    └── /subscribe/route.ts
```

**What belongs in `/app`:**

- `generateStaticParams()` — static path generation
- `generateMetadata()` — SEO metadata per page
- Importing feature components and rendering them
- `notFound()` redirects
  **What does NOT belong in `/app`:**
- Business logic
- Form handling
- Data transformation
- Component definitions (those go in `/features`)

---

## LAYER 2 — `/features` — DOMAIN LAYER

**Rule:** All feature-specific components live here. Grouped by domain. Not by component type.

```
/features
├── /home
│   └── /components
│       ├── Hero.tsx
│       ├── StatsStrip.tsx
│       ├── FeaturedListings.tsx
│       ├── ThreeCardCTA.tsx
│       ├── AboutTeaser.tsx
│       ├── TestimonialsCarousel.tsx
│       ├── PressStrip.tsx
│       ├── NewsletterSignup.tsx
│       ├── NeighborhoodGrid.tsx
│       └── BlogTeasers.tsx
│
├── /listings
│   └── /components
│       ├── PropertyCard.tsx        ← Most reused component in the app.
│       ├── ListingFilters.tsx      ← Filter bar with URL param sync.
│       ├── MapView.tsx             ← Leaflet map. MUST be dynamic imported (ssr: false).
│       ├── SaveSearchModal.tsx     ← Email capture modal.
│       └── PropertyGallery.tsx    ← Photo gallery + lightbox.
│
├── /neighborhoods
│   └── /components
│       └── NeighborhoodTemplate.tsx  ← Reusable template for ALL neighborhood pages.
│
├── /blog
│   └── /components
│       └── BlogPostLayout.tsx     ← Single blog post MDX wrapper.
│
├── /tools
│   └── /components
│       └── MortgageCalculator.tsx ← Used on: /calculator, /listings/[slug], /valuation.
│
├── /valuation
│   └── /components
│       └── ValuationForm.tsx      ← 3-step wizard. #1 seller lead capture.
│
└── /contact
    └── /components
        └── ContactForm.tsx        ← Main contact form.
```

**Decision rule — when to put something in `/features` vs `/components`:**

- Used by 1 feature domain only → `/features/[domain]/components/`
- Used by 2+ unrelated features → `/components/`

---

## LAYER 3 — `/components` — SHARED UI LAYER

**Rule:** Only truly shared, presentation-only (dumb) components. No domain logic.

```
/components
├── /ui                         ← Auto-generated by shadcn. NEVER edit manually.
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── sheet.tsx
│   ├── badge.tsx
│   ├── toast.tsx
│   └── ...
│
└── /layout                     ← Global page chrome. Used on every page.
    ├── Header.tsx              ← Sticky nav. Reads from agentConfig.
    ├── Footer.tsx              ← Full footer. Reads from agentConfig + region.
    ├── MobileBottomBar.tsx     ← Sticky CTA bar. Mobile only (hidden lg:+).
    ├── Analytics.tsx           ← GA4 + Meta Pixel. Conditional on cookie consent.
    ├── CookieBanner.tsx        ← react-cookie-consent. Above mobile bottom bar.
    └── CrispChat.tsx           ← Loads after 3s delay. Dynamic import (ssr: false).
```

---

## LAYER 4 — `/lib` — INFRASTRUCTURE LAYER

**Rule:** Server-side utilities and integration helpers. No React components here.

```
/lib
├── utils.ts        ← cn(), formatPrice(), formatDate(), slugify()
├── emailjs.ts      ← All EmailJS send functions. initEmailJS(), sendContactForm(), etc.
├── mdx.ts          ← getAllPosts(), getPostBySlug(), getPostsByCategory()
└── schema.ts       ← JSON-LD generators: getLocalBusinessSchema(), getBreadcrumbSchema(), etc.
```

---

## LAYER 5 — `/hooks` — SHARED HOOKS

**Rule:** Only hooks used across 2+ different feature components.

```
/hooks
├── useCountUp.ts           ← Animates numbers from 0 to target. Used in StatsStrip.
└── useSavedListings.ts     ← localStorage saved listings state. Used in PropertyCard.
```

---

## LAYER 6 — `/types` — GLOBAL TYPES

**Rule:** One file. All shared TypeScript interfaces. Import from `@/types` everywhere.

```
/types
└── index.ts    ← Property, Testimonial, Neighborhood, BlogPost,
                   PressMention, ContactFormData, ValuationFormData,
                   ShowingRequestData, SaveSearchData, NavItem
```

**CRITICAL:** Never define types locally inside a component or page. Always put in `/types/index.ts` and import from `@/types`.

---

## LAYER 7 — `/constants`

```
/constants
├── routes.ts   ← Typed URL strings. e.g. ROUTES.LISTINGS = '/listings'
└── config.ts   ← Feature flags, app limits, static values.
```

---

## LAYER 8 — `/config` — PER-CLIENT CONFIG

**Rule:** The only two files that change when deploying for a new client.

```
/config
├── agent.config.ts     ← name, phone, email, colors, stats, social, keys, SEO
└── region.config.ts    ← ALL 4 regions defined: US, AU, CA, UK.
                           Switch with ONE line: activeRegion = "US" | "AU" | "CA" | "UK"
```

**How config switching works:**

- Change `activeRegion` in `region.config.ts` → entire site language, currency, units, compliance adapts
- Change values in `agent.config.ts` → entire site rebrands for a new agent
- Zero hardcoded strings in components. Always read from config.
  **CRITICAL for agents:** `region.config.ts` must ALWAYS contain all 4 region objects (`US`, `AU`, `CA`, `UK`). Never generate only the active region. All four must exist so the template stays white-label and switchable.

---

## LAYER 9 — `/content` — STATIC DATA

**Rule:** No database in Phase 1. All data lives here as flat files.

```
/content
├── /listings
│   └── listings.json           ← 15 demo properties (Property[] array)
├── /testimonials
│   └── testimonials.json       ← 12 demo reviews (Testimonial[] array)
├── /neighborhoods
│   ├── tarrytown.md            ← YAML frontmatter + long-form markdown
│   ├── westlake.md
│   └── hyde-park.md
└── /blog
    ├── austin-market-update-may-2026.mdx
    ├── first-time-buyer-guide-austin.mdx
    └── why-tarrytown-sells-fast.mdx
```

---

## IMPORT RULES — ALWAYS USE THESE PATHS

```typescript
// ✅ TYPES — always from here, never defined locally
import type { Property, Testimonial, Neighborhood, BlogPost } from "@/types";

// ✅ CONFIG — always from here, never hardcoded
import { agentConfig } from "@/config/agent.config";
import { region, activeRegion } from "@/config/region.config";

// ✅ INFRASTRUCTURE
import {
  sendContactForm,
  sendValuationRequest,
  sendShowingRequest,
  sendNewsletterSignup,
} from "@/lib/emailjs";
import { getAllPosts, getPostBySlug, getPostsByCategory } from "@/lib/mdx";
import {
  getLocalBusinessSchema,
  getPersonSchema,
  getBreadcrumbSchema,
} from "@/lib/schema";
import { cn, formatPrice, formatDate, slugify } from "@/lib/utils";

// ✅ HOOKS
import { useCountUp } from "@/hooks/useCountUp";
import { useSavedListings } from "@/hooks/useSavedListings";

// ✅ SHARED LAYOUT
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import Analytics from "@/components/layout/Analytics";
import CookieBanner from "@/components/layout/CookieBanner";
import CrispChat from "@/components/layout/CrispChat";

// ✅ FEATURE: LISTINGS
import PropertyCard from "@/features/listings/components/PropertyCard";
import ListingFilters from "@/features/listings/components/ListingFilters";
import PropertyGallery from "@/features/listings/components/PropertyGallery";
import SaveSearchModal from "@/features/listings/components/SaveSearchModal";
// MapView is ALWAYS dynamically imported — never static
const MapView = dynamic(
  () => import("@/features/listings/components/MapView"),
  { ssr: false },
);

// ✅ FEATURE: TOOLS
import MortgageCalculator from "@/features/tools/components/MortgageCalculator";
// Or dynamic if used in a client page that has SSR issues:
const MortgageCalculator = dynamic(
  () => import("@/features/tools/components/MortgageCalculator"),
  { ssr: false },
);

// ✅ FEATURE: VALUATION
import ValuationForm from "@/features/valuation/components/ValuationForm";

// ✅ FEATURE: CONTACT
import ContactForm from "@/features/contact/components/ContactForm";

// ✅ FEATURE: NEIGHBORHOODS
import NeighborhoodTemplate from "@/features/neighborhoods/components/NeighborhoodTemplate";

// ✅ FEATURE: HOME SECTIONS
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

## COMPONENT RULES

### `'use client'` vs `'use server'`

| Component                | Directive                            | Why                                     |
| ------------------------ | ------------------------------------ | --------------------------------------- |
| Hero.tsx                 | `'use client'`                       | framer-motion animations                |
| StatsStrip.tsx           | `'use client'`                       | useCountUp hook + intersection observer |
| FeaturedListings.tsx     | `'use client'`                       | hover states, interactivity             |
| TestimonialsCarousel.tsx | `'use client'`                       | embla carousel                          |
| NewsletterSignup.tsx     | `'use client'`                       | form submission                         |
| ListingFilters.tsx       | `'use client'`                       | URL params, state                       |
| PropertyCard.tsx         | `'use client'`                       | photo cycling, saved toggle             |
| MapView.tsx              | `'use client'` + `dynamic ssr:false` | Leaflet needs browser                   |
| SaveSearchModal.tsx      | `'use client'`                       | modal state, form                       |
| PropertyGallery.tsx      | `'use client'`                       | lightbox, keyboard nav                  |
| MortgageCalculator.tsx   | `'use client'`                       | real-time calculation                   |
| ValuationForm.tsx        | `'use client'`                       | multi-step form                         |
| ContactForm.tsx          | `'use client'`                       | form submission                         |
| Header.tsx               | `'use client'`                       | scroll effect, mobile drawer            |
| NeighborhoodGrid.tsx     | `'use server'`                       | no interactivity needed                 |
| BlogTeasers.tsx          | `'use server'`                       | no interactivity needed                 |
| NeighborhoodTemplate.tsx | `'use server'`                       | data rendering only                     |
| Footer.tsx               | (none)                               | server component, static                |

### Dynamic Imports — MANDATORY for these 3

```typescript
// MapView — Leaflet breaks on SSR
const MapView = dynamic(
  () => import("@/features/listings/components/MapView"),
  { ssr: false },
);

// CrispChat — browser script injection
const CrispChat = dynamic(() => import("@/components/layout/CrispChat"), {
  ssr: false,
});

// MortgageCalculator — if parent page has SSR conflicts
const MortgageCalculator = dynamic(
  () => import("@/features/tools/components/MortgageCalculator"),
  { ssr: false },
);
```

---

## DATA PATTERNS

### Reading listings

```typescript
import listingsData from "@/content/listings/listings.json";
import type { Property } from "@/types";

const listings = listingsData as Property[];
const active = listings.filter((l) => l.status === "Active");
const bySlug = listings.find((l) => l.slug === slug);
```

### Reading testimonials

```typescript
import testimonialsData from "@/content/testimonials/testimonials.json";
import type { Testimonial } from "@/types";

const testimonials = testimonialsData as Testimonial[];
const featured = testimonials.filter((t) => t.featured);
const buyers = testimonials.filter((t) => t.role === "Buyer");
```

### Reading neighborhood MDX

```typescript
// In /app/neighborhoods/[slug]/page.tsx
import matter from "gray-matter";
import { readFileSync } from "fs";
import path from "path";
import type { Neighborhood } from "@/types";

const filePath = path.join(
  process.cwd(),
  "content/neighborhoods",
  `${slug}.md`,
);
const raw = readFileSync(filePath, "utf-8");
const { data: frontmatter, content } = matter(raw);
const neighborhood = frontmatter as Neighborhood;
```

### Reading blog posts

```typescript
// Always use the utility functions in /lib/mdx.ts
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import type { BlogPost } from "@/types";

const posts = getAllPosts(); // all posts, sorted by date
const post = getPostBySlug("some-slug"); // { meta: BlogPost, content: string }
```

---

## CONFIG SYSTEM — HOW IT WORKS

### agentConfig — what it contains

```typescript
agentConfig.name; // "Sarah Chen"
agentConfig.title; // "REALTOR® | Luxury Property Specialist"
agentConfig.phone; // "(512) 555-0147"
agentConfig.phoneRaw; // "+15125550147"  ← use in href="tel:"
agentConfig.email; // "sarah@sarahchenrealty.com"
agentConfig.address; // full street address string
agentConfig.colors.primary; // "#1a2744"  ← deep navy
agentConfig.colors.accent; // "#c9a96e"  ← warm gold
agentConfig.colors.background; // "#f9f6f0"  ← warm white
agentConfig.colors.text; // "#1a1a1a"
agentConfig.colors.muted; // "#6b7280"
agentConfig.stats.careerSalesVolume; // "$142M"
agentConfig.stats.homesSold; // 284
agentConfig.stats.yearsExperience; // 12
agentConfig.stats.googleRating; // 4.9
agentConfig.stats.reviewCount; // 127
agentConfig.stats.avgDaysOnMarket; // 28
agentConfig.stats.listToSaleRatio; // "101.2%"
agentConfig.shortBio; // 1-sentence bio
agentConfig.headshot; // "/images/agent-headshot.jpg"
agentConfig.headshotAlt; // "Sarah Chen, Austin REALTOR®"
agentConfig.markets; // ["Tarrytown", "Westlake", "Hyde Park", ...]
agentConfig.press; // [{ name, url }, ...]
agentConfig.bookingUrl; // Calendly link
agentConfig.siteUrl; // "https://sarahchenrealty.com"
agentConfig.siteTitle; // Full SEO title
agentConfig.siteDescription; // SEO description
agentConfig.social.facebook; // social links
agentConfig.social.instagram;
agentConfig.social.linkedin;
agentConfig.social.youtube;
agentConfig.emailjsServiceId;
agentConfig.emailjsPublicKey;
agentConfig.emailjsTemplates.contact;
agentConfig.emailjsTemplates.valuation;
agentConfig.emailjsTemplates.showing;
agentConfig.emailjsTemplates.newsletter;
agentConfig.crispWebsiteId;
agentConfig.ga4MeasurementId;
agentConfig.metaPixelId;
```

### region — what it contains

**`region.config.ts` defines ALL 4 regions. The file must always contain all four.**
Switch regions by changing ONE line: `export const activeRegion: Region = "US"`

Valid values: `"US"` | `"AU"` | `"CA"` | `"UK"`

```typescript
// ALL FOUR REGIONS MUST EXIST IN region.config.ts — never delete any of them

regionConfigs.US
  currency: "USD"         symbol: "$"
  areaUnit: "sqft"        areaLabel: "sq ft"
  agentTitle: "REALTOR®"
  listingPlatform: "MLS"
  idxEnabled: true
  schoolRating: "GreatSchools"
  phoneFormat: "+1 (XXX) XXX-XXXX"
  mortgageTerms: [15, 30]
  fairHousingRequired: true
  language: "en"
  compliance: "Licensed by [State] Real Estate Commission. MLS® data provided by [Local Board]."

regionConfigs.AU
  currency: "AUD"         symbol: "A$"
  areaUnit: "sqm"         areaLabel: "m²"
  agentTitle: "Licensed Real Estate Agent"
  listingPlatform: "REA / Domain"
  idxEnabled: false
  schoolRating: "MySchool.edu.au"
  phoneFormat: "+61 4XX XXX XXX"
  mortgageTerms: [25, 30]
  fairHousingRequired: false
  language: "en-AU"
  compliance: "Licensed under [State] Property, Stock & Business Agents Act."

regionConfigs.CA
  currency: "CAD"         symbol: "C$"
  areaUnit: "sqft"        areaLabel: "sq ft"
  agentTitle: "REALTOR®"
  listingPlatform: "CREA / MLS®"
  idxEnabled: true
  schoolRating: "Fraser Institute School Rankings"
  phoneFormat: "+1 (XXX) XXX-XXXX"
  mortgageTerms: [20, 25]
  fairHousingRequired: true
  language: "en-CA"
  compliance: "Member of CREA. MLS® data provided under license from [Local Board]."

regionConfigs.UK
  currency: "GBP"         symbol: "£"
  areaUnit: "sqft"        areaLabel: "sq ft"
  agentTitle: "Estate Agent"
  listingPlatform: "Rightmove / Zoopla"
  idxEnabled: false
  schoolRating: "Ofsted"
  phoneFormat: "+44 XXXX XXXXXX"
  mortgageTerms: [25, 35]
  fairHousingRequired: false
  language: "en-GB"
  compliance: "Member of NAEA Propertymark. Licensed under Estate Agents Act 1979."
```

**Current active region: `"US"` (Sarah Chen demo)**

**How components consume region data:**

```typescript
import { region } from "@/config/region.config";

// These values automatically reflect whichever region is active:
region.currency; // "USD" / "AUD" / "CAD" / "GBP"
region.symbol; // "$" / "A$" / "C$" / "£"
region.areaUnit; // "sqft" / "sqm"
region.areaLabel; // "sq ft" / "m²"
region.agentTitle; // "REALTOR®" / "Estate Agent" / etc.
region.idxEnabled; // true → show MLS disclaimer; false → hide it
region.fairHousingRequired; // true → show Fair Housing logo in footer
region.mortgageTerms; // drives loan term buttons in MortgageCalculator
region.compliance; // injected into Footer and /terms page
region.language; // set on <html lang=""> in root layout
```

**Switching to a new client region:**

1. Open `/config/region.config.ts`
2. Change `export const activeRegion: Region = "US"` to `"AU"`, `"CA"`, or `"UK"`
3. Done. Every component adapts automatically.
   **CRITICAL: Never hardcode region-specific strings in components.**

```typescript
// ❌ WRONG
<span>sq ft</span>
<span>REALTOR®</span>
<span>$</span>

// ✅ CORRECT
<span>{region.areaLabel}</span>
<span>{region.agentTitle}</span>
<span>{region.symbol}</span>
```

---

## REGION-AWARE RENDERING RULES — MANDATORY

These rules apply to EVERY component, page, and template.
An agent reading agents.md must never write a hardcoded
currency symbol, area unit, or location name in any component.

CURRENCY — always use region.symbol:
  ✅ CORRECT: formatPrice(property.price)
              `${region.symbol}${value.toLocaleString()}`
  ❌ WRONG:   `$${property.price.toLocaleString()}`
              "$825,000"

AREA UNITS — always use formatArea() or region.areaLabel:
  ✅ CORRECT: formatArea(property.details.sqft)
              `${value.toLocaleString()} ${region.areaLabel}`
  ❌ WRONG:   "1,750 sq ft"
              `${sqft} sq ft`

LOCATION — always use agentConfig:
  ✅ CORRECT: agentConfig.mapCenter.city
              agentConfig.markets[0]
  ❌ WRONG:   "Austin"
              "Austin, TX"

MLS NUMBER — conditional on region.idxEnabled:
  ✅ CORRECT: {region.idxEnabled && <span>MLS #{mlsNumber}</span>}
  ❌ WRONG:   <span>MLS #{mlsNumber}</span>

LOAN TERMS — always from region.mortgageTerms:
  ✅ CORRECT: {region.mortgageTerms.map(t => <button>{t} yr</button>)}
  ❌ WRONG:   <button>15 yr</button><button>30 yr</button>

MAP TILE — always Carto Light, never OpenStreetMap default:
  ✅ CORRECT: https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
  ❌ WRONG:   https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

MAP CENTER — always agentConfig.mapCenter, never hardcoded:
  ✅ CORRECT: [agentConfig.mapCenter.lat, agentConfig.mapCenter.lng]
  ❌ WRONG:   [30.2672, -97.7431]

PRICE TAGS ON MAP — always formatPriceShort():
  ✅ CORRECT: formatPriceShort(825000) → "$825K" or "A$825K" or "£825K"
  ❌ WRONG:   `$${Math.round(price/1000)}K`

TOUR/INSPECTION LABEL:
  ✅ CORRECT: region.language.startsWith('en-AU') ? 'Request Inspection' : 'Schedule Tour'
  ❌ WRONG:   'Schedule Tour' (hardcoded)

PROPERTY TAX LABEL:
  ✅ CORRECT: region.language === 'en-AU' ? 'Council Rates' :
              region.language === 'en-GB' ? 'Council Tax' : 'Property Tax'
  ❌ WRONG:   'Property Tax' (hardcoded)

---

## FORM SYSTEM — HOW EMAILJS WORKS

All forms use this pattern. Zero backend required.

```typescript
// In any form component
import { sendContactForm } from "@/lib/emailjs";
import type { ContactFormData } from "@/types";

const onSubmit = async (data: ContactFormData) => {
  const result = await sendContactForm(data);
  if (result.success) {
    // show success state
  } else {
    // show error: result.error
  }
};
```

**Available send functions in `/lib/emailjs.ts`:**
| Function | Used In |
|---|---|
| `sendContactForm(data)` | ContactForm.tsx |
| `sendValuationRequest(data)` | ValuationForm.tsx |
| `sendShowingRequest(data)` | /listings/[slug]/page.tsx |
| `sendNewsletterSignup(email, name)` | NewsletterSignup.tsx, SaveSearchModal.tsx |

**All forms must be initialized.** `initEmailJS()` is called once in `/app/layout.tsx`.

---

## SEO PATTERN — EVERY PAGE

Every page file must export `generateMetadata()`:

```typescript
import type { Metadata } from "next";
import { agentConfig } from "@/config/agent.config";

export const metadata: Metadata = {
  title: "Page Title | Sarah Chen Austin REALTOR®",
  description: "Unique description, 155 chars max.",
  alternates: { canonical: `${agentConfig.siteUrl}/page-path` },
  openGraph: {
    title: "Page Title",
    description: "Description",
    url: `${agentConfig.siteUrl}/page-path`,
    type: "website",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Title",
    description: "Description",
    images: ["/images/og-default.jpg"],
  },
};
```

**JSON-LD Schema — add to relevant pages:**

```typescript
import { getLocalBusinessSchema } from '@/lib/schema'

// In the page JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
/>
```

| Schema function                        | Add to                        |
| -------------------------------------- | ----------------------------- |
| `getLocalBusinessSchema()`             | layout.tsx (every page)       |
| `getPersonSchema()`                    | /about/page.tsx               |
| `getBreadcrumbSchema(items)`           | all interior pages            |
| `getArticleSchema(post)`               | /blog/[slug]/page.tsx         |
| `getFAQSchema(faqs)`                   | /buy/page.tsx, /sell/page.tsx |
| `getRealEstateListingSchema(property)` | /listings/[slug]/page.tsx     |

---

## STYLING RULES

**Rule: Zero hardcoded color hex values in components.**

```typescript
// ❌ WRONG
<div className="bg-[#1a2744]">

// ✅ CORRECT — read from config
import { agentConfig } from '@/config/agent.config'
<div style={{ backgroundColor: agentConfig.colors.primary }}>

// ✅ ALSO CORRECT — set as CSS variable from root layout, use as Tailwind
// In layout.tsx: style={{ '--color-primary': agentConfig.colors.primary }}
// In component: className="bg-[var(--color-primary)]"
```

**Typography scale:**
| Use | Tailwind class |
|---|---|
| H1 hero | `text-5xl md:text-3xl` |
| H2 section | `text-3xl` |
| H3 card | `text-xl` |
| Body | `text-base` |
| Muted | `text-sm text-muted-foreground` |
| Tiny | `text-xs` |

**Spacing pattern:**

- Section padding: `py-16 md:py-24`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card gap: `gap-6`

---

## PROPERTY CARD — SPECIAL RULES

`PropertyCard` is the most-used component. It appears on 6+ different pages.

**Always import from:**

```typescript
import PropertyCard from "@/features/listings/components/PropertyCard";
```

**Props:**

```typescript
<PropertyCard property={property} />
// property is type Property from '@/types'
```

**Status badge colors (must match exactly):**

```
Active       → green  (bg-green-500)
Under Contract → orange (bg-orange-500)
Coming Soon  → blue   (bg-blue-500)
Sold         → gray   (bg-gray-400)
Price Reduced → red   (bg-red-500)
```

**Photo cycling behavior:** On hover, cycles photos[0] → photos[1] → photos[2] every 1.2s using `setInterval` in `useEffect`. Resets on mouse leave.

**Saved listings:** Uses `localStorage` key `"savedListings"` (array of property IDs).

---

## NEIGHBORHOOD SYSTEM — SPECIAL RULES

All 3 neighborhood pages use ONE template component. The `/app` page just loads data and passes it.

```typescript
// /app/neighborhoods/[slug]/page.tsx — correct pattern
import NeighborhoodTemplate from '@/features/neighborhoods/components/NeighborhoodTemplate'

export default async function NeighborhoodPage({ params }) {
  const { neighborhood, content } = await getNeighborhoodData(params.slug)
  const listings = getListingsForNeighborhood(params.slug)

  return (
    <NeighborhoodTemplate
      neighborhood={neighborhood}
      listings={listings}
      content={content}
    />
  )
}
```

**Never create separate components for Tarrytown, Westlake, Hyde Park.** One template renders all three.

---

## BLOG SYSTEM — SPECIAL RULES

- Blog posts are `.mdx` files in `/content/blog/`
- Frontmatter is parsed with `gray-matter`
- Content is rendered with `next-mdx-remote`
- Always use functions from `/lib/mdx.ts`, never parse files manually in page components
  **MDX custom components (defined in `/features/blog/components/BlogPostLayout.tsx`):**
- `h2` → styled with accent left border
- `h3` → bold, smaller
- `ul`/`ol` → accent color markers
- `blockquote` → styled callout box
- `a` → accent color

---

## PERFORMANCE RULES

1. **Hero image** → always `priority={true}` (above the fold)
2. **All other images** → default lazy loading
3. **All images** → must have `alt` text from data or config
4. **All images** → must have `sizes` prop: `"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
5. **MapView** → always `dynamic` with `ssr: false`
6. **CrispChat** → always `dynamic` with `ssr: false`
7. **Fonts** → always `next/font/google` with `display: 'swap'`

---

## WHAT YOU MUST NEVER DO

```
❌ Never hardcode color hex values in components
❌ Never hardcode agent name, phone, or email in components
❌ Never define TypeScript interfaces locally — use /types/index.ts
❌ Never create a separate template for each neighborhood page
❌ Never import MapView without dynamic + ssr:false
❌ Never set up a database in Phase 1
❌ Never add a separate Express/Node server
❌ Never add paid dependencies
❌ Never put business logic inside /app page files
❌ Never edit /components/ui/ files (auto-generated by shadcn)
❌ Never create a component for a specific neighborhood (use NeighborhoodTemplate)
❌ Never import types from anywhere except '@/types'
❌ Never read MDX files manually in a page — use /lib/mdx.ts functions
❌ Never skip generateMetadata() on a page
❌ Never put feature components in /components (only shared ones go there)
❌ Never generate region.config.ts with only one region — all 4 must always exist: US, AU, CA, UK
❌ Never hardcode currency symbols ($, £, A$) — always use region.symbol
❌ Never hardcode area units (sq ft, m²) — always use region.areaLabel
❌ Never hardcode agent titles (REALTOR®, Estate Agent) — always use region.agentTitle
❌ Never hardcode compliance/legal text — always use region.compliance
```

---

## ENVIRONMENT VARIABLES

All secrets live in `.env.local`. All are `NEXT_PUBLIC_` prefixed (client-readable).

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT=
NEXT_PUBLIC_EMAILJS_TEMPLATE_VALUATION=
NEXT_PUBLIC_EMAILJS_TEMPLATE_SHOWING=
NEXT_PUBLIC_EMAILJS_TEMPLATE_NEWSLETTER=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_CRISP_WEBSITE_ID=
NEXT_PUBLIC_SITE_URL=
```

`agentConfig` reads these via `process.env.NEXT_PUBLIC_*`. Never hardcode them.

---

## SLICE EXECUTION ORDER (BUILD SEQUENCE)

If you need to know what has been built so far, refer to this order:

```
SLICE-01  Project setup + folder structure
SLICE-02  /config/agent.config.ts + /config/region.config.ts
SLICE-03  /types/index.ts

SLICE-04  /components/layout/Header.tsx
SLICE-05  /components/layout/Footer.tsx
SLICE-06  /components/layout/MobileBottomBar.tsx + /app/layout.tsx

SLICE-07  /content/listings/listings.json
SLICE-08  /content/testimonials/testimonials.json
SLICE-09  /content/neighborhoods/*.md

SLICE-10  /features/home/components/Hero.tsx + StatsStrip.tsx
SLICE-11  /features/home/components/FeaturedListings.tsx + ThreeCardCTA.tsx + AboutTeaser.tsx
SLICE-12  /features/home/components/TestimonialsCarousel.tsx + PressStrip.tsx + NewsletterSignup.tsx
SLICE-13  /features/home/components/NeighborhoodGrid.tsx + BlogTeasers.tsx + /app/page.tsx

SLICE-14  /features/listings/components/ListingFilters.tsx + /app/listings/page.tsx
SLICE-15  /features/listings/components/PropertyCard.tsx
SLICE-16  /features/listings/components/MapView.tsx
SLICE-17  /features/listings/components/SaveSearchModal.tsx
SLICE-18  /features/listings/components/PropertyGallery.tsx + /app/listings/[slug]/page.tsx (top)
SLICE-19  /app/listings/[slug]/page.tsx (complete)

SLICE-20  /features/tools/components/MortgageCalculator.tsx + /app/calculator/page.tsx
SLICE-21  /features/valuation/components/ValuationForm.tsx + /app/valuation/page.tsx

SLICE-22  /app/buy/page.tsx
SLICE-23  /app/sell/page.tsx
SLICE-24  /app/about/page.tsx
SLICE-25  /features/contact/components/ContactForm.tsx + /app/contact/page.tsx

SLICE-26  /features/neighborhoods/components/NeighborhoodTemplate.tsx
SLICE-27  /app/neighborhoods/page.tsx + /app/neighborhoods/[slug]/page.tsx

SLICE-28  /lib/mdx.ts + /app/blog/page.tsx
SLICE-29  /app/blog/[slug]/page.tsx + 3 sample .mdx files

SLICE-30  /app/testimonials/page.tsx
SLICE-31  /app/market-report/page.tsx + /app/open-houses/page.tsx

SLICE-32  /lib/emailjs.ts + all forms wired
SLICE-33  /components/layout/CrispChat.tsx

SLICE-34  /components/layout/Analytics.tsx
SLICE-35  /lib/schema.ts + /next-sitemap.config.js
SLICE-36  /components/layout/CookieBanner.tsx + /app/privacy-policy/page.tsx + /app/terms/page.tsx

SLICE-37  Performance pass (no new files)
SLICE-38  .env.local + vercel.json
SLICE-39  Final QA + demo ready
```

---

## QUICK DECISION TREE — WHERE DOES THIS FILE GO?

```
Is it a route/page?
  → /app/[route]/page.tsx

Is it a component used only by one feature domain?
  → /features/[domain]/components/ComponentName.tsx

Is it a component used by multiple unrelated features?
  → /components/ComponentName.tsx

Is it a layout wrapper (Header, Footer, etc)?
  → /components/layout/ComponentName.tsx

Is it a utility function / server helper / integration?
  → /lib/filename.ts

Is it a React hook used in 2+ places?
  → /hooks/useHookName.ts

Is it a TypeScript interface or type?
  → /types/index.ts (add to existing file)

Is it a static data file (JSON, MDX, Markdown)?
  → /content/[category]/filename

Is it a per-client config value?
  → /config/agent.config.ts or /config/region.config.ts

Is it a secret / API key?
  → .env.local (never commit)
```

---

_agents.md — Created at project init. Keep this file updated as the project evolves._
_Stack: Next.js 16 · TypeScript · Tailwind CSS · shadcn/ui · EmailJS · Vercel_
_Structure: Jacob Rajan Standard_
