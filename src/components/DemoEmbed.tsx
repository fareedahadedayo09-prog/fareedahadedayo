import { LinkIcon } from './Icons'
import { MediaPlaceholder } from './MediaPlaceholder'

/**
 * Renders a Loom embed when a real share URL is supplied, otherwise a
 * labelled "Demonstration coming soon" placeholder. No invented URLs, no
 * broken iframes, no heavy embeds loaded unnecessarily.
 */
export function DemoEmbed({
  loomUrl,
  title,
  note,
}: {
  loomUrl: string
  title: string
  note?: string
}) {
  if (!loomUrl) {
    return (
      <MediaPlaceholder
        kind="video"
        title={title}
        note={note ?? 'A Loom walkthrough will be recorded and linked here.'}
        ratio="wide"
      />
    )
  }

  const match = loomUrl.match(/loom\.com\/(?:embed|share)\/([A-Za-z0-9]+)/i)

  if (match) {
    return (
      <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <iframe
          src={`https://www.loom.com/embed/${match[1]}`}
          title={`Demonstration: ${title}`}
          loading="lazy"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ width: '100%', aspectRatio: '16 / 9', border: 0, display: 'block' }}
        />
      </div>
    )
  }

  // A valid URL that is not a recognisable Loom share link: show a labelled link instead.
  return (
    <div className="card" style={{ padding: '1.4rem 1.5rem' }}>
      <div className="cluster" style={{ gap: '0.6rem', marginBottom: '0.6rem' }}>
        <span className="eyebrow">Demonstration</span>
      </div>
      <h3 style={{ fontSize: '1.02rem' }}>{title}</h3>
      <p className="muted" style={{ fontSize: '0.87rem', marginTop: '0.5rem' }}>
        {note}
      </p>
      <a
        className="link-arrow"
        href={loomUrl}
        target="_blank"
        rel="noreferrer"
        style={{ marginTop: '0.9rem' }}
      >
        Open demonstration
        <LinkIcon width={14} height={14} />
      </a>
    </div>
  )
}
