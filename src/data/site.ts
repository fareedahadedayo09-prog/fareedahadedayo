/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 * ──────────────────────────────────────────────────────────────────────────
 *  Personal details and the destinations for every call to action.
 *  Everything else on the site is project or methodology content and lives in
 *  the other files under src/data/.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ContactLink = {
  label: string
  /** Absolute URL, e.g. "mailto:you@example.com" or "https://linkedin.com/in/you". */
  href: string
  /** Short line rendered under the button, e.g. "you@example.com". */
  detail?: string
}

export type Cta = {
  label: string
  /** Leave empty to omit the button entirely rather than show a dead one. */
  href: string
  detail?: string
}

export const site = {
  /** ── Personal brand ─────────────────────────────────────────────── */
  name: 'Fareedah Sanusi Adedayo',
  wordmark: 'Fareedah Sanusi Adedayo',
  wordmarkShort: 'FA',
  roleLabel: 'AI Automation Consultant and Systems Builder',
  location: 'Abuja, Nigeria',
  availability: ['Open to consulting engagements', 'Automation implementation projects', 'Corporate automation roles'],

  /** ── Hero ──────────────────────────────────────────────────────── */
  headline: 'Automation systems built around real operational problems.',
  heroLead:
    'I analyze business processes, identify opportunities to improve how work gets done, and build automation systems around defined requirements, decision logic and measurable outcomes.',

  /**
   * ── Professional portrait ──────────────────────────────────────────────
   * Drop your photo into /public and point `src` at it.
   *   recommended: public/portrait.jpg  (4:5 or 1:1, ~400–800 KB)
   *
   * Falls back to a clean labelled placeholder if the file is missing, so the
   * site never shows a broken image.
   */
  portrait: {
    src: '/portrait.svg',
    alt: 'Professional portrait of Fareedah Sanusi Adedayo',
    caption: 'Portrait',
  },

  /** ── Navigation ─────────────────────────────────────────────────── */
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Approach', href: '/#approach' },
    { label: 'Tools', href: '/#tools' },
    { label: 'Operations Audit', href: '/audit' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],

  /** ── Resume / CV ────────────────────────────────────────────────── */
  resume: {
    label: 'Resume',
    href: '',
    detail: 'PDF',
  },

  /** ── Contact channels ───────────────────────────────────────────── */
  contact: {
    email: {
      label: 'Email',
      href: 'mailto:fareedahadedayo08@gmail.com',
      detail: 'fareedahadedayo08@gmail.com',
    } as ContactLink,
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/fareedah-adedayo-8b7b1729a',
      detail: 'linkedin.com/in/fareedah-adedayo-8b7b1729a',
    } as ContactLink,
    github: { label: 'GitHub', href: '', detail: 'Not linked yet' } as ContactLink,
  },

  /**
   * ── Calls to action ──────────────────────────────────────────────────
   * Leave `href` empty and the button is omitted rather than shown as a
   * nonfunctional control. Nothing on this site is ever a dead button.
   */
  ctas: {
    primary: {
      label: 'Request an AI Operations Audit',
      href: '',
      detail: '30 min · remote',
    } as Cta,
    secondary: {
      label: 'Book a Discovery Call',
      href: '',
      detail: '20 min · remote',
    } as Cta,
  },

  /** ── Build in public ────────────────────────────────────────────── */
  social: {
    linkedin: 'https://www.linkedin.com/in/fareedah-adedayo-8b7b1729a',
    x: '',
    posts: [] as string[],
  },

  /** ── Social sharing metadata ────────────────────────────────────── */
  og: {
    title: 'Fareedah Sanusi Adedayo: AI Automation Engineering',
    description:
      'Automation systems built around real operational problems. Workflows for order operations, lead qualification and business processes.',
    image: '/og-image.svg',
  },
}

export type SiteConfig = typeof site
