import {defineField, defineType} from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    defineField({name: 'sk', title: 'Slovak', type: 'string'}),
    defineField({name: 'en', title: 'English', type: 'string'}),
    defineField({name: 'ua', title: 'Ukrainian', type: 'string'}),
  ],
})
