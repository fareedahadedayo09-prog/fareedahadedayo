/**
 * Client-side walkthroughs of the project case studies.
 * Inputs are selected examples, not live records or a reproduction of every
 * rule in the underlying workflows. These functions have no side effects.
 */
export type CheckTone = 'pass' | 'fail' | 'warn'
export type OutcomeTone = 'confirmed' | 'approved' | 'routed' | 'flagged' | 'rejected' | 'staged'

export type Check = { id: string; label: string; tone: CheckTone; detail: string }
export type Scenario = {
  id: string
  title: string
  description: string
  /** Only used for an explicitly planned, not-yet-built path. */
  illustrative?: boolean
  input: Record<string, unknown>
}
export type SimulationResult = {
  outcome: { tone: OutcomeTone; label: string; detail: string }
  checks: Check[]
  computed?: Record<string, string | number | null>
}

const check = (id: string, label: string, detail: string, tone: CheckTone = 'pass'): Check => ({ id, label, detail, tone })

/* COD: the selected order category and response are example inputs, not an
 * invented numeric risk threshold or an automatic customer decision. */
export const COD_SCENARIOS: Scenario[] = [
  { id: 'cod-confirm', title: 'Customer confirms', description: 'A routine order is confirmed and availability is selected.', input: { order_type: 'Routine, below the configured amount', duplicate: 'No match', customer_response: 'Confirm', availability: 'Selected in the n8n form' } },
  { id: 'cod-cancel', title: 'Customer cancels', description: 'A routine order is cancelled through the customer email.', input: { order_type: 'Routine, below the configured amount', duplicate: 'No match', customer_response: 'Cancel' } },
  { id: 'cod-reminder', title: 'No response', description: 'A reminder is due after the configured waiting period.', input: { order_type: 'Routine, below the configured amount', duplicate: 'No match', customer_response: 'No response; reminder due' } },
  { id: 'cod-high', title: 'High-value order', description: 'Staff are alerted to call before dispatch.', input: { order_type: 'High-value', duplicate: 'No match', customer_response: 'Staff follow-up' } },
  { id: 'cod-duplicate', title: 'Duplicate order', description: 'The incoming order matches an existing order.', input: { order_type: 'Routine, below the configured amount', duplicate: 'Match found', customer_response: 'Not requested' } },
]

export function simulateCOD(input: Record<string, unknown>): SimulationResult {
  const checks = [check('intake', 'Order received', 'An example cash-on-delivery order enters the workflow.')]
  if (input.duplicate === 'Match found') {
    checks.push(check('duplicate', 'Duplicate detected', 'The example matches an existing order; the duplicate path is selected.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Duplicate path', detail: 'Duplicate detection is described as tested in the case study. The subsequent handling is not specified here.' } }
  }
  checks.push(check('duplicate', 'No duplicate match', 'The example follows the non-duplicate path and order information is recorded in Airtable.'))
  if (input.order_type === 'High-value') {
    checks.push(check('risk', 'High-value order', 'The example is flagged for staff follow-up.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Staff call requested', detail: 'A staff alert prompts a call before dispatch. This demonstration does not send an email or place a call.' } }
  }
  if (input.order_type !== 'Routine, below the configured amount') {
    return { checks, outcome: { tone: 'flagged', label: 'Order type not specified', detail: 'Select a documented example; the threshold and other risk rules are not calculated here.' } }
  }
  checks.push(check('route', 'Routine order', 'The customer is offered confirm and cancel options by email.'))
  if (input.customer_response === 'Confirm') {
    checks.push(check('response', 'Customer confirms', 'The customer is directed to an n8n form to choose availability.'))
    checks.push(check('availability', 'Availability submitted', 'The selected availability is recorded in Airtable in the described workflow.'))
    return { checks, outcome: { tone: 'confirmed', label: 'Confirmed with availability', detail: 'This example shows the confirmation and availability path, not a real order update.' } }
  }
  if (input.customer_response === 'Cancel') {
    checks.push(check('response', 'Customer cancels', 'The customer selects the cancellation option.', 'warn'))
    return { checks, outcome: { tone: 'rejected', label: 'Cancellation path', detail: 'The example follows the customer cancellation path. No actual order is changed.' } }
  }
  if (input.customer_response === 'No response; reminder due') {
    checks.push(check('response', 'No response yet', 'A reminder is due after the configured period.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Reminder path', detail: 'The described workflow sends a reminder to customers who have not responded. The reminder timing is not specified here.' } }
  }
  return { checks, outcome: { tone: 'flagged', label: 'Awaiting a response', detail: 'The email does not itself confirm the order. A customer response or staff action is still needed.' } }
}

/* Returns: policy rules and exception paths are presented at the level the
 * case study documents. No made-up policy window or actual refund execution. */
