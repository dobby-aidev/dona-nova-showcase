# DONA NOVA

**The World's Infrastructure Intelligence Platform**

> Built by [DONA CODEX](https://donacodex.com)

---

## Overview

DONA NOVA is a new software category — **Infrastructure Intelligence Platform** — allowing humanity to discover, understand and analyze the world's physical infrastructure through one premium digital experience.

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

## Development

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment (Cloudflare Workers)

### First-time setup

1. Install Wrangler and authenticate:
```bash
cd app
npx wrangler login
```

2. Set GitHub Secrets:
   - `CLOUDFLARE_API_TOKEN` — from [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   - `CLOUDFLARE_ACCOUNT_ID` — from your Cloudflare dashboard

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

## Project Structure

```
Dona_Nova/
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions CI/CD
├── app/                     # Next.js application
│   ├── src/
│   │   ├── app/             # Next.js App Router pages
│   │   ├── components/      # UI components
│   │   │   ├── globe/       # 3D Globe (WebGL/GLSL)
│   │   │   ├── layout/      # Sidebar, Header
│   │   │   └── ui/          # Cards, CommandPalette
│   │   └── features/        # Feature modules
│   │       └── explore/     # Explorer page
│   ├── wrangler.toml        # Cloudflare Workers config
│   └── open-next.config.ts  # OpenNext adapter config
└── docs/                    # Product & Engineering Bibles
    ├── 00_MASTER.md
    ├── 01_PRODUCT_BIBLE.md
    ├── 02_DESIGN_LANGUAGE.md
    └── ...
```

## Database (Future)

Currently using **mock data**. Planned database stack:

| Layer | Technology |
|---|---|
| Relational | Cloudflare D1 (SQLite at edge) |
| Graph | Neo4j Aura or Cloudflare Hyperdrive → PostgreSQL |
| Cache | Cloudflare KV |
| Search | Cloudflare Vectorize + AI Gateway |

---

*DONA NOVA — Infrastructure Intelligence Platform*
*© 2026 DONA CODEX. All rights reserved.*
