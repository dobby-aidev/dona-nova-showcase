"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Globe, Activity, Zap, Droplets, Truck, Server } from "lucide-react";

interface NavItem {
  id: string;
  labelTr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "explore",     labelTr: "Radar",      labelEn: "Radar",      icon: Globe },
  { id: "telemetry",   labelTr: "Telemetri",  labelEn: "Telemetry",  icon: Activity },
  { id: "energy",      labelTr: "Enerji",     labelEn: "Energy",     icon: Zap },
  { id: "water",       labelTr: "Su",         labelEn: "Water",      icon: Droplets },
  { id: "transport",   labelTr: "Ulaşım",     labelEn: "Transit",    icon: Truck },
  { id: "datacenters", labelTr: "AI DC",      labelEn: "AI DC",      icon: Server },
];

interface MobileBottomNavProps {
  activeNav?: string;
  setActiveNav?: (id: string) => void;
  lang: "tr" | "en";
}

export function MobileBottomNav({ activeNav = "", setActiveNav, lang }: MobileBottomNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (id: string) => {
    if (setActiveNav) setActiveNav(id);
    if (pathname && pathname !== "/") {
      router.push(`/?nav=${id}`);
    }
  };

  return (
    <nav className="mobile-bottom-nav" aria-label={lang === "tr" ? "Mobil Navigasyon" : "Mobile Navigation"}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeNav === item.id;

        return (
          <motion.button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            className={`mobile-bottom-nav-item${isActive ? " active" : ""}`}
            onClick={() => handleNavClick(item.id)}
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            aria-label={lang === "tr" ? item.labelTr : item.labelEn}
            aria-current={isActive ? "page" : undefined}
          >
            {/* Active glow dot above icon */}
            <div className="mobile-bottom-nav-item-dot" aria-hidden="true" />

            {/* Icon */}
            <Icon className="mobile-bottom-nav-item-icon" aria-hidden="true" />

            {/* Label */}
            <span className="mobile-bottom-nav-item-label">
              {lang === "tr" ? item.labelTr : item.labelEn}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
