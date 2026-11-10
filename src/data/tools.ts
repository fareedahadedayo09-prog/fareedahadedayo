/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TOOLS & TECHNOLOGIES, visual logo grid data
 * ──────────────────────────────────────────────────────────────────────────
 *  Ordered list of groups, each with a set of tools. Logos come from the
 *  official Simple Icons CDN for recognised brands. For concepts with no
 *  single-brand logo (REST APIs, Webhooks, pgvector, Airtable Interfaces)
 *  we render a minimal custom mark defined in ToolCustomMarks.tsx, never
 *  an invented brand logo.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ToolLogo =
  | { kind: 'simple-icons'; slug: string; hex?: string }
  | { kind: 'custom'; id: 'rest-apis' | 'webhooks' | 'pgvector' | 'airtable-interfaces' }

export type ToolEntry = {
  name: string
  logo: ToolLogo
}

export type ToolGroup = {
  title: string
  tools: ToolEntry[]
}

export const toolStack: ToolGroup[] = [
  {
    title: 'Workflow Automation',
    tools: [
      { name: 'n8n', logo: { kind: 'simple-icons', slug: 'n8n', hex: 'EA4B71' } },
      { name: 'Make', logo: { kind: 'simple-icons', slug: 'make', hex: '0D00D0' } },
      { name: 'Zapier', logo: { kind: 'simple-icons', slug: 'zapier', hex: 'FF4A00' } },
    ],
  },
  {
    title: 'E-commerce &amp; Customer Lifecycle',
    tools: [
      { name: 'Shopify', logo: { kind: 'simple-icons', slug: 'shopify', hex: '96BF48' } },
      { name: 'Klaviyo', logo: { kind: 'simple-icons', slug: 'klaviyo', hex: '4A37E8' } },
      { name: 'ManyChat', logo: { kind: 'simple-icons', slug: 'manychat', hex: '0084FF' } },
    ],
  },
  {
    title: 'AI &amp; Conversational Systems',
    tools: [
      { name: 'OpenAI', logo: { kind: 'simple-icons', slug: 'openai', hex: 'FFFFFF' } },
      { name: 'Anthropic', logo: { kind: 'simple-icons', slug: 'anthropic', hex: 'D97757' } },
      { name: 'Google Gemini', logo: { kind: 'simple-icons', slug: 'googlegemini', hex: '8E75B2' } },
      { name: 'Botpress', logo: { kind: 'simple-icons', slug: 'botpress', hex: 'F77026' } },
    ],
  },
  {
    title: 'Databases &amp; Data Management',
    tools: [
      { name: 'Airtable', logo: { kind: 'simple-icons', slug: 'airtable', hex: 'FCB400' } },
      { name: 'Supabase', logo: { kind: 'simple-icons', slug: 'supabase', hex: '3ECF8E' } },
      { name: 'PostgreSQL', logo: { kind: 'simple-icons', slug: 'postgresql', hex: '4169E1' } },
      { name: 'Google Sheets', logo: { kind: 'simple-icons', slug: 'googlesheets', hex: '34A853' } },
      { name: 'pgvector', logo: { kind: 'custom', id: 'pgvector' } },
    ],
  },
  {
    title: 'Communication &amp; Productivity',
    tools: [
      { name: 'Gmail', logo: { kind: 'simple-icons', slug: 'gmail', hex: 'EA4335' } },
      { name: 'Google Workspace', logo: { kind: 'simple-icons', slug: 'googleworkspace', hex: '4285F4' } },
      { name: 'Google Calendar', logo: { kind: 'simple-icons', slug: 'googlecalendar', hex: '4285F4' } },
      { name: 'Zoho', logo: { kind: 'simple-icons', slug: 'zoho', hex: 'E42528' } },
      { name: 'WhatsApp', logo: { kind: 'simple-icons', slug: 'whatsapp', hex: '25D366' } },
    ],
  },
  {
    title: 'Development &amp; Integrations',
    tools: [
      { name: 'REST APIs', logo: { kind: 'custom', id: 'rest-apis' } },
      { name: 'Webhooks', logo: { kind: 'custom', id: 'webhooks' } },
      { name: 'React', logo: { kind: 'simple-icons', slug: 'react', hex: '61DAFB' } },
      { name: 'Vercel', logo: { kind: 'simple-icons', slug: 'vercel', hex: 'FFFFFF' } },
      { name: 'JavaScript', logo: { kind: 'simple-icons', slug: 'javascript', hex: 'F7DF1E' } },
    ],
  },
  {
    title: 'Analytics &amp; Process Design',
    tools: [
      { name: 'Looker Studio', logo: { kind: 'simple-icons', slug: 'looker', hex: '4285F4' } },
      { name: 'Miro', logo: { kind: 'simple-icons', slug: 'miro', hex: 'FFD02F' } },
      { name: 'Airtable Interfaces', logo: { kind: 'custom', id: 'airtable-interfaces' } },
    ],
  },
]

/* Flattened backwards-compatible list for helpers and string matching. */
export type ToolStub = {
  id: string
  name: string
  hex?: string
  simpleIconSlug?: string
}

function flatten(): ToolStub[] {
  const out: ToolStub[] = []
  for (const g of toolStack) {
    for (const t of g.tools) {
      out.push({
        id: t.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: t.name,
        hex: t.logo.kind === 'simple-icons' ? t.logo.hex : undefined,
        simpleIconSlug: t.logo.kind === 'simple-icons' ? t.logo.slug : undefined,
      })
    }
  }
  return out
}

export const tools = flatten()

export const toolCategories = toolStack.map((g, i) => ({
  id: g.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title: g.title,
  order: i,
}))

export default toolStack
