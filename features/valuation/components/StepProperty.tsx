"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Bath,
  Building2,
  Home,
  Info,
  Layers,
  Paintbrush,
  Sparkles,
  Thermometer,
  Utensils,
  Waves,
} from "lucide-react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import type { ValuationFormData } from "@/types";

// Dynamic Icon Mapping utility for customizable updates list
const getUpdateIcon = (id: string) => {
  switch (id.toLowerCase()) {
    case "kitchen":
      return Utensils;
    case "bathrooms":
      return Bath;
    case "roof":
      return Home;
    case "hvac":
      return Thermometer;
    case "flooring":
      return Layers;
    case "paint":
      return Paintbrush;
    case "pool":
      return Waves;
    default:
      return Sparkles;
  }
};

interface StepPropertyProps {
  initialValues: Partial<ValuationFormData>;
  onNext: (data: {
    propertyType: string;
    beds: string;
    baths: string;
    sqft: string;
    yearBuilt: string;
    condition: string;
    updates: string[];
  }) => void;
  onBack: () => void;
}

export default function StepProperty({
  initialValues,
  onNext,
  onBack,
}: StepPropertyProps) {
  const step2Schema = useMemo(() => {
    return z.object({
      propertyType: z.string().min(1, "Property Type is required"),
      beds: z.string().min(1, "Bedrooms is required"),
      baths: z.string().min(1, "Bathrooms is required"),
      sqft: z.string().min(1, "Area size is required"),
      yearBuilt: z.string().min(1, "Year Built is required"),
      condition: z.string().min(1, "Condition is required"),
      updates: z.array(z.string()).default([]),
    });
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      propertyType: initialValues.propertyType || "",
      beds: initialValues.beds || "",
      baths: initialValues.baths || "",
      sqft: initialValues.sqft || "",
      yearBuilt: initialValues.yearBuilt || "",
      condition: initialValues.condition || "",
      updates: initialValues.updates || [],
    },
  });

  return (
    <div>
      <div className="mb-8 text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-2 block">
          Asset Details
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-light text-primary">
          Describe Your <span className="italic font-medium">Residence</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-8">
        {/* PROPERTY TYPE */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Property Type
          </Label>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                {agentConfig.valuation.propertyTypes.map((type) => {
                  const isSelected = field.value === type.value;
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => field.onChange(type.value)}
                      className={`p-4 border text-left transition-all duration-300 flex flex-col justify-between h-24 rounded-none cursor-pointer outline-none relative overflow-hidden group ${
                        isSelected
                          ? "border-[#c9a96e] bg-[#c9a96e]/5 ring-1 ring-[#c9a96e]"
                          : "border-slate-200 hover:border-slate-400 bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <Building2
                          className={`w-5 h-5 ${isSelected ? "text-[#c9a96e]" : "text-slate-400 group-hover:text-slate-600"}`}
                        />
                        {isSelected && (
                          <span className="w-1.5 h-1.5 bg-[#c9a96e] rounded-full" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          {type.label}
                        </p>
                        <p className="text-[9px] text-slate-400 mt-0.5">
                          {type.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.propertyType && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5" />{" "}
              {errors.propertyType.message as string}
            </p>
          )}
        </div>

        {/* BEDS & BATHS SELECTION CARDS */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Bedrooms
            </Label>
            <Controller
              name="beds"
              control={control}
              render={({ field }) => (
                <div className="flex border border-slate-200 rounded-none overflow-hidden h-12 bg-slate-50">
                  {["1", "2", "3", "4", "5+"].map((n) => {
                    const isSelected = field.value === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => field.onChange(n)}
                        className={`flex-1 text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-[#c9a96e] text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.beds && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                {errors.beds.message as string}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Bathrooms
            </Label>
            <Controller
              name="baths"
              control={control}
              render={({ field }) => (
                <div className="flex border border-slate-200 rounded-none overflow-hidden h-12 bg-slate-50">
                  {["1", "2", "3", "4+"].map((n) => {
                    const isSelected = field.value === n;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => field.onChange(n)}
                        className={`flex-1 text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-[#c9a96e] text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              )}
            />
            {errors.baths && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                {errors.baths.message as string}
              </p>
            )}
          </div>
        </div>

        {/* SIZE & AGE */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Approx. Area ({region.areaLabel})
            </Label>
            <Controller
              name="sqft"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="flex h-14 !h-14 w-full items-center justify-between border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 outline-none transition-all duration-300 focus:border-[#c9a96e] focus:bg-white focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-slate-400 rounded-none cursor-pointer">
                    <SelectValue placeholder="Choose Area size..." />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="rounded-none border-slate-200 shadow-xl bg-white w-[var(--radix-select-trigger-width)] max-h-[250px]"
                  >
                    {region.sqftOptions.map((n) => (
                      <SelectItem
                        key={n}
                        value={n}
                        className="text-xs font-bold uppercase tracking-wider text-slate-700 py-3 hover:bg-slate-50 focus:bg-slate-50 focus:text-slate-900 cursor-pointer rounded-none pl-4 pr-8 relative flex w-full items-center"
                      >
                        {n} {region.areaLabel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.sqft && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                {errors.sqft.message as string}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
              Year Built
            </Label>
            <Controller
              name="yearBuilt"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="flex h-14 !h-14 w-full items-center justify-between border border-slate-200/80 bg-slate-50/50 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 outline-none transition-all duration-300 focus:border-[#c9a96e] focus:bg-white focus:ring-0 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-slate-400 rounded-none cursor-pointer">
                    <SelectValue placeholder="Choose Year Built..." />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="rounded-none border-slate-200 shadow-xl bg-white w-[var(--radix-select-trigger-width)] max-h-[250px]"
                  >
                    {[
                      "Before 1950",
                      "1950-1980",
                      "1980-2000",
                      "2000-2010",
                      "2010-2020",
                      "2020+",
                    ].map((n) => (
                      <SelectItem
                        key={n}
                        value={n}
                        className="text-xs font-bold uppercase tracking-wider text-slate-700 py-3 hover:bg-slate-50 focus:bg-slate-50 focus:text-slate-900 cursor-pointer rounded-none pl-4 pr-8 relative flex w-full items-center"
                      >
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.yearBuilt && (
              <p className="text-xs font-semibold text-red-500 mt-1">
                {errors.yearBuilt.message as string}
              </p>
            )}
          </div>
        </div>

        {/* CONDITION SLIDER/GRID */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Home Condition
          </Label>
          <Controller
            name="condition"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-4 gap-2">
                {agentConfig.valuation.conditions.map((cond) => {
                  const isSelected = field.value === cond.value;
                  return (
                    <button
                      key={cond.value}
                      type="button"
                      onClick={() => field.onChange(cond.value)}
                      className={`p-3 border text-center transition-all duration-300 rounded-none cursor-pointer outline-none relative group h-20 flex flex-col justify-center items-center ${
                        isSelected
                          ? "border-[#c9a96e] bg-[#c9a96e]/5 ring-1 ring-[#c9a96e]"
                          : "border-slate-200 hover:border-slate-350 bg-white"
                      }`}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
                        {cond.value}
                      </p>
                      <p className="text-[8px] text-slate-400 mt-1 leading-tight text-center">
                        {cond.desc.split(" ")[0]} details
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.condition && (
            <p className="text-xs font-semibold text-red-500 mt-1">
              {errors.condition.message as string}
            </p>
          )}
        </div>

        {/* RECENT UPDATES MULTISELECT */}
        <div className="space-y-3">
          <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Recent Improvements & Amenities
          </Label>
          <Controller
            name="updates"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {agentConfig.valuation.updates.map((update) => {
                  const isChecked = field.value?.includes(update.label);
                  const UpdateIcon = getUpdateIcon(update.id);
                  return (
                    <button
                      key={update.id}
                      type="button"
                      onClick={() => {
                        const val = field.value || [];
                        if (isChecked) {
                          field.onChange(
                            val.filter((v: string) => v !== update.label),
                          );
                        } else {
                          field.onChange([...val, update.label]);
                        }
                      }}
                      className={`p-3 border text-left transition-all duration-300 rounded-none cursor-pointer outline-none flex items-center gap-2 text-xs font-semibold ${
                        isChecked
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                      }`}
                    >
                      <UpdateIcon
                        className={`w-3.5 h-3.5 flex-shrink-0 ${isChecked ? "text-primary animate-pulse" : "text-slate-400"}`}
                      />
                      <span className="text-[10px] uppercase tracking-wider">
                        {update.label
                          .replace("Updated ", "")
                          .replace("New ", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          />
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="flex gap-4 pt-6 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            className="w-1/3 h-14 rounded-none border-slate-200 hover:bg-slate-50 text-slate-600 uppercase tracking-[0.2em] font-bold text-[10px] transition-all cursor-pointer"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Return
          </Button>
          <Button
            type="submit"
            className="w-2/3 h-14 rounded-none bg-[#c9a96e] hover:bg-[#c9a96e]/95 text-white uppercase tracking-[0.2em] font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 group cursor-pointer"
          >
            Proceed to Delivery{" "}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </div>
  );
}
