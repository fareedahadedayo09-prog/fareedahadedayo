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
              These simulators mirror the decision logic of the built workflows. Select a sample scenario
              to see how each input is validated, which rules pass or fail, and what the system does next.
              Nothing here is connected to a live system, no emails are sent, and illustrative scenarios are
              labelled where they reflect rules that are designed but not yet built.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="stack" style={{ gap: '2.5rem' }}>
            {(Object.values(SIMULATORS)).map((sim) => (
              <div key={sim.id} id={`sim-${sim.id}`}>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
