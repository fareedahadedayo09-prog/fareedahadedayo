const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'; fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4181', '--strictPort'], { stdio: 'ignore' })
const wait = ms => new Promise(r => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4181/'); if (r.ok) break } catch {} await wait(500) }
    const b = await chromium.launch()
    const page = await b.newPage({ viewport: { width: 1440, height: 1100 } })
    await page.goto('http://127.0.0.1:4181/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' })
    await wait(800)
    // reveal everything first
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 40)) }
    })
    await wait(1500)
    const y = await page.evaluate(() => {
      const el = document.querySelector('#takeaways')
      return el ? el.getBoundingClientRect().top + window.scrollY : -1
    })
    const diag = await page.evaluate(() => ({
      y: document.querySelector('#takeaways')?.getBoundingClientRect().top,
      h: document.querySelector('#takeaways')?.offsetHeight,
      txt: document.querySelector('#takeaways')?.innerText?.slice(0, 120),
    }))
    fs.writeFileSync(`${OUT}/diag.json`, JSON.stringify({ y, diag }, null, 2))
    await page.evaluate(v => window.scrollTo(0, v - 40), y)
    await wait(900)
    await page.screenshot({ path: `${OUT}/takeaways.png` })
    await page.evaluate(() => window.scrollTo(0, 0)); await wait(600)
    await page.screenshot({ path: `${OUT}/hero.png` })
    await b.close(); server.kill('SIGTERM'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/err.txt`, String(e.stack||e)); server.kill('SIGTERM'); process.exit(1) }
})()
