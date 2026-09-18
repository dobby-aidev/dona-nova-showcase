"use client";

import React from "react";

interface AppHeaderProps {
  lang: "tr" | "en";
  setLang: (lang: "tr" | "en") => void;
}

export function AppHeader({ lang, setLang }: AppHeaderProps) {
  return (
    <header
      id="app-header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        padding: "0.8rem 2rem",
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        background: "transparent",
        border: "none",
        borderBottom: "none",
        boxShadow: "none",
        pointerEvents: "none",
        zIndex: 40,
        boxSizing: "border-box",
      }}
    >
      {/* LEFT: Completely Empty (per user request: "sol üst menidek sistem çevrim içi butonu mtnein tammen kaldıra") */}
      <div style={{ gridColumn: 1 }} />

      {/* CENTER: Just Logo + DONA NOVA Name (No frames, exactly like the skill) */}
      <div style={{ gridColumn: 2, justifySelf: "center", pointerEvents: "auto" }}>
        <div
          className="brand-group"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          title="DONA NOVA"
        >
          {/* Custom Dona Nova Supernova Crest */}
          <div style={{ width: 30, height: 30, flexShrink: 0 }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
              <defs>
                <linearGradient id="hdrStarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFE082" />
                  <stop offset="60%" stopColor="#F5D77F" />
                  <stop offset="85%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8C6D23" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="11" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.55" />
              <path d="M16 7.5 L17.8 14.2 L24.5 16 L17.8 17.8 L16 24.5 L14.2 17.8 L7.5 16 L14.2 14.2 Z" fill="#D4AF37" opacity="0.85" />
              <path d="M16 2.5 Q16 16 29.5 16 Q16 16 16 29.5 Q16 16 2.5 16 Q16 16 16 2.5 Z" fill="url(#hdrStarGold)" />
              <circle cx="16" cy="16" r="3.2" fill="#07080e" stroke="#FFF" strokeWidth="0.8" />
              <circle cx="16" cy="16" r="1.8" fill="#FFFFFF" />
            </svg>
          </div>

          {/* Clean "DONA NOVA" Text */}
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
        </div>
      </div>

      {/* RIGHT: Star on GitHub + Language Selector */}
      <div style={{ gridColumn: 3, justifySelf: "end", pointerEvents: "auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          {/* Aesthetic Star on GitHub Pill */}
          <a
            id="star-github-btn"
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
            <span className="desktop-only">{lang === "tr" ? "Yıldız Ver" : "Star on GitHub"}</span>
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
            id="lang-btn-tr"
            onClick={() => {
              setLang("tr");
              try { localStorage.setItem("dona_lang", "tr"); } catch {}
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("dona:lang-change", { detail: "tr" }));
              }
            }}
            aria-label="Türkçe"
            style={{
              background: "transparent",
              border: "none",
              padding: "0.2rem 0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: lang === "tr" ? "var(--gold-primary)" : "rgba(210,205,195,0.45)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textShadow: lang === "tr" ? "0 0 10px rgba(212,175,55,0.7)" : "none",
            }}
          >
            TR
          </button>
          <span style={{ color: "rgba(212,175,55,0.25)", fontFamily: "var(--font-mono)", fontSize: "0.6rem" }}>/</span>
          <button
            id="lang-btn-en"
            onClick={() => {
              setLang("en");
              try { localStorage.setItem("dona_lang", "en"); } catch {}
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("dona:lang-change", { detail: "en" }));
              }
            }}
            aria-label="English"
            style={{
              background: "transparent",
              border: "none",
              padding: "0.2rem 0.4rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: lang === "en" ? "var(--gold-primary)" : "rgba(210,205,195,0.45)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              textShadow: lang === "en" ? "0 0 10px rgba(212,175,55,0.7)" : "none",
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
