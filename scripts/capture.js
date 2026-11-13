import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const OUT = 'public/screenshots/glowlab'
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
async function shoot(name, url, { width, height, full = false, dsf = 2 } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dsf })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 })
  await page.waitForTimeout(2500)
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: full })
  await ctx.close()
  console.log('captured', name)
}

await shoot('desktop-home', 'https://glow-lab-puce.vercel.app/', { width: 1440, height: 940 })
await shoot('desktop-products', 'https://glow-lab-puce.vercel.app/products', { width: 1440, height: 940 })
await shoot('mobile-home', 'https://glow-lab-puce.vercel.app/', { width: 430, height: 932, dsf: 3 })
await browser.close()
