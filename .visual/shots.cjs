const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'
fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4176', '--strictPort'], { stdio: 'ignore' })
const wait = (ms) => new Promise((r) => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4176/'); if (r.ok) break } catch {} await wait(500) }
    const browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    const errs = []
    page.on('pageerror', (e) => errs.push(e.message))
    page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()) })
    await page.goto('http://127.0.0.1:4176/projects/glowlab-lifecycle', { waitUntil: 'networkidle' })
    await wait(1200)
    const data = await page.evaluate(() => ({
      evidenceSection: !!document.querySelector('#evidence'),
      evidenceImgs: document.querySelectorAll('.evidence-figure').length,
      rows: [...document.querySelectorAll('.gl-tests__row')].map((e) => ({ area: e.querySelector('h4').textContent, state: e.querySelector('.badge').textContent })),
      progress: [...document.querySelectorAll('.gl-progress__col')].map((c) => ({ title: c.querySelector('.gl-progress__title').textContent, items: [...c.querySelectorAll('.gl-progress__item strong')].map((x) => x.textContent) })),
      nodes: [...document.querySelectorAll('.gl-node__title')].map((e) => e.textContent.trim()),
      status: document.querySelector('.status-badge')?.textContent || null,
      hasFmail: document.body.textContent.includes('Fmail'),
    }))
    const home = await page.goto('http://127.0.0.1:4176/', { waitUntil: 'networkidle' }); await wait(1000)
    data.homeTitles = await page.$$eval('.project-card__title, .pcard__title, h3', () => [])
    data.homeProjects = await page.evaluate(() => [...document.querySelectorAll('a[href^="/projects/"]')].map(a => a.getAttribute('href')).slice(0,3))
    data.errs = errs
    fs.writeFileSync(`${OUT}/check.json`, JSON.stringify(data, null, 2))
    await page.goto('http://127.0.0.1:4176/projects/glowlab-lifecycle#testing', { waitUntil: 'networkidle' }); await wait(800)
    const box = await page.locator('#testing').boundingBox()
    await page.screenshot({ path: `${OUT}/testing.png`, clip: { x: 0, y: Math.max(0, box.y), width: 1440, height: 950 } })
    await browser.close(); server.kill('SIGTERM'); console.log('ok'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/error.txt`, String(e.stack || e)); server.kill('SIGTERM'); process.exit(1) }
})()
