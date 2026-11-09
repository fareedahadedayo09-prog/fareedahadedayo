/**
 * ──────────────────────────────────────────────────────────────────────────
 *  METHODOLOGY, ABOUT, FAQ, BUILD JOURNAL & PRINCIPLES
 * ──────────────────────────────────────────────────────────────────────────
 */

export type MethodStep = {
  n: string
  title: string
  body: string
}

/**
 * The five-step process. Written in business-friendly language.
 */
export const methodology: MethodStep[] = [
  {
    n: '01',
    title: 'Understand',
    body: 'Learn how the current process actually works — the people involved, the information that moves through it, and the places where work piles up. I map this from observation and conversation, not from assumption.',
  },
  {
    n: '02',
    title: 'Diagnose',
    body: 'Identify repetitive work, delays, manual handoffs and failure points. A problem worth automating is one with a real operational cost — lost time, missed follow-ups, avoidable mistakes — that we can point to.',
  },
  {
    n: '03',
    title: 'Design',
    body: 'Decide what should be automated and what should stay with a person. The rules are written down in plain language before anything is built, so you can review and change them.',
  },
  {
    n: '04',
    title: 'Build',
    body: 'Implement the workflow and connect the relevant tools. Each step has a defined input and output, so parts can be tested individually and the system stays changeable as the business evolves.',
  },
  {
    n: '05',
    title: 'Validate',
    body: 'Test the workflow against normal cases, edge cases and deliberate failures. I report honestly what was verified, what was not, and what remains to be done before anything is called production-ready.',
  },
]

/** Three capabilities that sit behind every engagement. */
export const capabilities = [
  {
    title: 'Operational understanding',
    body: 'Understanding how work is currently done before deciding whether any of it should be automated.',
  },
  {
    title: 'Solution design',
    body: 'Defining requirements, business rules, exception paths and human oversight before any workflow is built.',
  },
  {
    title: 'Technical implementation',
    body: 'Building and testing workflows that connect systems, process information and support reliable business operations.',
  },
]

/** About section — truthful, as specified. */
export const about = {
  eyebrow: 'About',
  lead:
    'I am Fareedah Sanusi Adedayo, a self-taught AI Workflow Automation Builder and a law student based in Abuja, Nigeria. I build practical automation systems that help small e-commerce and service businesses handle repetitive operations more reliably.',
  paragraphs: [
    'I came to automation work through an interest in how systems actually run — the gap between how a process is described and how it is performed day to day. That gap is usually where repetitive work, inconsistent decisions and missed follow-ups live, and it is where well-designed automation is most useful.',
    'My background is interdisciplinary: alongside my legal studies, I have spent time mentoring in STEM and working with robotics, both of which shaped how I think about structured problems, rules, and the points where human judgement has to stay in the loop.',
    'I do not believe automation should be introduced because a tool makes it possible. Every workflow I build starts from a specific operational problem, with the decision rules, exception paths and human-escalation points written down before implementation.',
    'I am open to remote consulting engagements and implementation projects for e-commerce founders and small business teams who have a process they want to run more reliably.',
  ],
  facts: [
    { label: 'Role', value: 'AI Workflow Automation Builder' },
    { label: 'Approach', value: 'Understand, diagnose, design, build, validate' },
    { label: 'Focus', value: 'E-commerce operations, customer workflows, lead management' },
    { label: 'Background', value: 'Law student · self-taught builder · STEM/robotics mentoring' },
    { label: 'Location', value: 'Abuja, Nigeria · Remote work' },
  ],
}

/** Working principles — "what I will not do" — kept short. */
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
  'These are working principles applied to each implementation. They are engineering responsibilities assessed per project, not legal guarantees.'

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

/** FAQ — answers are clear, friendly and commercially sensible. */
export type FaqItem = { q: string; a: string }

export const faq: FaqItem[] = [
  {
    q: 'What kinds of business processes can you automate?',
    a: 'I focus on workflows that are repetitive, rule-shaped, and currently done by hand: order processing and confirmation, customer enquiry triage, returns handling, lead qualification and customer-lifecycle follow-up. If you are unsure whether your process fits, the best next step is to describe it to me — I will tell you frankly whether automation is the right answer.',
  },
  {
    q: 'Do I need technical knowledge to work with you?',
    a: 'No. I speak in plain language about the operational problem before we talk about tools. You will not be asked to learn APIs, webhooks or workflow platforms; I will translate between the business problem and the technical implementation.',
  },
  {
    q: 'Can you work with the tools my business already uses?',
    a: 'In most cases yes. The integrations I have built use common form, database, email and storefront tools (Tally, Airtable, Gmail, Shopify webhooks, and similar). If your business uses a specialised tool, I will assess whether it has a workable API or webhook interface before proposing anything.',
  },
  {
    q: 'Do you build AI-powered customer support systems?',
    a: 'I build AI-assisted workflows where AI adds practical value — for example, classifying an incoming enquiry or extracting fields from a free-text message — but I do not build "set it loose" chatbots that answer customers without guardrails. Any AI output is validated before it reaches a customer, and sensitive cases are routed to a person.',
  },
  {
    q: 'How do you decide whether a process should be automated?',
    a: 'A process is a candidate when the same decision is being made repeatedly, the rules can be written down, the volume is high enough to justify the work, and the cost of getting a single instance wrong is containable. If the process requires judgement, changes every time, or happens rarely, automation is usually the wrong answer.',
  },
  {
    q: 'Will a human still be involved when necessary?',
    a: 'Yes — by design. Every workflow I build includes explicit escalation paths: cases the rules do not cover cleanly, cases with conflicting information, and sensitive cases like unusual refunds or complaints are routed to a person with the relevant context attached.',
  },
  {
    q: 'How does a project begin?',
    a: 'With a conversation about how the process currently works. From that I map the current state, identify the friction points and make a recommendation about whether automation is the right next step. If it is, we agree the rules, exceptions and test cases before anything is built.',
  },
  {
    q: 'Can I discuss an idea even if I am unsure what needs automating?',
    a: 'Absolutely. Many useful engagements start with a vague sense that something is slower or more error-prone than it should be. Describing the problem clearly is often the most valuable part of the process, and I would rather tell you automation is not the right answer than sell you something you do not need.',
  },
]

/**
 * Build journal entries. Easy to update: add to the top of the array.
 * Do not fabricate historical entries; the structure supports dating.
 */
export type JournalEntry = {
  date: string // ISO date string 'YYYY-MM-DD'
  title: string
  body: string
  tags?: string[]
}

export const journal: JournalEntry[] = [
  {
    date: '2026-11-09',
    title: 'Portfolio redesign: business-first positioning and two-layer case studies',
    body: 'Relaunched the portfolio around a clearer business-first positioning. Added business-problem categories, a services section, an interactive COD order simulator, a project-library filter, a build journal and an FAQ. Case studies now have a clearer business overview up front with technical detail behind it rather than mixed in.',
    tags: ['portfolio', 'site-redesign', 'positioning'],
  },
  {
    date: '2026-11-09',
    title: 'GlowLab lifecycle prototype: first walkthrough tests passing',
    body: 'Completed the first end-to-end walkthrough of the GlowLab lifecycle prototype: abandoned-cart scheduling, recent-purchase suppression, opt-out check and VIP review-queue routing all behaving as designed. Next up: timezone-aware wait logic and simulated Shopify webhook payloads.',
    tags: ['glowlab', 'lifecycle', 'prototype', 'testing'],
  },
]
