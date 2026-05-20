"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  Heart,
  MapPin,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface PropertyGalleryProps {
  photos: string[];
  propertyAddress: string;
}

export default function PropertyGallery({
  photos,
  propertyAddress,
}: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, nextImage, prevImage]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Mobile/Tablet Single Image */}
      <div
        className="lg:hidden relative w-full h-[60vh] md:h-[80vh] cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        <Image
          src={photos[0]}
          alt={`${propertyAddress} - Main View`}
          fill
          priority
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
        />
        {/* Subtle gradient overlay at the bottom for the button */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

        {/* Floating View Gallery Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openLightbox(0);
          }}
          className="absolute bottom-8 right-8 flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-4 rounded-none hover:bg-white transition-all text-xs font-bold uppercase tracking-[0.2em] text-slate-900 border-none shadow-2xl"
        >
          <Grid className="w-4 h-4" />
          View Gallery ({photos.length})
        </button>
      </div>

      {/* Desktop Photo Grid (URBN style) */}
      <div className="hidden lg:block w-full">
        <div className="relative w-full h-[55vh] min-h-[450px] max-h-[600px] grid grid-cols-4 grid-rows-2 gap-[6px]">
          {/* Left Cell */}
          <div
            className="col-start-1 col-span-2 row-start-1 row-span-2 relative cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={photos[0]}
              alt={`${propertyAddress} - View 1`}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Middle Top Cell */}
          <div
            className="col-start-3 col-span-1 row-start-1 row-span-1 relative cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(1)}
          >
            {photos[1] && (
              <Image
                src={photos[1]}
                alt={`${propertyAddress} - View 2`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>

          {/* Middle Bottom Cell */}
          <div
            className="col-start-3 col-span-1 row-start-2 row-span-1 relative cursor-pointer group overflow-hidden"
            onClick={() => openLightbox(2)}
          >
            {photos[2] && (
              <Image
                src={photos[2]}
                alt={`${propertyAddress} - View 3`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>

          {/* Right Cell */}
          <div className="col-start-4 col-span-1 row-start-1 row-span-2 flex flex-col gap-[6px]">
            <div
              className="relative w-full flex-1 cursor-pointer group overflow-hidden"
              onClick={() => openLightbox(3)}
            >
              {photos[3] && (
                <Image
                  src={photos[3]}
                  alt={`${propertyAddress} - View 4`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
            </div>

            {/* Show All Photos Button (below image, not overlay) */}
            <button
              onClick={() => openLightbox(0)}
              className="w-full h-12 shrink-0 bg-[#1a1a1a] flex items-center justify-between px-5 text-white transition-colors hover:bg-black"
            >
              <span className="text-[13px] font-medium tracking-wide">
                Show All Photos
              </span>
              <span className="text-[13px] text-white/70">{photos.length}</span>
            </button>
          </div>
        </div>

        {/* Action Row */}
        <div className="grid grid-cols-2 pt-4 pb-6 px-1">
          {/* Left side: Save & Share */}
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-[13px] font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">
              <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} /> Save
            </button>
            <button className="flex items-center gap-2 text-[13px] font-medium text-[#1a1a1a] hover:opacity-70 transition-opacity">
              <Upload className="w-[18px] h-[18px]" strokeWidth={1.5} /> Share
            </button>
          </div>

          {/* Right side: Location */}
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#1a1a1a]">
            <MapPin className="w-[18px] h-[18px]" strokeWidth={1.5} />{" "}
            {propertyAddress}
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center select-none"
          >
            {/* Header / Controls */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[101]">
              <div className="text-white font-light tracking-widest text-sm uppercase">
                {propertyAddress}
              </div>
              <div className="flex items-center gap-8">
                <span className="text-white/70 text-sm font-medium">
                  {currentIndex + 1} / {photos.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close Lightbox"
                >
                  <X className="w-8 h-8" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="relative w-full h-full max-w-7xl px-4 flex items-center justify-center">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[70vh] md:h-[80vh]"
              >
                <Image
                  src={photos[currentIndex]}
                  alt={`${propertyAddress} - Large View`}
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 md:left-8 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white group"
              >
                <ChevronLeft className="w-8 h-8 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors text-white group"
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-3 bg-gradient-to-t from-black/60 to-transparent overflow-x-auto">
              {photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-[60px] h-[45px] shrink-0 overflow-hidden rounded-none transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={photo}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover rounded-none"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
