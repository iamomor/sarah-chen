import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { agentConfig } from "@/config/agent.config";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BlogSidebar from "@/features/blog/components/BlogSidebar";
import {
  Calendar,
  Clock,
  ChevronRight,
  User,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";

// ─── Static generation ───────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

// ─── SEO metadata ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getPostBySlug(slug);
  if (!data) return {};

  const { meta } = data;
  return {
    title: `${meta.title} | ${agentConfig.name}`,
    description: meta.excerpt,
    openGraph: {
      title: `${meta.title} | ${agentConfig.name}`,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
      authors: [meta.author],
      images: [{ url: meta.coverImage, width: 1400, height: 788, alt: meta.title }],
    },
  };
}

// ─── Custom MDX components (luxury styled, no @tailwindcss/typography needed) ─

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="flex items-start gap-0 mt-10 mb-4 text-2xl font-serif text-primary tracking-tight font-semibold leading-snug"
      {...props}
    >
      <span className="shrink-0 mt-1 mr-4 self-stretch w-1 bg-accent rounded-none" />
      <span>{props.children}</span>
    </h2>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-7 mb-3 text-xl font-serif text-primary tracking-tight font-bold"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[15px] text-[#3d3d3d] font-light leading-[1.85] mb-5" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 space-y-2.5 pl-0 list-none" {...props} />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-6 space-y-2.5 pl-0 list-none counter-reset-list" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-2.5 text-[15px] text-[#3d3d3d] font-light leading-relaxed">
      <span className="mt-[7px] shrink-0 w-1.5 h-1.5 bg-accent rounded-full" />
      <span>{props.children}</span>
    </li>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 bg-[#fdfcf9] border border-accent/20 border-l-4 border-l-accent pl-6 pr-5 py-5 font-serif italic text-lg text-primary leading-relaxed"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-accent underline underline-offset-2 decoration-accent/40 hover:decoration-accent transition-all duration-200"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-primary" {...props} />
  ),
  hr: () => (
    <hr className="my-10 border-none h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getPostBySlug(slug);
  if (!data) notFound();

  const { meta, content } = data;
  const allPosts = getAllPosts();

  // Category counts for sidebar
  const categoryCounts: Record<string, number> = {
    "Market Update": 0,
    "Buyer Guide": 0,
    "Seller Guide": 0,
    Neighborhood: 0,
    Tips: 0,
  };
  allPosts.forEach((p) => {
    if (p.category in categoryCounts) categoryCounts[p.category]++;
  });

  const formattedDate = new Date(meta.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Share URLs
  const shareUrl = `${agentConfig.siteUrl}/blog/${meta.slug}`;
  const shareTitle = encodeURIComponent(meta.title);
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  const articleSchema = getArticleSchema(meta);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: meta.category, url: `/blog?category=${meta.category.toLowerCase().replace(/ /g, "-")}` },
    { name: meta.title, url: `/blog/${meta.slug}` },
  ]);

  return (
    <main className="min-h-screen bg-background pt-20 sm:pt-24 pb-16 sm:pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero header ─────────────────────────────────────────────────── */}
      <section className="bg-[#fdfcf9] border-b border-border/40 py-10 sm:py-12">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">

          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground mb-6">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <Link href="/blog" className="hover:text-accent transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <Link
              href={`/blog?category=${meta.category.toLowerCase().replace(/ /g, "-")}`}
              className="hover:text-accent transition-colors"
            >
              {meta.category}
            </Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-primary/60 truncate max-w-[160px] sm:max-w-xs">{meta.title}</span>
          </nav>

          {/* Category badge */}
          <Badge className="mb-4 rounded-none border-none bg-accent text-[#1a2744] px-3 py-1 text-[9px] uppercase tracking-widest font-bold">
            {meta.category}
          </Badge>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary tracking-tight leading-tight max-w-4xl mb-6">
            {meta.title}
          </h1>

          {/* Meta strip */}
          <div className="flex flex-wrap items-center gap-5 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-accent" />
              By {meta.author}
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {formattedDate}
            </span>
            <span className="h-3 w-px bg-border" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              {meta.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* ── Cover image ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl mt-6 sm:mt-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-border/30 bg-muted">
          <Image
            src={meta.coverImage}
            alt={meta.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>

      {/* ── Main content + sidebar ───────────────────────────────────────── */}
      <section className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-12 items-start">

          {/* ── Left: Article body (70%) ─────────────────────────────── */}
          <div>
            <article className="bg-white border border-border/30 p-6 sm:p-8 lg:p-12">
              <MDXRemote source={content} components={mdxComponents} />
            </article>

            {/* ── Article footer ─────────────────────────────────────── */}
            <div className="mt-8 space-y-8">

              {/* Was this helpful? */}
              <div className="bg-white border border-border/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm font-medium text-primary">Was this article helpful?</p>
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Yes, this was helpful"
                    className="flex items-center gap-2 px-4 h-9 border border-border/60 text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:border-accent hover:text-accent transition-all duration-300 group"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                    Yes
                  </button>
                  <button
                    aria-label="No, this was not helpful"
                    className="flex items-center gap-2 px-4 h-9 border border-border/60 text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:border-muted-foreground hover:text-muted-foreground transition-all duration-300 group"
                  >
                    <ThumbsDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                    No
                  </button>
                </div>
              </div>

              {/* Share buttons */}
              <div className="bg-white border border-border/30 p-6">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-4">
                  Share This Article
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X (Twitter)"
                    className="flex items-center gap-2 px-4 h-9 bg-[#1a2744] text-white text-[10px] uppercase font-bold tracking-widest hover:bg-accent hover:text-[#1a2744] transition-all duration-300"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                    X / Twitter
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    className="flex items-center gap-2 px-4 h-9 bg-[#0077b5] text-white text-[10px] uppercase font-bold tracking-widest hover:opacity-90 transition-all duration-300"
                  >
                    <FaLinkedinIn className="w-3.5 h-3.5" />
                    LinkedIn
                  </a>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="flex items-center gap-2 px-4 h-9 bg-[#1877f2] text-white text-[10px] uppercase font-bold tracking-widest hover:opacity-90 transition-all duration-300"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                    Facebook
                  </a>
                </div>
              </div>

              {/* About the Author card */}
              <div className="bg-white border border-border/30 p-6 sm:p-8">
                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-accent mb-5">
                  About the Author
                </p>
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative w-20 h-20 shrink-0 overflow-hidden border border-border/40 bg-muted">
                    <Image
                      src={agentConfig.headshot}
                      alt={agentConfig.headshotAlt}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-lg font-serif text-primary tracking-tight">
                        {agentConfig.name}
                      </h4>
                      <p className="text-[10px] text-accent uppercase tracking-widest font-semibold mt-0.5">
                        {agentConfig.title}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">
                      {agentConfig.shortBio}
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <Button asChild variant="default" size="sm">
                        <a href={agentConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                          Schedule a Call
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href="/about">View Full Profile</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to blog */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                <Link
                  href="/blog"
                  className="font-bold text-primary hover:text-accent transition-colors duration-300"
                >
                  ← Back to All Insights
                </Link>
                <span className="text-muted-foreground/50 hidden sm:block">
                  {meta.category}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: Sidebar (30%) ──────────────────────────────────── */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <BlogSidebar recentPosts={allPosts} categoryCounts={categoryCounts} />
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
