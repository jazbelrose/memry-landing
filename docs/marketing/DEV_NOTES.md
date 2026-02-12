# Dev Notes — Marketing Landing Page

## File Map

```
src/
  index.css                           # Global tokens, reset, grain overlay, reduced-motion
  main.tsx                            # React entry
  App.tsx                             # Renders MarketingLandingPage
  marketing/
    MarketingLandingPage.tsx           # Page shell — composes all sections
    content/
      lockedCopy.ts                   # ⭐ ALL page copy lives here (locked + UI labels + data arrays)
    components/
      Icons.tsx                       # Thin-line SVG icons + FeatureIcon lookup
      Button.tsx / .module.css        # Primary / secondary CTA button
      GlassCard.tsx / .module.css     # Reusable glass-morphism card with reveal animation
      Section.tsx / .module.css       # Section wrapper (max-width + padding)
      NavBar.tsx / .module.css        # Sticky top nav
      HeroSection.tsx / .module.css   # Hero + mock product UI frame
      ProblemSection.tsx / .module.css # 3 glass problem cards
      TabsSection.tsx / .module.css   # Interactive keyboard-accessible tabs + SVG diagrams
      FeatureGrid.tsx / .module.css   # 6-card feature grid
      ComparisonTable.tsx / .module.css # Scrollable comparison table
      WorkflowStepper.tsx / .module.css # GSAP ScrollTrigger stepper (signature animation)
      RoleCards.tsx / .module.css      # 4 role cards
      Footer.tsx / .module.css        # V1 readiness + CTA band + footer columns
docs/
  marketing/
    COPY_LOCKED_V4.md                 # Verbatim approved copy (reference only)
    DEV_NOTES.md                      # This file
```

## How to Change Copy

1. Open `src/marketing/content/lockedCopy.ts`
2. The `copy` object contains **locked** (exec-approved) text — get approval before editing.
3. The `ui` object contains editable section headings and labels.
4. Data arrays (`problemCards`, `tabsData`, `featureCards`, `comparisonRows`, `workflowSteps`, `roleCardsData`) are also in this file.
5. Components import from this single file — no copy is scattered across TSX.

## How Animations Work

### Framer Motion (all sections)
- Reveal animations use `whileInView` with `viewport={{ once: true }}`.
- `GlassCard` has staggered fade-up via `delay` prop.
- Tab content uses `AnimatePresence` for crossfade.
- Buttons use `whileHover` / `whileTap` for micro-lift.

### GSAP + ScrollTrigger (WorkflowStepper only)
- Dynamically imported (`import('gsap')`) — NOT bundled unless used.
- Only loaded on desktop when `prefers-reduced-motion` is NOT `reduce`.
- `gsap.context()` scopes all animations for clean unmount via `ctx.revert()`.
- A `cancelled` flag prevents setup if the component unmounts during async import.
- Progress bar height animates 0→100% scrubbed to scroll position.
- Each step gets a `ScrollTrigger` that sets `activeStep` state.

### Reduced Motion
- Global CSS: `@media (prefers-reduced-motion: reduce)` disables all transitions/animations.
- GSAP: skipped entirely (static fallback with all steps visible).
- Hero gradient orb: animation disabled.
- Mock UI frame: perspective transform disabled.

## Design Tokens
All tokens live in `src/index.css` `:root` block matching the North Star Design System.
Key values: `--brand: #FA3356`, `--bg: #0c0c0c`, `--glass-bg: rgba(17,17,17,0.68)`.

## Running
```bash
npm install
npm run dev     # Vite dev server
npm run build   # Production build
```
