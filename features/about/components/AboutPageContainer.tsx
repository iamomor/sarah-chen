import React from "react";
import AboutHero from "./AboutHero";
import AboutBio from "./AboutBio";
import AboutCareerStats from "./AboutCareerStats";
import AboutCredentials from "./AboutCredentials";
import AboutVideo from "./AboutVideo";
import AboutTeam from "./AboutTeam";
import AboutCommunity from "./AboutCommunity";
import AboutBottomCTA from "./AboutBottomCTA";

export default function AboutPageContainer() {
  return (
    <main className="bg-[#f9f6f0] min-h-screen relative overflow-x-hidden">
      {/* 1. Hero block */}
      <AboutHero />

      {/* 2. Editorial bio narrative */}
      <AboutBio />

      {/* 3. Expanded career statistics */}
      <AboutCareerStats />

      {/* 4. Credentials & Professional boards */}
      <AboutCredentials />

      {/* 5. Cinematic introductory video */}
      <AboutVideo />

      {/* 6. Team profiles */}
      <AboutTeam />

      {/* 7. Community advocacy and workshops */}
      <AboutCommunity />

      {/* 8. Call to action closing strip */}
      <AboutBottomCTA />
    </main>
  );
}
