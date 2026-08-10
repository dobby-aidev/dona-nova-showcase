"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Command, Globe, Zap, BarChart3, Database,
  Settings, User, ArrowRight, X, Layers, Map
} from "lucide-react";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Infrastructure" | "Actions" | "Settings";
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  shortcut?: string;
  onSelect: () => void;
}

const ITEMS: CommandItem[] = [
  { id: "1",  title: "Explore Globe",            subtitle: "3D infrastructure map", category: "Navigation",      icon: Globe,    shortcut: "G",   onSelect: () => {} },
  { id: "2",  title: "Energy Infrastructure",    subtitle: "Power plants & grids",  category: "Infrastructure",  icon: Zap,      shortcut: "E",   onSelect: () => {} },
  { id: "3",  title: "Data Centers",             subtitle: "Compute & fiber",       category: "Infrastructure",  icon: Database,                  onSelect: () => {} },
  { id: "4",  title: "Layer Controls",           subtitle: "Toggle map layers",     category: "Navigation",      icon: Layers,   shortcut: "L",   onSelect: () => {} },
  { id: "5",  title: "Analytics Dashboard",      subtitle: "Infrastructure metrics",category: "Actions",         icon: BarChart3,                 onSelect: () => {} },
  { id: "6",  title: "Region Overview",          subtitle: "Browse by continent",   category: "Navigation",      icon: Map,                       onSelect: () => {} },
  { id: "7",  title: "Account Settings",                                            category: "Settings",        icon: Settings,                  onSelect: () => {} },
  { id: "8",  title: "Profile",                                                     category: "Settings",        icon: User,                      onSelect: () => {} },
];

const CATEGORY_ORDER = ["Navigation", "Infrastructure", "Actions", "Settings"] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? ITEMS.filter(i =>
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
    : ITEMS;

  const grouped = CATEGORY_ORDER.reduce<Record<string, CommandItem[]>>((acc, cat) => {
    const items = filtered.filter(i => i.category === cat);
    if (items.length) acc[cat] = items;
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const handleKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(prev => !prev);
    }
    if (!open) return;
    if (e.key === "Escape") { setOpen(false); setQuery(""); }
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx(i => (i + 1) % flatFiltered.length); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setSelectedIdx(i => (i - 1 + flatFiltered.length) % flatFiltered.length); }
    if (e.key === "Enter" && flatFiltered[selectedIdx]) {
      flatFiltered[selectedIdx].onSelect();
      setOpen(false);
    }
  }, [open, flatFiltered, selectedIdx]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); setSelectedIdx(0); }
  }, [open]);

  let itemCounter = 0;

  return (
    <>
      {/* Trigger button */}
      <button
        id="command-palette-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all duration-150 hover:border-white/20 hover:bg-white/5 active:scale-[0.98]"
        style={{
          background: "hsl(var(--dn-bg-surface) / 0.6)",
          borderColor: "hsl(var(--dn-border-subtle))",
          color: "hsl(var(--dn-text-tertiary))",
        }}
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Search infrastructure...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border px-1 py-0.5 font-mono text-[10px]"
          style={{ borderColor: "hsl(var(--dn-border-default))", color: "hsl(var(--dn-text-disabled))" }}>
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      {/* Palette */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4" role="dialog" aria-modal="true" aria-label="Command palette">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => { setOpen(false); setQuery(""); }}
              className="fixed inset-0"
              style={{ background: "hsl(222 20% 4% / 0.8)", backdropFilter: "blur(8px)" }}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className="relative w-full max-w-[560px] overflow-hidden rounded-2xl shadow-2xl"
              style={{
                background: "hsl(var(--dn-bg-elevated) / 0.95)",
                border: "1px solid hsl(var(--dn-border-default))",
                backdropFilter: "blur(24px)",
              }}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 border-b px-4 py-3.5"
                style={{ borderColor: "hsl(var(--dn-border-subtle))" }}>
                <Search className="h-4 w-4 shrink-0" style={{ color: "hsl(var(--dn-text-tertiary))" }} />
                <input
                  ref={inputRef}
                  id="command-palette-input"
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
                  placeholder="Search infrastructure, countries, companies..."
                  className="flex-1 bg-transparent text-sm focus:outline-none"
                  style={{ color: "hsl(var(--dn-text-primary))" }}
                  aria-label="Search"
                />
                <button onClick={() => { setOpen(false); setQuery(""); }}
                  className="rounded-lg p-1 transition-colors hover:bg-white/5"
                  aria-label="Close">
                  <X className="h-4 w-4" style={{ color: "hsl(var(--dn-text-tertiary))" }} />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-[380px] overflow-y-auto p-2">
                {flatFiltered.length === 0 ? (
                  <div className="py-14 text-center text-sm" style={{ color: "hsl(var(--dn-text-tertiary))" }}>
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, items]) => (
                    <div key={category} className="mb-1">
                      <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: "hsl(var(--dn-text-disabled))" }}>
                        {category}
                      </p>
                      {items.map(item => {
                        const idx = itemCounter++;
                        const isSelected = idx === selectedIdx;
                        const Icon = item.icon;
                        return (
                          <motion.button
                            key={item.id}
                            id={`cmd-item-${item.id}`}
                            whileHover={{ x: 2 }}
                            onClick={() => { item.onSelect(); setOpen(false); setQuery(""); }}
                            onMouseEnter={() => setSelectedIdx(idx)}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-100"
                            style={{
                              background: isSelected ? "hsl(var(--dn-brand-primary) / 0.12)" : "transparent",
                              border: `1px solid ${isSelected ? "hsl(var(--dn-brand-primary) / 0.3)" : "transparent"}`,
                              color: isSelected ? "hsl(var(--dn-text-primary))" : "hsl(var(--dn-text-secondary))",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-7 w-7 items-center justify-center rounded-lg"
                                style={{
                                  background: isSelected ? "hsl(var(--dn-brand-primary) / 0.2)" : "hsl(var(--dn-bg-overlay))",
                                }}>
                                <Icon className="h-3.5 w-3.5"
                                  style={{ color: isSelected ? "hsl(var(--dn-brand-primary))" : "hsl(var(--dn-text-tertiary))" }} />
                              </div>
                              <div>
                                <p className="font-medium leading-none">{item.title}</p>
                                {item.subtitle && (
                                  <p className="mt-0.5 text-xs" style={{ color: "hsl(var(--dn-text-tertiary))" }}>
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {item.shortcut && (
                                <kbd className="rounded-md border px-1.5 py-0.5 font-mono text-[10px]"
                                  style={{ borderColor: "hsl(var(--dn-border-default))", color: "hsl(var(--dn-text-disabled))" }}>
                                  {item.shortcut}
                                </kbd>
                              )}
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity"
                                style={{ opacity: isSelected ? 1 : 0, color: "hsl(var(--dn-brand-primary))" }} />
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t px-4 py-2.5"
                style={{ borderColor: "hsl(var(--dn-border-subtle))", background: "hsl(var(--dn-bg-void) / 0.4)" }}>
                <div className="flex items-center gap-3 text-[11px]" style={{ color: "hsl(var(--dn-text-disabled))" }}>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/5 px-1 py-0.5 font-mono">↑↓</kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/5 px-1 py-0.5 font-mono">↵</kbd> Open
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="rounded bg-white/5 px-1 py-0.5 font-mono">Esc</kbd> Close
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px]" style={{ color: "hsl(var(--dn-text-disabled))" }}>
                  <Command className="h-3 w-3" /> DONA NOVA
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
