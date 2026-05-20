import { Suspense } from "react";
import ListingsTemplate from "@/features/listings/components/ListingsTemplate";

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fdfcf9] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#c9a96e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a96e] font-bold">Loading Curated Residences...</p>
        </div>
      </div>
    }>
      <ListingsTemplate />
    </Suspense>
  );
}
