import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const contentImage = defineType({
  name: 'contentImage',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
  ],
})
