import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { ArrowRight } from '../components/Icons'
import {
  FILTER_CATEGORIES,
  projects,
  type ProjectCategory,
} from '../data/projects'

export function ProjectsIndex() {
  const [filter, setFilter] = useState<ProjectCategory | 'all'>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return projects
    return projects.filter((p) => p.categories.includes(filter))
  }, [filter])

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: projects.length }
    for (const p of projects) {
      for (const c of p.categories) {
        map[c] = (map[c] ?? 0) + 1
      }
    }
    return map
  }, [])

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
              and honest limitations. Use the filters to narrow by area.
            </p>

            <div className="cs-hero__meta">
              <span>{projects.length} projects total</span>
              <span>3 completed builds · 1 working prototype</span>
            </div>
          </div>

          {/* Filter bar */}
          <div className="filter-bar" role="tablist" aria-label="Filter projects by category">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={filter === cat.id}
                className={`filter-bar__btn ${filter === cat.id ? 'is-active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
                <span
                  className="mono"
                  style={{
                    marginLeft: '0.4rem',
                    fontSize: '0.72em',
                    opacity: 0.7,
                  }}
                >
                  {counts[cat.id] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          {filtered.length > 0 ? (
            <div className="project-grid">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="notice">
              <strong>No projects match this filter yet.</strong> Check back as I build more systems in this
              area.
            </div>
          )}

          <div className="notice" style={{ marginTop: '1.8rem' }}>
            <strong>Status conventions.</strong> <em>Completed · tested</em> means the core path is built and
            has been run against a test set. <em>Completed build</em> means a standalone build exists but
            some labelled parts are partial. <em>Prototype · in progress</em> means a working demonstration
            that is not connected to live data or real customer-facing channels. No project on this page is
            presented as deployed to production unless I can point at the deployment.
          </div>
        </div>
      </section>
    </>
  )
}
