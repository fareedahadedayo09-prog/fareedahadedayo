/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PROJECT CONTENT, case-study-first structure
 * ──────────────────────────────────────────────────────────────────────────
 *
 *  Each project follows the required 6-part structure:
 *    1. intro       meta: category, tools, status
 *    2. problem     business problem in plain language + why it matters
 *    3. solution    what was built; what's automated vs human
 *    4. workflow    steps of the process (drives the visual diagram)
 *    5. result      demonstrated outcomes + verified tests
 *    6. technical   expandable: tools, data flow, decisions, validation,
 *                   exceptions, testing, limitations
 *
 *  Media policy: at most one strong visual (diagram/screenshot) per case
 *  study. No long screenshot galleries.
 *
 *  Four projects exactly as specified, no invented completed builds.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type SectionStatus = 'verified' | 'partial' | 'planned' | 'not-started'
export type StatusKey = 'done' | 'progress' | 'planned'
export type ProjectCategory =
  | 'ecommerce-ops'
  | 'customer-experience'
  | 'lead-management'
  | 'ai-data'

export type WorkflowStep = {
  id: string
  label: string
  title: string
  detail: string
  tone?: 'default' | 'trigger' | 'decision' | 'escalation' | 'output' | 'record'
}

export type ResultPoint = {
  text: string
  state: 'verified' | 'partial' | 'planned'
}

export type TechDetail = {
  summary: string
  dataFlow?: string[]
  decisionLogic?: string[]
  validation?: string[]
  exceptions?: string[]
  testing?: string[]
  limitations?: string[]
  /** Example payload shown in the technical section. */
  examplePayload?: string
}

