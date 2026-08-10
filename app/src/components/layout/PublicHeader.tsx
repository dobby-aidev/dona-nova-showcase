"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Database, CreditCard, Shield, FileText, Languages } from "lucide-react";
import { DonaLogo } from "@/components/ui/DonaLogo";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl px-6 py-3.5 select-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Left: Brand Logo & Back Button */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <DonaLogo size="md" showText={true} />
          </Link>

          <Link
            href="/"
            className="hidden sm:flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-3.5 py-1.5 text-xs font-bold text-blue-300 hover:bg-blue-600/20 hover:border-blue-400/50 transition-all shadow-md"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>3D Haritaya Dön</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-blue-400" />
            <span>3D Harita</span>
          </Link>

          <Link
            href="/data-sources"
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Database className="h-3.5 w-3.5 text-emerald-400" />
            <span>Veri Kaynakları</span>
          </Link>

          <Link
            href="/pricing"
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <CreditCard className="h-3.5 w-3.5 text-purple-400" />
            <span>Fiyatlandırma</span>
          </Link>

          <Link
            href="/terms"
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <FileText className="h-3.5 w-3.5 text-amber-400" />
            <span>Kullanım Koşulları</span>
          </Link>

          <Link
            href="/privacy"
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <Shield className="h-3.5 w-3.5 text-sky-400" />
            <span>Gizlilik</span>
          </Link>
        </nav>

        {/* Right: Quick Action */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-xs font-extrabold text-white shadow-lg hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95"
          >
            Platforma Giriş Yap
          </Link>
        </div>
      </div>
    </header>
  );
}
