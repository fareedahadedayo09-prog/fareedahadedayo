const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'; fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4178', '--strictPort'], { stdio: 'ignore' })
const wait = ms => new Promise(r => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4178/'); if (r.ok) break } catch {} await wait(500) }
    const b = await chromium.launch()
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await ctx.newPage()
    const errs = []; const missing = []
    page.on('pageerror', e => errs.push(e.message))
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
    page.on('response', r => { if (r.status() >= 400) missing.push(r.url() + ' ' + r.status()) })
    await page.goto('http://127.0.0.1:4178/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' })
    await wait(1200)
    const R = {}
    R.noShotMsg = (await page.content()).includes('original n8n workflow screenshot is not available')
    // open evidence
    const sum = page.locator('summary.evidence-summary')
    R.summaryText = (await sum.textContent()).trim()
    await sum.click(); await wait(2500)
    R.figs = await page.$$eval('.evidence-figure', els => els.map(e => ({
      title: e.querySelector('h3')?.textContent,
      img: e.querySelector('img')?.getAttribute('src'),
      loaded: e.querySelector('img')?.naturalWidth > 0,
      w: e.querySelector('img')?.naturalWidth,
    })))
    R.count = R.figs.length
    await page.screenshot({ path: `${OUT}/evidence-open.png`, fullPage: false })
    const box = await page.locator('#evidence').boundingBox()
    await page.evaluate(y => window.scrollTo(0, y - 20), box.y)
    await wait(600)
    await page.screenshot({ path: `${OUT}/evidence-top.png` })
    // mobile
    const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
    const mp = await m.newPage()
    await mp.goto('http://127.0.0.1:4178/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' }); await wait(800)
    await mp.locator('summary.evidence-summary').click(); await wait(2000)
    R.mobile = await mp.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, winW: window.innerWidth }))
    await mp.screenshot({ path: `${OUT}/evidence-mobile.png` })
    R.errs = errs; R.missing = missing
    fs.writeFileSync(`${OUT}/r.json`, JSON.stringify(R, null, 2))
    await b.close(); server.kill('SIGTERM'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/err.txt`, String(e.stack || e)); server.kill('SIGTERM'); process.exit(1) }
})()
