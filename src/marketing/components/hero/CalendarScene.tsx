/* ═══════════════════════════════════════════════════════════
   CalendarScene — Weekly calendar with focus blocks
   Source: LA Awards Week Gala calendar screenshot
   ═══════════════════════════════════════════════════════════ */
import { motion } from 'framer-motion';
import { C, FONT, CX, CY, CW, CH, stagger, fadeIn } from './tokens';
import { GalaLogo } from './GalaLogo';

const FOCUS_BLOCKS = [
  {
    day: 0, startH: 1.5, dur: 4,
    label: 'Focus Block',
    tasks: ['Kickoff call → roles, comma…', 'Scope brief → write 12-line s…', 'Budget pass → confirm $25…', 'Uno Frame → map to 8 edit…', 'Venue shortlist → lighting…'],
  },
  {
    day: 1, startH: 1.5, dur: 3.2,
    label: 'Focus Block',
    tasks: ['Lighting RFQ → plot assump…', 'Audio RFQ → system spec +…', 'LED/playback RFQ → wall d…', 'Drama package RFQ → trim…'],
  },
  {
    day: 2, startH: 1.5, dur: 3,
    label: 'Focus Block',
    tasks: ['Run-of-show draft → doors/…', 'Draping model → confirm fix…', 'Tracking plan → 20-27 kiosk…', 'Purchase order prep → appr…'],
  },
  {
    day: 3, startH: 0.5, dur: 3,
    label: 'Focus Block',
    tasks: ['Site walk (or remote) → mea…', 'Floorplan pass → guest flow…'],
  },
  {
    day: 4, startH: 1.5, dur: 2.5,
    label: 'Focus Block',
    tasks: ['Client review call → confir…', 'Approval routing → 3 lightin…', 'Margin check → update sma…'],
  },
  {
    day: 5, startH: 1.5, dur: 2.5,
    label: 'Focus Block',
    tasks: ['Scenic build check → 3 pro…', 'Lighting plot final → addres…', 'Audio system confirm → ou…'],
  },
];

const CAL_DAYS = [
  [26, 27, 28, 29, 30, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, 1, 2, 3, 4, 5, 6],
];

const DAYS = ['SUN 10', 'MON 11', 'TUE 12', 'WED 13', 'THU 14', 'FRI 15', 'SAT 16'];

