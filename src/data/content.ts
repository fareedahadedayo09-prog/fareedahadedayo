/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SITE COPY
 * ──────────────────────────────────────────────────────────────────────────
 *  The engineering approach, the about section and the privacy principles.
 *  Edit the wording here rather than in the components.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Principle = {
  n: string
  title: string
  body: string
}

/** Working principles, not claims of production experience. */
export const engineeringPrinciples: Principle[] = [
  {
    n: '01',
    title: 'Understand the process before automating it',
    body: 'I map how the work is done today, including the parts nobody documents. Automating a process I do not understand produces a faster version of a bad process.',
  },
  {
    n: '02',
    title: 'Define clear inputs, outputs and decision rules',
    body: 'Every workflow has a contract at each boundary. The trigger has a shape, the branch has a condition, the output has a format. Each one can be tested on its own.',
  },
  {
    n: '03',
    title: 'Validate data before acting on it',
    body: 'A wrong calculation is cheaper to catch before it runs than a wrong message sent to a customer. Validation happens before the decision, not after.',
  },
  {
    n: '04',
    title: 'Handle edge cases and unexpected inputs',
    body: 'A workflow is only as good as what it does with a null field, a duplicate submission and a customer who gives two contradictory instructions.',
  },
  {
    n: '05',
    title: 'Use human escalation where automation should not decide',
    body: 'Some decisions belong to a person: unusual refunds, complaints, disputed payments, anything requiring qualified judgement. The workflow hands over rather than guessing.',
  },
  {
    n: '06',
    title: 'Test with realistic scenarios',
    body: 'Tests use the messy shapes real data has, not the clean ones the happy path assumes. Each scenario has an expected outcome so the result can be checked.',
  },
  {
    n: '07',
    title: 'Document limitations and areas for improvement',
    body: 'Every project has a known-limitations section. What is not built yet is written down as clearly as what is, so the next step is obvious.',
  },
]

export const about = {
  eyebrow: 'About',
  lead:
    'I am Fareedah Sanusi Adedayo. I build workflow automations for operational problems: order handling, lead intake, returns and document processing. The work I am drawn to sits where a process is repetitive, decision-shaped and currently run by hand.',
  paragraphs: [
    'I am interested in the engineering decisions behind a workflow, not just the wiring. Which rule decides the outcome, what happens when the input is wrong, and what happens when the system does not know are questions that decide whether an automation is useful or merely busy.',
    'I am documenting this work as I build it. The case studies on this site describe what is actually implemented, what has been tested and what is still only designed, with the limitations stated alongside the results.',
    'I am looking for remote internships, junior automation roles and implementation projects where this kind of careful, documented work is useful.',
  ],
  /**
   * Editable placeholders. Nothing below is a claim about your background.
   * Replace or delete any line you do not want to display.
   */
  placeholders: [
    {
      label: 'Background',
      text: 'Open placeholder. Replace this with a line about how you came to automation engineering, or delete the block entirely. Nothing here is assumed.',
    },
    {
      label: 'Current focus',
      text: 'Open placeholder. Replace this with what you are working on right now, or delete the block.',
    },
  ],
  facts: [
    { label: 'Focus', value: 'Workflow automation and operational process engineering' },
    { label: 'Approach', value: 'Documented builds with stated limitations' },
    { label: 'Interested in', value: 'Remote internships, junior roles, implementation projects' },
    { label: 'Location', value: 'Abuja, Nigeria' },
  ],}

/**
 * "What I won't automate": a trust-building section. Written as principles
 * the work follows, not as legal guarantees.
 */
export const privacyPrinciples = [
  {
    title: 'Do not automate a process before understanding it',
    body: 'A workflow built on an assumed process produces confident wrong answers at scale. Map it first.',
  },
  {
    title: 'Do not automate a broken process',
    body: 'If the underlying process has a data problem or an ownership gap, automating it makes the problem faster and harder to trace.',
  },
  {
    title: 'Do not let an AI system invent information',
    body: 'Product facts, policy terms, payment details and customer records must come from a source the system can cite. An answer built on a guess is not an answer.',
  },
  {
    title: 'Do not give an automation more access than it needs',
    body: 'A workflow that reads the whole database to check one field is a liability. Permissions are narrowed to the exact records it needs.',
  },
  {
    title: 'Do not expose keys, customer records or tokens',
    body: 'API keys live in the platform secret store, never in the workflow body, the data layer or the repository.',
  },
  {
    title: 'Do not let AI alone make sensitive decisions',
    body: 'Refunds, complaints, disputes and anything requiring qualified judgement stop at a human. The system hands over with the reason attached.',
  },
  {
    title: 'Do not silently discard uncertain cases',
    body: 'A case the system cannot decide is recorded and escalated. Silently dropping it is the failure mode that looks like success.',
  },
  {
    title: 'Do not use customer data beyond the agreed purpose',
    body: 'Data is used for the task it was collected for, retained for as long as needed, and deleted when it is not. Retention is a decision made per implementation.',
  },
]

export const privacyFooter =
  'Privacy and security are engineering responsibilities that have to be assessed for each implementation. Nothing on this site is a legal compliance guarantee, and no system should be assumed compliant without that assessment.'

export const noAutomateHighlight = {
  title: 'Examples of decisions that stay with a person',
  items: [
    'Unusual refunds outside standard policy',
    'Serious or escalated complaints',
    'Medical, safety or suitability questions about a product',
    'Disputed payments and chargebacks',
    'Any case where the system lacks reliable information',
    'Any request to change permissions, credentials or access',
  ],
}
