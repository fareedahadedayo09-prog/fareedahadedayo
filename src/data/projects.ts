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

  // ─────────────────── 4. GLOWLAB LIFECYCLE ───────────────────
  {
    slug: 'glowlab-lifecycle',
    name: 'GlowLab E-commerce Lifecycle Prototype',
    tagline:
      'A working prototype of event-driven lifecycle messaging for a fictional skincare brand.',
    status: 'progress',
    statusLabel: STATUS_LABELS.progress,
    statusDetail: 'An ongoing prototype in progress. The documented walkthrough uses simulated events and stages messages in Airtable rather than sending them.',
    tools: ['n8n', 'tally', 'airtable', 'gmail', 'shopify'],
    timeline: 'Prototype in progress',
    categories: ['ecommerce-ops', 'customer-experience', 'ai-data'],
    heroVisual: { caption: 'Lifecycle automation flow (prototype)' },
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
