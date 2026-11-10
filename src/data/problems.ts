/**
 * Business problem categories. Title plus one line each, no bullets.
 */

export type ProblemCategory = {
  id: string
  title: string
  line: string
}

export const problemCategories: ProblemCategory[] = [
  {
    id: 'orders',
    title: 'Order operations',
    line: 'Reduce repetitive checks and make order exceptions easier to review.',
  },
  {
    id: 'customer-experience',
    title: 'Customer experience',
    line: 'Organise enquiries and make customer replies more consistent.',
  },
  {
    id: 'returns',
    title: 'Returns and refunds',
    line: 'Apply clear policy rules and identify requests that need review.',
  },
  {
    id: 'lifecycle',
    title: 'Customer lifecycle',
    line: 'Plan timely follow-ups, reminders and lifecycle messages.',
  },
  {
    id: 'leads',
    title: 'Lead and enquiry management',
    line: 'Capture and sort enquiries so follow-up is easier to manage.',
  },
]
