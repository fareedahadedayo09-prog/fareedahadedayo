/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SERVICES / CAPABILITIES
 * ──────────────────────────────────────────────────────────────────────────
 *  Types of systems I can build. Every offering here is supported by at least
 *  one existing project or hands-on build. Nothing is claimed as delivered
 *  for paying clients.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type Service = {
  id: string
  title: string
  summary: string
  detail: string
  projectRef?: string // slug of a project that demonstrates work in this area
}

export const services: Service[] = [
  {
    id: 'order-workflows',
    title: 'E-commerce order workflow automation',
    summary:
      'Automated checks, confirmations and exception handling for incoming orders, especially cash-on-delivery and manual-confirmation flows.',
    detail:
      'Bring pricing, configured checks, confirmations and record-keeping into one workflow, with a clear path for orders that need attention.',
    projectRef: 'order-confirmation-risk-check',
  },
  {
    id: 'support-triage',
    title: 'Customer enquiry and support triage',
    summary:
      'Structuring incoming enquiries so they can be categorised, prioritised and routed without being lost.',
    detail:
      'Capture relevant details up front, sort enquiries by type and design a clear handoff for cases that need a person.',
  },
  {
    id: 'returns',
    title: 'Returns and refunds workflow automation',
    summary:
      'Consistent application of return-policy rules, with explicit escalation for anything the policy does not cover cleanly.',
    detail:
      'Design a workflow to validate requests, apply policy rules and identify unusual or disputed cases for human review.',
    projectRef: 'returns-refunds-handler',
  },
  {
    id: 'lifecycle',
    title: 'Abandoned-cart and customer lifecycle automation',
    summary:
      'Follow-up messages and lifecycle sequences that are triggered by what the customer actually did, not by a generic schedule.',
    detail:
      'Prototype-stage lifecycle workflows that connect order events to timed follow-up messages, with logic for customer segments and opt-out handling. Currently demonstrated as a prototype, not a live store integration.',
    projectRef: 'glowlab-lifecycle',
  },
  {
    id: 'lead-qualification',
    title: 'AI-assisted lead qualification',
    summary:
      'Structuring and classifying incoming leads against explicit criteria so follow-up decisions are consistent.',
    detail:
      'Normalise enquiries, apply explicit qualification rules and record a next action, with a review path for uncertain cases.',
    projectRef: 'lead-qualification',
  },
  {
    id: 'integrations',
    title: 'Business process automation and system integrations',
    summary:
      'Connecting tools your business already uses, forms, databases, email, spreadsheets and messaging, so information moves without being re-typed.',
    detail:
      'Typical work: webhook-driven flows between form tools, Airtable and email; data validation before records are written; structured queues for items a person needs to review.',
  },
]
