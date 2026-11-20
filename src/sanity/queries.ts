import { defineQuery } from 'next-sanity'

const image = `image{..., "alt": coalesce(alt, "")}`

export const SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  title, email, heroLines, heroAccent, heroKicker, heroIntro, heroCta, ${image.replace('image', 'heroImage')},
  footerHeading, seoDescription
}`)

export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(order asc){
  _id, title, "slug": slug.current, order, summary, description
}`)

export const SERVICE_QUERY = defineQuery(`*[_type == "service" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, order, summary, description, deliverables, body
}`)

export const CASE_STUDIES_QUERY = defineQuery(`*[_type == "caseStudy"] | order(featured desc, publishedAt desc){
  _id, title, "slug": slug.current, client, tag, excerpt, featured, ${image}
}`)

export const CASE_STUDY_QUERY = defineQuery(`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, client, tag, excerpt, ${image}, metrics, body, publishedAt,
  "services": services[]->{title, "slug": slug.current}
}`)

export const AUDIENCES_QUERY = defineQuery(`*[_type == "audience"] | order(order asc){ _id, title, description }`)

export const JOBS_QUERY = defineQuery(`*[_type == "job" && !(_id in path("drafts.**"))] | order(_createdAt desc){
  _id, title, "slug": slug.current, department, location, employmentType, summary
}`)

export const JOB_QUERY = defineQuery(`*[_type == "job" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, department, location, employmentType, summary, body
}`)

export const SLUGS_QUERY = defineQuery(`*[_type == $type && defined(slug.current)].slug.current`)
