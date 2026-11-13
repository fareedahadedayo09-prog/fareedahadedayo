const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'
fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4174', '--strictPort'], { stdio: 'ignore' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
async function ready(url) {
  for (let i = 0; i < 60; i++) { try { const r = await fetch(url); if (r.ok) return } catch {} await wait(500) }
  throw new Error('not ready')
}
;(async () => {
  try {
    await ready('http://127.0.0.1:4174/')
    const browser = await chromium.launch()
    // Homepage featured order
    const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const home = await ctx1.newPage()
    const errs = []
    home.on('pageerror', (e) => errs.push(e.message))
    home.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
    await home.goto('http://127.0.0.1:4174/', { waitUntil: 'networkidle' })
    await wait(1000)
    const titles = await home.$$eval('#projects .project-card__title', (els) => els.map((e) => e.textContent.trim()))
    const imgs = await home.$$eval('#projects .project-card__media img', (els) => els.map((i) => ({ src: i.getAttribute('src'), ok: i.naturalWidth > 0 })))
    await home.screenshot({ path: `${OUT}/home.png`, clip: { x: 0, y: 0, width: 1440, height: 1100 } })
    fs.writeFileSync(`${OUT}/home.json`, JSON.stringify({ titles, imgs, errs }, null, 2))

    // GlowLab evidence: closed then opened
    const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await ctx2.newPage()
    const errs2 = []
    page.on('pageerror', (e) => errs2.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error') errs2.push(m.text()) })
    await page.goto('http://127.0.0.1:4174/projects/glowlab-lifecycle#testing', { waitUntil: 'networkidle' })
    await wait(1200)
    await page.locator('summary.evidence-summary').click()
    await wait(1200)
    const open = await page.locator('details.evidence-details').evaluate((d) => d.open)
    const evImgs = await page.$$eval('#evidence img', (els) => els.map((i) => ({ src: i.getAttribute('src'), ok: i.naturalWidth > 0 })))
    const box = await page.locator('#evidence').boundingBox()
    await page.screenshot({ path: `${OUT}/evidence.png`, clip: { x: 0, y: Math.max(0, box.y - 260), width: 1440, height: 1000 } })
    // testing rows text
    const rows = await page.$$eval('.gl-tests__row', (els) => els.map((e) => e.querySelector('h4').textContent + ' :: ' + e.querySelector('.badge').textContent))
    fs.writeFileSync(`${OUT}/evidence.json`, JSON.stringify({ open, evImgs, rows, errs2 }, null, 2))

    // Mobile evidence
    const ctx3 = await browser.newContext({ viewport: { width: 390, height: 844 } })
    const m = await ctx3.newPage()
    await m.goto('http://127.0.0.1:4174/projects/glowlab-lifecycle#testing', { waitUntil: 'networkidle' })
    await wait(1000)
    await m.locator('summary.evidence-summary').click()
    await wait(1200)
    const mb = await m.locator('#evidence').boundingBox()
    await m.screenshot({ path: `${OUT}/evidence-mobile.png`, clip: { x: 0, y: Math.max(0, mb.y - 40), width: 390, height: 1600 } })

    await browser.close()
    server.kill('SIGTERM')
    console.log('captured')
    process.exit(0)
  } catch (e) {
    fs.writeFileSync(`${OUT}/error.txt`, String(e && e.stack || e))
    server.kill('SIGTERM')
    process.exit(1)
  }
})()
