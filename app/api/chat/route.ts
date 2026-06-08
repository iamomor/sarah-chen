import { agentConfig } from "@/config/agent.config";
import { NextResponse } from "next/server";
import { region } from "@/config/region.config";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import listingsData from "@/content/listings/listings.json";
import testimonialsData from "@/content/testimonials/testimonials.json";

// ─── OpenRouter Free Models ────────────────────────────────────────────────
// These models are 100% free on OpenRouter — no billing, no credits required.
// We use the 'openrouter/free' router as the primary option since it dynamically
// routes to the best currently available working free model, with specific fallbacks.
const FREE_MODELS = [
  "google/gemini-2.5-flash:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "meta-llama/llama-3.2-3b-instruct:free",
  "openrouter/free",
];

function parseDynamicContent(content: string) {
  const firstName = agentConfig.name.split(" ")[0];
  return content
    .replace(/\{\{agentName\}\}/g, agentConfig.name)
    .replace(/\{\{agentFirstName\}\}/g, firstName)
    .replace(/\{\{city\}\}/g, region.defaultCity)
    .replace(/\{\{state\}\}/g, region.defaultState)
    .replace(/\{\{regionName\}\}/g, region.regionName);
}

function getListingsSummary(): string {
  try {
    const activeListings = (listingsData as any[]).filter(
      (l) => l.status === "Active"
    );
    return activeListings
      .map(
        (l) =>
          `- ${l.address.street}, ${l.address.neighborhood} (${l.details.beds} beds, ${l.details.baths} baths, ${l.details.sqft} ${region.areaLabel}): $${l.price.toLocaleString()} - ${l.description.substring(0, 100)}...`
      )
      .join("\n");
  } catch (e) {
    console.error("Error getting listings summary:", e);
    return "No active listings available.";
  }
}

function getTestimonialsSummary(): string {
  try {
    const featured = (testimonialsData as any[]).filter((t) => t.featured || t.rating === 5);
    return featured
      .slice(0, 4)
      .map(
        (t) =>
          `- ${t.authorName} (${t.role} in ${t.neighborhood}): "${t.text.substring(0, 100)}..."`
      )
      .join("\n");
  } catch (e) {
    console.error("Error getting testimonials summary:", e);
    return "No testimonials available.";
  }
}

let cachedNeighborhoods: string | null = null;
function getNeighborhoodsSummary(): string {
  if (cachedNeighborhoods) return cachedNeighborhoods;
  try {
    const dir = path.join(process.cwd(), "content/neighborhoods");
    if (!fs.existsSync(dir)) return "No neighborhood data available.";
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    
    cachedNeighborhoods = files
      .map((file) => {
        const filePath = path.join(dir, file);
        let raw = fs.readFileSync(filePath, "utf-8");
        raw = parseDynamicContent(raw);
        const { data } = matter(raw);
        const n = data as any;
        return `- ${n.name}: Avg Price $${(n.stats?.avgPrice || 0).toLocaleString()}, Vibe: ${n.vibeSummary || ""}`;
      })
      .join("\n");
    return cachedNeighborhoods;
  } catch (e) {
    console.error("Error getting neighborhoods summary:", e);
    return "No neighborhood data available.";
  }
}

function buildSystemPrompt(pageContext: string): string {
  // Extract markets dynamically from agentConfig
  const marketsServed = agentConfig.markets?.join(", ") || "the local area";
  const listingsSummary = getListingsSummary();
  const neighborhoodsSummary = getNeighborhoodsSummary();
  const testimonialsSummary = getTestimonialsSummary();
  
  return `
You are the expert AI assistant representing ${agentConfig.name}, a premier ${agentConfig.title} based in ${agentConfig.mapCenter.city}, ${agentConfig.mapCenter.state || ""}.

Your role is to be the first point of contact for potential real estate clients visiting the website. You must be:
- Professional, warm, and authoritative on ${agentConfig.mapCenter.city} luxury real estate
- Concise (chat widget replies — keep to 3–6 lines maximum)
- Proactive in capturing leads (name + phone number) for the agent to follow up
- Honest about what you can and cannot do — you are an AI, ${agentConfig.name} is the licensed human expert

### Agent Profile
- Name: ${agentConfig.name}
- Title: ${agentConfig.title}
- Brokerage: ${agentConfig.brokerage}
- License: ${agentConfig.licenseNumber || "N/A"}
- Phone: ${agentConfig.phone}
- Email: ${agentConfig.email}
- Booking: ${agentConfig.bookingUrl}
- Website: ${agentConfig.siteUrl}

### Career Highlights
- ${agentConfig.stats.careerSalesVolume} career sales volume
- ${agentConfig.stats.homesSold} homes sold in ${agentConfig.stats.yearsExperience} years
- ${agentConfig.stats.listToSaleRatio} average list-to-sale ratio (clients get MORE than asking price)
- Only ${agentConfig.stats.avgDaysOnMarket} average days on market
- ${agentConfig.stats.googleRating}/5 rating from ${agentConfig.stats.reviewCount}+ verified reviews

### Regions & Markets Served
- Active Region: ${region.regionName || agentConfig.mapCenter.city} (${region.currency} ${region.symbol})
- Area Unit: ${region.areaLabel}
- Listing Platform: ${region.listingPlatform}
- Markets: ${marketsServed}

### Real-Time Website Data
#### Current Active Listings (Property Details):
${listingsSummary}

#### Neighborhood Profiles & Statistics:
${neighborhoodsSummary}

#### Client Testimonials (Reviews):
${testimonialsSummary}

### Visitor's Current Page
The visitor is currently on: "${pageContext}"

### Rules
1. Keep responses SHORT — 3 to 6 lines maximum. Use line breaks, not long paragraphs.
2. Use plain text only — no markdown bold/italic as Crisp displays it literally.
3. If asked about specific listings, answer accurately using the "Current Active Listings" data provided above. Mention price, beds, baths, and neighborhood, and offer to have ${agentConfig.name} send more details.
4. If asked about neighborhoods, use the "Neighborhood Profiles & Statistics" data provided above.
5. If asked about client satisfaction or reviews, reference the "Client Testimonials" data.
6. If asked about mortgage rates, give typical ranges for ${agentConfig.mapCenter.city} but recommend they speak with a lender.
7. Always end with a clear call to action: book at ${agentConfig.bookingUrl}, call/text ${agentConfig.phone}, or get a valuation at ${agentConfig.siteUrl}/valuation.
8. If a visitor seems ready to act or interested in a property, ask for their name and phone number so ${agentConfig.name} can follow up personally.
9. Never make up property prices, statistics, or listing data you don't know. If the data is not in the list, state that you can have ${agentConfig.name} pull the information for them from the ${region.listingPlatform}.
  `.trim();
}