export type Project = {
  slug: string
  name: string
  /** One-line business description (card + case-study intro). */
  tagline: string
  status: StatusKey
  statusLabel: string
  statusDetail: string
  tools: string[] // tool ids from tools.ts
  timeline: string
  categories: ProjectCategory[]
  /** Optional single hero visual (diagram or screenshot). */
  heroVisual?: {
    image?: string
    caption?: string
    /** If true, use the interactive simulator on the case-study page instead of a static image. */
    useSimulator?: boolean
  }
  hasSimulator?: boolean
  /** Original n8n canvas screenshot, when available. */
  workflowScreenshot?: string
  workflowScreenshotAlt?: string
  /** Shown when evidence exists but is not yet cleared for publication. */
  evidencePlaceholder?: { title: string; body: string; items: string[] }
  /** Optional supporting evidence, shown separately from workflow diagrams. */
  evidenceIntro?: string
  evidence?: { image: string; title: string; description: string; alt: string }[]
  // 6-part body
  problem: {
    summary: string
    whyItMatters: string
    bullets: string[]
  }
  solution: {
    summary: string
    automated: string[]
    humanControl: string[]
  }
  workflow: WorkflowStep[]
  result: {
    summary: string
    points: ResultPoint[]
    disclaimer?: string
  }
  technical: TechDetail
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory | 'all', string> = {
  all: 'All projects',
  'ecommerce-ops': 'E-commerce operations',
  'customer-experience': 'Customer experience',
  'lead-management': 'Lead management',
  'ai-data': 'AI & data processing',
}

export const STATUS_LABELS: Record<StatusKey, string> = {
  done: 'Completed · tested',
  progress: 'Working prototype',
  planned: 'Designed · not built',
}

export const STATUS_DETAIL_DEFAULT: Record<StatusKey, string> = {
  done:
    'The core path is built and has been run against test scenarios. Partial or unbuilt behaviours are labelled.',
  progress:
    'A working prototype that demonstrates the architecture. Not connected to live data or customer-facing channels.',
  planned: 'Design documented; nothing implemented yet.',
}

export const SECTION_STATUS_LABEL: Record<SectionStatus, string> = {
  verified: 'Verified',
  partial: 'Partial',
  planned: 'Designed',
  'not-started': 'Not started',
}

export const projects: Project[] = [
  // ─────────────────── 1. COD ORDER CONFIRMATION ───────────────────
  {
    slug: 'order-confirmation-risk-check',
    workflowScreenshot: '/screenshots/cod-order-confirmation.png',
    workflowScreenshotAlt: 'n8n canvas for the COD order confirmation system, showing order intake, duplicate checks, confirmation and cancellation, reminders, and availability handling',
    name: 'COD Order Confirmation & Risk Assessment',
    tagline:
      'Routine cash-on-delivery confirmations by email, with staff follow-up for high-value orders and exceptions.',
    status: 'done',
    statusLabel: STATUS_LABELS.done,
    statusDetail: 'Built and tested, but not currently running. Duplicate detection has been tested; detailed test coverage for individual paths is not yet documented here.',
    tools: ['n8n', 'tally', 'airtable', 'gmail'],
    timeline: 'Personal build',
    categories: ['ecommerce-ops', 'customer-experience'],
    heroVisual: { image: '/screenshots/cod-order-confirmation-workflow.png', caption: 'Cash-on-delivery order confirmation workflow overview' },
    hasSimulator: true,
    evidenceIntro: 'These screenshots show test orders, not real customer orders. Select an image to view it at full size.',
    evidence: [
      {
        image: '/screenshots/cod-evidence/staff-alert.png',
        title: 'High-value order alert',
        description: 'A staff email flags an order for a call before dispatch and shows why it was marked high risk. In this example, the alert lists the order value, quantity and short address as risk factors.',
        alt: 'Staff email alert showing why a test order was flagged as high risk and requesting a call before dispatch',
      },
      {
        image: '/screenshots/cod-evidence/order-records.png',
        title: 'Order records in Airtable',
        description: 'The order record view shows confirmed, cancelled and call-required statuses, giving staff a place to track outcomes and identify orders needing attention.',
        alt: 'Airtable test order records showing confirmed, cancelled and call required statuses',
      },
      {
        image: '/screenshots/cod-evidence/confirmation-email.png',
        title: 'Customer confirmation email',
        description: 'The customer receives an order email asking them to confirm their purchase.',
        alt: 'Customer order confirmation email for a test order',
      },
      {
        image: '/screenshots/cod-evidence/confirmation-options.png',
        title: 'Confirm or cancel',
        description: 'The email gives the customer a choice to confirm or cancel. On confirmation, they are directed to an n8n form to select their availability, which is recorded in Airtable.',
        alt: 'Test order email showing order details and confirm and cancel options',
      },
    ],
    problem: {
      summary:
        'This personal build is based on my observations and information supplied by a cash-on-delivery business owner. Every cash-on-delivery order required a staff member to call the customer, confirm they still wanted the product and check their availability for delivery. As orders increased, so did the workload. Some customers had changed their minds by the time staff called.',
      whyItMatters:
        'Calling every customer takes time the team could spend on high-value orders and cases that need personal attention. The business also needs a way to keep track of orders as it grows.',
      bullets: [
        'Every order needed an individual confirmation call.',
        'Staff spent time following up with customers who no longer wanted to buy.',
        'A growing number of orders meant more manual follow-up.',
      ],
    },
    solution: {
      summary:
        'I built a cash-on-delivery order confirmation workflow that handles routine orders and brings staff in when needed. The system checks for duplicates and records orders in Airtable. Customers with normal orders below a set amount receive an email with options to confirm or cancel, and a reminder if they do not respond. Customers who confirm select their availability in an n8n form, and it is recorded immediately in Airtable. High-value orders are flagged for staff to call, while other situations beyond the system are escalated for human review.',
      automated: [
        'Check incoming orders for duplicates and record order information in Airtable.',
        'Email customers with routine orders below the set amount, with options to confirm or cancel.',
        'Record availability in Airtable as soon as a customer submits the n8n form after confirming.',
        'Send a reminder after a set period when a customer has not responded.',
        'Flag high-value orders and email staff to prompt a follow-up call.',
      ],
      humanControl: [
        'Staff call customers about high-value orders.',
        'Staff review and confirm situations that need to be escalated beyond the system.',
      ],
    },
    workflow: [
      { id: 'trigger', label: 'Trigger', title: 'Order arrives', detail: 'A customer places a cash-on-delivery order online.', tone: 'trigger' },
      { id: 'check', label: 'Step 1', title: 'Check and record', detail: 'The workflow checks for duplicates and records order information in Airtable.', tone: 'record' },
      { id: 'risk', label: 'Decision', title: 'Route the order', detail: 'The order is assessed against a set amount.', tone: 'decision' },
      { id: 'confirm', label: 'Path A', title: 'Email the customer', detail: 'Routine orders below the set amount receive confirm or cancel options.', tone: 'output' },
      { id: 'availability', label: 'Confirmation', title: 'Capture availability', detail: 'Customers who confirm choose availability in an n8n form, which is logged immediately in Airtable.', tone: 'record' },
      { id: 'remind', label: 'Follow-up', title: 'Send a reminder', detail: 'Customers who have not responded receive a reminder after a set period.', tone: 'output' },
      { id: 'escalate', label: 'Path B', title: 'Bring in staff', detail: 'High-value orders are flagged for a call; other situations beyond the system are escalated for review.', tone: 'escalation' },
    ],
    result: {
      summary:
        'The workflow is designed to help the business manage more orders without a manual call for every one. Customers can confirm or cancel by email, reminders follow up on unanswered orders, and staff can focus on high-value orders and exceptions.',
      points: [
        { text: 'Duplicate detection has been tested and works.', state: 'verified' },
        { text: 'Reminders are sent after a set period when customers have not responded. Detailed test coverage is not documented here.', state: 'partial' },
        { text: 'High-value orders are flagged for staff follow-up. Detailed test coverage is not documented here.', state: 'partial' },
      ],
      disclaimer:
        'The system has been built and tested but is not currently running. No measured business results are available yet, and individual test scenarios are not fully documented here.',
    },
    technical: {
      summary:
        'The n8n workflow connects order intake, duplicate checking, customer email, staff alerts and Airtable records. The workflow canvas also shows confirmation, cancellation, reminder and availability paths.',
      dataFlow: [
        'An online cash-on-delivery order enters the workflow.',
        'Orders are checked for duplicates and order information is recorded in Airtable.',
        'Routine orders below the set amount receive a customer email with confirm or cancel options.',
        'Customers who confirm select availability in an n8n form; their response is recorded immediately in Airtable.',
        'Customers who have not responded receive a reminder after a set period.',
        'High-value orders trigger a staff email prompting a call; situations beyond the system are escalated for human review.',
      ],
      decisionLogic: [
        'The configured amount helps route routine and high-value orders.',
        'Staff handle high-value orders and situations that need escalation.',
      ],
      testing: [
        'Duplicate detection has been tested and works.',
        'Detailed path-by-path test coverage has not yet been documented here.',
      ],
      limitations: [
        'No measured business outcomes are available yet.',
      ],
    },
  },

  // ─────────────────── 2. RETURNS & REFUNDS ───────────────────
  {
    slug: 'returns-refunds-handler',
    workflowScreenshot: '/screenshots/returns-refunds.png',
    workflowScreenshotAlt: 'n8n canvas for the returns and refunds workflow, showing order lookup, policy checks, reply drafting, and human alerts',
    name: 'Returns & Refunds Policy Handler',
    tagline:
      'Consistent policy evaluation for return requests, with explicit human escalation.',
    status: 'done',
    statusLabel: STATUS_LABELS.done,
    statusDetail: STATUS_DETAIL_DEFAULT.done,
    tools: ['n8n', 'tally', 'airtable'],
    timeline: 'Completed build',
    categories: ['ecommerce-ops', 'customer-experience'],
    heroVisual: { image: '/screenshots/returns-refund-handler-workflow.png', caption: 'Returns and refund handler workflow overview' },
    hasSimulator: true,
    problem: {
      summary:
        'Return decisions were made one message at a time by whoever was available. The same kind of request could get a different answer on different days, policy exceptions were granted conversationally with no record, and conflicting customer instructions were resolved by whoever read them first.',
      whyItMatters:
        'Returns are high-stakes customer moments - inconsistent answers erode trust, undocumented policy exceptions create precedent the business did not agree to, and conflicting instructions lead to customers receiving something they did not ask for.',
      bullets: [
        'Inconsistent eligibility decisions across similar requests.',
        'Policy exceptions granted conversationally with no audit trail.',
        'Conflicting customer instructions resolved ad hoc.',
        'No record of which rule produced a given decision.',
      ],
    },
    solution: {
      summary:
        'A staged pipeline in n8n that validates return requests for completeness, evaluates them against policy rules in a fixed order and either produces a decision or escalates to a human. Every decision records the rule that produced it.',
      automated: [
        'Intake validation: required fields and basic format checks before policy evaluation.',
        'Policy evaluation: rules applied in a fixed, deterministic order.',
        'Outcome recording: every decision writes the rule, outcome and timestamp to Airtable.',
      ],
      humanControl: [
        'Requests matching no policy rule are escalated, not defaulted.',
        'Conflicting instructions flag the request for review (designed, not yet built).',
        'Unusual refund amounts and disputed payments are always routed to a person.',
      ],
    },
    workflow: [
      { id: 'trigger', label: 'Trigger', title: 'Return request', detail: 'Tally form or message.', tone: 'trigger' },
      { id: 'validate', label: 'Step 1', title: 'Validate', detail: 'Required fields present.', tone: 'default' },
      { id: 'policy', label: 'Step 2', title: 'Evaluate policy', detail: 'Apply rules in order.', tone: 'decision' },
      { id: 'conflict', label: 'Step 3', title: 'Conflict detection', detail: 'Self-contradictions (designed, not yet built).', tone: 'decision' },
      { id: 'decision', label: 'Output', title: 'Decision / Escalate', detail: 'Rule applied OR human queue.', tone: 'escalation' },
      { id: 'record', label: 'Record', title: 'Write to Airtable', detail: 'Outcome + rule + reason.', tone: 'record' },
    ],
    result: {
      summary:
        'Validation and policy-evaluation paths are built so that well-formed return requests are evaluated in a fixed, reviewable order. Out-of-policy escalation is implemented but not yet end-to-end verified; conflict detection is designed but not yet built.',
      points: [
        { text: 'Complete request passes validation and reaches policy evaluation: implemented, walkthrough-verified.', state: 'verified' },
        { text: 'Missing required field rejected and recorded: implemented, walkthrough-verified.', state: 'verified' },
        { text: 'Out-of-policy request escalated: implemented, not yet end-to-end verified.', state: 'partial' },
        { text: 'Self-contradicting instructions detected and escalated: not started (designed).', state: 'planned' },
        { text: 'Escalation notification reaches queue owner: not started.', state: 'planned' },
      ],
      disclaimer:
        'Results are walkthrough outcomes against the build, not production telemetry.',
    },
    technical: {
      summary:
        'Staged n8n pipeline with policy evaluation after validation; conflict detection is designed but not yet built. Every stage writes a structured record; the human-escalation branch is a first-class output, not a catch-all.',
      dataFlow: [
        'Return request captured via Tally webhook.',
        'Validation node checks required fields (order reference, item, reason).',
        'Policy-rules node applies rules in a fixed sequence (window, item type, condition, reason).',
        'Conflict-detection node flags contradictory selections (designed, not built).',
        'Branch: accept / deny / escalate; each writes to Airtable with rule id.',
      ],
      decisionLogic: [
        'Rules evaluated in fixed order so the outcome is deterministic.',
        'No AI calls in the decision path - policy rules are explicit.',
        'First-match semantics mean rule ordering is documented and testable.',
      ],
      validation: [
        'Required-field presence and basic format checks.',
        'Order-record lookup (not yet built) is a prerequisite before policy evaluation.',
      ],
      exceptions: [
        'Requests that match no rule are escalated, not defaulted.',
        'Conflicting instructions are designed to halt automated decision-making.',
        'Disputed payments are designated human-only.',
      ],
      testing: [
        'Well-formed and missing-field requests were walkthrough-verified; out-of-policy escalation still needs end-to-end verification.',
        'Conflict detection and escalation notification not yet built.',
      ],
      limitations: [
        'Conflict detection between contradictory instructions is designed but not implemented.',
        'Order-record lookup during validation is not yet built.',
        'Human-escalation branch is not wired to a live queue.',
        'No end-to-end test run against a realistic returns dataset.',
        'No monitoring or failure alerting.',
      ],
      examplePayload: `{
  "order_number": "ORD-12345",
  "customer_name": "...",
  "items_requested": ["Cleanser"],
  "reason": "wrong_item",
  "condition": "unopened",
  "submitted_at": "ISO timestamp"
}`,
    },
  },

  // ─────────────────── 3. LEAD QUALIFICATION ───────────────────
  {
    slug: 'lead-qualification',
    workflowScreenshot: '/screenshots/brightsun-lead-system.png',
    workflowScreenshotAlt: 'n8n canvas for the BrightSun Solar lead system, showing lead intake, duplicate checks, scoring, routing, and follow-up',
    name: 'BrightSun Solar: AI-Assisted Lead Qualification & Routing',
    tagline:
      'Structuring and classifying incoming enquiries so follow-up decisions are consistent and auditable.',
    status: 'done',
    statusLabel: STATUS_LABELS.done,
    statusDetail: 'Connected to an Airtable base, with an Airtable form embedded on the company website. Detailed path-by-path test coverage is being confirmed.',
    tools: ['n8n', 'airtable'],
    timeline: 'Completed build',
    categories: ['lead-management', 'ai-data'],
    heroVisual: { image: '/screenshots/ai-lead-qualification-workflow.png', caption: 'BrightSun Solar AI lead qualification workflow overview' },
    hasSimulator: true,
    evidenceIntro: 'These screenshots show a test lead, not a real customer enquiry. Select an image to view it at full size.',
    evidence: [
      {
        image: '/screenshots/brightsun-evidence/acknowledgement-email.png',
        title: 'Lead acknowledgement email',
        description: 'A BrightSun Solar email acknowledges the enquiry, giving the lead a response after reaching out.',
        alt: 'BrightSun Solar acknowledgement email for a test lead',
      },
      {
        image: '/screenshots/brightsun-evidence/acknowledgement-detail.png',
        title: 'A response tailored to the enquiry',
        description: 'The message asks the lead to clarify their electricity cost after noting a possible mismatch with the information provided. This shows how the response can request details needed for follow-up.',
        alt: 'Acknowledgement email asking a test lead to clarify electricity costs',
      },
      {
        image: '/screenshots/brightsun-evidence/warm-lead-email.png',
        title: 'Warm lead notification',
        description: 'A staff email labels the enquiry as a warm lead and presents a qualification result, helping the sales team identify an enquiry to monitor.',
        alt: 'BrightSun Solar warm test lead notification and qualification result',
      },
      {
        image: '/screenshots/brightsun-evidence/warm-lead-details.png',
        title: 'Staff follow-up details',
        description: 'The alert states that a personalised AI response was sent and asks staff to monitor the conversation, review the qualification details and follow up when appropriate.',
        alt: 'Warm test lead staff alert with follow-up guidance and contact details',
      },
    ],
    problem: {
      summary:
        'Incoming enquiries need a consistent way to be captured and qualified so the team can decide how to follow up.',
      whyItMatters:
        'Inconsistent triage means hot leads can go cold while low-intent enquiries get immediate attention, and there is no record of why any given lead was routed the way it was.',
      bullets: [
        'Enquiries need a shared place to be captured and reviewed.',
        'Classification performed from memory.',
        'No durable record of next action or assignment.',
        'Follow-up depended on being remembered.',
      ],
    },
    solution: {
      summary:
        'An Airtable form embedded on the company website captures enquiries in a connected Airtable base. The n8n workflow supports lead qualification and routing.',
      automated: [
        'Enquiry intake through the embedded Airtable form.',
        'Lead information captured in the connected Airtable base.',
        'Workflow support for qualification and routing.',
      ],
      humanControl: [
        'Team members can use the lead information in Airtable for follow-up.',
      ],
    },
    workflow: [
      { id: 'trigger', label: 'Trigger', title: 'Enquiry arrives', detail: 'Airtable form embedded on the company website.', tone: 'trigger' },
      { id: 'record', label: 'Record', title: 'Capture the lead', detail: 'The form is connected to an Airtable base.', tone: 'record' },
      { id: 'qualify', label: 'Decision', title: 'Qualify and route', detail: 'The n8n workflow supports lead qualification and routing.', tone: 'decision' },
      { id: 'followup', label: 'Handoff', title: 'Follow up', detail: 'The team can use the recorded lead information.', tone: 'escalation' },
    ],
    result: {
      summary:
        'The system is connected to an Airtable base and the company website uses an embedded Airtable form. Detailed test coverage for individual paths is being confirmed.',
      points: [],
      disclaimer:
        'No measured business results are available yet.',
    },
    technical: {
      summary:
        'The lead system uses n8n and an Airtable base, with an Airtable form embedded on the company website.',
      dataFlow: [
        'A visitor submits the embedded Airtable form.',
        'Lead information is captured in the connected Airtable base.',
        'The n8n workflow supports qualification and routing.',
      ],
      testing: [
        'Detailed path-by-path test coverage is being confirmed.',
      ],
      limitations: [
        'The details of any direct-message or Claude extraction path are being confirmed.',
        'Measured business results are not yet available.',
      ],
    },
  },

  // ─────────────────── 4. SKINCARE RETAILER LEAD GENERATION ───────────────────
  {
    slug: 'skincare-retailer-lead-generation',
    name: 'Skincare Retailer Lead Generation Pipeline',
    tagline:
      'A discovery-to-qualification workflow for independent multi-brand skincare retailers across four markets.',
    status: 'progress',
    statusLabel: 'Working prototype',
    statusDetail:
      'A technical-assessment prototype with Serper discovery, website enrichment, source-checked Gemini extraction, deterministic qualification and Airtable write-back. A qualified-lead outcome has not yet been confirmed for publication; no production or business results are claimed.',
    tools: ['n8n', 'serper', 'gemini', 'javascript', 'airtable'],
    timeline: 'Independent technical assessment',
    categories: ['lead-management', 'ai-data'],
    workflowScreenshot: '/screenshots/skincare-leadgen/n8n-canvas.png',
    workflowScreenshotAlt:
      'The n8n canvas for the skincare lead generation workflow, showing the discovery, deduplication, enrichment, AI extraction, qualification and Airtable stages laid out left to right',
    evidenceIntro:
      'Screenshots from the demo run: the n8n canvas, and the Airtable Leads table showing qualification status, evidence and scores. These show the workflow ran and wrote records. They do not constitute a verified qualified-lead result.',
    evidence: [
      {
        image: '/screenshots/skincare-leadgen/n8n-canvas.png',
        title: 'The n8n workflow canvas',
        description:
          'The full pipeline laid out left to right, from search discovery through to qualification and Airtable write-back. Each branch — invalid domain, robots check, candidate pages, retry and error logging — is a separate path rather than one straight line.',
        alt: 'n8n workflow canvas showing the skincare lead generation pipeline stages',
      },
      {
        image: '/screenshots/skincare-leadgen/airtable-status.png',
        title: 'Airtable records with processing status',
        description:
          'The Leads table after a run: company name, canonical domain, qualification status and the evidence that produced it. Yellow chips are Qualified, and the row count shows 24 records were written by the run.',
        alt: 'Airtable Leads table showing company names with Qualified, Needs Review and Rejected status labels',
      },
      {
        image: '/screenshots/skincare-leadgen/airtable-scores.png',
        title: 'Scores and qualification reasons',
        description:
          'The same records with the rule-based score out of 10 and a plain-language reason for each outcome. Scores vary by evidence — a lower score reflects missing multi-brand or e-commerce evidence, not a failed run.',
        alt: 'Airtable view showing qualification_reason and numeric score fields for each lead',
      },
      {
        image: '/screenshots/skincare-leadgen/airtable-qualification.png',
        title: 'Business model and brands found',
        description:
          'Extracted business model, third-party brands and product category. Where evidence was incomplete the status is Needs Review rather than an assumed positive, which is the intended behaviour of the qualification rules.',
        alt: 'Airtable view showing business_model, brands_found and product_category fields',
      },
      {
        image: '/screenshots/skincare-leadgen/airtable-leads-a.png',
        title: 'Extracted contact fields',
        description:
          'Contact person, business email and email_status. Most rows read “missing”, which is expected: independent retailers rarely publish a named person. Emails are marked found_unchecked because only syntax is validated.',
        alt: 'Airtable view showing contact_person, business_email and email_status columns',
      },
      {
        image: '/screenshots/skincare-leadgen/airtable-leads-b.png',
        title: 'Website evidence and e-commerce signals',
        description:
          'Product category, e-commerce evidence and the source URLs captured per lead. Each record retains the pages the extraction was drawn from, so a result can be traced back to its evidence.',
        alt: 'Airtable view showing product_category, ecommerce_evidence and evidence_urls columns',
      },
    ],
    problem: {
      summary:
        'Finding independent multi-brand skincare retailers across several markets requires repeated searches, manual website reviews and copying business details into a structured prospect list.',
      whyItMatters:
        'A search result or snippet does not prove that a business fits the target profile. Qualification needs evidence from the retailer’s own website, consistent rules and a record of why a prospect was accepted, rejected or sent for review.',
      bullets: [
        'Search results can include directories, marketplaces and businesses outside the target profile.',
        'Business models and product ranges need to be checked on the retailer’s own website.',
        'Contact details may be missing, outdated or incorrectly inferred.',
        'Repeated searches can surface the same domain more than once.',
      ],
    },
    solution: {
      summary:
        'An n8n pipeline that discovers candidate retailers through Serper, normalises and deduplicates domains, fetches relevant website pages, uses Gemini to structure evidence, validates the extracted fields and applies deterministic qualification rules before writing records to Airtable.',
      automated: [
        'Run configurable Serper searches for the United Kingdom, United States, Canada and Australia.',
        'Parse organic results and normalise website URLs into canonical domains.',
        'Merge same-run duplicates and retain discovery evidence.',
        'Check existing Airtable records and create or update prospects.',
        'Fetch the homepage and up to four same-site About, Contact or Brands pages where available.',
        'Ask Gemini to extract structured business, product, brand, e-commerce and contact fields from fetched page text only.',
        'Validate the extraction schema, source URLs and literal evidence for found contact details and third-party brands; retry once when validation fails.',
        'Apply deterministic eligibility rules and write qualification status, reasons and contact fields back to Airtable.',
        'Record processing errors and calculate a run summary from records touched by the execution.',
      ],
      humanControl: [
        'Prospects with missing or insufficient evidence are routed to Needs Review rather than being automatically accepted.',
        'The LLM supplies structured evidence; JavaScript rules make the final qualification decision and hard exclusions cannot be overridden by the model.',
        'Email validation checks syntax only. An address is not represented as deliverable or verified.',
        'The scheduled trigger remains disabled while the workflow is being tested; runs are initiated manually.',
      ],
    },
    workflow: [
      { id: 'input', label: 'Input', title: 'Build search queries', detail: 'Configurable skincare-retailer queries are prepared for four target markets.', tone: 'trigger' },
      { id: 'discover', label: 'Discovery', title: 'Search with Serper', detail: 'Google organic results become candidate business records with source URLs.', tone: 'default' },
      { id: 'normalise', label: 'Step 1', title: 'Normalise and deduplicate', detail: 'Website URLs are reduced to canonical domains and same-run duplicates are merged.', tone: 'record' },
      { id: 'persist', label: 'Step 2', title: 'Check Airtable', detail: 'Existing domains are matched so records can be updated or created.', tone: 'record' },
      { id: 'enrich', label: 'Enrichment', title: 'Fetch website evidence', detail: 'The homepage and up to four relevant same-site pages are retrieved where accessible.', tone: 'default' },
      { id: 'extract', label: 'AI extraction', title: 'Structure business data', detail: 'Gemini extracts fields from the supplied page text and attaches source URLs.', tone: 'default' },
      { id: 'validate', label: 'Validation', title: 'Check evidence', detail: 'JavaScript checks the output schema, allowed sources and literal evidence, with one retry.', tone: 'decision' },
      { id: 'qualify', label: 'Decision', title: 'Apply qualification rules', detail: 'Deterministic rules classify each candidate as Qualified, Rejected or Needs Review.', tone: 'decision' },
      { id: 'output', label: 'Output', title: 'Update Airtable and summarise', detail: 'Lead records, processing errors and execution counts are written or calculated.', tone: 'record' },
    ],
    result: {
      summary:
        'The submitted workflow export contains the discovery, enrichment, evidence-validation, deterministic qualification, Airtable persistence and execution-summary stages. A successful qualified-lead outcome and reliable run metrics have not yet been verified for publication.',
      points: [
        { text: 'Serper discovery is configured for four target markets: implemented in the workflow export; end-to-end result counts not published.', state: 'partial' },
        { text: 'Canonical-domain normalisation and same-run duplicate merging are implemented in JavaScript; repeat-run behaviour still needs a documented test.', state: 'partial' },
        { text: 'Airtable create/update paths and execution logging are present in the export; large-dataset performance is not measured.', state: 'partial' },
        { text: 'Gemini extraction is constrained to fetched website text and validated against source URLs and evidence; extraction accuracy still requires review.', state: 'partial' },
        { text: 'Qualification uses deterministic criteria and three outcomes; no qualified lead has yet been confirmed from the recorded test work.', state: 'partial' },
      ],
      disclaimer:
        'This is an independent prototype built with demonstration research criteria. It is not a production prospecting service, has not processed client data and has no measured sales or conversion outcomes.',
    },
    technical: {
      summary:
        'The workflow separates search discovery, domain handling, website evidence collection, AI-assisted extraction, deterministic qualification and Airtable persistence. Gemini does not make the final eligibility decision.',
      dataFlow: [
        'A manual trigger starts four configurable Serper queries, one each for the United Kingdom, United States, Canada and Australia.',
        'Organic results are parsed into provisional company names, URLs, snippets, market labels and discovery sources.',
        'JavaScript normalises URLs, derives canonical domains and merges same-batch duplicates while retaining source URLs and snippets.',
        'Airtable is searched for existing canonical domains; the workflow creates new records or updates existing ones.',
        'The workflow fetches each homepage and up to four relevant same-site About, Contact or Brands pages. Bot-protection pages are detected and skipped rather than bypassed.',
        'Page text is assembled with per-page and total character limits, then passed to Gemini as the only permitted evidence source.',
        'Gemini returns structured fields with a status and source URL. A validator checks required fields, allowed URLs, literal evidence for contact details and brands, allowed business models and email syntax; invalid output can be retried once.',
        'Deterministic JavaScript rules apply hard exclusions and require multi-brand retailer evidence, at least two third-party brands, e-commerce evidence, skincare/beauty categories and a target-market country for qualification.',
        'Airtable is updated with the result, contact status and evidence. Separate error records and an execution summary are produced.',
      ],
      decisionLogic: [
        'The target markets are the United Kingdom, United States, Canada and Australia.',
        'Large chains and marketplaces on a starter exclusion list are rejected.',
        'Manufacturers selling their own brand, marketplaces, service providers, businesses outside the target markets and non-skincare categories are rejected when the website evidence supports that classification.',
        'A Qualified result requires a multi-brand retailer model, at least two third-party brands, e-commerce evidence, skincare/beauty product categories and a target-market country.',
        'Missing evidence or invalid extraction produces Needs Review rather than an assumed positive result.',
        'The LLM extracts evidence; deterministic code owns the final decision.',
      ],
      validation: [
        'Website URLs are normalised and malformed or non-registrable domains are routed to an error path.',
        'Found fields must cite one of the pages actually fetched.',
        'Found contact names, email addresses, phone numbers and third-party brands are checked against the supplied page text.',
        'Email addresses receive a syntax check only; there is no SMTP, DNS or MX deliverability verification.',
        'Invalid structured extraction can be retried once with the validation errors included.',
      ],
      exceptions: [
        'Serper request failures and empty organic-result sets become explicit error items.',
        'Invalid website URLs are logged rather than silently discarded.',
        'Homepage failures, empty pages and detected bot-protection pages prevent unsupported enrichment.',
        'Insufficient evidence is routed to Needs Review.',
        'Enrichment and processing failures are written to an Airtable error log.',
      ],
      testing: [
        'The workflow export and node configuration were reviewed as part of the assignment handover.',
        'A confirmed qualified-lead result and final run-level counts are not yet available for public reporting.',
        'A repeat-run test against an existing Airtable dataset should be documented before claiming idempotent persistence at scale.',
      ],
      limitations: [
        'Search queries and target criteria are configured for independent multi-brand skincare retailers, not arbitrary industries.',
        'The current qualification test has not yet produced a confirmed qualified lead.',
        'Airtable existing-record lookup and large-dataset performance have not been benchmarked.',
        'Contact email validation is syntactic only and does not prove deliverability.',
        'Website fetching is limited to the homepage and up to four candidate pages; some sites may block automated requests or expose content through JavaScript.',
        'The scheduled trigger is disabled; the workflow is run manually.',
        'No outreach messages are sent and no CRM campaign is created.',
        'No production deployment, client results or business-performance metrics are claimed.',
      ],
      examplePayload: `{
  "company_name": "Example Skincare Retailer",
  "website": "https://example.com",
  "canonical_domain": "example.com",
  "country": "United Kingdom",
  "qualification_status": "Needs Review",
  "qualification_reason": "Direct evidence for the multi-brand retailer criteria is incomplete."
}`,
    },
  },

  // ─────────────────── 5. GLOWLAB LIFECYCLE ───────────────────
  {
    slug: 'glowlab-lifecycle',
    name: 'GlowLab — AI-Assisted E-commerce Platform',
    tagline:
      'A fictional skincare storefront with an AI shopping assistant, connected to an abandoned-cart automation prototype. Ongoing work.',
    status: 'progress',
    statusLabel: 'In Progress',
    statusDetail:
      'Ongoing project. The storefront and Lumi assistant are live as a demo; the Make.com, Supabase, Airtable and Klaviyo automation is a prototype still being tested and reviewed. No recovered orders, conversion gains or customer results are claimed.',
    tools: ['react', 'make', 'supabase', 'airtable', 'klaviyo', 'llm', 'webhooks'],
    timeline: 'Ongoing project',
    categories: ['ecommerce-ops', 'customer-experience', 'ai-data'],
    heroVisual: {
      image: '/screenshots/glowlab/glowlab-home-desktop.jpg',
      caption: 'The live GlowLab demo storefront',
    },
    hasSimulator: true,
    problem: {
      summary:
        'Follow-up after a customer places an order - or nearly places one - was manual. Abandoned-cart reminders went out late or not at all, post-purchase check-ins were skipped during busy weeks, and messages were sometimes sent to customers who had already bought or opted out.',
      whyItMatters:
        'Missed lifecycle moments are invisible until they show up in retention numbers. Sending an irrelevant reminder to a customer who already bought is worse than not sending anything at all.',
      bullets: [
        'Abandoned-cart follow-up depended on someone noticing.',
        'Post-purchase messages sent inconsistently.',
        'Customers segmented loosely rather than by behaviour.',
        'Opt-outs and recent-purchase suppressions not enforced.',
      ],
    },
    solution: {
      summary:
        'A prototype lifecycle engine in n8n that listens for simulated cart/order events, segments customers by behaviour and schedules messages with exit conditions that prevent embarrassing sends.',
      automated: [
        'Event intake from simulated storefront webhooks.',
        'Customer timeline merge and segmentation rules.',
        'Scheduling of messages with configured delays.',
        'Exit checks: opt-out, recent purchase, duplicate-send suppression.',
      ],
      humanControl: [
        'VIP or conflicting-signal customers are routed to a review queue.',
        'Opt-out immediately suppresses all future automated messages.',
        'Messages are staged to Airtable, not sent, in this prototype.',
      ],
    },
    workflow: [
      { id: 'trigger', label: 'Trigger', title: 'Cart / order event', detail: 'Simulated webhook.', tone: 'trigger' },
      { id: 'identify', label: 'Step 1', title: 'Identify customer', detail: 'Merge into timeline.', tone: 'default' },
      { id: 'segment', label: 'Decision', title: 'Segmentation', detail: 'Rule-based.', tone: 'decision' },
      { id: 'schedule', label: 'Step 2', title: 'Schedule message', detail: 'Wait nodes.', tone: 'default' },
      { id: 'exit', label: 'Exit checks', title: 'Opt-out / recent buy', detail: 'Suppress if needed.', tone: 'decision' },
      { id: 'review', label: 'Output', title: 'Review queue or queue', detail: 'VIP to human, else stage.', tone: 'escalation' },
      { id: 'record', label: 'Record', title: 'Airtable message queue', detail: 'Staged send.', tone: 'record' },
    ],
    result: {
      summary:
        'The prototype demonstrates that event-driven segmentation and exit-check suppression can be handled deterministically with explicit rules, without relying on AI to decide who gets what message.',
      points: [
        { text: 'Fresh abandoned cart schedules a reminder after the configured delay: walkthrough-verified.', state: 'verified' },
        { text: 'Customer who buys mid-sequence is suppressed: walkthrough-verified.', state: 'verified' },
        { text: 'Opt-out honoured before scheduling: walkthrough-verified.', state: 'verified' },
        { text: 'VIP customer routed to review queue: walkthrough-verified.', state: 'verified' },
        { text: 'Live Shopify webhook integration: not started.', state: 'planned' },
        { text: 'Real email (Gmail/ESP) delivery: not started (Airtable staging only).', state: 'planned' },
        { text: 'Timezone-aware scheduling: not started.', state: 'planned' },
      ],
      disclaimer:
        'GlowLab is a fictional brand. This is a working prototype built to demonstrate architecture; it is not connected to a live store and has not processed real customer data.',
    },
    technical: {
      summary:
        'n8n prototype with simulated events, wait nodes for timing, and explicit exit-condition nodes before any message is queued. Messages are staged to an Airtable queue rather than sent, so the prototype can be inspected without sending any customer email.',
      dataFlow: [
        'Simulated events (Tally form triggers standing in for Shopify webhooks) enter the workflow.',
        'Customer-timeline node merges the event against existing records in Airtable.',
        'Segmentation node applies deterministic rules based on order value, recency and tags.',
        'Wait node applies the configured delay (1h abandoned-cart reminder, 24h post-purchase, 7d win-back, etc.).',
        'Exit checks before send: opt-out flag, recent purchase, duplicate-send guard.',
        'Staging node writes the message to Airtable with status = staged.',
      ],
      decisionLogic: [
        'Cart abandoned < 1h does not trigger an immediate reminder (anti-pushiness guard).',
        'A customer who purchases between scheduling and send time is suppressed from the abandoned-cart sequence.',
        'VIP-tagged customers are routed to the review queue rather than receiving automated messages.',
      ],
      validation: [
        'Duplicate-send suppression keyed on customer_id + sequence_id + message_index.',
        'Opt-out flag checked immediately before every send-stage.',
      ],
      exceptions: [
        'Conflicting signals (e.g., cart abandoned + support ticket opened) route to review.',
        'Wait-node interruption on new events is handled via re-filtering at send time.',
      ],
      testing: [
        'Walkthroughs on four scenarios (see result points).',
        'No load testing, no real-store integration.',
      ],
      limitations: [
        'No live Shopify or storefront connection; events are simulated.',
        'Messages are staged in Airtable, not actually sent.',
        'Scheduling is fixed-delay only; no timezone optimisation.',
        'No unsubscribe-management integration.',
        'No analytics or deliverability tracking.',
      ],
      examplePayload: `{
  "event_type": "cart_abandoned",
  "customer_id": "cust_123",
  "event_timestamp": "ISO timestamp",
  "cart_total": 42000,
  "tags": ["first_time_visitor"]
}`,
    },
  },
]

/* Filter helpers */
export const FILTER_CATEGORIES: Array<{ id: ProjectCategory | 'all'; label: string }> = [
  { id: 'all', label: PROJECT_CATEGORY_LABELS.all },
  { id: 'ecommerce-ops', label: PROJECT_CATEGORY_LABELS['ecommerce-ops'] },
  { id: 'customer-experience', label: PROJECT_CATEGORY_LABELS['customer-experience'] },
  { id: 'lead-management', label: PROJECT_CATEGORY_LABELS['lead-management'] },
  { id: 'ai-data', label: PROJECT_CATEGORY_LABELS['ai-data'] },
]

export const STATUS_FILTERS: Array<{ id: StatusKey | 'all'; label: string }> = [
  { id: 'all', label: 'Any status' },
  { id: 'done', label: STATUS_LABELS.done },
  { id: 'progress', label: STATUS_LABELS.progress },
  { id: 'planned', label: STATUS_LABELS.planned },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function relatedProjects(current: Project, count = 2): Project[] {
  return projects
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      project: p,
      score: p.categories.filter((c) => current.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.project)
}
