/**
 * ──────────────────────────────────────────────────────────────────────────
 *  METHODOLOGY, ABOUT AND PRIVACY COPY
 * ──────────────────────────────────────────────────────────────────────────
 *  The consulting methodology, the three capabilities it demonstrates, the
 *  about section and the privacy principles.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type MethodStep = {
  n: string
  title: string
  body: string
}

/**
 * The five-step consulting methodology. This is the spine of the site's
 * positioning: it shows that automation work starts with understanding the
 * business, not with connecting tools.
 */
export const methodology: MethodStep[] = [
  {
    n: '01',
    title: 'Understand the operation',
    body: 'Map the current process, the people involved, the information that moves through it and the constraints already in place. The map comes from observation, not from memory.',
  },
  {
    n: '02',
    title: 'Diagnose the problem',
    body: 'Identify bottlenecks, repetitive work, manual handoffs and failure points, and state the cost or business impact worth investigating. A problem worth automating is a problem with a measurable cost.',
  },
  {
    n: '03',
    title: 'Evaluate the intervention',
    body: 'Decide whether automation is the right answer at all. Define what success looks like, name the risks and exceptions, and identify where a person should stay in the loop.',
  },
  {
    n: '04',
    title: 'Design and implement',
    body: 'Translate the findings into a workflow with defined inputs, explicit decision rules, validation and escalation paths. The rules are written down so they can be reviewed and changed.',
  },
  {
    n: '05',
    title: 'Validate the outcome',
    body: 'Test normal and failure scenarios against the defined criteria, then report honestly what was verified, what was not, and what remains to be done.',
  },
]

/**
 * The three capabilities the portfolio demonstrates. Presented as what the
 * work requires, not as credentials.
 */
export const capabilities = [
  {
    title: 'Operational analysis',
    body: 'Understanding how work is currently done, identifying where it breaks down and evaluating whether an intervention would produce a real benefit.',
  },
  {
    title: 'Solution design',
    body: 'Defining requirements, business rules, exception paths and human oversight before any automation is built.',
  },
  {
    title: 'Technical implementation',
    body: 'Building and testing workflows that connect systems, process information and support reliable business operations.',
  },
]

/** Scope of the work: deliberately broad, and explicitly not single-industry. */
export const scope = {
  lead:
    'Automation work is not limited to one department or industry. The same discipline applies wherever a process is repetitive, decision-shaped and currently run by hand.',
  areas: [
    'Sales and lead management',
    'Customer service and enquiry handling',
    'Order operations and logistics',
    'Finance, invoicing and reconciliation',
    'Internal administration',
    'Data processing and document handling',
  ],
}

export const about = {
  eyebrow: 'About',
  lead:
    'I am Fareedah Sanusi Adedayo. I work as an automation consultant and systems builder: I examine how business processes actually work, find where manual work and process gaps create friction, and build automation systems around the problems worth solving.',
  paragraphs: [
    'My work sits at the intersection of operational analysis and technical implementation. The parts I am most interested in are the ones that decide whether an automation is useful rather than merely busy: which rule produces the outcome, what happens when the input is wrong, what happens when the system does not know, and what happens when a person should decide instead.',
    'I approach each engagement the same way, whatever the function. The process is mapped first, the problem is diagnosed against real data, and automation is only proposed where the benefit justifies it. Nothing is built before the rules and the exceptions are written down.',
    'I document the work as I go. Every case study on this site states what was implemented, what was tested, and what is still only designed, with the limitations written alongside the results.',
    'I am open to consulting engagements, implementation projects and corporate roles in automation, business operations and process improvement.',
  ],
  placeholders: [
    {
      label: 'Background',
      text: 'Open placeholder. Replace with a line about your background and how you came to automation work, or delete this block.',
    },
    {
      label: 'Current focus',
      text: 'Open placeholder. Replace with what you are working on right now, or delete this block.',
    },
  ],
  facts: [
    { label: 'Role', value: 'AI Automation Consultant and Systems Builder' },
    { label: 'Approach', value: 'Diagnose first, then design, then build and validate' },
    { label: 'Engagements', value: 'Consulting, implementation projects, corporate roles' },
    { label: 'Location', value: 'Abuja, Nigeria' },
  ],
}

/**
 * "What I will not automate": judgement, presented as working principles.
 * Kept deliberately short: it is one section, not a repeated disclaimer.
 */
export const privacyPrinciples = [
  {
    title: 'Do not automate a process before understanding it',
    body: 'A workflow built on an assumed process produces confident wrong answers at scale. The process is mapped first, from observation.',
  },
  {
    title: 'Do not automate a broken process',
    body: 'If the underlying process has a data problem or an ownership gap, automating it makes the problem faster and harder to trace.',
  },
  {
    title: 'Do not let an AI system invent information',
    body: 'Product facts, policy terms, payment details and customer records come from a source the system can cite. An answer built on a guess is not an answer.',
  },
  {
    title: 'Do not give an automation more access than it needs',
    body: 'Permissions are narrowed to the exact records a workflow requires. API keys live in the platform secret store, never in the workflow body or the repository.',
  },
  {
    title: 'Do not let AI alone make sensitive decisions',
    body: 'Refunds, complaints, disputes and anything requiring qualified judgement stop at a person, with the reason attached.',
  },
  {
    title: 'Do not silently discard uncertain cases',
    body: 'A case the system cannot decide is recorded and escalated. Dropping it quietly is the failure mode that looks like success.',
  },
]

export const privacyFooter =
  'These are working principles, applied to each implementation. They are engineering responsibilities to be assessed per project, not legal guarantees.'

export const noAutomateHighlight = {
  title: 'Decisions that stay with a person',
  items: [
    'Unusual refunds outside standard policy',
    'Serious or escalated complaints',
    'Medical, safety or suitability questions',
    'Disputed payments and chargebacks',
    'Any case where the system lacks reliable information',
  ],
}
