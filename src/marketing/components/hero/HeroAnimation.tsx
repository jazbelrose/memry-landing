/* ═══════════════════════════════════════════════════════════
   HeroAnimation — Marketing UI Rig orchestrator
   Shell (sidebar + nav) + scene cycling w/ Framer Motion
   ═══════════════════════════════════════════════════════════ */
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  C, FONT, VW, VH, SB_W,
  EASE, SCENES, SceneId, SCENE_DURATION, SCENE_NAV, NAV_Y,
} from './tokens';
import { ProjectsScene } from './ProjectsScene';
import { SlidesScene } from './SlidesScene';
import { BudgetScene } from './BudgetScene';
import { CalendarScene } from './CalendarScene';
import { HQScene } from './HQScene';
import styles from './HeroAnimation.module.css';

// ── Scene registry ──
const SCENE_MAP: Record<SceneId, React.FC> = {
  projects: ProjectsScene,
  slides: SlidesScene,
  budget: BudgetScene,
  calendar: CalendarScene,
  hq: HQScene,
};

// ── Scene labels for aria / dots ──
const SCENE_LABELS: Record<SceneId, string> = {
  projects: 'Projects',
  slides: 'Slides',
  budget: 'Budget',
  calendar: 'Calendar',
  hq: 'HQ',
};

