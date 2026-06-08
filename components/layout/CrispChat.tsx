"use client";

/**
 * CrispChat — Simple AI-powered chat
 *
 * How it works:
 *  1. Crisp chat widget loads on the page
 *  2. Visitor types a question → message:sent fires
 *  3. We POST to /api/chat → OpenRouter free model answers
 *  4. AI reply is pushed into the Crisp widget via message:show
 *  5. If human intervention is needed, you answer from the Crisp dashboard app
 */

import { agentConfig } from "@/config/agent.config";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    $crisp: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    CRISP_WEBSITE_ID: string;
  }
}

function getPageContext(): string {
  if (typeof window === "undefined") return "Homepage";
  const path = window.location.pathname;
  if (path.includes("/listings")) return "Listings";
  if (path.includes("/valuation")) return "Valuation";
  if (path.includes("/buy")) return "Buying";
  if (path.includes("/sell")) return "Selling";
  if (path.includes("/contact")) return "Contact";
  if (path.includes("/neighborhoods")) return "Neighborhoods";
  if (path.includes("/blog")) return "Blog";
  if (path.includes("/calculator")) return "Calculator";
  if (path.includes("/market-report")) return "Market Report";
  return "Homepage";
}

export default function CrispChat() {
  const initialized = useRef(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isOperatorActive, setIsOperatorActive] = useState(false);
  const chatHistory = useRef<{ role: "user" | "assistant"; content: string }[]>([]);
  const aiThinking = useRef(false);
  const isBotReplying = useRef(false);

  // Initialize operator active state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOperatorActive(localStorage.getItem("crisp_operator_active") === "true");
    }
  }, []);

  const handleEndChat = () => {
    if (typeof window !== "undefined" && window.$crisp) {
      if (localStorage.getItem("crisp_operator_active") === "true") {
        // Just close the chat widget, don't wipe history, so the human conversation is saved
        window.$crisp.push(["do", "chat:close"]);
      } else {
        // Reset session to clear bot conversation history
        window.$crisp.push(["do", "session:reset", [true]]);
        window.$crisp.push(["do", "chat:close"]);
      }
      localStorage.removeItem("crisp_operator_active");
      chatHistory.current = [];
      setIsChatOpen(false);
      setIsOperatorActive(false);
    }
  };

  useEffect(() => {
    if (initialized.current) return;
    if (
      typeof window === "undefined" ||
      !agentConfig.crispWebsiteId ||
      agentConfig.crispWebsiteId.startsWith("XXXXXXXX")
    ) {
      return;
    }
    initialized.current = true;

    // ── 1. Bootstrap Crisp SDK ─────────────────────────────────────────
    (window as any).CRISP_RUNTIME_CONFIG = { session: { merge: false } };
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = agentConfig.crispWebsiteId;

    // Only add script if not already present
    if (!document.querySelector('script[src="https://client.crisp.chat/l.js"]')) {
      const s = document.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      document.head.appendChild(s);
    }

    const c = window.$crisp;

    // ── 2. Track open/close state ──────────────────────────────────────
    c.push(["on", "chat:opened", () => setIsChatOpen(true)]);
    c.push(["on", "chat:closed", () => setIsChatOpen(false)]);

    // ── 3. Track operator replies to disable AI (human handoff) ────────
    c.push([
      "on",
      "message:received",
      (message: any) => {
        // Any message received from the server (operator) disables the AI chatbot
        if (
          message &&
          (message.from === "operator" ||
            message.origin === "urn:crisp:operator" ||
            message.user?.role === "operator")
        ) {
          // If the message is from our own bot's reply, do not disable the AI
          if (isBotReplying.current) {
            isBotReplying.current = false;
            return;
          }
          const isAiReply = chatHistory.current.some(
            (h) => h.role === "assistant" && h.content === message.content
          );
          if (isAiReply) return;

          localStorage.setItem("crisp_operator_active", "true");
          setIsOperatorActive(true);
        }
      },
    ]);

    // ── 4. THE ONE listener — user sends text → AI replies ─────────────
    c.push([
      "on",
      "message:sent",
      async (message: { type: string; content: string }) => {
        // Only handle plain text messages typed by the visitor
        if (message.type !== "text") return;
        if (!message.content?.trim()) return;

        // Check if operator took over (read from localStorage for fresh session state)
        const isOpActive = localStorage.getItem("crisp_operator_active") === "true";
        if (isOpActive) return;
        if (aiThinking.current) return;

        aiThinking.current = true;
        chatHistory.current.push({ role: "user", content: message.content });

        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              messages: chatHistory.current,
              pageContext: getPageContext(),
            }),
          });

          const data = await res.json();
          const reply =
            data.reply?.trim() ||
            `Please reach ${agentConfig.name} directly at ${agentConfig.phone}.`;

          // CRITICAL FIX: Pushing to window.$crisp directly so it targets the live Crisp SDK reference, not the stale initialization array
          if (typeof window !== "undefined" && window.$crisp) {
            isBotReplying.current = true;
            window.$crisp.push(["do", "message:show", ["text", reply]]);
          }
          chatHistory.current.push({ role: "assistant", content: reply });
        } catch (err) {
          console.error("Chat error:", err);
          if (typeof window !== "undefined" && window.$crisp) {
            window.$crisp.push([
              "do",
              "message:show",
              [
                "text",
                `Sorry, I'm having a connection issue. Please reach ${agentConfig.name} at ${agentConfig.phone} or ${agentConfig.email}.`,
              ],
            ]);
          }
        } finally {
          aiThinking.current = false;
        }
      },
    ]);
  }, []);

  // Fallback: poll Crisp's open state in case events don't fire
  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== "undefined" && window.$crisp && typeof window.$crisp.is === "function") {
        const isOpen = window.$crisp.is("chat:opened");
        setIsChatOpen(isOpen);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!isChatOpen) return null;

  return (
    <button
      onClick={handleEndChat}
      aria-label="End chat session"
      className="fixed top-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-auto md:bottom-24 md:right-[400px] z-[2147483647] flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a96e]/30 bg-[#1a2744]/90 backdrop-blur-md text-[#c9a96e] text-xs font-semibold tracking-wider shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-[#c9a96e] hover:text-[#1a2744] hover:border-[#c9a96e] hover:shadow-[0_4px_25px_rgba(201,169,110,0.4)] hover:scale-105 active:scale-95 cursor-pointer uppercase"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
      <span>{isOperatorActive ? "Close Chat" : "Clear & End Chat"}</span>
      <span className="text-[10px] opacity-70">✕</span>
    </button>
  );
}
