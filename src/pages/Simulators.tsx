import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { Simulator } from '../components/Simulator'
import { SIMULATORS } from '../data/simulators'

export function Simulators() {
  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/projects" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              All projects
            </Link>
            <span className="eyebrow">Interactive demonstrations</span>
            <h1 className="cs-hero__title">Walk through the decision logic yourself</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Explore example paths described in each case study. These are illustrative walkthroughs, not
              live workflows or a complete recreation of their rules. No messages are sent, records changed
              or real decisions made; planned and prototype paths are labelled.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="stack" style={{ gap: '2.5rem' }}>
            {(Object.values(SIMULATORS)).map((sim) => (
              <section key={sim.id} id={`sim-${sim.id}`}>
                <div className="cluster cluster--between" style={{ gap: '1rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                  <div className="stack-sm" style={{ gap: '0.25rem' }}>
                    <span className="eyebrow" style={{ position: 'static' }}>{sim.subtitle}</span>
                    <h2 style={{ fontSize: 'clamp(1.4rem, 1rem + 1.6vw, 1.9rem)', margin: 0 }}>{sim.title}</h2>
                  </div>
                  <Link to={`/projects/${sim.projectSlug}`} className="btn btn--ghost btn--small">
                    View case study
                    <ArrowRight width={12} height={12} />
                  </Link>
                </div>
                <Simulator simulatorId={sim.id} />
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
