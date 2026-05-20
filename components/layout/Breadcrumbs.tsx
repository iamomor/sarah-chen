import { agentConfig } from "@/config/agent.config";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Schema.org markup
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${agentConfig.siteUrl}${item.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex items-center flex-wrap gap-3 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-3">
            {index > 0 && <ChevronRight className="w-3 h-3 text-gray-300" />}
            {index === items.length - 1 ? (
              <span className="text-gray-900 truncate max-w-[200px]">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
