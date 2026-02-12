# North Star Design System — memry

> **A token-based, glass morphic design system** featuring grainy backgrounds, subtle gradient animations, and sophisticated visual depth.

---

## 1. Core Philosophy

The memry **North Star Design System** is built on five foundational principles:

### 1.1 Design Guide Compliance (60-30-10 Rule)
- **60% Neutral Backgrounds**: Deep dark `#0c0c0c` establishes visual rest
- **30% Text & Surfaces**: High contrast white `#fff` and muted grays (`#777`) ensure readability  
- **10% Brand Accent**: Single-use hot pink/red `#FA3356` for critical actions and focus states
- **Meaning-Driven Error**: Deep red `#D32F2F` **only** for destructive/error states

**Rationale**: Reduces cognitive load, maintains visual hierarchy, prevents accent fatigue.

### 1.2 Token-First Architecture
Every visual decision is codified in CSS custom properties (`--variable-name`), enabling:
- **Consistency**: Single source of truth across 100+ components
- **Flexibility**: Theme, density, and mode variations without refactoring
- **Maintainability**: Changes ripple through the entire UI automatically

### 1.3 Rhythm Over Rules
- All spacing follows an **8-point grid** (`8px, 16px, 24px, 32px, 48px`)
- Typography uses a **4-size scale** (`12px, 16px, 20px, 28px`)
- Transitions complete in **100–300ms** to feel responsive without disorientation
- Motion preserves "object continuity" — elements move/scale, never pop

### 1.4 Glass Morphism + Depth
Modern neumorphic layering combines:
- **Backdrop blur** (14–18px) with semi-transparent backgrounds
- **Radial gradients** for subtle accent glow from corners
- **Inset highlights** (1px top border) simulating light reflection
- **Fractional noise** texture for tangible, physical feel

### 1.5 Layout Systems as Design DNA
Each presentation deck inherits a **layout system** (taste mode) defining spacing, typography, and hero alternation—ensuring cross-slide visual rhythm without manual consistency work.

---

## 2. Design Tokens Reference

### 2.1 Color System

#### Base Palette
```css
:root {
  /* Brand & Accent (10% of UI) */
  --brand: #FA3356;                          /* Hot pink/red */
  --color-hover: #ff4b70;                    /* Slightly lighter for hover states */
  
  /* Backgrounds (60% neutrals) */
  --bg: #0c0c0c;                             /* Deep black, primary bg */
  --bg2: #111213;                            /* Slightly lighter variant */
  --bg3: #181a1b;                            /* For raised/featured surfaces */
  --bg-secondary: rgba(255, 255, 255, 0.02); /* Minimal lift */
  
  /* Text & Ink (30%) */
  --text: #eaecee;                           /* Primary text, high contrast */
  --text-color: var(--text);                 /* Alias */
  --text-color-secondary: #666;              /* Secondary text */
  --text-color-muted: #9aa0a6;               /* Tertiary, hints, captions */
  --muted: #9aa0a6;                          /* Alias */
  
  /* Chrome (Floating UI) */
  --chrome-bg: rgba(12, 12, 12, 0.72);       /* Header, footer, bars */
  --chrome-border: rgba(255, 255, 255, 0.06);
  --chrome-blur: blur(18px) saturate(140%);
  
  /* Status (Reserved for meaning) */
  --color-success: #4caf50;                  /* Green, success only */
  --color-warning: #ff9800;                  /* Amber, caution only */
  --color-error: #ef5350;                    /* Light red, errors only */
  --color-info: #888;                        /* Neutral gray */
  
  /* Borders & Lines */
  --border-color: #2a2a2a;                   /* Strong borders */
  --border-color-light: #3a3a3a;             /* Softer dividers */
  --border-color-dark: #1d1d1d;              /* Dark surfaces */
  --line: rgba(255, 255, 255, 0.06);         /* Hairline separators */
}
```

#### Brand Opacity Variants (Alpha Channel)
```css
--brand-08: rgba(250, 51, 86, 0.08);  /* 8% — very subtle highlight */
--brand-12: rgba(250, 51, 86, 0.12);  /* 12% — light tint */
--brand-20: rgba(250, 51, 86, 0.20);  /* 20% — visible wash */
```

