"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type MortgageCalculator from "./MortgageCalculator";

const MortgageCalculatorDynamic = dynamic(
  () => import("@/features/tools/components/MortgageCalculator"),
  { ssr: false },
);

type MortgageCalculatorLoaderProps = ComponentProps<typeof MortgageCalculator>;

export default function MortgageCalculatorLoader(
  props: MortgageCalculatorLoaderProps,
) {
  return <MortgageCalculatorDynamic {...props} />;
}