export async function POST(req: Request) {
  try {
    const { messages, pageContext } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;

    // ── Fallback: no API key configured yet ─────────────────────────────────
    if (!apiKey || apiKey.startsWith("sk-or-PLACEHOLDER")) {
      const userMessage = (
        (messages as { role: string; content: string }[])
          .filter((m) => m.role === "user")
          .at(-1)?.content ?? ""
      ).toLowerCase();

      let reply = `Hi! I'm Sarah's AI assistant. The AI backend isn't configured yet — but you can reach Sarah directly right now:\n\n📞 ${agentConfig.phone}\n📧 ${agentConfig.email}\n📅 ${agentConfig.bookingUrl}`;

      if (userMessage.includes("buy") || userMessage.includes("home") || userMessage.includes("house")) {
        reply = `Austin is one of the most competitive luxury markets in the US right now.\n\nSarah has helped ${agentConfig.stats.homesSold}+ buyers navigate it — with an average of just ${agentConfig.stats.avgDaysOnMarket} days on market.\n\nBook a free strategy call: ${agentConfig.bookingUrl}`;
      } else if (userMessage.includes("sell") || userMessage.includes("value") || userMessage.includes("worth")) {
        reply = `Sarah's clients sell for ${agentConfig.stats.listToSaleRatio} of asking price on average — that means more money for you.\n\nGet a free bespoke valuation in 3 minutes: ${agentConfig.siteUrl}/valuation`;
      } else if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("market")) {
        reply = `Austin luxury market snapshot (May 2026):\n\n• Median sale price: $487,000\n• Avg days on market: 28 days\n• Inventory: 2.1 months (very compressed)\n\nWant a neighbourhood-specific breakdown? Call/text Sarah at ${agentConfig.phone}`;
      }

      return NextResponse.json({ reply });
    }

    // ── Try each free model in sequence ─────────────────────────────────────
    const formattedMessages = (
      messages as { role: "user" | "assistant"; content: string }[]
    ).filter((m) => m.content?.trim());

    const systemPrompt = buildSystemPrompt(pageContext || "Homepage");

    let lastError = "";

    for (const model of FREE_MODELS) {
      const controller = new AbortController();
      // Use short 6-second timeout for first model, and 5-second for fallbacks to reply quickly
      const timeoutMs = model === FREE_MODELS[0] ? 6000 : 5000;
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": agentConfig.siteUrl,
            "X-Title": `${agentConfig.name} Real Estate Assistant`,
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              ...formattedMessages,
            ],
            max_tokens: 300,
            temperature: 0.65,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (res.status === 429) {
          // Rate limited — try next model
          lastError = `Rate limited on ${model}`;
          continue;
        }

        if (!res.ok) {
          const errBody = await res.text();
          lastError = `${model} error ${res.status}: ${errBody}`;
          continue;
        }

        const data = await res.json();
        const reply =
          data?.choices?.[0]?.message?.content?.trim() ||
          `I'm here to help! Reach Sarah directly at ${agentConfig.phone} for the fastest response.`;

        return NextResponse.json({ reply, model });
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err instanceof Error && err.name === "AbortError"
          ? `Timeout on ${model}`
          : String(err);
        console.warn(`Attempt with ${model} failed:`, lastError);
        continue;
      }
    }

    // All models failed — graceful fallback
    console.error("All OpenRouter free models failed:", lastError);
    return NextResponse.json({
      reply:
        `I'm experiencing a brief connection issue right now.\n\n` +
        `Please reach Sarah directly — she responds fast:\n` +
        `📞 ${agentConfig.phone}\n` +
        `📧 ${agentConfig.email}\n` +
        `📅 ${agentConfig.bookingUrl}`,
    });
  } catch (error) {
    console.error("/api/chat error:", error);
    return NextResponse.json(
      {
        reply: `Something went wrong. Please contact Sarah directly at ${agentConfig.phone}.`,
      },
      { status: 500 }
    );
  }
}
