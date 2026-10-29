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

export type CaseStudyBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: [string, string]; rows: [string, string][] }
  | { type: 'link'; label: string; href: string }

export type CaseStudySection = {
  id: string
  label: string
  status: SectionStatus
  paragraphs: string[]
  bullets?: string[]
  note?: { tone: 'info' | 'warn' | 'grey'; text: string }
  table?: { keys: string[]; values: string[] }
  blocks?: CaseStudyBlock[]
}

export type ScreenshotSlot = {
  id: string
  /** Path to the image file in /public. */
  image: string
  /** Short title above the image. */
  title: string
  /** Caption shown below the image. */
  caption: string
  /** Accessible description for the image, separate from the visible caption. */
  alt?: string
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
        image: '/screenshots/cod-workflow-diagram.webp',
        title: 'COD order-processing workflow',
        caption: 'Workflow canvas',
      },
      {
        id: 'cod-risk-alert',
        image: '/screenshots/cod-high-risk-alert.webp',
        title: 'High-risk alert',
        caption: 'The team alert shows the risk summary, call action and checklist. Customer-identifying values are redacted.',
      },
      {
        id: 'cod-airtable-outcomes',
        image: '/screenshots/cod-three-outcomes-airtable.webp',
        title: 'Airtable order records',
        caption: 'The Airtable view shows three test-order outcomes. Customer and order values are redacted.',
      },
      {
        id: 'cod-cancellation-page',
        image: '/screenshots/cod-cancellation-page.webp',
        title: 'Cancellation page',
        caption: 'The branded page confirms the order was cancelled without a charge. Customer and order details are redacted.',
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
      'BrightSun Solar is a lead-qualification case study. The workflow takes a new Airtable lead through field normalisation, duplicate checking and AI scoring, then routes it as Hot, Warm or Review. The warm reply path is demonstrated; the other branches are described in the case study according to their current state.',
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
        image: '/screenshots/lead-qualification-workflow.webp',
        title: 'Lead qualification workflow diagram',
        caption: 'BrightSun Solar lead qualification workflow, from enquiry to personalised reply and staff alert.',
        note: 'Hot and needs-review routes are built into the workflow. This case study demonstrates the warm path, and the morning follow-up digest is not yet enabled.',
      },
      {
        id: 'lead-n8n-canvas',
        image: '/screenshots/lead-n8n-canvas.webp',
        title: 'n8n workflow canvas',
        caption: 'The BrightSun Solar lead system in n8n. A new Airtable lead is checked for duplicates, scored by an AI model, saved, and routed by score. This walkthrough follows one warm lead.',
      },
      {
        id: 'lead-airtable-intake',
        image: '/screenshots/lead-airtable-intake.webp',
        title: 'Airtable, intake',
        caption: 'The enquiry lands in Airtable with fields for property type, location, decision-maker status, monthly energy spend, budget and main problem. Contact-specific values are redacted.',
      },
      {
        id: 'lead-acknowledgement-header',
        image: '/screenshots/lead-acknowledgement-header.webp',
        title: 'Acknowledgement email, header',
        caption: 'The lead gets a branded reply within minutes of submitting the form.',
      },
      {
        id: 'lead-acknowledgement-body',
        image: '/screenshots/lead-acknowledgement-body.webp',
        title: 'Acknowledgement email, body',
        caption: 'The reply is generated from the lead’s answers. In this demonstrated path, the AI flags an inconsistent energy-cost answer and asks for clarification rather than assuming. Contact-specific text is redacted in the image.',
      },
      {
        id: 'lead-warm-alert-header',
        image: '/screenshots/lead-warm-alert-header.webp',
        title: 'Warm alert',
        caption: 'Staff are notified when a lead is classed as warm.',
      },
      {
        id: 'lead-warm-alert-details',
        image: '/screenshots/lead-warm-alert-details.webp',
        title: 'Warm alert, contact details',
        caption: 'Staff receive the lead profile and a note that the AI has already replied, so the team can monitor the conversation and follow up. Contact-specific values are redacted in the image.',
      },
      {
        id: 'lead-hot-lead-alert',
        image: '/screenshots/lead-qualification-hot-lead-alert.webp',
        title: 'Hot-lead alert email',
        caption: 'A BrightSun Solar email marks the enquiry as a high-priority hot lead and recommends a team follow-up action. Lead identifiers are redacted in the image.',
      },
    ],
    links: [],
  },

  // ──────────────────────────────────────────────────────────────────────
  {
    slug: 'returns-refunds-handler',
    name: 'AI-Assisted Returns & Refunds Handler',
    summary:
      "An n8n workflow that processes e-commerce return requests, looks up order records in Airtable, applies business-policy rules, and uses Google Gemini to analyze tone and draft context-aware customer responses. Standard cases follow an automated response path, while requests requiring human judgement are escalated with diagnostic context.",
    status: 'done',
    statusLabel: 'Completed standalone workflow build',
    statusDetail: '',
    tools: ['n8n', 'Google Gemini 2.5 Pro', 'Airtable', 'Gmail'],
    timeline: 'Completed standalone workflow build',
    overview:
      "An n8n workflow that processes e-commerce return requests, looks up order records in Airtable, applies business-policy rules, and uses Google Gemini to analyze tone and draft context-aware customer responses. Standard cases follow an automated response path, while requests requiring human judgement are escalated with diagnostic context. This project demonstrates policy-based routing, structured AI output, operational recordkeeping, exception handling, and customer-support automation. Evidence includes a six-record Airtable Returns Desk, an automated final-sale response for BL-1003, a human-escalation notice for BL-1006, and the n8n workflow canvas. This is a portfolio build, not a claim of production deployment or measured business impact.",
    sections: [
      {
        id: 'problem',
        label: 'The problem',
        status: 'verified',
        paragraphs: [],
        blocks: [
          { type: 'paragraph', text: "Return requests can require multiple steps: identifying the correct order, checking the applicable policy, understanding the customer's issue, composing an appropriate response, and deciding whether a support representative needs to intervene." },
          { type: 'paragraph', text: 'When these steps are handled manually and inconsistently, similar cases can receive different responses. Requests involving damaged items, mismatched order details, or other exceptions also need a traceable reason for escalation.' },
          { type: 'paragraph', text: 'This project explores how a workflow can standardize routine return handling while keeping exceptions visible and reviewable.' },
          { type: 'heading', text: 'The workflow addresses four operational challenges:' },
          { type: 'list', items: [
            '**Consistency:** Apply business-policy rules to return requests rather than relying entirely on conversational judgement.',
            '**Order verification:** Retrieve the relevant order record before processing a request.',
            '**Context-aware communication:** Generate customer responses that reflect the request and its recorded outcome.',
            '**Exception handling:** Record why a case needs human review and provide the support team with diagnostic context.',
          ] },
          { type: 'paragraph', text: 'The goal is not to automate every support decision. It is to automate appropriate routine steps while preserving a route to human judgement.' },
        ],
      },
      {
        id: 'workflow',
        label: 'How it works',
        status: 'verified',
        paragraphs: [],
        blocks: [
          { type: 'heading', text: 'Workflow overview' },
          { type: 'paragraph', text: 'The scheduled n8n workflow checks for new, unhandled return requests and processes them one at a time. It normalizes request details, looks up the associated order in Airtable, evaluates the request against business-policy rules, and uses Google Gemini to support tone analysis and customer-response generation.' },
          { type: 'paragraph', text: 'The outcome is recorded in Airtable. Requests eligible for automated handling follow the customer-response path, while cases requiring human judgement trigger an internal Gmail alert. An error-trigger branch is configured to notify the team when a workflow execution fails.' },
          { type: 'heading', text: 'Workflow stages' },
          { type: 'table', headers: ['Step', 'Implementation'], rows: [
            ['1. Scheduled intake', 'Checks for new, unhandled return requests and processes them one at a time.'],
            ['2. Request normalization', 'Normalizes request details and prepares them for order lookup and evaluation.'],
            ['3. Order lookup', 'Searches Airtable for the purchase record associated with the request.'],
            ['4. Policy evaluation', 'Applies business rules and records the reason for the resulting outcome.'],
            ['5. Tone analysis and response generation', 'Uses Google Gemini to support tone analysis and generate structured, context-aware response content.'],
            ['6. Routing and recordkeeping', 'Saves the outcome and related details in Airtable, then follows the automated-response or human-review route.'],
            ['7. Customer or internal email', 'Uses Gmail to send the customer response or notify the support team.'],
            ['8. Error notification', 'Includes an error-trigger branch configured to send a Gmail alert when workflow execution fails.'],
          ] },
          { type: 'heading', text: 'Architecture principle' },
          { type: 'paragraph', text: '**Business rules determine the outcome. AI supports communication.**' },
          { type: 'paragraph', text: 'The workflow uses policy logic to control how a request is handled. Gemini contributes tone analysis and structured response content; it is not intended to independently override store policy.' },
          { type: 'paragraph', text: 'This separation makes the intended decision process easier to inspect and helps limit the authority given to the language model.' },
        ],
      },
      {
        id: 'decisions',
        label: 'Decision logic',
        status: 'verified',
        paragraphs: [],
        blocks: [
          { type: 'heading', text: 'How decisions are handled' },
          { type: 'paragraph', text: 'The workflow combines order information, business-policy rules, tone information, and structured AI-generated response content to process return requests.' },
          { type: 'paragraph', text: 'The outcome and handling status are recorded in Airtable so that a case can be reviewed after processing.' },
          { type: 'paragraph', text: 'Two representative outcomes are documented in the supplied evidence.' },
          { type: 'heading', text: 'Case 1: BL-1003 — Final-sale item' },
          { type: 'paragraph', text: '**Outcome: Auto-handled**' },
          { type: 'paragraph', text: "A return request involving a final-sale clearance item is declined under the store's policy. The workflow records the outcome and sends an automated customer email explaining the decline." },
          { type: 'paragraph', text: 'The evidence demonstrates a policy-based decline and the corresponding customer response.' },
          { type: 'heading', text: 'Case 2: BL-1006 — Damaged item and email mismatch' },
          { type: 'paragraph', text: '**Outcome: Needs human review**' },
          { type: 'paragraph', text: "A damaged-item claim contains a mismatch between the requester's email and the email associated with the order record. Rather than treating the request as an ordinary automated case, the workflow routes it to human support." },
          { type: 'paragraph', text: 'The internal Gmail alert includes diagnostic context and indicates that a temporary holding reply has been sent.' },
          { type: 'paragraph', text: 'This allows a support representative to investigate the discrepancy and take over the case.' },
          { type: 'heading', text: 'What is recorded' },
          { type: 'paragraph', text: 'The Airtable Returns Desk provides a centralized record of the requests and their processing outcomes, including:' },
          { type: 'list', items: [
            'Order references and return-request details.',
            'Policy decision reasons.',
            'Tone or sentiment labels.',
            'Generated-reply fields.',
            'Handling status, including Auto-handled and Needs human.',
          ] },
          { type: 'paragraph', text: 'These records provide a basis for reviewing individual cases and identifying scenarios that need further testing.' },
          { type: 'paragraph', text: 'The two examples above are representative outcomes, not proof that every policy branch has been tested.' },
        ],
      },
      {
        id: 'safeguards',
        label: 'Exceptions and safeguards',
        status: 'partial',
        paragraphs: [],
        blocks: [
          { type: 'heading', text: 'Human escalation' },
          { type: 'paragraph', text: 'Not every return request should be resolved automatically. Requests that require additional judgement or verification need a clear path to a support representative.' },
          { type: 'paragraph', text: 'The workflow includes the following safeguards:' },
          { type: 'list', items: [
            '**Already-handled check:** Checks whether a request has already been processed before continuing.',
            '**Order-detail mismatch:** Records the email/order mismatch as part of the reason for escalating BL-1006.',
            '**Human-review route:** Sends an internal Gmail alert containing diagnostic context for the support team.',
            '**Holding-response indication:** The BL-1006 alert indicates that a temporary customer holding reply has been sent.',
            '**Execution-error notification:** Includes an error-trigger branch configured to notify the team through Gmail.',
          ] },
          { type: 'heading', text: 'Current evidence' },
          { type: 'paragraph', text: 'The supplied screenshots demonstrate the final-sale decline and the email-mismatch escalation.' },
          { type: 'paragraph', text: 'The error-alert branch is visible on the workflow canvas, but the supplied evidence does not include a failed execution with a confirmed notification. Likewise, the current gallery does not establish successful handling of every possible exception.' },
          { type: 'paragraph', text: 'The following scenarios still need dedicated test evidence:' },
          { type: 'list', items: [
            'Missing or ambiguous order matches.',
            'Duplicate or conflicting order records.',
            'Contradictory instructions in customer messages.',
            'Malformed or incomplete AI output.',
            'Gmail delivery failures and other execution errors.',
          ] },
          { type: 'paragraph', text: 'These remain testing and reliability improvements rather than verified capabilities.' },
        ],
      },
      {
        id: 'evidence',
        label: 'Evidence and testing',
        status: 'verified',
        paragraphs: [],
        blocks: [
          { type: 'heading', text: 'Recorded evidence' },
          { type: 'paragraph', text: 'The evidence gallery contains the workflow canvas and representative Airtable and Gmail outputs. Together, these show the implemented structure and two specific processing outcomes.' },
          { type: 'heading', text: '1. Airtable Returns Desk' },
          { type: 'paragraph', text: '**Evidence:** Six return records with order references, decision reasons, tone labels, generated-reply fields, and handling statuses.' },
          { type: 'link', label: 'View Airtable Returns Desk screenshot', href: 'https://fareedahadedayo-8yfzsom0c-fareedahadedayo09-prog.vercel.app/screenshots/returns-airtable-grid.webp' },
          { type: 'paragraph', text: 'The dashboard demonstrates how return requests and their outcomes are organized in a centralized record. Customer names and generated reply text are redacted; order references and outcome statuses remain visible.' },
          { type: 'heading', text: '2. Automated customer response — BL-1003' },
          { type: 'paragraph', text: '**Evidence:** Gmail message declining a return for a final-sale clearance item under store policy.' },
          { type: 'link', label: 'View automated return reply screenshot', href: 'https://fareedahadedayo-8yfzsom0c-fareedahadedayo09-prog.vercel.app/screenshots/returns-auto-reply.webp' },
          { type: 'paragraph', text: 'The message demonstrates the customer-facing response for the documented final-sale case. The customer name is redacted in the greeting.' },
          { type: 'heading', text: '3. Human-support alert — BL-1006' },
          { type: 'paragraph', text: '**Evidence:** Internal Gmail alert for a damaged-item claim with an email/order mismatch.' },
          { type: 'link', label: 'View human-support alert screenshot', href: 'https://fareedahadedayo-8yfzsom0c-fareedahadedayo09-prog.vercel.app/screenshots/returns-human-alert.webp' },
          { type: 'paragraph', text: 'The alert provides diagnostic context for the support team and indicates that a temporary holding reply has been sent. The customer name and email address are redacted.' },
          { type: 'heading', text: '4. n8n workflow canvas' },
          { type: 'paragraph', text: '**Evidence:** Visual workflow showing scheduled intake, order lookup, policy processing, Gemini structured output, response routing, and an error-alert branch.' },
          { type: 'link', label: 'View n8n workflow canvas screenshot', href: 'https://fareedahadedayo-8yfzsom0c-fareedahadedayo09-prog.vercel.app/screenshots/returns-n8n-workflow.webp' },
          { type: 'paragraph', text: 'The canvas documents the orchestration design and how the workflow components connect. It is evidence of the workflow structure, not proof that every possible execution path has been tested.' },
          { type: 'heading', text: 'What the evidence establishes' },
          { type: 'paragraph', text: 'The supplied artefacts document:' },
          { type: 'list', items: [
            'A six-record Airtable Returns Desk.',
            'An automated decline for the documented final-sale case.',
            'A human-escalation alert for the documented email-mismatch case.',
            'A workflow canvas containing the main processing route and an error-alert branch.',
          ] },
          { type: 'paragraph', text: 'They do not establish production reliability, comprehensive edge-case coverage, or a quantified improvement in support performance.' },
        ],
      },
      {
        id: 'limitations',
        label: 'Limitations and next improvements',
        status: 'partial',
        paragraphs: [],
        blocks: [
          { type: 'heading', text: 'Current limitations' },
          { type: 'paragraph', text: 'This project is a standalone workflow build. The available screenshots document representative outputs, not a complete execution log or production service.' },
          { type: 'paragraph', text: 'The main limitations are:' },
          { type: 'list', items: [
            'Missing-order, duplicate-match, contradictory-instruction, and malformed-output scenarios still need dedicated test evidence.',
            'The error-alert branch is configured, but a successful end-to-end failure-notification test is not included in the supplied evidence.',
            'The gallery contains one captioned automated customer response and one captioned human-escalation alert.',
            'Production deployment, sustained reliability, and quantified business impact have not been established.',
          ] },
          { type: 'heading', text: 'Next improvements' },
          { type: 'heading', text: '1. Expand test coverage' },
          { type: 'paragraph', text: 'Create repeatable test cases for missing orders, duplicate matches, conflicting instructions, malformed model output, and email-delivery failures. Record the expected result and actual workflow outcome for each case.' },
          { type: 'heading', text: '2. Strengthen output validation' },
          { type: 'paragraph', text: "Validate AI-generated structured output before using it downstream. Define a safe fallback when required fields are missing, the output cannot be parsed, or the generated response does not meet the workflow's requirements." },
          { type: 'heading', text: '3. Verify failure notifications' },
          { type: 'paragraph', text: 'Intentionally trigger a controlled workflow failure, confirm that the error branch runs, and capture the resulting internal notification.' },
          { type: 'heading', text: '4. Improve auditability' },
          { type: 'paragraph', text: 'Ensure each processed request has a traceable outcome, decision reason, handling status, and relevant execution context. Review how retries and repeated scheduled runs affect already-handled requests.' },
          { type: 'heading', text: '5. Evaluate operational performance' },
          { type: 'paragraph', text: 'After sufficient controlled testing and, if appropriate, a monitored pilot, measure processing success rate, escalation frequency, handling time, and response-delivery failures. No performance improvements are claimed until supported by measured results.' },
          { type: 'heading', text: 'Project takeaway' },
          { type: 'paragraph', text: 'This project demonstrates how n8n, Airtable, Gmail, and Google Gemini can be combined into a structured customer-support workflow with policy-based handling, AI-assisted communication, centralized records, and a human-escalation path.' },
          { type: 'paragraph', text: 'The central design decision is to keep business-policy handling distinct from AI-generated communication, while making exceptions visible for human review.' },
        ],
      },
    ],
    screenshots: [
      {
        id: 'returns-airtable-desk',
        image: '/screenshots/returns-airtable-grid.webp',
        title: 'Airtable Returns Desk',
        caption: 'Centralized Airtable database (Returns Desk) managing inbound customer requests, policy evaluation reasons, sentiment analysis (tone), generated replies, and execution statuses (Auto-handled vs. Needs human).',
        alt: 'Airtable Returns Desk dashboard showing order IDs, decision reasons, and execution statuses.',
        note: 'Customer names and generated reply text are redacted; order references and outcome statuses remain visible.',
      },
      {
        id: 'returns-auto-reply',
        image: '/screenshots/returns-auto-reply.webp',
        title: 'Automated return reply · BL-1003',
        caption: 'End-to-end automated email response sent directly to customer (Order BL-1003) declining an invalid return request per store policy rules for final sale clearance items.',
        alt: 'Gmail screenshot showing automated customer reply for order BL-1003.',
        note: 'The customer name is redacted in the greeting.',
      },
      {
        id: 'returns-human-alert',
        image: '/screenshots/returns-human-alert.webp',
        title: 'Human-support alert · BL-1006',
        caption: 'Automated internal team alert triggered for Order BL-1006 (damaged item claim with email mismatch), providing human support agents with full diagnostic context and a temporary holding reply flag.',
        alt: 'Gmail screenshot showing team notification alert for order BL-1006.',
        note: 'The customer name and email address are redacted.',
      },
      {
        id: 'returns-n8n-workflow',
        image: '/screenshots/returns-n8n-workflow.webp',
        title: 'n8n workflow canvas',
        caption: 'Full n8n orchestration graph featuring scheduled triggers, database lookups, business logic validation, Google Gemini LLM structured parsing, conditional email routing, and error handling.',
        alt: 'n8n editor canvas displaying visual node workflow.',
      },
    ],
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
