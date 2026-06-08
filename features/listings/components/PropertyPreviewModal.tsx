"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatArea, formatPrice } from "@/lib/utils";
import { Property } from "@/types";
import { Bath, Bed, Square, X, ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PropertyPreviewModalProps {
  property: Property | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PropertyPreviewModal({
  property,
  isOpen,
  onOpenChange,
}: PropertyPreviewModalProps) {
  if (!property) return null;

  const tourLabel =
    region.language.startsWith("en-AU") || region.language.startsWith("en-GB")
      ? "Request Inspection"
      : "Schedule Tour";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl bg-white">
        {/* Hero Image Section */}
        <div className="relative h-[300px] w-full">
          <Image
            src={property.photos[0]}
            alt={property.address.street}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 480px"
          />
          <div className="absolute top-4 left-4 z-10">
            <div
              className="px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md"
              style={{
                backgroundColor:
                  property.status === "Active"
                    ? agentConfig.colors.primary + "CC"
                    : property.status === "Under Contract"
                      ? agentConfig.colors.accent + "CC"
                      : "#6b7280CC",
              }}
            >
              {property.status}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 border border-white/20"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <DialogHeader className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 space-y-0">
            <div>
              <DialogTitle className="text-4xl font-bold tracking-tighter text-foreground mb-1">
                {formatPrice(property.price)}
              </DialogTitle>
              <DialogDescription className="text-sm font-medium text-muted-foreground uppercase tracking-widest block">
                {property.address.street}
                <span className="mx-2 opacity-30">|</span>
                {property.address.neighborhood}
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border/50 mb-8">
            <div className="flex flex-col items-center text-center">
              <Bed className="w-5 h-5 text-accent mb-2" />
              <div className="text-lg font-bold">{property.details.beds}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                Bedrooms
              </div>
            </div>
            <div className="flex flex-col items-center text-center border-x border-border/50">
              <Bath className="w-5 h-5 text-accent mb-2" />
              <div className="text-lg font-bold">{property.details.baths}</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                Bathrooms
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Square className="w-5 h-5 text-accent mb-2" />
              <div className="text-lg font-bold">
                {formatArea(property.details.sqft)}
              </div>
            </div>
          </div>

          {/* Description Teaser */}
          <p className="text-muted-foreground leading-relaxed mb-10 line-clamp-3">
            {property.description}
          </p>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              asChild
              className="h-14 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
            >
              <Link href={`/listings/${property.slug}`}>
                View Full Details
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-14 rounded-full font-bold uppercase tracking-widest text-xs border-accent text-accent hover:bg-accent hover:text-white"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {tourLabel}
            </Button>
          </div>

          {region.idxEnabled && property.financials.mlsNumber && (
            <div className="mt-8 text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
                Listing Courtesy of {agentConfig.brokerage} · MLS #
                {property.financials.mlsNumber}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
