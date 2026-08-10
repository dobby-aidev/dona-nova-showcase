# Contributing to DONA NOVA

Thank you for your interest in contributing to **DONA NOVA** — The World's Infrastructure Intelligence Platform!

We welcome contributions from developers, data engineers, GIS specialists, and UI/UX designers of all skill levels.

---

## Code of Conduct

Please treat everyone with respect and empathy. We are committed to providing a welcoming, inclusive, and safe environment for all contributors.

---

## How to Contribute

### 1. Reporting Bugs
- Check existing [GitHub Issues](https://github.com/donacodex/dona-nova/issues) before opening a new issue.
- Use the **Bug Report** issue template.
- Include detailed steps to reproduce the issue, your environment (browser, OS), and relevant logs or screenshots.

### 2. Suggesting Features
- Open a feature request using the **Feature Request** issue template.
- Describe the problem your feature solves and why it would benefit the community.

### 3. Submitting Pull Requests (PRs)
1. **Fork** the repository and clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/dona-nova.git
   cd dona-nova
   ```
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Install dependencies**:
   ```bash
   cd app
   npm install
   ```
4. **Set up local environment**:
   ```bash
   cp .env.example .env.local
   # Add your test API keys in .env.local (do NOT commit .env.local!)
   ```
5. **Develop & Test locally**:
   ```bash
   npm run dev
   ```
6. **Ensure build & lint pass**:
   ```bash
   npm run lint
   npm run build
   ```
7. **Commit your changes** following conventional commit messages:
   - `feat: add WRI Aqueduct water stress data client`
   - `fix: resolve Globe LOD clustering rendering issue`
   - `docs: update deployment guidelines`
8. **Push to your fork** and submit a **Pull Request** against the `main` branch.

---

## Security Policy & Secrets

- **NEVER** commit API keys, tokens, or credentials (`.env.local` is listed in `.gitignore`).
- If you find a security vulnerability, please do NOT create a public issue. Email security@donacodex.com directly.

---

## Tech Stack Quick Reference

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Engine**: Three.js + React Three Fiber (@react-three/fiber, @react-three/drei)
- **State Management**: Zustand & TanStack React Query
- **Edge Runtime**: Cloudflare Workers (via OpenNext)

Thank you for helping us build the future of infrastructure intelligence! 🚀
