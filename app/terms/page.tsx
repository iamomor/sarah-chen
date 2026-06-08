import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Terms of Service | ${agentConfig.name}`,
  description: `Terms of service for ${agentConfig.siteUrl}. Review the terms and conditions governing your use of this website.`,
};

export default function TermsPage() {
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
            Terms of Service
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
          <div>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              Welcome to{" "}
              <Link
                href="/"
                className="underline font-medium transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                {agentConfig.siteUrl}
              </Link>
              , operated by {agentConfig.name} (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;). By accessing or using this website, you agree to
              be bound by these Terms of Service. If you do not agree with any
              part of these terms, please do not use this website.
            </p>
          </div>

          {/* ── 1. Use of Website ─────────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              1. Use of Website
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              This website is provided for informational purposes only. It is
              designed to assist you in learning about real estate services,
              browsing property listings, accessing market data, and contacting{" "}
              {agentConfig.name} for professional real estate assistance.
            </p>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              You agree to use this website only for lawful purposes and in
              accordance with these terms. You may not use this site in any way
              that could damage, disable, or impair the site, or interfere with
              any other party&apos;s use of the site.
            </p>
          </div>

          {/* ── 2. IDX / Listing Information ──────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              2. IDX / Listing Information
            </h2>

            {region.idxEnabled && (
              <div
                className="p-6 mb-6 border-l-2"
                style={{
                  borderColor: agentConfig.colors.accent,
                  backgroundColor: `${agentConfig.colors.primary}06`,
                }}
              >
                <h4
                  className="font-semibold text-sm uppercase tracking-[1px] mb-3"
                  style={{ color: agentConfig.colors.accent }}
                >
                  MLS Disclaimer
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: agentConfig.colors.muted }}
                >
                  The data relating to real estate for sale on this website comes
                  in part from the Internet Data Exchange Program. Information is
                  deemed reliable but not guaranteed. © {currentYear}{" "}
                  {region.compliance}
                </p>
              </div>
            )}

            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              Property listing data displayed on this website may be supplied by
              the {region.listingPlatform} and other third-party sources. While
              we strive to ensure the accuracy of all listing information,
              including pricing, photographs, descriptions, square footage, and
              availability, we cannot guarantee that all information is current
              or error-free.
            </p>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              Listings may be subject to prior sale, price changes, or
              withdrawal without notice. Buyers are advised to independently
              verify all information before making any purchasing decisions.
            </p>

            {region.fairHousingRequired && (
              <div
                className="mt-6 p-6 border-l-2"
                style={{
                  borderColor: agentConfig.colors.accent,
                  backgroundColor: `${agentConfig.colors.primary}06`,
                }}
              >
                <h4
                  className="font-semibold text-sm uppercase tracking-[1px] mb-3"
                  style={{ color: agentConfig.colors.accent }}
                >
                  Equal Housing Opportunity
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: agentConfig.colors.muted }}
                >
                  We are pledged to the letter and spirit of the U.S. policy for
                  the achievement of equal housing opportunity throughout the
                  nation. We encourage and support an affirmative advertising and
                  marketing program in which there are no barriers to obtaining
                  housing because of race, color, religion, sex, handicap,
                  familial status, or national origin.
                </p>
              </div>
            )}
          </div>

          {/* ── 3. No Warranty of Information ─────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              3. No Warranty of Information
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              The content on this website, including but not limited to property
              listings, market reports, neighborhood guides, blog articles, and
              home valuation estimates, is provided &quot;as is&quot; and &quot;as
              available&quot; without warranties of any kind, either express or
              implied.
            </p>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              We do not warrant that the information on this website is accurate,
              complete, reliable, current, or error-free. Any reliance you place
              on such information is strictly at your own risk. Home valuation
              estimates provided through our website are approximations and
              should not be considered formal appraisals.
            </p>
          </div>

          {/* ── 4. Limitation of Liability ────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              4. Limitation of Liability
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              To the fullest extent permitted by applicable law,{" "}
              {agentConfig.name}, {agentConfig.brokerage}, and their respective
              officers, directors, employees, and agents shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or related to your use of this website.
            </p>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              This limitation applies whether the alleged liability is based on
              contract, tort, negligence, strict liability, or any other basis,
              even if we have been advised of the possibility of such damages.
              Our total liability for any claim arising out of or relating to
              these terms shall not exceed the amount you paid us, if any, during
              the twelve (12) months preceding the claim.
            </p>
          </div>

          {/* ── 5. Intellectual Property ──────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              5. Intellectual Property
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              All content on this website — including text, graphics,
              photographs, logos, icons, images, audio clips, video clips, data
              compilations, and software — is the property of {agentConfig.name}{" "}
              or its content suppliers and is protected by United States and
              international copyright, trademark, and other intellectual property
              laws.
            </p>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, or otherwise use any content from this
              website without our prior written consent, except for personal,
              non-commercial use related to your real estate search.
            </p>
          </div>

          {/* ── 6. Third-Party Links ──────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              6. Third-Party Links
            </h2>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              This website may contain links to third-party websites, including
              social media profiles, booking platforms, and external real estate
              resources. These links are provided for your convenience only. We
              do not control, endorse, or assume responsibility for the content,
              privacy policies, or practices of any third-party websites. We
              encourage you to review the terms and privacy policies of any
              third-party site you visit.
            </p>
          </div>

          {/* ── 7. Governing Law ──────────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              7. Governing Law
            </h2>
            <p
              className="text-base leading-[1.85]"
              style={{ color: agentConfig.colors.text }}
            >
              These Terms of Service and any disputes arising out of or related
              to them shall be governed by and construed in accordance with the
              laws of the State of Texas, without regard to its conflict of law
              provisions. You agree that any legal action or proceeding arising
              under these terms shall be brought exclusively in the federal or
              state courts located in Travis County, Texas, and you hereby
              consent to the personal jurisdiction of such courts.
            </p>
          </div>

          {/* ── 8. Contact ────────────────────────────────────────── */}
          <div>
            <h2
              className="font-serif text-2xl md:text-3xl font-semibold mb-6"
              style={{ color: agentConfig.colors.primary }}
            >
              8. Contact
            </h2>
            <p
              className="text-base leading-[1.85] mb-4"
              style={{ color: agentConfig.colors.text }}
            >
              If you have any questions about these Terms of Service, please
              contact us:
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
                href="/privacy-policy"
                className="text-sm underline transition-opacity hover:opacity-80"
                style={{ color: agentConfig.colors.accent }}
              >
                Privacy Policy
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
