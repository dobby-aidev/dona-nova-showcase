"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Zap, Truck, Server,
  Settings, ChevronLeft, ChevronRight,
  LayoutDashboard, Droplets, Search, Database,
  FileText, Shield, Terminal, ArrowUpRight
} from "lucide-react";
import { DonaLogo } from "@/components/ui/DonaLogo";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SettingsModal } from "@/components/ui/SettingsModal";
import Link from "next/link";
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

interface NavItem {
  id: string;
  labelTr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge?: string;
  badgeType?: "gold" | "emerald" | "cyan";
  group: "main" | "modules" | "legal";
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "explore",      labelTr: "NASA 3D Küre",        labelEn: "NASA 3D Globe",      icon: Globe,           group: "main", badge: "3.1K", badgeType: "gold" },
  { id: "dashboard",    labelTr: "Telemetri Paneli",    labelEn: "Telemetry Deck",     icon: LayoutDashboard, group: "main" },
  { id: "energy",       labelTr: "Elektrik Şebekesi",   labelEn: "Power Grid",         icon: Zap,             group: "modules", badge: "Canlı", badgeType: "emerald" },
  { id: "water",        labelTr: "Su & Baraj Ağları",   labelEn: "Water & Reservoirs", icon: Droplets,        group: "modules" },
  { id: "transport",    labelTr: "Ulaşım & Lojistik",   labelEn: "Transportation",     icon: Truck,           group: "modules" },
  { id: "datacenters",  labelTr: "AI Veri Merkezleri",  labelEn: "AI Data Centers",    icon: Server,          group: "modules", badge: "AI", badgeType: "cyan" },
  { id: "data-sources", labelTr: "Açık Veri Kaynakları",labelEn: "Data Sources",      icon: Database,        group: "legal", href: "/data-sources" },
  { id: "pricing",      labelTr: "Açık Kaynak Lisansı", labelEn: "Open Source MIT",    icon: Terminal,        group: "legal", href: "/pricing" },
  { id: "terms",        labelTr: "Kullanım Koşulları",  labelEn: "Terms of Service",   icon: FileText,        group: "legal", href: "/terms" },
  { id: "privacy",      labelTr: "Gizlilik Politikası", labelEn: "Privacy Policy",     icon: Shield,          group: "legal", href: "/privacy" },
];

const GROUPS = [
  { key: "main",    labelTr: "Keşif & Radar",          labelEn: "Exploration" },
  { key: "modules", labelTr: "Altyapı Katmanları",     labelEn: "Infrastructure" },
  { key: "legal",   labelTr: "Kurumsal & Şeffaflık",   labelEn: "Institutional" },
];

interface AppSidebarProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  lang: "tr" | "en";
}

