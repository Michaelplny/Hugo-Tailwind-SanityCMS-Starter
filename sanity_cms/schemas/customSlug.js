export default {
  name: 'customSlug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 96,
    slugify: (input) =>
      input
        .toLowerCase()
        .replace(/\s+/g, '-') //for spaces
        .replace(/#/g, '-sharp') //for C#
        .replace(/\+\+/g, '-plus-plus') //for C++
        .replace(/\.net/g, '-dot-net') //for .Net
        .replace(/objective-c/g, 'objective-c') //for Objective-C
        .slice(0, 200),
  },
  validation: (Rule) => Rule.required(),
}
