// Generate the list of { file, data } objects for Vercel's create_deployment API.
// Reads all files from the dist/ directory and outputs them as JSON.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = 'dist'
const out = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.isFile()) {
      const rel = relative(DIST, full).replace(/\\/g, '/')
      const buf = readFileSync(full)
      out.push({ file: rel, data: buf.toString('base64'), encoding: 'base64' })
    }
  }
}

walk(DIST)
console.log(JSON.stringify(out))
