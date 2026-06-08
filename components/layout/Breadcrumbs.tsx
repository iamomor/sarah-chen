import { agentConfig } from "@/config/agent.config";
import { Home, Compass, MapPin, Building, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const getBreadcrumbIcon = (label: string, isLast: boolean) => {
  const lower = label.toLowerCase();
  if (lower === "home") return Home;
  if (lower === "listings") return Compass;
  if (isLast) return Building;
  return MapPin;
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { colors } = agentConfig;
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
    <nav aria-label="Breadcrumb" className="mb-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ol className="flex items-center flex-wrap gap-2.5 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = getBreadcrumbIcon(item.label, isLast);

          return (
            <li key={item.href} className="flex items-center gap-2.5 shrink-0">
              {index > 0 && (
                <span className="text-[#c9a96e] opacity-40 px-0.5" style={{ color: colors.accent }}>
                  /
                </span>
              )}
              {isLast ? (
                <span 
                  className="flex items-center gap-1.5 font-bold px-2.5 py-1 border rounded-[2px] truncate max-w-[160px] sm:max-w-[240px]" 
                  style={{ 
                    color: colors.accent, 
                    backgroundColor: `${colors.accent}12`, 
                    borderColor: `${colors.accent}30` 
                  }}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-400 hover:text-slate-900 transition-colors flex items-center gap-1.5 py-1 group"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
