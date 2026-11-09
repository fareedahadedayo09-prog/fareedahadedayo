// Builds the JSON file list and outputs a summary (sizes).
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = 'dist'
let total = 0
const files = []

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile()) {
      const rel = relative(DIST, full).replace(/\\/g, '/')
      const buf = readFileSync(full)
      total += buf.length
      files.push({ file: rel, size: buf.length })
    }
  }
}
walk(DIST)
console.log(`Total files: ${files.length}`)
console.log(`Total bytes: ${total} (${(total/1024).toFixed(1)} KB)`)
for (const f of files.sort((a,b)=>b.size-a.size)) {
  console.log(`  ${(f.size/1024).toFixed(1).padStart(7)} KB  ${f.file}`)
}
