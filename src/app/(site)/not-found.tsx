import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="wrap page-hero" style={{ paddingBottom: 'var(--section)' }}>
      <div className="mono">Error 404</div>
      <h1 className="page-title">
        Nothing <span className="accent">here.</span>
      </h1>
      <Link href="/" className="btn btn-ink" style={{ alignSelf: 'flex-start' }}>
        Back home <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}
