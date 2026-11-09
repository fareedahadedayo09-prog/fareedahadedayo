import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { ProcessCostCalculator } from '../components/ProcessCostCalculator'

export function Calculators() {
  return (
    <>
      <section className="cs-hero">
        <div className="shell">
          <div className="cs-hero__top">
            <Link to="/" className="link-arrow" style={{ fontSize: '0.84rem' }}>
              <ArrowRight width={13} height={13} style={{ transform: 'rotate(180deg)' }} />
              Home
            </Link>
            <span className="eyebrow">Planning tools</span>
            <h1 className="cs-hero__title">Estimate the cost of a manual process</h1>
            <p className="lede" style={{ marginTop: '0.4rem' }}>
              Two working calculators that run entirely in your browser. Step 1 sizes what the current
              process actually costs in time and rework; Step 2 estimates what automation could realistically
              recover. Change any assumption and the numbers update immediately.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <ProcessCostCalculator />
        </div>
      </section>
    </>
  )
}
