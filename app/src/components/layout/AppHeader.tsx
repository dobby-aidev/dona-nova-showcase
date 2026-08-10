"use client";

import React from "react";
import { Bell, ChevronRight, Sparkles, Languages } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface AppHeaderProps {
  lang: "tr" | "en";
  setLang: (lang: "tr" | "en") => void;
}

export function AppHeader({ lang, setLang }: AppHeaderProps) {
  return (
    <header
      id="app-header"
      className="flex h-[64px] w-full shrink-0 items-center justify-between px-6 z-20"
      style={{
        background: "hsl(222 24% 4.5% / 0.85)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Left: Clean Breadcrumb (No duplicate logo) */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-400 font-medium flex items-center gap-1.5">
          {lang === "tr" ? "Altyapı Platformu" : "Infrastructure Platform"}
        </span>
        <ChevronRight className="h-3 w-3 text-slate-600" />
        <span className="text-slate-100 font-extrabold tracking-tight">
          {lang === "tr" ? "Küresel Harita & Keşif" : "Global Map & Explorer"}
        </span>
      </div>

      {/* Right: TR/EN Language Switcher + GitHub + Status */}
      <div className="flex items-center gap-3 ml-auto">
        {/* GitHub Open Source Link */}
        <a
          href="https://github.com/donacodex/dona-nova"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-sm"
          title="GitHub Open Source Repository"
        >
          <GithubIcon className="h-3.5 w-3.5 text-slate-300" />
          <span className="hidden sm:inline">GitHub</span>
        </a>


        {/* TR / EN Switcher */}
        <button
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
          className="flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-slate-900/80 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white hover:border-blue-500/40 transition-all"
        >
          <Languages className="h-3.5 w-3.5 text-blue-400" />
          <span>{lang === "tr" ? "TR | EN" : "EN | TR"}</span>
        </button>

        <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-bold text-emerald-400 sm:flex shadow-sm">
          <Sparkles className="h-3 w-3 text-emerald-400 animate-pulse" />
          {lang === "tr" ? "Canlı Veri Akışı" : "Live Stream"}
        </div>

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-sm" />
        </button>
      </div>
    </header>
  );
}

