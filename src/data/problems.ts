/**
 * ──────────────────────────────────────────────────────────────────────────
 *  BUSINESS PROBLEM CATEGORIES
 * ──────────────────────────────────────────────────────────────────────────
 *  Written entirely in plain English so a nontechnical business owner can
 *  recognise their own operational friction. No buzzwords, no jargon.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ProblemCategory = {
  id: string
  title: string
  eyebrow: string
  summary: string
  problems: string[]
}

export const problemCategories: ProblemCategory[] = [
  {
    id: 'orders',
    title: 'Order operations',
    eyebrow: '01',
    summary:
      'Before an order leaves the warehouse, someone has to check details, confirm totals, contact the customer, and flag anything that looks off. Doing all of this by hand is where mistakes happen.',
    problems: [
      'Manual checks repeated for every new order.',
      'Confirmation messages that go out late or not at all.',
      'Incomplete delivery or contact information that slips through.',
      'Orders that need special attention getting mixed in with routine ones.',
    ],
  },
  {
    id: 'customer-experience',
    title: 'Customer experience',
    eyebrow: '02',
    summary:
      'Customers ask the same kinds of questions every day. When each answer is typed from scratch, responses are slow, inconsistent, and depend on who is available.',
    problems: [
      'Repetitive questions answered one message at a time.',
      'Enquiries waiting because the team is busy elsewhere.',
      'Support requests scattered across channels with no shared view.',
      'Urgent or sensitive enquiries not standing out from routine ones.',
    ],
  },
  {
    id: 'returns',
    title: 'Returns and refunds',
    eyebrow: '03',
    summary:
      'Returns require judgement. When decisions are made conversationally, the same kind of request can get a different answer on different days, and policy exceptions leave no paper trail.',
    problems: [
      'Return eligibility checked by hand against policy every time.',
      'Policy applied inconsistently between similar requests.',
      'Refund requests that need a person not being reliably escalated.',
      'Resolutions documented poorly or not at all.',
    ],
  },
  {
    id: 'lifecycle',
    title: 'Customer lifecycle',
    eyebrow: '04',
    summary:
      'After a customer places an order — or nearly does — there are follow-up moments that matter. Missing them is invisible until it shows up in retention numbers.',
    problems: [
      'Abandoned carts with no follow-up message.',
      'Post-purchase communication that depends on someone remembering.',
      'Customers grouped loosely rather than by what they actually did.',
      'Repeat-purchase and retention opportunities left to chance.',
    ],
  },
  {
    id: 'leads',
    title: 'Lead and enquiry management',
    eyebrow: '05',
    summary:
      'Incoming enquiries arrive in different shapes and from different places. Triage happens in someone\u2019s head, and hot leads can go cold while waiting for a reply.',
    problems: [
      'Enquiries sorted by hand rather than by priority.',
      'High-intent prospects waiting for a response because the queue is long.',
      'Lead information spread across messages, forms and spreadsheets.',
      'Follow-up done when remembered, not when planned.',
    ],
  },
]
