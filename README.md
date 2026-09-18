# DONA NOVA 🛰️

**Global Physical Infrastructure & Energy Intelligence Platform — 3D WebGL Engine & MCP Telemetry Server**

[![Live Production](https://img.shields.io/badge/🌐_Live_Radar-nova.donacodex.com-D4AF37?style=for-the-badge&logo=cloudflare)](https://nova.donacodex.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-D4AF37.svg?style=for-the-badge)](LICENSE)
[![Design: Obsidian Gold](https://img.shields.io/badge/Design-Obsidian--Gold_HUD-07080e.svg?style=for-the-badge)](https://nova.donacodex.com)
[![Next.js 16](https://img.shields.io/badge/Framework-Next.js_16_(Turbopack)-000000.svg?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/3D_Engine-Three.js_WebGL-black.svg?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![MCP Ready](https://img.shields.io/badge/MCP-v1.2.0_Model_Context_Protocol-8C6D23.svg?style=for-the-badge)](https://modelcontextprotocol.io)
[![Cloudflare Pages](https://img.shields.io/badge/Edge_Deployment-Cloudflare_Pages-F38020.svg?style=for-the-badge&logo=cloudflare)](https://pages.cloudflare.com)

> 🌐 **Official Live Platform**: [https://nova.donacodex.com](https://nova.donacodex.com)  
> Designed & Built by [dobby](https://dobby.donacodex.com) • Part of the [Dona Codex](https://donacodex.com) Ecosystem  
> **100% Free & Open-Source** • Zero Registration • Real Verified Satellite & Grid Telemetry

---

## ⚡ The Core Thesis: Energy is the True Bottleneck of Frontier AI

Most of the contemporary discourse around Artificial General Intelligence centers on algorithmic tricks, attention mechanisms, and parameter scaling.

Yet every seasoned infrastructure engineer knows the immutable reality: **frontier AI is bound by the laws of physics and power grids.**

```
       [ Frontier AI Cluster: 100,000+ GPUs ]
                         │
        Requires 100MW – 1GW Constant Power
                         │
   ┌─────────────────────┴─────────────────────┐
   ▼                                           ▼
[ Ultra-Reliable Baseload ]            [ Water & Cooling ]
• Nuclear Fission (AP1000, SMRs)       • Closed-Loop Cooling
• Hydroelectric Cascades               • River / Aqueduct Access
• Combined-Cycle Gas (Turbines)        • Desalination Plants
```

If a power authority cannot supply 250 Megawatts of uninterrupted baseload electricity and a municipality cannot allocate millions of gallons of cooling water, your next-generation compute cluster cannot exist.

**DONA NOVA** was created to bridge this divide — mapping, contextualizing, and analyzing Earth's critical physical infrastructure on an interactive 3D digital twin of our planet, while giving autonomous AI agents direct telemetry access through the **Model Context Protocol (MCP)**.

---

## 🌟 Key Capabilities

* 🌍 **Interactive 3D WebGL Digital Twin**: Real-time rotating Earth rendered with Three.js, NASA Blue Marble satellite textures, atmosphere shaders, and 5,000 coordinate-aligned celestial stars.
* 📍 **3,160+ Verified Physical Infrastructure Nodes**: Every asset verified with real coordinates, capacity ratings, fuel/operational types, and regional flags across 12 sectors.
* ⚡ **35,000+ Global Power Plant Registry Access**: Direct indexing of the World Resources Institute (WRI) and Global Energy Monitor (GEM) assets.
* 🤖 **Native Model Context Protocol (MCP v1.2.0)**: AI agents (Claude, Cursor, Windsurf, Gemini) can query power capacity, locate AI data centers, and inspect regional grids via standardized tool calls.
* 🛡️ **Obsidian-Gold HUD Design System**: High-contrast, aerospace-grade visual telemetry built with Cinzel headers, JetBrains Mono data readouts, ultra-clean frosted glass, and zero-distorting clear backdrops.
* 🔒 **Privacy-First & Zero-Knowledge**: No sign-ups, zero trackers, no behavioral cookies, and no paywalls. Completely free and open for research.

---

## 📊 Infrastructure Dataset Breakdown

The platform ships with a verified, structured dataset of **3,160 critical installations** across 12 strategic categories:

| Category | Total Mapped | Key Examples / Highlights |
|:---|:---:|:---|
| ☀️ **Solar Photovoltaic** | **475** | Bhadla Solar Park (2,245 MW), Tengger Desert, Benban Solar Park |
| 💨 **Wind Energy** | **462** | Gansu Wind Farm (20,000 MW), Hornsea Offshore, Markbygden |
| 🔥 **Natural Gas Baseload** | **460** | Surgut-2 Power Station, Futtsu Station, Jebel Ali Power Plant |
| ⚛️ **Nuclear Baseload** | **446** | Kashiwazaki-Kariwa (8,212 MW), Bruce Nuclear, Zaporizhzhia, Barakah |
| 💧 **Hydroelectric Cascades** | **440** | Three Gorges Dam (22,500 MW), Itaipu, Baihetan, Guri Dam |
| 🧠 **AI Hyperscale Data Centers** | **431** | Northern Virginia Data Alley, The Dalles, Dublin Campus, Eemshaven |
| 🚢 **Global Transit & Trade Hubs** | **135** | Port of Shanghai, Singapore Transshipment Hub, Rotterdam Port |
| 🏞️ **Water Aqueducts & Canals** | **70** | California Aqueduct (704 km), South–North Water Transfer, Great Man-Made River |
| 🌊 **Desalination Plants** | **62** | Ras Al-Khair (1,025,000 m³/day), Sorek, Shoaiba Desalination |
| 🧱 **Strategic Water Dams** | **62** | Hoover Dam, Aswan High Dam, Grand Ethiopian Renaissance Dam |
| 🪨 **Critical Aquifers** | **59** | Ogallala Aquifer, Nubian Sandstone Aquifer, Guarani Aquifer |
| 🌊 **Major Water Reservoirs** | **58** | Lake Kariba, Lake Nasser, Lake Mead, Bratsk Reservoir |
| **TOTAL VERIFIED NODES** | **3,160** | **100% Validated Geocoordinates & Capacity Ratings** |

---

## 🤖 Model Context Protocol (MCP v1.2.0) Server

DONA NOVA exposes its infrastructure database to AI agents through MCP.

### Exposed Tools

1. `search_facilities`: Search across 3,160+ facilities by keyword, fuel type, country, or category.
2. `get_facility_by_id`: Retrieve comprehensive telemetry for a specific infrastructure asset.
3. `get_infrastructure_stats`: Returns global totals (Total Power MW, Datacenters count, Water networks, type breakdown).
4. `query_ai_datacenters`: Filter AI clusters by minimum power capacity, cloud operator, and country.
5. `query_water_networks`: Filter aqueducts, desalination plants, reservoirs, dams, and aquifers.

### Agent Configuration (Cursor / Claude Desktop / Windsurf)

Add this to your MCP configuration file (e.g. `claude_desktop_config.json` or Cursor Settings):

```json
{
  "mcpServers": {
    "dona-nova": {
      "command": "node",
      "args": [
        "c:/Users/ferda/Desktop/Dona_Nova/app/node_modules/tsx/dist/cli.mjs",
        "c:/Users/ferda/Desktop/Dona_Nova/app/src/mcp/server.ts"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

Or run standalone:

```bash
cd app
npm run mcp
```

---

## 📡 Live Telemetry Feeds & Data Sources

| Provider / Dataset | Scope | Metric / Frequency | Attribution |
|:---|:---|:---|:---|
| **World Resources Institute (WRI) GPPD** | Global (34,936 Plants) | Power Capacity & Fuel Type | CC-BY 4.0 Open Data |
| **U.S. Energy Information Administration (EIA)** | United States (15 Regional Balancing Authorities) | Hourly Generation, Fuel Mix, Real-time Demand | Public Domain |
| **ENTSO-E Transparency Platform** | Europe (28 Nations) | Hourly Cross-Border Electricity Flows | Open Data License |
| **Electricity Maps Open Engine** | Global (160+ Balancing Zones) | Carbon Intensity & Renewable % | Open Data Tier |
| **NASA Blue Marble & Goddard Flight Center** | Global Satellite Mapping | True-Color 8K Orthorectified Surface Textures | Public Domain |
| **OpenStreetMap & Overpass API** | Global Infrastructure | Water ways, high-voltage transmission lines | ODbL License |

---

## 🏛️ Architecture & Tech Stack

```
   ┌────────────────────────────────────────────────────────┐
   │             Next.js 16 (Turbopack + React 19)          │
   ├────────────────────────────┬───────────────────────────┤
   │      Presentation Layer    │     3D WebGL Engine       │
   │  • Obsidian-Gold HUD       │  • Three.js R3F Shaders   │
   │  • Cinzel & JetBrains Mono │  • NASA Earth Spheres     │
   │  • Lucide Telemetry Icons  │  • 5,000 Cosmic Stars     │
   ├────────────────────────────┴───────────────────────────┤
   │                  Open Telemetry Engine                 │
   │  • /api/eia — Live U.S. Grid Balancing Feeds           │
   │  • /api/electricity-maps — Live Grid Carbon Mix        │
   │  • /data/facilities.json — 3,160 Verified Assets       │
   ├────────────────────────────────────────────────────────┤
   │           Model Context Protocol (MCP v1.2.0)          │
   │  • @modelcontextprotocol/sdk                           │
   │  • 5 Specialized Telemetry Tools                       │
   └────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
* **Node.js**: `>= 20.0.0`
* **npm**: `>= 10.0.0`

### 2. Clone & Install

```bash
# Clone the repository
git clone https://github.com/dobby-aidev/dona-nova-showcase.git
cd dona-nova-showcase/app

# Install dependencies
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env.local
```

*(Optional: Insert your EIA API Key or Electricity Maps Token for live grid feeds. If left blank, the app gracefully falls back to verified baselines.)*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the 3D globe.

### 5. Production Build

```bash
npm run build
```

---

## ☁️ Cloudflare Pages / Workers Deployment

Dona Nova is pre-configured with **OpenNext** (`@opennextjs/cloudflare`) for high-performance Edge execution:

```bash
# Build for Cloudflare OpenNext runtime
npm run cf:build

# Preview locally with Wrangler
npm run cf:preview

# Deploy to Cloudflare Pages
npm run cf:deploy
```

In your Cloudflare Pages Dashboard, configure:
* **Framework Preset**: Next.js (or None / Custom)
* **Build Command**: `npx @opennextjs/cloudflare build`
* **Output Directory**: `.open-next/assets`
* **Environment Variables**: Add your `EIA_API_KEY` and `ELECTRICITY_MAPS_API_KEY` as encrypted secrets.

---

## 🔒 Security & Privacy Manifesto

* **Zero Hardcoded Secrets**: All API routes run server-side. Private keys are never bundled into client-side JavaScript.
* **Pure Static Resilience**: The entire application compiles into static HTML/JS with serverless API fallbacks, meaning it can withstand DDoS attacks and traffic surges without service degradation.
* **No Cookies / No Telemetry Tracking**: We do not track users, drop cookies, or profile visitors.

---

## 📜 Open-Source License

DONA NOVA is released under the **[MIT License](LICENSE)**. You are free to inspect, fork, modify, self-host, and integrate this software into commercial, scientific, or academic applications.

* **GitHub Repository**: [github.com/dobby-aidev/dona-nova-showcase](https://github.com/dobby-aidev/dona-nova-showcase)
* **Live Radar**: [nova.donacodex.com](https://nova.donacodex.com)
* **Author / Ecosystem**: [Dona Codex](https://donacodex.com) • [dobby](https://dobby.donacodex.com)

---

<p align="center">
  <b>© 2026 Dona Codex. Built with precision for the future of physical and digital intelligence.</b>
</p>
