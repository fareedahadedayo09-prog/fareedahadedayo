import { chromium } from 'playwright'
import { mkdir, writeFile } from 'node:fs/promises'

const OUT = 'public/screenshots/glowlab'
const BASE = 'https://glow-lab-puce.vercel.app'
await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1440, height: 940 }, deviceScaleFactor: 2 })
const page = await ctx.newPage()

await page.goto(`${BASE}/products`, { waitUntil: 'networkidle', timeout: 90000 })
const links = await page.$$eval('a[href]', (as) => Array.from(new Set(as.map((a) => a.getAttribute('href')))))
await writeFile(`${OUT}/_links.txt`, links.join('\n'))

// Add a product to the cart and open the cart drawer.
await page.getByRole('button', { name: /^add to cart$/i }).first().click()
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/cart-drawer.png` })

// Look for a checkout entry point.
const checkoutLink = page.locator('a', { hasText: /checkout/i }).first()
if (await checkoutLink.count()) {
  await checkoutLink.click()
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${OUT}/checkout.png`, fullPage: true })
  await writeFile(`${OUT}/_urls.txt`, page.url())
}

// Retry Lumi with a longer wait for the AI response.
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.getByRole('button', { name: /chat with lumi/i }).first().click()
await page.waitForTimeout(1500)
const input = page.locator('textarea, input[type="text"]').last()
await input.fill('What cleanser suits oily skin?')
await input.press('Enter')
for (let i = 0; i < 6; i++) {
  await page.waitForTimeout(6000)
  await page.screenshot({ path: `${OUT}/lumi-attempt-${i}.png` })
}
await browser.close()
console.log('done')
