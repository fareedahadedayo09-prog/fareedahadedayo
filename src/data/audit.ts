/**
 * ──────────────────────────────────────────────────────────────────────────
 *  OPERATIONS AUDIT
 * ──────────────────────────────────────────────────────────────────────────
 *  The review run before proposing automation, with each step's deliverable.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type AuditStep = {
  n: number
  title: string
  description: string
  output: string
}

export const auditProcess: AuditStep[] = [
  {
    n: 1,
    title: 'Understand the operation',
    description:
      'Map the current process, the stakeholders, the information flow and the constraints already in place. The map is built from observation and interview, then corrected by the people who do the work.',
    output: 'A current-state process map with handoffs and wait points marked.',
  },
  {
    n: 2,
    title: 'Diagnose the problem',
    description:
      'Identify bottlenecks, repetitive work, manual handoffs, data problems and operational risks. Each is a candidate for investigation, not a conclusion.',
    output: 'A prioritised list of friction points with where each occurs.',
  },
  {
    n: 3,
    title: 'Evaluate the intervention',
    description:
      'Establish a baseline from available business information, then decide whether automation is appropriate at all. State what success looks like, name the risks and exceptions, and identify where a person should stay in the loop.',
    output: 'A baseline figure set, a decision on whether to automate, and the reasoning behind it.',
  },
  {
    n: 4,
    title: 'Design and implement',
    description:
      'Recommend a workflow with explicit rules, an escalation policy and restricted permissions. Estimate the financial impact using assumptions the business can challenge, and keep cost reduction separate from revenue impact and risk reduction.',
    output: 'A recommended architecture, an escalation policy and an assumption-led impact model.',
  },
  {
    n: 5,
    title: 'Validate the outcome',
    description:
      'Define success metrics and a testing plan before building, then run the workflow against normal and failure scenarios and report honestly what was verified and what was not.',
    output: 'Success metrics, a test scenario list and an acceptance criterion for each.',
  },
]
