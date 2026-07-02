import {defineField, defineType} from 'sanity'
import {SyncIcon} from '@sanity/icons'

export const recurringEvent = defineType({
  name: 'recurringEvent',
  title: 'Recurring Event',
  type: 'document',
  icon: SyncIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dayOfWeek',
      title: 'Day of week',
      type: 'number',
      options: {
        list: [
          {title: 'Sunday', value: 0},
          {title: 'Monday', value: 1},
          {title: 'Tuesday', value: 2},
          {title: 'Wednesday', value: 3},
          {title: 'Thursday', value: 4},
          {title: 'Friday', value: 5},
          {title: 'Saturday', value: 6},
        ],
      },
      validation: (rule) => rule.required().min(0).max(6),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: '24h format, e.g. 10:00',
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
      title: 'Day of week',
      name: 'dayOfWeekAsc',
      by: [{field: 'dayOfWeek', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title.sk',
      dayOfWeek: 'dayOfWeek',
      time: 'time',
    },
    prepare({title, dayOfWeek, time}) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      return {
        title: title ?? 'Untitled recurring event',
        subtitle: `${days[dayOfWeek ?? 0] ?? '?'} · ${time ?? ''}`,
      }
    },
  },
})
