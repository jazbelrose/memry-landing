/* ═══════════════════════════════════════════════════════════
   BudgetSpellbookDemo — Animated SVG showing Budget page +
   Budget Spellbook modal overlay. GSAP timeline loops through
   10 states: budget view → modal open → paste text → chip
   increment → preview populate → tile highlight moves →
   totals + bars animate → Apply press → modal close + new
   rows → KPI update + donut sweep.
   ═══════════════════════════════════════════════════════════ */
import { useEffect, useRef } from 'react';
import { C, FONT, MONO } from './hero/tokens';
import styles from './BudgetSpellbookDemo.module.css';

/* ── Layout constants ───────────────────────────────────── */
const W = 1200;
const H = 700;

/* Sidebar */
const SB_W = 48;

/* Budget page content area */
const PX = SB_W + 16; // content padding-left
const PY = 12;
const PW = W - PX - 16;

/* KPI cards */
const KPI_Y = PY + 52;
const KPI_H = 50;
const KPI_GAP = 10;
const KPI_CARDS = [
  { w: 148, label: 'TARGET', sub: 'CLIENT BUDGET', color: C.success, dimColor: 'rgba(76,175,80,0.15)' },
  { w: 148, label: 'COST', sub: 'CURRENT', color: C.teal, dimColor: 'rgba(34,211,167,0.10)' },
  { w: 120, label: 'SPEND', sub: '0% USED', color: C.gold, dimColor: 'rgba(200,160,84,0.12)' },
];

/* Second row of KPI */
const KPI2_Y = KPI_Y + KPI_H + 8;
const KPI2_H = 44;

/* Donut chart */
const DONUT_R = 42;
const DONUT_CX = PX + PW - 90;
const DONUT_CY = KPI_Y + 50;
const DONUT_CIRC = 2 * Math.PI * DONUT_R;

/* Line items */
const LI_Y = KPI2_Y + KPI2_H + 46;
const LI_COL_W = (PW - 14) / 2;
const LI_H = 58;
const LI_GAP = 8;

const LINE_ITEMS = [
  { code: 'LA-AWARDS-WEEK-GALA-0018', cat2: 'PARKING-FUEL-TOLLS-0001', name: 'PARKING, FUEL, TOLLS', qty: '1 Lot', cost: '$220', mk: '0%', price: '$220' },
  { code: 'LA-AWARDS-WEEK-GALA-0004', cat2: 'FABRICATION-0001', name: 'SCENIC BUILD', qty: '1 Lot', cost: '$41,000', mk: '35%', price: '$65,360' },
  { code: 'LA-AWARDS-WEEK-GALA-0022', cat2: 'LABOR-0007', name: 'OVERTIME BUFFER', qty: '1 Lot', cost: '$650', mk: '35%', price: '$9,775' },
  { code: 'LA-AWARDS-WEEK-GALA-0002', cat2: 'RENTALS-0001', name: 'FULL DRAPE PACKAGE', qty: '1 Lot', cost: '$18,500', mk: '35%', price: '$24,975' },
  { code: 'LA-AWARDS-WEEK-GALA-0011', cat2: 'LABOR-0003', name: 'CREW INSTALL DAY RATE', qty: '4 Days', cost: '$520', mk: '35%', price: '$2,808' },
  { code: 'LA-AWARDS-WEEK-GALA-0013', cat2: 'RENTALS-0002', name: 'PIPE DRAPE RENTAL 200 LF', qty: '200 LF', cost: '$9', mk: '35%', price: '$2,430' },
  { code: 'LA-AWARDS-WEEK-GALA-0005', cat2: 'LIGHTING-0002', name: 'LED PLAYBACK', qty: '1 Lot', cost: '$28,000', mk: '35%', price: '$39,900' },
  { code: 'LA-AWARDS-WEEK-GALA-0010', cat2: 'LABOR-0002', name: 'LEAD TECH INSTALL DAY RATE', qty: '1 Days', cost: '$780', mk: '35%', price: '$1,053' },
];

/* New rows (appear after Apply) */
const NEW_ROW_ITEMS = [
  { code: 'LA-AWARDS-WEEK-GALA-0025', cat2: 'LABOR-0008', name: 'SHOP PREP CREW', qty: '4 Days', cost: '$420', mk: '35%', price: '$2,268' },
  { code: 'LA-AWARDS-WEEK-GALA-0026', cat2: 'TRAVEL-0001', name: 'TRAVEL HOTEL PER DIEM', qty: '1 Lot', cost: '$950', mk: '0%', price: '$950' },
  { code: 'LA-AWARDS-WEEK-GALA-0027', cat2: 'PRODUCTION-MGMT-0001', name: 'PRE-PRO + COORDINATION', qty: '1 Lot', cost: '$1,200', mk: '25%', price: '$1,500' },
];

/* ── Modal constants ────────────────────────────────────── */
const MOD_W = 900;
const MOD_H = 640;
const MOD_X = (W - MOD_W) / 2;
const MOD_Y = (H - MOD_H) / 2;
const MOD_R = 14;

/* Modal left side — textarea */
const TXT_X = MOD_X + 20;
const TXT_Y = MOD_Y + 56;
const TXT_W = 380;
const TXT_H = MOD_H - 120;

/* Modal right panel */
const RP_X = MOD_X + TXT_W + 40;
const RP_W = MOD_W - TXT_W - 60;
const RP_Y = MOD_Y + 56;

/* Paste text lines */
const PASTE_LINES = [
  'MB2 Tahoe, scenic + drape + labor, 2 days install, 25% markup',
  'Pipe & drape 200\', 12 uplights, stage 24x16, 8 crew',
  'Add 10% contingency',
  '',
  'Shopping list:',
  '- LED wall rental 10x6',
  '- Scenic flats build + paint',
  '- Travel per diem for 4 crew',
];

/* Variant tiles */
const TILES = [
  { id: 'tileLean', label: 'Lean', desc: 'High-level lots, calm rows' },
  { id: 'tileProducer', label: 'Producer Standard', desc: 'Detailed but clean' },
  { id: 'tileVendor', label: 'Vendor-ready', desc: 'Invoice groups split for billing' },
  { id: 'tileClientFacing', label: 'Client-facing', desc: 'Minimal, polished rows' },
  { id: 'tileOpsReady', label: 'Ops-ready', desc: 'Adds prep/strike/OT buffers' },
  { id: 'tileAggressive', label: 'Aggressive margin', desc: 'Rebalances markup across categories' },
];
const TILE_COLS = 3;
const TILE_W = (RP_W - 16) / TILE_COLS;
const TILE_H = 40;
const TILE_GAP = 6;

