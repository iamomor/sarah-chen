import type { Property, BlogPost } from "@/types";
import { agentConfig } from "@/config/agent.config";

/**
 * 1. getLocalBusinessSchema()
 * Returns JSON-LD for LocalBusiness + RealEstateAgent.
 */
export function getLocalBusinessSchema() {
  const socialUrls = Object.values(agentConfig.social).filter(Boolean);
  
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    "@id": `${agentConfig.siteUrl}/#agent`,
    "name": agentConfig.name,
    "image": `${agentConfig.siteUrl}${agentConfig.headshot}`,
    "url": agentConfig.siteUrl,
    "telephone": agentConfig.phoneRaw,
    "email": agentConfig.email,
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1200 S Congress Ave, Suite 400",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78704",
      "addressCountry": "US"
    },
    "description": agentConfig.siteDescription,
    "areaServed": agentConfig.markets.map(market => ({
      "@type": "AdministrativeArea",
      "name": market
    })),
    "sameAs": socialUrls,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agentConfig.stats.googleRating,
      "reviewCount": agentConfig.stats.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

/**
 * 2. getPersonSchema()
 * Returns JSON-LD for Person (agent bio page).
 */
export function getPersonSchema() {
  const socialUrls = Object.values(agentConfig.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${agentConfig.siteUrl}/about/#person`,
    "name": agentConfig.name,
    "jobTitle": agentConfig.title,
    "worksFor": {
      "@type": "RealEstateOrganization",
      "name": agentConfig.brokerage,
      "url": agentConfig.siteUrl
    },
    "image": `${agentConfig.siteUrl}${agentConfig.headshot}`,
    "telephone": agentConfig.phoneRaw,
    "email": agentConfig.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "1200 S Congress Ave, Suite 400",
      "addressLocality": "Austin",
      "addressRegion": "TX",
      "postalCode": "78704",
      "addressCountry": "US"
    },
    "description": agentConfig.shortBio,
    "sameAs": socialUrls
  };
}

/**
 * 3. getBreadcrumbSchema(items: {name: string, url: string}[])
 * Returns BreadcrumbList JSON-LD.
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${agentConfig.siteUrl}${item.url}`
    }))
  };
}

/**
 * 4. getArticleSchema(post: BlogPost)
 * Returns Article JSON-LD for blog posts.
 */
export function getArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${agentConfig.siteUrl}/blog/${post.slug}/#article`,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage.startsWith("http") ? post.coverImage : `${agentConfig.siteUrl}${post.coverImage}`,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author || agentConfig.name,
      "url": `${agentConfig.siteUrl}/about`
    },
    "publisher": {
      "@type": "RealEstateAgent",
      "name": agentConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${agentConfig.siteUrl}${agentConfig.headshot}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${agentConfig.siteUrl}/blog/${post.slug}`
    }
  };
}

/**
 * 5. getFAQSchema(faqs: {question: string, answer: string}[])
 * Returns FAQPage JSON-LD for buy/sell pages.
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * 6. getRealEstateListingSchema(property: Property)
 * Returns Product/SingleFamilyResidence schema adapted for real estate listings.
 */
export function getRealEstateListingSchema(property: Property) {
  const imageUrls = property.photos.map(photo => 
    photo.startsWith("http") ? photo : `${agentConfig.siteUrl}${photo}`
  );

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${agentConfig.siteUrl}/listings/${property.slug}/#listing`,
    "name": `${property.details.beds} Bed ${property.details.propertyType} in ${property.address.neighborhood}`,
    "description": property.description,
    "url": `${agentConfig.siteUrl}/listings/${property.slug}`,
    "image": imageUrls,
    "datePosted": property.listedDate,
    "about": {
      "@type": ["SingleFamilyResidence", "House"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": property.address.street,
        "addressLocality": property.address.city,
        "addressRegion": property.address.state,
        "postalCode": property.address.zip,
        "addressCountry": "US"
      },
      "numberOfRooms": property.details.beds + property.details.baths,
      "numberOfBedrooms": property.details.beds,
      "numberOfBathroomsTotal": property.details.baths,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": property.details.sqft,
        "unitCode": "FTK"
      },
      "yearBuilt": property.details.yearBuilt
    },
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "USD",
      "url": `${agentConfig.siteUrl}/listings/${property.slug}`,
      "availability": "https://schema.org/InStock",
      "validFrom": property.listedDate
    }
  };
}

// Keep the old function name alias for backward compatibility or existing references
export const generateListingSchema = getRealEstateListingSchema;
