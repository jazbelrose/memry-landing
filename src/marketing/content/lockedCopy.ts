/* ═══════════════════════════════════════════════════════════
   lockedCopy.ts — Single source of truth for ALL page copy.
   Locked sections are VERBATIM from the approved copy deck.
   `ui` contains editable section headings / labels.
   ═══════════════════════════════════════════════════════════ */

// ── Locked Copy (verbatim — do not paraphrase) ────────────

export const copy = {
  hero: {
    headline: 'The shared brain teams use to plan, execute, and deliver work.',
    subhead:
      'Budgets, schedules, and deliverables in one workspace.\nNo more tool-switching. No more version chaos.',
    primaryCta: 'Request Access',
    secondaryCta: 'See How It Works',
  },

  problem: {
    headline: 'The system breaks when your work lives in five tools.',
    body: `Plans in slides. Budgets in spreadsheets. Decisions in chat.
Tasks in Asana. Files in Drive.
Nothing connects — which means the project never actually stays aligned.
Memry exists because production work is not a set of documents.
It's a single operational system.
Every change should ripple across the whole workflow instantly.`,
  },

  solution: {
    headline: "Everything moves together — because it's one workspace.",
    body: `Memry connects the pieces that normally drift apart:
Decks, budgets, tasks, calendars, files, approvals, and project communication.
When the budget changes, the task plan updates.
When a deck version ships, the team is aligned.
When spend hits the ledger, margin recalculates.
That's what "from planning to payment" actually means.
One system. Real-time. No tool-switching.`,
  },

  spellbooks: {
    headline: 'Spellbooks generate real plans from real production inputs.',
    body: `Use Spellbooks to translate a production scenario into structured outputs:
budget line items, task templates, schedules, staffing assumptions, and deliverables.
Instead of starting from scratch, you start from proven operating logic — and edit
from there.
This is how you scale repeatable work without repeating yourself.`,
    features: [
      'Production-first templates (not generic AI)',
      'Output budgets + task maps instantly',
      'Designed for operators, not prompt engineers',
    ],
  },

  decks: {
    headline: 'Decks are version-controlled and built for client-facing work.',
    body: `Memry includes a multi-slide editor designed for concept decks, client previews,
and production-ready documentation.
No overwriting.
No "final_v7."
No misaligned versions between the designer, producer, and client.`,
    features: [
      'Built-in slide editor (real-time)',
      'Create preview versions without risk',
      'Export to PDF anytime',
    ],
  },

  budgets: {
    headline: 'Budgets stay connected to scope, margin, and reality.',
    supportLine: 'Structured line items. Real-time totals. Linked to tasks and delivery.',
    body: `Budgets in Memry aren't spreadsheets. They're a live model.
Cost, markup, and client price stay visible.
Line items link to tasks and deliverables.
As spend comes in, reconciliation updates margin — without manual cleanup.`,
    features: [
      'Cost / markup / price model',
      'Task-linked line items',
      'Margin updates automatically',
    ],
  },

  tasks: {
    headline: 'Tasks are assigned, tracked, and tied to real delivery.',
    supportLine: 'Not a list — a workflow.',
    body: `Memry tasks are structured by production logic:
assigned owners, status transitions, dependencies, and audit trails.
They connect directly to budget scope and project timelines — so tasks reflect
what the work actually costs and impacts.`,
    features: [
      'Status workflow (with trails)',
      'Assignments + accountability',
      'Budget-linked execution',
    ],
  },

  files: {
    headline: 'Files, assets, and delivery live inside the project.',
    supportLine: 'Upload, organize, share, and deliver without losing context.',
    body: `Memry includes project file storage built for production environments:
team uploads, vendor files, client exports, revision sets, delivery links.
No more hunting through Drive folders or email attachments.
Everything is tied to the project and the work.`,
    features: [
      'Structured file manager',
      'Client delivery links',
      'In-context attachments everywhere',
    ],
  },

  whoItsFor: {
    headline: 'Built for every role involved in real production.',
    subhead:
      "Memry isn't a \"tool for creatives.\"\nIt's an operating system for the full team.",
    roles: [
      { role: 'CEO / Admin', description: 'visibility across every project and dollar' },
      { role: 'Producer / PM', description: 'real-time control of scope, schedule, approvals' },
      {
        role: 'Design Lead / Creative Director',
        description: 'deck versioning, collaboration, delivery control',
      },
      { role: 'Builder / Crew', description: 'clear tasks, files, and handoffs without chaos' },
    ],
  },

  v1Readiness: {
    headline: 'Memry V1 is built for real teams running real budgets.',
    body: `This is not a prototype.
V1 already supports decks, budgets, tasks, files, and project operations in one
connected workspace.
Access is currently limited while we onboard teams directly.`,
  },
} as const;

// ── Editable UI labels (not part of locked copy) ──────────

export const ui = {
  navChip: 'v1.0',
  problemSupport:
    'Nothing connects — which means the project never actually stays aligned.',
  featureGridHeading: 'Built for the way you actually work',
  comparisonHeading: 'Why Memry instead of the usual stack?',
  workflowLabel: 'Case Study',
  workflowTitle: 'Luxe Gala 2026 — $250K Corporate Event',
  ctaHeadline: 'Replace chaos with a single source of truth.',
  contactSales: 'Contact Sales',
  footerTagline: 'The shared brain for production teams.',
} as const;

