import { useState, type ReactNode } from 'react'

export type Tab = {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ tabs, initialId, ariaLabel }: { tabs: Tab[]; initialId: string; ariaLabel?: string }) {
  const [active, setActive] = useState<string>(initialId)

  return (
    <div>
      <div className="tab-bar" role="tablist" aria-label={ariaLabel ?? 'Tabs'}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={`tab-bar__btn ${active === tab.id ? 'is-active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`tabpanel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          className={`tab-panel ${active === tab.id ? 'is-active' : ''}`}
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
