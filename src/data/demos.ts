/**
 * ──────────────────────────────────────────────────────────────────────────
 *  DEMONSTRATIONS & DASHBOARD EVIDENCE
 * ──────────────────────────────────────────────────────────────────────────
 *  Both sections below are structured placeholders. Nothing here is a live
 *  integration, and no number is presented as real business performance.
 * ──────────────────────────────────────────────────────────────────────────
 */

import type { Project } from './projects'
import { projects } from './projects'

export type DemoSlot = {
  slug: string
  name: string
  description: string
  statusLabel: string
  /** Real Loom URL. Empty string renders the labelled placeholder. */
  loomUrl: string
  /** Screenshots for the demo card. Empty renders the placeholder media area. */
  screenshot: { title: string; image?: string } | null
  /** Test scenarios the video demonstrates. Empty until recorded. */
  scenarios: string[]
  /** Optional future live-chat demo. */
  liveChat?: { label: string; note: string; href: string }
}

/** Built from the project data so statuses stay consistent. */
export const demoSlots: DemoSlot[] = projects.map((p: Project) => ({
  slug: p.slug,
  name: p.name,
  description: p.summary,
  statusLabel: p.statusLabel,
  loomUrl: p.demo.loomUrl,
  screenshot: null,
  scenarios: p.demo.scenarios,
}))

/** Optional live WhatsApp or Instagram demo slot, added later if ever needed. */
export const liveChatDemo: DemoSlot = {
  slug: 'live-chat-demo',
  name: 'Live WhatsApp / Instagram demo',
  description:
    'A live conversation demo may be added later. It would use a test account, safe test data and clear boundaries, with no private customer information and no exposed credentials.',
  statusLabel: 'Not started',
  loomUrl: '',
  screenshot: null,
  scenarios: [],
  liveChat: {
    label: 'Live demo not yet live',
    note: 'Not built. No working bot is implied by this placeholder.',
    href: '',
  },
}

/**
 * Dashboard evidence. `sampleData` is illustrative only and is labelled as
 * such wherever it is rendered. Replace `sampleData` with `null` and supply
 * `realSource` once actual recorded data exists.
 */
export type DashboardMetric = {
  label: string
  value: string
  note: string
}

export const dashboardState = {
  isSample: true,
  headline: 'Dashboard evidence is illustrative until real recorded data exists.',
  realSource: '',
  sampleData: [
    { label: 'Enquiries handled', value: '412', note: 'Monthly count, illustrative' },
    { label: 'Average response time', value: '9.4 min', note: 'Illustrative' },
    { label: 'Leads classified', value: '286', note: 'Illustrative' },
    { label: 'Orders confirmed', value: '168', note: 'Illustrative' },
    { label: 'Orders cancelled', value: '24', note: 'Illustrative' },
    { label: 'Exceptions escalated', value: '17', note: 'Illustrative' },
    { label: 'Workflow failures', value: '3', note: 'Illustrative' },
  ] satisfies DashboardMetric[],
}
