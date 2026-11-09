/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PROJECT CONTENT
 * ──────────────────────────────────────────────────────────────────────────
 *  Four projects exactly:
 *    1. COD Order Confirmation and Risk Assessment
 *    2. Returns and Refunds Policy Handler
 *    3. AI-Assisted Lead Qualification and Routing
 *    4. GlowLab E-commerce Lifecycle Automation Prototype
 *
 *  No additional completed projects are invented. The fourth project is
 *  explicitly labelled a prototype.
 *
 *  CATEGORY TAG SEMANTICS — used by the project-library filter UI.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type SectionStatus = 'verified' | 'partial' | 'planned' | 'not-started'
export type StatusKey = 'done' | 'progress' | 'planned'
export type ProjectCategory =
  | 'ecommerce-ops'
  | 'customer-experience'
  | 'lead-management'
  | 'ai-data'

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
  image: string
  title: string
  caption: string
}

export type Project = {
  slug: string
  name: string
  /** One-line plain-language problem (business-focused, card surface). */
  businessProblem: string
  /** One-line plain-language "what the system does". */
  systemDoes: string
  summary: string
  status: StatusKey
  statusLabel: string
  statusDetail: string
  tools: string[]
  timeline: string
  categories: ProjectCategory[]
  overview: string
  /** Whether the interactive COD simulator should be shown on this case study. */
  hasSimulator?: boolean
  sections: CaseStudySection[]
  screenshots: ScreenshotSlot[]
  links: { label: string; href: string }[]
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory | 'all', string> = {
  all: 'All Projects',
  'ecommerce-ops': 'E-commerce Operations',
  'customer-experience': 'Customer Experience',
  'lead-management': 'Lead Management',
  'ai-data': 'AI and Data Processing',
}

export const projects: Project[] = [
  // ──────────────── 1. COD ORDER CONFIRMATION & RISK ASSESSMENT ──────────
  {
    slug: 'order-confirmation-risk-check',
    name: 'COD Order Confirmation and Risk Assessment',
    businessProblem:
      'Cash-on-delivery orders had to be priced and checked by hand before dispatch, producing mispriced totals and unconfirmed orders.',
    systemDoes:
      'Prices each order, applies a fixed risk rule, sends the customer a confirmation or cancellation link, and records the outcome in Airtable.',
    summary:
      'A workflow for cash-on-delivery orders: it prices each order, applies a risk rule, and sends the customer a confirmation or cancellation link depending on eligibility.',
    status: 'done',
    statusLabel: 'Completed · tested',
    statusDetail:
      'The order-processing path is built and has been run against test orders. Cancellation, reminder and duplicate-order handling are not fully tested, and the sections below say so where relevant.',
    tools: ['n8n', 'Airtable', 'Tally', 'Gmail'],
    timeline: 'Completed build',
    categories: ['ecommerce-ops', 'customer-experience'],
    hasSimulator: true,
    overview:
      'Cash-on-delivery orders arrive with no payment captured up front. Each order has to be priced, checked against a risk rule, and either confirmed with the customer or cancelled before dispatch. Left to manual handling, mispriced or unconfirmed orders turn into failed deliveries and wasted courier attempts. This system moves that first decision point from a spreadsheet into a repeatable n8n workflow.',
    sections: [
      {
        id: 'problem',
        label: 'The operational problem',
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
        label: 'What the system does',
        status: 'verified',
        paragraphs: [
          'A Tally form captures the order. Submission triggers an n8n workflow that normalises the line items, computes the total including delivery, applies the risk assessment rule, and then branches: eligible orders receive a confirmation link, ineligible orders receive a cancellation link. Either way the Airtable order record is updated with the outcome and a timestamp, so there is a single source of truth for what was sent and when.',
          'The design follows one rule throughout: a workflow has a defined contract at each boundary. The form has a contract. The branch has a contract. The email has a contract. Each one can be tested on its own without standing the whole system up.',
        ],
        table: {
          keys: ['Intake', 'Normalisation', 'Calculation', 'Decision', 'Output', 'Record'],
          values: [
            'Tally form submission triggers the workflow via webhook',
            'Trim text fields, coerce quantities to numbers, reject rows missing product or quantity',
            'Sum of (quantity × unit price) across line items, plus delivery fee',
            'Apply the configured risk / eligibility rule to determine the branch',
            'Gmail message carrying the confirmation or cancellation link',
            'Airtable order record updated with status, outcome and timestamp',
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
          'Total calculation: sum of (quantity × unit price) across line items, plus the delivery fee.',
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
        label: 'Validation, exceptions and safeguards',
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
          'The order-processing path has been run against a controlled set of test orders. The scenarios below are labelled with the state they are actually in, so nothing is presented as verified when it has not been. Try the interactive simulator above to walk through the decision rules yourself.',
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

  // ──────────────── 2. RETURNS AND REFUNDS POLICY HANDLER ────────────────
  {
    slug: 'returns-refunds-handler',
    name: 'Returns and Refunds Policy Handler',
    businessProblem:
      'Return decisions were made conversationally, producing inconsistent answers and policy exceptions with no record.',
    systemDoes:
      'Validates return requests, applies policy rules in a fixed order, and escalates the cases that need a person rather than an automated answer.',
    summary:
      'A workflow that applies return-policy rules consistently, evaluates requests, and escalates the cases that need a person rather than an automated answer.',
    status: 'done',
    statusLabel: 'Completed build',
    statusDetail:
      'Completed as a standalone build. The behaviours below are labelled individually: policy evaluation and escalation are implemented, while conflict detection between contradictory customer instructions is designed but not yet built.',
    tools: ['n8n', 'Airtable', 'Tally'],
    timeline: 'Completed build',
    categories: ['ecommerce-ops', 'customer-experience'],
    overview:
      'Returns are the case where a workflow has to be more careful than the process it replaces. A customer is asking for something back, the policy may not cover it, and the customer may give instructions that contradict each other. This system applies the policy rules consistently while keeping an explicit exit to a human for anything the rules cannot settle.',
    sections: [
      {
        id: 'problem',
        label: 'The operational problem',
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
        label: 'What the system does',
        status: 'partial',
        paragraphs: [
          'The system is a staged pipeline rather than a single branch, because the expensive cases are the ones that need to be recognised early and passed on. A return request is validated for completeness, evaluated against the policy rules in a fixed order, and either produces a decision or is escalated.',
        ],
        table: {
          keys: ['Stage', 'What it does'],
          values: [
            'Request intake',
            'Tally form and message channel',
            'Validation',
            'Confirm the request has what the policy requires',
            'Policy evaluation',
            'Apply the return policy rules in order',
            'Conflict detection',
            'Detect self-contradicting instructions (designed, not built)',
            'Human escalation',
            'Route unresolved cases to a person',
            'Outcome record',
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
        label: 'Validation, exceptions and safeguards',
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

  // ──────────────── 3. AI-ASSISTED LEAD QUALIFICATION & ROUTING ──────────
  {
    slug: 'lead-qualification',
    name: 'AI-Assisted Lead Qualification and Routing',
    businessProblem:
      'Leads arrived scattered across channels with no shared format, so classification was inconsistent and follow-up depended on memory.',
    systemDoes:
      'Normalises incoming enquiries, classifies them against deterministic criteria, marks incomplete records, and sets a next action for follow-up.',
    summary:
      'A workflow that structures incoming leads, classifies them against defined criteria and sets a next action for sales follow-up. Incomplete or unclassifiable records are held for review rather than forced into a bucket.',
    status: 'done',
    statusLabel: 'Completed build',
    statusDetail:
      'Completed as a standalone build. Capabilities are labelled individually below; duplicate detection and the follow-up digest were considered and are not part of the current build.',
    tools: ['n8n', 'Airtable', 'Tally'],
    timeline: 'Completed build',
    categories: ['lead-management', 'ai-data'],
    overview:
      'Leads arrive scattered across a form, direct messages and pasted text. Left unstructured, they are triaged by whoever is free, which means inconsistent classification and follow-ups that depend on memory. This system takes that messy intake and turns it into a structured record with a classification attached, so a follow-up decision can be made consistently.',
    sections: [
      {
        id: 'problem',
        label: 'The operational problem',
        status: 'verified',
        paragraphs: [
          'Enquiries arrive with no consistent shape. Some have a name and a product interest, some are a sentence with no contact detail, and some are a repeated question that was already answered. Classification happens in someone\u2019s head, and the record of who was contacted and when lives in chat history.',
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
        label: 'What the system does',
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
          text: 'Prototype status. The current build covers intake, structuring and a first-pass classification rule.',
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
        label: 'Validation, exceptions and safeguards',
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
        label: 'Limitations and next improvements',
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

  // ──────────────── 4. GLOWLAB E-COMMERCE LIFECYCLE PROTOTYPE ────────────
  {
    slug: 'glowlab-lifecycle',
    name: 'GlowLab E-commerce Lifecycle Automation Prototype',
    businessProblem:
      'A skincare store\u2019s post-purchase and abandoned-cart follow-up was manual, so lifecycle messages went out inconsistently or not at all.',
    systemDoes:
      'A prototype lifecycle engine that listens for order events, applies segmentation rules and schedules timed follow-up messages with human-review exits.',
    summary:
      'A prototype lifecycle automation for a fictional skincare store: abandoned-cart reminders, post-purchase sequences and re-engagement messages triggered by customer events rather than a generic schedule. Built as a demonstration prototype, not connected to a live store.',
    status: 'progress',
    statusLabel: 'Prototype · in progress',
    statusDetail:
      'This is a design and working prototype built to demonstrate lifecycle automation architecture. It is not connected to a live Shopify store, has not processed real customer data, and does not send real customer emails. The sections below state the state of each piece honestly.',
    tools: ['n8n', 'Airtable', 'Tally', 'Gmail'],
    timeline: 'Prototype in progress',
    categories: ['ecommerce-ops', 'customer-experience', 'ai-data'],
    overview:
      'GlowLab is a prototype e-commerce lifecycle automation that demonstrates how order events can drive personalised follow-up without manual scheduling. The system handles abandoned-cart nudges, post-purchase check-ins and re-engagement sequences, with explicit rules about which messages go out when — and which cases stop at a person. It is a working prototype built in n8n, not a production store integration.',
    sections: [
      {
        id: 'problem',
        label: 'The operational problem',
        status: 'partial',
        paragraphs: [
          'In many small e-commerce operations, follow-up after a customer places an order — or nearly places one — depends on someone remembering to send a message. Abandoned-cart reminders go out late, post-purchase check-ins are skipped during busy weeks, and win-back messages are sent to customers who should not receive them.',
          'The prototype targets a fictional skincare brand (GlowLab) and is built around the operational shape of that problem: events happen at different moments in a customer relationship, and each event should produce a message timed to that moment, not to a generic calendar.',
        ],
        bullets: [
          'Abandoned-cart follow-up depends on someone noticing.',
          'Post-purchase messages are sent inconsistently or not at all.',
          'Customer segments are loose, leading to messages that do not fit the customer.',
          'Opt-outs and pauses are not honoured reliably across sequences.',
        ],
        note: {
          tone: 'warn',
          text: 'GlowLab is a fictional brand. This prototype has not been deployed for a real store.',
        },
      },
      {
        id: 'workflow',
        label: 'What the system does (prototype)',
        status: 'partial',
        paragraphs: [
          'The prototype listens for simulated order and cart events, normalises each event into a customer record with a timeline, applies a set of segmentation rules to determine which sequence the customer should enter, and schedules the next message. Messages are written to a queue in Airtable; the prototype does not yet send real email.',
        ],
        table: {
          keys: ['Event intake', 'Segmentation', 'Scheduling', 'Message queue', 'Exit conditions', 'Review queue'],
          values: [
            'Simulated cart and order events (Tally form, test webhook)',
            'Deterministic rules based on order value, recency and customer tag',
            'Wait nodes apply configured delays (1h, 24h, 7d, etc.)',
            'Messages staged in Airtable with status and timestamp',
            'Opt-out, recent-purchase and duplicate-send suppression',
            'Flags for customers with conflicting signals (e.g. already purchased)',
          ],
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'partial',
        paragraphs: [
          'Segmentation is explicit and deterministic; no model decides which message a customer receives. The rules are written so they can be read by a nontechnical stakeholder and tested individually.',
        ],
        bullets: [
          'A cart abandoned less than an hour ago does not trigger an immediate message — delay prevents pushiness and false "abandons".',
          'A customer who already purchased is removed from the abandoned-cart sequence to prevent an embarrassing reminder.',
          'Messages are skipped when the customer has replied or opted out since the sequence began.',
          'Customers marked VIP or requiring support are routed to a human review queue instead of entering an automated sequence.',
        ],
      },
      {
        id: 'safeguards',
        label: 'Validation, exceptions and safeguards',
        status: 'partial',
        paragraphs: [
          'Lifecycle messages are a reputational risk as much as an operational one. The prototype\u2019s safeguards focus on preventing sends that would look obviously wrong, and on suppressing messages that contradict recent customer behaviour.',
        ],
        bullets: [
          'Duplicate-send suppression: a customer cannot receive the same sequence message twice.',
          'Opt-out honoured before any send is scheduled.',
          'Recent-purchase check before cart-abandon reminders.',
          'Review-queue flag for ambiguous cases rather than a default send.',
        ],
        note: {
          tone: 'warn',
          text: 'Prototype safeguards are implemented in the n8n test flow. They have not been tested against high-volume event streams.',
        },
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'partial',
        paragraphs: [
          'The prototype has been exercised against a small set of simulated customer scenarios to verify branch behaviour. These are walkthrough tests, not production data.',
        ],
        bullets: [
          'Fresh abandoned cart schedules reminder after configured delay: implemented, walkthrough-verified.',
          'Customer purchases mid-sequence is suppressed from further reminders: implemented, walkthrough-verified.',
          'Opt-out is honoured before scheduling: implemented, walkthrough-verified.',
          'VIP customer routed to review queue instead of automated message: implemented, walkthrough-verified.',
          'Live Shopify integration via webhook: not started.',
          'Real email delivery (Gmail / ESP node): not started.',
          'Timezone-aware scheduling: not started.',
        ],
        note: {
          tone: 'info',
          text: 'These are prototype walkthrough results, not evidence of a live store\u2019s revenue impact. Nothing here should be read as a measured outcome.',
        },
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'verified',
        paragraphs: [
          'This is a working prototype built to demonstrate architecture and decision logic for lifecycle automation. It is not a production integration.',
        ],
        bullets: [
          'No live Shopify or storefront connection; events are simulated via Tally / test webhook.',
          'No real email sends — messages are staged in Airtable only.',
          'Scheduling is fixed-delay only; no timezone or send-time optimisation.',
          'Segmentation rules are first-pass and will need refinement with real data.',
          'No unsubscribe-management integration.',
          'No monitoring, deliverability tracking or analytics.',
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
  problem: 'Business overview',
  workflow: 'How the system works',
  decisions: 'Decision logic',
  safeguards: 'Validation, exceptions & safeguards',
  evidence: 'Evidence and testing',
  limitations: 'Limitations and next improvements',
}

export const CASE_STUDY_STATUS_LABEL: Record<SectionStatus, string> = {
  verified: 'Implemented and verified',
  partial: 'Partial',
  planned: 'Designed, not built',
  'not-started': 'Not started',
}

/** Filter categories that appear in the project library UI. */
export const FILTER_CATEGORIES: Array<{ id: ProjectCategory | 'all'; label: string }> = [
  { id: 'all', label: PROJECT_CATEGORY_LABELS.all },
  { id: 'ecommerce-ops', label: PROJECT_CATEGORY_LABELS['ecommerce-ops'] },
  { id: 'customer-experience', label: PROJECT_CATEGORY_LABELS['customer-experience'] },
  { id: 'lead-management', label: PROJECT_CATEGORY_LABELS['lead-management'] },
  { id: 'ai-data', label: PROJECT_CATEGORY_LABELS['ai-data'] },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
