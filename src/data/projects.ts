/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PROJECT CONTENT
 * ──────────────────────────────────────────────────────────────────────────
 *  Every project card, case study and status badge on the site reads from this
 *  file. You never need to touch markup to update a project.
 *
 *  STATUS SEMANTICS (used everywhere)
 *    verified     : built and checked against a realistic test set.
 *    partial      : partially built; the section says what is and is not done.
 *    planned      : designed, not built.
 *    not-started  : nothing built yet.
 *
 *  Rule of thumb: if you cannot point at the current build and show it, do not
 *  write `verified`. Change the label to `partial` or `planned` and describe
 *  what is actually there.
 *
 *  HOW TO ADD A PROJECT
 *   1. Copy an existing `Project` object.
 *   2. Change `slug` (it becomes the URL: /projects/<slug>).
 *   3. Fill in the fourteen sections in the same order.
 *   4. Add it to the `projects` array at the bottom.
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
  /** Rendered as a callout next to the section heading. */
  note?: { tone: 'info' | 'warn' | 'grey'; text: string }
  /** Rendered as a two-column key/value table when both arrays are given. */
  table?: { keys: string[]; values: string[] }
}

export type ScreenshotSlot = {
  id: string
  /** Short label shown on the placeholder, e.g. "Workflow overview". */
  title: string
  /** Caption shown under a real screenshot. */
  caption: string
  /**
   * Real image path, e.g. "/screenshots/cod-01-workflow.png".
   * Leave undefined to render the labelled placeholder.
   */
  image?: string
  /** "tall" for 4:5 / 1:1 crops, "wide" for 16:10, "box" for 1:1. */
  ratio?: 'tall' | 'wide' | 'box'
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
  demo: {
    /** Real Loom URL, e.g. "https://www.loom.com/share/abc123". Leave "" for placeholder. */
    loomUrl: string
    /** Test scenarios demonstrated in the video. Empty until recorded. */
    scenarios: string[]
  }
  links: { label: string; href: string }[]
}

const commonTools = {
  n8n: 'n8n',
  airtable: 'Airtable',
  tally: 'Tally',
  gmail: 'Gmail',
}

