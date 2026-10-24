/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 * ──────────────────────────────────────────────────────────────────────────
 *  This is the single place for personal details: name, photo, contact
 *  links and CTA destinations. Everything else on the site is content you
 *  would normally only change when your work changes.
 *
 *  HOW TO UPDATE:
 *   1. Replace a value below with your real information.
 *   2. Delete the "comingSoon: true" flag (or set it to false) so the link
 *      becomes active.
 *   3. Nothing else in the codebase needs to change.
 *
 *  Empty strings and `comingSoon: true` render as a clearly labelled
 *  "Coming soon" control instead of a broken button.
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
  /** Leave empty to render a "Coming soon" control. */
  href: string
  detail?: string
}

export const site = {
  /** ── Personal brand ─────────────────────────────────────────────── */
  name: 'Fareedah Sanusi Adedayo',
  wordmark: 'Fareedah Sanusi Adedayo',
  wordmarkShort: 'FA',
  roleLabel: 'AI Automation Engineer',
  location: 'Abuja, Nigeria',
  availability: [
    'Open to remote internships',
    'Junior automation roles',
    'Implementation projects',
  ],

  /** ── Hero headline (edit freely) ────────────────────────────────── */
  headline: 'Automation systems built around real operational problems.',
  heroLead:
    'I design and build workflow automations for order operations, lead qualification and business processes. My work focuses on clear decision logic, reliable data and handling exceptions properly.',

  /**
   * ── Professional portrait ────────────────────────────────────────────
   * Drop your photo into /public and point `src` at it.
   *
   *   recommended file: public/portrait.jpg  (4:5 or 1:1, ~400–800 KB)
   *   example:          public/portrait.jpg
   *
   * The component falls back to a clean labelled placeholder if the file
   * is missing, so the site never shows a broken image.
   */
  portrait: {
    src: '/portrait.svg',
    alt: 'Professional portrait of Fareedah Sanusi Adedayo',
    caption: 'Portrait',
  },

  /** ── Navigation ─────────────────────────────────────────────────── */
  nav: [
    { label: 'Projects', href: '/projects' },
    { label: 'Engineering Approach', href: '/#approach' },
    { label: 'Tools', href: '/#tools' },
    { label: 'Operations Audit', href: '/audit' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],

  /** ── Resume / CV ────────────────────────────────────────────────── */
  resume: {
    label: 'Resume',
    /** Put the file in /public (e.g. /resume.pdf) and fill in href. */
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
    github: { label: 'GitHub', href: '', detail: 'github.com/your-handle' } as ContactLink,
  },

  /** ── Calls to action ────────────────────────────────────────────── */
  ctas: {
    primary: {
      label: 'Request an AI Operations Audit',
      /** Booking link (Cal.com / Calendly) or mailto: once configured. */
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
    linkedin: '',
    x: '',
    posts: [] as string[],
  },

  /** ── Sample consulting documents ───────────────────────────────── */
  documents: {
    auditReport: {
      label: 'Sample AI Operations Audit Report',
      /** e.g. "/audit-report.pdf": leave empty until the PDF is verified. */
      href: '',
      format: 'PDF',
    },
    implementationProposal: {
      label: 'One-page Automation Implementation Proposal',
      href: '',
      format: 'PDF',
    },
  },

  /**
   * ── Social sharing metadata ──────────────────────────────────────────
   * index.html is authoritative for Open Graph and Twitter tags because they
   * need to be in the server-rendered HTML. Keep these in sync when you edit
   * the ones there.
   */
  og: {
    title: 'Fareedah Sanusi Adedayo: AI Automation Engineering',
    description:
      'Automation systems built around real operational problems. Workflows for order operations, lead qualification and business processes.',
    image: '/og-image.svg',
  },
}

export type SiteConfig = typeof site
