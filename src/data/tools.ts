/** Technical tools and workflow skills Fareedah says she can use. */
export type Tool = {
  name: string
}

export type ToolCategory = {
  title: string
  purpose: string
  tools: Tool[]
}

export const toolStack: ToolCategory[] = [
  {
    title: 'Workflow Automation',
    purpose: 'Platforms for building and connecting multi-step workflows.',
    tools: [
      { name: 'n8n' },
      { name: 'Make' },
      { name: 'Zapier' },
    ],
  },
  {
    title: 'AI & LLM Integration',
    purpose: 'Model integrations and practical LLM workflow skills.',
    tools: [
      { name: 'Claude API' },
      { name: 'Google Gemini API' },
      { name: 'OpenAI API' },
      { name: 'Botpress' },
      { name: 'LLM-powered classification' },
      { name: 'Prompt design' },
      { name: 'Structured AI outputs' },
    ],
  },
  {
    title: 'Data & Databases',
    purpose: 'Structured records, data stores and interfaces.',
    tools: [
      { name: 'Airtable' },
      { name: 'Airtable Interfaces' },
      { name: 'Google Sheets' },
      { name: 'Supabase' },
      { name: 'PostgreSQL' },
    ],
  },
  {
    title: 'APIs & Integrations',
    purpose: 'Connecting services, forms and communication channels.',
    tools: [
      { name: 'REST APIs' },
      { name: 'Webhooks' },
      { name: 'Gmail integration' },
      { name: 'Form-triggered workflows' },
      { name: 'Conditional routing' },
      { name: 'WhatsApp Cloud API' },
      { name: 'Google Calendar' },
      { name: 'Shopify' },
      { name: 'Tally' },
    ],
  },
  {
    title: 'Development & Deployment',
    purpose: 'Building, deploying, testing and troubleshooting web and workflow systems.',
    tools: [
      { name: 'React' },
      { name: 'Vercel' },
      { name: 'Workflow testing and debugging' },
    ],
  },
]

/** Everything shown in the technical skills section, for reference. */
export const allToolNames = toolStack.flatMap((category) => category.tools.map((tool) => tool.name))
