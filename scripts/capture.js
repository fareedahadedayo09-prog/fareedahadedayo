import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const OUT = 'public/screenshots/glowlab'
const BASE = 'https://glow-lab-puce.vercel.app'
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 940 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

// Discover the store's own pages (evidence only, no modification).
await page.goto(BASE, { waitUntil: 'networkidle', timeout: 90000 })
const links = await page.$$eval('a[href]', (as) => Array.from(new Set(as.map((a) => a.getAttribute('href')))))
console.log('LINKS', JSON.stringify(links))

// Lumi chat panel: open and ask a real question.
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /chat with lumi/i }).first().click()
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}/lumi-chat-open.png` })
const input = page.locator('textarea, input[type="text"]').last()
await input.fill('Show me a simple morning routine under 20,000')
await input.press('Enter')
await page.waitForTimeout(9000)
await page.screenshot({ path: `${OUT}/lumi-chat-reply.png` })
await browser.close()
console.log('done')
