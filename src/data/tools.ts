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
    title: 'Used in featured projects',
    purpose: 'Shown in the three featured workflow builds. Case studies distinguish demonstrated paths from untested branches; not all three builds are complete.',
    tools: [
      { name: 'n8n' }, { name: 'Airtable' }, { name: 'Tally' },
      { name: 'Gmail integration' }, { name: 'Claude API' },
      { name: 'Google Gemini API' }, { name: 'Webhooks' },
      { name: 'Form-triggered workflows' }, { name: 'Conditional routing' },
      { name: 'Prompt design' }, { name: 'Structured AI outputs' },
      { name: 'LLM-powered classification' },
    ],
  },
  {
    title: 'Additional hands-on familiarity',
    purpose: 'Previously listed hands-on tools, not demonstrated in the featured workflow evidence. This is not a claim of production proficiency.',
    tools: [
      { name: 'Make' }, { name: 'Zapier' }, { name: 'OpenAI API' },
      { name: 'Botpress' }, { name: 'Airtable Interfaces' },
      { name: 'Google Sheets' }, { name: 'Supabase' }, { name: 'PostgreSQL' },
      { name: 'REST APIs' }, { name: 'WhatsApp Cloud API' },
      { name: 'Google Calendar' }, { name: 'Shopify' },
      { name: 'React' }, { name: 'Vercel' }, { name: 'Workflow testing and debugging' },
    ],
  },
]

/** Everything shown in the technical skills section, for reference. */
export const allToolNames = toolStack.flatMap((category) => category.tools.map((tool) => tool.name))
