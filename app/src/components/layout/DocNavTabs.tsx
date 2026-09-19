"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ShieldCheck, Database, Terminal } from "lucide-react";

import { useIsMobile } from "@/hooks/useIsMobile";

interface DocNavTabsProps {
  lang?: "tr" | "en";
}

const DOC_TABS = [
  { href: "/data-sources", labelTr: "Veri Kaynakları",    labelEn: "Data Sources",        icon: Database },
  { href: "/pricing",      labelTr: "Açık Kaynak",        labelEn: "Open Source",         icon: Terminal },
  { href: "/terms",        labelTr: "Kullanım Koşulları",  labelEn: "Terms of Use",        icon: Scale },
  { href: "/privacy",      labelTr: "Gizlilik & Güvenlik", labelEn: "Privacy & Security",  icon: ShieldCheck },
];

export function DocNavTabs({ lang: propLang }: DocNavTabsProps) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [lang, setLang] = React.useState<"tr" | "en">(propLang || "tr");

  React.useEffect(() => {
    if (propLang) {
      setLang(propLang);
      return;
    }
    try {
      const stored = localStorage.getItem("dona_lang");
      if (stored === "tr" || stored === "en") setLang(stored);
    } catch {}

    const handleLangChange = (e: any) => {
      if (e.detail === "tr" || e.detail === "en") setLang(e.detail);
    };
    window.addEventListener("dona:lang-change", handleLangChange);
    return () => window.removeEventListener("dona:lang-change", handleLangChange);
  }, [propLang]);

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginBottom: isMobile ? "1.25rem" : "2rem",
      userSelect: "none",
      padding: isMobile ? "0 4px" : "0",
      boxSizing: "border-box",
    }}>
      {/* Sleek Centered Document Tab Strip */}
      <nav style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: isMobile ? 3 : 4,
        padding: isMobile ? "3px" : "4px",
        borderRadius: isMobile ? 12 : 14,
        border: "1px solid var(--gold-border)",
        background: "rgba(6, 7, 12, 0.45)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: "none",
        maxWidth: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}>
        {DOC_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 4 : 6,
                borderRadius: isMobile ? 8 : 10,
                padding: isMobile ? "5px 9px" : "8px 12px",
                minHeight: isMobile ? 30 : 36,
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? "0.60rem" : "0.68rem",
                fontWeight: isActive ? 800 : 600,
                letterSpacing: "0.05em",
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                border: isActive ? "1px solid var(--gold-border)" : "1px solid transparent",
                background: isActive ? "rgba(212, 175, 55, 0.16)" : "transparent",
                color: isActive ? "var(--gold-bright)" : "var(--text-muted)",
                boxShadow: isActive ? "0 0 14px rgba(212, 175, 55, 0.25)" : "none",
              }}
            >
              <Icon style={{
                width: isMobile ? 12 : 14,
                height: isMobile ? 12 : 14,
                color: isActive ? "var(--gold-primary)" : "var(--text-muted)",
              }} />
              <span>{lang === "tr" ? tab.labelTr : tab.labelEn}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