### 2.2 Spacing System (8pt Grid)

```css
:root {
  --space-1: 8px;    /* Micro: inline gaps, icon padding */
  --space-2: 16px;   /* Small: component padding, section margins */
  --space-3: 24px;   /* Medium: card padding, group gaps */
  --space-4: 32px;   /* Large: section spacing, layout gutters */
  /* Inferred: 48px, 56px, 64px for major layout divisions */
}
```

**Usage Pattern**:
- Gaps within component: `8px` or `16px`
- Component padding: `16px` or `24px`  
- Section margins: `24px` or `32px`
- Page gutters: `32px` or higher

### 2.3 Typography System (4-Size Scale)

```css
:root {
  --fs-sm: 12px;     /* Captions, hints, secondary metadata */
  --fs-md: 16px;     /* Body text, primary reading */
  --fs-lg: 20px;     /* Subheadings, section titles */
  --fs-xl: 28px;     /* Main headings, primary focal point */
}
```

**Font Weights**:
- `400` — Body, secondary text
- `600` — Headings, emphasis, labels
- `700` — Small accents, monospace numbers
- Never exceed two weights per view

**Line Heights**:
- Headings: `1.2` (tight, sophisticated)
- Body: `1.5` (readable, comfortable)
- Captions: `1.4` (compact, functional)

### 2.4 Texture & Noise

#### SVG Fractal Noise Data URI
```css
--noise-data-uri: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0n...");
```

The noise filter uses:
- **Turbulence type**: `fractalNoise` (natural, organic variation)
- **Base frequency**: `0.8` (medium grain scale)
- **Octaves**: `4` (depth and detail layering)
- **Opacity**: `0.35` (subtle, not overwhelming)

**Applied to**:
- Card backgrounds for tactile feel
- Glass surfaces to reduce flatness  
- Large gradient areas to break up smoothness

---

## 3. Glass Morphism: The Definition

Glass morphism in memry combines **three layers**:

### 3.1 Layer 1: Translucent Base

```css
.glassBg {
  --glass-bg: rgba(17, 17, 17, 0.68);
  background: var(--glass-bg);
}
```

- **Dark** (`#111111`) for contrast
- **68% opacity** (not fully opaque, not fully transparent—intent visible through)
- Sits on top of backdrop content without obscuring it

### 3.2 Layer 2: Border + Subtle Gradient

```css
.glassBorder {
  border: 1px solid var(--glass-border);
  /* glass-border: rgba(255, 255, 255, 0.1) — subtle light edge */
}
```

**Radial Accent Glow** (optional):
```css
background:
  radial-gradient(120% 120% at 100% 0%, 
    color-mix(in srgb, var(--brand) 12%, transparent) 0%, 
    transparent 60%),
  var(--glass-bg);
```

- Subtle brand color bleed from **top-right corner** (100% 0%)
- Only **12% saturation** of accent (whisper, not shout)
- Creates illusion of light/focus without overwhelming form

### 3.3 Layer 3: Backdrop Filter + Illumination

```css
.glassBlur {
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px); /* iOS Safari fallback */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16), /* Top highlight */
    0 10px 30px rgba(0, 0, 0, 0.35);          /* Depth shadow */
  outline: 1px solid rgba(255, 255, 255, 0.05);
  outline-offset: -1px; /* Nestles just inside border */
}
```

**Breakdown**:
- **Blur (14–18px)**: Softens backdrop, creates focus separation
- **Inset highlight**: 1px line at top simulates light catching surface
- **Drop shadow**: 10–30px blur radius grounds element in space
- **Outline (inner)**: Sub-border accent catches light on edges

---

## 4. Animated Gradient Effects

### 4.1 Multi-Layer Gradient Composition

**On `.statChip` and similar interactive surfaces**:

```css
.statChip::before {
  background:
    color-mix(in srgb, rgba(var(--chip-accent-rgb), 0.28) 18%, transparent 82%),
    var(--chip-radial-b),
    var(--chip-radial-a),
    var(--chip-linear);
  opacity: 0.9;
}
```

