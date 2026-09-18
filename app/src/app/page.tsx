"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import ExplorePage from "@/features/explore/ExplorePage";

export default function Home() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [activeNav, setActiveNav] = useState("explore");

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("dona_lang");
      if (stored === "tr" || stored === "en") {
        setLang(stored);
      }
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail === "tr" || e.detail === "en") {
        setLang(e.detail);
      }
    };
    window.addEventListener("dona:lang-change", handleLangChange);
    return () => window.removeEventListener("dona:lang-change", handleLangChange);
  }, []);

  const handleSetLang = (l: "tr" | "en") => {
    setLang(l);
    try {
      localStorage.setItem("dona_lang", l);
    } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dona:lang-change", { detail: l }));
    }
  };

  return (
    <>


      {/* Fixed top HUD header — z:40 above everything */}
      <AppHeader lang={lang} setLang={handleSetLang} />

      {/* App shell — Fullscreen 3D Stage with Floating Glass Sidebar & HUD */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100dvh",
          overflow: "hidden",
          background: "var(--obsidian-dark)",
        }}
      >
        {/* Layer 1: Fullscreen 3D Canvas Stage (Spans edge-to-edge behind the sidebar) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, overflow: "hidden" }}>
          <main style={{ width: "100%", height: "100%", overflow: "hidden" }} id="main-content">
            <ExplorePage lang={lang} activeNav={activeNav} />
          </main>
        </div>

        {/* Layer 2: Floating Translucent Sidebar over 3D Canvas */}
        <div style={{ position: "relative", zIndex: 30, height: "100%", pointerEvents: "none", display: "inline-block" }}>
          <div style={{ pointerEvents: "auto", height: "100%" }}>
            <AppSidebar
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              lang={lang}
            />
          </div>
        </div>
      </div>
    </>
  );
}
