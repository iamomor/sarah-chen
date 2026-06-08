"use client";

import dynamic from "next/dynamic";

const CrispChat = dynamic(() => import("@/components/layout/CrispChat"), {
  ssr: false,
});

export default function CrispChatLoader() {
  return <CrispChat />;
}
