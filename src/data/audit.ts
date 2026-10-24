/**
 * ──────────────────────────────────────────────────────────────────────────
 *  OPERATIONS AUDIT AND PRACTICE CASE
 * ──────────────────────────────────────────────────────────────────────────
 *  Two things live here:
 *   1. `auditProcess`: the review run before proposing automation. Same
 *      spine as the site-wide methodology, with the deliverable of each step.
 *   2. `velara`: a fictional practice case used to demonstrate the process.
 *      It is labelled illustrative wherever it appears.
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

export const auditSupportingTools = [
  { name: 'Miro', role: 'Process mapping and current-state workshops.' },
  { name: 'FigJam', role: 'Structured process diagrams and templated maps.' },
  { name: 'Notion', role: 'Audit reports and proposal documents.' },
  { name: 'Google Sheets', role: 'Baseline and impact calculations.' },
]

/* ─────────────────────────── Fictional practice case ─────────────────── */

export type Finding = {
  area: string
  hypothesis: string
  evidenceNeeded: string
}

export type Recommendation = {
  priority: number
  intervention: string
  rationale: string
}

export type NotAutomate = {
  decision: string
  reason: string
}

export type ProcessNode = {
  id: string
  label: string
  shape: 'rounded' | 'diamond'
}

export type Velara = {
  name: string
  tagline: string
  disclaimer: string
  context: string
  assumptions: string[]
  process: {
    title: string
    note: string
    nodes: ProcessNode[]
  }
  findings: Finding[]
  recommendations: Recommendation[]
  notAutomate: NotAutomate[]
  deliverables: string[]
  limitations: string[]
}

