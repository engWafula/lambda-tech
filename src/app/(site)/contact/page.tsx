import type { Metadata } from 'next'
import { getServices, getSettings } from '@/lib/content'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = { title: 'Contact', description: 'Book a free call with Lambda Technologies.' }

export default async function ContactPage() {
  const [settings, services] = await Promise.all([getSettings(), getServices()])
  return (
    <>
      <section className="wrap page-hero">
        <div className="mono">Free 30-minute call</div>
        <h1 className="page-title">Start a project</h1>
        <p className="lede">Tell us what you are working on. A senior consultant replies within one working day.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 'var(--section)' }}>
        <div className="split">
          <aside className="aside">
            <div>
              <h2 className="mono">Email</h2>
              <a href={`mailto:${settings.email}`} className="link-underline" style={{ fontSize: 22 }}>
                {settings.email}
              </a>
            </div>
            <div>
              <h2 className="mono">What happens next</h2>
              <ul className="bullets">
                <li>We reply within a day</li>
                <li>30-minute scoping call</li>
                <li>Written proposal in a week</li>
              </ul>
            </div>
          </aside>
          <ContactForm services={services.map((s) => s.title)} />
        </div>
      </section>
    </>
  )
}
