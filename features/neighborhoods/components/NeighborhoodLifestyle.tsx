import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { agentConfig } from "@/config/agent.config";

interface NeighborhoodLifestyleProps {
  content: string;
}

// Custom components to override default MDX nodes with luxury styling
const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight mt-16 mb-8 first:mt-0 pb-4 border-b border-slate-200/50" 
      {...props} 
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className="font-serif text-2xl text-slate-900 font-normal tracking-tight mt-10 mb-4" 
      {...props} 
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className="font-sans text-slate-700 text-base sm:text-lg leading-relaxed font-light mb-6" 
      {...props} 
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className="list-none space-y-4 my-8 pl-0" 
      {...props} 
    />
  ),
  li: ({ children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li 
      className="relative pl-6 text-slate-700 text-base sm:text-lg font-light leading-relaxed" 
      {...props}
    >
      {/* Sleek gold bullet point */}
      <span className="absolute left-0 top-[0.65em] w-1.5 h-1.5 bg-[var(--accent-color)] rounded-full" />
      {children}
    </li>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong 
      className="font-semibold text-slate-900" 
      {...props} 
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-[var(--accent-color)] bg-white/40 p-6 my-10 font-serif italic text-slate-800 text-lg sm:text-xl leading-relaxed shadow-[0_10px_35px_rgba(26,39,68,0.015)]" 
      {...props} 
    />
  ),
};

export default function NeighborhoodLifestyle({ content }: NeighborhoodLifestyleProps) {
  const accentColor = agentConfig.colors.accent;

  return (
    <section 
      id="lifestyle"
      style={{
        "--accent-color": accentColor,
      } as React.CSSProperties}
      className="relative w-full py-14 sm:py-20 md:py-28 bg-[#f9f6f0] border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Section Eyebrow Column */}
          <div className="lg:col-span-4 flex flex-col justify-start">
            <div className="sticky top-28 space-y-2 border-l-2 border-[var(--accent-color)] lg:border-l-0 lg:pl-0 lg:border-r lg:border-slate-200/50 lg:pr-8 pl-6">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase font-bold text-slate-400 block">
                Local Lifestyle
              </span>
              <h2 className="font-serif text-3xl text-slate-900 font-normal tracking-tight leading-tight">
                Living Like <br className="hidden lg:block" />a Local
              </h2>
              <p className="font-sans text-xs text-slate-400 font-medium tracking-wide hidden lg:block pt-4 leading-relaxed">
                Explore the daily rhythms, local favorites, and community secrets of this iconic luxury neighborhood.
              </p>
            </div>
          </div>

          {/* Renders the dynamic Markdown file body */}
          <div className="lg:col-span-8">
            <article className="max-w-prose">
              <MDXRemote source={content} components={mdxComponents} />
            </article>
          </div>

        </div>
      </div>
    </section>
  );
}
