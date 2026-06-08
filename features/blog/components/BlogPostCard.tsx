"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPostCardProps {
  post: BlogPost;
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex flex-col h-full bg-white border border-border/40 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:border-accent/20">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-primary/90 text-white rounded-none border-none px-3 py-1 text-[9px] uppercase tracking-widest font-semibold backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col p-6 lg:p-8">
        {/* Metadata */}
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-widest mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-accent" />
            {formattedDate}
          </span>
          <span className="h-3 w-[1px] bg-border" />
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-accent" />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl lg:text-2xl font-serif text-primary tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors duration-300">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground font-light leading-relaxed mb-6 flex-1 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Call to Action */}
        <div className="pt-4 border-t border-border/40">
          <Link 
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary hover:text-accent transition-colors duration-300 group/link"
          >
            Read More
            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