**Layer order** (bottom to top):
1. **Linear base** (135° angle): `linear-gradient(135deg, rgba(...), rgba(...))`
   - Diagonal sweep from dark/cool to slightly lighter
   - Sets overall color temperature
   
2. **Radial A (top-left)**: `radial-gradient(120% 80% at 0% 0%, ...)`
   - Soft accent glow from top-left corner
   - 55% falloff (blends quickly into linear base)
   
3. **Radial B (bottom-right)**: `radial-gradient(140% 100% at 100% 100%, ...)`
   - Complementary glow from opposite corner
   - Creates visual "depth" and corner emphasis
   
4. **Color mix**: Alpha-blended accent over transparent
   - `color-mix(in srgb, rgba(accent, 0.28) 18%, transparent 82%)`
   - Smart blending: 18% accent, 82% transparent → no harsh edges

### 4.2 Top Surface Highlight

```css
.statChip::after {
  background: linear-gradient(
    180deg, 
    rgba(255, 255, 255, 0.22) 0%,      /* Bright at top */
    rgba(255, 255, 255, 0) 35%          /* Fade quickly */
  );
  mix-blend-mode: screen;  /* Screen blend: lighten, never darken */
  opacity: 0.85;
}
```

- **Screen blend mode**: Boosts light reflection, creates luminosity without crushing blacks
- **Top-heavy gradient**: Light effect naturally weights to surface top
- **35% falloff**: Doesn't dominate; remains a subtle gloss

### 4.3 Interactive State Animation

```css
.statChip {
  transition:
    box-shadow 180ms ease,
    border-color 180ms ease,
    transform 180ms ease,
    backdrop-filter 180ms ease;
}

.statChip:hover {
  border-color: color-mix(
    in srgb, 
    rgba(var(--chip-accent-rgb), 0.55) 30%,
    rgba(255, 255, 255, 0.12) 70%
  );
  box-shadow:
    inset 0 1px 0 var(--chip-glass-highlight),
    0 0 0 6px rgba(var(--chip-accent-rgb), 0.12), /* Glow ring */
    0 14px 36px rgba(0, 0, 0, 0.45);              /* Lifted shadow */
}

.statChip:active {
  transform: scale(0.995);        /* Micro press feedback */
  backdrop-filter: blur(12px);    /* Slightly less blur = "press" */
}
```

**Behavior**:
- **Hover**: Border brightens, halo glow appears, shadow deepens
- **Active**: Slight shrink (0.995 scale), blur reduces emphasizing physical press
- **All transitions**: 180ms `ease` (not `ease-in-out`—decelerate into rest state)

---

## 5. Taste Modes: Style DNA Presets

Each **layout system** (slide deck) inherits one of six taste modes, each with complete design language:

### 5.1 Apple Clean
- **Typeface**: SF Pro (System font stack)
- **Spacing**: 1.2x scale (96px margins, 24px gutter)
- **Radius**: 16px (moderate rounds)
- **Aesthetic**: Minimalist, airy, modern
- **Use case**: Professional, tech-forward, premium brands

### 5.2 Fashion
- **Typeface**: Didot/Playfair (serif, elegant)
- **Spacing**: 1.0x compact (96–120px margins)
- **Radius**: 8px (sharp, refined)
- **Aesthetic**: Luxury, high-end, editorial
- **Use case**: Beauty, fashion, lifestyle brands

### 5.3 Cyber
- **Typeface**: Space Grotesk (geometric, futuristic)
- **Spacing**: 1.1x (96px margins, 20px gutters)
- **Radius**: 12px (slightly rounded)
- **Aesthetic**: Tech, gaming, innovation
- **Use case**: Startups, crypto, digital products

### 5.4 Brutalist
- **Typeface**: Impact (bold, heavy sans)
- **Spacing**: 1.25x (120px margins, generous gutters)
- **Radius**: 0px (hard edges, sharp)
- **Aesthetic**: Raw, edge, deconstructed
- **Use case**: Streetwear, experimental, counter-culture

### 5.5 Pinterest
- **Typeface**: Lato (friendly, approachable)
- **Spacing**: 1.1x (generous, open)
- **Radius**: 12px (friendly, soft)
- **Aesthetic**: Warm, community, inspiration
- **Use case**: Creative, DIY, social-first brands

