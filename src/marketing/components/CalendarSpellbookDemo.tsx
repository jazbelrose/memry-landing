/* ═══════════════════════════════════════════════════════════
   CalendarSpellbookDemo — Animated SVG showing Calendar +
   Spellbook modal. GSAP timeline loops:
   1) Calendar view (week grid, mostly empty)
   2) Cursor → Spellbook button click
   3) Modal fades/zooms in
   4) Paste text appears in textarea
   5) Breakdown style → Producer Standard highlights
   6) Focus Block → Balanced row highlights
   7) "Create Tasks" button pulses + click
   8) Modal fades out
   9) Focus blocks populate across week (soft drop+scale)
   10) Sidebar tasks count ticks up, task entries appear
   11) Reset: fade blocks out → loop
   ═══════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import { C, FONT, MONO } from './hero/tokens';
import styles from './CalendarSpellbookDemo.module.css';

/* ── Layout constants ───────────────────────────────────── */
const W = 1200;
const H = 700;
const SB_W = 48;

/* Content area */
const PX = SB_W + 16;
const PY = 12;
const PW = W - PX - 16;

/* Calendar sidebar */
const SIDE_W = 220;
const MAIN_X = PX + SIDE_W + 12;
const MAIN_W = PW - SIDE_W - 12;
const DAY_W = MAIN_W / 7;
const HEADER_H = 26;
const HOUR_H = 52;

/* Hour labels start Y */
const GRID_Y = PY + 70;

