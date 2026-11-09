// Writes deployment files payload JSON to stdout.
import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = 'dist'
const out = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile()) {
      const rel = relative(DIST, full).replace(/\\/g, '/')
      const buf = readFileSync(full)
      // Vercel's API accepts base64-encoded data for files.
      out.push({ file: rel, data: buf.toString('base64'), encoding: 'base64' })
    }
  }
}

walk(DIST)
process.stdout.write(JSON.stringify(out))