### 5.6 Museum
- **Typeface**: Garamond (classic serif)
- **Spacing**: 1.2x (generous, scholarly)
- **Radius**: 4px (minimal, refined)
- **Aesthetic**: Traditional, authoritative, timeless
- **Use case**: Museums, galleries, heritage brands

**Key**: Each mode defines a **complete typographic pack** (headline font, weights, tracking, scale), not just spacing. This ensures designs feel cohesive from margin to microtype.

---

## 6. Layout System Architecture

### 6.1 Structure

A **layout system** persists across a slide deck:

```typescript
interface LayoutSystem {
  id: string;                    // Unique ID
  name: string;                  // "Untitled Design System"
  
  tokens: {
    tasteMode: "apple-clean" | ...; // Style DNA
    gutter: number;               // 20–24px
    marginTop: number;            // 96–120px
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    cornerRadius: number;         // 8–16px
    shadowIntensity: number;
    strokeWidth: number;
    strokeColor: string;
    heroScale: number;            // 1.3–1.8x
    scaleVariance: number;        // 0.1–0.2 range
    locked: GlobalLocks;          // Which tokens are frozen
  };
  
  heroPattern: {
    type: "alternate-lr" | "alternate-lrc" | "fixed-left" | ...;
    currentIndex: number;         // Tracks position in pattern
  };
  
  heroHistory: Map<slideIndex, position>; // For rhythm tracking
  createdAt: number;
  updatedAt: number;
}
```

### 6.2 Hero Alternation Patterns

Automatically positions primary visual elements (hero images) across slides:

- **`alternate-lr`**: Left → Right → Left → Right (zigzag rhythm)
- **`alternate-lrc`**: Left → Right → Center → repeat (3-position dance)
- **`fixed-left`**: Always left (stable, reliable)
- **`fixed-right`**: Always right (dramatic, asymmetric)
- **`fixed-center`**: Always center (symmetrical, formal)
- **`random`**: No pattern (unpredictable, editorial)

**Impact**: Ensures visual rhythm across entire presentation without manual placement on each slide.

### 6.3 Rhythm Analysis

```typescript
interface RhythmAnalysis {
  consistency: number;        // 0–1 score
  suggestions: string[];      // "Increase hero scale variance"
  detectedPattern: string;    // e.g., "strong left bias"
}
```

Analyzes hero positions across slides to suggest improvements (e.g., "balance left/right ratio").

---

## 7. Component Grammar

### 7.1 Glass Chip Component

Used for stats, tags, and secondary actions.

```css
.statChip {
  --chip-accent-rgb: 120, 190, 255; /* Accent color as RGB for blending */
  --chip-glass-bg: rgba(17, 17, 17, 0.68);
  --chip-glass-border: rgba(255, 255, 255, 0.1);
  --chip-glass-highlight: rgba(255, 255, 255, 0.16);
  
  border-radius: 20px;
  border: 1px solid var(--chip-glass-border);
  background: var(--chip-glass-bg);
  
  box-shadow:
    inset 0 1px 0 var(--chip-glass-highlight),  /* Top light */
    0 10px 30px rgba(0, 0, 0, 0.35);            /* Depth */
  
  backdrop-filter: blur(14px);
  transition: box-shadow 180ms ease, border-color 180ms ease;
}
```

**Variants** (by tone):
- **Default**: Neutral blue (`--chip-accent-rgb: 120, 190, 255`)
- **`.statToneOk`**: Green (`28, 213, 172`)  
- **`.statToneWarn`**: Amber/orange
- **`.statToneErr`**: Red/salmon

---

## 8. Typography Hierarchy

### 8.1 Heading Levels

```css
.h1 { font-size: 28px; font-weight: 600; line-height: 1.3; }
.h2 { font-size: 20px; font-weight: 600; line-height: 1.3; }
.h3 { font-size: 16px; font-weight: 600; line-height: 1.4; }
.h4 { font-size: 14px; font-weight: 600; line-height: 1.4; }
```

**Rule**: Only one H1 per view. Use H2 as primary subdivision, H3 for grouping.

### 8.2 Body Text

