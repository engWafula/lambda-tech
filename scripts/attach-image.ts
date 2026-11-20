// Upload a local image to Sanity and set it on a document field (published + draft if present).
// Usage: npx sanity exec scripts/attach-image.ts --with-user-token -- <docId> <field> <file> "<alt text>"
import { createReadStream } from 'node:fs'
import { basename } from 'node:path'
import { getCliClient } from 'sanity/cli'

const [docId, field, file, alt = ''] = process.argv.slice(-4)
if (!docId || !field || !file) {
  console.error('Usage: <docId> <field> <file> "<alt>"')
  process.exit(1)
}

const client = getCliClient({ apiVersion: '2025-10-01' })
const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) })
const value = { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }

const ids = [docId, `drafts.${docId}`]
const existing = await client.fetch<string[]>('*[_id in $ids]._id', { ids })
const tx = client.transaction()
for (const id of existing) tx.patch(id, (p) => p.set({ [field]: value }))
await tx.commit()
console.log(`${field} on ${existing.join(', ')} ← ${asset._id}`)
