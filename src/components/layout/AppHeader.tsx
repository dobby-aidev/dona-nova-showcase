"use client";

import React from "react";
import { ChevronRight, Sparkles, Languages, ExternalLink, Star } from "lucide-react";

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
      className="flex h-[64px] w-full shrink-0 items-center justify-between px-6 z-20 select-none bg-[#07090e]/80 backdrop-blur-2xl border-b border-white/[0.08]"
    >
      {/* Left: Telemetry Breadcrumb */}
      <div className="flex items-center gap-2.5 text-xs">
        <span className="text-cyan-400 font-mono font-bold tracking-wider text-[11px] uppercase">
          DONA NOVA
        </span>
        <ChevronRight className="h-3 w-3 text-zinc-500" />
        <span className="text-zinc-200 font-bold tracking-tight flex items-center gap-2 text-[12.5px]">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 dn-live-pulse shadow-[0_0_8px_#34d399]" />
          {lang === "tr" ? "Açık Altyapı Radarı (35,000+ Tesis)" : "Open Infrastructure Radar (35,000+ Assets)"}
        </span>
      </div>

      {/* Right: Portfolio + Ecosystem + GitHub + Language */}
      <div className="flex items-center gap-2.5 ml-auto">
        {/* Creator Portfolio badge: Dobby */}
        <a
          href="https://dobby.donacodex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-500/40 px-3 py-1.5 text-[11.5px] font-semibold text-zinc-300 hover:text-white transition-all shadow-lg group"
          title={lang === "tr" ? "Geliştirici Portföyü & Resmi Sitesi" : "Creator Official Portfolio"}
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span>dobby Portföy</span>
          <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
        </a>

        {/* Dona Codex Ecosystem badge */}
        <a
          href="https://donacodex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-indigo-500/40 px-3 py-1.5 text-[11.5px] font-semibold text-zinc-300 hover:text-white transition-all shadow-lg group"
          title={lang === "tr" ? "Dona Codex Resmi Platformu" : "Dona Codex Official Platform"}
        >
          <span className="text-cyan-400 font-mono font-bold">DC</span>
          <span>Dona Codex</span>
          <ExternalLink className="h-3 w-3 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
        </a>

        {/* GitHub Open Source Link */}
        <a
          href="https://github.com/dobby-aidev/dona-nova-showcase"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-200 hover:text-white transition-all shadow-lg"
          title={lang === "tr" ? "GitHub'da Açık Kaynak İncele ve Yıldız Ver" : "Star on GitHub"}
        >
          <GithubIcon className="h-3.5 w-3.5 text-amber-400" />
          <span className="font-mono text-[11px]">GitHub</span>
          <div className="flex items-center gap-0.5 text-amber-400 ml-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          </div>
        </a>

        {/* TR / EN Switcher */}
        <button
          onClick={() => setLang(lang === "tr" ? "en" : "tr")}
          className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1.5 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-all shadow-lg"
        >
          <Languages className="h-3.5 w-3.5 text-zinc-400" />
          <span>{lang === "tr" ? "TR" : "EN"}</span>
        </button>
      </div>
    </header>
  );
}
