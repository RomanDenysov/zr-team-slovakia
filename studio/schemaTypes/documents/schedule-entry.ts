import {defineField, defineType} from 'sanity'
import {ClockIcon} from '@sanity/icons'

export const scheduleEntry = defineType({
  name: 'scheduleEntry',
  title: 'Schedule Entry',
  type: 'document',
  icon: ClockIcon,
  fields: [
    defineField({
      name: 'dayIndex',
      title: 'Day of week',
      type: 'number',
      description: 'Monday = 0, Sunday = 6',
      options: {
        list: [
          {title: 'Monday', value: 0},
          {title: 'Tuesday', value: 1},
          {title: 'Wednesday', value: 2},
          {title: 'Thursday', value: 3},
          {title: 'Friday', value: 4},
          {title: 'Saturday', value: 5},
          {title: 'Sunday', value: 6},
        ],
      },
      validation: (rule) => rule.required().min(0).max(6),
    }),
    defineField({
      name: 'startTime',
      title: 'Start time',
      type: 'string',
      description: '24h format, e.g. 18:00',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endTime',
      title: 'End time',
      type: 'string',
      description: '24h format, e.g. 19:30',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'classType',
      title: 'Class type',
      type: 'string',
      options: {
        list: [
          {title: 'Gi', value: 'Gi'},
          {title: 'No-Gi', value: 'No-Gi'},
          {title: 'Kids', value: 'Kids'},
          {title: 'Open Mat', value: 'Open Mat'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'All levels', value: 'all'},
          {title: 'Beginners', value: 'beg'},
          {title: 'Advanced', value: 'adv'},
          {title: 'Kids', value: 'kids'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coach',
      title: 'Coach',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      options: {
        list: [
          {title: 'Košice', value: 'KE'},
          {title: 'Bratislava', value: 'BA'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Day, then start time',
      name: 'dayStartAsc',
      by: [
        {field: 'dayIndex', direction: 'asc'},
        {field: 'startTime', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      dayIndex: 'dayIndex',
      startTime: 'startTime',
      endTime: 'endTime',
      classType: 'classType',
      location: 'location',
      coach: 'coach',
    },
    prepare({dayIndex, startTime, endTime, classType, location, coach}) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      return {
        title: `${days[dayIndex ?? 0] ?? '?'} ${startTime ?? ''}–${endTime ?? ''} · ${classType ?? ''}`,
        subtitle: [location, coach].filter(Boolean).join(' · '),
      }
    },
  },
})
