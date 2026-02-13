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

const cursorBlink = {
  hidden: { opacity: 0 },
  show: {
    opacity: [0, 1, 1, 0],
    transition: { duration: 1.1, repeat: Infinity, repeatDelay: 0.1, ease: 'linear' },
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

  return (
    <motion.g variants={stagger} initial="hidden" animate="show">
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
                {/* Mini title card preview */}
                <text x={CX + 26} y={ty + 8} fill={C.textMuted} fontSize={3.5} fontFamily={FONT} letterSpacing="0.08em">CASE STUDY</text>
                <text x={CX + 28} y={ty + 22} fill={C.cream} fontSize={8} fontWeight={700} fontFamily={FONT}>Awards</text>
                <text x={CX + 28} y={ty + 33} fill={C.cream} fontSize={8} fontWeight={700} fontFamily={FONT}>Week</text>
                <text x={CX + 28} y={ty + 44} fill={C.cream} fontSize={8} fontWeight={700} fontFamily={FONT}>Gala</text>
                <circle cx={CX + 54} cy={ty + 43} r={1.2} fill={C.accent} />
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
        {/* Dark gradient canvas background */}
        <defs>
          <linearGradient id="slideGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0D0F12" />
            <stop offset="40%" stopColor="#111418" />
            <stop offset="100%" stopColor="#1A1D22" />
          </linearGradient>
        </defs>
        <rect x={canvasX} y={CY + 72} width={canvasW} height={canvasH} rx={6} fill="url(#slideGrad)" stroke={C.border} strokeWidth={0.5} />

        {/* Subtle vignette overlay */}
        <defs>
          <radialGradient id="slideVig" cx="0.3" cy="0.3">
            <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </radialGradient>
        </defs>
        <rect x={canvasX} y={CY + 72} width={canvasW} height={canvasH} rx={6} fill="url(#slideVig)" />

        {/* Slow parallax zoom on entire content group */}
        <motion.g
          initial={{ scale: 1, originX: canvasX + canvasW / 2, originY: CY + 72 + canvasH / 2 }}
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
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
            y={CY + 190}
            fill={C.cream}
            fontSize={58}
            fontWeight={800}
            fontFamily={FONT}
            letterSpacing="-0.03em"
          >
            Awards
          </motion.text>

          <motion.text
            variants={titleLine(0.35)}
            x={canvasX + 28}
            y={CY + 262}
            fill={C.cream}
            fontSize={58}
            fontWeight={800}
            fontFamily={FONT}
            letterSpacing="-0.03em"
          >
            Week
          </motion.text>

          <motion.text
            variants={titleLine(0.5)}
            x={canvasX + 28}
            y={CY + 334}
            fill={C.cream}
            fontSize={58}
            fontWeight={800}
            fontFamily={FONT}
            letterSpacing="-0.03em"
          >
            Gala
          </motion.text>

          {/* Accent dot after "Gala" */}
          <motion.circle
            variants={titleLine(0.55)}
            cx={canvasX + 187}
            cy={CY + 332}
            r={5}
            fill={C.accent}
          />

          {/* Typing cursor — blinking bar after the dot */}
          <motion.rect
            variants={cursorBlink}
            x={canvasX + 197}
            y={CY + 310}
            width={2.5}
            height={28}
            rx={1}
            fill={C.cream}
          />

          {/* ── Subtitle block — bottom-right ── */}
          <motion.g variants={subtitleFade}>
            {/* Left accent bar */}
            <rect x={canvasX + canvasW - 220} y={CY + 345} width={2} height={40} rx={1} fill={C.textMuted} opacity={0.5} />
            <text x={canvasX + canvasW - 210} y={CY + 358} fill={C.textSec} fontSize={9} fontWeight={400} fontFamily={FONT}>
              Fictional event scenario
            </text>
            <text x={canvasX + canvasW - 210} y={CY + 372} fill={C.textSec} fontSize={9} fontWeight={400} fontFamily={FONT}>
              Los Angeles · May 11–17, 2026
            </text>
            <text x={canvasX + canvasW - 210} y={CY + 386} fill={C.textSec} fontSize={9} fontWeight={400} fontFamily={FONT}>
              $250K Production
            </text>
          </motion.g>

          {/* ── 4-pointed star decoration — bottom-right ── */}
          <motion.g
            initial={{ scale: 0.95, rotate: 0 }}
            animate={{ scale: [0.95, 1.08, 0.95], rotate: [0, 8, 0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: canvasX + canvasW - 32, originY: CY + canvasH + 72 - 32 }}
          >
            <polygon
              points={`
                ${canvasX + canvasW - 32},${CY + canvasH + 72 - 52}
                ${canvasX + canvasW - 27},${CY + canvasH + 72 - 37}
                ${canvasX + canvasW - 12},${CY + canvasH + 72 - 32}
                ${canvasX + canvasW - 27},${CY + canvasH + 72 - 27}
                ${canvasX + canvasW - 32},${CY + canvasH + 72 - 12}
                ${canvasX + canvasW - 37},${CY + canvasH + 72 - 27}
                ${canvasX + canvasW - 52},${CY + canvasH + 72 - 32}
                ${canvasX + canvasW - 37},${CY + canvasH + 72 - 37}
              `}
              fill={C.textMuted}
              opacity={0.35}
            />
          </motion.g>
        </motion.g>
      </motion.g>

      {/* ── REV badge (delayed) ── */}
      <motion.g variants={fadeInSlow}>
        <rect x={canvasX + canvasW - 56} y={CY + 72} width={46} height={18} rx={4} fill={C.accentDim} />
        <text x={canvasX + canvasW - 44} y={CY + 84} fill={C.accent} fontSize={8} fontWeight={600} fontFamily={FONT}>REV 1</text>
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
