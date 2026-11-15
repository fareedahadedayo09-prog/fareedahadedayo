/**
 * Site config.
 */

export type ContactLink = { label: string; href: string; detail?: string }
export type Cta = { label: string; href: string; detail?: string }

export const CALENDLY_URL = 'https://calendly.com/reedahadedayo/30min'

export const site = {
  name: 'Fareedah Adedayo',
  wordmark: 'Fareedah Adedayo',
  wordmarkShort: 'FA',
  roleLabel: 'AI Workflow Automation Builder',
  location: 'Abuja, Nigeria · Remote',
  availability: 'Open to remote internships, junior roles and project work.',

  headline: 'AI-powered workflows, integrations and practical automation systems.',
  heroLead:
    'I design and build automation systems that connect business tools, APIs and AI models — with clear data flows, decision logic and human review where it matters.',

  // Portrait shown only if public/portrait.jpg exists.
  portrait: {
    src: '/portrait.jpg',
    alt: 'Portrait of Fareedah Adedayo',
  },

  nav: [
    { label: 'Projects', href: '/#projects' },
    { label: 'Problems', href: '/#problems' },
    { label: 'Services', href: '/#services' },
    { label: 'Process', href: '/#process' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],

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

  ctas: {
    primary: {
      label: 'Book a call',
      href: CALENDLY_URL,
      detail: 'Free 30-min call',
      external: true,
    } as Cta & { external?: boolean },
    secondary: {
      label: 'Send an email',
      href: 'mailto:fareedahadedayo08@gmail.com',
    } as Cta,
  },

  og: {
    title: 'Fareedah Adedayo, AI Workflow Automation Builder',
    description:
      'AI workflow automation, API integrations and practical systems built around real operational problems.',
    image: 'https://fareedahadedayo.vercel.app/og-preview-cream-v1.png',
  },

}

export type SiteConfig = typeof site
