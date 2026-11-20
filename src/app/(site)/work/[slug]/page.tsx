import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { getCaseStudy, getSlugs } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('caseStudy')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getCaseStudy((await params).slug)
  return s ? { title: s.title, description: s.excerpt } : {}
}

export default async function CaseStudyPage({ params }: Props) {
  const study = await getCaseStudy((await params).slug)
  if (!study) notFound()

  return (
    <>
      <section className="wrap page-hero">
        <div className="mono crumb">
          <Link href="/work">Case studies</Link> <span aria-hidden="true">/</span> {study.tag}
        </div>
        <h1 className="page-title sm">{study.title}</h1>
        {study.excerpt && <p className="lede">{study.excerpt}</p>}
      </section>
      <Media image={study.image} label="case study photo" className="hero-image" priority width={2000} height={900} />
      <section className="wrap section">
        {!!study.metrics?.length && (
          <div className="metrics">
            {study.metrics.map((m) => (
              <div key={m.label}>
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        )}
        <div className="split">
          <aside className="aside">
            {study.client && (
              <div>
                <h2 className="mono">Client</h2>
                <p style={{ margin: 0, fontWeight: 600 }}>{study.client}</p>
              </div>
            )}
            {!!study.services?.length && (
              <div>
                <h2 className="mono">Services</h2>
                <div className="chips">
                  {study.services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="chip">
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
          <RichText value={study.body} />
        </div>
      </section>
    </>
  )
}
