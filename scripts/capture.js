import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const OUT = 'public/screenshots/glowlab'
const BASE = 'https://glow-lab-puce.vercel.app'
await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

await page.goto(`${BASE}/products`, { waitUntil: 'networkidle', timeout: 90000 })
await page.getByRole('button', { name: /^add to cart$/i }).first().click()
await page.waitForTimeout(1200)
await page.goto(`${BASE}/cart.html`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/cart-page.png`, fullPage: true })

const text = await page.evaluate(() => document.body.innerText)
await writeFile(`${OUT}/_cart-text.txt`, text)

// Open the checkout step if there is one on this page.
for (const label of [/proceed to checkout/i, /checkout/i]) {
  const btn = page.getByRole('button', { name: label }).first()
  const link = page.getByRole('link', { name: label }).first()
  if (await btn.count()) { await btn.click(); break }
  if (await link.count()) { await link.click(); break }
}
await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/checkout-step.png`, fullPage: true })
await writeFile(`${OUT}/_checkout-url.txt`, page.url())
await writeFile(`${OUT}/_checkout-text.txt`, await page.evaluate(() => document.body.innerText))
await browser.close()
console.log('done')
