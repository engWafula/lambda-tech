import { defineField, defineType } from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'order', type: 'number', validation: (r) => r.required().integer().min(1) }),
    defineField({ name: 'summary', title: 'Short line (homepage list)', type: 'string', validation: (r) => r.required().max(60) }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'deliverables', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'body', type: 'blockContent' }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', order: 'order', subtitle: 'summary' },
    prepare: ({ title, order, subtitle }) => ({ title: `${String(order ?? '').padStart(2, '0')} ${title}`, subtitle }),
  },
})
