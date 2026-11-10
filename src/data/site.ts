/**
 * Site config.
 */

export type ContactLink = { label: string; href: string; detail?: string }
export type Cta = { label: string; href: string; detail?: string }

export const CALENDLY_URL = 'https://calendly.com/reedahadedayo/30min'

export const site = {
  name: 'Fareedah Sanusi Adedayo',
  wordmark: 'Fareedah Sanusi Adedayo',
  wordmarkShort: 'FA',
  roleLabel: 'AI Workflow Automation Builder',
  location: 'Abuja, Nigeria · Remote',
  availability: [
    'Available for remote consulting engagements',
    'Available for automation implementation projects',
  ],

  headline: 'Automation systems for better-run e-commerce operations.',
  heroLead:
    'I build automation systems that help businesses manage orders, customer enquiries, returns and repetitive operations more reliably. I combine workflow automation, connected business tools and AI where it adds practical value.',

  portrait: {
    src: '/portrait.svg',
    alt: 'Professional portrait of Fareedah Sanusi Adedayo',
    caption: 'Portrait placeholder — drop a 4:5 photo into public/portrait.jpg',
  },

  nav: [
    { label: 'Problems', href: '/#problems' },
    { label: 'Services', href: '/#services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Tools', href: '/tools' },
    { label: 'How I work', href: '/#process' },
    { label: 'Simulators', href: '/simulators' },
    { label: 'About', href: '/#about' },
    { label: 'Book a call', href: '/#contact' },
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
    primary: { label: 'Explore my work', href: '/projects', detail: 'See case studies' } as Cta,
    secondary: {
      label: 'Book a consultation',
      href: CALENDLY_URL,
      detail: '30-min free call',
    } as Cta,
  },

  og: {
    title: 'Fareedah Sanusi Adedayo — AI Workflow Automation Builder',
    description:
      'Automation systems for better-run e-commerce operations. Order processing, returns handling, lead qualification and lifecycle workflows.',
    image: '/og-image.svg',
  },
}

export type SiteConfig = typeof site
