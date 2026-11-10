import { Link } from 'react-router-dom'
import { ArrowRight } from '../components/Icons'
import { ToolLogo } from '../components/ToolLogo'
import toolStack from '../data/tools'

export function ToolsEcosystem() {
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
            <h1 className="cs-hero__title">The stack I build with</h1>
            <p className="lede" style={{ marginTop: '0.4rem', maxWidth: '72ch' }}>
              The technologies I use to design, build and connect automation systems.
            </p>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: 'clamp(4rem, 3rem + 4vw, 7rem)' }}>
        <div className="shell">
          <div className="stack" style={{ gap: 'clamp(2.2rem, 1.6rem + 2vw, 3.2rem)' }}>
            {toolStack.map((group) => (
              <div key={group.title} className="toolgroup">
                <div className="toolgroup__head">
                  <h2 className="toolgroup__title" dangerouslySetInnerHTML={{ __html: group.title }} />
                  <span className="toolgroup__rule" aria-hidden="true" />
                </div>
                <ul className="toollogogrid" role="list">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="toollogo">
                      <ToolLogo logo={tool.logo} name={tool.name} size={40} />
                      <span className="toollogo__name">{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="notice" style={{ marginTop: '2.5rem' }}>
            <strong>Brand marks.</strong> Product logos are used solely to identify the tools and platforms I
            work with and remain the property of their respective owners. Where a concept has no official
            logo (APIs, Webhooks, pgvector, Airtable Interfaces) I have used a simple neutral mark instead
            of inventing one.
          </div>
        </div>
      </section>
    </>
  )
}
