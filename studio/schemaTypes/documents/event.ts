import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'eventType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Seminar', value: 'seminar'},
          {title: 'Tournament', value: 'tournament'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Camp', value: 'camp'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Optional — for multi-day events',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'place',
      title: 'Place',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Start date',
      name: 'startDateAsc',
      by: [{field: 'startDate', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.sk',
      startDate: 'startDate',
      eventType: 'eventType',
    },
    prepare({title, startDate, eventType}) {
      return {
        title: title ?? 'Untitled event',
        subtitle: [startDate, eventType].filter(Boolean).join(' · '),
      }
    },
  },
})