export const projects: Project[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'cod-order-confirmation',
    name: 'COD Order Confirmation and Recovery System',
    summary:
      'A workflow prototype that prices cash-on-delivery orders, assesses risk, and sends a confirmation or cancellation link depending on eligibility.',
    status: 'done',
    statusLabel: 'Completed for the confirmed-order scenario',
    statusDetail:
      'The confirmation path is built and tested. Cancellation, reminder and recovery scenarios must each be verified individually before use.',
    tools: [commonTools.n8n, commonTools.airtable, commonTools.tally, commonTools.gmail],
    timeline: 'Built as a workflow prototype',
    overview:
      'Cash-on-delivery orders arrive without any payment captured up front. Each order has to be priced, checked against a risk rule, and either confirmed with the customer or cancelled before dispatch. Left to manual handling, mispriced or unconfirmed orders turn into failed deliveries and wasted courier attempts. This prototype moves that first decision point from a spreadsheet into a repeatable n8n workflow.',
    sections: [
      {
        id: 'overview',
        label: 'Project overview',
        status: 'verified',
        paragraphs: [
          'A Tally form captures a cash-on-delivery order. The submission triggers an n8n workflow that normalises the line items, computes the order total including delivery, applies a risk assessment rule, and then branches: eligible orders receive a confirmation link, ineligible orders receive a cancellation link. Either way the order record in Airtable is updated with the outcome, so there is a single source of truth for what was sent and when.',
          'The current build covers the confirmed-order path end to end. That is the scope that has been tested. The cancellation, reminder, duplicate and recovery paths are partially built and are described honestly below rather than presented as working.',
        ],
      },
      {
        id: 'problem',
        label: 'Operational problem being addressed',
        status: 'verified',
        paragraphs: [
          'Orders arrive through a form, a chat message or a spreadsheet entry, and each one is handled by hand. The person handling it has to re-do arithmetic that the order data already contains, make a judgement call about whether the order is worth confirming, and remember to send the customer a link.',
          'The failure modes are specific: a total that does not match the line items, an order confirmed without a working delivery address, and a customer who never receives a link and wonders where their order is. Each of those is an exception, and exceptions are exactly what a workflow that only handles the happy path will miss.',
        ],
        bullets: [
          'Repeated manual arithmetic on data that is already structured.',
          'Inconsistent eligibility decisions between one order and the next.',
          'No durable record of which link was sent, to whom, and when.',
          'Failed deliveries caused by unconfirmed or mispriced orders.',
        ],
      },
      {
        id: 'scope',
        label: 'Project objectives and scope',
        status: 'verified',
        paragraphs: [
          'The objective was narrow by design: take the first decision point of a cash-on-delivery order and make it deterministic, auditable and testable. Not every order-related process was in scope, and the build does not attempt to replace the courier handover or the payment reconciliation step.',
        ],
        bullets: [
          'Compute the order total from line items plus delivery fee.',
          'Apply a documented risk rule and produce a clear pass or fail.',
          'Send a confirmation link to eligible orders.',
          'Send a cancellation link to orders that fail eligibility.',
          'Update the Airtable order record with the outcome and timestamp.',
        ],
        note: {
          tone: 'info',
          text: 'Scope note: only the confirmed-order path has been implemented and tested. Reminder ladders, escalation to a human and duplicate-order recovery are not part of the current build.',
        },
      },
      {
        id: 'architecture',
        label: 'Workflow architecture',
        status: 'verified',
        paragraphs: [
          'The system is a single n8n workflow with one entry point and a small number of explicit branches. Data is kept in Airtable as the system of record, Tally as the intake surface, and Gmail as the delivery channel for the customer-facing links.',
          'The design follows a rule that applies to everything else in this portfolio: a workflow should have a defined contract at each boundary. The form has a contract. The branch has a contract. The email has a contract. Each one can be tested on its own without standing the whole system up.',
        ],
        table: {
          keys: ['Intake', 'Processing', 'Decision', 'Output', 'Record'],
          values: [
            'Tally form submission',
            'n8n workflow (normalise, price, assess)',
            'Confirmation branch vs cancellation branch',
            'Gmail message with confirmation or cancellation link',
            'Airtable order record updated with status',
          ],
        },
      },
      {
        id: 'tools',
        label: 'Tools and integrations',
        status: 'verified',
        paragraphs: [
          'These are the tools used in this build. Nothing outside this list is wired into the workflow.',
        ],
        bullets: [
          'n8n: workflow orchestration and the decision logic.',
          'Airtable: order records, status and audit trail.',
          'Tally: order intake form.',
          'Gmail: delivery of confirmation and cancellation links.',
        ],
      },
      {
        id: 'decisions',
        label: 'Key decision logic',
        status: 'verified',
        paragraphs: [
          'The branching is deliberately simple so that it can be reasoned about. Two rules produce the outcome, and both are written as explicit conditions rather than hidden inside a model call.',
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
        id: 'io',
        label: 'Input, processing and output',
        status: 'verified',
        paragraphs: ['The boundaries below are what the workflow actually consumes and produces.'],
        table: {
          keys: ['Input', 'Normalisation', 'Calculation', 'Output'],
          values: [
            'Customer name, delivery address, line items (product, quantity, unit price), delivery fee, order reference',
            'Trim text fields, coerce quantities to numbers, reject rows with missing product or quantity',
            'Sum(quantity x unit price) + delivery fee, then apply the eligibility rule',
            'Gmail message with link, Airtable status update, timestamped record of the decision',
          ],
        },
      },
      {
        id: 'validation',
        label: 'Validation and error handling',
        status: 'partial',
        paragraphs: [
          'Validation is applied before any calculation runs, because a wrong total is cheaper to catch than a wrong email. Anything that cannot be parsed is stopped and recorded rather than silently skipped.',
        ],
        bullets: [
          'Required fields are checked before pricing: name, address, at least one line item.',
          'Quantities are coerced to numbers; a non-numeric quantity stops the run and raises a record.',
          'A missing delivery fee is treated as an input problem rather than silently assumed to be zero.',
          'A failed send is recorded in the order record so it can be retried by hand.',
        ],
        note: {
          tone: 'warn',
          text: 'Partial: duplicate submission handling and automated retry are not yet implemented. Two identical form submissions will currently create two runs.',
        },
      },
      {
        id: 'testing',
        label: 'Test scenarios and verified results',
        status: 'partial',
        paragraphs: [
          'The confirmation path has been run against a controlled set of test orders. The scenarios below are labelled with the state they are actually in, so nothing is presented as verified when it has not been.',
        ],
        bullets: [
          'Single line item, normal price, correct total: implemented and verified.',
          'Multiple line items with different quantities: implemented and verified.',
          'Order that fails the eligibility rule receives the cancellation link: implemented, not yet verified against a full run.',
          'Non-numeric quantity is rejected and recorded: implemented, not yet verified.',
          'Duplicate submission is detected and suppressed: not started.',
          'Failed send triggers a retry: not started.',
        ],
        note: {
          tone: 'warn',
          text: 'These are test-run results from a prototype, not production telemetry. Treat them as evidence that the logic executes, not as evidence of business impact.',
        },
      },
      {
        id: 'limitations',
        label: 'Known limitations',
        status: 'verified',
        paragraphs: [
          'The honest list. Each of these is a real gap in the current build, not a future feature request.',
        ],
        bullets: [
          'No duplicate-order detection. Two identical submissions produce two workflow runs.',
          'No reminder ladder. If a customer does not confirm, nothing happens automatically.',
          'No escalation to a human for ambiguous orders. The binary branch sends either a confirmation or a cancellation.',
          'Single currency and a single delivery-fee model.',
          'Cancellation, reminder and recovery paths are not tested end to end.',
          'No monitoring or failure alerting. A stopped workflow would go unnoticed until someone checks.',
        ],
      },
      {
        id: 'next',
        label: 'What I would improve next',
        status: 'verified',
        paragraphs: [
          'In roughly the order I would do them. Each item exists because it closes a specific failure mode, not because it sounds impressive.',
        ],
        bullets: [
          'Add an idempotency key so a duplicate submission cannot create a second run.',
          'Introduce a reminder ladder with a hard stop, so unanswered confirmations expire deliberately.',
          'Add a third branch for orders that are too ambiguous to decide, routing them to a human queue instead of forcing a binary outcome.',
          'Record every send and every decision in a dedicated audit table rather than on the order record.',
          'Add execution log alerts so a stopped workflow is visible within minutes, not at the next order.',
        ],
      },
      {
        id: 'demo',
        label: 'Demonstration video',
        status: 'planned',
        paragraphs: [
          'A Loom walkthrough covering the confirmation path, the cancellation branch and the validation failures is planned. Recording it has not happened yet, so nothing is embedded below.',
        ],
        note: {
          tone: 'info',
          text: 'To add the video: set `demo.loomUrl` in src/data/projects.ts to the real Loom share link. The page will then embed the player automatically.',
        },
      },
      {
        id: 'visuals',
        label: 'Screenshots or technical visuals',
        status: 'partial',
        paragraphs: [
          'Neutral placeholders mark where workflow screenshots will go. No image is shown that could be mistaken for evidence from a real implementation.',
        ],
      },
      {
        id: 'docs',
        label: 'Relevant documentation or code links',
        status: 'not-started',
        paragraphs: ['No documentation or code has been published for this project yet.'],
        note: {
          tone: 'info',
          text: 'Documentation will be linked here once it exists. Set `links` in src/data/projects.ts to add entries.',
        },
      },
    ],
    screenshots: [
      { id: 'cod-01', title: 'Workflow overview', caption: 'The full n8n workflow, entry to exit.', ratio: 'wide' },
      { id: 'cod-02', title: 'Decision branch', caption: 'Confirmation vs cancellation branch conditions.', ratio: 'wide' },
      { id: 'cod-03', title: 'Order record', caption: 'Airtable record showing the computed total and status.', ratio: 'box' },
      { id: 'cod-04', title: 'Validation failures', caption: 'Runs rejected by the input checks.', ratio: 'box' },
    ],
    demo: { loomUrl: '', scenarios: [] },
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'lead-qualification',
    name: 'Lead Qualification System',
    summary:
      'A workflow prototype for structuring incoming leads and supporting qualification and follow-up decisions.',
    status: 'done',
    statusLabel: 'Completed as a project prototype',
    statusDetail:
      'Treated as a learning build, not an deployed system. Verify each capability against the current code before describing it as implemented.',
    tools: [commonTools.n8n, commonTools.airtable, commonTools.tally],
    timeline: 'Built as a workflow prototype',
    overview:
      'Leads arrive scattered across a form, direct messages and pasted text. Left unstructured, they are triaged by whoever is free, which means inconsistent classification and follow-ups that depend on memory. This prototype takes that messy intake and turns it into a structured record with a classification attached, so a follow-up decision can be made consistently.',
    sections: [
      {
        id: 'overview',
        label: 'Project overview',
        status: 'partial',
        paragraphs: [
          'A Tally form and a direct-message channel both feed an n8n workflow. The workflow normalises whatever arrived into a consistent shape, applies a classification rule, and writes the result to Airtable with an owner and a next action.',
          'This is a prototype built to learn how lead qualification behaves in practice. It is not connected to a live CRM and it does not represent a customer engagement.',
        ],
        note: {
          tone: 'warn',
          text: 'Prototype status. Capabilities below are labelled individually. Correct the labels in src/data/projects.ts as the build changes.',
        },
      },
      {
        id: 'problem',
        label: 'Operational problem being addressed',
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
        id: 'scope',
        label: 'Project objectives and scope',
        status: 'partial',
        paragraphs: [
          'The prototype covers intake, structuring and a first-pass classification rule. Duplicate detection and the daily follow-up digest were considered and are not part of the current build.',
        ],
        bullets: [
          'Normalise heterogeneous enquiry text into a consistent record shape.',
          'Apply a deterministic classification rule rather than a free-form label.',
          'Route the record to an owner and set a next action.',
        ],
        note: {
          tone: 'info',
          text: 'Explicitly out of scope for this build: duplicate detection, conversion tracking and any revenue reporting.',
        },
      },
      {
        id: 'architecture',
        label: 'Workflow architecture',
        status: 'partial',
        paragraphs: [
          'Two entry points converge on the same normalisation step. From there the flow is linear: validate, classify, write, notify.',
        ],
        table: {
          keys: ['Intake', 'Normalisation', 'Classification', 'Record', 'Follow-up'],
          values: [
            'Tally form, direct message',
            'Extract name, contact, product interest, source',
            'Deterministic rule against defined buckets',
            'Airtable record with owner and next action',
            'Manual for now; digest is planned, not built',
          ],
        },
      },
      {
        id: 'tools',
        label: 'Tools and integrations',
        status: 'partial',
        paragraphs: ['Tools used in the current prototype build.'],
        bullets: [
          'n8n: orchestration, text normalisation and the classification rule.',
          'Airtable: lead records, classification, owner, next action.',
          'Tally: lead intake form.',
        ],
      },
      {
        id: 'decisions',
        label: 'Key decision logic',
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
        id: 'io',
        label: 'Input, processing and output',
        status: 'partial',
        paragraphs: ['Boundaries of the prototype.'],
        table: {
          keys: ['Input', 'Extraction', 'Classification', 'Output'],
          values: [
            'Free-text enquiry, optional contact detail, optional product interest, source channel',
            'Name, contact, product interest, source, enquiry type',
            'Bucket assignment plus an incomplete flag where fields are missing',
            'Airtable record with owner, classification and next action',
          ],
        },
      },
      {
        id: 'validation',
        label: 'Validation and error handling',
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
        id: 'testing',
        label: 'Test scenarios and verified results',
        status: 'partial',
        paragraphs: ['Results are prototype test-run outcomes, not business metrics.'],
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
        label: 'Known limitations',
        status: 'verified',
        paragraphs: ['The current state of the prototype, without softening.'],
        bullets: [
          'No duplicate detection.',
          'No daily follow-up digest; follow-up is still a manual task.',
          'Classification buckets are a first pass and are likely to need expansion.',
          'Text extraction handles a narrow range of phrasings.',
          'No connection to a live CRM or marketing tool.',
          'No monitoring, so a stopped workflow would be noticed only when leads stop arriving.',
        ],
      },
      {
        id: 'next',
        label: 'What I would improve next',
        status: 'verified',
        paragraphs: ['Ordered by the failure mode each item closes.'],
        bullets: [
          'Add duplicate detection on a contact-detail key before anything else, because duplicate records poison every later step.',
          'Build the daily digest once the record shape is stable, so the digest reflects a settled structure.',
          'Expand and version the classification rule set, keeping the rule in config so changes are reviewable.',
          'Add an escalation path for records held in review, so nothing sits unhandled.',
          'Add execution alerts so a stopped workflow is visible immediately.',
        ],
      },
      {
        id: 'demo',
        label: 'Demonstration video',
        status: 'planned',
        paragraphs: ['A Loom walkthrough of intake, classification and the review path is planned but not recorded.'],
        note: {
          tone: 'info',
          text: 'To add the video: set `demo.loomUrl` in src/data/projects.ts to the real Loom share link.',
        },
      },
      {
        id: 'visuals',
        label: 'Screenshots or technical visuals',
        status: 'partial',
        paragraphs: [
          'Placeholders mark where screenshots will go. No fabricated screenshots are shown.',
        ],
      },
      {
        id: 'docs',
        label: 'Relevant documentation or code links',
        status: 'not-started',
        paragraphs: ['No documentation or code has been published for this project yet.'],
      },
    ],
    screenshots: [
      { id: 'lead-01', title: 'Workflow overview', caption: 'Intake to record, both entry points.', ratio: 'wide' },
      { id: 'lead-02', title: 'Classification rule', caption: 'The condition set evaluated in order.', ratio: 'wide' },
      { id: 'lead-03', title: 'Lead record', caption: 'Airtable record with classification and next action.', ratio: 'box' },
      { id: 'lead-04', title: 'Held for review', caption: 'Incomplete records held rather than discarded.', ratio: 'box' },
    ],
    demo: { loomUrl: '', scenarios: [] },
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'returns-handler',
    name: 'Returns Handler',
    summary:
      'A workflow designed to apply return-policy rules consistently, evaluate requests, and escalate cases that need human review.',
    status: 'progress',
    statusLabel: 'In progress',
    statusDetail:
      'Being built in stages. Request intake and input validation are partially implemented; policy enforcement, conflicting-instruction handling and human escalation are designed but not yet built or tested.',
    tools: [commonTools.n8n, commonTools.airtable, commonTools.tally],
    timeline: 'In progress',
    overview:
      'Returns are the case where a workflow has to be more careful than the process it replaces. A customer is asking for something back, the policy may not cover it, and the customer may give instructions that contradict each other. This project is being built to apply the policy rules consistently while keeping an explicit exit to a human for anything the rules cannot settle.',
    sections: [
      {
        id: 'overview',
        label: 'Project overview',
        status: 'partial',
        paragraphs: [
          'The intended system takes a return request, validates that it is complete, checks it against the return policy, and either produces a decision or escalates the case. Requests that conflict with themselves, that fall outside the policy, or that involve a disputed payment are meant to reach a person rather than an automated answer.',
          'This is a build in progress. The sections below are labelled with what is actually implemented and what is still only designed.',
        ],
        note: {
          tone: 'warn',
          text: 'In progress. Do not read any section below as a working system. The labels mark the current state of the build.',
        },
      },
      {
        id: 'problem',
        label: 'Operational problem being addressed',
        status: 'verified',
        paragraphs: [
          'Return decisions are made conversationally, one message at a time, usually by whoever is available. That means the same request can get a different answer depending on the day, on the order history the person can see at that moment, and on how persistent the customer is. It also means there is no consistent record of which policy rule was applied and why.',
        ],
        bullets: [
          'The same return request can receive different answers on different days.',
          'Policy exceptions are granted conversationally and leave no trace.',
          'Conflicting customer instructions are resolved by whoever reads them first.',
          'No record of the rule applied to a decision.',
        ],
      },
      {
        id: 'scope',
        label: 'Project objectives and scope',
        status: 'partial',
        paragraphs: [
          'The objective is consistency and traceability, not speed. A return workflow that answers faster but decides differently from the last time is not an improvement.',
        ],
        bullets: [
          'Validate that a return request contains what the policy needs before evaluating it.',
          'Apply the return policy as explicit, readable rules.',
          'Escalate cases that the policy cannot settle to a human queue.',
          'Record the rule applied, the inputs it used and the outcome.',
        ],
        note: {
          tone: 'info',
          text: 'Designed scope. Policy enforcement, conflicting-instruction handling and escalation are development objectives and are not yet implemented or tested.',
        },
      },
      {
        id: 'architecture',
        label: 'Workflow architecture',
        status: 'partial',
        paragraphs: [
          'The planned design is a staged pipeline rather than a single branch, because the expensive cases are the ones that need to be recognised early and passed on.',
        ],
        table: {
          keys: [
            'Request intake',
            'Validation',
            'Policy evaluation',
            'Conflict detection',
            'Human escalation',
            'Outcome record',
          ],
          values: [
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
          text: 'The table above shows the intended design. Stages marked as designed but not built are listed as such in the validation and testing sections.',
        },
      },
      {
        id: 'tools',
        label: 'Tools and integrations',
        status: 'partial',
        paragraphs: ['Tools in use for the current build.'],
        bullets: [
          'n8n: workflow orchestration and policy rule evaluation.',
          'Airtable: return requests, policy rule set, escalation queue.',
          'Tally: return request intake form.',
        ],
      },
      {
        id: 'decisions',
        label: 'Key decision logic',
        status: 'partial',
        paragraphs: [
          'The decision logic is being written as ordered, explicit rules. Two categories matter more than the rest, because they are where automation should not decide alone.',
        ],
        bullets: [
          'Policy rules are evaluated in a fixed order so the outcome is deterministic and reviewable.',
          'A request that matches no policy rule is escalated rather than defaulted.',
          'Conflicting instructions are detected before a decision is produced, and the conflict is recorded as the reason for escalation.',
          'Unusual refund amounts, disputed payments and policy edge cases are designated for human review rather than automatic approval.',
        ],
        note: {
          tone: 'warn',
          text: 'Partial: the rule order is designed and documented. Conflict detection and the escalation branch are not yet implemented.',
        },
      },
      {
        id: 'io',
        label: 'Input, processing and output',
        status: 'partial',
        paragraphs: ['The boundaries the finished system is intended to use.'],
        table: {
          keys: ['Input', 'Validation', 'Evaluation', 'Output'],
          values: [
            'Order reference, customer message, reason for return, requested action',
            'Required fields present and internally consistent',
            'Policy rule set applied in order, with conflict detection',
            'Decision record, escalation entry where applicable, customer response',
          ],
        },
      },
      {
        id: 'validation',
        label: 'Validation and error handling',
        status: 'partial',
        paragraphs: [
          'Validation is the first stage because a policy decision made on incomplete input is not a decision, it is a guess. The current build checks presence and format; the remaining work is checking consistency against the order record.',
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
        id: 'testing',
        label: 'Test scenarios and verified results',
        status: 'partial',
        paragraphs: ['Test results are prototype outcomes and are not business metrics.'],
        bullets: [
          'Complete request passes validation and reaches policy evaluation: implemented, not yet verified.',
          'Request with a missing required field is rejected and recorded: implemented, not yet verified.',
          'Request outside the policy is escalated: not started.',
          'Self-contradicting instructions are detected and escalated: not started.',
          'Disputed payment is routed to a human: not started.',
          'Escalation notification reaches the owner: not started.',
        ],
      },
      {
        id: 'limitations',
        label: 'Known limitations',
        status: 'verified',
        paragraphs: ['The current state of the build.'],
        bullets: [
          'Policy enforcement is designed, not implemented.',
          'Conflicting customer instructions are not yet detected.',
          'Human escalation is designed as a branch but is not wired up.',
          'No test set has been run end to end against a realistic returns dataset.',
          'No monitoring or failure alerting on the workflow.',
        ],
      },
      {
        id: 'next',
        label: 'What I would improve next',
        status: 'verified',
        paragraphs: ['In the order that closes failure modes.'],
        bullets: [
          'Finish validation before policy evaluation, because a wrong decision on incomplete input compounds.',
          'Implement conflict detection as an explicit stage, so contradictions are caught before an answer is sent.',
          'Wire the escalation branch to a real queue with an owner and a deadline, so an escalated case cannot disappear.',
          'Build a test set of realistic returns including the edge cases, and run it against every rule.',
          'Add an audit record of the rule applied per decision.',
        ],
      },
      {
        id: 'demo',
        label: 'Demonstration video',
        status: 'planned',
        paragraphs: ['A Loom walkthrough will be recorded after the policy enforcement and escalation stages are complete.'],
        note: {
          tone: 'info',
          text: 'Demonstration coming soon. Set `demo.loomUrl` in src/data/projects.ts when the recording is ready.',
        },
      },
      {
        id: 'visuals',
        label: 'Screenshots or technical visuals',
        status: 'partial',
        paragraphs: ['Placeholders mark where screenshots will go.'],
      },
      {
        id: 'docs',
        label: 'Relevant documentation or code links',
        status: 'not-started',
        paragraphs: ['No documentation or code has been published for this project yet.'],
      },
    ],
    screenshots: [
      { id: 'returns-01', title: 'Workflow overview', caption: 'Staged pipeline: intake, validation, evaluation, escalation.', ratio: 'wide' },
      { id: 'returns-02', title: 'Policy rule set', caption: 'Ordered return-policy conditions.', ratio: 'wide' },
      { id: 'returns-03', title: 'Escalation queue', caption: 'Cases held for human review.', ratio: 'box' },
      { id: 'returns-04', title: 'Conflict detection', caption: 'Self-contradicting instruction handling.', ratio: 'box' },
    ],
    demo: { loomUrl: '', scenarios: [] },
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'invoice-extractor',
    name: 'Invoice Extractor',
    summary:
      'A planned document-processing workflow for extracting invoice fields, validating them, and flagging missing or uncertain data.',
    status: 'planned',
    statusLabel: 'Planned',
    statusDetail:
      'Not started. The design below describes intended behaviour only and should not be read as implemented functionality.',
    tools: [commonTools.n8n],
    timeline: 'Planned: not started',
    overview:
      'Invoices arrive as files and pastes with no consistent layout. The intended workflow extracts structured fields, validates them against each other and against the source document, and marks the records that need a human before they reach any downstream process. The point of the design is to make uncertainty visible rather than to force a confident answer out of an unreliable input.',
    sections: [
      {
        id: 'overview',
        label: 'Project overview',
        status: 'planned',
        paragraphs: [
          'This is a plan, not a build. The intended approach is an extraction step, a validation step and an explicit output contract, with every record that cannot be validated marked rather than guessed.',
          'Nothing described here has been implemented. The sections below record the design decisions so they can be reviewed before any code is written.',
        ],
        note: {
          tone: 'warn',
          text: 'Planned. No functionality described below has been implemented or tested. This page documents intended behaviour only.',
        },
      },
      {
        id: 'problem',
        label: 'Operational problem being addressed',
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
        id: 'scope',
        label: 'Project objectives and scope',
        status: 'planned',
        paragraphs: [
          'The objective is a validated extraction, not a perfect one. A record that cannot be validated should be visibly marked as needing review rather than quietly completed.',
        ],
        bullets: [
          'Extract supplier, invoice number, date, line items, amounts and tax from varied layouts.',
          'Validate extracted fields against each other and against the document.',
          'Flag missing, inconsistent or low-confidence fields.',
          'Prepare records for a downstream process, or hold them for review.',
        ],
        note: {
          tone: 'info',
          text: 'Designed scope, not built scope. The scope will be revisited once the first extraction run against a real sample shows what is actually reliable.',
        },
      },
      {
        id: 'architecture',
        label: 'Workflow architecture',
        status: 'planned',
        paragraphs: [
          'The intended pipeline is short and each stage has a defined output contract, so a failure is attributable to a specific stage.',
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
            'Model or rule based extraction into a fixed shape',
            'Cross-field and document-level checks',
            'Flag fields that are missing or uncertain',
            'Validated record, or held record for review',
          ],
        },
      },
      {
        id: 'tools',
        label: 'Tools and integrations',
        status: 'planned',
        paragraphs: [
          'The intended stack. Nothing is wired up yet.',
        ],
        bullets: [
          'n8n: orchestration and document handling.',
          'Model API for field extraction, chosen after testing extraction quality on a sample set.',
          'Airtable: extracted records and review queue.',
          'A vector store for supplier-specific layout notes, if layout variation proves too broad for direct extraction.',
        ],
        note: {
          tone: 'grey',
          text: 'Tooling decisions will be made from measured extraction quality on a real sample, not from preference.',
        },
      },
      {
        id: 'decisions',
        label: 'Key decision logic',
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
        id: 'io',
        label: 'Input, processing and output',
        status: 'planned',
        paragraphs: ['The intended boundaries of the system.'],
        table: {
          keys: ['Input', 'Extraction', 'Validation', 'Output'],
          values: [
            'Invoice file (PDF, image) or pasted text',
            'Supplier, invoice number, date, currency, line items, amounts, tax',
            'Cross-field and document-level consistency checks',
            'Validated record or held record with the failing checks listed',
          ],
        },
      },
      {
        id: 'validation',
        label: 'Validation and error handling',
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
        id: 'testing',
        label: 'Test scenarios and verified results',
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
        label: 'Known limitations',
        status: 'verified',
        paragraphs: ['The honest state of a project that has not been started.'],
        bullets: [
          'The project is not started. Nothing described above is implemented.',
          'No sample invoice dataset has been assembled, so extraction quality is unknown.',
          'No model has been selected, because selection should follow measurement.',
          'No downstream process is connected.',
        ],
      },
      {
        id: 'next',
        label: 'What I would improve next',
        status: 'planned',
        paragraphs: ['The build order I intend to follow.'],
        bullets: [
          'Assemble a sample set of invoices with labelled expected values before writing any extraction logic.',
          'Measure extraction quality on that set, then pick the extraction approach from the measurement.',
          'Build the validation rules as a separate, testable stage.',
          'Add the review queue and the confidence record before any downstream process is connected.',
          'Add monitoring and alerting once the pipeline runs, so a silent failure is not possible.',
        ],
      },
      {
        id: 'demo',
        label: 'Demonstration video',
        status: 'planned',
        paragraphs: ['No demonstration exists. A walkthrough will be recorded once the extraction and validation stages are working.'],
        note: {
          tone: 'info',
          text: 'Demonstration coming soon. Set `demo.loomUrl` in src/data/projects.ts when the recording is ready.',
        },
      },
      {
        id: 'visuals',
        label: 'Screenshots or technical visuals',
        status: 'not-started',
        paragraphs: ['No visuals exist yet. Placeholders are shown so the page structure is complete.'],
      },
      {
        id: 'docs',
        label: 'Relevant documentation or code links',
        status: 'not-started',
        paragraphs: ['No documentation or code exists for this project yet.'],
      },
    ],
    screenshots: [
      { id: 'inv-01', title: 'Workflow overview', caption: 'Intended pipeline: intake, extraction, validation, output.', ratio: 'wide' },
      { id: 'inv-02', title: 'Extraction result', caption: 'Fields with per-field confidence.', ratio: 'wide' },
      { id: 'inv-03', title: 'Validation checks', caption: 'Cross-field reconciliation rules.', ratio: 'box' },
      { id: 'inv-04', title: 'Held for review', caption: 'Records failing validation with reasons.', ratio: 'box' },
    ],
    demo: { loomUrl: '', scenarios: [] },
    links: [],
  },
]

/** Stable numeric index for the fixed case-study template. */
export const CASE_STUDY_ORDER = [
  'overview',
  'problem',
  'scope',
  'architecture',
  'tools',
  'decisions',
  'io',
  'validation',
  'testing',
  'limitations',
  'next',
  'demo',
  'visuals',
  'docs',
] as const

export const CASE_STUDY_LABELS: Record<string, string> = {
  overview: 'Project overview',
  problem: 'Operational problem being addressed',
  scope: 'Project objectives and scope',
  architecture: 'Workflow architecture',
  tools: 'Tools and integrations',
  decisions: 'Key decision logic',
  io: 'Input, processing and output',
  validation: 'Validation and error handling',
  testing: 'Test scenarios and verified results',
  limitations: 'Known limitations',
  next: 'What I would improve next',
  demo: 'Demonstration video',
  visuals: 'Screenshots or technical visuals',
  docs: 'Relevant documentation or code links',
}

export const CASE_STUDY_STATUS_LABEL: Record<SectionStatus, string> = {
  verified: 'Implemented and checked',
  partial: 'Partial',
  planned: 'Designed, not built',
  'not-started': 'Not started',
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const statusTone: Record<StatusKey, string> = {
  done: 'done',
  progress: 'progress',
  planned: 'planned',
}
