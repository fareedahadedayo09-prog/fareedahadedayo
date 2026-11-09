import { useState } from 'react'
import { ArrowRight } from './Icons'

type Field = 'name' | 'email' | 'website' | 'businessType' | 'challenge' | 'improve'

type FormState = Record<Field, string> & { hp: string }

const INITIAL: FormState = {
  name: '',
  email: '',
  website: '',
  businessType: '',
  challenge: '',
  improve: '',
  hp: '', // honeypot
}

const BUSINESS_TYPES = [
  { value: '', label: 'Select…' },
  { value: 'ecommerce-product', label: 'E-commerce (physical products)' },
  { value: 'ecommerce-digital', label: 'E-commerce (digital products)' },
  { value: 'retail', label: 'Retail / brick-and-mortar' },
  { value: 'services', label: 'Service business' },
  { value: 'saas', label: 'Software / SaaS' },
  { value: 'agency', label: 'Agency / studio' },
  { value: 'nonprofit', label: 'Nonprofit / community' },
  { value: 'other', label: 'Other' },
]

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  // ts is the time the form was rendered, used server-side for bot-check.
  const [ts] = useState(() => Date.now())

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }))
    if (errors[key as Field]) {
      setErrors((e) => {
        const next = { ...e }
        delete next[key as Field]
        return next
      })
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status.kind === 'submitting') return
    setStatus({ kind: 'submitting' })
    setErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, ts }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.status === 422 && data.errors) {
        const fieldErrors: Partial<Record<Field, string>> = {}
        for (const [k, v] of Object.entries(data.errors)) {
          if (k === '_bot') continue
          fieldErrors[k as Field] = v as string
        }
        setErrors(fieldErrors)
        setStatus({ kind: 'error', message: 'Please fix the highlighted fields and try again.' })
        return
      }
      if (!res.ok || !data.ok) {
        setStatus({
          kind: 'error',
          message:
            'Something went wrong sending your message. You can email me directly at fareedahadedayo08@gmail.com.',
        })
        return
      }
      setForm(INITIAL)
      setStatus({
        kind: 'success',
        message:
          data.message ||
          'Thanks \u2014 your enquiry has been received. I will reply within two business days.',
      })
    } catch {
      setStatus({
        kind: 'error',
        message: 'Could not reach the server. You can email me directly at fareedahadedayo08@gmail.com.',
      })
    }
  }

  return (
    <form className="enquiry-form" onSubmit={onSubmit} noValidate>
      {/* Honeypot field — hidden from real users, bots fill it. */}
      <div className="enquiry-honey" aria-hidden="true">
        <label>
          Do not fill this in:
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.hp}
            onChange={(e) => set('hp', e.target.value)}
          />
        </label>
      </div>

      <div className={`enquiry-field ${errors.name ? 'has-error' : ''}`}>
        <label htmlFor="enq-name">
          Name <span className="req">*</span>
        </label>
        <input
          id="enq-name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="Jane Okon"
        />
        {errors.name ? <span className="enquiry-field__error">{errors.name}</span> : null}
      </div>

      <div className={`enquiry-field ${errors.email ? 'has-error' : ''}`}>
        <label htmlFor="enq-email">
          Business email <span className="req">*</span>
        </label>
        <input
          id="enq-email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="you@company.com"
        />
        {errors.email ? <span className="enquiry-field__error">{errors.email}</span> : null}
      </div>

      <div className={`enquiry-field ${errors.website ? 'has-error' : ''}`}>
        <label htmlFor="enq-website">Website <span className="faint" style={{ fontWeight: 400, fontSize: '0.76rem' }}>(optional)</span></label>
        <input
          id="enq-website"
          type="url"
          autoComplete="url"
          value={form.website}
          onChange={(e) => set('website', e.target.value)}
          placeholder="https://yourcompany.com"
        />
      </div>

      <div className={`enquiry-field ${errors.businessType ? 'has-error' : ''}`}>
        <label htmlFor="enq-type">
          Type of business <span className="req">*</span>
        </label>
        <select
          id="enq-type"
          value={form.businessType}
          onChange={(e) => set('businessType', e.target.value)}
        >
          {BUSINESS_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.businessType ? <span className="enquiry-field__error">{errors.businessType}</span> : null}
      </div>

      <div className={`enquiry-field enquiry-field--full ${errors.challenge ? 'has-error' : ''}`}>
        <label htmlFor="enq-challenge">
          Operational challenge <span className="req">*</span>
        </label>
        <textarea
          id="enq-challenge"
          rows={4}
          value={form.challenge}
          onChange={(e) => set('challenge', e.target.value)}
          placeholder="What process is taking too long, causing mistakes or slowing you down? (e.g. COD order confirmation, returns, lead routing…)"
        />
        {errors.challenge ? <span className="enquiry-field__error">{errors.challenge}</span> : null}
      </div>

      <div className="enquiry-field enquiry-field--full">
        <label htmlFor="enq-improve">
          What would you like to improve? <span className="faint" style={{ fontWeight: 400, fontSize: '0.76rem' }}>(optional)</span>
        </label>
        <textarea
          id="enq-improve"
          rows={3}
          value={form.improve}
          onChange={(e) => set('improve', e.target.value)}
          placeholder="If you have an idea of what \u2018better\u2019 looks like (fewer mistakes, faster replies, fewer people tied up in repetitive work…), write it here."
        />
      </div>

      <div className="enquiry-form__actions">
        <button
          type="submit"
          className="btn btn--primary"
          disabled={status.kind === 'submitting'}
        >
          {status.kind === 'submitting' ? 'Sending…' : 'Send enquiry'}
          {status.kind !== 'submitting' ? <ArrowRight width={14} height={14} /> : null}
        </button>
        <p className="faint" style={{ fontSize: '0.78rem', margin: 0 }}>
          Your message goes directly to me. No mailing list, no third-party signup.
        </p>
      </div>

      {status.kind === 'success' ? (
        <div className="enquiry-form__status enquiry-form__status--success" role="status">
          {status.message}
        </div>
      ) : null}
      {status.kind === 'error' ? (
        <div className="enquiry-form__status enquiry-form__status--error" role="alert">
          {status.message}
        </div>
      ) : null}
    </form>
  )
}