```css
.body-lg { font-size: 16px; font-weight: 400; line-height: 1.5; }
.body-md { font-size: 14px; font-weight: 400; line-height: 1.5; }
.caption  { font-size: 12px; font-weight: 400; line-height: 1.4; }
```

### 8.3 Monospace (Numbers & Code)

```css
.mono { 
  font-family: 'SF Mono', 'Monaco', monospace;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.01em;
}
```

**Usage**: Large numbers, cost/budget values, timestamps, code blocks.

---

## 9. Motion & Timing

### 9.1 Standard Transitions

```css
transition: property 180ms ease;
```

- **100ms**: Micro-interactions (hover states, icon changes)
- **180ms**: Component transitions (panels sliding, dialogs appearing)
- **300ms**: Large-scale layout shifts (view changes, page transitions)
- **Never exceed 500ms**: Feels sluggish

**Easing function**: `ease` (natural deceleration)
- For entrance/exit: Consider `ease-out` (quick entrance, slow exit)
- Avoid `ease-in-out` on primary actions (feels indecisive)

### 9.2 Animation Principles

**Preserve object continuity**:
- Move, scale, or fade elements—never "pop" them
- Entry: Slide + fade in over 100–150ms
- Exit: Fade + slide out over 150–200ms

**Feedback loops**:
- User action → Progress indicator (50–100ms) → Result/confirmation (150–200ms total)
- Never leave user wondering if action registered

---

## 10. Design Guide Compliance Checklist

Before shipping any UI:

### ✅ Copy & Labels
- [ ] Each button has a clear verb ("Save project", "Upload file")
- [ ] ≤ 3 meaningful words per label
- [ ] No duplication from nearby headings
- [ ] Terms are concrete, not jargon ("Remaining votes" vs "Time commitment intensity")

### ✅ Visual Hierarchy
- [ ] Only **one** accent color visible (`--brand: #FA3356`)
- [ ] Error/destructive hues used **only** when needed  
- [ ] **One focal point** per view—not everything pops

### ✅ Typography
- [ ] ≤ 4 type sizes: 12px / 16px / 20px / 28px
- [ ] ≤ 2 weights: 400 (body) + 600 (headings)
- [ ] Large/changing numbers use monospace
- [ ] Line-height: 1.3–1.5 depending on size

### ✅ Spacing
- [ ] All margins/padding multiples of 8px
- [ ] Related items grouped with small gaps
- [ ] Unrelated sections separated with large gaps
- [ ] Icons + text align to shared baseline

### ✅ Colors (60-30-10)
- [ ] ~60% background neutrals (`#0c0c0c` family)
- [ ] ~30% text/surfaces (`#fff`, `#777`)
- [ ] ~10% brand accent (`#FA3356`)
- [ ] Red **only** for errors (`#D32F2F`)

### ✅ States & Interaction
- [ ] Empty, loading, error states are designed and shown
- [ ] Primary action flow is animated
- [ ] Transitions  complete in 100–300ms
- [ ] Object continuity maintained (no pops)

---

## 11. Implementation Examples

### 11.1 Glass Panel (Card)

```css
.panel {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: 
    radial-gradient(120% 120% at 100% 0%, 
      color-mix(in srgb, #FA3356 12%, transparent) 0%, 
      transparent 60%),
    rgba(17, 17, 17, 0.68);
  
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 18px 46px rgba(4, 6, 12, 0.42);
  
  backdrop-filter: blur(18px);
  padding: 24px;
}
```

### 11.2 Interactive Chip (Hover + Active)

```css
.chip {
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(17, 17, 17, 0.68);
  
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 10px 30px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(14px);
  
  transition: box-shadow 180ms ease, transform 180ms ease;
}

.chip:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 0 0 6px rgba(120, 190, 255, 0.12),
    0 14px 36px rgba(0, 0, 0, 0.45);
}

.chip:active {
  transform: scale(0.995);
  backdrop-filter: blur(12px);
}
```

### 11.3 Typography Setup

```tsx
// React component
export function Title({ children }) {
  return <h1 className="text-xl">{children}</h1>;
}

// CSS
.text-xl {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text);
}
```

---

## 12. Browser Support & Fallbacks

### Critical Features
- **`backdrop-filter`**: Requires `-webkit-` prefix for Safari
  ```css
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px); /* iOS Safari */
  ```