export const velara: Velara = {
  name: 'Velara Skin Co.',
  tagline: 'Sample AI Operations Audit',
  disclaimer:
    'Velara Skin Co. is a fictional skincare retailer created to demonstrate the audit process. Every business detail and operational condition below is an illustrative assumption. It is not a real client, not a paid engagement and not evidence of achieved results.',
  context:
    'Velara Skin Co. is a fictional skincare retailer receiving customer enquiries through social messaging channels. Enquiries include product questions, order enquiries and follow-ups. Responses are handled manually during working hours by a small team.',
  assumptions: [
    'Enquiries arrive through two social messaging channels and a website form.',
    'A small team answers enquiries during working hours only.',
    'Volume rises during promotions and product launches.',
    'Product information is maintained in one document, not in the messaging tool.',
    'Order status is checked in a separate system, one enquiry at a time.',
    'Enquiry outcomes are recorded in a spreadsheet, if they are recorded at all.',
  ],
  process: {
    title: 'Hypothetical current-state process',
    note: 'A hypothetical current-state map, not an observed client process. It shows how a map is structured before any evidence has been gathered.',
    nodes: [
      { id: 'a', label: 'Customer enquiry', shape: 'rounded' },
      { id: 'b', label: 'Manual review', shape: 'rounded' },
      { id: 'c', label: 'Question type identified', shape: 'diamond' },
      { id: 'd', label: 'Response or human assistance', shape: 'rounded' },
      { id: 'e', label: 'Outcome recorded', shape: 'rounded' },
      { id: 'f', label: 'Follow-up where appropriate', shape: 'rounded' },
    ],
  },
  findings: [
    {
      area: 'Repeated product questions',
      hypothesis:
        'Product questions repeat across enquiries and channels, which suggests the same answers are being typed more than once.',
      evidenceNeeded:
        'A count of enquiries by question type over a defined period, using the same question taxonomy, before any automation is proposed.',
    },
    {
      area: 'Delays during busy periods',
      hypothesis:
        'Response time rises during promotions and launches, and enquiries wait in the queue outside working hours.',
      evidenceNeeded:
        'Response timestamps matched against enquiry arrival timestamps, split by period and channel, with promotion windows marked.',
    },
    {
      area: 'Manual recording of enquiry details',
      hypothesis:
        'Enquiry details are recorded by hand or not at all, which makes follow-up and reporting depend on memory.',
      evidenceNeeded:
        'A count of enquiries with no recorded outcome, and a sample review of how consistently free-text fields are filled in.',
    },
    {
      area: 'Inconsistent follow-up',
      hypothesis:
        'Follow-up happens when someone remembers, so enquiries with the same characteristics get different treatment.',
      evidenceNeeded:
        'A review of a sample of enquiries measuring how long each waited for follow-up and whether the follow-up rule was applied.',
    },
    {
      area: 'Limited visibility into outcomes',
      hypothesis:
        'There is no single view of enquiry volume, response times and outcomes, so the team cannot see what is changing.',
      evidenceNeeded:
        'Confirmation of what data is currently captured and whether the reporting tool can join enquiries to outcomes.',
    },
  ],
  recommendations: [
    {
      priority: 1,
      intervention: 'A structured enquiry intake process',
      rationale:
        'The cheapest change, and it makes every later step measurable. Without a consistent intake shape, automation built on top of it inherits the inconsistency.',
    },
    {
      priority: 2,
      intervention: 'A product FAQ assistant grounded in approved product information',
      rationale:
        'It addresses the repeated product questions, but only after intake is consistent and there is a single approved source of product information to ground it in.',
    },
    {
      priority: 3,
      intervention: 'Order-status lookup with access controls',
      rationale:
        'It removes repeated manual lookups, but it exposes customer data, so it needs restricted permissions and a defined purpose before it is built.',
    },
    {
      priority: 4,
      intervention: 'Enquiry classification and routing',
      rationale:
        'Routing only works once the classification is reliable, which depends on intake being structured. It is a dependency, not a first move.',
    },
    {
      priority: 5,
      intervention: 'Follow-up reminders',
      rationale:
        'Reminders reduce memory-dependent follow-up, but they should be added after the outcome field exists, otherwise they fire on incomplete data.',
    },
    {
      priority: 6,
      intervention: 'A dashboard showing volume, response times and outcomes',
      rationale:
        'It makes the baseline visible and is what allows the impact of the other changes to be measured rather than asserted.',
    },
    {
      priority: 7,
      intervention: 'Human handoff for uncertain, sensitive or high-risk conversations',
      rationale:
        'Not a last addition. It is defined alongside the automation, because it determines which cases the automation is allowed to decide.',
    },
  ],
  notAutomate: [
    {
      decision: 'Unusual refunds',
      reason:
        'A refund outside standard policy changes a customer relationship and a financial record. A person should decide it and record the reasoning.',
    },
    {
      decision: 'Serious complaints',
      reason:
        'Escalation severity is a judgement call. An automated reply to a serious complaint risks making the situation worse.',
    },
    {
      decision: 'Medical or safety-related skincare questions',
      reason:
        'These require qualified judgement and carry real risk if answered incorrectly. The system should hand over, not answer.',
    },
    {
      decision: 'Disputed payments',
      reason:
        'A payment dispute has contractual and financial consequences that automation should not settle.',
    },
    {
      decision: 'Cases where the system lacks reliable information',
      reason:
        'An answer built on missing or uncertain information looks confident and is wrong. The system should say it does not know and hand over.',
    },
  ],
  deliverables: [
    'A current-state process map with handoffs marked.',
    'An investigation checklist of hypotheses with the evidence needed to confirm or reject each one.',
    'A prioritised list of possible interventions with the reasoning behind the order.',
    'A proposed architecture showing the automation and its escalation paths.',
    'An impact model with every assumption visible and editable.',
  ],
  limitations: [
    'The business, the volumes and the operational conditions are illustrative assumptions, not measured data.',
    'No customer data, real order data or real messaging transcripts were used.',
    'The findings are hypotheses, not confirmed observations. Each requires evidence before it is treated as true.',
    'This is a demonstration of the audit process, not a business assessment and not evidence of achieved client results.',
  ],
}
