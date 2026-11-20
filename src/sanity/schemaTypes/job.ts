import { defineField, defineType } from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job opening',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'department', type: 'string' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({
      name: 'employmentType',
      type: 'string',
      options: { list: ['Full-time', 'Part-time', 'Contract'] },
      initialValue: 'Full-time',
    }),
    defineField({ name: 'summary', type: 'text', rows: 2 }),
    defineField({ name: 'body', type: 'blockContent' }),
  ],
  preview: { select: { title: 'title', subtitle: 'location' } },
})
