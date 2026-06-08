"use client";

import React from "react";
import { agentConfig } from "@/config/agent.config";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `<div style="width: 40px; height: 40px; border-radius: 50%; background: #f9f6f0; display: flex; align-items: center; justify-content: center; color: #c9a96e; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 2px solid #c9a96e;"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function ContactMap() {
  const { name, address, mapCenter } = agentConfig;

  return (
    <div className="w-full h-[300px] bg-slate-100 border border-slate-200/80 overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.02)] z-0">
      {/* Decorative luxury accent lines */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#c9a96e]/30 z-[1000]" />
      
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={14}
        className="w-full h-full z-10"
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[mapCenter.lat, mapCenter.lng]} icon={customIcon}>
          <Popup>
            <div className="font-sans text-center px-1 py-0.5">
              <strong className="block text-[#1a2744] font-serif text-sm mb-1">{name}</strong>
              <span className="text-[10px] text-slate-500">{address}</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
