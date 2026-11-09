import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { getProject } from '../data/projects'
import { JOURNAL_CATEGORY_LABELS, journal, type JournalCategory, type JournalEntry } from '../data/journal'

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`
}

export function Journal() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<JournalCategory | 'all'>('all')
  const [projectFilter, setProjectFilter] = useState<string>('all')

  // All project slugs referenced by journal entries.
  const referencedProjects = useMemo(() => {
    const set = new Set<string>()
    for (const e of journal) for (const p of e.projectRefs) set.add(p)
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return journal.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false
      if (projectFilter !== 'all' && !e.projectRefs.includes(projectFilter)) return false
      if (!q) return true
      return (
        e.title.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q) ||
        e.projectRefs.some((p) => p.toLowerCase().includes(q))
      )
    })
  }, [search, cat, projectFilter])

  const allCategories = Object.keys(JOURNAL_CATEGORY_LABELS) as JournalCategory[]

  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Home
            </Link>
            <span className="eyebrow">Build journal</span>
            <h1 className="cs-hero__title">What I am building, testing and learning</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Short notes on new builds, workflow improvements, integration lessons and testing discoveries.
              Updated as I go. No fabricated history — entries are dated and tied to actual project work.
            </p>
          </div>

          <div
            className="cluster"
            style={{ gap: '0.8rem', flexWrap: 'wrap', alignItems: 'flex-end', marginTop: '1.5rem' }}
          >
            <div className="search-field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ flex: 'none', color: 'var(--text-faint)' }} aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search journal entries…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search journal"
              />
            </div>
            <div className="filter-bar" role="tablist" aria-label="Filter by category" style={{ marginBottom: 0 }}>
              <button
                type="button"
                className={`filter-bar__btn ${cat === 'all' ? 'is-active' : ''}`}
                onClick={() => setCat('all')}
              >
                All categories
              </button>
              {allCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`filter-bar__btn ${cat === c ? 'is-active' : ''}`}
                  onClick={() => setCat(c)}
                >
                  {JOURNAL_CATEGORY_LABELS[c]}
                </button>
              ))}
            </div>
            {referencedProjects.length > 0 ? (
              <div className="filter-bar" role="tablist" aria-label="Filter by project" style={{ marginBottom: 0 }}>
                <button
                  type="button"
                  className={`filter-bar__btn ${projectFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setProjectFilter('all')}
                >
                  All projects
                </button>
                {referencedProjects.map((slug) => {
                  const project = getProject(slug)
                  return (
                    <button
                      key={slug}
                      type="button"
                      className={`filter-bar__btn ${projectFilter === slug ? 'is-active' : ''}`}
                      onClick={() => setProjectFilter(slug)}
                    >
                      {project ? project.name : slug}
                    </button>
                  )
                })}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No entries match those filters.</p>
            </div>
          ) : (
            <div className="journal-list">
              {filtered.map((entry, idx) => (
                <JournalEntryCard key={`${entry.date}-${idx}`} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <article className="journal-entry">
      <div className="journal-entry__date">{formatDate(entry.date)}</div>
      <div>
        <div className="cluster" style={{ gap: '0.4rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
          <span className={`badge ${entry.category === 'build' ? 'badge--done' : entry.category === 'testing' ? 'badge--progress' : 'badge--illustrative'}`}>
            {JOURNAL_CATEGORY_LABELS[entry.category]}
          </span>
        </div>
        <h3 className="journal-entry__title">{entry.title}</h3>
        <p className="journal-entry__body">{entry.body}</p>
        {entry.projectRefs.length > 0 ? (
          <div className="journal-entry__tags">
            {entry.projectRefs.map((slug) => {
              const project = getProject(slug)
              return (
                <Link
                  key={slug}
                  to={`/projects/${slug}`}
                  style={{ color: 'var(--text-faint)', textDecoration: 'none' }}
                >
                  <span>#{project ? project.name.toLowerCase().replace(/\s+/g, '-') : slug}</span>
                </Link>
              )
            })}
          </div>
        ) : null}
      </div>
    </article>
  )
}
