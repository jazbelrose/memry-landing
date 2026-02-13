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

        {/* Nav icon placeholders */}
        {NAV_Y.map((y, i) => (
          <rect
            key={i}
            x={14} y={y}
            width={20} height={20} rx={5}
            fill="none"
            stroke={i === activeNav ? C.accent : C.textMuted}
            strokeWidth={1.2}
            opacity={i === activeNav ? 0.9 : 0.3}
          />
        ))}

        {/* Notification badges */}
        <circle cx={36} cy={NAV_Y[5] + 2} r={4} fill={C.accent} />
        <text x={36} y={NAV_Y[5] + 4.5} fill="#fff" fontSize={5} fontFamily={FONT} textAnchor="middle" fontWeight={700}>3</text>
        <circle cx={36} cy={NAV_Y[6] + 2} r={3.5} fill={C.accent} />

        {/* Bottom: search icon + user avatar */}
        <circle cx={24} cy={VH - 56} r={10} fill="none" stroke={C.textMuted} strokeWidth={1} opacity={0.25} />
        {/* Exit arrow */}
        <line x1={19} y1={VH - 24} x2={29} y2={VH - 24} stroke={C.textMuted} strokeWidth={0.8} opacity={0.3} />
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
