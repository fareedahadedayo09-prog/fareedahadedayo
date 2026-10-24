/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PROJECT CONTENT
 * ──────────────────────────────────────────────────────────────────────────
 *  Every project card, case study and status badge on the site reads from this
 *  file. Nothing else needs to change to add or update a project.
 *
 *  SECTION STATUS SEMANTICS
 *    verified     : built and checked against a realistic test set.
 *    partial      : partially built; the section says what is and is not done.
 *    planned      : designed, not built.
 *    not-started  : nothing built yet.
 *
 *  If you cannot point at the current build and show it, do not write
 *  `verified`. Change the label and describe what is actually there.
 *
 *  PROJECT STATUS SEMANTICS
 *    done     : the project is complete. Individual behaviours may still be
 *                labelled partial or planned inside their sections; that is
 *                deliberate and is what makes the case study credible.
 *    progress : being built.
 *    planned  : nothing built yet.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type SectionStatus = 'verified' | 'partial' | 'planned' | 'not-started'

export type StatusKey = 'done' | 'progress' | 'planned'

export type CaseStudySection = {
  id: string
  label: string
  status: SectionStatus
  paragraphs: string[]
  bullets?: string[]
  note?: { tone: 'info' | 'warn' | 'grey'; text: string }
  table?: { keys: string[]; values: string[] }
}

export type ScreenshotSlot = {
  id: string
  /** Path to the image file in /public. */
  image: string
  /** Short title above the image. */
  title: string
  /** Caption below the image. Also used as the alternative text. */
  caption: string
}

