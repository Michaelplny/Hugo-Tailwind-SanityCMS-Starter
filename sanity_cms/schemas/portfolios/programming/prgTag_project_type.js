import customSlug from '../../customSlug.js'

export default {
    name: 'prgTag_project_type',
    title: 'Programming Project Type - Tag',
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