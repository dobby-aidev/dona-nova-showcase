"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Bot, Send, X, ShieldCheck, HelpCircle
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

const SAMPLE_PROMPTS = [
  "Akkuyu NGS inşaat durumunu ve kapasitesini özetle",
  "Ortadoğu ve Türkiye güneş enerjisi yatırımlarını analiz et",
  "Yapay zeka veri merkezlerinin elektrik tüketim tahmini nedir?",
  "Atatürk Barajı ve Fırat havzası hidroelektrik verilerini göster",
];

export function AIAgentDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Merhaba! Ben DONA CODEX AI Ajanıyım. Türkiye ve dünya genelindeki 94,000+ enerji, su, fiber ve ulaşım tesisi hakkında analiz isteyebilirsiniz.",
      timestamp: "Şimdi",
    },
  ]);
  const [isThinking, setIsThinking] = useState(false);

  const handleSend = (textToSend?: string) => {
    const promptText = textToSend || query;
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setQuery("");
    setIsThinking(true);

    // AI Intelligence logic
    setTimeout(() => {
      let aiText = "Veritabanımız ve Knowledge Graph üzerinde sorgulama yapılıyor...";
      if (promptText.toLowerCase().includes("akkuyu") || promptText.toLowerCase().includes("nükleer")) {
        aiText = "Akkuyu Nükleer Güç Santralı (4,800 MW): 4 adet VVER-1200 reaktöründen oluşmaktadır. 1. Ünitenin 2025 yılında devreye girmesi hedeflenmektedir. Türkiye elektrik ihtiyacının yaklaşık %10'unu tek başına karşılayacaktır.";
      } else if (promptText.toLowerCase().includes("atatürk") || promptText.toLowerCase().includes("baraj")) {
        aiText = "Atatürk Barajı ve HES (2,400 MW): GAP projesinin amiral gemisidir. Yılda yaklaşık 8.9 milyar kWh elektrik üretir. Fırat Nehri üzerinde konumlanmıştır.";
      } else if (promptText.toLowerCase().includes("güneş") || promptText.toLowerCase().includes("solar")) {
        aiText = "Ortadoğu bölgesinde aktif 14,200 MW güneş enerjisi kapasitesi bulunmaktadır. Noor Abu Dhabi (1,177 MW) lider durumdadır. Yıllık büyüme oranı %12.8 seviyesindedir.";
      } else if (promptText.toLowerCase().includes("veri merkezi") || promptText.toLowerCase().includes("ai")) {
        aiText = "Küresel yapay zeka veri merkezlerinin toplam elektrik talebinin 2028 yılına kadar 120 GW seviyesine ulaşması beklenmektedir. Huai'an (600 MW) ve Singapur kümeleri başı çekmektedir.";
      } else {
        aiText = `"${promptText}" ile ilgili altyapı düğümleri incelendi. DONA CODEX Knowledge Graph veritabanında 42 ilişkili nokta ve 3 bölgesel şebeke bağlantısı tespit edildi.`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 1100);
  };

  return (
    <>
      {/* Floating DONA CODEX AI Button */}
      {!isOpen && (
        <motion.button
          id="dona-codex-ai-trigger"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-xl border border-blue-400/30"
          style={{
            background: "linear-gradient(135deg, #1e40af, #6d28d9)",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.35)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-pulse" />
          <span>DONA CODEX AI</span>
        </motion.button>
      )}

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex h-full w-full max-w-[480px] flex-col border-l border-slate-800 bg-slate-950 text-slate-100 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 p-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-100">DONA CODEX AI Assistant</h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      Küresel Altyapı Akıllı Ajanı
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="mt-1 block text-[9px] opacity-60 text-right">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-3 text-xs text-blue-400 flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 animate-spin" />
                      DONA CODEX AI altyapı veritabanını analiz ediyor...
                    </div>
                  </div>
                )}
              </div>

              {/* Sample Prompts */}
              <div className="border-t border-slate-800/60 p-3 bg-slate-950/80">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                  <HelpCircle className="h-3 w-3" /> Hızlı Analiz Soruları
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SAMPLE_PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p)}
                      className="rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1.5 text-[11px] text-slate-300 hover:border-blue-500/50 hover:bg-blue-950/30 transition-all text-left"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-800 p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="DONA CODEX AI'a tesis veya altyapı sor..."
                    className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
