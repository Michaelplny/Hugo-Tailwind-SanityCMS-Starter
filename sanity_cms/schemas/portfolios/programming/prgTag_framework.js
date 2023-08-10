import customSlug from '../../customSlug.js'

export default {
    name: 'prgTag_framework',
    title: 'Programming Framework - Tag',
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