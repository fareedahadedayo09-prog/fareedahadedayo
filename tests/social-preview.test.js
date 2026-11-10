import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const imageUrl = 'https://fareedahadedayo.vercel.app/og-preview-cream-v1.png'

test('social metadata uses the current, absolute PNG preview URL', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
  assert.ok(html.includes(`<meta property="og:image" content="${imageUrl}" />`))
  assert.ok(html.includes(`<meta name="twitter:image" content="${imageUrl}" />`))
  assert.ok(html.includes('property="og:image:width" content="1200"'))
  assert.ok(html.includes('property="og:image:height" content="630"'))
  assert.ok(html.includes('property="og:image:type" content="image/png"'))
  assert.ok(html.includes('property="og:image:alt"'))
  assert.ok(html.includes('name="twitter:image:alt"'))
})

test('preview image is a 1200 by 630 PNG', () => {
  const png = readFileSync(new URL('../public/og-preview-cream-v1.png', import.meta.url))
  assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10])
  assert.equal(png.readUInt32BE(16), 1200)
  assert.equal(png.readUInt32BE(20), 630)
})
