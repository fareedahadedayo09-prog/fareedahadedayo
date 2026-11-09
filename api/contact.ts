/**
 * Vercel serverless function for the contact/enquiry form.
 *
 * - Validates the payload server-side.
 * - Includes a honeypot + simple timestamp check to deter bot spam.
 * - Sends the submission via EmailJS-free approach: submits to a configured
 *   Formspree-like endpoint or falls back to logging and returning success
 *   (so the site doesn't hard-fail when no forwarding is configured).
 *
 * No API keys are exposed to the frontend. To wire up real email delivery,
 * set CONTACT_WEBHOOK_URL in Vercel environment variables to any endpoint
 * that accepts a JSON POST (e.g. a Zapier webhook, Make webhook, custom
 * email endpoint, or Supabase insert URL).
 */

export const config = { runtime: 'edge' }

type Json = Record<string, unknown>

function json(body: Json, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
  })
}

function validEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

type Enquiry = {
  name: string
  email: string
  website?: string
  businessType: string
  challenge: string
  improve?: string
  timestamp: number
}

function validate(body: Partial<Enquiry> & { hp?: unknown; ts?: unknown }) {
  const errors: Record<string, string> = {}
  const name = (body.name ?? '').toString().trim()
  const email = (body.email ?? '').toString().trim()
  const businessType = (body.businessType ?? '').toString().trim()
  const challenge = (body.challenge ?? '').toString().trim()
  const website = (body.website ?? '').toString().trim()
  const improve = (body.improve ?? '').toString().trim()
  const ts = typeof body.ts === 'number' ? body.ts : 0
  const hp = typeof body.hp === 'string' ? body.hp : ''

  // Honeypot: if filled in (bots fill every field), reject.
  if (hp && hp.length > 0) {
    return { errors: { _bot: 'spam' }, value: null as Enquiry | null }
  }
  // Timestamp: if submitted in < 1.5s it's likely a bot form-fill.
  const now = Date.now()
  if (!ts || now - ts < 1500) {
    return { errors: { _bot: 'submitted too quickly' }, value: null as Enquiry | null }
  }

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!validEmail(email)) errors.email = 'Please enter a valid business email.'
  if (businessType.length === 0) errors.businessType = 'Please select your type of business.'
  if (challenge.length < 10) errors.challenge = 'Please describe your operational challenge (at least 10 characters).'

  if (Object.keys(errors).length > 0) return { errors, value: null }

  return {
    errors,
    value: {
      name, email, website: website || undefined, businessType, challenge, improve: improve || undefined, timestamp: now,
    } as Enquiry,
  }
}

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') return json({ ok: true })
  if (req.method !== 'POST') return json({ error: 'method not allowed' }, 405)

  let body: Record<string, unknown> = {}
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'invalid json' }, 400)
  }

  const { errors, value } = validate(body as Partial<Enquiry> & { hp?: unknown; ts?: unknown })
  if (!value) return json({ ok: false, errors }, 422)

  const forwardUrl = (typeof process !== 'undefined' && (process as any).env?.CONTACT_WEBHOOK_URL) || ''

  if (forwardUrl) {
    try {
      const res = await fetch(forwardUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(value),
      })
      if (!res.ok) {
        return json({ ok: false, error: 'upstream_error' }, 502)
      }
    } catch {
      return json({ ok: false, error: 'network_error' }, 502)
    }
  } else {
    // No forwarding configured: log on the server for inspection and return
    // success so the UI shows a useful confirmation. The message is not
    // delivered to an inbox until CONTACT_WEBHOOK_URL is configured.
    console.log('ENQUIRY_SUBMISSION', JSON.stringify(value))
  }

  return json({ ok: true, message: 'Thanks \u2014 your enquiry has been received.' })
}
