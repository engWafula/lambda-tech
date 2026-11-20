import type { Metadata } from 'next'
import Link from 'next/link'
import { getJobs } from '@/lib/content'

export const metadata: Metadata = { title: 'Careers', description: 'Open roles at Lambda Technologies.' }

export default async function CareersPage() {
  const jobs = await getJobs()
  return (
    <>
      <section className="wrap page-hero">
        <div className="mono">({String(jobs.length).padStart(2, '0')} open roles)</div>
        <h1 className="page-title">Build with us</h1>
        <p className="lede">Senior people, real ownership and clients who need you. Work remotely or from our offices.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        {jobs.length === 0 ? (
          <p className="lede">No open roles right now. Send us your CV anyway, we read every one.</p>
        ) : (
          <ul className="rows">
            {jobs.map((j) => (
              <li key={j._id}>
                <Link href={`/careers/${j.slug}`} className="job-row">
                  <span className="row-title">{j.title}</span>
                  <span className="mono">{j.location}</span>
                  <span className="mono">{j.employmentType}</span>
                  <span className="row-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
