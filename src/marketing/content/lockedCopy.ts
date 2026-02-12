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
    headline: 'The problem with your current stack',
    body: `Plans in slides. Budgets in spreadsheets. Decisions in chat.
Tasks in Asana. Files in Drive.
By the time work reaches execution, context is already gone.
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
    'By the time work reaches execution, context is already gone.',
  featureGridHeading: 'Built for the way you actually work',
  comparisonHeading: 'Why Memry instead of the usual stack?',
  workflowLabel: 'Case Study',
  workflowTitle: 'Luxe Gala 2026 — $250K Corporate Event',
  ctaHeadline: 'Replace chaos with a single source of truth.',
  contactSales: 'Contact Sales',
  footerTagline: 'The shared brain for production teams.',
  useCasesHeadline: 'Use Cases',
  useCasesSubhead: 'Memry is built for the people who make things happen.',
  productHeadline: 'Features',
  productSubhead: 'A complete production management platform. Here\'s what\'s inside.',
  securityHeadline: 'Security you can trust',
  securitySubhead: 'Your production data, budgets, and files are protected by design.',
  securityChecklistTitle: 'Security Practices Checklist',
  faqHeadline: 'Frequently Asked Questions',
  faqSubhead: 'Answers to your questions. No fluff.',
  releaseHeadline: 'Release Notes — V1.0',
  releaseSubhead: 'Everything included in the initial release of Memry.',
  releaseDate: 'February 2026',
} as const;

// ── Data arrays ───────────────────────────────────────────

export const problemCards = [
  {
    title: 'Fragmented Tools',
    description: `Decks in one place, budgets in another,
