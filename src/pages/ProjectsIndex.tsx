import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { ArrowRight } from '../components/Icons'
import {
  FILTER_CATEGORIES,
  STATUS_FILTERS,
  projects,
  type ProjectCategory,
  type StatusKey,
} from '../data/projects'

type StatusFilter = StatusKey | 'all'

export function ProjectsIndex() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState<ProjectCategory | 'all'>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [toolFilter, setToolFilter] = useState<string>('all')

  const allTools = useMemo(() => {
    const set = new Set<string>()
    for (const p of projects) for (const t of p.tools) set.add(t)
    return Array.from(set).sort()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return projects.filter((p) => {
      if (cat !== 'all' && !p.categories.includes(cat)) return false
      if (status !== 'all' && p.status !== status) return false
      if (toolFilter !== 'all' && !p.tools.includes(toolFilter)) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.problem.summary.toLowerCase().includes(q) ||
        p.solution.summary.toLowerCase().includes(q) ||
        p.tools.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [search, cat, status, toolFilter])

  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Home
            </Link>
            <span className="eyebrow">Project library</span>
            <h1 className="cs-hero__title">Systems you can inspect, not just read about</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Every project below is a real build or working prototype with a case study that starts in
              plain business language and opens up into technical detail, decision rules, testing evidence
              and honest limitations. Search, filter by category, status, or tool.
            </p>
          </div>

          <div className="stack" style={{ gap: '0.7rem', marginTop: '1.4rem' }}>
            <div className="search-field">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" style={{ flex: 'none', color: 'var(--text-faint)' }} aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search projects"
              />
            </div>
            <div className="filter-bar" role="tablist" aria-label="Filter projects by category">
              {FILTER_CATEGORIES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={cat === f.id}
                  className={`filter-bar__btn ${cat === f.id ? 'is-active' : ''}`}
                  onClick={() => setCat(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="filter-bar" role="tablist" aria-label="Filter projects by status">
              <button
                type="button"
                role="tab"
                aria-selected={status === 'all'}
                className={`filter-bar__btn ${status === 'all' ? 'is-active' : ''}`}
                onClick={() => setStatus('all')}
              >
                All statuses
              </button>
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={status === f.id}
                  className={`filter-bar__btn ${status === f.id ? 'is-active' : ''}`}
                  onClick={() => setStatus(f.id as StatusFilter)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="filter-bar" role="tablist" aria-label="Filter projects by tool" style={{ flexWrap: 'wrap' }}>
              <button
                type="button"
                role="tab"
                aria-selected={toolFilter === 'all'}
                className={`filter-bar__btn ${toolFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setToolFilter('all')}
              >
                All tools
              </button>
              {allTools.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={toolFilter === t}
                  className={`filter-bar__btn ${toolFilter === t ? 'is-active' : ''}`}
                  onClick={() => setToolFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          {filtered.length > 0 ? (
            <>
              <p className="faint mono" style={{ fontSize: '0.76rem', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                Showing {filtered.length} of {projects.length} projects
              </p>
              <div className="project-grid">
                {filtered.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No projects match those filters.</p>
            </div>
          )}

          <div className="notice" style={{ marginTop: '1.8rem' }}>
            <strong>Status conventions.</strong> Every project's status is labelled up front. <em>Completed</em>{' '}
            means the core path is built and has been run against a test set. <em>In progress / prototype</em>{' '}
            means a working demonstration that is not connected to live data or real customer-facing
            channels. <em>Planned</em> means designed but not yet built. No project on this page is
            presented as deployed to production unless I can point at the deployment.
          </div>
        </div>
      </section>
    </>
  )
}
