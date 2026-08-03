import {defineArrayMember, defineField, defineType} from 'sanity'

const contentBlocks = [
  defineArrayMember({type: 'block'}),
  defineArrayMember({
    type: 'image',
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Alt text',
        type: 'localizedString',
      }),
      defineField({
        name: 'caption',
        title: 'Caption',
        type: 'localizedString',
      }),
    ],
  }),
]

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    defineField({name: 'sk', title: 'Slovak', type: 'array', of: contentBlocks}),
    defineField({name: 'en', title: 'English', type: 'array', of: contentBlocks}),
    defineField({name: 'ua', title: 'Ukrainian', type: 'array', of: contentBlocks}),
  ],
})
