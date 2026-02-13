/* ═══════════════════════════════════════════════════════════
   MagicLayoutDemo — Animated SVG showing Deck Editor +
   Magic Layout modal overlay. GSAP timeline loops through
   9 states: deck view → modal open → asset selection →
   plan cycling → shuffle → pin frame → insert → modal
   close → new slide appears.
   ═══════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import { C, FONT } from './hero/tokens';
import styles from './MagicLayoutDemo.module.css';

/* ── Layout constants ───────────────────────────────────── */
const W = 1200;
const H = 700;

/* Deck editor */
const RAIL_X = 24;
const RAIL_W = 120;
const THUMB_W = 96;
const THUMB_H = 60;
const THUMB_GAP = 10;
const CANVAS_X = RAIL_X + RAIL_W + 14;
const CANVAS_Y = 58;
const CANVAS_W = W - CANVAS_X - 20;
const CANVAS_H = H - CANVAS_Y - 30;

/* Modal */
const MOD_W = 940;
const MOD_H = 560;
const MOD_X = (W - MOD_W) / 2;
const MOD_Y = (H - MOD_H) / 2;
const MOD_R = 16;

/* Modal columns */
const LEFT_W = 220;
const RIGHT_W = 200;
const CENTER_X = MOD_X + LEFT_W + 16;
const CENTER_W = MOD_W - LEFT_W - RIGHT_W - 48;
const RIGHT_X = MOD_X + MOD_W - RIGHT_W - 16;

/* Plan thumbnails (2×3 grid) */
const PLAN_COLS = 2;
const PLAN_W = 96;
const PLAN_H = 68;
const PLAN_GAP = 10;

/* Asset thumbnails (4×3 grid) */
const ASSET_COLS = 4;
const ASSET_W = 44;
const ASSET_H = 44;
const ASSET_GAP = 6;
const ASSET_COUNT = 12;

/* Frames in center preview (4 top + 3 bottom) */
const FRAME_COLS_TOP = 4;
const FRAME_COLS_BOT = 3;
const FRAME_GAP = 10;

/* ── Gradient color pairs for fake image fills ──────────── */
const FRAME_GRADIENTS = [
  ['#1a1a1a', '#2a1a1a'], // dark warm
  ['#1a1a20', '#1a2030'], // dark cool
  ['#201a1a', '#301818'], // dark maroon
  ['#1a201a', '#182818'], // dark forest
  ['#20201a', '#2a2818'], // dark amber
  ['#1a1a22', '#181830'], // dark indigo
  ['#221a20', '#301828'], // dark plum
];

/* ── Masonry layout presets (7 frames each) ─────────────── */
/* All positions are absolute SVG coords inside the center preview area.
   Area: x = CENTER_X, w = CENTER_W, y = MOD_Y+56, totalH ≈ 310 */
const FRAME_AREA_Y = MOD_Y + 56;
const FRAME_AREA_H = 310;

type FrameLayout = { x: number; y: number; w: number; h: number };

const MASONRY_LAYOUTS: FrameLayout[][] = [
  /* Preset 0 — 4 top + 3 bottom (magazine spread) */
  [
    { x: CENTER_X,       y: FRAME_AREA_Y,       w: 126, h: 160 },
    { x: CENTER_X + 136, y: FRAME_AREA_Y,       w: 98,  h: 160 },
    { x: CENTER_X + 244, y: FRAME_AREA_Y,       w: 98,  h: 160 },
    { x: CENTER_X + 352, y: FRAME_AREA_Y,       w: 120, h: 160 },
    { x: CENTER_X,       y: FRAME_AREA_Y + 170, w: 150, h: 140 },
    { x: CENTER_X + 160, y: FRAME_AREA_Y + 170, w: 152, h: 140 },
    { x: CENTER_X + 322, y: FRAME_AREA_Y + 170, w: 150, h: 140 },
  ],
  /* Preset 1 — 3-column masonry (varying heights) */
  [
    { x: CENTER_X,       y: FRAME_AREA_Y,       w: 150, h: 200 },
    { x: CENTER_X,       y: FRAME_AREA_Y + 210, w: 150, h: 100 },
    { x: CENTER_X + 160, y: FRAME_AREA_Y,       w: 152, h: 130 },
    { x: CENTER_X + 160, y: FRAME_AREA_Y + 140, w: 152, h: 170 },
    { x: CENTER_X + 322, y: FRAME_AREA_Y,       w: 150, h: 95  },
    { x: CENTER_X + 322, y: FRAME_AREA_Y + 105, w: 150, h: 100 },
    { x: CENTER_X + 322, y: FRAME_AREA_Y + 215, w: 150, h: 95  },
  ],
  /* Preset 2 — Hero left + 2×3 grid right */
  [
    { x: CENTER_X,       y: FRAME_AREA_Y,       w: 220, h: 310 },
    { x: CENTER_X + 230, y: FRAME_AREA_Y,       w: 116, h: 97  },
    { x: CENTER_X + 356, y: FRAME_AREA_Y,       w: 116, h: 97  },
    { x: CENTER_X + 230, y: FRAME_AREA_Y + 107, w: 116, h: 96  },
    { x: CENTER_X + 356, y: FRAME_AREA_Y + 107, w: 116, h: 96  },
    { x: CENTER_X + 230, y: FRAME_AREA_Y + 213, w: 116, h: 97  },
    { x: CENTER_X + 356, y: FRAME_AREA_Y + 213, w: 116, h: 97  },
  ],
  /* Preset 3 — 3 top + 4 bottom (gallery grid) */
  [
    { x: CENTER_X,       y: FRAME_AREA_Y,       w: 150, h: 150 },
    { x: CENTER_X + 160, y: FRAME_AREA_Y,       w: 152, h: 150 },
    { x: CENTER_X + 322, y: FRAME_AREA_Y,       w: 150, h: 150 },
    { x: CENTER_X,       y: FRAME_AREA_Y + 160, w: 111, h: 150 },
    { x: CENTER_X + 121, y: FRAME_AREA_Y + 160, w: 110, h: 150 },
    { x: CENTER_X + 241, y: FRAME_AREA_Y + 160, w: 110, h: 150 },
    { x: CENTER_X + 361, y: FRAME_AREA_Y + 160, w: 111, h: 150 },
  ],
];

