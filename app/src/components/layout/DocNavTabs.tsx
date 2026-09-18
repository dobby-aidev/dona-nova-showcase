"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Scale, ShieldCheck, Database, Terminal } from "lucide-react";

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
      marginBottom: "2rem",
      userSelect: "none",
    }}>
      {/* Sleek Centered Document Tab Strip */}
      <nav style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "4px",
        borderRadius: 14,
        border: "1px solid var(--gold-border)",
        background: "rgba(6, 7, 12, 0.25)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(212,175,55,0.05)",
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
                gap: 6,
                borderRadius: 10,
                padding: "6px 14px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                fontWeight: isActive ? 800 : 500,
                letterSpacing: "0.06em",
                textDecoration: "none",
                transition: "all 0.18s cubic-bezier(0.16, 1, 0.3, 1)",
                border: isActive ? "1px solid var(--gold-border)" : "1px solid transparent",
                background: isActive ? "rgba(212, 175, 55, 0.14)" : "transparent",
                color: isActive ? "var(--gold-bright)" : "var(--text-muted)",
                boxShadow: isActive ? "0 0 14px rgba(212, 175, 55, 0.25)" : "none",
              }}
            >
              <Icon style={{
                width: 13,
                height: 13,
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
