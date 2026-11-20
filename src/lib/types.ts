// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Block = any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityImage = { asset?: any; alt?: string } | null | undefined

export type Settings = {
  title: string
  email: string
  heroLines: string[]
  heroAccent: string
  heroKicker: string
  heroIntro: string
  heroCta: string
  heroImage?: SanityImage
  footerHeading: string
  seoDescription: string
}

export type Service = {
  _id: string
  title: string
  slug: string
  order: number
  summary: string
  description?: string
  deliverables?: string[]
  body?: Block[]
}

export type CaseStudy = {
  _id: string
  title: string
  slug: string
  client?: string
  tag?: string
  excerpt?: string
  featured?: boolean
  image?: SanityImage
  metrics?: { value: string; label: string }[]
  services?: { title: string; slug: string }[]
  publishedAt?: string
  body?: Block[]
}

export type Audience = { _id: string; title: string; description: string }

export type Job = {
  _id: string
  title: string
  slug: string
  department?: string
  location?: string
  employmentType?: string
  summary?: string
  body?: Block[]
}