const DAYS = ['SUN 10', 'MON 11', 'TUE 12', 'WED 13', 'THU 14', 'FRI 15', 'SAT 16'];
const HOURS = ['7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];

/* Mini-calendar (May 2026) */
const CAL_ROWS = [
  [26, 27, 28, 29, 30, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, 1, 2, 3, 4, 5, 6],
];

/* Focus blocks that appear after "Create Tasks" */
const FOCUS_BLOCKS = [
  { day: 1, startH: 2, dur: 3.5, label: 'Focus Block', tasks: ['Kickoff call → roles, comms…', 'Scope brief → write 12-line s…', 'Budget pass → confirm $25…', 'Line items → map top 8 cate…', 'Vendor shortlist → lighting…'] },
  { day: 2, startH: 2, dur: 3, label: 'Focus Block', tasks: ['Lighting RFQ → plot assump…', 'Audio RFQ → system spec +…', 'LED/playback RFQ → wall sl…', 'Drape package RFQ → linea…'] },
  { day: 3, startH: 1, dur: 3, label: 'Focus Block', tasks: ['Site walk (or remote) → mea…', 'Floorplan pass → guest flow…', 'Run-of-show draft → doors…'] },
  { day: 4, startH: 2, dur: 2.5, label: 'Focus Block', tasks: ['Client review call → confirm…', 'Approval routing → Lighting…', 'Margin check → update sma…'] },
  { day: 5, startH: 2, dur: 2.5, label: 'Focus Block', tasks: ['Scenic build check-in → pro…', 'Lighting plot final → address…', 'Audio system confirm → up…'] },
];

/* Sidebar task entries */
const SIDEBAR_TASKS = [
  { label: 'Focus Block', date: 'Due Mon, May 11' },
  { label: 'Focus Block', date: 'Due Tue, May 12' },
  { label: 'Focus Block', date: 'Due Wed, May 13' },
  { label: 'Focus Block', date: 'Due Thu, May 14' },
  { label: 'Focus Block', date: 'Due Fri, May 15' },
];

/* ── Modal constants ────────────────────────────────────── */
const MOD_W = 860;
const MOD_H = 480;
const MOD_X = (W - MOD_W) / 2;
const MOD_Y = (H - MOD_H) / 2;
const MOD_R = 14;

/* Modal left textarea */
const TXT_X = MOD_X + 20;
const TXT_Y = MOD_Y + 56;
const TXT_W = 400;
const TXT_H = MOD_H - 130;

/* Modal right panel */
const RP_X = MOD_X + TXT_W + 36;
const RP_W = MOD_W - TXT_W - 56;
const RP_Y = MOD_Y + 56;

/* Paste text */
const PASTE_LINES = [
  '- Site walk → measurements + photos (45m)',
  '- Drape plot v3 → elevations + softgoods (1h)',
  '- Step & repeat → proof review + approve (35m)',
  '- Vendor RFQs → scenic + print + labor (1h)',
  '- C4D/Redshift → hero render pass (2h)',
  '- Invoice draft + send (30m)',
];

/* Breakdown tiles */
const BD_TILES = [
  { id: 'bdLean', label: 'Lean', desc: 'Just titles, quick durations' },
  { id: 'bdProducer', label: 'Producer Standard', desc: 'Clean clusters + realistic durations' },
  { id: 'bdDispatch', label: 'Dispatch-ready', desc: 'Assignee hints + buffers + handoff' },
  { id: 'bdBugfix', label: 'Bugfix sprint', desc: 'Short chunks, more breaks, tighter durations' },
];

/* Focus Block rows */
const FB_ROWS = [
  { id: 'fbBalanced', label: 'Balanced (9:00–5:00)', time: '09:00–17:00', desc: 'Creates 1 Focus Block container.' },
  { id: 'fbLate', label: 'Late (1:00–8:00)', time: '13:00–20:00', desc: 'Creates 1 Focus Block container.' },
  { id: 'fbSprint', label: 'Sprint (10:00–1:00)', time: '10:00–13:00', desc: 'Creates 1 Focus Block container.' },
];

export function CalendarSpellbookDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const svg = svgRef.current;
      if (!svg) return;
      /* Show final state: focus blocks visible */
      FOCUS_BLOCKS.forEach((_, i) => {
        const el = svg.querySelector(`#focusBlock${i}`) as SVGGElement;
        if (el) el.style.opacity = '1';
      });
      SIDEBAR_TASKS.forEach((_, i) => {
        const el = svg.querySelector(`#sideTask${i}`) as SVGGElement;
        if (el) el.style.opacity = '1';
      });
      return;
    }

    let cancelled = false;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        if (cancelled) return;
        const gsap = gsapMod.gsap ?? gsapMod.default;
        const svg = svgRef.current;
        if (!svg) return;

        ctx = gsap.context(() => {
          const q = (id: string) => svg.querySelector(`#${id}`);

          const pasteLines = Array.from({ length: PASTE_LINES.length }, (_, i) => q(`calPasteLine${i}`)).filter(Boolean);
          const focusBlocks = FOCUS_BLOCKS.map((_, i) => q(`focusBlock${i}`)).filter(Boolean);
          const sideTasks = SIDEBAR_TASKS.map((_, i) => q(`sideTask${i}`)).filter(Boolean);

          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0, defaults: { ease: 'power2.inOut' } });
          tlRef.current = tl;

          /* ── 1 — Show calendar, reset everything ── */
          tl.addLabel('showCalendar')
            .set('#calModalScrim', { opacity: 0 })
            .set('#calModalView', { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' })
            .set('#calCursor', { opacity: 0 })
            .set(pasteLines, { opacity: 0, y: 4 })
            .set(focusBlocks, { opacity: 0, scaleY: 0.3, transformOrigin: '50% 0%' })
            .set(sideTasks, { opacity: 0, x: -8 })
            .set('#bdHighlight', { opacity: 0 })
            .set('#fbHighlight', { opacity: 0 })
            .set('#calBtnCreateGlow', { opacity: 0 })
            .set('#calTaskCount', { textContent: '0 tasks' })
            .set('#calOpenCount', { textContent: '0' })
            .set('#calPasteTab', { opacity: 1 })
            .set('#calCaret', { opacity: 0 })
            .set('#calTaskPillCount', { textContent: '0 tasks' })
            .set('#calTaskPillCount2', { textContent: '0 tasks' })
            .to({}, { duration: 0.8 });

          /* ── 2 — Cursor moves to Spellbook button + click ── */
          tl.addLabel('cursorMove')
            .set('#calCursor', { opacity: 1, x: 0, y: 100 })
            .to('#calCursor', {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            })
            .to('#calSpellbookBtn', {
              scaleX: 0.95,
              scaleY: 0.93,
              transformOrigin: '50% 50%',
              duration: 0.08,
            })
            .to('#calSpellbookBtn', {
              scaleX: 1,
              scaleY: 1,
              duration: 0.12,
              ease: 'back.out(2)',
            })
            .set('#calCursor', { opacity: 0 });

          /* ── 3 — Open modal ── */
          tl.addLabel('openModal')
            .to('#calModalScrim', { opacity: 0.55, duration: 0.3 })
            .to('#calModalView', {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'back.out(1.2)',
            }, '<+=0.05');

          /* ── 4 — Paste text appears ── */
          tl.addLabel('pasteText')
            .to('#calCaret', { opacity: 1, duration: 0.1 })
            .to(pasteLines, {
              opacity: 1,
              y: 0,
              duration: 0.1,
              stagger: 0.04,
              ease: 'power2.out',
            })
            .to('#calCaret', { opacity: 0, duration: 0.15 }, '+=0.2');

          /* ── 5 — Breakdown style → Producer Standard highlights ── */
          tl.addLabel('selectBreakdown')
            .to('#bdHighlight', {
              opacity: 1,
              duration: 0.3,
            });

          /* Animate task pill counters */
          const pillCounter = { val: 0 };
          tl.to(pillCounter, {
            val: 12,
            duration: 0.5,
            snap: { val: 1 },
            onUpdate: () => {
              const v = Math.round(pillCounter.val);
              const el1 = q('calTaskPillCount');
              const el2 = q('calTaskPillCount2');
              if (el1) el1.textContent = v + ' tasks';
              if (el2) el2.textContent = v + ' tasks';
            },
          }, 'selectBreakdown+=0.1');

          tl.to({}, { duration: 0.3 });

          /* ── 6 — Focus Block → Balanced row highlights ── */
          tl.addLabel('selectFocusBlock')
            .to('#fbHighlight', {
              opacity: 1,
              duration: 0.3,
            })
            .to({}, { duration: 0.3 });

          /* ── 7 — "Create Tasks" button pulse + click ── */
          tl.addLabel('createTasks')
            .to('#calBtnCreateBg', {
              scaleX: 0.95,
              scaleY: 0.92,
              transformOrigin: '50% 50%',
              duration: 0.1,
              ease: 'power2.in',
            })
            .to('#calBtnCreateBg', {
              scaleX: 1,
              scaleY: 1,
              duration: 0.15,
              ease: 'back.out(2)',
            })
            .to('#calBtnCreateGlow', { opacity: 0.5, duration: 0.08 }, '-=0.12')
            .to('#calBtnCreateGlow', { opacity: 0, duration: 0.35, ease: 'power2.out' });

          /* ── 8 — Modal fades out ── */
          tl.addLabel('closeModal')
            .to('#calModalView', {
              opacity: 0,
              scale: 0.95,
              duration: 0.35,
              ease: 'power2.in',
            })
            .to('#calModalScrim', { opacity: 0, duration: 0.25 }, '<+=0.1');

          /* ── 9 — Focus blocks populate across week ── */
          tl.addLabel('populateBlocks')
            .to(focusBlocks, {
              opacity: 1,
              scaleY: 1,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power2.out',
            });

          /* ── 10 — Sidebar task count ticks up + entries appear ── */
          tl.addLabel('updateSidebar');
          const taskCounter = { val: 0 };
          tl.to(taskCounter, {
            val: 5,
            duration: 0.5,
            snap: { val: 1 },
            onUpdate: () => {
              const v = Math.round(taskCounter.val);
              const el = q('calTaskCount');
              if (el) el.textContent = v + ' tasks';
              const el2 = q('calOpenCount');
              if (el2) el2.textContent = String(v);
            },
          }, 'updateSidebar')
            .to(sideTasks, {
              opacity: 1,
              x: 0,
              duration: 0.3,
              stagger: 0.08,
              ease: 'power2.out',
            }, 'updateSidebar+=0.1');

          /* Hold */
          tl.to({}, { duration: 1.8 });

          /* ── 11 — Reset: fade blocks out ── */
          tl.addLabel('reset')
            .to(focusBlocks, {
              opacity: 0,
              scaleY: 0.3,
              duration: 0.3,
              stagger: 0.03,
              ease: 'power2.in',
            })
            .to(sideTasks, {
              opacity: 0,
              x: -8,
              duration: 0.2,
              stagger: 0.02,
            }, '<');

        }, svg);
      } catch {
        /* GSAP import failed — show static */
      }
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      tlRef.current = null;
    };
  }, []);

  const handleMouseEnter = () => tlRef.current?.pause();
  const handleMouseLeave = () => tlRef.current?.resume();

  /* ══════════════════════════════════════════════════════
     SVG RENDER
     ══════════════════════════════════════════════════════ */

  const renderSidebar = () => {
    const icons = [
      { y: 130, active: false },  // layers
      { y: 178, active: false },  // HQ
      { y: 226, active: false },  // docs
      { y: 274, active: false },  // landmark
      { y: 322, active: false },  // people
      { y: 392, active: false },  // chat
      { y: 440, active: false },  // bell
    ];
    return (
      <g>
        <rect x={0} y={0} width={SB_W} height={H} fill={C.sidebar} />
        <line x1={SB_W} y1={0} x2={SB_W} y2={H} stroke={C.border} strokeWidth={1} />
        {/* memry logo */}
        <g transform="translate(10,10) scale(0.155)" opacity={0.85}>
          <path d="M167.4,111c1.2,2.2 1.8,4.6 1.8,7.2c0,5.1-2.6,9.9-6.8,12.7l-61.2,40.7c-7,4.7-16.2,4.7-23.2,0l-61.2-40.7c-4.3-2.8-6.8-7.6-6.8-12.7c0-2.5.6-5 1.8-7.2c1.2,2.2 2.9,4.2 5.1,5.6l61.2,40.7c7,4.7 16.2,4.7 23.2,0l61.2-40.7c2.2-1.4 3.9-3.4 5.1-5.6Z" fill="#fff"/>
          <path d="M167.4,82.4c1.2,2.2 1.8,4.6 1.8,7.2c0,5.1-2.6,9.9-6.8,12.7l-61.2,40.7c-7,4.7-16.2,4.7-23.2,0l-61.2-40.7c-4.3-2.8-6.8-7.6-6.8-12.7c0-2.5.6-5 1.8-7.2c1.2,2.2 2.9,4.2 5.1,5.6l61.1,40.6c7.1,4.7 16.4,4.7 23.5,0l61.1-40.6c2.2-1.4 3.9-3.4 5.1-5.6Z" fill="#fff"/>
          <path d="M76,8.7c8.2-5.5 18.9-5.5 27.1,0l59.3,39.4c4.3,2.8 6.8,7.6 6.8,12.7c0,5.1-2.6,9.9-6.8,12.7l-59.3,39.4c-8.2,5.5-18.9,5.5-27.1,0l-59.3-39.4c-4.3-2.8-6.8-7.6-6.8-12.7c0-5.1 2.6-9.9 6.8-12.7l59.3-39.4Zm16.7,38.8l-.7.6-24.7,16.6c-4.1,2.7-4.5,6.8-1.2,9c3.4,2.2 9.5,1.8 13.6-.9l24.8-16.7.8-.5c1.6-.8 3.1-.9 3.4-.9c.3,0 2.4-.2 3.9.8l0,0c2,1.3 1.7,3.8-.7,5.4l-24.8,16.7c-4.1,2.8-4.5,6.9-1.2,9.1c3.4,2.2 9.6,1.8 13.7-.9l24.8-16.7c10.6-7.1 11.9-17.7 2.9-23.4c-5.6-3.6-12.8-3.7-14-3.7c-.1-.9-.4-5.5-5.9-9.1c-3.4-2.2-9.3-4.1-17.1-3.6c-10.3.7-17,5.2-18.2,6l-24.6,16.6c-4.1,2.7-4.5,6.8-1.2,9c3.4,2.2 9.5,1.8 13.6-.9l24.7-16.6c1.8-1.2 3.8-1.4 4.2-1.4c.3,0 2.4-.2 3.9.8l0,0c1.8,1.1 1.7,3.3 0,4.8Z" fill="#fff"/>
        </g>
        {/* + create button */}
        <rect x={8} y={56} width={32} height={36} rx={10} fill={C.accent} />
        <line x1={SB_W / 2} y1={65} x2={SB_W / 2} y2={83} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
        <line x1={16} y1={74} x2={32} y2={74} stroke="#fff" strokeWidth={2} strokeLinecap="round" />
        {/* Nav icons */}
        {icons.map((ic, i) => {
          const iconColor = ic.active ? C.accent : C.textMuted;
          const iconOp = ic.active ? 0.9 : 0.35;
          return (
            <g key={i}>
              <rect
                x={10} y={ic.y - 14} width={28} height={28} rx={8}
                fill={ic.active ? C.accentDim : C.white05}
                stroke={ic.active ? C.accent : 'none'}
                strokeWidth={ic.active ? 0.7 : 0}
              />
              {ic.active && <rect x={0} y={ic.y - 8} width={3} height={16} rx={1.5} fill={C.accent} />}
              {i === 1 ? (
                <text x={16} y={ic.y + 4} fill={iconColor} fontSize={10} fontWeight={700} fontFamily={FONT} opacity={iconOp}>HQ</text>
              ) : (
                <g transform={`translate(16,${ic.y - 8}) scale(0.667)`} stroke={iconColor} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={iconOp}>
                  {i === 0 && (<><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></>)}
                  {i === 2 && (<><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17.5v-11"/></>)}
                  {i === 3 && (<><path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/></>)}
                  {i === 4 && (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx={9} cy={7} r={4}/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></>)}
                  {i === 5 && (<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>)}
                  {i === 6 && (<><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></>)}
                </g>
              )}
            </g>
          );
        })}
        {/* Notification badges */}
        <circle cx={38} cy={icons[5].y - 10} r={6} fill={C.accent} />
        <text x={38} y={icons[5].y - 7.5} fill="#fff" fontSize={7} fontFamily={FONT} textAnchor="middle" fontWeight={700}>13</text>
        <circle cx={38} cy={icons[6].y - 10} r={4} fill={C.accent} />
        {/* Search */}
        <g opacity={0.3}>
          <rect x={10} y={H - 180} width={28} height={28} rx={8} fill={C.white05} />
          <g transform={`translate(16,${H - 174}) scale(0.667)`} stroke={C.textMuted} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx={11} cy={11} r={8}/><path d="m21 21-4.3-4.3"/>
          </g>
        </g>
        {/* Log-out arrow */}
        <g opacity={0.3}>
          <rect x={10} y={H - 120} width={28} height={28} rx={8} fill={C.white05} />
          <g transform={`translate(16,${H - 114}) scale(0.667)`} stroke={C.textMuted} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </g>
        </g>
        {/* Avatar */}
        <circle cx={SB_W / 2} cy={H - 55} r={14} fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={SB_W / 2} y={H - 51} fill={C.textMuted} fontSize={9} fontWeight={600} fontFamily={FONT} textAnchor="middle">JR</text>
      </g>
    );
  };

  const renderMiniCalendar = () => {
    const cx = PX;
    const cy = PY + 42;
    return (
      <g>
        <rect x={cx} y={cy} width={SIDE_W} height={190} rx={6} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        <text x={cx + 14} y={cy + 20} fill={C.text} fontSize={11} fontWeight={600} fontFamily={FONT}>May 2026</text>
        <text x={cx + 90} y={cy + 20} fill={C.accent} fontSize={8} fontWeight={500} fontFamily={FONT}>Today</text>
        {/* Navigation arrows */}
        <rect x={cx + 140} y={cy + 8} width={16} height={16} rx={4} fill={C.white05} />
        <text x={cx + 148} y={cy + 19} textAnchor="middle" fill={C.textMuted} fontSize={9} fontFamily={FONT}>‹</text>
        <rect x={cx + 160} y={cy + 8} width={16} height={16} rx={4} fill={C.white05} />
        <text x={cx + 168} y={cy + 19} textAnchor="middle" fill={C.textMuted} fontSize={9} fontFamily={FONT}>›</text>

        {/* Day headers */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <text key={i} x={cx + 20 + i * 28} y={cy + 40} fill={C.textMuted} fontSize={8} fontFamily={FONT} textAnchor="middle">{d}</text>
        ))}

        {/* Calendar grid */}
        {CAL_ROWS.map((week, wi) =>
          week.map((day, di) => {
            const isToday = wi === 2 && di === 1; // Mon 11
            const isCurrWeek = wi === 2;
            return (
              <g key={`${wi}-${di}`}>
                {isToday && <circle cx={cx + 20 + di * 28} cy={cy + 52 + wi * 18} r={9} fill={C.accentDim} stroke={C.accent} strokeWidth={0.5} />}
                {isCurrWeek && !isToday && <circle cx={cx + 20 + di * 28} cy={cy + 52 + wi * 18} r={9} fill={C.white03} />}
                <text
                  x={cx + 20 + di * 28} y={cy + 55 + wi * 18}
                  fill={isToday ? C.accent : (wi === 0 && di < 5) || (wi === 5 && di > 0) ? C.textMuted : C.textSec}
                  fontSize={8} fontFamily={FONT} textAnchor="middle"
                >
                  {day}
                </text>
              </g>
            );
          })
        )}

        {/* Open/Done pills */}
        <g>
          <rect x={cx + 12} y={cy + 168} width={62} height={16} rx={4} fill={C.white05} />
          <text x={cx + 18} y={cy + 179} fill={C.textSec} fontSize={7} fontFamily={FONT}>☰</text>
          <text id="calOpenCount" x={cx + 28} y={cy + 179} fill={C.textSec} fontSize={7} fontWeight={600} fontFamily={FONT}>0</text>
          <text x={cx + 36} y={cy + 179} fill={C.textSec} fontSize={7} fontFamily={FONT}>Open</text>

          <rect x={cx + 82} y={cy + 168} width={58} height={16} rx={4} fill={C.white05} />
          <text x={cx + 88} y={cy + 179} fill={C.success} fontSize={7} fontFamily={FONT}>◉</text>
          <text x={cx + 98} y={cy + 179} fill={C.textSec} fontSize={7} fontFamily={FONT}>0 Done</text>
        </g>
      </g>
    );
  };

  const renderEventsPanel = () => {
    const cx = PX;
    const cy = PY + 242;
    const panelH = H - cy - 20;
    return (
      <g>
        <rect x={cx} y={cy} width={SIDE_W} height={panelH} rx={6} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        <text x={cx + 14} y={cy + 20} fill={C.text} fontSize={10} fontWeight={600} fontFamily={FONT}>Events &amp; Tasks</text>
        <rect x={cx + 140} y={cy + 8} width={68} height={18} rx={4} fill={C.white05} />
        <text x={cx + 150} y={cy + 20} fill={C.textSec} fontSize={8} fontFamily={FONT}>OPEN MAP</text>

        <rect x={cx + 12} y={cy + 32} width={100} height={18} rx={4} fill={C.white05} />
        <text x={cx + 20} y={cy + 44} fill={C.textSec} fontSize={8} fontFamily={FONT}>Upcoming · Open ▾</text>

        <text x={cx + 14} y={cy + 66} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT} letterSpacing="0.04em">UPCOMING EVENTS</text>
        <text x={cx + SIDE_W - 14} y={cy + 66} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="end">0 events</text>
        <text x={cx + 14} y={cy + 80} fill={C.textMuted} fontSize={7} fontFamily={FONT}>No events scheduled</text>

        <text x={cx + 14} y={cy + 100} fill={C.textMuted} fontSize={7} fontWeight={600} fontFamily={FONT} letterSpacing="0.04em">OPEN TASKS</text>
        <text id="calTaskCount" x={cx + SIDE_W - 14} y={cy + 100} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="end">0 tasks</text>

        {/* Task entries (initially hidden, revealed by GSAP) */}
        {SIDEBAR_TASKS.map((task, i) => {
          const ty = cy + 110 + i * 36;
          return (
            <g key={i} id={`sideTask${i}`} style={{ opacity: 0 }}>
              <rect x={cx + 10} y={ty} width={SIDE_W - 20} height={30} rx={5}
                fill={C.card} stroke={C.border} strokeWidth={0.5} />
              <rect x={cx + 16} y={ty + 6} width={5} height={18} rx={2} fill={C.olive} />
              <text x={cx + 28} y={ty + 14} fill={C.text} fontSize={8} fontWeight={500} fontFamily={FONT}>{task.label}</text>
              <rect x={cx + SIDE_W - 52} y={ty + 5} width={32} height={14} rx={3} fill={C.accentDim} />
              <text x={cx + SIDE_W - 46} y={ty + 15} fill={C.accent} fontSize={6.5} fontWeight={600} fontFamily={FONT}>TODO</text>
              <text x={cx + 28} y={ty + 25} fill={C.textMuted} fontSize={6.5} fontFamily={FONT}>{task.date}</text>
            </g>
          );
        })}
      </g>
    );
  };

  const renderWeekGrid = () => (
    <g>
      <rect x={MAIN_X} y={GRID_Y} width={MAIN_W} height={H - GRID_Y - 16} rx={0}
        fill={C.surface} stroke={C.border} strokeWidth={0.5} />

      {/* Day headers */}
      {DAYS.map((day, i) => (
        <g key={i}>
          {i > 0 && <line x1={MAIN_X + i * DAY_W} y1={GRID_Y} x2={MAIN_X + i * DAY_W} y2={H - 16} stroke={C.border} strokeWidth={0.5} />}
          <text
            x={MAIN_X + i * DAY_W + DAY_W / 2} y={GRID_Y + 17}
            fill={C.textSec} fontSize={9} fontWeight={500} fontFamily={FONT} textAnchor="middle"
          >
            {day}
          </text>
        </g>
      ))}
      <line x1={MAIN_X} y1={GRID_Y + HEADER_H} x2={MAIN_X + MAIN_W} y2={GRID_Y + HEADER_H} stroke={C.border} strokeWidth={0.5} />

      {/* Hour gridlines */}
      {HOURS.map((h, i) => {
        const hy = GRID_Y + HEADER_H + i * HOUR_H;
        return (
          <g key={i}>
            <line x1={MAIN_X} y1={hy} x2={MAIN_X + MAIN_W} y2={hy} stroke={C.border} strokeWidth={0.3} />
            <text x={MAIN_X + 6} y={hy - 3} fill={C.textMuted} fontSize={7} fontFamily={FONT}>{h}</text>
          </g>
        );
      })}
    </g>
  );

  const renderFocusBlocks = () => (
    <g>
      {FOCUS_BLOCKS.map((block, idx) => {
        const bx = MAIN_X + block.day * DAY_W + 4;
        const bw = DAY_W - 8;
        const by = GRID_Y + HEADER_H + block.startH * HOUR_H;
        const bh = block.dur * HOUR_H;
        return (
          <g key={idx} id={`focusBlock${idx}`} style={{ opacity: 0 }}>
            <rect x={bx} y={by} width={bw} height={bh} rx={5}
              fill={C.oliveDim} stroke={C.olive} strokeWidth={0.6} />
            <text x={bx + 6} y={by + 14} fill={C.text} fontSize={7.5} fontWeight={600} fontFamily={FONT}>
              ✦ {block.label}
            </text>
            {/* Task checklist */}
            {block.tasks.map((task, ti) => {
              if ((ti + 1) * 14 + 18 > bh) return null;
              return (
                <g key={ti}>
                  <rect x={bx + 8} y={by + 20 + ti * 14} width={6} height={6} rx={1.5}
                    fill="none" stroke={C.textMuted} strokeWidth={0.5} />
                  <text x={bx + 18} y={by + 26 + ti * 14} fill={C.textSec} fontSize={6} fontFamily={FONT}>
                    {task.slice(0, Math.floor(bw / 4))}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );

  const renderTopBar = () => (
    <g>
      {/* Project header */}
      <circle cx={PX + 10} cy={PY + 16} r={12} fill={C.white05} />
      <text x={PX + 28} y={PY + 20} fill={C.text} fontSize={12} fontWeight={500} fontFamily={FONT}>LA Awards Week Gala</text>
      <text x={PX + 148} y={PY + 20} fill={C.textMuted} fontSize={10} fontFamily={FONT}>◡</text>

      {/* Hide sidebar button */}
      <rect x={PX} y={PY + 34} width={86} height={20} rx={5} fill={C.white05} />
      <text x={PX + 12} y={PY + 47} fill={C.textSec} fontSize={8} fontFamily={FONT}>‹ HIDE SIDEBAR</text>

      {/* Search bar */}
      <rect x={PX + 250} y={PY + 34} width={200} height={20} rx={5} fill={C.white05} stroke={C.border} strokeWidth={0.5} />
      <text x={PX + 264} y={PY + 47} fill={C.textMuted} fontSize={8} fontFamily={FONT}>🔍 Search events and tasks</text>

      {/* View toggles */}
      {['Day', 'Week', 'Month'].map((btn, i) => {
        const isActive = btn === 'Week';
        return (
          <g key={i}>
            <rect
              x={PX + PW - 340 + i * 54} y={PY + 34}
              width={50} height={20} rx={5}
              fill={isActive ? C.white08 : C.white05}
              stroke={isActive ? C.borderCard : 'none'}
              strokeWidth={0.5}
            />
            <text
              x={PX + PW - 340 + i * 54 + 25} y={PY + 47}
              textAnchor="middle"
              fill={isActive ? C.text : C.textSec}
              fontSize={8} fontWeight={isActive ? 600 : 400} fontFamily={FONT}
            >
              {btn}
            </text>
          </g>
        );
      })}

      {/* Spellbook button */}
      <g id="calSpellbookBtn">
        <rect x={PX + PW - 158} y={PY + 34} width={72} height={20} rx={5}
          fill={C.accentBg} stroke={C.accent} strokeWidth={0.4} />
        <text x={PX + PW - 148} y={PY + 47} fill={C.accent} fontSize={8} fontWeight={500} fontFamily={FONT}>✦ Spellbook</text>
      </g>

      {/* Sweep done button */}
      <rect x={PX + PW - 78} y={PY + 34} width={78} height={20} rx={5} fill={C.white05} />
      <text x={PX + PW - 66} y={PY + 47} fill={C.textSec} fontSize={8} fontFamily={FONT}>🧹 Sweep done</text>

      {/* Cursor (initially hidden, animated to Spellbook button) */}
      <g id="calCursor" style={{ opacity: 0 }}>
        <path
          d={`M${PX + PW - 130},${PY + 50} l0,-12 l8,8 l-4,0 l4,8 l-3,1 l-4,-8 z`}
          fill="#fff" stroke="#000" strokeWidth={0.5}
        />
      </g>

      {/* Top-right icons */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={PX + PW - (i + 1) * 28 + 20} y={PY + 4} width={22} height={18} rx={4} fill={C.white05} />
      ))}
    </g>
  );

  /* ── Modal content ── */
  const renderModal = () => {
    const tabY = TXT_Y - 18;
    const bdY = RP_Y + 4;
    const fbY = bdY + 140;
    const ctrlY = MOD_Y + MOD_H - 50;

    return (
      <g id="calModalView" style={{ opacity: 0 }}>
        {/* Modal card */}
        <rect x={MOD_X} y={MOD_Y} width={MOD_W} height={MOD_H} rx={MOD_R}
          fill="url(#calModalGrad)" filter="url(#calShadow)"
          stroke={C.borderCard} strokeWidth={1} />
        <line x1={MOD_X + MOD_R} y1={MOD_Y + 0.5} x2={MOD_X + MOD_W - MOD_R} y2={MOD_Y + 0.5}
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

        {/* Header */}
        <circle cx={MOD_X + 22} cy={MOD_Y + 22} r={12} fill={C.accentDim} />
        <text x={MOD_X + 22} y={MOD_Y + 26} textAnchor="middle" fill={C.accent} fontSize={10} fontFamily={FONT}>✦</text>
        <text x={MOD_X + 40} y={MOD_Y + 22} fill={C.text} fontSize={13} fontWeight={600} fontFamily={FONT}>Spellbook</text>
        <circle cx={MOD_X + MOD_W - 22} cy={MOD_Y + 22} r={12} fill={C.white05} stroke={C.border} strokeWidth={0.5} />
        <text x={MOD_X + MOD_W - 22} y={MOD_Y + 26} textAnchor="middle" fill={C.textMuted} fontSize={13} fontFamily={FONT}>×</text>

        {/* Left side: Tabs */}
        {['Paste', 'Load Today'].map((t, i) => {
          const isActive = i === 0;
          return (
            <g key={i} id={i === 0 ? 'calPasteTab' : undefined}>
              <rect x={TXT_X + i * 80} y={tabY} width={72} height={22} rx={5}
                fill={isActive ? C.white08 : 'none'}
                stroke={isActive ? C.borderCard : C.border} strokeWidth={0.5} />
              <text x={TXT_X + i * 80 + 36} y={tabY + 15} textAnchor="middle"
                fill={isActive ? C.text : C.textMuted} fontSize={9} fontWeight={isActive ? 600 : 400} fontFamily={FONT}>
                {t}
              </text>
            </g>
          );
        })}

        {/* Left textarea */}
        <rect x={TXT_X} y={TXT_Y} width={TXT_W} height={TXT_H} rx={8}
          fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={TXT_X + 14} y={TXT_Y + 22} fill={C.textMuted} fontSize={9} fontFamily={FONT}>
          Paste anything: notes dump, PR bullets, checklists...
        </text>
        <text x={TXT_X + 14} y={TXT_Y + 46} fill={C.textMuted} fontSize={8} fontFamily={FONT}>Examples:</text>

        {/* Paste lines */}
        <g id="calPasteText">
          {PASTE_LINES.map((line, i) => (
            <text key={i} id={`calPasteLine${i}`}
              x={TXT_X + 14} y={TXT_Y + 62 + i * 16}
              fill={C.textSec} fontSize={8.5} fontFamily={FONT}
              style={{ opacity: 0 }}
            >
              {line}
            </text>
          ))}
        </g>
        <rect id="calCaret" x={TXT_X + 14} y={TXT_Y + 54} width={2} height={14} rx={1}
          fill={C.accent} style={{ opacity: 0 }} />

        {/* Bottom hint */}
        <text x={TXT_X + 14} y={TXT_Y + TXT_H - 14} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          Paste anything to detect items.
        </text>

        {/* ── Right panel: Breakdown style ── */}
        <text x={RP_X} y={bdY} fill={C.text} fontSize={10} fontWeight={600} fontFamily={FONT}>Breakdown style</text>
        <text x={RP_X + RP_W} y={bdY} fill={C.textMuted} fontSize={7.5} fontFamily={FONT} textAnchor="end">Structure (time-free)</text>

        {BD_TILES.map((tile, i) => {
          const col = i % 2;
          const row = Math.floor(i / 2);
          const tw = (RP_W - 8) / 2;
          const tx = RP_X + col * (tw + 8);
          const ty = bdY + 14 + row * (48 + 6);
          const isProducer = tile.id === 'bdProducer';
          return (
            <g key={tile.id} id={tile.id}>
              <rect x={tx} y={ty} width={tw} height={48} rx={6}
                fill={C.card}
                stroke={isProducer ? C.gold : C.border}
                strokeWidth={isProducer ? 1 : 0.5} />
              <text x={tx + 10} y={ty + 18} fill={C.text} fontSize={8.5} fontWeight={500} fontFamily={FONT}>{tile.label}</text>
              <text x={tx + tw - 8} y={ty + 18} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="end">
                <tspan id={tile.id === 'bdProducer' ? 'calTaskPillCount' : undefined}>0 tasks</tspan>
              </text>
              <text x={tx + 10} y={ty + 34} fill={C.textMuted} fontSize={7} fontFamily={FONT}>{tile.desc}</text>
            </g>
          );
        })}

        {/* Highlight ring for Producer Standard */}
        <rect id="bdHighlight"
          x={RP_X + (RP_W - 8) / 2 + 8} y={bdY + 14}
          width={(RP_W - 8) / 2} height={48} rx={6}
          fill="none" stroke={C.gold} strokeWidth={2}
          style={{ opacity: 0, pointerEvents: 'none' }}
        />

        {/* ── Focus Block section ── */}
        <text x={RP_X} y={fbY} fill={C.text} fontSize={10} fontWeight={600} fontFamily={FONT}>Focus Block</text>
        <text x={RP_X + RP_W} y={fbY} fill={C.textMuted} fontSize={7.5} fontFamily={FONT} textAnchor="end">Plan (the only time knob)</text>

        {FB_ROWS.map((row, i) => {
          const ry = fbY + 12 + i * 42;
          const isBalanced = i === 0;
          return (
            <g key={row.id} id={row.id}>
              <rect x={RP_X} y={ry} width={RP_W} height={36} rx={6}
                fill={C.card}
                stroke={isBalanced ? C.gold : C.border}
                strokeWidth={isBalanced ? 1 : 0.5} />
              <text x={RP_X + 10} y={ry + 16} fill={isBalanced ? C.gold : C.text} fontSize={8.5} fontWeight={500} fontFamily={FONT}>{row.label}</text>
              <text x={RP_X + RP_W - 10} y={ry + 16} fill={C.textMuted} fontSize={7.5} fontFamily={FONT} textAnchor="end">{row.time}</text>
              <text x={RP_X + 10} y={ry + 29} fill={C.textMuted} fontSize={7} fontFamily={FONT}>{row.desc}</text>
            </g>
          );
        })}

        {/* Highlight for Balanced row */}
        <rect id="fbHighlight"
          x={RP_X} y={fbY + 12}
          width={RP_W} height={36} rx={6}
          fill="none" stroke={C.gold} strokeWidth={2}
          style={{ opacity: 0, pointerEvents: 'none' }}
        />

        {/* ── Bottom controls ── */}
        <text x={MOD_X + 24} y={ctrlY + 12} fill={C.textMuted} fontSize={7} fontFamily={FONT}>Date</text>
        <rect x={MOD_X + 50} y={ctrlY} width={90} height={22} rx={4}
          fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={MOD_X + 60} y={ctrlY + 15} fill={C.textSec} fontSize={8.5} fontFamily={MONO}>02/13/2026</text>

        <text x={MOD_X + 156} y={ctrlY + 12} fill={C.textMuted} fontSize={7} fontFamily={FONT}>Days</text>
        <rect x={MOD_X + 178} y={ctrlY} width={40} height={22} rx={4}
          fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={MOD_X + 192} y={ctrlY + 15} fill={C.textSec} fontSize={9} fontFamily={MONO}>1</text>

        {/* Pill buttons */}
        <rect x={MOD_X + 234} y={ctrlY} width={96} height={22} rx={5}
          fill={C.white08} stroke={C.borderCard} strokeWidth={0.5} />
        <text x={MOD_X + 282} y={ctrlY + 15} textAnchor="middle"
          fill={C.text} fontSize={8} fontWeight={500} fontFamily={FONT}>Create tasks only</text>

        <rect x={MOD_X + 338} y={ctrlY} width={100} height={22} rx={5}
          fill={C.white05} stroke={C.border} strokeWidth={0.5} />
        <text x={MOD_X + 388} y={ctrlY + 15} textAnchor="middle"
          fill={C.textMuted} fontSize={8} fontFamily={FONT}>Schedule in window</text>

        {/* Cancel */}
        <rect x={MOD_X + MOD_W - 220} y={ctrlY} width={60} height={24} rx={6}
          fill="none" stroke={C.border} strokeWidth={0.5} />
        <text x={MOD_X + MOD_W - 190} y={ctrlY + 16} textAnchor="middle"
          fill={C.textSec} fontSize={9} fontFamily={FONT}>Cancel</text>

        {/* Create Tasks button */}
        <g id="calBtnCreate">
          <rect id="calBtnCreateBg"
            x={MOD_X + MOD_W - 146} y={ctrlY} width={126} height={24} rx={6}
            fill={C.accent} />
          <text x={MOD_X + MOD_W - 83} y={ctrlY + 16} textAnchor="middle"
            fill="#fff" fontSize={9} fontWeight={600} fontFamily={FONT}>Create Tasks</text>
          <rect id="calBtnCreateGlow"
            x={MOD_X + MOD_W - 150} y={ctrlY - 4} width={134} height={32} rx={10}
            fill="none" stroke={C.accent} strokeWidth={2}
            style={{ opacity: 0 }} />
        </g>
      </g>
    );
  };

  /* ── Bottom bar ── */
  const renderBottomBar = () => {
    const by = H - 22;
    return (
      <g>
        <rect x={SB_W} y={by} width={W - SB_W} height={22} fill={C.surface} stroke={C.border} strokeWidth={0.5} />
        <text x={PX + 8} y={by + 14} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
          ☑ Click to select · Double click to edit · Shift+Click to multi-select · Right click for actions
        </text>
        <text x={W - 24} y={by + 14} fill={C.textMuted} fontSize={7} fontFamily={FONT} textAnchor="end">
          Timezone: America/Los Angeles
        </text>
      </g>
    );
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Calendar Spellbook feature demonstration"
        role="img"
      >
        <defs>
          <linearGradient id="calModalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#171B22" />
            <stop offset="100%" stopColor="#111316" />
          </linearGradient>
          <filter id="calShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="24" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ═══ STATE A — Calendar View ═══ */}
        <g id="calendarView">
          <rect width={W} height={H} fill={C.bg} rx={12} />
          {renderSidebar()}
          {renderTopBar()}
          {renderMiniCalendar()}
          {renderEventsPanel()}
          {renderWeekGrid()}
          {renderFocusBlocks()}
        </g>

        {/* Modal scrim */}
        <rect id="calModalScrim" width={W} height={H} fill="rgba(0,0,0,0.55)"
          rx={12} style={{ opacity: 0 }} />

        {/* ═══ STATE B — Spellbook Modal ═══ */}
        {renderModal()}

        {/* Bottom bar (always visible behind modal) */}
        {renderBottomBar()}
      </svg>
    </div>
  );
}
