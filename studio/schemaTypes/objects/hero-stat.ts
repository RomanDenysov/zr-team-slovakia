import {defineField, defineType} from 'sanity'

export const heroStat = defineType({
  name: 'heroStat',
  title: 'Hero Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. "2", "20+", "IBJJF"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {value: 'value', label: 'label.sk'},
    prepare({value, label}) {
      return {
        title: value ?? 'Stat',
        subtitle: label,
      }
    },
  },
})