export function HeroAnimation() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  // ── Auto-cycle scenes ──
  useEffect(() => {
    if (reducedMotion || pausedRef.current) return;
    const scene = SCENES[index];
    const dur = SCENE_DURATION[scene];
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % SCENES.length);
    }, dur);
    return () => clearTimeout(timer);
  }, [index, reducedMotion]);

  const sceneId = SCENES[index];
  const activeNav = SCENE_NAV[sceneId];
  const SceneComponent = SCENE_MAP[sceneId];

  // ── 3D tilt on hover ──
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reducedMotion || !frameRef.current) return;
      const rect = frameRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 4;
      frameRef.current.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
    },
    [reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current)
      frameRef.current.style.transform =
        'perspective(1200px) rotateY(0deg) rotateX(0deg)';
  }, []);

  // ── Dot click → jump to scene ──
  const jumpToScene = useCallback((i: number) => {
    setIndex(i);
  }, []);

  return (
    <div
      ref={frameRef}
      className={styles.frame}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="memry product interface demonstration"
      >
        <defs>
          <clipPath id="heroContentClip">
            <rect x={SB_W} y={0} width={VW - SB_W} height={VH} />
          </clipPath>
        </defs>

        {/* ═══ Background ═══ */}
        <rect width={VW} height={VH} fill={C.bg} rx={12} />

        {/* ═══ Sidebar ═══ */}
        <rect x={0} y={0} width={SB_W} height={VH} fill={C.surface} />
        <line x1={SB_W} y1={0} x2={SB_W} y2={VH} stroke={C.border} strokeWidth={1} />

        {/* Logo (nested squares) */}
        <rect x={12} y={14} width={24} height={24} rx={6} fill="none" stroke={C.textSec} strokeWidth={1.2} opacity={0.5} />
        <rect x={17} y={19} width={14} height={14} rx={3} fill="none" stroke={C.textSec} strokeWidth={1} opacity={0.3} />

        {/* Create button */}
        <rect x={10} y={56} width={28} height={28} rx={14} fill={C.accent} />
        <line x1={24} y1={65} x2={24} y2={77} stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
        <line x1={18} y1={71} x2={30} y2={71} stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />

        {/* Active nav indicator (spring-animated) */}
        <motion.rect
          x={6}
          width={36}
          height={28}
          rx={7}
          fill={C.accentDim}
          animate={{ y: NAV_Y[activeNav] - 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />

        {/* Nav icons — drawn shapes matching app sidebar */}
        {NAV_Y.map((y, i) => {
          const ix = 14, iy = y, ic = C.textMuted, op = 0.35, sw = 1.2;
          return (
            <g key={i} opacity={op}>
              {/* 0: Layers / Stack — three overlapping cards */}
              {i === 0 && (
                <g stroke={ic} strokeWidth={sw} fill="none">
                  <rect x={ix + 3} y={iy + 8} width={14} height={9} rx={2} />
                  <path d={`M${ix + 5} ${iy + 6} h10 a2 2 0 0 1 2 2`} />
                  <path d={`M${ix + 7} ${iy + 3} h8 a2 2 0 0 1 2 2`} />
                </g>
              )}
              {/* 1: HQ — bold "HQ" text */}
              {i === 1 && (
                <text x={ix + 3} y={iy + 15} fill={ic} fontSize={10} fontWeight={700} fontFamily={FONT}>HQ</text>
              )}
              {/* 2: Dollar/Budget — document with $ */}
              {i === 2 && (
                <g stroke={ic} strokeWidth={sw} fill="none">
                  <rect x={ix + 3} y={iy + 1} width={14} height={18} rx={2} />
                  <text x={ix + 6.5} y={iy + 15} fill={ic} fontSize={10} fontWeight={600} fontFamily={FONT} stroke="none">$</text>
                </g>
              )}
              {/* 3: Building / venue — columns */}
              {i === 3 && (
                <g stroke={ic} strokeWidth={sw} fill="none">
                  <path d={`M${ix + 3} ${iy + 18} v-12 l7 -4 l7 4 v12`} />
                  <line x1={ix + 7} y1={iy + 10} x2={ix + 7} y2={iy + 18} />
                  <line x1={ix + 13} y1={iy + 10} x2={ix + 13} y2={iy + 18} />
                  <line x1={ix + 3} y1={iy + 18} x2={ix + 17} y2={iy + 18} />
                </g>
              )}
              {/* 4: People — two person silhouettes */}
              {i === 4 && (
                <g stroke={ic} strokeWidth={sw} fill="none">
                  <circle cx={ix + 7} cy={iy + 6} r={3} />
                  <path d={`M${ix + 1} ${iy + 18} a6 6 0 0 1 12 0`} />
                  <circle cx={ix + 15} cy={iy + 6} r={2.5} />
                  <path d={`M${ix + 10} ${iy + 16} a5 5 0 0 1 10 0`} />
                </g>
              )}
              {/* 5: Chat — speech bubble */}
              {i === 5 && (
                <g stroke={ic} strokeWidth={sw} fill="none">
                  <rect x={ix + 2} y={iy + 2} width={16} height={12} rx={3} />
                  <path d={`M${ix + 7} ${iy + 14} l-2 5 l5 -5`} />
                </g>
              )}
              {/* 6: Bell */}
              {i === 6 && (
                <g stroke={ic} strokeWidth={sw} fill="none">
                  <path d={`M${ix + 4} ${iy + 14} v-5 a6 6 0 0 1 12 0 v5`} />
                  <line x1={ix + 3} y1={iy + 14} x2={ix + 17} y2={iy + 14} />
                  <circle cx={ix + 10} cy={iy + 17} r={1.5} />
                </g>
              )}
            </g>
          );
        })}

        {/* Notification badges */}
        <circle cx={36} cy={NAV_Y[5] + 2} r={4} fill={C.accent} />
        <text x={36} y={NAV_Y[5] + 4.5} fill="#fff" fontSize={5} fontFamily={FONT} textAnchor="middle" fontWeight={700}>3</text>
        <circle cx={36} cy={NAV_Y[6] + 2} r={3.5} fill={C.accent} />

        {/* Bottom: search icon */}
        <g opacity={0.3}>
          <circle cx={24} cy={VH - 56} r={8} fill="none" stroke={C.textMuted} strokeWidth={1} />
          <line x1={30} y1={VH - 50} x2={34} y2={VH - 46} stroke={C.textMuted} strokeWidth={1.2} strokeLinecap="round" />
        </g>
        {/* Exit arrow */}
        <g opacity={0.3}>
          <path d={`M16 ${VH - 24} h12 M24 ${VH - 28} l4 4 -4 4`} stroke={C.textMuted} strokeWidth={0.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* Avatar */}
        <circle cx={24} cy={VH - 8} r={9} fill={C.card} stroke={C.border} strokeWidth={0.5} />

        {/* ═══ Content area (clipped) ═══ */}
        <g clipPath="url(#heroContentClip)">
          <AnimatePresence mode="wait">
            <motion.g
              key={sceneId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <SceneComponent />
            </motion.g>
          </AnimatePresence>
        </g>

        {/* ═══ Footnote ═══ */}
        <text
          x={VW / 2}
          y={VH - 3}
          fill={C.textMuted}
          fontSize={6}
          fontFamily={FONT}
          textAnchor="middle"
          opacity={0.3}
        >
          Fictional scenario for demonstration
        </text>
      </svg>

      {/* ── Scene indicator dots ── */}
      <div className={styles.dots}>
        {SCENES.map((s, i) => (
          <button
            key={s}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => jumpToScene(i)}
            aria-label={`View ${SCENE_LABELS[s]} scene`}
          />
        ))}
      </div>
    </div>
  );
}
