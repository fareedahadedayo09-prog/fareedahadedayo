/**
 * ──────────────────────────────────────────────────────────────────────────
 *  CONSULTING CAPABILITIES & PRACTICE AUDIT
 * ──────────────────────────────────────────────────────────────────────────
 *  Two things live here:
 *   1. `auditProcess`: the seven steps of the audit I run before proposing
 *      automation. Edit the wording freely; the order matters more than the
 *      phrasing.
 *   2. `velara`: a fully fictional practice case study used to demonstrate
 *      the process. It is labelled as illustrative everywhere it appears.
 *
 *  If a real engagement happens, replace `velara` with real evidence and keep
 *  the same field structure.
 * ──────────────────────────────────────────────────────────────────────────
 */

/* ─────────────────────────── 1. The audit process ─────────────────────── */

export type AuditStep = {
  n: number
  title: string
  description: string
  output: string
}

export const auditProcess: AuditStep[] = [
  {
    n: 1,
    title: 'Map the existing process',
    description:
      'Walk the process as it is actually done today, not as the documentation says it is done. Include the person who does it, the systems they toggle between and the work that happens outside the tools.',
    output: 'A current-state process map with handoffs marked.',
  },
  {
    n: 2,
    title: 'Identify friction and risk',
    description:
      'Name the specific problems: delays, repetitive tasks, manual handoffs, data problems and operational risks. Each one is a candidate, not a conclusion.',
    output: 'A prioritized list of friction points with where each occurs.',
  },
  {
    n: 3,
    title: 'Establish a baseline',
    description:
      'Fix the current numbers using whatever business information exists. Volumes, response times, handling time, error rates. Without a baseline, improvements cannot be claimed or tested.',
    output: 'A baseline figure set with the source of each number.',
  },
  {
    n: 4,
    title: 'Evaluate whether automation is appropriate',
    description:
      'Check the process against the automation test: is the task rule-based, is it repeated, does the data arrive in a usable shape, and is the cost of a wrong answer acceptable? Some problems should be solved by changing the process, not automating it.',
    output: 'A decision, with the reason, on whether to automate, fix or leave alone.',
  },
  {
    n: 5,
    title: 'Estimate financial impact with explicit assumptions',
    description:
      'Model the impact using stated assumptions the business can challenge. Show the assumptions next to the result, and separate cost reduction from revenue impact from risk reduction.',
    output: 'An ROI model with every assumption visible and editable.',
  },
  {
    n: 6,
    title: 'Recommend a workflow and human escalation rules',
    description:
      'Propose the automation and, just as importantly, the cases that must not be decided by it. Escalation rules are part of the design, not an afterthought.',
    output: 'A recommended architecture plus an explicit escalation policy.',
  },
  {
    n: 7,
    title: 'Define success metrics and a testing plan',
    description:
      'Agree what would prove the work worked, before building. Then define the realistic test scenarios the workflow will be run against before anything is trusted.',
    output: 'Success metrics, a test scenario list and an acceptance criterion for each.',
  },
]

export const auditSupportingTools = [
  { name: 'Miro', role: 'Process mapping and current-state workshops.' },
  { name: 'FigJam', role: 'Structured process diagrams and templated maps.' },
  { name: 'Notion', role: 'Audit reports and proposal documents.' },
  { name: 'Google Docs', role: 'Shareable proposal documents.' },
  { name: 'Google Sheets', role: 'ROI and baseline calculations.' },
]

/* ─────────────────────────── 2. Fictional practice case ──────────────── */

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
  /** shape for the SVG map */
  shape: 'rounded' | 'diamond' | 'circle'
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
    'Velara Skin Co. is a fictional skincare retailer created to demonstrate the audit process. Every business detail, operational condition and finding below is an illustrative assumption. It is not a real client, not a paid engagement, and not evidence of achieved results.',
  context:
    'Velara Skin Co. is a fictional skincare retailer receiving customer enquiries through social messaging channels. Enquiries include product questions, order enquiries and follow-ups. The business operates with a small team, and responses to enquiries are currently handled manually during working hours.',
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
    note: 'This is a hypothetical current-state map, not an observed client process. It is included to show how a map is structured before any evidence has been gathered.',
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
        'Product questions repeat across enquiries and across channels, which suggests the same answers are being typed more than once.',
      evidenceNeeded:
        'A tag-level count of enquiries by question type over a defined period, on the same question taxonomy, before any automation is proposed.',
    },
    {
      area: 'Delays during busy periods',
      hypothesis:
        'Response time rises during promotions and launches, and enquiries wait in the queue outside working hours.',
      evidenceNeeded:
        'Response timestamps matched against enquiry arrival timestamps, split by period and by channel, with the promotion windows marked.',
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
        'A review of a sample of enquiries to measure how long each one waited for a follow-up and whether the follow-up rule was applied.',
    },
    {
      area: 'Limited visibility into outcomes',
      hypothesis:
        'There is no view of enquiry volume, response times and outcomes together, so the team cannot see what is changing.',
      evidenceNeeded:
        'Confirmation of what data is currently captured and whether the reporting tool can join enquiries to outcomes.',
    },
  ],
  recommendations: [
    {
      priority: 1,
      intervention: 'A structured enquiry intake process',
      rationale:
        'It is the cheapest change and it makes every later step measurable. Without a consistent intake shape, any automation built on top of it will inherit the inconsistency.',
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
        'It removes the repeated manual lookups, but it exposes customer data, so it needs restricted permissions and a defined purpose before it is built.',
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
        'Reminders reduce the memory-dependent follow-up, but they should be added after the outcome field exists, otherwise reminders will fire on incomplete data.',
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
        'This is not a last addition. It should be defined at the same time as the automation, because it determines which cases the automation is allowed to decide.',
    },
  ],
  notAutomate: [
    {
      decision: 'Unusual refunds',
      reason:
        'A refund outside the standard policy changes a customer relationship and a financial record. A person should decide it and record the reasoning.',
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
    'A prioritized list of possible interventions with the reasoning behind the order.',
    'A proposed architecture showing the automation and its escalation paths.',
    'An ROI model with every assumption visible and editable.',
  ],
  limitations: [
    'The business, the volumes and the operational conditions are illustrative assumptions, not measured data.',
    'No customer data, real order data or real messaging transcripts were used.',
    'The findings are hypotheses, not confirmed observations. Each one requires evidence before it is treated as true.',
    'This is a demonstration of the audit process, not a business assessment and not evidence of achieved client results.',
  ],
}
