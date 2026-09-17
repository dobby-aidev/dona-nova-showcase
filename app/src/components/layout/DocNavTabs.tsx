"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Scale, ShieldCheck, Database, Terminal } from "lucide-react";

const DOC_TABS = [
  { href: "/terms", label: "Kullanım Koşulları", icon: Scale },
  { href: "/privacy", label: "Gizlilik Politikası", icon: ShieldCheck },
  { href: "/data-sources", label: "Açık Veri Kaynakları", icon: Database },
  { href: "/pricing", label: "Açık Kaynak Manifestosu", icon: Terminal },
];

export function DocNavTabs() {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col items-center gap-3.5 mb-10 select-none">
      {/* Return to Globe Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-[#faebd7]/20 bg-[#131622]/90 hover:bg-[#1c2033] px-4 py-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-cyan-200 transition-all shadow-md group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
        <span>NASA 3D Küresine Dön</span>
      </Link>

      {/* Centered Document Tab Strip */}
      <nav className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl border border-[#faebd7]/15 bg-[#0f111c]/90 backdrop-blur-xl shadow-lg">
        {DOC_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#faebd7]/20 via-[#faebd7]/10 to-transparent text-[#ffffff] border border-[#faebd7]/30 shadow-sm"
                  : "text-slate-400 hover:text-[#faebd7] hover:bg-white/[0.04]"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
