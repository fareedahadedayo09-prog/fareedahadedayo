/**
 * Content blocks. Kept short and plain. Paragraphs max two sentences.
 */

export type MethodStep = { n: number; title: string; body: string }

export const methodology: MethodStep[] = [
  {
    n: 1,
    title: 'Understand the process',
    body: 'Map how the work actually happens today, the people involved, and the places where mistakes or delays appear.',
  },
  {
    n: 2,
    title: 'Find the friction',
    body: 'Identify repetitive work, manual handoffs and failure points. Point to a real operational cost before automating anything.',
  },
  {
    n: 3,
    title: 'Design the rules',
    body: 'Write the decision rules, exception paths, and human-escalation points before writing a single workflow node.',
  },
  {
    n: 4,
    title: 'Build and test',
    body: 'Implement against agreed test cases. Edge cases are tested explicitly and failures are routed cleanly.',
  },
  {
    n: 5,
    title: 'Hand over with clarity',
    body: 'Document what the system does, what it does not, and how to adjust it. The team running it owns the result.',
  },
]

export const capabilities = [
  { title: 'Practical AI, not gimmicks', body: 'AI is used to classify, extract and summarise where it adds value. Outputs are validated before they reach a customer.' },
  { title: 'Clear handoffs', body: 'Cases the system cannot decide are recorded and routed to a person, with full context attached.' },
  { title: 'Connected tools', body: 'Workflows tie into the tools your team already uses, so data moves without being retyped.' },
]

/** About section */
export const about = {
  eyebrow: 'About',
  lead:
    'I am Fareedah Adedayo, a self-taught AI workflow automation builder and law student based in Abuja, Nigeria.',
  paragraphs: [
    "I'm a self-taught AI workflow automation builder and law student in Abuja, Nigeria. I build practical systems that help small e-commerce and service businesses handle repetitive work more reliably.",
    'My legal training, and my time mentoring in STEM and working with robotics, shaped how I think: clear rules, and clear points where a human steps in.',
  ],
  facts: [
    { label: 'Role', value: 'AI Workflow Automation Builder' },
    { label: 'Approach', value: 'Understand, diagnose, design, build, validate' },
    { label: 'Focus', value: 'E-commerce operations, customer workflows, lead management' },
    { label: 'Location', value: 'Abuja, Nigeria · Remote work' },
  ],
}

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
    body: 'Product facts, policy terms, payment details and customer records come from a source the system can cite.',
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
  'These are working principles applied to each implementation. They are engineering responsibilities assessed per project, not legal guarantees.'

export type FaqItem = { q: string; a: string }

/** FAQ: every answer two sentences max. */
export const faq: FaqItem[] = [
  {
    q: 'What kinds of business processes can you automate?',
    a: 'I focus on workflows that are repetitive, rule-shaped and currently done by hand, like order checks, enquiry triage, returns handling, lead qualification and lifecycle follow-up. The best next step is to describe your process to me, and I will tell you frankly whether automation is the right answer.',
  },
  {
    q: 'Do I need technical knowledge to work with you?',
    a: 'No. I talk about the operational problem first, and translate between the business goal and the implementation. You will not be asked to learn APIs, webhooks or workflow platforms.',
  },
  {
    q: 'Can you work with the tools my business already uses?',
    a: 'In most cases yes. The integrations I build use common form, database, email and storefront tools. If you use a specialised tool, I will assess whether it has a workable API or webhook interface before proposing anything.',
  },
  {
    q: 'Do you build AI-powered customer support systems?',
    a: 'I build AI-assisted workflows where AI adds practical value, like classifying enquiries or extracting fields from a message. I do not deploy unguarded chatbots that answer customers without validation, and sensitive cases always route to a person.',
  },
  {
    q: 'How do you decide whether a process should be automated?',
    a: 'I automate tasks that repeat often, follow clear rules, and are low risk if one goes wrong. If a process needs judgement or rarely happens, I will tell you it is not worth automating.',
  },
  {
    q: 'Will a human still be involved when necessary?',
    a: 'Yes, by design. Unusual cases, conflicting information and sensitive situations like refunds or complaints go to a person with the full context attached.',
  },
  {
    q: 'How does a project begin?',
    a: 'With a short conversation about how your process works today. I then map the friction points and recommend whether automation is the right next step.',
  },
  {
    q: 'Can I discuss an idea even if I am unsure what needs automating?',
    a: 'Absolutely. Many useful engagements start with a vague sense that something is slower or more error-prone than it should be. I would rather tell you automation is not the right answer than sell you something you do not need.',
  },
]
