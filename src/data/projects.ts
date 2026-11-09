/**
 * ──────────────────────────────────────────────────────────────────────────
 *  PROJECT CONTENT — case-study-first structure
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
 *  Four projects exactly as specified — no invented completed builds.
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
    name: 'COD Order Confirmation & Risk Assessment',
    tagline:
      'Automated pricing, risk checking and confirmation-link dispatch for cash-on-delivery orders.',
    status: 'done',
    statusLabel: STATUS_LABELS.done,
    statusDetail: STATUS_DETAIL_DEFAULT.done,
    tools: ['n8n', 'tally', 'airtable', 'gmail'],
    timeline: 'Completed build',
    categories: ['ecommerce-ops', 'customer-experience'],
    heroVisual: { useSimulator: true },
    hasSimulator: true,
    problem: {
      summary:
        'Cash-on-delivery orders were priced and checked for eligibility by hand before dispatch, producing mispriced totals, inconsistent approval decisions and customers who never received a confirmation link.',
      whyItMatters:
        'A mispriced or unconfirmed order turns into a failed delivery \u2014 courier time and fuel wasted, a customer who did not get what they expected, and a business with no clean record of what was agreed at order time.',
      bullets: [
        'Repeated manual arithmetic on data the customer had already submitted.',
        'Inconsistent eligibility decisions between similar orders.',
        'No durable record of which message was sent, to whom, and when.',
        'Failed deliveries caused by unconfirmed or mispriced orders.',
      ],
    },
    solution: {
      summary:
        'A Tally form triggers an n8n workflow that prices the order, applies a fixed risk rule and sends the customer a confirmation or cancellation link. Every outcome is written back to Airtable with the rule applied and a timestamp.',
      automated: [
        'Pricing: totals and delivery fee are calculated from line items.',
        'Validation: required fields and numeric checks before any message is sent.',
        'Branching: eligible orders receive a confirmation link; others are handled by rule.',
        'Record-keeping: every run writes status, outcome and timestamp to Airtable.',
      ],
      humanControl: [
        'Orders that fail the risk threshold are flagged for review rather than auto-cancelled.',
        'Orders with missing or invalid inputs are held for correction, not messaged.',
        'Risk thresholds and eligibility conditions are written configuration, editable by the business.',
      ],
    },
    workflow: [
      { id: 'trigger', label: 'Trigger', title: 'Order submitted', detail: 'Tally form fires a webhook.', tone: 'trigger' },
      { id: 'validate', label: 'Step 1', title: 'Validate input', detail: 'Check required fields, numeric quantities.', tone: 'default' },
      { id: 'price', label: 'Step 2', title: 'Price order', detail: 'Sum line items + delivery fee.', tone: 'default' },
      { id: 'risk', label: 'Decision', title: 'Risk rule', detail: 'Eligibility threshold.', tone: 'decision' },
      { id: 'confirm', label: 'Path A', title: 'Send confirmation', detail: 'Gmail confirmation link.', tone: 'output' },
      { id: 'escalate', label: 'Path B', title: 'Flag for review', detail: 'High-risk / invalid held.', tone: 'escalation' },
      { id: 'record', label: 'Record', title: 'Write to Airtable', detail: 'Status, rule, timestamp.', tone: 'record' },
    ],
    result: {
      summary:
        'The happy path \u2014 complete, well-formed order within the risk threshold \u2014 is fully automated end-to-end: the form triggers the workflow, pricing is computed, the rule is applied and a confirmation link is queued without human intervention. Exceptions are surfaced for review with the failing check attached.',
      points: [
        { text: 'Single line item priced and confirmed: verified.', state: 'verified' },
        { text: 'Multiple line items with mixed quantities: verified.', state: 'verified' },
        { text: 'Risk-threshold failure routes to cancellation/flag path: implemented, not yet end-to-end verified.', state: 'partial' },
        { text: 'Non-numeric quantity rejected and recorded: implemented, not yet verified.', state: 'partial' },
        { text: 'Duplicate submission detection: not started.', state: 'planned' },
        { text: 'Failed-send automated retry: not started.', state: 'planned' },
      ],
      disclaimer:
        'These are test-run results against a controlled set of orders, not production telemetry. They demonstrate that the logic executes; they are not evidence of business impact.',
    },
    technical: {
      summary:
        'n8n workflow triggered by a Tally webhook. Normalisation code nodes coerce fields to numbers and trim strings before any calculation. Every branch writes to Airtable before exiting, so there is no "happy-path-only" record. Decision rules are explicit expressions, not AI calls.',
      dataFlow: [
        'Tally webhook POSTs JSON payload to n8n.',
        'Code nodes normalise fields (trim strings, coerce quantities to numbers).',
        'Pricing node computes total = Σ(qty × price) + delivery_fee.',
        'IF node evaluates eligibility (total ≤ threshold, phone valid, address long enough).',
        'Gmail node sends confirmation or cancellation link from a template.',
        'Airtable node upserts the order record with status, rule and timestamp.',
      ],
      decisionLogic: [
        'Pricing is arithmetic; no model is involved.',
        'Eligibility is a deterministic AND of configured conditions.',
        'The rule applied is written back to the record for re-checkability.',
      ],
      validation: [
        'Required-field check runs before pricing.',
        'Quantities must be positive numbers; non-numeric stops the run.',
        'Missing delivery fee is treated as an input problem, not silently zero.',
      ],
      exceptions: [
        'A failed email send is recorded on the order for manual retry.',
        'Missing or invalid inputs are flagged; no customer message is sent.',
        'No duplicate detection yet (known limitation).',
      ],
      testing: [
        'Walkthrough-tested on clean, high-risk and invalid-input scenarios (use the simulator above).',
        'Cancellation path and failed-send path not yet end-to-end verified.',
      ],
      limitations: [
        'No duplicate-order detection; two identical submissions produce two runs.',
        'No reminder ladder if a customer does not confirm.',
        'Binary branch only \u2014 no "needs more info" escalation tier beyond invalid-input rejection.',
        'Single currency, single delivery-fee model.',
        'No monitoring or failure alerting on the workflow.',
      ],
      examplePayload: `{
  "customer_name": "Amaka Okafor",
  "address": "14 Allen Avenue, Ikeja, Lagos",
  "phone": "+234 803 123 4567",
  "delivery_fee": 2500,
  "line_items": [
    { "product": "Vitamin C Serum", "quantity": 1, "unit_price": 14500 },
    { "product": "Cleanser",       "quantity": 2, "unit_price":  8500 }
  ]
}`,
    },
  },

  // ─────────────────── 2. RETURNS & REFUNDS ───────────────────
  {
    slug: 'returns-refunds-handler',
    name: 'Returns & Refunds Policy Handler',
    tagline:
      'Consistent policy evaluation for return requests, with explicit human escalation.',
    status: 'done',
    statusLabel: STATUS_LABELS.done,
    statusDetail: STATUS_DETAIL_DEFAULT.done,
    tools: ['n8n', 'tally', 'airtable'],
    timeline: 'Completed build',
    categories: ['ecommerce-ops', 'customer-experience'],
    heroVisual: { caption: 'Returns policy decision flow' },
    hasSimulator: true,
    problem: {
      summary:
        'Return decisions were made one message at a time by whoever was available. The same kind of request could get a different answer on different days, policy exceptions were granted conversationally with no record, and conflicting customer instructions were resolved by whoever read them first.',
      whyItMatters:
        'Returns are high-stakes customer moments \u2014 inconsistent answers erode trust, undocumented policy exceptions create precedent the business did not agree to, and conflicting instructions lead to customers receiving something they did not ask for.',
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
      { id: 'conflict', label: 'Step 3', title: 'Conflict detection', detail: 'Self-contradictions.', tone: 'decision' },
      { id: 'decision', label: 'Output', title: 'Decision / Escalate', detail: 'Rule applied OR human queue.', tone: 'escalation' },
      { id: 'record', label: 'Record', title: 'Write to Airtable', detail: 'Outcome + rule + reason.', tone: 'record' },
    ],
    result: {
      summary:
        'Validation and policy-evaluation paths are built so that well-formed return requests are evaluated in a fixed, reviewable order. Cases outside the policy or with conflicting signals stop at a human queue rather than being auto-answered.',
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
        'Staged n8n pipeline so expensive checks (policy lookup, conflict detection) only run after validation passes. Every stage writes a structured record; the human-escalation branch is a first-class output, not a catch-all.',
      dataFlow: [
        'Return request captured via Tally webhook.',
        'Validation node checks required fields (order reference, item, reason).',
        'Policy-rules node applies rules in a fixed sequence (window, item type, condition, reason).',
        'Conflict-detection node flags contradictory selections (designed, not built).',
        'Branch: accept / deny / escalate; each writes to Airtable with rule id.',
      ],
      decisionLogic: [
        'Rules evaluated in fixed order so the outcome is deterministic.',
        'No AI calls in the decision path \u2014 policy rules are explicit.',
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
        'Walkthroughs on well-formed, missing-field and out-of-policy scenarios (use the simulator).',
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
    name: 'AI-Assisted Lead Qualification & Routing',
    tagline:
      'Structuring and classifying incoming enquiries so follow-up decisions are consistent and auditable.',
    status: 'done',
    statusLabel: STATUS_LABELS.done,
    statusDetail: STATUS_DETAIL_DEFAULT.done,
    tools: ['n8n', 'tally', 'airtable', 'claude-api'],
    timeline: 'Completed build',
    categories: ['lead-management', 'ai-data'],
    heroVisual: { caption: 'Lead qualification and routing flow' },
    hasSimulator: true,
    problem: {
      summary:
        'Leads arrived in different shapes across a form and direct messages. Classification happened in the reader\u2019s head, so similar enquiries got different treatment, and follow-up depended on memory rather than a rule.',
      whyItMatters:
        'Inconsistent triage means hot leads can go cold while low-intent enquiries get immediate attention, and there is no record of why any given lead was routed the way it was.',
      bullets: [
        'Unstructured intake from multiple channels with no shared format.',
        'Classification performed from memory.',
        'No durable record of next action or assignment.',
        'Follow-up depended on being remembered.',
      ],
    },
    solution: {
      summary:
        'A Tally form and a direct-message channel both feed one n8n workflow. Claude is used only to extract structured fields from free-text messages; classification itself is a deterministic rule. Records missing required fields or failing classification are held for review rather than forced into a bucket.',
      automated: [
        'Normalisation of name, contact, interest and source across channels.',
        'Deterministic classification into explicit buckets.',
        'Assignment of an owner and a next action in Airtable.',
        'Flagging of incomplete or unclassifiable records for review.',
      ],
      humanControl: [
        'Records missing a contact detail are flagged, not discarded.',
        'Records that match no bucket are held for review rather than default-classified.',
        'Classification buckets and their order are written configuration, editable by the business.',
      ],
    },
    workflow: [
      { id: 'trigger', label: 'Trigger', title: 'Enquiry arrives', detail: 'Tally form or DM.', tone: 'trigger' },
      { id: 'extract', label: 'Step 1', title: 'Extract fields', detail: 'Claude extraction for free text.', tone: 'default' },
      { id: 'validate', label: 'Step 2', title: 'Validate', detail: 'Required fields present.', tone: 'default' },
      { id: 'classify', label: 'Decision', title: 'Classify', detail: 'Deterministic rule order.', tone: 'decision' },
      { id: 'route', label: 'Output', title: 'Route or hold', detail: 'Assign owner, next action.', tone: 'escalation' },
      { id: 'record', label: 'Record', title: 'Write to Airtable', detail: 'Classification + reason.', tone: 'record' },
    ],
    result: {
      summary:
        'Well-formed enquiries are extracted, classified and recorded with a next action without manual intervention. Edge cases \u2014 missing contact details, unrecognisable message text, no matching bucket \u2014 are held in a review queue with the reason attached.',
      points: [
        { text: 'Well-formed Tally enquiry classified correctly: verified.', state: 'verified' },
        { text: 'Free-text DM extracted by Claude into structured fields: implemented, walkthrough-verified.', state: 'partial' },
        { text: 'Missing contact detail flagged as incomplete: verified.', state: 'verified' },
        { text: 'Unclassifiable enquiry held for review: implemented, not yet verified.', state: 'partial' },
        { text: 'Duplicate lead detection: not started.', state: 'planned' },
        { text: 'Daily follow-up digest: not started.', state: 'planned' },
      ],
      disclaimer:
        'Results are walkthrough outcomes, not production telemetry from a live CRM.',
    },
    technical: {
      summary:
        'Two intake paths (form and DM) funnel into a single normalisation step. Claude is used only as a structured extractor, constrained by a JSON-schema output, and its output is validated before downstream routing \u2014 it never makes the classification decision itself.',
      dataFlow: [
        'Tally webhook (structured) and DM webhook (free-text) both enter the same n8n workflow.',
        'Free-text messages are sent to Claude with a strict extraction prompt and JSON schema.',
        'Validation node checks required fields and rejects/flags incomplete records.',
        'Classification node evaluates buckets in fixed order; first match wins.',
        'Router node assigns an owner and writes next action to Airtable.',
      ],
      decisionLogic: [
        'Classification is a deterministic IF/ELSE chain over extracted fields.',
        'Buckets are ordered explicitly to make mis-filing predictable.',
        'Claude is instructed to return "unknown" for fields it cannot extract rather than guess.',
      ],
      validation: [
        'JSON-schema validation on Claude output.',
        'Required-field checks on name and contact.',
        'Records with unknown/unclassified fields are held, not defaulted.',
      ],
      exceptions: [
        'A failed Claude call raises an error rather than producing a blank classification.',
        'Unclassifiable records are held with the raw input attached.',
        'No duplicate detection yet (known limitation).',
      ],
      testing: [
        'Walkthroughs on well-formed, missing-contact and free-text scenarios (use the simulator).',
        'Text extraction handles a narrow range of phrasings; will expand with real message samples.',
      ],
      limitations: [
        'No duplicate detection across channels.',
        'No daily follow-up digest; follow-up is still manual.',
        'Classification buckets are a first pass.',
        'Text extraction handles a narrow range of phrasings.',
        'No connection to a live CRM or marketing tool.',
      ],
      examplePayload: `{
  "intake_channel": "dm",
  "raw_message": "Hi, I saw your skincare line and would like to discuss bulk pricing for my store in PH.",
  "extracted": {
    "name": null,
    "interest": "wholesale",
    "product_line": "skincare",
    "location": "Port Harcourt"
  },
  "received_at": "ISO timestamp"
}`,
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
    statusDetail: STATUS_DETAIL_DEFAULT.progress,
    tools: ['n8n', 'tally', 'airtable', 'gmail', 'shopify'],
    timeline: 'Prototype in progress',
    categories: ['ecommerce-ops', 'customer-experience', 'ai-data'],
    heroVisual: { caption: 'Lifecycle automation flow (prototype)' },
    hasSimulator: false,
    problem: {
      summary:
        'Follow-up after a customer places an order \u2014 or nearly places one \u2014 was manual. Abandoned-cart reminders went out late or not at all, post-purchase check-ins were skipped during busy weeks, and messages were sometimes sent to customers who had already bought or opted out.',
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
