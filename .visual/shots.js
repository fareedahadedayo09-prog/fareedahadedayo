const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')

const OUT = '.visual/out'
fs.mkdirSync(OUT, { recursive: true })

const server = spawn('npx', ['vite', 'preview', '--port', '4173', '--strictPort'], { stdio: 'inherit' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function ready(url) {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {}
    await wait(500)
  }
  throw new Error('server not ready')
}

;(async () => {
  try {
  await ready('http://127.0.0.1:4173/')
  const browser = await chromium.launch()
  const pages = [
    ['glowlab-desktop', '/projects/glowlab-lifecycle', 1440, 1000, true],
    ['glowlab-mobile', '/projects/glowlab-lifecycle', 390, 844, true],
    ['projects-index', '/projects', 1440, 1000, false],
    ['cod-study', '/projects/order-confirmation-risk-check', 1440, 1000, false],
  ]
  for (const [name, path, w, h, full] of pages) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 })
    const page = await ctx.newPage()
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })
    await page.goto(`http://127.0.0.1:4173${path}`, { waitUntil: 'networkidle' })
    await wait(1200)
    await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full })
    fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({ errors, h1: await page.locator('h1').first().innerText().catch(() => '') }, null, 2))
    await ctx.close()
  }
  await browser.close()
  server.kill('SIGTERM')
  console.log('captured')
  } catch (e) {
    fs.writeFileSync(`${OUT}/error.txt`, String(e && e.stack || e))
    server.kill('SIGTERM')
    process.exit(1)
  }
})()
