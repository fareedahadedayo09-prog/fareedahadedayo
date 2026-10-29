import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
})

export const ArrowRight = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const VideoIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="2.5" y="6" width="13" height="12" rx="2" />
    <path d="M15.5 10.5l6-3.5v10l-6-3.5" />
  </svg>
)

export const DownloadIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 3v12M7 10l5 5 5-5M4 20h16" />
  </svg>
)

export const MailIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 7l8.5 6 8.5-6" />
  </svg>
)

export const LinkIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M10 13a4 4 0 0 0 6 .5l2.5-2.5a4 4 0 0 0-5.66-5.66L10.5 6.5" />
    <path d="M14 11a4 4 0 0 0-6-.5L5.5 13a4 4 0 0 0 5.66 5.66L13.5 17.5" />
  </svg>
)

export const GithubIcon = (props: IconProps) => (
  <svg {...base({ strokeWidth: 0, fill: 'currentColor', ...props })}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
)

export const MenuIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

export const AlertIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9 2.5 17.5A2 2 0 0 0 4.2 20.5h15.6a2 2 0 0 0 1.7-3l-7.8-13.6a2 2 0 0 0-3.4 0z" />
  </svg>
)

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const BoltIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
)