tasks somewhere else. Your team wastes
hours switching contexts.`,
  },
  {
    title: 'Version Chaos',
    description: '"final_final_v3.pptx" - Sound familiar? No single source of truth means endless confusion.',
  },
  {
    title: 'No Connected Workflow',
    description: `Tasks are never linked to budget lines. Calendar blocks don't know about deadlines. Payments happen in the dark.`,
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
    icon: 'presentation',
    title: 'Slide Decks',
    description:
      'Create stunning client decks with real-time collaboration, Magic Layouts, and one-click PDF export. Version control built in.',
  },
  {
    icon: 'calculator',
    title: 'Smart Budgets',
    description:
      'One click creates budget lines, tasks, and calendar blocks. Three cost types, invoice lump-summing, and bank-data reconciliation.',
  },
  {
    icon: 'checksquare',
    title: 'Task Workflows',
    description:
      'Assign, review, approve. Structured status transitions with audit trails keep every team member accountable.',
  },
  {
    icon: 'calendardays',
    title: 'Project Calendar',
    description:
      'Schedule events, focus blocks, and milestones. ICS feed export keeps everyone synced.',
  },
  {
    icon: 'bookopen',
    title: 'HQ Ledger',
    description:
      'Import bank transactions, auto-categorize, detect recurring costs, and allocate spend to budget lines across all projects.',
  },
  {
    icon: 'folderup',
    title: 'Files & Delivery',
    description:
      'Upload, organize, and deliver files via CDN. Soft delete with 30-day restore. ZIP downloads for bulk delivery.',
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

export const useCases = [
  {
    title: 'Event Production Teams',
    description: 'Teams of 5-50 managing $50K–$5M projects',
    icon: 'briefcase',
    painPoints: [
      'Scattered budgets across spreadsheets',
      'No link between vendor costs and tasks',
      'Version chaos in client presentations',
    ],
    keyWorkflows: [
      'Spellbook → auto-generate budget + tasks + schedule',
      'HQ Ledger → reconcile tank spend against project budgets',
    ],
  },
  {
    title: 'Design-Ops / Creative Agencies',
    description: 'Creative teams managing deliverables, vendors, and client reviews',
    icon: 'palette',
    painPoints: [
      'Decks live outside the production workflow',
      'No financial visibility for creative leads',
      'Manual export and delivery processes',
    ],
    keyWorkflows: [
      'Slide decks → real-time co-authoring + preview versions',
      'Files & Delivery → CDN-powered asset delivery with ZIP export',
    ],
  },
  {
    title: 'Producers / Project Leads',
    description: 'Project owners responsible for scope, budget, and timeline',
    icon: 'target',
    painPoints: [
      'No dashboard connecting budget to schedule to spend',
      'Status updates require chasing team members',
      'Margin visibility only at month-end',
    ],
    keyWorkflows: [
      'Project Hub → single view of slides, budget, tasks, calendar',
      'Task Workflows → structured review stages with audit trails',
    ],
  },
  {
    title: 'Builders / Production Crews',
    description: 'On-the-ground crew executing tasks and deliverables',
    icon: 'hammer',
    painPoints: [
      'Unclear task priorities and dependencies',
      'No mobile-friendly task view',
      "Can't see how their work connects to the budget",
    ],
    keyWorkflows: [
      'Tasks → clear assignments linked to budget lines and calendar',
      'Calendar → focus blocks synced to crew schedules',
    ],
  },
  {
    title: 'Client Stakeholders',
    description: 'Clients reviewing decks and approving deliverables',
    icon: 'eye',
    painPoints: [
      'Receiving outdated versions via email',
      'No single link for project status',
      'Manual approval via email threads',
    ],
    keyWorkflows: [
      'Deck Versioning → client-default version with controlled access',
      'Files & Delivery → organized file delivery via CDN links',
    ],
  },
];

export const securityFeatures = [
  {
    title: 'CDN-Powered File Delivery',
    description: 'Files served via content delivery network for fast, reliable access worldwide.',
    icon: 'globe',
  },
  {
    title: 'Signed Expiring URLs',
    description: 'Secure assets are served via signed URLs that expire, preventing unauthorized access.',
    icon: 'lock',
  },
  {
    title: 'Soft Delete with 30-Day Retention',
    description: 'Deleted files are recoverable for 30 days, protecting against accidental data loss.',
    icon: 'clock',
  },
  {
    title: 'Role-Based Access Control',
    description: 'Five distinct roles: Admin, Designer, Builder, Vendor, and Client — each with scoped permissions.',
    icon: 'users',
  },
  {
    title: 'JWT-Based Authentication',
    description: 'Industry-standard JSON Web Token authentication for secure session management.',
    icon: 'shield',
  },
];

export const securityChecklist = {
  left: [
    'All data encrypted in transit (TLS 1.2+)',
    'Signed, expiring URLs for secure file access',
    'Audit trails on task and approval workflows',
    'Input validation and sanitization',
  ],
  right: [
    'Role-based access control on every resource',
    'Soft delete with 30-day recovery window',
    'Session management with JWT tokens',
    'Regular security reviews and updates',
  ],
};

export const productFeatures = [
  {
    title: 'Project Hub',
    description: 'Every project lives in a unified hub. Switch between Slides, Budget, Tasks, Calendar, and Files with a single click. No tab overload — just one clean workspace.',
    icon: 'briefcase',
  },
  {
    title: 'Deck Versioning',
    description: 'Draft, approved, archived — every version tracked. Set a client-default version to share polished presentations without exposing work-in-progress.',
    icon: 'slides',
  },
  {
    title: 'Spellbook',
    description: 'Describe your event and Spellbook generates budget lines, tasks, and calendar blocks. Choose from 6 cost variants: lean to aggressive margin. Every line auto-links to tasks and focus blocks.',
    icon: 'palette',
  },
  {
    title: 'HQ Ledger',
    description: 'Import bank CSVs. Auto-categorize transactions. Allocate spend to budget lines across projects. Detect recurring costs. Track variance and margin in real time.',
    icon: 'budget',
  },
  {
    title: 'Real-time Collaboration',
    description: 'Built on Yjs CRDT for conflict-free real-time editing across slides, budgets, and tasks. Offline support via IndexedDB ensures notes and drafts are never lost.',
    icon: 'users',
  },
  {
    title: 'Export & Delivery',
    description: 'PDF decks with correct styling. CSV budgets for accounting. ICS calendar feeds for external sync. ZIP file bundles for bulk delivery via CDN.',
    icon: 'download',
  },
];

export const productBenefits = [
  {
    feature: 'Spellbook',
    benefit: 'Go from a one-line description to a fully scheduled, budgeted, task-assigned production plan in under a minute — 6 cost variants from lean to aggressive margin.',
  },
  {
    feature: 'Magic Layout Slides',
    benefit: 'Produce on-brand, client-ready decks in minutes with auto layouts you can generate, shuffle, and remix on the fly.',
  },
  {
    feature: 'Real-time Collaboration',
    benefit: 'Google Slides-style co-editing — multiple people editing the same deck live, with no conflicts or stale versions.',
  },
  {
    feature: 'Deck Versioning',
    benefit: 'Eliminate "final_final_v3" — controlled drafts, approvals, and client-visible defaults.',
  },
  {
    feature: 'HQ Financial Ledger',
    benefit: 'Close the loop: see actual bank spend vs budgeted cost in real time — budget → invoice → bank import → reconcile → variance visible.',
  },
  {
    feature: 'Task Review Workflow',
    benefit: 'Clear accountability — submit, approve/revise, done; no ambiguous task status.',
  },
  {
    feature: 'Focus Blocks',
    benefit: 'Schedule work in real chunks — group tasks into calendar blocks so you don\'t overbook.',
  },
  {
    feature: 'Global Search',
    benefit: 'Find anything instantly across projects and messages — no digging through folders.',
  },
  {
    feature: 'Smart Notifications',
    benefit: 'Stay informed without the noise — deduped, batched alerts with no phantom pings.',
  },
  {
    feature: 'PDF Export',
    benefit: 'Client-ready, high-fidelity PDFs in one click.',
  },
];

export const faqItems = [
  {
    question: 'Is collaboration real-time?',
    answer: 'Yes. Memry uses Yjs CRDT over WebSocket for conflict-free simultaneous editing on slides.',
  },
  {
    question: 'How does file security work?',
    answer: 'All files served via CloudFront CDN. Secure assets use signed URLs with expiration. Soft delete with 30-day retention before permanent removal.',
  },
  {
    question: 'Can clients view decks?',
    answer: 'Yes. Deck versioning supports `isClientDefault` — clients see only the version you approve for them. Role-based access controls what each user sees.',
  },
  {
    question: 'What export formats are available?',
    answer: 'PDF (slide decks, invoices), CSV (HQ transactions, budgets), ICS (calendar), ZIP (bulk file download).',
  },
  {
    question: 'Is there a mobile experience?',
    answer: 'Memry is a PWA with service worker caching. Mobile users get a read-only slide viewer and adapted task/budget views. Full editing is desktop-optimized.',
  },
  {
    question: 'How is authentication handled?',
    answer: 'AWS Cognito with JWT tokens. WebSocket auth uses the `Sec-WebSocket-Protocol` header — never query strings.',
  },
  {
    question: 'Is there an API?',
    answer: 'V1 is internal API only. A public API is on the roadmap.',
  },
  {
    question: 'What about offline support?',
    answer: 'Yjs uses IndexedDB for offline persistence. The PWA caches API responses and CDN assets. Full offline editing is limited to slides with cached Yjs docs.',
  },
  {
    question: 'Is pricing available?',
    answer: 'Pricing is not finalized for V1. The platform is designed for per-org billing; Stripe integration is on the 60–90 day roadmap.',
  },
];

export const releaseNotesSection = [
  {
    title: 'Slides & Collaboration',
    features: [
      'Multi-slide deck editor with Lexical rich text engine',
      'Real-time collaboration via Yjs CRDT (per-slide rooms)',
      'Magic Layout engine with scoring/taste modes plus shuffle/regenerate to try new looks fast',
      'Picture Frame nodes (drag-drop images, crop, radius, border)',
      'Deck versioning: draft/approved/archived snapshots',
      'Comments with pin locations, threads, and resolve/reopen',
      'Speaker notes per slide',
      'Presentation mode (full-screen)',
      'Mobile slide viewer (read-only)',
      'PDF export with quality presets',
    ],
  },
  {
    title: 'Budget & Finance',
    features: [
      'Budget headers with revisions',
      'Line items with quantity, cost, markup, final cost',
      'Spellbook: natural-language prompt → auto budget lines + tasks/focus blocks + invoice draft in under 60s',
      'Live multi-user budget editing (presence, lockstep updates)',
      'Invoice preview and PDF generation',
      'Budget-to-task linking',
      'HQ Financial Ledger: accounts, CSV import, auto-categorization',
      'Recurring transaction detection and rules',
      'Budget-to-transaction allocation',
      'Financial reports and export (CSV, bundle)',
    ],
  },
  {
    title: 'Tasks & Calendar',
    features: [
      'Task CRUD with bulk create/patch',
      'Review workflow: submit → review → approve/request changes → done',
      'Focus blocks (grouped child tasks)',
      'Project calendar with events and time blocks',
      'ICS calendar feed export',
      'Global task map and drawer',
    ],
  },
  {
    title: 'Messaging & Notifications',
    features: [
      'DMs with canonical conversation IDs',
      'Project threads',
      'Reactions, edits, file attachments',
      'Smart notifications with deduplication and batching',
      'Global notification drawer',
    ],
  },
  {
    title: 'Files & Storage',
    features: [
      'CDN-first delivery via CloudFront',
      'File lifecycle: upload → active → soft delete → hard delete (30d TTL)',
      'Reference tracking across slides, tasks, budget items',
      'Inline rename, batch operations',
      'ZIP download',
    ],
  },
  {
    title: 'Platform',
    features: [
      'AWS Cognito authentication with JWT',
      'Role-based access: admin, designer, builder, vendor, client',
      'Organization multi-tenancy',
      'WebSocket real-time events',
      'PWA with service worker caching',
      'Global search across projects and messages',
    ],
  },
];
