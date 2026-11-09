import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { EXPERIENCE_META, toolCategories, tools, type Tool, type ToolCategoryId, type ToolExperience } from '../data/tools'

type ExpFilter = ToolExperience | 'all'

const EXP_FILTERS: { id: ExpFilter; label: string }[] = [
  { id: 'all', label: 'All experience levels' },
  { id: 'projects', label: 'Used in projects on this site' },
  { id: 'hands-on', label: 'Hands-on familiarity' },
  { id: 'learning', label: 'Currently learning / evaluated' },
]

export function ToolsEcosystem() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<ToolCategoryId | 'all'>('all')
  const [exp, setExp] = useState<ExpFilter>('all')
  const [activeId, setActiveId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tools.filter((t) => {
      if (cat !== 'all' && t.category !== cat) return false
      if (exp !== 'all' && t.experience !== exp) return false
      if (!q) return true
      return (
        t.name.toLowerCase().includes(q) ||
        t.usedFor.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.integrations.some((i) => i.toLowerCase().includes(q))
      )
    })
  }, [search, cat, exp])

  const active: Tool | null = useMemo(() => {
    if (activeId) {
      const found = tools.find((t) => t.id === activeId)
      if (found) return found
    }
    return filtered[0] ?? null
  }, [activeId, filtered])

  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Home
            </Link>
            <span className="eyebrow">Tools &amp; Technologies</span>
            <h1 className="cs-hero__title">The tools I use, organised by job</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Every tool is grouped by what I actually use it for, with an honest experience label. I do
              not claim equal proficiency across everything, and I do not list tools I have not set up,
              configured or built with. Click a tool card to see what I use it for, which projects use it
              and what it integrates with.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div
            className="cluster"
            style={{ gap: '0.8rem', flexWrap: 'wrap', marginBottom: '1.3rem', alignItems: 'flex-end' }}
          >
            <div className="search-field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ flex: 'none', color: 'var(--text-faint)' }} aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search tools…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search tools"
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
              {toolCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`filter-bar__btn ${cat === c.id ? 'is-active' : ''}`}
                  onClick={() => setCat(c.id)}
                >
                  {c.title}
                </button>
              ))}
            </div>
            <div className="filter-bar" role="tablist" aria-label="Filter by experience" style={{ marginBottom: 0 }}>
              {EXP_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`filter-bar__btn ${exp === f.id ? 'is-active' : ''}`}
                  onClick={() => setExp(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p>No tools match those filters.</p>
            </div>
          ) : (
            <>
              <div className="tools-grid">
                {filtered.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tool-ecosystem-card ${active?.id === t.id ? 'is-active' : ''}`}
                    onClick={() => setActiveId(t.id)}
                    aria-pressed={active?.id === t.id}
                  >
                    <div className="tool-ecosystem-card__head">
                      <span className="tool-monogram">{t.monogram}</span>
                      <span className="tool-ecosystem-card__name">{t.name}</span>
                    </div>
                    <div className="tool-ecosystem-card__meta">
                      <span className={`badge ${EXPERIENCE_META[t.experience].tone === 'done' ? 'badge--done' : EXPERIENCE_META[t.experience].tone === 'progress' ? 'badge--progress' : 'badge--planned'}`}>
                        {EXPERIENCE_META[t.experience].label}
                      </span>
                    </div>
                    <p className="tool-ecosystem-card__used">{t.usedFor}</p>
                  </button>
                ))}
              </div>

              {active ? (
                <div className="tool-detail-panel" aria-live="polite">
                  <div className="stack" style={{ gap: '0.8rem' }}>
                    <div className="cluster" style={{ gap: '0.7rem' }}>
                      <span className="tool-monogram">{active.monogram}</span>
                      <div>
                        <h3 style={{ fontSize: '1.18rem', margin: 0 }}>{active.name}</h3>
                        <div className="cluster" style={{ gap: '0.4rem', marginTop: '0.3rem' }}>
                          <span className={`badge ${EXPERIENCE_META[active.experience].tone === 'done' ? 'badge--done' : EXPERIENCE_META[active.experience].tone === 'progress' ? 'badge--progress' : 'badge--planned'}`}>
                            {EXPERIENCE_META[active.experience].label}
                          </span>
                          <span className="badge badge--illustrative">
                            {toolCategories.find((c) => c.id === active.category)?.title}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="muted" style={{ fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                      {active.usedFor}
                    </p>
                    <p className="faint" style={{ fontSize: '0.82rem', margin: 0 }}>{active.description}</p>
                  </div>

                  <div className="stack" style={{ gap: '1rem' }}>
                    {active.projectRefs.length > 0 ? (
                      <div>
                        <span className="mono" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                          Related projects
                        </span>
                        <div className="cluster" style={{ gap: '0.4rem', marginTop: '0.55rem', flexWrap: 'wrap' }}>
                          {active.projectRefs.map((slug) => (
                            <Link key={slug} to={`/projects/${slug}`} className="tag" style={{ cursor: 'pointer' }}>
                              {slug.replace(/-/g, ' ')}
                              <ArrowRight width={10} height={10} style={{ marginLeft: '0.2rem' }} />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="faint" style={{ fontSize: '0.82rem', margin: 0 }}>
                        Not yet the primary tool in a project on this site.
                      </p>
                    )}
                    {active.integrations.length > 0 ? (
                      <div>
                        <span className="mono" style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                          Typically integrates with
                        </span>
                        <div className="cluster" style={{ gap: '0.35rem', marginTop: '0.55rem', flexWrap: 'wrap' }}>
                          {active.integrations.map((i) => (
                            <span key={i} className="tag">{i}</span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  )
}
