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
    line: 'Orders checked, confirmed and flagged without manual work.',
  },
  {
    id: 'customer-experience',
    title: 'Customer experience',
    line: 'Common questions answered fast and consistently.',
  },
  {
    id: 'returns',
    title: 'Returns and refunds',
    line: 'Policy applied the same way every time, with exceptions sent to a person.',
  },
  {
    id: 'lifecycle',
    title: 'Customer lifecycle',
    line: 'Follow-ups, reminders and win-back messages that send themselves.',
  },
  {
    id: 'leads',
    title: 'Lead and enquiry management',
    line: 'Every enquiry captured, sorted and answered quickly.',
  },
]