// ── Data arrays ───────────────────────────────────────────

export const problemCards = [
  {
    title: 'Fragmented Tools',
    description:
      'Plans in slides, budgets in spreadsheets, decisions in chat. Nothing connects.',
  },
  {
    title: 'Version Chaos',
    description:
      'No overwriting protection, no version control. "final_v7" is the norm.',
  },
  {
    title: 'No Connected Workflow',
    description:
      'When scope changes, nothing else updates. The project drifts apart.',
  },
];

export const tabsData = [
  {
    id: 'slides',
    label: 'Slides',
    headline: copy.decks.headline,
    body: copy.decks.body,
    features: [...copy.decks.features],
  },
  {
    id: 'budgets',
    label: 'Budgets',
    headline: copy.budgets.headline,
    body: copy.budgets.body,
    features: [...copy.budgets.features],
  },
  {
    id: 'tasks',
    label: 'Tasks',
    headline: copy.tasks.headline,
    body: copy.tasks.body,
    features: [...copy.tasks.features],
  },
  {
    id: 'calendar',
    label: 'Calendar',
    headline: 'Schedules stay connected to delivery.',
    body: 'Project timelines update as scope and tasks evolve. Deadlines reflect reality, not guesswork.',
    features: [] as string[],
  },
  {
    id: 'files',
    label: 'Files',
    headline: copy.files.headline,
    body: copy.files.body,
    features: [...copy.files.features],
  },
];

export const featureCards = [
  {
    icon: 'spellbook',
    title: 'Spellbooks',
    description:
      'Generate structured outputs — budgets, task maps, schedules — from proven production templates.',
  },
  {
    icon: 'slides',
    title: 'Version-Controlled Decks',
    description:
      'Multi-slide editor with real-time collaboration. No overwriting. No "final_v7."',
  },
  {
    icon: 'budget',
    title: 'Live Budgets',
    description:
      'Cost, markup, and client price stay visible. Margin recalculates as spend comes in.',
  },
  {
    icon: 'tasks',
    title: 'Production Tasks',
    description:
      'Assigned owners, status workflows, and dependencies tied to budget scope.',
  },
  {
    icon: 'files',
    title: 'Project File Storage',
    description:
      'Team uploads, vendor files, client exports, and delivery links — all in context.',
  },
  {
    icon: 'connect',
    title: 'Connected System',
    description:
      'When the budget changes, the task plan updates. One system. Real-time. No tool-switching.',
  },
];

export const comparisonRows = [
  {
    tool: 'Google Slides + Sheets',
    gap: 'Decks and budgets live in separate tools. No version link.',
    advantage: 'Decks and budgets in one workspace, version-controlled.',
  },
  {
    tool: 'Notion / Asana',
    gap: 'Tasks disconnected from budgets, files, and delivery.',
    advantage: 'Tasks linked to budget line items and project timelines.',
  },
  {
    tool: 'Figma',
    gap: 'Design files live outside the production workflow.',
    advantage: 'Deck editor built into the production system.',
  },
  {
    tool: 'Monday.com',
    gap: 'Project management without financial visibility.',
    advantage: 'Real-time margin tracking alongside task execution.',
  },
  {
    tool: 'Spreadsheets',
    gap: 'Manual reconciliation. No live connection to scope.',
    advantage: 'Budgets auto-update as spend and scope change.',
  },
  {
    tool: 'Email + Chat',
    gap: 'Decisions lost in threads. No audit trail.',
    advantage: 'Communication tied to projects with full context.',
  },
];

export const workflowSteps = [
  {
    number: 1,
    title: 'Project Setup',
    description: 'Create the project workspace, define scope, and invite the team.',
  },
  {
    number: 2,
    title: 'Deck Creation',
    description: 'Build client-facing concept decks with version control.',
  },
  {
    number: 3,
    title: 'Spellbook Budget Generation',
    description: 'Generate structured budgets from production templates.',
  },
  {
    number: 4,
    title: 'Task Assignment',
    description: 'Assign tasks linked to budget items and delivery milestones.',
  },
  {
    number: 5,
    title: 'Execution & Review',
    description: 'Track progress, manage files, and review deliverables.',
  },
  {
    number: 6,
    title: 'HQ Reconciliation',
    description: 'Reconcile spend against budget. Margin updates automatically.',
  },
];

export const roleCardsData = [
  {
    role: 'CEO / Admin',
    bullets: [
      'Visibility across every project and dollar',
      'Real-time margin tracking and reconciliation',
      'One connected workspace for the full team',
    ],
  },
  {
    role: 'Producer / PM',
    bullets: [
      'Real-time control of scope, schedule, approvals',
      'Task workflows linked to budget line items',
      'Spellbook-powered planning from production templates',
    ],
  },
  {
    role: 'Design Lead / Creative Director',
    bullets: [
      'Deck versioning, collaboration, delivery control',
      'Multi-slide editor with preview versions',
      'Export to PDF anytime',
    ],
  },
  {
    role: 'Builder / Crew',
    bullets: [
      'Clear tasks, files, and handoffs without chaos',
      'Status workflow with audit trails',
      'In-context file attachments everywhere',
    ],
  },
];
