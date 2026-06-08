import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Read all .mdx files from /content/blog/, parse frontmatter with gray-matter,
 * and return an array of BlogPost objects (excluding the MDX body content)
 * sorted by date descending.
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith(".mdx") && file !== "[post].mdx")
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        date: data.date ? String(data.date) : "",
        readTime: data.readTime || "5 min read",
        category: data.category || "Tips",
        coverImage: data.coverImage || "/images/blog/placeholder.jpg",
        author: data.author || "Sarah Chen",
        featured: !!data.featured,
      } as BlogPost;
    });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Read a specific .mdx file in /content/blog/ by slug and return its frontmatter
 * metadata + raw MDX content string.
 */
export function getPostBySlug(slug: string): { meta: BlogPost; content: string } | null {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const meta = {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      date: data.date ? String(data.date) : "",
      readTime: data.readTime || "5 min read",
      category: data.category || "Tips",
      coverImage: data.coverImage || "/images/blog/placeholder.jpg",
      author: data.author || "Sarah Chen",
      featured: !!data.featured,
    } as BlogPost;

    return { meta, content };
  } catch (error) {
    console.error(`Error reading blog post by slug (${slug}):`, error);
    return null;
  }
}

/**
 * Retrieve all blog posts filtered by a specific category.
 */
export function getPostsByCategory(category: string): BlogPost[] {
  const posts = getAllPosts();
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}
