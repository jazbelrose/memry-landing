/* ═══════════════════════════════════════════════════════════
   SlidesScene — LA Awards Week Gala case-study title card
   Animated hero slide with staggered typography, cursor
   blink, parallax zoom, and spinning star decoration.
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { C, FONT, CX, CY, CW, EASE, stagger, fadeIn, fadeInSlow } from './tokens';
import { GalaLogo } from './GalaLogo';

/* ── local animation variants ── */
const titleLine = (delay: number) => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  },
});

const subtitleFade = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, delay: 0.9 } },
};

/* collaborator cursor drifts in from off-screen */
const cursorDrift = (delay: number, dx: number, dy: number) => ({
  hidden: { opacity: 0, x: dx, y: dy },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

/* comment popover slides in */
const commentSlide = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE, delay: 1.6 },
  },
};

export function SlidesScene() {
  const railW = 140;
  const canvasX = CX + railW + 12;
  const canvasW = CW - railW - 12;
  const canvasH = 390;
  const thumbW = 110;
  const thumbH = 68;
  const thumbGap = 10;

  const slides = [
    { num: '01', active: true },
    { num: '02', active: false },
    { num: '03', active: false },
    { num: '04', active: false },
    { num: '05', active: false },
  ];

  /* star decoration center */
  const starCx = canvasX + canvasW - 35;
  const starCy = CY + 72 + canvasH - 35;

  return (
    <motion.g variants={stagger} initial="hidden" animate="show">
      {/* ═══ Gradient defs — must be outside animated groups ═══ */}
      <defs>
        <linearGradient id="slideGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D0F12" />
          <stop offset="40%" stopColor="#111418" />
          <stop offset="100%" stopColor="#1A1D22" />
        </linearGradient>
        <radialGradient id="slideVig" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </radialGradient>
        {/* Classic pointer cursor — white fill, black outline, tip at (0,0) */}
        <path id="cursorArrow" d="M0,0 L0,15.5 L4.2,12 L7,17.5 L9.2,16.3 L6.3,10.8 L11,10.8 Z" fill="#fff" stroke="#111" strokeWidth={0.7} strokeLinejoin="round" />
      </defs>

      {/* ── Project name ── */}
      <motion.g variants={fadeIn}>
        <GalaLogo x={CX - 2} y={CY + 4} size={20} />
        <text x={CX + 24} y={CY + 18} fill={C.text} fontSize={12} fontWeight={500} fontFamily={FONT}>LA Awards Week Gala</text>
      </motion.g>

      {/* ── Toolbar ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 32} width={CW} height={28} rx={4} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        {[0, 28, 56, 84, 112].map((off, i) => (
          <rect key={i} x={CX + 10 + off} y={CY + 38} width={20} height={16} rx={4} fill={C.white05} />
        ))}
        <rect x={CX + 220} y={CY + 38} width={40} height={16} rx={4} fill={C.white05} />
        <text x={CX + 229} y={CY + 49} fill={C.textSec} fontSize={8} fontFamily={FONT}>Insert</text>
        {/* Collab presence avatars */}
        <circle cx={CX + CW - 195} cy={CY + 46} r={7} fill="#8C4A2D" stroke={C.surface} strokeWidth={1} />
        <text x={CX + CW - 195} y={CY + 49} fill="#fff" fontSize={6} fontWeight={600} fontFamily={FONT} textAnchor="middle">JB</text>
        <circle cx={CX + CW - 180} cy={CY + 46} r={7} fill="#2D4A8C" stroke={C.surface} strokeWidth={1} />
        <text x={CX + CW - 180} y={CY + 49} fill="#fff" fontSize={6} fontWeight={600} fontFamily={FONT} textAnchor="middle">RT</text>
        <text x={CX + CW - 160} y={CY + 49} fill={C.textMuted} fontSize={8} fontFamily={FONT}>✏ Editing</text>
        <rect x={CX + CW - 95} y={CY + 38} width={40} height={16} rx={4} fill={C.white05} />
        <text x={CX + CW - 86} y={CY + 49} fill={C.textSec} fontSize={8} fontFamily={FONT}>Main</text>
        <text x={CX + CW - 42} y={CY + 49} fill={C.success} fontSize={8} fontFamily={FONT}>Saved</text>
      </motion.g>

      {/* ── Slide thumbnail rail ── */}
      {slides.map((slide, idx) => {
        const ty = CY + 72 + idx * (thumbH + thumbGap);
        return (
          <motion.g key={idx} variants={fadeIn}>
            <text x={CX + 4} y={ty + 10} fill={C.textMuted} fontSize={8} fontFamily={FONT}>{slide.num}</text>
            <rect
              x={CX + 20} y={ty}
              width={thumbW} height={thumbH} rx={4}
              fill={slide.active ? C.bg : C.card}
              stroke={slide.active ? C.accent : C.border}
              strokeWidth={slide.active ? 1.5 : 0.5}
            />
            {slide.active ? (
              <>
                {/* Mini dark title card preview */}
                <rect x={CX + 24} y={ty + 4} width={thumbW - 8} height={thumbH - 8} rx={2} fill="#0D0F12" />
                <text x={CX + 30} y={ty + 14} fill={C.textMuted} fontSize={3} fontFamily={FONT} letterSpacing="0.08em">CASE STUDY</text>
                <text x={CX + 30} y={ty + 26} fill={C.cream} fontSize={9} fontWeight={700} fontFamily={FONT}>Awards</text>
                <text x={CX + 30} y={ty + 37} fill={C.cream} fontSize={9} fontWeight={700} fontFamily={FONT}>Week</text>
                <text x={CX + 30} y={ty + 48} fill={C.cream} fontSize={9} fontWeight={700} fontFamily={FONT}>Gala</text>
                <circle cx={CX + 60} cy={ty + 47} r={1.5} fill={C.accent} />
              </>
            ) : (
              <>
                <rect x={CX + 28} y={ty + 10} width={thumbW - 20} height={4} rx={2} fill={C.white05} />
                <rect x={CX + 28} y={ty + 18} width={thumbW - 32} height={4} rx={2} fill={C.white05} />
                <rect x={CX + 28} y={ty + 30} width={40} height={3} rx={1.5} fill={C.white05} />
              </>
            )}
            <circle cx={CX + thumbW + 28} cy={ty + thumbH / 2 - 4} r={1.2} fill={C.textMuted} opacity={0.3} />
            <circle cx={CX + thumbW + 28} cy={ty + thumbH / 2} r={1.2} fill={C.textMuted} opacity={0.3} />
            <circle cx={CX + thumbW + 28} cy={ty + thumbH / 2 + 4} r={1.2} fill={C.textMuted} opacity={0.3} />
          </motion.g>
        );
      })}

      {/* ── Main canvas — dark cinematic title card ── */}
      <motion.g variants={fadeIn}>
        <rect x={canvasX} y={CY + 72} width={canvasW} height={canvasH} rx={6} fill="url(#slideGrad)" stroke={C.border} strokeWidth={0.5} />
        <rect x={canvasX} y={CY + 72} width={canvasW} height={canvasH} rx={6} fill="url(#slideVig)" />
      </motion.g>

      {/* ── "CASE STUDY" label — top-left ── */}
      <motion.text
        variants={titleLine(0.1)}
        x={canvasX + 28}
        y={CY + 100}
        fill={C.textSec}
        fontSize={9}
        fontWeight={500}
        fontFamily={FONT}
        letterSpacing="0.14em"
      >
        CASE STUDY
      </motion.text>

      {/* ── "//" decoration — top-right ── */}
      <motion.text
        variants={subtitleFade}
        x={canvasX + canvasW - 38}
        y={CY + 102}
        fill={C.textMuted}
        fontSize={14}
        fontWeight={300}
        fontFamily={FONT}
        opacity={0.4}
      >
        //
      </motion.text>

      {/* ── Giant stacked title lines ── */}
      <motion.text
        variants={titleLine(0.2)}
        x={canvasX + 28}
        y={CY + 195}
        fill={C.cream}
        fontSize={60}
        fontWeight={800}
        fontFamily={FONT}
        letterSpacing="-0.03em"
      >
        Awards
      </motion.text>

      <motion.text
        variants={titleLine(0.35)}
        x={canvasX + 28}
        y={CY + 270}
        fill={C.cream}
        fontSize={60}
        fontWeight={800}
        fontFamily={FONT}
        letterSpacing="-0.03em"
      >
        Week
      </motion.text>

      <motion.text
        variants={titleLine(0.5)}
        x={canvasX + 28}
        y={CY + 345}
        fill={C.cream}
        fontSize={60}
        fontWeight={800}
        fontFamily={FONT}
        letterSpacing="-0.03em"
      >
        Gala
      </motion.text>

      {/* Accent dot after "Gala" */}
      <motion.circle
        variants={titleLine(0.55)}
        cx={canvasX + 192}
        cy={CY + 343}
        r={5.5}
        fill={C.accent}
      />

      {/* ═══ YJS Real-time Collaboration ═══ */}

      {/* ── Collaborator cursor #1 (JB) — past "Awards" ── */}
      <motion.g variants={cursorDrift(1.0, 40, -20)}>
        <use href="#cursorArrow" transform={`translate(${canvasX + 280},${CY + 178})`} />
        <rect x={canvasX + 284} y={CY + 197} width={22} height={12} rx={3} fill="#2D9CDB" />
        <text x={canvasX + 288} y={CY + 206} fill="#fff" fontSize={6} fontWeight={600} fontFamily={FONT}>JB</text>
      </motion.g>

      {/* ── Selection highlight — JB selecting "Week" ── */}
      <motion.rect
        variants={cursorDrift(1.2, 0, 0)}
        x={canvasX + 26}
        y={CY + 223}
        width={165}
        height={48}
        rx={3}
        fill="rgba(45,156,219,0.12)"
        stroke="rgba(45,156,219,0.3)"
        strokeWidth={0.5}
      />

      {/* ── Collaborator cursor #2 (RT) — empty mid-canvas area ── */}
      <motion.g variants={cursorDrift(1.4, -30, 20)}>
        <use href="#cursorArrow" transform={`translate(${canvasX + 320},${CY + 380})`} />
        <rect x={canvasX + 324} y={CY + 399} width={20} height={12} rx={3} fill="#E6994A" />
        <text x={canvasX + 327} y={CY + 408} fill="#fff" fontSize={6} fontWeight={600} fontFamily={FONT}>RT</text>
      </motion.g>

      {/* ── Own user typing cursor — blinking bar after "Gala." ── */}
      <motion.rect
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', delay: 0.8 }}
        x={canvasX + 202}
        y={CY + 318}
        width={2.5}
        height={30}
        rx={1}
        fill={C.cream}
      />

      {/* ── Comment popover (slides in from right — inside viewBox) ── */}
      <motion.g variants={commentSlide}>
        {/* "+" button anchored at canvas right edge */}
        <circle cx={canvasX + canvasW - 8} cy={CY + 148} r={8} fill={C.accent} />
        <line x1={canvasX + canvasW - 11} y1={CY + 148} x2={canvasX + canvasW - 5} y2={CY + 148} stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
        <line x1={canvasX + canvasW - 8} y1={CY + 145} x2={canvasX + canvasW - 8} y2={CY + 151} stroke="#fff" strokeWidth={1.2} strokeLinecap="round" />
        {/* Card — floats over the empty right side of the canvas */}
        <rect x={canvasX + canvasW - 140} y={CY + 160} width={132} height={66} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        {/* Commenter avatar + name */}
        <circle cx={canvasX + canvasW - 126} cy={CY + 174} r={6} fill="#E6994A" />
        <text x={canvasX + canvasW - 126} y={CY + 176.5} fill="#fff" fontSize={5} fontWeight={600} fontFamily={FONT} textAnchor="middle">RT</text>
        <text x={canvasX + canvasW - 116} y={CY + 177} fill={C.text} fontSize={7} fontWeight={500} fontFamily={FONT}>Rachel T.</text>
        <text x={canvasX + canvasW - 56} y={CY + 177} fill={C.textMuted} fontSize={6} fontFamily={FONT}>just now</text>
        {/* Comment text */}
        <text x={canvasX + canvasW - 132} y={CY + 192} fill={C.textSec} fontSize={7} fontFamily={FONT}>Love the title card look!</text>
        <text x={canvasX + canvasW - 132} y={CY + 204} fill={C.textSec} fontSize={7} fontFamily={FONT}>Can we try gold accent?</text>
        {/* Reply input */}
        <rect x={canvasX + canvasW - 132} y={CY + 210} width={114} height={10} rx={3} fill={C.white05} />
        <text x={canvasX + canvasW - 126} y={CY + 218} fill={C.textMuted} fontSize={5.5} fontFamily={FONT}>Add a comment...</text>
      </motion.g>

      {/* ── Subtitle block — bottom-right ── */}
      <motion.g variants={subtitleFade}>
        <rect x={canvasX + canvasW - 220} y={CY + 350} width={2} height={40} rx={1} fill={C.textMuted} opacity={0.5} />
        <text x={canvasX + canvasW - 210} y={CY + 363} fill={C.textSec} fontSize={9} fontWeight={400} fontFamily={FONT}>
          Fictional event scenario
        </text>
        <text x={canvasX + canvasW - 210} y={CY + 377} fill={C.textSec} fontSize={9} fontWeight={400} fontFamily={FONT}>
          Los Angeles · May 11–17, 2026
        </text>
        <text x={canvasX + canvasW - 210} y={CY + 391} fill={C.textSec} fontSize={9} fontWeight={400} fontFamily={FONT}>
          $250K Production
        </text>
      </motion.g>

      {/* ── 4-pointed star decoration — bottom-right ── */}
      <motion.g variants={fadeInSlow}>
        <motion.polygon
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 8, 0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${starCx}px ${starCy}px` }}
          points={`
            ${starCx},${starCy - 18}
            ${starCx + 5},${starCy - 5}
            ${starCx + 18},${starCy}
            ${starCx + 5},${starCy + 5}
            ${starCx},${starCy + 18}
            ${starCx - 5},${starCy + 5}
            ${starCx - 18},${starCy}
            ${starCx - 5},${starCy - 5}
          `}
          fill={C.textMuted}
          opacity={0.35}
        />
      </motion.g>

      {/* ── REV badge (delayed) ── */}
      <motion.g variants={fadeInSlow}>
        <rect x={canvasX + canvasW - 56} y={CY + 74} width={46} height={18} rx={4} fill={C.accentDim} />
        <text x={canvasX + canvasW - 44} y={CY + 86} fill={C.accent} fontSize={8} fontWeight={600} fontFamily={FONT}>REV 1</text>
      </motion.g>

      {/* ── Speaker Notes bar ── */}
      <motion.g variants={fadeIn}>
        <rect x={canvasX} y={CY + 464} width={canvasW} height={22} rx={0} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        <text x={canvasX + canvasW / 2} y={CY + 478} fill={C.textMuted} fontSize={8} fontFamily={FONT} textAnchor="middle">
          ▪ Speaker Notes
        </text>
      </motion.g>
    </motion.g>
  );
}
