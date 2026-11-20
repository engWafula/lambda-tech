import { defineField, defineType } from 'sanity'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact submission',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'company', type: 'string' }),
    defineField({ name: 'service', type: 'string' }),
    defineField({ name: 'message', type: 'text' }),
    defineField({ name: 'submittedAt', type: 'datetime' }),
  ],
  orderings: [{ title: 'Newest', name: 'newest', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: { select: { title: 'name', subtitle: 'email' } },
})
