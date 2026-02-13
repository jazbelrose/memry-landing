/* ═══════════════════════════════════════════════════════════
   BudgetScene — Budget board with summary cards + line items
   Source: LA Awards Week Gala budget screenshot
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { C, FONT, MONO, CX, CY, CW, stagger, fadeIn, fadeInSlow, EASE } from './tokens';

const LINE_ITEMS = [
  { code: 'PARKING-FUEL-TOLLS-0018', cat: 'PARKING, FUEL, TOLLS', qty: '1 Lot', cost: '$220', mk: '0%', price: '$220' },
  { code: 'FABRICATION-0004', cat: 'SCENIC BUILD', qty: '1 Lot', cost: '$41,000', mk: '35%', price: '$51,300' },
  { code: 'LABOR-0022', cat: 'OVERTIME BUFFER', qty: '1 Lot', cost: '$650', mk: '35%', price: '$9,975' },
  { code: 'RENTALS-0001', cat: 'FULL DRAPE PACKAGE', qty: '1 Lot', cost: '$18,500', mk: '35%', price: '$14,075' },
  { code: 'LABOR-0011', cat: 'CREW INSTALL DAY RATE', qty: '4 Days', cost: '$520', mk: '35%', price: '$2,808' },
  { code: 'RENTALS-0013', cat: 'PIPE DRAPE RENTAL 200 LF', qty: '200 LF', cost: '$9', mk: '35%', price: '$2,430' },
  { code: 'LIGHTING-0005', cat: 'LED PLAYBACK', qty: '1 Lot', cost: '$18,000', mk: '35%', price: '$37,500' },
  { code: 'LABOR-0010', cat: 'LEAD TECH INSTALL DAY RATE', qty: '1 Days', cost: '$780', mk: '35%', price: '$1,080' },
];

export function BudgetScene() {
  const donutR = 40;
  const donutCx = CX + CW - 88;
  const donutCy = CY + 108;
  const circumference = 2 * Math.PI * donutR;

  return (
    <motion.g variants={stagger} initial="hidden" animate="show">
      {/* ── Project name ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX - 2} y={CY + 4} width={20} height={20} rx={5} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 24} y={CY + 18} fill={C.text} fontSize={12} fontWeight={500} fontFamily={FONT}>LA Awards Week Gala</text>
      </motion.g>

      {/* ── BUDGET heading ── */}
      <motion.g variants={fadeIn}>
        <text x={CX} y={CY + 48} fill={C.text} fontSize={11} fontWeight={700} fontFamily={FONT} letterSpacing="0.06em">BUDGET</text>
        <text x={CX + 60} y={CY + 48} fill={C.textMuted} fontSize={9} fontFamily={FONT}>As of 2/11/2026</text>
        <rect x={CX + CW - 50} y={CY + 38} width={42} height={16} rx={4} fill={C.white05} />
        <text x={CX + CW - 40} y={CY + 49} fill={C.textSec} fontSize={8} fontFamily={FONT}>REV 1</text>
      </motion.g>

      {/* ── Summary cards ── */}
      <motion.g variants={fadeIn}>
        {/* TARGET */}
        <rect x={CX} y={CY + 60} width={165} height={48} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <circle cx={CX + 14} cy={CY + 76} r={7} fill={C.successDim} stroke={C.success} strokeWidth={0.7} />
        <text x={CX + 28} y={CY + 79} fill={C.textMuted} fontSize={8} fontFamily={FONT}>TARGET</text>
        <rect x={CX + 82} y={CY + 70} width={68} height={14} rx={3} fill={C.successDim} />
        <text x={CX + 88} y={CY + 80} fill={C.success} fontSize={7} fontWeight={600} fontFamily={FONT}>CLIENT BUDGET</text>
        <text x={CX + 10} y={CY + 100} fill={C.text} fontSize={10} fontFamily={FONT}>Set target</text>

        {/* COST */}
        <rect x={CX + 175} y={CY + 60} width={165} height={48} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <rect x={CX + 187} y={CY + 70} width={10} height={10} rx={3} fill={C.tealDim} stroke={C.teal} strokeWidth={0.6} />
        <text x={CX + 203} y={CY + 79} fill={C.textMuted} fontSize={8} fontFamily={FONT}>COST</text>
        <rect x={CX + 287} y={CY + 70} width={42} height={14} rx={3} fill={C.white05} />
        <text x={CX + 293} y={CY + 80} fill={C.textSec} fontSize={7} fontFamily={FONT}>CURRENT</text>
        <text x={CX + 185} y={CY + 100} fill={C.text} fontSize={14} fontWeight={600} fontFamily={MONO}>$209,875</text>

        {/* SPEND */}
        <rect x={CX + 350} y={CY + 60} width={145} height={48} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <circle cx={CX + 364} cy={CY + 76} r={7} fill={C.goldDim} stroke={C.gold} strokeWidth={0.6} />
        <text x={CX + 378} y={CY + 79} fill={C.textMuted} fontSize={8} fontFamily={FONT}>SPEND</text>
        <text x={CX + 445} y={CY + 79} fill={C.textMuted} fontSize={7} fontFamily={FONT}>0% USED</text>
        <text x={CX + 360} y={CY + 100} fill={C.text} fontSize={14} fontWeight={600} fontFamily={MONO}>$0</text>
      </motion.g>

      {/* ── Margin + Client Total ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 118} width={216} height={42} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <rect x={CX + 10} y={CY + 126} width={8} height={8} rx={4} fill={C.accentDim} stroke={C.accent} strokeWidth={0.6} />
        <text x={CX + 26} y={CY + 135} fill={C.textMuted} fontSize={7} fontFamily={FONT}>MARGIN</text>
        <text x={CX + 104} y={CY + 135} fill={C.textMuted} fontSize={7} fontFamily={FONT}>PROFIT</text>
        <text x={CX + 12} y={CY + 152} fill={C.text} fontSize={13} fontWeight={600} fontFamily={MONO}>$66,255</text>
        <text x={CX + 105} y={CY + 152} fill={C.textSec} fontSize={9} fontFamily={FONT}>24%</text>

        <rect x={CX + 226} y={CY + 118} width={270} height={42} rx={6} fill={C.card} stroke={C.borderCard} strokeWidth={0.8} />
        <rect x={CX + 236} y={CY + 126} width={8} height={8} rx={2} fill={C.tealDim} stroke={C.teal} strokeWidth={0.6} />
        <text x={CX + 254} y={CY + 135} fill={C.textMuted} fontSize={7} fontFamily={FONT}>CLIENT TOTAL</text>
        <text x={CX + 370} y={CY + 135} fill={C.textMuted} fontSize={7} fontFamily={FONT}>ESTIMATE</text>
        <text x={CX + 236} y={CY + 152} fill={C.text} fontSize={16} fontWeight={700} fontFamily={MONO}>$276,130</text>
      </motion.g>

      {/* ── Donut chart ── */}
      <motion.g variants={fadeInSlow}>
        {/* Background ring */}
        <circle cx={donutCx} cy={donutCy} r={donutR} fill="none" stroke={C.white05} strokeWidth={13} />
        {/* Cost arc (76%) */}
        <motion.circle
          cx={donutCx} cy={donutCy} r={donutR}
          fill="none" stroke={C.gold} strokeWidth={13}
          strokeDasharray={`${0.76 * circumference} ${circumference}`}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          opacity={0.8}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.25 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
        />
        {/* Margin arc (24%) */}
        <motion.circle
          cx={donutCx} cy={donutCy} r={donutR}
          fill="none" stroke={C.textMuted} strokeWidth={13}
          strokeDasharray={`${0.24 * circumference} ${circumference}`}
          strokeDashoffset={circumference * 0.25 - 0.76 * circumference}
          strokeLinecap="round"
          opacity={0.35}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        />
        {/* Center label */}
        <text x={donutCx} y={donutCy - 2} fill={C.text} fontSize={11} fontWeight={700} fontFamily={MONO} textAnchor="middle">$276,130</text>
        {/* Legend */}
        <circle cx={donutCx - 28} cy={donutCy + donutR + 14} r={3} fill={C.gold} />
        <text x={donutCx - 20} y={donutCy + donutR + 17} fill={C.textSec} fontSize={7} fontFamily={FONT}>Cost</text>
        <circle cx={donutCx + 8} cy={donutCy + donutR + 14} r={3} fill={C.textMuted} />
        <text x={donutCx + 16} y={donutCy + donutR + 17} fill={C.textSec} fontSize={7} fontFamily={FONT}>Margin</text>
      </motion.g>

      {/* ── Filter + Pagination ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 174} width={44} height={18} rx={4} fill={C.white05} />
        <text x={CX + 10} y={CY + 186} fill={C.textSec} fontSize={8} fontFamily={FONT}>Filter</text>
        <text x={CX + 60} y={CY + 186} fill={C.textSec} fontSize={8} fontFamily={FONT}>‹  1  2  3  ›  10 / page</text>
        <rect x={CX + CW - 75} y={CY + 174} width={66} height={18} rx={4} fill={C.white05} />
        <text x={CX + CW - 62} y={CY + 186} fill={C.textSec} fontSize={8} fontFamily={FONT}>+ Add Item</text>
      </motion.g>

      {/* ── Line items (2-column grid) ── */}
      {LINE_ITEMS.map((item, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const iw = (CW - 14) / 2;
        const ix = CX + col * (iw + 14);
        const iy = CY + 202 + row * 66;
        return (
          <motion.g key={idx} variants={fadeIn}>
            <rect x={ix} y={iy} width={iw} height={58} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
            {/* Code */}
            <text x={ix + 10} y={iy + 14} fill={C.textSec} fontSize={7} fontFamily={FONT}>{item.code}</text>
            {/* Category name */}
            <text x={ix + 10} y={iy + 28} fill={C.text} fontSize={9} fontWeight={500} fontFamily={FONT}>{item.cat}</text>
            {/* Cost info */}
            <text x={ix + iw - 10} y={iy + 14} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="end">
              QTY {item.qty}   COST {item.cost}
            </text>
            <text x={ix + iw - 10} y={iy + 28} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="end">
              MK {item.mk}   PRICE {item.price}
            </text>
            {/* Action links */}
            <text x={ix + 10} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>Tasks · 0</text>
            <text x={ix + 70} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>↗ Spend</text>
            {/* DUE badge */}
            <rect x={ix + iw - 38} y={iy + 38} width={28} height={14} rx={3} fill={C.accentDim} />
            <text x={ix + iw - 32} y={iy + 48} fill={C.accent} fontSize={7} fontWeight={600} fontFamily={FONT}>DUE</text>
          </motion.g>
        );
      })}
    </motion.g>
  );
}
