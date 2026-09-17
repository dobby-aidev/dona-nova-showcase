"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import ExplorePage from "@/features/explore/ExplorePage";

export default function Home() {
  const [lang, setLang] = useState<"tr" | "en">("tr");
  const [activeNav, setActiveNav] = useState("explore");

  return (
    <div
      className="flex h-dvh overflow-hidden dn-grid-bg"
      style={{ background: "hsl(var(--dn-bg-void))" }}
    >
      {/* Sidebar */}
      <AppSidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        lang={lang}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AppHeader lang={lang} setLang={setLang} />
        <main className="flex-1 overflow-hidden" id="main-content">
          <ExplorePage
            lang={lang}
            activeNav={activeNav}
          />
        </main>
      </div>
    </div>
  );
}
