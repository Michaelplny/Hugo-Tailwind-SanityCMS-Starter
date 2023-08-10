export default {
  name: 'prgPost',
  title: 'Programming Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'draft',
      title: 'Draft',
      type: 'boolean',
      description: 'If checked, this post will be a draft and not visible on the live site',
      initialValue: true,
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: "teaser",
      title: "Teaser Text",
      type: "string",
      description: "This text will only appear on the posts tile in gallery",
    },
    {
      name: 'prgTag_lang',
      title: 'Programming Langauge Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'prgTag_lang'}}],
    },
    {
      name: 'prgTag_framework',
      title: 'Programming Framework Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'prgTag_framework'}}],
    },
    {
      name: 'prgTag_project_type',
      title: 'Programming Project Type Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'prgTag_project_type'}}],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],
}
