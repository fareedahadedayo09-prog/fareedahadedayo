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
  paragraphs: [
    "I'm Fareedah, an AI Workflow Automation Builder and an LLB Civil Law student.",
    "I've always enjoyed solving problems and building things. That interest first drew me to robotics, and eventually led me to AI automation. I like taking something that seems complicated, understanding how it works and figuring out how to build a better way of doing it.",
    "Studying law has added another dimension to how I approach problems. I'm used to examining rules, considering different circumstances and paying attention to details. I find those habits useful when designing workflows, especially when decisions, exceptions and human intervention matter.",
    "I enjoy the practical side of automation: mapping processes, connecting systems, testing different scenarios and figuring out what happens when something doesn't go according to plan.",
    "Outside the technical work, I'm someone who enjoys learning independently, exploring ideas and building things to see how far I can take them.",
  ],
  facts: [
    { label: 'Role', value: 'AI Workflow Automation Builder' },
    { label: 'Approach', value: 'Diagnose first, then design, then build and validate' },
    { label: 'Role interests', value: 'Remote internships and junior automation roles' },
    { label: 'Education', value: 'LLB, Civil Law, in progress' },
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
