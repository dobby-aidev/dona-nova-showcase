# Contributing to DONA NOVA

Thank you for your interest in contributing to **DONA NOVA** — Global Open Infrastructure Intelligence Radar!

We welcome contributions from developers, data engineers, GIS specialists, energy analysts, and UI/UX designers worldwide.

---

## Communication & Inquiries

- **All Inquiries, Contributions & Security**: [info@donacodex.com](mailto:info@donacodex.com)
- **Website & Ecosystem**: [https://donacodex.com](https://donacodex.com) • [https://dobby.donacodex.com](https://dobby.donacodex.com)

---

## Code of Conduct

Please treat everyone with respect, empathy, and professional integrity. We are committed to maintaining a welcoming, inclusive, and safe open-source environment for all contributors.

---

## Git & GitHub Security Checklist (What to Commit vs What to Ignore)

Before running `git add` and `git push`, make sure you strictly follow this checklist:

### Allowed & Expected Files to Commit:
- Source code in `app/src/` (`components/`, `features/`, `lib/`, `types/`, `app/`)
- Public assets in `app/public/`
- Configuration files: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`
- Environment template: `.env.example` (Contains only variable names, NO REAL SECRETS)
- Documentation: `README.md`, `CONTRIBUTING.md`, `LICENSE`
- GitHub Workflows: `.github/workflows/deploy.yml`

### STRICTLY FORBIDDEN (NEVER COMMIT OR PUSH TO GITHUB):
- Real Environment & API keys: `.env`, `.env.local`, `.env.production`, `.env.*`
- Dependencies: `node_modules/`
- Build outputs: `.next/`, `out/`, `dist/`, `build/`
- Cloudflare & OpenNext artifacts: `.open-next/`, `.wrangler/`
- Private keys & certificates: `*.pem`, `*.key`, `*.cert`
- System cache files: `.DS_Store`, `Thumbs.db`, `*.tsbuildinfo`, `*.log`

> **Safety Check**: Always run `git status` and inspect staged files before running `git commit`.

---

## How to Contribute

### 1. Reporting Issues & Bugs
- Check existing [GitHub Issues](https://github.com/dobby-aidev/dona-nova-showcase/issues) before opening a new one.
- Use a clear title and provide detailed reproduction steps, browser/OS specs, and console logs.

### 2. Submitting Pull Requests (PRs)
1. **Fork** the repository and clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/dona-nova-showcase.git
   cd dona-nova-showcase
   ```
2. **Create a clean feature branch**:
   ```bash
   git checkout -b feature/my-infrastructure-improvement
   ```
3. **Install dependencies**:
   ```bash
   cd app
   npm install
   ```
4. **Set up environment**:
   ```bash
   cp .env.example .env.local
   # Fill in local API keys in .env.local (this file is git-ignored)
   ```
5. **Develop & Test**:
   ```bash
   npm run dev
   ```
6. **Verify build & types**:
   ```bash
   npm run build
   ```
7. **Commit & Push**:
   ```bash
   git add .
   git commit -m "feat: enhance 3D marker LOD clustering"
   git push origin feature/my-infrastructure-improvement
   ```
8. **Open a Pull Request** targeting the `main` branch.

---

## License

By contributing to DONA NOVA, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
