"use client";

import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import { region } from "@/config/region.config";
import { initEmailJS, sendMarketReportRequest } from "@/lib/emailjs";
import { formatPrice } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  Loader2,
  Lock,
  Send,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Validation schema
const marketReportSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["Buyer", "Seller", "Investor", "Curious"], {
    message: "Please select what best describes you",
  }),
});

type MarketReportFormValues = z.infer<typeof marketReportSchema>;

type MarketTrend = "up" | "down" | "stable";

const roleOptions = [
  { value: "Buyer", label: "I am looking to buy" },
  { value: "Seller", label: "I am looking to sell" },
  { value: "Investor", label: "I am an investor" },
  { value: "Curious", label: "I am just researching" },
];

interface MarketReportPreviewProps {
  selectedNeighborhood: string;
  isScanning: boolean;
}

export default function MarketReportPreview({
  selectedNeighborhood,
  isScanning,
}: MarketReportPreviewProps) {
  const [activeMetricId, setActiveMetricId] = useState<"price" | "inventory" | "dom">("price");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Lead Capture State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");

  const city = region.defaultCity;

  useEffect(() => {
    initEmailJS();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MarketReportFormValues>({
    resolver: zodResolver(marketReportSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined as any,
    },
  });

  const roleValue = watch("role");

  // Deterministic calculation for clean code reusability
  const stats = useMemo(() => {
    let nameKey = selectedNeighborhood.toLowerCase();
    
    // Hash key to generate deterministic numbers
    let seed = 0;
    for (let i = 0; i < nameKey.length; i++) {
      seed += nameKey.charCodeAt(i);
    }

    // Default prices based on Austin or fallback defaults
    const isAustinDefault = city.toLowerCase() === "austin";
    
    // Base Values Definition
    let basePrice = 450000;
    let baseInventory = 2.2;
    let baseDOM = 28;

    // Hardcode curated demo data for Sarah Chen's premium look if it matches
    if (isAustinDefault) {
      if (nameKey.includes("tarrytown")) {
        basePrice = 2150000;
        baseInventory = 1.8;
        baseDOM = 16;
      } else if (nameKey.includes("westlake")) {
        basePrice = 3450000;
        baseInventory = 2.6;
        baseDOM = 22;
      } else if (nameKey.includes("hyde park")) {
        basePrice = 1150000;
        baseInventory = 1.9;
        baseDOM = 19;
      } else if (nameKey.includes("barton hills")) {
        basePrice = 1580000;
        baseInventory = 2.0;
        baseDOM = 20;
      } else if (nameKey.includes("travis heights")) {
        basePrice = 1420000;
        baseInventory = 2.2;
        baseDOM = 24;
      }
    } else {
      // Reusable Fallback Calculations for other pitches (e.g. Sydney, London)
      basePrice = 600000 + (seed % 6) * 450000;
      baseInventory = 1.5 + (seed % 4) * 0.7;
      baseDOM = 15 + (seed % 5) * 6;
    }

    // Generate monthly series points (6 months)
    // Dynamic price path
    const priceChangeDirection = (seed % 3) - 1; // -1, 0, or 1
    const pricePoints = Array.from({ length: 6 }, (_, i) => {
      if (i === 5) return basePrice;
      const distFromEnd = 5 - i;
      const trendFactor = priceChangeDirection || 1;
      
      // Expected trend step backwards
      const baseStep = -distFromEnd * 18000 * trendFactor;
      
      // Organic fluctuation
      const wave = Math.sin((seed + i) * 1.5) * 15000;
      
      // Dampen wave/noise near the end to make transition to basePrice smooth
      const dampening = distFromEnd / 5;
      
      return Math.round(basePrice + baseStep + wave * dampening);
    });

    // Dynamic inventory path
    const invPoints = Array.from({ length: 6 }, (_, i) => {
      if (i === 5) return baseInventory;
      const distFromEnd = 5 - i;
      const invTrendDirection = (seed % 2) === 0 ? -1 : 1;
      
      const baseStep = -distFromEnd * 0.15 * invTrendDirection;
      const wave = Math.sin((seed + i) * 2.0) * 0.25;
      const dampening = distFromEnd / 5;
      
      return Math.max(0.2, parseFloat((baseInventory + baseStep + wave * dampening).toFixed(1)));
    });

    // Dynamic DOM path
    const domPoints = Array.from({ length: 6 }, (_, i) => {
      if (i === 5) return baseDOM;
      const distFromEnd = 5 - i;
      const domTrendDirection = (seed % 2) === 0 ? 1 : -1;
      
      const baseStep = -distFromEnd * 1.5 * domTrendDirection;
      const wave = Math.sin((seed + i) * 1.8) * 3;
      const dampening = distFromEnd / 5;
      
      return Math.max(4, Math.round(baseDOM + baseStep + wave * dampening));
    });

    // Build metric summaries
    const priceTrend: MarketTrend =
      pricePoints[5] > pricePoints[0]
        ? "up"
        : pricePoints[5] < pricePoints[0]
          ? "down"
          : "stable";
    const invTrend: MarketTrend =
      invPoints[5] > invPoints[0]
        ? "up"
        : invPoints[5] < invPoints[0]
          ? "down"
          : "stable";
    const domTrend: MarketTrend =
      domPoints[5] > domPoints[0]
        ? "down"
        : domPoints[5] < domPoints[0]
          ? "up"
          : "stable"; // lower DOM is up trend

    // Curated insights
    const priceInsight = priceTrend === "up" 
      ? `Commanding strong appreciation. Demand remains sustained across high-end custom properties.`
      : priceTrend === "down" 
      ? `Entering a stabilized plateau, presenting favorable buying coordinates for asset acquisition.`
      : `Holding consistent values, presenting balanced advisory options for both sides.`;

    const invInsight = invTrend === "up"
      ? `Inventory has expanded, granting buyers expanded choice and contract negotiation headroom.`
      : `Inventory remains highly compressed, keeping sales conditions fiercely competitive.`;

    const domInsight = `Absorption velocity averages ${baseDOM} days. Premium architectural structures sell significantly faster.`;

    return {
      price: {
        label: "Median Sale Price",
        value: formatPrice(basePrice),
        change: priceTrend === "up" ? "+4.2% YoY" : priceTrend === "down" ? "-1.8% YoY" : "Flat YoY",
        trend: priceTrend,
        insight: priceInsight,
        points: pricePoints,
        unit: "",
        icon: BarChart3,
      },
      inventory: {
        label: "Inventory Levels",
        value: `${baseInventory} Months`,
        change: invTrend === "up" ? "+8.4% YoY" : invTrend === "down" ? "-3.1% YoY" : "Stable",
        trend: invTrend,
        insight: invInsight,
        points: invPoints,
        unit: " Months",
        icon: ArrowUpRight,
      },
      dom: {
        label: "Avg Days on Market",
        value: `${baseDOM} Days`,
        change: domTrend === "up" ? "-4 Days YoY" : domTrend === "down" ? "+3 Days YoY" : "Stable",
        trend: domTrend,
        insight: domInsight,
        points: domPoints,
        unit: " Days",
        icon: Clock,
      },
    };
  }, [selectedNeighborhood, city]);

  const activeMetric = stats[activeMetricId];

  // SVG Chart rendering computations
  const months = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const chartHeight = 230;
  const paddingLeft = 65;
  const paddingRight = 35;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartCoordinates = useMemo(() => {
    const points = activeMetric.points;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    
    // Add 12% vertical buffer for nice breathing room at top and bottom
    const bufferMin = min - range * 0.12;
    const bufferMax = max + range * 0.12;
    const bufferRange = bufferMax - bufferMin;

    return points.map((val, idx) => {
      const x = paddingLeft + (idx / 5) * (600 - paddingLeft - paddingRight);
      const y = chartHeight - paddingBottom - ((val - bufferMin) / bufferRange) * (chartHeight - paddingTop - paddingBottom);
      return { x, y, value: val };
    });
  }, [activeMetric, chartHeight]);

  // Smooth Cubic Bezier Spline D Path
  const pathD = useMemo(() => {
    if (chartCoordinates.length === 0) return "";
    let d = `M ${chartCoordinates[0].x} ${chartCoordinates[0].y}`;
    for (let i = 0; i < chartCoordinates.length - 1; i++) {
      const curr = chartCoordinates[i];
      const next = chartCoordinates[i + 1];
      const cp1x = curr.x + (next.x - curr.x) / 3;
      const cp1y = curr.y;
      const cp2x = curr.x + 2 * (next.x - curr.x) / 3;
      const cp2y = next.y;
      
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    return d;
  }, [chartCoordinates]);

  const areaD = useMemo(() => {
    if (chartCoordinates.length === 0) return "";
    const bottomY = chartHeight - paddingBottom;
    return `${pathD} L ${chartCoordinates[chartCoordinates.length - 1].x} ${bottomY} L ${chartCoordinates[0].x} ${bottomY} Z`;
  }, [pathD, chartCoordinates, chartHeight]);

  const onSubmit = async (data: MarketReportFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await sendMarketReportRequest({
        name: data.name,
        email: data.email,
        role: data.role,
      });
      setSubmittedName(data.name.split(" ")[0]);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Market report signup error:", error);
      setSubmitError("Could not submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTrendIcon = (trend: MarketTrend, className?: string) => {
    if (trend === "up") return <TrendingUp className={className || "w-3 h-3 text-emerald-600"} />;
    if (trend === "down") return <TrendingDown className={className || "w-3 h-3 text-rose-600"} />;
    return <span className={`w-2.5 h-[1px] bg-slate-400 block ${className || ""}`} />;
  };

  const getTrendBadgeStyle = (trend: MarketTrend) => {
    if (trend === "up") {
      return {
        bg: "bg-emerald-500/10 border-emerald-500/20",
        text: "text-emerald-700",
        iconColor: "text-emerald-600 w-3.5 h-3.5"
      };
    }
    if (trend === "down") {
      return {
        bg: "bg-rose-500/10 border-rose-500/20",
        text: "text-rose-700",
        iconColor: "text-rose-600 w-3.5 h-3.5"
      };
    }
    return {
      bg: "bg-slate-500/10 border-slate-500/20",
      text: "text-slate-600",
      iconColor: "bg-slate-400 w-2 h-[1px]"
    };
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#f9f6f0] px-6 sm:px-8 lg:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Editorial Title */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 justify-center">
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
              Corridor Dashboard
            </span>
            <div className="h-[1px] w-6 bg-[#c9a96e]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#1a2744] font-medium leading-tight">
            {selectedNeighborhood} <span className="italic font-light text-[#c9a96e]">Analytics</span>
          </h2>
          <p className="text-slate-500 font-light text-sm max-w-md mx-auto leading-relaxed">
            Click on any indicator below to analyze the 6-month historical trend.
          </p>
        </div>

        {/* Dashboard Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative">
          
          {/* LEFT: Metric Cards Selector (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-0 lg:flex lg:flex-col lg:justify-between">
            {(["price", "inventory", "dom"] as const).map((metricId) => {
              const metric = stats[metricId];
              const Icon = metric.icon;
              const isActive = activeMetricId === metricId;

              return (
                <button
                  key={metricId}
                  onClick={() => !isScanning && setActiveMetricId(metricId)}
                  disabled={isScanning}
                  className={`w-full text-left p-6 relative transition-all duration-500 flex flex-col justify-between space-y-4 cursor-pointer outline-none rounded-none border ${
                    isActive 
                      ? "border-transparent bg-white shadow-[0_20px_50px_rgba(26,39,68,0.06)] scale-[1.02]" 
                      : "border-slate-200/40 bg-white/40 hover:bg-white hover:border-slate-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
                  }`}
                >
                  {/* Fine-stroke gold corner brackets exactly at the border edges */}
                  {isActive && (
                    <>
                      <div className="absolute -top-[1px] -left-[1px] w-3.5 h-3.5 border-t-2 border-l-2 border-[#c9a96e]" />
                      <div className="absolute -top-[1px] -right-[1px] w-3.5 h-3.5 border-t-2 border-r-2 border-[#c9a96e]" />
                      <div className="absolute -bottom-[1px] -left-[1px] w-3.5 h-3.5 border-b-2 border-l-2 border-[#c9a96e]" />
                      <div className="absolute -bottom-[1px] -right-[1px] w-3.5 h-3.5 border-b-2 border-r-2 border-[#c9a96e]" />
                    </>
                  )}

                  <div className="flex justify-between items-start">
                    <div className={`p-2.5 rounded-none transition-all duration-500 ${
                      isActive ? "bg-[#1a2744] text-white" : "bg-[#1a2744]/5 text-[#1a2744]"
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {(() => {
                      const badge = getTrendBadgeStyle(metric.trend);
                      return (
                        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[9px] font-bold tracking-wider uppercase transition-colors duration-500 ${badge.bg} ${badge.text}`}>
                          {getTrendIcon(metric.trend, badge.iconColor)}
                          {metric.change}
                        </div>
                      );
                    })()}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#c9a96e] block">
                      {metric.label}
                    </span>
                    <h3 className="text-3xl font-serif font-medium text-[#1a2744] tracking-tight">
                      {metric.value}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-400 font-light leading-relaxed pt-3 border-t border-slate-100/60">
                    {metric.insight}
                  </p>
                </button>
              );
            })}
          </div>

          {/* RIGHT: High-End Custom Chart (7 Cols) */}
          <div className="lg:col-span-7 border border-[#c9a96e]/15 p-5 sm:p-8 bg-white shadow-[0_20px_50px_rgba(26,39,68,0.03)] flex flex-col justify-between min-h-[300px] sm:min-h-[380px] relative">
            
            {/* Floating gold corner highlights */}
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2 border-[#c9a96e]" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2 border-[#c9a96e]" />
            <div className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2 border-[#c9a96e]" />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2 border-[#c9a96e]" />

            <div className="flex justify-between items-baseline mb-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c9a96e]">
                  Trendline Graph
                </span>
                <h4 className="text-lg font-serif font-medium text-[#1a2744]">
                  {activeMetric.label} Timeline
                </h4>
              </div>
              <span className="text-xs font-light text-slate-400 font-sans">
                6-Month Aggregation
              </span>
            </div>

            {/* SVG Chart Container - Responsive Aspect Ratio */}
            <div className="flex-1 w-full relative mt-4 select-none aspect-[600/230]">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 600 230"
                className="overflow-visible"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const mouseX = e.clientX - rect.left;
                  const relativeX = mouseX - (paddingLeft / 600) * rect.width;
                  const chartW = rect.width - ((paddingLeft + paddingRight) / 600) * rect.width;
                  const pct = Math.max(0, Math.min(1, relativeX / chartW));
                  const index = Math.round(pct * 5);
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Definitions for Gradients and Glow Filters */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#c9a96e" stopOpacity="0.00" />
                  </linearGradient>
                  <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Horizontal gridlines */}
                {Array.from({ length: 5 }).map((_, idx) => {
                  const y = paddingTop + (idx / 4) * (chartHeight - paddingTop - paddingBottom);
                  return (
                    <line
                      key={idx}
                      x1={paddingLeft}
                      y1={y}
                      x2={600 - paddingRight}
                      y2={y}
                      stroke="#1a2744"
                      strokeOpacity="0.04"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Left vertical Y-axis labels */}
                {useMemo(() => {
                  const points = activeMetric.points;
                  const min = Math.min(...points);
                  const max = Math.max(...points);
                  const range = max - min || 1;
                  const bufferMin = min - range * 0.12;
                  const bufferMax = max + range * 0.12;

                  return Array.from({ length: 3 }).map((_, idx) => {
                    const pct = idx / 2;
                    const value = bufferMax - pct * (bufferMax - bufferMin);
                    const y = paddingTop + pct * (chartHeight - paddingTop - paddingBottom) + 4;
                    
                    let label = "";
                    if (activeMetricId === "price") {
                      label = value >= 1000000 
                        ? `${region.symbol}${(value / 1000000).toFixed(2)}M`
                        : `${region.symbol}${Math.round(value / 1000)}K`;
                    } else {
                      label = value.toFixed(1) + activeMetric.unit;
                    }

                    return (
                      <text
                        key={idx}
                        x={paddingLeft - 10}
                        y={y}
                        textAnchor="end"
                        className="text-[9px] font-sans font-medium fill-slate-400"
                      >
                        {label}
                      </text>
                    );
                  });
                }, [activeMetric, activeMetricId])}

                {/* Axis Boundary Lines */}
                <line
                  x1={paddingLeft}
                  y1={paddingTop}
                  x2={paddingLeft}
                  y2={chartHeight - paddingBottom}
                  stroke="#1a2744"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
                <line
                  x1={paddingLeft}
                  y1={chartHeight - paddingBottom}
                  x2={600 - paddingRight}
                  y2={chartHeight - paddingBottom}
                  stroke="#1a2744"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />

                {/* Area under the line */}
                <path d={areaD} fill="url(#chartGradient)" />

                {/* Glow path behind line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.15"
                  filter="url(#lineGlow)"
                />

                {/* Main trend line */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Horizontal X Axis Labels */}
                {chartCoordinates.map((coord, idx) => (
                  <text
                    key={idx}
                    x={coord.x}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    className="text-[10px] font-sans font-bold fill-[#1a2744]/60 uppercase tracking-wider"
                  >
                    {months[idx]}
                  </text>
                ))}

                {/* Small elegant dots at all coordinate points */}
                {chartCoordinates.map((coord, idx) => {
                  const isHovered = hoveredIndex === idx;
                  return (
                    <circle
                      key={idx}
                      cx={coord.x}
                      cy={coord.y}
                      r={isHovered ? "5" : "3"}
                      fill={isHovered ? "#1a2744" : "white"}
                      stroke="#c9a96e"
                      strokeWidth={isHovered ? "2" : "1.5"}
                      className="transition-all duration-200"
                    />
                  );
                })}

                {/* Hover line indicator & pulsing halos */}
                {hoveredIndex !== null && chartCoordinates[hoveredIndex] && (
                  <>
                    <line
                      x1={chartCoordinates[hoveredIndex].x}
                      y1={paddingTop}
                      x2={chartCoordinates[hoveredIndex].x}
                      y2={chartHeight - paddingBottom}
                      stroke="#c9a96e"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                      opacity="0.6"
                    />
                    <circle
                      cx={chartCoordinates[hoveredIndex].x}
                      cy={chartCoordinates[hoveredIndex].y}
                      r="10"
                      fill="#c9a96e"
                      fillOpacity="0.12"
                      className="animate-pulse"
                    />
                  </>
                )}
              </svg>

              {/* Float Tooltip Element overlay */}
              {hoveredIndex !== null && chartCoordinates[hoveredIndex] && (
                <div
                  className="absolute p-3 bg-[#1a2744]/95 backdrop-blur-md text-white border-l-2 border-l-[#c9a96e] border border-white/10 shadow-2xl z-30 pointer-events-none rounded-none text-left min-w-[125px]"
                  style={{
                    left: `${(chartCoordinates[hoveredIndex].x / 600) * 100}%`,
                    top: `${(chartCoordinates[hoveredIndex].y / chartHeight) * 100 - 32}%`,
                    transform: "translate(-50%, -100%)",
                    transition: "all 0.08s ease-out",
                  }}
                >
                  <div className="text-[8px] font-bold text-[#c9a96e] uppercase tracking-widest">
                    {months[hoveredIndex]} Summary
                  </div>
                  <div className="text-xs font-semibold font-serif mt-1">
                    {activeMetricId === "price"
                      ? formatPrice(chartCoordinates[hoveredIndex].value)
                      : chartCoordinates[hoveredIndex].value + activeMetric.unit}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lead Capture Box - Merged & Friction-Free */}
        <div className="bg-[#1a2744] border border-[#c9a96e]/20 p-6 sm:p-8 md:p-12 text-white relative overflow-hidden max-w-4xl mx-auto shadow-2xl">
          
          {/* Subtle gold line accent */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#c9a96e]" />
          
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="text-center py-6 space-y-6"
              >
                <div className="w-14 h-14 bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-[#c9a96e]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c9a96e]">
                    Secure Connection Established
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white font-light">
                    Intelligence Vault Unlocked
                  </h3>
                </div>
                <p className="text-xs text-slate-300 font-light max-w-md mx-auto leading-relaxed">
                  Welcome, {submittedName}. The complete 15-page monthly analysis dossier for {selectedNeighborhood} has been queued and will be delivered directly to your email.
                </p>
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedName("");
                      reset();
                    }}
                    className="text-[9px] font-bold uppercase tracking-widest text-[#c9a96e] hover:underline cursor-pointer"
                  >
                    Subscribe Another Contact
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Copy block */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-ping" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#c9a96e]">
                      Executive Report Access
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light leading-tight">
                    Download the Full <br />
                    <span className="italic font-medium text-[#c9a96e]">{selectedNeighborhood}</span> Dossier
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Access deep structural adjustments, micro-zoning changes, and off-market private treaty closures. Sent standard on the 1st of every month.
                  </p>
                </div>

                {/* Form fields */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="lg:col-span-7 space-y-4"
                  noValidate
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <input
                        placeholder="Full Name"
                        {...register("name")}
                        className="w-full h-11 px-4 bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#c9a96e] focus:bg-white/10 transition-all font-sans rounded-none"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-[10px] mt-1 font-medium">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        {...register("email")}
                        className="w-full h-11 px-4 bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#c9a96e] focus:bg-white/10 transition-all font-sans rounded-none"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-[10px] mt-1 font-medium">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Role Dropdown */}
                    <div className="md:col-span-7">
                      <CustomSelect
                        id="mr-preview-role"
                        variant="dark"
                        options={roleOptions}
                        value={roleValue}
                        onChange={(val) => setValue("role", val as any, { shouldValidate: true })}
                        placeholder="What best describes you?"
                        error={!!errors.role}
                      />
                      {errors.role && (
                        <p className="text-red-400 text-[10px] mt-1 font-medium">{errors.role.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-5">
                      <Button
                        type="submit"
                        disabled={isSubmitting || isScanning}
                        className="w-full h-11 bg-[#c9a96e] text-[#1a2744] hover:bg-white hover:text-[#1a2744] font-bold uppercase tracking-widest text-[9px] transition-all rounded-none flex items-center justify-center gap-1.5 font-sans !cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Locking...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            Download Report
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[10px] font-medium text-center">
                      {submitError}
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 text-[8px] text-slate-400 uppercase tracking-widest pt-2">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-[#c9a96e]" /> Secure SSL
                    </span>
                    <span>•</span>
                    <span>Zero Advertising Spam</span>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
