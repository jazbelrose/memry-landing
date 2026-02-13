/* ═══════════════════════════════════════════════════════════
   Hero Animation Design Tokens
   Extracted from real memry product screenshots.
   ═══════════════════════════════════════════════════════════ */

// ── Colors (from North Star Design System + screenshot audit) ──
export const C = {
  bg: '#0B0D10',
  surface: '#111316',
  card: '#181C21',
  elevated: '#1E2228',
  sidebar: '#0F1115',

  border: 'rgba(255,255,255,0.06)',
  borderCard: 'rgba(255,255,255,0.08)',
  borderActive: 'rgba(255,255,255,0.14)',

  text: '#EDEDED',
  textSec: '#8B8F96',
  textMuted: '#50555C',

  accent: '#FA3356',
  accentDim: 'rgba(250,51,86,0.12)',
  accentBg: 'rgba(250,51,86,0.06)',

  success: '#4CAF50',
  successDim: 'rgba(76,175,80,0.15)',
  teal: '#22D3A7',
  tealDim: 'rgba(34,211,167,0.10)',
  gold: '#C8A054',
  goldDim: 'rgba(200,160,84,0.12)',
  olive: '#5C6B3C',
  oliveDim: 'rgba(92,107,60,0.20)',

  white03: 'rgba(255,255,255,0.03)',
  white05: 'rgba(255,255,255,0.05)',
  white08: 'rgba(255,255,255,0.08)',

  cream: '#F8F6F0',
} as const;

// ── Typography ──
export const FONT = 'Inter, system-ui, -apple-system, sans-serif';
export const MONO = "'SF Mono', Monaco, Consolas, monospace";

// ── ViewBox dimensions ──
export const VW = 960;
export const VH = 570;
export const SB_W = 48; // sidebar width

// Content area (with 16px padding from sidebar edge)
export const CX = 64;
export const CW = 880;
export const CY = 14;
export const CH = 512;

// ── Animation ──
export const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0];

// ── Scene config ──
export const SCENES = ['slides', 'budget', 'calendar', 'hq','projects'] as const;
export type SceneId = (typeof SCENES)[number];

export const SCENE_DURATION: Record<SceneId, number> = {
  projects: 2400,
  slides: 3200,
  budget: 2600,
  calendar: 2200,
  hq: 2600,
};

// Maps each scene to its active sidebar nav index
export const SCENE_NAV: Record<SceneId, number> = {
  projects: 0,
  hq: 1,
  slides: 2,
  budget: 2,
  calendar: 3,
};

// Y-positions of sidebar nav icons (0=Layers, 1=HQ, 2=Docs, 3=Building, 4=People, 5=Chat, 6=Bell)
export const NAV_Y = [108, 148, 188, 228, 268, 316, 356];

// ── Shared animation variants ──
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.08 } },
};

export const fadeIn = {
  hidden: { opacity: 0, y: 5 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

export const fadeInSlow = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } },
};
