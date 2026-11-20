import type { Audience } from '@/lib/types'

export function Audiences({ items }: { items: Audience[] }) {
  return (
    <section className="wrap section" aria-label="Who we work with">
      <div className="three">
        {items.map((a) => (
          <div key={a._id} className="col">
            <h3>{a.title}</h3>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
