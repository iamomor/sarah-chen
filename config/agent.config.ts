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
    primary: "#1a2744", // deep navy
    accent: "#c9a96e", // warm gold
    background: "#f9f6f0", // warm white
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
  shortBio:
    "Austin's most trusted luxury real estate specialist with $142M in career sales and 12 years serving Tarrytown, Westlake, and Hyde Park.",
  fullBioFile: "sarah-chen-bio",

  social: {
    facebook: "https://facebook.com/sarahchenrealty",
    instagram: "https://instagram.com/sarahchenrealty",
    linkedin: "https://linkedin.com/in/sarahchenrealty",
    youtube: "https://youtube.com/@sarahchenrealty",
    googleReviews: "https://google.com/maps",
    zillowReviews: "https://zillow.com/profile",
  },

  // Photos (store in /public/images/)
  headshot: "/images/agent-headshot.jpg",
  headshotAlt: "Sarah Chen, Austin REALTOR®",

  // Markets served
  markets: [
    "Tarrytown",
    "Westlake",
    "Hyde Park",
    "Barton Hills",
    "Travis Heights",
  ],

  // Press mentions
  press: [
    { name: "Austin Business Journal", url: "#" },
    { name: "Wall Street Journal", url: "#" },
    { name: "Inman News", url: "#" },
    { name: "RealTrends", url: "#" },
  ],

  // IDX / Listings
  idxEnabled: true,
  idxEmbedUrl: "", // Showcase IDX embed URL goes here when client signs up

  // Calendly or booking link
  bookingUrl: "https://calendly.com/sarahchenrealty",

  // SEO
  // Priority: NEXT_PUBLIC_SITE_URL env var → hardcoded fallback
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sarahchenrealty.com",
  siteTitle: "Sarah Chen | Austin REALTOR® | Luxury Property Specialist",
  siteDescription:
    "Austin's top luxury real estate agent. $142M in career sales. Serving Tarrytown, Westlake, Hyde Park. Get your free home valuation today.",

  // Google Analytics + Meta Pixel
  // Priority: NEXT_PUBLIC_* env var → hardcoded fallback
  ga4MeasurementId: process.env.NEXT_PUBLIC_GA4_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,

  // EmailJS Integration
  emailjsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  emailjsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  emailjsTemplates: {
    contact:    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT,
    valuation:  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_VALUATION,
    showing:    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_SHOWING,
    newsletter: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_NEWSLETTER,
  },

  // Map defaults (used by MapView — change per client deployment)
  mapCenter: {
    lat: 30.2672,
    lng: -97.7431,
    zoom: 12,
    city: "Austin",
    state: "TX",
  },

  // Crisp Chat — value comes from .env.local (NEXT_PUBLIC_CRISP_WEBSITE_ID)
  crispWebsiteId: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ?? "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",

  // Valuation Customizations (Edit here to change form fields globally per agent)
  valuation: {
    propertyTypes: [
      {
        value: "Single Family",
        label: "Single Family",
        desc: "Detached luxury residence",
      },
      { value: "Condo", label: "Condominium", desc: "Premium private unit" },
      {
        value: "Townhouse",
        label: "Townhouse",
        desc: "Multi-level attached estate",
      },
      {
        value: "Multi-Family",
        label: "Multi-Family",
        desc: "Income producing multi-unit",
      },
    ],
    conditions: [
      {
        value: "Excellent",
        label: "Turnkey / Excellent",
        desc: "Fully renovated or brand new",
      },
      {
        value: "Good",
        label: "Good / Well Maintained",
        desc: "Minor wear, ready to move in",
      },
      {
        value: "Fair",
        label: "Fair / Needs TLC",
        desc: "Mostly functional, original systems",
      },
      {
        value: "Needs Work",
        label: "Needs Work / Fixer",
        desc: "Major repairs or updates required",
      },
    ],
    updates: [
      { id: "kitchen", label: "Updated Kitchen" },
      { id: "bathrooms", label: "Updated Bathrooms" },
      { id: "roof", label: "New Roof" },
      { id: "hvac", label: "New HVAC" },
      { id: "flooring", label: "New Flooring" },
      { id: "paint", label: "Fresh Paint" },
      { id: "pool", label: "Pool Added" },
    ],
    timings: [
      { value: "ASAP", label: "ASAP (Within 1 Month)" },
      { value: "1-3 months", label: "1 to 3 Months" },
      { value: "3-6 months", label: "3 to 6 Months" },
      { value: "Just curious", label: "Just Curious / Researching" },
    ],
    pageCopy: {
      badge: "Exclusive Seller Intelligence",
      title: "Asset Value",
      titleAccent: "Optimization",
      subtitle:
        "Automated tools output outdated computer averages. Our personalized evaluations align private market comps, local infrastructure updates, and architectural premiums.",
      trustTitle: "The Sterling Standard",
      trustSubtitle: "Bespoke insights, zero obligations.",
      trustPoints: [
        {
          title: "Algorithmic Corrections",
          desc: "Automated valuation models err by up to 20% in luxury corridors. We factor in structural adjustments, design aesthetics, and private market views.",
        },
        {
          title: "Actionable ROI Blueprint",
          desc: "Receive an itemized checklist detailing which minor aesthetic improvements or structural repairs yield the highest return before putting your home on the market.",
        },
        {
          title: "Confidential Intelligence",
          desc: "Your asset valuation remains entirely private. No public listings, no persistent agent calls, and zero external database reporting.",
        },
      ],
      processTitle: "Our Structured Valuation",
      processAccent: "Protocol",
      processSubtitle:
        "We compile, evaluate, and deliver luxury-tier real estate market findings in three clean phases.",
      processSteps: [
        {
          step: "01",
          title: "Specification Logging",
          desc: "Provide basic architectural elements, unique modifications, and property status securely.",
        },
        {
          step: "02",
          title: "Bespoke Market Audit",
          desc: "Our experts cross-examine neighborhood micro-indicators, private listings, and recent comparable transactions.",
        },
        {
          step: "03",
          title: "Consultation Delivery",
          desc: "Receive a highly detailed, professional valuation report directly in your inbox with absolute discretion.",
        },
      ],
    },
  },

  // About Page Customizations (Dynamic data for reusability across agent deployments)
  aboutPage: {
    heroImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
    bio: {
      eyebrow: "My Story",
      heading: "Why I Do This Work",
      paragraphs: [
        "My entry into the real estate sector was not driven by transactional mechanics, but by a deep-seated fascination with architecture, space, and the enduring concept of legacy. I began my education at the University of Texas at Austin, studying Architecture and Art History. Walking through the historical streets of Tarrytown and surveying the mid-century designs of Westlake, I quickly understood that homes are more than structural coordinates—they are living vessels of family heritage and critical nodes within an individual’s financial portfolio.",
        "This realization prompted my transition into brokerage. I recognized a profound need in the Austin luxury market for a client-first, advisory-driven approach. I chose to build a practice founded on absolute discretion, meticulous quantitative analysis, and a commitment to advocacy. For my clients, a property transaction represents both a highly personal milestone and an asset optimization exercise. My role is to harmonize these dynamics, shielding my clients from market volatility while ensuring their aesthetic and financial criteria are fully realized.",
        "Over the past twelve years, I have had the privilege of witnessing Austin evolve from a cultural gem into a global center for technological and creative innovation. The beauty of this city lies in its architectural diversity. On any given day, my advisory work ranges from representing classic 1920s Tudor estates in Hyde Park to launching modern, steel-and-glass structural achievements overlooking the hills of Westlake.",
        "To provide standard service is common; to provide fiduciary representation is rare. I treat every transaction with the gravity it deserves. This client-centric philosophy guides my schedule, negotiation strategy, and administrative protocols. My clients deserve a partner who operates with total transparency, handles complex negotiations with objectivity, and remains deeply accessible throughout the entire lifespan of their asset ownership.",
        "Austin is my home. Outside of property tours and contract sessions, you will find me spending weekends with my husband and two children along Town Lake, paddleboarding near Lady Bird Lake, or participating in the Hyde Park neighborhood cleanup project. As a committed advocate for the local community, I sponsor the Austin Housing Coalition to support sustainable urban development, ensuring Austin remains a vibrant, welcoming home for generations to come."
      ],
      ctaText: "Let's Find Your Austin Home",
    },
    video: {
      heading: "Meet Sarah in 2 Minutes",
      subtitle: "A quick introduction to how Sarah works with clients and structures transactions.",
      youtubeEmbedUrl: "https://www.youtube.com/embed/n42n_b-0n_w?modestbranding=1&rel=0",
    },
    credentials: [
      {
        title: "Licensed REALTOR®",
        detail: "TX#0548291",
        desc: "Fully licensed by the Texas Real Estate Commission, executing transactions under strict fiduciary guidelines.",
        iconName: "ShieldCheck",
      },
      {
        title: "NAR Member",
        detail: "National Association of REALTORS®",
        desc: "Committed to upholding the absolute highest standard of ethics, fiduciary duties, and client advocacy.",
        iconName: "Users",
      },
      {
        title: "ABoR Member",
        detail: "Austin Board of REALTORS®",
        desc: "Accessing hyper-local MLS board analytics, off-market opportunities, and municipal development initiatives.",
        iconName: "MapPin",
      },
      {
        title: "RealTrends Verified",
        detail: "Top 1.5% Nationwide",
        desc: "Recognized as a leading national performer for luxury real estate volume and customer satisfaction.",
        iconName: "Award",
      },
      {
        title: "Luxury Specialist",
        detail: "Bespoke Portfolio Designation",
        desc: "Certified expertise in marketing high-end architectural estates, private compounds, and waterfront properties.",
        iconName: "Gem",
      },
      {
        title: "ABR® Designation",
        detail: "Accredited Buyer's Representative",
        desc: "Advanced training in representing and protecting buyers' financial interests in competitive markets.",
        iconName: "GraduationCap",
      },
    ],
    team: [
      {
        name: "Marcus Webb",
        role: "Transaction Coordinator",
        desc: "Ensures every logistical detail and legal disclosure is executed with absolute precision, managing timelines from contract to close.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
      },
      {
        name: "Priya Sharma",
        role: "Marketing Director",
        desc: "Directs cinematic photography, targeted digital campaigns, and custom property websites to capture maximum buyer attention.",
        photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
      },
      {
        name: "Daniel Okafor",
        role: "Buyer Specialist",
        desc: "Locates off-market opportunities and provides dedicated, high-touch guidance for buyers navigating Austin's competitive landscape.",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
      },
    ],
    community: [
      {
        title: "Austin Housing Coalition Supporter",
        desc: "Advocating for sustainable affordable housing policies, equitable zoning, and city-wide developmental solutions to ensure that Austin remains accessible for all residents as it continues to grow.",
        iconName: "HeartHandshake",
      },
      {
        title: "Annual Hyde Park Cleanup Sponsor",
        desc: "Sponsoring and organizing annual community cleanup initiatives to preserve the historic green spaces, local parks, and unique residential heritage of central Austin neighborhoods.",
        iconName: "Trees",
      },
      {
        title: "Youth Homeownership Workshops",
        desc: "Leading educational seminars and financial literacy workshops to empower young professionals and first-time buyers with the strategies required to achieve long-term property ownership.",
        iconName: "BookOpen",
      },
    ],
    cta: {
      heading: "Ready to Work Together?",
      subtitle: "Whether you are listing an architectural landmark or searching for a private residential retreat, we stand ready to advise you.",
      scheduleText: "Schedule a Call",
      browseText: "Browse Listings",
      bgImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
    },
  },

  // Buyer Page Customizations
  buyPage: {
    resources: {
      eyebrow: "Knowledge Library",
      heading: "Exclusive",
      headingAccent: "Buyer Resources",
      subtitle: "Equip yourself with the same analytical tools, regional guidelines, and transaction logs our agents deploy daily.",
      cards: [
        {
          title: "Mortgage Calculator",
          subtitle: "Interactive Tool • Online",
          desc: "Analyze premium jumbo mortgage scenarios, custom amortization breakdowns, current down payments, and carry costs with our real-time regional indices.",
          iconName: "Calculator",
          link: "/calculator",
          linkText: "Open Calculator"
        },
        {
          title: "Explore Neighborhoods",
          subtitle: "Regional Intelligence • Guides",
          desc: "Dive into detailed micro-market reports, school performance metrics, historical appreciation charts, and off-market profiles for premier neighborhoods.",
          iconName: "Map",
          link: "/neighborhoods",
          linkText: "Explore Regions"
        }
      ]
    }
  },

  // Contact Page Customizations
  contactPage: {
    heroImage: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&q=80&w=2000",
    eyebrow: "Direct Advisory Line",
    heading: "Let's",
    headingAccent: "Connect",
    subtitle: "Whether you're buying, selling, or just exploring your options — we're here to help you navigate Austin's luxury real estate landscape with absolute confidence.",
    officeHours: [
      { days: "Monday – Friday", hours: "8:00 AM – 7:00 PM" },
      { days: "Saturday", hours: "9:00 AM – 6:00 PM" },
      { days: "Sunday", hours: "10:00 AM – 4:00 PM" },
    ],
    officeHoursNote: "Responding to inquiries 7 days a week",
    inquiryTypes: [
      { value: "Buyer", label: "I'm a Buyer" },
      { value: "Seller", label: "I'm a Seller" },
      { value: "Both", label: "Both — Buying & Selling" },
      { value: "Just Curious", label: "Just Curious" },
    ],
    referralSources: [
      { value: "Google", label: "Google Search" },
      { value: "Zillow", label: "Zillow" },
      { value: "Referral", label: "Friend / Referral" },
      { value: "Instagram", label: "Instagram" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Other", label: "Other" },
    ],
    mapQuery: "1200+S+Congress+Ave+Suite+400+Austin+TX+78704",
  },

  // Market Report Page Customizations
  marketReport: {
    metrics: [
      {
        id: "median-price",
        label: "Median Sale Price",
        value: "$487,000",
        change: "-3.2% YoY",
        trend: "down",
        insight: "Prices stabilized month-over-month since February, with Westlake holding flat.",
      },
      {
        id: "inventory",
        label: "Inventory Levels",
        value: "2.1 Months",
        change: "+11% YoY",
        trend: "up",
        insight: "Highly compressed below $900K, but luxury tier ($1.5M+) has risen to 5.2 months.",
      },
      {
        id: "days-on-market",
        label: "Avg Days on Market",
        value: "28 Days",
        change: "Stable",
        trend: "stable",
        insight: "Central corridors (like Tarrytown) absorption is faster, averaging 17 days.",
      },
    ],
  },
};

export type AgentConfig = typeof agentConfig;
