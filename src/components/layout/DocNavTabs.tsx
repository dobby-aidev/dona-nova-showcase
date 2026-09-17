"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ShieldCheck, Database, Terminal } from "lucide-react";

const DOC_TABS = [
  { href: "/data-sources", label: "Veri Kaynakları", icon: Database },
  { href: "/pricing", label: "Açık Kaynak", icon: Terminal },
  { href: "/terms", label: "Koşullar", icon: Scale },
  { href: "/privacy", label: "Gizlilik", icon: ShieldCheck },
];

export function DocNavTabs() {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center mb-8 select-none">
      {/* Sleek Centered Document Tab Strip */}
      <nav className="inline-flex items-center justify-center gap-1 p-1 rounded-2xl border border-white/10 bg-[#0a0f1a]/80 backdrop-blur-2xl shadow-xl">
        {DOC_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)] font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-cyan-400" : "text-zinc-500"}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
