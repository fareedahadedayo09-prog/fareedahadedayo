/**
 * Vercel Node serverless function for the contact/enquiry form.
 *
 * - Validates the payload server-side.
 * - Includes a honeypot + simple timestamp check to deter bot spam.
 * - Optionally forwards submissions to a JSON POST endpoint (Zapier, Make,
 *   custom email endpoint, Supabase, etc.) configured via the
 *   CONTACT_WEBHOOK_URL environment variable. If unset, submissions are
 *   logged and the endpoint still returns success so the UI works in preview.
 *
 * No API keys are exposed to the frontend.
 */

type Enquiry = {
  name: string
  email: string
  website?: string
  businessType: string
  challenge: string
  improve?: string
  timestamp: number
}

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

function validate(body: any) {
  const errors: Record<string, string> = {}
  const name = typeof body?.name === 'string' ? body.name.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const businessType = typeof body?.businessType === 'string' ? body.businessType.trim() : ''
  const challenge = typeof body?.challenge === 'string' ? body.challenge.trim() : ''
  const website = typeof body?.website === 'string' ? body.website.trim() : ''
  const improve = typeof body?.improve === 'string' ? body.improve.trim() : ''
  const ts = typeof body?.ts === 'number' ? body.ts : 0
  const hp = typeof body?.hp === 'string' ? body.hp : ''

  if (hp && hp.length > 0) {
    return { errors: { _bot: 'spam' }, value: null }
  }
  const now = Date.now()
  if (!ts || now - ts < 1500) {
    return { errors: { _bot: 'submitted too quickly' }, value: null }
  }

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!validEmail(email)) errors.email = 'Please enter a valid business email.'
  if (businessType.length === 0) errors.businessType = 'Please select your type of business.'
  if (challenge.length < 10) errors.challenge = 'Please describe your operational challenge (at least 10 characters).'

  if (Object.keys(errors).length > 0) return { errors, value: null }

  return {
    errors,
    value: {
      name,
      email,
      website: website || undefined,
      businessType,
      challenge,
      improve: improve || undefined,
      timestamp: now,
    } as Enquiry,
  }
}

export default async function handler(req, res) {
  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('access-control-allow-methods', 'POST, OPTIONS')
  res.setHeader('access-control-allow-headers', 'content-type')

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true })
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' })
  }

  const { errors, value } = validate(req.body)
  if (!value) {
    return res.status(422).json({ ok: false, errors })
  }

  const forwardUrl = process.env.CONTACT_WEBHOOK_URL || ''

  if (forwardUrl) {
    try {
      const up = await fetch(forwardUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(value),
      })
      if (!up.ok) {
        return res.status(502).json({ ok: false, error: 'upstream_error' })
      }
    } catch {
      return res.status(502).json({ ok: false, error: 'network_error' })
    }
  } else {
    console.log('ENQUIRY_SUBMISSION', JSON.stringify(value))
  }

  return res.status(200).json({
    ok: true,
    message: "Thanks \u2014 your enquiry has been received. I will reply within two business days.",
  })
}
