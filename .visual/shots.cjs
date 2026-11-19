const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'; fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4182', '--strictPort'], { stdio: 'ignore' })
const wait = ms => new Promise(r => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4182/'); if (r.ok) break } catch {} await wait(500) }
    const b = await chromium.launch()
    const page = await b.newPage({ viewport: { width: 1440, height: 1100 } })
    const errs = []
    page.on('pageerror', e => errs.push(e.message))
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
    await page.goto('http://127.0.0.1:4182/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' })
    await wait(1000)
    const R = {}
    R.rows = await page.$$eval('.results-list li', els => els.map(e => ({
      badge: e.querySelector('.badge')?.textContent?.trim(),
      text: e.querySelector('span:last-child')?.textContent?.slice(0, 60),
    })))
    R.bodyHasStale = /not yet been confirmed|has not yet produced/.test(await page.content())
    await page.evaluate(async () => { for (let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40))} })
    const y = await page.evaluate(() => document.querySelector('#result').getBoundingClientRect().top + window.scrollY)
    await page.evaluate(v => window.scrollTo(0, v - 50), y); await wait(700)
    await page.screenshot({ path: `${OUT}/results.png` })
    R.errs = errs
    fs.writeFileSync(`${OUT}/r.json`, JSON.stringify(R, null, 2))
    await b.close(); server.kill('SIGTERM'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/err.txt`, String(e.stack||e)); server.kill('SIGTERM'); process.exit(1) }
})()
