const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'
fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4175', '--strictPort'], { stdio: 'ignore' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4175/'); if (r.ok) break } catch {} await wait(500) }
    const browser = await chromium.launch()
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', (e) => errs.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
    await page.goto('http://127.0.0.1:4175/projects/glowlab-lifecycle#testing', { waitUntil: 'networkidle' })
    await wait(1200)
    const rows = await page.$$eval('.gl-tests__row', (els) => els.map((e) => ({
      area: e.querySelector('h4').textContent,
      state: e.querySelector('.badge').textContent,
      result: e.querySelector('.gl-tests__result').textContent.replace(/\s+/g, ' ').slice(0, 120),
    })))
    await page.locator('summary.evidence-summary').click()
    await wait(1000)
    const summary = await page.locator('summary.evidence-summary').textContent()
    const intro = await page.locator('.evidence-body > p').first().textContent()
    // architecture nodes
    const nodes = await page.$$eval('.gl-node__title', (els) => els.map((e) => e.textContent.trim()))
    const progress = await page.$$eval('.gl-progress__col', (cols) => cols.map((c) => ({
      title: c.querySelector('.gl-progress__title').textContent,
      items: [...c.querySelectorAll('.gl-progress__item strong')].map((e) => e.textContent),
    })))
    fs.writeFileSync(`${OUT}/check.json`, JSON.stringify({ rows, summary: summary.trim(), intro: intro.trim(), nodes, progress, errs }, null, 2))
    const box = await page.locator('#evidence').boundingBox()
    await page.screenshot({ path: `${OUT}/evidence.png`, clip: { x: 0, y: Math.max(0, box.y - 40), width: 1440, height: 900 } })
    await browser.close(); server.kill('SIGTERM'); console.log('captured'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/error.txt`, String(e.stack || e)); server.kill('SIGTERM'); process.exit(1) }
})()
