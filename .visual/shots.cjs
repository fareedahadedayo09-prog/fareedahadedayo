const { chromium } = require('playwright')
const { spawn } = require('node:child_process')
const fs = require('node:fs')
const OUT = '.visual/out'; fs.mkdirSync(OUT, { recursive: true })
const server = spawn('npx', ['vite', 'preview', '--port', '4179', '--strictPort'], { stdio: 'ignore' })
const wait = ms => new Promise(r => setTimeout(r, ms))
;(async () => {
  try {
    for (let i = 0; i < 60; i++) { try { const r = await fetch('http://127.0.0.1:4179/'); if (r.ok) break } catch {} await wait(500) }
    const b = await chromium.launch()
    const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await ctx.newPage()
    const errs = [], miss = []
    page.on('pageerror', e => errs.push(e.message))
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
    page.on('response', r => { if (r.status() >= 400) miss.push(r.url() + ' ' + r.status()) })
    const R = {}
    await page.goto('http://127.0.0.1:4179/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' }); await wait(1200)
    R.h1 = (await page.locator('h1').first().textContent()).trim()
    R.imgs = await page.$$eval('img', els => els.map(e => ({
      src: e.getAttribute('src'), w: e.naturalWidth, broken: e.naturalWidth === 0 })))
    // scroll to bottom so lazy images resolve
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)) }
    })
    await wait(2500)
    R.imgsAfterScroll = await page.$$eval('img', els => els.map(e => ({ src: e.getAttribute('src'), w: e.naturalWidth })))
    R.evidenceSection = await page.locator('#evidence').count()
    R.hasGroq = (await page.content()).includes('Groq')
    R.hasFlash = (await page.content()).includes('2.5 Flash')
    R.takeaways = await page.$$eval('#takeaways .takeaway h3', els => els.map(e => e.textContent))
    R.repoLink = await page.$$eval('a[href*="github.com"]', els => els.map(e => e.getAttribute('href')))
    R.navLinks = await page.$$eval('.cs-nav a', els => els.map(e => e.textContent))
    R.groq = (await page.content()).includes('Groq')
    R.gemini25 = (await page.content()).includes('2.5 Flash')
    await page.screenshot({ path: `${OUT}/hero.png` })
    const tk = await page.locator('#takeaways').boundingBox()
    await page.evaluate(y => window.scrollTo(0, y - 60), tk.y); await wait(500)
    await page.screenshot({ path: `${OUT}/takeaways.png` })
    // index card title
    await page.goto('http://127.0.0.1:4179/projects', { waitUntil: 'networkidle' }); await wait(800)
    R.cardTitles = await page.$$eval('.project-card__title', els => els.map(e => e.textContent.trim()))
    // mobile
    const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true })
    const mp = await m.newPage()
    await mp.goto('http://127.0.0.1:4179/projects/skincare-retailer-lead-generation', { waitUntil: 'networkidle' }); await wait(900)
    R.mobile = await mp.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, winW: window.innerWidth }))
    await mp.screenshot({ path: `${OUT}/mobile.png` })
    R.errs = errs; R.miss = miss
    fs.writeFileSync(`${OUT}/r.json`, JSON.stringify(R, null, 2))
    await b.close(); server.kill('SIGTERM'); process.exit(0)
  } catch (e) { fs.writeFileSync(`${OUT}/err.txt`, String(e.stack || e)); server.kill('SIGTERM'); process.exit(1) }
})()