export const RETURNS_SCENARIOS: Scenario[] = [
  { id: 'ret-complete', title: 'Complete request', description: 'A request has the required fields and reaches policy evaluation.', input: { example: 'Complete request', order_reference: 'Provided', item_and_reason: 'Provided' } },
  { id: 'ret-missing', title: 'Missing required field', description: 'An incomplete request does not proceed to policy evaluation.', input: { example: 'Missing field', order_reference: 'Missing', item_and_reason: 'Provided' } },
  { id: 'ret-outside', title: 'Out-of-policy request', description: 'Illustrate the escalation branch whose end-to-end testing is not documented.', input: { example: 'Out of policy', policy_result: 'Outside the applicable policy' } },
  { id: 'ret-conflict', title: 'Conflicting instructions', description: 'See the planned conflict-detection path, which is not yet built.', illustrative: true, input: { example: 'Conflicting instructions', request: 'Refund and exchange for the same item' } },
]
export function simulateReturns(input: Record<string, unknown>): SimulationResult {
  const checks = [check('intake', 'Return request received', 'An example request enters the workflow.')]
  if (input.example === 'Missing field') {
    checks.push(check('validation', 'Required field missing', 'The request does not pass validation.', 'fail'))
    return { checks, outcome: { tone: 'rejected', label: 'Incomplete request', detail: 'The case study describes missing-field validation as walkthrough-verified. No policy decision or refund is issued by this simulation.' } }
  }
  if (input.example === 'Conflicting instructions') {
    checks.push(check('conflict', 'Conflicting instructions', 'Detection is designed but not yet built.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Planned review path', detail: 'This is a design scenario, not a functioning conflict detector or a live handoff.' } }
  }
  if (input.example === 'Out of policy') {
    checks.push(check('policy', 'Out-of-policy example', 'The documented escalation branch is selected.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Escalation path', detail: 'The case study says this branch is implemented but not end-to-end verified, and the human queue notification is not yet wired.' } }
  }
  if (input.example === 'Complete request') {
    checks.push(check('validation', 'Required fields present', 'The example proceeds to policy evaluation.'))
    checks.push(check('policy', 'Policy evaluation', 'Rules are evaluated in the documented sequence; the outcome depends on the applicable policy.', 'warn'))
    return { checks, outcome: { tone: 'routed', label: 'Ready for policy evaluation', detail: 'No specific approval, denial, lookup or refund is assumed. The case study describes the complete-request path as walkthrough-verified.' } }
  }
  return { checks, outcome: { tone: 'flagged', label: 'Example not specified', detail: 'Choose one of the documented return scenarios.' } }
}

/* BrightSun: the warm classification is an explicitly selected example from
 * the supplied evidence, not a fabricated keyword classifier or AI model. */
export const LEAD_SCENARIOS: Scenario[] = [
  { id: 'lead-intake', title: 'Website enquiry', description: 'A lead submits the company website form.', input: { example: 'Website enquiry', intake: 'Embedded Airtable form', enquiry: 'Solar installation enquiry' } },
  { id: 'lead-warm', title: 'Warm lead example', description: 'Show the warm-lead acknowledgement and staff alert from the case-study evidence.', input: { example: 'Warm lead', classification: 'Warm, selected example', follow_up: 'Staff monitor and follow up' } },
  { id: 'lead-clarification', title: 'Clarification requested', description: 'A response asks the lead to clarify information in the enquiry.', input: { example: 'Clarification', enquiry: 'Electricity cost needs clarification' } },
]
export function simulateLead(input: Record<string, unknown>): SimulationResult {
  const checks = [check('intake', 'Enquiry received', 'The case study describes an Airtable form embedded on the company website and connected to an Airtable base.')]
  if (input.example === 'Warm lead') {
    checks.push(check('qualification', 'Warm classification', 'Warm is selected for this example; scoring criteria are not calculated here.'))
    checks.push(check('response', 'Customer response', 'The supplied staff alert states that a personalised AI response was sent.'))
    return { checks, outcome: { tone: 'routed', label: 'Staff monitoring', detail: 'The example alert asks staff to review qualification details, monitor the conversation and follow up when appropriate.' } }
  }
  if (input.example === 'Clarification') {
    checks.push(check('response', 'Clarification requested', 'The supplied email asks the lead to confirm an electricity cost.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Awaiting clarification', detail: 'This illustrates the supplied acknowledgement email, not a live AI response or a guarantee about every enquiry.' } }
  }
  if (input.example === 'Website enquiry') {
    checks.push(check('record', 'Connected Airtable base', 'The described form captures enquiry information in Airtable.'))
    checks.push(check('qualification', 'Qualification and routing', 'The n8n workflow supports qualification; the exact decision criteria are not specified in the case study.', 'warn'))
    return { checks, outcome: { tone: 'routed', label: 'Enquiry captured for qualification', detail: 'Staff can use the lead information for follow-up. No category or response is invented for this example.' } }
  }
  return { checks, outcome: { tone: 'flagged', label: 'Example not specified', detail: 'Choose one of the documented lead scenarios.' } }
}

