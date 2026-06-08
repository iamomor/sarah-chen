"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedPostCardProps {
  post: BlogPost;
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group relative bg-white border border-border/50 overflow-hidden shadow-xl shadow-primary/5 hover:border-accent/30 transition-all duration-500 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image Column */}
        <div className="relative h-[250px] sm:h-[350px] lg:h-auto lg:col-span-7 bg-muted overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
          />
          <div className="absolute top-6 left-6 z-10">
            <Badge className="bg-primary text-white rounded-none border-none px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold shadow-lg">
              Featured Insight
            </Badge>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-5 bg-gradient-to-br from-white to-[#fdfcf9]">
          {/* Metadata */}
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {formattedDate}
            </span>
            <span className="h-3 w-[1px] bg-border" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              {post.readTime}
            </span>
            <span className="h-3 w-[1px] bg-border" />
            <span className="font-bold text-primary tracking-widest">{post.category}</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-serif text-primary tracking-tight leading-tight mb-4 group-hover:text-accent transition-colors duration-300">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed mb-8 line-clamp-4">
            {post.excerpt}
          </p>

          {/* Read Article CTA */}
          <div>
            <Link href={`/blog/${post.slug}`}>
                <Button 
                  variant="default"
                  className="w-full sm:w-auto h-12 rounded-none px-8 text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
