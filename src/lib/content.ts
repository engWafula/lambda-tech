import 'server-only'
import { client } from '@/sanity/client'
import {
  AUDIENCES_QUERY,
  CASE_STUDIES_QUERY,
  CASE_STUDY_QUERY,
  JOB_QUERY,
  JOBS_QUERY,
  SERVICE_QUERY,
  SERVICES_QUERY,
  SETTINGS_QUERY,
  SLUGS_QUERY,
} from '@/sanity/queries'
import * as seed from './seed'
import type { Audience, CaseStudy, Job, Service, Settings } from './types'

const REVALIDATE = 60

async function query<T>(q: string, params: Record<string, unknown>, fallback: T, tags: string[]): Promise<T> {
  if (!client) return fallback
  try {
    const res = await client.fetch<T>(q, params, { next: { revalidate: REVALIDATE, tags } })
    return res ?? fallback
  } catch (err) {
    console.error('[sanity] query failed, serving seed content:', (err as Error).message)
    return fallback
  }
}

export const getSettings = async (): Promise<Settings> => {
  const s = await query<Partial<Settings> | null>(SETTINGS_QUERY, {}, seed.settings, ['siteSettings'])
  return { ...seed.settings, ...Object.fromEntries(Object.entries(s ?? {}).filter(([, v]) => v != null)) }
}

export const getServices = () => query<Service[]>(SERVICES_QUERY, {}, seed.services, ['service'])
export const getService = (slug: string) =>
  query<Service | null>(SERVICE_QUERY, { slug }, seed.services.find((x) => x.slug === slug) ?? null, ['service'])

export const getCaseStudies = () => query<CaseStudy[]>(CASE_STUDIES_QUERY, {}, seed.caseStudies, ['caseStudy'])
export const getCaseStudy = (slug: string) =>
  query<CaseStudy | null>(CASE_STUDY_QUERY, { slug }, seed.caseStudies.find((x) => x.slug === slug) ?? null, ['caseStudy'])

export const getAudiences = () => query<Audience[]>(AUDIENCES_QUERY, {}, seed.audiences, ['audience'])

export const getJobs = () => query<Job[]>(JOBS_QUERY, {}, seed.jobs, ['job'])
export const getJob = (slug: string) =>
  query<Job | null>(JOB_QUERY, { slug }, seed.jobs.find((x) => x.slug === slug) ?? null, ['job'])

const seedSlugs: Record<string, string[]> = {
  service: seed.services.map((x) => x.slug),
  caseStudy: seed.caseStudies.map((x) => x.slug),
  job: seed.jobs.map((x) => x.slug),
}
export const getSlugs = (type: 'service' | 'caseStudy' | 'job') =>
  query<string[]>(SLUGS_QUERY, { type }, seedSlugs[type], [type])
