import type { Audience, Block, CaseStudy, Job, Service, Settings } from './types.ts'

let k = 0
const key = () => `k${(k++).toString(36)}`

/** Turn plain paragraphs into Portable Text. Lines starting with "## " become h2. */
export function pt(...paras: string[]): Block[] {
  return paras.map((p) => {
    const h2 = p.startsWith('## ')
    return {
      _type: 'block',
      _key: key(),
      style: h2 ? 'h2' : 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: key(), text: h2 ? p.slice(3) : p, marks: [] }],
    }
  })
}

export const settings: Settings = {
  title: 'Lambda Technologies',
  email: 'hello@lambda.tech',
  heroLines: ['We build the', 'systems your', 'business'],
  heroAccent: 'runs on.',
  heroKicker: 'IT consulting · Lambda Technologies',
  heroIntro: 'Cloud, software, data and security for startups, enterprises and the public sector.',
  heroCta: 'Book a free call',
  footerHeading: "Let's talk.",
  seoDescription:
    'Lambda Technologies is an IT consultancy. We design, build and run cloud, software, data and security systems for startups, enterprises and the public sector.',
}

const s = (order: number, title: string, slug: string, summary: string, description: string, deliverables: string[]): Service => ({
  _id: `service-${slug}`,
  title,
  slug,
  order,
  summary,
  description,
  deliverables,
  body: pt(
    '## How we approach it',
    `Every ${title.toLowerCase()} engagement starts with a short assessment: we look at what you run today, what it costs and where the risks are. You get a written plan with options, costs and timelines before any build work starts.`,
    'A senior consultant leads the work from first call to handover, and you see progress every two weeks in a live demo.',
  ),
})

export const services: Service[] = [
  s(1, 'Cloud & infrastructure', 'cloud-infrastructure', 'Migration, architecture and cost control', 'Move to AWS, Azure or GCP with a clear architecture, predictable bills and no surprise outages.', ['Cloud readiness assessment', 'Landing zone and network design', 'Workload migration', 'FinOps and cost reviews']),
  s(2, 'Software development', 'software-development', 'Web, mobile and backend systems', 'Custom web, mobile and backend systems built by senior engineers and designed to be maintained for years.', ['Product discovery', 'Web and mobile apps', 'APIs and integrations', 'Legacy modernisation']),
  s(3, 'Data & AI', 'data-ai', 'Platforms, analytics and machine learning', 'Data platforms, dashboards and applied machine learning that answer real business questions.', ['Data warehouse and pipelines', 'BI dashboards', 'ML models in production', 'AI assistants on your own data']),
  s(4, 'Cybersecurity', 'cybersecurity', 'Audits, compliance and incident response', 'Find and fix weaknesses before attackers do, and get ready for ISO 27001, SOC 2 or sector rules.', ['Security audits and pen tests', 'ISO 27001 / SOC 2 readiness', 'Identity and access hardening', 'Incident response retainer']),
  s(5, 'Managed IT & support', 'managed-it-support', 'Monitoring and helpdesk under clear SLAs', 'We monitor, patch and support your systems and people under SLAs you can hold us to.', ['24/7 monitoring', 'Helpdesk', 'Patch and backup management', 'Monthly service reports']),
  s(6, 'Transformation strategy', 'transformation-strategy', 'Roadmaps tied to business goals', 'Technology roadmaps that tie every investment to a business outcome and a budget line.', ['IT maturity assessment', 'Roadmap and business case', 'Vendor selection', 'Programme governance']),
  s(7, 'ERP & CRM', 'erp-crm', 'Selection, implementation and integration', 'Choose, implement and integrate the core platforms your finance, sales and operations teams rely on.', ['Requirements and selection', 'Implementation', 'Data migration', 'Integrations and training']),
  s(8, 'Staff augmentation', 'staff-augmentation', 'Vetted engineers, onboarded in weeks', 'Vetted engineers, architects and analysts who join your team in weeks, not months.', ['Engineers and architects', 'Data and security specialists', 'Flexible monthly terms', 'Replacement guarantee']),
]

const ref = (slug: string) => {
  const sv = services.find((x) => x.slug === slug)!
  return { title: sv.title, slug: sv.slug }
}

