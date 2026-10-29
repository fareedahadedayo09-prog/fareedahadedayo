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
  /** Optional note displayed beneath the caption. */
  note?: string
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
  loomUrl?: string
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'order-confirmation-risk-check',
    name: 'Order Confirmation and Risk-Check System',
    summary:
      'A cash-on-delivery order workflow that prices orders, checks risk, gathers delivery-date and availability confirmation, and routes high-risk orders to a team call.',
    status: 'progress',
    statusLabel: 'Working prototype',
    statusDetail: '',
    tools: ['n8n', 'Airtable', 'Tally', 'Gmail', 'Branded webhook pages'],
    timeline: 'Working prototype',
    overview:
      'A cash-on-delivery workflow for fictional store Zuri Gadgets. It captures and prices orders, checks risk, asks eligible customers to choose a delivery date and confirm availability, and routes high-risk orders to the team before dispatch.',
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'verified',
        paragraphs: [
          'Cash-on-delivery orders need to be priced, checked and confirmed before dispatch. Manual handling can lead to inconsistent risk decisions, missed customer responses and orders being sent without a suitable delivery plan.',
          'A confirmation without an agreed delivery date and confirmed customer availability can still lead to a failed delivery attempt.',
        ],
        bullets: [
          'Order totals and delivery fees need to be consistent.',
          'High-risk orders need a person to review them before dispatch.',
          'Customers need to confirm both a preferred delivery date and cash-on-delivery availability.',
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'partial',
        paragraphs: [
          'A Tally submission starts the n8n workflow. It validates the required details, calculates the order total and risk score, checks for an existing order, and records a valid new order in Airtable. Missing required details are rejected and the team is alerted.',
          'A high-risk order is saved as Call Required and sent to the team for a call. A valid, lower-risk order receives an email with a delivery-date confirmation link and a one-click cancellation option. The delivery link opens a branded page. After a valid response, the requested date, availability confirmation, response time and Confirmed status are saved to Airtable.',
          'A scheduled follow-up can send one reminder to unanswered orders and later route overdue orders to Call Required. This schedule is currently switched off and uses short demo intervals.',
        ],
        table: {
          keys: ['Intake', 'Validation and pricing', 'Risk check', 'Duplicate check', 'Customer response', 'Delivery details', 'Record'],
          values: [
            'Tally order submission',
            'Check required fields and calculate the order total',
            'Score the order and list the reasons for the score',
            'Look for an existing order before creating a new record',
            'Low-risk orders receive a delivery-date link and one-click cancellation option; high-risk orders go to the team for a call',
            'Customer selects a date 2 to 14 days ahead in Lagos time and confirms availability and cash payment',
            'Airtable stores the order, status, requested delivery date, availability confirmation and response time',
          ],
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'partial',
        paragraphs: [
          'The workflow uses explicit checks to decide what happens next. It does not send confirmation or cancellation emails for high-risk orders.',
        ],
        bullets: [
          'An order with missing required details is rejected and the team is alerted.',
          'A valid, lower-risk order receives the customer confirmation email.',
          'A high-risk order is set to Call Required and the team receives the risk reasons, score and call checklist.',
          'Confirming requires a delivery date between 2 and 14 days ahead and a checked box confirming availability and cash payment.',
          'The requested delivery date is stored separately from the business-approved date. The business can update Approved Delivery Date and Dispatch Status later.',
          'A one-click cancellation sets the order to Cancelled and displays the branded cancellation page.',
        ],
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'partial',
        paragraphs: [
          'The customer response link identifies the Airtable record and includes a secret token. Invalid or outdated links are rejected. Orders already Confirmed, Cancelled or Call Required show a notice instead of being changed again.',
        ],
        bullets: [
          'Required order details are checked before processing.',
          'The delivery form accepts dates only within the 2-to-14-day window and requires the availability checkbox.',
          'Invalid date or availability submissions return to the form with a message.',
          'The workflow checks for an existing order before creating a new record.',
          'A reminder is marked as sent to prevent it being repeated.',
          'Automated retries and failure alerting are not built.',
        ],
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'partial',
        paragraphs: [
          'The screenshots below show the high-risk team alert, the Airtable order records and the branded cancellation page. A Loom walkthrough is included with the case study.',
        ],
        bullets: [
          'High-risk alert: no customer email is sent; the team gets the reasons, risk score and a call button.',
          'Airtable: three test orders, three outcomes (Confirmed, Cancelled, Call Required).',
          'Cancellation page: a branded confirmation that names the customer and product.',
        ],
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'planned',
        paragraphs: [
          'The delivery form, its invalid-submission messages, the duplicate check, and the reminder and escalation paths still need end-to-end testing. The reminder schedule is switched off and its current intervals are for demonstration only.',
        ],
        bullets: [
          'Dispatch scheduling, rider or courier notifications and an approval workflow for Approved Delivery Date are not built.',
          'The unit price is passed through the order link in this prototype. A production version would read it from a product catalogue.',
          'Failure alerting and automated retries are not built.',
          'The workflow currently uses a single currency and a single delivery-fee model.',
          'Screenshots of the delivery date page and delivery confirmation page can be added after those paths are tested end to end.',
        ],
      },
    ],
    screenshots: [
      {
        id: 'cod-workflow-canvas',
        image: '/screenshots/cod-workflow-diagram.png',
        title: 'COD order-processing workflow',
        caption: 'Workflow canvas',
      },
      {
        id: 'cod-risk-alert',
        image: '/screenshots/cod-high-risk-alert.png',
        title: 'High-risk alert',
        caption: 'The team alert includes the order and customer details, risk score and reasons, a call button, and a checklist for the call.',
      },
      {
        id: 'cod-airtable-outcomes',
        image: '/screenshots/cod-three-outcomes-airtable.png',
        title: 'Airtable order records',
        caption: 'Three test orders have three outcomes: Confirmed, Cancelled and Call Required. Responded At is set only for the two orders with a customer response.',
      },
      {
        id: 'cod-cancellation-page',
        image: '/screenshots/cod-cancellation-page.png',
        title: 'Cancellation page',
        caption: 'The branded page names the customer and product and confirms the order was cancelled without a charge.',
      },
    ],
    loomUrl: 'https://www.loom.com/share/21e03fb607ea4f81a292ff88ec9f0184',
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'lead-qualification',
    name: 'Lead Qualification System',
    summary:
      'A lead qualification workflow that normalises solar enquiries, checks for duplicates, scores leads and routes them to a reply, priority alert or review.',
    status: 'progress',
    statusLabel: 'Workflow prototype',
    statusDetail: '',
    tools: ['n8n', 'Airtable', 'Gmail', 'AI model'],
    timeline: 'Workflow prototype',
    overview:
      'The BrightSun Solar workflow takes a new Airtable lead through field normalisation, duplicate checking and AI scoring, then routes it as Hot, Warm or Review. The uploaded workflow canvas marks the warm reply path as demonstrated and other branches as built but not demonstrated.',
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'partial',
        paragraphs: [
          'Incoming solar enquiries need to be structured, checked for duplicates and routed to an appropriate next step. The workflow diagram shows separate paths for priority leads, warm leads, and records that need review.',
        ],
        bullets: [
          'Lead details need to be normalised before scoring.',
          'Duplicate and incomplete enquiries need explicit handling.',
          'The team needs a distinct next action for hot, warm and review cases.',
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'partial',
        paragraphs: [
          'A new Airtable lead moves through n8n for field normalisation and a duplicate check. A non-duplicate lead is scored by an AI model, and the structured score is saved back to Airtable. n8n then routes the lead as Hot, Warm or Review.',
          'The diagram marks the warm path as demonstrated. It sends a personalised AI-written Gmail reply, alerts the team with the lead profile, and updates the AI Replied status in Airtable. A separate screenshot shows the hot-lead alert email. Review alerts, scoring fallback, the follow-up digest and error alert are shown as built but not demonstrated in the case study.'
        ],
        table: {
          keys: ['Intake', 'Normalisation', 'Duplicate check', 'Scoring', 'Routing', 'Warm path', 'Other paths'],
          values: [
            'New lead saved in Airtable',
            'n8n tidies and normalises lead fields',
            'Existing lead is marked as a duplicate and stops',
            'AI model returns a structured score saved to Airtable',
            'n8n assigns Hot, Warm or Review',
            'Gmail sends a personalised reply, alerts the team and updates the Airtable reply status',
            'Hot leads trigger a priority alert; unclear or incomplete leads trigger a review alert',
          ],
        },
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'partial',
        paragraphs: [
          'The score determines a Hot, Warm or Review route. The workflow diagram also shows a fallback to review if scoring fails.',
        ],
        bullets: [
          'A duplicate is marked in Airtable and stopped before scoring.',
          'A scoring error follows a fallback path to review.',
          'Hot leads are routed to a priority alert for the team.',
          'Warm leads receive a personalised reply and a team alert with the lead profile.',
          'Unclear or incomplete records are routed to a review alert.',
        ],
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'partial',
        paragraphs: [
          'The diagram includes separate paths for duplicates, scoring failures, and unclear or incomplete leads, rather than sending each case through the warm reply path.',
        ],
        bullets: [
          'Duplicate records stop before scoring.',
          'Scoring failures follow a fallback path to review.',
          'Unclear or incomplete leads generate a review alert.',
          'An error alert is shown as built but not yet tested.',
        ],
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'partial',
        paragraphs: [
          'The workflow canvas identifies the warm path as demonstrated. A separate screenshot shows the hot-lead alert email. Other branches are described only as shown on the canvas.',
        ],
        bullets: [
          'The workflow canvas shows the warm lead reply, team alert and Airtable reply-status update.',
          'The hot-lead alert email is shown in a separate screenshot.',
          'The canvas also depicts duplicate handling, review alerts, scoring fallback, a follow-up digest and an error alert.',
        ],
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'partial',
        paragraphs: [
          'The workflow diagram does not demonstrate every branch. The follow-up digest is switched off, and the error alert is not yet tested.',
        ],
        bullets: [
          'Duplicate handling, review routing and scoring fallback are shown on the canvas but not demonstrated in the provided evidence.',
          'The follow-up digest is built but switched off.',
          'The error alert is built but not yet tested.',
        ],
      },
    ],
    screenshots: [
      {
        id: 'lead-qualification-workflow',
        image: '/screenshots/lead-qualification-workflow.png',
        title: 'Lead qualification workflow diagram',
        caption: 'BrightSun Solar lead qualification workflow, from enquiry to personalised reply and staff alert.',
        note: 'Hot and needs-review routes are built into the workflow. This case study demonstrates the warm path, and the morning follow-up digest is not yet enabled.',
      },
      {
        id: 'lead-n8n-canvas',
        image: '/screenshots/lead-n8n-canvas.png',
        title: 'n8n workflow canvas',
        caption: 'The BrightSun Solar lead system in n8n. A new Airtable lead is checked for duplicates, scored by an AI model, saved, and routed by score. This walkthrough follows one warm lead.',
      },
      {
        id: 'lead-airtable-intake',
        image: '/screenshots/lead-airtable-intake.png',
        title: 'Airtable, intake',
        caption: 'The enquiry lands in Airtable with the answers the lead gave: property type, location, decision-maker status, monthly energy spend, budget and main problem.',
      },
      {
        id: 'lead-acknowledgement-header',
        image: '/screenshots/lead-acknowledgement-header.png',
        title: 'Acknowledgement email, header',
        caption: 'The lead gets a branded reply within minutes of submitting the form.',
      },
      {
        id: 'lead-acknowledgement-body',
        image: '/screenshots/lead-acknowledgement-body.png',
        title: 'Acknowledgement email, body',
        caption: 'The reply is written from the lead’s own answers. Here the AI notices that the electricity cost stated doesn’t match the low usage described, and asks for the real figure instead of assuming.',
      },
      {
        id: 'lead-warm-alert-header',
        image: '/screenshots/lead-warm-alert-header.png',
        title: 'Warm alert',
        caption: 'Staff are notified when a lead is classed as warm.',
      },
      {
        id: 'lead-warm-alert-details',
        image: '/screenshots/lead-warm-alert-details.png',
        title: 'Warm alert, contact details',
        caption: 'Staff get the full lead profile and a note that the AI has already replied, so the team monitors the conversation and follows up at the right time instead of starting from scratch.',
      },
      {
        id: 'lead-hot-lead-alert',
        image: '/screenshots/lead-qualification-hot-lead-alert.png',
        title: 'Hot-lead alert email',
        caption: 'A BrightSun Solar email marks the enquiry as a high-priority hot lead and recommends a team follow-up action.',
      },
    ],
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
