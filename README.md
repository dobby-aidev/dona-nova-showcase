# DONA NOVA

**The World's Infrastructure Intelligence Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Cloudflare Workers](https://img.shields.io/badge/Deployed_on-Cloudflare_Workers-F38020?logo=cloudflare)](https://workers.cloudflare.com/)

> Open-Source Infrastructure Planet built by [DONA CODEX](https://donacodex.com)

---


## What is DONA NOVA?

DONA NOVA is a new software category — **Infrastructure Intelligence Platform** — that allows humanity to discover, understand and analyze the world's physical infrastructure through one premium digital experience powered by **real, verified data**.

> Not a GIS tool. Not a dashboard. Not a monitoring app.
> **A living digital planet.**

Energy is the first module. Future modules span Water, Fiber, Transport, Data Centers, Mining, Ports, Railways, and Space Infrastructure.

---

## Data Sources (Real, Verified, Live)

All data is sourced from official, publicly available APIs. No mock data.

| Source | Coverage | Update Frequency | Access |
|--------|----------|-----------------|--------|
| **EIA Open Data** | U.S. electricity grid (15 regions) | Hourly | Free API key |
| **ENTSO-E Transparency** | Europe (22+ countries) | Hourly | Free API key |
| **Electricity Maps** | Global carbon intensity | 15 min | Free tier |
| **WRI Global Power Plant DB** | 35,000+ plants worldwide | Daily | Open (CC-BY 4.0) |
| **WRI Aqueduct** | Global water stress atlas | Annual | Open |
| **PeeringDB** | Internet exchanges & DC locations | Daily | Open API |

Every data point on the platform shows its **source, last update time, and reliability score.**

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Engine | Three.js + React Three Fiber |
| Animations | Framer Motion |
| State | Zustand + TanStack Query |
| Deployment | Cloudflare Workers (via OpenNext) |
| CI/CD | GitHub Actions |

---

## Project Structure

```
Dona_Nova/
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
├── app/                         # Next.js application
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   │   ├── api/
│   │   │   │   └── data/        # Unified data API endpoint
│   │   │   └── pricing/         # Pricing page
│   │   ├── components/
│   │   │   ├── globe/           # 3D Globe (WebGL/Three.js)
│   │   │   ├── layout/          # Sidebar, Header
│   │   │   └── ui/              # Cards, DataBadge, CommandPalette
│   │   ├── features/
│   │   │   └── explore/         # Explorer page
│   │   ├── lib/
│   │   │   └── data-sources/    # Real API clients
│   │   │       ├── eia-client.ts
│   │   │       ├── entsoe-client.ts
│   │   │       ├── electricity-maps-client.ts
│   │   │       └── power-plants.ts
│   │   └── types/
│   │       └── infrastructure.ts # Core data type definitions
│   ├── .env.example             # API key setup guide
│   ├── wrangler.toml            # Cloudflare Workers config
│   └── open-next.config.ts      # OpenNext adapter config
└── docs/                        # Product & Engineering Bibles
    ├── 00_MASTER.md
    ├── 01_PRODUCT_BIBLE.md
    ├── 02_DESIGN_LANGUAGE.md
    ├── 03_DATA_INTELLIGENCE.md
    ├── 04_INFORMATION_ARCHITECTURE.md
    ├── 05_KNOWLEDGE_GRAPH.md
    ├── 06_UX_EXPERIENCE.md
    ├── 07_WORLD_ENGINE.md
    ├── 08_SYSTEM_ARCHITECTURE.md
    └── 09_FRONTEND_ARCHITECTURE.md
```

---

## Development

### Prerequisites

```bash
node >= 20
npm >= 10
```

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/dona-nova.git
cd dona-nova/app

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local and add your API keys (see below)

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### API Keys (Required for Live Data)

Copy `.env.example` to `.env.local` and fill in:

| Key | How to Get | Cost |
|-----|-----------|------|
| `EIA_API_KEY` | Register at [eia.gov/opendata](https://www.eia.gov/opendata/) | Free |
| `ENTSOE_API_KEY` | Register at [transparency.entsoe.eu](https://transparency.entsoe.eu/), then email `transparency@entsoe.eu` requesting API access | Free |
| `ELECTRICITY_MAPS_API_KEY` | Sign up at [app.electricitymaps.com/auth/signup](https://app.electricitymaps.com/auth/signup) | Free tier |

> **WRI Global Power Plant Database** requires no API key — data is loaded directly from the open GitHub repository.

### Test Your API Connections

After setting up your `.env.local`:

```bash
# Open in browser:
http://localhost:3000/api/data?type=test
```

This will show the connection status of all configured data sources.

---

## API Reference

The unified data API is available at `/api/data`:

| Endpoint | Description | Example |
|----------|-------------|---------|
| `?type=grid&region=DE` | Grid data for a region | ENTSO-E or EIA region code |
| `?type=carbon&zone=TR` | Carbon intensity for a zone | Electricity Maps zone code |
| `?type=plants&country=TR&minMW=100` | Power plants by country | ISO alpha-2 country code |
| `?type=stats` | Global capacity summary | Top 20 countries by MW |
| `?type=test` | Test all API connections | Returns status of each source |

---

## Deployment (Cloudflare Workers)

### First-time setup

```bash
cd app
npx wrangler login
```

Set GitHub Secrets in your repository settings:
- `CLOUDFLARE_API_TOKEN` — from [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
- `CLOUDFLARE_ACCOUNT_ID` — from your Cloudflare dashboard
- `EIA_API_KEY` — your EIA key
- `ENTSOE_API_KEY` — your ENTSO-E key
- `ELECTRICITY_MAPS_API_KEY` — your Electricity Maps key

### Deploy manually

```bash
cd app
npm run cf:deploy          # Deploy to production
npm run cf:deploy:staging  # Deploy to staging
npm run cf:preview         # Local Workers preview
```

### Deploy via GitHub (automatic)

| Branch | Action | Environment |
|---|---|---|
| `main` | push | Production |
| `staging` | push | Staging |
| any | pull request | Preview |

---

## Database (Planned)

Currently using in-memory caching (Cloudflare KV) and on-demand API fetches.

Planned persistent storage:

| Layer | Technology |
|---|---|
| Relational | Cloudflare D1 (SQLite at edge) |
| Graph | Neo4j Aura or Cloudflare Hyperdrive → PostgreSQL |
| Cache | Cloudflare KV |
| Search | Cloudflare Vectorize + AI Gateway |
| Object Storage | Cloudflare R2 (for GPPD CSV cache) |

---

## Pricing

DONA NOVA uses a tiered subscription model:

| Plan | Price | Target |
|------|-------|--------|
| Explorer | Free | Individual exploration |
| Analyst | $299/mo | Researchers & professionals |
| Professional | $999/mo | Hedge funds, energy companies |
| Enterprise | Custom | Large institutions |

See [/pricing](http://localhost:3000/pricing) for full feature comparison.

---

## Roadmap

### Phase 1 — Foundation (Current)
- [x] 3D Globe with Three.js
- [x] Real data type system
- [x] EIA, ENTSO-E, Electricity Maps API clients
- [x] Global Power Plant Database integration
- [x] Unified `/api/data` endpoint
- [x] DataBadge — source transparency on every data point
- [x] Pricing page

### Phase 2 — Live Data on Globe
- [ ] EIA + ENTSO-E live grid data on globe
- [ ] Carbon intensity heatmap layer
- [ ] Power plant cluster rendering (LOD system)
- [ ] Live data feed panel

### Phase 3 — Legal & Go-to-Market
- [ ] Terms of Service
- [ ] Privacy Policy (GDPR compliant)
- [ ] Data Processing Agreement template
- [ ] Beta waitlist

### Phase 4 — AI Layer
- [ ] Natural language query engine
- [ ] Anomaly detection
- [ ] 30/90/365 day forecasting

---

*DONA NOVA — Infrastructure Intelligence Platform*
*© 2026 DONA CODEX. All rights reserved.*
