"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { region } from "@/config/region.config";
import { cn, formatArea, formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { motion } from "framer-motion";
import { Bath, Bed, Heart, Play, Square } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PropertyCardProps {
  property: Property;
  index?: number;
  onSelect?: () => void;
}

export default function PropertyCard({
  property,
  index = 0,
  onSelect,
}: PropertyCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Check if saved on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedListings") || "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSaved(saved.includes(property.id));
  }, [property.id]);

  // Photo cycling on hover
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovering && property.photos.length > 1) {
      interval = setInterval(() => {
        setCurrentPhotoIndex(
          (prev) => (prev + 1) % Math.min(property.photos.length, 3),
        );
      }, 1200);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPhotoIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovering, property.photos]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem("savedListings") || "[]");
    let newSaved;
    if (saved.includes(property.id)) {
      newSaved = saved.filter((id: string) => id !== property.id);
      setIsSaved(false);
    } else {
      newSaved = [...saved, property.id];
      setIsSaved(true);
    }
    localStorage.setItem("savedListings", JSON.stringify(newSaved));
    // Dispatch event for other components to listen
    window.dispatchEvent(new Event("storage"));
  };

  const getStatusColor = (status: Property["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-500 hover:bg-emerald-600 text-white border-none";
      case "Under Contract":
        return "bg-orange-500 hover:bg-orange-600 text-white border-none";
      case "Coming Soon":
        return "bg-blue-500 hover:bg-blue-600 text-white border-none";
      case "Sold":
        return "bg-slate-500 hover:bg-slate-600 text-white border-none";
      default:
        return "bg-slate-500 text-white border-none";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group bg-white">
        <div
          onClick={(e) => {
            if (onSelect) {
              e.preventDefault();
              onSelect();
            }
          }}
          className="relative aspect-[16/9] overflow-hidden block cursor-pointer"
        >
          <Image
            src={property.photos[currentPhotoIndex]}
            alt={`${property.address.street}, ${property.address.neighborhood}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />

          {/* Status Badge */}
          <Badge
            className={cn(
              "absolute top-3 left-3 z-10 font-bold uppercase tracking-[0.05em] text-xs px-2.5 py-1 rounded-sm shadow-sm",
              getStatusColor(property.status),
            )}
          >
            {property.status}
          </Badge>

          {/* Save Button */}
          <button
            onClick={toggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save listing"}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-red-500 transition-all duration-300 group/save"
          >
            <Heart
              className={cn(
                "w-4.5 h-4.5 transition-colors",
                isSaved
                  ? "fill-red-500 text-red-500"
                  : "text-white group-hover/save:text-red-500",
              )}
            />
          </button>

          {/* Virtual Tour Badge */}
          {property.virtualTourUrl && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-2 py-1 bg-black/40 backdrop-blur-md rounded-sm text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
              <Play className="w-2.5 h-2.5 fill-current" />
              3D Tour
            </div>
          )}

          {/* Photo Indicator (Small dots at bottom) */}
          {property.photos.length > 1 && isHovering && (
            <div className="absolute bottom-3 right-3 z-10 flex gap-1">
              {[0, 1, 2].map(
                (i) =>
                  i < property.photos.length && (
                    <div
                      key={i}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full border border-white/50 transition-colors duration-300",
                        currentPhotoIndex === i ? "bg-white" : "bg-white/30",
                      )}
                    />
                  ),
              )}
            </div>
          )}
        </div>

        <CardContent className="p-4 sm:p-5 flex-grow">
          <div className="space-y-1 mb-4">
            <h3
              className={cn(
                "text-2xl font-bold tracking-tight text-slate-900 font-serif",
                property.status === "Sold" && "line-through opacity-60",
              )}
            >
              {formatPrice(property.price)}
            </h3>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 text-sm">
                {property.address.street}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {property.address.neighborhood}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-slate-700 py-2.5 sm:py-3 border-y border-slate-100 mb-3 sm:mb-4">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold">
                {property.details.beds}{" "}
                <span className="text-slate-600 font-normal">bd</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold">
                {property.details.baths}{" "}
                <span className="text-slate-600 font-normal">ba</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold">
                {formatArea(property.details.sqft)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-600 font-bold uppercase tracking-wider sm:tracking-widest">
            <span>Listed {property.daysOnMarket} days ago</span>
            {region.idxEnabled && property.financials.mlsNumber && (
              <span>#{property.financials.mlsNumber}</span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-5 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {onSelect ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full min-h-11"
              onClick={(e) => {
                e.preventDefault();
                onSelect();
              }}
            >
              View Details
            </Button>
          ) : (
            <Button
              asChild
              variant="secondary"
              size="sm"
              className="w-full min-h-11"
            >
              <Link href={`/listings/${property.slug}`}>View Details</Link>
            </Button>
          )}
          <Button
            asChild
            variant="default"
            size="sm"
            className="w-full min-h-11"
          >
            <Link href={`/listings/${property.slug}#showing`}>
              {region.inspectionLabel}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="h-full flex flex-col bg-white rounded-[4px] border border-slate-100 overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-[16/9] bg-slate-100" />
      <div className="p-5 space-y-5">
        <div className="space-y-2">
          <div className="h-8 w-1/2 bg-slate-100 rounded" />
          <div className="h-4 w-3/4 bg-slate-100 rounded" />
          <div className="h-3 w-1/3 bg-slate-100 rounded" />
        </div>
        <div className="h-10 w-full bg-slate-50 border-y border-slate-100" />
        <div className="flex justify-between gap-3">
          <div className="h-9 w-full bg-slate-100 rounded" />
          <div className="h-9 w-full bg-slate-100 rounded" />
        </div>
      </div>
    </div>
  );
}
