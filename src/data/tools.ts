/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TOOL ECOSYSTEM
 * ──────────────────────────────────────────────────────────────────────────
 *  Organised into 7 practical categories. Experience levels are honest:
 *    - "projects"  : used hands-on in a project shown on this site.
 *    - "hands-on"  : built with end-to-end but not yet the centrepiece of a
 *                    completed project here (studied, experimented, small
 *                    builds, comparison work).
 *    - "learning"  : currently learning / evaluated but not yet used in a
 *                    completed build.
 *
 *  No tool is listed that I have not at minimum set up, configured or
 *  evaluated. The description says what I actually use the tool for.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ToolExperience = 'projects' | 'hands-on' | 'learning'

export type Tool = {
  id: string
  name: string
  /** Short initial letter used for the icon tile (no external logo dependencies). */
  monogram: string
  category: ToolCategoryId
  experience: ToolExperience
  description: string
  /** What I practically use it for — written for a mixed business/technical reader. */
  usedFor: string
  /** Slugs of projects that use this tool (links to case studies). */
  projectRefs: string[]
  /** Other tools this one typically integrates with in my builds. */
  integrations: string[]
}

export type ToolCategoryId =
  | 'workflow'
  | 'ecommerce'
  | 'ai'
  | 'data'
  | 'comms'
  | 'dev'
  | 'analytics'

export type ToolCategory = {
  id: ToolCategoryId
  title: string
  purpose: string
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'workflow',
    title: 'Workflow Automation',
    purpose:
      'Platforms for building, orchestrating and debugging automated workflows, triggers and actions.',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Customer Lifecycle',
    purpose:
      'Storefronts, lifecycle marketing and messaging surfaces where customers interact with the business.',
  },
  {
    id: 'ai',
    title: 'AI & Conversational Systems',
    purpose:
      'Large language model APIs and conversational platforms, used only where a deterministic rule cannot do the job and always behind a validation step.',
  },
  {
    id: 'data',
    title: 'Databases & Data Management',
    purpose:
      'Where structured records, statuses, vectors and audit trails live.',
  },
  {
    id: 'comms',
    title: 'Communication & Productivity',
    purpose:
      'Intake, delivery and workplace tools the workflows connect to.',
  },
  {
    id: 'dev',
    title: 'Development & Integrations',
    purpose:
      'Frontend build tools and the integration primitives that glue everything together.',
  },
  {
    id: 'analytics',
    title: 'Analytics & Process Design',
    purpose:
      'Tools for mapping current-state processes and visualising operational data.',
  },
]

export const EXPERIENCE_META: Record<ToolExperience, { label: string; tone: string }> = {
  projects: { label: 'Used in projects on this site', tone: 'done' },
  'hands-on': { label: 'Hands-on familiarity', tone: 'progress' },
  learning: { label: 'Currently learning / evaluated', tone: 'planned' },
}

