import React from "react";
import type { Neighborhood, Property } from "@/types";

// Import sub-components
import NeighborhoodHero from "./NeighborhoodHero";
import NeighborhoodStats from "./NeighborhoodStats";
import NeighborhoodOverview from "./NeighborhoodOverview";
import NeighborhoodHighlights from "./NeighborhoodHighlights";
import NeighborhoodLifestyle from "./NeighborhoodLifestyle";
import NeighborhoodSchools from "./NeighborhoodSchools";
import NeighborhoodScores from "./NeighborhoodScores";
import NeighborhoodListings from "./NeighborhoodListings";
import NeighborhoodMap from "./NeighborhoodMap";
import NeighborhoodCTA from "./NeighborhoodCTA";
import NeighborhoodVibe from "./NeighborhoodVibe";
import NeighborhoodQna from "./NeighborhoodQna";
// Client-only sidebar extracted to avoid MDXRemote server/client conflict
import NeighborhoodSidebar from "./NeighborhoodSidebar";

interface NeighborhoodTemplateProps {
  neighborhood: Neighborhood;
  listings: Property[];
  lifestyleContent: string;
}

export default function NeighborhoodTemplate({
  neighborhood,
  listings,
  lifestyleContent,
}: NeighborhoodTemplateProps) {
  const {
    name,
    heroImage,
    tagline,
    city,
    state,
    stats,
    highlights,
    schools,
    walkScore,
    transitScore,
    bikeScore,
    lat,
    lng,
    slug,
    vibeScores,
    vibeSummary,
    commuteTime,
    qna,
    heroScenes,
  } = neighborhood;

  return (
    <article className="w-full min-h-screen bg-[#f9f6f0] relative">
      {/* Floating scroll spy sidebar — client component, safe to import in server tree */}
      <NeighborhoodSidebar />

      {/* 1. Hero Section */}
      <NeighborhoodHero
        name={name}
        heroImage={heroImage}
        tagline={tagline}
        city={city}
        state={state}
        heroScenes={heroScenes}
      />

      {/* 2. Stats strip */}
      <NeighborhoodStats stats={stats} />

      {/* 3. Overview details */}
      <div id="overview">
        <NeighborhoodOverview name={name} description={neighborhood.description} />
      </div>

      {/* 4. Vibe & Indicators Dashboard */}
      <div id="vibe">
        <NeighborhoodVibe
          name={name}
          vibeScores={vibeScores}
          vibeSummary={vibeSummary}
          commuteTime={commuteTime}
        />
      </div>

      {/* 5. What to Love (Highlights) */}
      <div id="highlights">
        <NeighborhoodHighlights name={name} highlights={highlights} />
      </div>

      {/* 6. Local Lifestyle (MDX — MUST stay server, no 'use client' above this) */}
      <div id="lifestyle">
        <NeighborhoodLifestyle content={lifestyleContent} />
      </div>

      {/* 7. Insider Intelligence Q&A Accordion */}
      <div id="qna">
        <NeighborhoodQna name={name} qna={qna} />
      </div>

      {/* 8. Education / Schools */}
      <div id="schools">
        <NeighborhoodSchools name={name} schools={schools} />
      </div>

      {/* 9. Mobility / Walkability Scores */}
      <div id="scores">
        {(walkScore !== undefined || transitScore !== undefined || bikeScore !== undefined) && (
          <NeighborhoodScores
            name={name}
            walkScore={walkScore}
            transitScore={transitScore}
            bikeScore={bikeScore}
          />
        )}
      </div>

      {/* 10. Active Listings */}
      <div id="listings">
        <NeighborhoodListings name={name} slug={slug} listings={listings} />
      </div>

      {/* 11. Location map */}
      <div id="map">
        <NeighborhoodMap name={name} lat={lat} lng={lng} listings={listings} />
      </div>

      {/* 12. Agent personal Advisor CTA */}
      <div id="cta">
        <NeighborhoodCTA name={name} />
      </div>
    </article>
  );
}
