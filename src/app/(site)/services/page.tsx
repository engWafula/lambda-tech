import type { Metadata } from 'next'
import { Audiences } from '@/components/Audiences'
import { ServiceRows } from '@/components/ServiceRows'
import { getAudiences, getServices } from '@/lib/content'

export const metadata: Metadata = { title: 'Services', description: 'Eight services across the full technology stack.' }

export default async function ServicesPage() {
  const [services, audiences] = await Promise.all([getServices(), getAudiences()])
  return (
    <>
      <section className="wrap page-hero">
        <div className="mono">({String(services.length).padStart(2, '0')} services)</div>
        <h1 className="page-title">What we do</h1>
        <p className="lede">
          Engage us for a single project or as an extension of your IT team. Every engagement is led by a senior consultant who
          stays with you from assessment to delivery.
        </p>
      </section>
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <ServiceRows services={services} />
      </section>
      <section className="dark">
        <div className="wrap section">
          <h2 className="h-xl">Assess. Build. Run.</h2>
          <div className="three">
            {[
              ['Phase 01 · 2–4 weeks', 'Assess', 'We audit your systems, processes and risks, then deliver a prioritised plan with costs and timelines.'],
              ['Phase 02 · project-based', 'Build', 'A dedicated team delivers in short, visible increments, with a demo every two weeks.'],
              ['Phase 03 · ongoing', 'Run', 'We operate, monitor and improve what we built, or hand it over with full documentation.'],
            ].map(([k, t, d]) => (
              <div key={t} className="col" style={{ borderColor: 'var(--accent)' }}>
                <div className="mono" style={{ color: 'var(--accent)' }}>{k}</div>
                <h3>{t}</h3>
                <p style={{ color: '#cfcac0' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Audiences items={audiences} />
    </>
  )
}
