import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '../access'
import { revalidateContent } from '../hooks/revalidate'

export const ClassTypes: CollectionConfig = {
  slug: 'class-types',
  labels: { singular: 'Class type', plural: 'Class types' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'color'],
    group: 'Club',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  hooks: {
    afterChange: [revalidateContent],
    afterDelete: [revalidateContent],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Displayed as-is on cards and filters, e.g. Gi, No-Gi, Kids, Open Mat.' },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      defaultValue: '#43c95b',
      admin: { description: 'Hex colour for the card accent and the schedule legend.' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Shown in the class detail modal.' },
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
