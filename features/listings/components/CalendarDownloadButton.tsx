"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface CalendarDownloadButtonProps {
  propertyAddress: string;
  openHouseDate: string; // e.g. "2026-06-06"
  openHouseTime: string; // e.g. "2:00 PM - 5:00 PM"
  neighborhood: string;
}

export default function CalendarDownloadButton({
  propertyAddress,
  openHouseDate,
  openHouseTime,
  neighborhood,
}: CalendarDownloadButtonProps) {
  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Parse start and end time from openHouseTime
    // Time format: "2:00 PM - 5:00 PM"
    const timeParts = openHouseTime.split("-").map((t) => t.trim());
    const startTimeStr = timeParts[0];
    const endTimeStr = timeParts[1];

    const parseTime = (timeStr: string, dateStr: string) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (modifier === "PM" && hours < 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      const date = new Date(dateStr);
      // Handle local timezone mapping
      date.setHours(hours, minutes || 0, 0, 0);
      return date;
    };

    try {
      const startDate = parseTime(startTimeStr, openHouseDate);
      const endDate = parseTime(endTimeStr, openHouseDate);

      const formatICSDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      const startFormatted = formatICSDate(startDate);
      const endFormatted = formatICSDate(endDate);

      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Sarah Chen Realty//NONSGML Open House Event//EN",
        "BEGIN:VEVENT",
        `UID:${encodeURIComponent(propertyAddress)}-openhouse@sarahchenrealty.com`,
        `DTSTAMP:${formatICSDate(new Date())}`,
        `DTSTART:${startFormatted}`,
        `DTEND:${endFormatted}`,
        `SUMMARY:Open House: ${propertyAddress}`,
        `DESCRIPTION:Tour this luxury listing in ${neighborhood} with Sarah Chen. No appointment needed.`,
        `LOCATION:${propertyAddress}, Austin, TX`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `open-house-${propertyAddress.toLowerCase().replace(/[^a-z0-9]/g, "-")}.ics`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate ICS file:", err);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleAddToCalendar}
      className="w-full flex items-center justify-center gap-1.5 border-[#1a2744]/20 text-[#1a2744] hover:bg-[#1a2744] hover:text-white rounded-none transition-all duration-300 font-sans text-xs uppercase tracking-widest font-bold !cursor-pointer"
    >
      <Calendar className="w-3.5 h-3.5" />
      Add to Calendar
    </Button>
  );
}