export function CalendarScene() {
  const sideW = 178;
  const mainX = CX + sideW + 10;
  const mainW = CW - sideW - 10;
  const dayW = mainW / 7;
  const headerH = 22;
  const hourH = 48;

  return (
    <motion.g variants={stagger} initial="hidden" animate="show">
      {/* ── Project name ── */}
      <motion.g variants={fadeIn}>
        <GalaLogo x={CX - 2} y={CY + 4} size={20} />
        <text x={CX + 24} y={CY + 18} fill={C.text} fontSize={12} fontWeight={500} fontFamily={FONT}>LA Awards Week Gala</text>
      </motion.g>

      {/* ── View toggles ── */}
      <motion.g variants={fadeIn}>
        {[
          { label: 'Day', active: false },
          { label: 'Week', active: true },
          { label: 'Month', active: false },
        ].map((btn, i) => (
          <g key={i}>
            <rect
              x={CX + CW - 210 + i * 50} y={CY + 6}
              width={44} height={18} rx={4}
              fill={btn.active ? C.accentDim : C.white05}
            />
            <text
              x={CX + CW - 210 + i * 50 + 22} y={CY + 18}
              fill={btn.active ? C.accent : C.textSec}
              fontSize={8} fontWeight={btn.active ? 600 : 400} fontFamily={FONT} textAnchor="middle"
            >
              {btn.label}
            </text>
          </g>
        ))}
        {/* Spellbook button */}
        <rect x={CX + CW - 55} y={CY + 6} width={55} height={18} rx={4} fill={C.accentBg} stroke={C.accent} strokeWidth={0.3} />
        <text x={CX + CW - 44} y={CY + 18} fill={C.accent} fontSize={7} fontWeight={500} fontFamily={FONT}>✦ Spellbook</text>
      </motion.g>

      {/* ── Sidebar: Mini calendar ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 34} width={sideW} height={152} rx={6} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 12} y={CY + 52} fill={C.text} fontSize={10} fontWeight={600} fontFamily={FONT}>May 2026</text>
        <text x={CX + 92} y={CY + 52} fill={C.accent} fontSize={8} fontFamily={FONT}>Today</text>

        {/* Day headers */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <text key={i} x={CX + 16 + i * 22} y={CY + 68} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="middle">{d}</text>
        ))}

        {/* Calendar grid */}
        {CAL_DAYS.map((week, wi) =>
          week.map((day, di) => {
            const isToday = wi === 2 && di === 2;
            const isCurrWeek = wi === 2;
            return (
              <g key={`${wi}-${di}`}>
                {isToday && <circle cx={CX + 16 + di * 22} cy={CY + 80 + wi * 13} r={7} fill={C.accentDim} />}
                {isCurrWeek && !isToday && <circle cx={CX + 16 + di * 22} cy={CY + 80 + wi * 13} r={7} fill={C.white03} />}
                <text
                  x={CX + 16 + di * 22} y={CY + 83 + wi * 13}
                  fill={isToday ? C.accent : (wi === 0 && di < 5) || (wi === 5 && di > 0) ? C.textMuted : C.textSec}
                  fontSize={7} fontFamily={FONT} textAnchor="middle"
                >
                  {day}
                </text>
              </g>
            );
          })
        )}
      </motion.g>

      {/* ── Sidebar: Events & Tasks ── */}
      <motion.g variants={fadeIn}>
        <rect x={CX} y={CY + 194} width={sideW} height={240} rx={6} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        <text x={CX + 12} y={CY + 214} fill={C.text} fontSize={9} fontWeight={600} fontFamily={FONT}>Events & Tasks</text>
        <rect x={CX + 12} y={CY + 224} width={80} height={16} rx={4} fill={C.white05} />
        <text x={CX + 20} y={CY + 235} fill={C.textSec} fontSize={7} fontFamily={FONT}>Upcoming · Open</text>
        <text x={CX + 12} y={CY + 260} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT}>OPEN TASKS</text>
        <text x={CX + 110} y={CY + 260} fill={C.textMuted} fontSize={7} fontFamily={FONT}>5 tasks</text>

        {/* Focus block task entries */}
        {['Mon, May 11', 'Tue, May 12', 'Wed, May 13', 'Thu, May 14', 'Fri, May 15'].map((date, i) => (
          <g key={i}>
            <rect x={CX + 10} y={CY + 272 + i * 30} width={sideW - 20} height={24} rx={4} fill={C.card} stroke={C.border} strokeWidth={0.5} />
            <rect x={CX + 16} y={CY + 276 + i * 30} width={5} height={16} rx={2} fill={C.olive} />
            <text x={CX + 28} y={CY + 284 + i * 30} fill={C.text} fontSize={8} fontWeight={500} fontFamily={FONT}>Focus Block</text>
            <rect x={CX + 118} y={CY + 278 + i * 30} width={28} height={12} rx={3} fill={C.accentDim} />
            <text x={CX + 123} y={CY + 287 + i * 30} fill={C.accent} fontSize={6} fontWeight={600} fontFamily={FONT}>TODO</text>
            <text x={CX + 28} y={CY + 294 + i * 30} fill={C.textMuted} fontSize={6} fontFamily={FONT}>Due {date}</text>
          </g>
        ))}
      </motion.g>

      {/* ── Main: Week view grid ── */}
      <motion.g variants={fadeIn}>
        <rect x={mainX} y={CY + 34} width={mainW} height={CH - 28} rx={0} fill={C.surface} stroke={C.border} strokeWidth={0.5} />

        {/* Day headers */}
        {DAYS.map((day, i) => (
          <g key={i}>
            {i > 0 && <line x1={mainX + i * dayW} y1={CY + 34} x2={mainX + i * dayW} y2={CY + CH + 6} stroke={C.border} strokeWidth={0.5} />}
            <text
              x={mainX + i * dayW + dayW / 2} y={CY + 48}
              fill={day.startsWith('FRI') ? C.accent : C.textSec}
              fontSize={8} fontWeight={500} fontFamily={FONT} textAnchor="middle"
            >
              {day}
            </text>
          </g>
        ))}
        <line x1={mainX} y1={CY + 34 + headerH} x2={mainX + mainW} y2={CY + 34 + headerH} stroke={C.border} strokeWidth={0.5} />

        {/* Hour gridlines */}
        {['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'].map((h, i) => (
          <g key={i}>
            <line x1={mainX} y1={CY + 56 + headerH + i * hourH} x2={mainX + mainW} y2={CY + 56 + headerH + i * hourH} stroke={C.border} strokeWidth={0.3} />
            <text x={mainX + 4} y={CY + 54 + headerH + i * hourH} fill={C.textMuted} fontSize={6} fontFamily={FONT}>{h}</text>
          </g>
        ))}
      </motion.g>

      {/* ── Focus blocks ── */}
      {FOCUS_BLOCKS.map((block, idx) => {
        const bx = mainX + block.day * dayW + 3;
        const bw = dayW - 6;
        const by = CY + 56 + headerH + block.startH * hourH;
        const bh = block.dur * hourH;

        return (
          <motion.g key={idx} variants={fadeIn}>
            <rect x={bx} y={by} width={bw} height={bh} rx={4} fill={C.oliveDim} stroke={C.olive} strokeWidth={0.5} />
            {/* Block header */}
            <text x={bx + 5} y={by + 12} fill={C.text} fontSize={7} fontWeight={600} fontFamily={FONT}>✦ {block.label}</text>
            {/* Task checklist */}
            {block.tasks.slice(0, Math.min(block.tasks.length, Math.floor(bh / 14) - 1)).map((task, ti) => (
              <g key={ti}>
                <rect x={bx + 6} y={by + 18 + ti * 13} width={5} height={5} rx={1} fill="none" stroke={C.textMuted} strokeWidth={0.5} />
                <text x={bx + 14} y={by + 23 + ti * 13} fill={C.textSec} fontSize={5.5} fontFamily={FONT}>
                  {task.slice(0, Math.floor(bw / 3.5))}
                </text>
              </g>
            ))}
          </motion.g>
        );
      })}

      {/* ── OOB task indicators ── */}
      {[1, 2, 3, 5, 6].map((day, i) => (
        <motion.g key={i} variants={fadeIn}>
          <rect x={mainX + day * dayW + dayW / 2 - 10} y={CY + CH - 14} width={20} height={12} rx={3} fill={C.white05} />
          <text x={mainX + day * dayW + dayW / 2} y={CY + CH - 6} fill={C.textMuted} fontSize={6} fontFamily={FONT} textAnchor="middle">0/8</text>
        </motion.g>
      ))}
    </motion.g>
  );
}
