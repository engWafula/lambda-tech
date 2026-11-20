import { defineField, defineType } from 'sanity'

export const audience = defineType({
  name: 'audience',
  title: 'Who we serve',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', type: 'text', rows: 2 }),
    defineField({ name: 'order', type: 'number' }),
  ],
})
