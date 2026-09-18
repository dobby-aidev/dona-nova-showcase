"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

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
      style={{
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
      <div style={{ gridColumn: 1, justifySelf: "start" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "transparent",
            border: "none",
            color: "var(--gold-bright)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textDecoration: "none",
            transition: "all 0.2s ease",
            textShadow: "0 0 10px rgba(212,175,55,0.4)",
          }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} />
          <span>{activeLang === "tr" ? "3D RADARA DÖN" : "BACK TO RADAR"}</span>
        </Link>
      </div>

      {/* CENTER: Exact Same Nova Logo + DONA NOVA Title as AppHeader */}
      <div style={{ gridColumn: 2, justifySelf: "center" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
            cursor: "pointer",
          }}
          title="DONA NOVA"
        >
          {/* Custom Dona Nova Supernova Crest */}
          <div style={{ width: 30, height: 30, flexShrink: 0 }}>
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
              fontSize: "1.22rem",
              fontWeight: 900,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.4))",
            }}
          >
            DONA NOVA
          </span>
        </Link>
      </div>

      {/* RIGHT: Star on GitHub + Minimal Borderless Language Switcher */}
      <div style={{ gridColumn: 3, justifySelf: "end" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {/* Aesthetic Star on GitHub Pill */}
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
            <span className="desktop-only">{activeLang === "tr" ? "Yıldız Ver" : "Star on GitHub"}</span>
          </a>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.2rem 0.4rem",
              background: "transparent",
              border: "none",
            }}
          >
          <button
            id="pub-lang-btn-tr"
            onClick={() => handleToggle("tr")}
            aria-label="Türkçe"
            style={{
              background: "transparent",
              border: "none",
              padding: "0.2rem 0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: activeLang === "tr" ? "var(--gold-primary)" : "rgba(210,205,195,0.45)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textShadow: activeLang === "tr" ? "0 0 10px rgba(212,175,55,0.7)" : "none",
            }}
          >
            TR
          </button>
          <span style={{ color: "rgba(212,175,55,0.25)", fontFamily: "var(--font-mono)", fontSize: "0.6rem" }}>/</span>
          <button
            id="pub-lang-btn-en"
            onClick={() => handleToggle("en")}
            aria-label="English"
            style={{
              background: "transparent",
              border: "none",
              padding: "0.2rem 0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: activeLang === "en" ? "var(--gold-primary)" : "rgba(210,205,195,0.45)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textShadow: activeLang === "en" ? "0 0 10px rgba(212,175,55,0.7)" : "none",
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
