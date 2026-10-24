import { Link } from 'react-router-dom'
import { ProjectCard } from '../components/ProjectCard'
import { ArrowRight } from '../components/Icons'
import { projects } from '../data/projects'

const completed = projects.filter((p) => p.status === 'done').length
const planned = projects.filter((p) => p.status === 'planned').length

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
              {completed} completed systems and {planned} planned build. Each card links to a case study with the
              same six sections, so the comparison stays consistent. Status is stated on every card and every
              section, because a partly built behaviour should not read as finished.
            </p>

            <div className="cs-hero__meta">
              <span>{projects.length} projects</span>
              <span>Problem · How it works · Decision logic · Exceptions · Evidence · Limitations</span>
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
            <strong>Status conventions used across this site.</strong> Completed means the project is complete
            as built. A section marked partial or designed is labelled that way on the case study itself, so
            nothing is presented as tested when it has not been.
          </div>
        </div>
      </section>
    </>
  )
}
