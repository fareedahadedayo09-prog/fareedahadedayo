/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TOOL STACK
 * ──────────────────────────────────────────────────────────────────────────
 *  Audited and rewritten. Four categories, and every entry is a tool used in
 *  a project on this site. Nothing is listed that has not been used.
 *
 *  There are no proficiency levels, no percentages and no skill bars. The
 *  description says what the tool is used for, which is what a visitor
 *  actually needs to know.
 *
 *  If a future project introduces a tool, add it under the matching category.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Tool = {
  name: string
  description: string
}

export type ToolCategory = {
  title: string
  purpose: string
  tools: Tool[]
}

export const toolStack: ToolCategory[] = [
  {
    title: 'Workflow Automation',
    purpose: 'The platform used to build, orchestrate and debug workflows.',
    tools: [
      {
        name: 'n8n',
        description:
          'The workflow engine behind every project on this site. Nodes handle the connections between systems, expressions and code nodes carry the decision logic, and the workflow canvas itself is the documentation.',
      },
    ],
  },
  {
    title: 'AI and Data Processing',
    purpose: 'Model capability, applied only where a deterministic rule cannot do the job.',
    tools: [
      {
        name: 'Claude API',
        description:
          'Used for text classification, field extraction and rewriting. Deployed behind a rule check rather than trusted directly, so its output is validated before it reaches a customer.',
      },
      {
        name: 'OpenAI API',
        description:
          'The alternative provider, compared against Claude on the same task before either is relied on. Selection is made from measured quality, not preference.',
      },
    ],
  },
  {
    title: 'Data Storage and Business Systems',
    purpose: 'Where the structured records, statuses and audit trail live.',
    tools: [
      {
        name: 'Airtable',
        description:
          'The system of record across the projects: order records, lead records, return requests and their outcomes. Also used as the review queue where a case needs a person.',
      },
    ],
  },
  {
    title: 'Integrations and Communication',
    purpose: 'The intake and delivery surfaces the workflows connect to.',
    tools: [
      {
        name: 'Tally',
        description:
          'The form intake for orders, returns and leads. Webhooks trigger the workflow on submission.',
      },
      {
        name: 'Gmail',
        description:
          'The delivery channel for customer-facing confirmation and cancellation messages, and the inbox where replies are read.',
      },
    ],
  },
]

/** Everything shown on the site, for reference. */
export const allToolNames = toolStack.flatMap((c) => c.tools.map((t) => t.name))
