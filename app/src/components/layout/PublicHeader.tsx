"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="14"
      height="14"
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

interface PublicHeaderProps {
  lang?: "tr" | "en";
  setLang?: (lang: "tr" | "en") => void;
}

export function PublicHeader({ lang = "tr", setLang }: PublicHeaderProps) {
  const [currentLang, setCurrentLang] = useState<"tr" | "en">(lang);
  const isMobile = useIsMobile();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("dona_lang");
      if (stored === "tr" || stored === "en") {
        setCurrentLang(stored);
        if (setLang) setLang(stored);
      }
    } catch {}
  }, [setLang]);

  const handleToggle = (l: "tr" | "en") => {
    setCurrentLang(l);
    try {
      localStorage.setItem("dona_lang", l);
    } catch {}
    if (setLang) setLang(l);
    // Dispatch custom event so pages can listen if needed
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dona:lang-change", { detail: l }));
    }
  };

  const activeLang = lang ?? currentLang;

  return (
    <header
      id="public-header"
      style={isMobile ? {
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        padding: "0.55rem 0.85rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(6, 7, 12, 0.45)",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        borderBottom: "1px solid rgba(212, 175, 55, 0.18)",
        userSelect: "none",
        boxSizing: "border-box",
      } : {
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        padding: "0.8rem 2rem",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        background: "transparent",
        border: "none",
        borderBottom: "none",
        boxShadow: "none",
        userSelect: "none",
        boxSizing: "border-box",
      }}
    >
      {/* LEFT: Clean Minimalist Back to 3D Radar Link */}
      <div style={{ flex: isMobile ? "0 0 auto" : "initial", gridColumn: isMobile ? undefined : 1, justifySelf: "start" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            background: isMobile ? "rgba(212,175,55,0.08)" : "transparent",
            border: isMobile ? "1px solid rgba(212,175,55,0.25)" : "none",
            borderRadius: isMobile ? 8 : 0,
            color: "var(--gold-bright)",
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? "0.65rem" : "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textDecoration: "none",
            transition: "all 0.2s ease",
            textShadow: "0 0 10px rgba(212,175,55,0.4)",
            padding: isMobile ? "4px 8px" : "0",
          }}
        >
          <ArrowLeft style={{ width: 13, height: 13, color: "var(--gold-primary)" }} />
          <span>{activeLang === "tr" ? (isMobile ? "RADAR" : "3D RADARA DÖN") : (isMobile ? "RADAR" : "BACK TO RADAR")}</span>
        </Link>
      </div>

      {/* CENTER: Exact Same Nova Logo + DONA NOVA Title as AppHeader */}
      <div style={{ flex: isMobile ? "0 0 auto" : "initial", gridColumn: isMobile ? undefined : 2, justifySelf: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: isMobile ? "0.4rem" : "0.75rem",
            textDecoration: "none",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          title="DONA NOVA"
        >
          {/* Custom Dona Nova Supernova Crest */}
          <div style={{ width: isMobile ? 22 : 30, height: isMobile ? 22 : 30, flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
              <defs>
                <linearGradient id="pubStarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFE082" />
                  <stop offset="60%" stopColor="#F5D77F" />
                  <stop offset="85%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8C6D23" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="11" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.55" />
              <path d="M16 7.5 L17.8 14.2 L24.5 16 L17.8 17.8 L16 24.5 L14.2 17.8 L7.5 16 L14.2 14.2 Z" fill="#D4AF37" opacity="0.85" />
              <path d="M16 2.5 Q16 16 29.5 16 Q16 16 16 29.5 Q16 16 2.5 16 Q16 16 16 2.5 Z" fill="url(#pubStarGold)" />
              <circle cx="16" cy="16" r="3.2" fill="#07080e" stroke="#FFF" strokeWidth="0.8" />
              <circle cx="16" cy="16" r="1.8" fill="#FFFFFF" />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "0.88rem" : "1.22rem",
              fontWeight: 900,
              letterSpacing: isMobile ? "0.14em" : "0.22em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.4))",
              whiteSpace: "nowrap",
            }}
          >
            DONA NOVA
          </span>
        </Link>
      </div>

      {/* RIGHT: Star on GitHub (desktop only) + Sleek Language Pill */}
      <div style={{ flex: isMobile ? "0 0 auto" : "initial", gridColumn: isMobile ? undefined : 3, justifySelf: "end" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {/* Aesthetic Star on GitHub Pill — desktop only */}
          {!isMobile && (
            <a
              id="pub-star-github-btn"
              href="https://github.com/dobby-aidev/dona-nova-showcase"
              target="_blank"
              rel="noopener noreferrer"
              title="Star Dona Nova on GitHub ⭐"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.22rem 0.65rem",
                borderRadius: "9999px",
                border: "1px solid rgba(212, 175, 55, 0.4)",
                background: "rgba(6, 7, 12, 0.45)",
                backdropFilter: "blur(10px)",
                color: "var(--gold-bright)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 0 12px rgba(212,175,55,0.15)",
              }}
            >
              <span style={{ fontSize: "0.72rem", color: "#FFE082" }}>⭐</span>
              <span>{activeLang === "tr" ? "Yıldız Ver" : "Star on GitHub"}</span>
            </a>
          )}

          {/* Unified Sleek Language Pill matching AppHeader */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "9999px",
              border: "1px solid rgba(212,175,55,0.28)",
              background: "rgba(7,8,14,0.72)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              overflow: "hidden",
            }}
          >
            <button
              id="pub-lang-btn-tr"
              onClick={() => handleToggle("tr")}
              aria-label="Türkçe"
              style={{
                background: activeLang === "tr" ? "var(--gold-primary)" : "transparent",
                border: "none",
                padding: isMobile ? "0.32rem 0.65rem" : "0.22rem 0.6rem",
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? "0.68rem" : "0.62rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: activeLang === "tr" ? "#07080e" : "rgba(212,175,55,0.7)",
                cursor: "pointer",
                transition: "all 0.18s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              TR
            </button>
            <div style={{ width: 1, height: isMobile ? 14 : 14, background: "rgba(212,175,55,0.2)", flexShrink: 0 }} />
            <button
              id="pub-lang-btn-en"
              onClick={() => handleToggle("en")}
              aria-label="English"
              style={{
                background: activeLang === "en" ? "var(--gold-primary)" : "transparent",
                border: "none",
                padding: isMobile ? "0.32rem 0.65rem" : "0.22rem 0.6rem",
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? "0.68rem" : "0.62rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                color: activeLang === "en" ? "#07080e" : "rgba(212,175,55,0.7)",
                cursor: "pointer",
                transition: "all 0.18s ease",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
