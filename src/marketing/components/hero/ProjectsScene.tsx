/* ═══════════════════════════════════════════════════════════
   ProjectsScene — Grid of project tiles
   Source: Projects dashboard screenshot
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { C, FONT, CX, CY, CW, stagger, fadeIn } from './tokens';
import { GalaLogo } from './GalaLogo';

const TILES: { i: string; n: string; c: string; featured?: boolean }[] = [
  { i: 'M', n: 'memry', c: '#1A2030' },
  { i: 'XC', n: 'XCTN', c: '#1A1E24' },
  { i: 'IS', n: 'Interplay', c: '#14202C' },
  { i: 'DS', n: 'Drapery Soc.', c: '#201A16' },
  { i: 'BR', n: 'Briktik', c: '#182020' },
  { i: 'AP', n: 'Acad. of Pop', c: '#2A1820' },
  { i: 'AZ', n: 'Aizo', c: '#241A22' },
  { i: 'BS', n: "Blur Sweet 16", c: '#1A2028' },
  { i: 'CS', n: 'Circa SB', c: '#222418' },
  { i: 'EM', n: 'e.l.f Studio', c: '#201C24' },
  { i: 'FC', n: 'FYI Campus', c: '#1A2066' },
  { i: 'GD', n: 'GR Design', c: '#1C1C1C' },
  { i: 'HF', n: 'Meridian Co', c: '#1C2A1C' },
  { i: 'KS', n: 'Keys Sound', c: '#2A2418' },
  { i: 'LG', n: 'LA Awards Gala', c: '#281C1C', featured: true },
];

export function ProjectsScene() {
  const tw = 166, th = 94, gap = 10, cols = 5;

  return (
    <motion.g variants={stagger} initial="hidden" animate="show">
      {/* ── Header ── */}
      <motion.text variants={fadeIn} x={CX} y={CY + 16} fill={C.text} fontSize={15} fontWeight={600} fontFamily={FONT}>
        Projects
      </motion.text>

      {/* ── Filter row ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 28} width={105} height={18} rx={4} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 8} y={CY + 40} fill={C.textSec} fontSize={8} fontFamily={FONT}>Feb 12 — Feb 25</text>
        <rect x={CX + 112} y={CY + 28} width={38} height={18} rx={4} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 118} y={CY + 40} fill={C.textMuted} fontSize={8} fontFamily={FONT}>Today</text>
        <text x={CX + 165} y={CY + 40} fill={C.teal} fontSize={8} fontFamily={FONT}>15 Ongoing</text>
        <text x={CX + 255} y={CY + 40} fill={C.textMuted} fontSize={8} fontFamily={FONT}>34 Projects</text>
      </motion.g>

      {/* ── Timeline strip ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 54} width={CW} height={24} rx={2} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        {['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map((d, idx) => (
          <text key={idx} x={CX + 8 + idx * 62.5} y={CY + 63} fill={C.textMuted} fontSize={7} fontFamily={FONT}>{d}</text>
        ))}
        <text x={CX + 8} y={CY + 63} fill={C.textSec} fontSize={7} fontWeight={600} fontFamily={FONT}>Thu</text>
        <rect x={CX + 8} y={CY + 68} width={55} height={3.5} rx={1.5} fill={C.accent} opacity={0.6} />
        <rect x={CX + 8} y={CY + 72.5} width={28} height={3.5} rx={1.5} fill={C.teal} opacity={0.4} />
      </motion.g>

      {/* ── Tile grid (5×3) ── */}
      {TILES.map((tile, idx) => {
        const col = idx % cols;
        const row = Math.floor(idx / cols);
        const tx = CX + col * (tw + gap);
        const ty = CY + 86 + row * (th + gap);
        const isFeatured = !!(tile as { featured?: boolean }).featured;
        return (
          <motion.g key={idx} variants={fadeIn}>
            <rect
              x={tx} y={ty} width={tw} height={th} rx={8}
              fill={C.card}
              stroke={isFeatured ? C.gold : C.border}
              strokeWidth={isFeatured ? 1.2 : 0.5}
            />
            {/* Icon square */}
            <rect x={tx + (tw - 36) / 2} y={ty + 10} width={36} height={36} rx={8} fill={tile.c} />
            {isFeatured ? (
              <GalaLogo x={tx + (tw - 36) / 2 + 4} y={ty + 12} size={28} fill={C.gold} />
            ) : (
              <text x={tx + tw / 2} y={ty + 33} fill="#ddd" fontSize={11} fontWeight={600} fontFamily={FONT} textAnchor="middle">
                {tile.i}
              </text>
            )}
            {/* Name */}
            <text
              x={tx + tw / 2} y={ty + 60}
              fill={isFeatured ? C.gold : C.textSec}
              fontSize={7.5} fontWeight={isFeatured ? 600 : 400} fontFamily={FONT} textAnchor="middle"
            >
              {tile.n}
            </text>
            {/* Status dot */}
            {idx < 10 && (
              <circle cx={tx + tw / 2 + 8} cy={ty + 5} r={2.5} fill={C.accent} opacity={0.5} />
            )}
          </motion.g>
        );
      })}

      {/* ── Bottom filter bar ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 405} width={48} height={20} rx={4} fill={C.accentDim} />
        <text x={CX + 8} y={CY + 418} fill={C.text} fontSize={8} fontWeight={500} fontFamily={FONT}>6 Open</text>
        <rect x={CX + 56} y={CY + 405} width={52} height={20} rx={4} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 63} y={CY + 418} fill={C.textSec} fontSize={8} fontFamily={FONT}>82 Done</text>
        {/* Search */}
        <rect x={CX + 120} y={CY + 405} width={110} height={20} rx={4} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 130} y={CY + 418} fill={C.textMuted} fontSize={8} fontFamily={FONT}>Search...</text>
      </motion.g>
    </motion.g>
  );
}