- **`color-mix()`**: Use `rgba()` fallback for older browsers
  ```css
  background: 
    rgba(250, 51, 86, 0.12),  /* Fallback */
    radial-gradient(...);     /* Enhanced */
  ```

- **Outline offset**: Not supported in some older browsers—use `box-shadow` alternative if needed

### Graceful Degradation
- Glass blur degrades to solid dark background (still readable)
- Gradients degrade to base solid color
- Transitions simply don't occur in unsupported browsers (no breakage)

---

## 13. Design System Maintenance

### Adding New Design Tokens

1. **Identify the category**: Color, spacing, typography, shadow, etc.
2. **Define in `:root` in relevant `design-tokens/*.css` file**
3. **Reference in components**: `var(--new-token-name)`
4. **Document** in this guide's "Tokens Reference" section
5. **Test across views** before merging

### Extending Taste Modes

1. Add new `TypePack` and `TasteTokens` object in `tasteModes.ts`
2. Export from `magicLayoutTypes.ts`
3. Register in `applyTasteMode()` dispatcher
4. Add preview/documentation for UX team

### Creating New Glass Variants

Define local CSS custom properties:
```css
.myGlassVariant {
  --my-glass-bg: rgba(20, 20, 20, 0.72);
  --my-glass-border: rgba(255, 255, 255, 0.14);
  --my-glass-blur: 16px;
  
  background: var(--my-glass-bg);
  border: 1px solid var(--my-glass-border);
  backdrop-filter: blur(var(--my-glass-blur));
}
```

---

## 14. Common Pit Falls & Fixes

### ❌ Opacity Stacking (Darkening too much)
```css
/* Problem: double darkening */
background: rgba(17, 17, 17, 0.68);  /* Already dark */
color: rgba(255, 255, 255, 0.6);     /* Muted text becomes illegible */
```

**Fix**: Use color-mix or higher alpha for text:
```css
background: rgba(17, 17, 17, 0.68);
color: rgba(255, 255, 255, 0.88);  /* Higher alpha = more readable */
```

### ❌ Gradient Muddiness
```css
/* Problem: too many layers, no focal point */
background:
  radial-gradient(...),
  linear-gradient(...),
  radial-gradient(...),
  image-pattern(...);
```

**Fix**: Limit to 2–3 layers; use opacity to blend:
```css
background:
  color-mix(in srgb, accent 12%, transparent),
  radial-gradient(...),
  solid-base;
```

### ❌ Glass Feeling Flat
```css
/* Problem: only blur, no depth */
backdrop-filter: blur(18px);
/* Missing: shadow, highlight, gradient */
```

**Fix**: Add layered shadows + highlights:
```css
backdrop-filter: blur(18px);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.16), /* Top light */
  0 10px 30px rgba(0, 0, 0, 0.35);         /* Depth */
```

### ❌ Motion Feeling Sluggish
```css
/* Problem: too slow or ease-in-out */
transition: all 500ms ease-in-out;
```

**Fix**: Use shorter duration + natural easing:
```css
transition: property 180ms ease;
```

---

## 15. Future Evolution

### Phase 3 Planned Enhancements
- **Density modes**: "Comfortable" (current) vs "Compact" (denser for power users)
- **Color themes**: Dark (current), light, and high-contrast variants
- **Motion preferences**: Respect `prefers-reduced-motion` media query
- **Accessibility refinements**: WCAG AAA contrast across all states

### Design Evolution
- Micro-interactions library (loading spinners, progress indicators)
- Video/media glass containers (blurred video bg + overlay)
- Dark mode + light mode support (simultaneous)

---

## References

- **Color Theory**: 60-30-10 rule (Josef Albers, traditional design)
- **Glass Morphism**: Apple's Human Interface Guidelines (iOS 7+), Neumorphism trend
- **Typography**: Scale generators (typescale.com), Van de Graaf canon
- **Motion**: Material Design 3, Framer documentation

---

## Document History

- **v1.0** (Feb 2026): Initial North Star design system documentation
  - Glass morphism patterns, taste modes, layout systems
  - 60-30-10 color system, token architecture
  - Animation & motion guidelines