export const caseStudies: CaseStudy[] = [
  {
    _id: 'case-freight-azure',
    title: 'Freight operator moved to Azure with zero downtime',
    slug: 'freight-operator-azure-migration',
    client: 'National freight operator',
    tag: 'LOGISTICS · CLOUD',
    excerpt: 'We migrated 140 legacy services to Azure, rebuilt the dispatch platform and now run it 24/7.',
    featured: true,
    publishedAt: '2026-06-01T00:00:00Z',
    metrics: [
      { value: '38%', label: 'lower hosting cost' },
      { value: '0 h', label: 'downtime at cutover' },
      { value: '9 mo', label: 'start to finish' },
    ],
    services: [ref('cloud-infrastructure'), ref('software-development'), ref('managed-it-support')],
    body: pt(
      '## The challenge',
      'The operator ran 140 services across two ageing data centres. Hardware contracts were expiring, and the dispatch platform could not be taken offline for more than minutes at a time.',
      '## What we did',
      'We mapped every dependency, moved workloads to Azure in eleven waves and rebuilt the dispatch platform as a set of containerised services. Each wave ran in parallel with the old system until traffic was switched over.',
      '## The result',
      'Hosting costs fell by 38%, the final cutover happened with zero downtime, and our managed services team now runs the platform around the clock.',
    ),
  },
  {
    _id: 'case-health-iso',
    title: 'ISO 27001 readiness for a regional health authority',
    slug: 'health-authority-iso-27001',
    client: 'Regional health authority',
    tag: 'PUBLIC SECTOR · SECURITY',
    excerpt: 'A twelve-month programme that took a health authority from no formal security management to certification-ready.',
    featured: true,
    publishedAt: '2026-03-01T00:00:00Z',
    metrics: [
      { value: '114', label: 'controls implemented' },
      { value: '12 mo', label: 'to audit-ready' },
      { value: '0', label: 'major non-conformities' },
    ],
    services: [ref('cybersecurity'), ref('transformation-strategy')],
    body: pt(
      '## The challenge',
      'The authority handled patient data for 2 million people but had no information security management system and a certification deadline set by its funder.',
      '## What we did',
      'We ran a gap analysis, wrote the policy set with their teams, hardened identity and access, and trained 1,800 staff. A mock audit three months out caught the last gaps.',
      '## The result',
      'The authority passed its stage 2 audit with zero major non-conformities.',
    ),
  },
  {
    _id: 'case-fintech-data',
    title: 'A real-time risk platform for a growing fintech',
    slug: 'fintech-real-time-risk-platform',
    client: 'Series B fintech',
    tag: 'FINANCE · DATA & AI',
    excerpt: 'Streaming data pipelines and a fraud model that flags risky transactions in under a second.',
    featured: false,
    publishedAt: '2025-11-01T00:00:00Z',
    metrics: [
      { value: '<1 s', label: 'fraud decision time' },
      { value: '27%', label: 'fewer chargebacks' },
      { value: '4', label: 'engineers embedded' },
    ],
    services: [ref('data-ai'), ref('staff-augmentation')],
    body: pt(
      '## The challenge',
      'Fraud checks ran in nightly batches, so losses were found a day late.',
      '## What we did',
      'Four of our engineers joined the client team to build streaming pipelines and deploy a fraud model scoring every transaction in real time.',
      '## The result',
      'Chargebacks fell 27% in the first quarter after launch.',
    ),
  },
]

export const audiences: Audience[] = [
  { _id: 'aud-startups', title: 'Startups', description: 'Product engineering and cloud foundations that scale with your next round.' },
  { _id: 'aud-enterprises', title: 'Enterprises', description: 'Modernisation, ERP programmes and extra capacity for in-house teams.' },
  { _id: 'aud-public', title: 'Public sector', description: 'Secure, compliant services delivered within procurement frameworks.' },
]

export const jobs: Job[] = [
  {
    _id: 'job-cloud-architect',
    title: 'Senior Cloud Architect',
    slug: 'senior-cloud-architect',
    department: 'Cloud',
    location: 'Nairobi or remote',
    employmentType: 'Full-time',
    summary: 'Lead migration and landing-zone design for enterprise clients on Azure and AWS.',
    body: pt('## What you will do', 'Design cloud architectures, lead migrations and mentor engineers on client projects.', '## What you bring', 'Seven or more years in infrastructure, at least three designing on Azure or AWS.'),
  },
  {
    _id: 'job-fullstack',
    title: 'Full-stack Engineer (TypeScript)',
    slug: 'full-stack-engineer-typescript',
    department: 'Engineering',
    location: 'Kampala or remote',
    employmentType: 'Full-time',
    summary: 'Build web products for startups and enterprises with React, Node and Postgres.',
    body: pt('## What you will do', 'Ship features end to end on client products, from schema to UI.', '## What you bring', 'Four or more years with TypeScript, React and a relational database.'),
  },
  {
    _id: 'job-security',
    title: 'Security Consultant',
    slug: 'security-consultant',
    department: 'Security',
    location: 'Remote',
    employmentType: 'Contract',
    summary: 'Run audits and ISO 27001 readiness programmes for public-sector clients.',
    body: pt('## What you will do', 'Lead gap analyses, write policies with clients and prepare them for certification audits.', '## What you bring', 'Hands-on ISO 27001 or SOC 2 experience; Lead Implementer certification is a plus.'),
  },
]
