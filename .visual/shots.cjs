const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'; fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4180', '--strictPort'], { stdio: 'ignore' })
const wait = ms => new Promise(r => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4180/'); if (r.ok) break } catch {} await wait(500) }
    const b = await chromium.launch()
    const page = await b.newPage({ viewport: { width: 1440, height: 1000 } })
    await page.goto('http://127.0.0.1:4180/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' })
    await wait(1000)
    await page.locator('#takeaways').scrollIntoViewIfNeeded(); await wait(700)
    await page.locator('#takeaways').screenshot({ path: `${OUT}/takeaways.png` })
    await page.evaluate(() => window.scrollTo(0,0)); await wait(500)
    await page.screenshot({ path: `${OUT}/hero.png` })
    await b.close(); server.kill('SIGTERM'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/err.txt`, String(e.stack||e)); server.kill('SIGTERM'); process.exit(1) }
})()
