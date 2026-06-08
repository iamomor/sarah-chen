import React from "react";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import ContactPageContainer from "@/features/contact/components/ContactPageContainer";

export const generateMetadata = () => {
  const agentName = agentConfig.name;
  return {
    title: `Contact ${agentName} | ${region.defaultCity} ${region.agentTitle}`,
    description: `Get in touch with ${agentName}, ${region.defaultCity}'s top luxury real estate agent. Call, email, or send a message directly.`,
    openGraph: {
      title: `Contact ${agentName} | ${region.defaultCity} ${region.agentTitle}`,
      description: `Get in touch with ${agentName}, ${region.defaultCity}'s top luxury real estate agent. Call, email, or send a message directly.`,
      images: [
        {
          url: agentConfig.contactPage.heroImage,
          width: 1200,
          height: 630,
          alt: `Contact ${agentName}`,
        },
      ],
    },
  };
};

export default function ContactPage() {
  return <ContactPageContainer />;
}
