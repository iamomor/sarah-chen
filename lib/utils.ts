import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};
export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

import { region } from "@/config/region.config";

export function formatPrice(
  price: number,
  currency: string = region.currency,
  language: string = region.language
): string {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formats a price as a short label for map markers and badges.
 * US:  825000  → "$825K"
 * US:  1100000 → "$1.1M"
 * AU:  825000  → "A$825K"
 * UK:  1100000 → "£1.1M"
 */
export function formatPriceShort(
  price: number,
  currency: string = region.currency,
  language: string = region.language
): string {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency: currency,
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(price);
}

/**
 * Formats an area measurement using the active region's area unit.
 * US/CA/UK: 1750 → "1,750 sq ft"
 * AU:       162  → "162 m²"
 */
export function formatArea(
  value: number,
  areaLabel: string = region.areaLabel,
  language: string = region.language
): string {
  return `${value.toLocaleString(language)} ${areaLabel}`;
}

/**
 * Formats price per area unit.
 * US/CA/UK: 450 → "$450/sq ft"
 * AU:       4800 → "A$4,800/m²"
 */
export function formatPricePerArea(
  pricePerUnit: number,
  currency: string = region.currency,
  language: string = region.language,
  areaLabel: string = region.areaLabel
): string {
  const formattedPrice = formatPrice(pricePerUnit, currency, language);
  return `${formattedPrice}/${areaLabel}`;
}
