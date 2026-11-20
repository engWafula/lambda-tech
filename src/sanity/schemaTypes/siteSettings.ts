import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Lambda Technologies', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Contact email', type: 'string', validation: (r) => r.required().email() }),
    defineField({
      name: 'heroLines',
      title: 'Hero headline lines',
      description: 'Each item is one line of the giant headline.',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (r) => r.min(1).max(4),
    }),
    defineField({ name: 'heroAccent', title: 'Hero accent words', description: 'Appended to the last line in orange.', type: 'string' }),
    defineField({ name: 'heroKicker', type: 'string' }),
    defineField({ name: 'heroIntro', type: 'text', rows: 2 }),
    defineField({ name: 'heroCta', title: 'Hero button label', type: 'string' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }),
    defineField({ name: 'footerHeading', type: 'string', initialValue: "Let's talk." }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
})
