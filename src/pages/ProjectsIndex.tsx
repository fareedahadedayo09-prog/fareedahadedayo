import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { ArrowRight } from '../components/Icons'
import { projects } from '../data/projects'

export function ProjectsIndex() {
  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Home
            </Link>
            <span className="eyebrow">Selected Projects</span>
            <h1 className="cs-hero__title">Every project, in the state it is actually in</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Four workflows at four different points of progress. Each card links to a case study with the
              same fourteen sections, so the comparison is consistent. Status is stated on every card and
              every section, because a project that is only partly built should not read as finished.
            </p>

            <div className="cs-hero__meta">
              <span>{projects.length} projects</span>
              <span>1 completed scenario · 1 prototype · 1 in progress · 1 planned</span>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="notice" style={{ marginTop: '1.8rem' }}>
            <strong>Status conventions used across this site.</strong> Completed means the described scenario
            was built and checked against a realistic test set. Completed as a prototype means it is a
            learning build, not a deployed system. In progress means parts are implemented and parts are
            designed. Planned means nothing is built yet.
          </div>
        </div>
      </section>
    </>
  )
}
