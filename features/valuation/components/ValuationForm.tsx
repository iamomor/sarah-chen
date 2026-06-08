"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { region } from "@/config/region.config";
import type { ValuationFormData } from "@/types";
import { initEmailJS, sendValuationRequest } from "@/lib/emailjs";
import { trackConversion } from "@/components/layout/Analytics";

import ProgressBar from "./ProgressBar";
import StepAddress from "./StepAddress";
import StepProperty from "./StepProperty";
import StepContact from "./StepContact";
import StepSuccess from "./StepSuccess";

export default function ValuationForm() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | "success">(1);
  const [globalData, setGlobalData] = useState<Partial<ValuationFormData>>({
    city: region.defaultCity,
    state: region.defaultState,
    updates: [],
  });

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleStep1Next = (data: { street: string; city: string; state: string; zip: string }) => {
    setGlobalData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Next = (data: {
    propertyType: string;
    beds: string;
    baths: string;
    sqft: string;
    yearBuilt: string;
    condition: string;
    updates: string[];
  }) => {
    setGlobalData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  const handleStep3Submit = async (data: {
    name: string;
    email: string;
    phone: string;
    timing: "ASAP" | "1-3 months" | "3-6 months" | "Just curious";
  }) => {
    const finalData = { ...globalData, ...data } as ValuationFormData;
    console.log("Submitting lead capture:", finalData);
    
    // Asynchronously dispatch the lead data to EmailJS in the background
    sendValuationRequest(finalData).catch((err) => {
      console.error("Valuation request dispatch failed:", err);
    });

    setGlobalData((prev) => ({ ...prev, ...data }));
    setCurrentStep("success");
    // ── Analytics: GA4 conversion + Meta Pixel Lead ──
    trackConversion('form_submit_valuation', { method: 'ValuationForm' });
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-none border border-slate-200/80 shadow-[0_30px_70px_rgba(0,0,0,0.03)] relative overflow-hidden">
      
      {/* Editorial aesthetic line accents */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-[#c9a96e] to-primary" />
      <div className="absolute top-0 right-0 w-[1px] h-full bg-slate-100" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-100" />

      <ProgressBar currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepAddress 
              initialValues={globalData} 
              onNext={handleStep1Next} 
            />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepProperty 
              initialValues={globalData} 
              onNext={handleStep2Next} 
              onBack={() => setCurrentStep(1)} 
            />
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <StepContact 
              initialValues={globalData} 
              onSubmit={handleStep3Submit} 
              onBack={() => setCurrentStep(2)} 
            />
          </motion.div>
        )}

        {currentStep === "success" && (
          <StepSuccess 
            name={globalData.name || ""} 
            zip={globalData.zip} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

