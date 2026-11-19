const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'; fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4177', '--strictPort'], { stdio: 'ignore' })
const wait = (ms) => new Promise(r => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4177/'); if (r.ok) break } catch {} await wait(500) }
    const b = await chromium.launch()
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await ctx.newPage()
    const errs = []
    page.on('pageerror', e => errs.push(e.message))
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
    const R = {}
    // projects index
    await page.goto('http://127.0.0.1:4177/projects', { waitUntil: 'networkidle' }); await wait(1000)
    R.indexCards = await page.$$eval('a[href^="/projects/"]', els => [...new Set(els.map(e => e.getAttribute('href')))])
    // new detail page
    await page.goto('http://127.0.0.1:4177/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' }); await wait(1200)
    R.detail = await page.evaluate(() => ({
      title: document.querySelector('h1')?.textContent?.trim(),
      sections: [...document.querySelectorAll('.cs-section__num')].map(e => e.textContent.trim()),
      body: document.body.innerText.length,
      has24: /\b24 leads\b|\b13 qualified\b/i.test(document.body.innerText),
      scrollW: document.documentElement.scrollWidth, winW: window.innerWidth,
    }))
    await page.screenshot({ path: `${OUT}/detail-desktop.png`, fullPage: false })
    // mobile
    const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
    const mp = await m.newPage()
    await mp.goto('http://127.0.0.1:4177/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' }); await wait(1000)
    R.mobile = await mp.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, winW: window.innerWidth }))
    await mp.screenshot({ path: `${OUT}/detail-mobile.png` })
    // existing pages still work
    R.existing = {}
    for (const s of ['order-confirmation-risk-check','returns-refunds-handler','lead-qualification']) {
      const p2 = await ctx.newPage()
      const res = await p2.goto(`http://127.0.0.1:4177/projects/${s}`, { waitUntil: 'networkidle' })
      R.existing[s] = { status: res.status(), h1: (await p2.locator('h1').first().textContent()).trim().slice(0, 50) }
      await p2.close()
    }
    R.errs = errs
    fs.writeFileSync(`${OUT}/r.json`, JSON.stringify(R, null, 2))
    await b.close(); server.kill('SIGTERM'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/err.txt`, String(e.stack || e)); server.kill('SIGTERM'); process.exit(1) }
})()
