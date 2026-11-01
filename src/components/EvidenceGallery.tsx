import { useEffect, useRef, useState } from 'react'
import type { ScreenshotSlot } from '../data/projects'

function EvidenceViewer({ shot, onClose }: { shot: ScreenshotSlot; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  // null fits the available space; 1 displays one image pixel per CSS pixel.
  const [zoom, setZoom] = useState<number | null>(null)

  useEffect(() => {
    const element = dialog.current
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    element?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog ref={dialog} className="evidence-viewer" aria-labelledby="evidence-viewer-title" aria-describedby="evidence-viewer-help" onCancel={(event) => { event.preventDefault(); onClose() }}>
      <div className="evidence-viewer__layout">
        <header className="evidence-viewer__header">
          <h2 id="evidence-viewer-title">{shot.title}</h2>
          <button type="button" className="btn btn--secondary" onClick={onClose} autoFocus aria-label="Close image viewer">Close ×</button>
        </header>
        <div className="evidence-viewer__toolbar" role="group" aria-label="Image zoom controls">
          <button type="button" className="btn btn--secondary" onClick={() => setZoom(null)} aria-pressed={zoom === null}>Fit</button>
          <button type="button" className="btn btn--secondary" onClick={() => setZoom(1)} aria-pressed={zoom === 1}>Original size</button>
          <button type="button" className="btn btn--secondary" aria-label="Zoom out" disabled={zoom !== null && zoom <= 0.25} onClick={() => setZoom(Math.max(0.25, (zoom ?? 1) - 0.25))}>−</button>
          <output aria-live="polite" aria-label="Zoom level">{zoom === null ? 'Fit' : `${Math.round(zoom * 100)}%`}</output>
          <button type="button" className="btn btn--secondary" aria-label="Zoom in" disabled={zoom !== null && zoom >= 4} onClick={() => setZoom(Math.min(4, (zoom ?? 1) + 0.25))}>+</button>
        </div>
        <p id="evidence-viewer-help" className="evidence-viewer__help">Use Original size to inspect source pixels. Zoom in, then scroll or swipe to inspect details. Press Escape or Close to return.</p>
        <div className="evidence-viewer__scroll" tabIndex={0} role="region" aria-label="Scrollable evidence image">
          <div className={`evidence-viewer__canvas${zoom === null ? ' is-fit' : ''}`} style={zoom !== null && size.width ? { width: size.width * zoom, height: size.height * zoom } : undefined}>
            <img src={shot.image} alt={shot.alt ?? shot.caption} draggable={false} onLoad={(event) => setSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })} />
          </div>
        </div>
        <div className="evidence-viewer__caption">
          <p>{shot.caption}</p>
          {shot.note ? <p className="muted">{shot.note}</p> : null}
          <a href={shot.image} target="_blank" rel="noreferrer">Open original image in a new tab</a>
        </div>
      </div>
    </dialog>
  )
}

export function EvidenceGallery({ screenshots }: { screenshots: ScreenshotSlot[] }) {
  const [selected, setSelected] = useState<ScreenshotSlot | null>(null)
  if (!screenshots.length) return null

  return (
    <div className="evidence-gallery">
      <h3 className="evidence-gallery__heading">Recorded evidence</h3>
      <p className="muted">Select any screenshot to enlarge it, view its original size and zoom into details.</p>
      <div className="evidence-gallery__list">
        {screenshots.map((shot) => (
          <figure key={shot.id}>
            <button type="button" className="evidence-gallery__preview" aria-label={`Enlarge ${shot.title}`} aria-haspopup="dialog" onClick={() => setSelected(shot)}>
              <img src={shot.image} alt={shot.alt ?? shot.caption} loading="lazy" decoding="async" />
              <span>Enlarge image ↗</span>
            </button>
            <figcaption>
              <strong>{shot.title}</strong>
              <p className="muted">{shot.caption}</p>
              {shot.note ? <p className="muted">{shot.note}</p> : null}
            </figcaption>
          </figure>
        ))}
      </div>
      {selected ? <EvidenceViewer key={selected.id} shot={selected} onClose={() => setSelected(null)} /> : null}
    </div>
  )
}
