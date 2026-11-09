/**
 * ──────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG
 * ──────────────────────────────────────────────────────────────────────────
 *  Personal details, positioning, navigation and contact destinations.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ContactLink = {
  label: string
  href: string
  detail?: string
}

export type Cta = {
  label: string
  href: string
  detail?: string
}

export const site = {
  /** ── Personal brand ─────────────────────────────────────────────── */
  name: 'Fareedah Sanusi Adedayo',
  wordmark: 'Fareedah Sanusi Adedayo',
  wordmarkShort: 'FA',
  roleLabel: 'AI Workflow Automation Builder',
  location: 'Abuja, Nigeria · Remote',
  availability: [
    'Available for remote consulting engagements',
    'Available for automation implementation projects',
  ],

  /** ── Hero ──────────────────────────────────────────────────────── */
  headline: 'Automation systems for better-run e-commerce operations.',
  heroLead:
    'I build automation systems that help businesses manage orders, customer enquiries, returns and repetitive operations more reliably. I combine workflow automation, connected business tools and AI where it adds practical value.',

  /** ── Professional portrait ──────────────────────────────────────── */
  portrait: {
    src: '/portrait.svg',
    alt: 'Professional portrait of Fareedah Sanusi Adedayo',
    caption: 'Portrait placeholder — drop a 4:5 photo into public/portrait.jpg',
  },

  /** ── Navigation ─────────────────────────────────────────────────── */
  nav: [
    { label: 'Problems I solve', href: '/#problems' },
    { label: 'Services', href: '/#services' },
    { label: 'Projects', href: '/projects' },
    { label: 'How I work', href: '/#process' },
    { label: 'About', href: '/#about' },
    { label: 'Journal', href: '/#journal' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/#contact' },
  ],

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
  },

  /** ── Calls to action ────────────────────────────────────────────── */
  ctas: {
    primary: {
      label: 'Explore my work',
      href: '/projects',
      detail: 'See case studies',
    } as Cta,
    secondary: {
      label: 'Discuss an automation project',
      href: 'mailto:fareedahadedayo08@gmail.com?subject=Automation%20project%20enquiry',
      detail: 'Start by email',
    } as Cta,
  },

  /** ── Social sharing metadata ────────────────────────────────────── */
  og: {
    title: 'Fareedah Sanusi Adedayo — AI Workflow Automation Builder',
    description:
      'Automation systems for better-run e-commerce operations. Workflow automation for orders, customer enquiries, returns and lead management.',
    image: '/og-image.svg',
  },
}

export type SiteConfig = typeof site
