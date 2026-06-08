"use client";

import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatArea, formatPrice, formatPriceShort } from "@/lib/utils";
import type { Property } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Square, ArrowRight } from "lucide-react";

// Status Colors mapping
const statusColors: Record<string, string> = {
  Active: agentConfig.colors.primary,
  "Under Contract": agentConfig.colors.accent,
  "Coming Soon": "#6b7280",
  Sold: "#9ca3af",
};

// Create Price Tag Marker Icon for Properties
const createPriceMarker = (property: Property) => {
  const shortPrice = formatPriceShort(property.price);
  const bgColor = statusColors[property.status] ?? agentConfig.colors.primary;

  return L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div style="
        background: ${bgColor};
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-family: Inter, sans-serif;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        ${shortPrice}
      </div>
    `,
    iconSize: [60, 32],
    iconAnchor: [30, 16],
  });
};

// Create a custom Neighborhood Marker Pin
const createNeighborhoodPin = (name: string, accentColor: string, primaryColor: string) => {
  return L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        user-select: none;
        transform: translateY(-50%);
      ">
        <div style="
          background: ${primaryColor};
          color: white;
          padding: 6px 14px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
          border: 2.5px solid ${accentColor};
          font-family: Inter, sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          position: relative;
          z-index: 10;
        ">
          📍 ${name}
        </div>
        <div style="
          width: 0; 
          height: 0; 
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid ${accentColor};
          margin-top: -1px;
        "></div>
      </div>
    `,
    iconSize: [120, 48],
    iconAnchor: [60, 24],
  });
};

// Component to handle map centering and sizing
function MapController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 14);
  }, [lat, lng, map]);
  return null;
}

interface NeighborhoodLeafletMapProps {
  name: string;
  lat: number;
  lng: number;
  listings: Property[];
}

export default function NeighborhoodLeafletMap({
  name,
  lat,
  lng,
  listings,
}: NeighborhoodLeafletMapProps) {
  // Fix Leaflet marker icon asset paths in Next.js/Webpack environments
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const validProperties = listings.filter(
    (p) => p.address.lat !== undefined && p.address.lng !== undefined
  );

  return (
    <div className="w-full h-full relative overflow-hidden">
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        className="w-full h-full z-10"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <MapController lat={lat} lng={lng} />

        {/* Center Neighborhood Label Pin */}
        <Marker 
          position={[lat, lng]} 
          icon={createNeighborhoodPin(name, agentConfig.colors.accent, agentConfig.colors.primary)}
        />

        {/* Listings Markers */}
        {validProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.address.lat!, property.address.lng!]}
            icon={createPriceMarker(property)}
          >
            <Popup className="sc-map-popup">
              <div className="w-64 overflow-hidden rounded-sm bg-white font-sans text-slate-800">
                <div className="relative h-32 w-full">
                  <Image
                    src={property.photos[0]}
                    alt={property.address.street}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-white bg-black/40 backdrop-blur-md rounded-sm">
                    {property.status}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-xl font-bold tracking-tight text-slate-900 mb-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mb-3 truncate">
                    {property.address.street}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-500 py-2 border-y border-slate-100 mb-3">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3 text-slate-400" />
                      {property.details.beds} BD
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-3 h-3 text-slate-400" />
                      {property.details.baths} BA
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-3 h-3 text-slate-400" />
                      {formatArea(property.details.sqft)}
                    </div>
                  </div>

                  <Link
                    href={`/listings/${property.slug}`}
                    style={{
                      backgroundColor: agentConfig.colors.primary,
                    }}
                    className="w-full h-9 text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mb-3"
                  >
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  {region.idxEnabled && property.financials.mlsNumber && (
                    <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-slate-400 text-center leading-tight border-t border-slate-100 pt-2">
                      LISTING COURTESY OF {agentConfig.brokerage} · MLS #{property.financials.mlsNumber}
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
