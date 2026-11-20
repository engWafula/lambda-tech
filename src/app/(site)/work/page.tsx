import type { Metadata } from 'next'
import { WorkCard } from '@/components/WorkCard'
import { getCaseStudies } from '@/lib/content'

export const metadata: Metadata = { title: 'Case studies', description: 'Selected projects from Lambda Technologies.' }

export default async function WorkPage() {
  const studies = await getCaseStudies()
  return (
    <>
      <section className="wrap page-hero">
        <div className="mono">({String(studies.length).padStart(2, '0')} projects)</div>
        <h1 className="page-title">Selected work</h1>
        <p className="lede">Migrations, platforms and security programmes we have designed, built and still run.</p>
      </section>
      <section className="wrap on-paper" style={{ paddingBottom: 'var(--section)' }}>
        <div className="work-grid" style={{ rowGap: 64 }}>
          {studies.map((s) => (
            <WorkCard key={s._id} study={s} />
          ))}
        </div>
      </section>
    </>
  )
}
