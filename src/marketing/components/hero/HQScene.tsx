/* ═══════════════════════════════════════════════════════════
   HQScene — Financial HQ dashboard with chart + transactions
   Source: HQ dashboard + Transactions screenshots
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { C, FONT, MONO, CX, CY, CW, stagger, fadeIn, EASE } from './tokens';

const TRANSACTIONS = [
  { name: 'CHARGEPOINT INC 408-8414500 CA', date: '2026-02-04 · WBC · …3586', amount: '-$14.85' },
  { name: 'TESLA COMMERCE US PALO', date: '2026-02-04 · WBC · …3586', amount: '-$120.73' },
  { name: 'PUBLIC STORAGE 230 CA', date: '2026-02-03 · WBC · …0807', amount: '-$203.00' },
  { name: 'SPECTRUM', date: '2026-02-03 · WBC · …0807', amount: '-$30.00' },
  { name: 'YSP 825 SOUTH HILL 213-27 CA', date: '2026-02-03 · WBC · …0807', amount: '-$4,261.83' },
];

const CATEGORIES = [
  { name: 'Client Revenue', amount: '$313,794', w: 0.95, accent: false },
  { name: 'Owner Draw', amount: '-$119,094', w: 0.55, accent: true },
  { name: 'Rent / Workspace', amount: '-$51,052', w: 0.30, accent: true },
  { name: 'Labor (Freelance)', amount: '-$98,833', w: 0.46, accent: true },
  { name: 'Materials & Purch…', amount: '-$22,739', w: 0.18, accent: true },
];

export function HQScene() {
  const chartX = CX;
  const chartY = CY + 42;
  const chartW = CW;
  const chartH = 140;

  // Line chart path approximating the 1Y balance from screenshot
  const pts: [number, number][] = [
    [0, 0.52], [0.03, 0.54], [0.06, 0.50], [0.09, 0.48], [0.12, 0.52],
    [0.16, 0.50], [0.20, 0.46], [0.24, 0.38], [0.28, 0.28], [0.32, 0.18],
    [0.36, 0.12], [0.40, 0.08], [0.44, 0.15], [0.48, 0.06], [0.52, 0.04],
    [0.56, 0.08], [0.60, 0.10], [0.64, 0.42], [0.68, 0.48], [0.72, 0.52],
    [0.76, 0.56], [0.80, 0.62], [0.84, 0.65], [0.88, 0.70], [0.92, 0.76],
    [0.96, 0.80], [1.0, 0.78],
  ];

  const chartPath = pts
    .map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${chartX + px * chartW},${chartY + py * chartH}`)
    .join(' ');

  const areaPath = chartPath + ` L${chartX + chartW},${chartY + chartH} L${chartX},${chartY + chartH} Z`;

  return (
    <motion.g variants={stagger} initial="hidden" animate="show">
      {/* ── HQ Header ── */}
      <motion.g variants={fadeIn}>
        <text x={CX} y={CY + 16} fill={C.text} fontSize={15} fontWeight={600} fontFamily={FONT}>HQ</text>
        <text x={CX} y={CY + 30} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          Ending $27,073  Last sync 6:47 PM  facct: 500 trns
        </text>
        {/* Time filter pills */}
        {['W', 'M', '3M', 'YTD', '1Y', 'ALL', 'Bal'].map((f, i) => (
          <g key={i}>
            <rect
              x={CX + CW - 225 + i * 32} y={CY + 6}
              width={28} height={16} rx={4}
              fill={f === '1Y' ? C.accentDim : C.white05}
            />
            <text
              x={CX + CW - 225 + i * 32 + 14} y={CY + 17}
              fill={f === '1Y' ? C.accent : C.textMuted}
              fontSize={7} fontWeight={f === '1Y' ? 600 : 400} fontFamily={FONT} textAnchor="middle"
            >
              {f}
            </text>
          </g>
        ))}
      </motion.g>

      {/* ── Chart area ── */}
      <motion.g variants={fadeIn}>
        <rect x={chartX} y={chartY} width={chartW} height={chartH} rx={0} fill={C.surface} />
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((y, i) => (
          <line key={i} x1={chartX} y1={chartY + y * chartH} x2={chartX + chartW} y2={chartY + y * chartH} stroke={C.border} strokeWidth={0.5} />
        ))}
        {/* Y labels */}
        <text x={chartX + 4} y={chartY + 10} fill={C.textMuted} fontSize={6} fontFamily={FONT}>$200K</text>
        <text x={chartX + 4} y={chartY + chartH * 0.5} fill={C.textMuted} fontSize={6} fontFamily={FONT}>$100K</text>

        {/* Area fill */}
        <path d={areaPath} fill={C.tealDim} opacity={0.3} />

        {/* Line chart with draw animation */}
        <motion.path
          d={chartPath}
          fill="none"
          stroke={C.teal}
          strokeWidth={1.8}
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
        />

        {/* Tooltip indicator (near the peak) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        >
          <circle cx={chartX + 0.52 * chartW} cy={chartY + 0.04 * chartH} r={3} fill={C.teal} stroke={C.bg} strokeWidth={1.5} />
          <rect x={chartX + 0.52 * chartW - 50} y={chartY + 0.04 * chartH - 38} width={100} height={32} rx={4} fill={C.card} stroke={C.border} strokeWidth={0.5} />
          <text x={chartX + 0.52 * chartW - 42} y={chartY + 0.04 * chartH - 24} fill={C.textMuted} fontSize={6} fontFamily={FONT}>2025-07-02</text>
          <text x={chartX + 0.52 * chartW - 42} y={chartY + 0.04 * chartH - 14} fill={C.text} fontSize={7} fontWeight={600} fontFamily={MONO}>Balance: $193,810</text>
        </motion.g>
      </motion.g>

      {/* ── Summary bar ── */}
      <motion.g variants={fadeIn}>
        <text x={CX + 40} y={CY + 196} fill={C.textMuted} fontSize={7} fontFamily={FONT}>Range: 1Y</text>
        <rect x={CX + 140} y={CY + 189} width={6} height={6} rx={3} fill={C.teal} />
        <text x={CX + 150} y={CY + 196} fill={C.textMuted} fontSize={7} fontFamily={FONT}>In: $334,298</text>
        <rect x={CX + 370} y={CY + 189} width={6} height={6} rx={3} fill={C.accent} />
        <text x={CX + 380} y={CY + 196} fill={C.textMuted} fontSize={7} fontFamily={FONT}>Out: $336,275</text>
        <text x={CX + CW - 10} y={CY + 196} fill={C.accent} fontSize={7} fontWeight={600} fontFamily={MONO} textAnchor="end">Net: -$1,977</text>
      </motion.g>

      {/* ── KPI Cards ── */}
      <motion.g variants={fadeIn}>
        {[
          { label: 'CASH ON HAND', value: '$27,073', sub: 'Total anchored + net' },
          { label: 'RUNWAY', value: 'Stable', sub: 'Cash / mandatory' },
          { label: 'MANDATORY BURN', value: '$0', sub: 'Avg / mo' },
          { label: 'NET CASH (YTD)', value: '-$13,706', sub: 'In: $2,577', neg: true },
          { label: 'VARIABLE', value: '$25,033', sub: 'Avg / mo' },
        ].map((kpi, i) => {
          const kw = CW / 5 - 8;
          const kx = CX + i * (kw + 10);
          return (
            <g key={i}>
              <rect x={kx} y={CY + 208} width={kw} height={50} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
              <text x={kx + 8} y={CY + 222} fill={C.textMuted} fontSize={6.5} fontFamily={FONT} letterSpacing="0.03em">{kpi.label}</text>
              <text x={kx + 8} y={CY + 240} fill={kpi.neg ? C.accent : C.text} fontSize={12} fontWeight={600} fontFamily={MONO}>{kpi.value}</text>
              <text x={kx + 8} y={CY + 252} fill={C.textMuted} fontSize={6} fontFamily={FONT}>{kpi.sub}</text>
            </g>
          );
        })}
      </motion.g>

      {/* ── Three-panel row ── */}
      <motion.g variants={fadeIn}>
        {/* Accounts */}
        <rect x={CX} y={CY + 270} width={CW / 3 - 8} height={50} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 10} y={CY + 285} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT}>ACCOUNTS</text>
        <text x={CX + 10} y={CY + 304} fill={C.text} fontSize={8} fontFamily={FONT}>WF Business Checking</text>
        <text x={CX + 168} y={CY + 304} fill={C.text} fontSize={9} fontWeight={600} fontFamily={MONO}>$27,073</text>
        <rect x={CX + 225} y={CY + 296} width={44} height={14} rx={3} fill={C.successDim} />
        <text x={CX + 232} y={CY + 306} fill={C.success} fontSize={6.5} fontFamily={FONT}>Anchored</text>

        {/* Recurring */}
        <rect x={CX + CW / 3 + 4} y={CY + 270} width={CW / 3 - 8} height={50} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + CW / 3 + 14} y={CY + 285} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT}>RECURRING</text>
        <text x={CX + CW / 3 + 14} y={CY + 304} fill={C.textSec} fontSize={8} fontFamily={FONT}>Feb 12 – Feb 02</text>
        <rect x={CX + CW / 3 + 186} y={CY + 296} width={60} height={14} rx={4} fill={C.white05} />
        <text x={CX + CW / 3 + 194} y={CY + 306} fill={C.textSec} fontSize={7} fontFamily={FONT}>Total $0/mo</text>

        {/* Top Categories */}
        <rect x={CX + 2 * CW / 3 + 4} y={CY + 270} width={CW / 3 - 4} height={50} rx={6} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 2 * CW / 3 + 14} y={CY + 285} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT}>TOP CATEGORIES</text>
        {CATEGORIES.slice(0, 2).map((cat, i) => (
          <g key={i}>
            <text x={CX + 2 * CW / 3 + 14} y={CY + 300 + i * 10} fill={C.textSec} fontSize={6.5} fontFamily={FONT}>{cat.name}</text>
            <rect x={CX + 2 * CW / 3 + 120} y={CY + 294 + i * 10} width={cat.w * 100} height={5} rx={2} fill={cat.accent ? C.accent : C.teal} opacity={0.5} />
          </g>
        ))}
      </motion.g>

      {/* ── Latest Transactions ── */}
      <motion.g variants={fadeIn}>
        <text x={CX} y={CY + 342} fill={C.text} fontSize={10} fontWeight={600} fontFamily={FONT}>LATEST TRANSACTIONS</text>
        <text x={CX + 145} y={CY + 342} fill={C.textMuted} fontSize={8} fontFamily={FONT}>Preview</text>
      </motion.g>

      {TRANSACTIONS.map((txn, i) => {
        const ty = CY + 355 + i * 28;
        return (
          <motion.g key={i} variants={fadeIn}>
            <line x1={CX} y1={ty + 24} x2={CX + CW} y2={ty + 24} stroke={C.border} strokeWidth={0.5} />
            {/* Icon placeholder */}
            <circle cx={CX + 10} cy={ty + 10} r={7} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
            <text x={CX + 24} y={ty + 8} fill={C.text} fontSize={8} fontWeight={500} fontFamily={FONT}>{txn.name}</text>
            <text x={CX + 24} y={ty + 20} fill={C.textMuted} fontSize={7} fontFamily={FONT}>{txn.date}</text>
            <text x={CX + CW - 10} y={ty + 13} fill={C.accent} fontSize={9} fontWeight={600} fontFamily={MONO} textAnchor="end">{txn.amount}</text>
          </motion.g>
        );
      })}
    </motion.g>
  );
}
