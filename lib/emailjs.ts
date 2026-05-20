import emailjs from "@emailjs/browser";
import { agentConfig } from "@/config/agent.config";
import type { ValuationFormData, ContactFormData, ShowingRequestData } from "@/types";

/**
 * Initialize EmailJS with client public key
 */
export const initEmailJS = () => {
  if (agentConfig.emailjsPublicKey && agentConfig.emailjsPublicKey !== "XXXXXXXXXXXXXXX") {
    emailjs.init({
      publicKey: agentConfig.emailjsPublicKey,
    });
  }
};

/**
 * Send Contact Form request
 */
export const sendContactForm = async (data: ContactFormData) => {
  try {
    const fullName = `${data.firstName} ${data.lastName}`;
    const templateParams = {
      to_name: agentConfig.name,
      to_email: agentConfig.email,
      
      // Dual-mapped keys for absolute fallback safety
      from_name: fullName,
      name: fullName,
      
      from_email: data.email,
      email: data.email,
      
      from_phone: data.phone || "Not provided",
      phone: data.phone || "Not provided",
      
      message: data.message,
      notes: data.message,
      
      subject: `New Contact Request from ${fullName}`,
      title: `New Contact Request from ${fullName}`,

    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.contact,
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Contact Form Error:", error);
    throw error;
  }
};

/**
 * Send Home Valuation Lead captured from wizard
 */
export const sendValuationRequest = async (data: ValuationFormData) => {
  try {
    const templateParams = {
      to_name: agentConfig.name,
      to_email: agentConfig.email,
      
      // Dual-mapped keys for absolute fallback safety
      from_name: data.name,
      name: data.name,
      
      from_email: data.email,
      email: data.email,
      
      from_phone: data.phone,
      phone: data.phone,
      
      street_address: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      property_type: data.propertyType,
      bedrooms: data.beds,
      bathrooms: data.baths,
      area: data.sqft,
      year_built: data.yearBuilt,
      condition: data.condition,
      improvements: Array.isArray(data.updates) && data.updates.length > 0 
        ? data.updates.join(", ") 
        : "None specified",
      selling_timeline: data.timing,
      
      subject: `Luxury Valuation Protocol Request: ${data.street}, ${data.city}`,
      title: `Luxury Valuation Protocol Request: ${data.street}, ${data.city}`,
    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.valuation,
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Valuation Request Error:", error);
    throw error;
  }
};

/**
 * Send Showing Request for a listing
 */
export const sendShowingRequest = async (data: ShowingRequestData) => {
  try {
    const templateParams = {
      to_name: agentConfig.name,
      to_email: agentConfig.email,
      
      // Dual-mapped keys for absolute fallback safety
      from_name: data.name,
      name: data.name,
      
      from_email: data.email,
      email: data.email,
      
      from_phone: data.phone,
      phone: data.phone,
      
      property_title: data.propertyAddress,
      mls_number: data.mlsNumber || "N/A",
      preferred_date: data.preferredDate,
      preferred_time: data.preferredTime,
      message: data.message || "Requesting a private showing.",
      
      subject: `Private Showing Request: ${data.propertyAddress}`,
      title: `Private Showing Request: ${data.propertyAddress}`,

    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.showing,
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Showing Request Error:", error);
    throw error;
  }
};

/**
 * Send Newsletter subscription request
 */
export const sendNewsletterSignup = async (email: string, name?: string) => {
  try {
    const recipientName = name || "Valued Client";
    const templateParams = {
      to_name: recipientName,
      to_email: email, // Routes the email directly to the subscriber's personal inbox!
      subscriber_email: email,
      agent_name: agentConfig.name,
      agent_email: agentConfig.email,
      
      subject: `Your ${agentConfig.mapCenter.city} Residential Acquisition Handbook`,
      title: `Your ${agentConfig.mapCenter.city} Residential Acquisition Handbook`,

      // Dual-mapped keys for absolute fallback safety
      from_name: recipientName,
      name: recipientName,
      from_email: email,
      email: email,
      from_phone: "Not required",
      phone: "Not required",

      message: `Dear ${recipientName},

Thank you for subscribing to our newsletter! Your exclusive 2026 ${agentConfig.mapCenter.city} Residential Acquisition Handbook has been successfully delivered.

You can access your copy anytime using the link below:
${agentConfig.siteUrl}/2026_Acquisition_Handbook.txt

We are thrilled to accompany you on your luxury real estate journey and look forward to helping you navigate the ${agentConfig.mapCenter.city} market with unmatched confidence.

Warmest regards,
${agentConfig.name}
${agentConfig.title}`,

      notes: `Dear ${recipientName},

Thank you for subscribing to our newsletter! Your exclusive 2026 ${agentConfig.mapCenter.city} Residential Acquisition Handbook has been successfully delivered.

You can access your copy anytime using the link below:
${agentConfig.siteUrl}/2026_Acquisition_Handbook.txt

We are thrilled to accompany you on your luxury real estate journey and look forward to helping you navigate the ${agentConfig.mapCenter.city} market with unmatched confidence.

Warmest regards,
${agentConfig.name}
${agentConfig.title}`
    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.newsletter,
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Newsletter Error:", error);
    throw error;
  }
};

/**
 * Send Buyer Guide download email
 */
export const sendBuyerGuide = async (email: string, name: string) => {
  try {
    const templateParams = {
      to_name: name,
      to_email: email,
      subscriber_email: email,
      agent_name: agentConfig.name,
      agent_email: agentConfig.email,
      
      subject: `Your ${agentConfig.mapCenter.city} Residential Acquisition Handbook`,
      title: `Your ${agentConfig.mapCenter.city} Residential Acquisition Handbook`,

      // Dual-mapped keys for absolute fallback safety
      from_name: name,
      name: name,
      from_email: email,
      email: email,
      from_phone: "Not required",
      phone: "Not required",

      message: `Dear ${name},

Thank you for requesting the buyer guide! Your exclusive 2026 ${agentConfig.mapCenter.city} Residential Acquisition Handbook has been successfully delivered.

You can access your copy anytime using the link below:
${agentConfig.siteUrl}/2026_Acquisition_Handbook.txt

We are thrilled to accompany you on your luxury real estate journey and look forward to helping you navigate the ${agentConfig.mapCenter.city} market with unmatched confidence.

Warmest regards,
${agentConfig.name}
${agentConfig.title}`,

      notes: `Dear ${name},

Thank you for requesting the buyer guide! Your exclusive 2026 ${agentConfig.mapCenter.city} Residential Acquisition Handbook has been successfully delivered.

You can access your copy anytime using the link below:
${agentConfig.siteUrl}/2026_Acquisition_Handbook.txt

We are thrilled to accompany you on your luxury real estate journey and look forward to helping you navigate the ${agentConfig.mapCenter.city} market with unmatched confidence.

Warmest regards,
${agentConfig.name}
${agentConfig.title}`
    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.newsletter,
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Buyer Guide Error:", error);
    throw error;
  }
};

/**
 * Send Seller Guide download email
 */
export const sendSellerGuide = async (email: string, name: string) => {
  try {
    const templateParams = {
      to_name: name,
      to_email: email,
      subscriber_email: email,
      agent_name: agentConfig.name,
      agent_email: agentConfig.email,
      
      subject: `Your Private ${agentConfig.mapCenter.city} Property Value Optimization Handbook`,
      title: `Your Private ${agentConfig.mapCenter.city} Property Value Optimization Handbook`,

      // Dual-mapped keys for absolute fallback safety
      from_name: name,
      name: name,
      from_email: email,
      email: email,
      from_phone: "Not required",
      phone: "Not required",

      message: `Dear ${name},

Thank you for requesting the seller guide! Your exclusive 2026 ${agentConfig.mapCenter.city} Property Value Optimization Handbook has been successfully compiled.

You can access your copy anytime using the link below:
${agentConfig.siteUrl}/2026_Equity_Optimization_Handbook.txt

We look forward to helping you maximize your property's value and navigate the ${agentConfig.mapCenter.city} real estate corridors with scientific positioning.

Warmest regards,
${agentConfig.name}
${agentConfig.title}`,

      notes: `Dear ${name},

Thank you for requesting the seller guide! Your exclusive 2026 ${agentConfig.mapCenter.city} Property Value Optimization Handbook has been successfully compiled.

You can access your copy anytime using the link below:
${agentConfig.siteUrl}/2026_Equity_Optimization_Handbook.txt

We look forward to helping you maximize your property's value and navigate the ${agentConfig.mapCenter.city} real estate corridors with scientific positioning.

Warmest regards,
${agentConfig.name}
${agentConfig.title}`
    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.newsletter,
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Seller Guide Error:", error);
    throw error;
  }
};

/**
 * Send Seller Worksheet lead to agent inbox.
 * Maps worksheet fields into the Contact template (template_xmg5ta4) table rows
 * so Address and Timing appear as filled structured rows, not in the message body.
 */
export const sendSellerWorksheet = async (data: {
  name: string;
  email: string;
  phone: string;
  address: string;
  timing: string;
}) => {
  try {
    const templateParams = {
      to_name: agentConfig.name,
      to_email: agentConfig.email,

      // Dual-mapped client contact keys
      from_name: data.name,
      name: data.name,
      from_email: data.email,
      email: data.email,
      from_phone: data.phone,
      phone: data.phone,

      // Map the 3 marked form fields → into the Contact template's table rows
      property_title: data.address,                       // → "Property / Address" row ✅
      preferred_date: `Selling within: ${data.timing}`,   // → "Requested Date" row ✅ (repurposed)
      preferred_time: "—",                                // → "Preferred Time" row

      // Short note in message section — not the main data anymore
      message: "Seller Strategy Worksheet inquiry.",
      notes:   "Seller Strategy Worksheet inquiry.",

      subject: `Seller Strategy Worksheet: ${data.address}`,
      title:   `Seller Strategy Worksheet: ${data.address}`,
    };

    return await emailjs.send(
      agentConfig.emailjsServiceId,
      agentConfig.emailjsTemplates.contact, // template_xmg5ta4 — same as Contact form
      templateParams,
      agentConfig.emailjsPublicKey
    );
  } catch (error) {
    console.error("EmailJS Seller Worksheet Error:", error);
    throw error;
  }
};
