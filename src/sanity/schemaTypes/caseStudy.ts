import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case study',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'tag', title: 'Tag line', description: 'e.g. LOGISTICS · CLOUD', type: 'string' }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({
      name: 'metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metric',
          fields: [
            { name: 'value', type: 'string', validation: (r) => r.required() },
            { name: 'label', type: 'string', validation: (r) => r.required() },
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'services', type: 'array', of: [{ type: 'reference', to: [{ type: 'service' }] }] }),
    defineField({ name: 'featured', title: 'Show on homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'body', type: 'blockContent' }),
  ],
  preview: { select: { title: 'title', subtitle: 'tag', media: 'image' } },
})
