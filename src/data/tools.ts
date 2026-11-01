/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TOOL STACK
 * ──────────────────────────────────────────────────────────────────────────
 *  Two categories, and every entry is described honestly. No proficiency
 *  levels, no percentages and no skill bars. The description says what the
 *  tool is used for, which is what a visitor actually needs to know.
 *
 *  Used in featured projects: tools demonstrably used in the three completed
 *  projects on this site. Additional hands-on familiarity: tools explored
 *  outside those builds, not presented as production experience.
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
    title: 'Used in featured projects',
    purpose: 'Tools demonstrably used in the three completed projects on this site. Each one appears in a live workflow and its output can be traced to a record.',
    tools: [
      {
        name: 'n8n',
        description:
          'The workflow engine behind every completed project on this site. Nodes handle the connections between systems, expressions and code nodes carry the decision logic, and the workflow canvas itself is the documentation.',
      },
      {
        name: 'Airtable',
        description:
          'The system of record across the completed projects: order records, lead records, return requests and their outcomes. Also used as the review queue where a case needs a person.',
      },
      {
        name: 'Tally',
        description:
          'The form intake for orders, returns and leads. Webhooks trigger the workflow on submission.',
      },
      {
        name: 'Gmail',
        description:
          'The delivery channel for customer-facing confirmation and cancellation messages, and the inbox where replies are read. Used in the Order Confirmation and Risk-Check System.',
      },
    ],
  },
  {
    title: 'Additional hands-on familiarity',
    purpose: 'Tools explored outside the featured builds. Hands-on familiarity from practice and testing, not demonstrated in the completed project workflows, and not presented as claimed proficiency.',
    tools: [
      {
        name: 'Claude API',
        description:
          'Explored for text classification, field extraction and rewriting. Hands-on familiarity; not deployed in the featured completed workflows, where deterministic rules are used instead.',
      },
      {
        name: 'OpenAI API',
        description:
          'Explored as an alternative model provider and compared on the same tasks. Hands-on familiarity; not integrated into the completed project workflows shown here.',
      },
    ],
  },
]

/** Everything shown on the site, for reference. */
export const allToolNames = toolStack.flatMap((c) => c.tools.map((t) => t.name))
