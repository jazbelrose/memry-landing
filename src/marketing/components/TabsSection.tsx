import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { copy, tabsData } from '../content/lockedCopy';
import { SlidesIcon, BudgetIcon, TasksIcon, CalendarIcon, FilesIcon } from './Icons';
import { Section } from './Section';
import styles from './TabsSection.module.css';

/* ── Abstract diagram per tab ─────────────────────────── */
interface NodeDef {
  x: number;
  y: number;
  label: string;
}

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  slides: SlidesIcon,
  budget: BudgetIcon,
  tasks: TasksIcon,
  calendar: CalendarIcon,
  files: FilesIcon,
};

const diagrams: Record<string, { nodes: NodeDef[]; edges: [number, number][] }> = {
  slides: {
    nodes: [
      { x: 60, y: 40, label: 'Draft' },
      { x: 180, y: 40, label: 'Review' },
      { x: 300, y: 40, label: 'Final' },
      { x: 180, y: 120, label: 'Export' },
    ],
    edges: [[0, 1], [1, 2], [1, 3]],
  },
  budgets: {
    nodes: [
      { x: 60, y: 80, label: 'Cost' },
      { x: 180, y: 40, label: 'Markup' },
      { x: 300, y: 80, label: 'Price' },
      { x: 180, y: 130, label: 'Margin' },
    ],
    edges: [[0, 1], [1, 2], [0, 3], [2, 3]],
  },
  tasks: {
    nodes: [
      { x: 50, y: 40, label: 'To Do' },
      { x: 160, y: 40, label: 'Active' },
      { x: 270, y: 40, label: 'Review' },
      { x: 330, y: 120, label: 'Done' },
    ],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  calendar: {
    nodes: [
      { x: 40, y: 80, label: 'Start' },
      { x: 140, y: 50, label: 'Phase 1' },
      { x: 240, y: 50, label: 'Phase 2' },
      { x: 340, y: 80, label: 'Ship' },
    ],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  files: {
    nodes: [
      { x: 180, y: 30, label: 'Project' },
      { x: 60, y: 110, label: 'Assets' },
      { x: 180, y: 110, label: 'Exports' },
      { x: 300, y: 110, label: 'Delivery' },
    ],
    edges: [[0, 1], [0, 2], [0, 3]],
  },
};

function TabDiagram({ tabId }: { tabId: string }) {
  const cfg = diagrams[tabId] ?? diagrams.slides;
  return (
    <svg viewBox="0 0 380 160" className={styles.diagram} aria-hidden="true">
      {cfg.edges.map(([from, to], i) => (
        <line
          key={i}
          x1={cfg.nodes[from].x}
          y1={cfg.nodes[from].y}
          x2={cfg.nodes[to].x}
          y2={cfg.nodes[to].y}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      ))}
      {cfg.nodes.map((node, i) => (
        <g key={i}>
          <rect
            x={node.x - 34}
            y={node.y - 14}
            width="68"
            height="28"
            rx="8"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill="#A0A0A0"
            fontSize="11"
            fontFamily="var(--font)"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ── Tabs component ───────────────────────────────────── */

export function TabsSection() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let next = active;
      if (e.key === 'ArrowRight') next = (active + 1) % tabsData.length;
      else if (e.key === 'ArrowLeft')
        next = (active - 1 + tabsData.length) % tabsData.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabsData.length - 1;
      else return;
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    },
    [active],
  );

  const tab = tabsData[active];

  return (
    <Section id="workspace">
      <motion.h2
        className={styles.heading}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {copy.solution.headline}
      </motion.h2>

      {copy.solution.subheadline && (
        <motion.p
          className={styles.subheading}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {copy.solution.subheadline}
        </motion.p>
      )}

      <div
        className={styles.tabList}
        role="tablist"
        aria-label="Workspace modules"
        onKeyDown={handleKeyDown}
      >
        {tabsData.map((t, i) => {
          const IconComponent = iconMap[t.icon];
          return (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            id={`tab-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
            onClick={() => setActive(i)}
          >
            {IconComponent && <IconComponent size={20} />}
            {t.label}
            {i === active && (
              <motion.span
                className={styles.indicator}
                layoutId="tab-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          className={styles.panel}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <div className={styles.panelCopy}>
            <h3 className={styles.panelHeadline}>{tab.headline}</h3>
            <p className={styles.panelBody}>{tab.body}</p>
            {tab.features.length > 0 && (
              <ul className={styles.panelFeatures}>
                {tab.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.panelDiagram}>
            <TabDiagram tabId={tab.id} />
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
