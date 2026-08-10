# AŞAMA 9 — DONA NOVA FRONTEND ARCHITECTURE BIBLE
**Company:** DONA CODEX | **Product:** DONA NOVA

---

# ROLE

You are the **Principal Frontend Architect** of DONA CODEX.

You are responsible for designing the frontend architecture of DONA NOVA.

This is not a UI exercise. This is not a React tutorial. This is not a component library.

**This document defines the complete frontend engineering strategy for the next decade.**

---

# MANDATORY CONTEXT

Use every previously created document. **Never contradict them.**

| Document | Status |
|---|---|
| Product Bible | ✅ Complete |
| Design Language | ✅ Complete |
| Data Intelligence | ✅ Complete |
| Information Architecture | ✅ Complete |
| Knowledge Graph | ✅ Complete |
| UX Bible | ✅ Complete |
| World Engine | ✅ Complete |
| System Architecture | ✅ Complete |

---

# IMPORTANT

- ❌ Do NOT generate code
- ❌ Do NOT generate React
- ❌ Do NOT create components
- ❌ Do NOT write CSS
- ✅ Only design the engineering specification
- ✅ Markdown only

---

# MISSION

Design an enterprise-grade frontend capable of rendering **millions of infrastructure assets** while remaining smooth, elegant and maintainable.

The frontend should prioritize:

| Priority | Principle |
|---|---|
| 1 | Performance |
| 2 | Scalability |
| 3 | Accessibility |
| 4 | Maintainability |
| 5 | Developer Experience |
| 6 | Long-term evolution |

---

# COMPLETE FRONTEND ARCHITECTURE

## Part 1 — Frontend Philosophy

- Mission statement
- Core responsibilities
- System boundaries

---

## Part 2 — Application Architecture

```
src/
├── features/           # Feature-based modules
│   ├── globe/          # 3D world engine
│   ├── explorer/       # Infrastructure explorer
│   ├── search/         # Search system
│   ├── knowledge/      # Knowledge graph UI
│   ├── workspace/      # User workspace
│   ├── reports/        # Report generation
│   └── auth/           # Authentication
├── shared/             # Shared libraries
│   ├── components/     # Design system components
│   ├── hooks/          # Shared React hooks
│   ├── stores/         # Global state
│   ├── utils/          # Utility functions
│   └── types/          # Shared TypeScript types
└── core/               # Application core
    ├── router/         # Routing configuration
    ├── config/         # App configuration
    └── api/            # API client layer
```

Principles:
- Feature-based architecture — features are independent
- Module isolation — features cannot import each other directly
- Shared libraries — cross-cutting concerns centralized
- State boundaries — each feature owns its state
- Dependency rules — direction is always inward

---

## Part 3 — Rendering Philosophy

| Rendering Context | Philosophy |
|---|---|
| UI rendering | React component tree, virtual DOM |
| Map rendering | WebGL / GPU-accelerated, 60fps minimum |
| Knowledge rendering | Graph visualization, force-directed or custom |
| Data rendering | Virtualized lists, windowing for large datasets |
| Chart rendering | GPU-accelerated or Canvas-based |
| Timeline rendering | Custom timeline engine, smooth scrubbing |
| Performance philosophy | Measure everything, never guess |

---

## Part 4 — State Management Philosophy

| State Category | Management Approach |
|---|---|
| Global state | Application-level (auth, user, theme) |
| Page state | Route-level state, URL-driven |
| Map state | Globe camera, layers, selected objects |
| Session state | Current workflow, recent history |
| Workspace state | User's saved work and preferences |
| User preferences | Persisted to backend, synced across devices |
| Cache philosophy | Server state cached intelligently, stale-while-revalidate |

---

## Part 5 — Performance Strategy

| Challenge | Solution Philosophy |
|---|---|
| Lazy loading | Load features only when needed |
| Streaming | Stream responses, show partial data immediately |
| Virtualization | Render only visible list items |
| Large datasets | Pagination + infinite scroll + virtualization |
| Memory optimization | Aggressive cleanup, avoid memory leaks |
| GPU optimization | WebGL for map, minimize draw calls |
| Offline strategy | Critical data cached for offline access |
| Caching | Layered: memory → IndexedDB → CDN |

---

## Part 6 — Component Strategy

| Principle | Implementation |
|---|---|
| Atomic philosophy | Small, focused, single responsibility |
| Reusable philosophy | Generic props, no business logic in atoms |
| Composition | Build complex from simple |
| Design consistency | Token-based, design system enforced |
| Naming | Descriptive, consistent, searchable |
| Folder philosophy | Co-locate related files |

Component hierarchy:

```
Atoms (Button, Input, Icon)
  ↓
Molecules (SearchBar, Card, Badge)
  ↓
Organisms (InfrastructureCard, MapPanel, SearchResults)
  ↓
Templates (ExplorerLayout, WorkspaceLayout)
  ↓
Pages (ExplorePage, InfrastructurePage)
```

---

## Part 7 — Responsive Strategy

| Breakpoint | Approach |
|---|---|
| Desktop (1440px+) | Full feature set, optimal information density |
| Laptop (1024-1440px) | Full feature set, compact layout |
| Tablet (768-1024px) | Touch-optimized, simplified navigation |
| Mobile (< 768px) | Essential features, bottom navigation |
| Ultra-wide (2560px+) | Multi-panel, expanded information density |
| Touch | Touch targets ≥ 44px, swipe gestures |
| Future displays | Scalable design tokens, flexible layouts |

---

## Part 8 — Accessibility

| Requirement | Standard |
|---|---|
| Keyboard navigation | Tab order logical, all interactions keyboard accessible |
| Motion reduction | All animations respect prefers-reduced-motion |
| High contrast | prefers-contrast: high honored |
| Screen readers | Semantic HTML + ARIA, tested with VoiceOver and NVDA |
| Internationalization | i18n from day one, no hard-coded strings |
| Localization | Date, number, currency formatting per locale |

---

## Part 9 — Developer Experience

| Concern | Philosophy |
|---|---|
| Folder strategy | Feature folders, predictable structure |
| Documentation | Every public API documented with examples |
| Testing | Unit (Vitest), Integration (Testing Library), E2E (Playwright) |
| Storybook philosophy | All components isolated and documented |
| Review standards | PR review checklist, architecture compliance |
| Versioning | Semantic versioning for shared packages |
| Release strategy | Feature flags, progressive rollout |

---

## Part 10 — Future Evolution

How the frontend should **evolve over the next decade without major rewrites:**

- Design token system enables theme evolution
- Feature flags enable gradual rollout
- Module boundaries enable team autonomy
- Clear API contracts enable backend independence
- Documented architectural decisions (ADRs) preserve context
- Regular dependency audits prevent technical debt

---

## Part 11 — Frontend Commandments

Create **100 permanent frontend engineering rules.**

---

# WRITING STYLE

Write like:
- Google's Engineering Handbook
- Figma Engineering
- Stripe Frontend Architecture

- No code.
- Markdown only.
- Extremely detailed.
