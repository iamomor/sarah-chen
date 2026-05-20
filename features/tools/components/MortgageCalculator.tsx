"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { agentConfig } from "@/config/agent.config";
import { region } from "@/config/region.config";
import { formatPrice } from "@/lib/utils";
import type { Property } from "@/types";

interface MortgageCalculatorProps {
  defaultPrice?: number;
  compact?: boolean;
}

const mortgageSchema = z.object({
  homePrice: z.number().min(0, "Price must be positive"),
  downPaymentPct: z
    .number()
    .min(5, "Minimum down payment is 5%")
    .max(50, "Maximum down payment is 50%"),
  loanTerm: z.number(),
  interestRate: z.number().min(0, "Interest rate must be positive"),
  propertyTax: z.number().min(0, "Property tax/rates must be positive"),
  hoaFee: z.number().min(0, "Fees must be positive"),
});

type MortgageFormValues = z.infer<typeof mortgageSchema>;

export default function MortgageCalculator({
  defaultPrice,
  compact = false,
}: MortgageCalculatorProps) {
  const defaultHomePrice = defaultPrice ?? 1000000;

  const form = useForm<MortgageFormValues>({
    resolver: zodResolver(mortgageSchema),
    defaultValues: {
      homePrice: defaultHomePrice,
      downPaymentPct: 20,
      loanTerm: region.mortgageTerms[1] ?? region.mortgageTerms[0] ?? 30,
      interestRate: region.defaultInterestRate ?? 6.8,
      propertyTax: 1.8,
      hoaFee: 150,
    },
    mode: "onChange",
  });

  const { register, control, watch, setValue } = form;

  // React to defaultPrice updates (e.g. when selected property changes)
  useEffect(() => {
    if (defaultPrice !== undefined) {
      setValue("homePrice", defaultPrice);
    }
  }, [defaultPrice, setValue]);

  // Watch form fields to dynamically calculate payments
  const homePrice = watch("homePrice") ?? 0;
  const downPaymentPct = watch("downPaymentPct") ?? 20;
  const loanTerm = watch("loanTerm") ?? 30;
  const interestRate = watch("interestRate") ?? 6.8;
  const propertyTax = watch("propertyTax") ?? 1.8;
  const hoaFee = watch("hoaFee") ?? 150;

  // Calculation logic
  const calculatedDownPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = Math.max(0, homePrice - calculatedDownPayment);

  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  let principalInterest = 0;
  if (loanAmount > 0 && numberOfPayments > 0) {
    if (monthlyInterestRate === 0) {
      principalInterest = loanAmount / numberOfPayments;
    } else {
      principalInterest =
        (loanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
  }

  const monthlyTax = (homePrice * (propertyTax / 100)) / 12;
  const monthlyHOA = hoaFee;
  const monthlyPMI = downPaymentPct < 20 ? (loanAmount * 0.0075) / 12 : 0;
  const totalMonthly = principalInterest + monthlyTax + monthlyHOA + monthlyPMI;

  const totalPayments = principalInterest * numberOfPayments;
  const totalInterest = Math.max(0, totalPayments - loanAmount);

  // Dynamic labels based on region
  const propertyTaxLabel =
    region.language === "en-AU"
      ? "Council Rates"
      : region.language === "en-GB"
        ? "Council Tax"
        : "Property Tax";

  const hoaLabel = region.language === "en-AU" ? "Strata Fee" : "HOA Fee";

  return (
    <div
      className={`bg-white p-8 md:p-12 ${
        compact ? "" : "transition-all duration-250 ease-out hover:-translate-y-1"
      }`}
      style={
        compact
          ? {
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "4px",
            }
          : {
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              borderRadius: "4px",
            }
      }
    >
      <Form {...form}>
        <div className={compact ? "flex flex-col gap-10" : "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"}>
          {/* Input Controls */}
          <div className={compact ? "w-full space-y-8" : "lg:col-span-7 space-y-8"}>
            {/* Home Price Input */}
            <FormField
              control={control}
              name="homePrice"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                    {region.symbol} Home Price
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium select-none"
                        style={{ fontSize: "15px" }}
                      >
                        {region.symbol}
                      </span>
                      <Input
                        type="number"
                        className="pl-9 h-[48px] border-gray-200 focus:border-gray-400 rounded-[2px] bg-white font-medium shadow-none"
                        style={{ color: "#1a2744" }}
                        placeholder="1,000,000"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Down Payment Percentage Slider */}
            <FormField
              control={control}
              name="downPaymentPct"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="flex justify-between items-end">
                    <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                      Down Payment
                    </FormLabel>
                    <span className="text-sm font-semibold" style={{ color: "#1a2744" }}>
                      {formatPrice(calculatedDownPayment)} ({field.value}%)
                    </span>
                  </div>
                  <FormControl>
                    <Slider
                      value={[field.value]}
                      min={5}
                      max={50}
                      step={1}
                      onValueChange={([val]) => field.onChange(val)}
                      className="py-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Loan Term Selection */}
            <FormField
              control={control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                    Loan Term
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      {region.mortgageTerms.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => field.onChange(term)}
                          className="flex-1 h-[48px] text-sm font-medium rounded-[2px] transition-all border cursor-pointer"
                          style={
                            field.value === term
                              ? {
                                  backgroundColor: "#1a2744",
                                  color: "white",
                                  borderColor: "#1a2744",
                                }
                              : {
                                  backgroundColor: "transparent",
                                  color: "#6b7280",
                                  borderColor: "rgba(0,0,0,0.08)",
                                }
                          }
                        >
                          {term} yr
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interest Rate & Secondary Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Interest Rate */}
              <FormField
                control={control}
                name="interestRate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                      Interest Rate (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        className="h-[48px] border-gray-200 focus:border-gray-400 rounded-[2px] bg-white font-medium shadow-none text-[#1a2744]"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Property Tax */}
              <FormField
                control={control}
                name="propertyTax"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                      {propertyTaxLabel} (%)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        className="h-[48px] border-gray-200 focus:border-gray-400 rounded-[2px] bg-white font-medium shadow-none text-[#1a2744]"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* HOA / Strata Fee */}
              <FormField
                control={control}
                name="hoaFee"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium" style={{ color: "#1a1a1a" }}>
                      {hoaLabel} ({region.symbol}/mo)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="h-[48px] border-gray-200 focus:border-gray-400 rounded-[2px] bg-white font-medium shadow-none text-[#1a2744]"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Calculations Summary */}
          <div
            className={`${
              compact ? "w-full" : "lg:col-span-5"
            } flex flex-col justify-between p-8 bg-[#f9f6f0] rounded-[4px] border border-black/[0.04]`}
          >
            <div className="space-y-8">
              {/* Main output */}
              <div className="text-center pb-6 border-b border-black/[0.06]">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-2">
                  Estimated Monthly Payment
                </p>
                <p className="text-4xl sm:text-5xl font-serif text-[#1a2744] font-medium">
                  {region.symbol}
                  {Math.round(totalMonthly).toLocaleString()}/mo
                </p>
              </div>

              {/* Breakdown table */}
              <div className="space-y-3.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a2744] mb-3">
                  Monthly Breakdown
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Principal & Interest</span>
                  <span className="font-semibold text-[#1a1a1a]">
                    {formatPrice(principalInterest)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">{propertyTaxLabel}</span>
                  <span className="font-semibold text-[#1a1a1a]">{formatPrice(monthlyTax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">{hoaLabel}</span>
                  <span className="font-semibold text-[#1a1a1a]">{formatPrice(monthlyHOA)}</span>
                </div>
                {monthlyPMI > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6b7280]">PMI (Est.)</span>
                    <span className="font-semibold text-[#1a1a1a]">{formatPrice(monthlyPMI)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-black/[0.06] flex justify-between text-sm font-bold">
                  <span className="text-[#1a2744]">Total Monthly</span>
                  <span className="text-[#1a2744]">{formatPrice(totalMonthly)}</span>
                </div>
              </div>

              {/* Loan Summary */}
              <div className="pt-6 border-t border-black/[0.06] space-y-3.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#1a2744] mb-3">
                  Loan Summary
                </p>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Loan Amount</span>
                  <span className="font-medium text-[#1a1a1a]">{formatPrice(loanAmount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Down Payment</span>
                  <span className="font-medium text-[#1a1a1a]">
                    {formatPrice(calculatedDownPayment)} ({downPaymentPct}%)
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Total Interest Paid</span>
                  <span className="font-medium text-[#1a1a1a]">{formatPrice(totalInterest)}</span>
                </div>
              </div>
            </div>

            {/* CTA Pre-approval */}
            {agentConfig.bookingUrl && (
              <div className="mt-8 pt-4">
                <Button
                  asChild
                  variant="gold"
                  className="w-full text-center py-4 uppercase font-semibold tracking-widest text-xs h-14"
                >
                  <a href={agentConfig.bookingUrl} target="_blank" rel="noopener noreferrer">
                    Get Pre-Approved
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
}
