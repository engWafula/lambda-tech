// Prints the bundled seed content as NDJSON for `sanity dataset import`.
// Usage: pnpm seed   (needs NEXT_PUBLIC_SANITY_PROJECT_ID and `npx sanity login`)
import { audiences, caseStudies, jobs, services, settings } from '../src/lib/seed.ts'

const out: object[] = []
const slug = (current: string) => ({ _type: 'slug', current })

out.push({ _id: 'siteSettings', _type: 'siteSettings', ...settings })

for (const sv of services) {
  const { slug: sl, ...rest } = sv
  out.push({ ...rest, _type: 'service', slug: slug(sl) })
}

for (const [i, a] of audiences.entries()) out.push({ ...a, _type: 'audience', order: i + 1 })

for (const cs of caseStudies) {
  const { slug: sl, services: refs = [], metrics = [], ...rest } = cs
  out.push({
    ...rest,
    _type: 'caseStudy',
    slug: slug(sl),
    metrics: metrics.map((m, i) => ({ ...m, _type: 'metric', _key: `m${i}` })),
    services: refs.map((r, i) => ({ _type: 'reference', _ref: `service-${r.slug}`, _key: `s${i}` })),
  })
}

for (const j of jobs) {
  const { slug: sl, ...rest } = j
  out.push({ ...rest, _type: 'job', slug: slug(sl) })
}

process.stdout.write(out.map((d) => JSON.stringify(d)).join('\n') + '\n')
