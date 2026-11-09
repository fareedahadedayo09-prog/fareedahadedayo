/**
 * ──────────────────────────────────────────────────────────────────────────
 *  TOOL STACK
 * ──────────────────────────────────────────────────────────────────────────
 *  Organised by practical purpose. Every tool is one I have genuinely used
 *  in a project on this site. Hands-on vs. familiarity is distinguished
 *  through the descriptions themselves. No skill bars, no percentages, no
 *  logo walls.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Tool = {
  name: string
  description: string
  /** 'hands-on' means used in a build on this site; 'familiar' means studied and experimented with but not yet the primary tool in a completed build. */
  experience: 'hands-on' | 'familiar'
}

export type ToolCategory = {
  title: string
  purpose: string
  tools: Tool[]
}

export const toolStack: ToolCategory[] = [
  {
    title: 'Workflow automation',
    purpose: 'Platforms used to build, orchestrate and debug automation workflows.',
    tools: [
      {
        name: 'n8n',
        description:
          'Primary workflow engine. Used across every project on this site: webhook triggers, HTTP nodes, expressions, function/code nodes for decision logic, and the canvas itself as living documentation.',
        experience: 'hands-on',
      },
      {
        name: 'Make (Integromat)',
        description:
          'Studied and experimented with for comparison against n8n, particularly around built-in iterators and error-handling patterns. Not yet the primary engine in a completed build on this site.',
        experience: 'familiar',
      },
    ],
  },
  {
    title: 'E-commerce and customer lifecycle',
    purpose: 'Storefronts, form intake and the surfaces where customers interact with the business.',
    tools: [
      {
        name: 'Tally',
        description:
          'Form intake for orders, returns and leads across all projects. Webhook triggers fire immediately on submission; field names are the intake contract the workflow depends on.',
        experience: 'hands-on',
      },
      {
        name: 'Gmail',
        description:
          'Delivery channel for customer-facing confirmation, cancellation and lifecycle messages in the prototype builds.',
        experience: 'hands-on',
      },
      {
        name: 'Shopify',
        description:
          'Studied webhook payloads and customer/order APIs for lifecycle-automation design; no live store integration yet (the GlowLab prototype simulates events via Tally).',
        experience: 'familiar',
      },
    ],
  },
  {
    title: 'Data storage and management',
    purpose: 'Where structured records, statuses and audit trails live.',
    tools: [
      {
        name: 'Airtable',
        description:
          'System of record across the projects: order records, lead records, return requests, lifecycle message queues and human-review queues. Schema is designed so each status change writes a timestamp and a reason.',
        experience: 'hands-on',
      },
    ],
  },
  {
    title: 'AI and language models',
    purpose: 'Used only where a deterministic rule cannot do the job, and always behind a validation step.',
    tools: [
      {
        name: 'Claude API (Anthropic)',
        description:
          'Used for text classification and field extraction from unstructured messages in lead-qualification experiments. Model output is always validated against a schema before reaching downstream steps; it is never trusted verbatim for decisions that affect a customer.',
        experience: 'hands-on',
      },
      {
        name: 'OpenAI API',
        description:
          'Evaluated alongside Claude on the same extraction tasks to compare reliability on my test inputs. Selection is made from measured outputs, not from preference.',
        experience: 'familiar',
      },
    ],
  },
  {
    title: 'APIs and integrations',
    purpose: 'Connecting the systems above to each other and to the wider toolchain.',
    tools: [
      {
        name: 'Webhooks & HTTP',
        description:
          'The default way systems talk to each other in these builds. Used for Tally → n8n triggers, n8n → Airtable/Gmail writes, and for validating payload shape before any downstream action.',
        experience: 'hands-on',
      },
      {
        name: 'REST APIs (Airtable, Gmail)',
        description:
          'Direct HTTP calls where the built-in node does not expose enough control — particularly for filtered queries, batch updates and conditional writes.',
        experience: 'hands-on',
      },
    ],
  },
  {
    title: 'Frontend and development',
    purpose: 'What this website itself is built with. Not a substitute for automation work; listed for transparency.',
    tools: [
      {
        name: 'React + TypeScript',
        description:
          'This portfolio itself. Used for the project library, case studies, ROI calculator and the interactive workflow simulator.',
        experience: 'hands-on',
      },
      {
        name: 'Vite',
        description: 'Build tool and dev server for this site.',
        experience: 'hands-on',
      },
      {
        name: 'Git & GitHub',
        description: 'Version control for every project including this site.',
        experience: 'hands-on',
      },
    ],
  },
]

export const allToolNames = toolStack.flatMap((c) => c.tools.map((t) => t.name))
