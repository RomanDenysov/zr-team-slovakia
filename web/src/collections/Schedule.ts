import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const Schedule: CollectionConfig = {
  slug: 'schedule',
  labels: { singular: 'Class', plural: 'Class schedule' },
  admin: {
    useAsTitle: 'coach',
    defaultColumns: ['dayIndex', 'startTime', 'endTime', 'classType', 'coach', 'location'],
    group: 'Club',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: ['dayIndex', 'startTime'],
  fields: [
    {
      name: 'dayIndex',
      type: 'select',
      required: true,
      // Monday = 0 … Sunday = 6, matching the weekly grid.
      options: DAYS.map((label, index) => ({ label, value: String(index) })),
    },
    {
      type: 'row',
      fields: [
        {
          name: 'startTime',
          type: 'text',
          required: true,
          admin: { width: '50%', description: '24h, e.g. 18:00' },
        },
        {
          name: 'endTime',
          type: 'text',
          required: true,
          admin: { width: '50%', description: '24h, e.g. 19:30' },
        },
      ],
    },
    {
      name: 'classType',
      type: 'relationship',
      relationTo: 'class-types',
      required: true,
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      defaultValue: 'all',
      options: [
        { label: 'All levels', value: 'all' },
        { label: 'Beginners', value: 'beg' },
        { label: 'Advanced', value: 'adv' },
        { label: 'Kids', value: 'kids' },
      ],
    },
    { name: 'coach', type: 'text', required: true },
    {
      name: 'location',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
    },
  ],
}
