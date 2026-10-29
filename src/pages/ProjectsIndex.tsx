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
            <h1 className="cs-hero__title">Project case studies</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Explore the problem, workflow design, decision logic, exceptions, evidence and limitations behind
              each project. Open a case study for the full walkthrough.
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
        </div>
      </section>
    </>
  )
}
