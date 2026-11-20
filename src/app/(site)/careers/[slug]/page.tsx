import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { getJob, getSettings, getSlugs } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('job')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const j = await getJob((await params).slug)
  return j ? { title: j.title, description: j.summary } : {}
}

export default async function JobPage({ params }: Props) {
  const [job, settings] = await Promise.all([getJob((await params).slug), getSettings()])
  if (!job) notFound()

  return (
    <>
      <section className="wrap page-hero">
        <div className="mono crumb">
          <Link href="/careers">Careers</Link> <span aria-hidden="true">/</span> {job.department}
        </div>
        <h1 className="page-title sm">{job.title}</h1>
        {job.summary && <p className="lede">{job.summary}</p>}
      </section>
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="split">
          <aside className="aside">
            <ul className="bullets">
              {[job.location, job.employmentType, job.department].filter(Boolean).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <a
              href={`mailto:${settings.email}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
              className="btn btn-accent"
              style={{ alignSelf: 'flex-start' }}
            >
              Apply for this role <span aria-hidden="true">→</span>
            </a>
          </aside>
          <RichText value={job.body} />
        </div>
      </section>
    </>
  )
}
