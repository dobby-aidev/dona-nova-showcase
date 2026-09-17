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
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-4 py-1.5 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 transition-all shadow-sm group"
      >
        <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
        <span>NASA 3D Küresine Dön</span>
      </Link>

      {/* Centered Document Tab Strip */}
      <nav className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {DOC_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 border border-blue-200 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent"
              }`}
            >
              <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
