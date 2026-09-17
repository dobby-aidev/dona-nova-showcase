"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Database, Heart, Shield, FileText, ExternalLink } from "lucide-react";
import { DonaLogo } from "@/components/ui/DonaLogo";
import { usePathname } from "next/navigation";

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

export function PublicHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07090e]/85 backdrop-blur-2xl px-4 sm:px-6 py-3 select-none">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity" title="DONA NOVA 3D Radar">
            <DonaLogo size="md" showText={true} />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === "/"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span>3D Küre</span>
          </Link>

          <Link
            href="/data-sources"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === "/data-sources"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Database className="h-3.5 w-3.5 text-cyan-300" />
            <span>Veri Kaynakları</span>
          </Link>

          <Link
            href="/pricing"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === "/pricing"
                ? "bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40 shadow-[0_0_10px_rgba(236,72,153,0.2)]"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Heart className="h-3.5 w-3.5 text-pink-400" />
            <span>Açık Kaynak</span>
          </Link>

          <Link
            href="/terms"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === "/terms"
                ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-zinc-400" />
            <span>Koşullar</span>
          </Link>

          <Link
            href="/privacy"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
              pathname === "/privacy"
                ? "bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>Gizlilik</span>
          </Link>
        </nav>

        {/* Right: Ecosystem & GitHub */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://dobby.donacodex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-cyan-300 px-2 py-1 transition-colors"
          >
            <span>dobby</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <a
            href="https://github.com/dobby-aidev/dona-nova-showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-white transition-all shadow-md"
          >
            <GithubIcon className="h-3.5 w-3.5 text-amber-400" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
