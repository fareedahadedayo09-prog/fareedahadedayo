/**
 * Minimal inline marks for concepts that do not have an official brand logo
 * (REST APIs, Webhooks, pgvector, Airtable Interfaces). These are neutral,
 * simple line marks, not fake brand logos.
 */

type Props = { size?: number }

export function RestApiMark({ size = 34 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h11a4 4 0 0 1 0 8H4" />
      <path d="M7 11h13" />
      <circle cx="18" cy="11" r="2" />
      <path d="M4 7v8" />
    </svg>
  )
}

export function WebhooksMark({ size = 34 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="5" cy="6" r="1.8" />
      <circle cx="19" cy="6" r="1.8" />
      <circle cx="12" cy="19" r="1.8" />
      <path d="M6.4 7.4 10.7 17.4M17.6 7.4 13.3 17.4" />
      <path d="M7 6h10" />
    </svg>
  )
}

export function PgvectorMark({ size = 34 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="pgv-g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--text-muted)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#pgv-g)" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <g fill="currentColor">
        <circle cx="7" cy="15" r="1.4" />
        <circle cx="12" cy="8" r="1.4" />
        <circle cx="17.5" cy="14" r="1.4" />
      </g>
      <path d="M7 15 12 8l5.5 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function AirtableInterfacesMark({ size = 34 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
      <rect x="5" y="6" width="5" height="4" rx="1" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
      <rect x="11" y="6" width="8" height="1.2" rx="0.6" fill="currentColor" fillOpacity="0.5" />
      <rect x="11" y="8.5" width="6" height="1" rx="0.5" fill="currentColor" fillOpacity="0.35" />
      <path d="M5 13h14M5 16h10M5 18h7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  )
}
