/**
 * ──────────────────────────────────────────────────────────────────────────
 *  BUILD JOURNAL
 * ──────────────────────────────────────────────────────────────────────────
 *  Easy to update: add a new object to the top of the `journal` array.
 *  No page edits required.
 *
 *  Categories:
 *    - build        new builds or features
 *    - experiment   experimental work, comparisons
 *    - lesson       integration or testing lesson
 *    - testing      testing discovery
 *    - site         portfolio site updates
 * ──────────────────────────────────────────────────────────────────────────
 */

export type JournalCategory = 'build' | 'experiment' | 'lesson' | 'testing' | 'site'

export type JournalEntry = {
  date: string // ISO 'YYYY-MM-DD'
  title: string
  category: JournalCategory
  /** Project slugs this entry is associated with (empty for site/general updates). */
  projectRefs: string[]
  body: string
}

export const JOURNAL_CATEGORY_LABELS: Record<JournalCategory, string> = {
  build: 'New build',
  experiment: 'Experiment',
  lesson: 'Lesson learned',
  testing: 'Testing',
  site: 'Site update',
}

export const journal: JournalEntry[] = [
  {
    date: '2026-11-09',
    title: 'Portfolio redesign: dynamic tool ecosystem, project library and interactive simulators',
    category: 'site',
    projectRefs: [],
    body:
      'Restructured the portfolio around a business-first positioning with a fully interactive tool ecosystem (searchable/filterable, 27 tools across seven categories with honest experience labels), a dynamic project library (search, multi-filter, related projects), three client-side simulators (COD orders, returns, lead qualification), a working enquiry form backed by a Vercel serverless function, an interactive architecture explorer, and an improved two-part process-cost calculator. Case studies were rewritten to a problem / solution / how-it-works / result / technical structure with at most one visual per project and expandable technical sections.',
  },
  {
    date: '2026-11-09',
    title: 'Added three interactive simulators sharing one rule-engine pattern',
    category: 'build',
    projectRefs: ['order-confirmation-risk-check', 'returns-refunds-handler', 'lead-qualification'],
    body:
      'Built a unified simulator component that renders scenario selectors, an input panel, per-check results with pass/warn/fail states, computed values, and outcome panels. Each simulator is driven by a pure function (simulateCOD, simulateReturns, simulateLead) that mirrors the logic in the corresponding n8n workflow, so future changes to the workflow can be reflected here by updating one file. The Returns simulator explicitly marks conflicting-instruction detection as designed-not-built to keep the honest status labelling consistent.',
  },
  {
    date: '2026-11-09',
    title: 'GlowLab lifecycle prototype: first walkthrough tests passing',
    category: 'testing',
    projectRefs: ['glowlab-lifecycle'],
    body:
      'Completed walkthroughs of four lifecycle scenarios (fresh abandoned cart, purchase-mid-sequence suppression, opt-out suppression, VIP review-queue routing). All four behave as designed. Next up: timezone-aware scheduling and simulated Shopify webhook payloads to tighten the integration contract.',
  },
  {
    date: '2026-11-09',
    title: 'Lesson: deterministic classification beats AI scores for lead routing',
    category: 'lesson',
    projectRefs: ['lead-qualification'],
    body:
      'Using Claude to extract structured fields from free-text messages works well with a strict JSON schema, but delegating the actual classification decision to a model produced inconsistent buckets and hard-to-debug misroutes. Switching classification to an explicit, ordered rule over extracted fields made outcomes predictable, edge cases testable, and the reason for each classification readable in the Airtable record.',
  },
  {
    date: '2026-11-09',
    title: 'First COD order happy-path verified end to end',
    category: 'build',
    projectRefs: ['order-confirmation-risk-check'],
    body:
      'Single- and multi-line orders price correctly, the eligibility branch fires, confirmation emails queue and the Airtable record writes status, rule and timestamp as designed. Cancellation, reminder and duplicate-detection paths remain partial.',
  },
]
