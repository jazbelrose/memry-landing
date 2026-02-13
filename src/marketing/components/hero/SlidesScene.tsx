/* ═══════════════════════════════════════════════════════════
   SlidesScene — Presentation editor with thumbnail rail
   Source: FYI Campus slides editor screenshots
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { C, FONT, CX, CY, CW, stagger, fadeIn, fadeInSlow } from './tokens';

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
        <rect x={CX - 2} y={CY + 4} width={20} height={20} rx={5} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 5} y={CY + 18} fill="#fff" fontSize={7} fontWeight={700} fontFamily={FONT} textAnchor="middle">FYI</text>
        <text x={CX + 26} y={CY + 18} fill={C.text} fontSize={12} fontWeight={500} fontFamily={FONT}>FYI Campus</text>
      </motion.g>

      {/* ── Toolbar ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 32} width={CW} height={28} rx={4} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        {/* Tool icon placeholders */}
        {[0, 28, 56, 84, 112].map((off, i) => (
          <rect key={i} x={CX + 10 + off} y={CY + 38} width={20} height={16} rx={4} fill={C.white05} />
        ))}
        {/* Insert button */}
        <rect x={CX + 220} y={CY + 38} width={40} height={16} rx={4} fill={C.white05} />
        <text x={CX + 229} y={CY + 49} fill={C.textSec} fontSize={8} fontFamily={FONT}>Insert</text>
        {/* Right: Editing / Main / Saved */}
        <text x={CX + CW - 145} y={CY + 49} fill={C.textMuted} fontSize={8} fontFamily={FONT}>✏ Editing</text>
        <rect x={CX + CW - 95} y={CY + 38} width={40} height={16} rx={4} fill={C.white05} />
        <text x={CX + CW - 86} y={CY + 49} fill={C.textSec} fontSize={8} fontFamily={FONT}>Main</text>
        <text x={CX + CW - 42} y={CY + 49} fill={C.success} fontSize={8} fontFamily={FONT}>Saved</text>
      </motion.g>

      {/* ── Slide thumbnail rail ── */}
      {slides.map((slide, idx) => {
        const ty = CY + 72 + idx * (thumbH + thumbGap);
        return (
          <motion.g key={idx} variants={fadeIn}>
            {/* Slide number */}
            <text x={CX + 4} y={ty + 10} fill={C.textMuted} fontSize={8} fontFamily={FONT}>{slide.num}</text>
            {/* Thumbnail */}
            <rect
              x={CX + 20} y={ty}
              width={thumbW} height={thumbH} rx={4}
              fill={slide.active ? '#F8F6F0' : C.card}
              stroke={slide.active ? C.accent : C.border}
              strokeWidth={slide.active ? 1.5 : 0.5}
            />
            {/* Simplified content */}
            {!slide.active ? (
              <>
                <rect x={CX + 28} y={ty + 10} width={thumbW - 20} height={4} rx={2} fill={C.white05} />
                <rect x={CX + 28} y={ty + 18} width={thumbW - 32} height={4} rx={2} fill={C.white05} />
                <rect x={CX + 28} y={ty + 30} width={40} height={3} rx={1.5} fill={C.white05} />
              </>
            ) : (
              <>
                <text x={CX + 28} y={ty + 18} fill="#111" fontSize={6} fontWeight={700} fontFamily={FONT}>Design</text>
                <text x={CX + 28} y={ty + 32} fill="#111" fontSize={10} fontWeight={700} fontFamily={FONT}>Interior*</text>
              </>
            )}
            {/* Kebab dots */}
            <circle cx={CX + thumbW + 28} cy={ty + thumbH / 2 - 4} r={1.2} fill={C.textMuted} opacity={0.3} />
            <circle cx={CX + thumbW + 28} cy={ty + thumbH / 2} r={1.2} fill={C.textMuted} opacity={0.3} />
            <circle cx={CX + thumbW + 28} cy={ty + thumbH / 2 + 4} r={1.2} fill={C.textMuted} opacity={0.3} />
          </motion.g>
        );
      })}

      {/* ── Main canvas ── */}
      <motion.g variants={fadeIn}>
        <rect x={canvasX} y={CY + 72} width={canvasW} height={canvasH} rx={6} fill="#F8F6F0" stroke={C.border} strokeWidth={0.5} />

        {/* Header bar inside canvas */}
        <text x={canvasX + 20} y={CY + 92} fill="#333" fontSize={9} fontWeight={600} fontFamily={FONT} fontStyle="italic">FYI</text>
        <text x={canvasX + canvasW - 135} y={CY + 92} fill="#777" fontSize={8} fontFamily={FONT}>Venue Design Proposal</text>
        {/* Collab avatars */}
        <circle cx={canvasX + canvasW - 40} cy={CY + 89} r={7} fill="#555" />
        <circle cx={canvasX + canvasW - 28} cy={CY + 89} r={7} fill={C.accent} />
        <circle cx={canvasX + canvasW - 16} cy={CY + 89} r={7} fill="#2D9CDB" />

        {/* Large typography — "Design Interior*" */}
        <text x={canvasX + 30} y={CY + 200} fill="#111" fontSize={44} fontWeight={700} fontFamily={FONT} letterSpacing="-0.02em">
          Design
        </text>
        <text x={canvasX + canvasW - 95} y={CY + 210} fill="#111" fontSize={52} fontWeight={700} fontFamily={FONT}>*</text>
        <text x={canvasX + 30} y={CY + 310} fill="#111" fontSize={62} fontWeight={700} fontFamily={FONT} letterSpacing="-0.03em">
          Interior
        </text>
        <text x={canvasX + canvasW - 85} y={CY + 340} fill="#111" fontSize={46} fontWeight={700} fontFamily={FONT}>*</text>

        {/* Subtitle lines */}
        <text x={canvasX + 30} y={CY + 360} fill="#666" fontSize={9} fontFamily={FONT} letterSpacing="0.06em">
          FYI / THE LAB VENUE DESIGN PRESENTATION
        </text>
        <text x={canvasX + 30} y={CY + 380} fill="#999" fontSize={8} fontFamily={FONT}>BY MYLG.STUDIO</text>

        {/* Barcode decoration */}
        <g transform={`translate(${canvasX + canvasW - 60}, ${CY + 330})`}>
          {[0, 3, 5, 8, 10, 12, 15, 17, 20, 22, 25, 27].map((x, ix) => (
            <rect key={ix} x={x} y={0} width={1.5} height={35} fill="#222" rx={0.3} />
          ))}
          <text x={0} y={44} fill="#666" fontSize={5} fontFamily={FONT}>0919 21:52:28</text>
        </g>
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
