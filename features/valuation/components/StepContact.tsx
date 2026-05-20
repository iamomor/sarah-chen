"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ChevronRight, Info, Lock } from "lucide-react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { agentConfig } from "@/config/agent.config";
import type { ValuationFormData } from "@/types";

interface StepContactProps {
  initialValues: Partial<ValuationFormData>;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    timing: "ASAP" | "1-3 months" | "3-6 months" | "Just curious";
  }) => void;
  onBack: () => void;
}

export default function StepContact({
  initialValues,
  onSubmit,
  onBack,
}: StepContactProps) {
  const step3Schema = useMemo(() => {
    return z.object({
      name: z.string().min(1, "Full Name is required"),
      email: z.string().email("Valid email is required"),
      phone: z.string().min(10, "Phone number is required"),
      timing: z.enum(["ASAP", "1-3 months", "3-6 months", "Just curious"], {
        message: "Please select an option",
      }),
    });
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    phone: string;
    timing: "ASAP" | "1-3 months" | "3-6 months" | "Just curious";
  }>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      name: initialValues.name || "",
      email: initialValues.email || "",
      phone: initialValues.phone || "",
      timing: initialValues.timing,
    },
  });

  return (
    <div>
      <div className="mb-8 text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-2 block">
          Delivery Allocation
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-light text-primary">
          Where Should We Send Your{" "}
          <span className="italic font-medium">Valuation?</span>
        </h2>
        <p className="text-slate-500 font-light text-sm mt-3 leading-relaxed">
          Your report will be custom compiled. {agentConfig.name} reviews each
          entry individually using premium local comparative data (not standard
          automated algorithms).
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
          >
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="e.g. Eleanor Vance"
            className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base placeholder:text-slate-300"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5" /> {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
          >
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="e.g. eleanor@sterlingluxury.com"
            className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base placeholder:text-slate-300"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5" /> {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="phone"
            className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="e.g. (512) 555-0147"
            className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base placeholder:text-slate-300"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5" /> {errors.phone.message as string}
            </p>
          )}
        </div>

        <div className="space-y-3 pb-4">
          <Label className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            When are you thinking of selling?
          </Label>
          <Controller
            name="timing"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-2">
                {agentConfig.valuation.timings.map((timing) => {
                  const isSelected = field.value === timing.value;
                  return (
                    <button
                      key={timing.value}
                      type="button"
                      onClick={() => field.onChange(timing.value)}
                      className={`p-4 border text-center transition-all duration-300 rounded-none cursor-pointer outline-none text-[10px] font-bold uppercase tracking-wider ${
                        isSelected
                          ? "border-[#c9a96e] bg-[#c9a96e]/5 text-[#c9a96e]"
                          : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                      }`}
                    >
                      {timing.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          {errors.timing && (
            <p className="text-xs font-semibold text-red-500 mt-1">
              {errors.timing.message as string}
            </p>
          )}
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
            className="w-2/3 h-14 rounded-none bg-primary hover:bg-primary/95 text-white uppercase tracking-[0.2em] font-bold text-xs transition-all shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
          >
            Submit Request{" "}
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 mt-6 pt-4 border-t border-slate-50">
          <Lock className="w-3.5 h-3.5 text-slate-300" />
          <span>
            Your private details are encrypted and protected under strict agency
            luxury guidelines.
          </span>
        </div>
      </form>
    </div>
  );
}