export function AppSidebar({ activeNav, setActiveNav, lang }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  const triggerSearch = () => {
    const btn = document.getElementById("command-palette-trigger");
    if (btn) btn.click();
  };

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 76 : 268 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="relative flex h-full flex-col shrink-0 overflow-hidden z-30 select-none bg-[hsl(var(--dn-bg-base))] border-r border-[hsl(var(--dn-border-subtle))]"
      >
        {/* Brand Area */}
        <div className="flex items-center h-[68px] shrink-0 px-4 overflow-hidden border-b border-[hsl(var(--dn-border-subtle))] bg-[hsl(var(--dn-bg-surface))]">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="mx-auto cursor-pointer hover:scale-105 transition-transform p-1 rounded-xl hover:bg-slate-100"
              aria-label="Expand sidebar"
            >
              <DonaLogo size="sm" showText={false} />
            </button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <DonaLogo size="md" showText={true} />
              </Link>
              <div className="flex items-center gap-1.5">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 text-[8.5px] font-mono font-black text-slate-600 tracking-wider">
                  v1.0 PROD
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto py-3.5 space-y-4 px-3 scrollbar-thin">
          {/* Quick Search Button */}
          <button
            onClick={triggerSearch}
            className="flex w-full items-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-3 py-2 text-[12px] font-semibold text-slate-700 transition-all shadow-sm group"
            style={{
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 10,
            }}
            title={collapsed ? "Tesis Ara (⌘K)" : undefined}
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 group-hover:scale-105 group-hover:text-slate-700 transition-all">
              <Search className="h-3.5 w-3.5" />
            </div>
            {!collapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="truncate font-sans transition-colors">
                  {lang === "tr" ? "Hızlı Tesis Ara..." : "Quick Search..."}
                </span>
                <span className="rounded-md border border-slate-200 bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-500 shrink-0 ml-1">
                  ⌘K
                </span>
              </div>
            )}
          </button>

          {/* Hidden CommandPalette trigger */}
          <div className="hidden">
            <CommandPalette />
          </div>

          {/* Navigation Groups */}
          {GROUPS.map(({ key, labelTr, labelEn }) => {
            const items = NAV_ITEMS.filter(i => i.group === key);
            return (
              <div key={key} className="space-y-1.5">
                {!collapsed && (
                  <div className="flex items-center justify-between px-2.5 pb-1">
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                      {lang === "tr" ? labelTr : labelEn}
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isHref = Boolean(item.href);
                    const isPageActive = isHref && pathname === item.href;
                    const isActive = !isHref ? activeNav === item.id : isPageActive;

                    const content = (
                      <>
                        {/* Active Indicator Line */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-[hsl(var(--dn-brand-secondary))]" />
                        )}

                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-all ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "bg-transparent text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-800"
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>

                        {!collapsed && (
                          <span className={`truncate min-w-0 flex-1 text-left font-sans transition-all ${
                            isActive
                              ? "text-slate-900 font-semibold"
                              : "text-slate-600 group-hover:text-slate-900"
                          }`}>
                            {lang === "tr" ? item.labelTr : item.labelEn}
                          </span>
                        )}

                        {item.badge && !collapsed && (
                          <span className={`ml-auto shrink-0 rounded-md px-1.5 py-0.5 text-[8.5px] font-mono font-bold uppercase tracking-wider ${
                            item.badgeType === "emerald"
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                              : item.badgeType === "cyan"
                              ? "bg-cyan-50 text-cyan-600 border border-cyan-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    );

                    const baseClasses = `relative flex w-full items-center rounded-xl px-2.5 py-2 text-[13px] transition-all duration-200 group ${
                      isActive
                        ? "bg-white shadow-sm border border-slate-200"
                        : "border border-transparent hover:bg-slate-50 text-slate-600"
                    }`;

                    if (item.href) {
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={baseClasses}
                          style={{
                            justifyContent: collapsed ? "center" : "flex-start",
                            gap: collapsed ? 0 : 10,
                          }}
                          title={collapsed ? (lang === "tr" ? item.labelTr : item.labelEn) : undefined}
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        className={baseClasses}
                        style={{
                          justifyContent: collapsed ? "center" : "flex-start",
                          gap: collapsed ? 0 : 10,
                        }}
                        title={collapsed ? (lang === "tr" ? item.labelTr : item.labelEn) : undefined}
                      >
                        {content}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Footer: Executive Dona Codex & Dobby Ecosystem Hub */}
        <div className="shrink-0 p-3 border-t border-slate-200 bg-white space-y-2">
          {!collapsed ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] space-y-2.5 shadow-sm">
              {/* Creator Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-800 text-white font-black text-[9px] shadow-sm">
                    DC
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-[11.5px] leading-tight font-sans tracking-wide">DONA CODEX</h4>
                    <p className="text-[8.5px] text-slate-500 uppercase tracking-wider">Official Ecosystem</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8.5px] font-mono text-emerald-600 font-bold">ONLINE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-200">
                <a
                  href="https://donacodex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 py-1.5 px-2 text-[10px] font-bold text-slate-600 hover:text-slate-900 transition-all text-center group"
                >
                  <span>Dona Codex</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </a>

                <a
                  href="https://dobby.donacodex.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 py-1.5 px-2 text-[10px] font-bold text-slate-600 hover:text-slate-900 transition-all text-center group"
                >
                  <span>dobby</span>
                  <ArrowUpRight className="h-3 w-3 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </a>
              </div>

              {/* GitHub Star Card */}
              <a
                href="https://github.com/dobby-aidev/dona-nova-showcase"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 hover:border-slate-300 transition-all text-[10.5px] font-semibold text-slate-600 hover:text-slate-900 group shadow-sm"
              >
                <div className="flex items-center gap-1.5">
                  <GithubIcon className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-700" />
                  <span className="font-mono">GitHub Repo</span>
                </div>
                <span className="text-[9px] font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                  ★ Star
                </span>
              </a>
            </div>
          ) : null}

          {/* Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            style={{ justifyContent: collapsed ? "center" : "flex-start", gap: collapsed ? 0 : 10 }}
            title={collapsed ? "Radar Tercihleri" : undefined}
          >
            <Settings className="h-4 w-4 shrink-0 text-slate-500" />
            {!collapsed && <span className="truncate min-w-0">{lang === "tr" ? "Radar Tercihleri" : "Preferences"}</span>}
          </button>
        </div>

        {/* Collapse Trigger Pill */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3 top-[76px] z-30 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md hover:text-slate-900 hover:border-slate-300 transition-all hover:scale-110"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </motion.aside>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
      />
    </>
  );
}
