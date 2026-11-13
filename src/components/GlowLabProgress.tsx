import type { ProgressItem } from '../data/glowlab'
import { GLOWLAB_PROGRESS } from '../data/glowlab'
import { CheckIcon, AlertIcon, BoltIcon } from './Icons'

/**
 * Four-column progress board: implemented, built-but-testing, in progress and
 * still to review. This is the honest version of a "project status" panel —
 * nothing is marked done because the case study was written.
 */
export function GlowLabProgress() {
  return (
    <div className="gl-progress">
      {GLOWLAB_PROGRESS.map((column) => (
        <section key={column.title} className="gl-progress__col">
          <header className="gl-progress__head">
            <h3 className="gl-progress__title">{column.title}</h3>
            <span className="gl-progress__caption mono">{column.caption}</span>
            <span className="gl-progress__count mono">{column.items.length}</span>
          </header>
          <ul className="gl-progress__list">
            {column.items.map((item) => (
              <li key={item.title} className={`gl-progress__item gl-progress__item--${item.state}`}>
                <ProgressIcon state={item.state} />
                <span>
                  <strong>{item.title}</strong>
                  <span className="gl-progress__note">{item.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export function ProgressIcon({ state }: { state: ProgressItem['state'] }) {
  if (state === 'done') return <CheckIcon width={13} height={13} style={{ color: 'var(--status-done)', flex: 'none', marginTop: '0.42em' }} />
  if (state === 'active') return <BoltIcon width={13} height={13} style={{ color: 'var(--status-progress)', flex: 'none', marginTop: '0.42em' }} />
  return <AlertIcon width={13} height={13} style={{ color: 'var(--text-faint)', flex: 'none', marginTop: '0.42em' }} />
}
