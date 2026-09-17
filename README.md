# DONA NOVA

**Global Open Infrastructure Intelligence Radar & MCP Server**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Radar-nova.donacodex.com-00f0ff?style=for-the-badge&logo=cloudflare)](https://nova.donacodex.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MCP Ready](https://img.shields.io/badge/MCP-Model_Context_Protocol-purple.svg)](https://modelcontextprotocol.io)
[![Ecosystem](https://img.shields.io/badge/Ecosystem-donacodex.com-purple)](https://donacodex.com)

> 🌐 **Production Live**: [https://nova.donacodex.com](https://nova.donacodex.com)  
> Built by [dobby](https://dobby.donacodex.com) • Part of the [Dona Codex](https://donacodex.com) Ecosystem  
> 100% Free & Open-Source • No Sign-up Required • Real Satellite & Grid Telemetry

---

## What is DONA NOVA?

DONA NOVA is a new software category — **Infrastructure Intelligence Platform** — that allows humanity to discover, understand and analyze the world's physical infrastructure through one premium digital experience powered by **real, verified data**.

> Not a GIS tool. Not a dashboard. Not a monitoring app.
> **A living digital planet.**

Energy is the first module. Future modules span Water, Fiber, Transport, Data Centers, Mining, Ports, Railways, and Space Infrastructure.

### Model Context Protocol (MCP) Integration 🤖
DONA NOVA now officially supports the **Model Context Protocol (MCP)**, allowing AI assistants (Claude, Cursor, Windsurf) to securely read from our 3,160+ live facility dataset. 
- You can search facilities by country or category, and query specific assets entirely through your local LLM interface.
- **Run the MCP server locally:** `npm run mcp` (inside the `app` directory).

---

## Data Sources (Real, Verified, Live)

All data is sourced from official, publicly available APIs. No mock data.

| Source | Coverage | Update Frequency | Access |
|--------|----------|-----------------|--------|
| **EIA Open Data** | U.S. electricity grid (15 regions) | Hourly | Free API key |
| **ENTSO-E Transparency** | Europe (22+ countries) | Hourly | Free API key |
| **Electricity Maps** | Global carbon intensity | 15 min | Free tier |
| **WRI Global Power Plant DB** | 35,000+ plants worldwide | Daily | Open (CC-BY 4.0) |

Every data point on the platform shows its **source, last update time, and reliability score.**

---

## Architecture & Stack

DONA NOVA features a high-end, **Minimalist Corporate Cream** interface, designed for absolute clarity and high contrast, combined with a highly optimized 3D WebGL NASA Earth map.

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Engine | Three.js + React Three Fiber |
| AI Integration | `@modelcontextprotocol/sdk` |
| Deployment | Cloudflare Workers (via OpenNext) |

---

## Development

### Prerequisites
- `node >= 20`
- `npm >= 10`

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/dobby-aidev/dona-nova-showcase.git
cd dona-nova-showcase/app

# 2. Install dependencies
npm install

# 3. Configure environment variables (if needed for APIs)
cp .env.example .env.local

# 4. Run dev server
npm run dev

# 5. Run MCP Server (Optional)
npm run mcp
```

Open [http://localhost:3000](http://localhost:3000)

---

## 100% Free & Open-Source (MIT License)

DONA NOVA is fully open-source and free for humanity. There are no paywalls, accounts, or proprietary subscriptions.

- **License**: [MIT License](LICENSE) — Feel free to inspect, fork, and self-host.
- **Production Live**: [https://nova.donacodex.com](https://nova.donacodex.com)
- **Ecosystem Platform**: [https://donacodex.com](https://donacodex.com)
- **Creator Portfolio**: [https://dobby.donacodex.com](https://dobby.donacodex.com)

---

## Security, Contribution & Inquiries

Security and data integrity are top priorities for DONA NOVA:

- **Security & All Inquiries**: Please email **[info@donacodex.com](mailto:info@donacodex.com)** directly. Do not open public GitHub issues for security matters.

---

## GitHub Push & Safety Guide

Before pushing to GitHub, ensure no sensitive data is committed:
- ✅ **Committed**: `app/src/`, `app/public/`, `app/package.json`, `app/next.config.ts`, `app/.env.example`, `README.md`, `LICENSE`, `CONTRIBUTING.md`.
- ❌ **Never Commit**: `.env.local`, `.env.production`, `node_modules/`, `.next/`, private keys, Cloudflare credentials.

Always review `git status` before pushing.

---

*DONA NOVA — Global Open Infrastructure Radar*  
*Built with ❤️ by [dobby](https://dobby.donacodex.com) • An open-source project by [Dona Codex](https://donacodex.com)*
