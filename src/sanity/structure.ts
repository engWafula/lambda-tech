import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('caseStudy').title('Case studies'),
      S.documentTypeListItem('audience').title('Who we serve'),
      S.documentTypeListItem('job').title('Careers'),
      S.divider(),
      S.documentTypeListItem('contactSubmission').title('Inbox'),
    ])
