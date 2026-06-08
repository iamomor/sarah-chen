import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, Clock, MapPin } from "lucide-react";
import { Property } from "@/types";
import { formatPrice, formatArea } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import CalendarDownloadButton from "./CalendarDownloadButton";

interface OpenHouseCardProps {
  property: Property;
}

export default function OpenHouseCard({ property }: OpenHouseCardProps) {
  if (!property.openHouse) return null;

  // Format date nicely (e.g. "Saturday, June 6")
  const dateObj = new Date(property.openHouse.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC", // listings.json uses YYYY-MM-DD
  });

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full bg-white rounded-none">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={property.photos[0]}
          alt={`${property.address.street}, ${property.address.neighborhood}`}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Open House Badge Overlay */}
        <Badge className="absolute top-4 left-4 z-10 bg-[#c9a96e] text-[#1a2744] hover:bg-[#c9a96e] rounded-none border-none px-3.5 py-1 text-[9px] uppercase tracking-widest font-bold shadow-md">
          Open House
        </Badge>
      </div>

      <CardContent className="p-6 flex-grow flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          {/* Price and Address */}
          <div className="space-y-1.5">
            <h3 className="text-2xl font-serif font-bold text-[#1a2744]">
              {formatPrice(property.price)}
            </h3>
            <div className="flex items-start gap-1 text-slate-700">
              <MapPin className="w-3.5 h-3.5 text-[#c9a96e] mt-0.5 flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight text-slate-800">
                  {property.address.street}
                </span>
                <span className="text-xs text-slate-500 font-light mt-0.5">
                  {property.address.neighborhood}, {property.address.city}
                </span>
              </div>
            </div>
          </div>

          {/* Details Row */}
          <div className="flex items-center justify-between text-slate-600 py-3 border-y border-slate-100">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold">
                {property.details.beds}{" "}
                <span className="text-slate-400 font-normal">bd</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold">
                {property.details.baths}{" "}
                <span className="text-slate-400 font-normal">ba</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Square className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold">
                {formatArea(property.details.sqft)}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule box */}
        <div className="bg-[#f9f6f0] p-4 border-l-2 border-[#c9a96e] space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1a2744]">
            <Clock className="w-3.5 h-3.5 text-[#c9a96e]" />
            Date &amp; Time
          </div>
          <p className="text-xs font-medium text-slate-800">
            {formattedDate}
          </p>
          <p className="text-xs font-light text-slate-500">
            {property.openHouse.time}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 grid grid-cols-2 gap-4 border-t border-slate-50 mt-auto">
        <CalendarDownloadButton
          propertyAddress={property.address.street}
          openHouseDate={property.openHouse.date}
          openHouseTime={property.openHouse.time}
          neighborhood={property.address.neighborhood}
        />
        <Link
          href={`/listings/${property.slug}`}
          className="w-full h-9 flex items-center justify-center bg-[#1a2744] hover:bg-[#c9a96e] text-white hover:text-[#1a2744] rounded-none font-bold uppercase tracking-widest text-[10px] transition-all duration-300 font-sans"
        >
          RSVP &amp; Info
        </Link>
      </CardFooter>
    </Card>
  );
}
