import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@/components/RichText'
import { WorkCard } from '@/components/WorkCard'
import { getCaseStudies, getService, getSlugs } from '@/lib/content'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getSlugs('service')).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getService((await params).slug)
  return s ? { title: s.title, description: s.description } : {}
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const [service, studies] = await Promise.all([getService(slug), getCaseStudies()])
  if (!service) notFound()
  const related = studies.filter((c) => c.services?.some((x) => x.slug === slug)).slice(0, 2)

  return (
    <>
      <section className="wrap page-hero">
        <div className="mono crumb">
          <Link href="/services">Services</Link> <span aria-hidden="true">/</span> {String(service.order).padStart(2, '0')}
        </div>
        <h1 className="page-title">{service.title}</h1>
        {service.description && <p className="lede">{service.description}</p>}
      </section>
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="split">
          <aside className="aside">
            {!!service.deliverables?.length && (
              <div>
                <h2 className="mono">What you get</h2>
                <ul className="bullets">
                  {service.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/contact" className="btn btn-accent" style={{ alignSelf: 'flex-start' }}>
              Talk to a consultant <span aria-hidden="true">→</span>
            </Link>
          </aside>
          <RichText value={service.body} />
        </div>
      </section>
      {related.length > 0 && (
        <section className="dark">
          <div className="wrap section">
            <h2 className="h-xl">Related work</h2>
            <div className="work-grid">
              {related.map((c) => (
                <WorkCard key={c._id} study={c} dark />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