/* GlowLab is an in-progress prototype using simulated events and Airtable
 * staging. This walkthrough never sends a message or connects to a store. */
export const GLOWLAB_SCENARIOS: Scenario[] = [
  { id: 'glow-cart', title: 'Abandoned cart', description: 'A reminder is staged after the configured delay.', input: { example: 'Abandoned cart', event: 'Simulated cart abandonment', customer_state: 'No purchase or opt-out in this example' } },
  { id: 'glow-purchase', title: 'Customer purchases', description: 'A purchase suppresses the abandoned-cart reminder.', input: { example: 'Purchase', event: 'Simulated purchase during sequence' } },
  { id: 'glow-optout', title: 'Customer opts out', description: 'The opt-out suppresses follow-up messages.', input: { example: 'Opt-out', customer_state: 'Opted out' } },
  { id: 'glow-vip', title: 'VIP customer', description: 'The prototype routes a VIP case for review.', input: { example: 'VIP', customer_state: 'VIP' } },
]
export function simulateGlowLab(input: Record<string, unknown>): SimulationResult {
  const checks = [check('event', 'Simulated event', 'The prototype uses simulated events, not a live Shopify connection.')]
  if (input.example === 'Purchase') {
    checks.push(check('exit', 'Purchase detected', 'The abandoned-cart follow-up is suppressed.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Reminder suppressed', detail: 'No message is staged for this example. No real customer email is sent.' } }
  }
  if (input.example === 'Opt-out') {
    checks.push(check('exit', 'Opt-out checked', 'Follow-up is suppressed for an opted-out customer.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Follow-up suppressed', detail: 'The prototype walkthrough honours the opt-out; this demonstration does not update a live system.' } }
  }
  if (input.example === 'VIP') {
    checks.push(check('review', 'VIP case', 'The case is routed for review rather than a routine message.', 'warn'))
    return { checks, outcome: { tone: 'flagged', label: 'Review path', detail: 'The prototype illustrates a human-review handoff. This demo does not notify staff.' } }
  }
  if (input.example === 'Abandoned cart') {
    checks.push(check('delay', 'Configured delay', 'The prototype schedules an abandoned-cart reminder after its configured delay.'))
    checks.push(check('exit', 'Exit checks', 'No purchase or opt-out is selected for this example.'))
    return { checks, outcome: { tone: 'staged', label: 'Message staged, not sent', detail: 'In the described prototype, the message is staged in Airtable rather than emailed. This demonstration writes nothing to Airtable.' } }
  }
  return { checks, outcome: { tone: 'flagged', label: 'Example not specified', detail: 'Choose one of the documented prototype scenarios.' } }
}

export type SimulatorId = 'cod' | 'returns' | 'lead' | 'glowlab'
export type SimulatorDef = {
  id: SimulatorId
  projectSlug: string
  title: string
  subtitle: string
  scenarios: Scenario[]
  run: (input: Record<string, unknown>) => SimulationResult
  disclaimer: string
}
export const SIMULATORS: Record<SimulatorId, SimulatorDef> = {
  cod: {
    id: 'cod', projectSlug: 'order-confirmation-risk-check', title: 'COD Order Confirmation & Risk Assessment',
    subtitle: 'Explore customer confirmation, reminders, duplicates and staff follow-up.', scenarios: COD_SCENARIOS, run: simulateCOD,
    disclaimer: 'Example paths based on the case study. The real risk threshold and every exception are not reproduced. No orders, emails, calls or Airtable records are created or changed.',
  },
  returns: {
    id: 'returns', projectSlug: 'returns-refunds-handler', title: 'Returns & Refunds Policy Handler',
    subtitle: 'Explore validation, policy evaluation and the status of escalation paths.', scenarios: RETURNS_SCENARIOS, run: simulateReturns,
    disclaimer: 'The applicable policy rules are not reproduced. Out-of-policy escalation is not end-to-end verified; conflict detection is designed but not built, and the human queue is not connected. No decisions or refunds are issued.',
  },
  lead: {
    id: 'lead', projectSlug: 'lead-qualification', title: 'BrightSun Solar: Lead Qualification & Routing',
    subtitle: 'Explore enquiry intake, a warm-lead example and a clarification response.', scenarios: LEAD_SCENARIOS, run: simulateLead,
    disclaimer: 'The warm category is a selected example from the supplied evidence, not a prediction. Actual scoring rules and AI model details are not established here. No AI, emails or Airtable writes are performed.',
  },
  glowlab: {
    id: 'glowlab', projectSlug: 'glowlab-lifecycle', title: 'GlowLab E-commerce Lifecycle Prototype',
    subtitle: 'Explore simulated lifecycle events, suppression and review.', scenarios: GLOWLAB_SCENARIOS, run: simulateGlowLab,
    disclaimer: 'GlowLab is an in-progress prototype with simulated events. Its messages are staged in Airtable, not sent. This separate demonstration does not connect to Shopify, send email or write records.',
  },
}
