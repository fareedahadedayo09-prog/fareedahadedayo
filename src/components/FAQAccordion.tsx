import { useState } from 'react'
import type { FaqItem as FaqItemType } from '../data/content'

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className={`faq-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <line className="faq-icon__h" x1="3" y1="8" x2="13" y2="8" />
        <line className="faq-icon__v" x1="8" y1="3" x2="8" y2="13" />
      </svg>
    </span>
  )
}

export function FAQAccordion({ items }: { items: FaqItemType[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <ul className="faq-list" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const panelId = `faq-panel-${i}`
        const btnId = `faq-btn-${i}`
        return (
          <li key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="faq-item__title" style={{ margin: 0 }}>
              <button
                type="button"
                className="faq-item__btn"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="faq-item__qtext">{item.q}</span>
                <PlusIcon open={isOpen} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`faq-item__panel ${isOpen ? 'is-open' : ''}`}
              hidden={!isOpen}
            >
              <p className="faq-item__a">{item.a}</p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
