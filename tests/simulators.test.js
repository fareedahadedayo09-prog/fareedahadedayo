import test from 'node:test'
import assert from 'node:assert/strict'
import { SIMULATORS, simulateCOD, simulateReturns, simulateLead, simulateGlowLab } from '../src/data/simulators.ts'

const result = (simulator, id) => {
  const def = SIMULATORS[simulator]
  const scenario = def.scenarios.find((item) => item.id === id)
  assert.ok(scenario, `Missing ${simulator} scenario ${id}`)
  return def.run(scenario.input)
}

test('all four case studies have distinct, usable walkthroughs', () => {
  assert.deepEqual(Object.keys(SIMULATORS), ['cod', 'returns', 'lead', 'glowlab'])
  assert.equal(new Set(Object.values(SIMULATORS).map((sim) => sim.projectSlug)).size, 4)
  for (const sim of Object.values(SIMULATORS)) {
    assert.ok(sim.scenarios.length > 0)
    assert.equal(new Set(sim.scenarios.map((scenario) => scenario.id)).size, sim.scenarios.length)
    for (const scenario of sim.scenarios) {
      const output = sim.run(scenario.input)
      assert.ok(output.checks.length > 0, scenario.id)
      assert.ok(output.outcome.label && output.outcome.detail, scenario.id)
    }
  }
})

test('COD confirms only after a response, shows availability and handles duplicates and high value', () => {
  const confirmed = result('cod', 'cod-confirm')
  assert.equal(confirmed.outcome.tone, 'confirmed')
  assert.match(confirmed.checks.find((step) => step.id === 'availability').detail, /Airtable/)
  assert.equal(result('cod', 'cod-cancel').outcome.label, 'Cancellation path')
  assert.equal(result('cod', 'cod-reminder').outcome.label, 'Reminder path')
  assert.match(result('cod', 'cod-high').outcome.detail, /staff alert/i)
  assert.equal(result('cod', 'cod-duplicate').outcome.label, 'Duplicate path')
  assert.notEqual(simulateCOD({ order_type: 'Routine, below the configured amount', duplicate: 'No match' }).outcome.tone, 'confirmed')
  assert.equal(simulateCOD({ duplicate: 'Match found', order_type: 'High-value' }).outcome.label, 'Duplicate path')
})

test('returns never claim an automatic refund and distinguish planned or unverified paths', () => {
  assert.equal(result('returns', 'ret-complete').outcome.label, 'Ready for policy evaluation')
  assert.equal(result('returns', 'ret-missing').outcome.label, 'Incomplete request')
  assert.match(result('returns', 'ret-outside').outcome.detail, /not end-to-end verified/)
  assert.match(result('returns', 'ret-conflict').outcome.detail, /not a functioning/)
  assert.equal(SIMULATORS.returns.scenarios.find((item) => item.id === 'ret-conflict').illustrative, true)
  assert.equal(simulateReturns({}).outcome.label, 'Example not specified')
})

test('BrightSun uses an explicitly selected warm example and does not invent scoring', () => {
  assert.equal(result('lead', 'lead-intake').outcome.label, 'Enquiry captured for qualification')
  const warm = result('lead', 'lead-warm')
  assert.match(warm.checks.find((step) => step.id === 'qualification').detail, /not calculated/)
  assert.match(warm.outcome.detail, /staff/i)
  assert.equal(result('lead', 'lead-clarification').outcome.label, 'Awaiting clarification')
  assert.equal(simulateLead({}).outcome.label, 'Example not specified')
})

test('GlowLab is a prototype and stages rather than sends', () => {
  const cart = result('glowlab', 'glow-cart')
  assert.equal(cart.outcome.tone, 'staged')
  assert.match(cart.outcome.detail, /rather than emailed/)
  assert.equal(result('glowlab', 'glow-purchase').outcome.label, 'Reminder suppressed')
  assert.equal(result('glowlab', 'glow-optout').outcome.label, 'Follow-up suppressed')
  assert.equal(result('glowlab', 'glow-vip').outcome.label, 'Review path')
  assert.equal(simulateGlowLab({}).outcome.label, 'Example not specified')
})
