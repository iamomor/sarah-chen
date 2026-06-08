import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Privacy Policy | ${agentConfig.name}`,
  description: `Privacy policy for ${agentConfig.siteUrl}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear();
  const effectiveDate = "January 1, 2025";
  const lastUpdated = "May 30, 2026";

  return (
    <section
      className="min-h-screen py-16 sm:py-20 md:py-28"
      style={{ backgroundColor: agentConfig.colors.background }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-4xl">
        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="mb-16 text-center">
          <span
            className="text-[11px] font-semibold uppercase tracking-[2.5px] block mb-4"
            style={{ color: agentConfig.colors.accent }}
          >
            Legal
          </span>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold mb-6"
            style={{ color: agentConfig.colors.primary }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-sm leading-relaxed max-w-2xl mx-auto"
            style={{ color: agentConfig.colors.muted }}
          >
            Effective Date: {effectiveDate} · Last Updated: {lastUpdated}
          </p>
        </div>

        {/* ── Body ────────────────────────────────────────────────── */}
        <div className="space-y-12">
          {/* Intro */}
          <div className="prose-section">
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              {agentConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website located
              at{" "}
              <Link
                href="/"
                className="underline font-medium transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                {agentConfig.siteUrl}
              </Link>
              . Your privacy is important to us. This Privacy Policy explains
              what information we collect, how we use it, and the choices you
              have regarding your data.
            </p>
          </div>

          {/* ── 1. Information We Collect ─────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              1. Information We Collect
            </h2>

            <h3
              className="font-semibold text-lg mb-3"
              style={{ color: agentConfig.colors.primary }}
            >
              Information You Provide
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              When you fill out a contact form, request a home valuation,
              schedule a showing, or subscribe to our newsletter, we collect
              personal information such as your name, email address, phone
              number, and any details you include in your message. If you use our
              home valuation tool, we also collect property-related information
              such as your address, property type, condition, and approximate
              square footage.
            </p>

            <h3
              className="font-semibold text-lg mb-3 mt-6"
              style={{ color: agentConfig.colors.primary }}
            >
              Property Search Data
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              When you browse property listings on our website, we may collect
              information about your search preferences, saved listings, and
              viewing history to provide a more relevant experience.
            </p>

            <h3
              className="font-semibold text-lg mb-3 mt-6"
              style={{ color: agentConfig.colors.primary }}
            >
              Analytics &amp; Tracking
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              With your consent, we use <strong>Google Analytics 4</strong> to
              collect anonymized data about how visitors interact with our
              website, including pages visited, time spent on each page, and
              general geographic location. We may also use the{" "}
              <strong>Meta (Facebook) Pixel</strong> to measure the effectiveness
              of our advertising campaigns and deliver more relevant content to
              you on social media platforms.
            </p>

            <h3
              className="font-semibold text-lg mb-3 mt-6"
              style={{ color: agentConfig.colors.primary }}
            >
              Live Chat
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              Our website uses <strong>Crisp</strong> to provide live chat
              support. When you interact with the chat widget, Crisp may collect
              your name, email address, and the content of your conversation to
              help us respond to your inquiry.
            </p>

            <h3
              className="font-semibold text-lg mb-3 mt-6"
              id="cookies"
              style={{ color: agentConfig.colors.primary }}
            >
              Cookies
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              We use cookies — small text files stored on your device — to
              remember your preferences (such as cookie consent status) and to
              power analytics and advertising services. You can manage your
              cookie preferences at any time using the cookie consent banner that
              appears when you first visit our site, or by adjusting your browser
              settings.
            </p>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              <strong>Essential cookies</strong> (such as the consent cookie
              itself) are necessary for the website to function and cannot be
              disabled. <strong>Analytics and marketing cookies</strong> (Google
              Analytics, Meta Pixel) are only loaded after you explicitly accept
              them.
            </p>
          </div>

          {/* ── 2. How We Use Your Information ────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              2. How We Use Your Information
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              We use the information we collect to:
            </p>
            <ul
              className="list-disc list-inside space-y-2 text-base leading-[1.85] ml-4"
              style={{ color: agentConfig.colors.text }}
            >
              <li>
                Respond to your inquiries about buying, selling, or property
                valuations
              </li>
              <li>
                Schedule consultations, showings, and follow-up communications
              </li>
              <li>
                Send market updates, newsletters, and relevant property alerts
                (only with your explicit consent)
              </li>
              <li>
                Improve our website&apos;s performance, content, and user experience
              </li>
              <li>
                Measure the effectiveness of our advertising and outreach
              </li>
            </ul>
          </div>

          {/* ── 3. Third-Party Services ───────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              3. Third-Party Services
            </h2>
            <p
              className="text-base leading-[1.85] mb-6"
              style={{ color: agentConfig.colors.text }}
            >
              We partner with trusted third-party providers to operate our
              website and deliver our services. Each provider has its own privacy
              policy governing the data they process on our behalf:
            </p>

            <div className="space-y-5">
              <div
                className="p-5 border-l-2"
                style={{
                  borderColor: agentConfig.colors.accent,
                  backgroundColor: `${agentConfig.colors.primary}06`,
                }}
              >
                <h4
                  className="font-semibold mb-1"
                  style={{ color: agentConfig.colors.primary }}
                >
                  EmailJS
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: agentConfig.colors.muted }}
                >
                  Processes form submissions (contact, valuation, showing
                  requests, and newsletter signups) and delivers them to our
                  inbox. EmailJS does not store your data beyond the delivery
                  process.
                </p>
              </div>
              <div
                className="p-5 border-l-2"
                style={{
                  borderColor: agentConfig.colors.accent,
                  backgroundColor: `${agentConfig.colors.primary}06`,
                }}
              >
                <h4
                  className="font-semibold mb-1"
                  style={{ color: agentConfig.colors.primary }}
                >
                  Google Analytics 4
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: agentConfig.colors.muted }}
                >
                  Collects anonymized usage data to help us understand how
                  visitors navigate our website. Loaded only after you accept
                  cookies.
                </p>
              </div>
              <div
                className="p-5 border-l-2"
                style={{
                  borderColor: agentConfig.colors.accent,
                  backgroundColor: `${agentConfig.colors.primary}06`,
                }}
              >
                <h4
                  className="font-semibold mb-1"
                  style={{ color: agentConfig.colors.primary }}
                >
                  Meta (Facebook) Pixel
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: agentConfig.colors.muted }}
                >
                  Tracks conversions from our Facebook and Instagram advertising
                  campaigns. Loaded only after you accept cookies.
                </p>
              </div>
              <div
                className="p-5 border-l-2"
                style={{
                  borderColor: agentConfig.colors.accent,
                  backgroundColor: `${agentConfig.colors.primary}06`,
                }}
              >
                <h4
                  className="font-semibold mb-1"
                  style={{ color: agentConfig.colors.primary }}
                >
                  Crisp Chat
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: agentConfig.colors.muted }}
                >
                  Powers our live chat widget, enabling real-time communication.
                  Conversation data is stored by Crisp according to their privacy
                  policy.
                </p>
              </div>
            </div>
          </div>

          {/* ── 4. Your Rights ────────────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              4. Your Rights
            </h2>

            <h3
              className="font-semibold text-lg mb-3"
              style={{ color: agentConfig.colors.primary }}
            >
              California Residents (CCPA)
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              If you are a California resident, you have the right to:
            </p>
            <ul
              className="list-disc list-inside space-y-2 text-base leading-[1.85] ml-4 mb-6"
              style={{ color: agentConfig.colors.text }}
            >
              <li>
                Request access to the personal information we have collected
                about you
              </li>
              <li>Request deletion of your personal information</li>
              <li>
                Opt out of the sale of your personal information (we do not sell
                personal information)
              </li>
              <li>
                Not be discriminated against for exercising your privacy rights
              </li>
            </ul>

            <h3
              className="font-semibold text-lg mb-3"
              style={{ color: agentConfig.colors.primary }}
            >
              CAN-SPAM Compliance
            </h3>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              We comply with the CAN-SPAM Act. You can unsubscribe from our
              marketing emails at any time by clicking the &quot;unsubscribe&quot; link
              included in every email we send. We will process your request
              within 10 business days.
            </p>

            <h3
              className="font-semibold text-lg mb-3"
              style={{ color: agentConfig.colors.primary }}
            >
              How to Exercise Your Rights
            </h3>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              To make a privacy-related request, please contact us at{" "}
              <a
                href={`mailto:${agentConfig.email}`}
                className="underline font-medium transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                {agentConfig.email}
              </a>{" "}
              or call us at{" "}
              <a
                href={`tel:${agentConfig.phoneRaw}`}
                className="underline font-medium transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                {agentConfig.phone}
              </a>
              . We will verify your identity and respond to your request within
              45 days.
            </p>
          </div>

          {/* ── 5. Data Retention ─────────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              5. Data Retention
            </h2>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              We retain your personal information only for as long as necessary
              to fulfill the purposes described in this policy, comply with legal
              obligations, resolve disputes, and enforce our agreements. Contact
              form submissions and email correspondence are typically retained
              for up to 24 months. Analytics data is retained according to the
              default retention settings of each analytics provider (14 months
              for Google Analytics 4).
            </p>
          </div>

          {/* ── 6. Contact Information ────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              6. Contact Information
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              If you have questions or concerns about this Privacy Policy or our
              data practices, please contact us:
            </p>
            <div
              className="p-6 border-l-2"
              style={{
                borderColor: agentConfig.colors.accent,
                backgroundColor: `${agentConfig.colors.primary}06`,
              }}
            >
              <p
                className="font-semibold text-base mb-1"
                style={{ color: agentConfig.colors.primary }}
              >
                {agentConfig.name}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: agentConfig.colors.muted }}
              >
                {agentConfig.address}
              </p>
              <p className="text-sm mt-2">
                <a
                  href={`mailto:${agentConfig.email}`}
                  className="underline font-medium transition-opacity hover:opacity-80"
                  style={{ color: agentConfig.colors.accent }}
                >
                  {agentConfig.email}
                </a>
              </p>
              <p className="text-sm mt-1">
                <a
                  href={`tel:${agentConfig.phoneRaw}`}
                  className="underline font-medium transition-opacity hover:opacity-80"
                  style={{ color: agentConfig.colors.accent }}
                >
                  {agentConfig.phone}
                </a>
              </p>
            </div>
          </div>

          {/* ── 7. Updates to This Policy ─────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              7. Updates to This Policy
            </h2>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technologies, or legal requirements. When
              we make material changes, we will update the &quot;Last Updated&quot; date at
              the top of this page. We encourage you to review this policy
              periodically.
            </p>
          </div>

          {/* ── Footer Divider ────────────────────────────────────── */}
          <div
            className="pt-10 border-t text-center"
            style={{ borderColor: `${agentConfig.colors.primary}15` }}
          >
            <p
              className="text-sm"
              style={{ color: agentConfig.colors.muted }}
            >
              © {currentYear} {agentConfig.name} Realty. All rights reserved.
            </p>
            <div className="flex justify-center gap-6 mt-4">
              <Link
                href="/terms"
                className="text-sm underline transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-sm underline transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
