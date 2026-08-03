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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.sk', maxLength: 96},
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
      description: 'Short summary for cards and listings',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localizedBlockContent',
      description: 'Full event page content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'contentImage',
      description: 'Shown on cards and at the top of the event page',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'Optional link for sign-up or tickets',
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
      media: 'coverImage',
    },
    prepare({title, startDate, eventType, media}) {
      return {
        title: title ?? 'Untitled event',
        subtitle: [startDate, eventType].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
