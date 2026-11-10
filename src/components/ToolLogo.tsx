import { useState, type CSSProperties } from 'react'
import type { ToolLogo as ToolLogoDef } from '../data/tools'
import {
  AirtableInterfacesMark,
  PgvectorMark,
  RestApiMark,
  WebhooksMark,
} from './ToolCustomMarks'

/**
 * ToolLogo renders a consistently-sized brand mark tile.
 *
 * - 'simple-icons' logos come from the official Simple Icons CDN
 *   (cdn.simpleicons.org/<slug>/<hex>) pre-filled with the brand's official
 *   colour, no CSS filter tricks needed.
 *
 * - 'custom' marks are minimal neutral SVGs for concepts without a single
 *   brand logo (REST APIs, Webhooks, pgvector, Airtable Interfaces).
 *
 * A one-letter fallback is shown if the CDN request fails so the tile
 * never collapses to a broken-image icon.
 */
export function ToolLogo({
  logo,
  name,
  size = 56,
}: {
  logo: ToolLogoDef
  name: string
  size?: number
}) {
  const [errored, setErrored] = useState(false)

  const tileStyle: CSSProperties = { width: size, height: size }

  if (logo.kind === 'custom') {
    const Mark =
      logo.id === 'rest-apis'
        ? RestApiMark
        : logo.id === 'webhooks'
          ? WebhooksMark
          : logo.id === 'pgvector'
            ? PgvectorMark
            : AirtableInterfacesMark
    const inner = Math.round(size * 0.6)
    return (
      <span className="toollogo__mark toollogo__mark--custom" style={tileStyle} aria-hidden="true">
        <Mark size={inner} />
      </span>
    )
  }

  const colour = logo.hex ? logo.hex.replace('#', '') : 'e9e7e0'
  const src = `https://cdn.simpleicons.org/${logo.slug}/${colour}`
  const inner = Math.round(size * 0.6)

  if (errored) {
    return (
      <span className="toollogo__mark" style={tileStyle} aria-hidden="true">
        <span
          className="mono"
          style={{
            fontSize: size * 0.38,
            color: 'var(--text-faint)',
            letterSpacing: '0.04em',
            fontWeight: 600,
          }}
        >
          {name.charAt(0)}
        </span>
      </span>
    )
  }

  return (
    <span className="toollogo__mark" style={tileStyle} aria-hidden="true">
      <img
        src={src}
        alt=""
        width={inner}
        height={inner}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setErrored(true)}
        style={{
          width: inner,
          height: inner,
          display: 'block',
          objectFit: 'contain',
          transition: 'transform 0.28s cubic-bezier(0.2, 0.7, 0.2, 1), filter 0.28s ease',
        }}
      />
    </span>
  )
}