export type Project = {
  slug: string
  name: string
  summary: string
  status: StatusKey
  statusLabel: string
  statusDetail: string
  tools: string[]
  timeline: string
  overview: string
  sections: CaseStudySection[]
  screenshots: ScreenshotSlot[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'order-confirmation-risk-check',
    name: 'Order Confirmation and Risk-Check System',
    summary:
      'A workflow for cash-on-delivery orders: it prices each order, applies a risk rule, and sends the customer a confirmation or cancellation link depending on eligibility.',
    status: 'done',
    statusLabel: 'Completed',
    statusDetail:
      'The order-processing path is built and has been run against test orders. Cancellation, reminder and duplicate-order handling are not fully tested, and the sections below say so where relevant.',
    tools: ['n8n', 'Airtable', 'Tally', 'Gmail'],
    timeline: 'Completed',
    overview:
      'Cash-on-delivery orders arrive with no payment captured up front. Each order has to be priced, checked against a risk rule, and either confirmed with the customer or cancelled before dispatch. Left to manual handling, mispriced or unconfirmed orders turn into failed deliveries and wasted courier attempts. This system moves that first decision point from a spreadsheet into a repeatable n8n workflow.',
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'verified',
        paragraphs: [
          'Orders arrive through a form or a chat message and each one is handled by hand. The person handling it re-does arithmetic the order data already contains, makes a judgement call about whether the order is worth confirming, and then has to remember to send the customer a link.',
          'The failure modes are specific: a total that does not match the line items, an order confirmed without a working delivery address, and a customer who never receives a link and wonders where the order is. Each of those is an exception, and exceptions are exactly what a workflow that only handles the happy path will miss.',
        ],
        bullets: [
          'Repeated manual arithmetic on data that is already structured.',
          'Inconsistent eligibility decisions between one order and the next.',
          'No durable record of which link was sent, to whom, and when.',
          'Failed deliveries caused by unconfirmed or mispriced orders.',
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'verified',
        paragraphs: [
          'A Tally form captures the order. Submission triggers an n8n workflow that normalises the line items, computes the total including delivery, applies the risk assessment rule, and then branches: eligible orders receive a confirmation link, ineligible orders receive a cancellation link. Either way the Airtable order record is updated with the outcome and a timestamp, so there is a single source of truth for what was sent and when.',
          'The design follows one rule throughout: a workflow has a defined contract at each boundary. The form has a contract. The branch has a contract. The email has a contract. Each one can be tested on its own without standing the whole system up.',
        ],
        table: {
          keys: ['Intake', 'Normalisation', 'Calculation', 'Output', 'Record'],
          values: [
            'Tally form submission',
            'Trim text fields, coerce quantities to numbers, reject rows missing product or quantity',
            'Sum of (quantity x unit price) across line items, plus delivery fee',
            'Gmail message carrying the confirmation or cancellation link',
            'Airtable order record updated with status and timestamp',
          ],
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'verified',
        paragraphs: [
          'Two rules produce the outcome, and both are written as explicit conditions rather than hidden inside a model call.',
        ],
        bullets: [
          'Total calculation: sum of (quantity x unit price) across line items, plus the delivery fee.',
          'Eligibility rule: a fixed set of conditions the order must satisfy before a confirmation link is sent.',
          'Branch: pass sends the confirmation link and sets status to confirmed. Fail sends the cancellation link and sets status to cancelled.',
          'Every decision writes the rule that was applied back to the record, so a decision can be re-checked later.',
        ],
        note: {
          tone: 'grey',
          text: 'The risk threshold and the eligibility conditions are configuration, not automatic inference. They are documented in the workflow so they can be reviewed and changed deliberately.',
        },
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'partial',
        paragraphs: [
          'Validation runs before any calculation, because a wrong total is cheaper to catch than a wrong email. Anything that cannot be parsed is stopped and recorded rather than silently skipped.',
        ],
        bullets: [
          'Required fields are checked before pricing: name, address and at least one line item.',
          'Quantities are coerced to numbers; a non-numeric quantity stops the run and raises a record.',
          'A missing delivery fee is treated as an input problem rather than silently assumed to be zero.',
          'A failed send is recorded in the order record so it can be retried by hand.',
        ],
        note: {
          tone: 'warn',
          text: 'Partial: there is no duplicate submission detection and no automated retry. Two identical form submissions currently produce two workflow runs.',
        },
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'partial',
        paragraphs: [
          'The order-processing path has been run against a controlled set of test orders. The scenarios below are labelled with the state they are actually in, so nothing is presented as verified when it has not been.',
        ],
        bullets: [
          'Single line item, normal price, correct total: implemented and verified.',
          'Multiple line items with different quantities: implemented and verified.',
          'Order failing the eligibility rule receives the cancellation link: implemented, not yet verified against a full run.',
          'Non-numeric quantity is rejected and recorded: implemented, not yet verified.',
          'Duplicate submission is detected and suppressed: not started.',
          'Failed send triggers an automated retry: not started.',
        ],
        note: {
          tone: 'info',
          text: 'These are test-run results from a completed build, not production telemetry. They show that the logic executes. They are not evidence of business impact.',
        },
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'verified',
        paragraphs: ['The honest list. Each of these is a real gap, not a future feature request.'],
        bullets: [
          'No duplicate-order detection. Two identical submissions produce two workflow runs.',
          'No reminder ladder. If a customer does not confirm, nothing happens automatically.',
          'No escalation to a human for ambiguous orders. The binary branch sends either a confirmation or a cancellation.',
          'Single currency and a single delivery-fee model.',
          'Cancellation and reminder paths are not tested end to end.',
          'No monitoring or failure alerting. A stopped workflow would go unnoticed until someone checks.',
        ],
      },
    ],
    screenshots: [
      {
        id: 'cod-01',
        image: '/screenshots/01-order-submission.png',
        title: '1. Order submission',
        caption: 'The order form, before the workflow is triggered.',
      },
      {
        id: 'cod-02',
        image: '/screenshots/02-customer-email.png',
        title: '2. Customer email',
        caption: 'The confirmation message sent to the customer.',
      },
      {
        id: 'cod-03',
        image: '/screenshots/03-verified-outcome.png',
        title: '3. Verified outcome',
        caption: 'The outcome recorded after the order was processed.',
      },
      {
        id: 'cod-04',
        image: '/screenshots/04-airtable-record.png',
        title: '4. Airtable record',
        caption: 'The corresponding record in Airtable, holding the status and total.',
      },
      {
        id: 'cod-05',
        image: '/screenshots/05-workflow-overview.png',
        title: '5. Workflow overview',
        caption: 'The n8n workflow: intake, pricing, risk check and branching.',
      },
    ],
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'lead-qualification',
    name: 'Lead Qualification System',
    summary:
      'A workflow that structures incoming leads, classifies them against defined criteria and sets a next action for sales follow-up.',
    status: 'done',
    statusLabel: 'Completed',
    statusDetail:
      'Completed as a standalone build. Capabilities are labelled individually below; duplicate detection and the follow-up digest were considered and are not part of the current build.',
    tools: ['n8n', 'Airtable', 'Tally'],
    timeline: 'Completed',
    overview:
      'Leads arrive scattered across a form, direct messages and pasted text. Left unstructured, they are triaged by whoever is free, which means inconsistent classification and follow-ups that depend on memory. This system takes that messy intake and turns it into a structured record with a classification attached, so a follow-up decision can be made consistently.',
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'verified',
        paragraphs: [
          'Enquiries arrive with no consistent shape. Some have a name and a product interest, some are a sentence with no contact detail, and some are a repeated question that was already answered. Classification happens in someone\'s head, and the record of who was contacted and when lives in chat history.',
        ],
        bullets: [
          'Unstructured intake from several channels with no shared format.',
          'Classification performed from memory, so similar enquiries get different treatment.',
          'No durable record of what was sent and when.',
          'Follow-up depends on remembering, not on a rule.',
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'partial',
        paragraphs: [
          'A Tally form and a direct-message channel both feed one n8n workflow. The workflow normalises whatever arrived into a consistent shape, applies the classification rule, and writes the result to Airtable with an owner and a next action. From there, follow-up is a defined step rather than something remembered.',
          'This is a completed standalone build. It is not connected to a live CRM and it does not represent a customer engagement.',
        ],
        table: {
          keys: ['Intake', 'Normalisation', 'Classification', 'Record', 'Follow-up'],
          values: [
            'Tally form, direct message',
            'Extract name, contact, product interest, source',
            'Deterministic rule against defined buckets',
            'Airtable record with owner and next action',
            'Manual for now; a daily digest is planned, not built',
          ],
        },
        note: {
          tone: 'warn',
          text: 'Prototype status. Correct the labels in this file as the build changes. The current build covers intake, structuring and a first-pass classification rule.',
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'partial',
        paragraphs: [
          'The classification rule is written as explicit conditions over the extracted fields. It is intentionally not delegated to a model, because a deterministic rule can be read, challenged and changed, and its behaviour on edge cases can be tested directly.',
        ],
        bullets: [
          'Classification is derived from explicit field values, not from a model inference.',
          'A record missing a contact detail is marked incomplete rather than discarded.',
          'An enquiry that cannot be mapped to any bucket is held for review rather than forced into one.',
        ],
        note: {
          tone: 'grey',
          text: 'Rule order matters. The buckets are evaluated in a fixed sequence and the first match wins, which makes the outcome predictable but also means a poorly ordered rule will mis-file consistently.',
        },
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'partial',
        paragraphs: [
          'An incomplete record is retained rather than dropped. That is a deliberate choice: losing an enquiry is worse than holding a messy one, because the person can still be contacted.',
        ],
        bullets: [
          'Missing contact detail sets an incomplete flag and holds the record for review.',
          'Enquiries that cannot be classified are written with an unclassified flag rather than assigned by default.',
          'A failed write is surfaced as a workflow error rather than swallowed.',
        ],
        note: {
          tone: 'warn',
          text: 'Partial: there is no duplicate detection. The same person enquiring twice will produce two records.',
        },
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'partial',
        paragraphs: ['Results are test-run outcomes from the build, not business metrics.'],
        bullets: [
          'Well-formed enquiry is extracted and classified correctly: implemented and verified.',
          'Enquiry with a missing contact detail is flagged incomplete, not dropped: implemented and verified.',
          'Enquiry that matches no bucket is held for review: implemented, not yet verified.',
          'Duplicate enquiry is suppressed: not started.',
          'Follow-up digest is produced daily: not started.',
        ],
      },
      {
        id: 'limitations',
        label: 'What it demonstrates, and what is missing',
        status: 'verified',
        paragraphs: [
          'The point of this project is not the classification itself. It is that a qualification rule written as explicit conditions can be read, challenged, changed, and tested on its edge cases, instead of being an opaque score that nobody can explain.',
        ],
        bullets: [
          'Structured decision-making in sales operations: the rule is a document, not a black box.',
          'Validation before action: an incomplete record is held rather than lost.',
          'A workflow design that separates intake, classification and follow-up, so each can change independently.',
          'No duplicate detection.',
          'No daily follow-up digest; follow-up is still a manual task.',
          'Classification buckets are a first pass and are likely to need expansion.',
          'Text extraction handles a narrow range of phrasings.',
          'No connection to a live CRM or marketing tool.',
        ],
      },
    ],
    screenshots: [],
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'returns-refunds-handler',
    name: 'Returns and Refunds Handler',
    summary:
      'A workflow that applies return-policy rules consistently, evaluates requests, and escalates the cases that need a person rather than an automated answer.',
    status: 'done',
    statusLabel: 'Completed',
    statusDetail:
      'Completed as a standalone build. The behaviours below are labelled individually: policy evaluation and escalation are implemented, while conflict detection between contradictory customer instructions is designed but not yet built.',
    tools: ['n8n', 'Airtable', 'Tally'],
    timeline: 'Completed',
    overview:
      'Returns are the case where a workflow has to be more careful than the process it replaces. A customer is asking for something back, the policy may not cover it, and the customer may give instructions that contradict each other. This system applies the policy rules consistently while keeping an explicit exit to a human for anything the rules cannot settle.',
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'verified',
        paragraphs: [
          'Return decisions are made conversationally, one message at a time, usually by whoever is available. The same request can get a different answer depending on the day, on the order history the person can see at that moment, and on how persistent the customer is. Policy exceptions are granted conversationally and leave no trace, and there is no consistent record of which rule was applied and why.',
        ],
        bullets: [
          'The same return request can receive different answers on different days.',
          'Policy exceptions are granted conversationally and leave no trace.',
          'Conflicting customer instructions are resolved by whoever reads them first.',
          'No record of the rule applied to a decision.',
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'partial',
        paragraphs: [
          'The system is a staged pipeline rather than a single branch, because the expensive cases are the ones that need to be recognised early and passed on. A return request is validated for completeness, evaluated against the policy rules in a fixed order, and either produces a decision or is escalated.',
        ],
        table: {
          keys: ['Stage', 'What it does'],
          values: [
            'Request intake',
            'Validation',
            'Policy evaluation',
            'Conflict detection',
            'Human escalation',
            'Outcome record',
            'Tally form and message channel',
            'Confirm the request has what the policy requires',
            'Apply the return policy rules in order',
            'Detect self-contradicting instructions',
            'Route unresolved cases to a person',
            'Write the decision and the rule that produced it',
          ],
        },
        note: {
          tone: 'grey',
          text: 'Stages are listed in the order the request passes through them. Conflict detection is designed and documented but is not yet implemented; the sections below mark it as such.',
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'partial',
        paragraphs: [
          'The decision logic is written as ordered, explicit rules. Two categories matter more than the rest, because they are where automation should not decide alone.',
        ],
        bullets: [
          'Policy rules are evaluated in a fixed order so the outcome is deterministic and reviewable.',
          'A request that matches no policy rule is escalated rather than defaulted.',
          'Conflicting instructions are detected before a decision is produced, and the conflict is recorded as the reason for escalation.',
          'Unusual refund amounts, disputed payments and policy edge cases are designated for human review rather than automatic approval.',
        ],
        note: {
          tone: 'warn',
          text: 'Partial: the rule order is implemented and documented. Conflict detection between contradictory instructions is designed but not yet built.',
        },
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'partial',
        paragraphs: [
          'Validation is the first stage because a policy decision made on incomplete input is not a decision, it is a guess. The build checks presence and format; consistency against the order record is the remaining work.',
        ],
        bullets: [
          'Required fields are checked before policy evaluation runs.',
          'A request referencing an order that cannot be found is escalated, not answered.',
          'Conflicting instructions are flagged before a decision is produced.',
          'An escalation that cannot be delivered is raised as a workflow error.',
        ],
        note: {
          tone: 'warn',
          text: 'Partial: presence checks are implemented. Order-record lookup and conflict detection are not yet built.',
        },
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'partial',
        paragraphs: ['Test results are outcomes from the build and are not business metrics.'],
        bullets: [
          'Complete request passes validation and reaches policy evaluation: implemented, not yet verified.',
          'Request with a missing required field is rejected and recorded: implemented, not yet verified.',
          'Request outside the policy is escalated: implemented, not yet verified against a full run.',
          'Self-contradicting instructions are detected and escalated: not started.',
          'Disputed payment is routed to a human: designed, not yet implemented.',
          'Escalation notification reaches the owner: designed, not yet implemented.',
        ],
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'verified',
        paragraphs: ['The honest state of the build, ordered by the failure mode each item closes.'],
        bullets: [
          'Conflicting customer instructions are not yet detected.',
          'Order-record lookup during validation is not yet built.',
          'The human escalation branch is designed but is not wired to a live queue.',
          'No end-to-end test run against a realistic returns dataset.',
          'No monitoring or failure alerting on the workflow.',
        ],
      },
    ],
    screenshots: [],
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'invoice-extraction-validation',
    name: 'Invoice Extraction and Validation',
    summary:
      'A planned workflow for extracting invoice fields, validating them against each other, and flagging the records that need correction or human review.',
    status: 'planned',
    statusLabel: 'Planned',
    statusDetail:
      'Not started. The sections below describe the intended design only. Nothing has been implemented, tested or deployed.',
    tools: ['n8n'],
    timeline: 'Planned - not started',
    overview:
      'Invoices arrive as files and pastes with no consistent layout. The intended workflow extracts structured fields, validates them against each other and against the source document, and marks the records that need a human before they reach any downstream process. The point of the design is to make uncertainty visible rather than to force a confident answer out of an unreliable input.',
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'planned',
        paragraphs: [
          'Invoice data is entered by hand, field by field, from a document whose layout changes between suppliers. The failure is rarely the extraction itself; it is the silent mis-entry that survives into a payment or a reconciliation.',
        ],
        bullets: [
          'Layouts differ between suppliers, so field positions are not reliable.',
          'Manual entry is slow and produces silently wrong values.',
          'Missing or ambiguous fields are usually filled in with a guess.',
          'There is no record of which fields were extracted and which were assumed.',
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'planned',
        paragraphs: [
          'This is a plan, not a build. The intended approach is an extraction step, a validation step and an explicit output contract, with every record that cannot be validated marked rather than guessed. Nothing described here has been implemented. The sections below record the design decisions so they can be reviewed before any code is written.',
        ],
        table: {
          keys: ['Stage', 'Purpose', 'State'],
          values: [
            'Document intake',
            'Field extraction',
            'Validation',
            'Confidence handling',
            'Output',
            'File or paste, supplier source',
            'Extraction into a fixed shape',
            'Cross-field and document-level checks',
            'Flag fields that are missing or uncertain',
            'Validated record, or held record for review',
          ],
        },
        note: {
          tone: 'warn',
          text: 'Planned. No functionality described in this case study has been implemented or tested.',
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'planned',
        paragraphs: [
          'The design decisions that matter are about what happens to an uncertain result, not about which model to call.',
        ],
        bullets: [
          'Extracted values are never overwritten with a default. A missing value stays missing and is flagged.',
          'Cross-field checks compare line item totals, subtotal, tax and grand total before a record is marked validated.',
          'A record failing any check is held for review with the failing checks listed.',
          'Confidence is recorded per field so weak extractions are reviewable without re-running everything.',
        ],
        note: {
          tone: 'warn',
          text: 'Design intent only. None of these rules is implemented.',
        },
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'planned',
        paragraphs: [
          'Validation is the stage that makes the whole system worth building. Extraction will be imperfect; the design assumes it and makes that imperfection visible.',
        ],
        bullets: [
          'Required fields are checked for presence.',
          'Line item totals are reconciled against subtotal, tax and grand total.',
          'A supplier that is not recognised is flagged rather than assumed.',
          'A document that cannot be parsed is recorded as unparseable with the reason.',
        ],
        note: {
          tone: 'warn',
          text: 'Planned. No validation rules have been implemented yet.',
        },
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'not-started',
        paragraphs: [
          'No test set has been run. The testing plan will use a held-out sample of invoices with known expected values, so extraction quality can be measured rather than assumed.',
        ],
        bullets: [
          'Field-level extraction accuracy against a labelled sample set: not started.',
          'Reconciliation of totals on a clean invoice: not started.',
          'Handling of a missing field without silent defaulting: not started.',
          'Handling of a supplier with an unseen layout: not started.',
          'End-to-end run producing held records for review: not started.',
        ],
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'verified',
        paragraphs: ['The honest state of a project that has not been started, and the build order I intend to follow.'],
        bullets: [
          'The project is not started. Nothing described above is implemented.',
          'No sample invoice dataset has been assembled, so extraction quality is unknown.',
          'No model has been selected, because selection should follow measurement.',
          'No downstream process is connected.',
          'Next: assemble a labelled sample set before writing any extraction logic, then measure extraction quality on it, then pick the extraction approach from the measurement.',
        ],
      },
    ],
    screenshots: [],
    links: [],
  },
]

/** Fixed case-study section order. */
export const CASE_STUDY_ORDER = [
  'problem',
  'workflow',
  'decisions',
  'safeguards',
  'evidence',
  'limitations',
] as const

export const CASE_STUDY_LABELS: Record<string, string> = {
  problem: 'The problem',
  workflow: 'How it works',
  decisions: 'Decision logic',
  safeguards: 'Exceptions and safeguards',
  evidence: 'Evidence and testing',
  limitations: 'Limitations and next improvements',
}

export const CASE_STUDY_STATUS_LABEL: Record<SectionStatus, string> = {
  verified: 'Implemented and verified',
  partial: 'Partial',
  planned: 'Designed, not built',
  'not-started': 'Not started',
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