export function MagicLayoutDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      // Show static state: modal open, all checks visible
      const svg = svgRef.current;
      if (!svg) return;
      const modal = svg.querySelector('#modalView') as SVGGElement;
      if (modal) modal.style.opacity = '1';
      for (let i = 1; i <= ASSET_COUNT; i++) {
        const check = svg.querySelector(`#assetCheck${i}`) as SVGGElement;
        if (check) check.style.opacity = '1';
      }
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        if (cancelled) return;
        const gsap = gsapMod.gsap ?? gsapMod.default;
        const svg = svgRef.current;
        if (!svg) return;

        ctx = gsap.context(() => {
          /* query helpers */
          const q = (id: string) => svg.querySelector(`#${id}`);
          const frames = Array.from({ length: 7 }, (_, i) => q(`frame${i + 1}`)).filter(Boolean);
          const checks = Array.from({ length: ASSET_COUNT }, (_, i) => q(`assetCheck${i + 1}`)).filter(Boolean);
          const frameRects = Array.from({ length: 7 }, (_, i) => q(`frameRect${i + 1}`)).filter(Boolean);
          const frameHandles = Array.from({ length: 7 }, (_, i) => q(`frameHandle${i + 1}`)).filter(Boolean);

          /* plan highlight: compute CSS-transform deltas from SVG attribute position */
          const hlRect = q('planHighlight') as SVGRectElement | null;
          const hlBaseX = hlRect ? parseFloat(hlRect.getAttribute('x') || '0') : 0;
          const hlBaseY = hlRect ? parseFloat(hlRect.getAttribute('y') || '0') : 0;

          const planPositions = Array.from({ length: 6 }, (_, i) => {
            const col = i % PLAN_COLS;
            const row = Math.floor(i / PLAN_COLS);
            return {
              x: MOD_X + 16 + col * (PLAN_W + PLAN_GAP),
              y: MOD_Y + 60 + row * (PLAN_H + PLAN_GAP),
            };
          });

          /* CSS transform deltas for planHighlight (offset from its SVG x/y) */
          const planDeltas = planPositions.map(p => ({
            x: p.x - hlBaseX,
            y: p.y - hlBaseY,
          }));

          const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, defaults: { ease: 'power2.inOut' } });
          tlRef.current = tl;

          /* ── 1 — Show deck, hide modal, reset everything ── */
          tl.addLabel('showDeck')
            .set('#modalView', { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' })
            .set('#deckNewSlide', { opacity: 0, scale: 0.8, y: 12, transformOrigin: '50% 50%' })
            .set('#canvasOldContent', { opacity: 1 })
            .set('#canvasNewLayout', { opacity: 0 })
            .set(checks, { opacity: 0, scale: 0 })
            .set('#framePin', { opacity: 0, scale: 0.5 })
            .set('#pulseRing', { opacity: 0, scale: 0 })
            .set('#planHighlight', { x: planDeltas[0].x, y: planDeltas[0].y });
          /* Reset frame rects to preset 0 (initial masonry layout) */
          frameRects.forEach((rect, i) => {
            const base = MASONRY_LAYOUTS[0][i];
            tl.set(rect, { attr: { x: base.x, y: base.y, width: base.w, height: base.h } });
          });
          frameHandles.forEach((handle, i) => {
            const base = MASONRY_LAYOUTS[0][i];
            tl.set(handle, { attr: { cx: base.x + base.w, cy: base.y + base.h } });
          });
          tl.to({}, { duration: 1.0 });

          /* ── 2 — Modal opens ── */
          tl.addLabel('openModal')
            .to('#modalView', {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.2)',
            });

          /* ── 3 — Asset checkmarks pop in ── */
          tl.addLabel('checkAssets')
            .to(checks, {
              opacity: 1,
              scale: 1,
              duration: 0.15,
              stagger: 0.04,
              ease: 'back.out(2)',
            });

          /* ── Helper: animate shuffle to a masonry layout preset ── */
          const shuffleTo = (presetIdx: number, label: string) => {
            const preset = MASONRY_LAYOUTS[presetIdx];
            tl.addLabel(label)
              /* Button compress */
              .to('#btnShuffleBg', {
                scaleX: 0.92,
                scaleY: 0.95,
                transformOrigin: '50% 50%',
                duration: 0.12,
                ease: 'power2.in',
              })
              .to('#btnShuffleBg', {
                scaleX: 1,
                scaleY: 1,
                duration: 0.15,
                ease: 'back.out(2)',
              });

            /* Animate frame rects to new positions/sizes (staggered cascade) */
            frameRects.forEach((rect, i) => {
              tl.to(rect, {
                attr: { x: preset[i].x, y: preset[i].y, width: preset[i].w, height: preset[i].h },
                duration: 0.5,
                ease: 'power2.inOut',
              }, label + `+=${(0.3 + i * 0.04).toFixed(2)}`);
            });

            /* Animate resize handles alongside */
            frameHandles.forEach((handle, i) => {
              tl.to(handle, {
                attr: { cx: preset[i].x + preset[i].w, cy: preset[i].y + preset[i].h },
                duration: 0.5,
                ease: 'power2.inOut',
              }, label + `+=${(0.3 + i * 0.04).toFixed(2)}`);
            });

            /* Brief hold to appreciate the layout */
            tl.to({}, { duration: 0.4 });
          };

          /* ── 4 — 3 Shuffles (plan highlight stays on plan 0) ── */

          /* Shuffle 1: preset 0 → preset 1 (3-column masonry) */
          shuffleTo(1, 'shuffle1');

          /* Shuffle 2: preset 1 → preset 2 (hero left + grid) */
          shuffleTo(2, 'shuffle2');

          /* Shuffle 3: preset 2 → preset 3 (gallery grid — final) */
          shuffleTo(3, 'shuffle3');

          /* ── 6 — Pin badge fades in on frame1 ── */
          tl.addLabel('pinFrame')
            .to('#framePin', {
              opacity: 1,
              scale: 1,
              duration: 0.35,
              ease: 'back.out(2)',
            });

          /* ── 7 — Insert press with pulse ring ── */
          tl.addLabel('insert')
            .to('#btnInsertBg', {
              scaleX: 0.93,
              scaleY: 0.94,
              transformOrigin: '50% 50%',
              duration: 0.12,
              ease: 'power2.in',
            })
            .to('#btnInsertBg', {
              scaleX: 1,
              scaleY: 1,
              duration: 0.15,
              ease: 'back.out(2)',
            })
            .to('#pulseRing', {
              opacity: 0.6,
              scale: 1,
              duration: 0.1,
            }, '-=0.15')
            .to('#pulseRing', {
              opacity: 0,
              scale: 2.5,
              duration: 0.5,
              ease: 'power2.out',
            });

          /* ── 8 — Modal closes ── */
          tl.addLabel('closeModal')
            .to('#modalView', {
              opacity: 0,
              scale: 0.95,
              duration: 0.4,
              ease: 'power2.in',
            });

          /* 9 — New slide pops in on deck + canvas shows layout */
          tl.addLabel('newSlide')
            /* Fade out old canvas content, fade in masonry grid */
            .to('#canvasOldContent', {
              opacity: 0,
              duration: 0.35,
              ease: 'power2.in',
            }, 'newSlide')
            .to('#canvasNewLayout', {
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
            }, 'newSlide+=0.2')
            /* Thumbnail pops in alongside */
            .to('#deckNewSlide', {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.45,
              ease: 'back.out(1.5)',
            }, 'newSlide+=0.1')
            /* Hold to let user appreciate the result */
            .to({}, { duration: 1.0 })
            /* Fade both out before loop restart */
            .to('#deckNewSlide', {
              opacity: 0,
              duration: 0.5,
            })
            .to('#canvasNewLayout', {
              opacity: 0,
              duration: 0.4,
            }, '<')
            .to('#canvasOldContent', {
              opacity: 1,
              duration: 0.4,
            }, '<+=0.1');
        }, svg);
      } catch {
        /* GSAP import failed — show static */
        const svg = svgRef.current;
        if (!svg) return;
        const modal = svg.querySelector('#modalView') as SVGGElement;
        if (modal) modal.style.opacity = '1';
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      tlRef.current = null;
    };
  }, []);

  const handleMouseEnter = () => tlRef.current?.pause();
  const handleMouseLeave = () => tlRef.current?.resume();

  /* ──────────────────────────────────────────────────────
     SVG RENDER
     ────────────────────────────────────────────────────── */

  /* Helper: Plan thumbnail content (small rects simulating images) */
  const renderPlanThumb = (idx: number) => {
    const col = idx % PLAN_COLS;
    const row = Math.floor(idx / PLAN_COLS);
    const px = MOD_X + 16 + col * (PLAN_W + PLAN_GAP);
    const py = MOD_Y + 60 + row * (PLAN_H + PLAN_GAP);
    return (
      <g key={idx} id={`plan${idx + 1}`}>
        <rect
          x={px} y={py} width={PLAN_W} height={PLAN_H} rx={6}
          fill={C.card} stroke={C.border} strokeWidth={0.5}
        />
        {/* Mini image placeholders inside plan thumb (2×2 grid) */}
        {[0, 1, 2, 3].map((j) => {
          const cx = px + 6 + (j % 2) * 22;
          const cy = py + 6 + Math.floor(j / 2) * 16;
          return (
            <rect key={j} x={cx} y={cy} width={18} height={12} rx={2}
              fill={C.white08}
            />
          );
        })}
        {/* Tiny AIZO-like text squiggle */}
        <rect x={px + 56} y={py + 10} width={30} height={8} rx={2} fill={C.white05} />
        <rect x={px + 56} y={py + 24} width={24} height={6} rx={1.5} fill={C.white03} />
        {/* Plan label */}
        <text x={px + 4} y={py + PLAN_H + 12} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          Plan {idx + 1}
        </text>
        {/* Frames count badge */}
        <text x={px + 48} y={py + PLAN_H + 12} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
          7 frames
        </text>
        {/* Close X on plan */}
        <text x={px + PLAN_W - 12} y={py + PLAN_H + 12} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          ✕
        </text>
      </g>
    );
  };

  /* Helper: Asset thumbnail */
  const renderAssetThumb = (idx: number) => {
    const col = idx % ASSET_COLS;
    const row = Math.floor(idx / ASSET_COLS);
    const assetBlockY = MOD_Y + 60 + 3 * (PLAN_H + PLAN_GAP) + 50;
    const ax = MOD_X + 16 + col * (ASSET_W + ASSET_GAP);
    const ay = assetBlockY + row * (ASSET_H + ASSET_GAP);
    const gradId = `assetGrad${idx}`;
    const hue = (idx * 37 + 10) % 360;
    return (
      <g key={idx}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={`hsl(${hue}, 8%, 14%)`} />
            <stop offset="100%" stopColor={`hsl(${hue}, 12%, 20%)`} />
          </linearGradient>
        </defs>
        <rect id={`asset${idx + 1}`} x={ax} y={ay} width={ASSET_W} height={ASSET_H} rx={4}
          fill={`url(#${gradId})`} stroke={C.border} strokeWidth={0.5}
        />
        {/* Checkmark overlay — initially hidden */}
        <g id={`assetCheck${idx + 1}`} style={{ opacity: 0 }}>
          <circle cx={ax + ASSET_W - 6} cy={ay + 6} r={6} fill={C.accent} />
          <polyline
            points={`${ax + ASSET_W - 10},${ay + 6} ${ax + ASSET_W - 7},${ay + 9} ${ax + ASSET_W - 3},${ay + 3}`}
            fill="none" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
          />
        </g>
      </g>
    );
  };

  /* Helper: Center preview frames — uses MASONRY_LAYOUTS[0] as initial positions */
  const renderFrames = () => {
    const layout = MASONRY_LAYOUTS[0];

    return layout.map((f, i) => {
      const [c1, c2] = FRAME_GRADIENTS[i] || FRAME_GRADIENTS[0];
      const gradId = `frameGrad${i}`;
      return (
        <g key={i} id={`frame${i + 1}`}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={c1} />
              <stop offset="100%" stopColor={c2} />
            </linearGradient>
          </defs>
          <rect
            id={`frameRect${i + 1}`}
            x={f.x} y={f.y} width={f.w} height={f.h} rx={8}
            fill={`url(#${gradId})`}
            stroke={C.borderCard}
            strokeWidth={0.5}
          />

          {/* Resize handle dot (bottom-right) */}
          <circle id={`frameHandle${i + 1}`} cx={f.x + f.w} cy={f.y + f.h} r={3} fill={C.accent} opacity={0.4} />
        </g>
      );
    });
  };

  /* Helper: Right settings column */
  const renderSettings = () => {
    const sx = RIGHT_X;
    const sy = MOD_Y + 48;
    const rowH = 38;
    const inputW = 72;
    const inputH = 26;

    const settings = [
      { label: 'FRAMES', value: '7' },
      { label: 'MODE', value: 'Grid', hasDropdown: true },
      { label: 'STYLE', value: 'Apple Clean', hasDropdown: true },
      { label: 'SLIDES', value: '1' },
      { label: 'SPACING', value: '24', hasAuto: true },
      { label: 'RADIUS', value: '16', hasAuto: true },
    ];

    return (
      <g>
        {/* Section header */}
        <text x={sx} y={sy} fill={C.textSec} fontSize={9} fontWeight={600} fontFamily={FONT}
          letterSpacing="0.06em">
          PLAN SETTINGS
        </text>
        <text x={sx} y={sy + 14} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          Plan 1 · 1 slide · Grid
        </text>

        {/* Settings rows - 2 column layout for first 2 rows */}
        {settings.map((s, i) => {
          const isLeftCol = i % 2 === 0;
          const rowIdx = Math.floor(i / 2);
          const rx = sx + (isLeftCol ? 0 : inputW + 12);
          const ry = sy + 32 + rowIdx * rowH;

          return (
            <g key={i}>
              <text x={rx} y={ry} fill={C.textMuted} fontSize={7} fontFamily={FONT}>{s.label}</text>
              <rect x={rx} y={ry + 4} width={inputW} height={inputH} rx={6}
                fill={C.surface} stroke={C.border} strokeWidth={0.5}
              />
              <text x={rx + 8} y={ry + 20} fill={C.text} fontSize={9} fontFamily={FONT}>
                {s.value}
              </text>
              {s.hasDropdown && (
                <text x={rx + inputW - 14} y={ry + 21} fill={C.textMuted} fontSize={8} fontFamily={FONT}>▾</text>
              )}
              {s.hasAuto && (
                <rect x={rx} y={ry + 4} width={36} height={inputH} rx={6}
                  fill={C.accentDim} stroke="none"
                />
              )}
              {s.hasAuto && (
                <text x={rx + 8} y={ry + 20} fill={C.accent} fontSize={7} fontWeight={600} fontFamily={FONT}>AUTO</text>
              )}
            </g>
          );
        })}

        {/* Regenerate Layout button */}
        <rect x={sx} y={sy + 160} width={RIGHT_W - 8} height={30} rx={8}
          fill="none" stroke={C.accent} strokeWidth={1} />
        <text x={sx + (RIGHT_W - 8) / 2} y={sy + 179} textAnchor="middle"
          fill={C.accent} fontSize={9} fontWeight={500} fontFamily={FONT}>
          ✦ Regenerate Layout
        </text>

        {/* Shuffle Layout button */}
        <rect x={sx} y={sy + 198} width={RIGHT_W - 8} height={30} rx={8}
          fill="none" stroke={C.borderCard} strokeWidth={1} />
        <text x={sx + (RIGHT_W - 8) / 2} y={sy + 217} textAnchor="middle"
          fill={C.textSec} fontSize={9} fontWeight={500} fontFamily={FONT}>
          ✕ Shuffle Layout
        </text>

        {/* TEXT BLOCKS section */}
        <text x={sx} y={sy + 252} fill={C.textSec} fontSize={9} fontWeight={600} fontFamily={FONT}
          letterSpacing="0.04em">
          TEXT BLOCKS · SLIDE 1
        </text>

        {/* Style chips */}
        {['Editorial', 'Minimal', 'Caption-heavy', 'Quote-focused'].map((chip, i) => {
          const cx = sx + i * 48;
          const cy = sy + 262;
          const isActive = i === 0;
          return (
            <g key={i}>
              <rect x={cx} y={cy} width={44} height={20} rx={4}
                fill={isActive ? C.accentDim : C.surface}
                stroke={isActive ? C.accent : C.border}
                strokeWidth={0.5}
              />
              <text x={cx + 22} y={cy + 13} textAnchor="middle"
                fill={isActive ? C.accent : C.textMuted} fontSize={6} fontFamily={FONT}>
                {chip}
              </text>
            </g>
          );
        })}

        {/* Textblocks: 0 */}
        <text x={sx} y={sy + 300} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          Textblocks: 0
        </text>
        <text x={sx + RIGHT_W - 50} y={sy + 300} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
          (0 locked)
        </text>

        {/* + Add Text Block */}
        <rect x={sx} y={sy + 310} width={RIGHT_W - 8} height={26} rx={6}
          fill="none" stroke={C.border} strokeWidth={1} strokeDasharray="4 2" />
        <text x={sx + (RIGHT_W - 8) / 2} y={sy + 327} textAnchor="middle"
          fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          + Add Text Block
        </text>
      </g>
    );
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Magic Layout feature demonstration"
        role="img"
      >
        {/* ── Global defs ───────────────────────────────── */}
        <defs>
          {/* Deck canvas gradient */}
          <linearGradient id="mlDeckGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D0F12" />
            <stop offset="100%" stopColor="#111418" />
          </linearGradient>
          {/* Modal frosted glass gradient */}
          <linearGradient id="mlModalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#151820" />
            <stop offset="100%" stopColor="#111316" />
          </linearGradient>
          {/* Noise filter for glass texture */}
          <filter id="mlNoise" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" />
          </filter>
          {/* Shadow for modal */}
          <filter id="mlShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="24" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ═══════════════════════════════════════════════
            STATE A — Deck Editor (#deckView)
            ═══════════════════════════════════════════════ */}
        <g id="deckView">
          {/* Background */}
          <rect width={W} height={H} fill={C.bg} rx={12} />

          {/* ── Left sidebar icons ── */}
          <rect x={0} y={0} width={40} height={H} fill={C.sidebar} />
          {/* Nav icons (small circles) */}
          {[60, 100, 140, 180, 220, 270, 310].map((yy, i) => (
            <circle key={i} cx={20} cy={yy} r={10}
              fill={i === 2 ? C.accentDim : C.white05}
              stroke={i === 2 ? C.accent : 'none'}
              strokeWidth={i === 2 ? 0.5 : 0}
            />
          ))}
          {/* Active icon highlight */}
          <rect x={0} y={130} width={3} height={20} rx={1.5} fill={C.accent} />

          {/* ── Project header ── */}
          <text x={RAIL_X + 30} y={28} fill={C.text} fontSize={12} fontWeight={600} fontFamily={FONT}>
            LA Awards Week Gala
          </text>
          {/* Crown emoji */}
          <text x={RAIL_X + 10} y={29} fill={C.gold} fontSize={12} fontFamily={FONT}>👑</text>

          {/* ── Toolbar ── */}
          <rect x={CANVAS_X} y={30} width={CANVAS_W} height={24} rx={4}
            fill={C.surface} stroke={C.border} strokeWidth={0.5} />
          {[0, 24, 48, 72, 96].map((off, i) => (
            <rect key={i} x={CANVAS_X + 8 + off} y={34} width={18} height={16} rx={4} fill={C.white05} />
          ))}
          <text x={CANVAS_X + 200} y={45} fill={C.textSec} fontSize={8} fontFamily={FONT}>Insert</text>
          <text x={CANVAS_X + CANVAS_W - 80} y={45} fill={C.textMuted} fontSize={8} fontFamily={FONT}>✏ Editing</text>
          <text x={CANVAS_X + CANVAS_W - 42} y={45} fill={C.textSec} fontSize={8} fontFamily={FONT}>Main</text>
          <text x={CANVAS_X + CANVAS_W - 8} y={45} fill={C.success} fontSize={8} fontFamily={FONT} textAnchor="end">Saved</text>

          {/* ── Slide thumbnail rail ── */}
          {[0, 1, 2, 3, 4].map((i) => {
            const ty = CANVAS_Y + 10 + i * (THUMB_H + THUMB_GAP);
            const isActive = i === 0;
            return (
              <g key={i}>
                {/* Slide number */}
                <text x={RAIL_X + 2} y={ty + 10} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
                  {String(i + 1).padStart(2, '0')}
                </text>
                {/* Thumbnail */}
                <rect
                  x={RAIL_X + 18} y={ty} width={THUMB_W} height={THUMB_H} rx={4}
                  fill={isActive ? '#0D0F12' : C.card}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth={isActive ? 1.5 : 0.5}
                />
                {isActive ? (
                  <>
                    <text x={RAIL_X + 26} y={ty + 16} fill={C.textMuted} fontSize={4} fontFamily={FONT} letterSpacing="0.1em">CASE STUDY</text>
                    <text x={RAIL_X + 26} y={ty + 27} fill={C.cream} fontSize={8} fontWeight={700} fontFamily={FONT}>Awards</text>
                    <text x={RAIL_X + 26} y={ty + 37} fill={C.cream} fontSize={8} fontWeight={700} fontFamily={FONT}>Week</text>
                    <text x={RAIL_X + 26} y={ty + 47} fill={C.cream} fontSize={8} fontWeight={700} fontFamily={FONT}>Gala</text>
                    <circle cx={RAIL_X + 56} cy={ty + 46} r={1.5} fill={C.accent} />
                  </>
                ) : (
                  <>
                    <rect x={RAIL_X + 26} y={ty + 12} width={THUMB_W - 20} height={4} rx={2} fill={C.white05} />
                    <rect x={RAIL_X + 26} y={ty + 20} width={THUMB_W - 28} height={4} rx={2} fill={C.white05} />
                    <rect x={RAIL_X + 26} y={ty + 32} width={40} height={3} rx={1.5} fill={C.white05} />
                  </>
                )}
                {/* 3-dot menu */}
                {[0, 4, 8].map((dy) => (
                  <circle key={dy} cx={RAIL_X + THUMB_W + 22} cy={ty + THUMB_H / 2 - 4 + dy} r={1} fill={C.textMuted} opacity={0.3} />
                ))}
              </g>
            );
          })}

          {/* ── Hidden 6th slide (new slide) ── */}
          <g id="deckNewSlide" style={{ opacity: 0 }}>
            {(() => {
              const ty = CANVAS_Y + 10 + 5 * (THUMB_H + THUMB_GAP);
              const pad = 4;
              const thumbInnerW = THUMB_W - 2 * pad;
              const thumbInnerH = THUMB_H - 2 * pad;
              const thumbOriginX = RAIL_X + 18 + pad;
              const thumbOriginY = ty + pad;
              return (
                <>
                  <text x={RAIL_X + 2} y={ty + 10} fill={C.textMuted} fontSize={8} fontFamily={FONT}>06</text>
                  <rect x={RAIL_X + 18} y={ty} width={THUMB_W} height={THUMB_H} rx={4}
                    fill={C.card} stroke={C.accent} strokeWidth={1.5}
                  />
                  {/* Miniature grid matching final layout (preset 3 — gallery grid) */}
                  {MASONRY_LAYOUTS[3].map((frame, j) => {
                    const rx = thumbOriginX + ((frame.x - CENTER_X) / CENTER_W) * thumbInnerW;
                    const ry = thumbOriginY + ((frame.y - FRAME_AREA_Y) / FRAME_AREA_H) * thumbInnerH;
                    const rw = (frame.w / CENTER_W) * thumbInnerW;
                    const rh = (frame.h / FRAME_AREA_H) * thumbInnerH;
                    return (
                      <rect key={j} x={rx} y={ry} width={rw} height={rh} rx={1.5}
                        fill={C.white08} />
                    );
                  })}
                  {/* NEW badge */}
                  <rect x={RAIL_X + 78} y={ty + 42} width={28} height={13} rx={3} fill={C.accentDim} />
                  <text x={RAIL_X + 83} y={ty + 52} fill={C.accent} fontSize={7} fontWeight={600} fontFamily={FONT}>NEW</text>
                </>
              );
            })()}
          </g>

          {/* ── Main canvas area ── */}
          <rect x={CANVAS_X} y={CANVAS_Y} width={CANVAS_W} height={CANVAS_H} rx={6}
            fill="url(#mlDeckGrad)" stroke={C.border} strokeWidth={0.5}
          />
          {/* Canvas content — large title card (fades out on insert) */}
          <g id="canvasOldContent">
            <text x={CANVAS_X + 30} y={CANVAS_Y + 30} fill={C.textMuted} fontSize={9} fontFamily={FONT} letterSpacing="0.12em">
              CASE STUDY
            </text>
            <text x={CANVAS_X + 30} y={CANVAS_Y + 120} fill={C.cream} fontSize={56} fontWeight={800} fontFamily={FONT} letterSpacing="-0.03em">
              Awards
            </text>
            <text x={CANVAS_X + 30} y={CANVAS_Y + 190} fill={C.cream} fontSize={56} fontWeight={800} fontFamily={FONT} letterSpacing="-0.03em">
              Week
            </text>
            <text x={CANVAS_X + 30} y={CANVAS_Y + 260} fill={C.cream} fontSize={56} fontWeight={800} fontFamily={FONT} letterSpacing="-0.03em">
              Gala
            </text>
            <circle cx={CANVAS_X + 202} cy={CANVAS_Y + 258} r={5} fill={C.accent} />

            {/* Subtitle block */}
            <rect x={CANVAS_X + CANVAS_W - 240} y={CANVAS_Y + 290} width={2} height={50} rx={1} fill={C.textMuted} opacity={0.5} />
            <text x={CANVAS_X + CANVAS_W - 230} y={CANVAS_Y + 305} fill={C.textSec} fontSize={9} fontFamily={FONT}>
              Fictional event scenario
            </text>
            <text x={CANVAS_X + CANVAS_W - 230} y={CANVAS_Y + 319} fill={C.textSec} fontSize={9} fontFamily={FONT}>
              Los Angeles · May 11–17, 2026
            </text>
            <text x={CANVAS_X + CANVAS_W - 230} y={CANVAS_Y + 333} fill={C.textSec} fontSize={9} fontFamily={FONT}>
              $250K Production
            </text>
          </g>

          {/* Canvas layout — masonry grid matching final preset, appears after insert */}
          <g id="canvasNewLayout" style={{ opacity: 0 }}>
            {(() => {
              const pad = 16;
              const innerW = CANVAS_W - pad * 2;
              const innerH = CANVAS_H - 22 - pad * 2; /* subtract speaker notes bar */
              const scaleX = innerW / CENTER_W;
              const scaleY = innerH / FRAME_AREA_H;
              return MASONRY_LAYOUTS[3].map((frame, j) => {
                const rx = CANVAS_X + pad + (frame.x - CENTER_X) * scaleX;
                const ry = CANVAS_Y + pad + (frame.y - FRAME_AREA_Y) * scaleY;
                const rw = frame.w * scaleX;
                const rh = frame.h * scaleY;
                const [c1, c2] = FRAME_GRADIENTS[j] || FRAME_GRADIENTS[0];
                const gid = `canvasFrameGrad${j}`;
                return (
                  <g key={j}>
                    <defs>
                      <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={c1} />
                        <stop offset="100%" stopColor={c2} />
                      </linearGradient>
                    </defs>
                    <rect x={rx} y={ry} width={rw} height={rh} rx={6}
                      fill={`url(#${gid})`} stroke={C.borderCard} strokeWidth={0.5} />
                  </g>
                );
              });
            })()}
          </g>

          {/* REV badge */}
          <rect x={CANVAS_X + CANVAS_W - 60} y={CANVAS_Y + 6} width={50} height={18} rx={4} fill={C.accentDim} />
          <text x={CANVAS_X + CANVAS_W - 46} y={CANVAS_Y + 18} fill={C.accent} fontSize={8} fontWeight={600} fontFamily={FONT}>REV 1</text>

          {/* Speaker Notes bar */}
          <rect x={CANVAS_X} y={CANVAS_Y + CANVAS_H - 22} width={CANVAS_W} height={22} rx={0}
            fill={C.surface} stroke={C.border} strokeWidth={0.5} />
          <text x={CANVAS_X + CANVAS_W / 2} y={CANVAS_Y + CANVAS_H - 8}
            fill={C.textMuted} fontSize={8} fontFamily={FONT} textAnchor="middle">
            ▪ Speaker Notes
          </text>
        </g>

        {/* ═══════════════════════════════════════════════
            STATE B — Magic Layout Modal (#modalView)
            ═══════════════════════════════════════════════ */}
        <g id="modalView" style={{ opacity: 0 }}>
          {/* Backdrop dim */}
          <rect width={W} height={H} fill="rgba(0,0,0,0.5)" rx={12} />

          {/* Modal card */}
          <rect
            x={MOD_X} y={MOD_Y} width={MOD_W} height={MOD_H} rx={MOD_R}
            fill="url(#mlModalGrad)" filter="url(#mlShadow)"
            stroke={C.borderCard} strokeWidth={1}
          />
          {/* Top highlight line (glass morphism) */}
          <line x1={MOD_X + MOD_R} y1={MOD_Y + 0.5} x2={MOD_X + MOD_W - MOD_R} y2={MOD_Y + 0.5}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1}
          />

          {/* ── Modal header ── */}
          <circle cx={MOD_X + 22} cy={MOD_Y + 22} r={12} fill={C.accentDim} />
          <text x={MOD_X + 22} y={MOD_Y + 26} textAnchor="middle" fill={C.accent} fontSize={10} fontFamily={FONT}>✦</text>
          <text x={MOD_X + 40} y={MOD_Y + 20} fill={C.text} fontSize={12} fontWeight={600} fontFamily={FONT}>
            Magic Layout
          </text>
          <text x={MOD_X + 40} y={MOD_Y + 33} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
            Create beautiful slide layouts with AI assistance
          </text>
          {/* Close button */}
          <circle cx={MOD_X + MOD_W - 22} cy={MOD_Y + 22} r={12}
            fill={C.white05} stroke={C.border} strokeWidth={0.5} />
          <text x={MOD_X + MOD_W - 22} y={MOD_Y + 26} textAnchor="middle"
            fill={C.textMuted} fontSize={12} fontFamily={FONT}>×</text>

          {/* ── LEFT COLUMN ── */}
          {/* PLANS section header */}
          <text x={MOD_X + 16} y={MOD_Y + 55} fill={C.textSec} fontSize={9} fontWeight={600} fontFamily={FONT}
            letterSpacing="0.06em">
            PLANS
          </text>
          <rect x={MOD_X + 58} y={MOD_Y + 45} width={16} height={14} rx={4} fill={C.accentDim} />
          <text x={MOD_X + 62} y={MOD_Y + 55} fill={C.accent} fontSize={8} fontFamily={FONT}>6</text>

          {/* Plan thumbnails */}
          {Array.from({ length: 6 }, (_, i) => renderPlanThumb(i))}

          {/* Plan highlight (moves during animation) */}
          <rect
            id="planHighlight"
            x={MOD_X + 16} y={MOD_Y + 60}
            width={PLAN_W} height={PLAN_H} rx={6}
            fill="none" stroke={C.accent} strokeWidth={2}
            style={{ pointerEvents: 'none' }}
          />

          {/* ASSETS section header */}
          {(() => {
            const assetHeaderY = MOD_Y + 60 + 3 * (PLAN_H + PLAN_GAP) + 30;
            return (
              <>
                <text x={MOD_X + 16} y={assetHeaderY} fill={C.textSec} fontSize={9} fontWeight={600} fontFamily={FONT}
                  letterSpacing="0.06em">
                  ASSETS
                </text>
                <rect x={MOD_X + 68} y={assetHeaderY - 10} width={18} height={14} rx={4} fill={C.accentDim} />
                <text x={MOD_X + 71} y={assetHeaderY} fill={C.accent} fontSize={8} fontFamily={FONT}>18</text>
              </>
            );
          })()}

          {/* Asset thumbnails */}
          {Array.from({ length: ASSET_COUNT }, (_, i) => renderAssetThumb(i))}

          {/* 18 selected chip */}
          {(() => {
            const chipY = MOD_Y + 60 + 3 * (PLAN_H + PLAN_GAP) + 50 + 3 * (ASSET_H + ASSET_GAP) + 8;
            return (
              <g>
                <rect x={MOD_X + 16} y={chipY} width={80} height={20} rx={6}
                  fill={C.accentDim} stroke={C.accent} strokeWidth={0.5} />
                <text x={MOD_X + 28} y={chipY + 14} fill={C.accent} fontSize={8} fontWeight={500} fontFamily={FONT}>
                  18 selected
                </text>
              </g>
            );
          })()}

          {/* ── CENTER PREVIEW ── */}
          {renderFrames()}

          {/* Frame pin badge (initially hidden) */}
          {(() => {
            const f1x = CENTER_X;
            const f1y = MOD_Y + 56;
            return (
              <g id="framePin" style={{ opacity: 0 }}>
                <rect x={f1x + 4} y={f1y + 4} width={32} height={18} rx={4}
                  fill={C.accent} />
                <text x={f1x + 10} y={f1y + 16} fill="#fff" fontSize={7} fontWeight={600} fontFamily={FONT}>
                  📌 PIN
                </text>
              </g>
            );
          })()}

          {/* ── RIGHT SETTINGS COLUMN ── */}
          {renderSettings()}

          {/* ── BOTTOM BAR — Shuffle + Insert Slides ── */}
          {(() => {
            const barY = MOD_Y + MOD_H - 50;
            const btnW = 110;
            const btnH = 32;
            return (
              <g>
                {/* Shuffle button */}
                <g id="btnShuffle">
                  <rect
                    id="btnShuffleBg"
                    x={MOD_X + MOD_W - 250} y={barY}
                    width={btnW} height={btnH} rx={8}
                    fill="none" stroke={C.borderCard} strokeWidth={1}
                  />
                  <text
                    x={MOD_X + MOD_W - 250 + btnW / 2} y={barY + 21}
                    textAnchor="middle" fill={C.textSec} fontSize={10} fontWeight={500} fontFamily={FONT}>
                    ✕ Shuffle
                  </text>
                </g>

                {/* Insert Slides button (primary) */}
                <g id="btnInsert">
                  <rect
                    id="btnInsertBg"
                    x={MOD_X + MOD_W - 130} y={barY}
                    width={btnW} height={btnH} rx={8}
                    fill={C.accent}
                  />
                  <text
                    x={MOD_X + MOD_W - 130 + btnW / 2} y={barY + 21}
                    textAnchor="middle" fill="#fff" fontSize={10} fontWeight={600} fontFamily={FONT}>
                    ✦ Insert Slides
                  </text>
                  {/* Pulse ring (centered on Insert button) */}
                  <circle
                    id="pulseRing"
                    cx={MOD_X + MOD_W - 130 + btnW / 2}
                    cy={barY + btnH / 2}
                    r={20}
                    fill="none" stroke={C.accent} strokeWidth={2}
                    style={{ opacity: 0, transformOrigin: `${MOD_X + MOD_W - 130 + btnW / 2}px ${barY + btnH / 2}px` }}
                  />
                </g>
              </g>
            );
          })()}
        </g>
      </svg>
    </div>
  );
}
