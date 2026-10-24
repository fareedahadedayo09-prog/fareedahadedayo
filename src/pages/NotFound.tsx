import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'

export function NotFound() {
  return (
    <section className="section">
      <div className="shell-narrow">
        <span className="eyebrow">404</span>
        <h1 style={{ marginTop: '1rem' }}>This page does not exist</h1>
        <p className="lede" style={{ marginTop: '1rem' }}>
          The link is either out of date or was never published. Try the home page or the projects list.
        </p>
        <div className="cluster" style={{ gap: '0.6rem', marginTop: '1.8rem' }}>
          <Link to="/" className="btn btn--primary">
            Back to home
            <ArrowRight width={14} height={14} />
          </Link>
          <Link to="/projects" className="btn btn--secondary">
            All projects
          </Link>
        </div>
      </div>
    </section>
  )
}
