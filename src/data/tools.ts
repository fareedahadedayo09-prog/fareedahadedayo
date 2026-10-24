/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TOOL STACK
 * ──────────────────────────────────────────────────────────────────────────
 *  HOW TO READ THIS FILE
 *   Every tool carries an `experience` value. It is the single source of truth
 *   for how the site describes your relationship with that tool.
 *
 *     "primary"   : my main tool for this job, used across projects.
 *     "used"      : I have worked with it on a specific project or task.
 *     "learning"  : I know what it does and have started working with it.
 *     "planned"   : part of a design, not yet used in a build.
 *
 *   If a tool is not in this file, it is not described anywhere on the site.
 *   Adding one is a one-line change here.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Experience = 'primary' | 'used' | 'learning' | 'planned'

export type CoreTool = {
  name: string
  category: string
  description: string
  experience: Experience
}

export type SupportingTool = {
  name: string
  category: string
  note: string
}

export type OpsTool = {
  name: string
  category: string
  description: string
  experience: Experience
}

export const experienceLabel: Record<Experience, string> = {
  primary: 'Primary tool',
  used: 'Used in projects',
  learning: 'Learning',
  planned: 'Planned, not yet used',
}

/**
 * A. Core tools and implementation stack: featured prominently.
 */
export const coreTools: CoreTool[] = [
  {
    name: 'n8n',
    category: 'Automation',
    description:
      'Orchestrates workflows. Nodes handle the plumbing, expressions and code nodes handle the logic, and the workflow itself is the documentation.',
    experience: 'primary',
  },
  {
    name: 'Claude API',
    category: 'AI models and APIs',
    description:
      'Provides model capability for text classification, extraction and rewriting. Used only where a deterministic rule cannot do the job.',
    experience: 'used',
  },
  {
    name: 'OpenAI API',
    category: 'AI models and APIs',
    description:
      'Alternative model provider, compared against Claude on the same task before either is relied on.',
    experience: 'used',
  },
  {
    name: 'WhatsApp Cloud API (Meta)',
    category: 'Messaging and customer engagement',
    description:
      'Sends and receives customer messages. Two-way, so a customer can reply to a confirmation or a cancellation.',
    experience: 'learning',
  },
  {
    name: 'ManyChat',
    category: 'Messaging and customer engagement',
    description:
      'Handles Instagram DM automation and comment-triggered conversations for customer engagement.',
    experience: 'learning',
  },
  {
    name: 'Airtable',
    category: 'Data and knowledge systems',
    description:
      'Stores structured records and doubles as the review queue. Fast to shape and easy to reason about.',
    experience: 'primary',
  },
  {
    name: 'Supabase',
    category: 'Data and knowledge systems',
    description:
      'Postgres-backed backend with authentication, used when a project needs relations, permissions or a queryable API.',
    experience: 'learning',
  },
  {
    name: 'pgvector',
    category: 'Data and knowledge systems',
    description:
      'Vector search on Postgres. Powers retrieval-augmented generation by keeping embeddings next to the records they describe.',
    experience: 'planned',
  },
  {
    name: 'Airtable Interfaces',
    category: 'Dashboards and reporting',
    description:
      'Exposes operational data as a readable interface for a non-technical owner without building anything custom.',
    experience: 'used',
  },
  {
    name: 'Looker Studio',
    category: 'Dashboards and reporting',
    description:
      'Pulls together metrics from connected sources into a reporting view for ongoing monitoring.',
    experience: 'learning',
  },
  {
    name: 'Miro',
    category: 'Process discovery and mapping',
    description:
      'Captures a process as it is actually done, before any automation is proposed. The map is the evidence, not the memory.',
    experience: 'primary',
  },
]

/**
 * B. Supporting tools: compact, secondary, must not overpower the core stack.
 */
