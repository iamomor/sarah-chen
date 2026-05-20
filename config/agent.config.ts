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
  siteUrl: "https://sarahchenrealty.com",
  siteTitle: "Sarah Chen | Austin REALTOR® | Luxury Property Specialist",
  siteDescription:
    "Austin's top luxury real estate agent. $142M in career sales. Serving Tarrytown, Westlake, Hyde Park. Get your free home valuation today.",

  // Google Analytics + Meta Pixel
  ga4MeasurementId: "G-V24B7V8V5Z",
  metaPixelId: "1736409933461710",

  // EmailJS Integration
  // Two-template strategy (free tier compatible):
  //   template_xmg5ta4    → "Contact" template  → emails TO the agent (all lead forms)
  //   template_sarah_chen → "Valuation" template → emails TO the client (confirmations/guides)
  emailjsServiceId: "service_real_sarahChen",
  emailjsPublicKey: "zgktaym7KWxyA6DvT",
  emailjsTemplates: {
    contact:     "template_xmg5ta4",     // → "Contact" template  → goes to agent (Sarah)
    valuation:   "template_sarah_chen",     // → "Contact" template  → goes to agent (Sarah)
    showing:     "template_xmg5ta4",     // → "Contact" template  → goes to agent (Sarah)
    newsletter:  "template_sarah_chen",  // → "Valuation" template → goes to client inbox
  },

  // Map defaults (used by MapView — change per client deployment)
  mapCenter: {
    lat: 30.2672,
    lng: -97.7431,
    zoom: 12,
    city: "Austin",
    state: "TX",
  },

  // Crisp Chat
  crispWebsiteId: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",

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
};

export type AgentConfig = typeof agentConfig;