export const tools: Tool[] = [
  // ──────────────────── Workflow Automation ────────────────────
  {
    id: 'n8n',
    name: 'n8n',
    monogram: 'n8',
    category: 'workflow',
    experience: 'projects',
    description: 'Primary workflow engine — self-hosted or cloud.',
    usedFor:
      'Webhook triggers, HTTP nodes, expressions, and code nodes handle decision logic across every project on this site. The canvas doubles as living workflow documentation.',
    projectRefs: [
      'order-confirmation-risk-check',
      'returns-refunds-handler',
      'lead-qualification',
      'glowlab-lifecycle',
    ],
    integrations: ['Tally', 'Airtable', 'Gmail', 'OpenAI API', 'Claude API', 'REST APIs'],
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    monogram: 'Mk',
    category: 'workflow',
    experience: 'hands-on',
    description: 'Visual automation platform, evaluated against n8n.',
    usedFor:
      'Studied for comparison on routers, iterators and built-in error handling. Used for small experimental scenarios; not yet the primary engine in a build on this site.',
    projectRefs: [],
    integrations: ['Shopify', 'Google Sheets', 'Gmail', 'Airtable'],
  },
  {
    id: 'zapier',
    name: 'Zapier',
    monogram: 'Zp',
    category: 'workflow',
    experience: 'learning',
    description: 'No-code automation connector for SaaS tools.',
    usedFor:
      'Evaluated for simple one-to-one zaps between common SaaS tools; I reach for n8n or Make when a workflow needs explicit branching, validation or code steps.',
    projectRefs: [],
    integrations: ['Gmail', 'Google Sheets', 'Tally', 'Slack'],
  },

  // ──────────────── E-commerce & Lifecycle ────────────────
  {
    id: 'shopify',
    name: 'Shopify',
    monogram: 'Sh',
    category: 'ecommerce',
    experience: 'hands-on',
    description: 'E-commerce storefront platform.',
    usedFor:
      'Studied webhook payloads, the Admin API and customer/order events for lifecycle-automation design (the GlowLab prototype simulates events via Tally; a live Shopify integration is the next step).',
    projectRefs: ['glowlab-lifecycle'],
    integrations: ['n8n', 'Klaviyo', 'webhooks'],
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo',
    monogram: 'Kl',
    category: 'ecommerce',
    experience: 'learning',
    description: 'Email & SMS platform for e-commerce lifecycle marketing.',
    usedFor:
      'Studied list/segment APIs, flow triggers and event modelling for lifecycle designs; not yet wired into a build on this site.',
    projectRefs: [],
    integrations: ['Shopify', 'n8n'],
  },
  {
    id: 'manychat',
    name: 'ManyChat',
    monogram: 'Mc',
    category: 'ecommerce',
    experience: 'learning',
    description: 'Messaging automation for Instagram / Facebook / WhatsApp.',
    usedFor:
      'Evaluated as a front-door for Instagram-DM lead capture, with n8n receiving structured data via webhook. Account set up and flows diagrammed; not yet deployed.',
    projectRefs: [],
    integrations: ['WhatsApp Cloud API', 'n8n', 'Google Sheets'],
  },
  {
    id: 'whatsapp-cloud-api',
    name: 'WhatsApp Cloud API',
    monogram: 'Wa',
    category: 'ecommerce',
    experience: 'learning',
    description: 'Meta\u2019s official WhatsApp Business API.',
    usedFor:
      'Explored template-message flows, webhook inbound notifications and session-message windows for order-confirmation design. No live deployment yet.',
    projectRefs: [],
    integrations: ['n8n', 'Make'],
  },

  // ────────────────── AI & Conversational ──────────────────
  {
    id: 'openai-api',
    name: 'OpenAI API',
    monogram: 'OA',
    category: 'ai',
    experience: 'hands-on',
    description: 'GPT-family model API.',
    usedFor:
      'Evaluated alongside Claude on the same text-classification/extraction tasks in lead-qualification experiments. Output is validated against a schema before downstream use; never trusted verbatim for customer-facing decisions.',
    projectRefs: ['lead-qualification'],
    integrations: ['n8n', 'Airtable'],
  },
  {
    id: 'claude-api',
    name: 'Claude API (Anthropic)',
    monogram: 'Cl',
    category: 'ai',
    experience: 'projects',
    description: 'Anthropic language model API.',
    usedFor:
      'Text classification and free-text field extraction in lead-qualification builds. Always behind a rule check so model output does not reach customers unvalidated.',
    projectRefs: ['lead-qualification'],
    integrations: ['n8n', 'Airtable'],
  },
  {
    id: 'gemini-api',
    name: 'Google Gemini API',
    monogram: 'Ge',
    category: 'ai',
    experience: 'learning',
    description: 'Google\u2019s multimodal model API.',
    usedFor:
      'Set up an API key and compared classification output against Claude/OpenAI on my lead-qualification test set for future selection based on measured quality.',
    projectRefs: [],
    integrations: ['n8n', 'Google Workspace'],
  },
  {
    id: 'botpress',
    name: 'Botpress',
    monogram: 'Bp',
    category: 'ai',
    experience: 'learning',
    description: 'Conversational AI chatbot platform.',
    usedFor:
      'Evaluated for customer-support flows that need a visible conversation studio; currently at the flow-mapping / account-setup stage. No deployed bot yet.',
    projectRefs: [],
    integrations: ['WhatsApp Cloud API', 'n8n'],
  },

  // ──────────────── Databases & Data Management ────────────────
  {
    id: 'airtable',
    name: 'Airtable',
    monogram: 'Ai',
    category: 'data',
    experience: 'projects',
    description: 'Spreadsheet-database hybrid with a rich API.',
    usedFor:
      'System of record across every project: order records, lead records, return requests, lifecycle message queues, and human-review queues. Schemas are designed so every status change writes a timestamp and a reason.',
    projectRefs: [
      'order-confirmation-risk-check',
      'returns-refunds-handler',
      'lead-qualification',
      'glowlab-lifecycle',
    ],
    integrations: ['n8n', 'Tally', 'Gmail'],
  },
  {
    id: 'supabase',
    name: 'Supabase',
    monogram: 'Sb',
    category: 'data',
    experience: 'hands-on',
    description: 'Open-source Postgres backend with auth and edge functions.',
    usedFor:
      'Set up projects and experimented with row-level security, tables, and edge functions for form handling and lightweight backends (used for the contact endpoint on this site).',
    projectRefs: [],
    integrations: ['React', 'REST APIs', 'webhooks'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    monogram: 'Pg',
    category: 'data',
    experience: 'learning',
    description: 'Relational database.',
    usedFor:
      'Familiar with schema design, joins and basic SQL; learning deeper querying and use as an Airtable replacement for higher-volume workloads.',
    projectRefs: [],
    integrations: ['Supabase', 'n8n'],
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    monogram: 'GS',
    category: 'data',
    experience: 'hands-on',
    description: 'Spreadsheet tool used for lightweight record-keeping.',
    usedFor:
      'Baseline calculations during audits, manual review lists and small-business client scenarios where a team already lives in Sheets.',
    projectRefs: [],
    integrations: ['n8n', 'Make', 'Tally', 'Google Workspace'],
  },
  {
    id: 'pgvector',
    name: 'pgvector',
    monogram: 'pv',
    category: 'data',
    experience: 'learning',
    description: 'PostgreSQL extension for vector similarity search.',
    usedFor:
      'Set up and experimented with for embedding-based FAQ retrieval as a future grounding mechanism; not yet used in a project on this site.',
    projectRefs: [],
    integrations: ['PostgreSQL', 'Supabase', 'OpenAI API'],
  },

  // ──────────────── Communication & Productivity ────────────────
  {
    id: 'gmail',
    name: 'Gmail',
    monogram: 'Gm',
    category: 'comms',
    experience: 'projects',
    description: 'Google\u2019s email service.',
    usedFor:
      'Customer-facing delivery channel for confirmation, cancellation and lifecycle messages in prototype builds.',
    projectRefs: ['order-confirmation-risk-check', 'glowlab-lifecycle'],
    integrations: ['n8n', 'Airtable'],
  },
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    monogram: 'GW',
    category: 'comms',
    experience: 'hands-on',
    description: 'Docs, Drive, Sheets, Calendar and Forms.',
    usedFor:
      'Audit reports, baseline calculations, and shared documentation during engagements.',
    projectRefs: [],
    integrations: ['Gmail', 'Google Calendar', 'Google Sheets', 'n8n'],
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    monogram: 'GC',
    category: 'comms',
    experience: 'learning',
    description: 'Calendar and scheduling service.',
    usedFor:
      'Evaluated for automated booking-link flows and follow-up scheduling; no live scheduling integration yet.',
    projectRefs: [],
    integrations: ['Google Workspace', 'n8n'],
  },
  {
    id: 'zoho',
    name: 'Zoho',
    monogram: 'Zo',
    category: 'comms',
    experience: 'learning',
    description: 'CRM and business operations suite.',
    usedFor:
      'Familiarising with Zoho CRM/Desk APIs because several small businesses I talk to run on Zoho; no build yet.',
    projectRefs: [],
    integrations: ['n8n', 'Gmail'],
  },
  {
    id: 'tally',
    name: 'Tally',
    monogram: 'Ta',
    category: 'comms',
    experience: 'projects',
    description: 'Simple form builder with webhooks.',
    usedFor:
      'Form intake across every project on this site (orders, returns, leads, simulated lifecycle events). Webhooks trigger workflows immediately on submission.',
    projectRefs: [
      'order-confirmation-risk-check',
      'returns-refunds-handler',
      'lead-qualification',
      'glowlab-lifecycle',
    ],
    integrations: ['n8n', 'Airtable', 'Make', 'Google Sheets'],
  },

  // ──────────────── Development & Integrations ────────────────
  {
    id: 'rest-apis',
    name: 'REST APIs',
    monogram: 'RA',
    category: 'dev',
    experience: 'projects',
    description: 'HTTP-based integration primitives.',
    usedFor:
      'HTTP nodes in n8n where built-in nodes don\u2019t expose enough control — filtered queries, batch updates and conditional writes.',
    projectRefs: [
      'order-confirmation-risk-check',
      'returns-refunds-handler',
      'lead-qualification',
    ],
    integrations: ['n8n', 'Airtable', 'Gmail', 'Supabase'],
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    monogram: 'Wb',
    category: 'dev',
    experience: 'projects',
    description: 'HTTP callbacks that trigger workflows on events.',
    usedFor:
      'The default entry point for every workflow on this site — Tally submits to a webhook; simulated lifecycle events post to webhooks.',
    projectRefs: [
      'order-confirmation-risk-check',
      'returns-refunds-handler',
      'lead-qualification',
      'glowlab-lifecycle',
    ],
    integrations: ['n8n', 'Tally', 'Shopify'],
  },
  {
    id: 'react',
    name: 'React',
    monogram: 'Re',
    category: 'dev',
    experience: 'projects',
    description: 'UI library for interactive web applications.',
    usedFor:
      'This portfolio itself — project library, case studies, simulators, calculators and dynamic components.',
    projectRefs: [],
    integrations: ['TypeScript', 'Vite', 'Vercel'],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    monogram: 'Vc',
    category: 'dev',
    experience: 'projects',
    description: 'Hosting and serverless platform for frontend sites.',
    usedFor: 'Hosting this portfolio and its serverless functions.',
    projectRefs: [],
    integrations: ['React', 'Vite', 'GitHub'],
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    monogram: 'JS',
    category: 'dev',
    experience: 'projects',
    description: 'Programming language of the web.',
    usedFor:
      'Data-transformation and validation code inside n8n function nodes, and everything in this site.',
    projectRefs: [
      'order-confirmation-risk-check',
      'returns-refunds-handler',
      'lead-qualification',
    ],
    integrations: ['n8n', 'React', 'REST APIs'],
  },

  // ──────────────── Analytics & Process Design ────────────────
  {
    id: 'looker-studio',
    name: 'Looker Studio',
    monogram: 'LS',
    category: 'analytics',
    experience: 'learning',
    description: 'Google\u2019s free reporting and dashboarding tool.',
    usedFor:
      'Evaluated for client-facing operational dashboards over Airtable/Sheets data; no published dashboard yet.',
    projectRefs: [],
    integrations: ['Google Sheets', 'Airtable'],
  },
  {
    id: 'miro',
    name: 'Miro',
    monogram: 'Mi',
    category: 'analytics',
    experience: 'hands-on',
    description: 'Collaborative whiteboarding tool.',
    usedFor:
      'Current-state process mapping and workshops during the audit phase of engagements.',
    projectRefs: [],
    integrations: ['FigJam', 'Notion'],
  },
  {
    id: 'airtable-interfaces',
    name: 'Airtable Interfaces',
    monogram: 'AI',
    category: 'analytics',
    experience: 'hands-on',
    description: 'Custom view layer on top of Airtable bases.',
    usedFor:
      'Building simple review queues and operational dashboards for human-review steps (so the team gets a clean surface instead of a raw grid).',
    projectRefs: ['order-confirmation-risk-check', 'returns-refunds-handler'],
    integrations: ['Airtable'],
  },
]

/** Index helpers. */
export function getTool(id: string): Tool | undefined {
  return tools.find((t) => t.id === id)
}

export function toolsByCategory(id: ToolCategoryId): Tool[] {
  return tools.filter((t) => t.category === id)
}

export const allToolNames = tools.map((t) => t.name)
