import customSlug from '../../customSlug.js'

export default {
  name: 'prgTag_lang',
  title: 'Programming Languages - Tag',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    customSlug,
  ],
}
