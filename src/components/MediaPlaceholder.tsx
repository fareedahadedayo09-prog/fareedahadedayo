import type { CSSProperties } from 'react'
import { ImageIcon, VideoIcon, AlertIcon } from './Icons'

type Props = {
  kind?: 'screenshot' | 'video' | 'document'
  title: string
  note?: string
  /** Real image path. When supplied, the placeholder is replaced by the image. */
  image?: string
  alt?: string
  ratio?: 'tall' | 'wide' | 'box'
  className?: string
}

const ratioAspect: Record<NonNullable<Props['ratio']>, string> = {
  tall: '4 / 5',
  wide: '16 / 10',
  box: '1 / 1',
}

/**
 * Neutral placeholder for screenshots, video slots and document slots.
 *
 * Pass `image` to show a real screenshot instead. Nothing is ever rendered
 * that could be mistaken for evidence from a real implementation.
 */
export function MediaPlaceholder({
  kind = 'screenshot',
  title,
  note,
  image,
  alt,
  ratio = 'wide',
  className,
}: Props) {
  if (image) {
    return (
      <figure className={className} style={{ margin: 0 }}>
        <div style={{ overflow: 'hidden', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <img
            src={image}
            alt={alt ?? title}
            loading="lazy"
            decoding="async"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
        <figcaption className="muted mono" style={{ fontSize: '0.75rem', marginTop: '0.6rem' }}>
          {title}
        </figcaption>
      </figure>
    )
  }

  const Icon = kind === 'video' ? VideoIcon : kind === 'document' ? AlertIcon : ImageIcon
  const label =
    kind === 'video' ? 'Demonstration coming soon' : kind === 'document' ? 'Document coming soon' : 'Screenshot coming soon'

  const style: CSSProperties = {
    aspectRatio: ratioAspect[ratio],
    ...(className ? {} : {}),
  }

  return (
    <div className={`media-ph ${className ?? ''}`} style={style}>
      <div className="media-ph__row">
        <Icon className="media-ph__icon" />
        <span className="media-ph__label">{label}</span>
      </div>
      <div className="stack-sm">
        <span className="media-ph__title">{title}</span>
        {note ? <span className="media-ph__note">{note}</span> : null}
      </div>
    </div>
  )
}
