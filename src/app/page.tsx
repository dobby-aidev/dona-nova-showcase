"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import ExplorePage from "@/features/explore/ExplorePage";
import { SettingsModal } from "@/components/ui/SettingsModal";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Home() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [activeNav, setActiveNav] = useState("explore");
  const isMobile = useIsMobile();

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("dona_lang");
      if (stored === "tr" || stored === "en") {
        setLang(stored);
      }
    } catch {}

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const navParam = params.get("nav");
      if (navParam) {
        setActiveNav(navParam);
      }
    }

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
      <AppHeader lang={lang} setLang={handleSetLang} activeNav={activeNav} setActiveNav={setActiveNav} />


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

        {/* Layer 2a: Desktop — Floating Translucent Sidebar over 3D Canvas (zIndex: 45 sits above AppHeader z:40 so star button is BEHIND the open sidebar) */}
        <div className="app-sidebar-desktop" style={{ position: "relative", zIndex: 45, height: "100%", pointerEvents: "none", display: "inline-block" }}>
          <div style={{ pointerEvents: "auto", height: "100%" }}>
            <AppSidebar
              activeNav={activeNav}
              setActiveNav={setActiveNav}
              lang={lang}
            />
          </div>
        </div>
      </div>

      {/* Layer 2b: Mobile — Fixed Bottom Tab Bar (replaces sidebar) */}
      {isMobile && (
        <MobileBottomNav
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          lang={lang}
        />
      )}

      {/* Global Settings Modal — Active everywhere on Desktop & Mobile */}
      <GlobalSettingsHost lang={lang} />
    </>
  );
}

function GlobalSettingsHost({ lang }: { lang: "tr" | "en" }) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("dona:open-settings", handleOpen);
    return () => window.removeEventListener("dona:open-settings", handleOpen);
  }, []);

  return (
    <SettingsModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      lang={lang}
    />
  );
}

