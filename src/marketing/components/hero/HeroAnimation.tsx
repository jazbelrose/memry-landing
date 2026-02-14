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
        <rect width={VW} height={VH} fill={C.bg} rx={8} />

        {/* ═══ Sidebar ═══ */}
        <rect x={0} y={0} width={SB_W} height={VH} fill={C.surface} />
        <line x1={SB_W} y1={0} x2={SB_W} y2={VH} stroke={C.border} strokeWidth={1} />

        {/* memry logo mark — scaled from 180×180 source */}
        <g transform="translate(14,16) scale(0.11)" opacity={0.85}>
          <path d="M167.4,111c1.2,2.2 1.8,4.6 1.8,7.2c0,5.1-2.6,9.9-6.8,12.7l-61.2,40.7c-7,4.7-16.2,4.7-23.2,0l-61.2-40.7c-4.3-2.8-6.8-7.6-6.8-12.7c0-2.5.6-5 1.8-7.2c1.2,2.2 2.9,4.2 5.1,5.6l61.2,40.7c7,4.7 16.2,4.7 23.2,0l61.2-40.7c2.2-1.4 3.9-3.4 5.1-5.6Z" fill="#fff"/>
          <path d="M167.4,82.4c1.2,2.2 1.8,4.6 1.8,7.2c0,5.1-2.6,9.9-6.8,12.7l-61.2,40.7c-7,4.7-16.2,4.7-23.2,0l-61.2-40.7c-4.3-2.8-6.8-7.6-6.8-12.7c0-2.5.6-5 1.8-7.2c1.2,2.2 2.9,4.2 5.1,5.6l61.1,40.6c7.1,4.7 16.4,4.7 23.5,0l61.1-40.6c2.2-1.4 3.9-3.4 5.1-5.6Z" fill="#fff"/>
          <path d="M76,8.7c8.2-5.5 18.9-5.5 27.1,0l59.3,39.4c4.3,2.8 6.8,7.6 6.8,12.7c0,5.1-2.6,9.9-6.8,12.7l-59.3,39.4c-8.2,5.5-18.9,5.5-27.1,0l-59.3-39.4c-4.3-2.8-6.8-7.6-6.8-12.7c0-5.1 2.6-9.9 6.8-12.7l59.3-39.4Zm16.7,38.8l-.7.6-24.7,16.6c-4.1,2.7-4.5,6.8-1.2,9c3.4,2.2 9.5,1.8 13.6-.9l24.8-16.7.8-.5c1.6-.8 3.1-.9 3.4-.9c.3,0 2.4-.2 3.9.8l0,0c2,1.3 1.7,3.8-.7,5.4l-24.8,16.7c-4.1,2.8-4.5,6.9-1.2,9.1c3.4,2.2 9.6,1.8 13.7-.9l24.8-16.7c10.6-7.1 11.9-17.7 2.9-23.4c-5.6-3.6-12.8-3.7-14-3.7c-.1-.9-.4-5.5-5.9-9.1c-3.4-2.2-9.3-4.1-17.1-3.6c-10.3.7-17,5.2-18.2,6l-24.6,16.6c-4.1,2.7-4.5,6.8-1.2,9c3.4,2.2 9.5,1.8 13.6-.9l24.7-16.6c1.8-1.2 3.8-1.4 4.2-1.4c.3,0 2.4-.2 3.9.8l0,0c1.8,1.1 1.7,3.3 0,4.8Z" fill="#fff"/>
        </g>

        {/* Create button */}
        <circle cx={24} cy={70} r={12} fill={C.accent} />
        <line x1={24} y1={65} x2={24} y2={75} stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
        <line x1={19} y1={70} x2={29} y2={70} stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />

     
        {/* Nav icons — drawn shapes matching app sidebar */}
        {NAV_Y.map((y, i) => {
          const ix = 14, iy = y, ic = C.textMuted, op = 0.35, sw = 1.2;
          return (
            <g key={i} opacity={op}>
              {/* 0: Layers */}
              {i === 0 && (
                <g transform={`translate(${ix + 2},${iy + 2}) scale(0.667)`} stroke={ic} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/>
                  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/>
                  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/>
                </g>
              )}
              {/* 1: HQ — bold "HQ" text */}
              {i === 1 && (
                <text x={ix + 3} y={iy + 15} fill={ic} fontSize={10} fontWeight={700} fontFamily={FONT}>HQ</text>
              )}
              {/* 2: Receipt */}
              {i === 2 && (
                <g transform={`translate(${ix + 2},${iy + 2}) scale(0.667)`} stroke={ic} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/>
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                  <path d="M12 17.5v-11"/>
                </g>
              )}
              {/* 3: Landmark */}
              {i === 3 && (
                <g transform={`translate(${ix + 2},${iy + 2}) scale(0.667)`} stroke={ic} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/>
                  <path d="M6 18v-7"/>
                  <path d="M10 18v-7"/>
                  <path d="M14 18v-7"/>
                  <path d="M18 18v-7"/>
                  <path d="M3 22h18"/>
                </g>
              )}
              {/* 4: Users */}
              {i === 4 && (
                <g transform={`translate(${ix + 2},${iy + 2}) scale(0.667)`} stroke={ic} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                </g>
              )}
              {/* 5: MessageSquare */}
              {i === 5 && (
                <g transform={`translate(${ix + 2},${iy + 2}) scale(0.667)`} stroke={ic} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
                </g>
              )}
              {/* 6: Bell */}
              {i === 6 && (
                <g transform={`translate(${ix + 2},${iy + 2}) scale(0.667)`} stroke={ic} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
                  <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
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
          <circle cx={24} cy={VH - 72} r={8} fill="none" stroke={C.textMuted} strokeWidth={1} />
          <line x1={30} y1={VH - 66} x2={34} y2={VH - 62} stroke={C.textMuted} strokeWidth={1.2} strokeLinecap="round" />
        </g>
     
        {/* Avatar */}
        <circle cx={24} cy={VH - 32} r={9} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={24} y={VH - 29} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT} textAnchor="middle">JR</text>

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
