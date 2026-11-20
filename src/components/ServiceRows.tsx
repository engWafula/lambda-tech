import Link from 'next/link'
import type { Service } from '@/lib/types'

export function ServiceRows({ services }: { services: Service[] }) {
  return (
    <ul className="rows">
      {services.map((s) => (
        <li key={s._id}>
          <Link href={`/services/${s.slug}`} className="row">
            <span className="row-num">{String(s.order).padStart(2, '0')}</span>
            <span className="row-title">{s.title}</span>
            <span className="row-desc">{s.summary}</span>
            <span className="row-arrow" aria-hidden="true">→</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
