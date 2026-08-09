import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const RecurringEvents: CollectionConfig = {
  slug: 'recurring-events',
  labels: { singular: 'Recurring event', plural: 'Recurring events' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'dayIndex', 'time'],
    group: 'Content',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: ['dayIndex', 'time'],
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    {
      name: 'dayIndex',
      type: 'select',
      required: true,
      // Monday = 0 … Sunday = 6, same convention as the class schedule.
      options: DAYS.map((label, index) => ({ label, value: String(index) })),
    },
    {
      name: 'time',
      type: 'text',
      required: true,
      admin: { description: '24h, e.g. 10:00' },
    },
    { name: 'place', type: 'text', required: true, localized: true },
  ],
}
