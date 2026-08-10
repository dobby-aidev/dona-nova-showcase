"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Zap, Truck, Server, BarChart2,
  Settings, ChevronLeft, ChevronRight,
  LayoutDashboard, Bot, Droplets, LogOut, Search
} from "lucide-react";
import { DonaLogo } from "@/components/ui/DonaLogo";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SettingsModal } from "@/components/ui/SettingsModal";
import { ProfileModal } from "@/components/ui/ProfileModal";
import { AuthModal } from "@/components/ui/AuthModal";
import Link from "next/link";
import { Shield, FileText, Database, CreditCard } from "lucide-react";

interface NavItem {
  id: string;
  labelTr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge?: string;
  group: string;
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "explore",      labelTr: "Küresel Keşif",     labelEn: "Global Explore",    icon: Globe,           group: "main" },
  { id: "dashboard",    labelTr: "Gösterge Paneli",   labelEn: "Dashboard",         icon: LayoutDashboard, group: "main" },
  { id: "energy",       labelTr: "Enerji Santralleri",labelEn: "Power Plants",      icon: Zap,             group: "modules", badge: "Canlı" },
  { id: "water",        labelTr: "Su & Çevre",        labelEn: "Water & Hydrio",    icon: Droplets,        group: "modules" },
  { id: "transport",    labelTr: "Ulaşım & Lojistik", labelEn: "Transportation",    icon: Truck,           group: "modules" },
  { id: "datacenters",  labelTr: "Veri Merkezleri",   labelEn: "Data Centers",      icon: Server,          group: "modules" },
  { id: "ai-agent",     labelTr: "DONA CODEX AI",     labelEn: "DONA CODEX AI",     icon: Bot,             group: "ai", badge: "AI" },
  { id: "analytics",    labelTr: "İstatistikler",     labelEn: "Analytics",         icon: BarChart2,       group: "ai" },
  { id: "data-sources", labelTr: "Veri Kaynakları",   labelEn: "Data Sources",      icon: Database,        group: "legal", href: "/data-sources" },
  { id: "pricing",      labelTr: "Fiyatlandırma",     labelEn: "Pricing",           icon: CreditCard,      group: "legal", href: "/pricing" },
  { id: "terms",        labelTr: "Kullanım Koşulları",labelEn: "Terms of Service",  icon: FileText,        group: "legal", href: "/terms" },
  { id: "privacy",      labelTr: "Gizlilik Politikası",labelEn: "Privacy Policy",   icon: Shield,          group: "legal", href: "/privacy" },
];

const GROUPS = [
  { key: "main",    labelTr: "Ana Ekranlar", labelEn: "Main Views" },
  { key: "modules", labelTr: "Altyapı Ağları", labelEn: "Infrastructure Networks" },
  { key: "ai",      labelTr: "Akıllı Analiz", labelEn: "AI Analytics" },
  { key: "legal",   labelTr: "Hukuk & Kurumsal", labelEn: "Legal & Public" },
];

interface AppSidebarProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  lang: "tr" | "en";
}

