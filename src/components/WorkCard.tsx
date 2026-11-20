import Link from 'next/link'
import type { CaseStudy } from '@/lib/types'
import { Media } from './Media'

export function WorkCard({ study, dark }: { study: CaseStudy; dark?: boolean }) {
  return (
    <Link href={`/work/${study.slug}`} className="work-card">
      <Media image={study.image} label="project image" dark={dark} sizes="(max-width: 760px) 100vw, 50vw" />
      {study.tag && <div className="mono work-tag">{study.tag}</div>}
      <h3 className="work-title">{study.title}</h3>
    </Link>
  )
}
