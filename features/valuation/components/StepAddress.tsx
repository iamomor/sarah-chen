"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Clock, Info, ShieldCheck, UserCheck } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import type { ValuationFormData } from "@/types";

interface StepAddressProps {
  initialValues: Partial<ValuationFormData>;
  onNext: (data: {
    street: string;
    city: string;
    state: string;
    zip: string;
  }) => void;
}

export default function StepAddress({
  initialValues,
  onNext,
}: StepAddressProps) {
  const step1Schema = useMemo(() => {
    return z.object({
      street: z.string().min(1, "Street Address is required"),
      city: z.string().min(1, "City is required"),
      state: z.string().min(1, "State is required"),
      zip: z.string().refine(
        (val) => {
          const regex = new RegExp(region.postalCodeRegex, "i");
          return regex.test(val);
        },
        {
          message: `Must be a valid ${region.postalCodeLabel}`,
        },
      ),
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      street: initialValues.street || "",
      city: initialValues.city || region.defaultCity,
      state: initialValues.state || region.defaultState,
      zip: initialValues.zip || "",
    },
  });

  return (
    <div>
      <div className="mb-10 text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a96e] mb-2 block">
          Bespoke Market Evaluation
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-light text-primary leading-tight">
          What’s Your <br />
          <span className="italic font-medium">Home Worth?</span>
        </h2>
        <p className="text-slate-500 font-light text-sm mt-3 leading-relaxed max-w-md">
          Enter your property details below. {agentConfig.name} will compile a
          luxury-tier comparative valuation report within 2 business hours.
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="street"
            className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
          >
            Street Address
          </Label>
          <div className="relative">
            <Input
              id="street"
              placeholder="e.g. 982 Scenic Drive"
              className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base placeholder:text-slate-300"
              {...register("street")}
            />
          </div>
          {errors.street && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5" /> {errors.street.message as string}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="city"
              className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
            >
              City
            </Label>
            <Input
              id="city"
              className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base"
              {...register("city")}
            />
            {errors.city && (
              <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                <Info className="w-3.5 h-3.5" /> {errors.city.message as string}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="state"
              className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
            >
              State / Region
            </Label>
            <Input
              id="state"
              className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base"
              {...register("state")}
            />
            {errors.state && (
              <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
                <Info className="w-3.5 h-3.5" />{" "}
                {errors.state.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 pb-6">
          <Label
            htmlFor="zip"
            className="text-xs uppercase tracking-widest text-slate-500 font-semibold"
          >
            {region.postalCodeLabel}
          </Label>
          <Input
            id="zip"
            placeholder={region.postalCodePlaceholder}
            className="h-14 px-4 bg-slate-50/50 border-slate-200/80 focus:border-[#c9a96e] focus:bg-white rounded-none transition-all duration-300 outline-none text-base placeholder:text-slate-300"
            {...register("zip")}
          />
          {errors.zip && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <Info className="w-3.5 h-3.5" /> {errors.zip.message as string}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-none bg-primary hover:bg-primary/95 text-white hover:text-white uppercase tracking-[0.2em] font-bold text-xs shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
        >
          Begin Valuation{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>

        <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-8 mt-6">
          <div className="text-center p-3">
            <div className="flex justify-center mb-1.5">
              <ShieldCheck className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
              100% Confidential
            </p>
            <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">
              Your details remain private
            </p>
          </div>
          <div className="text-center p-3 border-x border-slate-100">
            <div className="flex justify-center mb-1.5">
              <Clock className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
              Takes 60 Seconds
            </p>
            <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">
              Quick 3-step digital form
            </p>
          </div>
          <div className="text-center p-3">
            <div className="flex justify-center mb-1.5">
              <UserCheck className="w-5 h-5 text-[#c9a96e]" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
              Expert Analysis
            </p>
            <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">
              Manual CMA broker check
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
