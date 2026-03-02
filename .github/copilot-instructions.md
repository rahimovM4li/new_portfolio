# Copilot Instructions

## Build & Run

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/my_portfolio_3d/browser
npm test           # Karma + Jasmine unit tests
```

Deploy: `firebase deploy` (Firebase Hosting, project `m4li-portfolio`).

## Architecture

Angular 19 standalone-component portfolio site. No NgModules — every component uses `standalone: true` with direct `imports` arrays.

**Routing** (`app.routes.ts`): Four top-level routes — `''` (Home), `about`, `projects`, `contact`. Legal pages live under `src/app/pages/` (datenschutz, impressum). The `AppComponent` renders `<app-navbar>` + `<router-outlet>`.

**Styling stack**: Tailwind CSS v4 (via `@tailwindcss/postcss` in `.postcssrc.json`) + Angular Material (dark theme, green/spring-green palette) + global design tokens as CSS custom properties in `styles.scss`. Two style entry points: `src/tailwind.css` and `src/styles.scss`.

**i18n**: `@ngx-translate` with JSON translation files in `src/assets/i18n/` (en, de, ru). Loaded via `TranslateHttpLoader`. Use `TranslatePipe` in templates and `TranslateService` for programmatic access. Translation keys are namespaced by section (e.g., `HOME.greeting`, `ABOUT.funFacts`, `PROJECTS.title`). When adding new user-facing text, add keys to all three language files.

**Animations & 3D**: GSAP (with ScrollTrigger) for scroll-driven animations, Three.js for the hero liquid background on the home page, VanillaTilt for project card hover effects. All animation code respects `prefers-reduced-motion` and degrades on low-power devices.

**UI utilities**: `class-variance-authority` (cva) + `clsx` for composing component variants (see `src/app/components/ui/`).

## Key Conventions

- **Standalone components only** — no NgModules. Import dependencies directly in each component's `imports` array.
- **Design tokens** — colors, shadows, radii, and fonts are defined as CSS custom properties in `styles.scss` `:root`. Tailwind config maps these vars to utility classes (e.g., `bg-primary`, `text-neon`). Use the CSS vars or Tailwind utilities, not hardcoded color values.
- **Global CSS classes** — `styles.scss` defines reusable classes: `.glass`, `.glass-strong`, `.glow-ring`, `.gradient-text`, `.btn-primary`, `.btn-glass`, `.btn-ghost`, `.badge`, `.input`, `.section-shell`. Use these rather than recreating similar styles.
- **TypeScript strict mode** — `strict: true` with additional flags (`noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`). Angular strict templates are enabled.
- **Scroll animations** — components use `IntersectionObserver` directly (not a shared directive) for viewport-triggered animations. Follow the existing pattern of observing elements via `@ViewChildren` refs.
- **Contact form** — submits via Formspree (`fetch` POST), not an Angular service.
- **Type declarations** — Three.js module declarations are in `src/typing.d.ts`.
