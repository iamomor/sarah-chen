"use client";

import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatArea, formatPrice, formatPriceShort } from "@/lib/utils";
import { Property } from "@/types";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowRight, Bath, Bed, Square } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import useSupercluster from "use-supercluster";

// Status Colors mapping
const statusColors: Record<string, string> = {
  Active: agentConfig.colors.primary,
  "Under Contract": agentConfig.colors.accent,
  "Coming Soon": "#6b7280",
  Sold: "#9ca3af",
};

// Create Price Tag Marker Icon
const createPriceMarker = (property: Property, isActive: boolean) => {
  const shortPrice = formatPriceShort(property.price);
  const bgColor = statusColors[property.status] ?? agentConfig.colors.primary;
  const scale = isActive ? "scale(1.15)" : "scale(1)";

  return L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div style="
        background: ${bgColor};
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 700;
        white-space: nowrap;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 2px solid white;
        font-family: Inter, sans-serif;
        cursor: pointer;
        transform: ${scale};
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: ${isActive ? 1000 : 1};
      ">
        ${shortPrice}
      </div>
    `,
    iconSize: [60, 32],
    iconAnchor: [30, 16],
  });
};

const createClusterIcon = (count: number) => {
  return L.divIcon({
    className: "bg-transparent border-none",
    html: `
      <div style="
        background: ${agentConfig.colors.primary};
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 800;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      ">
        ${count}
      </div>
    `,
    iconSize: [36, 36],
  });
};

interface MapViewProps {
  properties: Property[];
  onPropertySelect: (property: Property) => void;
  activePropertyId?: string | null;
}

function MapController({
  activePropertyId,
  properties,
}: {
  activePropertyId?: string | null;
  properties: Property[];
}) {
  const map = useMap();
  useEffect(() => {
    if (activePropertyId) {
      const property = properties.find((p) => p.id === activePropertyId);
      if (property?.address.lat && property?.address.lng) {
        map.flyTo([property.address.lat, property.address.lng], 15, {
          duration: 1,
        });
      }
    }
  }, [activePropertyId, properties, map]);
  return null;
}

function MapEvents({
  zoom,
  bounds,
  setZoom,
  setBounds,
}: {
  zoom: number;
  bounds: [number, number, number, number] | null;
  setZoom: (zoom: number) => void;
  setBounds: (bounds: [number, number, number, number]) => void;
}) {
  const map = useMap();
  const boundsRef = useRef(bounds);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    boundsRef.current = bounds;
    zoomRef.current = zoom;
  }, [bounds, zoom]);

  useEffect(() => {
    const update = () => {
      const b = map.getBounds();
      const newBounds: [number, number, number, number] = [
        b.getWest(),
        b.getSouth(),
        b.getEast(),
        b.getNorth(),
      ];
      const newZoom = map.getZoom();

      const currentBounds = boundsRef.current;
      const boundsChanged =
        !currentBounds ||
        Math.abs(currentBounds[0] - newBounds[0]) > 0.00001 ||
        Math.abs(currentBounds[1] - newBounds[1]) > 0.00001 ||
        Math.abs(currentBounds[2] - newBounds[2]) > 0.00001 ||
        Math.abs(currentBounds[3] - newBounds[3]) > 0.00001;

      const zoomChanged = zoomRef.current !== newZoom;

      if (boundsChanged) {
        setBounds(newBounds);
      }
      if (zoomChanged) {
        setZoom(newZoom);
      }
    };
    update();
    map.on("moveend", update);
    map.on("zoomend", update);
    return () => {
      map.off("moveend", update);
      map.off("zoomend", update);
    };
  }, [map, setZoom, setBounds]);
  return null;
}

export default function MapView({
  properties,
  onPropertySelect,
  activePropertyId,
}: MapViewProps) {
  const [zoom, setZoom] = useState(agentConfig.mapCenter.zoom);
  const [bounds, setBounds] = useState<[number, number, number, number] | null>(
    null,
  );
  const mapRef = useRef<L.Map | null>(null);

  const points = useMemo(() => {
    return properties
      .filter((p) => p.address.lat && p.address.lng)
      .map((p) => ({
        type: "Feature" as const,
        properties: {
          cluster: false,
          propertyId: p.id,
          property: p,
        },
        geometry: {
          type: "Point" as const,
          coordinates: [p.address.lng!, p.address.lat!],
        },
      }));
  }, [properties]);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: bounds || undefined,
    zoom,
    options: { radius: 60, maxZoom: 13 },
  });

  return (
    <div className="w-full h-full relative overflow-hidden rounded-sm border border-border shadow-2xl">
      <MapContainer
        center={[agentConfig.mapCenter.lat, agentConfig.mapCenter.lng]}
        zoom={agentConfig.mapCenter.zoom}
        className="w-full h-full z-10"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <MapController
          activePropertyId={activePropertyId}
          properties={properties}
        />

        <MapEvents
          zoom={zoom}
          bounds={bounds}
          setZoom={setZoom}
          setBounds={setBounds}
        />

        {clusters.map((cluster) => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const isCluster = !!cluster.properties.cluster;

          if (isCluster) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const pointCount = (cluster.properties as any).point_count;
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                position={[latitude, longitude]}
                icon={createClusterIcon(pointCount)}
                eventHandlers={{
                  click: () => {
                    if (supercluster && mapRef.current) {
                      const expansionZoom = Math.min(
                        supercluster.getClusterExpansionZoom(
                          cluster.id as number,
                        ),
                        20,
                      );
                      mapRef.current.setView(
                        [latitude, longitude],
                        expansionZoom,
                      );
                    }
                  },
                }}
              />
            );
          }

          const property = cluster.properties.property as Property;
          const isActive = activePropertyId === property.id;

          return (
            <Marker
              key={`property-${property.id}`}
              position={[latitude, longitude]}
              icon={createPriceMarker(property, isActive)}
            >
              <Popup className="sc-map-popup">
                <div className="w-64 overflow-hidden rounded-sm bg-white">
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
                    <div className="text-xl font-bold tracking-tight text-foreground mb-1">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mb-3 truncate">
                      {property.address.street}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter text-muted-foreground py-2 border-y border-border/50 mb-3">
                      <div className="flex items-center gap-1">
                        <Bed className="w-3 h-3 text-accent/60" />
                        {property.details.beds} BD
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-3 h-3 text-accent/60" />
                        {property.details.baths} BA
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-3 h-3 text-accent/60" />
                        {formatArea(property.details.sqft)}
                      </div>
                    </div>

                    <button
                      onClick={() => onPropertySelect(property)}
                      className="w-full h-9 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mb-3"
                    >
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    {region.idxEnabled && property.financials.mlsNumber && (
                      <div className="text-[8px] font-bold uppercase tracking-[0.1em] text-muted-foreground/40 text-center leading-tight border-t border-border/30 pt-2 mls-line">
                        LISTING COURTESY OF {agentConfig.brokerage} · MLS #
                        {property.financials.mlsNumber}
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