export const supportingTools: SupportingTool[] = [
  { name: 'Make', category: 'Automation', note: 'Alternative visual automation platform.' },
  { name: 'Zapier', category: 'Automation', note: 'Broad integration library.' },
  { name: 'Apify', category: 'Automation', note: 'Web scraping and actor runtime.' },
  { name: 'Google Gemini API', category: 'AI models and APIs', note: 'Another model provider to compare.' },
  { name: 'Groq', category: 'AI models and APIs', note: 'Low-latency inference.' },
  { name: 'OpenRouter', category: 'AI models and APIs', note: 'Unified access to multiple models.' },
  { name: 'Google Sheets', category: 'Databases and knowledge management', note: 'Lightweight tabular records.' },
  { name: 'Notion', category: 'Databases and knowledge management', note: 'Notes, docs and simple databases.' },
  { name: 'Redis', category: 'Databases and knowledge management', note: 'Caching and queues.' },
  { name: 'Postgres', category: 'Databases and knowledge management', note: 'Relational database.' },
  { name: 'Gmail', category: 'Messaging and communication', note: 'Transactional and customer messages.' },
  { name: 'Termii', category: 'Messaging and communication', note: 'SMS delivery for Nigeria.' },
  { name: 'Tally', category: 'Forms and scheduling', note: 'Typeform-grade forms with webhooks.' },
  { name: 'Cal.com', category: 'Forms and scheduling', note: 'Self-hostable booking calendar.' },
  { name: 'Calendly', category: 'Forms and scheduling', note: 'Hosted booking calendar.' },
  { name: 'Paystack', category: 'Payments', note: 'Payments for Nigeria.' },
  { name: 'Flutterwave', category: 'Payments', note: 'Payments across African markets.' },
  { name: 'Loom', category: 'Documentation and media', note: 'Asynchronous demonstration recordings.' },
  { name: 'Canva', category: 'Documentation and media', note: 'Document and asset design.' },
  { name: 'Google Drive', category: 'Documentation and media', note: 'Document storage and sharing.' },
  { name: 'Google Workspace', category: 'Documentation and media', note: 'Docs, Sheets and professional email.' },
]

/**
 * C. Infrastructure, reliability and operations.
 * These are design capabilities and implementation options, not a claim of
 * continuous monitoring or production-grade reliability.
 */
export const opsTools: OpsTool[] = [
  {
    name: 'Railway',
    category: 'Workflow hosting',
    description:
      'Hosts self-hosted services and webhook receivers. A single place to restart and inspect a running service.',
    experience: 'learning',
  },
  {
    name: 'Render',
    category: 'Workflow hosting',
    description:
      'Alternative hosting for background services and scheduled jobs.',
    experience: 'learning',
  },
  {
    name: 'Vercel',
    category: 'Portfolio hosting',
    description:
      'Hosts this site. Free tier covers the build and the traffic a portfolio receives.',
    experience: 'primary',
  },
  {
    name: 'Netlify',
    category: 'Portfolio hosting',
    description:
      'Alternative static hosting with the same free-tier economics.',
    experience: 'used',
  },
  {
    name: 'Framer',
    category: 'Website builders',
    description: 'Rapid prototyping for marketing pages and product sites.',
    experience: 'used',
  },
  {
    name: 'Webflow',
    category: 'Website builders',
    description: 'Visual build for responsive marketing sites.',
    experience: 'learning',
  },
  {
    name: 'UptimeRobot',
    category: 'Monitoring',
    description:
      'External checks that a public endpoint is still answering. Catches the failure a workflow cannot see about itself.',
    experience: 'planned',
  },
  {
    name: 'n8n execution logs',
    category: 'Monitoring',
    description:
      'Every run is recorded with its input, output and error. The log is the first place to look when behaviour changes.',
    experience: 'used',
  },
  {
    name: 'Telegram / Slack failure alerts',
    category: 'Failure alerts',
    description:
      'A message when a workflow fails, so a broken automation is visible within minutes rather than at the next order.',
    experience: 'planned',
  },
  {
    name: 'Human handoff via WhatsApp, Telegram or email',
    category: 'Human handoff',
    description:
      'Escalation of complex, sensitive or upset-customer cases to a person. The automation hands over; it does not decide.',
    experience: 'planned',
  },
]

/** Group helpers used by the UI. */
export function groupBy<T extends { category: string }>(items: T[]): { category: string; items: T[] }[] {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const list = map.get(item.category)
    if (list) list.push(item)
    else map.set(item.category, [item])
  }
  return [...map.entries()].map(([category, items]) => ({ category, items }))
}

/** Shape of the supporting-tools data, grouped for the compact UI. */
export const supportingGroups = groupBy(supportingTools)
export const coreGroups = groupBy(coreTools)
export const opsGroups = groupBy(opsTools)