export function AppSidebar({ activeNav, setActiveNav, lang }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const triggerSearch = () => {
    const btn = document.getElementById("command-palette-trigger");
    if (btn) btn.click();
  };

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative flex h-full flex-col shrink-0 overflow-hidden z-30 select-none"
        style={{
          background: "hsl(222 24% 4.5%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.07)",
        }}
      >
        {/* Brand Header */}
        <div className="flex items-center h-[64px] shrink-0 px-4 overflow-hidden border-b border-white/[0.06]">
          {collapsed ? (
            <div className="mx-auto cursor-pointer" onClick={() => setCollapsed(false)}>
              <DonaLogo size="sm" showText={false} />
            </div>
          ) : (
            <DonaLogo size="md" showText={true} />
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-4 px-3 scrollbar-none">
          {/* Quick Search Button in Sidebar */}
          <button
            onClick={triggerSearch}
            className="flex w-full items-center rounded-xl border border-blue-500/30 bg-blue-600/10 px-3 py-2.5 text-[13px] font-bold text-blue-300 hover:bg-blue-600/20 hover:border-blue-400/50 transition-all shadow-md"
            style={{
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 10,
            }}
            title={collapsed ? (lang === "tr" ? "Arama Yap (⌘K)" : "Search (⌘K)") : undefined}
          >
            <Search className="h-4 w-4 shrink-0 text-blue-400" />
            {!collapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="truncate">{lang === "tr" ? "Arama Yap" : "Search"}</span>
                <span className="rounded border border-blue-400/30 px-1 py-0.2 font-mono text-[9px] text-blue-300 shrink-0 ml-1">⌘K</span>
              </div>
            )}
          </button>

          {/* Hidden CommandPalette trigger container */}
          <div className="hidden">
            <CommandPalette />
          </div>

          {GROUPS.map(({ key, labelTr, labelEn }) => {
            const items = NAV_ITEMS.filter(i => i.group === key);
            return (
              <div key={key}>
                {!collapsed && (
                  <p className="px-2.5 pb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                    {lang === "tr" ? labelTr : labelEn}
                  </p>
                )}
                <div className="space-y-1">
                  {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeNav === item.id;
                    
                    if (item.href) {
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="relative flex w-full items-center rounded-xl px-3 py-2 text-[12px] font-medium text-slate-400 hover:bg-white/[0.04] hover:text-slate-100 transition-all duration-200"
                          style={{
                            justifyContent: collapsed ? "center" : "flex-start",
                            gap: collapsed ? 0 : 10,
                          }}
                          title={collapsed ? (lang === "tr" ? item.labelTr : item.labelEn) : undefined}
                        >
                          <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                          {!collapsed && <span className="truncate min-w-0 flex-1 text-left">{lang === "tr" ? item.labelTr : item.labelEn}</span>}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNav(item.id)}
                        className={`relative flex w-full items-center rounded-xl px-3 py-2.5 text-[12.5px] font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-blue-600/25 to-purple-600/15 text-white font-semibold border border-blue-500/40 shadow-lg shadow-blue-500/15"
                            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
                        }`}
                        style={{
                          justifyContent: collapsed ? "center" : "flex-start",
                          gap: collapsed ? 0 : 10,
                        }}
                        title={collapsed ? (lang === "tr" ? item.labelTr : item.labelEn) : undefined}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 transition-colors ${isActive ? "text-blue-400" : "text-slate-400"}`} />
                        
                        {!collapsed && <span className="truncate min-w-0 flex-1 text-left">{lang === "tr" ? item.labelTr : item.labelEn}</span>}
                        
                        {item.badge && !collapsed && (
                          <span
                            className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                              item.badge === "Canlı"
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Account & Settings Footer */}
        <div className="shrink-0 p-3 border-t border-white/[0.08] space-y-2">
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="flex w-full items-center rounded-xl px-3 py-2 text-[12px] font-semibold text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors"
            style={{ justifyContent: collapsed ? "center" : "flex-start", gap: collapsed ? 0 : 10 }}
            title={collapsed ? (lang === "tr" ? "Sistem Ayarları" : "Settings") : undefined}
          >
            <Settings className="h-4 w-4 shrink-0 text-blue-400" />
            {!collapsed && <span className="truncate min-w-0">{lang === "tr" ? "Sistem Ayarları" : "System Settings"}</span>}
          </button>

          <div
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center rounded-2xl bg-slate-900/90 p-2 border border-white/[0.08] backdrop-blur-xl cursor-pointer hover:border-blue-500/50 hover:bg-slate-900 transition-all shadow-md"
            style={{ justifyContent: collapsed ? "center" : "flex-start", gap: collapsed ? 0 : 10 }}
            title={collapsed ? "DONA CODEX Enterprise Account" : undefined}
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-[11px] shadow-md">
              DC
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11.5px] font-extrabold text-slate-100">
                  {isLoggedIn ? "DONA CODEX" : (lang === "tr" ? "Ziyaretçi Modu" : "Guest Mode")}
                </p>
                <p className="truncate text-[8.5px] text-slate-400 font-medium uppercase tracking-wider">
                  {isLoggedIn ? (lang === "tr" ? "Kurumsal Hesabı" : "Enterprise Account") : (lang === "tr" ? "Giriş Yapılmadı" : "Not Logged In")}
                </p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAuthOpen(true);
                }}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-white/10 shrink-0"
                title={isLoggedIn ? (lang === "tr" ? "Çıkış Yap" : "Log Out") : (lang === "tr" ? "Giriş Yap" : "Log In")}
              >
                {isLoggedIn ? <LogOut className="h-3.5 w-3.5 text-red-400" /> : <LogOut className="h-3.5 w-3.5 text-emerald-400" />}
              </button>
            )}
          </div>
        </div>

        {/* Collapse Trigger */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="absolute -right-3 top-[76px] z-30 flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 shadow-xl hover:text-white hover:border-blue-500/50 transition-all hover:scale-110"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </motion.aside>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        lang={lang}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        isLoggedIn={isLoggedIn}
        onToggleLogin={() => setIsLoggedIn(prev => !prev)}
        lang={lang}
      />
    </>
  );
}