/* Category bars */
const BARS = [
  { id: 'barLaborFill', label: 'LABOR', amount: '$3,575', pct: 0.70 },
  { id: 'barProdFill', label: 'PRODUCTION-MGMT', amount: '$2,563', pct: 0.55 },
  { id: 'barContFill', label: 'CONTINGENCY-MISC', amount: '$534', pct: 0.15 },
  { id: 'barPermitsFill', label: 'PERMITS-INSURAN...', amount: '$325', pct: 0.08 },
];

/* Preview items */
const PREVIEW_ITEMS = [
  '+ PRODUCTION - PRE-PRO + COORDINATI...',
  '+ PRODUCER / PM - SHOW DAYS',
  '+ LEAD TECH - INSTALL (DAY-RATE)',
];

export function BudgetSpellbookDemo() {
  const svgRef = useRef<SVGSVGElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      const svg = svgRef.current;
      if (!svg) return;
      const modal = svg.querySelector('#modalView') as SVGGElement;
      if (modal) modal.style.opacity = '1';
      const scrim = svg.querySelector('#modalScrim') as SVGRectElement;
      if (scrim) scrim.style.opacity = '0.5';
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

          const pasteLines = Array.from({ length: PASTE_LINES.length }, (_, i) => q(`pasteLine${i}`)).filter(Boolean);
          const previewItems = [q('previewItem1'), q('previewItem2'), q('previewItem3')].filter(Boolean);
          const newRows = Array.from({ length: NEW_ROW_ITEMS.length }, (_, i) => q(`newRow${i}`)).filter(Boolean);
          const barFills = BARS.map(b => q(b.id)).filter(Boolean);

          /* Tile positions for highlight movement */
          const tilePositions = TILES.map((_, i) => {
            const col = i % TILE_COLS;
            const row = Math.floor(i / TILE_COLS);
            return {
              x: RP_X + col * (TILE_W + TILE_GAP),
              y: RP_Y + 222 + row * (TILE_H + TILE_GAP),
            };
          });

          const hlEl = q('tileHighlight') as SVGRectElement | null;
          const hlBaseX = hlEl ? parseFloat(hlEl.getAttribute('x') || '0') : 0;
          const hlBaseY = hlEl ? parseFloat(hlEl.getAttribute('y') || '0') : 0;

          const tileDeltas = tilePositions.map(p => ({
            x: p.x - hlBaseX,
            y: p.y - hlBaseY,
          }));

          /* Bar max width */
          const BAR_MAX_W = RP_W - 80;

          const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0, defaults: { ease: 'power2.inOut' } });
          tlRef.current = tl;

          /* ── 1 — Show budget view, reset everything ── */
          tl.addLabel('showBudget')
            .set('#modalScrim', { opacity: 0 })
            .set('#modalView', { opacity: 0, scale: 0.92, transformOrigin: '50% 50%' })
            .set('#caret', { opacity: 0 })
            .set(pasteLines, { opacity: 0, y: 4 })
            .set(previewItems, { opacity: 0, y: 8 })
            .set('#previewMore', { opacity: 0 })
            .set('#chipLinesValue', { textContent: '0' })
            .set('#chipBlocksValue', { textContent: '0' })
            .set('#chipTasksValue', { textContent: '0' })
            .set('#chipLinksValue', { textContent: '0' })
            .set('#budgetedValue', { textContent: '–' })
            .set('#finalValue', { textContent: '–' })
            .set('#markupValue', { textContent: '–' })
            .set(barFills, { attr: { width: 0 } })
            .set(newRows, { opacity: 0, y: 20 })
            .set('#rowHighlight', { opacity: 0 })
            .set('#tileHighlight', { x: tileDeltas[0].x, y: tileDeltas[0].y })
            .set('#btnApplyGlow', { opacity: 0 })
            /* KPI initial values */
            .set('#kpiCostValue', { textContent: '$209,875' })
            .set('#kpiMarginValue', { textContent: '$66,255' })
            .set('#kpiClientTotalValue', { textContent: '$276,130' })
            /* Donut initial */
            .set('#donutArcCost', { attr: { 'stroke-dashoffset': DONUT_CIRC * 0.24 } })
            .set('#donutArcMargin', { attr: { 'stroke-dashoffset': DONUT_CIRC * 0.76 } })
            .to({}, { duration: 1.0 });

          /* ── 2 — Open modal ── */
          tl.addLabel('openModal')
            .to('#modalScrim', { opacity: 0.55, duration: 0.3 })
            .to('#modalView', {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.2)',
            }, '<+=0.05');

          /* ── 3 — Paste text + caret blink ── */
          tl.addLabel('pasteText')
            .to('#caret', { opacity: 1, duration: 0.15 })
            .to(pasteLines, {
              opacity: 1,
              y: 0,
              duration: 0.12,
              stagger: 0.04,
              ease: 'power2.out',
            })
            .to('#caret', { opacity: 0, duration: 0.2 }, '+=0.3');

          /* ── 4 — Increment chips ── */
          tl.addLabel('incrementChips');
          /* Lines 0→6 */
          const counterLines = { val: 0 };
          tl.to(counterLines, {
            val: 6,
            duration: 0.5,
            snap: { val: 1 },
            onUpdate: () => {
              const el = q('chipLinesValue');
              if (el) el.textContent = String(Math.round(counterLines.val));
            },
          }, 'incrementChips');
          /* Blocks 0→0 (stays) */
          /* Tasks 0→0 (stays) */
          /* Links 0→0 (stays) */

          /* ── 5 — Populate preview items ── */
          tl.addLabel('populatePreview')
            .to(previewItems, {
              opacity: 1,
              y: 0,
              duration: 0.2,
              stagger: 0.08,
              ease: 'power2.out',
            })
            .to('#previewMore', { opacity: 1, duration: 0.2 }, '-=0.05');

          /* ── 6 — Move tile highlight: Lean → Producer → Vendor ── */
          tl.addLabel('moveTile1')
            .to('#tileHighlight', {
              x: tileDeltas[1].x,
              y: tileDeltas[1].y,
              duration: 0.35,
            })
            .to('#tileHighlight', {
              scaleX: 0.96,
              scaleY: 0.94,
              duration: 0.08,
              ease: 'power2.in',
            })
            .to('#tileHighlight', {
              scaleX: 1,
              scaleY: 1,
              duration: 0.12,
              ease: 'back.out(2)',
            })
            .to({}, { duration: 0.3 })
            .addLabel('moveTile2')
            .to('#tileHighlight', {
              x: tileDeltas[2].x,
              y: tileDeltas[2].y,
              duration: 0.35,
            })
            .to('#tileHighlight', {
              scaleX: 0.96,
              scaleY: 0.94,
              duration: 0.08,
              ease: 'power2.in',
            })
            .to('#tileHighlight', {
              scaleX: 1,
              scaleY: 1,
              duration: 0.12,
              ease: 'back.out(2)',
            })
            .to({}, { duration: 0.3 });

          /* ── 7 — Animate totals + category bars ── */
          tl.addLabel('animateTotals');
          const cBudgeted = { val: 0 };
          const cFinal = { val: 0 };
          const cMarkup = { val: 0 };
          tl.to(cBudgeted, {
            val: 5759,
            duration: 0.6,
            snap: { val: 1 },
            onUpdate: () => {
              const el = q('budgetedValue');
              if (el) el.textContent = '$' + Math.round(cBudgeted.val).toLocaleString();
            },
          }, 'animateTotals')
            .to(cFinal, {
              val: 6987,
              duration: 0.6,
              snap: { val: 1 },
              onUpdate: () => {
                const el = q('finalValue');
                if (el) el.textContent = '$' + Math.round(cFinal.val).toLocaleString();
              },
            }, 'animateTotals')
            .to(cMarkup, {
              val: 21,
              duration: 0.6,
              snap: { val: 1 },
              onUpdate: () => {
                const el = q('markupValue');
                if (el) el.textContent = Math.round(cMarkup.val) + '%';
              },
            }, 'animateTotals');
          /* Bars */
          BARS.forEach((bar, i) => {
            tl.to(q(bar.id), {
              attr: { width: BAR_MAX_W * bar.pct },
              duration: 0.6,
              ease: 'power2.out',
            }, `animateTotals+=${i * 0.06}`);
          });
          tl.to({}, { duration: 0.4 });

          /* ── 8 — Press Apply ── */
          tl.addLabel('pressApply')
            .to('#btnApplyBg', {
              scaleX: 0.93,
              scaleY: 0.94,
              transformOrigin: '50% 50%',
              duration: 0.12,
              ease: 'power2.in',
            })
            .to('#btnApplyBg', {
              scaleX: 1,
              scaleY: 1,
              duration: 0.15,
              ease: 'back.out(2)',
            })
            .to('#btnApplyGlow', { opacity: 0.6, duration: 0.1 }, '-=0.15')
            .to('#btnApplyGlow', { opacity: 0, duration: 0.4, ease: 'power2.out' });

          /* ── 9 — Close modal + reveal new rows ── */
          tl.addLabel('closeModal')
            .to('#modalView', {
              opacity: 0,
              scale: 0.95,
              duration: 0.4,
              ease: 'power2.in',
            })
            .to('#modalScrim', { opacity: 0, duration: 0.3 }, '<+=0.1')
            .addLabel('revealRows')
            .to(newRows, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: 'back.out(1.4)',
            })
            .to('#rowHighlight', {
              opacity: 0.7,
              duration: 0.25,
            })
            .to('#rowHighlight', {
              opacity: 0,
              duration: 0.6,
              ease: 'power2.out',
            });

          /* ── 10 — Update KPIs + donut sweep ── */
          tl.addLabel('updateKPIs');
          const kCost = { val: 209875 };
          const kMargin = { val: 66255 };
          const kClient = { val: 276130 };
          tl.to(kCost, {
            val: 215634,
            duration: 0.8,
            snap: { val: 1 },
            onUpdate: () => {
              const el = q('kpiCostValue');
              if (el) el.textContent = '$' + Math.round(kCost.val).toLocaleString();
            },
          }, 'updateKPIs')
            .to(kMargin, {
              val: 70821,
              duration: 0.8,
              snap: { val: 1 },
              onUpdate: () => {
                const el = q('kpiMarginValue');
                if (el) el.textContent = '$' + Math.round(kMargin.val).toLocaleString();
              },
            }, 'updateKPIs')
            .to(kClient, {
              val: 286455,
              duration: 0.8,
              snap: { val: 1 },
              onUpdate: () => {
                const el = q('kpiClientTotalValue');
                if (el) el.textContent = '$' + Math.round(kClient.val).toLocaleString();
              },
            }, 'updateKPIs');
          /* Donut arcs animate to new values */
          tl.to('#donutArcCost', {
            attr: { 'stroke-dashoffset': DONUT_CIRC * 0.21 },
            duration: 0.8,
          }, 'updateKPIs')
            .to('#donutArcMargin', {
              attr: { 'stroke-dashoffset': DONUT_CIRC * 0.72 },
              duration: 0.8,
            }, 'updateKPIs');

          /* Hold before loop */
          tl.to({}, { duration: 1.5 });
        }, svg);
      } catch {
        const svg = svgRef.current;
        if (!svg) return;
        const modal = svg.querySelector('#modalView') as SVGGElement;
        if (modal) modal.style.opacity = '1';
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

  /* ── Helper: Sidebar icons ── */
  const renderSidebar = () => {
    const icons = [
      { y: 60, active: false },   // layers
      { y: 100, active: false },  // HQ
      { y: 148, active: false },  // docs
      { y: 188, active: true },   // budget (active)
      { y: 228, active: false },  // people
      { y: 276, active: false },  // chat
      { y: 316, active: false },  // bell
      { y: 364, active: false },  // search
    ];
    return (
      <g>
        <rect x={0} y={0} width={SB_W} height={H} fill={C.sidebar} />
        {/* Logo at top */}
        <circle cx={SB_W / 2} cy={24} r={14} fill={C.white05} />
        {icons.map((ic, i) => (
          <g key={i}>
            <rect
              x={10} y={ic.y - 14} width={28} height={28} rx={8}
              fill={ic.active ? C.accentDim : C.white05}
              stroke={ic.active ? C.accent : 'none'}
              strokeWidth={ic.active ? 0.7 : 0}
            />
            {ic.active && (
              <rect x={0} y={ic.y - 8} width={3} height={16} rx={1.5} fill={C.accent} />
            )}
          </g>
        ))}
        {/* Bottom avatar */}
        <circle cx={SB_W / 2} cy={H - 32} r={14} fill={C.white08} stroke={C.border} strokeWidth={0.5} />
      </g>
    );
  };

  /* ── Helper: KPI card row ── */
  const renderKPIs = () => {
    let cx = PX;
    return (
      <g>
        {KPI_CARDS.map((card, i) => {
          const x = cx;
          cx += card.w + KPI_GAP;
          return (
            <g key={i}>
              <rect x={x} y={KPI_Y} width={card.w} height={KPI_H} rx={6}
                fill={C.card} stroke={C.border} strokeWidth={0.5} />
              <circle cx={x + 14} cy={KPI_Y + 16} r={7}
                fill={card.dimColor} stroke={card.color} strokeWidth={0.7} />
              <text x={x + 28} y={KPI_Y + 19} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
                {card.label}
              </text>
              <text x={x + card.w - 8} y={KPI_Y + 19} fill={C.textMuted} fontSize={7}
                fontFamily={FONT} textAnchor="end">
                {card.sub}
              </text>
              {/* Values */}
              {i === 0 && (
                <text x={x + 10} y={KPI_Y + 40} fill={C.text} fontSize={11} fontFamily={FONT}>
                  Set target
                </text>
              )}
              {i === 1 && (
                <text id="kpiCostValue" x={x + 10} y={KPI_Y + 40} fill={C.text}
                  fontSize={14} fontWeight={600} fontFamily={MONO}>
                  $209,875
                </text>
              )}
              {i === 2 && (
                <text x={x + 10} y={KPI_Y + 40} fill={C.text}
                  fontSize={14} fontWeight={600} fontFamily={MONO}>
                  $0
                </text>
              )}
            </g>
          );
        })}
      </g>
    );
  };

  /* ── Helper: Margin + Client Total row ── */
  const renderKPI2 = () => (
    <g>
      {/* MARGIN */}
      <rect x={PX} y={KPI2_Y} width={200} height={KPI2_H} rx={6}
        fill={C.card} stroke={C.border} strokeWidth={0.5} />
      <rect x={PX + 10} y={KPI2_Y + 8} width={8} height={8} rx={4}
        fill={C.accentDim} stroke={C.accent} strokeWidth={0.6} />
      <text x={PX + 26} y={KPI2_Y + 16} fill={C.textMuted} fontSize={7} fontFamily={FONT}>MARGIN</text>
      <text x={PX + 100} y={KPI2_Y + 16} fill={C.textMuted} fontSize={7} fontFamily={FONT}>PROFIT</text>
      <text id="kpiMarginValue" x={PX + 12} y={KPI2_Y + 34} fill={C.text}
        fontSize={13} fontWeight={600} fontFamily={MONO}>$66,255</text>
      <text x={PX + 108} y={KPI2_Y + 34} fill={C.textSec} fontSize={9} fontFamily={FONT}>24%</text>

      {/* CLIENT TOTAL */}
      <rect x={PX + 210} y={KPI2_Y} width={260} height={KPI2_H} rx={6}
        fill={C.card} stroke={C.borderCard} strokeWidth={0.8} />
      <rect x={PX + 220} y={KPI2_Y + 8} width={8} height={8} rx={2}
        fill='rgba(34,211,167,0.10)' stroke={C.teal} strokeWidth={0.6} />
      <text x={PX + 238} y={KPI2_Y + 16} fill={C.textMuted} fontSize={7} fontFamily={FONT}>CLIENT TOTAL</text>
      <text x={PX + 360} y={KPI2_Y + 16} fill={C.textMuted} fontSize={7} fontFamily={FONT}>ESTIMATE</text>
      <text id="kpiClientTotalValue" x={PX + 222} y={KPI2_Y + 34} fill={C.text}
        fontSize={16} fontWeight={700} fontFamily={MONO}>$276,130</text>
    </g>
  );

  /* ── Helper: Donut chart ── */
  const renderDonut = () => (
    <g>
      {/* Background ring */}
      <circle cx={DONUT_CX} cy={DONUT_CY} r={DONUT_R} fill="none"
        stroke={C.white05} strokeWidth={14} />
      {/* Cost arc */}
      <circle
        id="donutArcCost"
        cx={DONUT_CX} cy={DONUT_CY} r={DONUT_R}
        fill="none" stroke={C.gold} strokeWidth={14}
        strokeDasharray={DONUT_CIRC}
        strokeDashoffset={DONUT_CIRC * 0.24}
        strokeLinecap="round"
        opacity={0.8}
        transform={`rotate(-90 ${DONUT_CX} ${DONUT_CY})`}
      />
      {/* Margin arc */}
      <circle
        id="donutArcMargin"
        cx={DONUT_CX} cy={DONUT_CY} r={DONUT_R}
        fill="none" stroke={C.textMuted} strokeWidth={14}
        strokeDasharray={DONUT_CIRC}
        strokeDashoffset={DONUT_CIRC * 0.76}
        strokeLinecap="round"
        opacity={0.35}
        transform={`rotate(${-90 + 0.76 * 360} ${DONUT_CX} ${DONUT_CY})`}
      />
      {/* Center text */}
      <text x={DONUT_CX} y={DONUT_CY + 4} fill={C.text} fontSize={11} fontWeight={700}
        fontFamily={MONO} textAnchor="middle">$276,130</text>
      {/* Legend */}
      <circle cx={DONUT_CX - 26} cy={DONUT_CY + DONUT_R + 18} r={3} fill={C.gold} />
      <text x={DONUT_CX - 18} y={DONUT_CY + DONUT_R + 21} fill={C.textSec} fontSize={7} fontFamily={FONT}>Cost</text>
      <circle cx={DONUT_CX + 12} cy={DONUT_CY + DONUT_R + 18} r={3} fill={C.textMuted} />
      <text x={DONUT_CX + 20} y={DONUT_CY + DONUT_R + 21} fill={C.textSec} fontSize={7} fontFamily={FONT}>Margin</text>
    </g>
  );

  /* ── Helper: Line items grid ── */
  const renderLineItems = () => (
    <g>
      {LINE_ITEMS.map((item, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const ix = PX + col * (LI_COL_W + 14);
        const iy = LI_Y + row * (LI_H + LI_GAP);
        return (
          <g key={idx}>
            <rect x={ix} y={iy} width={LI_COL_W} height={LI_H} rx={6}
              fill={C.card} stroke={C.border} strokeWidth={0.5} />
            <text x={ix + 10} y={iy + 14} fill={C.textSec} fontSize={6} fontFamily={FONT}>
              {item.code}  {item.cat2}
            </text>
            <text x={ix + 10} y={iy + 28} fill={C.text} fontSize={9} fontWeight={500} fontFamily={FONT}>
              {item.name}
            </text>
            <text x={ix + LI_COL_W - 10} y={iy + 14} fill={C.textMuted} fontSize={6.5}
              fontFamily={FONT} textAnchor="end">
              QTY {item.qty}  COST {item.cost}
            </text>
            <text x={ix + LI_COL_W - 10} y={iy + 28} fill={C.textMuted} fontSize={6.5}
              fontFamily={FONT} textAnchor="end">
              MK {item.mk}  PRICE {item.price}
            </text>
            <text x={ix + 10} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
              Tasks · 0
            </text>
            <text x={ix + 70} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
              ↗ Spend
            </text>
            <text x={ix + 120} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
              Add dates
            </text>
            {/* DUE badge */}
            <rect x={ix + LI_COL_W - 38} y={iy + 38} width={28} height={14} rx={3}
              fill={C.accentDim} />
            <text x={ix + LI_COL_W - 32} y={iy + 48} fill={C.accent} fontSize={7}
              fontWeight={600} fontFamily={FONT}>DUE</text>
          </g>
        );
      })}
    </g>
  );

  /* ── Helper: New rows (hidden initially) ── */
  const renderNewRows = () => {
    const baseY = LI_Y + Math.ceil(LINE_ITEMS.length / 2) * (LI_H + LI_GAP);
    return (
      <g id="newRows">
        {/* Highlight ring */}
        <rect
          id="rowHighlight"
          x={PX - 4} y={baseY - 4}
          width={PW + 8}
          height={NEW_ROW_ITEMS.length * (LI_H + LI_GAP) + 4}
          rx={10}
          fill="none" stroke={C.accent} strokeWidth={2}
          style={{ opacity: 0 }}
        />
        {NEW_ROW_ITEMS.map((item, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          /* Stack them: first 2 side by side, third below-left */
          const ix = PX + col * (LI_COL_W + 14);
          const iy = baseY + row * (LI_H + LI_GAP);
          return (
            <g key={idx} id={`newRow${idx}`} style={{ opacity: 0 }}>
              <rect x={ix} y={iy} width={LI_COL_W} height={LI_H} rx={6}
                fill={C.card} stroke={C.accent} strokeWidth={0.8} />
              <text x={ix + 10} y={iy + 14} fill={C.textSec} fontSize={6} fontFamily={FONT}>
                {item.code}  {item.cat2}
              </text>
              <text x={ix + 10} y={iy + 28} fill={C.text} fontSize={9} fontWeight={500} fontFamily={FONT}>
                {item.name}
              </text>
              <text x={ix + LI_COL_W - 10} y={iy + 14} fill={C.textMuted} fontSize={6.5}
                fontFamily={FONT} textAnchor="end">
                QTY {item.qty}  COST {item.cost}
              </text>
              <text x={ix + LI_COL_W - 10} y={iy + 28} fill={C.textMuted} fontSize={6.5}
                fontFamily={FONT} textAnchor="end">
                MK {item.mk}  PRICE {item.price}
              </text>
              <text x={ix + 10} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
                Tasks · 0
              </text>
              <text x={ix + 70} y={iy + 46} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
                ↗ Spend
              </text>
              {/* NEW badge instead of DUE */}
              <rect x={ix + LI_COL_W - 38} y={iy + 38} width={28} height={14} rx={3}
                fill={C.accentDim} />
              <text x={ix + LI_COL_W - 33} y={iy + 48} fill={C.accent} fontSize={7}
                fontWeight={600} fontFamily={FONT}>NEW</text>
            </g>
          );
        })}
      </g>
    );
  };

  /* ── Helper: Filter + Pagination bar ── */
  const renderFilterBar = () => {
    const fy = LI_Y - 30;
    return (
      <g>
        <rect x={PX} y={fy} width={44} height={18} rx={4} fill={C.white05} />
        <text x={PX + 10} y={fy + 12} fill={C.textSec} fontSize={8} fontFamily={FONT}>Filter</text>
        <text x={PX + 60} y={fy + 12} fill={C.textSec} fontSize={8} fontFamily={FONT}>
          ‹  1  2  3  ›  10 / page ◡
        </text>
        <rect x={PX + PW - 120} y={fy} width={48} height={18} rx={4} fill={C.white05} />
        <text x={PX + PW - 112} y={fy + 12} fill={C.textSec} fontSize={8} fontFamily={FONT}>Select</text>
        <rect x={PX + PW - 66} y={fy} width={66} height={18} rx={4} fill={C.white05} />
        <text x={PX + PW - 56} y={fy + 12} fill={C.textSec} fontSize={8} fontFamily={FONT}>+ Add Item</text>
      </g>
    );
  };

  /* ── Helper: Modal left textarea ── */
  const renderModalTextarea = () => (
    <g>
      {/* Textarea bg */}
      <rect x={TXT_X} y={TXT_Y} width={TXT_W} height={TXT_H} rx={8}
        fill={C.card} stroke={C.border} strokeWidth={0.5} />
      {/* Placeholder text (shown behind paste lines) */}
      <text x={TXT_X + 14} y={TXT_Y + 22} fill={C.textMuted} fontSize={9} fontFamily={FONT}>
        Paste anything: scope notes, run-of-show, emails, shopping lists...
      </text>
      {/* Example label */}
      <text x={TXT_X + 14} y={TXT_Y + 50} fill={C.textMuted} fontSize={8} fontFamily={FONT} fontStyle="italic">
        Example:
      </text>

      {/* Paste text lines (initially hidden, revealed by GSAP) */}
      <g id="pasteText">
        {PASTE_LINES.map((line, i) => (
          <text
            key={i}
            id={`pasteLine${i}`}
            x={TXT_X + 14}
            y={TXT_Y + 70 + i * 16}
            fill={line.startsWith('-') ? C.textSec : C.text}
            fontSize={9}
            fontFamily={FONT}
            style={{ opacity: 0 }}
          >
            {line || '\u00A0'}
          </text>
        ))}
      </g>

      {/* Caret */}
      <rect id="caret" x={TXT_X + 14} y={TXT_Y + 60} width={2} height={14} rx={1}
        fill={C.accent} style={{ opacity: 0 }} />

      {/* Bottom hint */}
      <text x={TXT_X + 14} y={TXT_Y + TXT_H - 14} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
        Paste anything to generate structure.
      </text>
    </g>
  );

  /* ── Helper: Modal right panel ── */
  const renderModalRightPanel = () => {
    /* Right panel tabs */
    const tabY = RP_Y - 6;
    const rpTabs = ['✓ Budget', 'Calendar Plan', 'Links'];

    /* Chips */
    const chipY = RP_Y + 30;
    const chips = [
      { label: 'Lines', valueId: 'chipLinesValue', init: '0' },
      { label: 'Blocks', valueId: 'chipBlocksValue', init: '0' },
      { label: 'Tasks', valueId: 'chipTasksValue', init: '0' },
      { label: 'Links', valueId: 'chipLinksValue', init: '0' },
    ];

    /* Line items section in box */
    const liBoxY = chipY + 26;

    /* Sub-tabs below the box */
    const subTabY = RP_Y + 162;
    const subTabs = ['Budget', 'Plan', 'Assumptions'];

    /* Tiles area */
    const tilesY = RP_Y + 222;

    /* Totals */
    const totY = tilesY + 2 * (TILE_H + TILE_GAP) + 10;
    const totCardW = (RP_W - 12) / 3;

    /* Category bars */
    const barsY = totY + 54;
    const BAR_MAX_W = RP_W - 80;

    /* Bottom controls */
    const ctrlY = MOD_Y + MOD_H - 68;

    return (
      <g>
        {/* ── Top tabs ── */}
        {rpTabs.map((t, i) => {
          const tw = 90;
          const tx = RP_X + i * (tw + 4);
          const isActive = i === 0;
          return (
            <g key={i}>
              <rect x={tx} y={tabY} width={tw} height={26} rx={6}
                fill={isActive ? C.white08 : 'none'}
                stroke={isActive ? C.borderCard : C.border}
                strokeWidth={0.5} />
              <text x={tx + tw / 2} y={tabY + 17} textAnchor="middle"
                fill={isActive ? C.text : C.textMuted} fontSize={9} fontWeight={isActive ? 600 : 400}
                fontFamily={FONT}>
                {t}
              </text>
            </g>
          );
        })}

        {/* ── "Will be added on apply" box ── */}
        <rect x={RP_X} y={chipY - 10} width={RP_W} height={114} rx={8}
          fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <text x={RP_X + 10} y={chipY + 2} fill={C.textMuted} fontSize={8} fontFamily={FONT}>
          Will be added on apply
        </text>

        {/* Chips */}
        {chips.map((ch, i) => {
          const cw = 58;
          const cx = RP_X + 10 + i * (cw + 6);
          return (
            <g key={i}>
              <rect x={cx} y={chipY + 8} width={cw} height={18} rx={4}
                fill={C.white05} stroke={C.border} strokeWidth={0.4} />
              <text x={cx + 6} y={chipY + 20} fill={C.textSec} fontSize={8} fontFamily={FONT}>
                {ch.label}
              </text>
              <text id={ch.valueId} x={cx + cw - 10} y={chipY + 20} fill={C.text}
                fontSize={8} fontWeight={600} fontFamily={FONT} textAnchor="end">
                {ch.init}
              </text>
            </g>
          );
        })}

        {/* Line items label */}
        <text x={RP_X + 10} y={liBoxY + 8} fill={C.textMuted} fontSize={7}
          fontWeight={600} fontFamily={FONT} letterSpacing="0.04em">
          LINE ITEMS
        </text>

        {/* Preview items */}
        {PREVIEW_ITEMS.map((txt, i) => (
          <text
            key={i}
            id={`previewItem${i + 1}`}
            x={RP_X + 14}
            y={liBoxY + 22 + i * 14}
            fill={C.textSec}
            fontSize={8}
            fontFamily={FONT}
            style={{ opacity: 0 }}
          >
            {txt}
          </text>
        ))}
        <text id="previewMore" x={RP_X + 14} y={liBoxY + 64} fill={C.textMuted}
          fontSize={8} fontFamily={FONT} style={{ opacity: 0 }}>
          +3 more
        </text>

        {/* ── Sub-tabs (Budget / Plan / Assumptions) ── */}
        {subTabs.map((st, i) => {
          const sw = (RP_W - 8) / 3;
          const sx = RP_X + i * (sw + 4);
          const isActive = i === 0;
          return (
            <g key={i}>
              <rect x={sx} y={subTabY} width={sw} height={22} rx={4}
                fill={isActive ? C.white08 : 'none'} />
              <text x={sx + sw / 2} y={subTabY + 15} textAnchor="middle"
                fill={isActive ? C.text : C.textMuted} fontSize={8}
                fontWeight={isActive ? 600 : 400} fontFamily={FONT}>
                {st}
              </text>
            </g>
          );
        })}

        {/* ── Variant tiles ── */}
        {TILES.map((tile, i) => {
          const col = i % TILE_COLS;
          const row = Math.floor(i / TILE_COLS);
          const tx = RP_X + col * (TILE_W + TILE_GAP);
          const ty = tilesY + row * (TILE_H + TILE_GAP);
          return (
            <g key={tile.id} id={tile.id}>
              <rect x={tx} y={ty} width={TILE_W} height={TILE_H} rx={6}
                fill={C.card} stroke={C.border} strokeWidth={0.5} />
              <text x={tx + 8} y={ty + 16} fill={C.text} fontSize={8}
                fontWeight={500} fontFamily={FONT}>
                {tile.label}
              </text>
              <text x={tx + 8} y={ty + 30} fill={C.textMuted} fontSize={6.5}
                fontFamily={FONT}>
                {tile.desc}
              </text>
            </g>
          );
        })}

        {/* Tile highlight (moves during animation) */}
        <rect
          id="tileHighlight"
          x={RP_X}
          y={tilesY}
          width={TILE_W}
          height={TILE_H}
          rx={6}
          fill="none"
          stroke={C.accent}
          strokeWidth={2}
          style={{ pointerEvents: 'none' }}
        />

        {/* ── RFP readiness indicator ── */}
        <circle cx={RP_X + 6} cy={totY - 26} r={4} fill={C.gold} />
        <text x={RP_X + 16} y={totY - 23} fill={C.textSec} fontSize={7.5} fontWeight={500} fontFamily={FONT}>
          RFP readiness: Needs answers
        </text>
        <text x={RP_X + 8} y={totY - 12} fill={C.textMuted} fontSize={6.5} fontFamily={FONT}>
          Missing: CITY, INSTALL, DAYS, CREW, COUNT, TRAVEL, TRUCKING, NEEDED
        </text>

        {/* ── Totals row ── */}
        {[
          { label: 'BUDGETED', id: 'budgetedValue', init: '–' },
          { label: 'FINAL (RANGE)', id: 'finalValue', init: '–' },
          { label: 'EFFECTIVE MARKUP', id: 'markupValue', init: '–' },
        ].map((tot, i) => {
          const tw2 = totCardW;
          const tx = RP_X + i * (tw2 + 6);
          return (
            <g key={i}>
              <rect x={tx} y={totY} width={tw2} height={40} rx={6}
                fill={C.card} stroke={C.border} strokeWidth={0.5} />
              <text x={tx + 8} y={totY + 14} fill={C.textMuted} fontSize={7}
                fontFamily={FONT} letterSpacing="0.03em">
                {tot.label}
              </text>
              <text id={tot.id} x={tx + 8} y={totY + 32} fill={C.text}
                fontSize={12} fontWeight={600} fontFamily={MONO}>
                {tot.init}
              </text>
            </g>
          );
        })}

        {/* ── Category breakdown label ── */}
        <text x={RP_X} y={barsY - 4} fill={C.textMuted} fontSize={7} fontWeight={600}
          fontFamily={FONT} letterSpacing="0.04em">
          Category breakdown
        </text>

        {/* ── Category bars ── */}
        {BARS.map((bar, i) => {
          const by = barsY + 6 + i * 18;
          return (
            <g key={bar.id}>
              <text x={RP_X} y={by + 10} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
                {bar.label}
              </text>
              {/* Bar background */}
              <rect x={RP_X} y={by + 14} width={BAR_MAX_W} height={5} rx={2.5}
                fill={C.white05} />
              {/* Bar fill (animatable) */}
              <rect id={bar.id} x={RP_X} y={by + 14} width={0} height={5} rx={2.5}
                fill={C.accent} opacity={0.8} />
              {/* Amount */}
              <text x={RP_X + BAR_MAX_W + 8} y={by + 19} fill={C.textSec} fontSize={7}
                fontFamily={FONT}>
                {bar.amount}
              </text>
            </g>
          );
        })}

        {/* ── Line Items count ── */}
        <text x={RP_X} y={barsY + 80} fill={C.textMuted} fontSize={7.5} fontWeight={600}
          fontFamily={FONT}>
          Line Items
        </text>
        <text x={RP_X + RP_W - 8} y={barsY + 80} fill={C.text} fontSize={8}
          fontWeight={600} fontFamily={FONT} textAnchor="end">
          6
        </text>

        {/* ── A preview line item bubble ── */}
        <rect x={RP_X} y={barsY + 86} width={RP_W} height={32} rx={6}
          fill={C.card} stroke={C.border} strokeWidth={0.5} />
        <circle cx={RP_X + 12} cy={barsY + 102} r={4} fill={C.teal} opacity={0.6} />
        <text x={RP_X + 22} y={barsY + 96} fill={C.textMuted} fontSize={6.5} fontFamily={FONT}>
          PRODUCTION - MGMT:
        </text>
        <text x={RP_X + 22} y={barsY + 107} fill={C.text} fontSize={7.5} fontWeight={500} fontFamily={FONT}>
          PRODUCTION - PRE-PRO + COORDINATION
        </text>
        <text x={RP_X + RP_W - 10} y={barsY + 96} fill={C.textMuted} fontSize={6.5}
          fontFamily={FONT} textAnchor="end">
          1 lot
        </text>
        <text x={RP_X + RP_W - 10} y={barsY + 107} fill={C.textSec} fontSize={7}
          fontFamily={FONT} textAnchor="end">
          $1,200 · 25%
        </text>

        {/* ── Bottom controls row ── */}
        <g>
          {/* Event type dropdown */}
          {[
            { label: 'Event type', value: 'brand activation', x: RP_X - 340 },
            { label: 'Venue qty', value: 'Optional', x: RP_X - 200 },
            { label: 'Crew model', value: 'internal', x: RP_X - 72 },
          ].map((ctrl, i) => {
            const cx2 = MOD_X + 20 + i * 144;
            return (
              <g key={i}>
                <text x={cx2} y={ctrlY - 4} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
                  {ctrl.label}
                </text>
                <rect x={cx2} y={ctrlY} width={130} height={22} rx={4}
                  fill={C.card} stroke={C.border} strokeWidth={0.5} />
                <text x={cx2 + 8} y={ctrlY + 15} fill={C.textSec} fontSize={8} fontFamily={FONT}>
                  {ctrl.value}
                </text>
                <text x={cx2 + 118} y={ctrlY + 15} fill={C.textMuted} fontSize={8} fontFamily={FONT}>▾</text>
              </g>
            );
          })}
          {/* Markup target */}
          <text x={MOD_X + 460} y={ctrlY - 4} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
            Markup target
          </text>
          <rect x={MOD_X + 460} y={ctrlY} width={80} height={22} rx={4}
            fill={C.card} stroke={C.border} strokeWidth={0.5} />
          <text x={MOD_X + 468} y={ctrlY + 15} fill={C.textSec} fontSize={8} fontFamily={FONT}>25%</text>

          {/* Second row */}
          {[
            { label: 'Contingency', value: '10%', x: MOD_X + 20 },
            { label: 'Apply mode', value: 'Add', x: MOD_X + 308 },
          ].map((ctrl, i) => {
            const cx2 = ctrl.x;
            return (
              <g key={i}>
                <text x={cx2} y={ctrlY + 28} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
                  {ctrl.label}
                </text>
                <rect x={cx2} y={ctrlY + 32} width={130} height={22} rx={4}
                  fill={C.card} stroke={C.border} strokeWidth={0.5} />
                <text x={cx2 + 8} y={ctrlY + 47} fill={C.textSec} fontSize={8} fontFamily={FONT}>
                  {ctrl.value}
                </text>
                <text x={cx2 + 118} y={ctrlY + 47} fill={C.textMuted} fontSize={8} fontFamily={FONT}>▾</text>
              </g>
            );
          })}
          {/* Include travel checkbox */}
          <text x={MOD_X + 164} y={ctrlY + 40} fill={C.textMuted} fontSize={7} fontFamily={FONT}>
            Include travel/trucking
          </text>
          <rect x={MOD_X + 164} y={ctrlY + 44} width={12} height={12} rx={2}
            fill={C.teal} stroke={C.teal} strokeWidth={0.5} />
          <text x={MOD_X + 166} y={ctrlY + 54} fill="#fff" fontSize={8} fontFamily={FONT}>✓</text>
        </g>

        {/* ── Bottom-right buttons ── */}
        <g>
          {/* Cancel */}
          <g id="btnCancel">
            <rect x={MOD_X + MOD_W - 310} y={ctrlY + 32} width={70} height={26} rx={6}
              fill="none" stroke={C.border} strokeWidth={0.5} />
            <text x={MOD_X + MOD_W - 275} y={ctrlY + 49} textAnchor="middle"
              fill={C.textSec} fontSize={9} fontFamily={FONT}>
              Cancel
            </text>
          </g>

          {/* Copy RFP pack */}
          <rect x={MOD_X + MOD_W - 230} y={ctrlY + 32} width={96} height={26} rx={6}
            fill="none" stroke={C.border} strokeWidth={0.5} />
          <text x={MOD_X + MOD_W - 182} y={ctrlY + 49} textAnchor="middle"
            fill={C.textSec} fontSize={9} fontFamily={FONT}>
            Copy RFP pack
          </text>

          {/* Apply to REV1 */}
          <g id="btnApply">
            <rect
              id="btnApplyBg"
              x={MOD_X + MOD_W - 124} y={ctrlY + 32}
              width={104} height={26} rx={6}
              fill={C.accent}
            />
            <text x={MOD_X + MOD_W - 72} y={ctrlY + 49} textAnchor="middle"
              fill="#fff" fontSize={9} fontWeight={600} fontFamily={FONT}>
              Apply to REV1
            </text>
            {/* Glow rect (for Apply press effect) */}
            <rect
              id="btnApplyGlow"
              x={MOD_X + MOD_W - 128} y={ctrlY + 28}
              width={112} height={34} rx={10}
              fill="none" stroke={C.accent} strokeWidth={2}
              style={{ opacity: 0 }}
            />
          </g>
        </g>
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
        aria-label="Budget Spellbook feature demonstration"
        role="img"
      >
        {/* ── Global defs ───────────────────────────────── */}
        <defs>
          <linearGradient id="bsDarkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0D0F12" />
            <stop offset="100%" stopColor="#111418" />
          </linearGradient>
          <linearGradient id="bsModalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#171B22" />
            <stop offset="100%" stopColor="#111316" />
          </linearGradient>
          <filter id="bsShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="24" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* ═══════════════════════════════════════════════
            STATE A — Budget Page (#budgetView)
            ═══════════════════════════════════════════════ */}
        <g id="budgetView">
          {/* Background */}
          <rect width={W} height={H} fill={C.bg} rx={12} />

          {/* Sidebar */}
          {renderSidebar()}

          {/* ── Project header ── */}
          <circle cx={PX + 10} cy={PY + 16} r={12} fill={C.white05} />
          <text x={PX + 28} y={PY + 20} fill={C.text} fontSize={12} fontWeight={500} fontFamily={FONT}>
            LA Awards Week Gala
          </text>
          <text x={PX + 148} y={PY + 20} fill={C.textMuted} fontSize={10} fontFamily={FONT}>◡</text>

          {/* ── BUDGET heading ── */}
          <text x={PX} y={PY + 44} fill={C.text} fontSize={11} fontWeight={700}
            fontFamily={FONT} letterSpacing="0.06em">
            BUDGET
          </text>
          <text x={PX + 62} y={PY + 44} fill={C.textMuted} fontSize={9} fontFamily={FONT}>
            · As of 2/11/2026
          </text>

          {/* REV badge */}
          <rect x={PX + PW - 52} y={PY + 32} width={44} height={18} rx={4} fill={C.white05} />
          <text x={PX + PW - 40} y={PY + 44} fill={C.textSec} fontSize={8} fontWeight={600} fontFamily={FONT}>
            REV.1
          </text>

          {/* Top-right icons */}
          <rect x={PX + PW - 112} y={PY + 32} width={22} height={18} rx={4} fill={C.white05} />
          <rect x={PX + PW - 86} y={PY + 32} width={22} height={18} rx={4} fill={C.white05} />

          {/* ── KPI cards ── */}
          {renderKPIs()}

          {/* ── Margin + Client Total ── */}
          {renderKPI2()}

          {/* ── Donut chart ── */}
          {renderDonut()}

          {/* ── Filter bar ── */}
          {renderFilterBar()}

          {/* ── Line items ── */}
          {renderLineItems()}

          {/* ── New rows (hidden) ── */}
          {renderNewRows()}
        </g>

        {/* ═══════════════════════════════════════════════
            Modal Scrim
            ═══════════════════════════════════════════════ */}
        <rect id="modalScrim" width={W} height={H} fill="rgba(0,0,0,0.55)"
          rx={12} style={{ opacity: 0 }} />

        {/* ═══════════════════════════════════════════════
            STATE B — Budget Spellbook Modal (#modalView)
            ═══════════════════════════════════════════════ */}
        <g id="modalView" style={{ opacity: 0 }}>
          {/* Modal card */}
          <rect
            x={MOD_X} y={MOD_Y} width={MOD_W} height={MOD_H} rx={MOD_R}
            fill="url(#bsModalGrad)" filter="url(#bsShadow)"
            stroke={C.borderCard} strokeWidth={1}
          />
          {/* Top highlight line */}
          <line x1={MOD_X + MOD_R} y1={MOD_Y + 0.5} x2={MOD_X + MOD_W - MOD_R} y2={MOD_Y + 0.5}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

          {/* ── Modal header ── */}
          <circle cx={MOD_X + 22} cy={MOD_Y + 22} r={12} fill={C.accentDim} />
          <text x={MOD_X + 22} y={MOD_Y + 26} textAnchor="middle"
            fill={C.accent} fontSize={10} fontFamily={FONT}>✦</text>
          <text x={MOD_X + 40} y={MOD_Y + 22} fill={C.text} fontSize={13}
            fontWeight={600} fontFamily={FONT}>
            Budget Spellbook
          </text>

          {/* Close button */}
          <circle cx={MOD_X + MOD_W - 22} cy={MOD_Y + 22} r={12}
            fill={C.white05} stroke={C.border} strokeWidth={0.5} />
          <text x={MOD_X + MOD_W - 22} y={MOD_Y + 26} textAnchor="middle"
            fill={C.textMuted} fontSize={13} fontFamily={FONT}>×</text>

          {/* ── Left textarea ── */}
          {renderModalTextarea()}

          {/* ── Right panel ── */}
          {renderModalRightPanel()}
        </g>
      </svg>
    </div>
  );
}
