import type { Metadata } from 'next'
import Link from 'next/link'
import { Audiences } from '@/components/Audiences'
import { Media } from '@/components/Media'
import { ServiceRows } from '@/components/ServiceRows'
import { WorkCard } from '@/components/WorkCard'
import { getAudiences, getCaseStudies, getServices, getSettings } from '@/lib/content'

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings()
  return { description: s.seoDescription }
}

export default async function Home() {
  const [settings, services, studies, audiences] = await Promise.all([getSettings(), getServices(), getCaseStudies(), getAudiences()])
  const lines = settings.heroLines
  const featured = (studies.filter((s) => s.featured).length >= 2 ? studies.filter((s) => s.featured) : studies).slice(0, 2)

  return (
    <>
      <section className="wrap hero">
        <h1 className="display">
          {lines.map((line, i) => (
            <span key={i} className="line">
              {line}
              {i === lines.length - 1 && settings.heroAccent && <> <span className="accent">{settings.heroAccent}</span></>}
            </span>
          ))}
        </h1>
        <div className="hero-meta">
          <div className="mono">{settings.heroKicker}</div>
          <p>{settings.heroIntro}</p>
          <div className="cta">
            <Link href="/contact" className="btn btn-accent">
              {settings.heroCta} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Media image={settings.heroImage} label="team / office photo" className="hero-image" priority width={2000} height={720} />

      <section className="wrap section" aria-labelledby="what-we-do">
        <div className="section-head">
          <h2 id="what-we-do" className="h-xl">What we do</h2>
          <div className="mono">({String(services.length).padStart(2, '0')} services)</div>
        </div>
        <ServiceRows services={services} />
      </section>

      {featured.length > 0 && (
        <section className="dark" aria-labelledby="selected-work">
          <div className="wrap section" style={{ gap: 56 }}>
            <div className="section-head">
              <h2 id="selected-work" className="h-xl">Selected work</h2>
              <Link href="/work" className="link-underline">All case studies</Link>
            </div>
            <div className="work-grid">
              {featured.map((s) => (
                <WorkCard key={s._id} study={s} dark />
              ))}
            </div>
          </div>
        </section>
      )}

      <Audiences items={audiences} />
    </>
  )
}
